/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Employee } from './types';
import { SAMPLE_EMPLOYEES } from './data/sampleEmployees';
import { Header } from './components/Header';
import { Sidebar, TabKey } from './components/Sidebar';
import { DashboardTab } from './components/tabs/DashboardTab';
import { EmployeesTab } from './components/tabs/EmployeesTab';
import { FixationCalculatorTab } from './components/tabs/FixationCalculatorTab';
import { ServiceHistoryTab } from './components/tabs/ServiceHistoryTab';
import { PayScalesTab } from './components/tabs/PayScalesTab';
import { IncrementPromotionTab } from './components/tabs/IncrementPromotionTab';
import { ArrearsCalculatorTab } from './components/tabs/ArrearsCalculatorTab';
import { ReportsTab } from './components/tabs/ReportsTab';
import { OfficialRulesTab } from './components/tabs/OfficialRulesTab';
import { SettingsTab } from './components/tabs/SettingsTab';
import { generateAndDownloadPayFixationExcel } from './utils/excelGenerator';
import { ShieldAlert, FileSpreadsheet, CheckCircle2 } from 'lucide-react';

export default function App() {
  // Employees state
  const [employees, setEmployees] = useState<Employee[]>(() => {
    try {
      const saved = localStorage.getItem('bd_pay_fixation_employees_2026');
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    return SAMPLE_EMPLOYEES;
  });

  // Selected active employee
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string>(employees[0]?.id || 'emp-mes-001');

  // Active tab
  const [activeTab, setActiveTab] = useState<TabKey>('dashboard');

  // Language state: 'bn' (Bangla) or 'en' (English)
  const [lang, setLang] = useState<'bn' | 'en'>('bn');

  // Mobile menu open state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Excel generating toast/notification
  const [isExportingExcel, setIsExportingExcel] = useState(false);
  const [exportNotice, setExportNotice] = useState<string | null>(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('bd_pay_fixation_employees_2026', JSON.stringify(employees));
    } catch {
      // ignore
    }
  }, [employees]);

  const selectedEmployee = employees.find(e => e.id === selectedEmployeeId) || employees[0];

  const handleSelectEmployee = (emp: Employee) => {
    setSelectedEmployeeId(emp.id);
  };

  const handleUpdateEmployee = (updated: Employee) => {
    setEmployees(prev => prev.map(e => (e.id === updated.id ? updated : e)));
  };

  const handleSaveNewEmployee = (newEmp: Employee) => {
    setEmployees(prev => [newEmp, ...prev]);
    setSelectedEmployeeId(newEmp.id);
    setActiveTab('fixation');
  };

  const handleDeleteEmployee = (id: string) => {
    setEmployees(prev => prev.filter(e => e.id !== id));
    if (selectedEmployeeId === id) {
      setSelectedEmployeeId(employees.find(e => e.id !== id)?.id || '');
    }
  };

  const handleDownloadExcel = async (empToExport?: Employee) => {
    const target = empToExport || selectedEmployee;
    setIsExportingExcel(true);
    setExportNotice(lang === 'bn' ? '১০-শীট বিশিষ্ট অফিসিয়াল এক্সেল ফাইল প্রস্তুত হচ্ছে...' : 'Generating 10-Sheet Excel Workbook...');

    try {
      await generateAndDownloadPayFixationExcel(target);
      setExportNotice(lang === 'bn' ? '✓ এক্সেল ফাইল ডাউনলোড সম্পন্ন হয়েছে!' : '✓ Excel file downloaded successfully!');
    } catch (err) {
      console.error(err);
      setExportNotice(lang === 'bn' ? 'এক্সেল ফাইল তৈরিতে সমস্যা হয়েছে।' : 'Error generating Excel file.');
    } finally {
      setIsExportingExcel(false);
      setTimeout(() => setExportNotice(null), 3500);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      {/* Top Header */}
      <Header
        selectedEmployee={selectedEmployee}
        onDownloadExcel={() => handleDownloadExcel(selectedEmployee)}
        lang={lang}
        onToggleLang={() => setLang(prev => (prev === 'bn' ? 'en' : 'bn'))}
        mobileMenuOpen={mobileMenuOpen}
        onToggleMobileMenu={() => setMobileMenuOpen(prev => !prev)}
      />

      {/* Excel Download Floating Notification */}
      {exportNotice && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl border border-slate-700 flex items-center gap-3 text-xs font-semibold animate-bounce">
          <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
          <span>{exportNotice}</span>
        </div>
      )}

      {/* Main Body with Persistent Sidebar & Viewport */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        {/* Sidebar */}
        <Sidebar
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          lang={lang}
          isOpenMobile={mobileMenuOpen}
          onCloseMobile={() => setMobileMenuOpen(false)}
        />

        {/* Content Viewport */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0 overflow-y-auto">
          {activeTab === 'dashboard' && (
            <DashboardTab
              employees={employees}
              selectedEmployee={selectedEmployee}
              onSelectEmployee={handleSelectEmployee}
              onNavigateTab={setActiveTab}
              onDownloadExcel={handleDownloadExcel}
              onAddNewEmployeeModal={() => setActiveTab('employees')}
              lang={lang}
            />
          )}

          {activeTab === 'employees' && (
            <EmployeesTab
              employees={employees}
              selectedEmployee={selectedEmployee}
              onSelectEmployee={handleSelectEmployee}
              onSaveEmployee={handleSaveNewEmployee}
              onDeleteEmployee={handleDeleteEmployee}
              onNavigateTab={setActiveTab}
              lang={lang}
            />
          )}

          {activeTab === 'fixation' && (
            <FixationCalculatorTab
              selectedEmployee={selectedEmployee}
              onUpdateEmployee={handleUpdateEmployee}
              onDownloadExcel={handleDownloadExcel}
              onNavigateTab={setActiveTab}
              lang={lang}
            />
          )}

          {activeTab === 'history' && (
            <ServiceHistoryTab
              selectedEmployee={selectedEmployee}
              onUpdateEmployee={handleUpdateEmployee}
              lang={lang}
            />
          )}

          {activeTab === 'scales' && (
            <PayScalesTab lang={lang} />
          )}

          {activeTab === 'increment' && (
            <IncrementPromotionTab
              selectedEmployee={selectedEmployee}
              onUpdateEmployee={handleUpdateEmployee}
              lang={lang}
            />
          )}

          {activeTab === 'arrears' && (
            <ArrearsCalculatorTab
              selectedEmployee={selectedEmployee}
              onDownloadExcel={handleDownloadExcel}
              lang={lang}
            />
          )}

          {activeTab === 'reports' && (
            <ReportsTab
              selectedEmployee={selectedEmployee}
              allEmployees={employees}
              onDownloadExcel={handleDownloadExcel}
              lang={lang}
            />
          )}

          {activeTab === 'rules' && (
            <OfficialRulesTab lang={lang} />
          )}

          {activeTab === 'settings' && (
            <SettingsTab
              employees={employees}
              selectedEmployee={selectedEmployee}
              onUpdateAllEmployees={setEmployees}
              onDownloadExcel={handleDownloadExcel}
              lang={lang}
              onToggleLang={() => setLang(prev => (prev === 'bn' ? 'en' : 'bn'))}
            />
          )}
        </main>
      </div>

      {/* Mandatory Statutory Disclaimer Footer */}
      <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 py-6 px-4 sm:px-6 lg:px-8 text-xs text-center space-y-2 no-print">
        <div className="max-w-4xl mx-auto space-y-2">
          <p className="font-semibold text-slate-300">
            {lang === 'bn'
              ? 'আইনি সতর্কীকরণ ও বাধ্যতামূলক ডিসক্লেইমার (Mandatory Disclaimer):'
              : 'Legal Notice & Mandatory Disclaimer:'}
          </p>
          <p className="text-[11px] leading-relaxed text-slate-400">
            “This is an independent salary calculation tool and is not an official Government of Bangladesh, MES, Ministry of Finance, or iBAS++ service. Calculations depend on the applicable official orders and the accuracy of the employee's information. Final salary fixation must be confirmed through the authorized government process.”
          </p>
          <p className="text-[10px] text-slate-500 pt-1">
            Military Engineer Services (MES) & Bangladesh Government Civil Employees Pay Fixation Portal 2026. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
