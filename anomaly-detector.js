// AI Anomaly Detection Module for KSEB Electric Fence Monitoring
class AnomalyDetector {
    constructor() {
        this.historicalData = [];
        this.anomalies = [];
        this.learningWindow = 50; // Number of data points to learn from
        this.confidenceThreshold = 0.7; // Anomaly confidence threshold
        this.isLearning = true;
        this.statistics = {
            mean: 0,
            std: 0,
            upperBound: 0,
            lowerBound: 0
        };
        
        // Machine Learning parameters
        this.zscore_threshold = 2.5; // Standard deviation threshold
        this.iqr_multiplier = 1.5; // IQR multiplier for outlier detection
    }

    // Add new data point and detect anomalies
    analyzeReading(current, voltage, timestamp = new Date()) {
        const dataPoint = {
            current: parseFloat(current),
            voltage: parseFloat(voltage),
            timestamp: timestamp,
            combined_score: this.calculateCombinedScore(current, voltage)
        };

        this.historicalData.push(dataPoint);

        // Maintain sliding window
        if (this.historicalData.length > this.learningWindow * 2) {
            this.historicalData.shift();
        }

        // Update statistics
        this.updateStatistics();

        // Detect anomalies using multiple methods
        const anomalyResult = this.detectAnomalies(dataPoint);

        if (anomalyResult.isAnomaly) {
            this.anomalies.push({
                ...dataPoint,
                anomaly_type: anomalyResult.type,
                confidence: anomalyResult.confidence,
                reason: anomalyResult.reason
            });

            // Keep only recent anomalies
            if (this.anomalies.length > 20) {
                this.anomalies.shift();
            }
        }

        return anomalyResult;
    }

    // Calculate combined score for holistic analysis
    calculateCombinedScore(current, voltage) {
        // Weighted combination of current and voltage
        // Current is more important for safety detection
        return (current * 0.8) + (voltage * 0.2);
    }

    // Update statistical measures for anomaly detection
    updateStatistics() {
        if (this.historicalData.length < 10) return;

        const currentValues = this.historicalData.map(d => d.current);
        const n = currentValues.length;

        // Calculate mean
        this.statistics.mean = currentValues.reduce((a, b) => a + b, 0) / n;

        // Calculate standard deviation
        const variance = currentValues.reduce((acc, val) => {
            return acc + Math.pow(val - this.statistics.mean, 2);
        }, 0) / (n - 1);
        
        this.statistics.std = Math.sqrt(variance);

        // Calculate bounds for anomaly detection
        this.statistics.upperBound = this.statistics.mean + (this.zscore_threshold * this.statistics.std);
        this.statistics.lowerBound = this.statistics.mean - (this.zscore_threshold * this.statistics.std);

        // Stop learning phase after sufficient data
        if (this.historicalData.length >= this.learningWindow) {
            this.isLearning = false;
        }
    }

    // Multi-method anomaly detection
    detectAnomalies(dataPoint) {
        if (this.historicalData.length < 20) {
            return { isAnomaly: false, confidence: 0, type: 'insufficient_data' };
        }

        const results = [];

        // Method 1: Z-Score based detection
        const zScoreResult = this.zScoreDetection(dataPoint);
        results.push(zScoreResult);

        // Method 2: IQR based detection
        const iqrResult = this.iqrDetection(dataPoint);
        results.push(iqrResult);

        // Method 3: Pattern-based detection
        const patternResult = this.patternDetection(dataPoint);
        results.push(patternResult);

        // Method 4: Rate of change detection
        const rateResult = this.rateOfChangeDetection(dataPoint);
        results.push(rateResult);

        // Ensemble decision making
        return this.ensembleDecision(results, dataPoint);
    }

    // Z-Score anomaly detection
    zScoreDetection(dataPoint) {
        if (this.statistics.std === 0) {
            return { method: 'zscore', isAnomaly: false, confidence: 0 };
        }

        const zScore = Math.abs(dataPoint.current - this.statistics.mean) / this.statistics.std;
        const isAnomaly = zScore > this.zscore_threshold;
        const confidence = Math.min(zScore / this.zscore_threshold, 1);

        return {
            method: 'zscore',
            isAnomaly: isAnomaly,
            confidence: confidence,
            score: zScore,
            reason: isAnomaly ? `Current ${dataPoint.current}A deviates ${zScore.toFixed(2)} standard deviations from normal range` : null
        };
    }

    // IQR based anomaly detection
    iqrDetection(dataPoint) {
        const currentValues = this.historicalData.map(d => d.current).sort((a, b) => a - b);
        const n = currentValues.length;
        
        const q1Index = Math.floor(n * 0.25);
        const q3Index = Math.floor(n * 0.75);
        const q1 = currentValues[q1Index];
        const q3 = currentValues[q3Index];
        const iqr = q3 - q1;

        const lowerBound = q1 - (this.iqr_multiplier * iqr);
        const upperBound = q3 + (this.iqr_multiplier * iqr);

        const isAnomaly = dataPoint.current < lowerBound || dataPoint.current > upperBound;
        const distance = Math.max(lowerBound - dataPoint.current, dataPoint.current - upperBound, 0);
        const confidence = Math.min(distance / iqr, 1);

        return {
            method: 'iqr',
            isAnomaly: isAnomaly,
            confidence: confidence,
            bounds: { lower: lowerBound, upper: upperBound },
            reason: isAnomaly ? `Current ${dataPoint.current}A is outside IQR bounds [${lowerBound.toFixed(1)}, ${upperBound.toFixed(1)}]` : null
        };
    }

    // Pattern-based anomaly detection
    patternDetection(dataPoint) {
        if (this.historicalData.length < 10) {
            return { method: 'pattern', isAnomaly: false, confidence: 0 };
        }

        const recent = this.historicalData.slice(-10);
        const recentMean = recent.reduce((sum, d) => sum + d.current, 0) / recent.length;
        const recentStd = Math.sqrt(recent.reduce((acc, d) => acc + Math.pow(d.current - recentMean, 2), 0) / recent.length);

        // Check for sudden spikes or drops
        const deviation = Math.abs(dataPoint.current - recentMean);
        const threshold = Math.max(recentStd * 3, 1.5); // Minimum threshold of 1.5A

        const isAnomaly = deviation > threshold;
        const confidence = Math.min(deviation / threshold, 1);

        return {
            method: 'pattern',
            isAnomaly: isAnomaly,
            confidence: confidence,
            deviation: deviation,
            reason: isAnomaly ? `Sudden ${dataPoint.current > recentMean ? 'spike' : 'drop'} detected: ${deviation.toFixed(1)}A deviation from recent pattern` : null
        };
    }

    // Rate of change anomaly detection
    rateOfChangeDetection(dataPoint) {
        if (this.historicalData.length < 3) {
            return { method: 'rate_change', isAnomaly: false, confidence: 0 };
        }

        const previous = this.historicalData[this.historicalData.length - 2];
        const rateOfChange = Math.abs(dataPoint.current - previous.current);
        
        // Calculate normal rate of change from historical data
        const rates = [];
        for (let i = 1; i < this.historicalData.length - 1; i++) {
            rates.push(Math.abs(this.historicalData[i].current - this.historicalData[i-1].current));
        }
        
        const avgRate = rates.reduce((a, b) => a + b, 0) / rates.length;
        const rateThreshold = Math.max(avgRate * 4, 2); // Minimum threshold of 2A change

        const isAnomaly = rateOfChange > rateThreshold;
        const confidence = Math.min(rateOfChange / rateThreshold, 1);

        return {
            method: 'rate_change',
            isAnomaly: isAnomaly,
            confidence: confidence,
            rate: rateOfChange,
            threshold: rateThreshold,
            reason: isAnomaly ? `Rapid current change: ${rateOfChange.toFixed(1)}A/reading (normal: ${avgRate.toFixed(1)}A/reading)` : null
        };
    }

    // Ensemble decision making
    ensembleDecision(results, dataPoint) {
        const anomalousResults = results.filter(r => r.isAnomaly);
        
        if (anomalousResults.length === 0) {
            return { isAnomaly: false, confidence: 0, type: 'normal' };
        }

        // Calculate weighted confidence
        const totalConfidence = anomalousResults.reduce((sum, r) => sum + r.confidence, 0);
        const avgConfidence = totalConfidence / anomalousResults.length;

        // Determine anomaly type based on strongest signal
        const strongestAnomaly = anomalousResults.reduce((max, r) => r.confidence > max.confidence ? r : max);
        
        let anomalyType = 'unknown';
        let reason = strongestAnomaly.reason;

        // Classify anomaly types
        if (dataPoint.current > 13) {
            anomalyType = 'critical_overload';
            reason = `Critical: Current ${dataPoint.current}A exceeds safety threshold (13A)`;
        } else if (dataPoint.current > this.statistics.upperBound) {
            anomalyType = 'high_current_anomaly';
        } else if (dataPoint.current < this.statistics.lowerBound) {
            anomalyType = 'low_current_anomaly';
        } else if (strongestAnomaly.method === 'rate_change') {
            anomalyType = 'rapid_fluctuation';
        } else if (strongestAnomaly.method === 'pattern') {
            anomalyType = 'pattern_deviation';
        }

        return {
            isAnomaly: avgConfidence >= this.confidenceThreshold,
            confidence: avgConfidence,
            type: anomalyType,
            reason: reason,
            methods_triggered: anomalousResults.map(r => r.method),
            details: anomalousResults
        };
    }

    // Get anomaly insights for dashboard
    getAnomalyInsights() {
        const recentAnomalies = this.anomalies.slice(-10);
        const anomalyTypes = {};
        
        recentAnomalies.forEach(anomaly => {
            anomalyTypes[anomaly.anomaly_type] = (anomalyTypes[anomaly.anomaly_type] || 0) + 1;
        });

        return {
            total_anomalies: this.anomalies.length,
            recent_anomalies: recentAnomalies.length,
            learning_status: this.isLearning ? 'Learning' : 'Monitoring',
            data_points: this.historicalData.length,
            anomaly_types: anomalyTypes,
            statistics: this.statistics,
            recent_anomalies_list: recentAnomalies.slice(-5)
        };
    }

    // Reset detector (useful for testing)
    reset() {
        this.historicalData = [];
        this.anomalies = [];
        this.isLearning = true;
        this.statistics = { mean: 0, std: 0, upperBound: 0, lowerBound: 0 };
    }

    // Export anomaly data
    exportAnomalyData() {
        return {
            historical_data: this.historicalData,
            anomalies: this.anomalies,
            statistics: this.statistics,
            export_timestamp: new Date().toISOString()
        };
    }
}

// Global anomaly detector instance
window.anomalyDetector = new AnomalyDetector();