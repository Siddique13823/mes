import React from 'react';
import { Employee } from '../../types';
import { LogoPrimary, LogoMES } from '../Logos';
import {
  Users,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileSpreadsheet,
  ArrowRight,
  TrendingUp,
  Building2,
  BadgeCheck
} from 'lucide-react';
import { calculatePayFixation, calculateArrears } from '../../utils/fixationEngine';
import bgImage from '../../assets/images/mes_engineering_bg_1792762122840.jpg';

interface DashboardTabProps {
  employees: Employee[];
  selectedEmployee: Employee;
  onSelectEmployee: (emp: Employee) => void;
  onNavigateTab: (tab: any) => void;
  onDownloadExcel: (emp?: Employee) => void;
  onAddNewEmployeeModal: () => void;
  lang: 'bn' | 'en';
}

export const DashboardTab: React.FC<DashboardTabProps> = ({
  employees,
  selectedEmployee,
  onSelectEmployee,
  onNavigateTab,
  onDownloadExcel,
  onAddNewEmployeeModal,
  lang
}) => {
  const completedCount = employees.filter(e => e.fixationStatus === 'calculated' || e.fixationStatus === 'finalized').length;
  const pendingCount = employees.filter(e => e.fixationStatus === 'pending').length;
  const reviewCount = employees.filter(e => e.fixationStatus === 'reviewed').length;

  // Calculate total arrears estimate across completed employees
  const totalArrearsEstimate = employees.reduce((sum, emp) => {
    try {
      const fix = calculatePayFixation(emp);
      const arr = calculateArrears(emp, fix.revisedBasic, '2026-01', '2026-06', '2026-07');
      return sum + arr.netTotalArrears;
    } catch {
      return sum;
    }
  }, 0);

  const mesCount = employees.filter(e => e.category === 'mes_civilian').length;
  const otherCount = employees.length - mesCount;

  return (
    <div className="space-y-6">
      {/* Hero Section with MES Blueprint Background */}
      <div className="relative overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 text-white shadow-lg">
        {/* MES Blueprint Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={bgImage}
            alt="Military Engineer Services (MES) Engineering Blueprint Backdrop"
            className="w-full h-full object-cover opacity-25 filter brightness-90 contrast-110"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 p-6 sm:p-8 lg:p-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            {/* Logo Pair */}
            <div className="flex items-center gap-3 bg-slate-900/80 backdrop-blur-md p-2 rounded-xl border border-slate-700/60 w-fit">
              <LogoPrimary size={44} />
              <div className="h-8 w-px bg-slate-700" />
              <LogoMES size={44} />
              <div className="pl-1">
                <span className="block text-xs font-semibold text-emerald-400">
                  {lang === 'bn' ? 'জাতীয় বেতন ও ভাতাদি আদেশ, ২০২৬' : 'National Pay & Allowances Order, 2026'}
                </span>
                <span className="block text-[11px] text-slate-400 font-mono">
                  {lang === 'bn' ? 'এমইএস ও বেসামরিক সংস্থাপন' : 'MES & Civil Establishment Division'}
                </span>
              </div>
            </div>

            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-white text-balance leading-snug">
              {lang === 'bn'
                ? 'সরকারি কর্মচারী বেতন নির্ধারণ ও বকেয়া হিসাব ব্যবস্থা ২০২৬'
                : 'Bangladesh Government Employees Pay Fixation & Arrears System 2026'}
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed text-pretty">
              {lang === 'bn'
                ? 'মিলিটারি ইঞ্জিনিয়ার সার্ভিসেস (MES) এবং সরকারের সকল মন্ত্রণালয় ও বিভাগের কর্মচারীদের ২০২৬ সালের গেজেট অনুযায়ী ধাপভিত্তিক মূল বেতন নির্ধারণ, বাৎসরিক ইনক্রিমেন্ট, পদোন্নতি ও বকেয়া বেতন নির্ভুলভাবে নির্ণয় করুন।'
                : 'Accurate and traceable salary fixation, notional increments, promotions, and month-by-month arrears for Military Engineer Services (MES) and all Bangladesh Government employees.'}
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onNavigateTab('fixation')}
                className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white text-xs sm:text-sm font-semibold rounded-lg shadow-sm transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>{lang === 'bn' ? 'বেতন নির্ধারণ শুরু করুন' : 'Start Pay Fixation'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onDownloadExcel(selectedEmployee)}
                className="px-4 py-2.5 bg-slate-800/90 hover:bg-slate-700 active:bg-slate-900 border border-slate-600 text-white text-xs sm:text-sm font-semibold rounded-lg transition-all flex items-center gap-2 cursor-pointer"
              >
                <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
                <span>{lang === 'bn' ? '১০-শীট এক্সেল ডাউনলোড (.xlsx)' : 'Download 10-Sheet Excel (.xlsx)'}</span>
              </button>
            </div>
          </div>

          {/* Quick Active Employee Card */}
          <div className="w-full lg:w-80 bg-slate-900/90 backdrop-blur-md rounded-xl border border-slate-700/80 p-4 shrink-0 shadow-md">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                {lang === 'bn' ? 'নির্বাচিত কর্মচারী' : 'Selected Employee'}
              </span>
              <span className="text-[11px] font-mono text-slate-400">{selectedEmployee.employeeIdNumber}</span>
            </div>

            <div className="space-y-2 text-xs">
              <div>
                <p className="font-bold text-sm text-white">{selectedEmployee.nameBangla}</p>
                <p className="text-slate-400 text-[11px]">{selectedEmployee.currentDesignation}</p>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-800">
                <div className="bg-slate-800/60 p-2 rounded">
                  <span className="text-[10px] text-slate-400 block">{lang === 'bn' ? 'বর্তমান বেতন (২০১৫)' : 'Existing Basic'}</span>
                  <span className="font-mono font-bold text-white text-sm">৳{selectedEmployee.currentBasicSalary.toLocaleString()}</span>
                </div>
                <div className="bg-emerald-950/60 border border-emerald-800/50 p-2 rounded">
                  <span className="text-[10px] text-emerald-300 block">{lang === 'bn' ? 'নির্ধারিত বেতন (২০২৬)' : 'Revised Basic'}</span>
                  <span className="font-mono font-bold text-emerald-300 text-sm">
                    ৳{calculatePayFixation(selectedEmployee).revisedBasic.toLocaleString()}
                  </span>
                </div>
              </div>

              <button
                onClick={() => onNavigateTab('fixation')}
                className="w-full mt-2 py-1.5 text-center text-[11px] font-medium text-emerald-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded transition-colors"
              >
                {lang === 'bn' ? 'বিস্তারিত হিসাব ও রিপোর্ট দেখুন' : 'View Detailed Breakdown'} &rarr;
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Records */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs text-slate-500 font-medium">
              {lang === 'bn' ? 'মোট সংরক্ষিত কর্মচারী' : 'Total Employee Records'}
            </span>
            <p className="text-2xl font-bold font-mono text-slate-900">{employees.length}</p>
            <span className="text-[11px] text-slate-500 block">
              {lang === 'bn' ? `এমইএস: ${mesCount} · অন্যান্য: ${otherCount}` : `MES: ${mesCount} · Other: ${otherCount}`}
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700">
            <Users className="w-6 h-6" />
          </div>
        </div>

        {/* Card 2: Completed Fixations */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs text-emerald-700 font-medium">
              {lang === 'bn' ? 'সম্পন্ন বেতন নির্ধারণ' : 'Completed Fixations'}
            </span>
            <p className="text-2xl font-bold font-mono text-emerald-700">{completedCount}</p>
            <span className="text-[11px] text-emerald-600 block">
              {lang === 'bn' ? 'যাচাইকৃত ও অনুমোদিত' : 'Audited & Verified'}
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-700">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>

        {/* Card 3: Pending / In-Review */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs text-amber-700 font-medium">
              {lang === 'bn' ? 'পর্যালোচনাধীন / অপেক্ষমাণ' : 'Pending Review'}
            </span>
            <p className="text-2xl font-bold font-mono text-amber-700">{pendingCount + reviewCount}</p>
            <span className="text-[11px] text-amber-600 block">
              {lang === 'bn' ? 'সার্ভিস বুক নিরীক্ষা প্রয়োজন' : 'Action Required'}
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-amber-700">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        {/* Card 4: Estimated Arrears */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs text-blue-700 font-medium">
              {lang === 'bn' ? 'সম্ভাব্য মোট বকেয়া (৬ মাস)' : 'Total Estimated Arrears'}
            </span>
            <p className="text-xl font-bold font-mono text-blue-900">৳{totalArrearsEstimate.toLocaleString()}</p>
            <span className="text-[11px] text-blue-600 block">
              {lang === 'bn' ? 'জানুয়ারি - জুন ২০২৬ (১ম ধাপ)' : 'Jan - Jun 2026 Stage 1'}
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-700">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Recent Salary Fixations Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-bold text-slate-900 text-sm sm:text-base">
              {lang === 'bn' ? 'সাম্প্রতিক বেতন নির্ধারণ তালিকা' : 'Recent Fixation Records'}
            </h3>
            <span className="text-xs text-slate-500">
              {lang === 'bn' ? 'কর্মচারী নির্বাচন করে পূর্ণাঙ্গ হিসাব ও বিবরণী তৈরি করুন' : 'Select an employee to run or inspect calculation details'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onAddNewEmployeeModal}
              className="px-3 py-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors"
            >
              + {lang === 'bn' ? 'নতুন কর্মচারী যোগ করুন' : 'Add Employee'}
            </button>
            <button
              onClick={() => onNavigateTab('employees')}
              className="px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              {lang === 'bn' ? 'সকল কর্মচারী দেখুন' : 'View All'} &rarr;
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">{lang === 'bn' ? 'কর্মচারী ও পদবী' : 'Employee & Post'}</th>
                <th className="py-3 px-4">{lang === 'bn' ? 'সংস্থা ও ক্যাটাগরি' : 'Organization'}</th>
                <th className="py-3 px-4">{lang === 'bn' ? 'গ্রেড' : 'Grade'}</th>
                <th className="py-3 px-4 text-right">{lang === 'bn' ? 'বিদ্যমান বেতন (২০১৫)' : 'Existing Basic'}</th>
                <th className="py-3 px-4 text-right">{lang === 'bn' ? 'নির্ধারিত বেতন (২০২৬)' : 'Revised Basic'}</th>
                <th className="py-3 px-4 text-right">{lang === 'bn' ? 'বকেয়া (৬ মাস)' : 'Arrears (6m)'}</th>
                <th className="py-3 px-4 text-center">{lang === 'bn' ? 'অবস্থা' : 'Status'}</th>
                <th className="py-3 px-4 text-center">{lang === 'bn' ? 'অ্যাকশন' : 'Action'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {employees.map(emp => {
                const fix = calculatePayFixation(emp);
                const arr = calculateArrears(emp, fix.revisedBasic, '2026-01', '2026-06', '2026-07');
                const isSelected = selectedEmployee.id === emp.id;

                return (
                  <tr
                    key={emp.id}
                    onClick={() => onSelectEmployee(emp)}
                    className={`hover:bg-slate-50 cursor-pointer transition-colors ${
                      isSelected ? 'bg-emerald-50/60 font-medium' : ''
                    }`}
                  >
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-900">{emp.nameBangla}</div>
                      <div className="text-[11px] text-slate-500 font-mono">{emp.employeeIdNumber} · {emp.currentDesignation}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-slate-800">{emp.department}</div>
                      <div className="text-[11px] text-slate-500">{emp.officeLocation}</div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-semibold text-slate-800">গ্রেড-{emp.currentGrade}</span>
                    </td>
                    <td className="py-3 px-4 text-right font-mono tabular-nums text-slate-700">
                      ৳{emp.currentBasicSalary.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-right font-mono tabular-nums font-bold text-emerald-800">
                      ৳{fix.revisedBasic.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-right font-mono tabular-nums text-blue-900 font-semibold">
                      ৳{arr.netTotalArrears.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[11px] font-semibold ${
                          emp.fixationStatus === 'finalized'
                            ? 'bg-emerald-100 text-emerald-800'
                            : emp.fixationStatus === 'calculated'
                            ? 'bg-blue-100 text-blue-800'
                            : emp.fixationStatus === 'reviewed'
                            ? 'bg-purple-100 text-purple-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {emp.fixationStatus.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectEmployee(emp);
                          onNavigateTab('fixation');
                        }}
                        className="px-2.5 py-1 text-xs font-semibold text-emerald-700 hover:text-emerald-900 bg-emerald-50 hover:bg-emerald-100 rounded transition-colors"
                      >
                        {lang === 'bn' ? 'গণনা দেখুন' : 'Calculate'}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
