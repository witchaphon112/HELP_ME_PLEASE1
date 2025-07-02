import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './style/Sidebar.css';

interface SidebarProps {
  isOpen?: boolean;
  toggleSidebar?: () => void;
  user?: {
    name: string;
    role: string; 
  } | null;
  onLogout?: () => void;
}

const Sidebar = ({ isOpen = true, toggleSidebar, user, onLogout }: SidebarProps) => {
  const location = useLocation();
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [pendingCount, setPendingCount] = useState(0);

  const isActive = (path: string) => location.pathname === path;
  const toggleSubmenu = (menu: string) => {
    setActiveSubmenu(activeSubmenu === menu ? null : menu);
  };

  useEffect(() => {
    if (user?.role === 'staff' || user?.role === 'admin') {
      const all = JSON.parse(localStorage.getItem('mockIncidents') || '[]');
      setPendingCount(Array.isArray(all) ? all.filter((i:any) => i.status === 'รอการตอบสนอง').length : 0);
    }
  }, [user]);

  const studentMenu = [
    { path: '/dashboard', icon: 'fas fa-home', label: 'หน้าหลัก' },
    { path: '/report-incident', icon: 'fas fa-exclamation-triangle', label: 'แจ้งเหตุฉุกเฉิน' },
    { path: '/my-incidents', icon: 'fas fa-clock', label: 'ติดตามสถานะเหตุ' },
    { path: '/profile', icon: 'fas fa-user', label: 'ข้อมูลส่วนตัว' },
  ];

  const staffMenu = [
    { path: '/page-staff/Dashboard', icon: 'fas fa-tachometer-alt', label: 'แผงควบคุม' },
    { 
      icon: 'fas fa-bell', 
      label: 'จัดการเหตุฉุกเฉิน',
      submenu: [
        { path: '/page-staff/incidents/Pending', label: 'รอการตอบสนอง' },
        { path: '/page-staff/incidents/In-progress', label: 'กำลังดำเนินการ' },
        { path: '/page-staff/incidents/Resolved', label: 'เสร็จสิ้น' },
        { path: '/page-staff/incidents/All', label: 'ดูทั้งหมด' },
      ]
    },
    { path: '/page-staff/reports', icon: 'fas fa-chart-bar', label: 'รายงาน & สถิติ' },
  ];

  const menuItems = user?.role === 'staff' || user?.role === 'admin' ? staffMenu : studentMenu;

  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-header">
        {isOpen && <h2 className="sidebar-title">แจ้งเหตุฉุกเฉิน</h2>}
        {toggleSidebar && (
          <button className="sidebar-toggle" onClick={toggleSidebar}>
            <i className={`fas ${isOpen ? 'fa-angle-left' : 'fa-angle-right'}`}></i>
          </button>
        )}
      </div>

      {user && (
        <div className="sidebar-user">
          <div className="user-avatar">
            <i className="fas fa-user"></i>
          </div>
          {isOpen && (
            <div className="user-info">
              <p className="user-name">{user.name}</p>
              <p className="user-role">
                {user.role === 'staff' ? 'เจ้าหน้าที่' : user.role === 'admin' ? 'ผู้ดูแล' : 'นักศึกษา/บุคลากร'}
              </p>
            </div>
          )}
        </div>
      )}

      {user && (user.role === 'staff' || user.role === 'admin') && (
        <div className="sidebar-notification" style={{ display: 'flex', alignItems: 'center', margin: isOpen ? '12px 0 8px 0' : '12px 0', justifyContent: isOpen ? 'flex-start' : 'center' }}>
          <Link to="/page-staff/incidents/Pending" className="sidebar-notification-link" style={{ position: 'relative', display: 'flex', alignItems: 'center', color: '#e67e22', fontWeight: 600, fontSize: 18, textDecoration: 'none' }}>
            <span style={{ position: 'relative', display: 'inline-block' }}>
              <i className="fas fa-bell"></i>
              {pendingCount > 0 && (
                <span style={{
                  position: 'absolute', top: -10, right: -120, background: '#e74c3c', color: '#fff', borderRadius: '50%', minWidth: 17, height: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, padding: '0 6px', border: '2px solid #fff', zIndex: 2, boxShadow: '0 1px 4px rgba(0,0,0,0.12)'
                }}>{pendingCount}</span>
              )}
            </span>
            {isOpen && <span style={{ marginLeft: 12 }}>แจ้งเตือน</span>}
          </Link>
        </div>
      )}

      <nav className="sidebar-nav">
        <ul className="sidebar-menu">
          {menuItems.map((item, index) => (
            <li key={index} className="sidebar-menu-item">
              {item.submenu ? (
                <>
                  <div
                    className={`sidebar-menu-link has-submenu ${activeSubmenu === item.label ? 'active' : ''}`}
                    onClick={() => toggleSubmenu(item.label)}
                  >
                    <i className={item.icon}></i>
                    {isOpen && <span>{item.label}</span>}
                    {isOpen && (
                      <i className={`submenu-arrow fas ${activeSubmenu === item.label ? 'fa-chevron-down' : 'fa-chevron-right'}`}></i>
                    )}
                  </div>
                  {activeSubmenu === item.label && isOpen && (
                    <ul className="sidebar-submenu">
                      {item.submenu.map((subitem: any, subindex: number) => (
                        <li key={subindex} className="sidebar-submenu-item">
                          <Link
                            to={subitem.path}
                            className={`sidebar-submenu-link ${isActive(subitem.path) ? 'active' : ''}`}
                          >
                            <span>{subitem.label}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <Link
                  to={item.path!}
                  className={`sidebar-menu-link ${isActive(item.path!) ? 'active' : ''}`}
                >
                  <i className={item.icon}></i>
                  {isOpen && <span>{item.label}</span>}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
