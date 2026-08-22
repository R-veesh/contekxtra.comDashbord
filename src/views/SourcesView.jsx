import React, { useState } from 'react';

export default function SourcesView() {
  const [sources, setSources] = useState([
    {code:'CFL', name:'Confluence — Engineering Space', meta:'18,204 docs · synced 2m ago', status:'synced', type: 'Knowledge Base'},
    {code:'SFW', name:'Snowflake — Analytics Warehouse', meta:'412 tables · synced 4m ago', status:'synced', type: 'Data Warehouse'},
    {code:'SPT', name:'SharePoint — Finance Portal', meta:'6,880 files · syncing', status:'syncing', type: 'Internal Portal'},
    {code:'SFD', name:'Salesforce — CRM Records', meta:'92,110 records · synced 1m ago', status:'synced', type: 'Business App'},
    {code:'ZDK', name:'Zendesk — Support Knowledge Base', meta:'3,014 articles · synced 6m ago', status:'synced', type: 'Knowledge Base'},
    {code:'GDR', name:'Google Drive — Research Team', meta:'9,442 files · syncing', status:'syncing', type: 'Document Store'},
    {code:'GHB', name:'GitHub — Core Repositories', meta:'1,240 repos · synced 1h ago', status:'synced', type: 'Code Repository'},
    {code:'SLA', name:'Slack — Public Channels', meta:'450,110 msgs · syncing', status:'syncing', type: 'Communication'},
  ]);

  const [isAdding, setIsAdding] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddConnection = () => {
    if (isAdding) return;
    setIsAdding(true);
    
    // Simulate API call
    setTimeout(() => {
      const newSource = {
        code: 'NOT',
        name: 'Notion — Product Specs',
        meta: '0 docs · syncing',
        status: 'syncing',
        type: 'Knowledge Base'
      };
      setSources([newSource, ...sources]);
      setIsAdding(false);
      setIsModalOpen(false);
    }, 1500);
  };

  return (
    <div className="panel" style={{ minHeight: '600px' }}>
      <div className="panel-head" style={{ marginBottom: '20px' }}>
        <div>
          <h2>Connected Data Sources</h2>
          <div className="desc">Manage and monitor enterprise knowledge connections</div>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          style={{ padding: '8px 16px', background: '#3DBFAD', color: '#090B0E', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.2s ease' }}
        >
          + Add Connection
        </button>
      </div>
      
      <div className="source-list" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        {sources.map((s, idx) => (
          <div className="source-row animate-in fade-in" key={idx} style={{ background: '#171C27', padding: '16px', borderRadius: '8px', border: '1px solid #242B38', transition: 'all 0.3s ease' }}>
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

      {isModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.7)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)' }}>
          <div className="animate-in zoom-in duration-300" style={{ background: '#171C27', padding: '24px', borderRadius: '12px', border: '1px solid #242B38', width: '100%', maxWidth: '440px', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h3 style={{ margin: 0, color: '#E4E7ED', fontSize: '18px' }}>Add New Connection</h3>
              <button onClick={() => !isAdding && setIsModalOpen(false)} style={{ background: 'transparent', border: 'none', color: '#8C94A6', cursor: 'pointer', fontSize: '20px', padding: '4px' }}>&times;</button>
            </div>
            
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', color: '#E4E7ED', fontSize: '13px', marginBottom: '8px', fontWeight: '500' }}>Connection Type</label>
              <select disabled={isAdding} style={{ width: '100%', padding: '10px 12px', background: '#090B0E', border: '1px solid #242B38', color: '#E4E7ED', borderRadius: '6px', fontSize: '14px', outline: 'none' }}>
                <option>Notion</option>
                <option>Google Drive</option>
                <option>Slack</option>
                <option>Salesforce</option>
                <option>Zendesk</option>
              </select>
            </div>
            
            <div style={{ marginBottom: '32px' }}>
              <label style={{ display: 'block', color: '#E4E7ED', fontSize: '13px', marginBottom: '8px', fontWeight: '500' }}>Connection Name</label>
              <input type="text" disabled={isAdding} placeholder="e.g. Product Specs" style={{ width: '100%', padding: '10px 12px', background: '#090B0E', border: '1px solid #242B38', color: '#E4E7ED', borderRadius: '6px', boxSizing: 'border-box', fontSize: '14px', outline: 'none' }} defaultValue="Notion — Product Specs" />
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', paddingTop: '16px', borderTop: '1px solid #242B38' }}>
              <button onClick={() => setIsModalOpen(false)} disabled={isAdding} style={{ padding: '8px 16px', background: 'transparent', color: '#8C94A6', border: '1px solid #242B38', borderRadius: '6px', cursor: isAdding ? 'default' : 'pointer', fontWeight: '500' }}>Cancel</button>
              <button onClick={handleAddConnection} disabled={isAdding} style={{ padding: '8px 24px', background: isAdding ? '#2A5A54' : '#3DBFAD', color: isAdding ? '#3DBFAD' : '#090B0E', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: isAdding ? 'default' : 'pointer', transition: 'all 0.2s ease', minWidth: '100px' }}>
                {isAdding ? 'Connecting...' : 'Connect'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
