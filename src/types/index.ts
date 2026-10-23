export type EmployeeCategory = 
  | 'mes_civilian' // Military Engineer Services Civilian
  | 'defence_civilian' // Defence Civilian (Army/Navy/Air Force workshops & establishments)
  | 'general_civil' // General Civil Administration & Ministries
  | 'autonomous_body'; // Autonomous & Semi-Autonomous Bodies

export type PayScaleVersion = 'scale_2015' | 'scale_2026';

export type FixationStatus = 'pending' | 'calculated' | 'reviewed' | 'finalized';

export interface ServiceEvent {
  id: string;
  employeeId: string;
  effectiveDate: string; // YYYY-MM-DD
  eventType: 'appointment' | 'increment' | 'promotion' | 'higher_grade' | 'time_scale' | 'previous_fixation' | 'transfer' | 'other';
  designation: string;
  grade: number;
  basicSalary: number;
  orderNumber: string;
  orderDate: string;
  issuingAuthority: string;
  remarks?: string;
}

export interface Employee {
  id: string;
  employeeIdNumber: string; // e.g. MES-ENG-4029 or GOV-882190
  nationalId: string;
  nameBangla: string;
  nameEnglish: string;
  fatherName?: string;
  dateOfBirth: string;
  joiningDate: string;
  category: EmployeeCategory;
  ministry: string; // e.g. Ministry of Defence
  department: string; // e.g. Military Engineer Services (MES)
  officeLocation: string; // e.g. HQ CE (Army) Dhaka Cantonment
  currentDesignation: string;
  currentGrade: number; // 1-20
  currentBasicSalary: number;
  payScaleVersion: PayScaleVersion;
  lastIncrementDate: string;
  nextIncrementDate: string;
  prlDate: string; // Post Retirement Leave date
  serviceEvents: ServiceEvent[];
  fixationStatus: FixationStatus;
  statusNotes?: string;
  revisionReason?: string;
  updatedAt: string;
}

export interface PayScaleGrade {
  grade: number;
  gradeNameBangla: string;
  gradeNameEnglish: string;
  scale2015: {
    minimum: number;
    maximum: number;
    steps: number[];
    incrementRatePercent: number;
  };
  scale2026: {
    minimum: number;
    maximum: number;
    steps: number[];
    incrementRatePercent: number;
    stage1EffectiveDate: string; // Basic salary effective date
    stage2EffectiveDate: string; // Allowances effective date
  };
  eligibleClass: 'Class I (Gazetted)' | 'Class II' | 'Class III' | 'Class IV';
}

export interface FixationStepDetail {
  stepNumber: number;
  titleBangla: string;
  titleEnglish: string;
  ruleClause: string;
  descriptionBangla: string;
  descriptionEnglish: string;
  computedValue: number | string;
  passed: boolean;
}

export interface FixationResult {
  employeeId: string;
  calculationDate: string;
  effectiveDate: string;
  existingGrade: number;
  existingBasic: number;
  revisedGrade: number;
  revisedBasic: number;
  personalPay: number; // বেতন সংরক্ষণ (if any)
  totalRevisedPay: number;
  appliedPayStepIndex: number;
  stepsBreakdown: FixationStepDetail[];
  ruleReferences: string[];
  isVerified: boolean;
  warnings: string[];
}

export interface ArrearsMonthItem {
  monthKey: string; // YYYY-MM
  monthNameBangla: string;
  monthNameEnglish: string;
  revisedBasic: number;
  revisedHouseRent: number;
  revisedMedical: number;
  revisedAllowancesTotal: number;
  revisedTotalGross: number;
  drawnBasic: number;
  drawnHouseRent: number;
  drawnMedical: number;
  drawnAllowancesTotal: number;
  drawnTotalGross: number;
  basicDifference: number;
  allowanceDifference: number;
  grossDifference: number;
  adjustmentsDeductions: number;
  netPayableArrears: number;
}

export interface ArrearsCalculationSummary {
  employeeId: string;
  startMonth: string;
  endMonth: string;
  monthsCount: number;
  totalBasicDifference: number;
  totalAllowanceDifference: number;
  totalGrossArrears: number;
  totalAdjustments: number;
  netTotalArrears: number;
  monthlyBreakdown: ArrearsMonthItem[];
  ruleReference: string;
  stagedBasicOnlyPeriod: string;
  stagedAllowancesPeriod: string;
}
