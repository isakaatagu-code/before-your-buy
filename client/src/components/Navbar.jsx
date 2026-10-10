import React from 'react';
import { Sparkles, ArrowRight } from './Icons';

export default function Navbar({ currentView, setCurrentView }) {
  return (
    <nav className="navbar-container">
      <div className="navbar-inner">
        <button
          type="button"
          className="nav-logo-btn"
          onClick={() => setCurrentView('home')}
        >
          <div className="nav-logo-icon">
            <Sparkles size={16} />
          </div>
          <span className="nav-logo-text">Finly</span>
        </button>

        <div className="nav-links">
          <button
            type="button"
            className={`nav-link ${currentView === 'home' ? 'active' : ''}`}
            onClick={() => setCurrentView('home')}
          >
            Home
          </button>
          <button
            type="button"
            className={`nav-link ${currentView === 'about' ? 'active' : ''}`}
            onClick={() => setCurrentView('about')}
          >
            About
          </button>
          <button
            type="button"
            className={`nav-cta-btn ${currentView === 'planner' ? 'active' : ''}`}
            onClick={() => setCurrentView('planner')}
          >
            <span>Start Planning</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </nav>
  );
}
