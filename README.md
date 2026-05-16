# ZDOS MINI-KALI AGI WRAPPER – Termux OMEGA-DEFENSE v3

ZDOS-MINI-KALI-AGI-WRAPPER è una piattaforma di cybersecurity d'élite, orchestrata da un motore AGI avanzato e progettata per l'ambiente Termux su Android. Trasforma il tuo dispositivo in un mini-SOC (Security Operations Center) portatile, capace di eseguire Threat Hunting, Attack Surface Mapping e Automated Hardening con precisione chirurgica.

## Goal del Progetto

Creare un sistema portatile che agisce come un mini-SOC (Security Operations Center) basato su AGI, capace di:

*   Utilizzare tool di cybersecurity reali come motore tecnico.
*   Wrappare e normalizzare l'output di questi tool.
*   Correlare dati da OSINT, Recon, Mail, Cookie, Social e Visual.
*   Generare analisi difensive, piani di hardening e briefing contro phishing e social engineering.

## Ambiente Target

*   **Sistema Operativo**: Termux su Android
*   **Linguaggi**: Node.js (preferito) + Python (per eventuali script di supporto)
*   **Tool Esterni Previsti (installati dall'utente)**:
    *   `nmap`, `curl`, `wget`, `openssl`, `whois`, `traceroute`, `dnsutils`
    *   `tcpdump`, `tshark` (per sniffing passivo)
    *   `dig` (per subdomain enumeration avanzata)
*   **Interfaccia**: Solo CLI + API REST (nessuna dipendenza da GUI).

## Architettura di Progetto

Il progetto è strutturato nei seguenti moduli e directory:

```
/ZDOS-MINI-KALI-AGI-WRAPPER
├── core
│   └── agi-brain.js        # Motore di reasoning AGI, orchestrazione dei moduli
├── modules
│   ├── executor.js         # Wrapper sicuro per comandi esterni
│   ├── parser.js           # Parser output tecnico (nmap, curl, whois, openssl) -> JSON
│   ├── correlator.js       # Correlazione Recon + TLS + WHOIS + DNS -> risk map
│   ├── threat-intelligence.js # Integrazione real-time con AbuseIPDB e OTX
│   ├── attack-surface-mapper.js # Subdomain enumeration e Cloud Bucket discovery
│   ├── remediation-engine.js # Generazione automatica di script di hardening
│   ├── reporting-engine.js   # Generazione report professionali in Markdown/PDF
│   │
│   ├── osint.js            # OSINT classico (whois, DNS, crt.sh, ipinfo, Wayback)
│   ├── osint-parser.js     # Normalizzazione OSINT -> JSON
│   ├── osint-correlator.js # Correlazione OSINT + Recon -> exposure score
│   │
│   ├── social-osint.js     # OSINT da fonti pubbliche (es. GitHub)
│   ├── social-parser.js    # Estrazione tech stack, repo pubblici, esposizione tecnica
│   ├── social-correlator.js# Correlazione social footprint + Recon -> rischio esposizione
│   │
│   ├── dark-osint.js       # Uso di feed pubblici / IOC / blacklist
│   ├── dark-parser.js      # Normalizzazione hit in blacklist / IOC / breach feed
│   ├── dark-correlator.js  # Rischio reputazionale / compromissione pregressa
│   │
│   ├── visual-osint.js     # Analisi EXIF di immagini fornite dall’utente
│   ├── visual-parser.js    # Estrazione device, timestamp, geotag
│   ├── visual-correlator.js# Correlazione geotag/timeline con resto OSINT -> leak posizione
│   │
│   ├── mail-defense.js     # Analisi email (header, SPF/DKIM/DMARC, link sospetti)
│   ├── mail-parser.js      # Normalizzazione header e indicatori phishing
│   ├── mail-correlator.js  # Rischio phishing + suggerimenti difensivi
│   │
│   ├── cookie-audit.js     # Analisi sicurezza cookie forniti dall’utente
│   ├── cookie-correlator.js# Rischio session hijacking teorico + raccomandazioni hardening
│   │
│   ├── se-awareness.js     # Analisi testi/messaggi/email per pattern di social engineering (solo difesa)
│   │
│   ├── advanced-recon.js   # Modulo per recon attivo avanzato (Nmap stealth, banner grabbing, SSL audit)
│   ├── network-sniffer.js  # Modulo per analisi del traffico di rete (passivo)
│   ├── arp-inspector.js    # Modulo per ARP inspection (passivo)
│   └── dns-monitor.js      # Modulo per DNS monitoring (passivo)
│
├── api
│   └── server.js           # API REST per l'interazione con i moduli
├── cli
│   └── zdos-mini           # Script CLI per Termux
├── INSTALL.md              # Istruzioni di installazione e avvio
└── README.md               # Questo file
```

## Funzionalità Chiave

Il sistema offre le seguenti funzionalità, raggruppate per modulo:

*   **`agi-brain.js`**: Il cuore del sistema, orchestra l'esecuzione dei moduli, correla i risultati e genera report completi, profili di minaccia, mappe della superficie di attacco, punteggi di esposizione, piani di difesa e checklist operative.

*   **`executor.js`**: Esegue comandi esterni in modo sicuro, sanitizzando l'input e gestendo i timeout. Supporta `nmap`, `curl`, `whois`, `openssl`, `tcpdump`, `tshark`.

*   **`parser.js`**: Converte l'output grezzo dei tool tecnici (Nmap, cURL, WHOIS, OpenSSL, TShark) in un formato JSON strutturato.

*   **`correlator.js`**: Correlazione avanzata dei dati di Recon, TLS, WHOIS e DNS per generare una mappa del rischio.

*   **Moduli OSINT (`osint*`)**:
    *   Raccolgono e normalizzano dati da fonti pubbliche come WHOIS, DNS, crt.sh, ipinfo, Wayback Machine.
    *   **`social-osint.js`**: Raccoglie OSINT da profili tecnici pubblici (es. GitHub).
    *   **`dark-osint.js`**: Utilizza feed pubblici di IOC (Indicatori di Compromissione) e blacklist per identificare rischi reputazionali o compromissioni pregresse.
    *   **`visual-osint.js`**: Analizza i metadati EXIF di immagini locali fornite dall'utente per estrarre informazioni come dispositivo, timestamp e geotag.

*   **Moduli di Difesa Specifici**:
    *   **`mail-defense.js`**: Analizza le email (header, SPF/DKIM/DMARC, link sospetti) per determinare la probabilità di phishing e fornire suggerimenti difensivi.
    *   **`cookie-audit.js`**: Valuta la sicurezza dei cookie forniti dall'utente (flag Secure, HttpOnly, SameSite, scope, durata) per identificare rischi di session hijacking.
    *   **`se-awareness.js`**: Analizza testi e messaggi per rilevare pattern di social engineering, fornendo consigli comportamentali (solo per difesa e training).

*   **Moduli Offensivi Legali (per scopi difensivi e di test)**:
    *   **`advanced-recon.js`**: Esegue scansioni Nmap avanzate (stealth, service detection, OS detection), banner grabbing e audit SSL/TLS per identificare vulnerabilità e configurazioni errate.

*   **Moduli di Sniffing (per analisi passiva del traffico)**:
    *   **`network-sniffer.js`**: Cattura e analizza il traffico di rete utilizzando `tcpdump` e `tshark`.
    *   **`arp-inspector.js`**: Monitora il traffico ARP per rilevare anomalie o potenziali attacchi ARP spoofing.
    *   **`dns-monitor.js`**: Monitora il traffico DNS per identificare query sospette o risoluzioni anomale.

## Constraint (Obbligatorie)

Il sistema è progettato per essere utilizzato in modo etico e legale. Pertanto, sono imposte le seguenti restrizioni:

*   **Nessun exploit attivo, nessun brute force, nessun attacco illegale.**
*   **Nessuna funzione di social engineering offensivo**, solo rilevamento e training difensivo.
*   **Nessun furto di cookie/sessioni**: il sistema analizza solo dati forniti volontariamente dall’utente.
*   Tutti i comandi esterni devono essere lanciati in modalità safe/read-only dove possibile.

## Come Iniziare

Per istruzioni dettagliate sull'installazione e l'avvio del progetto, consulta il file [`INSTALL.md`](./INSTALL.md).

## Contribuzione

Sentiti libero di contribuire al progetto. Per maggiori informazioni, consulta le linee guida di contribuzione (da definire).

## Licenza

Questo progetto è rilasciato sotto licenza MIT. Vedi il file `LICENSE` per maggiori dettagli.
