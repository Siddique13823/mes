import { PayScaleGrade } from '../types';

export const PAY_SCALES_DATA: PayScaleGrade[] = [
  {
    grade: 1,
    gradeNameBangla: 'গ্রেড-১ (সচিব / সমমর্যাদা সম্পন্ন)',
    gradeNameEnglish: 'Grade 1 (Secretary / Equivalent)',
    eligibleClass: 'Class I (Gazetted)',
    scale2015: {
      minimum: 78000,
      maximum: 78000,
      steps: [78000],
      incrementRatePercent: 0
    },
    scale2026: {
      minimum: 135000,
      maximum: 135000,
      steps: [135000],
      incrementRatePercent: 0,
      stage1EffectiveDate: '2026-01-01',
      stage2EffectiveDate: '2026-07-01'
    }
  },
  {
    grade: 2,
    gradeNameBangla: 'গ্রেড-২ (অতিরিক্ত সচিব / প্রধান প্রকৌশলী MES)',
    gradeNameEnglish: 'Grade 2 (Addl Secretary / Chief Engineer MES)',
    eligibleClass: 'Class I (Gazetted)',
    scale2015: {
      minimum: 66000,
      maximum: 76490,
      steps: [66000, 69300, 72770, 76490],
      incrementRatePercent: 3.75
    },
    scale2026: {
      minimum: 115000,
      maximum: 132000,
      steps: [115000, 119310, 123780, 128420, 132000],
      incrementRatePercent: 3.75,
      stage1EffectiveDate: '2026-01-01',
      stage2EffectiveDate: '2026-07-01'
    }
  },
  {
    grade: 3,
    gradeNameBangla: 'গ্রেড-৩ (যুগ্ম সচিব / অতিরিক্ত প্রধান প্রকৌশলী MES)',
    gradeNameEnglish: 'Grade 3 (Joint Secretary / Addl Chief Engineer MES)',
    eligibleClass: 'Class I (Gazetted)',
    scale2015: {
      minimum: 56500,
      maximum: 74400,
      steps: [56500, 59330, 62300, 65420, 68690, 72130, 74400],
      incrementRatePercent: 4.0
    },
    scale2026: {
      minimum: 98000,
      maximum: 128000,
      steps: [98000, 101920, 106000, 110240, 114650, 119240, 124010, 128000],
      incrementRatePercent: 4.0,
      stage1EffectiveDate: '2026-01-01',
      stage2EffectiveDate: '2026-07-01'
    }
  },
  {
    grade: 4,
    gradeNameBangla: 'গ্রেড-৪ (উপসচিব / তত্ত্বাবধায়ক প্রকৌশলী MES - SE)',
    gradeNameEnglish: 'Grade 4 (Superintending Engineer MES - SE)',
    eligibleClass: 'Class I (Gazetted)',
    scale2015: {
      minimum: 50000,
      maximum: 71200,
      steps: [50000, 52500, 55130, 57890, 60790, 63830, 67030, 70390, 71200],
      incrementRatePercent: 4.0
    },
    scale2026: {
      minimum: 87000,
      maximum: 123000,
      steps: [87000, 90480, 94100, 97860, 101770, 105840, 110070, 114470, 119050, 123000],
      incrementRatePercent: 4.0,
      stage1EffectiveDate: '2026-01-01',
      stage2EffectiveDate: '2026-07-01'
    }
  },
  {
    grade: 5,
    gradeNameBangla: 'গ্রেড-৫ (নির্বাহী প্রকৌশলী MES - EE / উপ-পরিচালক)',
    gradeNameEnglish: 'Grade 5 (Executive Engineer MES - EE)',
    eligibleClass: 'Class I (Gazetted)',
    scale2015: {
      minimum: 43000,
      maximum: 69850,
      steps: [43000, 45150, 47410, 49790, 52280, 54900, 57650, 60540, 63570, 66750, 69850],
      incrementRatePercent: 4.5
    },
    scale2026: {
      minimum: 75000,
      maximum: 121000,
      steps: [75000, 78380, 81910, 85600, 89450, 93480, 97690, 102090, 106680, 111480, 116490, 121000],
      incrementRatePercent: 4.5,
      stage1EffectiveDate: '2026-01-01',
      stage2EffectiveDate: '2026-07-01'
    }
  },
  {
    grade: 6,
    gradeNameBangla: 'গ্রেড-৬ (সিনিয়র সহকারী প্রকৌশলী MES / সিনিয়র সহকারী সচিব)',
    gradeNameEnglish: 'Grade 6 (Senior Assistant Engineer MES)',
    eligibleClass: 'Class I (Gazetted)',
    scale2015: {
      minimum: 35500,
      maximum: 67010,
      steps: [35500, 37280, 39150, 41110, 43170, 45330, 47600, 49980, 52480, 55110, 57870, 60770, 63810, 67010],
      incrementRatePercent: 5.0
    },
    scale2026: {
      minimum: 62000,
      maximum: 116000,
      steps: [62000, 65100, 68360, 71780, 75370, 79140, 83100, 87260, 91620, 96200, 101010, 106060, 111360, 116000],
      incrementRatePercent: 5.0,
      stage1EffectiveDate: '2026-01-01',
      stage2EffectiveDate: '2026-07-01'
    }
  },
  {
    grade: 7,
    gradeNameBangla: 'গ্রেড-৭ (সহকারী প্রকৌশলী MES - সিলেকশন / উচ্চতর গ্রেড)',
    gradeNameEnglish: 'Grade 7 (Assistant Engineer MES - Higher Grade)',
    eligibleClass: 'Class I (Gazetted)',
    scale2015: {
      minimum: 29000,
      maximum: 63410,
      steps: [29000, 30450, 31980, 33580, 35260, 37030, 38890, 40840, 42890, 45040, 47300, 49670, 52160, 54770, 57510, 60390, 63410],
      incrementRatePercent: 5.0
    },
    scale2026: {
      minimum: 50500,
      maximum: 110000,
      steps: [50500, 53030, 55680, 58460, 61380, 64450, 67670, 71050, 74600, 78330, 82250, 86360, 90680, 95210, 99970, 104970, 110000],
      incrementRatePercent: 5.0,
      stage1EffectiveDate: '2026-01-01',
      stage2EffectiveDate: '2026-07-01'
    }
  },
  {
    grade: 8,
    gradeNameBangla: 'গ্রেড-৮ (সহকারী প্রকৌশলী MES পদোন্নতিপ্রাপ্ত / ১ম উচ্চতর গ্রেড)',
    gradeNameEnglish: 'Grade 8 (Assistant Engineer MES - Senior Scale)',
    eligibleClass: 'Class I (Gazetted)',
    scale2015: {
      minimum: 23000,
      maximum: 55470,
      steps: [23000, 24150, 25360, 26630, 27970, 29370, 30840, 32390, 34010, 35720, 37510, 39390, 41360, 43430, 45610, 47900, 50300, 52820, 55470],
      incrementRatePercent: 5.0
    },
    scale2026: {
      minimum: 40000,
      maximum: 96500,
      steps: [40000, 42000, 44100, 46310, 48630, 51060, 53610, 56290, 59100, 62060, 65160, 68420, 71840, 75430, 79200, 83160, 87320, 91690, 96500],
      incrementRatePercent: 5.0,
      stage1EffectiveDate: '2026-01-01',
      stage2EffectiveDate: '2026-07-01'
    }
  },
  {
    grade: 9,
    gradeNameBangla: 'গ্রেড-৯ (সহকারী প্রকৌশলী MES এন্ট্রি / BCS ৯ম গ্রেড কর্মকর্তা)',
    gradeNameEnglish: 'Grade 9 (Assistant Engineer MES Entry / Cadre Officer)',
    eligibleClass: 'Class I (Gazetted)',
    scale2015: {
      minimum: 22000,
      maximum: 53060,
      steps: [22000, 23100, 24260, 25480, 26760, 28100, 29510, 30990, 32540, 34170, 35880, 37680, 39570, 41550, 43630, 45820, 48120, 50530, 53060],
      incrementRatePercent: 5.0
    },
    scale2026: {
      minimum: 38000,
      maximum: 91800,
      steps: [38000, 39900, 41900, 44000, 46200, 48510, 50940, 53490, 56160, 58970, 61920, 65020, 68270, 71680, 75260, 79020, 82970, 87120, 91800],
      incrementRatePercent: 5.0,
      stage1EffectiveDate: '2026-01-01',
      stage2EffectiveDate: '2026-07-01'
    }
  },
  {
    grade: 10,
    gradeNameBangla: 'গ্রেড-১০ (উপ-সহকারী প্রকৌশলী MES - SAE / ডিপ্লোমা ইঞ্জিনিয়ার)',
    gradeNameEnglish: 'Grade 10 (Sub-Assistant Engineer MES - SAE)',
    eligibleClass: 'Class II',
    scale2015: {
      minimum: 16000,
      maximum: 38640,
      steps: [16000, 16800, 17640, 18530, 19460, 20440, 21470, 22550, 23680, 24870, 26120, 27430, 28810, 30260, 31780, 33370, 35040, 36800, 38640],
      incrementRatePercent: 5.0
    },
    scale2026: {
      minimum: 27800,
      maximum: 67000,
      steps: [27800, 29190, 30650, 32180, 33790, 35480, 37250, 39110, 41070, 43120, 45280, 47540, 49920, 52420, 55040, 57790, 60680, 63710, 67000],
      incrementRatePercent: 5.0,
      stage1EffectiveDate: '2026-01-01',
      stage2EffectiveDate: '2026-07-01'
    }
  },
  {
    grade: 11,
    gradeNameBangla: 'গ্রেড-১১ (প্রধান ড্রাফটসম্যান MES / প্রশাসনিক কর্মকর্তা)',
    gradeNameEnglish: 'Grade 11 (Head Draftsman MES / Administrative Officer)',
    eligibleClass: 'Class II',
    scale2015: {
      minimum: 12500,
      maximum: 30230,
      steps: [12500, 13130, 13790, 14480, 15210, 15980, 16780, 17620, 18510, 19440, 20420, 21450, 22530, 23660, 24850, 26100, 27410, 28790, 30230],
      incrementRatePercent: 5.0
    },
    scale2026: {
      minimum: 21800,
      maximum: 52600,
      steps: [21800, 22890, 24030, 25230, 26490, 27810, 29200, 30660, 32190, 33800, 35490, 37260, 39120, 41080, 43130, 45290, 47550, 49930, 52600],
      incrementRatePercent: 5.0,
      stage1EffectiveDate: '2026-01-01',
      stage2EffectiveDate: '2026-07-01'
    }
  },
  {
    grade: 12,
    gradeNameBangla: 'গ্রেড-১২ (সিনিয়র ড্রাফটসম্যান / সার্ভেয়ার MES)',
    gradeNameEnglish: 'Grade 12 (Senior Draftsman / Surveyor MES)',
    eligibleClass: 'Class III',
    scale2015: {
      minimum: 11300,
      maximum: 27300,
      steps: [11300, 11870, 12470, 13100, 13760, 14450, 15180, 15940, 16740, 17580, 18460, 19390, 20360, 21380, 22450, 23580, 24760, 26000, 27300],
      incrementRatePercent: 5.0
    },
    scale2026: {
      minimum: 19700,
      maximum: 47500,
      steps: [19700, 20690, 21720, 22810, 23950, 25150, 26410, 27730, 29120, 30580, 32110, 33720, 35410, 37180, 39040, 40990, 43040, 45190, 47500],
      incrementRatePercent: 5.0,
      stage1EffectiveDate: '2026-01-01',
      stage2EffectiveDate: '2026-07-01'
    }
  },
  {
    grade: 13,
    gradeNameBangla: 'গ্রেড-১৩ (উচ্চমান সহকারী - UDC / একাউন্টেন্ট MES)',
    gradeNameEnglish: 'Grade 13 (Upper Division Clerk - UDC / Accountant MES)',
    eligibleClass: 'Class III',
    scale2015: {
      minimum: 11000,
      maximum: 26590,
      steps: [11000, 11550, 12130, 12740, 13380, 14050, 14760, 15500, 16280, 17100, 17960, 18860, 19810, 20810, 21860, 22960, 24110, 25320, 26590],
      incrementRatePercent: 5.0
    },
    scale2026: {
      minimum: 19200,
      maximum: 46300,
      steps: [19200, 20160, 21170, 22230, 23340, 24510, 25740, 27030, 28380, 29800, 31290, 32850, 34490, 36210, 38020, 39920, 41920, 44020, 46300],
      incrementRatePercent: 5.0,
      stage1EffectiveDate: '2026-01-01',
      stage2EffectiveDate: '2026-07-01'
    }
  },
  {
    grade: 14,
    gradeNameBangla: 'গ্রেড-১৪ (জুনিয়র ড্রাফটসম্যান / স্টোর কিপার MES)',
    gradeNameEnglish: 'Grade 14 (Junior Draftsman / Store Keeper MES)',
    eligibleClass: 'Class III',
    scale2015: {
      minimum: 10200,
      maximum: 24680,
      steps: [10200, 10710, 11250, 11820, 12420, 13050, 13710, 14400, 15120, 15880, 16680, 17520, 18400, 19320, 20290, 21310, 22380, 23500, 24680],
      incrementRatePercent: 5.0
    },
    scale2026: {
      minimum: 17800,
      maximum: 43000,
      steps: [17800, 18690, 19620, 20600, 21630, 22710, 23850, 25040, 26290, 27600, 28980, 30430, 31950, 33550, 35230, 36990, 38840, 40780, 43000],
      incrementRatePercent: 5.0,
      stage1EffectiveDate: '2026-01-01',
      stage2EffectiveDate: '2026-07-01'
    }
  },
  {
    grade: 15,
    gradeNameBangla: 'গ্রেড-১৫ (দক্ষ কারিগর গ্রেড-১ MES / ল্যাব সহকারী)',
    gradeNameEnglish: 'Grade 15 (Skilled Artisan Grade 1 MES)',
    eligibleClass: 'Class III',
    scale2015: {
      minimum: 9700,
      maximum: 23490,
      steps: [9700, 10190, 10700, 11240, 11810, 12410, 13040, 13700, 14390, 15110, 15870, 16670, 17510, 18390, 19310, 20280, 21300, 22370, 23490],
      incrementRatePercent: 5.0
    },
    scale2026: {
      minimum: 16900,
      maximum: 40800,
      steps: [16900, 17750, 18640, 19570, 20550, 21580, 22660, 23790, 24980, 26230, 27540, 28920, 30370, 31890, 33480, 35150, 36910, 38760, 40800],
      incrementRatePercent: 5.0,
      stage1EffectiveDate: '2026-01-01',
      stage2EffectiveDate: '2026-07-01'
    }
  },
  {
    grade: 16,
    gradeNameBangla: 'গ্রেড-১৬ (অফিস সহকারী কাম কম্পিউটার মুদ্রাক্ষরিক - LDA / দক্ষ কারিগর MES)',
    gradeNameEnglish: 'Grade 16 (Lower Division Assistant - LDA / Skilled Artisan MES)',
    eligibleClass: 'Class III',
    scale2015: {
      minimum: 9300,
      maximum: 22490,
      steps: [9300, 9770, 10260, 10780, 11320, 11890, 12490, 13120, 13780, 14470, 15200, 15960, 16760, 17600, 18480, 19410, 20390, 21410, 22490],
      incrementRatePercent: 5.0
    },
    scale2026: {
      minimum: 16200,
      maximum: 39100,
      steps: [16200, 17010, 17860, 18750, 19690, 20670, 21700, 22790, 23930, 25130, 26390, 27710, 29100, 30560, 32090, 33690, 35370, 37140, 39100],
      incrementRatePercent: 5.0,
      stage1EffectiveDate: '2026-01-01',
      stage2EffectiveDate: '2026-07-01'
    }
  },
  {
    grade: 17,
    gradeNameBangla: 'গ্রেড-১৭ (অর্ধ-দক্ষ কারিগর MES / ড্রাইভার হালকা যান)',
    gradeNameEnglish: 'Grade 17 (Semi-Skilled Artisan MES / Driver)',
    eligibleClass: 'Class IV',
    scale2015: {
      minimum: 9000,
      maximum: 21800,
      steps: [9000, 9450, 9930, 10430, 10960, 11510, 12090, 12700, 13340, 14010, 14720, 15460, 16240, 17060, 17920, 18820, 19770, 20760, 21800],
      incrementRatePercent: 5.0
    },
    scale2026: {
      minimum: 15700,
      maximum: 37900,
      steps: [15700, 16490, 17310, 18180, 19090, 20040, 21040, 22090, 23190, 24350, 25570, 26850, 28190, 29600, 31080, 32630, 34260, 35970, 37900],
      incrementRatePercent: 5.0,
      stage1EffectiveDate: '2026-01-01',
      stage2EffectiveDate: '2026-07-01'
    }
  },
  {
    grade: 18,
    gradeNameBangla: 'গ্রেড-১৮ (অফিস সহায়ক কাম বার্তাবাহক / প্লাম্বার সহকারী MES)',
    gradeNameEnglish: 'Grade 18 (Office Assistant / Plumber Helper MES)',
    eligibleClass: 'Class IV',
    scale2015: {
      minimum: 8800,
      maximum: 21310,
      steps: [8800, 9240, 9710, 10200, 10710, 11250, 11820, 12420, 13050, 13710, 14400, 15120, 15880, 16680, 17520, 18400, 19320, 20290, 21310],
      incrementRatePercent: 5.0
    },
    scale2026: {
      minimum: 15300,
      maximum: 37000,
      steps: [15300, 16070, 16870, 17710, 18600, 19530, 20510, 21540, 22620, 23750, 24940, 26190, 27500, 28880, 30320, 31840, 33430, 35100, 37000],
      incrementRatePercent: 5.0,
      stage1EffectiveDate: '2026-01-01',
      stage2EffectiveDate: '2026-07-01'
    }
  },
  {
    grade: 19,
    gradeNameBangla: 'গ্রেড-১৯ (নিরাপত্তা প্রহরী / বিদ্যুৎ খালাসী MES)',
    gradeNameEnglish: 'Grade 19 (Security Guard / Electrical Khalasi MES)',
    eligibleClass: 'Class IV',
    scale2015: {
      minimum: 8500,
      maximum: 20570,
      steps: [8500, 8930, 9380, 9850, 10350, 10870, 11420, 12000, 12600, 13230, 13900, 14600, 15330, 16100, 16910, 17760, 18650, 19590, 20570],
      incrementRatePercent: 5.0
    },
    scale2026: {
      minimum: 14800,
      maximum: 35800,
      steps: [14800, 15540, 16320, 17140, 18000, 18900, 19850, 20840, 21880, 22970, 24120, 25330, 26600, 27930, 29330, 30800, 32340, 33960, 35800],
      incrementRatePercent: 5.0,
      stage1EffectiveDate: '2026-01-01',
      stage2EffectiveDate: '2026-07-01'
    }
  },
  {
    grade: 20,
    gradeNameBangla: 'গ্রেড-২০ (অফিস সহায়ক / পরিচ্ছন্নতাকর্মী / মালী MES)',
    gradeNameEnglish: 'Grade 20 (Office Sohayok / Cleaner / Mali MES)',
    eligibleClass: 'Class IV',
    scale2015: {
      minimum: 8250,
      maximum: 20010,
      steps: [8250, 8670, 9110, 9570, 10050, 10560, 11090, 11650, 12240, 12860, 13510, 14190, 14900, 15650, 16440, 17270, 18140, 19050, 20010],
      incrementRatePercent: 5.0
    },
    scale2026: {
      minimum: 14400,
      maximum: 34800,
      steps: [14400, 15120, 15880, 16670, 17500, 18380, 19300, 20270, 21280, 22340, 23460, 24630, 25860, 27150, 28510, 29940, 31440, 33010, 34800],
      incrementRatePercent: 5.0,
      stage1EffectiveDate: '2026-01-01',
      stage2EffectiveDate: '2026-07-01'
    }
  }
];

export const ALLOWANCE_CONFIG = {
  houseRentMetroDhakaPercent: 50, // 50-60% based on basic slabs
  houseRentOtherCitiesPercent: 45,
  houseRentOtherAreasPercent: 40,
  medicalAllowanceFixed2015: 1500,
  medicalAllowanceFixed2026: 2500,
  tiffinAllowanceFixed: 300,
  conveyanceAllowanceFixed: 300,
  educationAllowancePerChild: 500, // max 2 children (1000 Tk)
  washingAllowanceFixed: 150
};
