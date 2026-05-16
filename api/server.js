// api/server.js
// API REST per l'orchestratore di cybersecurity

const express = require("express");
const AGIBrain = require("../core/agi-brain");
const Executor = require("../modules/executor");
const Parser = require("../modules/parser");
const Correlator = require("../modules/correlator");
const Osint = require("../modules/osint");
const OsintParser = require("../modules/osint-parser");
const OsintCorrelator = require("../modules/osint-correlator");
const SocialOsint = require("../modules/social-osint");
const SocialParser = require("../modules/social-parser");
const SocialCorrelator = require("../modules/social-correlator");
const DarkOsint = require("../modules/dark-osint");
const DarkParser = require("../modules/dark-parser");
const DarkCorrelator = require("../modules/dark-correlator");
const VisualOsint = require("../modules/visual-osint");
const VisualParser = require("../modules/visual-parser");
const VisualCorrelator = require("../modules/visual-correlator");
const MailDefense = require("../modules/mail-defense");
const MailParser = require("../modules/mail-parser");
const MailCorrelator = require("../modules/mail-correlator");
const CookieAudit = require("../modules/cookie-audit");
const CookieCorrelator = require("../modules/cookie-correlator");
const SEAwareness = require("../modules/se-awareness");
const AdvancedRecon = require("../modules/advanced-recon");
const NetworkSniffer = require("../modules/network-sniffer");
const ArpInspector = require("../modules/arp-inspector");
const DnsMonitor = require("../modules/dns-monitor");

const app = express();
const port = 3000;

app.use(express.json());

// Initialize modules
const executor = new Executor();
const parser = new Parser();
const correlator = new Correlator();
const osint = new Osint(executor);
const osintParser = new OsintParser();
const osintCorrelator = new OsintCorrelator();
const socialOsint = new SocialOsint();
const socialParser = new SocialParser();
const socialCorrelator = new SocialCorrelator();
const darkOsint = new DarkOsint();
const darkParser = new DarkParser();
const darkCorrelator = new DarkCorrelator();
const visualOsint = new VisualOsint();
const visualParser = new VisualParser();
const visualCorrelator = new VisualCorrelator();
const mailDefense = new MailDefense();
const mailParser = new MailParser();
const mailCorrelator = new MailCorrelator();
const cookieAudit = new CookieAudit();
const cookieCorrelator = new CookieCorrelator();
const seAwareness = new SEAwareness();
const advancedRecon = new AdvancedRecon(executor, parser);
const networkSniffer = new NetworkSniffer(executor, parser);
const arpInspector = new ArpInspector(executor, parser);
const dnsMonitor = new DnsMonitor(executor, parser);

// Initialize AGI Brain and register modules
const agiBrain = new AGIBrain();
agiBrain.registerModule("executor", executor);
agiBrain.registerModule("parser", parser);
agiBrain.registerModule("correlator", correlator);
agiBrain.registerModule("osint", osint);
agiBrain.registerModule("osint-parser", osintParser);
agiBrain.registerModule("osint-correlator", osintCorrelator);
agiBrain.registerModule("social-osint", socialOsint);
agiBrain.registerModule("social-parser", socialParser);
agiBrain.registerModule("social-correlator", socialCorrelator);
agiBrain.registerModule("dark-osint", darkOsint);
agiBrain.registerModule("dark-parser", darkParser);
agiBrain.registerModule("dark-correlator", darkCorrelator);
agiBrain.registerModule("visual-osint", visualOsint);
agiBrain.registerModule("visual-parser", visualParser);
agiBrain.registerModule("visual-correlator", visualCorrelator);
agiBrain.registerModule("mail-defense", mailDefense);
agiBrain.registerModule("mail-parser", mailParser);
agiBrain.registerModule("mail-correlator", mailCorrelator);
agiBrain.registerModule("cookie-audit", cookieAudit);
agiBrain.registerModule("cookie-correlator", cookieCorrelator);
agiBrain.registerModule("se-awareness", seAwareness);
agiBrain.registerModule("advanced-recon", advancedRecon);
agiBrain.registerModule("network-sniffer", networkSniffer);
agiBrain.registerModule("arp-inspector", arpInspector);
agiBrain.registerModule("dns-monitor", dnsMonitor);

// API Endpoints
app.post("/scan/basic", async (req, res) => {
    try {
        const { target } = req.body;
        if (!target) {
            return res.status(400).json({ error: "Target is required." });
        }
        const report = await agiBrain.orchestrate("scan/basic", { target });
        res.json(report);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post("/osint/full", async (req, res) => {
    try {
        const { domain, githubUser, email, imagePath, indicator } = req.body;
        if (!domain && !githubUser && !email && !imagePath && !indicator) {
            return res.status(400).json({ error: "At least one OSINT parameter (domain, githubUser, email, imagePath, indicator) is required." });
        }
        const report = await agiBrain.orchestrate("osint/full", { domain, githubUser, email, imagePath, indicator });
        res.json(report);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post("/mail/audit", async (req, res) => {
    try {
        const { emailContent } = req.body;
        if (!emailContent) {
            return res.status(400).json({ error: "Email content is required." });
        }
        const report = await agiBrain.orchestrate("mail/audit", { emailContent });
        res.json(report);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post("/cookie/audit", async (req, res) => {
    try {
        const { cookieJson } = req.body;
        if (!cookieJson) {
            return res.status(400).json({ error: "Cookie JSON is required." });
        }
        const report = await agiBrain.orchestrate("cookie/audit", { cookieJson });
        res.json(report);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post("/se/check", async (req, res) => {
    try {
        const { textContent } = req.body;
        if (!textContent) {
            return res.status(400).json({ error: "Text content is required." });
        }
        const report = await agiBrain.orchestrate("se/check", { textContent });
        res.json(report);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// New endpoints for advanced recon and sniffing
app.post("/recon/advanced", async (req, res) => {
    try {
        const { target, scanType } = req.body;
        if (!target) {
            return res.status(400).json({ error: "Target is required." });
        }
        const nmapResult = await advancedRecon.nmapScan(target, scanType);
        res.json(nmapResult);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post("/recon/banner", async (req, res) => {
    try {
        const { target, port } = req.body;
        if (!target || !port) {
            return res.status(400).json({ error: "Target and port are required." });
        }
        const banner = await advancedRecon.bannerGrabbing(target, port);
        res.json(banner);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post("/recon/ssl", async (req, res) => {
    try {
        const { target, port } = req.body;
        if (!target) {
            return res.status(400).json({ error: "Target is required." });
        }
        const sslInfo = await advancedRecon.sslAudit(target, port);
        res.json(sslInfo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post("/sniffer/capture", async (req, res) => {
    try {
        const { interfaceName, durationSeconds, filter } = req.body;
        if (!interfaceName) {
            return res.status(400).json({ error: "Interface name is required." });
        }
        const captureResult = await networkSniffer.captureTraffic(interfaceName, durationSeconds, filter);
        res.json(captureResult);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post("/sniffer/analyze-pcap", async (req, res) => {
    try {
        const { pcapFile, displayFilter } = req.body;
        if (!pcapFile) {
            return res.status(400).json({ error: "PCAP file path is required." });
        }
        const analysisResult = await networkSniffer.analyzePcap(pcapFile, displayFilter);
        res.json(analysisResult);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post("/sniffer/arp-monitor", async (req, res) => {
    try {
        const { interfaceName, durationSeconds } = req.body;
        if (!interfaceName) {
            return res.status(400).json({ error: "Interface name is required." });
        }
        const arpResult = await arpInspector.monitorArp(interfaceName, durationSeconds);
        res.json(arpResult);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post("/sniffer/analyze-arp-pcap", async (req, res) => {
    try {
        const { pcapFile } = req.body;
        if (!pcapFile) {
            return res.status(400).json({ error: "PCAP file path is required." });
        }
        const analysisResult = await arpInspector.analyzeArpPcap(pcapFile);
        res.json(analysisResult);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post("/sniffer/dns-monitor", async (req, res) => {
    try {
        const { interfaceName, durationSeconds } = req.body;
        if (!interfaceName) {
            return res.status(400).json({ error: "Interface name is required." });
        }
        const dnsResult = await dnsMonitor.monitorDns(interfaceName, durationSeconds);
        res.json(dnsResult);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post("/sniffer/analyze-dns-pcap", async (req, res) => {
    try {
        const { pcapFile } = req.body;
        if (!pcapFile) {
            return res.status(400).json({ error: "PCAP file path is required." });
        }
        const analysisResult = await dnsMonitor.analyzeDnsPcap(pcapFile);
        res.json(analysisResult);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get("/report/:id", async (req, res) => {
    // Placeholder for retrieving a generated report
    res.json({ message: `Report for ID ${req.params.id} (not yet implemented)` });
});

app.listen(port, () => {
    console.log(`ZDOS Mini-Kali AGI Wrapper API listening at http://localhost:${port}`);
});
