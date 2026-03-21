'use client';

export default function TabSwitcher({ activeTab, onTabChange }) {
  return (
    <div className="tab-switcher">
      <button
        className={`tab-btn ${activeTab === 0 ? 'active' : ''}`}
        onClick={() => onTabChange(0)}
      >
        <span className="tab-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M8 2h8l2 5-1.5 13H7.5L6 7 8 2z" />
            <path d="M12 2v20" strokeOpacity="0.4" />
            <path d="M8 7h8" strokeOpacity="0.4" />
            <circle cx="12" cy="14" r="2" fill="currentColor" fillOpacity="0.8" stroke="none" />
            <path d="M12 22v2" />
          </svg>
        </span>
        <span>Eid Card</span>
      </button>
      <button
        className={`tab-btn ${activeTab === 1 ? 'active' : ''}`}
        onClick={() => onTabChange(1)}
      >
        <span className="tab-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="6" width="18" height="13" rx="2" />
            <path d="M3 6l9 6 9-6" />
            <path d="M12 12v7" strokeOpacity="0.4" />
            <ellipse cx="12" cy="7" rx="3" ry="1.5" strokeOpacity="0.6"/>
            <path d="M12 6L9 3" strokeOpacity="0.6"/>
            <path d="M12 6l3-3" strokeOpacity="0.6"/>
          </svg>
        </span>
        <span>Salami Card</span>
      </button>
    </div>
  );
}
