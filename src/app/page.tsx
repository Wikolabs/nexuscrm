const agents = [
  {
    id: "01",
    name: "Qualification Agent",
    task: "Analyse les leads entrants et score leur potentiel selon 47 critères.",
    status: "running",
    metric: "34 leads qualifiés",
    icon: "🎯",
  },
  {
    id: "02",
    name: "Outreach Agent",
    task: "Rédige et envoie des séquences personnalisées par email et LinkedIn.",
    status: "running",
    metric: "12 séquences actives",
    icon: "📨",
  },
  {
    id: "03",
    name: "Scoring Agent",
    task: "Met à jour le score de chaque contact en temps réel selon les interactions.",
    status: "running",
    metric: "248 contacts mis à jour",
    icon: "📊",
  },
  {
    id: "04",
    name: "Proposal Agent",
    task: "Génère des propositions commerciales adaptées à chaque profil client.",
    status: "idle",
    metric: "7 propositions prêtes",
    icon: "📝",
  },
  {
    id: "05",
    name: "Follow-up Agent",
    task: "Planifie et envoie les relances au bon moment selon le comportement du prospect.",
    status: "running",
    metric: "19 relances planifiées",
    icon: "🔄",
  },
];

export default function Home() {
  return (
    <main style={{ fontFamily: "var(--font-body)" }}>
      {/* Nav */}
      <nav className="flex items-center justify-between px-8 py-4 bg-indigo-950 sticky top-0 z-10">
        <span style={{ fontFamily: "var(--font-display)" }} className="text-2xl text-white tracking-widest">
          NEXUSCRM
        </span>
        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          <button data-cal-link="wikolabs-team/30min" data-cal-namespace="wk30min" data-cal-config='{"layout":"month_view"}' type="button" target="_blank" rel="noopener noreferrer" className="border border-indigo-400 text-indigo-200 px-5 py-2 text-sm font-semibold hover:bg-indigo-800 transition tracking-wide">
            📅 Réserver un créneau →
          </button>
          <a href="https://wa.me/261386626100?text=Bonjour%2C%20je%20souhaite%20discuter%20de%20NexusCRM%20avec%20Wikolabs." target="_blank" rel="noopener noreferrer" className="border border-indigo-400 text-indigo-200 px-5 py-2 text-sm font-semibold hover:bg-indigo-800 transition tracking-wide" style={{ background: "#25d366", borderColor: "#25d366" }}>
            💬 WhatsApp →
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-indigo-950 pt-16 pb-20 px-6 text-center">
        <div className="inline-flex items-center gap-2 bg-indigo-800 text-indigo-200 text-xs px-4 py-1.5 rounded-full mb-8">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          5 agents IA actifs en ce moment
        </div>
        <h1 style={{ fontFamily: "var(--font-display)" }} className="text-5xl md:text-7xl text-white tracking-widest leading-none mb-6">
          VOTRE CRM<br />
          <span className="text-indigo-400">PILOTÉ PAR</span><br />
          5 AGENTS IA
        </h1>
        <p className="text-indigo-200 text-lg max-w-2xl mx-auto mb-10">
          NexusCRM orchestre qualification, relance, scoring, proposition et suivi en parallèle — chaque agent travaille sans relâche, tout est synchronisé dans votre CRM.
        </p>
        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          <button data-cal-link="wikolabs-team/30min" data-cal-namespace="wk30min" data-cal-config='{"layout":"month_view"}' type="button" target="_blank" rel="noopener noreferrer" className="inline-block bg-indigo-500 text-white px-10 py-4 font-bold text-base hover:bg-indigo-400 transition shadow-xl tracking-wide">
            📅 Réserver un créneau →
          </button>
          <a href="https://wa.me/261386626100?text=Bonjour%2C%20je%20souhaite%20discuter%20de%20NexusCRM%20avec%20Wikolabs." target="_blank" rel="noopener noreferrer" className="inline-block bg-indigo-500 text-white px-10 py-4 font-bold text-base hover:bg-indigo-400 transition shadow-xl tracking-wide" style={{ background: "#25d366", borderColor: "#25d366" }}>
            💬 WhatsApp →
          </a>
        </div>
      </section>

      {/* Command Center */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 style={{ fontFamily: "var(--font-display)" }} className="text-3xl text-indigo-900 tracking-wide">
            COMMAND CENTER
          </h2>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <span className="w-2 h-2 rounded-full bg-green-400" />
            Tous les agents opérationnels
          </div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {agents.map((agent) => (
            <div
              key={agent.id}
              className="bg-white rounded-xl border-2 border-indigo-100 p-5 hover:border-indigo-400 transition group shadow-sm"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{agent.icon}</span>
                  <span className="text-xs font-mono text-indigo-400">#{agent.id}</span>
                </div>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                    agent.status === "running"
                      ? "bg-green-100 text-green-700"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {agent.status === "running" ? "● En cours" : "○ En attente"}
                </span>
              </div>
              <h3 style={{ fontFamily: "var(--font-display)" }} className="text-indigo-900 text-base tracking-wide mb-2">
                {agent.name.toUpperCase()}
              </h3>
              <p className="text-slate-500 text-xs leading-relaxed mb-4">{agent.task}</p>
              <div className="bg-indigo-50 rounded-lg px-3 py-2 text-xs font-semibold text-indigo-700">
                {agent.metric}
              </div>
            </div>
          ))}
          {/* Last card: add agent */}
          <div className="bg-indigo-50 rounded-xl border-2 border-dashed border-indigo-200 p-5 flex flex-col items-center justify-center text-center min-h-[200px]">
            <span className="text-3xl mb-3">+</span>
            <p className="text-indigo-400 text-sm font-semibold">Ajouter un agent</p>
            <p className="text-indigo-300 text-xs mt-1">Configurez un agent personnalisé pour votre workflow</p>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="bg-indigo-900 py-10">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { val: "5x", label: "plus de prospects traités" },
            { val: "87%", label: "taux de réponse moyen" },
            { val: "12h", label: "économisées par commercial" },
            { val: "0", label: "leads oubliés" },
          ].map(({ val, label }) => (
            <div key={label}>
              <div style={{ fontFamily: "var(--font-display)" }} className="text-4xl text-indigo-200 tracking-wider">{val}</div>
              <div className="text-indigo-400 text-xs mt-1">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-indigo-950 py-16 text-center px-6">
        <h2 style={{ fontFamily: "var(--font-display)" }} className="text-4xl text-white tracking-widest mb-4">
          DÉPLOYEZ VOS AGENTS AUJOURD&rsquo;HUI
        </h2>
        <p className="text-indigo-300 mb-8 max-w-lg mx-auto">Connexion à votre CRM existant en moins de 2 heures. Salesforce, HubSpot, Pipedrive.</p>
        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          <button data-cal-link="wikolabs-team/30min" data-cal-namespace="wk30min" data-cal-config='{"layout":"month_view"}' type="button" target="_blank" rel="noopener noreferrer" className="inline-block bg-indigo-500 text-white px-10 py-4 font-bold text-base hover:bg-indigo-400 transition tracking-wide">
            📅 Réserver un créneau →
          </button>
          <a href="https://wa.me/261386626100?text=Bonjour%2C%20je%20souhaite%20discuter%20de%20NexusCRM%20avec%20Wikolabs." target="_blank" rel="noopener noreferrer" className="inline-block bg-indigo-500 text-white px-10 py-4 font-bold text-base hover:bg-indigo-400 transition tracking-wide" style={{ background: "#25d366", borderColor: "#25d366" }}>
            💬 WhatsApp →
          </a>
        </div>
      </section>

      <footer className="text-center py-5 text-indigo-900/50 text-sm bg-indigo-950 border-t border-indigo-900">
        <p className="text-indigo-400">&copy; 2025 NexusCRM &mdash; Un produit Wikolabs</p>
        <div className="flex flex-wrap justify-center gap-4 mt-2 text-xs text-indigo-400">
          <a href="mailto:team@wikolabs.com" className="hover:text-indigo-200 transition-colors">team@wikolabs.com</a>
          <span>·</span>
          <a href="tel:+261386626100" className="hover:text-indigo-200 transition-colors">+261 38 66 261 00</a>
          <span>·</span>
          <a href="https://calendly.com/wikolabs" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-200 transition-colors">Prendre RDV</a>
        </div>
      </footer>
    </main>
  );
}
