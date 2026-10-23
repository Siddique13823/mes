import React, { useState } from 'react';
import { Employee, ServiceEvent } from '../../types';
import { History, Plus, Calendar, FileText, Award, TrendingUp, CheckCircle, Trash2 } from 'lucide-react';

interface ServiceHistoryTabProps {
  selectedEmployee: Employee;
  onUpdateEmployee: (emp: Employee) => void;
  lang: 'bn' | 'en';
}

export const ServiceHistoryTab: React.FC<ServiceHistoryTabProps> = ({
  selectedEmployee,
  onUpdateEmployee,
  lang
}) => {
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [newEvent, setNewEvent] = useState<Partial<ServiceEvent>>({
    effectiveDate: '2026-07-01',
    eventType: 'increment',
    designation: selectedEmployee.currentDesignation,
    grade: selectedEmployee.currentGrade,
    basicSalary: selectedEmployee.currentBasicSalary,
    orderNumber: 'ইনক্রিমেন্ট আদেশ ২০২৬',
    orderDate: '2026-07-01',
    issuingAuthority: selectedEmployee.department,
    remarks: 'নিয়মিত সার্ভিস রেকর্ড'
  });

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    const event: ServiceEvent = {
      id: `se-${Date.now()}`,
      employeeId: selectedEmployee.id,
      effectiveDate: newEvent.effectiveDate || '2026-01-01',
      eventType: newEvent.eventType || 'increment',
      designation: newEvent.designation || selectedEmployee.currentDesignation,
      grade: Number(newEvent.grade) || selectedEmployee.currentGrade,
      basicSalary: Number(newEvent.basicSalary) || selectedEmployee.currentBasicSalary,
      orderNumber: newEvent.orderNumber || 'প্রজ্ঞাপন',
      orderDate: newEvent.orderDate || newEvent.effectiveDate || '2026-01-01',
      issuingAuthority: newEvent.issuingAuthority || selectedEmployee.department,
      remarks: newEvent.remarks || ''
    };

    const updatedEvents = [...selectedEmployee.serviceEvents, event].sort(
      (a, b) => new Date(a.effectiveDate).getTime() - new Date(b.effectiveDate).getTime()
    );

    onUpdateEmployee({
      ...selectedEmployee,
      serviceEvents: updatedEvents,
      updatedAt: new Date().toISOString()
    });

    setShowAddEventModal(false);
  };

  const handleDeleteEvent = (id: string) => {
    if (confirm('এই সার্ভিস ইভেন্টটি মুছে ফেলতে চান?')) {
      const updatedEvents = selectedEmployee.serviceEvents.filter(se => se.id !== id);
      onUpdateEmployee({
        ...selectedEmployee,
        serviceEvents: updatedEvents,
        updatedAt: new Date().toISOString()
      });
    }
  };

  const getEventBadge = (type: ServiceEvent['eventType']) => {
    switch (type) {
      case 'appointment':
        return { label: 'নিয়োগ (Appointment)', bg: 'bg-blue-100 text-blue-800' };
      case 'promotion':
        return { label: 'পদোন্নতি (Promotion)', bg: 'bg-emerald-100 text-emerald-800' };
      case 'higher_grade':
        return { label: 'উচ্চতর গ্রেড (Higher Grade)', bg: 'bg-purple-100 text-purple-800' };
      case 'time_scale':
        return { label: 'টাইম স্কেল (Time Scale)', bg: 'bg-indigo-100 text-indigo-800' };
      case 'increment':
        return { label: 'ইনক্রিমেন্ট (Increment)', bg: 'bg-amber-100 text-amber-800' };
      case 'previous_fixation':
        return { label: 'পূর্বতন বেতন নির্ধারণ (Fixation)', bg: 'bg-teal-100 text-teal-800' };
      default:
        return { label: 'অন্যান্য (Other)', bg: 'bg-slate-100 text-slate-800' };
    }
  };

  return (
    <div className="space-y-6">
      {/* Header and Add Button */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-bold text-slate-900 text-base">{selectedEmployee.nameBangla}</span>
            <span className="text-xs text-slate-400">·</span>
            <span className="text-xs font-mono text-slate-600">{selectedEmployee.employeeIdNumber}</span>
          </div>
          <p className="text-xs text-slate-500">
            {lang === 'bn'
              ? 'যোগদান হতে বর্তমান পর্যন্ত সরকারি ও সামরিক প্রকৌশল সার্ভিস রেকর্ডের পূর্ণাঙ্গ বিবরণ'
              : 'Complete chronological history of appointments, increments, promotions, and pay fixations'}
          </p>
        </div>

        <button
          onClick={() => setShowAddEventModal(true)}
          className="px-3.5 py-2 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-700 active:bg-emerald-900 rounded-lg shadow-sm transition-colors flex items-center gap-2 cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>{lang === 'bn' ? '+ নতুন সার্ভিস ইভেন্ট যোগ করুন' : '+ Add Service Event'}</span>
        </button>
      </div>

      {/* Service Events Timeline */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 sm:p-6">
        <h3 className="font-bold text-slate-900 text-sm mb-6 flex items-center gap-2">
          <History className="w-4 h-4 text-emerald-700" />
          <span>{lang === 'bn' ? 'সার্ভিস বুক ও গেজেট নির্দেশিত টাইমলাইন' : 'Service Record Chronological Timeline'}</span>
        </h3>

        <div className="relative border-l-2 border-slate-200 ml-4 sm:ml-6 space-y-6">
          {selectedEmployee.serviceEvents.map((event, idx) => {
            const badge = getEventBadge(event.eventType);
            return (
              <div key={event.id} className="relative pl-6 sm:pl-8 group">
                {/* Node icon */}
                <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-white border-4 border-emerald-600 shadow-sm" />

                {/* Event Card */}
                <div className="bg-slate-50 hover:bg-slate-100/80 p-4 rounded-xl border border-slate-200/90 transition-all">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/60 pb-2 mb-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${badge.bg}`}>
                        {badge.label}
                      </span>
                      <span className="font-mono text-xs font-semibold text-slate-700">
                        {event.effectiveDate}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="font-mono font-bold text-xs sm:text-sm text-emerald-900 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        মূল বেতন: ৳{event.basicSalary.toLocaleString()} (গ্রেড-{event.grade})
                      </span>
                      {selectedEmployee.serviceEvents.length > 1 && (
                        <button
                          onClick={() => handleDeleteEvent(event.id)}
                          className="text-slate-400 hover:text-red-600 transition-colors p-1"
                          title="Delete Event"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-slate-400 block text-[10px]">{lang === 'bn' ? 'পদবী ও গ্রেড' : 'Post & Grade'}</span>
                      <span className="font-semibold text-slate-800">{event.designation} (গ্রেড-{event.grade})</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">{lang === 'bn' ? 'আদেশ নম্বর ও কর্তৃপক্ষ' : 'Order & Authority'}</span>
                      <span className="text-slate-800">{event.orderNumber} ({event.issuingAuthority})</span>
                    </div>
                  </div>

                  {event.remarks && (
                    <div className="mt-2 pt-2 border-t border-slate-200/60 text-xs text-slate-600">
                      <span className="font-semibold text-slate-700">মন্তব্য: </span>
                      {event.remarks}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add Event Modal */}
      {showAddEventModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-lg overflow-hidden">
            <div className="bg-slate-900 text-white p-4 flex items-center justify-between">
              <h3 className="font-bold text-sm">
                {lang === 'bn' ? 'নতুন সার্ভিস ইভেন্ট এন্ট্রি' : 'Add New Service Event'}
              </h3>
              <button onClick={() => setShowAddEventModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleAddEvent} className="p-5 space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">কার্যকর তারিখ *</label>
                  <input
                    required
                    type="date"
                    value={newEvent.effectiveDate}
                    onChange={e => setNewEvent({ ...newEvent, effectiveDate: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded-lg font-mono focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">ইভেন্টের ধরণ *</label>
                  <select
                    value={newEvent.eventType}
                    onChange={e => setNewEvent({ ...newEvent, eventType: e.target.value as any })}
                    className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  >
                    <option value="appointment">নিয়োগ (Appointment)</option>
                    <option value="increment">ইনক্রিমেন্ট (Annual Increment)</option>
                    <option value="promotion">পদোন্নতি (Promotion)</option>
                    <option value="higher_grade">উচ্চতর গ্রেড (Higher Grade)</option>
                    <option value="time_scale">টাইম স্কেল (Time Scale)</option>
                    <option value="previous_fixation">পূর্বতন বেতন নির্ধারণ</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">পদবী *</label>
                  <input
                    required
                    type="text"
                    value={newEvent.designation}
                    onChange={e => setNewEvent({ ...newEvent, designation: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">গ্রেড (১-২০) *</label>
                  <input
                    required
                    type="number"
                    min={1}
                    max={20}
                    value={newEvent.grade}
                    onChange={e => setNewEvent({ ...newEvent, grade: Number(e.target.value) })}
                    className="w-full p-2 border border-slate-300 rounded-lg font-mono focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">মূল বেতন (BDT) *</label>
                  <input
                    required
                    type="number"
                    value={newEvent.basicSalary}
                    onChange={e => setNewEvent({ ...newEvent, basicSalary: Number(e.target.value) })}
                    className="w-full p-2 border border-slate-300 rounded-lg font-mono focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">আদেশ নম্বর *</label>
                  <input
                    required
                    type="text"
                    value={newEvent.orderNumber}
                    onChange={e => setNewEvent({ ...newEvent, orderNumber: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">জারিকারী কর্তৃপক্ষ</label>
                <input
                  type="text"
                  value={newEvent.issuingAuthority}
                  onChange={e => setNewEvent({ ...newEvent, issuingAuthority: e.target.value })}
                  className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">মন্তব্য / প্রাসঙ্গিক বিবরণ</label>
                <input
                  type="text"
                  value={newEvent.remarks}
                  onChange={e => setNewEvent({ ...newEvent, remarks: e.target.value })}
                  className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                />
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddEventModal(false)}
                  className="px-3 py-1.5 text-xs text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-700 rounded-lg shadow-sm"
                >
                  সংরক্ষণ করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
