// Initialisierung - stelle sicher, dass die Mermaid-Bibliothek geladen ist
mermaid.initialize({ startOnLoad: false, theme: 'dark', logLevel: 'error' });

const campaignData = {
    crisis: {
        mermaid: `graph LR
A[Woche 1: Audit] --> B[Woche 2: Cloud-Backup]
B --> C[Woche 3: Resilienz-Test]
C --> D[Woche 4: Rollout]`,
        content: "Krisen-Modus aktiv: Dringlich & Lösungsorientiert."
    },
    money: {
        mermaid: `graph LR
A[Woche 1: Budget-Plan] --> B[Woche 2: Modernisierung]
B --> C[Woche 3: Schulung]
C --> D[Woche 4: ROI-Analyse]`,
        content: "Investitions-Modus aktiv: Visionär & Wachstumsorientiert."
    },
    expansion: {
        mermaid: `graph LR
A[Woche 1: HR-Analyse] --> B[Woche 2: Onboarding]
B --> C[Woche 3: Cloud-Setup]
C --> D[Woche 4: Integration]`,
        content: "Expansions-Modus aktiv: Effizienz & Skalierbarkeit."
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

        // Content-Karten für E-Mails, Prompts & Skripte mit den passenden Inhalten befüllen...
    });
}

// Parser Funktion für trigger-events.json
async function loadTriggerEvents() {
    try {
        const response = await fetch('trigger-events.json');
        if (!response.ok) throw new Error('Netzwerk-Antwort war nicht ok');
        const data = await response.json();
        
        if (data.activeTrigger === "CONVERSION_RATE_ALARM") {
            console.log("CONVERSION_RATE_ALARM detektiert! Aktiviere Krisen-Modus...");
            if (triggerSelect) {
                triggerSelect.value = "crisis";
                // Löst das 'change' Event aus, damit das Dashboard sofort reagiert
                triggerSelect.dispatchEvent(new Event('change'));
            }
        }
    } catch (error) {
        console.error('Fehler beim Laden von trigger-events.json:', error);
    }
}

// Lade die Events initial nach dem Start
document.addEventListener('DOMContentLoaded', loadTriggerEvents);