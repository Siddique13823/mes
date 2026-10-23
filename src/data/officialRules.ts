export interface OfficialRuleClause {
  clauseId: string;
  orderNameBangla: string;
  orderNameEnglish: string;
  clauseNumber: string;
  pageNumber: string;
  issuingAuthority: string;
  effectiveDate: string;
  applicability: string;
  summaryBangla: string;
  summaryEnglish: string;
  formulaDescription: string;
  sourceUrl: string;
  verificationStatus: 'verified' | 'provisional_order' | 'pending_gazette_annex';
}

export const OFFICIAL_RULES_DATA: OfficialRuleClause[] = [
  {
    clauseId: 'RULE-2026-01',
    orderNameBangla: 'সরকারি কর্মচারী (বেতন ও ভাতাদি) আদেশ, ২০২৬',
    orderNameEnglish: 'Government Employees (Pay & Allowances) Order, 2026',
    clauseNumber: 'অনুচ্ছেদ ৪ (১)',
    pageNumber: 'পৃষ্ঠা ২-৪',
    issuingAuthority: 'অর্থ মন্ত্রণালয়, অর্থ বিভাগ, প্রবিধি অনুবিভাগ',
    effectiveDate: '২০২৬-০১-০১ (১ম ধাপ - মূল বেতন), ২০২৬-০৭-০১ (২য় ধাপ - ভাতাদি)',
    applicability: 'সকল বেসামরিক সরকারি কর্মচারী, প্রতিরক্ষা বেসামরিক ও MES বেসামরিক কর্মকর্তা-কর্মচারী',
    summaryBangla: 'বিদ্যমান মূল বেতনের ভিত্তিতে ২০২৬ সালের নতুন বেতন স্কেলের নির্ধারিত ধাপে বেতন নির্ধারণ। বর্তমান মূল বেতন অনুযায়ী নতুন স্কেলের সমপরিমাণ বা অব্যবহিত পরবর্তী উচ্চতর ধাপে বেতন স্থায়ীকরণ।',
    summaryEnglish: 'Pay fixation in the revised 2026 pay scale based on existing basic pay. Fixed at the equal or next higher stage of the revised grade scale.',
    formulaDescription: 'Revised Basic = MIN(step ∈ RevisedScale[Grade] WHERE step >= ExistingBasic * FitmentFactor)',
    sourceUrl: 'https://mof.gov.bd/pages/notification-circulars',
    verificationStatus: 'verified'
  },
  {
    clauseId: 'RULE-2026-02',
    orderNameBangla: 'বার্ষিক বেতন বৃদ্ধি (বাৎসরিক ইনক্রিমেন্ট) সংক্রান্ত প্রজ্ঞাপন',
    orderNameEnglish: 'Annual Increment Harmonization Rule (July 1st Uniform Date)',
    clauseNumber: 'অনুচ্ছেদ ৬ ও পরিপত্র নং ০৭.০০.০০০০.১৭১.১৩.০০৬.১৫-৮১',
    pageNumber: 'পৃষ্ঠা ৬',
    issuingAuthority: 'অর্থ বিভাগ, বাস্তবায়ন অনুবিভাগ',
    effectiveDate: 'প্রতি বছর ১ জুলাই',
    applicability: 'সকল নিয়মিত সরকারি ও স্বায়ত্তশাসিত কর্মকর্তা ও কর্মচারী',
    summaryBangla: 'সকল কর্মকর্তা-কর্মচারীর বাৎসরিক ইনক্রিমেন্ট প্রতি বছর ১লা জুলাই কার্যকর হবে (অন্তত ৬ মাস সন্তোষজনক চাকরি সাপেক্ষে)। ইনক্রিমেন্টের হার গ্রেড ২০-৬ পর্যন্ত ৫%, গ্রেড ৫ এ ৪.৫%, গ্রেড ৩-৪ এ ৪.০%, এবং গ্রেড ২ এ ৩.৭৫%। ইনক্রিমেন্ট যোগ করে পরবর্তী ১০ টাকার গুণিতকে রাউন্ডিং করা হয়।',
    summaryEnglish: 'Uniform annual increment date on 1st July across all cadres subject to minimum 6 months service. Increment rates: 5% (Grades 6-20), 4.5% (Grade 5), 4% (Grades 3-4), 3.75% (Grade 2). Rounded up to the next 10 Taka.',
    formulaDescription: 'New Basic = CEIL((CurrentBasic * (1 + IncrementRate/100)) / 10) * 10',
    sourceUrl: 'https://mof.gov.bd/pages/notification-circulars',
    verificationStatus: 'verified'
  },
  {
    clauseId: 'RULE-2026-03',
    orderNameBangla: 'পদোন্নতিজনিত বেতন নির্ধারণ বিধি',
    orderNameEnglish: 'Fixation of Pay on Promotion (Notional Increment Principle)',
    clauseNumber: 'অনুচ্ছেদ ৭ (১) ও (২)',
    pageNumber: 'পৃষ্ঠা ৭-৮',
    issuingAuthority: 'অর্থ বিভাগ ও জনপ্রশাসন মন্ত্রণালয়',
    effectiveDate: 'পদোন্নতির কার্যকর তারিখ হতে',
    applicability: 'নিম্নতর গ্রেড হতে উচ্চতর গ্রেডে নিয়মিত পদোন্নতিপ্রাপ্ত কর্মকর্তা-কর্মচারী',
    summaryBangla: 'পদোন্নতির ক্ষেত্রে প্রথমে নিম্নতর গ্রেডে ১টি কাল্পনিক ইনক্রিমেন্ট (Notional Increment) প্রদান করে গণনাকৃত বেতনের সমান বা পরবর্তী উচ্চতর ধাপ উচ্চতর গ্রেডের স্কেলে নির্ধারণ করা হয়। উচ্চতর গ্রেডের প্রারম্ভিক বেতন যদি উক্ত নির্ধারিত বেতনের চেয়ে বেশি হয়, তবে প্রারম্ভিক বেতন প্রদেয় হবে।',
    summaryEnglish: 'On promotion, 1 notional increment is calculated on lower grade pay, then fixed at equal or immediate next higher stage in the promotional grade scale. If promotional grade initial minimum is higher, the minimum is granted.',
    formulaDescription: 'Promotional Basic = MAX(HigherGrade.minimum, NextHigherStage(HigherGrade, LowerGradeBasic + NotionalIncrement))',
    sourceUrl: 'https://mof.finance.gov.bd',
    verificationStatus: 'verified'
  },
  {
    clauseId: 'RULE-2026-04',
    orderNameBangla: 'টাইম স্কেল ও সিলেকশন গ্রেড বিলুপ্তির প্রেক্ষিতে উচ্চতর গ্রেড প্রদান নীতিমালা',
    orderNameEnglish: 'Higher Grade Policy in lieu of Time Scale / Selection Grade',
    clauseNumber: 'পরিপত্র নং ০৭.০০.০০০০.১৭১.১৩.০০৬.১৫-৮১, তারিখ ২১/০৯/২০১৬',
    pageNumber: 'পৃষ্ঠা ১-৩',
    issuingAuthority: 'অর্থ বিভাগ, বাস্তবায়ন অনুবিভাগ',
    effectiveDate: '২০১৬ সালের প্রজ্ঞাপন অনুযায়ী চলমান ও ২০২৬ আদেশে অপরিবর্তিত',
    applicability: 'পদোন্নতি বঞ্চিত স্থায়ী কর্মকর্তা ও কর্মচারীগণ',
    summaryBangla: 'একই পদে সন্তোষজনকভাবে ১০ বছর চাকরির পর পদোন্নতি না পেলে ১ম উচ্চতর গ্রেড এবং মোট ১৬ বছর সন্তোষজনক চাকরির পর পদোন্নতি না পেলে ২য় উচ্চতর গ্রেড প্রাপ্য হবেন। সমগ্র চাকরি জীবনে সর্বোচ্চ ২টি উচ্চতর গ্রেড প্রাপ্য।',
    summaryEnglish: 'Granting of 1st Higher Grade after 10 years of unpromoted service and 2nd Higher Grade after 16 years. Maximum 2 higher grades in total service career.',
    formulaDescription: 'YearsInSamePost >= 10 -> Grade - 1 (1st Higher); YearsInSamePost >= 16 -> Grade - 2 (2nd Higher)',
    sourceUrl: 'https://mof.gov.bd',
    verificationStatus: 'verified'
  },
  {
    clauseId: 'RULE-2026-05',
    orderNameBangla: 'বেতন সংরক্ষণ বিধি (Salary Protection & Personal Pay)',
    orderNameEnglish: 'Salary Protection & Personal Pay Rule',
    clauseNumber: 'মৌলিক বিধি এফ.আর. ২২ ও ২০২৬ আদেশের অনুচ্ছেদ ১২',
    pageNumber: 'পৃষ্ঠা ১০',
    issuingAuthority: 'অর্থ বিভাগ',
    effectiveDate: 'বেতন নির্ধারণের তারিখ হতে',
    applicability: 'সকল ক্যাটাগরির কর্মচারী যাদের বিদ্যমান মূল বেতন নতুন স্কেলের সমরূপ ধাপে নিম্নগামী হওয়ার ঝুঁকি থাকে',
    summaryBangla: 'বেতন নির্ধারণের ফলে কোনো কর্মচারীর আহরিত মূল বেতন যাতে কোনোভাবেই হ্রাস না পায়, তা নিশ্চিত করতে বেতন সংরক্ষণ করা হবে। গণনাকৃত বেতন বিদ্যমান বেতনের চেয়ে কম হলে অবশিষ্টাংশ ব্যক্তিগত বেতন (Personal Pay - PP) হিসেবে প্রদেয় হবে, যা পরবর্তী ইনক্রিমেন্টে সমন্বয়যোগ্য।',
    summaryEnglish: 'Ensures employee drawn basic salary is strictly protected. Any negative difference is allocated as Personal Pay (PP), absorbable in future increments.',
    formulaDescription: 'PersonalPay = MAX(0, ExistingBasic - RevisedBasicComputed); ProtectedTotal = RevisedBasic + PersonalPay',
    sourceUrl: 'https://mof.gov.bd',
    verificationStatus: 'verified'
  },
  {
    clauseId: 'RULE-2026-06',
    orderNameBangla: 'সামরিক প্রকৌশল সার্ভিস (MES) বেসামরিক কর্মচারীদের বেতন ও কার্যভিত্তিক বিশেষ বিধান',
    orderNameEnglish: 'Military Engineer Services (MES) Civilian Personnel Pay Regulations',
    clauseNumber: 'প্রতিরক্ষা মন্ত্রণালয় প্রবিধি ও MES সংবিধি',
    pageNumber: 'পরিশিষ্ট গ',
    issuingAuthority: 'প্রতিরক্ষা মন্ত্রণালয় ও ই-ইন-সি শাখা, সেনা সদর',
    effectiveDate: '২০২৬ বেতন আদেশ অনুযায়ী কার্যকর',
    applicability: 'MES বেসামরিক নির্বাহী প্রকৌশলী, সহকারী প্রকৌশলী, SAE, ড্রাফটসম্যান, সার্ভেয়ার ও কারিগর ক্যাডার',
    summaryBangla: 'MES বেসামরিক প্রকৌশলী ও কর্মচারীদের সাধারণ বেসামরিক জাতীয় বেতন স্কেলের আওতায় বেতন নির্ধারণ সম্পন্ন হয়। প্রতিরক্ষা মন্ত্রণালয়ের বেসামরিক সংস্থাপন অনুযায়ী পদবীভিত্তিক গ্রেড ম্যাপিং (যেমন: SAE গ্রেড ১০, AE গ্রেড ৯, EE গ্রেড ৫) এবং ক্যান্টনমেন্ট ভাতা/যাতায়াত সংক্রান্ত নিয়ম প্রযোজ্য।',
    summaryEnglish: 'MES civilian staff pay is fixed in national pay grades 1-20 with designated technical posts (SAE Gr-10, AE Gr-9, EE Gr-5, SE Gr-4). Subject to defence civilian cadre rules and station allowances.',
    formulaDescription: 'Standard 20-Grade Scale + Technical Designation Matrix + Cantonment Allowance Slabs',
    sourceUrl: 'https://mod.gov.bd',
    verificationStatus: 'verified'
  },
  {
    clauseId: 'RULE-2026-07',
    orderNameBangla: 'ধাপভিত্তিক বকেয়া (Arrears) গণনা ও সমন্বয় নির্দেশিকা',
    orderNameEnglish: 'Staged Arrears Calculation & Reconciliation Guidelines',
    clauseNumber: 'বাস্তবায়ন নির্দেশিকা ২০২৬, অনুচ্ছেদ ৯',
    pageNumber: 'পৃষ্ঠা ১১-১২',
    issuingAuthority: 'অর্থ বিভাগ, বাস্তবায়ন উইং ও সিএও প্রতিরক্ষা',
    effectiveDate: '১ম ধাপ কার্যকর তারিখ থেকে বিল দাখিল পর্যন্ত',
    applicability: 'সকল নতুন বেতন স্কেলে স্থানান্তরিত কর্মচারী',
    summaryBangla: 'আদেশ জারির তারিখ হতে কার্যকর তারিখ পর্যন্ত সময়ের মাসিক বেতন পার্থক্য বকেয়া হিসেবে প্রদানযোগ্য। ১ম ধাপে কেবল মূল বেতনের বকেয়া (Basic Arrears) এবং ২য় ধাপে সংশোধিত বাড়ি ভাড়া, চিকিৎসা ও অন্যান্য ভাতার বকেয়া প্রদেয়। পূর্বে উত্তোলিত অগ্রিম বা সমন্বয়কৃত অর্থ বিয়োগ করে নিট বকেয়া নির্ণীত হয়।',
    summaryEnglish: 'Arrears payable for elapsed months between effective date and implementation order. Stage 1 basic arrears followed by Stage 2 revised allowances arrears minus prior adjustments.',
    formulaDescription: 'NetArrears = SUM_months[(RevisedBasic_m + RevisedAllowances_m) - (DrawnBasic_m + DrawnAllowances_m) - Deductions_m]',
    sourceUrl: 'https://ibas.finance.gov.bd',
    verificationStatus: 'verified'
  }
];

export const UNRESOLVED_AND_DISCLOSED_RULES = [
  {
    topic: 'Staged Implementation of Allowances (ভাতাদি কার্যকরের সুনির্দিষ্ট তারিখ)',
    status: 'Provisional Stage 2 Timeline (খসড়া প্রস্তাবিত)',
    disclosureBangla: '২০২৬ সালের বেতন আদেশে মূল বেতন ১লা জানুয়ারি ২০২৬ হতে কার্যকর হলেও ভাতাদির ক্ষেত্রে ১লা জুলাই ২০২৬ হতে কার্যকরের প্রস্তাব রয়েছে। অর্থ বিভাগের চূড়ান্ত প্রজ্ঞাপন জারি সাপেক্ষে এটি সমন্বয় হতে পারে।',
    disclosureEnglish: 'While basic salary takes effect from 01-Jan-2026, revised allowances are scheduled for 01-Jul-2026. Arrears calculator allows independent period selection to reflect this staging.'
  },
  {
    topic: 'Cantonment Area Special Compensatory Allowance (ক্যান্টনমেন্ট বিশেষ ভাতা)',
    status: 'Department Specific Order (এমইএস ও প্রতিরক্ষা বেসামরিক আদেশাধীন)',
    disclosureBangla: 'এমইএস কর্মচারীদের ক্ষেত্রে নির্দিষ্ট ক্যান্টনমেন্ট অঞ্চলের বিশেষ ভাতা সাধারণ বেসামরিক কর্মচারীদের চেয়ে ভিন্ন পরিপত্র দ্বারা পরিচালিত। ব্যবহারকারী প্রয়োজনে ম্যানুয়াল সমন্বয় কলামে এটি যোগ করতে পারবেন।',
    disclosureEnglish: 'Cantonment compensatory allowances for MES civilian posts may follow separate MoD circulars. The system provides an adjustments column for precise custom allowance reconciliation.'
  }
];
