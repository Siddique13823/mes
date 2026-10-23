import React, { useState } from 'react';
import { Employee } from '../../types';
import { calculatePayFixation, calculateArrears } from '../../utils/fixationEngine';
import { ReceiptText, FileSpreadsheet, Printer, Calendar, ShieldCheck, AlertCircle } from 'lucide-react';

interface ArrearsCalculatorTabProps {
  selectedEmployee: Employee;
  onDownloadExcel: (emp: Employee) => void;
  lang: 'bn' | 'en';
}

export const ArrearsCalculatorTab: React.FC<ArrearsCalculatorTabProps> = ({
  selectedEmployee,
  onDownloadExcel,
  lang
}) => {
  const fixation = calculatePayFixation(selectedEmployee);

  const [startMonth, setStartMonth] = useState<string>('2026-01');
  const [endMonth, setEndMonth] = useState<string>('2026-06');
  const [allowanceStageStart, setAllowanceStageStart] = useState<string>('2026-07');

  const arrearsResult = calculateArrears(
    selectedEmployee,
    fixation.revisedBasic,
    startMonth,
    endMonth,
    allowanceStageStart
  );

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-bold text-slate-900 text-base">{selectedEmployee.nameBangla}</span>
            <span className="text-xs text-slate-400">·</span>
            <span className="text-xs font-mono text-slate-500">{selectedEmployee.employeeIdNumber}</span>
          </div>
          <h2 className="text-lg font-bold text-slate-900">
            {lang === 'bn' ? 'ধাপভিত্তিক বকেয়া (Arrears) বিল ক্যালকুলেটর ২০২৬' : 'Staged Arrears Calculation Engine 2026'}
          </h2>
          <p className="text-xs text-slate-500">
            {lang === 'bn'
              ? 'কার্যকর তারিখ হতে বাস্তবায়ন আদেশ পর্যন্ত মাসিক বেতন পার্থক্য, ভাতার সমন্বয় ও নিট প্রদেয় বকেয়া'
              : 'Month-by-month gross and allowance differences between drawn salary and revised entitlement'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>{lang === 'bn' ? 'প্রিন্ট বিল' : 'Print Statement'}</span>
          </button>

          <button
            onClick={() => onDownloadExcel(selectedEmployee)}
            className="px-3.5 py-2 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-700 active:bg-emerald-900 rounded-lg shadow-sm transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-300" />
            <span>{lang === 'bn' ? 'এক্সেল স্টেটমেন্ট' : 'Download Excel'}</span>
          </button>
        </div>
      </div>

      {/* Control Strip for Timeframe and Staging Selection */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
          {lang === 'bn' ? 'বকেয়া হিসাবের সময়সীমা ও ধাপ নির্বাচন' : 'Arrears Period & Staged Implementation Controls'}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              {lang === 'bn' ? 'হিসাব শুরুর মাস (কার্যকর তারিখ) *' : 'Period Start Month *'}
            </label>
            <input
              type="month"
              value={startMonth}
              onChange={e => setStartMonth(e.target.value)}
              className="w-full p-2 border border-slate-300 rounded-lg font-mono bg-slate-50 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              {lang === 'bn' ? 'হিসাব সমাপ্তির মাস *' : 'Period End Month *'}
            </label>
            <input
              type="month"
              value={endMonth}
              onChange={e => setEndMonth(e.target.value)}
              className="w-full p-2 border border-slate-300 rounded-lg font-mono bg-slate-50 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              {lang === 'bn' ? '২য় ধাপ (ভাতাদি) কার্যকর মাস *' : 'Stage 2 (Allowances) Start *'}
            </label>
            <input
              type="month"
              value={allowanceStageStart}
              onChange={e => setAllowanceStageStart(e.target.value)}
              className="w-full p-2 border border-slate-300 rounded-lg font-mono bg-slate-50 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
            />
          </div>
        </div>

        {/* Staging Disclosure Note */}
        <div className="bg-emerald-50/70 border border-emerald-200 p-3 rounded-lg text-[11px] text-emerald-950 flex items-start gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <span className="font-bold">সরকারি বাস্তবায়ন নির্দেশিকা অনুযায়ী: </span>
            {startMonth} হতে {allowanceStageStart > endMonth ? endMonth : allowanceStageStart} পর্যন্ত সময়কালে কেবল সংশোধিত মূল বেতনের বকেয়া (Basic Arrears) নির্ধারিত হচ্ছে। {allowanceStageStart} হতে সংশোধিত বাড়িভাড়া ও চিকিৎসা ভাতার পার্থক্য অন্তর্ভুক্ত হয়েছে।
          </div>
        </div>
      </div>

      {/* KPI Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-xs text-slate-500 font-medium block">গণনাকৃত মোট মাস</span>
          <span className="text-xl font-bold font-mono text-slate-900">{arrearsResult.monthsCount} মাস</span>
          <span className="text-[10px] text-slate-400 block mt-0.5">{startMonth} হতে {endMonth}</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-xs text-slate-500 font-medium block">মূল বেতন বকেয়া (Basic Diff)</span>
          <span className="text-xl font-bold font-mono text-slate-900">৳{arrearsResult.totalBasicDifference.toLocaleString()}</span>
          <span className="text-[10px] text-slate-400 block mt-0.5">মাসিক +৳{(fixation.revisedBasic - selectedEmployee.currentBasicSalary).toLocaleString()}</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-xs text-slate-500 font-medium block">ভাতাদির বকেয়া (Allow. Diff)</span>
          <span className="text-xl font-bold font-mono text-slate-900">৳{arrearsResult.totalAllowanceDifference.toLocaleString()}</span>
          <span className="text-[10px] text-slate-400 block mt-0.5">বাড়ি ভাড়া ও চিকিৎসা</span>
        </div>

        <div className="bg-emerald-900 text-white p-4 rounded-xl border border-emerald-950 shadow-md">
          <span className="text-xs text-emerald-300 font-semibold block">সর্বমোট নিট প্রদেয় বকেয়া</span>
          <span className="text-2xl font-bold font-mono text-white">৳{arrearsResult.netTotalArrears.toLocaleString()}</span>
          <span className="text-[10px] text-emerald-200 block mt-0.5">কর্তন/সমন্বয় পরবর্তী</span>
        </div>
      </div>

      {/* Month by month Schedule Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <h4 className="font-bold text-slate-900 text-xs sm:text-sm">
            {lang === 'bn' ? 'মাসভিত্তিক বিস্তারিত বকেয়া বিল বিবরণী' : 'Month-by-Month Arrears Schedule'}
          </h4>
          <span className="text-xs text-slate-500 font-mono">
            {selectedEmployee.department} · {selectedEmployee.officeLocation}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100/90 text-slate-700 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-3">{lang === 'bn' ? 'মাস' : 'Month'}</th>
                <th className="py-2.5 px-3 text-right">{lang === 'bn' ? 'সংশোধিত মূল' : 'Rev Basic'}</th>
                <th className="py-2.5 px-3 text-right">{lang === 'bn' ? 'আহরিত মূল' : 'Drawn Basic'}</th>
                <th className="py-2.5 px-3 text-right">{lang === 'bn' ? 'মূল পার্থক্য' : 'Basic Diff'}</th>
                <th className="py-2.5 px-3 text-right">{lang === 'bn' ? 'সংশোধিত ভাতাদি' : 'Rev Allow.'}</th>
                <th className="py-2.5 px-3 text-right">{lang === 'bn' ? 'আহরিত ভাতাদি' : 'Drawn Allow.'}</th>
                <th className="py-2.5 px-3 text-right">{lang === 'bn' ? 'ভাতা পার্থক্য' : 'Allow. Diff'}</th>
                <th className="py-2.5 px-3 text-right font-bold text-emerald-950">{lang === 'bn' ? 'নিট প্রদেয় বকেয়া' : 'Net Arrears'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {arrearsResult.monthlyBreakdown.map((m, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="py-2.5 px-3 font-semibold text-slate-900">
                    {lang === 'bn' ? m.monthNameBangla : m.monthNameEnglish}
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono text-slate-700">
                    ৳{m.revisedBasic.toLocaleString()}
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono text-slate-700">
                    ৳{m.drawnBasic.toLocaleString()}
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono font-semibold text-blue-900">
                    +৳{m.basicDifference.toLocaleString()}
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono text-slate-700">
                    ৳{m.revisedAllowancesTotal.toLocaleString()}
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono text-slate-700">
                    ৳{m.drawnAllowancesTotal.toLocaleString()}
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono text-slate-700">
                    ৳{m.allowanceDifference.toLocaleString()}
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono font-bold text-emerald-900 bg-emerald-50/50">
                    ৳{m.netPayableArrears.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-slate-100 font-bold border-t border-slate-200">
              <tr>
                <td className="py-3 px-3 text-slate-900">সর্বমোট (Total):</td>
                <td colSpan={2}></td>
                <td className="py-3 px-3 text-right font-mono text-blue-900">
                  ৳{arrearsResult.totalBasicDifference.toLocaleString()}
                </td>
                <td colSpan={2}></td>
                <td className="py-3 px-3 text-right font-mono text-slate-800">
                  ৳{arrearsResult.totalAllowanceDifference.toLocaleString()}
                </td>
                <td className="py-3 px-3 text-right font-mono text-emerald-900 text-sm bg-emerald-100">
                  ৳{arrearsResult.netTotalArrears.toLocaleString()}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};
