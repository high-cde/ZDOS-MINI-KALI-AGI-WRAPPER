// autonomous-monitor.js
// Modulo per il monitoraggio continuo (Daemon Mode)

class AutonomousMonitor {
    constructor(agiBrain, interval = 3600000) { // Default to 1 hour (3600000 ms)
        this.agiBrain = agiBrain;
        this.interval = interval;
        this.monitoringActive = false;
        this.monitorIntervalId = null;
    }

    async startMonitoring(target) {
        if (this.monitoringActive) {
            console.log("Monitoring is already active.");
            return { status: "already_active" };
        }

        this.monitoringActive = true;
        console.log(`Starting autonomous monitoring for ${target} every ${this.interval / 1000} seconds.`);

        const runScan = async () => {
            console.log(`Running scheduled scan for ${target}...`);
            try {
                const report = await this.agiBrain.orchestrate("scan/advanced", { target });
                console.log(`Scheduled scan for ${target} completed. Report ID: ${report.id}`);
                // Further actions based on report (e.g., send notification if high risk)
            } catch (error) {
                console.error(`Error during scheduled scan for ${target}: ${error.message}`);
            }
        };

        // Run immediately and then at intervals
        runScan();
        this.monitorIntervalId = setInterval(runScan, this.interval);

        return { status: "monitoring_started", target: target, interval: this.interval };
    }

    stopMonitoring() {
        if (!this.monitoringActive) {
            console.log("Monitoring is not active.");
            return { status: "not_active" };
        }

        clearInterval(this.monitorIntervalId);
        this.monitoringActive = false;
        console.log("Autonomous monitoring stopped.");
        return { status: "monitoring_stopped" };
    }

    getStatus() {
        return { active: this.monitoringActive, interval: this.interval };
    }
}

module.exports = AutonomousMonitor;
