import React, { useState, useEffect, useRef } from 'react';
import KnowledgeGraphView from './views/KnowledgeGraphView';
import SourcesView from './views/SourcesView';
import SemanticSearchView from './views/SemanticSearchView';
import AnalyticsView from './views/AnalyticsView';
import ApiDocsView from './views/ApiDocsView';
import ActivityLogView from './views/ActivityLogView';
import Logo from './assets/Logo.svg';

const KpiCard = ({ label, target, suffix = '', delta, deltaNeg = false, warn = false }) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let cur = 0;
    const step = Math.max(1, Math.round(target / 40));
    const t = setInterval(() => {
      cur += step;
      if (cur >= target) {
        cur = target;
        clearInterval(t);
      }
      setValue(cur);
    }, 20);
    return () => clearInterval(t);
  }, [target]);

  return (
    <div className={`kpi-card ${warn ? 'warn' : ''}`}>
      <div className="kpi-label">{label}</div>
      <div className="kpi-value">{value.toLocaleString('en-US')}{suffix}</div>
      <div className={`kpi-delta ${deltaNeg ? 'neg' : ''}`}>{delta}</div>
    </div>
  );
};

export default function Dashboard({ user }) {
  const [stamp, setStamp] = useState('—');
  const [activeNav, setActiveNav] = useState('Command Center');
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [avatarError, setAvatarError] = useState(false);
  const [globalQuery, setGlobalQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchInputValue, setSearchInputValue] = useState('');
  const searchInputRef = useRef(null);
  const mainRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (mainRef.current) {
      mainRef.current.scrollTo(0, 0);
    }
  }, [activeNav]);

  const NAV_PAGES = [
    { name: 'Command Center', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></svg> },
    { name: 'Knowledge Graph', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="12" r="3" /><circle cx="4" cy="6" r="2" /><circle cx="20" cy="6" r="2" /><circle cx="4" cy="18" r="2" /><circle cx="20" cy="18" r="2" /><path d="M6 7l4 3M18 7l-4 3M6 17l4-3M18 17l-4-3" /></svg> },
    { name: 'Sources', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M4 6h16M4 12h16M4 18h10" /></svg> },
    { name: 'Semantic Search', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></svg> },
    { name: 'Analytics', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M4 19V9M12 19V4M20 19v-6" /></svg> },
    { name: 'API & Docs', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 9h18M8 4v5" /></svg> },
    { name: 'Activity Log', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="12" r="8" /><path d="M12 8v4l3 2" /></svg> }
  ];

  const filteredNavs = searchInputValue ? NAV_PAGES.filter(p => p.name.toLowerCase().includes(searchInputValue.toLowerCase())) : [];

  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  useEffect(() => {
    setStamp(new Date().toLocaleString('en-US', {
      weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
    }));
  }, []);

  const sources = [
    { code: 'CFL', name: 'Confluence — Engineering Space', meta: '18,204 docs · synced 2m ago', status: 'synced' },
    { code: 'SFW', name: 'Snowflake — Analytics Warehouse', meta: '412 tables · synced 4m ago', status: 'synced' },
    { code: 'SPT', name: 'SharePoint — Finance Portal', meta: '6,880 files · syncing', status: 'syncing' },
    { code: 'SFD', name: 'Salesforce — CRM Records', meta: '92,110 records · synced 1m ago', status: 'synced' },
    { code: 'ZDK', name: 'Zendesk — Support Knowledge Base', meta: '3,014 articles · synced 6m ago', status: 'synced' },
    { code: 'GDR', name: 'Google Drive — Research Team', meta: '9,442 files · syncing', status: 'syncing' },
  ];

  const activity = [
    { q: 'What changed in the Q3 vendor contract terms?', src: 'SharePoint · Legal', score: 96 },
    { q: 'Summarize open incidents affecting enterprise accounts', src: 'Zendesk · Support KB', score: 91 },
    { q: 'Which team owns the customer data retention policy?', src: 'Confluence · Governance', score: 88 },
    { q: 'Show revenue trend for the APAC region, last 2 quarters', src: 'Snowflake · Analytics', score: 97 },
    { q: 'Find prior research on competitor pricing models', src: 'Google Drive · Research', score: 79 },
  ];

  const coverage = [
    { label: 'Enterprise Documents', pct: 92 },
    { label: 'Internal Databases', pct: 88 },
    { label: 'Internal Portals', pct: 95 },
    { label: 'Business Applications', pct: 74 },
    { label: 'Data Warehouses', pct: 81 },
  ];

  return (
    <div className={`shell ${isMobileNavOpen ? 'mobile-nav-open' : ''}`}>
      <div className="mobile-overlay" onClick={() => setIsMobileNavOpen(false)}></div>
      {/* RAIL */}
      <aside className="rail">
        <div 
          className="brand" 
          style={{ padding: '0 0px', marginBottom: '20px', marginTop: '0px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0px', cursor: 'pointer' }}
          onClick={() => { setActiveNav('Command Center'); setIsMobileNavOpen(false); }}
        >
          <img src={Logo} alt="ContekXtra Logo" style={{ width: '80px', maxWidth: '80%', height: 'auto', display: 'block' }} />
          <div className="brand-text" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <span className="sub">Context Intelligence</span>
          </div>
        </div>

        <div className="nav-group">
          <div className="nav-label">Workspace</div>
          <div className={`nav-item ${activeNav === 'Command Center' ? 'active' : ''}`} onClick={() => { setActiveNav('Command Center'); setIsMobileNavOpen(false); }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></svg>
            <span>Command Center</span>
          </div>
          <div className={`nav-item ${activeNav === 'Knowledge Graph' ? 'active' : ''}`} onClick={() => { setActiveNav('Knowledge Graph'); setIsMobileNavOpen(false); }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="12" r="3" /><circle cx="4" cy="6" r="2" /><circle cx="20" cy="6" r="2" /><circle cx="4" cy="18" r="2" /><circle cx="20" cy="18" r="2" /><path d="M6 7l4 3M18 7l-4 3M6 17l4-3M18 17l-4-3" /></svg>
            <span>Knowledge Graph</span>
          </div>
          <div className={`nav-item ${activeNav === 'Sources' ? 'active' : ''}`} onClick={() => { setActiveNav('Sources'); setIsMobileNavOpen(false); }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M4 6h16M4 12h16M4 18h10" /></svg>
            <span>Sources</span>
          </div>
          <div className={`nav-item ${activeNav === 'Semantic Search' ? 'active' : ''}`} onClick={() => { setActiveNav('Semantic Search'); setIsMobileNavOpen(false); }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></svg>
            <span>Semantic Search</span>
          </div>
        </div>

        <div className="nav-group">
          <div className="nav-label">Insight</div>
          <div className={`nav-item ${activeNav === 'Analytics' ? 'active' : ''}`} onClick={() => { setActiveNav('Analytics'); setIsMobileNavOpen(false); }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M4 19V9M12 19V4M20 19v-6" /></svg>
            <span>Analytics</span>
          </div>
          <div className={`nav-item ${activeNav === 'API & Docs' ? 'active' : ''}`} onClick={() => { setActiveNav('API & Docs'); setIsMobileNavOpen(false); }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 9h18M8 4v5" /></svg>
            <span>API &amp; Docs</span>
          </div>
          <div className={`nav-item ${activeNav === 'Activity Log' ? 'active' : ''}`} onClick={() => { setActiveNav('Activity Log'); setIsMobileNavOpen(false); }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="12" r="8" /><path d="M12 8v4l3 2" /></svg>
            <span>Activity Log</span>
          </div>
        </div>

        <div className="rail-foot">
          <span className="dot"></span>Enterprise plan
        </div>
      </aside>

      {/* TOPBAR */}
      <header className="topbar">
        <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
          <button className="mobile-menu-btn" style={{ display: 'none' }} onClick={() => setIsMobileNavOpen(true)}>
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
          <div className="search-wrap" style={{ position: 'relative' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></svg>
            <input 
              type="text" 
              placeholder="Ask ContekXtra about your enterprise knowledge…" 
              ref={searchInputRef}
              value={searchInputValue}
              onChange={(e) => setSearchInputValue(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && e.target.value.trim()) {
                  setGlobalQuery(e.target.value);
                  setActiveNav('Semantic Search');
                  setSearchInputValue('');
                  setIsSearchFocused(false);
                  e.target.blur();
                }
              }}
            />
            <span className="search-kbd">⌘K</span>
            
            {isSearchFocused && (
              <div style={{
                position: 'absolute', top: 'calc(100% + 8px)', left: 0, right: 0,
                background: 'var(--surface)', border: '1px solid var(--line)',
                borderRadius: '8px', padding: '8px', zIndex: 100,
                boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                display: 'flex', flexDirection: 'column', gap: '4px'
              }}>
                {searchInputValue ? (
                  <>
                    <div style={{ padding: '8px 12px', fontSize: '11px', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Top Results</div>
                    
                    {filteredNavs.length > 0 && (
                      <div style={{ padding: '8px 12px 4px', fontSize: '11px', color: 'var(--amber)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Pages</div>
                    )}
                    {filteredNavs.map(page => (
                      <div key={page.name} className="search-res-item" style={{ padding: '10px 12px', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }} onClick={() => { setActiveNav(page.name); setSearchInputValue(''); }}>
                        <div style={{ width: '16px', height: '16px', color: 'var(--text-mut)' }}>{page.icon}</div>
                        <div>
                          <div style={{ fontSize: '13px', color: 'var(--text)', fontWeight: '500' }}>{page.name}</div>
                          <div style={{ fontSize: '11px', color: 'var(--text-mut)' }}>Dashboard View</div>
                        </div>
                      </div>
                    ))}

                    <div style={{ padding: '8px 12px 4px', fontSize: '11px', color: 'var(--teal)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Knowledge</div>
                    <div className="search-res-item" style={{ padding: '10px 12px', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }} onClick={() => { setGlobalQuery(searchInputValue); setActiveNav('Semantic Search'); setSearchInputValue(''); }}>
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="var(--teal)" strokeWidth="2"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></svg>
                      <div>
                        <div style={{ fontSize: '13px', color: 'var(--text)', fontWeight: '500' }}>Search for "{searchInputValue}"</div>
                        <div style={{ fontSize: '11px', color: 'var(--text-mut)' }}>In Semantic Search</div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div style={{ padding: '8px 12px', fontSize: '11px', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Recent Searches</div>
                    <div className="search-res-item" style={{ padding: '10px 12px', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', color: 'var(--text-mut)' }} onClick={() => setSearchInputValue('Vendor SLA penalties')}>
                      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                      <span style={{ fontSize: '13px' }}>Vendor SLA penalties</span>
                    </div>
                    <div className="search-res-item" style={{ padding: '10px 12px', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', color: 'var(--text-mut)' }} onClick={() => setSearchInputValue('SOC2 compliance docs')}>
                      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                      <span style={{ fontSize: '13px' }}>SOC2 compliance docs</span>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="top-right" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div className="sync-pill"><span className="pulse"></span>All sources synced</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderLeft: '1px solid var(--line)', paddingLeft: '16px' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ color: 'var(--text)', fontSize: '13px', fontWeight: 'bold' }}>{user?.displayName || 'User'}</div>
              <div style={{ color: 'var(--text-mut)', fontSize: '11px' }}>{user?.email}</div>
            </div>

            {user?.photoURL && !avatarError ? (
              <img src={user.photoURL} alt="Avatar" referrerPolicy="no-referrer" style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }} onError={() => setAvatarError(true)} />
            ) : (
              <div className="avatar" style={{ width: '32px', height: '32px', fontSize: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--surface-2)', border: '1px solid var(--line)', borderRadius: '50%', color: 'var(--amber)' }}>
                {(user?.displayName || user?.email || 'U').substring(0, 2).toUpperCase()}
              </div>
            )}

            <button
              onClick={() => import('./firebase').then(({ auth }) => import('firebase/auth').then(({ signOut }) => signOut(auth)))}
              style={{ background: 'transparent', border: '1px solid var(--line)', color: 'var(--text-mut)', padding: '6px 10px', borderRadius: '4px', cursor: 'pointer', fontSize: '11px', marginLeft: '4px', transition: 'all 0.2s' }}
              onMouseOver={(e) => { e.currentTarget.style.color = 'var(--text)'; e.currentTarget.style.borderColor = 'var(--text-mut)'; }}
              onMouseOut={(e) => { e.currentTarget.style.color = 'var(--text-mut)'; e.currentTarget.style.borderColor = 'var(--line)'; }}
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="main" ref={mainRef}>
        {activeNav === 'Command Center' ? (
          <>
            <div className="page-head">
              <div>
                <span className="eyebrow">Enterprise Context Intelligence</span>
                <h1>Knowledge Command Center</h1>
              </div>
              <span className="stamp">{stamp}</span>
            </div>

            {/* KPI STRIP */}
            <section className="kpi-strip">
              <KpiCard label="Connected sources" target={128} delta="+6 this week" />
              <KpiCard label="Queries · 24h" target={4382} delta="+312 vs yesterday" />
              <KpiCard label="Avg. relevance score" target={94} suffix="%" delta="+1.4 pts" />
              <KpiCard label="Knowledge coverage" target={87} suffix="%" delta="3 sources lagging" deltaNeg={true} warn={true} />
              <KpiCard label="Active contexts" target={312} delta="+18 today" />
            </section>

            {/* ROW 2: GRAPH + SOURCES */}
            <section className="row2">
              <div className="panel">
                <div className="panel-head">
                  <div>
                    <h2>Enterprise Knowledge Graph</h2>
                    <div className="desc">Live relationships between connected sources and the context layer</div>
                  </div>
                  <div className="panel-tabs">
                    <div className="panel-tab active">Relationships</div>
                    <div className="panel-tab">Coverage</div>
                  </div>
                </div>

                <svg viewBox="0 0 760 340" width="100%" style={{ display: 'block' }}>
                  {/* paths: left nodes */}
                  <path id="p1" d="M110,60 C 260,60 260,150 380,170" fill="none" stroke="#242B38" strokeWidth="1.4" />
                  <path id="p2" d="M110,170 C 240,170 260,170 380,170" fill="none" stroke="#242B38" strokeWidth="1.4" />
                  <path id="p3" d="M110,280 C 260,280 260,190 380,170" fill="none" stroke="#242B38" strokeWidth="1.4" />
                  {/* paths: right nodes */}
                  <path id="p4" d="M650,60 C 500,60 500,150 380,170" fill="none" stroke="#242B38" strokeWidth="1.4" />
                  <path id="p5" d="M650,170 C 520,170 500,170 380,170" fill="none" stroke="#242B38" strokeWidth="1.4" />
                  <path id="p6" d="M650,280 C 500,280 500,190 380,170" fill="none" stroke="#242B38" strokeWidth="1.4" />

                  {/* traveling context dots */}
                  <circle r="3" fill="#3DBFAD"><animateMotion dur="3.4s" begin="0s" repeatCount="indefinite"><mpath href="#p1" /></animateMotion></circle>
                  <circle r="3" fill="#E8A33D"><animateMotion dur="2.6s" begin="0.6s" repeatCount="indefinite"><mpath href="#p2" /></animateMotion></circle>
                  <circle r="3" fill="#3DBFAD"><animateMotion dur="3.9s" begin="1.1s" repeatCount="indefinite"><mpath href="#p3" /></animateMotion></circle>
                  <circle r="3" fill="#3DBFAD"><animateMotion dur="3.1s" begin="0.3s" repeatCount="indefinite"><mpath href="#p4" /></animateMotion></circle>
                  <circle r="3" fill="#E8A33D"><animateMotion dur="2.9s" begin="1.4s" repeatCount="indefinite"><mpath href="#p5" /></animateMotion></circle>
                  <circle r="3" fill="#3DBFAD"><animateMotion dur="3.6s" begin="0.9s" repeatCount="indefinite"><mpath href="#p6" /></animateMotion></circle>

                  {/* left nodes */}
                  <g fontFamily="IBM Plex Mono, monospace">
                    <circle cx="88" cy="60" r="24" fill="#171C27" stroke="#2A5A54" strokeWidth="1.5" />
                    <text x="88" y="65" textAnchor="middle" fontSize="10" fill="#3DBFAD">DOC</text>
                    <text x="88" y="98" textAnchor="middle" fontSize="10.5" fill="#8C94A6" fontFamily="IBM Plex Sans">Enterprise Documents</text>

                    <circle cx="88" cy="170" r="24" fill="#171C27" stroke="#2A5A54" strokeWidth="1.5" />
                    <text x="88" y="175" textAnchor="middle" fontSize="10" fill="#3DBFAD">DB</text>
                    <text x="88" y="208" textAnchor="middle" fontSize="10.5" fill="#8C94A6" fontFamily="IBM Plex Sans">Internal Databases</text>

                    <circle cx="88" cy="280" r="24" fill="#171C27" stroke="#2A5A54" strokeWidth="1.5" />
                    <text x="88" y="285" textAnchor="middle" fontSize="10" fill="#3DBFAD">APP</text>
                    <text x="88" y="318" textAnchor="middle" fontSize="10.5" fill="#8C94A6" fontFamily="IBM Plex Sans">Business Applications</text>

                    {/* right nodes */}
                    <circle cx="672" cy="60" r="24" fill="#171C27" stroke="#2A5A54" strokeWidth="1.5" />
                    <text x="672" y="65" textAnchor="middle" fontSize="10" fill="#3DBFAD">PTL</text>
                    <text x="672" y="98" textAnchor="middle" fontSize="10.5" fill="#8C94A6" fontFamily="IBM Plex Sans">Internal Portals</text>

                    <circle cx="672" cy="170" r="24" fill="#171C27" stroke="#2A5A54" strokeWidth="1.5" />
                    <text x="672" y="175" textAnchor="middle" fontSize="10" fill="#3DBFAD">DWH</text>
                    <text x="672" y="208" textAnchor="middle" fontSize="10.5" fill="#8C94A6" fontFamily="IBM Plex Sans">Data Warehouses</text>

                    <circle cx="672" cy="280" r="24" fill="#171C27" stroke="#2A5A54" strokeWidth="1.5" />
                    <text x="672" y="285" textAnchor="middle" fontSize="10" fill="#3DBFAD">RES</text>
                    <text x="672" y="318" textAnchor="middle" fontSize="10.5" fill="#8C94A6" fontFamily="IBM Plex Sans">Research Repositories</text>

                    {/* hub */}
                    <circle cx="380" cy="170" r="38" fill="#1E1710" stroke="#E8A33D" strokeWidth="1.8" />
                    <circle cx="380" cy="170" r="38" fill="none" stroke="#E8A33D" strokeWidth="1" opacity="0.35">
                      <animate attributeName="r" values="38;52;38" dur="2.8s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.4;0;0.4" dur="2.8s" repeatCount="indefinite" />
                    </circle>
                    <text x="380" y="166" textAnchor="middle" fontSize="10" fill="#E8A33D">CONTEXT</text>
                    <text x="380" y="178" textAnchor="middle" fontSize="10" fill="#E8A33D">ENGINE</text>
                  </g>
                </svg>

                <div className="graph-legend">
                  <div className="legend-item"><span className="legend-dot" style={{ background: '#3DBFAD' }}></span>Source connection</div>
                  <div className="legend-item"><span className="legend-dot" style={{ background: '#E8A33D' }}></span>Context engine · semantic layer</div>
                  <div className="legend-item"><span className="legend-dot" style={{ background: '#E2574C' }}></span>Sync attention needed</div>
                </div>
              </div>

              <div className="panel">
                <div className="panel-head">
                  <div>
                    <h2>Connected Sources</h2>
                    <div className="desc">Widget A · input layer</div>
                  </div>
                </div>
                <div className="source-list">
                  {sources.map((s, idx) => (
                    <div className="source-row" key={idx}>
                      <div className="source-icon">{s.code}</div>
                      <div className="source-info">
                        <div className="name">{s.name}</div>
                        <div className="meta">{s.meta}</div>
                      </div>
                      <div className={`status-dot ${s.status}`}></div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* ROW 3: PIPELINE */}
            <section className="panel pipeline-panel">
              <div className="panel-head">
                <div>
                  <h2>Context Intelligence Process</h2>
                  <div className="desc">Widget B · how a query moves through the platform</div>
                </div>
              </div>
              <div className="pipeline">
                <div className="stage">
                  <div className="stage-node">1</div>
                  <div className="stage-title">Ingestion</div>
                  <div className="stage-cap">Pulls raw content from connected sources</div>
                </div>
                <div className="stage">
                  <div className="stage-node">2</div>
                  <div className="stage-title">Semantic Processing</div>
                  <div className="stage-cap">Parses meaning, not just keywords</div>
                </div>
                <div className="stage">
                  <div className="stage-node">3</div>
                  <div className="stage-title">Context Understanding</div>
                  <div className="stage-cap">Places content in its organizational context</div>
                </div>
                <div className="stage">
                  <div className="stage-node">4</div>
                  <div className="stage-title">Retrieval Intelligence</div>
                  <div className="stage-cap">Ranks what's actually relevant to the ask</div>
                </div>
                <div className="stage">
                  <div className="stage-node">5</div>
                  <div className="stage-title">Relationship Engine</div>
                  <div className="stage-cap">Maps how the result connects to other knowledge</div>
                </div>
                <div className="stage">
                  <div className="stage-node">6</div>
                  <div className="stage-title">Response Generation</div>
                  <div className="stage-cap">Delivers a sourced, contextual answer</div>
                </div>
              </div>
            </section>

            {/* ROW 4 */}
            <section className="row4" style={{ marginTop: '14px' }}>
              <div className="panel">
                <div className="panel-head">
                  <div>
                    <h2>Recent Retrieval Activity</h2>
                    <div className="desc">Latest queries across the organization</div>
                  </div>
                </div>
                <div>
                  {activity.map((a, idx) => (
                    <div className="activity-row" key={idx}>
                      <div className="activity-q">{a.q}</div>
                      <div className="activity-src">{a.src}</div>
                      <div className={`relevance ${a.score < 85 ? 'mid' : ''}`}>{a.score}%</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="panel">
                <div className="panel-head">
                  <div>
                    <h2>Knowledge Coverage by Source</h2>
                    <div className="desc">Share of each source fully indexed</div>
                  </div>
                </div>
                <div>
                  {coverage.map((c, idx) => (
                    <div className="coverage-row" key={idx}>
                      <div className="coverage-top"><span>{c.label}</span><span className="val">{c.pct}%</span></div>
                      <div className="coverage-track"><div className="coverage-fill" style={{ width: `${c.pct}%` }}></div></div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </>
        ) : (
          <div style={{ padding: '0' }}>
            <div className="page-head" style={{ marginBottom: '24px' }}>
              <div>
                <span className="eyebrow">Enterprise Context Intelligence</span>
                <h1>{activeNav}</h1>
              </div>
              <span className="stamp">{stamp}</span>
            </div>
            {activeNav === 'Knowledge Graph' && <KnowledgeGraphView />}
            {activeNav === 'Sources' && <SourcesView />}
            {activeNav === 'Semantic Search' && <SemanticSearchView initialQuery={globalQuery} />}
            {activeNav === 'Analytics' && <AnalyticsView />}
            {activeNav === 'API & Docs' && <ApiDocsView />}
            {activeNav === 'Activity Log' && <ActivityLogView />}
          </div>
        )}

        <div className="footer-note">ContekXtra — Enterprise Context Intelligence Command Center · Dashboard concept for approval review</div>
      </main>
    </div>
  );
}
