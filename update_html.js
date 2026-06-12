const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Add Dark Mode Toggle and Download Button to header
html = html.replace(
    /<div class="bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl flex items-center gap-3">/g,
    `<div class="flex items-center gap-4">
          <button id="themeToggle" class="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-400 transition" title="Theme umschalten">
            <span id="themeIcon">☀️</span>
          </button>
          <button id="downloadBtn" class="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-cyan-400 text-sm font-bold transition flex items-center gap-2">
            <span>⬇️</span> Assets Exportieren
          </button>
          <div class="bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl flex items-center gap-3">`
);
html = html.replace(/<\/div>\s*<\/header>/, '</div>\n        </div>\n      </header>');

// 2. Add Reset Button to ROI Widget
html = html.replace(
    /<div class="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center flex flex-col justify-center h-\[50px\] md:h-auto">/,
    `<div class="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center flex flex-col justify-center h-[50px] md:h-auto relative">
            <button id="resetRoiBtn" class="absolute top-2 right-2 text-xs text-slate-500 hover:text-cyan-400 transition" title="Standardwerte wiederherstellen">🔄</button>`
);

// 3. Map hardcoded slate classes to support Light Mode using Tailwind dark: variant
const classMap = {
    'bg-slate-950': 'bg-slate-50 dark:bg-slate-950',
    'bg-slate-900': 'bg-white dark:bg-slate-900',
    'bg-slate-800': 'bg-slate-100 dark:bg-slate-800',
    'bg-slate-700': 'bg-slate-200 dark:bg-slate-700',
    'text-slate-100': 'text-slate-900 dark:text-slate-100',
    'text-slate-200': 'text-slate-800 dark:text-slate-200',
    'text-slate-300': 'text-slate-700 dark:text-slate-300',
    'text-slate-400': 'text-slate-600 dark:text-slate-400',
    'text-slate-500': 'text-slate-500 dark:text-slate-500',
    'border-slate-800': 'border-slate-200 dark:border-slate-800',
    'border-slate-700': 'border-slate-300 dark:border-slate-700'
};

for (const [darkClass, responsiveClass] of Object.entries(classMap)) {
    // Only replace whole words (using regex boundary, but since dashes are words, we use lookarounds)
    const regex = new RegExp(`(?<!dark:)\\b${darkClass}\\b`, 'g');
    html = html.replace(regex, responsiveClass);
}

fs.writeFileSync('index.html', html);
console.log('index.html updated successfully.');
