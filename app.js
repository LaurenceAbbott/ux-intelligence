const DATA = window.UX_DATA;
const app = document.getElementById('app');
const searchInput = document.getElementById('globalSearch');
const sidebar = document.getElementById('sidebar');
const AI_REVIEW_ENDPOINT = "https://long-rain-83b1ux-ai-review-agent.laurence-ogi.workers.dev/review-image";
document.getElementById('menuBtn').addEventListener('click', () => sidebar.classList.toggle('open'));

const esc = (str='') => String(str).replace(/[&<>"']/g, s => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[s]));
const slugify = (str='') => String(str).toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'');
const bySlug = slug => DATA.cards.find(c => c.Slug === slug);
const sectionSlug = name => DATA.sections.find(s => s.name === name)?.slug || slugify(name);

function setActive(route){
  document.querySelectorAll('.nav a').forEach(a => a.classList.toggle('active', a.dataset.route === route));
}

function renderBreadcrumbs(items = []){
  if(!items.length) return '';
  const links = items.map((item, index) => {
    const isCurrent = index === items.length - 1;
    if(isCurrent){
      return `<li aria-current="page"><span>${esc(item.label)}</span></li>`;
    }
    return `<li><a href="${item.href}">${esc(item.label)}</a></li>`;
  }).join('');
  return `<nav class="breadcrumbs" aria-label="Breadcrumb"><ol>${links}</ol></nav>`;
}

function render(){
  window.scrollTo({ top: 0, behavior: 'auto' });
  const hash = location.hash.replace(/^#/, '') || 'home';
  const [route, ...parts] = hash.split('/');
  setActive(route);
  sidebar.classList.remove('open');

  if(route === 'home') return renderHome();
  if(route === 'value') return renderValue();
  if(route === 'library') return renderLibrary();
  if(route === 'section') return renderSection(parts.join('/'));
  if(route === 'card') return renderCard(parts.join('/'));
  if(route === 'evaluation') return renderEvaluation();
  if(route === 'ai-design-review') return renderAiDesignReview();
  if(route === 'standards') return renderStandards();
  if(route === 'anti-patterns') return renderAntiPatterns();
  if(route === 'playbooks') return renderPlaybooks();
  if(route === 'sources') return renderSources();
  renderHome();
}

function statCards(){
  const categories = new Set(DATA.cards.map(c => c["Reference to taxonomy"]));
  return `
    <div class="grid cols-4 section">
      <div class="panel"><h3>${DATA.cards.length}</h3><p>Evidence intelligence cards</p></div>
      <div class="panel"><h3>${categories.size}</h3><p>Framework sections</p></div>
      <div class="panel"><h3>${DATA.antiPatterns.length}</h3><p>Anti-UX patterns</p></div>
      <div class="panel"><h3>${DATA.playbooks.length}</h3><p>Operational playbooks</p></div>
    </div>
  `;
}

function renderHome(){
  app.innerHTML = `
    ${renderBreadcrumbs([{ label: 'Framework', href: '#home' }])}
    <section class="hero">
      <span class="kicker">Evidence-led enterprise UX</span>
      <h1>Operational UX Intelligence Framework</h1>
      <p>A complete local prototype for the framework: evidence cards, section filters, value mapping, anti-patterns, standards, playbooks and an interactive UX review scorecard.</p>
      <div class="hero-actions">
        <a class="btn primary" href="#library">Browse the evidence library</a>
        <a class="btn" href="#value">Prove the value of UX</a>
        <a class="btn" href="#evaluation">Run a UX review</a>
      </div>
    </section>
    ${statCards()}
    <section class="section">
      <div class="section-header">
        <div>
          <h2 class="section-title">Browse by section</h2>
          <p class="section-subtitle">The taxonomy acts as the section/filter layer. Each section contains the evidence cards linked to that area of UX quality.</p>
        </div>
      </div>
      <div class="grid cols-3">
        ${DATA.sections.map(s => `
          <a class="card" href="#section/${s.slug}" style="text-decoration:none">
            <div class="meta-row"><span class="pill brand">${s.count} cards</span></div>
            <h3>${esc(s.name)}</h3>
            <p>${esc(s.description)}</p>
          </a>
        `).join('')}
      </div>
    </section>
    <section class="section">
      <div class="grid cols-3">
        <div class="panel highlight"><h3>Knowledge layer</h3><p>The full evidence library with research, confidence, examples, OGI considerations and value mapping.</p></div>
        <div class="panel highlight"><h3>Operational layer</h3><p>Checklists, scoring, severity and maturity to turn evidence into practical design review.</p></div>
        <div class="panel highlight"><h3>Governance layer</h3><p>Standards, anti-patterns, playbooks and sources to create consistent experience quality.</p></div>
      </div>
    </section>
  `;
}

function renderValue(){
  app.innerHTML = `
    ${renderBreadcrumbs([{ label: 'Framework', href: '#home' }, { label: 'Business Value', href: '#value' }])}
    <section class="hero">
      <span class="kicker">Business value and ROI</span>
      <h1>What is the value of good UX?</h1>
      <p>Good UX creates value by reducing operational waste, preventing rework, improving workflow speed, reducing support demand, improving accessibility, strengthening trust and making products easier to adopt.</p>
    </section>

    <section class="section grid cols-3">
      ${DATA.value.intro.map(t => `<div class="panel"><p>${esc(t)}</p></div>`).join('')}
    </section>

    <section class="section">
      <h2 class="section-title">Value types</h2>
      <div class="table-wrap"><table class="data">
        <thead><tr><th>Value type</th><th>What it means</th><th>Example</th></tr></thead>
        <tbody>${DATA.value.types.map(v => `<tr><td><strong>${esc(v.type)}</strong></td><td>${esc(v.meaning)}</td><td>${esc(v.example)}</td></tr>`).join('')}</tbody>
      </table></div>
    </section>

    <section class="section">
      <h2 class="section-title">Real-world value examples</h2>
      <div class="grid cols-2">
        ${DATA.value.realWorld.map(v => `
          <div class="panel">
            <span class="pill brand">${esc(v.source)}</span>
            <h3>${esc(v.title)}</h3>
            <p><strong>Evidence:</strong> ${esc(v.evidence)}</p>
            <p style="margin-top:10px"><strong>How to use it:</strong> ${esc(v.application)}</p>
          </div>
        `).join('')}
      </div>
    </section>

    <section class="section">
      <h2 class="section-title">ROI quick calculators</h2>
      <div class="grid cols-2">
        <div class="panel">
          <h3>Operational time saving</h3>
          <p>Estimate the potential annual value of a small repeated task saving.</p>
          <div class="calc-grid section">
            <label class="calc-field"><span>Seconds saved per task</span><input class="field" id="secondsSaved" type="number" value="15" placeholder="Seconds saved" /></label>
            <label class="calc-field"><span>Number of users</span><input class="field" id="users" type="number" value="500" placeholder="Users" /></label>
            <label class="calc-field"><span>Tasks per user per day</span><input class="field" id="tasksPerDay" type="number" value="10" placeholder="Tasks/day" /></label>
            <label class="calc-field"><span>Hourly cost (£)</span><input class="field" id="hourlyCost" type="number" value="35" placeholder="£/hour" /></label>
          </div>
          <button class="btn dark section" onclick="calcTimeSaving()">Calculate</button>
          <div id="timeSavingResult" class="panel highlight section"></div>
        </div>
        <div class="panel">
          <h3>Developer rework avoided</h3>
          <p>Estimate value when early UX review prevents late-stage change or defects.</p>
          <div class="calc-grid section">
            <label class="calc-field"><span>Issues avoided per cycle</span><input class="field" id="issuesAvoided" type="number" value="8" placeholder="Issues avoided" /></label>
            <label class="calc-field"><span>Hours per issue</span><input class="field" id="hoursPerIssue" type="number" value="6" placeholder="Hours/issue" /></label>
            <label class="calc-field"><span>Developer cost per hour (£)</span><input class="field" id="devCost" type="number" value="60" placeholder="£/hour" /></label>
            <label class="calc-field"><span>Release cycles per year</span><input class="field" id="cycles" type="number" value="4" placeholder="Cycles/year" /></label>
          </div>
          <button class="btn dark section" onclick="calcRework()">Calculate</button>
          <div id="reworkResult" class="panel highlight section"></div>
        </div>
      </div>
    </section>
  `;
}

function renderLibrary(){
  const categoryOptions = DATA.sections.map(s => `<option value="${esc(s.name)}">${esc(s.name)} (${s.count})</option>`).join('');
  app.innerHTML = `
    ${renderBreadcrumbs([{ label: 'Framework', href: '#home' }, { label: 'Evidence Library', href: '#library' }])}
    <section class="detail-hero">
      <span class="kicker">Evidence library</span>
      <h1 class="detail-title">All evidence cards</h1>
      <p class="detail-definition">Search, filter and open each evidence card. Each card has its own local page view with evidence, value, ROI impact, examples, OGI considerations and checklist prompt.</p>
    </section>
    <section class="section">
      <div class="filters">
        <input id="cardSearch" class="field" type="search" placeholder="Search cards…" />
        <select id="sectionFilter"><option value="">All sections</option>${categoryOptions}</select>
        <select id="confidenceFilter"><option value="">All confidence levels</option>${[...new Set(DATA.cards.map(c=>c.Confidence))].map(c=>`<option>${esc(c)}</option>`).join('')}</select>
        <button class="btn" onclick="resetFilters()">Reset</button>
      </div>
      <div id="cardCount" class="section-subtitle"></div>
      <div id="cardsGrid" class="card-grid section"></div>
    </section>
  `;
  document.getElementById('cardSearch').addEventListener('input', filterCards);
  document.getElementById('sectionFilter').addEventListener('change', filterCards);
  document.getElementById('confidenceFilter').addEventListener('change', filterCards);
  filterCards();
}

function cardPreview(c){
  const confClass = String(c.Confidence).toLowerCase().includes('high') ? 'good' : 'warn';
  return `
    <article class="card evidence-card">
      <div class="meta-row">
        <span class="pill">${String(c.Number).padStart(3,'0')}</span>
        <a class="pill brand" href="#section/${sectionSlug(c["Reference to taxonomy"])}">${esc(c["Reference to taxonomy"])}</a>
      </div>
      <h3>${esc(c.Name)}</h3>
      <p class="definition">${esc(c.Definition)}</p>
      <div class="meta-row">
        <span class="pill ${confClass}">${esc(c.Confidence)}</span>
        <span class="pill">${esc(c["Value type"])}</span>
      </div>
      <div class="card-footer">
        <span class="card-number">Card ${String(c.Number).padStart(3,'0')}</span>
        <a class="link" href="#card/${c.Slug}">Open card →</a>
      </div>
    </article>
  `;
}

function filterCards(){
  const q = (document.getElementById('cardSearch')?.value || '').toLowerCase();
  const section = document.getElementById('sectionFilter')?.value || '';
  const conf = document.getElementById('confidenceFilter')?.value || '';
  const filtered = DATA.cards.filter(c => {
    const hay = Object.values(c).join(' ').toLowerCase();
    return (!q || hay.includes(q)) && (!section || c["Reference to taxonomy"] === section) && (!conf || c.Confidence === conf);
  });
  document.getElementById('cardCount').textContent = `${filtered.length} cards shown`;
  document.getElementById('cardsGrid').innerHTML = filtered.map(cardPreview).join('') || `<div class="empty">No cards found.</div>`;
}

function resetFilters(){
  document.getElementById('cardSearch').value = '';
  document.getElementById('sectionFilter').value = '';
  document.getElementById('confidenceFilter').value = '';
  filterCards();
}

function renderSection(slug){
  const section = DATA.sections.find(s => s.slug === slug);
  if(!section) return renderLibrary();
  const cards = DATA.cards.filter(c => c["Reference to taxonomy"] === section.name);
  app.innerHTML = `
    ${renderBreadcrumbs([
      { label: 'Framework', href: '#home' },
      { label: 'Evidence Library', href: '#library' },
      { label: section.name, href: `#section/${section.slug}` }
    ])}
    <section class="detail-hero">
      <span class="kicker">Framework section</span>
      <h1 class="detail-title">${esc(section.name)}</h1>
      <p class="detail-definition">${esc(section.description)}</p>
      <div class="meta-row section"><span class="pill brand">${cards.length} evidence cards</span><a class="btn" href="#library">Back to all cards</a></div>
    </section>
    <section class="section card-grid">${cards.map(cardPreview).join('')}</section>
  `;
}

function renderCard(slug){
  const c = bySlug(slug);
  if(!c) return renderLibrary();
  const related = DATA.cards.filter(x => x["Reference to taxonomy"] === c["Reference to taxonomy"] && x.Slug !== c.Slug).slice(0,6);
  app.innerHTML = `
    ${renderBreadcrumbs([
      { label: 'Framework', href: '#home' },
      { label: 'Evidence Library', href: '#library' },
      { label: c["Reference to taxonomy"], href: `#section/${sectionSlug(c["Reference to taxonomy"])}` },
      { label: c.Name, href: `#card/${c.Slug}` }
    ])}
        <section class="card-layout">
      <aside class="card-meta-rail panel">
        <div class="label">Card</div>
        <p class="meta-number">#${String(c.Number).padStart(3,'0')}</p>
        <div class="meta-group">
          <div class="label">Confidence level</div>
          <p class="content-block">${esc(c.Confidence)}</p>
        </div>
                <div class="meta-group">
          <div class="label">Source</div>
          <p class="content-block">${esc(c.Source)}</p>
        </div>
                <div class="meta-group">
          <div class="label">Potential value</div>
          <p class="content-block">${esc(c["Potential value"])}</p>
        </div>
       <div class="meta-group">
          <div class="label">Operational / ROI impact</div>
          <p class="content-block">${esc(c["Operational/ROI impact"])}</p>
        </div>
      </aside>
      <div class="card-main panel">
        <div class="meta-row">
          <a class="pill brand" href="#section/${sectionSlug(c["Reference to taxonomy"])}">${esc(c["Reference to taxonomy"])}</a>
          <span class="pill good">${esc(c["Value type"])}</span>
        </div>
        <h1 class="card-main-title">${esc(c.Name)}</h1>
        <p class="detail-definition">${esc(c.Definition)}</p>
        <div class="card-chip-row">
          ${esc(c["Enterprise insurance application"]).split(',').map(item => `<span class="pill">${item.trim()}</span>`).join('')}
        </div>
        ${panel("Evidence / Research", c["Evidence / Research"])}
        <div class="compare-head">
          <h2 class="section-title">Visual good / bad example</h2>
                    <div class="meta-row">
            <span class="pill good"><span class="example-icon good">✓</span>Good example</span>
            <span class="pill bad"><span class="example-icon bad">✕</span>Bad example</span>
          </div>
        </div>
        <div class="compare">
              <div class="panel good-box"><div class="label example-label"><span class="example-icon good">✓</span>Good example</div><div class="content-block">${esc(c["Good example"])}</div></div>
          <div class="panel bad-box"><div class="label example-label"><span class="example-icon bad">✕</span>Bad example</div><div class="content-block">${esc(c["Bad example"])}</div></div>
        </div>
        ${panel("Potential metrics / signals", c["Potential metrics/signals"])}
        <div class="panel checklist-callout">
          <div class="label">Checklist prompt</div>
          <div class="content-block">${esc(c["Checklist prompt"])}</div>
        </div>
      </div>
    </section>
    <section class="section">
      <h2 class="section-title">Related cards</h2>
      <div class="card-grid">${related.map(cardPreview).join('')}</div>
    </section>
  `;
}

function panel(label, content){
  return `<div class="panel"><div class="label">${esc(label)}</div><div class="content-block">${esc(content)}</div></div>`;
}

function renderEvaluation(){
  const sectionOptions = DATA.sections.map(s => `<option value="${esc(s.name)}">${esc(s.name)}</option>`).join('');
    const workItemTypes = ['Feature', 'Epic', 'Capability', 'Journey', 'Defect', 'Improvement', 'Other'];
  const valueStreams = ['Acquire', 'Distribute', 'Serve'];
  const reviewStages = ['Discovery', 'Prototype', 'Design review', 'Pre-build', 'Pre-release', 'Post-release'];
  app.innerHTML = `
    ${renderBreadcrumbs([{ label: 'Framework', href: '#home' }, { label: 'UX Review Form', href: '#evaluation' }])}
    <section class="hero">
      <span class="kicker">Operational review</span>
      <h1>UX Review Form</h1>
     <p>Use the evidence cards as checklist prompts. Capture review details, complete Yes/No/Not applicable checks and create an evidence-led UX quality view.</p>
     </section>
    <section class="section detail-layout">
      <div>
      <div class="review-steps">
        <button type="button" class="step-chip active" data-step="1">Review details</button>
        <button type="button" class="step-chip" data-step="2">Checklist selection</button>
        <button type="button" class="step-chip" data-step="3">Review form</button>
        <button type="button" class="step-chip" data-step="4">UX score</button>
      </div>
      <div class="panel review-details-panel review-step" data-step-panel="1">
          <h3>Review details</h3>
          <div class="review-details-grid">
            <label class="check-control"><span>Work item name</span><input id="workItemName" class="field" type="text" /></label>
            <label class="check-control"><span>Work item type</span><select id="workItemType" required><option value="">Select work item type</option>${workItemTypes.map(type => `<option value="${type}">${type}</option>`).join('')}</select></label>
            <label class="check-control"><span>Value stream</span><select id="valueStream" required><option value="">Select value stream</option>${valueStreams.map(stream => `<option value="${stream}">${stream}</option>`).join('')}</select></label>
            <label class="check-control"><span>Product / area</span><input id="productArea" class="field" type="text" /></label>
            <label class="check-control"><span>Review stage</span><select id="reviewStage" required><option value="">Select review stage</option>${reviewStages.map(stage => `<option value="${stage}">${stage}</option>`).join('')}</select></label>
            <label class="check-control"><span>Reviewer</span><input id="reviewer" class="field" type="text" /></label>
          </div>
           <div class="step-actions">
            <button type="button" class="btn dark step-next" data-next-step="2">Next: Checklist selection</button>
          </div>
        </div>
        <div class="panel review-step is-hidden" data-step-panel="2">
          <h3>Checklist section</h3>
          <select id="reviewSection" required><option value="">Select checklist section</option>${sectionOptions}</select>
          <p id="reviewSectionError" class="field-error is-hidden">Please select a checklist section.</p>
          <div class="step-actions">
            <button type="button" class="btn step-back" data-prev-step="1">Back</button>
            <button type="button" class="btn dark step-next" data-next-step="3">Next: Review form</button>
          </div>
        </div>
        <div class="review-step is-hidden" data-step-panel="3">
          <div id="checklistContainer" class="checklist"></div>
          <div class="step-actions">
            <button type="button" class="btn step-back" data-prev-step="2">Back</button>
            <button type="button" class="btn dark step-next" data-next-step="4">Next: UX score</button>
          </div>
        </div>
       <div class="panel review-step is-hidden" data-step-panel="4">
          <h3>UX score</h3>
          <div class="score-output">
            <span class="kicker">UX quality score</span>
            <p class="score-big" id="scoreBig">Not scored yet</p>
            <div class="progress"><span id="scoreBar"></span></div>
            <p id="maturityText" class="section-subtitle section">UX concern rating: Not scored yet</p>
            <div id="scoreCounts" class="panel highlight section score-counts"></div>
            <div id="failedSummary" class="section"></div>
            <div class="section">
              <button class="btn dark" onclick="downloadReviewPdf()">Download PDF</button>
              <button class="btn" onclick="copyReviewSummary()">Copy summary</button>
            </div>
          </div>
          <div class="step-actions">
            <button type="button" class="btn step-back" data-prev-step="3">Back</button>
          </div>
        </div>
      </div>
    </section>
    <section class="panel section print-only" id="printFailedSection"></section>
  `;
  initEvaluationSteps();
  renderChecklist();
}

function initEvaluationSteps(){
  const stepChips = [...document.querySelectorAll('.step-chip')];
  const stepPanels = [...document.querySelectorAll('.review-step')];
  const setStep = (step) => {
    stepChips.forEach(chip => chip.classList.toggle('active', Number(chip.dataset.step) === step));
    stepPanels.forEach(panel => panel.classList.toggle('is-hidden', Number(panel.dataset.stepPanel) !== step));
  };
  stepChips.forEach(chip => chip.addEventListener('click', () => {
    const targetStep = Number(chip.dataset.step);
    const activeStep = Number(document.querySelector('.step-chip.active')?.dataset.step || 1);
    if(targetStep > activeStep){
      for(let current = activeStep; current < targetStep; current += 1){
        if(!validateStep(current)) return;
      }
    }
    setStep(targetStep);
  }));
  document.querySelectorAll('.step-next').forEach(btn => btn.addEventListener('click', () => {
    const activeStep = Number(document.querySelector('.step-chip.active')?.dataset.step || 1);
    if(!validateStep(activeStep)) return;
    setStep(Number(btn.dataset.nextStep));
  }));
  document.querySelectorAll('.step-back').forEach(btn => btn.addEventListener('click', () => setStep(Number(btn.dataset.prevStep))));
  document.getElementById('reviewSection')?.addEventListener('change', renderChecklist);
}


function validateStep(step){
  if(step === 1){
    let valid = true;
    const requiredFields = [
      { id: 'workItemName', message: 'Please enter a work item name.' },
      { id: 'workItemType', message: 'Please select a work item type.' },
      { id: 'valueStream', message: 'Please select a value stream.' },
      { id: 'reviewStage', message: 'Please select a review stage.' },
    ];
    requiredFields.forEach(({ id, message }) => {
      const el = document.getElementById(id);
      const v = (el?.value || '').trim();
      const isValid = v.length > 0;
      el?.classList.toggle('is-invalid', !isValid);
      setFieldError(el, message, !isValid);
      if(!isValid) valid = false;
    });
    return valid;
  }

  if(step === 2){
    const section = document.getElementById('reviewSection');
    const isValid = Boolean(section?.value);
    section?.classList.toggle('is-invalid', !isValid);
    const err = document.getElementById('reviewSectionError');
    err?.classList.toggle('is-hidden', isValid);
    return isValid;
  }

  if(step === 3){
    const items = [...document.querySelectorAll('.check-item')];
    let valid = true;
    items.forEach((item, idx) => {
      const selected = item.querySelector(`input[name="check-${idx}"]:checked`);
      item.classList.toggle('is-invalid', !selected);
      if(!selected) valid = false;
    });
    return valid && items.length > 0;
  }

  return true;
}

function setFieldError(el, message, show){
  if(!el) return;
  let error = el.parentElement.querySelector('.field-error');
  if(!error){
    error = document.createElement('p');
    error.className = 'field-error is-hidden';
    el.parentElement.appendChild(error);
  }
  error.textContent = message;
  error.classList.toggle('is-hidden', !show);
}

function renderChecklist(){
  const section = document.getElementById('reviewSection').value;
  const sectionError = document.getElementById('reviewSectionError');
  if(sectionError) sectionError.classList.add('is-hidden');
  const cards = DATA.cards.filter(c => c["Reference to taxonomy"] === section).slice(0,14);
  document.getElementById('checklistContainer').innerHTML = cards.map((c,i) => `
    <div class="check-item">
      <div>
        <strong>${esc(c.Name)}</strong>
        <p class="section-subtitle">${esc(c["Checklist prompt"])}</p>
      </div>
      <fieldset class="check-control toggle-group">
        <div class="segmented-control">
          <input type="radio" id="check-${i}-pass" name="check-${i}" value="pass" class="check-result">
          <label for="check-${i}-pass">Yes</label>
          <input type="radio" id="check-${i}-fail" name="check-${i}" value="fail" class="check-result">
          <label for="check-${i}-fail">No</label>
                  <input type="radio" id="check-${i}-na" name="check-${i}" value="na" class="check-result">
          <label for="check-${i}-na">Not applicable</label>
        </div>
      </fieldset>
    </div>
  `).join('');
  document.querySelectorAll('.check-result').forEach(el => {
    el.addEventListener('change', scoreChecklist);
    el.addEventListener('input', scoreChecklist);
  });
  scoreChecklist();
}


function scoreChecklist(){
  const items = [...document.querySelectorAll('.check-item')].map((item, idx) => {
    const result = item.querySelector(`input[name="check-${idx}"]:checked`)?.value || '';
    const question = item.querySelector('.section-subtitle')?.textContent || '';
    const title = item.querySelector('strong')?.textContent || '';
    return { result, question, title };
  });
  const passed = items.filter(i => i.result === 'pass').length;
  const failed = items.filter(i => i.result === 'fail').length;
  const na = items.filter(i => i.result === 'na').length;
  const applicable = passed + failed;
  const pct = applicable ? Math.round((passed / applicable) * 100) : null;
  const scoreText = pct === null ? 'Not scored yet' : `${pct}%`;
  document.getElementById('scoreBig').textContent = scoreText;
  document.getElementById('scoreBar').style.width = pct === null ? '0%' : `${pct}%`;
  document.getElementById('maturityText').textContent = `UX concern rating: ${concernRating(pct)}`;
  document.getElementById('scoreCounts').innerHTML = `
    <p><strong>Yes checks:</strong> ${passed}</p>
    <p><strong>No checks:</strong> ${failed}</p>
    <p><strong>Not applicable checks:</strong> ${na}</p>
    <p><strong>Total applicable checks:</strong> ${applicable}</p>
  `;
  const failedItems = items.filter(i => i.result === 'fail');
  const failedList = failedItems.length ? failedItems.map((i, index) => `<li><strong>${index + 1}. ${esc(i.title)}</strong><br>${esc(i.question)}</li>`).join('') : '<p>No failed checks.</p>';
  document.getElementById('failedSummary').innerHTML = `<h3>Failed checks</h3>${failedItems.length ? `<ol>${failedList}</ol>` : failedList}`;
  document.getElementById('printFailedSection').innerHTML = `<h2>Failed checks</h2>${failedItems.length ? `<ol>${failedList}</ol>` : '<p>No failed checks.</p>'}`;
}

function concernRating(pct){
  if(pct === null) return 'Not scored yet';
  if(pct >= 90) return 'Low concern — Minor improvements only';
  if(pct >= 75) return 'Medium concern — Noticeable friction or inconsistency';
  if(pct >= 50) return 'High concern — Significant usability, accessibility or workflow issue';
  return 'Critical concern — Blocks completion, creates risk or prevents accessibility';
}

function downloadReviewPdf(){
  scoreChecklist();
  window.print();
}

function copyReviewSummary(){
  const field = id => document.getElementById(id)?.value || '';
  const section = document.getElementById('reviewSection').value;
  const sectionError = document.getElementById('reviewSectionError');
  if(sectionError) sectionError.classList.add('is-hidden');
  const score = document.getElementById('scoreBig').textContent;
  const concern = document.getElementById('maturityText').textContent.replace('UX concern rating: ', '');
  const counts = document.getElementById('scoreCounts').innerText.trim();
  const failed = document.getElementById('failedSummary').innerText.trim();
  const summary = `UX Review Form Summary
Work item name: ${field('workItemName')}
Work item type: ${field('workItemType')}
Value stream: ${field('valueStream')}
Product / area: ${field('productArea')}
Review stage: ${field('reviewStage')}
Reviewer: ${field('reviewer')}
Checklist section: ${section}
UX Quality Score: ${score}
Concern rating: ${concern}
${counts}

${failed}`;
  navigator.clipboard?.writeText(summary);
  alert('Review summary copied to clipboard.');
}

function renderStandards(){
  app.innerHTML = `
    ${renderBreadcrumbs([{ label: 'Framework', href: '#home' }, { label: 'UX Standards', href: '#standards' }])}
    <section class="detail-hero">
      <span class="kicker">Practical application</span>
      <h1 class="detail-title">UX standards</h1>
      <p class="detail-definition">Standards translate evidence cards into repeatable design decisions. These should eventually connect to your design system components.</p>
    </section>
    <section class="section grid cols-2">
      ${DATA.standards.map(s => `
        <div class="panel">
          <span class="pill brand">${esc(s.area)}</span>
          <h3>${esc(s.standard)}</h3>
          <p><strong>Linked evidence:</strong> ${esc(s.linked)}</p>
        </div>
      `).join('')}
    </section>
  `;
}

function renderAntiPatterns(){
  app.innerHTML = `
    ${renderBreadcrumbs([{ label: 'Framework', href: '#home' }, { label: 'Anti-UX Patterns', href: '#anti-patterns' }])}
    <section class="detail-hero">
      <span class="kicker">Anti-UX</span>
      <h1 class="detail-title">Enterprise UX anti-patterns</h1>
      <p class="detail-definition">Common mistakes that create friction, accessibility risk, operational inefficiency and unnecessary support demand.</p>
    </section>
    <section class="section grid cols-2">
      ${DATA.antiPatterns.map(a => `
        <div class="panel">
          <span class="pill bad">${esc(a.section)}</span>
          <h3>${esc(a.name)}</h3>
          <p><strong>What it is:</strong> ${esc(a.what)}</p>
          <p style="margin-top:10px"><strong>Why it harms:</strong> ${esc(a.harm)}</p>
          <p style="margin-top:10px"><strong>Do instead:</strong> ${esc(a.instead)}</p>
          <p style="margin-top:10px"><strong>Signals:</strong> ${esc(a.signals)}</p>
        </div>
      `).join('')}
    </section>
  `;
}

function renderPlaybooks(){
  app.innerHTML = `
    ${renderBreadcrumbs([{ label: 'Framework', href: '#home' }, { label: 'Playbooks', href: '#playbooks' }])}
    <section class="detail-hero">
      <span class="kicker">Contextual UX</span>
      <h1 class="detail-title">Playbooks</h1>
      <p class="detail-definition">Playbooks translate the framework into product contexts like PAS workflows, broker portals, quote journeys and operational dashboards.</p>
    </section>
    <section class="section grid cols-2">
      ${DATA.playbooks.map(p => `
        <div class="panel">
          <h3>${esc(p.name)}</h3>
          <p>${esc(p.summary)}</p>
          <div class="section"><div class="label">Relevant principles</div><div class="meta-row">${p.principles.map(x=>`<span class="pill brand">${esc(x)}</span>`).join('')}</div></div>
          <div class="section"><div class="label">Watch-outs</div>${p.watchouts.map(w=>`<p>• ${esc(w)}</p>`).join('')}</div>
        </div>
      `).join('')}
    </section>
  `;
}

function renderSources(){
  app.innerHTML = `
    ${renderBreadcrumbs([{ label: 'Framework', href: '#home' }, { label: 'Sources', href: '#sources' }])}
    <section class="detail-hero">
      <span class="kicker">Source library</span>
      <h1 class="detail-title">Trusted research sources</h1>
      <p class="detail-definition">Use these sources to keep the framework credible, traceable and evidence-led. Treat ecommerce and consumer-product data as directional only where the context differs from enterprise/PAS workflows.</p>
    </section>
    <section class="section grid cols-2">
      ${DATA.sources.map(s => `
        <div class="panel">
          <h3>${esc(s.name)}</h3>
          <p>${esc(s.use)}</p>
          <p style="margin-top:12px"><a class="source-link" href="${esc(s.url)}" target="_blank" rel="noreferrer">${esc(s.url)}</a></p>
        </div>
      `).join('')}
    </section>
  `;
}



const AI_REVIEW_STATE = {
  image: null,
  imageMeta: null,
  reviewResults: null,
  checklistResponses: {},
  loadingInterval: null
};

const SCREEN_CARD_MAP = {
  'Dashboard': ['Visual hierarchy','Information density','Scannability','Status colour meaning','Task prioritisation','Findability','Button hierarchy','Colour contrast'],
  'Form': ['Inline validation','Error summaries','Field grouping','Required and optional fields','Labels and instructions','Error prevention','Cognitive load','Review before submission'],
  'Table': ['Information density','Scannability','Touch target sizing','Keyboard navigation','Search efficiency','Bulk actions','Visual hierarchy','Colour contrast'],
  'Workflow': ['Workflow continuity','Context switching','Progress indicators','Save and resume','Review before submission','Visibility of system status','Recognition rather than recall'],
  'Modal': ['Modal interruption','User control and freedom','Destructive action safety','Button hierarchy','Focus visibility','Keyboard navigation'],
  'Detail page': ['Recognition rather than recall','Visual hierarchy','Findability','Auditability','Content prioritisation','Scannability'],
  'Document / PDF output': ['Print and document outputs','Typography rhythm','Line length','Heading hierarchy','Plain English','Readable font sizing'],
  'Other': ['Cognitive load','Visual hierarchy','Recognition rather than recall','Error prevention','Colour contrast','Button hierarchy','Plain English']
};
const USER_CARD_MAP = {
  'Power user': ['Dense information layouts','Expert-user shortcuts','Keyboard accelerators','Desktop-first enterprise UX','Workflow continuity'],
  'Broker': ['Workflow continuity','Findability','Status colour meaning','Search efficiency','Task prioritisation'],
  'Customer': ['Plain English','Digital confidence by age','Mobile customer journeys','Trust perception','Customer Effort Score'],
  'Internal user': ['Role-based views','Auditability','Operational resilience','Saved views and filters'],
  'Mixed / unknown': ['Accessibility needs with age','Digital literacy','Cognitive accessibility','Colour contrast']
};

function renderAiDesignReview(){
 app.innerHTML = `
  ${renderBreadcrumbs([{ label: 'Framework', href: '#home' }, { label: 'AI Design Review', href: '#ai-design-review' }])}
   <section class="hero"><span class="kicker">AI-assisted evaluation</span><h1>AI Design Review</h1><p>Upload a design screenshot and get practical, conversational feedback as if a senior design team reviewed the screen together.</p></section>
  <section class="panel section ai-caveat">This is an AI-assisted first-pass review. It can identify visible UX risks and likely accessibility concerns, but it does not replace user research, accessibility testing or design judgement.</section>
   <section class="panel section ai-upload-section">
      <div class="ai-upload-header">
        <h3>Upload design screenshot</h3>
        <p class="section-subtitle">Drag and drop a PNG or JPG, or browse files. Then run AI Design Review.</p>
        </div>
      <div class="ai-upload-panel-wrap">
        <input id="aiImageUpload" class="ai-file-input" type="file" accept=".jpg,.jpeg,.png,image/jpeg,image/png">
        <div id="aiDropZone" class="ai-drop-zone ai-upload-panel" role="button" tabindex="0" aria-label="Upload design image">
          <div id="aiDropEmpty" class="ai-drop-content ai-upload-empty">
            <div class="ai-drop-icon">✦</div>
            <h4>Drag & drop your screenshot</h4>
            <p>or <button type="button" class="ai-browse-link" id="aiBrowseBtn">browse files</button></p>
            <small>Accepted file types: .png, .jpg, .jpeg</small>
          </div>
          <div id="aiImagePreview" class="ai-image-preview is-hidden"></div>
          <div id="aiDropLoader" class="ai-drop-loader ai-upload-loading-overlay is-hidden" aria-live="polite">
            <div class="ai-upload-loading-content">
              <div class="spinner ai-upload-spinner"></div>
              <h4>Building your AI design review report...</h4>
              <p id="loadingMessage" class="ai-upload-status-text section-subtitle"></p>
              <div class="progress"><span id="aiLoadingProgress"></span></div>
            </div>
          </div>
        </div>
        <div id="aiImageMeta" class="ai-upload-meta section-subtitle is-hidden"></div>
        <div class="ai-upload-actions section"><button class="btn dark" id="runAiReviewBtn">Run AI Design Review</button> <button class="btn" id="clearAiImageBtn">Clear image</button></div>
        <p id="aiValidation" class="field-error is-hidden"></p>
      </div>
    <div id="aiErrorPanel" class="panel highlight is-hidden section"></div>
  </section>
  <section id="aiReport" class="section"></section>`;
  AI_REVIEW_STATE.reviewResults = null;
 bindAiReviewEvents();
}
function bindAiReviewEvents(){
 const uploadInput = document.getElementById('aiImageUpload');
 const dropZone = document.getElementById('aiDropZone');
 uploadInput?.addEventListener('change', handleAiImageUpload);
 document.getElementById('aiBrowseBtn')?.addEventListener('click', ()=>uploadInput?.click());
 dropZone?.addEventListener('click', ()=>uploadInput?.click());
 dropZone?.addEventListener('keydown', (e)=>{if(e.key==='Enter' || e.key===' '){e.preventDefault(); uploadInput?.click();}});
 ['dragenter','dragover'].forEach(evt => dropZone?.addEventListener(evt, (e)=>{e.preventDefault(); dropZone.classList.add('is-dragover');}));
 ['dragleave','drop'].forEach(evt => dropZone?.addEventListener(evt, (e)=>{e.preventDefault(); dropZone.classList.remove('is-dragover');}));
 dropZone?.addEventListener('drop', (e)=>{const file=e.dataTransfer?.files?.[0]; if(file) loadAiImageFile(file);});
 document.getElementById('clearAiImageBtn')?.addEventListener('click', clearAiImage);
 document.getElementById('runAiReviewBtn')?.addEventListener('click', runAiDesignReview);
}
function handleAiImageUpload(e){const file=e.target.files[0]; if(file) loadAiImageFile(file);}
function loadAiImageFile(file){if(!file.type.startsWith('image/')) return; const reader=new FileReader(); reader.onload=()=>{ const img=new Image(); img.onload=()=>{AI_REVIEW_STATE.image=reader.result; AI_REVIEW_STATE.imageMeta={fileName:file.name,mimeType:file.type,width:img.width,height:img.height}; const meta=document.getElementById('aiImageMeta'); meta.textContent=`${file.name} · ${file.type} · ${img.width}×${img.height}`; meta.classList.remove('is-hidden'); document.getElementById('aiImagePreview').innerHTML=`<img src="${reader.result}" alt="Uploaded design preview">`; document.getElementById('aiImagePreview').classList.remove('is-hidden'); document.getElementById('aiDropEmpty').classList.add('is-hidden');}; img.src=reader.result;}; reader.readAsDataURL(file);}  
function getSelectedRelatedCards(){const names=[...(SCREEN_CARD_MAP['Other']||[]),...(USER_CARD_MAP['Mixed / unknown']||[])]; const seen=new Set(); return DATA.cards.filter(c=>names.some(n=>c.Name.toLowerCase()===n.toLowerCase())).filter(c=>{const k=c.Slug||c.Name;if(seen.has(k))return false;seen.add(k);return true;}).map(c=>({name:c.Name,slug:c.Slug,taxonomy:c['Reference to taxonomy'],definition:c.Definition,evidence:c['Evidence / Research'],checklistPrompt:c['Checklist prompt'],potentialValue:c['Potential value'],operationalRoiImpact:c['Operational/ROI impact'],goodExample:c['Good example'],badExample:c['Bad example']}));}
function buildAiReviewPayload(){return {context:{screenType:'Other',userType:'Mixed / unknown'},image:{...AI_REVIEW_STATE.imageMeta,dataUrl:AI_REVIEW_STATE.image},relatedCards:getSelectedRelatedCards(),promptInstructions:"You are not writing alt text. Do not describe the screen object-by-object. Write a short design critique as if you are a senior UX/product designer giving feedback to another designer. Your summary should say what feels strong, what feels weak and what should be improved first. Use natural sentences. Avoid jargon. Avoid broken fragments. Do not use phrases like ‘The screen is’ or ‘The screenshot shows’. Do not overclaim from a static image.",preferredOutput:{designerSummary:'short critique paragraph for direct display',topStrengths:['3 concise complete sentences'],criticalImprovements:['3 concise action sentences'],screenSummary:'fallback summary field for backwards compatibility',strengths:'fallback strengths field for backwards compatibility',potentialIssues:'fallback issues field for backwards compatibility',recommendedActions:'fallback actions field for backwards compatibility'}};}
async function callAiReviewWorker(payload){const r=await fetch(AI_REVIEW_ENDPOINT,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)}); if(!r.ok) throw new Error(`Worker request failed (${r.status})`); return r.json();}
function getScoreBand(score){if(typeof score!=='number'||Number.isNaN(score))return 'Not scored'; if(score>=90)return 'excellent'; if(score>=75)return 'good'; if(score>=50)return 'watch'; return 'critical';}
function getPassFailBadge(score){if(typeof score!=='number'||Number.isNaN(score)) return {label:'REVIEW REQUIRED',className:'review'}; if(score>=90) return {label:'PASS — Low concern',className:'pass'}; if(score>=75) return {label:'PASS WITH WATCHOUTS — Medium concern',className:'watch'}; if(score>=50) return {label:'NEEDS REVIEW — High concern',className:'needs-review'}; return {label:'FAIL — Critical concern',className:'fail'};}
function getConcernRating(score){if(typeof score!=='number'||Number.isNaN(score)) return 'Not scored — review required'; if(score>=90)return 'Low concern — Minor improvements only'; if(score>=75)return 'Medium concern — Noticeable friction or inconsistency'; if(score>=50)return 'High concern — Significant usability, accessibility or workflow issue'; return 'Critical concern — Blocks completion, creates risk or prevents accessibility';}
function countHighPriorityActions(actions=[]){return actions.filter(a=>String(a.priority).toLowerCase()==='high').length;}
function matchEvidenceCardByName(name=''){const match=DATA.cards.find(c=>String(c.Name).toLowerCase()===String(name).toLowerCase()); return match?{slug:match.Slug,name:match.Name}:null;}
function normaliseAiReviewResponse(response={}){const norm={...response}; norm.mode=norm.mode||'AI Design Review'; norm.uxQualityScore=Number.isFinite(Number(norm.uxQualityScore))?Number(norm.uxQualityScore):null; norm.headlineFindings=Array.isArray(norm.headlineFindings)?norm.headlineFindings.slice(0,5):[]; norm.strengths=Array.isArray(norm.strengths)?norm.strengths:[]; norm.potentialIssues=Array.isArray(norm.potentialIssues)?norm.potentialIssues:[]; norm.recommendedActions=Array.isArray(norm.recommendedActions)?norm.recommendedActions:[]; norm.relatedEvidence=Array.isArray(norm.relatedEvidence)?norm.relatedEvidence:[]; norm.limitations=Array.isArray(norm.limitations)?norm.limitations:[]; norm.checklistResults=Array.isArray(norm.checklistResults)?norm.checklistResults:[];
 norm.concernRating=norm.concernRating||getConcernRating(norm.uxQualityScore);
 const order={high:0,medium:1,low:2};
 norm.recommendedActions=norm.recommendedActions.map(a=>({...a,priority:(a.priority||'Medium')})).sort((a,b)=>(order[String(a.priority).toLowerCase()]??1)-(order[String(b.priority).toLowerCase()]??1));
 norm.relatedEvidence=norm.relatedEvidence.map(e=>{const matched=(!e.slug&&e.cardName)?matchEvidenceCardByName(e.cardName):null; return {...e,slug:e.slug||matched?.slug||''};});
 return norm;
}
function runLocalDesignReview(payload){const cards=payload.relatedCards.slice(0,8); const score=Math.max(55,Math.min(92,70+cards.length)); return {mode:'Local prototype review',reviewConfidence:'Medium',uxQualityScore:score,concernRating:getConcernRating(score),headlineFindings:['Primary actions are visible, but hierarchy may not always guide first click effectively.','Information grouping could be improved to reduce scan effort.','Accessibility risks may exist around contrast, labels and focus cues.'],strengths:[{title:'Clear review framing',detail:'Context and uploaded screenshot provide enough information for a first-pass UX report.'},{title:'Framework coverage',detail:'Selected framework cards create good breadth across usability and accessibility concerns.'}],potentialIssues:cards.slice(0,5).map(c=>({title:`Potential gap: ${c.name}`,issue:'The current layout may not fully support fast decision-making for the target user flow.',relatedCards:[c.name],impact:'Could increase completion time, errors or support dependency.',recommendation:`Review and iterate using this evidence prompt: ${c.checklistPrompt}`,confidence:'Medium'})),recommendedActions:cards.slice(0,5).map((c,i)=>({priority:i<2?'High':i<4?'Medium':'Low',action:`Prioritise improvements aligned to ${c.name}.`,why:'Improves completion speed and consistency.',relatedCards:[c.name]})),relatedEvidence:cards.map(c=>({cardName:c.name,slug:c.slug,reason:'Matched from selected screen type and user type context.'})),checklistResults:cards.map(c=>({cardName:c.name,slug:c.slug,checklistPrompt:c.checklistPrompt,result:'Review manually',comment:''})),limitations:['This review cannot verify real user behaviour without task-based testing.','This review cannot confirm technical accessibility compliance from screenshot alone.']};}
function validateAiResponse(x){return x && (Array.isArray(x.headlineFindings) || Array.isArray(x.potentialIssues) || Array.isArray(x.recommendedActions));}
async function runAiDesignReview(){document.getElementById('aiValidation').classList.add('is-hidden'); if(!AI_REVIEW_STATE.image){const v=document.getElementById('aiValidation');v.textContent='Please upload an image before running the review.';v.classList.remove('is-hidden');return;} const payload=buildAiReviewPayload(); toggleAiLoading(true); let result; try{result=AI_REVIEW_ENDPOINT?await callAiReviewWorker(payload):runLocalDesignReview(payload);}catch(err){const panel=document.getElementById('aiErrorPanel'); panel.classList.remove('is-hidden'); panel.innerHTML=`<p>The AI review service could not be reached. You can run a local prototype review instead.</p><button class="btn dark" id="runLocalFallback">Run local prototype review</button>`; document.getElementById('runLocalFallback').addEventListener('click', ()=>{AI_REVIEW_STATE.reviewResults=normaliseAiReviewResponse(runLocalDesignReview(payload)); renderAiReport(AI_REVIEW_STATE.reviewResults);}); toggleAiLoading(false); return;} toggleAiLoading(false); if(!validateAiResponse(result)){document.getElementById('aiErrorPanel').classList.remove('is-hidden');document.getElementById('aiErrorPanel').textContent='Worker response was invalid. Please retry or run local prototype review.'; return;} AI_REVIEW_STATE.reviewResults=normaliseAiReviewResponse(result); renderAiReport(AI_REVIEW_STATE.reviewResults);} 
function toggleAiLoading(show){const inlineLoader=document.getElementById('aiDropLoader'); if(!inlineLoader) return; inlineLoader.classList.toggle('is-hidden',!show); const progress=document.getElementById('aiLoadingProgress'); const messages=['Reviewing visible hierarchy...','Checking accessibility signals...','Mapping findings to framework evidence...','Prioritising recommendations...','Building your review report...']; if(show){let i=0; progress.style.width='8%'; document.getElementById('loadingMessage').textContent=messages[0]; AI_REVIEW_STATE.loadingInterval=setInterval(()=>{i=(i+1)%messages.length;document.getElementById('loadingMessage').textContent=messages[i]; progress.style.width=`${Math.min(95,(i+1)*18)}%`;},1200);} else {clearInterval(AI_REVIEW_STATE.loadingInterval); progress.style.width='100%'; setTimeout(()=>progress.style.width='0%',250);} }
function tidyText(value=''){return String(value||'').replace(/\s+/g,' ').trim();}
function toPlainEnglish(text=''){
 const source=tidyText(text);
 if(!source) return '';
 const replacements=[
  [/\binformation density\b/ig,'how much is shown at once'],
  [/\bhierarchy\b/ig,'what stands out first'],
  [/\baffordance\b/ig,'whether it looks clickable'],
  [/\bcognitive load\b/ig,'how much the user has to work out'],
  [/\bprogressive disclosure\b/ig,'showing extra detail only when needed'],
  [/\bcontrast ratio\b/ig,'text and button contrast']
 ];
 let out=replacements.reduce((txt,[pattern,value])=>txt.replace(pattern,value),source);
 out=out.replace(/\bheuristic\b/ig,'design signal').replace(/\bThis fails\b/ig,'This could be clearer').replace(/\bUsers will definitely\b/ig,'Users may');
 return out;
}
function cleanAiSentence(text=''){
 let out=toPlainEnglish(tidyText(text));
 if(!out) return '';
 out=out
   .replace(/\bbutton\s+what\s+stands\s+out\s+first\b/ig,'what stands out first')
  .replace(/\bclear\s+visual\s+what\s+stands\s+out\s+first\b/ig,'Clear visual priority')
  .replace(/\bconsider\s+ensure\b/ig,'Ensure')
  .replace(/\bcheck\s+check\b/ig,'check')
  .replace(/^i['’]d\s+check\s+increase\b/i,'Increase')
  .replace(/^i['’]d\s+check\s+add\b/i,'Add')
  .replace(/^i['’]d\s+check\s+make\b/i,'Make')
  .replace(/^i['’]d\s+check\s+review\b/i,'Review')
  .replace(/^i['’]d\s+check\s+clarify\b/i,'Clarify')
  .replace(/^i['’]d\s+check\s+tighten\b/i,'Tighten')
   .replace(/\bi['’]d\s+check\s+check\b/ig,'Review')
  .replace(/\bi['’]d\s+check\b/ig,'Check whether')
   .replace(/\bcognitive and recognition load\b/ig,'how much the user has to work out')
  .replace(/\bthis screenshot shows\b/ig,'')
  .replace(/\bthe screen contains\b/ig,'')
  .replace(/\s*([,;:.!?])\1+/g,'$1')
  .replace(/\s{2,}/g,' ')
  .trim();
 out=out.replace(/^[,:;\-\s]+/,'').trim();
 if(!out) return '';
 out=out.charAt(0).toUpperCase()+out.slice(1);
 if(!/[.!?]$/.test(out)) out+='.';
 return out;
}
function toSentenceCase(text=''){const t=cleanAiSentence(text); if(!t) return ''; return t.charAt(0).toUpperCase()+t.slice(1);}
function textFromItem(item){if(typeof item==='string') return item; if(!item||typeof item!=='object') return ''; return item.detail||item.title||item.issue||item.recommendation||item.action||item.why||item.text||'';}
function similarityKey(text=''){return cleanAiSentence(text).toLowerCase().replace(/[^a-z0-9\s]/g,'').replace(/\b(the|a|an|and|to|of|for|with|that|this|is|are)\b/g,'').replace(/\s+/g,' ').trim();}
function dedupeTextList(items=[],limit=5,blocked=[]){
  const stop=new Set(blocked.map(x=>similarityKey(x)).filter(Boolean));
 const seen=new Set([...stop]);
 const out=[];
 for(const raw of items){
  const text=toSentenceCase(tidyText(textFromItem(raw)));
  const key=similarityKey(text);
  if(!text||!key||seen.has(key)) continue;
  seen.add(key);
  out.push(text);
  if(out.length>=limit) break;
 }
 return out;
}
function rewriteStrengthBullet(text=''){
 const seed=cleanAiSentence(text).replace(/[.!?]+$/,'');
 const lower=seed.toLowerCase();
 if(!seed) return '';
 if(/clear primary action|primary action/.test(lower)) return 'The primary action is easy to identify and stands out at the right moment.';
 if(/central form|form placement|main form/.test(lower)) return 'The main form placement makes the core task easy to find quickly.';
 if(/minimal|clean layout|focused/.test(lower)) return 'The layout stays focused and avoids unnecessary distractions.';
 if(/navigation|scan|scann/.test(lower)) return 'The structure is easy to scan, so people can decide what to do next quickly.';
 return seed.startsWith('The ')?`${seed}.`:`${seed.charAt(0).toUpperCase()+seed.slice(1)}.`;
}
function rewriteImprovementBullet(text=''){
 const seed=cleanAiSentence(text).replace(/[.!?]+$/,'');
 const lower=seed.toLowerCase();
 if(!seed) return '';
 if(/clickable area|tap target|spacing/.test(lower)) return 'Increase the clickable area and spacing around smaller controls so they are easier to select.';
 if(/tooltip|label|helper/.test(lower)) return 'Add short helper text or clearer labels where the option may be unclear to first-time users.';
 if(/contrast|low-?emphasis/.test(lower)) return 'Review text and button contrast, especially for lower-emphasis elements on darker backgrounds.';
 if(/account creation|sign up|create account/.test(lower)) return 'Make the account creation route more obvious so new users can find it without searching.';
 if(/social sign.?in|social login/.test(lower)) return 'Clarify the social sign-in options so users understand them as equal alternatives to email login.';
 if(/secondary link|secondary action/.test(lower)) return 'Tighten secondary links so they are visible enough without competing with the primary action.';
 if(/consisten|alignment/.test(lower)) return 'Tighten visual alignment and spacing so the interface feels more consistent and intentional.';
 return seed.match(/^(check whether|increase|make|consider|clarify|tighten|review|add)\b/i) ? `${seed}.` : `Consider ${seed.charAt(0).toLowerCase()+seed.slice(1)}.`;
}

const FALLBACK_SUMMARY='Overall, this feels clean and focused. The main task is easy to identify, but a few supporting elements could work harder. I’d focus first on making the secondary actions clearer and checking the contrast and clickable areas of smaller controls.';
const FALLBACK_STRENGTHS=['The main task is easy to identify.','The layout feels focused and avoids unnecessary clutter.','The primary action is visually clear.'];
const FALLBACK_IMPROVEMENTS=['Review the contrast of secondary links and lower-emphasis text.','Increase the clickable area around smaller links and icon controls.','Add short helper text where first-time users may need more guidance.'];
function startsWithScreenDescription(text=''){return /^(the screen is|this screen is|this is a\b|the screenshot shows|the design features|there is\b)/i.test(tidyText(text));}
function hasObviousGrammarIssue(text=''){return /\b(button what stands out first|consider ensure|i['’]d check (increase|add|check)|clear visual what stands out first)\b/i.test(String(text)) || /\b[a-z]+\s+what\s+stands\s+out\s+first\b/i.test(String(text));}
function topicKey(text=''){const t=String(text).toLowerCase(); if(/contrast/.test(t)) return 'contrast'; if(/clickable area|tap target|spacing|smaller controls|icon controls/.test(t)) return 'clickable'; if(/helper text|guidance|first-time|label/.test(t)) return 'guidance'; return '';}
function dedupeAndBalanceBullets(items=[],limit=3){
 const out=[]; const seenTopics=new Set();
 for(const item of items){
  const cleaned=cleanAiSentence(item);
  if(!cleaned || hasObviousGrammarIssue(cleaned)) continue;
  const t=topicKey(cleaned);
  if(t && seenTopics.has(t)) continue;
  if(t) seenTopics.add(t);
  out.push(cleaned);
  if(out.length>=limit) break;
 }
 return out;
}

function getSimpleRating(score){
 if(score>=90) return 'Excellent';
 if(score>=75) return 'Strong';
 if(score>=60) return 'Needs work';
 return 'Needs attention';
}
function scoreRingTone(label=''){if(label==='Excellent') return 'excellent'; if(label==='Strong') return 'strong'; if(label==='Needs work') return 'needs-work'; return 'needs-attention';}
function normaliseSimpleAiReview(review={}){
 const scoreRaw=Number(review.uxQualityScore);
 const score=Number.isFinite(scoreRaw)?Math.max(0,Math.min(100,Math.round(scoreRaw))):72;
 const ratingLabel=getSimpleRating(score);
  const strengthSeed=dedupeTextList((review.topStrengths||[]).concat(review.strengths||[]).concat(review.whatsWorking||[]).concat((review.headlineFindings||[]).filter(x=>/(clear|strong|good|effective|works|focused|consistent|easy|simple)/i.test(String(x)))),8).map(rewriteStrengthBullet).filter(Boolean);
 const topStrengths=dedupeAndBalanceBullets(dedupeTextList(strengthSeed,6),3);
 const improveSeed=[];
 (review.potentialIssues||[]).forEach(i=>{const txt=toSentenceCase(i.recommendation||i.issue||i.title||''); if(txt) improveSeed.push(rewriteImprovementBullet(txt));});
 (review.recommendedActions||[]).forEach(a=>{const txt=toSentenceCase(a.action||a.recommendation||a.why||''); if(!txt) return; improveSeed.push(rewriteImprovementBullet(txt));});
 (review.criticalImprovements||[]).forEach(i=>{const txt=toSentenceCase(i); if(txt) improveSeed.push(rewriteImprovementBullet(txt));});
  if(Array.isArray(review.ideas)) review.ideas.forEach(i=>{const txt=rewriteImprovementBullet(i); if(txt) improveSeed.push(txt);});
  const criticalImprovements=dedupeAndBalanceBullets(dedupeTextList(improveSeed,8,topStrengths),3);
 const summarySource=[review.designerSummary,review.designersTake,review.screenSummary,(review.headlineFindings||[]).join(' ')].map(tidyText).find(Boolean)||'';
 let summary=cleanAiSentence(summarySource).replace(/^overall,?\s+a\b/i,'Overall, this feels like a').replace(/^(this screen contains|this is a screen with)\b/i,'Overall, this feels');
  if(!summary || startsWithScreenDescription(summary)){
  const strengthLine=topStrengths[0]||FALLBACK_STRENGTHS[0];
  const improveLine=criticalImprovements[0]||FALLBACK_IMPROVEMENTS[0];
  summary=`Overall, this feels clean and focused. ${strengthLine} ${improveLine}`;
 }
 let summarySentences=summary.split(/(?<=[.!?])\s+/).map(cleanAiSentence).filter(Boolean);
 if(summarySentences.length<2){
    summarySentences=['Overall, this feels clean and focused.',topStrengths[0]||FALLBACK_STRENGTHS[0],criticalImprovements[0]||FALLBACK_IMPROVEMENTS[0]];
 }
 summary=summarySentences.slice(0,4).join(' ');
 if(startsWithScreenDescription(summary) || hasObviousGrammarIssue(summary)) summary=FALLBACK_SUMMARY;
 return {score,ratingLabel,summary,topStrengths:topStrengths.length?topStrengths:FALLBACK_STRENGTHS,criticalImprovements:criticalImprovements.length?criticalImprovements:FALLBACK_IMPROVEMENTS};
}
function renderListItems(items=[],fallback='No items identified.'){return `<ul>${(items.length?items:[fallback]).map(i=>`<li>${esc(typeof i==='string'?i:(i.title||i.text||''))}</li>`).join('')}</ul>`;}
function renderAiReport(r){
 const report=document.getElementById('aiReport');
  const simple=normaliseSimpleAiReview(r);
 const tone=scoreRingTone(simple.ratingLabel);
 document.querySelector('.ai-upload-panel-wrap')?.classList.add('ai-upload-layout-collapsed');
 report.innerHTML=`
 <section class="ai-simple-review">
   <div class="ai-simple-image-wrap">${AI_REVIEW_STATE.image?`<img class="ai-simple-image" src="${AI_REVIEW_STATE.image}" alt="Uploaded design preview">`:'<p>No image uploaded.</p>'}</div>
   <div class="ai-review-score-wrap">
     <div class="ai-review-score-ring ${tone}" style="--score:${simple.score}">
       <div class="ai-review-score-inner">
         <div class="ai-review-score-number">${simple.score}</div>
         <div class="ai-review-score-label">${esc(simple.ratingLabel)}</div>
       </div>
     </div>
   </div>
   <p class="ai-review-summary-copy">${esc(simple.summary)}</p>
   <div class="ai-review-two-cards">
     <section class="ai-review-card ai-review-card-strengths"><h3>Top strengths</h3>${renderListItems(simple.topStrengths)}</section>
     <section class="ai-review-card ai-review-card-improvements"><h3>Critical improvements</h3>${renderListItems(simple.criticalImprovements)}</section>
   </div>
 </section>`;
}
function clearAiImage(){AI_REVIEW_STATE.image=null; AI_REVIEW_STATE.imageMeta=null; AI_REVIEW_STATE.reviewResults=null; const up=document.getElementById('aiImageUpload'); if(up) up.value=''; const meta=document.getElementById('aiImageMeta'); meta.textContent=''; meta.classList.add('is-hidden'); const preview=document.getElementById('aiImagePreview'); preview.innerHTML=''; preview.classList.add('is-hidden'); document.getElementById('aiDropEmpty').classList.remove('is-hidden'); document.getElementById('aiReport').innerHTML=''; document.getElementById('aiErrorPanel').classList.add('is-hidden');}

function calcTimeSaving(){
  const seconds = Number(document.getElementById('secondsSaved').value || 0);
  const users = Number(document.getElementById('users').value || 0);
  const tasks = Number(document.getElementById('tasksPerDay').value || 0);
  const rate = Number(document.getElementById('hourlyCost').value || 0);
  const days = 220;
  const hours = (seconds * users * tasks * days) / 3600;
  const value = hours * rate;
  document.getElementById('timeSavingResult').innerHTML = `<h3>${Math.round(hours).toLocaleString()} hours/year</h3><p>Estimated value: <strong>£${Math.round(value).toLocaleString()}</strong> per year.</p>`;
}
function calcRework(){
  const issues = Number(document.getElementById('issuesAvoided').value || 0);
  const hours = Number(document.getElementById('hoursPerIssue').value || 0);
  const rate = Number(document.getElementById('devCost').value || 0);
  const cycles = Number(document.getElementById('cycles').value || 0);
  const totalHours = issues * hours * cycles;
  const value = totalHours * rate;
  document.getElementById('reworkResult').innerHTML = `<h3>${Math.round(totalHours).toLocaleString()} hours/year</h3><p>Estimated avoided rework value: <strong>£${Math.round(value).toLocaleString()}</strong> per year.</p>`;
}

searchInput.addEventListener('keydown', (e) => {
  if(e.key === 'Enter'){
    location.hash = '#library';
    setTimeout(() => {
      const input = document.getElementById('cardSearch');
      if(input){ input.value = searchInput.value; filterCards(); }
    }, 50);
  }
});

window.addEventListener('hashchange', render);
render();
