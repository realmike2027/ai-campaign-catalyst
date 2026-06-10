// AI Generation Service
window.aiService = {
  // Generate campaign assets based on inputs
  async generateCampaign(productName, targetAudience, industry, tone) {
    const apiKey = localStorage.getItem("gemini_api_key");
    const selectedModel = localStorage.getItem("gemini_model") || "gemini-1.5-flash";

    // Simulate progress log callback (handled in UI)
    const logProgress = (msg) => {
      if (window.onGenerationProgress) {
        window.onGenerationProgress(msg);
      }
    };

    logProgress("Analysiere Produkteigenschaften und Zielgruppe...");
    await new Promise(r => setTimeout(r, 1200));

    logProgress("Bestimme optimalen Marketing-Tone-of-Voice...");
    await new Promise(r => setTimeout(r, 1000));

    if (apiKey) {
      logProgress(`Verbinde mit Gemini API (${selectedModel}) für Live-Asset-Generierung...`);
      try {
        const result = await this.callGeminiAPI(apiKey, selectedModel, productName, targetAudience, industry, tone, logProgress);
        logProgress("Assets erfolgreich live generiert!");
        return result;
      } catch (error) {
        console.error("Gemini API Error, falling back to smart templates:", error);
        logProgress("Live-Generierung fehlgeschlagen. Starte Smart-Template Fallback...");
        await new Promise(r => setTimeout(r, 1500));
        return this.generateFromTemplates(productName, targetAudience, industry, tone, logProgress);
      }
    } else {
      logProgress("Generiere Kampagnen-Assets aus lokalen Mustervorlagen...");
      await new Promise(r => setTimeout(r, 1500));
      return this.generateFromTemplates(productName, targetAudience, industry, tone, logProgress);
    }
  },

  // Calls the actual Gemini API
  async callGeminiAPI(apiKey, model, productName, targetAudience, industry, tone, logProgress) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
    
    const prompt = `Du bist ein professioneller Marketing-Katalysator. Erstelle ein komplettes deutsches Kampagnen-Paket für folgendes Produkt:
Produktname: "${productName}"
Zielgruppe: "${targetAudience}"
Branche: "${industry}"
Tonalität: "${tone}"

Generiere zeitgleich folgende Assets:
1. Eine kurze, aufmerksamkeitsstarke Überschrift (headline).
2. Einen überzeugenden Werbetext (adCopy, ca. 2-3 Sätze).
3. Eine dreiteilige E-Mail-Drip-Kampagne (emails) mit je einem Betreff (subject) und Textkörper (body).
   - E-Mail 1: Willkommen & Hook
   - E-Mail 2: Mehrwert & Social Proof / Vertrauen
   - E-Mail 3: Dringendes Angebot & Call to Action (CTA)
4. Zwei kreative, englischsprachige Bild-Prompts für Midjourney v6 (midjourneyPrompts), um passende Bannerbilder zu erstellen.
5. Ein komplettes 30-Sekunden LinkedIn-Videoskript (videoScript) aufgeteilt in Sekundenabschnitte, welches genaue Regieanweisungen/Kamera (REGIE), den gesprochenen Sprechertext (SPRECHERTEXT) und Audio-/Soundeffekt-Hinweise (SFX) enthält.

Gib AUSSCHLIESSLICH ein valides JSON-Objekt zurück. Verwende keine Markdown-Formatierung um das JSON herum (keine \`\`\`json oder ähnliches), sondern direkt das JSON. Die Struktur MUSS genau so aussehen:
{
  "headline": "...",
  "adCopy": "...",
  "emails": [
    {"subject": "Betreff 1", "body": "Inhalt 1"},
    {"subject": "Betreff 2", "body": "Inhalt 2"},
    {"subject": "Betreff 3", "body": "Inhalt 3"}
  ],
  "midjourneyPrompts": [
    "Midjourney Prompt 1...",
    "Midjourney Prompt 2..."
  ],
  "videoScript": {
    "title": "30-Sekunden LinkedIn Videoskript",
    "script": "[0:00 - 0:05] REGIE: ...\\nSFX: ...\\nSPRECHERTEXT: ...\\n\\n[0:05 - 0:15] REGIE: ...\\nSFX: ...\\nSPRECHERTEXT: ..."
  }
}`;

    logProgress("Sende Anfrage an Gemini...");
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          responseMimeType: "application/json",
          temperature: 0.7
        }
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Gemini API HTTP ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    logProgress("Verarbeite Antwort von Gemini...");
    
    // Parse the generated JSON content
    const responseText = data.candidates[0].content.parts[0].text;
    const parsedData = JSON.parse(responseText.trim());

    // Inject industry banner path if not generated
    parsedData.banner = `assets/${industry}_campaign.png`;
    
    return parsedData;
  },

  // offline template generator with dynamic placeholders
  async generateFromTemplates(productName, targetAudience, industry, tone, logProgress) {
    logProgress("Rufe Branchen-Templates ab...");
    const templateSource = window.mockData.industryTemplates[industry] || window.mockData.industryTemplates.tech;
    
    logProgress("Ersetze Platzhalter mit Ihren Eingaben...");
    
    // Helper function to replace product and audience names in text
    const replacePlaceholders = (text) => {
      if (!text) return "";
      return text
        .replace(/\[Product Name\]/g, productName)
        .replace(/\[Target Audience\]/g, targetAudience);
    };

    // Deep copy templates and apply replacement
    const generated = {
      banner: templateSource.banner,
      headline: replacePlaceholders(templateSource.headline),
      adCopy: replacePlaceholders(templateSource.adCopy),
      emails: templateSource.emails.map(email => ({
        subject: replacePlaceholders(email.subject),
        body: replacePlaceholders(email.body)
      })),
      midjourneyPrompts: templateSource.midjourneyPrompts.map(prompt => replacePlaceholders(prompt)),
      videoScript: {
        title: replacePlaceholders(templateSource.videoScript.title),
        script: replacePlaceholders(templateSource.videoScript.script)
      }
    };

    logProgress("Assets erfolgreich zusammengestellt!");
    return generated;
  }
};
