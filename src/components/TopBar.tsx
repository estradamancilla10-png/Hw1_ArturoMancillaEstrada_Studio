import React from 'react';
import { Plus, Menu, X, Clock, Award, FileText, CheckCircle2, LayoutDashboard, Building2 } from 'lucide-react';
import { StudentProfile } from '../types';

interface TopBarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  onOpenLogModal: () => void;
  onOpenProfile: () => void;
  profile: StudentProfile;
}

export const TopBar: React.FC<TopBarProps> = ({
  currentTab,
  onSelectTab,
  onOpenLogModal,
  onOpenProfile,
  profile,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'protocols', label: 'UTD Protocols', icon: Building2 },
    { id: 'shifts', label: 'Shift Log', icon: CheckCircle2 },
    { id: 'goals', label: 'Goals & Mandates', icon: Award },
    { id: 'timer', label: 'Shift Clock', icon: Clock },
    { id: 'timesheet', label: 'Official Timesheet', icon: FileText },
  ];

  const handleNavClick = (id: string) => {
    onSelectTab(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-slate-200 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-6 h-16">
          {/* Zone 1: Single text element wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onSelectTab('dashboard')}
              className="text-left group flex items-center gap-2.5"
            >
              <div className="w-8 h-8 rounded-lg bg-orange-600 flex items-center justify-center text-white font-bold text-xs tracking-tight shadow-xs">
                UTD
              </div>
              <span className="text-lg font-bold tracking-tight text-slate-900 group-hover:text-orange-600 transition-colors whitespace-nowrap">
                CometServe
              </span>
            </button>
          </div>

          {/* Zone 2: 4-6 clean single-line nav links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600">
            {navItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative py-1 whitespace-nowrap shrink-0 transition-colors ${
                    isActive
                      ? 'text-orange-700 font-semibold'
                      : 'hover:text-slate-900 text-slate-600'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-600 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1 primary action button + profile trigger */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenProfile}
              title={`Logged in as ${profile.name} (UTD NetID: ${profile.netId})`}
              className="hidden sm:flex items-center gap-2 pl-2 pr-3 py-1 rounded-lg border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 transition-colors text-xs text-slate-700"
            >
              <img
                src={profile.avatarUrl}
                alt={profile.name}
                referrerPolicy="no-referrer"
                className="w-6 h-6 rounded-full object-cover border border-slate-200"
              />
              <span className="font-medium truncate max-w-[120px]">{profile.name}</span>
              <span className="font-mono text-[10px] text-slate-400">({profile.netId})</span>
            </button>

            <button
              onClick={onOpenLogModal}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-orange-600 rounded-lg hover:bg-orange-700 transition-colors whitespace-nowrap shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Log Shift</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg border border-slate-200"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-5 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors text-left ${
                  isActive
                    ? 'bg-orange-50 text-orange-700'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Icon className="w-4 h-4 text-slate-500" />
                <span>{item.label}</span>
              </button>
            );
          })}
          <div className="pt-3 mt-2 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenProfile();
              }}
              className="flex items-center gap-2.5 text-xs text-slate-700 py-1"
            >
              <img
                src={profile.avatarUrl}
                alt={profile.name}
                referrerPolicy="no-referrer"
                className="w-7 h-7 rounded-full object-cover border border-slate-200"
              />
              <div className="text-left">
                <div className="font-semibold text-slate-900">{profile.name}</div>
                <div className="text-slate-500 font-mono">NetID: {profile.netId} · {profile.major}</div>
              </div>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
