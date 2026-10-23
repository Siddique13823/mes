import React, { useState } from 'react';
import { Employee, EmployeeCategory, FixationStatus } from '../../types';
import { Search, Plus, UserPlus, Filter, Eye, Edit2, Trash2, ShieldCheck, Building } from 'lucide-react';

interface EmployeesTabProps {
  employees: Employee[];
  selectedEmployee: Employee;
  onSelectEmployee: (emp: Employee) => void;
  onSaveEmployee: (emp: Employee) => void;
  onDeleteEmployee: (empId: string) => void;
  onNavigateTab: (tab: any) => void;
  lang: 'bn' | 'en';
}

export const EmployeesTab: React.FC<EmployeesTabProps> = ({
  employees,
  selectedEmployee,
  onSelectEmployee,
  onSaveEmployee,
  onDeleteEmployee,
  onNavigateTab,
  lang
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);

  // Filtered employees
  const filteredEmployees = employees.filter(emp => {
    const term = searchTerm.toLowerCase();
    const matchSearch =
      emp.nameBangla.toLowerCase().includes(term) ||
      emp.nameEnglish.toLowerCase().includes(term) ||
      emp.employeeIdNumber.toLowerCase().includes(term) ||
      emp.currentDesignation.toLowerCase().includes(term) ||
      emp.department.toLowerCase().includes(term) ||
      String(emp.currentGrade).includes(term);

    const matchCategory = selectedCategory === 'all' || emp.category === selectedCategory;
    const matchStatus = selectedStatus === 'all' || emp.fixationStatus === selectedStatus;

    return matchSearch && matchCategory && matchStatus;
  });

  const handleOpenAdd = () => {
    setEditingEmployee(null);
    setShowAddEditModal(true);
  };

  const handleOpenEdit = (emp: Employee) => {
    setEditingEmployee(emp);
    setShowAddEditModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Top Controls: Search, Category Filters, Add Button */}
      <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              {lang === 'bn' ? 'কর্মচারী ডেটাবেজ ও সার্ভিস রেকর্ড' : 'Employee Database & Service Records'}
            </h2>
            <span className="text-xs text-slate-500">
              {lang === 'bn'
                ? 'এমইএস এবং সরকারি কর্মকর্তা-কর্মচারীদের তথ্য অনুসন্ধান, এডিট ও প্রোফাইল পরিচালনা'
                : 'Search, edit, and manage profiles across Military Engineer Services and Civil Ministries'}
            </span>
          </div>

          <button
            onClick={handleOpenAdd}
            className="px-4 py-2 bg-emerald-800 hover:bg-emerald-700 active:bg-emerald-900 text-white text-xs sm:text-sm font-semibold rounded-lg shadow-sm transition-colors flex items-center gap-2 cursor-pointer shrink-0"
          >
            <UserPlus className="w-4 h-4" />
            <span>{lang === 'bn' ? '+ নতুন কর্মচারী যুক্ত করুন' : '+ Add New Employee'}</span>
          </button>
        </div>

        {/* Filter Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-slate-100">
          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder={lang === 'bn' ? 'নাম, আইডি, পদবী বা গ্রেড দিয়ে খুঁজুন...' : 'Search by name, ID, designation, grade...'}
              className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 bg-slate-50"
            />
          </div>

          {/* Category Dropdown */}
          <div>
            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className="w-full py-2 px-3 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 bg-slate-50 text-slate-800"
            >
              <option value="all">{lang === 'bn' ? 'সকল ক্যাটাগরি (All Categories)' : 'All Categories'}</option>
              <option value="mes_civilian">{lang === 'bn' ? 'মিলিটারি ইঞ্জিনিয়ার সার্ভিসেস (MES)' : 'Military Engineer Services (MES)'}</option>
              <option value="defence_civilian">{lang === 'bn' ? 'প্রতিরক্ষা বেসামরিক (Defence Civilian)' : 'Defence Civilian'}</option>
              <option value="general_civil">{lang === 'bn' ? 'সাধারণ বেসামরিক ক্যাডার (General Civil)' : 'General Civil'}</option>
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={selectedStatus}
              onChange={e => setSelectedStatus(e.target.value)}
              className="w-full py-2 px-3 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 bg-slate-50 text-slate-800"
            >
              <option value="all">{lang === 'bn' ? 'সকল বেতন নির্ধারণ অবস্থা (All Status)' : 'All Status'}</option>
              <option value="finalized">{lang === 'bn' ? 'চূড়ান্ত অনুমোদিত (Finalized)' : 'Finalized'}</option>
              <option value="calculated">{lang === 'bn' ? 'গণনাকৃত (Calculated)' : 'Calculated'}</option>
              <option value="reviewed">{lang === 'bn' ? 'পর্যালোচনাধীন (Reviewed)' : 'Reviewed'}</option>
              <option value="pending">{lang === 'bn' ? 'অপেক্ষমাণ (Pending)' : 'Pending'}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Employees Grid / Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">{lang === 'bn' ? 'আইডি ও নাম' : 'ID & Name'}</th>
                <th className="py-3 px-4">{lang === 'bn' ? 'সংস্থা / অধিদপ্তর' : 'Department'}</th>
                <th className="py-3 px-4">{lang === 'bn' ? 'পদবী ও গ্রেড' : 'Post & Grade'}</th>
                <th className="py-3 px-4 text-right">{lang === 'bn' ? 'বর্তমান মূল বেতন' : 'Existing Basic'}</th>
                <th className="py-3 px-4 text-center">{lang === 'bn' ? 'যোগদানের তারিখ' : 'Joining Date'}</th>
                <th className="py-3 px-4 text-center">{lang === 'bn' ? 'স্ট্যাটাস' : 'Status'}</th>
                <th className="py-3 px-4 text-right">{lang === 'bn' ? 'অ্যাকশন' : 'Actions'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredEmployees.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-500">
                    {lang === 'bn' ? 'কোনো কর্মচারী রেকর্ড পাওয়া যায়নি।' : 'No employee records matching criteria.'}
                  </td>
                </tr>
              ) : (
                filteredEmployees.map(emp => {
                  const isSelected = selectedEmployee.id === emp.id;
                  return (
                    <tr
                      key={emp.id}
                      onClick={() => onSelectEmployee(emp)}
                      className={`hover:bg-slate-50 cursor-pointer transition-colors ${
                        isSelected ? 'bg-emerald-50/70 font-medium' : ''
                      }`}
                    >
                      <td className="py-3 px-4">
                        <div className="font-bold text-slate-900">{emp.nameBangla}</div>
                        <div className="text-[11px] text-slate-500 font-mono">{emp.nameEnglish} ({emp.employeeIdNumber})</div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="text-slate-800">{emp.department}</div>
                        <div className="text-[11px] text-slate-500">{emp.officeLocation}</div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-semibold text-slate-800">{emp.currentDesignation}</div>
                        <div className="text-[11px] text-emerald-800 font-medium">গ্রেড-{emp.currentGrade}</div>
                      </td>
                      <td className="py-3 px-4 text-right font-mono tabular-nums font-bold text-slate-800">
                        ৳{emp.currentBasicSalary.toLocaleString()}
                      </td>
                      <td className="py-3 px-4 text-center font-mono text-[11px] text-slate-600">
                        {emp.joiningDate}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span
                          className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold ${
                            emp.fixationStatus === 'finalized'
                              ? 'bg-emerald-100 text-emerald-800'
                              : emp.fixationStatus === 'calculated'
                              ? 'bg-blue-100 text-blue-800'
                              : emp.fixationStatus === 'reviewed'
                              ? 'bg-purple-100 text-purple-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {emp.fixationStatus.toUpperCase()}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1" onClick={e => e.stopPropagation()}>
                          <button
                            onClick={() => {
                              onSelectEmployee(emp);
                              onNavigateTab('fixation');
                            }}
                            title="Open Pay Fixation"
                            className="p-1.5 text-emerald-700 hover:bg-emerald-100 rounded transition-colors"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleOpenEdit(emp)}
                            title="Edit Employee"
                            className="p-1.5 text-blue-700 hover:bg-blue-100 rounded transition-colors"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          {employees.length > 1 && (
                            <button
                              onClick={() => {
                                if (confirm(`${emp.nameBangla} এর রেকর্ড মুছে ফেলতে নিশ্চিত?`)) {
                                  onDeleteEmployee(emp.id);
                                }
                              }}
                              title="Delete Record"
                              className="p-1.5 text-red-700 hover:bg-red-100 rounded transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Employee Modal Form */}
      {showAddEditModal && (
        <EmployeeFormModal
          employee={editingEmployee}
          onClose={() => setShowAddEditModal(false)}
          onSave={(saved) => {
            onSaveEmployee(saved);
            setShowAddEditModal(false);
          }}
          lang={lang}
        />
      )}
    </div>
  );
};

interface EmployeeFormModalProps {
  employee: Employee | null;
  onClose: () => void;
  onSave: (emp: Employee) => void;
  lang: 'bn' | 'en';
}

const EmployeeFormModal: React.FC<EmployeeFormModalProps> = ({ employee, onClose, onSave, lang }) => {
  const isEdit = !!employee;

  const [formData, setFormData] = useState({
    nameBangla: employee?.nameBangla || '',
    nameEnglish: employee?.nameEnglish || '',
    fatherName: employee?.fatherName || '',
    employeeIdNumber: employee?.employeeIdNumber || `MES-${Math.floor(10000 + Math.random() * 90000)}`,
    nationalId: employee?.nationalId || '',
    dateOfBirth: employee?.dateOfBirth || '1988-01-01',
    joiningDate: employee?.joiningDate || '2012-01-01',
    category: (employee?.category || 'mes_civilian') as EmployeeCategory,
    ministry: employee?.ministry || 'প্রতিরক্ষা মন্ত্রণালয় (Ministry of Defence)',
    department: employee?.department || 'মিলিটারি ইঞ্জিনিয়ার সার্ভিসেস (MES)',
    officeLocation: employee?.officeLocation || 'ঢাকা সেনানিবাস',
    currentDesignation: employee?.currentDesignation || 'উপ-সহকারী প্রকৌশলী (SAE)',
    currentGrade: employee?.currentGrade || 10,
    currentBasicSalary: employee?.currentBasicSalary || 23680,
    fixationStatus: (employee?.fixationStatus || 'pending') as FixationStatus,
    statusNotes: employee?.statusNotes || '',
    revisionReason: employee?.revisionReason || 'নতুন বেতন নির্ধারণ'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const empToSave: Employee = {
      id: employee?.id || `emp-custom-${Date.now()}`,
      payScaleVersion: 'scale_2015',
      lastIncrementDate: employee?.lastIncrementDate || '2025-07-01',
      nextIncrementDate: employee?.nextIncrementDate || '2026-07-01',
      prlDate: employee?.prlDate || '2047-01-01',
      serviceEvents: employee?.serviceEvents || [
        {
          id: `se-${Date.now()}-1`,
          employeeId: employee?.id || `emp-custom-${Date.now()}`,
          effectiveDate: formData.joiningDate,
          eventType: 'appointment',
          designation: formData.currentDesignation,
          grade: Number(formData.currentGrade),
          basicSalary: Number(formData.currentBasicSalary),
          orderNumber: 'নিয়োগ আদেশ',
          orderDate: formData.joiningDate,
          issuingAuthority: formData.department,
          remarks: 'প্রারম্ভিক সার্ভিস রেকর্ড'
        }
      ],
      updatedAt: new Date().toISOString(),
      ...formData,
      currentGrade: Number(formData.currentGrade),
      currentBasicSalary: Number(formData.currentBasicSalary)
    };

    onSave(empToSave);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-2xl overflow-hidden my-8">
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
          <h3 className="font-bold text-base">
            {isEdit
              ? (lang === 'bn' ? 'কর্মচারীর তথ্য সংশোধন' : 'Edit Employee Details')
              : (lang === 'bn' ? 'নতুন কর্মচারী সংযোজন' : 'Add New Employee Record')}
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white text-lg">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                {lang === 'bn' ? 'নাম (বাংলা) *' : 'Name (Bangla) *'}
              </label>
              <input
                required
                type="text"
                value={formData.nameBangla}
                onChange={e => setFormData({ ...formData, nameBangla: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                {lang === 'bn' ? 'নাম (English) *' : 'Name (English) *'}
              </label>
              <input
                required
                type="text"
                value={formData.nameEnglish}
                onChange={e => setFormData({ ...formData, nameEnglish: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                {lang === 'bn' ? 'কর্মচারী আইডি নম্বর *' : 'Employee ID Number *'}
              </label>
              <input
                required
                type="text"
                value={formData.employeeIdNumber}
                onChange={e => setFormData({ ...formData, employeeIdNumber: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono focus:ring-2 focus:ring-emerald-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                {lang === 'bn' ? 'জাতীয় পরিচয়পত্র (NID) নম্বর' : 'National ID (NID)'}
              </label>
              <input
                type="text"
                value={formData.nationalId}
                onChange={e => setFormData({ ...formData, nationalId: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono focus:ring-2 focus:ring-emerald-600 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                {lang === 'bn' ? 'ক্যাটাগরি *' : 'Category *'}
              </label>
              <select
                value={formData.category}
                onChange={e => setFormData({ ...formData, category: e.target.value as EmployeeCategory })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:outline-none"
              >
                <option value="mes_civilian">MES Civilian (সামরিক প্রকৌশল)</option>
                <option value="defence_civilian">Defence Civilian (প্রতিরক্ষা বেসামরিক)</option>
                <option value="general_civil">General Civil (সাধারণ বেসামরিক)</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                {lang === 'bn' ? 'বর্তমান গ্রেড (১ - ২০) *' : 'Current Grade (1 - 20) *'}
              </label>
              <input
                required
                type="number"
                min={1}
                max={20}
                value={formData.currentGrade}
                onChange={e => setFormData({ ...formData, currentGrade: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono focus:ring-2 focus:ring-emerald-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                {lang === 'bn' ? 'বিদ্যমান মূল বেতন (BDT) *' : 'Existing Basic Pay (BDT) *'}
              </label>
              <input
                required
                type="number"
                value={formData.currentBasicSalary}
                onChange={e => setFormData({ ...formData, currentBasicSalary: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono focus:ring-2 focus:ring-emerald-600 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                {lang === 'bn' ? 'পদবী *' : 'Designation *'}
              </label>
              <input
                required
                type="text"
                value={formData.currentDesignation}
                onChange={e => setFormData({ ...formData, currentDesignation: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                {lang === 'bn' ? 'দপ্তর / কর্মস্থল' : 'Office Location'}
              </label>
              <input
                type="text"
                value={formData.officeLocation}
                onChange={e => setFormData({ ...formData, officeLocation: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                {lang === 'bn' ? 'প্রথম যোগদানের তারিখ' : 'First Joining Date'}
              </label>
              <input
                type="date"
                value={formData.joiningDate}
                onChange={e => setFormData({ ...formData, joiningDate: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono focus:ring-2 focus:ring-emerald-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                {lang === 'bn' ? 'বেতন নির্ধারণ অবস্থা' : 'Fixation Workflow Status'}
              </label>
              <select
                value={formData.fixationStatus}
                onChange={e => setFormData({ ...formData, fixationStatus: e.target.value as FixationStatus })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:outline-none"
              >
                <option value="pending">Pending (অপেক্ষমাণ)</option>
                <option value="calculated">Calculated (গণনাকৃত)</option>
                <option value="reviewed">Reviewed (পর্যালোচনাধীন)</option>
                <option value="finalized">Finalized (চূড়ান্ত)</option>
              </select>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              {lang === 'bn' ? 'বাতিল' : 'Cancel'}
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-700 active:bg-emerald-900 rounded-lg shadow-sm transition-colors cursor-pointer"
            >
              {lang === 'bn' ? 'সংরক্ষণ করুন' : 'Save Record'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
