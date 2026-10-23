import React, { useState } from 'react';
import { Employee } from '../../types';
import { calculatePayFixation, calculateArrears } from '../../utils/fixationEngine';
import { LogoPrimary, LogoMES } from '../Logos';
import { Printer, Download, FileSpreadsheet, CheckCircle2, ShieldCheck } from 'lucide-react';

interface ReportsTabProps {
  selectedEmployee: Employee;
  allEmployees: Employee[];
  onDownloadExcel: (emp: Employee) => void;
  lang: 'bn' | 'en';
}

export const ReportsTab: React.FC<ReportsTabProps> = ({
  selectedEmployee,
  allEmployees,
  onDownloadExcel,
  lang
}) => {
  const [reportType, setReportType] = useState<'fixation_cert' | 'arrears_bill' | 'service_summary' | 'cadre_summary'>('fixation_cert');

  const fixation = calculatePayFixation(selectedEmployee);
  const arrears = calculateArrears(selectedEmployee, fixation.revisedBasic, '2026-01', '2026-06', '2026-07');

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Top Controls (Hidden during print) */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 no-print">
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            {lang === 'bn' ? 'অফিসিয়াল বেতন নির্ধারণ বিবরণী ও প্রত্যয়ন রিপোর্ট' : 'Official Pay Fixation Statements & Reports'}
          </h2>
          <p className="text-xs text-slate-500">
            {lang === 'bn'
              ? 'আইবাস++ ফরম্যাট অনুযায়ী বেতন নির্ধারণ প্রত্যয়নপত্র, বকেয়া বিল ও সার্ভিস বিবরণী প্রিন্ট ও সংরক্ষণ'
              : 'iBAS++ standard format pay fixation certificates, arrears bills, and official service book extracts'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Report Type Selector */}
          <select
            value={reportType}
            onChange={e => setReportType(e.target.value as any)}
            className="py-2 px-3 text-xs font-semibold border border-slate-300 rounded-lg bg-slate-50 text-slate-800 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
          >
            <option value="fixation_cert">বেতন নির্ধারণ বিবরণী (Fixation Statement)</option>
            <option value="arrears_bill">বকেয়া বেতন বিল বিবরণী (Arrears Bill)</option>
            <option value="service_summary">সার্ভিস হিস্ট্রি সারাংশ (Service Summary)</option>
            <option value="cadre_summary">সংস্থাওয়ারী সারসংক্ষেপ (Organization Summary)</option>
          </select>

          <button
            onClick={handlePrint}
            className="px-3.5 py-2 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shrink-0"
          >
            <Printer className="w-4 h-4" />
            <span>{lang === 'bn' ? 'প্রিন্ট / PDF' : 'Print / PDF'}</span>
          </button>

          <button
            onClick={() => onDownloadExcel(selectedEmployee)}
            className="px-3.5 py-2 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-700 active:bg-emerald-900 rounded-lg shadow-sm transition-colors flex items-center gap-1.5 cursor-pointer shrink-0"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-300" />
            <span>{lang === 'bn' ? 'এক্সেল (.xlsx)' : 'Excel (.xlsx)'}</span>
          </button>
        </div>
      </div>

      {/* Printable Sheet Container */}
      <div className="bg-white rounded-2xl border border-slate-300 shadow-md p-8 sm:p-12 print:p-0 print:border-none print:shadow-none print-card max-w-4xl mx-auto">
        {/* Printable Official Header */}
        <div className="text-center space-y-2 border-b-2 border-slate-900 pb-6 mb-6">
          <div className="flex items-center justify-center gap-6 mb-2">
            <LogoPrimary size={56} />
            <div className="text-center">
              <h1 className="text-lg sm:text-xl font-bold text-slate-950 uppercase tracking-tight">
                গণপ্রজাতন্ত্রী বাংলাদেশ সরকার
              </h1>
              <p className="text-xs text-slate-700 font-semibold">
                {selectedEmployee.ministry}
              </p>
              <p className="text-xs text-slate-600">
                {selectedEmployee.department} · {selectedEmployee.officeLocation}
              </p>
            </div>
            <LogoMES size={56} />
          </div>

          <div className="inline-block px-4 py-1 bg-slate-100 border border-slate-300 rounded font-bold text-xs uppercase tracking-wider text-slate-900">
            {reportType === 'fixation_cert' && 'জাতীয় বেতন ও ভাতাদি আদেশ, ২০২৬ এর আওতায় বেতন নির্ধারণ বিবরণী (PAY FIXATION STATEMENT)'}
            {reportType === 'arrears_bill' && 'বেতন বকেয়া বিল বিবরণী (SALARY ARREARS BILL STATEMENT - 2026)'}
            {reportType === 'service_summary' && 'সার্ভিস বুক ও চাকরিবৃত্তান্ত সারাংশ (EMPLOYEE SERVICE BOOK EXTRACT)'}
            {reportType === 'cadre_summary' && 'কর্মকর্তা-কর্মচারী বেতন নির্ধারণ সমন্বিত তালিকা (CONSOLIDATED PAY STATEMENT)'}
          </div>
        </div>

        {/* REPORT CONTENT: Fixation Certificate */}
        {reportType === 'fixation_cert' && (
          <div className="space-y-6 text-xs text-slate-800">
            {/* 1. Employee Particulars */}
            <div>
              <h3 className="font-bold text-slate-900 border-b border-slate-200 pb-1 mb-2 uppercase text-[11px]">
                ১. কর্মচারীর ব্যক্তিগত ও চাকরির তথ্যাদি (Employee Particulars):
              </h3>
              <div className="grid grid-cols-2 gap-y-2 gap-x-4 border border-slate-200 p-3 rounded bg-slate-50/50">
                <div><span className="text-slate-500">কর্মচারীর নাম: </span><span className="font-bold text-slate-950">{selectedEmployee.nameBangla}</span></div>
                <div><span className="text-slate-500">Name (English): </span><span className="font-semibold">{selectedEmployee.nameEnglish}</span></div>
                <div><span className="text-slate-500">পদবী: </span><span className="font-semibold">{selectedEmployee.currentDesignation}</span></div>
                <div><span className="text-slate-500">আইডি নম্বর: </span><span className="font-mono font-bold text-slate-900">{selectedEmployee.employeeIdNumber}</span></div>
                <div><span className="text-slate-500">দপ্তর / শাখা: </span><span>{selectedEmployee.department}</span></div>
                <div><span className="text-slate-500">জাতীয় পরিচয়পত্র (NID): </span><span className="font-mono">{selectedEmployee.nationalId}</span></div>
                <div><span className="text-slate-500">প্রথম যোগদানের তারিখ: </span><span className="font-mono">{selectedEmployee.joiningDate}</span></div>
                <div><span className="text-slate-500">পিআরএল গমনের তারিখ: </span><span className="font-mono">{selectedEmployee.prlDate}</span></div>
              </div>
            </div>

            {/* 2. Fixation Details Comparison Table */}
            <div>
              <h3 className="font-bold text-slate-900 border-b border-slate-200 pb-1 mb-2 uppercase text-[11px]">
                ২. বেতন নির্ধারণের তুলনামূলক বিবরণী (Pay Fixation Details):
              </h3>
              <table className="w-full border border-slate-300 text-left">
                <thead className="bg-slate-100 font-bold border-b border-slate-300">
                  <tr>
                    <th className="p-2.5 border-r border-slate-300">বিবরণ</th>
                    <th className="p-2.5 border-r border-slate-300 text-right">বিদ্যমান স্কেল (২০১৫)</th>
                    <th className="p-2.5 border-r border-slate-300 text-right">সংশোধিত আদেশ (২০২৬)</th>
                    <th className="p-2.5 text-center">মন্তব্য / বিধি</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr>
                    <td className="p-2 border-r border-slate-300 font-medium">বেতন গ্রেড (Pay Grade)</td>
                    <td className="p-2 border-r border-slate-300 text-right font-mono font-bold">গ্রেড-{selectedEmployee.currentGrade}</td>
                    <td className="p-2 border-r border-slate-300 text-right font-mono font-bold text-emerald-950">গ্রেড-{selectedEmployee.currentGrade}</td>
                    <td className="p-2 text-center text-slate-600">অনুরূপ গ্রেড বহাল</td>
                  </tr>
                  <tr>
                    <td className="p-2 border-r border-slate-300 font-medium">স্কেলের ধাপ নম্বর (Step Index)</td>
                    <td className="p-2 border-r border-slate-300 text-right font-mono">ধাপ {fixation.appliedPayStepIndex + 1}</td>
                    <td className="p-2 border-r border-slate-300 text-right font-mono font-bold text-emerald-950">ধাপ {fixation.appliedPayStepIndex + 1}</td>
                    <td className="p-2 text-center text-slate-600">সমরূপ ধাপ প্রাপ্তি</td>
                  </tr>
                  <tr>
                    <td className="p-2 border-r border-slate-300 font-medium">নির্ধারিত মূল বেতন (Basic Pay)</td>
                    <td className="p-2 border-r border-slate-300 text-right font-mono">৳{selectedEmployee.currentBasicSalary.toLocaleString()}</td>
                    <td className="p-2 border-r border-slate-300 text-right font-mono font-bold text-emerald-950 text-sm">৳{fixation.revisedBasic.toLocaleString()}</td>
                    <td className="p-2 text-center text-slate-600">অনুচ্ছেদ ৪ ও ৫</td>
                  </tr>
                  <tr>
                    <td className="p-2 border-r border-slate-300 font-medium">ব্যক্তিগত বেতন (Personal Pay - PP)</td>
                    <td className="p-2 border-r border-slate-300 text-right font-mono">৳০</td>
                    <td className="p-2 border-r border-slate-300 text-right font-mono font-bold text-amber-900">৳{fixation.personalPay.toLocaleString()}</td>
                    <td className="p-2 text-center text-slate-600">এফ.আর. ২২ (বেতন সংরক্ষণ)</td>
                  </tr>
                  <tr className="bg-slate-50 font-bold">
                    <td className="p-2.5 border-r border-slate-300 text-slate-950">সর্বমোট প্রদেয় মূল বেতন (Total Basic)</td>
                    <td className="p-2.5 border-r border-slate-300 text-right font-mono">৳{selectedEmployee.currentBasicSalary.toLocaleString()}</td>
                    <td className="p-2.5 border-r border-slate-300 text-right font-mono text-emerald-950 text-base">৳{fixation.totalRevisedPay.toLocaleString()}</td>
                    <td className="p-2.5 text-center text-emerald-900">কার্যকর: ০১-০১-২০২৬</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* 3. Statutory Certification & Signatures */}
            <div className="pt-4 space-y-6">
              <p className="text-[11px] leading-relaxed text-slate-700">
                প্রত্যয়ন করা যাইতেছে যে, সরকারি কর্মচারী (বেতন ও ভাতাদি) আদেশ, ২০২৬ এবং অর্থ বিভাগের সংশ্লিষ্ট পরিপত্র মোতাবেক উপরে বর্ণিত কর্মকর্তা/কর্মচারীর সার্ভিস হিস্ট্রি ও সার্ভিস বুক যাচাইক্রমে বর্ণিত বেতন নির্ধারণ সম্পন্ন করা হইল।
              </p>

              <div className="grid grid-cols-2 pt-12 gap-12 text-center text-xs">
                <div>
                  <div className="border-t border-slate-400 pt-1 font-semibold text-slate-900">
                    হিসাব রক্ষক / নিরীক্ষক
                  </div>
                  <span className="text-[10px] text-slate-500">মিলিটারি ইঞ্জিনিয়ার সার্ভিসেস / সংশ্লিষ্ট দপ্তর</span>
                </div>

                <div>
                  <div className="border-t border-slate-400 pt-1 font-semibold text-slate-900">
                    আহরণ ও বিতরণ কর্মকর্তা (DDO)
                  </div>
                  <span className="text-[10px] text-slate-500">অনুমোদনকারী কর্মকর্তা ও পদবী সিল</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* REPORT CONTENT: Arrears Bill */}
        {reportType === 'arrears_bill' && (
          <div className="space-y-6 text-xs text-slate-800">
            <div className="border border-slate-200 p-3 rounded bg-slate-50/50 flex justify-between">
              <div>
                <p className="font-bold text-slate-950">{selectedEmployee.nameBangla} ({selectedEmployee.employeeIdNumber})</p>
                <p className="text-slate-500">{selectedEmployee.currentDesignation} · {selectedEmployee.officeLocation}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-emerald-900 text-sm">মোট বকেয়া: ৳{arrears.netTotalArrears.toLocaleString()}</p>
                <p className="text-slate-500 text-[10px]">সময়সীমা: {arrears.startMonth} হতে {arrears.endMonth}</p>
              </div>
            </div>

            <table className="w-full border border-slate-300 text-left">
              <thead className="bg-slate-100 font-bold border-b border-slate-300">
                <tr>
                  <th className="p-2 border-r border-slate-300">মাস</th>
                  <th className="p-2 border-r border-slate-300 text-right">সংশোধিত মূল (BDT)</th>
                  <th className="p-2 border-r border-slate-300 text-right">আহরিত মূল (BDT)</th>
                  <th className="p-2 border-r border-slate-300 text-right">মূল বেতন বকেয়া</th>
                  <th className="p-2 border-r border-slate-300 text-right">ভাতা পার্থক্য</th>
                  <th className="p-2 text-right">নিট প্রদেয় বকেয়া</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {arrears.monthlyBreakdown.map((m, idx) => (
                  <tr key={idx}>
                    <td className="p-2 border-r border-slate-300 font-medium">{m.monthNameBangla}</td>
                    <td className="p-2 border-r border-slate-300 text-right font-mono">৳{m.revisedBasic.toLocaleString()}</td>
                    <td className="p-2 border-r border-slate-300 text-right font-mono">৳{m.drawnBasic.toLocaleString()}</td>
                    <td className="p-2 border-r border-slate-300 text-right font-mono font-semibold text-blue-900">+৳{m.basicDifference.toLocaleString()}</td>
                    <td className="p-2 border-r border-slate-300 text-right font-mono">৳{m.allowanceDifference.toLocaleString()}</td>
                    <td className="p-2 text-right font-mono font-bold text-emerald-950">৳{m.netPayableArrears.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-slate-100 font-bold border-t border-slate-300">
                <tr>
                  <td className="p-2 border-r border-slate-300">সর্বমোট (Total):</td>
                  <td colSpan={2} className="border-r border-slate-300"></td>
                  <td className="p-2 border-r border-slate-300 text-right font-mono text-blue-900">৳{arrears.totalBasicDifference.toLocaleString()}</td>
                  <td className="p-2 border-r border-slate-300 text-right font-mono">৳{arrears.totalAllowanceDifference.toLocaleString()}</td>
                  <td className="p-2 text-right font-mono text-emerald-950 text-sm">৳{arrears.netTotalArrears.toLocaleString()}</td>
                </tr>
              </tfoot>
            </table>

            <div className="pt-10 grid grid-cols-2 text-center text-xs">
              <div className="border-t border-slate-400 pt-1 font-semibold">বিল প্রস্তুতকারী সহকারী</div>
              <div className="border-t border-slate-400 pt-1 font-semibold">ডিডিও / হিসাব কর্মকর্তা</div>
            </div>
          </div>
        )}

        {/* REPORT CONTENT: Service Summary */}
        {reportType === 'service_summary' && (
          <div className="space-y-4 text-xs text-slate-800">
            <h4 className="font-bold text-slate-900 border-b border-slate-200 pb-1">
              কর্মচারীর চাকরি বৃত্তান্ত ও সার্ভিস ইতিহাস (Chronological Record of Service)
            </h4>
            <div className="space-y-2">
              {selectedEmployee.serviceEvents.map(se => (
                <div key={se.id} className="p-3 border border-slate-200 rounded flex justify-between items-start bg-slate-50/40">
                  <div>
                    <div className="font-bold text-slate-950">{se.designation} (গ্রেড-{se.grade})</div>
                    <div className="text-[11px] text-slate-500 font-mono">তারিখ: {se.effectiveDate} · আদেশ: {se.orderNumber} ({se.issuingAuthority})</div>
                    {se.remarks && <div className="text-[11px] text-slate-600 mt-1">{se.remarks}</div>}
                  </div>
                  <div className="text-right font-mono font-bold text-emerald-900">
                    ৳{se.basicSalary.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* REPORT CONTENT: Cadre Summary */}
        {reportType === 'cadre_summary' && (
          <div className="space-y-4 text-xs text-slate-800">
            <h4 className="font-bold text-slate-900 border-b border-slate-200 pb-1">
              সংরক্ষিত সকল কর্মকর্তা ও কর্মচারীর বেতন নির্ধারণ সারসংক্ষেপ
            </h4>
            <table className="w-full border border-slate-300 text-left">
              <thead className="bg-slate-100 font-bold border-b border-slate-300">
                <tr>
                  <th className="p-2 border-r border-slate-300">নাম ও পদবী</th>
                  <th className="p-2 border-r border-slate-300">গ্রেড</th>
                  <th className="p-2 border-r border-slate-300 text-right">২০১৫ মূল বেতন</th>
                  <th className="p-2 border-r border-slate-300 text-right">২০২৬ সংশোধিত</th>
                  <th className="p-2 border-r border-slate-300 text-right">মাসিক বৃদ্ধি</th>
                  <th className="p-2 text-center">স্ট্যাটাস</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {allEmployees.map(emp => {
                  const fix = calculatePayFixation(emp);
                  return (
                    <tr key={emp.id}>
                      <td className="p-2 border-r border-slate-300">
                        <div className="font-bold">{emp.nameBangla}</div>
                        <div className="text-[10px] text-slate-500">{emp.currentDesignation} ({emp.employeeIdNumber})</div>
                      </td>
                      <td className="p-2 border-r border-slate-300 font-bold text-center">Gr-{emp.currentGrade}</td>
                      <td className="p-2 border-r border-slate-300 text-right font-mono">৳{emp.currentBasicSalary.toLocaleString()}</td>
                      <td className="p-2 border-r border-slate-300 text-right font-mono font-bold text-emerald-900">৳{fix.revisedBasic.toLocaleString()}</td>
                      <td className="p-2 border-r border-slate-300 text-right font-mono text-blue-900">+৳{(fix.revisedBasic - emp.currentBasicSalary).toLocaleString()}</td>
                      <td className="p-2 text-center font-bold text-[10px] uppercase text-emerald-800">{emp.fixationStatus}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Mandatory Official Disclaimer at Footer of Printout */}
        <div className="mt-8 pt-4 border-t border-slate-300 text-[10px] text-slate-500 text-center space-y-1">
          <p className="font-semibold text-slate-700">
            দাবিত্যাগ (Mandatory Disclaimer):
          </p>
          <p className="leading-relaxed">
            “This is an independent salary calculation tool and is not an official Government of Bangladesh, MES, Ministry of Finance, or iBAS++ service. Calculations depend on the applicable official orders and the accuracy of the employee's information. Final salary fixation must be confirmed through the authorized government process.”
          </p>
        </div>
      </div>
    </div>
  );
};
