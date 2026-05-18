// Open GI Personas & Value Streams AI Worker Context Pack
// Source: Open_GI_Personas_and_Value_Streams_AI_Worker_Context.docx
// This file intentionally includes BOTH structured helper metadata and the full raw extracted document text.

export const OGI_CONTEXT = {
  "meta": {
    "name": "Open GI Personas & Value Streams AI Worker Context Pack",
    "sourceDocument": "Open_GI_Personas_and_Value_Streams_AI_Worker_Context.docx",
    "generatedPurpose": "Context file for AI workers/reviewers. Contains the full extracted context pack text plus structured helper metadata.",
    "note": "rawContextPack contains the full extracted document text/tables. Structured sections below are helper summaries for routing and retrieval."
  },
  "valueStreams": {
    "Acquire": {
      "leader": "Phil",
      "squads": 3,
      "primaryUsers": [
        "CEO / Buyer",
        "IT Teams",
        "Operations"
      ],
      "journey": [
        "Onboard",
        "Integrate",
        "Price"
      ],
      "productPlatformAreas": [
        "Onboarding",
        "Integration Hub",
        "User Management"
      ],
      "capabilitiesServices": [
        "Identity + Access",
        "Customer Accounts",
        "API Gateway",
        "Integration Services",
        "Webhooks",
        "Third Party Integrations"
      ],
      "outcomes": [
        "Faster onboarding",
        "Lower integration effort",
        "Reduced time-to-value",
        "Migration readiness"
      ],
      "interpretation": "Acquire = decision and adoption confidence. Focus on credibility, evidence, integration confidence, technical/security assurance, TCO and enterprise fit."
    },
    "Distribute": {
      "leader": "Joe",
      "squads": 2,
      "primaryUsers": [
        "Insurers",
        "Brokers",
        "Underwriters"
      ],
      "journey": [
        "Rate",
        "Panel",
        "Enrich"
      ],
      "productPlatformAreas": [
        "Ratings",
        "Insurer Gateway",
        "LOB Tooling",
        "Dynamic Pricing"
      ],
      "capabilitiesServices": [
        "Rate Calculation",
        "Panel Management",
        "Risk Enrichment",
        "Rules Services"
      ],
      "outcomes": [
        "Pricing accuracy",
        "Faster enrichment",
        "Better insurer coverage",
        "Faster rating performance"
      ],
      "interpretation": "Distribute = insurance trading and product performance. Focus on capacity, rating, enrichment, panel management, product optimisation, broker trust, underwriting control and profitability insight."
    },
    "Serve": {
      "leader": "Sarah",
      "squads": 4,
      "primaryUsers": [
        "Brokers",
        "Agents",
        "Customers / Policyholders"
      ],
      "journey": [
        "Quote",
        "Sell",
        "Service",
        "Claim"
      ],
      "productPlatformAreas": [
        "Policy Administration",
        "Quote + Buy",
        "Customer Portal",
        "AI Assist"
      ],
      "capabilitiesServices": [
        "Product Configuration",
        "Billing",
        "Claims",
        "Workflow Rules",
        "Document Generation",
        "Communications",
        "MTAs",
        "Renewals"
      ],
      "outcomes": [
        "Quote conversion",
        "Self-service completion",
        "Customer satisfaction",
        "Retention",
        "Claims efficiency"
      ],
      "interpretation": "Serve = day-to-day experience and customer outcomes. Focus on agent efficiency, self-service, assisted service, policy servicing, renewals, MTAs, claims, documents, payments, accessibility and customer outcome measurement."
    }
  },
  "sharedHorizontalCapabilities": {
    "Data Platform": [
      "Lakehouse",
      "Canonical Model",
      "Analytics",
      "Reporting",
      "AI/ML",
      "Event Data"
    ],
    "Architecture + Platform Engineering": [
      "Cloud",
      "Runtime",
      "APIs",
      "DevOps",
      "Security",
      "Observability",
      "Performance"
    ],
    "Product Leadership + UX": [
      "Strategy",
      "Discovery",
      "Research",
      "Service Design",
      "Design System",
      "Experimentation"
    ],
    "AI Guild": [
      "Shared tooling",
      "Automation",
      "AI enablement across every stream"
    ]
  },
  "personaNamesByValueStream": {
    "Acquire": [
      "CEO / Buyer",
      "CTO",
      "Development Manager / Integrator",
      "CISO"
    ],
    "Distribute": [
      "Insurer Distribution / Product Manager",
      "MGA / Distribution Owner",
      "Product & Distribution Owner, DA Scheme Broker",
      "Delegated Authority Broker, Open Market",
      "Underwriter",
      "Distribution CEO / Senior Commercial Owner"
    ],
    "Serve": [
      "High-Volume Agent",
      "Specialist Agent",
      "End-to-End Multi-Skilled Agent",
      "Digital Self-Service Consumer",
      "Assisted Channel Consumer",
      "Price and Cover-Conscious Consumer",
      "Accessibility or Vulnerability Needs Consumer"
    ]
  },
  "aiWorkerUsageGuidance": [
    "When given a problem, first identify the value stream: Acquire, Distribute or Serve.",
    "Identify the likely persona(s) affected and their goals, pain points and decision-making influence.",
    "Map the request to the relevant journey, product/platform area and capability/service where possible.",
    "Recommend opportunities in terms of outcomes, not only outputs or features.",
    "Surface evidence needs: user research, MI, adoption data, performance data, compliance evidence, security evidence or operational insight depending on the persona.",
    "Consider shared horizontal capabilities when a problem spans data, platform engineering, UX strategy/research/service design/design system or AI enablement.",
    "Avoid assuming that a stakeholder request equals a requirement; infer the underlying need, risk, outcome or opportunity."
  ],
  "rawContextPack": "Open GI Personas & Value Streams\nAI Worker Context Pack\n\nPrepared from the Design Team Research Library personas/value-stream page and the supplied value-stream diagram.\n\n| Intended use: provide an AI worker with structured context about personas, value streams, journeys, platform areas, capabilities, services and outcomes across Acquire, Distribute and Serve. |\n| --- |\n\n1. Executive context\n\nPersonas and value streams help describe the different people involved in customer, technical, operational and insurance journeys across Open GI’s customer ecosystem. They provide a shared language for user needs, motivations, behaviours, pain points and decision-making influence. This document combines the original persona/value-stream context with an additional operating model diagram showing leaders, squads, primary users, journeys, product/platform areas, capabilities/services, outcomes and shared horizontal capabilities.\n\n| Dimension | Content |\n| --- | --- |\n| Value streams | Acquire, Distribute, Serve |\n| Personas | 17 personas grouped by value stream |\n| Operating model lens | Leaders, squad count, primary users, customer journeys, product/platform areas, capabilities/services and outcomes |\n| Horizontal capabilities | Data Platform; Architecture + Platform Engineering; Product Leadership + UX; AI Guild |\n| How an AI worker should use this | Use value stream and persona context to classify work, suggest evidence-led opportunities, tailor recommendations to user groups, and avoid treating every request as a generic feature requirement. |\n\n2. AI worker usage guidance\n\nWhen given a problem, first identify the value stream: Acquire, Distribute or Serve.\n\nIdentify the likely persona(s) affected and their goals, pain points and decision-making influence.\n\nMap the request to the relevant journey, product/platform area and capability/service where possible.\n\nRecommend opportunities in terms of outcomes, not only outputs or features.\n\nSurface evidence needs: user research, MI, adoption data, performance data, compliance evidence, security evidence or operational insight depending on the persona.\n\nConsider shared horizontal capabilities when a problem spans data, platform engineering, UX strategy/research/service design/design system or AI enablement.\n\nAvoid assuming that a stakeholder request equals a requirement; infer the underlying need, risk, outcome or opportunity.\n\n3. Supplied value-stream diagram context\n\nThe diagram adds an operational lens to the value streams by identifying leaders, squad counts, primary users, journeys, product/platform areas, capability/service layers and target outcomes. It also shows shared horizontal capabilities that cut across all streams.\n\nFigure 1: Supplied value-stream diagram used as additional context.\n\n| Value stream | Leader | Squads | Primary users | Customer journeys | Product + Platform Areas | Capabilities + Services | Outcomes |\n| --- | --- | --- | --- | --- | --- | --- | --- |\n| Acquire | Phil | 3 | CEO / Buyer; IT Teams; Operations | Onboard -> Integrate -> Price | Onboarding; Integration Hub; User Management | Identity + Access; Customer Accounts; API Gateway; Integration Services; Webhooks; Third Party Integrations | Faster onboarding; Lower integration effort; Reduced time-to-value; Migration readiness |\n| Distribute | Joe | 2 | Insurers; Brokers; Underwriters | Rate -> Panel -> Enrich | Ratings; Insurer Gateway; LOB Tooling; Dynamic Pricing | Rate Calculation; Panel Management; Risk Enrichment; Rules Services | Pricing accuracy; Faster enrichment; Better insurer coverage; Faster rating performance |\n| Serve | Sarah | 4 | Brokers; Agents; Customers / Policyholders | Quote -> Sell -> Service -> Claim | Policy Administration; Quote + Buy; Customer Portal; AI Assist | Product Configuration; Billing; Claims; Workflow Rules; Document Generation; Communications; MTAs; Renewals | Quote conversion; Self-service completion; Customer satisfaction; Retention; Claims efficiency |\n\n| Shared horizontal capability | Context |\n| --- | --- |\n| Data Platform | Lakehouse; Canonical Model; Analytics; Reporting; AI/ML; Event Data |\n| Architecture + Platform Engineering | Cloud; Runtime; APIs; DevOps; Security; Observability; Performance |\n| Product Leadership + UX | Strategy; Discovery; Research; Service Design; Design System; Experimentation |\n| AI Guild | Shared tooling, automation and AI enablement across every stream |\n\n4. Value stream context\n\nAcquire\n\n| Field | Context |\n| --- | --- |\n| Purpose | Acquire focuses on how customers evaluate, buy, integrate and adopt Open GI products and services. It covers both commercial buying decisions and technical adoption decisions. |\n| Core context | Growth, operational efficiency, API quality, security, compliance, stability, scalability, trusted data, total cost of ownership and confidence in the platform. |\n| Who it serves | CEO / Buyer; CTO; Development Manager / Integrator; CISO |\n| What this stream helps us understand | Why customers choose or reject a platform. What commercial and technical confidence they need. How API quality, integration, compliance and stability influence adoption. What evidence is needed to support buying and procurement decisions. How the platform supports growth, scalability and operational efficiency. |\n| Key product themes | APIs and developer experience; Compliance and regulatory assurance; Operational stability and observability; Trusted MI and data insights; Total cost of ownership; Integration confidence; Security and third-party risk |\n| Diagram-derived journey | Onboard -> Integrate -> Price |\n| Diagram-derived product/platform areas | Onboarding; Integration Hub; User Management |\n| Diagram-derived capabilities/services | Identity + Access; Customer Accounts; API Gateway; Integration Services; Webhooks; Third Party Integrations |\n| Diagram-derived outcomes | Faster onboarding; Lower integration effort; Reduced time-to-value; Migration readiness |\n\nDistribute\n\n| Field | Context |\n| --- | --- |\n| Purpose | Distribute focuses on how insurance products are developed, placed, traded, distributed, monitored and optimised across insurers, MGAs, delegated authority brokers, underwriters and broker channels. |\n| Core context | Distribution reach, capacity, quote and bind journeys, broker trust, underwriting profitability, operational efficiency, product development, observability, performance, data and ROI. |\n| Who it serves | Insurer Distribution / Product Manager; MGA / Distribution Owner; Product & Distribution Owner, DA Scheme Broker; Delegated Authority Broker, Open Market; Underwriter; Distribution CEO / Senior Commercial Owner |\n| What this stream helps us understand | How insurer capacity is placed and managed. How brokers quote, bind, refer and trade business. How product owners optimise schemes and delegated authority products. How underwriting quality and profitability are protected. How distribution performance, broker adoption and ROI are measured. |\n| Key product themes | Quote and bind journeys; Broker panel trust; Flexible risk domains; Broker activation; Capacity outcome reporting; Referral visibility; Scheme performance dashboards; Product optimisation; Trading observability; Partner profitability insight |\n| Diagram-derived journey | Rate -> Panel -> Enrich |\n| Diagram-derived product/platform areas | Ratings; Insurer Gateway; LOB Tooling; Dynamic Pricing |\n| Diagram-derived capabilities/services | Rate Calculation; Panel Management; Risk Enrichment; Rules Services |\n| Diagram-derived outcomes | Pricing accuracy; Faster enrichment; Better insurer coverage; Faster rating performance |\n\nServe\n\n| Field | Context |\n| --- | --- |\n| Purpose | Serve focuses on how agents and consumers use the platform once products and services are live. |\n| Core context | Agent journeys, consumer journeys, call centre and web journeys, self-service, assisted service, policy changes, renewals, documentation, payments, performance, compliance, accessibility, conversion and customer outcomes. |\n| Who it serves | High-Volume Agent; Specialist Agent; End-to-End Multi-Skilled Agent; Digital Self-Service Consumer; Assisted Channel Consumer; Price and Cover-Conscious Consumer; Accessibility or Vulnerability Needs Consumer |\n| What this stream helps us understand | How agents complete operational and customer-facing tasks. How consumers move through digital, assisted and call centre journeys. Where friction appears in quote, sale, MTA, renewal, payment and document journeys. How accessibility, self-service, compliance and customer outcomes are supported. How performance and usability affect both agent productivity and customer experience. |\n| Key product themes | Customisable and adaptive agent UI; Low latency and high-performance processing; Regulatory, quality and script compliance; Workload management; Document and pack generation; Payment capability; Unified omni-system experience; Web-to-agent accuracy; Self-service; Accessibility and inclusive journeys; Customer outcome measurement |\n| Diagram-derived journey | Quote -> Sell -> Service -> Claim |\n| Diagram-derived product/platform areas | Policy Administration; Quote + Buy; Customer Portal; AI Assist |\n| Diagram-derived capabilities/services | Product Configuration; Billing; Claims; Workflow Rules; Document Generation; Communications; MTAs; Renewals |\n| Diagram-derived outcomes | Quote conversion; Self-service completion; Customer satisfaction; Retention; Claims efficiency |\n\n5. Personas by value stream\n\nAcquire\n\nCEO / Buyer\n\n| Persona summary | Goals and motivations | Pain points and challenges | Product opportunities |\n| --- | --- | --- | --- |\n| Senior commercial decision-maker focused on business performance, growth, cost control, risk and long-term platform value. | Protect volume; avoid market shrinkage; improve combined ratio and operating leverage; reduce unit cost; simplify the estate; use data to win capacity conversations; gain trustworthy MI; scale without simply adding headcount. | Revenue leakage during change; panel risk and aggregator volatility; brittle or sprawling technology; re-keying; slow or untrusted MI; delayed loss ratio/profitability visibility; pressure to simplify while remaining open to innovation. | Executive-level value story; trusted MI; operational stability and observability; compliance evidence; integration confidence; reduced TCO; clear pricing and billing; composable architecture narrative; transparent data ownership. |\n\nCTO\n\n| Persona summary | Goals and motivations | Pain points and challenges | Product opportunities |\n| --- | --- | --- | --- |\n| Technical strategy owner focused on architecture fit, integration quality, scalability, resilience and future operating model. | Reduce technical debt; improve integration consistency; support scalable architecture; enable automation; avoid brittle point-to-point integrations; improve data availability; support composable architecture; reduce vendor dependency; align with cloud, CRM, data lake and wider ecosystem strategy. | Lack of orchestration guidance; incomplete or hard-to-access API documentation; unclear integration patterns; difficulty mapping platform data into group systems; limited sandbox/mock environments; inconsistent API behaviour; concerns about long-term extensibility. | Clear API strategy; developer portal; API orchestration guidance; end-to-end journey examples; sandbox/mock environments; event stream documentation; CRM/data lake/cloud integration patterns; observability and platform health; reusable architecture guidance. |\n\nDevelopment Manager / Integrator\n\n| Persona summary | Goals and motivations | Pain points and challenges | Product opportunities |\n| --- | --- | --- | --- |\n| Practical implementation lead focused on API clarity, documentation, testing, automation and delivery confidence. | Access APIs quickly; understand API structure; chain APIs into broker-specific journeys; build reusable patterns; reduce development friction; avoid vendor dependency; use events and extensibility to automate workflows. | Poor orchestration guidance; API docs hidden or incomplete; difficulty ingesting/mapping data into centralised systems; no sandbox/mock examples; unclear journey patterns; vendor involvement for simple changes. | Developer portal improvements; clear API documentation; self-service sandbox; mock environments; quote-bind-renewal API examples; reusable boilerplates; API testing tools; event stream guidance; integration quickstarts. |\n\nCISO\n\n| Persona summary | Goals and motivations | Pain points and challenges | Product opportunities |\n| --- | --- | --- | --- |\n| Security and risk authority focused on compliance evidence, data protection, resilience, auditability and third-party risk. | Minimise third-party risk; protect customer and business data; ensure GDPR/FCA alignment; support ISO/SOC 2 expectations; improve auditability; ensure secure integrations; avoid hidden exposure; reduce operational and regulatory risk. | Lack of transparent security evidence; unclear data ownership/IP boundaries; unclear access models; limited auditability; insufficient regulatory compliance evidence; third-party integration risk; weak data-flow documentation. | Security and compliance documentation; GDPR/FCA evidence; ISO/SOC 2 readiness material; data ownership transparency; audit logs/access control visibility; secure API patterns; integration security guidance; resilience evidence; incident and observability reporting. |\n\nDistribute\n\nInsurer Distribution / Product Manager\n\n| Persona summary | Goals and motivations | Pain points and challenges | Product opportunities |\n| --- | --- | --- | --- |\n| Expands broker distribution while protecting underwriting profitability and product performance. | Grow high-quality broker distribution; protect profitability and claims ratios; onboard brokers efficiently; monitor performance with reliable MI. | Limited broker performance visibility; slow onboarding/product change; unclear distribution quality signals; manual portfolio monitoring. | Portfolio dashboards; broker onboarding workflows; distribution quality reporting; claims ratio and profitability insight; compliance packs; scalable distribution tooling. |\n\nMGA / Distribution Owner\n\n| Persona summary | Goals and motivations | Pain points and challenges | Product opportunities |\n| --- | --- | --- | --- |\n| Makes MGA products easy for brokers to access, trade, manage and trust. | Increase broker adoption; maintain capacity relationships; clarify appetite/trading rules; keep migration and trading performance visible. | Broker uncertainty during change; weak quote/bind visibility; capacity relationship risk; limited distribution performance insight. | Broker panel trust indicators; quote/bind performance reporting; appetite guidance; migration dashboards; trading observability; capacity relationship insight. |\n\nProduct & Distribution Owner, DA Scheme Broker\n\n| Persona summary | Goals and motivations | Pain points and challenges | Product opportunities |\n| --- | --- | --- | --- |\n| Owns delegated authority scheme performance across build, governance, optimisation and distribution. | Grow GWP safely; optimise schemes using data; support insurer reporting; control product changes and risk domains. | Limited no-code configuration; slow pricing/referral analysis; weak sandbox environments; inflexible risk domains and product change control. | Self-service dashboards; no-code configuration; referral analysis; pricing simulation; sandbox environments; flexible risk domains; data-led insurer reporting. |\n\nDelegated Authority Broker, Open Market\n\n| Persona summary | Goals and motivations | Pain points and challenges | Product opportunities |\n| --- | --- | --- | --- |\n| Places risks that do not fit straightforward delegated schemes and needs fast, visible open-market trading. | Place non-standard risks efficiently; understand appetite/capacity quickly; track quote progress and referrals; reduce duplicated data entry. | Unclear appetite fit; poor submission status visibility; re-keying across systems; slow referral handling. | Open-market trading flows; submission visibility; appetite matching; referral tracking; quote progress updates; re-keying reduction. |\n\nUnderwriter\n\n| Persona summary | Goals and motivations | Pain points and challenges | Product opportunities |\n| --- | --- | --- | --- |\n| Protects underwriting quality, manages appetite, reviews referrals and safeguards portfolio performance. | Improve risk selection; protect capacity outcomes; maintain appetite clarity; understand partner profitability and portfolio trends. | Limited referral-driver visibility; weak claims/fraud context; unclear product/rule visibility; slow decision support. | Underwriting dashboards; referral analytics; claims/fraud insight; appetite tools; partner profitability reporting; product/rule visibility. |\n\nDistribution CEO / Senior Commercial Owner\n\n| Persona summary | Goals and motivations | Pain points and challenges | Product opportunities |\n| --- | --- | --- | --- |\n| Owns the strategic and commercial performance of the distribution model. | Improve ROI and profitable growth; expand market reach; increase broker adoption; improve operational efficiency and partner performance. | Unclear commercial value evidence; fragmented partner/capacity reporting; limited strategic MI; difficulty connecting operational metrics to ROI. | Strategic MI; ROI dashboards; capacity performance reporting; broker adoption insight; partner scorecards; commercial value evidence. |\n\nServe\n\nHigh-Volume Agent\n\n| Persona summary | Goals and motivations | Pain points and challenges | Product opportunities |\n| --- | --- | --- | --- |\n| Handles frequent customer interactions and needs fast, accurate, compliant workflows. | Complete interactions quickly and accurately; maintain compliance; generate documents and take payments without friction; deliver better customer outcomes. | Slow screens/processing; unclear workflows; manual document/payment steps; inaccurate web-to-agent handoff. | Low-latency journeys; guided workflows; document generation; payment capability; workload management; web-to-agent accuracy. |\n\nSpecialist Agent\n\n| Persona summary | Goals and motivations | Pain points and challenges | Product opportunities |\n| --- | --- | --- | --- |\n| Handles complex, niche, regulated or non-standard journeys requiring judgement and guidance. | Resolve complex cases confidently; access underwriting/appetite guidance; handle referrals and regulated journeys safely; support niche products. | Poor edge-case support; limited complex-risk context; unclear underwriting guidance; compliance risk in non-standard journeys. | Specialist journey patterns; underwriting guidance; referral support; complex risk context; niche journey configuration; compliance prompts. |\n\nEnd-to-End Multi-Skilled Agent\n\n| Persona summary | Goals and motivations | Pain points and challenges | Product opportunities |\n| --- | --- | --- | --- |\n| Supports customers across the policy lifecycle and needs continuity, context and consistent UI patterns. | Resolve issues first time; keep customer context; reduce handoffs and duplication; manage multiple task types. | Fragmented systems; inconsistent interfaces; lost customer context; too many handoffs. | Unified omni-system experience; consistent UI patterns; customer context panels; first-contact resolution support; cross-journey workload management; reduced handoff workflows. |\n\nDigital Self-Service Consumer\n\n| Persona summary | Goals and motivations | Pain points and challenges | Product opportunities |\n| --- | --- | --- | --- |\n| Wants to complete insurance tasks independently online with clarity, confidence and confirmation. | Complete tasks without calling; understand cover and price; receive confirmation; use accessible journeys on their own terms. | Unclear cover wording; friction in digital flows; lack of confirmation; poor accessibility/self-service support. | Self-service journeys; cover clarity; confirmation messaging; accessibility improvements; digital measurement; customer outcome insights. |\n\nAssisted Channel Consumer\n\n| Persona summary | Goals and motivations | Pain points and challenges | Product opportunities |\n| --- | --- | --- | --- |\n| Moves between digital and human-supported channels and needs continuity without repeating information. | Get human help without losing progress; avoid repeating information; understand journey state; complete tasks with reassurance. | Broken handoffs; repeated questions; unclear journey state; poor conversion visibility. | Web-to-agent handoff; channel continuity; customer context sharing; journey state visibility; outcome measurement; conversion observability. |\n\nPrice and Cover-Conscious Consumer\n\n| Persona summary | Goals and motivations | Pain points and challenges | Product opportunities |\n| --- | --- | --- | --- |\n| Looks for suitable cover at a price they understand, compare and trust. | Understand cover/exclusions; compare confidently; trust renewal and price changes; choose suitable cover without confusion. | Unclear assumptions/exclusions; opaque price changes; difficult comparison; low confidence in cover suitability. | Cover comparison; price transparency; renewal explanations; exclusion/assumption clarity; fair pricing content; suitability prompts. |\n\nAccessibility or Vulnerability Needs Consumer\n\n| Persona summary | Goals and motivations | Pain points and challenges | Product opportunities |\n| --- | --- | --- | --- |\n| May need additional support, inclusive content, channel choice and fair outcomes. | Use accessible journeys/docs; understand plain language; choose support channel; reach fair outcomes without barriers. | Inaccessible forms/docs; complex language; limited assisted support; poor recognition of vulnerability or stress. | WCAG-aligned journeys; plain language; accessible documentation; assisted support pathways; channel choice; fair outcome measurement. |\n\n6. Cross-stream interpretation\n\n| Lens | Interpretation for AI worker |\n| --- | --- |\n| Acquire = decision and adoption confidence | Focus on credibility, evidence, integration confidence, technical/security assurance, TCO and enterprise fit. Recommendations should reduce buying risk and increase adoption confidence. |\n| Distribute = insurance trading and product performance | Focus on capacity, rating, enrichment, panel management, product optimisation, broker trust, underwriting control and profitability insight. Recommendations should improve trading effectiveness and measurable distribution outcomes. |\n| Serve = day-to-day experience and customer outcomes | Focus on agent efficiency, self-service, assisted service, policy servicing, renewals, MTAs, claims, documents, payments, accessibility and customer outcome measurement. Recommendations should improve usability, conversion, retention, satisfaction and operational efficiency. |\n| Shared horizontal capabilities | Use these when a request has systemic impact across streams: data foundations, cloud/runtime/API/security/performance, design system/service design/research, or AI tooling/automation enablement. |\n\n7. Suggested context prompt for the AI worker\n\n| You are supporting Open GI product, design and delivery work. Use the following context to classify requests and generate evidence-led recommendations. Open GI has three value streams: 1. Acquire: customers evaluate, buy, integrate and adopt Open GI products and services. Key personas include CEO / Buyer, CTO, Development Manager / Integrator and CISO. Focus on adoption confidence, APIs, integration, security, compliance, trusted MI, stability, scalability, TCO and operational efficiency. 2. Distribute: insurance products are developed, placed, traded, distributed, monitored and optimised. Key personas include insurer distribution/product managers, MGA/distribution owners, delegated authority scheme owners, open-market DA brokers, underwriters and senior commercial distribution owners. Focus on ratings, panel, enrichment, quote/bind, appetite, broker trust, capacity, underwriting profitability, observability, performance data and ROI. 3. Serve: agents and consumers use the platform once services are live. Key personas include high-volume agents, specialist agents, multi-skilled agents, digital self-service consumers, assisted-channel consumers, price/cover-conscious consumers and accessibility/vulnerability-needs consumers. Focus on quote, sell, service, claim, policy administration, quote and buy, customer portal, AI assist, MTAs, renewals, billing, claims, workflow rules, document generation, communications, self-service and customer outcomes. Use the persona goals, pain points and opportunities in this document to shape recommendations. Always ask: which value stream is affected, which personas are impacted, what outcome matters, what evidence is needed and which shared horizontal capability may be involved? Do not treat every stakeholder request as a requirement; infer the underlying user need, business outcome, risk or opportunity. |\n| --- |\n\n8. Source notes\n\nDesign Team Research Library: Personas & Value Streams page, accessed 18 May 2026.\n\nSupplied value-stream diagram image, added as Figure 1 and extracted into structured tables.\n\nThis document is a structured synthesis for AI-worker context. It is not a replacement for primary research notes, customer evidence or delivery decision records."
};

export function getOpenGiContextForValueStream(valueStream) {
  if (!valueStream || valueStream === "Not sure") return OGI_CONTEXT;
  const stream = OGI_CONTEXT.valueStreams[valueStream];
  return {
    meta: OGI_CONTEXT.meta,
    selectedValueStream: valueStream,
    valueStream: stream || null,
    personas: OGI_CONTEXT.personaNamesByValueStream[valueStream] || [],
    sharedHorizontalCapabilities: OGI_CONTEXT.sharedHorizontalCapabilities,
    aiWorkerUsageGuidance: OGI_CONTEXT.aiWorkerUsageGuidance
  };
}

export function inferOpenGiValueStream(input = "") {
  const text = String(input).toLowerCase();
  if (/customer portal|policy administration|quote \+ buy|quote and buy|mta|renewal|billing|claim|claims|document|payment|self-service|agent|policyholder|customer/.test(text)) return "Serve";
  if (/rating|ratings|rate calculation|panel|insurer gateway|dynamic pricing|underwriter|underwriting|enrichment|broker panel|quote\/bind|quote and bind/.test(text)) return "Distribute";
  if (/onboarding|integration hub|api|developer|identity|access|user management|webhook|third party integration|ciso|cto|security|compliance|migration/.test(text)) return "Acquire";
  return "Not sure";
}

// Optional browser/global export for non-module usage.
if (typeof window !== "undefined") {
  window.OGI_CONTEXT = OGI_CONTEXT;
  window.getOpenGiContextForValueStream = getOpenGiContextForValueStream;
  window.inferOpenGiValueStream = inferOpenGiValueStream;
}
