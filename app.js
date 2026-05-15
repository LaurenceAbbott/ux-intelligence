const DATA = window.UX_DATA;
const app = document.getElementById('app');
const searchInput = document.getElementById('globalSearch');
const sidebar = document.getElementById('sidebar');
const AI_REVIEW_ENDPOINT = "";
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
 const today = new Date().toISOString().slice(0,10);
 const workItemTypes = ['Feature', 'Epic', 'Capability', 'Journey', 'Defect', 'Improvement', 'Other'];
 const valueStreams = ['Acquire', 'Distribute', 'Serve'];
 const reviewStages = ['Discovery', 'Prototype', 'Design review', 'Pre-build', 'Pre-release', 'Post-release'];
 const screenTypes = ['Dashboard','Form','Table','Workflow','Modal','Detail page','Document / PDF output','Other'];
 const userTypes = ['Customer','Broker','Internal user','Power user','Mixed / unknown'];
 app.innerHTML = `
  ${renderBreadcrumbs([{ label: 'Framework', href: '#home' }, { label: 'AI Design Review', href: '#ai-design-review' }])}
  <section class="hero"><span class="kicker">AI-assisted evaluation</span><h1>AI Design Review</h1><p>Upload a design screenshot and get a first-pass UX, accessibility and product experience review against the Operational UX Intelligence Framework.</p></section>
  <section class="panel section ai-caveat">This is an AI-assisted first-pass review. It can identify visible UX risks, hierarchy issues, accessibility concerns and likely anti-patterns, but it does not replace user research, accessibility testing, workflow validation or design judgement.</section>
  <section class="panel section"><h3>Review context</h3><div class="review-details-grid">
    <label class="check-control"><span>Work item name</span><input id="aiWorkItemName" class="field" type="text"></label>
    <label class="check-control"><span>Work item type</span><select id="aiWorkItemType">${workItemTypes.map(v=>`<option>${v}</option>`).join('')}</select></label>
    <label class="check-control"><span>Value stream</span><select id="aiValueStream">${valueStreams.map(v=>`<option>${v}</option>`).join('')}</select></label>
    <label class="check-control"><span>Product / area</span><input id="aiProductArea" class="field" type="text"></label>
    <label class="check-control"><span>Review stage</span><select id="aiReviewStage">${reviewStages.map(v=>`<option>${v}</option>`).join('')}</select></label>
    <label class="check-control"><span>Screen type</span><select id="aiScreenType">${screenTypes.map(v=>`<option>${v}</option>`).join('')}</select></label>
    <label class="check-control"><span>User type</span><select id="aiUserType">${userTypes.map(v=>`<option>${v}</option>`).join('')}</select></label>
    <label class="check-control"><span>Reviewer</span><input id="aiReviewer" class="field" type="text"></label>
    <label class="check-control"><span>Review date</span><input id="aiReviewDate" class="field" type="date"></label>
  </div><p id="contextChangedNote" class="section-subtitle is-hidden">Review context changed. Rerun the review to refresh results.</p></section>
  <section class="panel section"><h3>Upload design screenshot</h3><input id="aiImageUpload" class="field" type="file" accept=".jpg,.jpeg,.png,image/jpeg,image/png"><div id="aiImageMeta" class="section-subtitle section"></div><div id="aiImagePreview" class="ai-image-preview section">Upload a PNG/JPG to preview it here.</div><div class="section"><button class="btn dark" id="runAiReviewBtn">Run AI Design Review</button> <button class="btn" id="clearAiImageBtn">Clear image</button></div><p id="aiValidation" class="field-error is-hidden"></p><div id="aiErrorPanel" class="panel highlight is-hidden"></div></section>
  <section id="aiLoadingState" class="panel section is-hidden"><div class="spinner"></div><p>Reviewing design against the UX Intelligence Framework…</p><p id="loadingMessage" class="section-subtitle"></p></section>
  <section id="aiReport" class="section"></section>`;
 document.getElementById('aiReviewDate').value = today;
 AI_REVIEW_STATE.reviewResults = null; AI_REVIEW_STATE.checklistResponses = {};
 bindAiReviewEvents();
}
function bindAiReviewEvents(){
 ['aiScreenType','aiUserType'].forEach(id=>document.getElementById(id)?.addEventListener('change', ()=>document.getElementById('contextChangedNote')?.classList.remove('is-hidden')));
 document.getElementById('aiImageUpload')?.addEventListener('change', handleAiImageUpload);
 document.getElementById('clearAiImageBtn')?.addEventListener('click', clearAiImage);
 document.getElementById('runAiReviewBtn')?.addEventListener('click', runAiDesignReview);
}
function handleAiImageUpload(e){ const file=e.target.files[0]; if(!file) return; const reader=new FileReader(); reader.onload=()=>{ const img=new Image(); img.onload=()=>{AI_REVIEW_STATE.image=reader.result; AI_REVIEW_STATE.imageMeta={fileName:file.name,mimeType:file.type,width:img.width,height:img.height}; document.getElementById('aiImageMeta').textContent=`${file.name} • ${file.type} • ${img.width}x${img.height}`; document.getElementById('aiImagePreview').innerHTML=`<img src="${reader.result}" alt="Uploaded design preview">`;}; img.src=reader.result;}; reader.readAsDataURL(file);} 
function getSelectedRelatedCards(){const names=[...(SCREEN_CARD_MAP[document.getElementById('aiScreenType').value]||[]),...(USER_CARD_MAP[document.getElementById('aiUserType').value]||[])]; const seen=new Set(); return DATA.cards.filter(c=>names.some(n=>c.Name.toLowerCase()===n.toLowerCase())).filter(c=>{const k=c.Slug||c.Name;if(seen.has(k))return false;seen.add(k);return true;}).map(c=>({name:c.Name,slug:c.Slug,taxonomy:c['Reference to taxonomy'],definition:c.Definition,evidence:c['Evidence / Research'],checklistPrompt:c['Checklist prompt'],potentialValue:c['Potential value'],operationalRoiImpact:c['Operational/ROI impact'],goodExample:c['Good example'],badExample:c['Bad example']}));}
function buildAiReviewPayload(){return {context:{workItemName:document.getElementById('aiWorkItemName').value,workItemType:document.getElementById('aiWorkItemType').value,valueStream:document.getElementById('aiValueStream').value,productArea:document.getElementById('aiProductArea').value,reviewStage:document.getElementById('aiReviewStage').value,screenType:document.getElementById('aiScreenType').value,userType:document.getElementById('aiUserType').value,reviewer:document.getElementById('aiReviewer').value,reviewDate:document.getElementById('aiReviewDate').value},image:{...AI_REVIEW_STATE.imageMeta,dataUrl:AI_REVIEW_STATE.image},relatedCards:getSelectedRelatedCards()};}
async function callAiReviewWorker(payload){const r=await fetch(AI_REVIEW_ENDPOINT,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)}); if(!r.ok) throw new Error(`Worker request failed (${r.status})`); return r.json();}
function runLocalDesignReview(payload){const cards=payload.relatedCards.slice(0,8); const score=Math.max(55,Math.min(92,70+cards.length)); return {mode:'Local prototype review',screenSummary:`Prototype review for a ${payload.context.screenType} screen targeting ${payload.context.userType}. Based on metadata only (${payload.image.width}x${payload.image.height}).`,reviewConfidence:'Medium',uxQualityScore:score,concernRating:concernRating(score),headlineFindings:['Hierarchy appears serviceable but primary action clarity may vary by context.','Potential scanning friction if dense content lacks grouping.','Accessibility risks likely around contrast, focus order and label clarity.'],strengths:[{title:'Framework-aligned scope',detail:'Selected evidence cards create a focused and practical first-pass review.'},{title:'Likely task orientation',detail:'Screen type suggests clear operational intent.'},{title:'Good review setup',detail:'Context fields improve interpretation and reproducibility.'}],potentialIssues:cards.slice(0,5).map(c=>({title:`Review ${c.name}`,issue:'Potential mismatch between information hierarchy and user decision flow.',relatedCards:[c.name],impact:'May increase completion time and error rate.',recommendation:`Validate and refine against checklist prompt: ${c.checklistPrompt}`,confidence:'Medium'})),recommendedActions:cards.slice(0,5).map((c,i)=>({priority:i<2?'High':i<4?'Medium':'Low',action:`Run a focused pass on ${c.name}.`,why:'Likely to reduce friction and improve consistency.',relatedCards:[c.name]})),relatedEvidence:cards.map(c=>({cardName:c.name,slug:c.slug,reason:'Matched by screen type/user type context.'})),checklistResults:cards.map(c=>({cardName:c.name,slug:c.slug,checklistPrompt:c.checklistPrompt,result:'Review manually',comment:''})),limitations:['Local prototype review does not analyze pixels or true UI semantics.','Use as preparation before research, accessibility testing and design judgement.']};}
function validateAiResponse(x){return x && Array.isArray(x.headlineFindings) && Array.isArray(x.checklistResults);}
async function runAiDesignReview(){document.getElementById('aiValidation').classList.add('is-hidden'); if(!AI_REVIEW_STATE.image){const v=document.getElementById('aiValidation');v.textContent='Please upload an image before running the review.';v.classList.remove('is-hidden');return;} const payload=buildAiReviewPayload(); toggleAiLoading(true); let result; try{result=AI_REVIEW_ENDPOINT?await callAiReviewWorker(payload):runLocalDesignReview(payload);}catch(err){const panel=document.getElementById('aiErrorPanel'); panel.classList.remove('is-hidden'); panel.innerHTML=`<p>The AI review service could not be reached. You can run a local prototype review instead.</p><button class="btn dark" id="runLocalFallback">Run local prototype review</button>`; document.getElementById('runLocalFallback').addEventListener('click', ()=>{AI_REVIEW_STATE.reviewResults=runLocalDesignReview(payload); renderAiReport(AI_REVIEW_STATE.reviewResults);}); toggleAiLoading(false); return;} toggleAiLoading(false); if(!validateAiResponse(result)){document.getElementById('aiErrorPanel').classList.remove('is-hidden');document.getElementById('aiErrorPanel').textContent='Worker response was invalid. Please retry or run local prototype review.'; return;} AI_REVIEW_STATE.reviewResults=result; renderAiReport(result);} 
function toggleAiLoading(show){const el=document.getElementById('aiLoadingState'); if(!el) return; el.classList.toggle('is-hidden',!show); const messages=['Reading the uploaded design…','Identifying screen type and visible structure…','Checking hierarchy and information density…','Reviewing forms, labels and actions…','Comparing against accessibility and usability standards…','Mapping observations to framework cards…','Looking for likely anti-patterns…','Preparing improvement recommendations…','Building the review summary…']; if(show){let i=0; document.getElementById('loadingMessage').textContent=messages[0]; AI_REVIEW_STATE.loadingInterval=setInterval(()=>{i=(i+1)%messages.length;document.getElementById('loadingMessage').textContent=messages[i];},1200);} else {clearInterval(AI_REVIEW_STATE.loadingInterval);} }
function renderAiReport(r){const report=document.getElementById('aiReport'); const actions=prio=>r.recommendedActions.filter(a=>a.priority===prio); report.innerHTML=`<div class="panel"><h3>Summary</h3><p><strong>Mode:</strong> ${esc(r.mode)} | <strong>Review confidence:</strong> ${esc(r.reviewConfidence)} | <strong>UX score:</strong> ${r.uxQualityScore}% | <strong>Concern:</strong> ${esc(r.concernRating)}</p><p><strong>Screen type:</strong> ${esc(document.getElementById('aiScreenType').value)} | <strong>User type:</strong> ${esc(document.getElementById('aiUserType').value)} | <strong>Related cards:</strong> ${r.relatedEvidence.length} | <strong>Checklist items:</strong> ${r.checklistResults.length}</p></div><div class="panel section"><h3>Screen summary</h3><p>${esc(r.screenSummary)}</p></div><div class="panel section"><h3>Headline findings</h3><ul>${r.headlineFindings.map(f=>`<li>${esc(f)}</li>`).join('')}</ul></div><div class="panel section"><h3>Strengths</h3><ul>${r.strengths.map(s=>`<li><strong>${esc(s.title)}:</strong> ${esc(s.detail)}</li>`).join('')}</ul></div><div class="section">${r.potentialIssues.map(i=>`<div class="panel section"><h4>${esc(i.title)}</h4><p>${esc(i.issue)}</p><p><strong>Impact:</strong> ${esc(i.impact)}</p><p><strong>Recommendation:</strong> ${esc(i.recommendation)}</p><p><strong>Related:</strong> ${i.relatedCards.map(esc).join(', ')} | <strong>Confidence:</strong> ${esc(i.confidence)}</p></div>`).join('')}</div><div class="panel section"><h3>Recommended actions</h3>${['High','Medium','Low'].map(p=>`<h4>${p}</h4><ul>${actions(p).map(a=>`<li>${esc(a.action)} — ${esc(a.why)}</li>`).join('')}</ul>`).join('')}</div><div class="panel section"><h3>Related evidence</h3>${r.relatedEvidence.map(e=>`<p><a href="#card/${esc(e.slug)}">${esc(e.cardName)}</a> — ${esc(e.reason)}</p>`).join('')}</div><div class="panel section"><h3>Checklist review</h3><div id="aiChecklistWrap"></div><div id="aiChecklistCounts" class="section"></div><div id="aiAttention" class="section"></div></div>`; renderAiChecklist(r.checklistResults);} 
function renderAiChecklist(items){const wrap=document.getElementById('aiChecklistWrap'); wrap.innerHTML=items.map((it,i)=>`<div class="check-item"><p><strong>${esc(it.cardName)}</strong><br>${esc(it.checklistPrompt)}</p><div class="segmented-control"><input type="radio" id="ai-${i}-yes" name="ai-${i}" value="Yes" ${it.result==='Yes'?'checked':''}><label for="ai-${i}-yes">Yes</label><input type="radio" id="ai-${i}-no" name="ai-${i}" value="No" ${it.result==='No'?'checked':''}><label for="ai-${i}-no">No</label><input type="radio" id="ai-${i}-na" name="ai-${i}" value="Not applicable" ${it.result==='Not applicable'?'checked':''}><label for="ai-${i}-na">Not applicable</label></div><textarea class="field" data-comment="${i}" placeholder="Comment">${esc(it.comment||'')}</textarea></div>`).join(''); wrap.querySelectorAll('input[type="radio"]').forEach(el=>el.addEventListener('change',()=>updateAiChecklist(items))); wrap.querySelectorAll('textarea').forEach(el=>el.addEventListener('input',()=>updateAiChecklist(items))); updateAiChecklist(items);} 
function updateAiChecklist(items){items.forEach((it,i)=>{it.result=document.querySelector(`input[name="ai-${i}"]:checked`)?.value||'Review manually'; it.comment=document.querySelector(`textarea[data-comment="${i}"]`)?.value||'';}); const yes=items.filter(i=>i.result==='Yes').length,no=items.filter(i=>i.result==='No').length,na=items.filter(i=>i.result==='Not applicable').length,rm=items.filter(i=>!['Yes','No','Not applicable'].includes(i.result)).length,app=yes+no,score=app?Math.round((yes/app)*100):null; document.getElementById('aiChecklistCounts').innerHTML=`<p><strong>Yes:</strong> ${yes} | <strong>No:</strong> ${no} | <strong>Not applicable:</strong> ${na} | <strong>Review manually:</strong> ${rm} | <strong>Total applicable:</strong> ${app} | <strong>Total reviewed:</strong> ${yes+no+na}</p><p><strong>Manual UX Quality Score:</strong> ${score===null?'Not scored yet':score+'%'} | <strong>Concern:</strong> ${concernRating(score)}</p>`; const fails=items.filter(i=>i.result==='No'); document.getElementById('aiAttention').innerHTML=`<h4>Items needing attention</h4>${fails.length?'<ul>'+fails.map(f=>`<li><strong>${esc(f.cardName)}:</strong> ${esc(f.checklistPrompt)} ${f.comment?`<em>— ${esc(f.comment)}</em>`:''}</li>`).join('')+'</ul>':'<p>No items marked No.</p>'}`;}
function clearAiImage(){AI_REVIEW_STATE.image=null; AI_REVIEW_STATE.imageMeta=null; AI_REVIEW_STATE.reviewResults=null; AI_REVIEW_STATE.checklistResponses={}; const up=document.getElementById('aiImageUpload'); if(up) up.value=''; document.getElementById('aiImageMeta').textContent=''; document.getElementById('aiImagePreview').textContent='Upload a PNG/JPG to preview it here.'; document.getElementById('aiReport').innerHTML=''; document.getElementById('aiErrorPanel').classList.add('is-hidden');}

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
