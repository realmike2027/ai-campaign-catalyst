// Initialisierung - stelle sicher, dass die Mermaid-Bibliothek geladen ist
mermaid.initialize({ startOnLoad: false, theme: 'dark', logLevel: 'error' });

const campaignData = {
    crisis: {
        mermaid: `graph LR
A[Woche 1: Audit] --> B[Woche 2: Cloud-Backup]
B --> C[Woche 3: Resilienz-Test]
C --> D[Woche 4: Rollout]`,
        emails: "📧 E-Mail 1 (Alarm): Dringender Handlungsbedarf bei Ihrer IT-Infrastruktur.\n📧 E-Mail 2 (Lösung): Wie wir Ausfallzeiten um 99% reduzieren.\n📧 E-Mail 3 (Angebot): Kostenloses Notfall-Audit sichern.",
        prompts: "🎨 Prompt 1: a dark server room with red glowing warning lights, cinematic lighting, 8k --ar 16:9\n🎨 Prompt 2: an IT technician looking stressed at multiple screens, neon colors, cyberpunk style --v 6.0",
        video: "🎬 [0:00 - 0:05] (Kamera zoomt auf Sprecher): 'Ihre Server sind down und die Produktion steht still?'\n🎬 [0:05 - 0:15] (Text-Overlay: 10k€ Verlust pro Stunde): 'Jede Minute kostet richtig Geld. Wir haben die Lösung.'\n🎬 [0:15 - 0:30] (CTA): 'Klicken Sie auf den Link für eine kostenlose Erstanalyse.'"
    },
    money: {
        mermaid: `graph LR
A[Woche 1: Budget-Plan] --> B[Woche 2: Modernisierung]
B --> C[Woche 3: Schulung]
C --> D[Woche 4: ROI-Analyse]`,
        emails: "📧 E-Mail 1 (Vision): Nutzen Sie Ihr neues Budget für maximale Skalierung.\n📧 E-Mail 2 (Beweis): So generierte Kunde X 300% ROI.\n📧 E-Mail 3 (Angebot): Strategiegespräch buchen.",
        prompts: "🎨 Prompt 1: a futuristic bright office space, glowing holograms of upward charts, success, 8k --ar 16:9\n🎨 Prompt 2: a sleek golden coin flipping in slow motion, macro photography, depth of field --v 6.0",
        video: "🎬 [0:00 - 0:05] (Sprecher lächelt): 'Das Budget ist freigegeben, aber wie investieren Sie es richtig?'\n🎬 [0:05 - 0:15] (B-Roll von wachsenden Graphen): 'Wir maximieren den ROI Ihrer Digitalisierungsprojekte.'\n🎬 [0:15 - 0:30] (CTA): 'Lassen Sie uns sprechen.'"
    },
    expansion: {
        mermaid: `graph LR
A[Woche 1: HR-Analyse] --> B[Woche 2: Onboarding]
B --> C[Woche 3: Cloud-Setup]
C --> D[Woche 4: Integration]`,
        emails: "📧 E-Mail 1 (Wachstum): Bereit für 50 neue Mitarbeiter? So klappt das IT-Onboarding.\n📧 E-Mail 2 (Effizienz): Skalierbare Cloud-Lösungen für schnell wachsende Teams.\n📧 E-Mail 3 (Angebot): Demo unseres Setup-Prozesses.",
        prompts: "🎨 Prompt 1: diverse team of professionals walking confidently in a modern glass building, bright sunlight --ar 16:9\n🎨 Prompt 2: abstract geometric shapes expanding outwards, representing growth and scale, minimalist --v 6.0",
        video: "🎬 [0:00 - 0:05] (Schneller Schnitt): 'Das Team wächst, aber die IT-Prozesse hängen hinterher?'\n🎬 [0:05 - 0:15] (Split-Screen: Vorher/Nachher): 'Wir automatisieren Ihr Onboarding für maximale Skalierbarkeit.'\n🎬 [0:15 - 0:30] (CTA): 'Jetzt Demo anfordern.'"
    }
};

const triggerSelect = document.getElementById('triggerSelect');
const parentContainer = document.getElementById('mermaidContainer') ? document.getElementById('mermaidContainer').parentElement : null;

if (triggerSelect && parentContainer) {
    triggerSelect.addEventListener('change', (e) => {
        const selected = campaignData[e.target.value];

        // Alten Container komplett löschen und neu jungfräulich erstellen
        let oldContainer = document.getElementById('mermaidContainer');
        if (oldContainer) oldContainer.remove();

        let newContainer = document.createElement('div');
        newContainer.id = 'mermaidContainer';
        newContainer.className = 'mermaid w-full text-center flex justify-center';

        // Textbereinigung par excellence
        const cleanSyntax = selected.mermaid.split('\n').map(line => line.trim()).join('\n');
        newContainer.textContent = cleanSyntax;

        parentContainer.appendChild(newContainer);

        // Explizit rendern
        try {
            mermaid.init(undefined, newContainer);
        } catch (err) {
            console.error("Mermaid Render Error:", err);
        }

        // Zeige einen Lade-Indikator, während die Gemini-API antwortet
        const emailContent = document.getElementById('emailContent');
        const imagePrompts = document.getElementById('imagePrompts');
        const videoScript = document.getElementById('videoScript');

        if (emailContent) emailContent.textContent = "Lade E-Mails über Gemini / Vertex AI MCP-Kopplung...";
        if (imagePrompts) imagePrompts.textContent = "Erstelle hochspezifische Midjourney Prompts...";
        if (videoScript) videoScript.textContent = "Generiere LinkedIn Video-Skript...";

        // Asynchroner Aufruf an die MCP-Anbindung / das lokale Backend
        fetchGeminiAssets(e.target.value, selected);
    });
}

// Funktion für den dynamischen Aufruf der Gemini-API (Vertex AI) via MCP-Anbindung
async function fetchGeminiAssets(triggerMode, fallbackData) {
    const systemPrompt = `Du bist ein B2B Marketing Architekt. Erstelle strukturierten Content für das Szenario: '${triggerMode}'. 
Antworte AUSSCHLIESSLICH im JSON-Format mit exakt folgenden Schlüsseln: "emails" (String für die Drip-Kampagne), "prompts" (String für Bildgenerierung), "video" (String für das 30s Skript). Keinen weiteren Text ausgeben!`;

    try {
        // Wir nutzen den lokalen /api/gemini Endpoint, der als Proxy zur MCP-Anbindung dient
        const response = await fetch('/api/gemini', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                prompt: systemPrompt, 
                mode: triggerMode 
            })
        });

        if (!response.ok) {
            throw new Error(`MCP-Verbindungsfehler: ${response.status}`);
        }

        // Das Backend muss den strukturierten JSON-Content exakt nach Schema zurückgeben
        const data = await response.json();

        // Dynamische Injektion in die Tailwind CSS Ausgabebereiche
        const emailContent = document.getElementById('emailContent');
        const imagePrompts = document.getElementById('imagePrompts');
        const videoScript = document.getElementById('videoScript');

        if (emailContent) emailContent.textContent = data.emails;
        if (imagePrompts) imagePrompts.textContent = data.prompts;
        if (videoScript) videoScript.textContent = data.video;

        console.log("Live-Generierung über Gemini erfolgreich abgeschlossen!");

    } catch (error) {
        console.warn("API konnte nicht erreicht werden. Falle auf statisches Fallback zurück.", error);
        
        // Fallback, falls der MCP-Proxy noch nicht läuft
        const emailContent = document.getElementById('emailContent');
        const imagePrompts = document.getElementById('imagePrompts');
        const videoScript = document.getElementById('videoScript');

        if (emailContent) emailContent.textContent = fallbackData.emails;
        if (imagePrompts) imagePrompts.textContent = fallbackData.prompts;
        if (videoScript) videoScript.textContent = fallbackData.video;
    }
}

// Funktion, um den State global zu setzen und das Dashboard sofort umschalten zu lassen
function setGlobalApplicationState(mode) {
    if (triggerSelect) {
        triggerSelect.value = mode;
        triggerSelect.dispatchEvent(new Event('change'));
    }
}

// Parser Funktion für trigger-events.json
async function loadTriggerEvents() {
    try {
        // Cache-Busting: Verhindert, dass der Browser alte JSON-Stände aus dem Cache lädt
        const response = await fetch('trigger-events.json?t=' + new Date().getTime());
        if (!response.ok) throw new Error('Netzwerk-Antwort war nicht ok');
        const data = await response.json();
        
        const triggerMap = {
            "CONVERSION_RATE_ALARM": "crisis",
            "COMPETITOR_PRICE_SHOCK": "money",
            "HYPER_GROWTH_EXPANSION": "expansion"
        };

        const targetState = triggerMap[data.activeTrigger];

        if (targetState) {
            console.log(`Trigger '${data.activeTrigger}' detektiert! Aktiviere Modus: ${targetState}`);
            setGlobalApplicationState(targetState);
        } else {
            console.warn(`Unbekannter Trigger: ${data.activeTrigger}`);
            setGlobalApplicationState('crisis'); // Default Fallback
        }
    } catch (error) {
        console.error('Fehler beim Laden von trigger-events.json. (Läuft das Projekt lokal ohne Server?):', error);
        // Falls wir wegen CORS (file://) nicht lesen können, testen wir direkt den Expansion-Fallback
        setGlobalApplicationState('expansion'); // Default Fallback für Testzwecke
    }
}

// ROI Kalkulator Logik
function calculateROI() {
    const costInput = document.getElementById('roiCost');
    const revenueInput = document.getElementById('roiRevenue');
    const boostInput = document.getElementById('roiBoost');
    const resultElement = document.getElementById('roiResult');

    if (!costInput || !revenueInput || !boostInput || !resultElement) return;

    const cost = parseFloat(costInput.value) || 0;
    const revenue = parseFloat(revenueInput.value) || 0;
    const boost = parseFloat(boostInput.value) || 0;

    if (cost <= 0) {
        resultElement.textContent = "0%";
        resultElement.className = "text-xl font-bold text-slate-500";
        return;
    }

    const additionalRevenue = revenue * (boost / 100);
    const netProfit = additionalRevenue - cost;
    const roi = (netProfit / cost) * 100;

    const formattedROI = roi.toFixed(1);
    
    if (roi > 0) {
        resultElement.textContent = `+ ${formattedROI}%`;
        resultElement.className = "text-xl font-bold text-emerald-400";
    } else if (roi < 0) {
        resultElement.textContent = `${formattedROI}%`;
        resultElement.className = "text-xl font-bold text-red-400";
    } else {
        resultElement.textContent = `0%`;
        resultElement.className = "text-xl font-bold text-slate-400";
    }
}

// Copy-to-Clipboard API Funktion
window.copyText = async function(elementId) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    const textToCopy = element.textContent || element.innerText;
    
    try {
        await navigator.clipboard.writeText(textToCopy);
        
        // Toast Notification anzeigen
        const toast = document.getElementById('toast');
        if (toast) {
            toast.style.opacity = '1';
            toast.style.transform = 'translateY(0)';
            
            setTimeout(() => {
                toast.style.opacity = '0';
                toast.style.transform = 'translateY(20px)';
            }, 3000);
        }
    } catch (err) {
        console.error('Fehler beim Kopieren in die Zwischenablage:', err);
    }
}

// Lade die Events und initialisiere UI nach dem Start
document.addEventListener('DOMContentLoaded', () => {
    // Event-Listener für den ROI Kalkulator
    ['roiCost', 'roiRevenue', 'roiBoost'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('input', calculateROI);
    });
    // Initiale ROI-Berechnung
    calculateROI();

    loadTriggerEvents();
});