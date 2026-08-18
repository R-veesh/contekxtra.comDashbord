import React from 'react';

export default function ApiDocsView() {
  return (
    <div className="panel" style={{ minHeight: '600px' }}>
      <div className="panel-head" style={{ marginBottom: '20px' }}>
        <div>
          <h2>Developer API & Documentation</h2>
          <div className="desc">Integrate Context Intelligence into your own applications</div>
        </div>
      </div>
      
      <div style={{ display: 'flex', gap: '24px' }}>
        <div style={{ width: '250px', flexShrink: 0, borderRight: '1px solid #242B38', paddingRight: '16px' }}>
          <div style={{ color: '#E4E7ED', fontWeight: 'bold', marginBottom: '12px' }}>Endpoints</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ color: '#3DBFAD', fontSize: '14px', cursor: 'pointer' }}>POST /v1/query</div>
            <div style={{ color: '#8C94A6', fontSize: '14px', cursor: 'pointer' }}>GET /v1/sources</div>
            <div style={{ color: '#8C94A6', fontSize: '14px', cursor: 'pointer' }}>POST /v1/ingest</div>
            <div style={{ color: '#8C94A6', fontSize: '14px', cursor: 'pointer' }}>GET /v1/context-graph</div>
          </div>
          
          <div style={{ color: '#E4E7ED', fontWeight: 'bold', margin: '24px 0 12px' }}>Guides</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ color: '#8C94A6', fontSize: '14px', cursor: 'pointer' }}>Authentication</div>
            <div style={{ color: '#8C94A6', fontSize: '14px', cursor: 'pointer' }}>Pagination</div>
            <div style={{ color: '#8C94A6', fontSize: '14px', cursor: 'pointer' }}>Rate Limits</div>
          </div>
        </div>

        <div style={{ flex: 1 }}>
          <div style={{ background: '#171C27', padding: '24px', borderRadius: '8px', border: '1px solid #242B38' }}>
            <h3 style={{ color: '#E4E7ED', marginTop: 0, marginBottom: '8px' }}>POST /v1/query</h3>
            <p style={{ color: '#8C94A6', fontSize: '14px', lineHeight: '1.6', margin: '0 0 20px' }}>
              Execute a semantic query against your enterprise knowledge graph and return contextually relevant answers with source citations.
            </p>
            
            <div style={{ background: '#090B0E', padding: '16px', borderRadius: '6px', fontFamily: 'monospace', color: '#A3B0CC', fontSize: '13px', overflowX: 'auto', border: '1px solid #2A5A54' }}>
<pre style={{ margin: 0 }}>
{`curl -X POST https://api.contekxtra.com/v1/query \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "query": "What changed in the Q3 vendor contract terms?",
    "include_sources": true,
    "semantic_threshold": 0.85
  }'`}
</pre>
            </div>
            
            <div style={{ marginTop: '24px', color: '#E4E7ED', fontWeight: 'bold', marginBottom: '12px' }}>Response Parameters</div>
            <table style={{ width: '100%', fontSize: '13px', color: '#8C94A6', borderCollapse: 'collapse' }}>
              <tbody>
                <tr style={{ borderBottom: '1px solid #242B38' }}>
                  <td style={{ padding: '8px 0', color: '#3DBFAD', width: '30%' }}>answer</td>
                  <td style={{ padding: '8px 0' }}>The generated contextual response.</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #242B38' }}>
                  <td style={{ padding: '8px 0', color: '#3DBFAD' }}>contexts</td>
                  <td style={{ padding: '8px 0' }}>Array of supporting documents and their semantic scores.</td>
                </tr>
                <tr>
                  <td style={{ padding: '8px 0', color: '#3DBFAD' }}>graph_nodes</td>
                  <td style={{ padding: '8px 0' }}>Related entity IDs extracted from the Enterprise Knowledge Graph.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
