import React, { useState } from 'react';
import { PAY_SCALES_DATA } from '../../data/payScales';
import { TableProperties, Search, ExternalLink, CheckCircle, ShieldCheck } from 'lucide-react';

interface PayScalesTabProps {
  lang: 'bn' | 'en';
}

export const PayScalesTab: React.FC<PayScalesTabProps> = ({ lang }) => {
  const [selectedGradeNum, setSelectedGradeNum] = useState<number>(5);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const selectedGrade = PAY_SCALES_DATA.find(g => g.grade === selectedGradeNum) || PAY_SCALES_DATA[0];

  const filteredGrades = PAY_SCALES_DATA.filter(g => {
    const term = searchTerm.toLowerCase();
    return (
      String(g.grade).includes(term) ||
      g.gradeNameBangla.toLowerCase().includes(term) ||
      g.gradeNameEnglish.toLowerCase().includes(term) ||
      g.eligibleClass.toLowerCase().includes(term)
    );
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            {lang === 'bn' ? 'জাতীয় বেতন স্কেল ও গ্রেড সারণী (২০১৫ বনাম ২০২৬)' : 'National Pay Scales & Grade Matrix (2015 vs 2026)'}
          </h2>
          <p className="text-xs text-slate-500">
            {lang === 'bn'
              ? 'অর্থ বিভাগ ও সরকারি গেজেট অনুমোদিত ১ হতে ২০তম গ্রেডের ধাপভিত্তিক অনুমোদিত বেতন কাঠামো'
              : 'Official Ministry of Finance Gazette pay scale steps for Grades 1 to 20'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold rounded-lg flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            {lang === 'bn' ? 'গেজেট যাচাইকৃত ডেটাসেট' : 'Gazette Verified Data'}
          </span>
        </div>
      </div>

      {/* Grade Selector Strip & Search */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            {lang === 'bn' ? 'গ্রেড নির্বাচন করুন (১ হতে ২০):' : 'Select Grade (1 to 20):'}
          </span>

          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder={lang === 'bn' ? 'গ্রেড বা পদবী খুঁজুন...' : 'Search grade...'}
              className="w-full pl-8 pr-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-slate-50"
            />
          </div>
        </div>

        {/* Buttons for Grades 1-20 */}
        <div className="flex flex-wrap gap-1.5">
          {PAY_SCALES_DATA.map(g => (
            <button
              key={g.grade}
              onClick={() => setSelectedGradeNum(g.grade)}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                selectedGradeNum === g.grade
                  ? 'bg-emerald-800 text-white shadow-sm ring-1 ring-emerald-950'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              Gr-{g.grade}
            </button>
          ))}
        </div>
      </div>

      {/* Selected Grade Detail Card with Pay Steps Ladder */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Grade Meta and Comparison */}
        <div className="space-y-4">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-100 text-emerald-800">
                গ্রেড {selectedGrade.grade} · {selectedGrade.eligibleClass}
              </span>
              <h3 className="text-base font-bold text-slate-900 mt-2">
                {selectedGrade.gradeNameBangla}
              </h3>
              <p className="text-xs text-slate-500 font-mono mt-0.5">{selectedGrade.gradeNameEnglish}</p>
            </div>

            <div className="space-y-3 text-xs">
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                <span className="text-[11px] text-slate-500 block mb-1">
                  {lang === 'bn' ? 'জাতীয় বেতন স্কেল ২০১৫ (বিদ্যমান)' : 'National Pay Scale 2015 (Existing)'}
                </span>
                <div className="font-mono text-sm font-bold text-slate-800">
                  ৳{selectedGrade.scale2015.minimum.toLocaleString()} — ৳{selectedGrade.scale2015.maximum.toLocaleString()}
                </div>
                <span className="text-[10px] text-slate-500 block mt-1">
                  মোট ধাপ: {selectedGrade.scale2015.steps.length} টি · ইনক্রিমেন্ট: {selectedGrade.scale2015.incrementRatePercent}%
                </span>
              </div>

              <div className="bg-emerald-50 p-3 rounded-lg border border-emerald-200">
                <span className="text-[11px] text-emerald-800 font-semibold block mb-1">
                  {lang === 'bn' ? 'সংশোধিত বেতন আদেশ ২০২৬' : 'Revised Pay Order 2026'}
                </span>
                <div className="font-mono text-base font-bold text-emerald-950">
                  ৳{selectedGrade.scale2026.minimum.toLocaleString()} — ৳{selectedGrade.scale2026.maximum.toLocaleString()}
                </div>
                <span className="text-[10px] text-emerald-700 block mt-1">
                  মোট ধাপ: {selectedGrade.scale2026.steps.length} টি · ইনক্রিমেন্ট: {selectedGrade.scale2026.incrementRatePercent}%
                </span>
              </div>

              <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-amber-900 text-[11px] space-y-1">
                <span className="font-bold block">কার্যকর তারিখ ও স্টেজ:</span>
                <p>১ম ধাপ (মূল বেতন): {selectedGrade.scale2026.stage1EffectiveDate}</p>
                <p>২য় ধাপ (ভাতাদি): {selectedGrade.scale2026.stage2EffectiveDate}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right 2 Columns: Full Step Ladder comparison table */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <h4 className="font-bold text-slate-900 text-xs sm:text-sm">
              {lang === 'bn' ? `গ্রেড-${selectedGrade.grade} এর প্রতিটি ধাপের তুলনামূলক বেতন সারণী` : `Grade ${selectedGrade.grade} Pay Step Comparison`}
            </h4>
            <span className="text-xs text-slate-500 font-mono">
              ইনক্রিমেন্ট হার: {selectedGrade.scale2026.incrementRatePercent}%
            </span>
          </div>

          <div className="overflow-x-auto max-h-[500px] overflow-y-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100/80 text-slate-700 font-bold sticky top-0 border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-4 text-center">ধাপ (Step)</th>
                  <th className="py-2.5 px-4 text-right">২০১৫ স্কেলের ধাপ (BDT)</th>
                  <th className="py-2.5 px-4 text-right">২০২৬ সংশোধিত ধাপ (BDT)</th>
                  <th className="py-2.5 px-4 text-right">মাসিক বৃদ্ধি (BDT)</th>
                  <th className="py-2.5 px-4 text-center">শতাংশ বৃদ্ধি</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {selectedGrade.scale2026.steps.map((step2026, idx) => {
                  const step2015 = selectedGrade.scale2015.steps[idx] || selectedGrade.scale2015.maximum;
                  const diff = step2026 - step2015;
                  const percentInc = ((diff / step2015) * 100).toFixed(1);

                  return (
                    <tr key={idx} className="hover:bg-slate-50 transition-colors">
                      <td className="py-2.5 px-4 text-center font-bold text-slate-700">
                        {idx + 1}
                      </td>
                      <td className="py-2.5 px-4 text-right font-mono text-slate-700">
                        ৳{step2015.toLocaleString()}
                      </td>
                      <td className="py-2.5 px-4 text-right font-mono font-bold text-emerald-800 bg-emerald-50/40">
                        ৳{step2026.toLocaleString()}
                      </td>
                      <td className="py-2.5 px-4 text-right font-mono font-semibold text-blue-900">
                        +৳{diff.toLocaleString()}
                      </td>
                      <td className="py-2.5 px-4 text-center font-mono text-[11px] text-emerald-700">
                        +{percentInc}%
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
