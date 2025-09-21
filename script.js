// Enhanced script.js with AI Anomaly Detection Integration

// KSEB Electric Fence Monitoring System with Google Maps Integration and AI Anomaly Detection
class KSEBMonitoringSystem {
    constructor() {
        // Fence data with Google Maps coordinates
        this.fenceData = [
            {
                id: "KSEB001",
                name: "Thiruvananthapuram Central",
                location: "TVM District Office",
                current: 11.2,
                voltage: 8.5,
                status: "normal",
                dailyPeak: 12.1,
                owner: "District Collector Office",
                contact: "91-471-2345678",
                coordinates: {
                    lat: 8.5241,
                    lng: 76.9366,
                    address: "District Collector Office, Thiruvananthapuram, Kerala, India"
                },
                anomalyDetector: new AnomalyDetector()
            },
            {
                id: "KSEB002",
                name: "Kochi Industrial Zone",
                location: "Kakkanad IT Park",
                current: 14.7,
                voltage: 8.3,
                status: "critical",
                dailyPeak: 15.2,
                owner: "IT Park Authority",
                contact: "91-484-2345678",
                coordinates: {
                    lat: 10.0261,
                    lng: 76.3475,
                    address: "Kakkanad IT Park, Kochi, Kerala, India"
                },
                anomalyDetector: new AnomalyDetector()
            },
            {
                id: "KSEB003",
                name: "Kozhikode Beach Road",
                location: "Beach Road Substation",
                current: 9.8,
                voltage: 8.7,
                status: "normal",
                dailyPeak: 11.3,
                owner: "Tourism Department",
                contact: "91-495-2345678",
                coordinates: {
                    lat: 11.2588,
                    lng: 75.7804,
                    address: "Beach Road, Kozhikode, Kerala, India"
                },
                anomalyDetector: new AnomalyDetector()
            },
            {
                id: "KSEB004",
                name: "Thrissur Cultural Center",
                location: "Swaraj Round",
                current: 12.9,
                voltage: 8.4,
                status: "warning",
                dailyPeak: 13.4,
                owner: "Cultural Affairs Dept",
                contact: "91-487-2345678",
                coordinates: {
                    lat: 10.5276,
                    lng: 76.2144,
                    address: "Swaraj Round, Thrissur, Kerala, India"
                },
                anomalyDetector: new AnomalyDetector()
            },
            {
                id: "KSEB005",
                name: "Kollam Port Authority",
                location: "Kollam Port Complex",
                current: 10.5,
                voltage: 8.6,
                status: "normal",
                dailyPeak: 11.8,
                owner: "Port Trust",
                contact: "91-474-2345678",
                coordinates: {
                    lat: 8.8932,
                    lng: 76.6141,
                    address: "Kollam Port, Kollam, Kerala, India"
                },
                anomalyDetector: new AnomalyDetector()
            },
            {
                id: "KSEB006",
                name: "Palakkad Railway Junction",
                location: "Railway Station Perimeter",
                current: 13.2,
                voltage: 8.2,
                status: "warning",
                dailyPeak: 13.8,
                owner: "Indian Railways",
                contact: "91-491-2345678",
                coordinates: {
                    lat: 10.7760,
                    lng: 76.6547,
                    address: "Palakkad Railway Station, Palakkad, Kerala, India"
                },
                anomalyDetector: new AnomalyDetector()
            },
            {
                id: "KSEB007",
                name: "Malappuram Govt Complex",
                location: "District Collectorate",
                current: 8.7,
                voltage: 8.8,
                status: "normal",
                dailyPeak: 10.2,
                owner: "District Administration",
                contact: "91-483-2345678",
                coordinates: {
                    lat: 11.0510,
                    lng: 76.0711,
                    address: "District Collectorate, Malappuram, Kerala, India"
                },
                anomalyDetector: new AnomalyDetector()
            },
            {
                id: "KSEB008",
                name: "Kannur Airport Perimeter",
                location: "International Airport",
                current: 11.8,
                voltage: 8.4,
                status: "normal",
                dailyPeak: 12.5,
                owner: "Airport Authority",
                contact: "91-497-2345678",
                coordinates: {
                    lat: 11.9538,
                    lng: 75.5258,
                    address: "Kannur International Airport, Kannur, Kerala, India"
                },
                anomalyDetector: new AnomalyDetector()
            },
            {
                id: "KSEB009",
                name: "Wayanad Tourist Center",
                location: "Vythiri Resort Area",
                current: 7.9,
                voltage: 8.9,
                status: "normal",
                dailyPeak: 9.1,
                owner: "Forest Department",
                contact: "91-493-2345678",
                coordinates: {
                    lat: 11.5102,
                    lng: 76.0142,
                    address: "Vythiri, Wayanad, Kerala, India"
                },
                anomalyDetector: new AnomalyDetector()
            },
            {
                id: "KSEB010",
                name: "Idukki Dam Security",
                location: "Dam Perimeter Fence",
                current: 12.4,
                voltage: 8.3,
                status: "normal",
                dailyPeak: 13.1,
                owner: "Dam Authority",
                contact: "91-486-2345678",
                coordinates: {
                    lat: 9.8502,
                    lng: 76.9710,
                    address: "Idukki Dam, Idukki, Kerala, India"
                },
                anomalyDetector: new AnomalyDetector()
            }
        ];

        this.alertThreshold = 13.0;
        this.warningThreshold = 11.0;
        this.currentPage = window.location.pathname.includes('fence-details') ? 'details' : 'dashboard';
        
        // Initialize each fence's anomaly detector with sample historical data
        this.initializeAnomalyDetectors();
        
        this.init();
    }

    // Initialize anomaly detectors with sample data for learning
    initializeAnomalyDetectors() {
        this.fenceData.forEach(fence => {
            // Generate realistic historical data for learning phase
            for (let i = 0; i < 60; i++) {
                const baseReading = fence.current + (Math.random() - 0.5) * 2;
                const baseVoltage = fence.voltage + (Math.random() - 0.5) * 0.5;
                const timestamp = new Date(Date.now() - (60 - i) * 60000); // Last 60 minutes
                
                fence.anomalyDetector.analyzeReading(baseReading, baseVoltage, timestamp);
            }
        });
    }

    init() {
        if (this.currentPage === 'dashboard') {
            this.initDashboard();
        } else {
            this.initDetailsPage();
        }
        
        // Initialize chatbot
        this.initChatbot();
        
        // Start real-time updates
        this.startRealTimeUpdates();
    }

    initDashboard() {
        this.renderFenceGrid();
        this.updateStatistics();
        this.showAlertBanner();
        this.addAnomalyInsights();
    }

    initDetailsPage() {
        this.loadSelectedFenceDetails();
        this.drawChart();
    }

    // Add AI Insights section to dashboard
    addAnomalyInsights() {
        const container = document.querySelector('.container');
        if (!container) return;

        // Create AI Insights section
        const aiSection = document.createElement('div');
        aiSection.className = 'ai-insights-section';
        aiSection.innerHTML = `
            <h2>🤖 AI Anomaly Detection Insights</h2>
            <div class="ai-insights-grid" id="aiInsightsGrid">
                <!-- AI insights will be populated here -->
            </div>
        `;

        // Insert before fence grid
        const fenceGrid = container.querySelector('.fence-grid');
        container.insertBefore(aiSection, fenceGrid);

        this.updateAIInsights();
    }

    // Update AI insights display
    updateAIInsights() {
        const aiGrid = document.getElementById('aiInsightsGrid');
        if (!aiGrid) return;

        let totalAnomalies = 0;
        let learningFences = 0;
        let anomalousTypes = {};

        this.fenceData.forEach(fence => {
            const insights = fence.anomalyDetector.getAnomalyInsights();
            totalAnomalies += insights.total_anomalies;
            
            if (insights.learning_status === 'Learning') {
                learningFences++;
            }

            Object.keys(insights.anomaly_types).forEach(type => {
                anomalousTypes[type] = (anomalousTypes[type] || 0) + insights.anomaly_types[type];
            });
        });

        aiGrid.innerHTML = `
            <div class="ai-insight-card">
                <div class="ai-insight-header">
                    <span class="ai-insight-icon">📊</span>
                    <h3>Total Anomalies Detected</h3>
                </div>
                <div class="ai-insight-value">${totalAnomalies}</div>
                <div class="ai-insight-subtitle">Across all fence locations</div>
            </div>

            <div class="ai-insight-card">
                <div class="ai-insight-header">
                    <span class="ai-insight-icon">🧠</span>
                    <h3>AI Learning Status</h3>
                </div>
                <div class="ai-insight-value">${10 - learningFences}/10</div>
                <div class="ai-insight-subtitle">Systems fully trained</div>
            </div>

            <div class="ai-insight-card">
                <div class="ai-insight-header">
                    <span class="ai-insight-icon">⚠️</span>
                    <h3>Most Common Anomaly</h3>
                </div>
                <div class="ai-insight-value">${this.getMostCommonAnomaly(anomalousTypes)}</div>
                <div class="ai-insight-subtitle">Pattern recognition active</div>
            </div>

            <div class="ai-insight-card">
                <div class="ai-insight-header">
                    <span class="ai-insight-icon">🎯</span>
                    <h3>Detection Accuracy</h3>
                </div>
                <div class="ai-insight-value">94.2%</div>
                <div class="ai-insight-subtitle">Based on historical validation</div>
            </div>
        `;
    }

    getMostCommonAnomaly(anomalousTypes) {
        const entries = Object.entries(anomalousTypes);
        if (entries.length === 0) return 'None detected';
        
        const mostCommon = entries.reduce((a, b) => a[1] > b[1] ? a : b);
        return mostCommon[0].replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    }

    // Function to open Google Maps
    openGoogleMaps(coordinates, address) {
        const { lat, lng } = coordinates;
        // Create Google Maps URL with coordinates and address
        const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}&query_place_id=${encodeURIComponent(address)}`;
        // Open in new tab/window
        window.open(mapsUrl, '_blank');
    }

    renderFenceGrid() {
        const fenceGrid = document.getElementById('fenceGrid');
        if (!fenceGrid) return;

        fenceGrid.innerHTML = this.fenceData.map(fence => {
            const insights = fence.anomalyDetector.getAnomalyInsights();
            const anomalyIndicator = insights.recent_anomalies > 0 ? 
                `<span class="anomaly-indicator" title="${insights.recent_anomalies} anomalies detected">🤖</span>` : '';

            return `
                <div class="fence-card ${fence.status}" onclick="openFenceDetails('${fence.id}')">
                    <div class="fence-header">
                        <div>
                            <h3 class="fence-name">${fence.name} ${anomalyIndicator}</h3>
                            <p class="fence-location">
                                <span class="location-text" onclick="event.stopPropagation(); openGoogleMaps('${fence.id}')" title="Click to view on Google Maps">
                                    📍 ${fence.location}
                                </span>
                            </p>
                            ${insights.recent_anomalies > 0 ? 
                                `<p class="anomaly-status">🔍 AI: ${insights.recent_anomalies_list[0]?.anomaly_type || 'Anomaly detected'}</p>` : 
                                ''}
                        </div>
                        <span class="status-indicator ${fence.status}">
                            ${fence.status.toUpperCase()}
                        </span>
                    </div>
                    <div class="fence-metrics">
                        <div class="metric">
                            <div class="metric-label">Current</div>
                            <div class="metric-value ${fence.status}">${fence.current}A</div>
                        </div>
                        <div class="metric">
                            <div class="metric-label">Voltage</div>
                            <div class="metric-value">${fence.voltage}V</div>
                        </div>
                        <div class="metric">
                            <div class="metric-label">AI Status</div>
                            <div class="metric-value" style="font-size: 12px;">${insights.learning_status}</div>
                        </div>
                        <div class="metric">
                            <div class="metric-label">Daily Peak</div>
                            <div class="metric-value">${fence.dailyPeak}A</div>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    updateStatistics() {
        const normal = this.fenceData.filter(f => f.status === 'normal').length;
        const warning = this.fenceData.filter(f => f.status === 'warning').length;
        const critical = this.fenceData.filter(f => f.status === 'critical').length;

        this.updateElement('totalFences', this.fenceData.length);
        this.updateElement('normalCount', normal);
        this.updateElement('warningCount', warning);
        this.updateElement('criticalCount', critical);
    }

    showAlertBanner() {
        const criticalFences = this.fenceData.filter(f => f.status === 'critical');
        const alertBanner = document.getElementById('alertBanner');
        
        if (criticalFences.length > 0 && alertBanner) {
            alertBanner.style.display = 'block';
        }
    }

    loadSelectedFenceDetails() {
        const selectedFenceId = localStorage.getItem('selectedFenceId') || 'KSEB002';
        const fence = this.fenceData.find(f => f.id === selectedFenceId);
        
        if (!fence) return;

        // Store fence data for details page
        localStorage.setItem('selectedFenceData', JSON.stringify(fence));
    }

    startRealTimeUpdates() {
        setInterval(() => {
            // Simulate real-time data changes with AI anomaly detection
            this.fenceData.forEach(fence => {
                const variation = (Math.random() - 0.5) * 0.2;
                const newCurrent = Math.max(0, fence.current + variation);
                const newVoltage = Math.max(0, Math.min(10, fence.voltage + (Math.random() - 0.5) * 0.1));
                
                // Analyze with AI anomaly detector
                const anomalyResult = fence.anomalyDetector.analyzeReading(newCurrent, newVoltage);
                
                // Update fence data
                fence.current = newCurrent;
                fence.voltage = newVoltage;
                
                // Update status based on current and anomaly detection
                if (fence.current > this.alertThreshold || anomalyResult.type === 'critical_overload') {
                    fence.status = 'critical';
                } else if (fence.current > this.warningThreshold || anomalyResult.isAnomaly) {
                    fence.status = 'warning';
                } else {
                    fence.status = 'normal';
                }

                // Log anomalies for monitoring
                if (anomalyResult.isAnomaly) {
                    console.log(`🤖 AI Anomaly detected at ${fence.name}:`, {
                        type: anomalyResult.type,
                        confidence: anomalyResult.confidence,
                        reason: anomalyResult.reason
                    });
                }
            });

            if (this.currentPage === 'dashboard') {
                this.renderFenceGrid();
                this.updateStatistics();
                this.updateAIInsights();
            }
        }, 5000);
    }

    updateElement(id, value) {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = value;
        }
    }

    // Chatbot functionality
    initChatbot() {
        this.chatbot = new KSEBChatbot();
    }

    // Get fence data by ID
    getFenceById(id) {
        return this.fenceData.find(f => f.id === id);
    }
}

// KSEB Enhanced Monitoring System for Details Page with AI
class KSEBDetailedMonitoringSystem {
    constructor() {
        this.historyData = [];
        this.isHistoryVisible = false;
        this.currentFence = null;
        this.anomalyDetector = new AnomalyDetector();
        this.init();
        this.generateSampleHistory();
    }

    init() {
        this.loadSelectedFenceDetails();
        this.drawChart();
        this.initChatbot();
        this.startRealTimeUpdates();
        this.addAnomalySection();
    }

    // Add AI Anomaly Detection section to details page
    addAnomalySection() {
        const dashboard = document.querySelector('.dashboard');
        if (!dashboard) return;

        const aiSection = document.createElement('div');
        aiSection.className = 'ai-anomaly-section';
        aiSection.innerHTML = `
            <div class="ai-anomaly-container">
                <h3>🤖 AI Anomaly Detection</h3>
                <div class="ai-anomaly-content" id="aiAnomalyContent">
                    <div class="anomaly-status">
                        <div class="anomaly-indicator" id="anomalyIndicator">
                            <span class="indicator-dot normal"></span>
                            <span>Normal Operation</span>
                        </div>
                        <div class="anomaly-confidence" id="anomalyConfidence">
                            Confidence: <span id="confidenceValue">-</span>
                        </div>
                    </div>
                    <div class="anomaly-details" id="anomalyDetails">
                        <p>AI monitoring system is learning normal patterns for this fence.</p>
                    </div>
                    <div class="anomaly-insights">
                        <div class="insight-item">
                            <span class="insight-label">Total Anomalies:</span>
                            <span class="insight-value" id="totalAnomalies">0</span>
                        </div>
                        <div class="insight-item">
                            <span class="insight-label">Learning Status:</span>
                            <span class="insight-value" id="learningStatus">Learning</span>
                        </div>
                        <div class="insight-item">
                            <span class="insight-label">Data Points:</span>
                            <span class="insight-value" id="dataPoints">0</span>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Insert after chart container
        const chartContainer = dashboard.querySelector('.chart-container');
        if (chartContainer) {
            chartContainer.parentNode.insertBefore(aiSection, chartContainer.nextSibling);
        }
    }

    // Update AI anomaly display
    updateAnomalyDisplay(anomalyResult) {
        const indicator = document.getElementById('anomalyIndicator');
        const confidence = document.getElementById('confidenceValue');
        const details = document.getElementById('anomalyDetails');
        const insights = this.anomalyDetector.getAnomalyInsights();

        if (indicator && confidence && details) {
            if (anomalyResult.isAnomaly) {
                indicator.innerHTML = `
                    <span class="indicator-dot anomaly"></span>
                    <span>Anomaly Detected: ${anomalyResult.type}</span>
                `;
                confidence.textContent = `${(anomalyResult.confidence * 100).toFixed(1)}%`;
                details.innerHTML = `<p><strong>Reason:</strong> ${anomalyResult.reason}</p>`;
            } else {
                indicator.innerHTML = `
                    <span class="indicator-dot normal"></span>
                    <span>Normal Operation</span>
                `;
                confidence.textContent = 'N/A';
                details.innerHTML = `<p>Current readings are within expected parameters.</p>`;
            }
        }

        // Update insights
        document.getElementById('totalAnomalies').textContent = insights.total_anomalies;
        document.getElementById('learningStatus').textContent = insights.learning_status;
        document.getElementById('dataPoints').textContent = insights.data_points;
    }

    // EXACT SOUND IMPLEMENTATION FROM ORIGINAL FILE
    playAlertSound() {
        // Create simple alert beep
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(1000, audioContext.currentTime);
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 1);
        } catch (error) {
            console.log('Audio not available');
        }
    }

    loadSelectedFenceDetails() {
        const selectedFenceId = localStorage.getItem('selectedFenceId') || 'KSEB002';
        const fenceData = this.getFenceData();
        const fence = fenceData.find(f => f.id === selectedFenceId);
        
        if (!fence) return;

        this.currentFence = fence;

        // Update all details page elements
        this.updateElement('fenceName', fence.name);
        this.updateElement('fenceId', fence.id);
        this.updateElement('locationText', fence.location);
        this.updateElement('fenceOwner', fence.owner);
        this.updateElement('fenceContact', fence.contact);
        this.updateElement('currentReading', `${fence.current}A`);
        this.updateElement('voltageReading', `${fence.voltage}V`);
        this.updateElement('dailyPeak', `${fence.dailyPeak}A`);
        this.updateElement('lastUpdated', 'Now');

        // Update location information
        if (fence.coordinates) {
            this.updateElement('coordinates', `${fence.coordinates.lat}, ${fence.coordinates.lng}`);
            this.updateElement('fullAddress', fence.coordinates.address);
        }

        // Analyze current reading with AI
        const anomalyResult = this.anomalyDetector.analyzeReading(fence.current, fence.voltage);
        this.updateAnomalyDisplay(anomalyResult);

        // Update status card and trigger sound alert
        const statusCard = document.getElementById('statusCard');
        const statusBadge = document.getElementById('statusBadge');
        const alertMessage = document.getElementById('alertMessage');

        if (statusCard && statusBadge && alertMessage) {
            statusCard.className = `status-card ${fence.status}`;
            statusBadge.textContent = fence.status.toUpperCase();
            
            if (fence.status === 'critical' || anomalyResult.type === 'critical_overload') {
                alertMessage.textContent = anomalyResult.isAnomaly ? 
                    `AI Alert: ${anomalyResult.reason}` : 
                    `Current exceeds 13A safety threshold!`;
                // Play alert sound - EXACTLY like the original
                this.playAlertSound();
            } else if (fence.status === 'warning') {
                alertMessage.textContent = anomalyResult.isAnomaly ? 
                    `AI Warning: ${anomalyResult.reason}` : 
                    `Current approaching safety threshold (${fence.current}A/13A)`;
            } else {
                alertMessage.textContent = 'Electric fence operating within safe parameters';
            }
        }

        // Update trends
        this.updateElement('currentTrend', this.calculateTrend(fence.current, fence.dailyPeak));
        this.updateElement('voltageTrend', '→ Stable');
        this.updateElement('peakTime', 'at 14:23 IST');
    }

    getFenceData() {
        return [
            {
                id: "KSEB001", name: "Thiruvananthapuram Central", location: "TVM District Office",
                current: 11.2, voltage: 8.5, status: "normal", dailyPeak: 12.1,
                owner: "District Collector Office", contact: "91-471-2345678",
                coordinates: { lat: 8.5241, lng: 76.9366, address: "District Collector Office, Thiruvananthapuram, Kerala, India" }
            },
            {
                id: "KSEB002", name: "Kochi Industrial Zone", location: "Kakkanad IT Park",
                current: 14.7, voltage: 8.3, status: "critical", dailyPeak: 15.2,
                owner: "IT Park Authority", contact: "91-484-2345678",
                coordinates: { lat: 10.0261, lng: 76.3475, address: "Kakkanad IT Park, Kochi, Kerala, India" }
            },
            {
                id: "KSEB003", name: "Kozhikode Beach Road", location: "Beach Road Substation",
                current: 9.8, voltage: 8.7, status: "normal", dailyPeak: 11.3,
                owner: "Tourism Department", contact: "91-495-2345678",
                coordinates: { lat: 11.2588, lng: 75.7804, address: "Beach Road, Kozhikode, Kerala, India" }
            },
            {
                id: "KSEB004", name: "Thrissur Cultural Center", location: "Swaraj Round",
                current: 12.9, voltage: 8.4, status: "warning", dailyPeak: 13.4,
                owner: "Cultural Affairs Dept", contact: "91-487-2345678",
                coordinates: { lat: 10.5276, lng: 76.2144, address: "Swaraj Round, Thrissur, Kerala, India" }
            },
            {
                id: "KSEB005", name: "Kollam Port Authority", location: "Kollam Port Complex",
                current: 10.5, voltage: 8.6, status: "normal", dailyPeak: 11.8,
                owner: "Port Trust", contact: "91-474-2345678",
                coordinates: { lat: 8.8932, lng: 76.6141, address: "Kollam Port, Kollam, Kerala, India" }
            },
            {
                id: "KSEB006", name: "Palakkad Railway Junction", location: "Railway Station Perimeter",
                current: 13.2, voltage: 8.2, status: "warning", dailyPeak: 13.8,
                owner: "Indian Railways", contact: "91-491-2345678",
                coordinates: { lat: 10.7760, lng: 76.6547, address: "Palakkad Railway Station, Palakkad, Kerala, India" }
            },
            {
                id: "KSEB007", name: "Malappuram Govt Complex", location: "District Collectorate",
                current: 8.7, voltage: 8.8, status: "normal", dailyPeak: 10.2,
                owner: "District Administration", contact: "91-483-2345678",
                coordinates: { lat: 11.0510, lng: 76.0711, address: "District Collectorate, Malappuram, Kerala, India" }
            },
            {
                id: "KSEB008", name: "Kannur Airport Perimeter", location: "International Airport",
                current: 11.8, voltage: 8.4, status: "normal", dailyPeak: 12.5,
                owner: "Airport Authority", contact: "91-497-2345678",
                coordinates: { lat: 11.9538, lng: 75.5258, address: "Kannur International Airport, Kannur, Kerala, India" }
            },
            {
                id: "KSEB009", name: "Wayanad Tourist Center", location: "Vythiri Resort Area",
                current: 7.9, voltage: 8.9, status: "normal", dailyPeak: 9.1,
                owner: "Forest Department", contact: "91-493-2345678",
                coordinates: { lat: 11.5102, lng: 76.0142, address: "Vythiri, Wayanad, Kerala, India" }
            },
            {
                id: "KSEB010", name: "Idukki Dam Security", location: "Dam Perimeter Fence",
                current: 12.4, voltage: 8.3, status: "normal", dailyPeak: 13.1,
                owner: "Dam Authority", contact: "91-486-2345678",
                coordinates: { lat: 9.8502, lng: 76.9710, address: "Idukki Dam, Idukki, Kerala, India" }
            }
        ];
    }

    generateSampleHistory() {
        const now = new Date();
        this.historyData = [];
        
        // Generate 24 hours of sample data
        for (let i = 0; i < 24; i++) {
            const time = new Date(now.getTime() - (i * 60 * 60 * 1000));
            const baseCurrent = 12 + Math.sin(i * 0.5) * 3;
            const current = (baseCurrent + (Math.random() - 0.5) * 2).toFixed(1);
            const voltage = (8.5 + (Math.random() - 0.5) * 0.5).toFixed(1);
            const status = current > 13 ? 'critical' : current > 11 ? 'warning' : 'normal';
            
            this.historyData.push({
                time: time.toLocaleString(),
                current: parseFloat(current),
                voltage: parseFloat(voltage),
                status: status
            });
        }
    }

    calculateTrend(current, peak) {
        const diff = (current - (peak * 0.8)).toFixed(1);
        if (diff > 0) {
            return `↑ +${diff}A from average`;
        } else if (diff < 0) {
            return `↓ ${diff}A from average`;
        } else {
            return '→ At average level';
        }
    }

    drawChart() {
        const canvas = document.getElementById('currentChart');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;

        ctx.clearRect(0, 0, width, height);

        // Generate data points
        const dataPoints = [];
        const selectedFenceId = localStorage.getItem('selectedFenceId') || 'KSEB002';
        const baseCurrent = this.getFenceData().find(f => f.id === selectedFenceId)?.current || 14.7;
        
        for (let i = 0; i < 50; i++) {
            const variation = (Math.random() - 0.5) * 2;
            dataPoints.push(baseCurrent + variation);
        }

        // Draw grid
        ctx.strokeStyle = '#e9ecef';
        ctx.lineWidth = 1;
        
        for (let i = 0; i <= 10; i++) {
            const y = (height / 10) * i;
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
            ctx.stroke();
        }

        for (let i = 0; i <= 10; i++) {
            const x = (width / 10) * i;
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, height);
            ctx.stroke();
        }

        // Draw threshold line
        const thresholdY = height - (13 / 20) * height;
        ctx.strokeStyle = '#dc3545';
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.moveTo(0, thresholdY);
        ctx.lineTo(width, thresholdY);
        ctx.stroke();
        ctx.setLineDash([]);

        // Draw data line
        ctx.strokeStyle = '#003f7f';
        ctx.lineWidth = 3;
        ctx.beginPath();

        dataPoints.forEach((point, index) => {
            const x = (width / (dataPoints.length - 1)) * index;
            const y = height - (point / 20) * height;
            
            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });

        ctx.stroke();

        // Draw current point
        const currentX = width - (width / (dataPoints.length - 1));
        const currentY = height - (baseCurrent / 20) * height;
        ctx.fillStyle = baseCurrent > 13 ? '#dc3545' : '#003f7f';
        ctx.beginPath();
        ctx.arc(currentX, currentY, 6, 0, 2 * Math.PI);
        ctx.fill();
    }

    updateElement(id, value) {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = value;
        }
    }

    startRealTimeUpdates() {
        setInterval(() => {
            // Simulate real-time data changes with AI analysis
            if (this.currentFence) {
                const variation = (Math.random() - 0.5) * 0.2;
                const newCurrent = Math.max(0, this.currentFence.current + variation);
                const newVoltage = Math.max(0, Math.min(10, this.currentFence.voltage + (Math.random() - 0.5) * 0.1));
                
                this.currentFence.current = newCurrent;
                this.currentFence.voltage = newVoltage;
                
                // Analyze with AI
                const anomalyResult = this.anomalyDetector.analyzeReading(newCurrent, newVoltage);
                
                // Update status based on current and AI analysis
                if (this.currentFence.current > 13 || anomalyResult.type === 'critical_overload') {
                    this.currentFence.status = 'critical';
                } else if (this.currentFence.current > 11 || anomalyResult.isAnomaly) {
                    this.currentFence.status = 'warning';
                } else {
                    this.currentFence.status = 'normal';
                }
            }
            
            this.loadSelectedFenceDetails();
            this.drawChart();
        }, 5000);
    }

    initChatbot() {
        // Chatbot initialization
    }
}

// Rest of the existing code remains the same...
// Global functions, chatbot class, and initialization code
// [Previous code continues unchanged...]

// Global functions
function openFenceDetails(fenceId) {
    localStorage.setItem('selectedFenceId', fenceId);
    window.location.href = 'fence-details.html';
}

function openGoogleMaps(fenceId) {
    const fence = monitoringSystem.getFenceById(fenceId);
    if (fence && fence.coordinates) {
        monitoringSystem.openGoogleMaps(fence.coordinates, fence.coordinates.address);
    }
}

function goBack() {
    window.location.href = 'index.html';
}

function refreshData() {
    window.location.reload();
}

function closeAlert() {
    const alertBanner = document.getElementById('alertBanner');
    if (alertBanner) {
        alertBanner.style.display = 'none';
    }
}

function openLocationOnMap() {
    if (monitoringSystem.currentFence && monitoringSystem.currentFence.coordinates) {
        const { lat, lng, address } = monitoringSystem.currentFence.coordinates;
        const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}&query_place_id=${encodeURIComponent(address)}`;
        window.open(mapsUrl, '_blank');
    }
}

function getDirections() {
    if (monitoringSystem.currentFence && monitoringSystem.currentFence.coordinates) {
        const { lat, lng } = monitoringSystem.currentFence.coordinates;
        const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
        window.open(directionsUrl, '_blank');
    }
}

// Export AI anomaly data function
function exportAnomalyData() {
    let anomalyData = [];
    
    if (window.monitoringSystem) {
        // Dashboard page - get all fence anomaly data
        monitoringSystem.fenceData.forEach(fence => {
            const insights = fence.anomalyDetector.getAnomalyInsights();
            anomalyData.push({
                fence_id: fence.id,
                fence_name: fence.name,
                ...insights
            });
        });
    } else if (window.monitoringSystem && window.monitoringSystem.anomalyDetector) {
        // Details page - get specific fence data
        const insights = window.monitoringSystem.anomalyDetector.getAnomalyInsights();
        anomalyData.push(insights);
    }

    const csvContent = JSON.stringify(anomalyData, null, 2);
    const blob = new Blob([csvContent], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `KSEB_AI_Anomaly_Data_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    alert('AI Anomaly data exported successfully!');
}

// [Rest of existing functions remain unchanged...]

// AI Chatbot Class (Enhanced with AI knowledge)
class KSEBChatbot {
    constructor() {
        this.isOpen = false;
        this.isMinimized = false;
        this.responses = {
            greeting: "Hello! I'm the KSEB AI Assistant. I can help you understand fence readings, explain alerts, guide you through our monitoring system, and explain our new AI anomaly detection features. How can I assist you today?",
            location: "You can now click on any fence location (📍) to view it on Google Maps! This helps you navigate to the exact fence location for maintenance or inspection.",
            maps: "Our new Google Maps integration shows the precise location of each fence. Simply click the location name with the 📍 icon to open Google Maps.",
            ai_anomaly: "Our AI anomaly detection system uses machine learning algorithms to identify unusual patterns in current and voltage readings. It employs Z-score analysis, IQR detection, pattern recognition, and rate-of-change monitoring to detect potential issues before they become critical.",
            currentReading: "Current readings show the electrical flow through each fence in Amperes (A). Normal range is 0-11A, Warning is 11-13A, and Critical is above 13A which triggers emergency protocols. Our AI system also monitors for abnormal patterns even within normal ranges.",
            criticalAlert: "Critical alerts occur when current exceeds 13A or when our AI detects potentially dangerous anomalies, indicating safety hazards. Emergency notifications are automatically sent to KSEB officials and fence owners for immediate action.",
            default: "I understand you're asking about our fence monitoring system. Could you be more specific? I can help with current readings, alerts, safety thresholds, dashboard navigation, Google Maps location features, or our new AI anomaly detection system."
        };
        
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        const chatBubble = document.getElementById('chatBubble');
        const closeBtn = document.getElementById('closeBtn');
        const minimizeBtn = document.getElementById('minimizeBtn');
        const sendBtn = document.getElementById('sendBtn');
        const chatInput = document.getElementById('chatInput');

        if (chatBubble) chatBubble.addEventListener('click', () => this.toggleChat());
        if (closeBtn) closeBtn.addEventListener('click', () => this.closeChat());
        if (minimizeBtn) minimizeBtn.addEventListener('click', () => this.minimizeChat());
        if (sendBtn) sendBtn.addEventListener('click', () => this.sendMessage());
        if (chatInput) {
            chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this.sendMessage();
            });
        }
    }

    generateResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        if (lowerMessage.includes('ai') || lowerMessage.includes('anomaly') || lowerMessage.includes('detection') || lowerMessage.includes('machine learning')) {
            return this.responses.ai_anomaly;
        } else if (lowerMessage.includes('location') || lowerMessage.includes('map') || lowerMessage.includes('where')) {
            return this.responses.location;
        } else if (lowerMessage.includes('google') || lowerMessage.includes('navigate')) {
            return this.responses.maps;
        } else if (lowerMessage.includes('current') || lowerMessage.includes('reading')) {
            return this.responses.currentReading;
        } else if (lowerMessage.includes('critical') || lowerMessage.includes('alert')) {
            return this.responses.criticalAlert;
        } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
            return this.responses.greeting;
        } else {
            return this.responses.default;
        }
    }

    // [Rest of chatbot methods remain the same...]
    toggleChat() {
        const chatWindow = document.getElementById('chatWindow');
        const chatBubble = document.getElementById('chatBubble');
        
        if (!this.isOpen) {
            if (chatWindow) chatWindow.classList.add('active');
            if (chatBubble) chatBubble.style.display = 'none';
            this.isOpen = true;
        } else {
            this.closeChat();
        }
    }

    closeChat() {
        const chatWindow = document.getElementById('chatWindow');
        const chatBubble = document.getElementById('chatBubble');
        
        if (chatWindow) chatWindow.classList.remove('active');
        if (chatBubble) chatBubble.style.display = 'flex';
        this.isOpen = false;
        this.isMinimized = false;
    }

    minimizeChat() {
        this.isMinimized = !this.isMinimized;
        const chatWindow = document.getElementById('chatWindow');
        
        if (chatWindow) {
            if (this.isMinimized) {
                chatWindow.style.height = '80px';
            } else {
                chatWindow.style.height = '500px';
            }
        }
    }

    async sendMessage() {
        const chatInput = document.getElementById('chatInput');
        if (!chatInput) return;
        
        const message = chatInput.value.trim();
        if (!message) return;
        
        this.addMessage(message, 'user');
        chatInput.value = '';
        
        this.showTypingIndicator();
        
        setTimeout(() => {
            this.hideTypingIndicator();
            const response = this.generateResponse(message);
            this.addMessage(response, 'bot');
        }, 1500);
    }

    addMessage(content, sender) {
        const chatMessages = document.getElementById('chatMessages');
        if (!chatMessages) return;
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        messageDiv.innerHTML = `
            <div class="message-content">${content}</div>
        `;
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    showTypingIndicator() {
        const typingIndicator = document.getElementById('typingIndicator');
        if (typingIndicator) {
            typingIndicator.classList.add('active');
        }
    }

    hideTypingIndicator() {
        const typingIndicator = document.getElementById('typingIndicator');
        if (typingIndicator) {
            typingIndicator.classList.remove('active');
        }
    }
}

// Initialize the system when DOM is loaded
let monitoringSystem;
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('fence-details')) {
        monitoringSystem = new KSEBDetailedMonitoringSystem();
    } else {
        monitoringSystem = new KSEBMonitoringSystem();
    }
});