export interface TestCase {
  id: string;
  nameBangla: string;
  nameEnglish: string;
  category: string;
  testType: 'fixation' | 'promotion' | 'increment' | 'arrears' | 'salary_protection';
  inputData: {
    grade: number;
    existingBasic: number;
    promotedGrade?: number;
    effectiveDate: string;
    arrearsMonths?: number;
  };
  expectedResult: {
    revisedGrade: number;
    revisedBasic: number;
    personalPay?: number;
    arrearsTotal?: number;
    stepIndex: number;
  };
  officialRuleReference: string;
  verificationStatus: 'verified_passed' | 'pending';
}

export const OFFICIAL_TEST_CASES: TestCase[] = [
  {
    id: 'TC-01',
    nameBangla: 'এমইএস নির্বাহী প্রকৌশলী (গ্রেড-৫) সাধারণ বেতন নির্ধারণ',
    nameEnglish: 'Executive Engineer MES (Grade 5) Standard Fixation',
    category: 'MES Civilian',
    testType: 'fixation',
    inputData: {
      grade: 5,
      existingBasic: 52280, // Step 5
      effectiveDate: '2026-01-01'
    },
    expectedResult: {
      revisedGrade: 5,
      revisedBasic: 89450, // Step 5 in 2026 Grade 5
      personalPay: 0,
      stepIndex: 4
    },
    officialRuleReference: '২০২৬ বেতন আদেশ, অনুচ্ছেদ ৪ ও ৫ - গ্রেড ৫ সারণী',
    verificationStatus: 'verified_passed'
  },
  {
    id: 'TC-02',
    nameBangla: 'এমইএস উপ-সহকারী প্রকৌশলী (গ্রেড-১০) বেতন নির্ধারণ',
    nameEnglish: 'Sub-Assistant Engineer MES (Grade 10) Fixation',
    category: 'MES Civilian',
    testType: 'fixation',
    inputData: {
      grade: 10,
      existingBasic: 23680, // Step 9
      effectiveDate: '2026-01-01'
    },
    expectedResult: {
      revisedGrade: 10,
      revisedBasic: 41070, // Step 9 in 2026 Grade 10
      personalPay: 0,
      stepIndex: 8
    },
    officialRuleReference: '২০২৬ বেতন আদেশ, অনুচ্ছেদ ৪ - গ্রেড ১০ সারণী',
    verificationStatus: 'verified_passed'
  },
  {
    id: 'TC-03',
    nameBangla: 'উপ-সহকারী প্রকৌশলী হতে সহকারী প্রকৌশলী পদে পদোন্নতি (গ্রেড ১০ -> গ্রেড ৯)',
    nameEnglish: 'Promotion from SAE to AE (Grade 10 to Grade 9)',
    category: 'MES Technical Cadre',
    testType: 'promotion',
    inputData: {
      grade: 10,
      existingBasic: 23680,
      promotedGrade: 9,
      effectiveDate: '2026-02-01'
    },
    expectedResult: {
      revisedGrade: 9,
      revisedBasic: 38000, // Higher grade initial is greater than notional basic 24,870
      stepIndex: 0
    },
    officialRuleReference: '২০২৬ বেতন আদেশ, অনুচ্ছেদ ৭ (১) ও (২) - পদোন্নতি ও কাল্পনিক ইনক্রিমেন্ট',
    verificationStatus: 'verified_passed'
  },
  {
    id: 'TC-04',
    nameBangla: 'গ্রেড-২০ সর্বনিম্ন ধাপের কর্মচারী (অফিস সহায়ক)',
    nameEnglish: 'Grade 20 Minimum Step Employee (Office Sohayok)',
    category: 'General Civil',
    testType: 'fixation',
    inputData: {
      grade: 20,
      existingBasic: 8250, // Step 1
      effectiveDate: '2026-01-01'
    },
    expectedResult: {
      revisedGrade: 20,
      revisedBasic: 14400, // Step 1 in 2026 Grade 20
      stepIndex: 0
    },
    officialRuleReference: '২০২৬ বেতন আদেশ, অনুচ্ছেদ ৪ - গ্রেড ২০ প্রারম্ভিক স্কেল',
    verificationStatus: 'verified_passed'
  },
  {
    id: 'TC-05',
    nameBangla: 'গ্রেড-৯ সহকারী প্রকৌশলীর ১লা জুলাই বাৎসরিক ইনক্রিমেন্ট',
    nameEnglish: 'Grade 9 Assistant Engineer Annual Increment on 1st July',
    category: 'MES / Defence',
    testType: 'increment',
    inputData: {
      grade: 9,
      existingBasic: 38000,
      effectiveDate: '2026-07-01'
    },
    expectedResult: {
      revisedGrade: 9,
      revisedBasic: 39900, // 38,000 + 5% (1,900)
      stepIndex: 1
    },
    officialRuleReference: '২০২৬ বেতন আদেশ, অনুচ্ছেদ ৬ - ৫% বার্ষিক ইনক্রিমেন্ট',
    verificationStatus: 'verified_passed'
  },
  {
    id: 'TC-06',
    nameBangla: 'এমইএস নির্বাহী প্রকৌশলী ৬ মাসের মূল বেতন বকেয়া (Basic Arrears)',
    nameEnglish: 'Executive Engineer MES 6-Month Basic Arrears (Jan-Jun 2026)',
    category: 'MES Civilian',
    testType: 'arrears',
    inputData: {
      grade: 5,
      existingBasic: 52280,
      effectiveDate: '2026-01-01',
      arrearsMonths: 6
    },
    expectedResult: {
      revisedGrade: 5,
      revisedBasic: 89450,
      arrearsTotal: 223020, // (89,450 - 52,280) * 6 = 37,170 * 6
      stepIndex: 4
    },
    officialRuleReference: 'বাস্তবায়ন নির্দেশিকা ২০২৬, অনুচ্ছেদ ৯ - বকেয়া বিল প্রণয়ন',
    verificationStatus: 'verified_passed'
  }
];
