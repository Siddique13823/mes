import React, { useState } from 'react';
import { Employee, FixationStatus } from '../../types';
import { calculatePayFixation } from '../../utils/fixationEngine';
import { PAY_SCALES_DATA } from '../../data/payScales';
import {
  Calculator,
  CheckCircle2,
  AlertTriangle,
  FileSpreadsheet,
  Save,
  RotateCcw,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Building
} from 'lucide-react';

interface FixationCalculatorTabProps {
  selectedEmployee: Employee;
  onUpdateEmployee: (emp: Employee) => void;
  onDownloadExcel: (emp: Employee) => void;
  onNavigateTab: (tab: any) => void;
  lang: 'bn' | 'en';
}

export const FixationCalculatorTab: React.FC<FixationCalculatorTabProps> = ({
  selectedEmployee,
  onUpdateEmployee,
  onDownloadExcel,
  onNavigateTab,
  lang
}) => {
  const [calculationStage, setCalculationStage] = useState<'idle' | 'running' | 'completed'>('completed');
  const [activeStepIndex, setActiveStepIndex] = useState<number>(4);
  const [effectiveDate, setEffectiveDate] = useState<string>('2026-01-01');
  const [fixationStatus, setFixationStatus] = useState<FixationStatus>(selectedEmployee.fixationStatus);
  const [statusNotes, setStatusNotes] = useState<string>(selectedEmployee.statusNotes || '');
  const [revisionReason, setRevisionReason] = useState<string>(selectedEmployee.revisionReason || '২০২৬ আদেশের আলোকে ধাপভিত্তিক রূপান্তর');
  const [savedAlert, setSavedAlert] = useState<boolean>(false);

  const fixationResult = calculatePayFixation(selectedEmployee, effectiveDate);
  const currentGradeData = PAY_SCALES_DATA.find(g => g.grade === selectedEmployee.currentGrade)!;

  const handleSimulateSteps = () => {
    setCalculationStage('running');
    setActiveStepIndex(0);

    let step = 0;
    const interval = setInterval(() => {
      step++;
      setActiveStepIndex(step);
      if (step >= 4) {
        clearInterval(interval);
        setCalculationStage('completed');
      }
    }, 300);
  };

  const handleSaveFixation = () => {
    const updated: Employee = {
      ...selectedEmployee,
      fixationStatus,
      statusNotes,
      revisionReason,
      updatedAt: new Date().toISOString()
    };
    onUpdateEmployee(updated);
    setSavedAlert(true);
    setTimeout(() => setSavedAlert(false), 3000);
  };

  const stepperItems = [
    { titleBn: '১. কর্মচারী যাচাই', titleEn: '1. Validate Info' },
    { titleBn: '২. ধাপ ম্যাপিং', titleEn: '2. Step Index' },
    { titleBn: '৩. ২০২৬ স্কেল নির্ধারণ', titleEn: '3. Revised Scale' },
    { titleBn: '৪. বেতন সংরক্ষণ', titleEn: '4. Pay Protection' },
    { titleBn: '৫. চূড়ান্ত বেতন', titleEn: '5. Final Fixation' }
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner and Quick Actions */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
              {selectedEmployee.category === 'mes_civilian' ? 'Military Engineer Services (MES)' : 'Defence / Civil Service'}
            </span>
            <span className="text-xs text-slate-400">·</span>
            <span className="text-xs font-mono text-slate-500">{selectedEmployee.employeeIdNumber}</span>
          </div>
          <h2 className="text-lg font-bold text-slate-900">
            {selectedEmployee.nameBangla} — {lang === 'bn' ? 'বেতন নির্ধারণ ২০২৬' : 'Pay Fixation 2026'}
          </h2>
          <p className="text-xs text-slate-500">
            {selectedEmployee.currentDesignation} · {selectedEmployee.department} · {selectedEmployee.officeLocation}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleSimulateSteps}
            className="px-3.5 py-2 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{lang === 'bn' ? 'পুনঃগণনা অ্যানিমেশন' : 'Re-run Calculation'}</span>
          </button>

          <button
            onClick={() => onDownloadExcel(selectedEmployee)}
            className="px-3.5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
            <span>{lang === 'bn' ? 'এক্সেল স্টেটমেন্ট' : 'Download Excel'}</span>
          </button>
        </div>
      </div>

      {/* Animated Calculation Stepper */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">
          {lang === 'bn' ? 'বেতন স্থায়ীকরণ প্রক্রিয়া (Step-by-step Traceability)' : 'Fixation Audit Sequence'}
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {stepperItems.map((step, idx) => {
            const isDone = activeStepIndex >= idx;
            const isCurrent = activeStepIndex === idx;
            return (
              <div
                key={idx}
                className={`p-3 rounded-lg border text-left transition-all ${
                  isCurrent
                    ? 'border-emerald-600 bg-emerald-50/80 shadow-sm ring-1 ring-emerald-600'
                    : isDone
                    ? 'border-slate-200 bg-slate-50 text-slate-800'
                    : 'border-slate-100 bg-white text-slate-400 opacity-60'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-bold">
                    {lang === 'bn' ? step.titleBn : step.titleEn}
                  </span>
                  {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />}
                </div>
                <span className="text-[10px] text-slate-500 block">
                  {idx === 0 && 'বিদ্যমান গ্রেড ও বেতন'}
                  {idx === 1 && `${fixationResult.appliedPayStepIndex + 1}তম ধাপ চিহ্নিত`}
                  {idx === 2 && '২০২৬ স্কেলের ধাপ'}
                  {idx === 3 && 'এফ.আর. ২২ বেতন রক্ষা'}
                  {idx === 4 && 'চূড়ান্ত মূল বেতন'}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Calculation Breakdown and Key Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Step-by-Step Detailed Proof */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <span className="font-bold text-slate-900 text-xs sm:text-sm">
                {lang === 'bn' ? 'ধাপভিত্তিক বিস্তারিত হিসাব ও সরকারি বিধি' : 'Detailed Calculation Proof & Legal Clauses'}
              </span>
              <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                <ShieldCheck className="w-4 h-4" />
                {lang === 'bn' ? 'যাচাইকৃত' : 'Audited'}
              </span>
            </div>

            <div className="divide-y divide-slate-100 p-2">
              {fixationResult.stepsBreakdown.map((step) => (
                <div key={step.stepNumber} className="p-3 hover:bg-slate-50/60 transition-colors rounded-lg">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center shrink-0">
                          {step.stepNumber}
                        </span>
                        <h4 className="font-bold text-slate-900 text-xs sm:text-sm">
                          {lang === 'bn' ? step.titleBangla : step.titleEnglish}
                        </h4>
                      </div>
                      <p className="text-xs text-slate-600 pl-7 leading-relaxed">
                        {lang === 'bn' ? step.descriptionBangla : step.descriptionEnglish}
                      </p>
                      <div className="pl-7 text-[11px] text-emerald-800 font-medium">
                        {lang === 'bn' ? `প্রযোজ্য বিধি: ${step.ruleClause}` : `Rule Reference: ${step.ruleClause}`}
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="font-mono tabular-nums text-xs font-bold text-slate-900 bg-slate-100 px-2 py-1 rounded">
                        {typeof step.computedValue === 'number'
                          ? `৳${step.computedValue.toLocaleString()}`
                          : step.computedValue}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Warnings and Notes */}
          {fixationResult.warnings.length > 0 && (
            <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl text-xs text-amber-900 space-y-1">
              <div className="flex items-center gap-2 font-bold text-amber-800">
                <AlertTriangle className="w-4 h-4" />
                <span>{lang === 'bn' ? 'বিশেষ সতর্কতা ও বেতন সংরক্ষণ নির্দেশিকা' : 'Special Fixation Notice'}</span>
              </div>
              {fixationResult.warnings.map((warn, i) => (
                <p key={i} className="pl-6 leading-relaxed">{warn}</p>
              ))}
            </div>
          )}
        </div>

        {/* Right 1 Col: Result Card & Workflow Management */}
        <div className="space-y-4">
          {/* Result Card */}
          <div className="bg-emerald-950 text-white rounded-xl p-5 border border-emerald-900 shadow-md space-y-4">
            <span className="text-[11px] font-semibold text-emerald-400 tracking-wider uppercase block">
              {lang === 'bn' ? 'চূড়ান্ত নির্ধারিত মূল বেতন' : 'Final Fixed Revised Basic'}
            </span>

            <div>
              <div className="text-3xl sm:text-4xl font-extrabold font-mono text-white tracking-tight">
                ৳{fixationResult.totalRevisedPay.toLocaleString()}
              </div>
              <span className="text-xs text-emerald-300 font-medium mt-1 block">
                {lang === 'bn' ? 'কার্যকর তারিখ: ০১ জানুয়ারি ২০২৬' : 'Effective: 01 January 2026'}
              </span>
            </div>

            <div className="pt-3 border-t border-emerald-800/80 space-y-2 text-xs">
              <div className="flex justify-between text-slate-300">
                <span>{lang === 'bn' ? 'বিদ্যমান মূল বেতন (২০১৫):' : 'Existing Basic (2015):'}</span>
                <span className="font-mono font-semibold text-white">৳{selectedEmployee.currentBasicSalary.toLocaleString()}</span>
              </div>

              <div className="flex justify-between text-slate-300">
                <span>{lang === 'bn' ? 'নিট মাসিক মূল বেতন বৃদ্ধি:' : 'Net Monthly Basic Increase:'}</span>
                <span className="font-mono font-bold text-emerald-300">
                  +৳{(fixationResult.totalRevisedPay - selectedEmployee.currentBasicSalary).toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between text-slate-300">
                <span>{lang === 'bn' ? 'ব্যক্তিগত বেতন (PP):' : 'Personal Pay (PP):'}</span>
                <span className="font-mono text-amber-300">৳{fixationResult.personalPay.toLocaleString()}</span>
              </div>

              <div className="flex justify-between text-slate-300">
                <span>{lang === 'bn' ? 'স্কেল ধাপ অবস্থান:' : 'Step Position:'}</span>
                <span className="font-semibold text-white">ধাপ {fixationResult.appliedPayStepIndex + 1}</span>
              </div>
            </div>
          </div>

          {/* Workflow & Status Card */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-3 text-xs">
            <h4 className="font-bold text-slate-900">
              {lang === 'bn' ? 'বেতন স্থায়ীকরণ স্ট্যাটাস ও নোট' : 'Workflow Status & Reason'}
            </h4>

            <div>
              <label className="block text-slate-600 mb-1 font-medium">
                {lang === 'bn' ? 'স্থায়ীকরণ অবস্থা' : 'Fixation Status'}
              </label>
              <select
                value={fixationStatus}
                onChange={e => setFixationStatus(e.target.value as FixationStatus)}
                className="w-full p-2 border border-slate-300 rounded-lg bg-slate-50 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
              >
                <option value="pending">Pending (অপেক্ষমাণ)</option>
                <option value="calculated">Calculated (গণনাকৃত)</option>
                <option value="reviewed">Reviewed (নিরীক্ষিত)</option>
                <option value="finalized">Finalized (চূড়ান্ত অনুমোদিত)</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-600 mb-1 font-medium">
                {lang === 'bn' ? 'কার্যকর তারিখ' : 'Effective Date'}
              </label>
              <input
                type="date"
                value={effectiveDate}
                onChange={e => setEffectiveDate(e.target.value)}
                className="w-full p-2 border border-slate-300 rounded-lg font-mono bg-slate-50 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-600 mb-1 font-medium">
                {lang === 'bn' ? 'সংশোধন বা নির্ধারণের কারণ' : 'Reason for Fixation'}
              </label>
              <input
                type="text"
                value={revisionReason}
                onChange={e => setRevisionReason(e.target.value)}
                className="w-full p-2 border border-slate-300 rounded-lg bg-slate-50 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
              />
            </div>

            <div className="pt-2">
              <button
                onClick={handleSaveFixation}
                className="w-full py-2.5 bg-emerald-800 hover:bg-emerald-700 active:bg-emerald-900 text-white font-semibold rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>{lang === 'bn' ? 'হিসাব সংরক্ষণ করুন' : 'Save Fixation'}</span>
              </button>
            </div>

            {savedAlert && (
              <div className="p-2 bg-emerald-50 border border-emerald-200 text-emerald-800 text-center rounded font-semibold text-[11px]">
                {lang === 'bn' ? '✓ হিসাব সফলভাবে সংরক্ষিত হয়েছে!' : '✓ Fixation saved successfully!'}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
