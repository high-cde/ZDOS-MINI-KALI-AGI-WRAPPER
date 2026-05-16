// parser.js
// Converte output tecnico (nmap, curl -I, whois, openssl) in JSON

class Parser {
    parseNmap(rawOutput) {
        const ports = [];
        const services = [];
        // Basic Nmap parsing for demonstration. Real parsing would be more complex.
        const portServiceRegex = /(\d+)\/tcp\s+open\s+(\S+)/g;
        let match;
        while ((match = portServiceRegex.exec(rawOutput)) !== null) {
            ports.push(parseInt(match[1]));
            services.push(match[2]);
        }
        return { ports, services };
    }

    parseCurlHeaders(rawOutput) {
        const headers = {};
        rawOutput.split("\n").forEach(line => {
            const parts = line.split(": ", 2);
            if (parts.length === 2) {
                headers[parts[0].toLowerCase()] = parts[1].trim();
            }
        });
        return headers;
    }

    parseWhois(rawOutput) {
        const whoisData = {};
        // Basic WHOIS parsing. Real parsing would be more complex.
        rawOutput.split("\n").forEach(line => {
            const parts = line.split(":", 2);
            if (parts.length === 2) {
                const key = parts[0].trim().replace(/\s+/g, ".").toLowerCase();
                whoisData[key] = parts[1].trim();
            }
        });
        return whoisData;
    }

    parseOpenssl(rawOutput) {
        const tlsData = {};
        // Basic OpenSSL parsing for TLS info. Real parsing would be more complex.
        const subjectRegex = /Subject:.*?CN\s*=\s*([^\/]+)/;
        const issuerRegex = /Issuer:.*?CN\s*=\s*([^\/]+)/;
        const validFromRegex = /Not Before:\s*(.*)/;
        const validToRegex = /Not After\s*:\s*(.*)/;

        let match;
        if ((match = rawOutput.match(subjectRegex))) {
            tlsData.subjectCN = match[1];
        }
        if ((match = rawOutput.match(issuerRegex))) {
            tlsData.issuerCN = match[1];
        }
        if ((match = rawOutput.match(validFromRegex))) {
            tlsData.validFrom = match[1];
        }
        if ((match = rawOutput.match(validToRegex))) {
            tlsData.validTo = match[1];
        }

        return tlsData;
    }

    // Generic parse method to dispatch to specific parsers
    parse(toolName, rawOutput) {
        switch (toolName) {
            case "nmap":
                return this.parseNmap(rawOutput);
            case "curl_headers":
                return this.parseCurlHeaders(rawOutput);
            case "whois":
                return this.parseWhois(rawOutput);
            case "openssl":
                return this.parseOpenssl(rawOutput);
            default:
                console.warn(`No parser found for tool: ${toolName}`);
                return { raw: rawOutput };
        }
    }
}

module.exports = Parser;
