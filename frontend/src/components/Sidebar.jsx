import React from 'react';
import { FaTachometerAlt, FaBoxOpen, FaUserEdit, FaSignOutAlt } from 'react-icons/fa';
import '../styles/Sidebar.css';

function Sidebar({ view, onNavigate, onLogout, isOpen }) {
  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <h4 className="sidebar-logo">🛍️ Shop Admin</h4>
      <nav className="sidebar-menu">
        <div className={`sidebar-item ${view === 'dashboard' ? 'active' : ''}`} onClick={() => onNavigate('dashboard')}>
          <FaTachometerAlt className="sidebar-icon" />
          <span>Dashboard</span>
        </div>
        <div className={`sidebar-item ${view === 'products' ? 'active' : ''}`} onClick={() => onNavigate('products')}>
          <FaBoxOpen className="sidebar-icon" />
          <span>Products</span>
        </div>
        <div className={`sidebar-item ${view === 'profile' ? 'active' : ''}`} onClick={() => onNavigate('profile')}>
          <FaUserEdit className="sidebar-icon" />
          <span>Profile</span>
        </div>
        <div className="sidebar-item logout" onClick={onLogout}>
          <FaSignOutAlt className="sidebar-icon" />
          <span>Logout</span>
        </div>
      </nav>
    </div>
  );
}

export default Sidebar;
