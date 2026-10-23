import React from 'react';
import {
  LayoutDashboard,
  Users,
  Calculator,
  History,
  TableProperties,
  TrendingUp,
  ReceiptText,
  FileText,
  BookOpen,
  Settings,
  ShieldCheck
} from 'lucide-react';

export type TabKey =
  | 'dashboard'
  | 'employees'
  | 'fixation'
  | 'history'
  | 'scales'
  | 'increment'
  | 'arrears'
  | 'reports'
  | 'rules'
  | 'settings';

interface SidebarProps {
  activeTab: TabKey;
  onSelectTab: (tab: TabKey) => void;
  lang: 'bn' | 'en';
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  lang,
  isOpenMobile,
  onCloseMobile
}) => {
  const navItems = [
    {
      key: 'dashboard' as TabKey,
      labelBn: '১. ড্যাশবোর্ড',
      labelEn: '1. Dashboard',
      icon: LayoutDashboard
    },
    {
      key: 'employees' as TabKey,
      labelBn: '২. কর্মচারী ব্যবস্থাপনা',
      labelEn: '2. Employee Management',
      icon: Users
    },
    {
      key: 'fixation' as TabKey,
      labelBn: '৩. বেতন নির্ধারণ ক্যালকুলেটর',
      labelEn: '3. Pay Fixation Calculator',
      icon: Calculator
    },
    {
      key: 'history' as TabKey,
      labelBn: '৪. সার্ভিস হিস্ট্রি',
      labelEn: '4. Service History',
      icon: History
    },
    {
      key: 'scales' as TabKey,
      labelBn: '৫. বেতন স্কেল ও গ্রেড',
      labelEn: '5. Pay Scales & Grades',
      icon: TableProperties
    },
    {
      key: 'increment' as TabKey,
      labelBn: '৬. ইনক্রিমেন্ট ও পদোন্নতি',
      labelEn: '6. Increment & Promotion',
      icon: TrendingUp
    },
    {
      key: 'arrears' as TabKey,
      labelBn: '৭. বকেয়া (Arrears) গণক',
      labelEn: '7. Arrears Calculator',
      icon: ReceiptText
    },
    {
      key: 'reports' as TabKey,
      labelBn: '৮. বিবরণী ও রিপোর্ট',
      labelEn: '8. Reports & Statements',
      icon: FileText
    },
    {
      key: 'rules' as TabKey,
      labelBn: '৯. অফিসিয়াল গেজেট ও বিধি',
      labelEn: '9. Official Rules & Gazette',
      icon: BookOpen
    },
    {
      key: 'settings' as TabKey,
      labelBn: '১০. সেটিংস ও ডেটা',
      labelEn: '10. Settings & Data',
      icon: Settings
    }
  ];

  const handleNavClick = (key: TabKey) => {
    onSelectTab(key);
    onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 md:hidden transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed md:sticky top-0 md:top-16 left-0 h-screen md:h-[calc(100vh-4rem)] w-64 bg-slate-900 text-slate-200 border-r border-slate-800 z-50 md:z-30 flex flex-col transition-transform duration-200 ease-in-out ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        } no-print shrink-0`}
      >
        {/* Mobile Header Title */}
        <div className="md:hidden flex items-center justify-between p-4 border-b border-slate-800">
          <span className="font-bold text-white text-sm">
            {lang === 'bn' ? 'মেনু ও বিভাগ' : 'Navigation'}
          </span>
          <button
            onClick={onCloseMobile}
            className="text-slate-400 hover:text-white p-1 text-sm font-medium"
          >
            ✕
          </button>
        </div>

        {/* Navigation Item List */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.key;
            return (
              <button
                key={item.key}
                onClick={() => handleNavClick(item.key)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-all text-left whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-emerald-800 text-white shadow-sm font-semibold'
                    : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                }`}
              >
                <Icon
                  className={`w-4 h-4 shrink-0 ${
                    isActive ? 'text-emerald-300' : 'text-slate-400'
                  }`}
                />
                <span className="truncate">{lang === 'bn' ? item.labelBn : item.labelEn}</span>
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer Info */}
        <div className="p-3 border-t border-slate-800 text-[11px] text-slate-400 flex flex-col gap-1 bg-slate-950/60">
          <div className="flex items-center gap-1.5 text-slate-300 font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>{lang === 'bn' ? 'আইবাস++ সামঞ্জস্যপূর্ণ' : 'iBAS++ Rule Matched'}</span>
          </div>
          <p className="text-slate-400 text-[10px] leading-relaxed">
            {lang === 'bn'
              ? 'সামরিক প্রকৌশল সার্ভিস ও সাধারণ বেসামরিক গ্রেড ১-২০'
              : 'MES & Civil Grade 1-20 Gazette Matched'}
          </p>
        </div>
      </aside>
    </>
  );
};
