// ═══════════════════════════════════════════════════════════════
//  DER AUTONOME KAMPAGNEN-ARCHITEKT – architect.js
//  Features: Trigger-Dropdown, Mermaid-Roadmap, Echtzeit-Tonanpassung
//            Dozenten-/Manager-Freigabe Toggle
// ═══════════════════════════════════════════════════════════════

window.architectModule = {

  // ── State ────────────────────────────────────────────────────────────
  state: {
    trigger: null,        // 'it-krise' | 'geldregen' | 'expansion'
    product: '',
    audience: '',
    industry: 'tech',
    isGenerated: false,
    isApproved: false,
    approvedAt: null,
  },

  // ── Trigger Configurations ────────────────────────────────────────────
  triggers: {

    'it-krise': {
      id: 'it-krise',
      label: 'IT-Krise',
      emoji: '🚨',
      tagline: 'Dringlichkeit & Sofortlösung',
      colorPrimary: '#ef4444',
      colorBg: 'rgba(127,29,29,0.22)',
      colorBorder: 'rgba(239,68,68,0.4)',
      colorText: '#fca5a5',
      toneLabel: 'KRITISCH & SOFORTLÖSEND',
      mermaidTheme: `%%{init: {'theme': 'dark', 'themeVariables': {'darkMode': true, 'primaryColor': '#450a0a', 'primaryTextColor': '#fca5a5', 'primaryBorderColor': '#ef4444', 'lineColor': '#ef4444', 'edgeLabelBackground': '#0f172a', 'background': '#070d1b', 'fontFamily': 'JetBrains Mono'}}}%%`,
      nodeStyle: 'fill:#450a0a,stroke:#ef4444,color:#fca5a5,font-weight:bold',
      edgeStyle: 'stroke:#ef4444,stroke-width:2px',
      weekLabels: [
        { week: 'WOCHE 1', phase: 'Krisenbriefing', actions: 'Analyse & Notfall-Brief', icon: '🚨' },
        { week: 'WOCHE 2', phase: 'Notfall-Outreach', actions: 'Email #1 → DRINGEND', icon: '📢' },
        { week: 'WOCHE 3', phase: 'Lösungs-Push', actions: 'Email #2 + Video-Ad', icon: '⚡' },
        { week: 'WOCHE 4', phase: 'Stabilisierung', actions: 'Email #3 → Krisenlösung', icon: '🎯' },
      ],
      adaptSubject:  s  => `🚨 DRINGEND: ${s}`,
      adaptBody:     b  => b
        .replace(/Hallo,/g, '⚠️ ACHTUNG –')
        .replace(/Herzliche Grüße/g, 'Sofortmaßnahme erforderlich,')
        .replace(/Beste Grüße/g, 'Handeln Sie JETZT,')
        .replace(/Freundliche Grüße/g, 'Keine Zeit zu verlieren,')
        .replace(/Entdecken Sie/g, '🚨 Lösen Sie SOFORT')
        .replace(/starten Sie/g, 'aktivieren Sie JETZT')
        .replace(/Koffeinhaltige Grüße/g, 'Dringliche Grüße,')
        .replace(/Sportliche Grüße/g, 'Sofortmaßnahme –'),
      adaptPrompt:   p  => p + ', crisis red alert emergency atmosphere, dramatic dark red warning colors, urgent high-stakes corporate setting, tense lighting',
      adaptVideoIntro: '⚠️ ANWEISUNG: DRINGLICHKEIT MAXIMAL | TEMPO: SCHNELL & DIREKT | STIL: KRISENKOMMUNIKATION\n\n',
      adaptVideoLine: l => l
        .replace(/SPRECHERTEXT:/g,  'SPRECHERTEXT [🚨 KRISE]:')
        .replace(/REGIE:/g,         'REGIE [DRINGEND]:')
        .replace(/SFX:/g,           'SFX [ALARM]:'),
    },

    'geldregen': {
      id: 'geldregen',
      label: 'Geldregen',
      emoji: '💰',
      tagline: 'ROI-Maximierung & Gewinnfokus',
      colorPrimary: '#f59e0b',
      colorBg: 'rgba(120,53,15,0.22)',
      colorBorder: 'rgba(245,158,11,0.4)',
      colorText: '#fcd34d',
      toneLabel: 'GEWINN-ORIENTIERT & VERLOCKEND',
      mermaidTheme: `%%{init: {'theme': 'dark', 'themeVariables': {'darkMode': true, 'primaryColor': '#451a03', 'primaryTextColor': '#fcd34d', 'primaryBorderColor': '#f59e0b', 'lineColor': '#f59e0b', 'edgeLabelBackground': '#0f172a', 'background': '#070d1b', 'fontFamily': 'JetBrains Mono'}}}%%`,
      nodeStyle: 'fill:#451a03,stroke:#f59e0b,color:#fcd34d,font-weight:bold',
      edgeStyle: 'stroke:#f59e0b,stroke-width:2px',
      weekLabels: [
        { week: 'WOCHE 1', phase: 'ROI-Analyse',   actions: 'Gewinnpotenzial messen', icon: '💰' },
        { week: 'WOCHE 2', phase: 'Appetit-Phase',  actions: 'Email #1 → Gewinnfokus', icon: '💎' },
        { week: 'WOCHE 3', phase: 'Verlockung',     actions: 'Email #2 + Video-Pitch', icon: '📈' },
        { week: 'WOCHE 4', phase: 'Abschluss',      actions: 'Email #3 → Exklusiv-CTA', icon: '🏆' },
      ],
      adaptSubject:  s  => `💰 ROI-Chance: ${s}`,
      adaptBody:     b  => b
        .replace(/Hallo,/g, 'Profitables Hallo,')
        .replace(/Entdecken Sie/g, '💎 Maximieren Sie Ihren ROI mit')
        .replace(/Herzliche Grüße/g, 'Auf Ihren Gewinn,')
        .replace(/Beste Grüße/g, 'Auf Ihren Erfolg,')
        .replace(/Freundliche Grüße/g, 'Mit profitablen Grüßen,')
        .replace(/kostenlos/g, 'ROI-gesichert')
        .replace(/Rabatt/g, 'Gewinnbonus')
        .replace(/testen/g, 'profitieren')
        .replace(/Koffeinhaltige Grüße/g, 'Mit goldenen Grüßen,')
        .replace(/Sportliche Grüße/g, 'Auf Ihre Rendite,'),
      adaptPrompt:   p  => p + ', luxury gold tones, wealth and success aesthetic, premium golden hour lighting, Forbes magazine editorial style, high-end luxury corporate photography',
      adaptVideoIntro: '💰 ANWEISUNG: VERLOCKEND & GEWINN-FOKUSSIERT | STIL: LUXUS & EXKLUSIVITÄT | TONE: PREMIUM\n\n',
      adaptVideoLine: l => l
        .replace(/SPRECHERTEXT:/g,  'SPRECHERTEXT [💰 ROI-FOKUS]:')
        .replace(/REGIE:/g,         'REGIE [LUXUS & WOHLSTAND]:')
        .replace(/SFX:/g,           'SFX [PRESTIGE]:'),
    },

    'expansion': {
      id: 'expansion',
      label: 'Expansion',
      emoji: '🚀',
      tagline: 'Skalierung & Wachstumsbeschleunigung',
      colorPrimary: '#818cf8',
      colorBg: 'rgba(30,27,75,0.3)',
      colorBorder: 'rgba(129,140,248,0.4)',
      colorText: '#c4b5fd',
      toneLabel: 'AMBITIONIERT & SKALIEREND',
      mermaidTheme: `%%{init: {'theme': 'dark', 'themeVariables': {'darkMode': true, 'primaryColor': '#1e1b4b', 'primaryTextColor': '#c4b5fd', 'primaryBorderColor': '#818cf8', 'lineColor': '#818cf8', 'edgeLabelBackground': '#0f172a', 'background': '#070d1b', 'fontFamily': 'JetBrains Mono'}}}%%`,
      nodeStyle: 'fill:#1e1b4b,stroke:#818cf8,color:#c4b5fd,font-weight:bold',
      edgeStyle: 'stroke:#818cf8,stroke-width:2px',
      weekLabels: [
        { week: 'WOCHE 1', phase: 'Expansions-Strategie', actions: 'Märkte & Ziele definieren', icon: '🚀' },
        { week: 'WOCHE 2', phase: 'Awareness skalieren',  actions: 'Email #1 → Wachstumsvision', icon: '📡' },
        { week: 'WOCHE 3', phase: 'Reach & Engagement',   actions: 'Email #2 + Scale-Video', icon: '🌍' },
        { week: 'WOCHE 4', phase: 'Scale & Convert',      actions: 'Email #3 → Growth-CTA', icon: '🏔️' },
      ],
      adaptSubject:  s  => `🚀 Skaliere jetzt: ${s}`,
      adaptBody:     b  => b
        .replace(/Hallo,/g, 'Auf zu neuen Horizonten,')
        .replace(/Entdecken Sie/g, '🌍 Skalieren Sie mit')
        .replace(/Herzliche Grüße/g, 'Auf zum nächsten Level,')
        .replace(/Beste Grüße/g, 'Mit Wachstumsambitionen,')
        .replace(/Freundliche Grüße/g, 'Visionäre Grüße,')
        .replace(/kostenlos/g, 'skalierbar')
        .replace(/testen/g, 'expandieren')
        .replace(/Koffeinhaltige Grüße/g, 'Expansive Grüße,')
        .replace(/Sportliche Grüße/g, 'Mit Skalierungsambition,'),
      adaptPrompt:   p  => p + ', infinite scale galaxy aesthetic, expanding light rays, cosmic growth visualization, dynamic expansion sense, deep space purple and electric blue, universe-scale ambition',
      adaptVideoIntro: '🚀 ANWEISUNG: VISIONÄR & AMBITIONIERT | TEMPO: DYNAMISCH | SCOPE: GLOBAL | STIL: AUFSTIEG\n\n',
      adaptVideoLine: l => l
        .replace(/SPRECHERTEXT:/g,  'SPRECHERTEXT [🚀 EXPANSION]:')
        .replace(/REGIE:/g,         'REGIE [WACHSTUM]:')
        .replace(/SFX:/g,           'SFX [AUFSTIEG]:'),
    },
  },

  // ── Init ────────────────────────────────────────────────────────────
  init() {
    this.initMermaid();
    this.bindEvents();
    this.renderPlaceholderDiagram();
  },

  initMermaid() {
    if (typeof mermaid === 'undefined') return;
    mermaid.initialize({
      startOnLoad: false,
      theme: 'dark',
      darkMode: true,
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: 12,
      themeVariables: {
        background: '#070d1b',
        mainBkg: '#0f172a',
        nodeBorder: '#1e293b',
        clusterBkg: '#0f172a',
        titleColor: '#e2e8f0',
        edgeLabelBackground: '#0f172a',
      },
      flowchart: { curve: 'basis', padding: 20, htmlLabels: true, useMaxWidth: true },
    });
  },

  bindEvents() {
    // Trigger buttons
    document.querySelectorAll('.trigger-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.selectTrigger(btn.getAttribute('data-trigger'));
      });
    });

    // Generate button
    const genBtn = document.getElementById('architect-generate-btn');
    if (genBtn) genBtn.addEventListener('click', () => this.generate());

    // Approval toggle
    const toggleInput = document.getElementById('approval-toggle-input');
    if (toggleInput) toggleInput.addEventListener('change', () => this.toggleApproval());
  },

  // ── Trigger Selection ────────────────────────────────────────────────
  selectTrigger(triggerId) {
    this.state.trigger = triggerId;
    const config = this.triggers[triggerId];

    // Update trigger button visuals
    document.querySelectorAll('.trigger-btn').forEach(btn => {
      const id = btn.getAttribute('data-trigger');
      const cfg = this.triggers[id];
      const check = btn.querySelector('.trigger-check');
      const isActive = id === triggerId;

      btn.style.background    = isActive ? cfg.colorBg    : 'rgba(15,23,42,0.4)';
      btn.style.borderColor   = isActive ? cfg.colorPrimary : '#1e293b';
      btn.style.boxShadow     = isActive ? `0 0 20px ${cfg.colorPrimary}25, inset 0 0 20px ${cfg.colorPrimary}05` : 'none';
      btn.querySelector('.trigger-label').style.color = isActive ? cfg.colorText  : '#e2e8f0';
      btn.querySelector('.trigger-desc').style.color  = isActive ? cfg.colorPrimary : '#64748b';
      if (check) {
        check.style.display     = isActive ? 'flex' : 'none';
        check.style.background  = cfg.colorPrimary;
      }
    });

    // Update tone pill in sidebar of form
    const tonePill = document.getElementById('arch-tone-pill');
    if (tonePill) {
      tonePill.style.display = 'flex';
      tonePill.innerHTML = `
        <span style="font-size:1rem;">${config.emoji}</span>
        <div>
          <div style="font-size:0.65rem;font-weight:800;color:${config.colorPrimary};text-transform:uppercase;letter-spacing:0.1em;">${config.toneLabel}</div>
          <div style="font-size:0.65rem;color:${config.colorText};opacity:0.8;">${config.tagline}</div>
        </div>
      `;
      tonePill.style.background   = config.colorBg;
      tonePill.style.borderColor  = config.colorBorder;
    }

    // Clear trigger error
    const triggerErr = document.getElementById('arch-err-trigger');
    if (triggerErr) triggerErr.classList.remove('show');

    // Auto-generate immediately upon trigger selection
    this.state.isGenerated = true;

    const productEl  = document.getElementById('arch-product-name');
    const audienceEl = document.getElementById('arch-audience');
    const industryEl = document.getElementById('arch-industry');

    this.state.product  = (productEl && productEl.value.trim()) ? productEl.value.trim() : 'Ihr Produkt';
    this.state.audience = (audienceEl && audienceEl.value.trim()) ? audienceEl.value.trim() : 'Ihre Zielgruppe';
    this.state.industry = industryEl ? industryEl.value : 'tech';

    // Render Mermaid diagram in real time
    this.renderMermaidDiagram(triggerId);

    // Render trigger-adapted assets immediately
    this.renderAdaptedAssets();

    // Show assets & approval sections instantly
    const assetsSection   = document.getElementById('architect-adapted-assets');
    const approvalSection = document.getElementById('architect-approval-section');
    if (assetsSection) {
      assetsSection.style.display = 'flex';
    }
    if (approvalSection) {
      approvalSection.style.display = 'flex';
    }
  },

  // ── Generate ─────────────────────────────────────────────────────────
  generate() {
    const productEl  = document.getElementById('arch-product-name');
    const audienceEl = document.getElementById('arch-audience');
    const industryEl = document.getElementById('arch-industry');

    let hasError = false;

    const validate = (el, errId) => {
      const err = document.getElementById(errId);
      if (!el || !el.value.trim()) {
        if (el) el.classList.add('error');
        if (err) err.classList.add('show');
        hasError = true;
      } else {
        if (el) el.classList.remove('error');
        if (err) err.classList.remove('show');
      }
    };

    validate(productEl,  'arch-err-product');
    validate(audienceEl, 'arch-err-audience');

    if (!this.state.trigger) {
      const triggerErr = document.getElementById('arch-err-trigger');
      if (triggerErr) triggerErr.classList.add('show');
      hasError = true;
    }

    if (hasError) {
      if (window.appState) window.appState.showNotification('Bitte alle Pflichtfelder ausfüllen und einen Trigger wählen.', 'error');
      return;
    }

    this.state.product  = productEl.value.trim();
    this.state.audience = audienceEl.value.trim();
    this.state.industry = industryEl ? industryEl.value : 'tech';

    // Loading state
    const genBtn = document.getElementById('architect-generate-btn');
    if (genBtn) {
      genBtn.disabled = true;
      genBtn.innerHTML = `<div class="spinner"></div>&nbsp;Architektur wird aufgebaut…`;
    }

    // Brief "AI thinking" delay then render
    setTimeout(() => {
      this.state.isGenerated = true;

      // Refresh diagram with actual product/audience
      this.renderMermaidDiagram(this.state.trigger);

      // Render trigger-adapted assets
      this.renderAdaptedAssets();

      // Show assets & approval sections
      const assetsSection   = document.getElementById('architect-adapted-assets');
      const approvalSection = document.getElementById('architect-approval-section');
      if (assetsSection)   assetsSection.style.display   = 'flex';
      if (approvalSection) approvalSection.style.display = 'flex';

      // Smooth scroll
      setTimeout(() => { if (assetsSection) assetsSection.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 100);

      // Restore button
      if (genBtn) {
        genBtn.disabled = false;
        genBtn.innerHTML = `
          <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
          </svg>
          Fahrplan neu generieren`;
      }

      if (window.appState) window.appState.showNotification('✅ 4-Wochen-Kampagnenplan erfolgreich aufgebaut!');
    }, 1900);
  },

  // ── Mermaid Diagram ──────────────────────────────────────────────────
  renderPlaceholderDiagram() {
    const container = document.getElementById('architect-diagram-container');
    if (!container) return;
    container.innerHTML = `
      <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:300px;gap:16px;">
        <div style="width:72px;height:72px;border-radius:18px;background:rgba(99,102,241,0.08);border:1px dashed rgba(99,102,241,0.25);display:flex;align-items:center;justify-content:center;">
          <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="#4f46e5" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/>
          </svg>
        </div>
        <div style="text-align:center;">
          <p style="font-size:0.875rem;font-weight:600;color:#334155;margin:0 0 4px;">Trigger auswählen</p>
          <p style="font-size:0.75rem;color:#475569;margin:0;max-width:200px;line-height:1.5;">Der 4-Wochen-Fahrplan wird sofort als Flussdiagramm visualisiert</p>
        </div>
      </div>`;
  },

  renderMermaidDiagram(triggerId) {
    const config    = this.triggers[triggerId];
    const container = document.getElementById('architect-diagram-container');
    if (!container || !config) return;

    const product  = this.state.product  || 'Ihr Produkt';
    const audience = this.state.audience || 'Ihre Zielgruppe';
    const weeks    = config.weekLabels;

    // Build Mermaid definition (no indentation)
    const def = `${config.mermaidTheme}
flowchart LR
A["${weeks[0].icon} ${weeks[0].week}\\n${weeks[0].phase}\\n${weeks[0].actions}"]
B["${weeks[1].icon} ${weeks[1].week}\\n${weeks[1].phase}\\n${weeks[1].actions}"]
C["${weeks[2].icon} ${weeks[2].week}\\n${weeks[2].phase}\\n${weeks[2].actions}"]
D["${weeks[3].icon} ${weeks[3].week}\\n${weeks[3].phase}\\n${weeks[3].actions}"]
E["✅ KPI-REVIEW\\nROAS · CTR\\nLead-Rate"]
A -->|"Email #1"| B
B -->|"Email #2"| C
C -->|"Email #3"| D
D -->|"Konversion"| E
classDef triggerStyle ${config.nodeStyle}
classDef successStyle fill:#052e16,stroke:#22c55e,color:#86efac,font-weight:bold
class A,B,C,D triggerStyle
class E successStyle
linkStyle 0 ${config.edgeStyle}
linkStyle 1 ${config.edgeStyle}
linkStyle 2 ${config.edgeStyle}
linkStyle 3 stroke:#22c55e,stroke-width:2px`;

    if (typeof mermaid === 'undefined') {
      // Pure HTML fallback
      container.innerHTML = this._fallbackDiagram(config, product, audience);
      return;
    }

    try {
      container.removeAttribute('data-processed');
      container.textContent = def;
      mermaid.init(undefined, document.getElementById('architect-diagram-container'));
      
      const svgEl = container.querySelector('svg');
      if (svgEl) {
        svgEl.style.width     = '100%';
        svgEl.style.height    = 'auto';
        svgEl.style.minHeight = '260px';
        svgEl.style.maxHeight = '420px';
      }
    } catch (err) {
      console.warn('Mermaid render error, using HTML fallback:', err);
      container.innerHTML = this._fallbackDiagram(config, product, audience);
    }
  },

  _fallbackDiagram(config, product, audience) {
    const weeks = config.weekLabels;
    const cards = weeks.map((w, i) => `
      <div style="flex:1;min-width:100px;background:${config.colorBg};border:1px solid ${config.colorBorder};border-radius:12px;padding:14px 10px;text-align:center;">
        <div style="font-size:1.4rem;margin-bottom:6px;">${w.icon}</div>
        <div style="font-size:0.55rem;font-weight:800;color:${config.colorPrimary};text-transform:uppercase;letter-spacing:0.1em;font-family:'JetBrains Mono',monospace;">${w.week}</div>
        <div style="font-size:0.75rem;font-weight:700;color:${config.colorText};margin-top:5px;line-height:1.3;">${w.phase}</div>
        <div style="font-size:0.65rem;color:rgba(148,163,184,0.75);margin-top:5px;line-height:1.4;">${w.actions}</div>
      </div>
      ${i < weeks.length - 1 ? `<div style="flex-shrink:0;color:${config.colorPrimary};font-size:1.25rem;align-self:center;">→</div>` : ''}
    `).join('');

    return `
      <div style="display:flex;gap:10px;align-items:stretch;padding:12px 0;overflow-x:auto;">
        ${cards}
        <div style="flex-shrink:0;color:#22c55e;font-size:1.25rem;align-self:center;">→</div>
        <div style="flex:0 0 90px;min-width:90px;background:rgba(5,46,22,0.3);border:1px solid rgba(34,197,94,0.3);border-radius:12px;padding:14px 10px;text-align:center;">
          <div style="font-size:1.4rem;margin-bottom:6px;">✅</div>
          <div style="font-size:0.55rem;font-weight:800;color:#22c55e;text-transform:uppercase;letter-spacing:0.1em;font-family:'JetBrains Mono',monospace;">POST-CAMP</div>
          <div style="font-size:0.65rem;color:#86efac;margin-top:5px;line-height:1.4;">KPI-Review<br>ROAS · CTR</div>
        </div>
      </div>
      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:10px;padding-top:10px;border-top:1px solid #1e293b;">
        <span style="font-size:0.65rem;color:#475569;font-family:'JetBrains Mono',monospace;">🎯 ${product}</span>
        <span style="color:#1e293b;">·</span>
        <span style="font-size:0.65rem;color:#475569;font-family:'JetBrains Mono',monospace;">👥 ${audience}</span>
      </div>`;
  },

  // ── Render Adapted Assets ────────────────────────────────────────────
  renderAdaptedAssets() {
    const config    = this.triggers[this.state.trigger];
    const container = document.getElementById('architect-adapted-assets');
    if (!container || !config) return;

    const industry  = this.state.industry || 'tech';
    const templates = (window.mockData && window.mockData.industryTemplates[industry])
      ? window.mockData.industryTemplates[industry]
      : window.mockData.industryTemplates.tech;

    const product  = this.state.product;
    const audience = this.state.audience;

    const fill = text => (text || '')
      .replace(/\[Product Name\]/g, product)
      .replace(/\[Target Audience\]/g, audience);

    // Adapt emails
    const emails = templates.emails.map(e => ({
      subject: config.adaptSubject(fill(e.subject)),
      body:    config.adaptBody(fill(e.body)),
    }));

    // Adapt MJ prompts
    const prompts = templates.midjourneyPrompts.map(p => config.adaptPrompt(fill(p)));

    // Adapt video script
    const rawScript     = fill(templates.videoScript.script);
    const adaptedScript = config.adaptVideoIntro + rawScript
      .split('\n').map(l => config.adaptVideoLine(l)).join('\n');

    container.innerHTML = this._buildAssetsHTML(config, emails, prompts, adaptedScript);
    this._updateApprovalBorderColor(config);
  },

  _buildAssetsHTML(config, emails, prompts, script) {
    // ─── Header ───
    const header = `
      <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;">
        <div>
          <h3 style="font-size:1.125rem;font-weight:800;color:#f1f5f9;margin:0 0 4px;letter-spacing:-0.02em;">Trigger-angepasste Assets</h3>
          <p style="font-size:0.8125rem;color:#64748b;margin:0;">Echtzeit-Tonanpassung auf <span style="color:${config.colorPrimary};font-weight:700;">${config.emoji} ${config.label}</span> — alle Assets sind auf den Trigger kalibriert.</p>
        </div>
        <span style="display:inline-flex;align-items:center;gap:6px;background:${config.colorBg};border:1px solid ${config.colorBorder};border-radius:8px;padding:6px 14px;font-size:0.65rem;font-weight:800;color:${config.colorText};font-family:'JetBrains Mono',monospace;letter-spacing:0.08em;text-transform:uppercase;">${config.emoji} ${config.toneLabel}</span>
      </div>`;

    // ─── 3 Email cards ───
    const emailCards = emails.map((email, idx) => `
      <div class="asset-card" style="border-color:${config.colorBorder};">
        <div class="asset-card-header">
          <div style="display:flex;align-items:center;gap:8px;">
            <span style="display:inline-flex;align-items:center;justify-content:center;width:22px;height:22px;border-radius:6px;background:${config.colorBg};border:1px solid ${config.colorBorder};font-size:0.7rem;font-weight:800;color:${config.colorText};font-family:'JetBrains Mono',monospace;">#${idx+1}</span>
            <span style="font-size:0.6rem;font-weight:800;color:${config.colorPrimary};text-transform:uppercase;letter-spacing:0.08em;font-family:'JetBrains Mono',monospace;">
              ${config.emoji} ${idx===0?'Willkommen & Hook':idx===1?'Mehrwert & Social Proof':'Offer & CTA'} — ${config.toneLabel}
            </span>
          </div>
          <button onclick="window.architectModule.copyElement('arch-email-body-${idx}', this)" class="copy-btn">
            <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
            Kopieren
          </button>
        </div>
        <div style="margin-top:6px;">
          <div style="font-size:0.6rem;font-weight:700;color:#475569;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:4px;">Betreff:</div>
          <div style="font-size:0.8125rem;font-weight:700;color:${config.colorText};font-family:'JetBrains Mono',monospace;line-height:1.4;">${email.subject}</div>
        </div>
        <div id="arch-email-body-${idx}" style="font-size:0.75rem;color:#94a3b8;white-space:pre-wrap;line-height:1.75;background:rgba(7,13,27,0.6);border:1px solid #1e293b;border-radius:8px;padding:12px;font-family:'JetBrains Mono',monospace;max-height:200px;overflow-y:auto;">${email.body}</div>
      </div>`).join('');

    // ─── 2 MJ Prompt cards ───
    const promptCards = prompts.map((p, idx) => `
      <div class="asset-card" style="border-color:${config.colorBorder};">
        <div class="asset-card-header">
          <span style="font-size:0.6rem;font-weight:800;color:${config.colorPrimary};text-transform:uppercase;letter-spacing:0.08em;font-family:'JetBrains Mono',monospace;">${config.emoji} Midjourney Prompt #${idx+1}</span>
          <button onclick="window.architectModule.copyElement('arch-mj-${idx}', this)" class="copy-btn">
            <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
            Kopieren
          </button>
        </div>
        <div id="arch-mj-${idx}" style="font-size:0.75rem;color:${config.colorText};line-height:1.6;background:${config.colorBg};border:1px solid ${config.colorBorder};border-radius:8px;padding:12px;font-family:'JetBrains Mono',monospace;">${p}</div>
      </div>`).join('');

    // ─── Video script card ───
    const videoCard = `
      <div class="asset-card" style="border-color:${config.colorBorder};">
        <div class="asset-card-header">
          <div style="display:flex;align-items:center;gap:8px;">
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="${config.colorPrimary}" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
            </svg>
            <span style="font-size:0.6rem;font-weight:800;color:${config.colorPrimary};text-transform:uppercase;letter-spacing:0.08em;font-family:'JetBrains Mono',monospace;">${config.emoji} 30-SEK. VIDEO-SKRIPT — ${config.toneLabel}</span>
          </div>
          <button onclick="window.architectModule.copyElement('arch-video', this)" class="copy-btn">
            <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
            Kopieren
          </button>
        </div>
        <div id="arch-video" style="font-size:0.75rem;color:#94a3b8;white-space:pre-wrap;line-height:1.8;background:rgba(7,13,27,0.6);border:1px solid #1e293b;border-radius:8px;padding:14px;font-family:'JetBrains Mono',monospace;max-height:320px;overflow-y:auto;">${script}</div>
      </div>`;

    return `
      ${header}
      <div>
        <h4 style="font-size:0.65rem;font-weight:800;color:#475569;text-transform:uppercase;letter-spacing:0.1em;margin:0 0 12px;font-family:'JetBrains Mono',monospace;">📧 3-Part E-Mail Drip Kampagne</h4>
        <div style="display:flex;flex-direction:column;gap:12px;">${emailCards}</div>
      </div>
      <div>
        <h4 style="font-size:0.65rem;font-weight:800;color:#475569;text-transform:uppercase;letter-spacing:0.1em;margin:0 0 12px;font-family:'JetBrains Mono',monospace;">🖼️ Midjourney Bild-Prompts</h4>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">${promptCards}</div>
      </div>
      <div>
        <h4 style="font-size:0.65rem;font-weight:800;color:#475569;text-transform:uppercase;letter-spacing:0.1em;margin:0 0 12px;font-family:'JetBrains Mono',monospace;">🎬 30-Sek. LinkedIn Video-Skript</h4>
        ${videoCard}
      </div>`;
  },

  _updateApprovalBorderColor(config) {
    const section = document.getElementById('architect-approval-section');
    if (section && !this.state.isApproved) {
      section.style.borderColor = config.colorBorder;
    }
  },

  // ── Copy Utility ─────────────────────────────────────────────────────
  copyElement(elementId, buttonEl) {
    const el = document.getElementById(elementId);
    if (!el) return;
    const text = el.innerText || el.textContent || '';
    navigator.clipboard.writeText(text).then(() => {
      if (window.appState) window.appState.showNotification('In Zwischenablage kopiert!');
      if (buttonEl) {
        const orig = buttonEl.innerHTML;
        buttonEl.classList.add('copied');
        buttonEl.innerHTML = `<svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg> Kopiert!`;
        setTimeout(() => { buttonEl.classList.remove('copied'); buttonEl.innerHTML = orig; }, 2000);
      }
    }).catch(err => console.error('Clipboard error:', err));
  },

  // ── Approval Toggle ──────────────────────────────────────────────────
  toggleApproval() {
    const toggle = document.getElementById('approval-toggle-input');
    if (!toggle) return;

    this.state.isApproved = toggle.checked;
    this.state.approvedAt  = toggle.checked ? new Date().toLocaleString('de-DE') : null;

    this.renderApprovalStatus();
  },

  renderApprovalStatus() {
    const badge   = document.getElementById('approval-status-badge');
    const section = document.getElementById('architect-approval-section');
    const label   = document.getElementById('approval-toggle-label');

    if (!badge) return;

    if (this.state.isApproved) {
      badge.style.display = 'block';
      badge.innerHTML = `
        <div style="display:flex;align-items:center;gap:12px;background:rgba(5,46,22,0.4);border:1px solid rgba(34,197,94,0.3);border-radius:12px;padding:12px 18px;margin-top:14px;">
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#22c55e" stroke-width="2.5" style="flex-shrink:0;">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          <div style="flex:1;min-width:0;">
            <div style="font-size:0.8125rem;font-weight:800;color:#22c55e;">Kampagne offiziell freigegeben</div>
            <div style="font-size:0.65rem;color:#86efac;margin-top:2px;font-family:'JetBrains Mono',monospace;">Freigegeben: ${this.state.approvedAt} · Durch: Manager / Dozent</div>
          </div>
          <span style="background:rgba(34,197,94,0.15);border:1px solid rgba(34,197,94,0.4);border-radius:6px;padding:4px 10px;font-size:0.6rem;font-weight:800;color:#22c55e;font-family:'JetBrains Mono',monospace;letter-spacing:0.08em;text-transform:uppercase;white-space:nowrap;">✓ APPROVED</span>
        </div>`;
      if (section) section.style.borderColor = 'rgba(34,197,94,0.35)';
      if (label)   label.style.color         = '#22c55e';
    } else {
      badge.style.display = 'none';
      badge.innerHTML     = '';
      const config = this.state.trigger ? this.triggers[this.state.trigger] : null;
      if (section) section.style.borderColor = config ? config.colorBorder : 'rgba(99,102,241,0.2)';
      if (label)   label.style.color         = '#94a3b8';
    }
  },
};

// Boot on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  window.architectModule.init();
});
