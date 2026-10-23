import React, { useState } from 'react';
import { OFFICIAL_RULES_DATA, UNRESOLVED_AND_DISCLOSED_RULES } from '../../data/officialRules';
import { BookOpen, ExternalLink, ShieldCheck, AlertCircle, FileText, CheckCircle2 } from 'lucide-react';

interface OfficialRulesTabProps {
  lang: 'bn' | 'en';
}

export const OfficialRulesTab: React.FC<OfficialRulesTabProps> = ({ lang }) => {
  const [selectedRuleId, setSelectedRuleId] = useState<string>(OFFICIAL_RULES_DATA[0].clauseId);

  const selectedRule = OFFICIAL_RULES_DATA.find(r => r.clauseId === selectedRuleId) || OFFICIAL_RULES_DATA[0];

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            {lang === 'bn' ? 'অফিসিয়াল গেজেট, প্রজ্ঞাপন ও বেতন বিধিমালা ২০২৬' : 'Official Gazette, Circulars & Statutory Rules 2026'}
          </h2>
          <p className="text-xs text-slate-500">
            {lang === 'bn'
              ? 'অর্থ মন্ত্রণালয়, অর্থ বিভাগ ও প্রতিরক্ষা মন্ত্রণালয় কর্তৃক জারিকৃত বেতন আদেশ, পরিপত্র ও বিধিগত অনুচ্ছেদ'
              : 'Verifiable legal provisions, circular clauses, formulas, and official implementation guidelines'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="https://mof.gov.bd/pages/notification-circulars"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5"
          >
            <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
            <span>{lang === 'bn' ? 'অর্থ বিভাগ প্রজ্ঞাপন' : 'MoF Circulars'}</span>
          </a>

          <a
            href="https://ibas.finance.gov.bd/login?returnurl=%2Ffixation"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
            <span>{lang === 'bn' ? 'অফিসিয়াল iBAS++ পোর্টাল' : 'iBAS++ Portal'}</span>
          </a>
        </div>
      </div>

      {/* Main Grid: Left Rules List, Right Detail Viewer */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Rules Navigation */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden p-3 space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 px-3 py-2 block">
            {lang === 'bn' ? 'গেজেট ও বিধিমালার সূচি' : 'Statutory Clauses Index'}
          </span>

          {OFFICIAL_RULES_DATA.map(rule => {
            const isSelected = rule.clauseId === selectedRuleId;
            return (
              <button
                key={rule.clauseId}
                onClick={() => setSelectedRuleId(rule.clauseId)}
                className={`w-full text-left p-3 rounded-lg text-xs transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-800 text-white shadow-sm font-semibold'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-[10px] font-mono ${isSelected ? 'text-emerald-200' : 'text-slate-500'}`}>
                    {rule.clauseId}
                  </span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded font-bold ${
                    isSelected ? 'bg-emerald-950 text-emerald-200' : 'bg-slate-100 text-emerald-800'
                  }`}>
                    VERIFIED
                  </span>
                </div>
                <div className="line-clamp-2 leading-snug">
                  {lang === 'bn' ? rule.orderNameBangla : rule.orderNameEnglish}
                </div>
                <div className={`text-[10px] mt-1 ${isSelected ? 'text-emerald-100' : 'text-slate-400'}`}>
                  {rule.clauseNumber}
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Rule Detail Viewer */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-bold bg-emerald-100 text-emerald-800">
                {selectedRule.clauseId}
              </span>
              <span className="text-xs text-slate-400">·</span>
              <span className="text-xs font-semibold text-slate-600">
                {selectedRule.clauseNumber} ({selectedRule.pageNumber})
              </span>
            </div>

            <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
              {lang === 'bn' ? selectedRule.orderNameBangla : selectedRule.orderNameEnglish}
            </h3>
            <p className="text-xs text-slate-500 mt-1 font-medium">
              জারিকারী কর্তৃপক্ষ: {selectedRule.issuingAuthority}
            </p>
          </div>

          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200">
              <div>
                <span className="text-[10px] text-slate-400 block uppercase font-bold">কার্যকর তারিখ</span>
                <span className="font-semibold text-slate-800">{selectedRule.effectiveDate}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block uppercase font-bold">আওতাভুক্ত কর্মচারী</span>
                <span className="font-semibold text-slate-800">{selectedRule.applicability}</span>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 mb-1">
                {lang === 'bn' ? 'বিধিমালার মূল সারসংক্ষেপ:' : 'Statutory Rule Summary:'}
              </h4>
              <p className="text-slate-700 leading-relaxed bg-emerald-50/40 p-3 rounded-lg border border-emerald-100 text-[13px]">
                {lang === 'bn' ? selectedRule.summaryBangla : selectedRule.summaryEnglish}
              </p>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 mb-1">
                {lang === 'bn' ? 'সংশ্লিষ্ট গাণিতিক সূত্র (Algorithm / Formula):' : 'Mathematical Formula / Logic:'}
              </h4>
              <pre className="p-3 bg-slate-900 text-emerald-300 font-mono rounded-lg overflow-x-auto text-[11px]">
                {selectedRule.formulaDescription}
              </pre>
            </div>

            <div className="pt-2 flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-100">
              <span className="flex items-center gap-1.5 text-emerald-800 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                অর্থ বিভাগ ও আইবাস++ সিস্টেম বিধি নিরীক্ষিত
              </span>
              <a
                href={selectedRule.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 hover:underline flex items-center gap-1 font-medium"
              >
                <span>অফিসিয়াল ডকুমেন্ট লিঙ্ক</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Disclosed Unresolved Cases Section */}
      <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-5 space-y-3 text-xs text-amber-950">
        <div className="flex items-center gap-2 font-bold text-amber-900 text-sm">
          <AlertCircle className="w-5 h-5 text-amber-700 shrink-0" />
          <span>অনুল্লেখিত বা খসড়া বিধিসমূহের স্বচ্ছ প্রকাশ (Disclosed Interpretations & Unresolved Cases)</span>
        </div>

        <p className="text-slate-700 leading-relaxed text-[11px]">
          নির্ভুল ও স্বচ্ছ বেতন স্থায়ীকরণের স্বার্থে সরকারি চূড়ান্ত প্রজ্ঞাপন প্রকাশের পূর্ববর্তী সম্ভাব্য ধাপসমূহ নিচে স্পষ্টভাবে প্রকাশ করা হলো:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          {UNRESOLVED_AND_DISCLOSED_RULES.map((item, idx) => (
            <div key={idx} className="p-3 bg-white rounded-lg border border-amber-200 shadow-xs space-y-1">
              <div className="font-bold text-slate-900">{item.topic}</div>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-100 text-amber-900 font-semibold inline-block">
                {item.status}
              </span>
              <p className="text-[11px] text-slate-600 leading-relaxed mt-1">
                {lang === 'bn' ? item.disclosureBangla : item.disclosureEnglish}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
