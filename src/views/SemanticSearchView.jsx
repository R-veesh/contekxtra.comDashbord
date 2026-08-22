import React, { useState } from 'react';

export default function SemanticSearchView({ initialQuery = '' }) {
  const [query, setQuery] = useState(initialQuery);
  const [searched, setSearched] = useState(!!initialQuery);

  React.useEffect(() => {
    if (initialQuery) {
      setQuery(initialQuery);
      setSearched(true);
    }
  }, [initialQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      setSearched(true);
    }
  };

  const results = [
    { title: 'Q3 Vendor Contract Terms', src: 'SharePoint · Legal', text: 'The new Q3 vendor agreements introduce a 15% SLA penalty clause for late deliverables and require SOC2 compliance documentation updated annually.', score: 96 },
    { title: 'Vendor Management Policy v2.1', src: 'Confluence · Governance', text: 'All third-party vendors must undergo a security review before accessing the enterprise data warehouse. See Section 4.2 for contract requirements.', score: 88 },
    { title: 'Competitor Pricing Models 2025', src: 'Google Drive · Research', text: 'While analyzing vendor contracts, we found that competitor platforms often bundle SLA penalties differently, shifting risk to the client.', score: 72 }
  ];

  return (
    <div className="panel" style={{ minHeight: '600px', display: 'flex', flexDirection: 'column' }}>
      <div className="panel-head" style={{ marginBottom: '20px' }}>
        <div>
          <h2>Semantic Search</h2>
          <div className="desc">Query across all connected enterprise knowledge using natural language</div>
        </div>
      </div>
      
      <form onSubmit={handleSearch} style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '30px' }}>
        <input 
          type="text" 
          placeholder="e.g., What changed in the Q3 vendor contract terms?" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ flex: '1 1 250px', padding: '12px 16px', background: '#171C27', border: '1px solid #2A5A54', borderRadius: '6px', color: '#E4E7ED', fontSize: '15px' }}
        />
        {(query || searched) && (
          <button 
            type="button" 
            onClick={() => { setQuery(''); setSearched(false); }} 
            style={{ padding: '0 24px', background: 'transparent', color: '#8C94A6', border: '1px solid #242B38', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.2s ease' }}
            onMouseOver={(e) => { e.currentTarget.style.color = '#E4E7ED'; e.currentTarget.style.borderColor = '#5B6275'; }}
            onMouseOut={(e) => { e.currentTarget.style.color = '#8C94A6'; e.currentTarget.style.borderColor = '#242B38'; }}
          >
            Clear
          </button>
        )}
        <button type="submit" style={{ padding: '0 24px', background: '#3DBFAD', color: '#090B0E', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
          Search Context
        </button>
      </form>

      {searched ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ color: '#8C94A6', fontSize: '14px', marginBottom: '8px' }}>Found 3 relevant contexts from 3 sources</div>
          {results.map((r, idx) => (
            <div key={idx} style={{ background: '#171C27', padding: '20px', borderRadius: '8px', border: '1px solid #242B38' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                <div style={{ color: '#E4E7ED', fontSize: '16px', fontWeight: 'bold' }}>{r.title}</div>
                <div style={{ background: '#1E1710', color: '#E8A33D', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold' }}>{r.score}% Match</div>
              </div>
              <div style={{ color: '#3DBFAD', fontSize: '12px', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{r.src}</div>
              <div style={{ color: '#8C94A6', fontSize: '14px', lineHeight: '1.6' }}>{r.text}</div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ flex: 1, padding: '40px', color: '#8C94A6', border: '1px dashed #242B38', borderRadius: '8px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px', marginTop: '20px' }}>
            <div style={{ color: '#E4E7ED', fontSize: '18px', fontWeight: '500', marginBottom: '8px' }}>Start your semantic search</div>
            <div>Enter a query to search across the Enterprise Knowledge Graph, or try one of the suggestions below.</div>
          </div>
          
          <div style={{ maxWidth: '800px', margin: '0 auto', width: '100%' }}>
            <div style={{ color: '#E4E7ED', fontWeight: 'bold', marginBottom: '16px', fontSize: '14px' }}>Suggested Queries</div>
            <div className="grid-2">
              {[
                "What changed in the Q3 vendor contract terms?",
                "Show revenue trend for the APAC region, last 2 quarters",
                "Who is the main contact for the Salesforce integration?",
                "Summarize the new compliance requirements for GDPR"
              ].map((q, idx) => (
                <div 
                  key={idx} 
                  onClick={() => setQuery(q)}
                  style={{ padding: '16px', background: '#171C27', border: '1px solid #242B38', borderRadius: '8px', cursor: 'pointer', color: '#3DBFAD', transition: 'all 0.2s ease', fontSize: '14px', display: 'flex', alignItems: 'center' }}
                  onMouseOver={(e) => e.currentTarget.style.borderColor = '#3DBFAD'}
                  onMouseOut={(e) => e.currentTarget.style.borderColor = '#242B38'}
                >
                  <span style={{ marginRight: '12px', fontSize: '16px' }}>✨</span>
                  {q}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
