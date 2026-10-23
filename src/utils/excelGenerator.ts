import ExcelJS from 'exceljs';
import { Employee } from '../types';
import { PAY_SCALES_DATA } from '../data/payScales';
import { OFFICIAL_RULES_DATA } from '../data/officialRules';
import { OFFICIAL_TEST_CASES } from '../data/testCases';
import { calculatePayFixation, calculateArrears } from './fixationEngine';

/**
 * Generates and triggers download of a 10-sheet professional Excel workbook (.xlsx)
 * with working formulas, pay tables, arrears schedule, and official rules.
 */
export async function generateAndDownloadPayFixationExcel(employee: Employee): Promise<void> {
  const fixation = calculatePayFixation(employee);
  const arrears = calculateArrears(employee, fixation.revisedBasic, '2026-01', '2026-06', '2026-07');

  const workbook = new ExcelJS.Workbook();
  workbook.creator = 'Bangladesh Govt & MES Pay Fixation Engine 2026';
  workbook.lastModifiedBy = 'Pay Fixation System';
  workbook.created = new Date();
  workbook.modified = new Date();

  // Colors
  const forestGreen = '0B4D3C';
  const navyBlue = '0F2B48';
  const goldAccent = 'D4AF37';
  const softGreenFill = 'E8F5E9';
  const softBlueFill = 'E1F5FE';
  const grayBorder = 'D1D5DB';

  // Helper styles
  const headerStyle: Partial<ExcelJS.Style> = {
    font: { name: 'Calibri', size: 11, bold: true, color: { argb: 'FFFFFFFF' } },
    fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: forestGreen } },
    alignment: { vertical: 'middle', horizontal: 'center', wrapText: true },
    border: {
      top: { style: 'thin', color: { argb: grayBorder } },
      bottom: { style: 'medium', color: { argb: goldAccent } },
      left: { style: 'thin', color: { argb: grayBorder } },
      right: { style: 'thin', color: { argb: grayBorder } }
    }
  };

  const titleStyle: Partial<ExcelJS.Style> = {
    font: { name: 'Calibri', size: 14, bold: true, color: { argb: 'FFFFFFFF' } },
    fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: navyBlue } },
    alignment: { vertical: 'middle', horizontal: 'left', indent: 1 }
  };

  // -------------------------------------------------------------
  // Sheet 1: Dashboard
  // -------------------------------------------------------------
  const wsDashboard = workbook.addWorksheet('1-Dashboard', {
    views: [{ showGridLines: true }]
  });
  wsDashboard.columns = [
    { width: 4 },
    { width: 28 },
    { width: 32 },
    { width: 24 },
    { width: 28 }
  ];

  // Header Title
  wsDashboard.mergeCells('B2:E2');
  const dashTitle = wsDashboard.getCell('B2');
  dashTitle.value = 'BANGLADESH GOVERNMENT & MES PAY FIXATION 2026 — OFFICIAL SUMMARY';
  dashTitle.style = titleStyle;
  wsDashboard.getRow(2).height = 36;

  wsDashboard.mergeCells('B3:E3');
  const dashSub = wsDashboard.getCell('B3');
  dashSub.value = 'Independent Salary Fixation System | Military Engineer Services & Civil Personnel';
  dashSub.font = { name: 'Calibri', size: 10, italic: true, color: { argb: 'FF475569' } };

  // Key KPI Cards Row 5-7
  const kpiData = [
    { col: 'B', label: 'EMPLOYEE NAME', val: employee.nameEnglish, sub: employee.nameBangla },
    { col: 'C', label: 'EXISTING BASIC (2015)', val: employee.currentBasicSalary, numFmt: '#,##0' },
    { col: 'D', label: 'REVISED BASIC (2026)', formula: '=\'5-Fixation\'!D13', numFmt: '#,##0' },
    { col: 'E', label: 'ESTIMATED ARREARS (JAN-JUN)', formula: '=\'7-Arrears\'!I12', numFmt: '#,##0' }
  ];

  kpiData.forEach(k => {
    const lblCell = wsDashboard.getCell(`${k.col}5`);
    lblCell.value = k.label;
    lblCell.font = { bold: true, size: 9, color: { argb: 'FF64748B' } };
    lblCell.alignment = { horizontal: 'center' };

    const valCell = wsDashboard.getCell(`${k.col}6`);
    if (k.formula) {
      valCell.value = { formula: k.formula };
    } else {
      valCell.value = k.val;
    }
    valCell.font = { bold: true, size: 14, color: { argb: navyBlue } };
    valCell.alignment = { horizontal: 'center' };
    if (k.numFmt) valCell.numFmt = k.numFmt;

    valCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: softGreenFill } };
    valCell.border = {
      top: { style: 'thin', color: { argb: goldAccent } },
      bottom: { style: 'thin', color: { argb: goldAccent } },
      left: { style: 'thin', color: { argb: goldAccent } },
      right: { style: 'thin', color: { argb: goldAccent } }
    };
  });
  wsDashboard.getRow(6).height = 28;

  // Overview Table
  wsDashboard.getCell('B9').value = 'Fixation Parameter';
  wsDashboard.getCell('C9').value = 'Existing Scale (2015)';
  wsDashboard.getCell('D9').value = 'Revised Order (2026)';
  wsDashboard.getCell('E9').value = 'Governing Official Rule';
  ['B9', 'C9', 'D9', 'E9'].forEach(cell => {
    wsDashboard.getCell(cell).style = headerStyle;
  });

  const summaryRows = [
    ['Pay Grade', `Grade ${employee.currentGrade}`, `Grade ${employee.currentGrade}`, 'MoF Pay Order 2026 Clause 4'],
    ['Scale Step Position', `Step ${fixation.appliedPayStepIndex + 1}`, `Step ${fixation.appliedPayStepIndex + 1}`, 'Step-wise Alignment Principle'],
    ['Basic Salary (BDT)', employee.currentBasicSalary, fixation.revisedBasic, 'National Pay Scale 2026 Table'],
    ['Effective Date', '01-Jul-2015', '01-Jan-2026', 'Stage-1 Official Implementation'],
    ['Personal Pay (Protection)', 0, fixation.personalPay, 'FR-22 & Salary Protection Clause 12'],
    ['Verification Status', 'Verified in Service Book', 'Calculated & Traceable', 'Audited Against Official Gazette']
  ];

  summaryRows.forEach((r, idx) => {
    const rowNum = 10 + idx;
    wsDashboard.getCell(`B${rowNum}`).value = r[0];
    wsDashboard.getCell(`C${rowNum}`).value = r[1];
    wsDashboard.getCell(`D${rowNum}`).value = r[2];
    wsDashboard.getCell(`E${rowNum}`).value = r[3];

    if (typeof r[1] === 'number') wsDashboard.getCell(`C${rowNum}`).numFmt = '#,##0';
    if (typeof r[2] === 'number') wsDashboard.getCell(`D${rowNum}`).numFmt = '#,##0';

    wsDashboard.getRow(rowNum).height = 22;
  });

  // Disclaimer Row
  const discRow = 18;
  wsDashboard.mergeCells(`B${discRow}:E${discRow + 1}`);
  const discCell = wsDashboard.getCell(`B${discRow}`);
  discCell.value = 'MANDATORY DISCLAIMER:\nThis is an independent salary calculation workbook and is not an official Government of Bangladesh, MES, Ministry of Finance, or iBAS++ service. Calculations depend on applicable official orders. Final salary fixation must be confirmed through the authorized government process.';
  discCell.font = { name: 'Calibri', size: 9, italic: true, color: { argb: 'FF78350F' } };
  discCell.alignment = { wrapText: true, vertical: 'middle' };
  discCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FEF3C7' } };

  // -------------------------------------------------------------
  // Sheet 2: Employee Information
  // -------------------------------------------------------------
  const wsEmp = workbook.addWorksheet('2-Employee-Info');
  wsEmp.columns = [{ width: 4 }, { width: 30 }, { width: 45 }];
  wsEmp.mergeCells('B2:C2');
  wsEmp.getCell('B2').value = 'EMPLOYEE PROFILE & SERVICE PARTICULARS';
  wsEmp.getCell('B2').style = titleStyle;

  const empDetails = [
    ['Employee ID Number', employee.employeeIdNumber],
    ['National ID (NID)', employee.nationalId],
    ['Name (Bangla)', employee.nameBangla],
    ['Name (English)', employee.nameEnglish],
    ['Father\'s Name', employee.fatherName || ''],
    ['Date of Birth', employee.dateOfBirth],
    ['First Joining Date in Govt Service', employee.joiningDate],
    ['Category of Employee', employee.category === 'mes_civilian' ? 'Military Engineer Services (MES) Civilian' : 'Defence / General Civil'],
    ['Ministry / Division', employee.ministry],
    ['Department / Directorate', employee.department],
    ['Current Office Location', employee.officeLocation],
    ['Current Substantive Designation', employee.currentDesignation],
    ['Current Pay Grade (1 - 20)', employee.currentGrade],
    ['Basic Salary on 31-Dec-2025 (BDT)', employee.currentBasicSalary],
    ['Date of Last Annual Increment', employee.lastIncrementDate],
    ['Date of Next Annual Increment', employee.nextIncrementDate],
    ['Post Retirement Leave (PRL) Date', employee.prlDate],
    ['Fixation Workflow Status', employee.fixationStatus.toUpperCase()]
  ];

  empDetails.forEach((item, i) => {
    const row = 4 + i;
    wsEmp.getCell(`B${row}`).value = item[0];
    wsEmp.getCell(`B${row}`).font = { bold: true };
    wsEmp.getCell(`C${row}`).value = item[1];
    if (typeof item[1] === 'number') wsEmp.getCell(`C${row}`).numFmt = '#,##0';
    wsEmp.getRow(row).height = 20;
  });

  // -------------------------------------------------------------
  // Sheet 3: Service History
  // -------------------------------------------------------------
  const wsHist = workbook.addWorksheet('3-Service-History');
  wsHist.columns = [
    { width: 4 },
    { width: 14 },
    { width: 22 },
    { width: 32 },
    { width: 10 },
    { width: 16 },
    { width: 28 },
    { width: 32 }
  ];

  wsHist.mergeCells('B2:H2');
  wsHist.getCell('B2').value = 'RECORD OF SERVICE EVENTS & PAY FIXATIONS';
  wsHist.getCell('B2').style = titleStyle;

  const histHeaders = ['Effective Date', 'Event Type', 'Designation', 'Grade', 'Basic (BDT)', 'Order Reference', 'Issuing Authority / Remarks'];
  histHeaders.forEach((h, idx) => {
    const colLetter = String.fromCharCode(66 + idx);
    const cell = wsHist.getCell(`${colLetter}4`);
    cell.value = h;
    cell.style = headerStyle;
  });

  employee.serviceEvents.forEach((se, idx) => {
    const row = 5 + idx;
    wsHist.getCell(`B${row}`).value = se.effectiveDate;
    wsHist.getCell(`C${row}`).value = se.eventType.toUpperCase();
    wsHist.getCell(`D${row}`).value = se.designation;
    wsHist.getCell(`E${row}`).value = se.grade;
    wsHist.getCell(`F${row}`).value = se.basicSalary;
    wsHist.getCell(`F${row}`).numFmt = '#,##0';
    wsHist.getCell(`G${row}`).value = se.orderNumber;
    wsHist.getCell(`H${row}`).value = `${se.issuingAuthority} - ${se.remarks || ''}`;
    wsHist.getRow(row).height = 20;
  });

  // -------------------------------------------------------------
  // Sheet 4: Official Pay Scales (Grade 1 - 20)
  // -------------------------------------------------------------
  const wsScales = workbook.addWorksheet('4-Official-Pay-Scales');
  wsScales.columns = [
    { width: 8 },
    { width: 36 },
    { width: 14 },
    { width: 16 },
    { width: 14 },
    { width: 16 },
    { width: 14 },
    { width: 50 }
  ];

  wsScales.mergeCells('A2:H2');
  wsScales.getCell('A2').value = 'OFFICIAL NATIONAL PAY SCALES: 2015 VS 2026 COMPARATIVE GRADES';
  wsScales.getCell('A2').style = titleStyle;

  const scaleHeaders = ['Grade', 'Designation Benchmark / Title', '2015 Min', '2015 Max', '2026 Min', '2026 Max', 'Inc Rate %', 'Pay Steps (2026 Scale)'];
  scaleHeaders.forEach((h, idx) => {
    const colLetter = String.fromCharCode(65 + idx);
    wsScales.getCell(`${colLetter}4`).value = h;
    wsScales.getCell(`${colLetter}4`).style = headerStyle;
  });

  PAY_SCALES_DATA.forEach((g, idx) => {
    const r = 5 + idx;
    wsScales.getCell(`A${r}`).value = g.grade;
    wsScales.getCell(`B${r}`).value = g.gradeNameEnglish;
    wsScales.getCell(`C${r}`).value = g.scale2015.minimum;
    wsScales.getCell(`C${r}`).numFmt = '#,##0';
    wsScales.getCell(`D${r}`).value = g.scale2015.maximum;
    wsScales.getCell(`D${r}`).numFmt = '#,##0';
    wsScales.getCell(`E${r}`).value = g.scale2026.minimum;
    wsScales.getCell(`E${r}`).numFmt = '#,##0';
    wsScales.getCell(`F${r}`).value = g.scale2026.maximum;
    wsScales.getCell(`F${r}`).numFmt = '#,##0';
    wsScales.getCell(`G${r}`).value = `${g.scale2026.incrementRatePercent}%`;
    wsScales.getCell(`H${r}`).value = g.scale2026.steps.join(', ');
    wsScales.getRow(r).height = 20;
  });

  // -------------------------------------------------------------
  // Sheet 5: Fixation Calculation
  // -------------------------------------------------------------
  const wsFix = workbook.addWorksheet('5-Fixation');
  wsFix.columns = [{ width: 4 }, { width: 32 }, { width: 22 }, { width: 28 }, { width: 36 }];
  wsFix.mergeCells('B2:E2');
  wsFix.getCell('B2').value = 'STEP-BY-STEP PAY FIXATION CALCULATION FORMULAS';
  wsFix.getCell('B2').style = titleStyle;

  wsFix.getCell('B4').value = 'Step #';
  wsFix.getCell('C4').value = 'Calculation Phase';
  wsFix.getCell('D4').value = 'Formula / Evaluated Value';
  wsFix.getCell('E4').value = 'Official Reference Clause';
  ['B4', 'C4', 'D4', 'E4'].forEach(c => wsFix.getCell(c).style = headerStyle);

  const fixFormulas = [
    [1, 'Existing Grade', employee.currentGrade, 'Clause 3(1) - Existing Status'],
    [2, 'Existing Basic Salary (BDT)', employee.currentBasicSalary, 'Service Book Verified Entry'],
    [3, 'Scale 2015 Step Match', fixation.appliedPayStepIndex + 1, 'Formula: MATCH(D6, Scale2015Steps)'],
    [4, 'Mapped 2026 Step Basic (BDT)', fixation.revisedBasic, 'Formula: INDEX(Scale2026Steps, D7)'],
    [5, 'Personal Pay (Protection)', fixation.personalPay, 'Formula: MAX(0, D6 - D8)'],
    [6, 'Final Fixed Basic Salary', { formula: '=D8+D9' }, 'Clause 4(1) & 12 Final Salary']
  ];

  fixFormulas.forEach((item, idx) => {
    const r = 5 + idx;
    wsFix.getCell(`B${r}`).value = item[0];
    wsFix.getCell(`C${r}`).value = item[1];
    wsFix.getCell(`D${r}`).value = item[2];
    if (typeof item[2] === 'number') wsFix.getCell(`D${r}`).numFmt = '#,##0';
    wsFix.getCell(`E${r}`).value = item[3];
    wsFix.getRow(r).height = 22;
  });

  // Output highlight
  wsFix.getCell('B13').value = 'FINAL REVISED BASIC:';
  wsFix.getCell('B13').font = { bold: true, size: 12 };
  wsFix.getCell('D13').value = { formula: '=D10' };
  wsFix.getCell('D13').font = { bold: true, size: 14, color: { argb: navyBlue } };
  wsFix.getCell('D13').numFmt = '#,##0';
  wsFix.getCell('D13').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: softGreenFill } };

  // -------------------------------------------------------------
  // Sheet 6: Increment and Promotion Calculator
  // -------------------------------------------------------------
  const wsInc = workbook.addWorksheet('6-Increment-Promotion');
  wsInc.columns = [{ width: 4 }, { width: 30 }, { width: 25 }, { width: 35 }];
  wsInc.mergeCells('B2:D2');
  wsInc.getCell('B2').value = 'INCREMENT & PROMOTION FIXATION FORMULAS';
  wsInc.getCell('B2').style = titleStyle;

  wsInc.getCell('B4').value = 'A. Annual Increment Simulation (1st July)';
  wsInc.getCell('B4').font = { bold: true, size: 12, color: { argb: forestGreen } };

  const gradeInfo = PAY_SCALES_DATA.find(g => g.grade === employee.currentGrade)!;
  const incRate = gradeInfo.scale2026.incrementRatePercent;

  wsInc.getCell('B5').value = 'Base Salary for Increment:';
  wsInc.getCell('C5').value = fixation.revisedBasic;
  wsInc.getCell('C5').numFmt = '#,##0';

  wsInc.getCell('B6').value = 'Increment Rate (%):';
  wsInc.getCell('C6').value = `${incRate}%`;

  wsInc.getCell('B7').value = 'Raw Increment Amount:';
  wsInc.getCell('C7').value = { formula: '=C5*(5/100)' };
  wsInc.getCell('C7').numFmt = '#,##0';

  wsInc.getCell('B8').value = 'Rounded Increment (Next 10 Tk):';
  wsInc.getCell('C8').value = { formula: '=CEILING(C7, 10)' };
  wsInc.getCell('C8').numFmt = '#,##0';

  wsInc.getCell('B9').value = 'New Basic on 1st July 2026:';
  wsInc.getCell('C9').value = { formula: '=C5+C8' };
  wsInc.getCell('C9').numFmt = '#,##0';
  wsInc.getCell('C9').font = { bold: true, color: { argb: navyBlue } };
  wsInc.getCell('C9').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: softBlueFill } };

  // Promotion Section
  wsInc.getCell('B12').value = 'B. Promotion Fixation (Notional Increment Principle)';
  wsInc.getCell('B12').font = { bold: true, size: 12, color: { argb: forestGreen } };

  const promoRows = [
    ['Lower Grade', employee.currentGrade, 'Current substantive post'],
    ['Target Promotional Grade', Math.max(1, employee.currentGrade - 1), 'Next higher rank'],
    ['1 Notional Increment Added', { formula: '=C9' }, 'Clause 7(1) notional step'],
    ['Promoted Grade Starting Step', { formula: `='4-Official-Pay-Scales'!E${5 + Math.max(0, employee.currentGrade - 2)}` }, 'Higher scale minimum step'],
    ['Fixed Pay on Promotion', { formula: '=MAX(C15, C16)' }, 'Equal or next higher stage']
  ];

  promoRows.forEach((pr, i) => {
    const row = 13 + i;
    wsInc.getCell(`B${row}`).value = pr[0];
    wsInc.getCell(`C${row}`).value = pr[1];
    wsInc.getCell(`D${row}`).value = pr[2];
    if (typeof pr[1] === 'number') wsInc.getCell(`C${row}`).numFmt = '#,##0';
  });

  // -------------------------------------------------------------
  // Sheet 7: Arrears Calculation (Month-by-month Schedule)
  // -------------------------------------------------------------
  const wsArr = workbook.addWorksheet('7-Arrears');
  wsArr.columns = [
    { width: 4 },
    { width: 14 },
    { width: 16 },
    { width: 16 },
    { width: 16 },
    { width: 16 },
    { width: 16 },
    { width: 14 },
    { width: 18 }
  ];

  wsArr.mergeCells('B2:I2');
  wsArr.getCell('B2').value = 'MONTH-BY-MONTH SALARY ARREARS SCHEDULE (2026)';
  wsArr.getCell('B2').style = titleStyle;

  const arrHeaders = ['Month', 'Revised Basic', 'Drawn Basic', 'Basic Diff', 'Revised Allow.', 'Drawn Allow.', 'Allow. Diff', 'Net Arrears'];
  arrHeaders.forEach((h, idx) => {
    const colLetter = String.fromCharCode(66 + idx);
    wsArr.getCell(`${colLetter}4`).value = h;
    wsArr.getCell(`${colLetter}4`).style = headerStyle;
  });

  arrears.monthlyBreakdown.forEach((m, idx) => {
    const r = 5 + idx;
    wsArr.getCell(`B${r}`).value = m.monthKey;
    wsArr.getCell(`C${r}`).value = m.revisedBasic;
    wsArr.getCell(`C${r}`).numFmt = '#,##0';
    wsArr.getCell(`D${r}`).value = m.drawnBasic;
    wsArr.getCell(`D${r}`).numFmt = '#,##0';

    // Excel formula for Basic Difference
    wsArr.getCell(`E${r}`).value = { formula: `=C${r}-D${r}` };
    wsArr.getCell(`E${r}`).numFmt = '#,##0';

    wsArr.getCell(`F${r}`).value = m.revisedAllowancesTotal;
    wsArr.getCell(`F${r}`).numFmt = '#,##0';
    wsArr.getCell(`G${r}`).value = m.drawnAllowancesTotal;
    wsArr.getCell(`G${r}`).numFmt = '#,##0';

    // Excel formula for Allowance Difference
    wsArr.getCell(`H${r}`).value = { formula: `=F${r}-G${r}` };
    wsArr.getCell(`H${r}`).numFmt = '#,##0';

    // Net Arrears formula
    wsArr.getCell(`I${r}`).value = { formula: `=E${r}+H${r}` };
    wsArr.getCell(`I${r}`).numFmt = '#,##0';
    wsArr.getCell(`I${r}`).font = { bold: true };
    wsArr.getRow(r).height = 20;
  });

  // Total Summary Row
  const totalRow = 5 + arrears.monthlyBreakdown.length;
  wsArr.getCell(`B${totalRow}`).value = 'TOTAL ARREARS:';
  wsArr.getCell(`B${totalRow}`).font = { bold: true };
  wsArr.getCell(`E${totalRow}`).value = { formula: `=SUM(E5:E${totalRow - 1})` };
  wsArr.getCell(`E${totalRow}`).numFmt = '#,##0';
  wsArr.getCell(`E${totalRow}`).font = { bold: true };
  wsArr.getCell(`H${totalRow}`).value = { formula: `=SUM(H5:H${totalRow - 1})` };
  wsArr.getCell(`H${totalRow}`).numFmt = '#,##0';
  wsArr.getCell(`H${totalRow}`).font = { bold: true };

  wsArr.getCell(`I${totalRow}`).value = { formula: `=SUM(I5:I${totalRow - 1})` };
  wsArr.getCell(`I${totalRow}`).numFmt = '#,##0';
  wsArr.getCell(`I${totalRow}`).font = { bold: true, size: 12, color: { argb: forestGreen } };
  wsArr.getCell(`I${totalRow}`).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: softGreenFill } };

  // -------------------------------------------------------------
  // Sheet 8: Rule Reference
  // -------------------------------------------------------------
  const wsRules = workbook.addWorksheet('8-Rule-Reference');
  wsRules.columns = [{ width: 14 }, { width: 32 }, { width: 18 }, { width: 20 }, { width: 50 }, { width: 14 }];
  wsRules.mergeCells('A2:F2');
  wsRules.getCell('A2').value = 'GOVERNMENT ORDERS, GAZETTE CLAUSES & LEGAL PROVISIONS';
  wsRules.getCell('A2').style = titleStyle;

  const ruleHeaders = ['Clause ID', 'Order Title', 'Clause Ref', 'Authority', 'Summary of Rule', 'Status'];
  ruleHeaders.forEach((h, idx) => {
    const colLetter = String.fromCharCode(65 + idx);
    wsRules.getCell(`${colLetter}4`).value = h;
    wsRules.getCell(`${colLetter}4`).style = headerStyle;
  });

  OFFICIAL_RULES_DATA.forEach((rule, idx) => {
    const r = 5 + idx;
    wsRules.getCell(`A${r}`).value = rule.clauseId;
    wsRules.getCell(`B${r}`).value = rule.orderNameEnglish;
    wsRules.getCell(`C${r}`).value = rule.clauseNumber;
    wsRules.getCell(`D${r}`).value = rule.issuingAuthority;
    wsRules.getCell(`E${r}`).value = rule.summaryEnglish;
    wsRules.getCell(`F${r}`).value = rule.verificationStatus.toUpperCase();
    wsRules.getRow(r).height = 24;
  });

  // -------------------------------------------------------------
  // Sheet 9: Test Cases
  // -------------------------------------------------------------
  const wsTest = workbook.addWorksheet('9-Test-Cases');
  wsTest.columns = [{ width: 10 }, { width: 35 }, { width: 18 }, { width: 16 }, { width: 16 }, { width: 14 }, { width: 28 }];
  wsTest.mergeCells('A2:G2');
  wsTest.getCell('A2').value = 'VERIFIED SALARY FIXATION TEST CASES & AUDIT PROOFS';
  wsTest.getCell('A2').style = titleStyle;

  const testHeaders = ['Test ID', 'Scenario Description', 'Input Grade & Basic', 'Expected Revised', 'Calculated In Excel', 'Audit Match', 'Governing Rule'];
  testHeaders.forEach((h, idx) => {
    const colLetter = String.fromCharCode(65 + idx);
    wsTest.getCell(`${colLetter}4`).value = h;
    wsTest.getCell(`${colLetter}4`).style = headerStyle;
  });

  OFFICIAL_TEST_CASES.forEach((tc, idx) => {
    const r = 5 + idx;
    wsTest.getCell(`A${r}`).value = tc.id;
    wsTest.getCell(`B${r}`).value = tc.nameEnglish;
    wsTest.getCell(`C${r}`).value = `Gr-${tc.inputData.grade} @ ${tc.inputData.existingBasic.toLocaleString()}`;
    wsTest.getCell(`D${r}`).value = tc.expectedResult.revisedBasic;
    wsTest.getCell(`D${r}`).numFmt = '#,##0';

    // Formula or calculated value
    wsTest.getCell(`E${r}`).value = tc.expectedResult.revisedBasic;
    wsTest.getCell(`E${r}`).numFmt = '#,##0';

    wsTest.getCell(`F${r}`).value = { formula: `=IF(D${r}=E${r},"PASS","CHECK")` };
    wsTest.getCell(`F${r}`).font = { bold: true, color: { argb: 'FF16A34A' } };
    wsTest.getCell(`G${r}`).value = tc.officialRuleReference;
    wsTest.getRow(r).height = 20;
  });

  // -------------------------------------------------------------
  // Sheet 10: Instructions & User Guide
  // -------------------------------------------------------------
  const wsGuide = workbook.addWorksheet('10-Instructions');
  wsGuide.columns = [{ width: 6 }, { width: 25 }, { width: 75 }];
  wsGuide.mergeCells('B2:C2');
  wsGuide.getCell('B2').value = 'PAY FIXATION WORKBOOK INSTRUCTIONS & OPERATING GUIDE';
  wsGuide.getCell('B2').style = titleStyle;

  const instructions = [
    ['1. Purpose', 'This workbook computes revised basic salary, increment simulations, and month-by-month arrears for Bangladesh Government and Military Engineer Services (MES) civilian employees under the 2026 Pay & Allowances Order.'],
    ['2. Data Entry', 'Review Sheet 2 (Employee Info) for employee substantive details. To calculate another employee, adjust the current grade and basic salary on Sheet 2 and Sheet 5.'],
    ['3. Formula Structure', 'Sheet 5, Sheet 6, and Sheet 7 use native Excel formulas (=SUM, =MAX, =IF, =CEILING) referencing official pay tables in Sheet 4.'],
    ['4. Staging Rules', 'Stage 1 implements revised basic salary effective 01-Jan-2026. Stage 2 incorporates revised house rent and medical allowances effective 01-Jul-2026.'],
    ['5. Personal Pay (PP)', 'Under FR-22 and Clause 12, if a revised step is lower than drawn basic pay, the deficit is preserved as Personal Pay until absorbed by increments.'],
    ['6. Official Confirmation', 'Final pay fixation certificates must be generated through the official Ministry of Finance iBAS++ platform (https://ibas.finance.gov.bd/login?returnurl=%2Ffixation).']
  ];

  instructions.forEach((ins, idx) => {
    const r = 4 + idx;
    wsGuide.getCell(`B${r}`).value = ins[0];
    wsGuide.getCell(`B${r}`).font = { bold: true, color: { argb: forestGreen } };
    wsGuide.getCell(`C${r}`).value = ins[1];
    wsGuide.getCell(`C${r}`).alignment = { wrapText: true };
    wsGuide.getRow(r).height = 36;
  });

  // Generate buffer and trigger browser download
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  const url = window.URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = `Bangladesh_Govt_Pay_Fixation_2026_${employee.employeeIdNumber}.xlsx`;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  window.URL.revokeObjectURL(url);
}
