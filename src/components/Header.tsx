import React from 'react';
import { LogoPrimary, LogoMES } from './Logos';
import { Download, Globe, ShieldAlert, Menu, X, FileSpreadsheet } from 'lucide-react';
import { Employee } from '../types';

interface HeaderProps {
  selectedEmployee: Employee;
  onDownloadExcel: () => void;
  lang: 'bn' | 'en';
  onToggleLang: () => void;
  mobileMenuOpen: boolean;
  onToggleMobileMenu: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  selectedEmployee,
  onDownloadExcel,
  lang,
  onToggleLang,
  mobileMenuOpen,
  onToggleMobileMenu
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      {/* Top Disclaimer Banner */}
      <div className="bg-amber-50 border-b border-amber-200 px-4 py-1.5 text-xs text-amber-900 flex items-center justify-between no-print">
        <div className="flex items-center gap-2 max-w-5xl mx-auto text-center justify-center w-full">
          <ShieldAlert className="w-3.5 h-3.5 text-amber-700 shrink-0" />
          <p className="line-clamp-1 text-[11px] leading-tight">
            {lang === 'bn'
              ? 'এটি একটি স্বতন্ত্র বেতন গণনা পোর্টাল; এটি গণপ্রজাতন্ত্রী বাংলাদেশ সরকার, এমইএস বা আইবাস++ এর আনুষ্ঠানিক মাধ্যম নয়। চূড়ান্ত নির্ধারণ সরকারি প্রক্রিয়ায় সম্পন্ন হতে হবে।'
              : 'This is an independent calculation tool; not an official GoB, MES, MoF, or iBAS++ service. Final salary fixation must be confirmed through authorized channels.'}
          </p>
        </div>
      </div>

      {/* Main Top Bar Contract: Brand Zone - Navigation/Context - Primary Action */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Zone */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleMobileMenu}
            className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <div className="flex items-center gap-2 sm:gap-3">
            <LogoPrimary size={38} />
            <div className="h-7 w-px bg-slate-300 hidden sm:block" />
            <LogoMES size={38} />
          </div>

          <div className="flex flex-col">
            <h1 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight leading-tight line-clamp-1">
              {lang === 'bn' ? 'বেতন নির্ধারণ ২০২৬' : 'Pay Fixation 2026'}
            </h1>
            <span className="text-[11px] text-slate-500 font-medium hidden sm:inline-block">
              {lang === 'bn' ? 'বাংলাদেশ সরকার ও মিলিটারি ইঞ্জিনিয়ার সার্ভিসেস' : 'Bangladesh Govt & Military Engineer Services'}
            </span>
          </div>
        </div>

        {/* Selected Employee Active Context */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-lg text-xs text-slate-700">
          <span className="font-semibold">{selectedEmployee.nameBangla}</span>
          <span className="text-slate-400">·</span>
          <span>গ্রেড-{selectedEmployee.currentGrade}</span>
          <span className="text-slate-400">·</span>
          <span className="font-mono text-emerald-800 font-medium">{selectedEmployee.employeeIdNumber}</span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Language Toggle */}
          <button
            onClick={onToggleLang}
            className="px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors flex items-center gap-1.5 whitespace-nowrap"
            title="Toggle Language"
          >
            <Globe className="w-3.5 h-3.5 text-slate-600" />
            <span>{lang === 'bn' ? 'English' : 'বাংলা'}</span>
          </button>

          {/* Download Official Excel Workbook */}
          <button
            onClick={onDownloadExcel}
            className="px-3.5 py-1.5 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 active:bg-emerald-950 rounded-lg transition-colors flex items-center gap-2 shadow-sm whitespace-nowrap cursor-pointer"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-300" />
            <span className="hidden sm:inline">
              {lang === 'bn' ? 'এক্সেল (.xlsx) ডাউনলোড' : 'Download Excel (.xlsx)'}
            </span>
            <span className="sm:hidden">Excel</span>
          </button>
        </div>
      </div>
    </header>
  );
};
