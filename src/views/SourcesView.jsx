import React from 'react';

export default function SourcesView() {
  const sources = [
    {code:'CFL', name:'Confluence — Engineering Space', meta:'18,204 docs · synced 2m ago', status:'synced', type: 'Knowledge Base'},
    {code:'SFW', name:'Snowflake — Analytics Warehouse', meta:'412 tables · synced 4m ago', status:'synced', type: 'Data Warehouse'},
    {code:'SPT', name:'SharePoint — Finance Portal', meta:'6,880 files · syncing', status:'syncing', type: 'Internal Portal'},
    {code:'SFD', name:'Salesforce — CRM Records', meta:'92,110 records · synced 1m ago', status:'synced', type: 'Business App'},
    {code:'ZDK', name:'Zendesk — Support Knowledge Base', meta:'3,014 articles · synced 6m ago', status:'synced', type: 'Knowledge Base'},
    {code:'GDR', name:'Google Drive — Research Team', meta:'9,442 files · syncing', status:'syncing', type: 'Document Store'},
    {code:'GHB', name:'GitHub — Core Repositories', meta:'1,240 repos · synced 1h ago', status:'synced', type: 'Code Repository'},
    {code:'SLA', name:'Slack — Public Channels', meta:'450,110 msgs · syncing', status:'syncing', type: 'Communication'},
  ];

  return (
    <div className="panel" style={{ minHeight: '600px' }}>
      <div className="panel-head" style={{ marginBottom: '20px' }}>
        <div>
          <h2>Connected Data Sources</h2>
          <div className="desc">Manage and monitor enterprise knowledge connections</div>
        </div>
        <button style={{ padding: '8px 16px', background: '#3DBFAD', color: '#090B0E', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>
          + Add Connection
        </button>
      </div>
      
      <div className="source-list" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        {sources.map((s, idx) => (
          <div className="source-row" key={idx} style={{ background: '#171C27', padding: '16px', borderRadius: '8px', border: '1px solid #242B38' }}>
            <div className="source-icon" style={{ flexShrink: 0 }}>{s.code}</div>
            <div className="source-info" style={{ flex: 1 }}>
              <div className="name" style={{ color: '#E4E7ED', fontWeight: '500' }}>{s.name}</div>
              <div className="meta" style={{ color: '#8C94A6', fontSize: '13px', marginTop: '4px' }}>{s.meta}</div>
              <div style={{ fontSize: '12px', color: '#5B6275', marginTop: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{s.type}</div>
            </div>
            <div className={`status-dot ${s.status}`} title={s.status}></div>
          </div>
        ))}
      </div>
    </div>
  );
}
