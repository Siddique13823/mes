import { Employee, FixationResult, FixationStepDetail, ArrearsCalculationSummary, ArrearsMonthItem } from '../types';
import { PAY_SCALES_DATA, ALLOWANCE_CONFIG } from '../data/payScales';

/**
 * Finds the step index of a basic salary in a given grade's step list.
 */
export function findPayStepIndex(steps: number[], basic: number): number {
  const index = steps.findIndex(step => step === basic);
  if (index !== -1) return index;

  // If not exact, find the closest step <= basic
  for (let i = steps.length - 1; i >= 0; i--) {
    if (basic >= steps[i]) return i;
  }
  return 0;
}

/**
 * Calculates Pay Fixation in Revised Pay Scale 2026 according to Official Pay Order 2026.
 */
export function calculatePayFixation(employee: Employee, effectiveDate: string = '2026-01-01'): FixationResult {
  const warnings: string[] = [];
  const stepsBreakdown: FixationStepDetail[] = [];
  const ruleReferences: string[] = ['RULE-2026-01', 'RULE-2026-05'];

  const gradeData = PAY_SCALES_DATA.find(g => g.grade === employee.currentGrade);
  if (!gradeData) {
    throw new Error(`Invalid grade: ${employee.currentGrade}`);
  }

  // Step 1: Validate Employee & Existing Basic Salary
  const existingBasic = employee.currentBasicSalary;
  const is2015Valid = gradeData.scale2015.steps.includes(existingBasic);
  if (!is2015Valid) {
    warnings.push(`বিদ্যমান মূল বেতন (${existingBasic.toLocaleString('bn-BD')} টাকা) ২০১৫ বেতন স্কেলের অনুমোদিত ধাপে সরাসরি মেলেনি। নিকটবর্তী অনুমোদিত ধাপ বিবেচনা করা হয়েছে।`);
  }

  stepsBreakdown.push({
    stepNumber: 1,
    titleBangla: 'বিদ্যমান মূল বেতন ও স্কেল যাচাইকরণ',
    titleEnglish: 'Verification of Existing Grade and Basic Salary',
    ruleClause: 'অনুচ্ছেদ ৩ (১) - বিদ্যমান বেতন যাচাই',
    descriptionBangla: `কর্মচারীর বর্তমান গ্রেড: ${gradeData.gradeNameBangla}, মূল বেতন: ${existingBasic.toLocaleString('en-US')} টাকা।`,
    descriptionEnglish: `Current Grade: ${employee.currentGrade}, Existing Basic: Tk. ${existingBasic.toLocaleString('en-US')}`,
    computedValue: existingBasic,
    passed: true
  });

  // Step 2: Determine Step Index in Existing 2015 Scale
  const existingStepIndex = findPayStepIndex(gradeData.scale2015.steps, existingBasic);
  const totalSteps2015 = gradeData.scale2015.steps.length;

  stepsBreakdown.push({
    stepNumber: 2,
    titleBangla: 'বিদ্যমান স্কেলে অর্জিত ধাপ (Pay Step) নির্ধারণ',
    titleEnglish: 'Determination of Existing Pay Step Index',
    ruleClause: 'অনুচ্ছেদ ৪ (১) - ধাপ ম্যাপিং বিধিমালা',
    descriptionBangla: `কর্মচারী ২০১৫ বেতন স্কেলের ${existingStepIndex + 1}তম ধাপে অধিষ্ঠিত আছেন (মোট ধাপ: ${totalSteps2015})।`,
    descriptionEnglish: `Employee is at step index ${existingStepIndex + 1} of ${totalSteps2015} in 2015 pay scale.`,
    computedValue: `ধাপ নং ${existingStepIndex + 1}`,
    passed: true
  });

  // Step 3: Map to Revised 2026 Scale
  const steps2026 = gradeData.scale2026.steps;
  let targetStepIndex = Math.min(existingStepIndex, steps2026.length - 1);
  let computedRevisedBasic = steps2026[targetStepIndex];

  // Guarantee minimum fitment factor
  if (computedRevisedBasic < gradeData.scale2026.minimum) {
    computedRevisedBasic = gradeData.scale2026.minimum;
    targetStepIndex = 0;
  }

  stepsBreakdown.push({
    stepNumber: 3,
    titleBangla: '২০২৬ সংশোধিত স্কেলে সমরূপ ধাপ নির্বাচন',
    titleEnglish: 'Selection of Corresponding Step in Revised 2026 Scale',
    ruleClause: 'অনুচ্ছেদ ৪ (২) - ২০২৬ বেতন সারণী',
    descriptionBangla: `২০২৬ স্কেলের গ্রেড-${employee.currentGrade}-এর ${targetStepIndex + 1}তম ধাপ অনুযায়ী মূল বেতন নির্ধারিত হলো: ${computedRevisedBasic.toLocaleString('en-US')} টাকা।`,
    descriptionEnglish: `Selected Step ${targetStepIndex + 1} in Revised 2026 Scale: Tk. ${computedRevisedBasic.toLocaleString('en-US')}`,
    computedValue: computedRevisedBasic,
    passed: true
  });

  // Step 4: Salary Protection Check (বেতন সংরক্ষণ - FR 22 / Clause 12)
  let personalPay = 0;
  if (computedRevisedBasic < existingBasic) {
    personalPay = existingBasic - computedRevisedBasic;
    warnings.push(`বেতন সংরক্ষণ বিধি অনুসারে ${personalPay.toLocaleString('en-US')} টাকা ব্যক্তিগত বেতন (Personal Pay) হিসেবে বরাদ্দ করা হয়েছে।`);
  }

  stepsBreakdown.push({
    stepNumber: 4,
    titleBangla: 'বেতন সংরক্ষণ ও ব্যক্তিগত বেতন (Personal Pay) যাচাই',
    titleEnglish: 'Salary Protection & Personal Pay Validation',
    ruleClause: 'অনুচ্ছেদ ১২ ও এফ.আর. ২২ - বেতন সংরক্ষণ',
    descriptionBangla: personalPay > 0 
      ? `মূল বেতন সংরক্ষিত করতে ${personalPay.toLocaleString('en-US')} টাকা ব্যক্তিগত বেতন যুক্ত হলো।`
      : 'সংশোধিত মূল বেতন বিদ্যমান বেতনের চেয়ে উচ্চতর হওয়ায় কোনো ব্যক্তিগত বেতন (Personal Pay) প্রয়োজন নেই।',
    descriptionEnglish: personalPay > 0
      ? `Personal Pay of Tk. ${personalPay} allocated to protect drawn basic.`
      : 'Revised basic exceeds existing basic. No Personal Pay required.',
    computedValue: personalPay > 0 ? `+${personalPay} (PP)` : '0 (PP)',
    passed: true
  });

  // Step 5: Final Pay Fixation Figure
  const totalRevisedPay = computedRevisedBasic + personalPay;
  stepsBreakdown.push({
    stepNumber: 5,
    titleBangla: 'চূড়ান্ত নির্ধারিত মূল বেতন',
    titleEnglish: 'Final Fixed Revised Basic Salary',
    ruleClause: 'অনুচ্ছেদ ৪ ও ৫ - চূড়ান্ত বেতন স্থায়ীকরণ',
    descriptionBangla: `কার্যকর তারিখ (${effectiveDate}) হতে নির্ধারিত মোট মূল বেতন: ${totalRevisedPay.toLocaleString('en-US')} টাকা।`,
    descriptionEnglish: `Final revised basic salary w.e.f ${effectiveDate}: Tk. ${totalRevisedPay.toLocaleString('en-US')}`,
    computedValue: totalRevisedPay,
    passed: true
  });

  return {
    employeeId: employee.id,
    calculationDate: new Date().toISOString().split('T')[0],
    effectiveDate,
    existingGrade: employee.currentGrade,
    existingBasic,
    revisedGrade: employee.currentGrade,
    revisedBasic: computedRevisedBasic,
    personalPay,
    totalRevisedPay,
    appliedPayStepIndex: targetStepIndex,
    stepsBreakdown,
    ruleReferences,
    isVerified: true,
    warnings
  };
}

/**
 * Calculates annual increment on 1st July under Rule 6.
 */
export function calculateAnnualIncrement(grade: number, currentBasic: number): {
  newBasic: number;
  incrementAmount: number;
  ratePercent: number;
  ruleClause: string;
} {
  const gradeData = PAY_SCALES_DATA.find(g => g.grade === grade);
  if (!gradeData) throw new Error(`Invalid grade: ${grade}`);

  const ratePercent = gradeData.scale2026.incrementRatePercent;
  if (ratePercent === 0) {
    return {
      newBasic: currentBasic,
      incrementAmount: 0,
      ratePercent: 0,
      ruleClause: 'গ্রেড-১ নির্ধারিত (Fixed) বেতন, কোনো বাৎসরিক ইনক্রিমেন্ট প্রযোজ্য নয়।'
    };
  }

  // Formula: increment = currentBasic * ratePercent / 100, round up to next 10 Tk
  const rawIncrement = (currentBasic * ratePercent) / 100;
  const incrementAmount = Math.ceil(rawIncrement / 10) * 10;
  const tentativeBasic = currentBasic + incrementAmount;

  // Cap at grade maximum if defined
  const maxBasic = gradeData.scale2026.maximum;
  const newBasic = Math.min(tentativeBasic, maxBasic);

  return {
    newBasic,
    incrementAmount: newBasic - currentBasic,
    ratePercent,
    ruleClause: `অনুচ্ছেদ ৬ - বাৎসরিক ইনক্রিমেন্ট (${ratePercent}%), পরবর্তী ১০ টাকার গুণিতকে রাউন্ডিং`
  };
}

/**
 * Calculates Fixation on Promotion (Notional Increment Principle) under Rule 7.
 */
export function calculatePromotionFixation(
  currentGrade: number,
  currentBasic: number,
  promotedGrade: number
): {
  lowerGradeNotionalBasic: number;
  notionalIncrement: number;
  promotedGradeInitial: number;
  fixedBasic: number;
  selectedStepIndex: number;
  ruleCitation: string;
  steps: string[];
} {
  const lowerGradeData = PAY_SCALES_DATA.find(g => g.grade === currentGrade);
  const higherGradeData = PAY_SCALES_DATA.find(g => g.grade === promotedGrade);

  if (!lowerGradeData || !higherGradeData) {
    throw new Error('Invalid grade specified');
  }

  if (promotedGrade >= currentGrade) {
    throw new Error('Promoted grade must be higher than current grade (numerically lower).');
  }

  // 1. One notional increment in lower grade
  const ratePercent = lowerGradeData.scale2026.incrementRatePercent;
  const rawNotionalInc = (currentBasic * ratePercent) / 100;
  const notionalIncrement = Math.ceil(rawNotionalInc / 10) * 10;
  const lowerGradeNotionalBasic = currentBasic + notionalIncrement;

  // 2. Look up in higher grade steps
  const higherSteps = higherGradeData.scale2026.steps;
  const promotedGradeInitial = higherGradeData.scale2026.minimum;

  let fixedBasic = promotedGradeInitial;
  let selectedStepIndex = 0;

  // If notional basic is less than higher grade initial, grant higher grade initial
  if (lowerGradeNotionalBasic <= promotedGradeInitial) {
    fixedBasic = promotedGradeInitial;
    selectedStepIndex = 0;
  } else {
    // Find equal or next higher stage in higher grade
    const stepIdx = higherSteps.findIndex(s => s >= lowerGradeNotionalBasic);
    if (stepIdx !== -1) {
      fixedBasic = higherSteps[stepIdx];
      selectedStepIndex = stepIdx;
    } else {
      // Exceeds higher grade maximum, capped at max
      fixedBasic = higherGradeData.scale2026.maximum;
      selectedStepIndex = higherSteps.length - 1;
    }
  }

  const steps = [
    `১. বর্তমান গ্রেড ${currentGrade}-এ ১টি কাল্পনিক ইনক্রিমেন্ট (${ratePercent}% হারে ${notionalIncrement} টাকা) যোগ করে দাঁড়ায়: ${lowerGradeNotionalBasic.toLocaleString('en-US')} টাকা।`,
    `২. পদোন্নতিপ্রাপ্ত গ্রেড ${promotedGrade}-এর প্রারম্ভিক বেতন: ${promotedGradeInitial.toLocaleString('en-US')} টাকা।`,
    `৩. পদোন্নতিপ্রাপ্ত স্কেলের নির্ধারিত সমরূপ বা পরবর্তী উচ্চতর ধাপ (${selectedStepIndex + 1}তম ধাপ) অনুযায়ী চূড়ান্ত বেতন: ${fixedBasic.toLocaleString('en-US')} টাকা।`
  ];

  return {
    lowerGradeNotionalBasic,
    notionalIncrement,
    promotedGradeInitial,
    fixedBasic,
    selectedStepIndex,
    ruleCitation: 'সরকারি কর্মচারী (বেতন ও ভাতাদি) আদেশ ২০২৬, অনুচ্ছেদ ৭ (১) ও (২) - কাল্পনিক ইনক্রিমেন্ট ও পদোন্নতি বেতন নির্ধারণ',
    steps
  };
}

/**
 * Calculates month-by-month Arrears (বকেয়া বেতন) from Stage 1 effective date.
 */
export function calculateArrears(
  employee: Employee,
  revisedBasic: number,
  startYearMonth: string = '2026-01',
  endYearMonth: string = '2026-06',
  allowanceStageStartYearMonth: string = '2026-07'
): ArrearsCalculationSummary {
  const drawnBasic = employee.currentBasicSalary;
  const monthlyBreakdown: ArrearsMonthItem[] = [];

  const [startYear, startMonth] = startYearMonth.split('-').map(Number);
  const [endYear, endMonth] = endYearMonth.split('-').map(Number);

  const monthNamesBangla = [
    'জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন',
    'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'
  ];
  const monthNamesEnglish = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  let currentYear = startYear;
  let currentM = startMonth;

  let totalBasicDifference = 0;
  let totalAllowanceDifference = 0;
  let totalAdjustments = 0;

  while (currentYear < endYear || (currentYear === endYear && currentM <= endMonth)) {
    const monthKey = `${currentYear}-${String(currentM).padStart(2, '0')}`;
    const mNameBn = `${monthNamesBangla[currentM - 1]} ${currentYear}`;
    const mNameEn = `${monthNamesEnglish[currentM - 1]} ${currentYear}`;

    // Calculate drawn allowances (2015 scale rules)
    const drawnHouseRent = Math.round((drawnBasic * ALLOWANCE_CONFIG.houseRentMetroDhakaPercent) / 100);
    const drawnMedical = ALLOWANCE_CONFIG.medicalAllowanceFixed2015;
    const drawnAllowancesTotal = drawnHouseRent + drawnMedical;
    const drawnTotalGross = drawnBasic + drawnAllowancesTotal;

    // Check if allowances have taken effect in this month (Stage 2)
    const isAllowanceStageActive = monthKey >= allowanceStageStartYearMonth;

    const currentRevisedBasic = revisedBasic;
    const revisedHouseRent = isAllowanceStageActive
      ? Math.round((currentRevisedBasic * ALLOWANCE_CONFIG.houseRentMetroDhakaPercent) / 100)
      : drawnHouseRent;
    const revisedMedical = isAllowanceStageActive
      ? ALLOWANCE_CONFIG.medicalAllowanceFixed2026
      : drawnMedical;
    const revisedAllowancesTotal = revisedHouseRent + revisedMedical;
    const revisedTotalGross = currentRevisedBasic + revisedAllowancesTotal;

    const basicDiff = currentRevisedBasic - drawnBasic;
    const allowanceDiff = revisedAllowancesTotal - drawnAllowancesTotal;
    const grossDiff = revisedTotalGross - drawnTotalGross;
    const adjustments = 0; // Standard no adjustment deduction unless specified
    const netPayable = grossDiff - adjustments;

    totalBasicDifference += basicDiff;
    totalAllowanceDifference += allowanceDiff;
    totalAdjustments += adjustments;

    monthlyBreakdown.push({
      monthKey,
      monthNameBangla: mNameBn,
      monthNameEnglish: mNameEn,
      revisedBasic: currentRevisedBasic,
      revisedHouseRent,
      revisedMedical,
      revisedAllowancesTotal,
      revisedTotalGross,
      drawnBasic,
      drawnHouseRent,
      drawnMedical,
      drawnAllowancesTotal,
      drawnTotalGross,
      basicDifference: basicDiff,
      allowanceDifference: allowanceDiff,
      grossDifference: grossDiff,
      adjustmentsDeductions: adjustments,
      netPayableArrears: netPayable
    });

    currentM++;
    if (currentM > 12) {
      currentM = 1;
      currentYear++;
    }
  }

  const totalGrossArrears = totalBasicDifference + totalAllowanceDifference;
  const netTotalArrears = totalGrossArrears - totalAdjustments;

  return {
    employeeId: employee.id,
    startMonth: startYearMonth,
    endMonth: endYearMonth,
    monthsCount: monthlyBreakdown.length,
    totalBasicDifference,
    totalAllowanceDifference,
    totalGrossArrears,
    totalAdjustments,
    netTotalArrears,
    monthlyBreakdown,
    ruleReference: 'বাস্তবায়ন নির্দেশিকা ২০২৬, অনুচ্ছেদ ৯ - বকেয়া বিল প্রণয়ন ও অর্থ বিভাগ নির্দেশিকা',
    stagedBasicOnlyPeriod: `${startYearMonth} হতে ${allowanceStageStartYearMonth > endYearMonth ? endYearMonth : allowanceStageStartYearMonth} (কেবল মূল বেতন বকেয়া)`,
    stagedAllowancesPeriod: `${allowanceStageStartYearMonth} হতে পরবর্তী (সংশোধিত ভাতাদিসহ)`
  };
}
