// Main Application Logic
window.appState = {
  campaigns: [],
  leads: [],
  contacts: [],
  tasks: [],
  currentView: "dashboard",
  generatedAssets: null,

  init() {
    // Load from LocalStorage or initialize with mock data
    this.campaigns = this.loadState("campaigns", window.mockData.initialCampaigns);
    this.leads = this.loadState("leads", window.mockData.initialLeads);
    this.contacts = this.loadState("contacts", window.mockData.initialContacts);
    this.tasks = this.loadState("tasks", window.mockData.initialTasks);

    // Apply saved theme
    const theme = localStorage.getItem("crm_theme") || "dark";
    this.setTheme(theme);

    // Setup Routing
    window.addEventListener("hashchange", () => this.handleRouting());
    this.handleRouting();

    // Setup event listeners
    this.setupListeners();

    // Initial renders
    this.renderAll();
  },

  loadState(key, defaultData) {
    const data = localStorage.getItem(`crm_${key}`);
    if (data) {
      try { return JSON.parse(data); } catch (e) { console.error(e); }
    }
    this.saveState(key, defaultData);
    return defaultData;
  },

  saveState(key, data) {
    localStorage.setItem(`crm_${key}`, JSON.stringify(data));
  },

  setTheme(theme) {
    const html = document.documentElement;
    if (theme === "dark") {
      html.classList.add("dark");
      html.classList.remove("light");
    } else {
      html.classList.add("light");
      html.classList.remove("dark");
    }
    localStorage.setItem("crm_theme", theme);
    const themeToggle = document.getElementById("theme-toggle");
    if (themeToggle) {
      themeToggle.checked = (theme === "dark");
    }
  },

  handleRouting() {
    const hash = window.location.hash || "#dashboard";
    const view = hash.replace("#", "") || "dashboard";
    this.currentView = view;

    // Toggle active classes in navigation (.nav-link uses .active)
    document.querySelectorAll(".nav-link[data-nav]").forEach(link => {
      const linkView = link.getAttribute("data-nav");
      link.classList.toggle("active", linkView === view);
    });

    // Toggle views visibility (sections use .active)
    document.querySelectorAll("[data-view]").forEach(viewEl => {
      const viewName = viewEl.getAttribute("data-view");
      viewEl.classList.toggle("active", viewName === view);
      if (viewName === view) this.onViewLoaded(view);
    });

    // Close any drawers/modals on view change
    this.closeLeadDrawer();
  },

  onViewLoaded(view) {
    if (view === "dashboard") {
      this.renderDashboard();
    } else if (view === "crm") {
      this.renderPipeline();
    } else if (view === "contacts") {
      this.renderContacts();
    } else if (view === "catalyst") {
      this.renderCatalystPage();
    } else if (view === "settings") {
      this.renderSettings();
    }
  },

  renderAll() {
    this.renderDashboard();
    this.renderPipeline();
    this.renderContacts();
    this.renderSettings();
  },

  setupListeners() {
    // Theme toggle listener
    const themeToggle = document.getElementById("theme-toggle");
    if (themeToggle) {
      themeToggle.addEventListener("change", (e) => {
        const theme = e.target.checked ? "dark" : "light";
        this.setTheme(theme);
      });
    }

    // Task quick-add form
    const taskForm = document.getElementById("quick-task-form");
    if (taskForm) {
      taskForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const input = document.getElementById("new-task-input");
        const priority = document.getElementById("new-task-priority").value;
        const text = input.value.trim();
        if (text) {
          const newTask = {
            id: `task-${Date.now()}`,
            text: text,
            done: false,
            priority: priority,
            dueDate: new Date().toISOString().split("T")[0]
          };
          this.tasks.unshift(newTask);
          this.saveState("tasks", this.tasks);
          input.value = "";
          this.renderDashboard();
          this.showNotification("Aufgabe hinzugefügt!");
        }
      });
    }

    // Lead drawer close button
    const closeDrawerBtn = document.getElementById("close-drawer-btn");
    if (closeDrawerBtn) {
      closeDrawerBtn.addEventListener("click", () => this.closeLeadDrawer());
    }

    // Setup Lead Modal triggers
    const addLeadBtn = document.getElementById("add-lead-btn");
    const leadModal = document.getElementById("lead-modal");
    const cancelLeadBtn = document.getElementById("cancel-lead-btn");
    const leadForm = document.getElementById("lead-form");

    if (addLeadBtn && leadModal) {
      addLeadBtn.addEventListener("click", () => {
        // Populate campaign select dropdown
        const campaignSelect = document.getElementById("lead-campaign-select");
        if (campaignSelect) {
          campaignSelect.innerHTML = this.campaigns.map(c => 
            `<option value="${c.id}">${c.name}</option>`
          ).join("");
        }
        leadModal.classList.add("open");
      });
    }

    if (cancelLeadBtn && leadModal) {
      cancelLeadBtn.addEventListener("click", () => {
        leadModal.classList.remove("open");
      });
    }

    if (leadForm) {
      leadForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("lead-name").value.trim();
        const company = document.getElementById("lead-company").value.trim();
        const email = document.getElementById("lead-email").value.trim();
        const phone = document.getElementById("lead-phone").value.trim();
        const value = parseFloat(document.getElementById("lead-value").value) || 0;
        const campaignId = document.getElementById("lead-campaign-select").value;
        const stage = document.getElementById("lead-stage-select").value;
        const notes = document.getElementById("lead-notes").value.trim();

        if (name && company) {
          const selectedCamp = this.campaigns.find(c => c.id === campaignId);
          const newLead = {
            id: `lead-${Date.now()}`,
            name,
            company,
            email,
            phone,
            value,
            stage,
            campaignId,
            campaignName: selectedCamp ? selectedCamp.name : "",
            notes,
            interactions: [{ date: new Date().toISOString().split("T")[0], type: "Lead Erstellt", note: "Lead manuell im CRM angelegt." }]
          };

          this.leads.unshift(newLead);
          this.saveState("leads", this.leads);

          // Add to contacts if not already present
          if (!this.contacts.some(c => c.email === email)) {
            const newContact = {
              id: `cont-${Date.now()}`,
              name,
              company,
              email,
              phone,
              status: "Active",
              campaign: selectedCamp ? selectedCamp.name : "Keine"
            };
            this.contacts.unshift(newContact);
            this.saveState("contacts", this.contacts);
          }

          leadForm.reset();
          leadModal.classList.remove("open");
          this.renderPipeline();
          this.showNotification("Lead erfolgreich erstellt!");
        }
      });
    }
  },

  showNotification(message, type = "success") {
    const container = document.getElementById("notification-container");
    if (!container) return;

    const notif = document.createElement("div");
    notif.className = "toast";
    notif.style.pointerEvents = "auto";
    notif.style.opacity = "0";
    notif.style.transform = "translateY(12px)";
    notif.style.transition = "opacity 0.25s ease, transform 0.25s ease";

    const color = type === "success" ? "#34d399" : "#f43f5e";
    const icon = type === "success" 
      ? `<svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="${color}" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`
      : `<svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="${color}" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>`;

    notif.innerHTML = `${icon}<span style="font-size:0.8125rem;font-weight:600;color:${color};">${message}</span>`;
    container.appendChild(notif);

    requestAnimationFrame(() => {
      notif.style.opacity = "1";
      notif.style.transform = "translateY(0)";
    });

    setTimeout(() => {
      notif.style.opacity = "0";
      notif.style.transform = "translateY(-12px)";
      setTimeout(() => notif.remove(), 300);
    }, 3200);
  },

  renderDashboard() {
    // 1. KPI Stats
    const totalLeads = this.leads.length;
    const activeCampaigns = this.campaigns.filter(c => c.status === "Active").length;
    const wonLeads = this.leads.filter(l => l.stage === "won");
    const totalRevenue = wonLeads.reduce((sum, l) => sum + l.value, 0);
    const conversionRate = totalLeads > 0 ? Math.round((wonLeads.length / totalLeads) * 100) : 0;

    document.getElementById("stat-active-campaigns").innerText = activeCampaigns;
    document.getElementById("stat-total-leads").innerText = totalLeads;
    document.getElementById("stat-revenue").innerText = `${totalRevenue.toLocaleString("de-DE")} €`;
    document.getElementById("stat-conversion").innerText = `${conversionRate}%`;

    // 2. Tasks List
    const taskContainer = document.getElementById("dashboard-tasks");
    if (taskContainer) {
      if (this.tasks.length === 0) {
        taskContainer.innerHTML = `<p class="text-slate-500 text-sm text-center py-6">Keine Aufgaben vorhanden.</p>`;
      } else {
        taskContainer.innerHTML = this.tasks.slice(0, 5).map(task => `
          <div class="flex items-center justify-between p-3 bg-slate-900/40 hover:bg-slate-900/80 border border-slate-800 rounded-lg group transition-colors">
            <div class="flex items-center gap-3">
              <input type="checkbox" ${task.done ? "checked" : ""} 
                onclick="window.appState.toggleTask('${task.id}')"
                class="w-4.5 h-4.5 rounded border-slate-700 bg-slate-950 text-indigo-500 focus:ring-indigo-500 focus:ring-offset-slate-950 cursor-pointer">
              <span class="text-sm ${task.done ? "line-through text-slate-500" : "text-slate-200"}">${task.text}</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-[10px] px-2 py-0.5 rounded font-semibold uppercase ${
                task.priority === "high" ? "bg-rose-950/80 text-rose-400 border border-rose-800/30" : 
                task.priority === "medium" ? "bg-amber-950/80 text-amber-400 border border-amber-800/30" : 
                "bg-slate-800 text-slate-400 border border-slate-700/55"
              }">${task.priority}</span>
              <button onclick="window.appState.deleteTask('${task.id}')" class="text-slate-500 hover:text-rose-400 opacity-0 group-hover:opacity-100 transition-opacity">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
              </button>
            </div>
          </div>
        `).join("");
      }
    }

    // 3. Render SVG Charts
    this.renderDashboardCharts();

    // 4. Render Recent Activities
    this.renderRecentActivities();
  },

  toggleTask(id) {
    const task = this.tasks.find(t => t.id === id);
    if (task) {
      task.done = !task.done;
      this.saveState("tasks", this.tasks);
      this.renderDashboard();
      this.showNotification(task.done ? "Aufgabe erledigt!" : "Aufgabe reaktiviert!");
    }
  },

  deleteTask(id) {
    this.tasks = this.tasks.filter(t => t.id !== id);
    this.saveState("tasks", this.tasks);
    this.renderDashboard();
    this.showNotification("Aufgabe gelöscht.");
  },

  renderDashboardCharts() {
    // Generate beautiful inline SVGs for dashboard visualizations
    const chartContainer = document.getElementById("analytics-chart-container");
    if (!chartContainer) return;

    // Calculate dynamic coordinates for campaign performance
    // Months: Jan - Jun
    const dataPoints = [30, 45, 38, 55, 65, 78]; // conversions
    const months = ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun"];
    const width = 500;
    const height = 180;
    const padding = 30;

    const points = dataPoints.map((val, idx) => {
      const x = padding + (idx * (width - padding * 2) / (dataPoints.length - 1));
      const y = height - padding - (val * (height - padding * 2) / 100);
      return { x, y, val };
    });

    const linePath = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
    const areaPath = `${linePath} L ${points[points.length - 1].x} ${height - padding} L ${points[0].x} ${height - padding} Z`;

    let gridLines = "";
    for (let i = 0; i <= 4; i++) {
      const y = padding + (i * (height - padding * 2) / 4);
      const val = Math.round(100 - (i * 100 / 4));
      gridLines += `
        <line x1="${padding}" y1="${y}" x2="${width - padding}" y2="${y}" stroke="currentColor" class="text-slate-800" stroke-dasharray="4,4" />
        <text x="5" y="${y + 4}" fill="currentColor" class="text-[9px] text-slate-500 font-mono">${val}%</text>
      `;
    }

    let labels = "";
    points.forEach((p, i) => {
      labels += `
        <text x="${p.x}" y="${height - 10}" text-anchor="middle" fill="currentColor" class="text-[9px] text-slate-500 font-mono">${months[i]}</text>
        <circle cx="${p.x}" cy="${p.y}" r="4" fill="#6366f1" class="cursor-pointer hover:r-6" />
        <text x="${p.x}" y="${p.y - 8}" text-anchor="middle" fill="currentColor" class="text-[10px] text-indigo-400 font-bold font-mono opacity-0 hover:opacity-100 transition-opacity duration-200">${p.val}%</text>
      `;
    });

    chartContainer.innerHTML = `
      <div class="relative w-full h-full flex flex-col justify-between">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-sm font-semibold text-slate-200">Konversionsrate über die Zeit</h3>
          <span class="text-xs text-indigo-400 font-semibold font-mono bg-indigo-950/50 px-2 py-0.5 border border-indigo-900/40 rounded">+12.4% vs. Vormonat</span>
        </div>
        <div class="flex-grow flex items-center justify-center">
          <svg viewBox="0 0 ${width} ${height}" class="w-full h-full text-slate-400 overflow-visible">
            <defs>
              <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#6366f1" stop-opacity="0.3" />
                <stop offset="100%" stop-color="#6366f1" stop-opacity="0" />
              </linearGradient>
            </defs>
            ${gridLines}
            <path d="${areaPath}" fill="url(#chartGrad)" />
            <path d="${linePath}" fill="none" stroke="#6366f1" stroke-width="3" stroke-linecap="round" />
            ${labels}
          </svg>
        </div>
      </div>
    `;

    // 2. Render Pipeline distribution
    const pipelineContainer = document.getElementById("pipeline-chart-container");
    if (!pipelineContainer) return;

    // Calculate lead stages counts
    const stages = { new: 0, contacted: 0, proposal: 0, negotiating: 0, won: 0, lost: 0 };
    this.leads.forEach(l => {
      if (stages[l.stage] !== undefined) stages[l.stage]++;
    });

    const maxVal = Math.max(...Object.values(stages), 1);
    const stageColors = {
      new: "bg-blue-500/80",
      contacted: "bg-purple-500/80",
      proposal: "bg-amber-500/80",
      negotiating: "bg-indigo-500/80",
      won: "bg-emerald-500/80",
      lost: "bg-rose-500/80"
    };

    const barLayouts = Object.entries(stages).map(([stage, count]) => {
      const percentage = (count / maxVal) * 100;
      const displayStage = stage.toUpperCase();
      return `
        <div class="flex items-center gap-3">
          <span class="w-20 text-[10px] text-slate-400 font-semibold uppercase tracking-wider font-mono">${displayStage}</span>
          <div class="flex-grow bg-slate-800/80 rounded-full h-3 overflow-hidden border border-slate-700/50">
            <div class="${stageColors[stage]} h-full rounded-full transition-all duration-1000" style="width: ${percentage}%"></div>
          </div>
          <span class="w-6 text-right text-xs font-bold font-mono text-slate-200">${count}</span>
        </div>
      `;
    }).join("");

    pipelineContainer.innerHTML = `
      <div class="flex flex-col justify-between h-full">
        <h3 class="text-sm font-semibold text-slate-200 mb-4">Lead-Verteilung nach Stufe</h3>
        <div class="flex flex-col gap-3 justify-center">
          ${barLayouts}
        </div>
      </div>
    `;
  },

  renderRecentActivities() {
    const container = document.getElementById("recent-activities");
    if (!container) return;

    // Gather latest lead interactions and generations
    const activities = [];
    
    // Add campaign creation activity
    this.campaigns.forEach(c => {
      activities.push({
        date: c.dateCreated,
        title: `Kampagne "${c.name}" angelegt`,
        desc: `Branche: ${c.industry.toUpperCase()} | Conversion: ${c.conversion}%`,
        icon: `<svg class="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>`
      });
    });

    // Add latest interactions
    this.leads.forEach(l => {
      l.interactions.forEach(inter => {
        activities.push({
          date: inter.date,
          title: `${l.name} (${l.company})`,
          desc: `${inter.type}: ${inter.note}`,
          icon: `<svg class="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>`
        });
      });
    });

    // Sort by date desc
    activities.sort((a, b) => new Date(b.date) - new Date(a.date));

    if (activities.length === 0) {
      container.innerHTML = `<p class="text-slate-500 text-xs text-center py-4">Noch keine Aktivitäten verzeichnet.</p>`;
    } else {
      container.innerHTML = activities.slice(0, 4).map(act => `
        <div class="flex gap-3 relative pb-4 last:pb-0">
          <!-- Timeline line -->
          <div class="absolute top-6 bottom-0 left-3.5 w-0.5 bg-slate-800 last:hidden"></div>
          <div class="w-7 h-7 rounded-full bg-slate-950 flex items-center justify-center border border-slate-800 z-10">
            ${act.icon}
          </div>
          <div>
            <div class="flex items-center gap-2">
              <span class="text-sm font-semibold text-slate-200">${act.title}</span>
              <span class="text-[9px] font-mono text-slate-500">${act.date}</span>
            </div>
            <p class="text-xs text-slate-400 mt-0.5">${act.desc}</p>
          </div>
        </div>
      `).join("");
    }
  },

  // --- CAMPAIGN CATALYST VIEWS & ACTION ---
  renderCatalystPage() {
    // Check if we have an ongoing asset generation
    const outputArea = document.getElementById("catalyst-outputs");
    if (this.generatedAssets) {
      outputArea.classList.add("show");
      this.renderGeneratedAssets();
    } else {
      outputArea.classList.remove("show");
    }

    // Set up form submission
    const form = document.getElementById("catalyst-form");
    if (form) {
      // Remove old listener if exists
      const newForm = form.cloneNode(true);
      form.parentNode.replaceChild(newForm, form);

      newForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        
        // Inputs
        const prodNameInput = document.getElementById("cat-product-name");
        const audienceInput = document.getElementById("cat-target-audience");
        const industry = document.getElementById("cat-industry").value;
        const tone = document.getElementById("cat-tone").value;

        // Reset errors
        prodNameInput.classList.remove("border-rose-500", "focus:ring-rose-500");
        audienceInput.classList.remove("border-rose-500", "focus:ring-rose-500");
        document.getElementById("err-product-name").classList.remove("show");
        document.getElementById("err-target-audience").classList.remove("show");

        let hasError = false;

        // Validation checks
        if (!prodNameInput.value.trim()) {
          prodNameInput.classList.add("error");
          document.getElementById("err-product-name").classList.add("show");
          setTimeout(() => prodNameInput.classList.remove("error"), 800);
          hasError = true;
        }

        if (!audienceInput.value.trim()) {
          audienceInput.classList.add("error");
          document.getElementById("err-target-audience").classList.add("show");
          setTimeout(() => audienceInput.classList.remove("error"), 800);
          hasError = true;
        }

        if (hasError) {
          this.showNotification("Bitte füllen Sie alle markierten Pflichtfelder aus.", "error");
          return;
        }

        // Show generation logger
        const logBox = document.getElementById("generation-log-box");
        const logList = document.getElementById("generation-logs");
        const catalystBtn = document.getElementById("catalyze-btn");

        logBox.classList.add("show");
        logList.innerHTML = "";
        catalystBtn.disabled = true;
        catalystBtn.classList.add("opacity-50", "cursor-not-allowed");
        
        // Save inputs to temporary variables
        this.tempCampaignData = {
          name: prodNameInput.value.trim() + " Campaign",
          productName: prodNameInput.value.trim(),
          targetAudience: audienceInput.value.trim(),
          industry,
          tone
        };

        // Hook log callback
        window.onGenerationProgress = (message) => {
          const item = document.createElement("li");
          item.className = "flex items-center gap-2 text-xs font-mono text-indigo-300 animate-fade-in";
          item.innerHTML = `
            <svg class="w-4 h-4 text-indigo-400 animate-spin" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            <span>${message}</span>
          `;
          
          // Style previous entries as completed
          const prevItems = logList.querySelectorAll("li");
          if (prevItems.length > 0) {
            const last = prevItems[prevItems.length - 1];
            last.querySelector("svg").outerHTML = `<svg class="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>`;
            last.classList.remove("text-indigo-300");
            last.classList.add("text-slate-400");
          }

          logList.appendChild(item);
          logList.scrollTop = logList.scrollHeight;
        };

        try {
          const assets = await window.aiService.generateCampaign(
            this.tempCampaignData.productName,
            this.tempCampaignData.targetAudience,
            this.tempCampaignData.industry,
            this.tempCampaignData.tone
          );
          
          this.generatedAssets = assets;
          
          // Complete last log
          const items = logList.querySelectorAll("li");
          if (items.length > 0) {
            const last = items[items.length - 1];
            last.querySelector("svg").outerHTML = `<svg class="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>`;
            last.classList.remove("text-indigo-300");
            last.classList.add("text-slate-400");
          }

          this.showNotification("Generierung erfolgreich!");
          setTimeout(() => {
            logBox.classList.remove("show");
            catalystBtn.disabled = false;
            catalystBtn.classList.remove("opacity-50", "cursor-not-allowed");
            outputArea.classList.add("show");
            this.renderGeneratedAssets();
            outputArea.scrollIntoView({ behavior: "smooth" });
          }, 800);

        } catch (err) {
          console.error(err);
          this.showNotification("Fehler bei der Asset-Generierung.", "error");
          catalystBtn.disabled = false;
          catalystBtn.classList.remove("opacity-50", "cursor-not-allowed");
        }
      });
    }
  },

  renderGeneratedAssets() {
    if (!this.generatedAssets) return;

    // Set preview image
    const bannerImg = document.getElementById("out-banner-image");
    if (bannerImg) {
      bannerImg.src = this.generatedAssets.banner;
    }

    // Set general copy
    const headlineEl = document.getElementById("out-headline");
    const adCopyEl = document.getElementById("out-ad-copy");
    if (headlineEl) headlineEl.value = this.generatedAssets.headline;
    if (adCopyEl) adCopyEl.value = this.generatedAssets.adCopy;

    // Render 3-part email drip
    const emailDripContainer = document.getElementById("out-email-drip-container");
    if (emailDripContainer) {
      emailDripContainer.innerHTML = this.generatedAssets.emails.map((email, idx) => `
        <div class="p-4 bg-slate-900/50 border border-slate-800 rounded-xl">
          <div class="flex items-center justify-between border-b border-slate-800/80 pb-3 mb-3">
            <div class="flex items-center gap-2.5">
              <span class="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-bold font-mono">#${idx + 1}</span>
              <span class="text-sm font-semibold text-indigo-300">${idx === 0 ? "E-Mail 1: Welcome & Hook" : idx === 1 ? "E-Mail 2: Value & Social Proof" : "E-Mail 3: Offer & Call-to-Action"}</span>
            </div>
            <button onclick="window.appState.copyToClipboard('email-${idx}-content', this)" 
              class="flex items-center gap-1.5 text-xs text-slate-400 hover:text-indigo-400 bg-slate-950/40 hover:bg-indigo-500/10 px-2.5 py-1 rounded border border-slate-800 transition-all cursor-pointer">
              <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg>
              Kopieren
            </button>
          </div>
          <div id="email-${idx}-content" class="text-xs font-mono text-slate-300 whitespace-pre-wrap leading-relaxed"><strong>Betreff:</strong> ${email.subject}\n\n${email.body}</div>
        </div>
      `).join("");
    }

    // Render Midjourney prompts
    const mjPromptsContainer = document.getElementById("out-mj-prompts-container");
    if (mjPromptsContainer) {
      mjPromptsContainer.innerHTML = this.generatedAssets.midjourneyPrompts.map((prompt, idx) => `
        <div class="flex flex-col gap-3 p-4 bg-slate-900/50 border border-slate-800 rounded-xl">
          <div class="flex items-center justify-between border-b border-slate-800/80 pb-2">
            <span class="text-xs font-semibold text-indigo-400 uppercase tracking-wider font-mono">Midjourney Prompt #${idx + 1}</span>
            <button onclick="window.appState.copyToClipboard('mj-prompt-${idx}-text', this)" 
              class="flex items-center gap-1.5 text-xs text-slate-400 hover:text-indigo-400 bg-slate-950/40 hover:bg-indigo-500/10 px-2.5 py-1 rounded border border-slate-800 transition-all cursor-pointer">
              <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg>
              Kopieren
            </button>
          </div>
          <div id="mj-prompt-${idx}-text" class="text-xs font-mono text-indigo-300 leading-relaxed bg-slate-950/60 p-3 rounded-lg border border-slate-900/60">${prompt}</div>
        </div>
      `).join("");
    }

    // Render LinkedIn Video script
    const videoScriptContainer = document.getElementById("out-video-script-container");
    if (videoScriptContainer) {
      videoScriptContainer.innerHTML = `
        <div class="flex flex-col gap-4 p-5 bg-slate-900/50 border border-slate-800 rounded-xl">
          <div class="flex items-center justify-between border-b border-slate-800/80 pb-3">
            <div class="flex items-center gap-2">
              <svg class="w-4 h-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
              <span class="text-sm font-semibold text-slate-200">${this.generatedAssets.videoScript.title}</span>
            </div>
            <button onclick="window.appState.copyToClipboard('video-script-text', this)" 
              class="flex items-center gap-1.5 text-xs text-slate-400 hover:text-indigo-400 bg-slate-950/40 hover:bg-indigo-500/10 px-3 py-1.5 rounded border border-slate-800 transition-all cursor-pointer">
              <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg>
              Kopieren
            </button>
          </div>
          <div id="video-script-text" class="text-xs font-mono text-slate-300 whitespace-pre-wrap leading-relaxed bg-slate-950/40 p-4 rounded-lg border border-slate-900/50">${this.generatedAssets.videoScript.script}</div>
        </div>
      `;
    }
  },

  async copyToClipboard(elementId, buttonEl) {
    const el = document.getElementById(elementId);
    if (!el) return;

    let textToCopy = "";
    if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
      textToCopy = el.value;
    } else {
      textToCopy = el.innerText;
    }

    try {
      await navigator.clipboard.writeText(textToCopy);
      this.showNotification("In Zwischenablage kopiert!");
      
      // Visual feedback on button
      if (buttonEl) {
        const originalHTML = buttonEl.innerHTML;
        buttonEl.innerHTML = `
          <svg class="w-3.5 h-3.5 text-emerald-400 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
          Kopiert!
        `;
        buttonEl.classList.add("text-emerald-400", "bg-emerald-500/10", "border-emerald-500/30");
        setTimeout(() => {
          buttonEl.innerHTML = originalHTML;
          buttonEl.classList.remove("text-emerald-400", "bg-emerald-500/10", "border-emerald-500/30");
        }, 2000);
      }
    } catch (err) {
      console.error(err);
      this.showNotification("Kopieren fehlgeschlagen.", "error");
    }
  },

  switchCatalystTab(tabName, btn) {
    const tabs = ["copy", "emails", "prompts", "video"];
    
    // Toggle active state on tab buttons
    const buttons = btn.parentNode.querySelectorAll("button");
    buttons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    // Toggle content panes using .active class
    tabs.forEach(t => {
      const pane = document.getElementById(`cat-tab-${t}`);
      if (pane) pane.classList.toggle("active", t === tabName);
    });
  },

  deployCampaignToCRM() {
    if (!this.generatedAssets || !this.tempCampaignData) return;

    // 1. Save Campaign to database
    const newCampId = `camp-${Date.now()}`;
    const newCamp = {
      id: newCampId,
      name: this.tempCampaignData.name,
      productName: this.tempCampaignData.productName,
      targetAudience: this.tempCampaignData.targetAudience,
      industry: this.tempCampaignData.industry,
      tone: this.tempCampaignData.tone,
      status: "Active",
      leadsCount: 2,
      revenue: 0,
      conversion: 0,
      dateCreated: new Date().toISOString().split("T")[0],
      assets: this.generatedAssets
    };

    this.campaigns.unshift(newCamp);
    this.saveState("campaigns", this.campaigns);

    // 2. Generate 2 new leads associated with this campaign
    const mockNames = [
      { name: "Dr. Alexander Neumann", company: "Cybertech Systems", email: "a.neumann@cybertech.de" },
      { name: "Laura Brandt", company: "NextGen Media", email: "laura@nextgenmedia.com" }
    ];

    mockNames.forEach((n, idx) => {
      const newLead = {
        id: `lead-${Date.now()}-${idx}`,
        name: n.name,
        company: n.company,
        email: n.email,
        phone: `+49 176 ${Math.floor(10000000 + Math.random() * 90000000)}`,
        value: Math.floor(4000 + Math.random() * 8000),
        stage: "new",
        campaignId: newCampId,
        campaignName: newCamp.name,
        notes: `Generiert über AI-Katalysator Kampagne "${newCamp.name}". Interesse bekundet durch Banner-Click.`,
        interactions: [
          { date: new Date().toISOString().split("T")[0], type: "Kampagnen-Click", note: `Nutzer hat Kampagnen-Banner gesehen und reagiert.` }
        ]
      };
      this.leads.unshift(newLead);

      // Add to contacts
      if (!this.contacts.some(c => c.email === n.email)) {
        this.contacts.unshift({
          id: `cont-${Date.now()}-${idx}`,
          name: n.name,
          company: n.company,
          email: n.email,
          phone: newLead.phone,
          status: "Active",
          campaign: newCamp.name
        });
      }
    });

    this.saveState("leads", this.leads);
    this.saveState("contacts", this.contacts);

    // Clear generated buffer
    this.generatedAssets = null;
    this.tempCampaignData = null;

    // Reset Campaign inputs
    document.getElementById("cat-product-name").value = "";
    document.getElementById("cat-target-audience").value = "";
    document.getElementById("catalyst-outputs").classList.remove("show");

    this.showNotification("Kampagne erfolgreich im CRM aktiviert und 2 Leads zugeordnet!");
    
    // Route to CRM view
    window.location.hash = "#crm";
  },

  discardCampaign() {
    this.generatedAssets = null;
    this.tempCampaignData = null;
    document.getElementById("cat-product-name").value = "";
    document.getElementById("cat-target-audience").value = "";
    document.getElementById("catalyst-outputs").classList.remove("show");
    this.showNotification("Entwurf verworfen.");
  },


  // --- CRM KANBAN PIPELINE FUNCTIONS ---
  renderPipeline() {
    const columns = {
      new: document.getElementById("col-new"),
      contacted: document.getElementById("col-contacted"),
      proposal: document.getElementById("col-proposal"),
      negotiating: document.getElementById("col-negotiating"),
      won: document.getElementById("col-won"),
      lost: document.getElementById("col-lost")
    };

    // Reset columns HTML
    Object.values(columns).forEach(col => {
      if (col) col.innerHTML = "";
    });

    // Populate leads into columns
    this.leads.forEach(lead => {
      const col = columns[lead.stage];
      if (!col) return;

      const card = document.createElement("div");
      card.className = "flex flex-col gap-2.5 p-3.5 bg-slate-900/70 hover:bg-slate-900/90 border border-slate-800 hover:border-slate-700/60 rounded-xl cursor-grab active:cursor-grabbing transition-all select-none duration-150";
      card.setAttribute("draggable", "true");
      card.setAttribute("id", lead.id);

      // Drag event handlers
      card.addEventListener("dragstart", (e) => {
        e.dataTransfer.setData("text/plain", lead.id);
        card.classList.add("opacity-40");
      });
      card.addEventListener("dragend", () => {
        card.classList.remove("opacity-40");
      });

      // Card Click goes to drawer
      card.addEventListener("click", (e) => {
        // Prevent opening drawer if dragging or clicking buttons inside card
        if (e.target.closest("button") || e.target.closest("a")) return;
        this.openLeadDrawer(lead.id);
      });

      // Initials for avatar
      const initials = lead.name.split(" ").map(n => n[0]).join("").toUpperCase().substring(0, 2);

      // Style badge based on campaign color
      const isTech = lead.campaignName.toLowerCase().includes("synergy");
      const campaignBadge = lead.campaignName 
        ? `<span class="text-[9px] px-1.5 py-0.5 rounded font-mono font-semibold truncate max-w-[120px] ${
            isTech 
              ? "bg-indigo-950/80 text-indigo-400 border border-indigo-900/30" 
              : "bg-emerald-950/80 text-emerald-400 border border-emerald-900/30"
          }">${lead.campaignName}</span>`
        : "";

      card.innerHTML = `
        <div class="flex items-center justify-between gap-2">
          <div class="flex items-center gap-2 min-w-0">
            <div class="w-6 h-6 rounded-full bg-slate-800 text-slate-300 text-[10px] font-bold flex items-center justify-center flex-shrink-0 border border-slate-700/50">${initials}</div>
            <span class="text-xs font-semibold text-slate-200 truncate">${lead.name}</span>
          </div>
          <div class="flex items-center gap-1">
            <button onclick="window.appState.moveLeadStep('${lead.id}', -1)" class="p-1 hover:bg-slate-800 rounded text-slate-500 hover:text-slate-300 cursor-pointer lg:hidden">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button onclick="window.appState.moveLeadStep('${lead.id}', 1)" class="p-1 hover:bg-slate-800 rounded text-slate-500 hover:text-slate-300 cursor-pointer lg:hidden">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        </div>
        <div class="text-[11px] text-slate-400 font-medium">${lead.company}</div>
        <div class="flex items-center justify-between gap-2 mt-1">
          <span class="text-xs font-bold text-indigo-400 font-mono">${lead.value.toLocaleString("de-DE")} €</span>
          ${campaignBadge}
        </div>
      `;

      col.appendChild(card);
    });

    // Column drop configurations
    Object.entries(columns).forEach(([stage, colEl]) => {
      if (!colEl) return;

      // Drop zones styling
      colEl.addEventListener("dragover", (e) => {
        e.preventDefault();
        colEl.classList.add("bg-slate-900/40", "border-indigo-500/20");
      });

      colEl.addEventListener("dragleave", () => {
        colEl.classList.remove("bg-slate-900/40", "border-indigo-500/20");
      });

      colEl.addEventListener("drop", (e) => {
        e.preventDefault();
        colEl.classList.remove("bg-slate-900/40", "border-indigo-500/20");
        const leadId = e.dataTransfer.getData("text/plain");
        this.updateLeadStage(leadId, stage);
      });
    });

    // Update column totals
    this.updatePipelineSummaries();
  },

  updatePipelineSummaries() {
    const stages = ["new", "contacted", "proposal", "negotiating", "won", "lost"];
    stages.forEach(stage => {
      const stageLeads = this.leads.filter(l => l.stage === stage);
      const countEl = document.getElementById(`count-${stage}`);
      const valEl = document.getElementById(`val-${stage}`);

      if (countEl) countEl.innerText = stageLeads.length;
      if (valEl) {
        const sum = stageLeads.reduce((acc, l) => acc + l.value, 0);
        valEl.innerText = `${sum.toLocaleString("de-DE")} €`;
      }
    });
  },

  moveLeadStep(leadId, direction) {
    const stages = ["new", "contacted", "proposal", "negotiating", "won", "lost"];
    const lead = this.leads.find(l => l.id === leadId);
    if (!lead) return;

    const currentIdx = stages.indexOf(lead.stage);
    let nextIdx = currentIdx + direction;
    if (nextIdx >= 0 && nextIdx < stages.length) {
      this.updateLeadStage(leadId, stages[nextIdx]);
    }
  },

  updateLeadStage(leadId, newStage) {
    const lead = this.leads.find(l => l.id === leadId);
    if (lead && lead.stage !== newStage) {
      const oldStage = lead.stage;
      lead.stage = newStage;
      
      // Log interaction
      lead.interactions.unshift({
        date: new Date().toISOString().split("T")[0],
        type: "Statuswechsel",
        note: `Phase von "${oldStage.toUpperCase()}" auf "${newStage.toUpperCase()}" verschoben.`
      });

      this.saveState("leads", this.leads);
      this.renderPipeline();
      this.showNotification(`${lead.name} verschoben nach ${newStage.toUpperCase()}`);
      
      // If drawer is open, refresh it
      const drawer = document.getElementById("lead-drawer");
      if (drawer && drawer.classList.contains("open") && drawer.getAttribute("data-lead-id") === leadId) {
        this.openLeadDrawer(leadId);
      }
    }
  },

  openLeadDrawer(leadId) {
    const lead = this.leads.find(l => l.id === leadId);
    if (!lead) return;

    const drawer = document.getElementById("lead-drawer");
    if (!drawer) return;

    drawer.setAttribute("data-lead-id", leadId);

    // Fill details
    document.getElementById("drawer-name").innerText = lead.name;
    document.getElementById("drawer-company").innerText = lead.company;
    document.getElementById("drawer-email").innerText = lead.email;
    document.getElementById("drawer-email").href = `mailto:${lead.email}`;
    document.getElementById("drawer-phone").innerText = lead.phone || "Keine Nummer";
    document.getElementById("drawer-phone").href = lead.phone ? `tel:${lead.phone}` : "#";
    document.getElementById("drawer-value").innerText = `${lead.value.toLocaleString("de-DE")} €`;
    document.getElementById("drawer-campaign").innerText = lead.campaignName || "Keine";

    // Textarea notes
    const notesArea = document.getElementById("drawer-notes-input");
    notesArea.value = lead.notes || "";
    // Save on blur
    notesArea.onblur = () => {
      lead.notes = notesArea.value;
      this.saveState("leads", this.leads);
    };

    // Render interactions logs
    const logsEl = document.getElementById("drawer-interactions-logs");
    if (logsEl) {
      logsEl.innerHTML = lead.interactions.map(i => `
        <div class="p-2.5 bg-slate-950/40 rounded border border-slate-900 flex flex-col gap-1 text-xs">
          <div class="flex items-center justify-between gap-2 text-slate-500 font-mono text-[9px]">
            <span>${i.date}</span>
            <span class="font-bold text-slate-400 uppercase tracking-wide">${i.type}</span>
          </div>
          <p class="text-slate-300">${i.note}</p>
        </div>
      `).join("");
    }

    // Prepare quick-email template generator based on associated campaign
    const emailActionEl = document.getElementById("drawer-email-template-actions");
    if (emailActionEl) {
      const associatedCampaign = this.campaigns.find(c => c.id === lead.campaignId);
      if (associatedCampaign && associatedCampaign.assets && associatedCampaign.assets.emails) {
        emailActionEl.innerHTML = `
          <div class="flex flex-col gap-2">
            <span class="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Passende AI-E-Mail Vorlagen</span>
            <div class="grid grid-cols-3 gap-1.5">
              ${associatedCampaign.assets.emails.map((email, idx) => `
                <button onclick="window.appState.openQuickEmailModal('${lead.id}', ${idx})" 
                  class="text-[10px] bg-slate-900 border border-slate-800 text-indigo-400 hover:bg-indigo-950/40 hover:text-indigo-300 font-semibold px-2 py-1.5 rounded transition-all truncate cursor-pointer">
                  Muster ${idx + 1}
                </button>
              `).join("")}
            </div>
          </div>
        `;
      } else {
        emailActionEl.innerHTML = `
          <div class="text-xs text-slate-500 py-2">
            Keine Kampagnen-E-Mail Vorlagen verknüpft. Erstellen Sie eine Kampagne im Catalyst, um Vorlagen freizuschalten.
          </div>
        `;
      }
    }

    // Open drawer
    drawer.classList.add("open");
  },

  closeLeadDrawer() {
    const drawer = document.getElementById("lead-drawer");
    if (drawer) {
      drawer.classList.remove("open");
    }
  },

  // Modal displaying quick email copy template
  openQuickEmailModal(leadId, emailIdx) {
    const lead = this.leads.find(l => l.id === leadId);
    const campaign = this.campaigns.find(c => c.id === lead.campaignId);
    if (!lead || !campaign || !campaign.assets || !campaign.assets.emails[emailIdx]) return;

    const emailTemplate = campaign.assets.emails[emailIdx];

    const modal = document.getElementById("quick-email-modal");
    if (!modal) return;

    // Replace placeholders with target name
    const processBody = (body) => {
      return body
        .replace(/\[Target Audience\]/g, lead.name)
        .replace(/\[Product Name\]/g, campaign.productName || "unser Produkt");
    };

    const subject = emailTemplate.subject.replace(/\[Target Audience\]/g, lead.name);
    const body = processBody(emailTemplate.body);

    document.getElementById("q-email-subject").innerText = subject;
    document.getElementById("q-email-body").innerText = body;

    // Set copy button
    const copyBtn = document.getElementById("q-email-copy-btn");
    copyBtn.onclick = () => {
      const fullText = `Betreff: ${subject}\n\n${body}`;
      navigator.clipboard.writeText(fullText);
      this.showNotification("E-Mail kopiert!");
      
      // Log interaction
      lead.interactions.unshift({
        date: new Date().toISOString().split("T")[0],
        type: "E-Mail Kopiert",
        note: `AI-E-Mail Vorlage #${emailIdx + 1} kopiert zur Kontaktaufnahme.`
      });
      this.saveState("leads", this.leads);
      this.openLeadDrawer(leadId);

      // Close modal
      modal.classList.remove("open");
    };

    modal.classList.add("open");
  },

  closeQuickEmailModal() {
    const modal = document.getElementById("quick-email-modal");
    if (modal) {
      modal.classList.remove("open");
    }
  },

  addInteraction(type) {
    const drawer = document.getElementById("lead-drawer");
    if (!drawer) return;
    const leadId = drawer.getAttribute("data-lead-id");
    const lead = this.leads.find(l => l.id === leadId);
    if (!lead) return;

    let note = "";
    if (type === "Anruf") {
      note = "Verkaufsgespräch geführt. Leads wünscht Rückruf in 3 Tagen.";
    } else if (type === "E-Mail") {
      note = "E-Mail über externes E-Mail System gesendet.";
    } else if (type === "Notiz") {
      note = prompt("Geben Sie eine Notiz ein:") || "";
    }

    if (note) {
      lead.interactions.unshift({
        date: new Date().toISOString().split("T")[0],
        type,
        note
      });
      this.saveState("leads", this.leads);
      this.openLeadDrawer(leadId);
      this.showNotification("Interaktion protokolliert!");
    }
  },

  // --- CONTACTS VIEW ---
  renderContacts() {
    const body = document.getElementById("contacts-table-body");
    if (!body) return;

    const search = document.getElementById("contacts-search").value.toLowerCase();
    const filterCampaign = document.getElementById("contacts-campaign-filter").value;

    // Populate filter dropdown
    const filterSelect = document.getElementById("contacts-campaign-filter");
    if (filterSelect && filterSelect.options.length <= 1) {
      const campaignNames = [...new Set(this.contacts.map(c => c.campaign))];
      campaignNames.forEach(name => {
        if (name) {
          const opt = document.createElement("option");
          opt.value = name;
          opt.innerText = name;
          filterSelect.appendChild(opt);
        }
      });
    }

    // Filtered list
    const filtered = this.contacts.filter(c => {
      const matchSearch = c.name.toLowerCase().includes(search) || 
                          c.company.toLowerCase().includes(search) || 
                          c.email.toLowerCase().includes(search);
      const matchCampaign = !filterCampaign || c.campaign === filterCampaign;
      return matchSearch && matchCampaign;
    });

    if (filtered.length === 0) {
      body.innerHTML = `
        <tr>
          <td colspan="5" class="px-6 py-10 text-center text-sm text-slate-500">Keine Kontakte gefunden.</td>
        </tr>
      `;
    } else {
      body.innerHTML = filtered.map(c => `
        <tr class="border-b border-slate-800/80 hover:bg-slate-900/30 transition-colors">
          <td class="px-6 py-4 whitespace-nowrap text-sm font-semibold text-slate-200">${c.name}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-400">${c.company}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm font-mono text-slate-400">${c.email}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm">
            <span class="px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
              c.status === "Active" 
                ? "bg-emerald-950/60 text-emerald-400 border-emerald-800/30" 
                : "bg-slate-800 text-slate-500 border-slate-700/50"
            }">${c.status === "Active" ? "Aktiv" : "Inaktiv"}</span>
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-xs text-indigo-300 truncate max-w-[150px]">${c.campaign}</td>
        </tr>
      `).join("");
    }
  },

  filterContacts() {
    this.renderContacts();
  },

  // --- SETTINGS VIEW ---
  renderSettings() {
    const keyInput = document.getElementById("set-gemini-key");
    const modelSelect = document.getElementById("set-gemini-model");

    if (keyInput) {
      keyInput.value = localStorage.getItem("gemini_api_key") || "";
    }
    if (modelSelect) {
      modelSelect.value = localStorage.getItem("gemini_model") || "gemini-1.5-flash";
    }
  },

  saveSettingsForm() {
    const keyInput = document.getElementById("set-gemini-key");
    const modelSelect = document.getElementById("set-gemini-model");

    if (keyInput && modelSelect) {
      const key = keyInput.value.trim();
      const model = modelSelect.value;

      if (key) {
        localStorage.setItem("gemini_api_key", key);
      } else {
        localStorage.removeItem("gemini_api_key");
      }
      localStorage.setItem("gemini_model", model);

      this.showNotification("Einstellungen erfolgreich gespeichert!");
      this.renderSettings();
    }
  },

  resetDemoData() {
    if (confirm("Möchten Sie wirklich alle Daten zurücksetzen? Ihre Änderungen gehen verloren.")) {
      localStorage.removeItem("crm_campaigns");
      localStorage.removeItem("crm_leads");
      localStorage.removeItem("crm_contacts");
      localStorage.removeItem("crm_tasks");
      
      this.campaigns = [...window.mockData.initialCampaigns];
      this.leads = [...window.mockData.initialLeads];
      this.contacts = [...window.mockData.initialContacts];
      this.tasks = [...window.mockData.initialTasks];

      this.saveState("campaigns", this.campaigns);
      this.saveState("leads", this.leads);
      this.saveState("contacts", this.contacts);
      this.saveState("tasks", this.tasks);

      this.showNotification("Daten erfolgreich zurückgesetzt.");
      this.renderAll();
      window.location.hash = "#dashboard";
    }
  }
};

// Initialize App on DOM load
document.addEventListener("DOMContentLoaded", () => {
  window.appState.init();
});
