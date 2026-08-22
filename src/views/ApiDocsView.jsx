import React, { useState } from 'react';

const apiData = {
  'post_query': {
    title: 'POST /v1/query',
    description: 'Execute a semantic query against your enterprise knowledge graph and return contextually relevant answers with source citations.',
    code: `curl -X POST https://api.contekxtra.com/v1/query \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "query": "What changed in the Q3 vendor contract terms?",
    "include_sources": true,
    "semantic_threshold": 0.85
  }'`,
    parameters: [
      { name: 'answer', desc: 'The generated contextual response.' },
      { name: 'contexts', desc: 'Array of supporting documents and their semantic scores.' },
      { name: 'graph_nodes', desc: 'Related entity IDs extracted from the Enterprise Knowledge Graph.' }
    ]
  },
  'get_sources': {
    title: 'GET /v1/sources',
    description: 'Retrieve a paginated list of all connected data sources, their indexing status, and health metrics.',
    code: `curl -X GET https://api.contekxtra.com/v1/sources?limit=10&page=1 \\
  -H "Authorization: Bearer YOUR_API_KEY"`,
    parameters: [
      { name: 'sources', desc: 'Array of data source objects.' },
      { name: 'total_count', desc: 'Total number of connected sources.' },
      { name: 'sync_status', desc: 'Current synchronization status.' }
    ]
  },
  'post_ingest': {
    title: 'POST /v1/ingest',
    description: 'Directly ingest documents, text, or structured data into your enterprise knowledge graph.',
    code: `curl -X POST https://api.contekxtra.com/v1/ingest \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "document_id": "doc_847291",
    "content": "The Q3 vendor contract has been updated to include...",
    "metadata": {
      "source": "confluence",
      "author": "jane.doe"
    }
  }'`,
    parameters: [
      { name: 'status', desc: 'Ingestion status (e.g., "processing", "completed").' },
      { name: 'document_id', desc: 'The unique identifier for the ingested document.' },
      { name: 'indexed_chunks', desc: 'Number of chunks the document was divided into.' }
    ]
  },
  'get_context_graph': {
    title: 'GET /v1/context-graph',
    description: 'Explore the semantic relationships and entity connections within your knowledge graph.',
    code: `curl -X GET https://api.contekxtra.com/v1/context-graph?entity_id=ent_123 \\
  -H "Authorization: Bearer YOUR_API_KEY"`,
    parameters: [
      { name: 'nodes', desc: 'Array of connected entities.' },
      { name: 'edges', desc: 'Relationships and weight between entities.' }
    ]
  },
  'auth': {
    title: 'Authentication',
    description: 'Learn how to securely authenticate your API requests using API keys and OAuth2.',
    code: `# All API requests must include an Authorization header
curl -H "Authorization: Bearer YOUR_API_KEY" https://api.contekxtra.com/v1/endpoint`,
    parameters: [
      { name: 'Bearer Token', desc: 'Pass your API key as a Bearer token in the Authorization header.' },
      { name: 'API Key Lifecycle', desc: 'Keys can be rotated or revoked from the dashboard.' }
    ]
  },
  'pagination': {
    title: 'Pagination',
    description: 'Understand how to navigate large datasets returned by the API using cursor-based or offset-based pagination.',
    code: `# Example of offset pagination
curl "https://api.contekxtra.com/v1/sources?limit=50&offset=100"`,
    parameters: [
      { name: 'limit', desc: 'Maximum number of items to return per page (default: 20).' },
      { name: 'offset', desc: 'Number of items to skip before returning results.' },
      { name: 'next_cursor', desc: 'Use for cursor-based pagination on large datasets.' }
    ]
  },
  'rate_limits': {
    title: 'Rate Limits',
    description: 'Details on API rate limits, throttling mechanisms, and how to handle HTTP 429 Too Many Requests errors.',
    code: `# Check response headers for rate limit info
# X-RateLimit-Limit: 1000
# X-RateLimit-Remaining: 999
# X-RateLimit-Reset: 1682400000`,
    parameters: [
      { name: 'Free Tier', desc: '100 requests per minute.' },
      { name: 'Pro Tier', desc: '1,000 requests per minute.' },
      { name: 'Enterprise', desc: 'Custom limits based on SLA.' }
    ]
  }
};

export default function ApiDocsView() {
  const [activeTab, setActiveTab] = useState('post_query');
  const activeData = apiData[activeTab];

  const NavItem = ({ id, label }) => (
    <div 
      onClick={() => setActiveTab(id)}
      style={{ 
        color: activeTab === id ? '#3DBFAD' : '#8C94A6', 
        fontSize: '14px', 
        cursor: 'pointer',
        fontWeight: activeTab === id ? '500' : 'normal',
        transition: 'color 0.2s ease',
        padding: '4px 0'
      }}
    >
      {label}
    </div>
  );

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
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <NavItem id="post_query" label="POST /v1/query" />
            <NavItem id="get_sources" label="GET /v1/sources" />
            <NavItem id="post_ingest" label="POST /v1/ingest" />
            <NavItem id="get_context_graph" label="GET /v1/context-graph" />
          </div>
          
          <div style={{ color: '#E4E7ED', fontWeight: 'bold', margin: '24px 0 12px' }}>Guides</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <NavItem id="auth" label="Authentication" />
            <NavItem id="pagination" label="Pagination" />
            <NavItem id="rate_limits" label="Rate Limits" />
          </div>
        </div>

        <div style={{ flex: 1 }}>
          <div style={{ background: '#171C27', padding: '24px', borderRadius: '8px', border: '1px solid #242B38' }}>
            <h3 style={{ color: '#E4E7ED', marginTop: 0, marginBottom: '8px' }}>{activeData.title}</h3>
            <p style={{ color: '#8C94A6', fontSize: '14px', lineHeight: '1.6', margin: '0 0 20px' }}>
              {activeData.description}
            </p>
            
            <div style={{ background: '#090B0E', padding: '16px', borderRadius: '6px', fontFamily: 'monospace', color: '#A3B0CC', fontSize: '13px', overflowX: 'auto', border: '1px solid #2A5A54' }}>
<pre style={{ margin: 0 }}>
{activeData.code}
</pre>
            </div>
            
            <div style={{ marginTop: '24px', color: '#E4E7ED', fontWeight: 'bold', marginBottom: '12px' }}>Response Parameters</div>
            <table style={{ width: '100%', fontSize: '13px', color: '#8C94A6', borderCollapse: 'collapse' }}>
              <tbody>
                {activeData.parameters.map((param, index) => (
                  <tr key={index} style={{ borderBottom: index < activeData.parameters.length - 1 ? '1px solid #242B38' : 'none' }}>
                    <td style={{ padding: '8px 0', color: '#3DBFAD', width: '30%', verticalAlign: 'top' }}>{param.name}</td>
                    <td style={{ padding: '8px 0', verticalAlign: 'top' }}>{param.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
