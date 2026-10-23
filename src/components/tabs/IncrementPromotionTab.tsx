import React, { useState } from 'react';
import { Employee, ServiceEvent } from '../../types';
import { PAY_SCALES_DATA } from '../../data/payScales';
import {
  calculateAnnualIncrement,
  calculatePromotionFixation,
  calculatePayFixation
} from '../../utils/fixationEngine';
import { TrendingUp, Award, Calendar, CheckCircle, ArrowRight, ShieldCheck } from 'lucide-react';

interface IncrementPromotionTabProps {
  selectedEmployee: Employee;
  onUpdateEmployee: (emp: Employee) => void;
  lang: 'bn' | 'en';
}

export const IncrementPromotionTab: React.FC<IncrementPromotionTabProps> = ({
  selectedEmployee,
  onUpdateEmployee,
  lang
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'increment' | 'promotion'>('increment');

  // Increment state
  const fixation = calculatePayFixation(selectedEmployee);
  const baseSalaryForIncrement = fixation.revisedBasic;
  const incCalc = calculateAnnualIncrement(selectedEmployee.currentGrade, baseSalaryForIncrement);

  // Promotion state
  const [targetPromotedGrade, setTargetPromotedGrade] = useState<number>(
    Math.max(1, selectedEmployee.currentGrade - 1)
  );

  const promoCalc = calculatePromotionFixation(
    selectedEmployee.currentGrade,
    baseSalaryForIncrement,
    targetPromotedGrade
  );

  const [appliedNotice, setAppliedNotice] = useState<string | null>(null);

  // Apply increment to employee service history
  const handleApplyIncrement = () => {
    const newServiceEvent: ServiceEvent = {
      id: `se-${Date.now()}`,
      employeeId: selectedEmployee.id,
      effectiveDate: '2026-07-01',
      eventType: 'increment',
      designation: selectedEmployee.currentDesignation,
      grade: selectedEmployee.currentGrade,
      basicSalary: incCalc.newBasic,
      orderNumber: 'বাৎসরিক ইনক্রিমেন্ট আদেশ ২০২৬',
      orderDate: '2026-07-01',
      issuingAuthority: 'iBAS++ স্বয়ংক্রিয় সিস্টেম',
      remarks: `১লা জুলাই ৫% বাৎসরিক ইনক্রিমেন্ট (+৳${incCalc.incrementAmount}) যোগ হয়েছে।`
    };

    onUpdateEmployee({
      ...selectedEmployee,
      currentBasicSalary: incCalc.newBasic,
      lastIncrementDate: '2026-07-01',
      nextIncrementDate: '2027-07-01',
      serviceEvents: [...selectedEmployee.serviceEvents, newServiceEvent],
      updatedAt: new Date().toISOString()
    });

    setAppliedNotice('১লা জুলাই ২০২৬ এর ইনক্রিমেন্ট সফলভাবে কর্মচারীর রেকর্ডে যোগ করা হয়েছে!');
    setTimeout(() => setAppliedNotice(null), 4000);
  };

  // Apply promotion to employee profile
  const handleApplyPromotion = () => {
    const higherGradeInfo = PAY_SCALES_DATA.find(g => g.grade === targetPromotedGrade)!;
    const newServiceEvent: ServiceEvent = {
      id: `se-${Date.now()}`,
      employeeId: selectedEmployee.id,
      effectiveDate: '2026-08-01',
      eventType: 'promotion',
      designation: `${selectedEmployee.currentDesignation} (পদোন্নতিপ্রাপ্ত)`,
      grade: targetPromotedGrade,
      basicSalary: promoCalc.fixedBasic,
      orderNumber: 'পদোন্নতি প্রজ্ঞাপন ২০২৬',
      orderDate: '2026-08-01',
      issuingAuthority: selectedEmployee.ministry,
      remarks: `কাল্পনিক ইনক্রিমেন্ট গণনাক্রমে গ্রেড ${targetPromotedGrade}-এ বেতন নির্ধারণ সম্পন্ন।`
    };

    onUpdateEmployee({
      ...selectedEmployee,
      currentGrade: targetPromotedGrade,
      currentBasicSalary: promoCalc.fixedBasic,
      serviceEvents: [...selectedEmployee.serviceEvents, newServiceEvent],
      statusNotes: `গ্রেড ${targetPromotedGrade} তে পদোন্নতিপ্রাপ্ত।`,
      updatedAt: new Date().toISOString()
    });

    setAppliedNotice(`সফলভাবে গ্রেড ${targetPromotedGrade}-এ পদোন্নতি কার্যকর ও বেতন নির্ধারণ হয়েছে!`);
    setTimeout(() => setAppliedNotice(null), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Header and Sub-Tab Segmented Switcher */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            {lang === 'bn' ? 'বাৎসরিক ইনক্রিমেন্ট ও পদোন্নতি বেতন নির্ধারণ ক্যালকুলেটর' : 'Annual Increment & Promotion Fixation Engine'}
          </h2>
          <p className="text-xs text-slate-500">
            {lang === 'bn'
              ? '১লা জুলাই সমরূপ ইনক্রিমেন্ট বিধি ও পদোন্নতিজনিত কাল্পনিক ইনক্রিমেন্ট (Notional Increment) সূত্র'
              : 'Uniform 1st July increment rules and promotion fixation based on notional increment principle'}
          </p>
        </div>

        {/* Sub-tab Switcher */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
          <button
            onClick={() => setActiveSubTab('increment')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
              activeSubTab === 'increment'
                ? 'bg-white text-emerald-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            ১লা জুলাই ইনক্রিমেন্ট
          </button>
          <button
            onClick={() => setActiveSubTab('promotion')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
              activeSubTab === 'promotion'
                ? 'bg-white text-emerald-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            পদোন্নতি বেতন স্থায়ীকরণ
          </button>
        </div>
      </div>

      {appliedNotice && (
        <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-bold rounded-xl flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{appliedNotice}</span>
        </div>
      )}

      {/* View 1: Annual Increment Simulation */}
      {activeSubTab === 'increment' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm p-5 sm:p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">
                  {lang === 'bn' ? 'বাৎসরিক ইনক্রিমেন্ট হিসাব পদ্ধতি (বিধি ৬)' : 'Annual Increment Calculation (Rule 6)'}
                </h3>
                <span className="text-xs text-slate-500">
                  সরকারি কর্মচারী (বেতন ও ভাতাদি) আদেশ ২০২৬, অনুচ্ছেদ ৬
                </span>
              </div>
              <span className="px-2.5 py-1 rounded bg-amber-100 text-amber-900 font-mono text-xs font-bold">
                হার: {incCalc.ratePercent}%
              </span>
            </div>

            {/* Formula display */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs">
              <span className="font-bold text-slate-700 block">সরকারি অনুমোদিত সূত্র:</span>
              <p className="font-mono text-emerald-950 font-bold bg-white p-2.5 rounded border border-slate-200">
                নতুন মূল বেতন = বর্তমান মূল বেতন + CEIL((বর্তমান মূল বেতন × {incCalc.ratePercent}%) / 10) × 10
              </p>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                * অর্থ মন্ত্রণালয়ের পরিপত্র অনুযায়ী ইনক্রিমেন্টের ভগ্নাংশ পরবর্তী ১০ টাকার গুণিতকে রাউন্ডিং (পূর্ণ সংখ্যায় রূপান্তর) করা বাধ্যতামূলক।
              </p>
            </div>

            {/* Step by step table */}
            <div className="border border-slate-200 rounded-lg overflow-hidden text-xs">
              <table className="w-full text-left">
                <tbody className="divide-y divide-slate-200">
                  <tr className="bg-white">
                    <td className="p-3 text-slate-600 font-medium">ইনক্রিমেন্ট পূর্ববর্তী মূল বেতন (২০২৬ স্কেল)</td>
                    <td className="p-3 text-right font-mono font-bold text-slate-800">৳{baseSalaryForIncrement.toLocaleString()}</td>
                  </tr>
                  <tr className="bg-slate-50/60">
                    <td className="p-3 text-slate-600 font-medium">ইনক্রিমেন্টের শতকরা হার (গ্রেড {selectedEmployee.currentGrade})</td>
                    <td className="p-3 text-right font-mono font-bold text-slate-800">{incCalc.ratePercent}%</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="p-3 text-slate-600 font-medium">কাঁচা ইনক্রিমেন্ট মান ({baseSalaryForIncrement} × {incCalc.ratePercent}%)</td>
                    <td className="p-3 text-right font-mono text-slate-700">৳{((baseSalaryForIncrement * incCalc.ratePercent) / 100).toFixed(2)}</td>
                  </tr>
                  <tr className="bg-slate-50/60">
                    <td className="p-3 text-slate-600 font-medium">পরবর্তী ১০ টাকার গুণিতকে রাউন্ডেড ইনক্রিমেন্ট যোগ</td>
                    <td className="p-3 text-right font-mono font-bold text-emerald-800">+৳{incCalc.incrementAmount.toLocaleString()}</td>
                  </tr>
                  <tr className="bg-emerald-50/80 font-bold">
                    <td className="p-3 text-emerald-950">১লা জুলাই ২০২৬ হতে নতুন নির্ধারিত মূল বেতন</td>
                    <td className="p-3 text-right font-mono text-emerald-950 text-sm">৳{incCalc.newBasic.toLocaleString()}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={handleApplyIncrement}
                className="px-4 py-2 bg-emerald-800 hover:bg-emerald-700 active:bg-emerald-900 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors flex items-center gap-2 cursor-pointer"
              >
                <TrendingUp className="w-4 h-4" />
                <span>{lang === 'bn' ? 'সার্ভিস বুকে ইনক্রিমেন্ট যোগ করুন' : 'Apply Increment to Service Book'}</span>
              </button>
            </div>
          </div>

          {/* Quick Summary Card */}
          <div className="bg-slate-900 text-white rounded-xl p-5 border border-slate-800 shadow-md space-y-4 text-xs">
            <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider block">
              ইনক্রিমেন্ট সংক্ষেপ
            </span>

            <div>
              <span className="text-slate-400 block text-[11px]">১লা জুলাই ২০২৬ হতে নতুন বেতন</span>
              <div className="text-2xl font-bold font-mono text-white mt-1">
                ৳{incCalc.newBasic.toLocaleString()}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 space-y-2">
              <div className="flex justify-between text-slate-300">
                <span>কর্মচারীর বর্তমান গ্রেড:</span>
                <span className="font-semibold text-white">গ্রেড-{selectedEmployee.currentGrade}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>পরবর্তী ইনক্রিমেন্ট তারিখ:</span>
                <span className="font-mono text-emerald-300">০১ জুলাই ২০২৭</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>মাসিক নিট বৃদ্ধি:</span>
                <span className="font-mono font-bold text-emerald-400">+৳{incCalc.incrementAmount.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View 2: Promotion Fixation (Notional Increment) */}
      {activeSubTab === 'promotion' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm p-5 sm:p-6 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">
                  {lang === 'bn' ? 'পদোন্নতিজনিত বেতন নির্ধারণ (কাল্পনিক ইনক্রিমেন্ট নীতি)' : 'Fixation on Promotion (Notional Increment Principle)'}
                </h3>
                <span className="text-xs text-slate-500">
                  সরকারি কর্মচারী আদেশ ২০২৬, অনুচ্ছেদ ৭ (১) ও (২)
                </span>
              </div>

              {/* Target Grade Selector */}
              <div className="flex items-center gap-2">
                <label className="text-xs font-bold text-slate-700">পদোন্নতির গ্রেড:</label>
                <select
                  value={targetPromotedGrade}
                  onChange={e => setTargetPromotedGrade(Number(e.target.value))}
                  className="px-3 py-1.5 text-xs font-bold border border-slate-300 rounded-lg bg-slate-50 text-emerald-950 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                >
                  {PAY_SCALES_DATA.filter(g => g.grade < selectedEmployee.currentGrade).map(g => (
                    <option key={g.grade} value={g.grade}>
                      গ্রেড-{g.grade} ({g.scale2026.minimum.toLocaleString()} - {g.scale2026.maximum.toLocaleString()})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Intermediate Steps Proof */}
            <div className="space-y-3">
              <span className="font-bold text-slate-800 text-xs block">
                {lang === 'bn' ? 'ধাপভিত্তিক কাল্পনিক ইনক্রিমেন্ট ও সমরূপ ধাপ নির্ধারণ:' : 'Step-by-step Execution:'}
              </span>

              <div className="space-y-2">
                {promoCalc.steps.map((st, i) => (
                  <div key={i} className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-800 flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center shrink-0">
                      {i + 1}
                    </span>
                    <span className="leading-relaxed">{st}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Results Table */}
            <div className="border border-slate-200 rounded-lg overflow-hidden text-xs">
              <table className="w-full text-left">
                <tbody className="divide-y divide-slate-200">
                  <tr className="bg-white">
                    <td className="p-3 text-slate-600 font-medium">পদোন্নতির পূর্বে মূল বেতন (গ্রেড {selectedEmployee.currentGrade})</td>
                    <td className="p-3 text-right font-mono font-bold text-slate-800">৳{baseSalaryForIncrement.toLocaleString()}</td>
                  </tr>
                  <tr className="bg-slate-50/60">
                    <td className="p-3 text-slate-600 font-medium">নিম্নতর স্কেলে ১টি কাল্পনিক ইনক্রিমেন্ট যোগ</td>
                    <td className="p-3 text-right font-mono font-bold text-emerald-800">+৳{promoCalc.notionalIncrement.toLocaleString()}</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="p-3 text-slate-600 font-medium">কাল্পনিক ইনক্রিমেন্টসহ গণনাকৃত ভিত্তি বেতন</td>
                    <td className="p-3 text-right font-mono font-bold text-slate-800">৳{promoCalc.lowerGradeNotionalBasic.toLocaleString()}</td>
                  </tr>
                  <tr className="bg-slate-50/60">
                    <td className="p-3 text-slate-600 font-medium">পদোন্নতিপ্রাপ্ত গ্রেড {targetPromotedGrade}-এর প্রারম্ভিক স্কেল</td>
                    <td className="p-3 text-right font-mono font-bold text-slate-800">৳{promoCalc.promotedGradeInitial.toLocaleString()}</td>
                  </tr>
                  <tr className="bg-emerald-50/80 font-bold">
                    <td className="p-3 text-emerald-950">পদোন্নতির পর চূড়ান্ত নির্ধারিত মূল বেতন (গ্রেড-{targetPromotedGrade})</td>
                    <td className="p-3 text-right font-mono text-emerald-950 text-sm">৳{promoCalc.fixedBasic.toLocaleString()}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={handleApplyPromotion}
                className="px-4 py-2 bg-emerald-800 hover:bg-emerald-700 active:bg-emerald-900 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Award className="w-4 h-4" />
                <span>{lang === 'bn' ? `গ্রেড ${targetPromotedGrade}-এ পদোন্নতি কার্যকর করুন` : 'Confirm Promotion Fixation'}</span>
              </button>
            </div>
          </div>

          {/* Quick Summary Card */}
          <div className="bg-slate-900 text-white rounded-xl p-5 border border-slate-800 shadow-md space-y-4 text-xs">
            <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider block">
              পদোন্নতি স্থায়ীকরণ ফলাফল
            </span>

            <div>
              <span className="text-slate-400 block text-[11px]">নির্ধারিত নতুন মূল বেতন</span>
              <div className="text-2xl font-bold font-mono text-white mt-1">
                ৳{promoCalc.fixedBasic.toLocaleString()}
              </div>
              <span className="text-[11px] text-emerald-400 font-medium block mt-0.5">
                গ্রেড {targetPromotedGrade} (ধাপ {promoCalc.selectedStepIndex + 1})
              </span>
            </div>

            <div className="pt-3 border-t border-slate-800 space-y-2">
              <div className="flex justify-between text-slate-300">
                <span>বর্তমান মূল বেতন:</span>
                <span className="font-mono text-white">৳{baseSalaryForIncrement.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>পদোন্নতিজনিত মাসিক বৃদ্ধি:</span>
                <span className="font-mono font-bold text-emerald-400">+৳{(promoCalc.fixedBasic - baseSalaryForIncrement).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>সরকারি বিধি:</span>
                <span className="text-[10px] text-slate-400">অনুচ্ছেদ ৭(১) ও (২)</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
