// CRM & AI Campaign Catalyst Mock Data
window.mockData = {
  // Pre-configured campaigns
  initialCampaigns: [
    {
      id: "camp-1",
      name: "SynergyDrive Launch",
      productName: "SynergyDrive AI",
      targetAudience: "B2B Tech Leaders & Project Managers",
      industry: "tech",
      tone: "professional",
      status: "Active",
      leadsCount: 5,
      revenue: 12500,
      conversion: 24,
      dateCreated: "2026-05-15",
      assets: {
        headline: "Supercharge Your B2B Workflows with SynergyDrive AI",
        adCopy: "Stop wasting hours coordinating tasks. SynergyDrive AI automates your project mapping, tracks progress in real-time, and predicts bottlenecks before they happen. Integrate with Slack, Teams, and Jira in one click.",
        emails: [
          {
            subject: "🚀 Automation is no longer optional, [Target Audience]",
            body: "Hi there,\n\nIn the B2B tech space, speed is everything. Yet, project managers spend over 40% of their day on administrative overhead rather than strategic work.\n\nMeet [Product Name]. We help tech leaders automate project tracking, sync teams seamlessly, and deliver results 30% faster.\n\nAre you ready to eliminate manual status updates?\n\nBest,\nThe [Product Name] Team"
          },
          {
            subject: "📊 Case Study: How TechCorp saved 20+ hours weekly",
            body: "Hey [Target Audience],\n\nWhat could your team do with an extra 20 hours a week?\n\nTechCorp was struggling with fragmented workflows and missed sprint deadlines. By implementing [Product Name], they achieved:\n- 35% reduction in meeting times\n- 100% project visibility for stakeholders\n- Zero missed deadlines over 3 months\n\nRead the full success story and see how your team can replicate their results.\n\nCheers,\nThe [Product Name] Team"
          },
          {
            subject: "🎁 Exclusive Trial: Try [Product Name] Free for 14 Days",
            body: "Hello,\n\nWe know choosing a new workflow tool is a commitment. That's why we want to make it risk-free.\n\nGet full access to [Product Name] for 14 days. Set up your first workspace in 5 minutes and see the immediate efficiency boost.\n\nClaim your free trial now: [Link]\n\nRegards,\nThe [Product Name] Team"
          }
        ],
        midjourneyPrompts: [
          "A sleek modern office workspace with holographic translucent project charts glowing in mid-air, product managers interacting with a minimalist digital interface, corporate neon purple and cyan lighting, futuristic business, photorealistic, 8k resolution, --ar 16:9",
          "An abstract visual representation of data streams converging into a perfectly organized glowing crystal structure, symbol of workflow automation and efficiency, modern tech aesthetic, ultra-detailed, octane render, 3d illustration, --ar 16:9"
        ],
        videoScript: {
          title: "30-Second LinkedIn Ad Script",
          script: "[0:00 - 0:05] REGIE: Zoom in on a stressed project manager staring at a wall of sticky notes. Dull, low-contrast lighting.\nSFX: Low ticking clock sound, sigh of frustration.\nSPRECHERTEXT: Sie verwalten Ihre B2B-Projekte immer noch manuell? Das ständige Chaos kostet Sie wertvolle Zeit.\n\n[0:05 - 0:15] REGIE: Smash cut to a bright, modern interface glowing on a screen. The manager smiles. Vibrant neon colors.\nSFX: Satisfying 'whoosh' and upbeat electronic synth music fades in.\nSPRECHERTEXT: Entdecken Sie [Product Name]. Die smarte KI, die Ihre Arbeitsabläufe automatisiert und Teams synchronisiert.\n\n[0:15 - 0:25] REGIE: Fast transition showing dynamic 3D dashboards displaying progress bars hitting 100% and team collaboration avatars lighting up.\nSFX: Quick positive notifications chiming.\nSPRECHERTEXT: Steigern Sie Ihre Effizienz um 30 % und liefern Sie Projekte pünktlich ab - ohne Stress.\n\n[0:25 - 0:30] REGIE: Transition to a clean logo screen of [Product Name] with a bold 'Jetzt kostenlos testen' Button.\nSFX: Upbeat ending chord.\nSPRECHERTEXT: Besuchen Sie unsere Website und starten Sie heute Ihre kostenlose 14-tägige Testversion!"
        }
      }
    },
    {
      id: "camp-2",
      name: "Aura Summer Apparel",
      productName: "Aura Linen Collection",
      targetAudience: "Eco-Conscious Fashion Enthusiasts",
      industry: "fashion",
      tone: "bold",
      status: "Active",
      leadsCount: 12,
      revenue: 8400,
      conversion: 18,
      dateCreated: "2026-05-28",
      assets: {
        headline: "Breathe Free in Sustainable Luxury with Aura Linen",
        adCopy: "Fashion shouldn't cost the Earth. The Aura Summer Linen Collection is handcrafted from 100% certified organic flax, offering breezy comfort and timeless cuts. Designed to last, made to love. Experience sustainable elegance today.",
        emails: [
          {
            subject: "🌿 Summer is here. Is your wardrobe ready, [Target Audience]?",
            body: "Hi there,\n\nAs the temperatures rise, it's time to choose clothing that is light on your skin and light on the planet.\n\nIntroducing [Product Name]. Handcrafted from organic linen, our garments are breathable, durable, and 100% biodegradable.\n\nElevate your summer style sustainably.\n\nWarmly,\n[Product Name] Team"
          },
          {
            subject: "✨ Crafted for Comfort: The story behind [Product Name]",
            body: "Hello [Target Audience],\n\nWe believe in slow fashion. Every piece in our [Product Name] collection is ethically made by local artisans using organic flax fibers.\n\nNo harsh dyes, no plastic packaging, and fair wages for all creators. This is fashion you can feel truly good about wearing.\n\nDiscover the craftsmanship: [Link]\n\nBest,\n[Product Name] Team"
          },
          {
            subject: "⏰ Limited Offer: 15% Off Your First Sustainable Purchase",
            body: "Hi fashion lover,\n\nReady to make a change? Join the sustainable movement today and get 15% off your first order of the [Product Name] collection.\n\nUse code: ECOSUMMER at checkout.\n\nShop sustainable luxury: [Link]\n\nYours,\n[Product Name] Team"
          }
        ],
        midjourneyPrompts: [
          "An elegant woman in a flowing beige linen outfit walking on a sunlit beach during golden hour, soft cinematic lighting, organic textures, natural look, editorial fashion photography, high-end style, --ar 16:9",
          "A close-up studio shot showing the rich woven texture of organic linen fabric, draped beautifully over a neutral clay pedestal, warm natural sunlight and soft shadows, minimalist aesthetic, high-end, --ar 16:9"
        ],
        videoScript: {
          title: "30-Second LinkedIn Ad Script",
          script: "[0:00 - 0:05] REGIE: Close-up of synthetic fabric stretching and sweating under hot sun. Dull color grading.\nSFX: Low buzzing heat distortion, heavy sigh.\nSPRECHERTEXT: Haben Sie genug von unbequemer, synthetischer Kleidung im Sommer? Ihre Haut verdient Besseres.\n\n[0:05 - 0:15] REGIE: Dynamic transition to a bright outdoor setting. A model walks through wildflowers, wearing light, organic linen clothing. Warm, golden sunlight.\nSFX: Gentle wind rustling, uplifting folk guitar music fades in.\nSPRECHERTEXT: Entdecken Sie die neue [Product Name] Kollektion. 100 % biologisches Leinen, das Ihre Haut atmen lässt.\n\n[0:15 - 0:25] REGIE: Multi-split screen showing detail shots of premium handmade sewing and natural dye textures.\nSFX: Soft linen fabric rustling, pleasant bell ring.\nSPRECHERTEXT: Nachhaltig hergestellt, zeitlos im Design und unvergleichlich weich. Tragen Sie Kleidung mit gutem Gewissen.\n\n[0:25 - 0:30] REGIE: Clean logo display of [Product Name] with the coupon code 'ECOSUMMER' visible.\nSFX: Harmonious acoustic ending chord.\nSPRECHERTEXT: Sichern Sie sich jetzt 15 % Rabatt auf Ihren ersten Einkauf. Besuchen Sie uns online!"
        }
      }
    }
  ],

  // Initial CRM Leads
  initialLeads: [
    {
      id: "lead-1",
      name: "Marcus Vance",
      company: "Apex Tech Solutions",
      email: "marcus@apextech.com",
      phone: "+49 172 883719",
      value: 4500,
      stage: "new",
      campaignId: "camp-1",
      campaignName: "SynergyDrive Launch",
      notes: "Met at TechExpo. Interested in automatic scheduling APIs. Follow up with case study.",
      interactions: [
        { date: "2026-06-02", type: "Email Sent", note: "Sent initial introductory email for SynergyDrive AI." },
        { date: "2026-06-05", type: "Meeting", note: "Short call. Expressed interest in B2B onboarding." }
      ]
    },
    {
      id: "lead-2",
      name: "Sophia Lorenz",
      company: "Moda Verde Group",
      email: "s.lorenz@modaverde.de",
      phone: "+49 30 928371",
      value: 6200,
      stage: "contacted",
      campaignId: "camp-2",
      campaignName: "Aura Summer Apparel",
      notes: "Emailed looking for eco-friendly bulk orders for corporate summer gifting.",
      interactions: [
        { date: "2026-06-03", type: "Incoming Inquiry", note: "Requested pricing for 100 linen shirts." },
        { date: "2026-06-04", type: "Email Sent", note: "Sent catalog and requested consultation call." }
      ]
    },
    {
      id: "lead-3",
      name: "Christian Beck",
      company: "InnoSoft GmbH",
      email: "c.beck@innosoft.at",
      phone: "+43 664 82719",
      value: 8500,
      stage: "proposal",
      campaignId: "camp-1",
      campaignName: "SynergyDrive Launch",
      notes: "Proposal sent on June 4th. Customer is evaluating budget constraints.",
      interactions: [
        { date: "2026-05-30", type: "Call", note: "Discussed customization requirements for enterprise API." },
        { date: "2026-06-04", type: "Proposal Sent", note: "Sent tailored proposal for 50 licenses." }
      ]
    },
    {
      id: "lead-4",
      name: "Elena Rostova",
      company: "Velvet Fashion Hub",
      email: "elena@velvetfashion.nl",
      phone: "+31 6 1283719",
      value: 12000,
      stage: "negotiating",
      campaignId: "camp-2",
      campaignName: "Aura Summer Apparel",
      notes: "Negotiating wholesale terms. Demanding a 15% discount for long term partnership.",
      interactions: [
        { date: "2026-06-01", type: "Meeting", note: "Negotiated price margins and delivery times." }
      ]
    },
    {
      id: "lead-5",
      name: "Thomas Mueller",
      company: "CloudScale Systems",
      email: "t.mueller@cloudscale.ch",
      phone: "+41 44 89218",
      value: 9500,
      stage: "won",
      campaignId: "camp-1",
      campaignName: "SynergyDrive Launch",
      notes: "Contract signed on June 6th. Project kick-off next Monday.",
      interactions: [
        { date: "2026-06-05", type: "Contract Signed", note: "Enterprise plan contract executed." }
      ]
    },
    {
      id: "lead-6",
      name: "Juliana Santos",
      company: "GreenLife Boutique",
      email: "jsantos@greenlife.br",
      phone: "+55 11 988271",
      value: 3000,
      stage: "new",
      campaignId: "camp-2",
      campaignName: "Aura Summer Apparel",
      notes: "Discovered via Instagram. Highly interested in organic fibers.",
      interactions: []
    },
    {
      id: "lead-7",
      name: "David Kross",
      company: "TechNexus AG",
      email: "dkross@technexus.ch",
      phone: "+41 43 92831",
      value: 7800,
      stage: "contacted",
      campaignId: "camp-1",
      campaignName: "SynergyDrive Launch",
      notes: "Requested a demo next week. Target: B2B team integration.",
      interactions: [
        { date: "2026-06-07", type: "Call", note: "Scheduled demo for June 12th." }
      ]
    }
  ],

  // Initial Contacts List
  initialContacts: [
    { id: "cont-1", name: "Marcus Vance", company: "Apex Tech Solutions", email: "marcus@apextech.com", phone: "+49 172 883719", status: "Active", campaign: "SynergyDrive Launch" },
    { id: "cont-2", name: "Sophia Lorenz", company: "Moda Verde Group", email: "s.lorenz@modaverde.de", phone: "+49 30 928371", status: "Active", campaign: "Aura Summer Apparel" },
    { id: "cont-3", name: "Christian Beck", company: "InnoSoft GmbH", email: "c.beck@innosoft.at", phone: "+43 664 82719", status: "Active", campaign: "SynergyDrive Launch" },
    { id: "cont-4", name: "Elena Rostova", company: "Velvet Fashion Hub", email: "elena@velvetfashion.nl", phone: "+31 6 1283719", status: "Active", campaign: "Aura Summer Apparel" },
    { id: "cont-5", name: "Thomas Mueller", company: "CloudScale Systems", email: "t.mueller@cloudscale.ch", phone: "+41 44 89218", status: "Active", campaign: "SynergyDrive Launch" },
    { id: "cont-6", name: "Juliana Santos", company: "GreenLife Boutique", email: "jsantos@greenlife.br", phone: "+55 11 988271", status: "Inactive", campaign: "Aura Summer Apparel" },
    { id: "cont-7", name: "David Kross", company: "TechNexus AG", email: "dkross@technexus.ch", phone: "+41 43 92831", status: "Active", campaign: "SynergyDrive Launch" },
    { id: "cont-8", name: "Sarah Connor", company: "Cyberdyne Systems", email: "sconnor@cyberdyne.co", phone: "+1 213 881928", status: "Active", campaign: "SynergyDrive Launch" },
    { id: "cont-9", name: "Oliver Kahn", company: "Titan Sportswear", email: "titan@sportswear.de", phone: "+49 89 27381", status: "Inactive", campaign: "Aura Summer Apparel" }
  ],

  // Initial Task List
  initialTasks: [
    { id: "task-1", text: "KI-Kopievorschläge für Black Friday Reviewen", done: false, priority: "high", dueDate: "2026-06-09" },
    { id: "task-2", text: "Lead Marcus Vance wegen Demo anrufen", done: true, priority: "high", dueDate: "2026-06-08" },
    { id: "task-3", text: "Midjourney Prompts für Kaffeekampagne anpassen", done: false, priority: "medium", dueDate: "2026-06-11" },
    { id: "task-4", text: "Angebot für Elena Rostova überarbeiten", done: false, priority: "high", dueDate: "2026-06-10" },
    { id: "task-5", text: "Wöchentlichen CRM Report erstellen", done: true, priority: "low", dueDate: "2026-06-07" }
  ],

  // Industry templates used for AI Generation simulation
  industryTemplates: {
    tech: {
      banner: "assets/tech_campaign.png",
      headline: "Revolutionieren Sie Ihre Arbeitsabläufe mit [Product Name]",
      adCopy: "Sind Sie bereit für die Zukunft? [Product Name] automatisiert Ihre B2B-Prozesse, verringert Reibungsverluste und verschafft Ihrer Zielgruppe ([Target Audience]) maximale Transparenz. Integrieren Sie modernste KI in Ihr Team und sparen Sie wöchentlich über 20 Stunden Verwaltungsarbeit.",
      emails: [
        {
          subject: "🚀 B2B-Prozesse automatisieren - Eine Pflicht für [Target Audience]",
          body: "Hallo,\n\nin der modernen Tech-Welt entscheidet Geschwindigkeit über den Erfolg. Und dennoch verbringen Teams über 40 % ihrer Zeit mit manueller Berichterstattung und Abstimmung.\n\nHier kommt [Product Name] ins Spiel. Unsere cloudbasierte KI-Plattform hilft Ihrer Zielgruppe ([Target Audience]), komplexe Arbeitsabläufe vollautomatisch zu koordinieren, Engpässe vorauszusehen und die Liefergeschwindigkeit um 30 % zu steigern.\n\nSind Sie bereit, manuelle Updates hinter sich zu lassen?\n\nBeste Grüße,\nIhr Team von [Product Name]"
        },
        {
          subject: "📊 Case Study: Wie wir Tech-Teams 20+ Stunden wöchentlich sparen",
          body: "Hallo [Target Audience],\n\nZeit ist Geld. Ein führendes Tech-Unternehmen stand kürzlich vor dem Problem, dass Deadlines durch zersplitterte Workflows verpasst wurden. Nach der Einführung von [Product Name] konnten sie:\n- Projekt-Meetingzeiten um 35 % senken\n- Die Sprint-Liefertreue auf 100 % steigern\n- Vollständige Sichtbarkeit für alle Stakeholder schaffen\n\nErfahren Sie in unserem kurzen Report, wie Ihr Team dieselben Resultate erzielen kann: [Link]\n\nHerzliche Grüße,\nIhr Team von [Product Name]"
        },
        {
          subject: "🎁 Ihre 14-tägige Testversion für [Product Name] ist bereit",
          body: "Hallo,\n\nein neues Tool auszuprobieren, erfordert Vertrauen. Deshalb machen wir es Ihnen ganz einfach und risikofrei.\n\nTesten Sie [Product Name] 14 Tage lang mit vollem Funktionsumfang. Richten Sie Ihren ersten Workspace in nur 5 Minuten ein und erleben Sie die Entlastung live.\n\nJetzt kostenlose Testversion starten: [Link]\n\nFreundliche Grüße,\nIhr Team von [Product Name]"
        }
      ],
      midjourneyPrompts: [
        "A sleek modern office workspace with holographic translucent project charts glowing in mid-air, software developers interacting with a minimalist digital interface, corporate neon purple and cyan lighting, futuristic business, photorealistic, 8k resolution, --ar 16:9",
        "An abstract visual representation of data streams converging into a perfectly organized glowing crystal structure, symbol of workflow automation and efficiency, modern tech aesthetic, ultra-detailed, octane render, 3d illustration, --ar 16:9"
      ],
      videoScript: {
        title: "30-Sekunden LinkedIn Videoskript (B2B Tech)",
        script: "[0:00 - 0:05] REGIE: Nahaufnahme eines sichtlich gestressten Teamleiters, der auf ein unübersichtliches Whiteboard starrt. Kalte, düstere Beleuchtung.\nSFX: Dumpfes Ticken einer Uhr, schweres Seufzen.\nSPRECHERTEXT: Verwalten Sie Ihre Tech-Projekte immer noch manuell? Das ständige Chaos kostet Sie und Ihre Zielgruppe ([Target Audience]) wertvolle Zeit.\n\n[0:05 - 0:15] REGIE: Schneller Schnitt zu einem hellen, modernen Monitor, auf dem ein elegantes Dashboard aufleuchtet. Der Teamleiter lächelt erleichtert. Dynamische, leuchtende Farben.\nSFX: Dynamisches 'Whoosh' und ein motivierender, elektronischer Synth-Beat setzt ein.\nSPRECHERTEXT: Entdecken Sie [Product Name]. Die intelligente KI-Plattform, die B2B-Prozesse automatisiert und Ihre Teams perfekt synchronisiert.\n\n[0:15 - 0:25] REGIE: Animationen von Fortschrittsbalken, die rasant auf 100% springen, und vernetzte Weltkugeln, die aufleuchten.\nSFX: Helles, positives Klingeln bei Fertigstellung.\nSPRECHERTEXT: Steigern Sie Ihre Effizienz um 30 % und liefern Sie Projekte fehlerfrei und pünktlich ab - ohne Stress.\n\n[0:25 - 0:30] REGIE: Logo von [Product Name] erscheint im Bild mit einem klaren Call-To-Action Button 'Jetzt kostenlos testen'.\nSFX: Kraftvoller, positiver Schlussakkord.\nSPRECHERTEXT: Besuchen Sie unsere Website und starten Sie heute Ihre kostenlose 14-tägige Testversion!"
      }
    },
    fashion: {
      banner: "assets/fashion_campaign.png",
      headline: "Nachhaltiger Stil ohne Kompromisse mit [Product Name]",
      adCopy: "Mode sollte nicht die Welt kosten. Die exklusive [Product Name] Kollektion ist maßgeschneidert für [Target Audience]. Hergestellt aus 100 % zertifizierter Bio-Faser vereint sie sommerliche Leichtigkeit mit zeitloser Eleganz. Schützen Sie die Umwelt und kleiden Sie sich erstklassig.",
      emails: [
        {
          subject: "🌿 Der Sommer kommt. Ist Ihre Garderobe nachhaltig, [Target Audience]?",
          body: "Hallo,\n\nwenn die Temperaturen steigen, sehnen wir uns nach Kleidung, die leicht auf der Haut liegt und die Umwelt schont.\n\nMit [Product Name] präsentieren wir Ihnen Mode aus 100 % ökologischen Naturfasern - atmungsaktiv, biologisch abbaubar und unter fairen Bedingungen gefertigt.\n\nWählen Sie bewussten Luxus für diesen Sommer.\n\nHerzliche Grüße,\nIhr [Product Name] Team"
        },
        {
          subject: "✨ Handgemachte Qualität: Der Ursprung von [Product Name]",
          body: "Hallo [Target Audience],\n\nwir glauben an Slow Fashion. Jedes einzelne Kleidungsstück unserer Kollektion entsteht in sorgfältiger Handarbeit von lokalen Kunsthandwerkern.\n\nWir verzichten vollständig auf giftige Farbstoffe und Plastikverpackungen. Das ist Mode, die sich einfach gut anfühlt - für Sie und die Erde.\n\nErfahren Sie mehr über unsere Manufaktur: [Link]\n\nBeste Grüße,\nIhr [Product Name] Team"
        },
        {
          subject: "⏰ Limitiertes Willkommensgeschenk: 15 % Rabatt auf Nachhaltigkeit",
          body: "Hallo Mode-Pionier,\n\nsind Sie bereit für den Wandel? Werden Sie Teil der grünen Bewegung und erhalten Sie 15 % Rabatt auf Ihre erste Bestellung aus der neuen [Product Name] Kollektion.\n\nGeben Sie einfach den Code: ECOSUMMER im Warenkorb ein.\n\nJetzt nachhaltigen Stil entdecken: [Link]\n\nFreundliche Grüße,\nIhr [Product Name] Team"
        }
      ],
      midjourneyPrompts: [
        "An elegant model in a flowing natural linen outfit walking on a sunlit beach during golden hour, soft cinematic lighting, organic textures, natural look, editorial fashion photography, high-end style, --ar 16:9",
        "A close-up studio shot showing the rich woven texture of organic linen fabric, draped beautifully over a neutral clay pedestal, warm natural sunlight and soft shadows, minimalist aesthetic, high-end, --ar 16:9"
      ],
      videoScript: {
        title: "30-Sekunden LinkedIn Videoskript (Sustainable Fashion)",
        script: "[0:00 - 0:05] REGIE: Nahaufnahme von schwitzender Haut unter kratzigem, synthetischem Stoff. Unbequeme Bürosituation. Matte, graue Farbgebung.\nSFX: Unbehagliches Rascheln, schweres Ausatmen.\nSPRECHERTEXT: Genug von unbequemer, synthetischer Kleidung im Sommer? Ihre Haut und unsere Umwelt verdienen Besseres.\n\n[0:05 - 0:15] REGIE: Sanfte Blende. Eine Person läuft lächelnd durch eine sonnenüberflutete Sommerwiese. Sie trägt eine weiche, naturfarbene Kollektion. Helle, warme Lichtstimmung.\nSFX: Vogelzwitschern, eine leichte Akustikgitarren-Melodie setzt ein.\nSPRECHERTEXT: Entdecken Sie [Product Name]. 100 % biologisches Gewebe, das Ihre Haut atmen lässt und ökologisch absolut rein ist.\n\n[0:15 - 0:25] REGIE: Detailaufnahmen von präzisen Nähten und hochwertigem Stoff, der sich im Wind bewegt.\nSFX: Angenehmes Stoffrascheln, sanfter Glockenton.\nSPRECHERTEXT: Perfekt für [Target Audience]. Stilvoll geschnitten, langlebig gefertigt und ethisch einwandfrei. Mode zum Wohlfühlen.\n\n[0:25 - 0:30] REGIE: Einblenden des Logos von [Product Name] und des Gutscheincodes 'ECOSUMMER'.\nSFX: Harmonisch ausklingender Gitarrenakkord.\nSPRECHERTEXT: Nutzen Sie jetzt den Code ECOSUMMER für 15 % Rabatt. Besuchen Sie unseren Online-Shop!"
      }
    },
    coffee: {
      banner: "assets/coffee_campaign.png",
      headline: "Der perfekte Kaffeegenuss für [Target Audience]: [Product Name]",
      adCopy: "Erleben Sie Kaffeekultur auf einem neuen Level. [Product Name] wird aus handverlesenen, nachhaltig angebauten Bohnen frisch geröstet. Entwickelt für wahre Kenner und Ihre anspruchsvolle Zielgruppe ([Target Audience]), liefert jede Tasse ein unvergleichliches Aroma und pure Energie für Ihren Tag.",
      emails: [
        {
          subject: "☕️ Bereit für das nächste Kaffeelager, [Target Audience]?",
          body: "Hallo,\n\nder Morgenkaffee ist mehr als nur Koffein - er ist ein Ritual. Aber trinken Sie wirklich Kaffee, der Ihr Potenzial widerspiegelt?\n\n[Product Name] bringt die erlesensten Bohnen aus biologischem Fair-Trade-Anbau direkt in Ihre Tasse. Schonend im Trommelröster veredelt, für magenfreundlichen und vollmundigen Geschmack.\n\nMachen Sie Ihren Kaffee zum Highlight des Tages.\n\nKoffeinhaltige Grüße,\nIhr Team von [Product Name]"
        },
        {
          subject: "🌱 Was macht eine Röstung von [Product Name] so besonders?",
          body: "Hallo [Target Audience],\n\nviele Industriekaffees werden bei extremen Temperaturen in Sekunden schockgeröstet. Das Ergebnis: Bitterkeit und Säure.\n\nBei [Product Name] nehmen wir uns Zeit. 18 Minuten schonende Langzeitröstung entfalten über 800 Aromen und bauen unerwünschte Säuren ab. Das schmeckt man in jedem Tropfen.\n\nEntdecken Sie unsere Röstgeheimnisse: [Link]\n\nHerzliche Grüße,\nIhr Team von [Product Name]"
        },
        {
          subject: "🎁 Probierpaket: Kostenloser Expressversand für Ihre Erstbestellung",
          body: "Hallo Kaffeeliebhaber,\n\nprobieren geht über studieren. Bestellen Sie heute unser exklusives [Product Name] Entdecker-Set und wir schenken Ihnen den Expressversand.\n\nFrisch geröstet verpackt und innerhalb von 24 Stunden bei Ihnen an der Tür.\n\nJetzt Probierpaket sichern: [Link]\n\nViele Grüße,\nIhr Team von [Product Name]"
        }
      ],
      midjourneyPrompts: [
        "A premium coffee shop brand banner with fresh roasted coffee beans, a modern steaming ceramic cup of latte, cozy dark moody lighting, rustic wooden table, cozy and warm atmosphere, 16:9 aspect ratio.",
        "Close-up details of dark chocolate-brown coffee beans slowly falling through a gentle golden beam of light, soft particles floating, professional studio macro photography, organic texture, --ar 16:9"
      ],
      videoScript: {
        title: "30-Sekunden LinkedIn Videoskript (Artisanal Coffee)",
        script: "[0:00 - 0:05] REGIE: Nahaufnahme eines schalen, blassen Bürokaffees in einer Plastiktasse. Ein gelangweilter Mitarbeiter rührt lustlos um. Kaltes Neonlicht.\nSFX: Tristes Klappern eines Löffels, leises Gähnen.\nSPRECHERTEXT: Starten Sie Ihren Tag immer noch mit bitterem, fadem Automatenkaffee? Ihr Gaumen verdient mehr Energie.\n\n[0:05 - 0:15] REGIE: Schneller Wechsel. Dunkle, warme Kaffeebar-Atmosphäre. Eine Espressomaschine extrahiert einen cremigen, haselnussbraunen Espresso. Dampf steigt auf.\nSFX: Satter Druckaufbau der Maschine, zischender Dampf, jazzige Lo-Fi-Musik setzt ein.\nSPRECHERTEXT: Entdecken Sie [Product Name]. Handverlesene Spezialitätenkaffees, traditionell und schonend in kleinen Chargen geröstet.\n\n[0:15 - 0:25] REGIE: Detailaufnahme von röstfrischen Bohnen, die glänzend in die Verpackung fallen. Eine glückliche Person riecht genussvoll am Becher.\nSFX: Prasseln der Bohnen, tiefes Einatmen.\nSPRECHERTEXT: Entwickelt für [Target Audience]. Volles Aroma, keine bittere Säure - nur purer, ehrlicher Kaffeegeschmack für Ihren Fokus.\n\n[0:25 - 0:30] REGIE: Kaffeetüte von [Product Name] steht stolz im Bild neben einer dampfenden Tasse. Text blendet ein: 'Versandkostenfrei bestellen'.\nSFX: Entspannter Lo-Fi-Schlussakkord.\nSPRECHERTEXT: Bestellen Sie Ihr Probierpaket noch heute versandkostenfrei. Gönnen Sie sich wahren Kaffeegenuss!"
      }
    },
    fitness: {
      banner: "assets/fitness_campaign.png",
      headline: "Erreichen Sie Ihre Bestform mit [Product Name]",
      adCopy: "Keine Ausreden mehr. [Product Name] ist der persönliche Fitnessbegleiter für Ihre Zielgruppe ([Target Audience]). Mit intelligenten Trainingsplänen, Echtzeit-Körperanalyse und motivierenden Meilensteinen verändern Sie Ihre Gewohnheiten dauerhaft. Starten Sie Ihre Transformation jetzt.",
      emails: [
        {
          subject: "🔥 Zeit für Action, [Target Audience]! Ihre Ziele warten",
          body: "Hallo,\n\nwir alle wollen fit sein. Aber 80 % der Neujahrsvorsätze scheitern bereits im ersten Monat. Warum? Weil ein Plan ohne Struktur nur ein Wunsch ist.\n\nMit [Product Name] erhalten Sie ein maßgeschneidertes Coaching-System, das sich perfekt an Ihren Alltag anpasst. Trainieren Sie effizienter, tracken Sie Ihren Fortschritt und bleiben Sie motiviert.\n\nMachen Sie den ersten Schritt.\n\nSportliche Grüße,\nIhr [Product Name] Team"
        },
        {
          subject: "📈 Wie Daten Ihre Fitness revolutionieren: Die [Product Name] Methode",
          body: "Hallo [Target Audience],\n\neinfach nur blind Gewichte zu heben oder zu laufen bringt selten den gewünschten Erfolg. Auf die richtige Intensität kommt es an.\n\n[Product Name] analysiert Ihre Herzfrequenz, Schlafqualität und tägliche Leistung, um Workouts zu generieren, die präzise auf Ihre Tagesform abgestimmt sind. Kein Übertraining, kein Verletzungsrisiko - nur pure Leistung.\n\nErfahren Sie, wie es funktioniert: [Link]\n\nBleiben Sie am Ball,\nIhr [Product Name] Team"
        },
        {
          subject: "🏁 Nur noch heute: Starten Sie Ihre Fitness-Herausforderung gratis",
          body: "Hallo Athlet,\n\nder beste Zeitpunkt zum Starten war gestern. Der zweitbeste ist JETZT.\n\nRegistrieren Sie sich heute und testen Sie [Product Name] 7 Tage lang völlig kostenlos. Erhalten Sie sofortigen Zugriff auf Ihren persönlichen Trainingsplan und unsere Premium-Community.\n\nJetzt kostenlos anmelden: [Link]\n\nMit sportlichen Grüßen,\nIhr [Product Name] Team"
        }
      ],
      midjourneyPrompts: [
        "A dynamic fitness and wellness app banner showing a smart watch with health metrics, abstract energetic sport background, vibrant neon orange and dark blue colors, athletic feel, 16:9 aspect ratio.",
        "A wide shot of an athletic runner sprinting on an outdoor running track at dawn, mist rising, powerful dynamic motion blur, high contrast dramatic lighting, professional sports brand photography, --ar 16:9"
      ],
      videoScript: {
        title: "30-Sekunden LinkedIn Videoskript (Fitness App)",
        script: "[0:00 - 0:05] REGIE: Eine Person sitzt deprimiert auf dem Sofa und starrt auf eine ungesunde Mahlzeit. Gedämpftes Licht.\nSFX: Enttäuschtes Seufzen, leiser dumpfer Beat.\nSPRECHERTEXT: Sie wollen fitter werden, finden aber im stressigen Alltag einfach keine Struktur und Motivation?\n\n[0:05 - 0:15] REGIE: Schneller Schnitt zu einem hellen Fitnessraum. Die Person macht energisch Liegestütze, während eine Smartwatch am Handgelenk aufleuchtet. Dynamische Kamerafahrt.\nSFX: Energiegeladene Elektro-Musik setzt ein, schneller Atem.\nSPRECHERTEXT: Hier ist [Product Name]. Ihr digitaler Personal Trainer, der sich sekundenschnell an Ihr Fitnesslevel und Ihren Terminkalender anpasst.\n\n[0:15 - 0:25] REGIE: Eine App-Oberfläche zeigt interaktiv steigende Leistungskurven und motivierende Abzeichen, die aufleuchten.\nSFX: Belohnender Soundeffekt, energetischer Bass-Drop.\nSPRECHERTEXT: Perfekt für [Target Audience]. Optimieren Sie Ihr Training, tracken Sie Erfolge in Echtzeit und erreichen Sie Ihre Ziele schneller.\n\n[0:25 - 0:30] REGIE: Logo von [Product Name] erscheint mit einem CTA 'Jetzt 7 Tage gratis testen'.\nSFX: Motivierendes elektronisches Ende.\nSPRECHERTEXT: Laden Sie die App jetzt herunter und testen Sie die ersten 7 Tage vollkommen kostenlos!"
      }
    }
  }
};
