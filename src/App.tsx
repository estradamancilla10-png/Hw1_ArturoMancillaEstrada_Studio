import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Clock, 
  Award, 
  FileText, 
  CheckCircle2, 
  Calendar, 
  Building2, 
  Download, 
  ShieldCheck, 
  ArrowRight,
  Sparkles,
  Layers,
  BookOpen,
  GraduationCap
} from 'lucide-react';
import { VolunteerShift, ServiceGoal, StudentProfile, ServiceCategory, UTDDepartmentCode } from './types';
import { 
  loadShifts, 
  saveShifts, 
  loadGoals, 
  saveGoals, 
  loadProfile, 
  saveProfile, 
  resetAllData,
  exportShiftsToCSV,
  triggerConfetti
} from './utils/storage';
import { INITIAL_SHIFTS, INITIAL_GOALS, INITIAL_STUDENT_PROFILE } from './data/initialData';

import { TopBar } from './components/TopBar';
import { StatsOverview } from './components/StatsOverview';
import { ShiftList } from './components/ShiftList';
import { ShiftModal } from './components/ShiftModal';
import { GoalsSection } from './components/GoalsSection';
import { ShiftTimer } from './components/ShiftTimer';
import { OfficialTimesheetView } from './components/OfficialTimesheetView';
import { VerificationModal } from './components/VerificationModal';
import { ProfileModal } from './components/ProfileModal';
import { UTDProtocolsView } from './components/UTDProtocolsView';

export default function App() {
  const [profile, setProfile] = useState<StudentProfile>(() => loadProfile());
  const [shifts, setShifts] = useState<VolunteerShift[]>(() => loadShifts());
  const [goals, setGoals] = useState<ServiceGoal[]>(() => loadGoals());
  const [currentTab, setCurrentTab] = useState<string>('dashboard');
  const [activeProtocolDept, setActiveProtocolDept] = useState<UTDDepartmentCode>('hpac');

  // Modals state
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);
  const [shiftToEdit, setShiftToEdit] = useState<VolunteerShift | null>(null);
  const [shiftInitialValues, setShiftInitialValues] = useState<Partial<VolunteerShift> | undefined>(undefined);
  
  const [verificationShift, setVerificationShift] = useState<VolunteerShift | null>(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  // Filter overrides passed from quick dashboard stats
  const [shiftListFilterStatus, setShiftListFilterStatus] = useState<'all' | 'verified' | 'pending'>('all');
  const [shiftListFilterCategory, setShiftListFilterCategory] = useState<'all' | ServiceCategory>('all');
  const [shiftListFilterDepartment, setShiftListFilterDepartment] = useState<'all' | UTDDepartmentCode>('all');

  // Save to localStorage on state changes
  useEffect(() => {
    saveShifts(shifts);
  }, [shifts]);

  useEffect(() => {
    saveGoals(goals);
  }, [goals]);

  useEffect(() => {
    saveProfile(profile);
  }, [profile]);

  // Unique organization names for timer autocomplete
  const recentOrganizations = Array.from(new Set(shifts.map((s) => s.organization)));

  // Handlers
  const handleSaveShift = (newShift: VolunteerShift) => {
    const existingIndex = shifts.findIndex((s) => s.id === newShift.id);
    if (existingIndex >= 0) {
      const updated = [...shifts];
      updated[existingIndex] = newShift;
      setShifts(updated);
    } else {
      setShifts([newShift, ...shifts]);
      if (newShift.hours >= 4) {
        triggerConfetti();
      }
    }
  };

  const handleDeleteShift = (shiftId: string) => {
    if (window.confirm('Are you sure you want to delete this volunteer shift log?')) {
      setShifts(shifts.filter((s) => s.id !== shiftId));
    }
  };

  const handleOpenEdit = (shift: VolunteerShift) => {
    setShiftToEdit(shift);
    setShiftInitialValues(undefined);
    setIsLogModalOpen(true);
  };

  const handleOpenNewLog = () => {
    setShiftToEdit(null);
    setShiftInitialValues(undefined);
    setIsLogModalOpen(true);
  };

  const handleTimerFinish = (prefillData: Partial<VolunteerShift>) => {
    setShiftToEdit(null);
    setShiftInitialValues(prefillData);
    setIsLogModalOpen(true);
  };

  const handleConfirmVerification = (shiftId: string, signatureDataUrl: string) => {
    const updated = shifts.map((s) => {
      if (s.id === shiftId) {
        return {
          ...s,
          verificationStatus: 'verified' as const,
          supervisorSignature: signatureDataUrl,
          verifiedAt: new Date().toISOString(),
        };
      }
      return s;
    });
    setShifts(updated);
    triggerConfetti();
  };

  const handleAddGoal = (newGoal: ServiceGoal) => {
    setGoals([...goals, newGoal]);
    triggerConfetti();
  };

  const handleUpdateGoal = (updatedGoal: ServiceGoal) => {
    setGoals(goals.map((g) => (g.id === updatedGoal.id ? updatedGoal : g)));
  };

  const handleDeleteGoal = (goalId: string) => {
    if (window.confirm('Delete this service goal requirement?')) {
      setGoals(goals.filter((g) => g.id !== goalId));
    }
  };

  const handleResetData = () => {
    resetAllData();
    setShifts(INITIAL_SHIFTS);
    setGoals(INITIAL_GOALS);
    setProfile(INITIAL_STUDENT_PROFILE);
  };

  // Nav shortcuts from stats
  const handleFilterPending = () => {
    setShiftListFilterStatus('pending');
    setShiftListFilterCategory('all');
    setShiftListFilterDepartment('all');
    setCurrentTab('shifts');
  };

  const handleFilterClinical = () => {
    setShiftListFilterCategory('clinical');
    setShiftListFilterDepartment('hpac');
    setShiftListFilterStatus('all');
    setCurrentTab('shifts');
  };

  // Quick log from department partner directory
  const handleQuickLogForSite = (orgName: string, location: string, utdDept: UTDDepartmentCode, category: any) => {
    setShiftToEdit(null);
    setShiftInitialValues({
      organization: orgName,
      location,
      utdDepartment: utdDept,
      category,
      hours: 4.0,
      startTime: '09:00',
      endTime: '13:00',
    });
    setIsLogModalOpen(true);
  };

  const navigateToProtocolDept = (dept: UTDDepartmentCode) => {
    setActiveProtocolDept(dept);
    setCurrentTab('protocols');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* Strict Top Navigation Bar */}
      <TopBar
        currentTab={currentTab}
        onSelectTab={(tab) => {
          setShiftListFilterStatus('all');
          setShiftListFilterCategory('all');
          setShiftListFilterDepartment('all');
          setCurrentTab(tab);
        }}
        onOpenLogModal={handleOpenNewLog}
        onOpenProfile={() => setIsProfileModalOpen(true)}
        profile={profile}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* VIEW 1: DASHBOARD */}
        {currentTab === 'dashboard' && (
          <div className="space-y-6">
            {/* UTD Comet Greeting & Student Hero */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 shadow-xs">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setIsProfileModalOpen(true)}
                    className="relative group shrink-0"
                    title="Click to view/edit UTD NetID and academic credentials"
                  >
                    <img
                      src={profile.avatarUrl}
                      alt={profile.name}
                      referrerPolicy="no-referrer"
                      className="w-14 h-14 rounded-full object-cover border-2 border-orange-200 group-hover:border-orange-500 transition-colors"
                    />
                    <div className="absolute -bottom-1 -right-1 bg-white p-0.5 rounded-full shadow-xs">
                      <div className="w-3.5 h-3.5 rounded-full bg-emerald-600 border-2 border-white" />
                    </div>
                  </button>

                  <div>
                    <div className="flex items-center gap-2">
                      <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                        {profile.name}
                      </h1>
                      <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-orange-50 text-orange-800 border border-orange-200">
                        NetID: {profile.netId}
                      </span>
                    </div>
                    <div className="text-xs text-slate-600 mt-1 flex flex-wrap items-center gap-2">
                      <span className="font-semibold text-slate-900">The University of Texas at Dallas</span>
                      <span aria-hidden="true" className="text-slate-300">·</span>
                      <span>{profile.major}</span>
                      <span aria-hidden="true" className="text-slate-300">·</span>
                      <span>{profile.standing} ({profile.term})</span>
                    </div>
                  </div>
                </div>

                {/* Quick Action Buttons */}
                <div className="flex flex-wrap items-center gap-2.5">
                  <button
                    onClick={() => setCurrentTab('protocols')}
                    className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-orange-800 bg-orange-50 hover:bg-orange-100 border border-orange-200 rounded-lg transition-colors shadow-xs"
                  >
                    <Building2 className="w-3.5 h-3.5 text-orange-600" />
                    <span>UTD Department Protocols</span>
                  </button>

                  <button
                    onClick={() => setCurrentTab('timer')}
                    className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                  >
                    <Clock className="w-3.5 h-3.5 text-slate-600" />
                    <span>Shift Clock</span>
                  </button>

                  <button
                    onClick={() => setCurrentTab('timesheet')}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-900 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg transition-colors shadow-xs"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>UTD Timesheet / PDF</span>
                  </button>
                </div>
              </div>

              {/* Quick Department Protocols Bar inside Hero */}
              <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600">
                <span className="text-[11px] font-semibold text-slate-400">
                  Quick UTD Department Standards:
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => navigateToProtocolDept('hpac')}
                    className="px-2.5 py-1 rounded-md bg-slate-50 hover:bg-slate-100 text-slate-700 font-medium transition-colors border border-slate-200 text-xs"
                  >
                    🩺 HPAC Pre-Health
                  </button>
                  <button
                    onClick={() => navigateToProtocolDept('jsom')}
                    className="px-2.5 py-1 rounded-md bg-slate-50 hover:bg-slate-100 text-slate-700 font-medium transition-colors border border-slate-200 text-xs"
                  >
                    💼 JSOM 100-Hr
                  </button>
                  <button
                    onClick={() => navigateToProtocolDept('osv')}
                    className="px-2.5 py-1 rounded-md bg-slate-50 hover:bg-slate-100 text-slate-700 font-medium transition-colors border border-slate-200 text-xs"
                  >
                    ☄️ OSV Comet Honors
                  </button>
                  <button
                    onClick={() => navigateToProtocolDept('ecs')}
                    className="px-2.5 py-1 rounded-md bg-slate-50 hover:bg-slate-100 text-slate-700 font-medium transition-colors border border-slate-200 text-xs"
                  >
                    🤖 ECS STEM
                  </button>
                  <button
                    onClick={() => navigateToProtocolDept('fsl')}
                    className="px-2.5 py-1 rounded-md bg-slate-50 hover:bg-slate-100 text-slate-700 font-medium transition-colors border border-slate-200 text-xs"
                  >
                    🏛️ Greek Life
                  </button>
                </div>
              </div>
            </div>

            {/* High-Density Stats Overview */}
            <StatsOverview
              shifts={shifts}
              goals={goals}
              onFilterPending={handleFilterPending}
              onFilterClinical={handleFilterClinical}
            />

            {/* Split Section: Recent Activity & Mandate Goals */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left (2 cols): Recent Shifts */}
              <div className="lg:col-span-2 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <div className="flex items-center gap-2">
                    <h2 className="text-base font-bold text-slate-900 tracking-tight">
                      Recent UTD Service Shifts
                    </h2>
                    <span className="text-xs text-slate-500 font-mono">
                      (showing latest {Math.min(shifts.length, 5)})
                    </span>
                  </div>

                  <button
                    onClick={() => setCurrentTab('shifts')}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-orange-700 hover:text-orange-900 transition-colors"
                  >
                    <span>View All Shifts</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="space-y-3">
                  {shifts.slice(0, 5).map((shift) => (
                    <div
                      key={shift.id}
                      className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-slate-300 transition-colors"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-slate-900 text-sm">
                            {shift.organization}
                          </span>
                          {shift.utdDepartment && (
                            <span className="text-[10px] font-mono font-bold uppercase px-1.5 py-0.5 rounded bg-slate-100 text-slate-700">
                              {shift.utdDepartment}
                            </span>
                          )}
                          <span className="text-slate-400 text-xs">·</span>
                          <span className="text-xs text-slate-600 capitalize">
                            {shift.category}
                          </span>
                        </div>
                        <div className="text-xs text-slate-500 font-mono flex items-center gap-2">
                          <span>{shift.date}</span>
                          <span aria-hidden="true" className="font-sans text-slate-300">·</span>
                          <span>{shift.startTime} – {shift.endTime}</span>
                          {shift.location && (
                            <>
                              <span aria-hidden="true" className="font-sans text-slate-300">·</span>
                              <span className="font-sans text-slate-600 truncate max-w-xs">{shift.location}</span>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                        <div className="text-right">
                          <span className="font-mono font-bold text-base text-slate-950 tabular-nums">
                            {shift.hours.toFixed(1)}h
                          </span>
                        </div>

                        {shift.verificationStatus === 'verified' ? (
                          <button
                            onClick={() => setVerificationShift(shift)}
                            className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-emerald-800 bg-emerald-50 rounded-md border border-emerald-200"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Signed</span>
                          </button>
                        ) : (
                          <button
                            onClick={() => setVerificationShift(shift)}
                            className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-amber-800 bg-amber-50 hover:bg-amber-100 rounded-md border border-amber-300 transition-colors"
                          >
                            <span>Sign-off →</span>
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right (1 col): Goal Progress Quick Glance */}
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <h2 className="text-base font-bold text-slate-900 tracking-tight">
                    UTD Mandates &amp; Goals
                  </h2>
                  <button
                    onClick={() => setCurrentTab('goals')}
                    className="text-xs font-semibold text-orange-700 hover:text-orange-900 transition-colors"
                  >
                    Manage
                  </button>
                </div>

                <div className="space-y-3">
                  {goals.map((g) => {
                    const linked = shifts.filter((s) => s.goalId === g.id || s.category === g.category);
                    const hrs = linked.reduce((sum, s) => sum + s.hours, 0);
                    const pct = Math.min(100, Math.round((hrs / g.targetHours) * 100));

                    return (
                      <div
                        key={g.id}
                        className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs space-y-2"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className="text-xs font-bold text-slate-900 line-clamp-1">
                              {g.title}
                            </div>
                            <div className="text-[11px] text-slate-500 capitalize">
                              {g.utdDepartment ? `${g.utdDepartment.toUpperCase()} · ` : ''}Due {g.deadline}
                            </div>
                          </div>
                          <span className="text-xs font-mono font-bold text-orange-700 tabular-nums">
                            {pct}%
                          </span>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-300 ${
                              pct >= 100 ? 'bg-emerald-600' : 'bg-orange-600'
                            }`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>

                        <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
                          <span>{hrs.toFixed(1)} / {g.targetHours}h</span>
                          <span>{Math.max(0, g.targetHours - hrs).toFixed(1)}h left</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* UTD Accreditation Box */}
                <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-xl p-4 text-xs text-emerald-950 space-y-1.5">
                  <div className="font-semibold flex items-center gap-1.5 text-emerald-900">
                    <ShieldCheck className="w-4 h-4 text-emerald-700" />
                    <span>UTD Institutional Compliance</span>
                  </div>
                  <p className="text-[11px] text-emerald-900/90 leading-relaxed">
                    Designed to fulfill Texas Medical &amp; Dental Schools Application Service (TMDSAS), JSOM CMC Handshake approval, and annual Office of Student Volunteerism (OSV) Comet Honor audits.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: UTD DEPARTMENT PROTOCOLS TABS */}
        {currentTab === 'protocols' && (
          <UTDProtocolsView
            activeDeptFromQuery={activeProtocolDept}
            onQuickLogForSite={handleQuickLogForSite}
            onAddGoalFromProtocol={handleAddGoal}
          />
        )}

        {/* VIEW 3: FULL SHIFT LOG */}
        {currentTab === 'shifts' && (
          <ShiftList
            shifts={shifts}
            onOpenLogModal={handleOpenNewLog}
            onEditShift={handleOpenEdit}
            onDeleteShift={handleDeleteShift}
            onOpenVerification={(shift) => setVerificationShift(shift)}
            filterStatus={shiftListFilterStatus}
            filterCategory={shiftListFilterCategory}
            filterDepartment={shiftListFilterDepartment}
          />
        )}

        {/* VIEW 4: GOALS & MANDATES */}
        {currentTab === 'goals' && (
          <GoalsSection
            goals={goals}
            shifts={shifts}
            onAddGoal={handleAddGoal}
            onUpdateGoal={handleUpdateGoal}
            onDeleteGoal={handleDeleteGoal}
          />
        )}

        {/* VIEW 5: ACTIVE SHIFT CLOCK */}
        {currentTab === 'timer' && (
          <ShiftTimer
            onFinishShift={handleTimerFinish}
            recentOrganizations={recentOrganizations}
          />
        )}

        {/* VIEW 6: OFFICIAL UTD PRINTABLE TIMESHEET */}
        {currentTab === 'timesheet' && (
          <OfficialTimesheetView
            shifts={shifts}
            profile={profile}
          />
        )}
      </main>

      {/* Modals */}
      <ShiftModal
        isOpen={isLogModalOpen}
        onClose={() => {
          setIsLogModalOpen(false);
          setShiftToEdit(null);
          setShiftInitialValues(undefined);
        }}
        onSave={handleSaveShift}
        shiftToEdit={shiftToEdit}
        goals={goals}
        initialValues={shiftInitialValues}
      />

      {verificationShift && (
        <VerificationModal
          isOpen={!!verificationShift}
          onClose={() => setVerificationShift(null)}
          shift={verificationShift}
          profile={profile}
          onConfirmVerification={handleConfirmVerification}
        />
      )}

      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        profile={profile}
        onSaveProfile={setProfile}
        onResetData={handleResetData}
      />
    </div>
  );
}
