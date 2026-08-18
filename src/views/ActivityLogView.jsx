import React from 'react';

export default function ActivityLogView() {
  const logs = [
    { time: '10:24 AM', user: 'System', action: 'Sync Completed', detail: 'SharePoint — Finance Portal (6,880 files)', type: 'system' },
    { time: '10:18 AM', user: 'E. Kline', action: 'Semantic Query', detail: 'What changed in the Q3 vendor contract terms?', type: 'user' },
    { time: '10:05 AM', user: 'System', action: 'Graph Enrichment', detail: 'Extracted 142 new entities from Confluence update', type: 'system' },
    { time: '09:42 AM', user: 'J. Chen', action: 'Semantic Query', detail: 'Show revenue trend for the APAC region, last 2 quarters', type: 'user' },
    { time: '09:15 AM', user: 'System', action: 'Sync Failed', detail: 'Salesforce API timeout. Retrying in 15m.', type: 'error' },
    { time: '08:50 AM', user: 'System', action: 'Sync Completed', detail: 'Zendesk — Support Knowledge Base (3,014 articles)', type: 'system' },
  ];

  return (
    <div className="panel" style={{ minHeight: '600px' }}>
      <div className="panel-head" style={{ marginBottom: '20px' }}>
        <div>
          <h2>System Activity Log</h2>
          <div className="desc">Audit trail of queries, source syncs, and system events</div>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button style={{ padding: '6px 12px', background: '#171C27', color: '#8C94A6', border: '1px solid #242B38', borderRadius: '4px', cursor: 'pointer' }}>Filter: All</button>
          <button style={{ padding: '6px 12px', background: '#171C27', color: '#8C94A6', border: '1px solid #242B38', borderRadius: '4px', cursor: 'pointer' }}>Export CSV</button>
        </div>
      </div>
      
      <div style={{ background: '#171C27', borderRadius: '8px', border: '1px solid #242B38', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
          <thead>
            <tr style={{ background: '#090B0E', color: '#5B6275', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              <th style={{ padding: '12px 16px', fontWeight: 'normal' }}>Time</th>
              <th style={{ padding: '12px 16px', fontWeight: 'normal' }}>User/Source</th>
              <th style={{ padding: '12px 16px', fontWeight: 'normal' }}>Action</th>
              <th style={{ padding: '12px 16px', fontWeight: 'normal' }}>Details</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log, idx) => (
              <tr key={idx} style={{ borderTop: '1px solid #242B38' }}>
                <td style={{ padding: '16px', color: '#8C94A6' }}>{log.time}</td>
                <td style={{ padding: '16px', color: '#E4E7ED', fontWeight: '500' }}>
                  <span style={{ display: 'inline-block', width: '24px', height: '24px', background: log.type === 'user' ? '#2A5A54' : '#1E1710', color: log.type === 'user' ? '#3DBFAD' : '#E8A33D', borderRadius: '12px', textAlign: 'center', lineHeight: '24px', marginRight: '8px', fontSize: '10px', verticalAlign: 'middle' }}>
                    {log.type === 'user' ? 'U' : 'S'}
                  </span>
                  {log.user}
                </td>
                <td style={{ padding: '16px', color: log.type === 'error' ? '#E2574C' : '#3DBFAD' }}>{log.action}</td>
                <td style={{ padding: '16px', color: '#8C94A6' }}>{log.detail}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
