import React, { useState, useMemo } from 'react';
import { Search, Plus, CheckCircle2, Clock3, Edit2, Trash2, ShieldCheck, BookOpen, ExternalLink, Filter } from 'lucide-react';
import { VolunteerShift, ServiceCategory, VerificationStatus, StudentProfile, UTDDepartmentCode } from '../types';
import { CATEGORY_LABELS, UTD_DEPARTMENT_LABELS } from '../data/initialData';

interface ShiftListProps {
  shifts: VolunteerShift[];
  onOpenLogModal: () => void;
  onEditShift: (shift: VolunteerShift) => void;
  onDeleteShift: (shiftId: string) => void;
  onOpenVerification: (shift: VolunteerShift) => void;
  filterStatus?: VerificationStatus | 'all';
  filterCategory?: ServiceCategory | 'all';
  filterDepartment?: UTDDepartmentCode | 'all';
}

export const ShiftList: React.FC<ShiftListProps> = ({
  shifts,
  onOpenLogModal,
  onEditShift,
  onDeleteShift,
  onOpenVerification,
  filterStatus: initialFilterStatus = 'all',
  filterCategory: initialFilterCategory = 'all',
  filterDepartment: initialFilterDepartment = 'all',
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | 'all'>(initialFilterCategory);
  const [selectedDept, setSelectedDept] = useState<UTDDepartmentCode | 'all'>(initialFilterDepartment);
  const [selectedStatus, setSelectedStatus] = useState<VerificationStatus | 'all'>(initialFilterStatus);
  const [viewingReflectionShift, setViewingReflectionShift] = useState<VolunteerShift | null>(null);

  // Sync if parent updates
  React.useEffect(() => {
    if (initialFilterStatus) setSelectedStatus(initialFilterStatus);
  }, [initialFilterStatus]);

  React.useEffect(() => {
    if (initialFilterCategory) setSelectedCategory(initialFilterCategory);
  }, [initialFilterCategory]);

  React.useEffect(() => {
    if (initialFilterDepartment) setSelectedDept(initialFilterDepartment);
  }, [initialFilterDepartment]);

  const departments: { id: UTDDepartmentCode | 'all'; label: string }[] = [
    { id: 'all', label: 'All UTD Standards' },
    { id: 'hpac', label: 'HPAC Pre-Health' },
    { id: 'osv', label: 'OSV Comet Honors' },
    { id: 'jsom', label: 'JSOM 100-Hr' },
    { id: 'ecs', label: 'ECS STEM Outreach' },
    { id: 'fsl', label: 'Greek Philanthropy' },
    { id: 'honors', label: 'Honors College' },
    { id: 'epps', label: 'EPPS Pre-Law' },
  ];

  const filteredShifts = useMemo(() => {
    return shifts.filter((s) => {
      // Dept match
      if (selectedDept !== 'all' && s.utdDepartment !== selectedDept) return false;
      // Category match
      if (selectedCategory !== 'all' && s.category !== selectedCategory) return false;
      // Status match
      if (selectedStatus !== 'all' && s.verificationStatus !== selectedStatus) return false;
      // Query match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const orgMatch = s.organization.toLowerCase().includes(q);
        const locMatch = s.location.toLowerCase().includes(q);
        const descMatch = s.description.toLowerCase().includes(q);
        const superMatch = s.supervisorName.toLowerCase().includes(q);
        const skillMatch = s.skillsLearned.some((sk) => sk.toLowerCase().includes(q));
        const deptMatch = s.utdDepartment ? s.utdDepartment.toLowerCase().includes(q) : false;
        return orgMatch || locMatch || descMatch || superMatch || skillMatch || deptMatch;
      }
      return true;
    });
  }, [shifts, selectedDept, selectedCategory, selectedStatus, searchQuery]);

  return (
    <div className="space-y-4">
      {/* Top Controls: Search + Status + Department Tabs */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search UTSW, Parkland, Comet Cupboard, duties..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-orange-500/20 focus:border-orange-600"
            />
          </div>

          {/* Verification Status Filter Tabs */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg shrink-0">
            <button
              onClick={() => setSelectedStatus('all')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                selectedStatus === 'all'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Shifts ({shifts.length})
            </button>
            <button
              onClick={() => setSelectedStatus('verified')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                selectedStatus === 'verified'
                  ? 'bg-white text-emerald-800 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Verified ({shifts.filter((s) => s.verificationStatus === 'verified').length})
            </button>
            <button
              onClick={() => setSelectedStatus('pending')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                selectedStatus === 'pending'
                  ? 'bg-white text-amber-800 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Pending ({shifts.filter((s) => s.verificationStatus === 'pending').length})
            </button>
          </div>
        </div>

        {/* UTD Department Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          <span className="text-[11px] font-semibold text-slate-400 whitespace-nowrap mr-1">
            UTD Standard:
          </span>
          {departments.map((dept) => {
            const isActive = selectedDept === dept.id;
            return (
              <button
                key={dept.id}
                onClick={() => setSelectedDept(dept.id)}
                className={`whitespace-nowrap shrink-0 px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {dept.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Shifts List */}
      {filteredShifts.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-xl p-12 text-center shadow-xs">
          <Clock3 className="w-8 h-8 text-slate-300 mx-auto mb-3" />
          <h3 className="text-sm font-bold text-slate-800">No Volunteer Shifts Found</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            {shifts.length === 0
              ? 'You have not recorded any shifts yet. Start logging your volunteer service hours for UTD.'
              : 'No shifts match your search and filter criteria.'}
          </p>
          <div className="mt-4">
            <button
              onClick={onOpenLogModal}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-orange-600 hover:bg-orange-700 rounded-lg transition-colors shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Log First Shift</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredShifts.map((shift) => {
            const cat = CATEGORY_LABELS[shift.category] || {
              label: shift.category,
              bg: 'bg-slate-50',
              text: 'text-slate-700',
              border: 'border-slate-200',
            };

            const deptInfo = shift.utdDepartment ? UTD_DEPARTMENT_LABELS[shift.utdDepartment] : null;

            return (
              <div
                key={shift.id}
                className="bg-white border border-slate-200 hover:border-slate-300 rounded-xl p-4 sm:p-5 shadow-xs transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  {/* Left: Organization, Category, Metadata */}
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
                        {shift.organization}
                      </span>
                      {deptInfo && (
                        <span className={`text-[10px] font-bold font-mono px-2 py-0.5 rounded border ${deptInfo.color}`}>
                          {deptInfo.badge}
                        </span>
                      )}
                      <span className="text-slate-400 text-xs">·</span>
                      <span className="text-xs text-slate-600 font-medium">{cat.label}</span>
                    </div>

                    {/* Unboxed Metadata with · separator */}
                    <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
                      <span>{shift.date}</span>
                      <span aria-hidden="true" className="font-sans text-slate-300">·</span>
                      <span>
                        {shift.startTime} – {shift.endTime}
                      </span>
                      {shift.location && (
                        <>
                          <span aria-hidden="true" className="font-sans text-slate-300">·</span>
                          <span className="font-sans text-slate-600">{shift.location}</span>
                        </>
                      )}
                    </div>

                    {/* Duties & Description */}
                    <p className="text-xs text-slate-700 pt-1 leading-relaxed">
                      {shift.description}
                    </p>

                    {/* Skills acquired */}
                    {shift.skillsLearned && shift.skillsLearned.length > 0 && (
                      <div className="flex flex-wrap items-center gap-1.5 pt-1 text-[11px] text-slate-600">
                        <span className="text-slate-400">Competencies:</span>
                        {shift.skillsLearned.map((sk) => (
                          <span
                            key={sk}
                            className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[11px]"
                          >
                            {sk}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Right: Hours & Verification Status Action */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100 shrink-0 gap-2">
                    <div className="text-right">
                      <div className="text-xl sm:text-2xl font-bold font-mono text-slate-950 tabular-nums">
                        {shift.hours.toFixed(1)}
                        <span className="text-xs font-sans font-normal text-slate-500 ml-1">hrs</span>
                      </div>
                    </div>

                    {shift.verificationStatus === 'verified' ? (
                      <button
                        onClick={() => onOpenVerification(shift)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-md transition-colors"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Verified &amp; Signed</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => onOpenVerification(shift)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-300 rounded-md transition-colors shadow-xs"
                      >
                        <Clock3 className="w-3.5 h-3.5 text-amber-600" />
                        <span>Supervisor Sign-off →</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Card Footer: Supervisor Info + Reflection & Edit Actions */}
                <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="text-slate-400">Supervisor:</span>
                    <span className="font-medium text-slate-700">{shift.supervisorName}</span>
                    <span className="text-slate-300 font-mono text-[11px]">({shift.supervisorEmail})</span>
                  </div>

                  <div className="flex items-center gap-3">
                    {shift.reflection && (
                      <button
                        onClick={() => setViewingReflectionShift(shift)}
                        className="inline-flex items-center gap-1 text-orange-700 hover:text-orange-900 font-medium"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Read Reflection</span>
                      </button>
                    )}

                    <button
                      onClick={() => onEditShift(shift)}
                      className="p-1 text-slate-400 hover:text-slate-700"
                      title="Edit shift details"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => onDeleteShift(shift.id)}
                      className="p-1 text-slate-400 hover:text-rose-600"
                      title="Delete shift"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Reflection Reading Modal */}
      {viewingReflectionShift && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full border border-slate-200 shadow-xl overflow-hidden p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  UTD Experiential &amp; Clinical Reflection
                </h3>
                <div className="text-xs text-slate-500 mt-0.5">
                  {viewingReflectionShift.organization} · {viewingReflectionShift.date}
                </div>
              </div>
              <button
                onClick={() => setViewingReflectionShift(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/60 text-xs sm:text-sm text-slate-800 leading-relaxed font-serif italic">
              "{viewingReflectionShift.reflection}"
            </div>

            <div className="text-right">
              <button
                onClick={() => setViewingReflectionShift(null)}
                className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
