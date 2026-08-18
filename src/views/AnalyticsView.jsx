import React from 'react';

export default function AnalyticsView() {
  return (
    <div className="panel" style={{ minHeight: '600px' }}>
      <div className="panel-head" style={{ marginBottom: '30px' }}>
        <div>
          <h2>Knowledge Intelligence Analytics</h2>
          <div className="desc">Usage metrics, query volume, and retrieval performance</div>
        </div>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginBottom: '30px' }}>
        <div style={{ background: '#171C27', padding: '20px', borderRadius: '8px', border: '1px solid #242B38' }}>
          <div style={{ color: '#8C94A6', fontSize: '13px', marginBottom: '8px' }}>Total Queries (30d)</div>
          <div style={{ color: '#E4E7ED', fontSize: '28px', fontWeight: 'bold' }}>124,592</div>
          <div style={{ color: '#3DBFAD', fontSize: '12px', marginTop: '4px' }}>↑ 12% vs last month</div>
        </div>
        <div style={{ background: '#171C27', padding: '20px', borderRadius: '8px', border: '1px solid #242B38' }}>
          <div style={{ color: '#8C94A6', fontSize: '13px', marginBottom: '8px' }}>Avg Time to Context</div>
          <div style={{ color: '#E4E7ED', fontSize: '28px', fontWeight: 'bold' }}>1.2s</div>
          <div style={{ color: '#3DBFAD', fontSize: '12px', marginTop: '4px' }}>↓ 0.4s improvement</div>
        </div>
        <div style={{ background: '#171C27', padding: '20px', borderRadius: '8px', border: '1px solid #242B38' }}>
          <div style={{ color: '#8C94A6', fontSize: '13px', marginBottom: '8px' }}>Knowledge Utilization</div>
          <div style={{ color: '#E4E7ED', fontSize: '28px', fontWeight: 'bold' }}>78%</div>
          <div style={{ color: '#E8A33D', fontSize: '12px', marginTop: '4px' }}>22% of sources rarely queried</div>
        </div>
      </div>

      <div style={{ background: '#171C27', padding: '24px', borderRadius: '8px', border: '1px solid #242B38', height: '300px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ color: '#E4E7ED', fontSize: '15px', fontWeight: 'bold', marginBottom: '20px' }}>Query Volume by Department</div>
        <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end', gap: '12px', paddingTop: '20px', borderBottom: '1px solid #2A5A54' }}>
          {/* Mock Bar Chart */}
          {[{h: '80%', l: 'Engineering'}, {h: '45%', l: 'Sales'}, {h: '60%', l: 'Support'}, {h: '30%', l: 'HR'}, {h: '70%', l: 'Research'}, {h: '25%', l: 'Legal'}].map((bar, i) => (
            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%' }}>
              <div style={{ width: '100%', flex: 1, display: 'flex', alignItems: 'flex-end', padding: '0 10px' }}>
                <div style={{ width: '100%', height: bar.h, background: '#3DBFAD', borderRadius: '4px 4px 0 0', opacity: 0.8 }}></div>
              </div>
              <div style={{ color: '#8C94A6', fontSize: '12px', marginTop: '8px' }}>{bar.l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
