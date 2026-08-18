import React from 'react';

export default function KnowledgeGraphView() {
  return (
    <div className="panel" style={{ minHeight: '600px', display: 'flex', flexDirection: 'column' }}>
      <div className="panel-head">
        <div>
          <h2>Knowledge Graph Explorer</h2>
          <div className="desc">Interactive exploration of enterprise knowledge relationships</div>
        </div>
      </div>
      <div style={{ flex: 1, position: 'relative', background: '#171C27', borderRadius: '8px', border: '1px solid #242B38', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        {/* Placeholder for an interactive graph visualization */}
        <svg viewBox="0 0 800 500" width="100%" height="100%">
          <defs>
            <radialGradient id="glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#E8A33D" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#E8A33D" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="400" cy="250" r="150" fill="url(#glow)" />
          
          <g stroke="#242B38" strokeWidth="1.5">
            <line x1="400" y1="250" x2="200" y2="150" />
            <line x1="400" y1="250" x2="200" y2="350" />
            <line x1="400" y1="250" x2="600" y2="150" />
            <line x1="400" y1="250" x2="600" y2="350" />
            <line x1="400" y1="250" x2="400" y2="80" />
            <line x1="400" y1="250" x2="400" y2="420" />
          </g>
          
          {/* Nodes */}
          <circle cx="400" cy="250" r="40" fill="#1E1710" stroke="#E8A33D" strokeWidth="2" />
          <text x="400" y="254" textAnchor="middle" fontSize="12" fill="#E8A33D" fontWeight="bold">QUERY</text>
          
          <g fill="#171C27" stroke="#3DBFAD" strokeWidth="2" fontFamily="IBM Plex Sans" fontSize="11">
            <circle cx="200" cy="150" r="30" />
            <text x="200" y="154" textAnchor="middle" fill="#8C94A6" stroke="none">Policy</text>
            
            <circle cx="200" cy="350" r="30" />
            <text x="200" y="354" textAnchor="middle" fill="#8C94A6" stroke="none">Data</text>

            <circle cx="600" cy="150" r="30" />
            <text x="600" y="154" textAnchor="middle" fill="#8C94A6" stroke="none">Teams</text>

            <circle cx="600" cy="350" r="30" />
            <text x="600" y="354" textAnchor="middle" fill="#8C94A6" stroke="none">Assets</text>
            
            <circle cx="400" cy="80" r="30" />
            <text x="400" y="84" textAnchor="middle" fill="#8C94A6" stroke="none">Legal</text>
            
            <circle cx="400" cy="420" r="30" />
            <text x="400" y="424" textAnchor="middle" fill="#8C94A6" stroke="none">Code</text>
          </g>
        </svg>
        <div style={{ position: 'absolute', bottom: '20px', left: '20px', color: '#8C94A6', fontSize: '13px' }}>
          Showing semantic neighborhood for current active context
        </div>
      </div>
    </div>
  );
}
