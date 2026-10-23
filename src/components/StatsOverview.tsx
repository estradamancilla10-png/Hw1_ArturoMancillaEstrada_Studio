import React from 'react';
import { CheckCircle2, Clock3, Stethoscope, Building2 } from 'lucide-react';
import { VolunteerShift, ServiceGoal } from '../types';

interface StatsOverviewProps {
  shifts: VolunteerShift[];
  goals: ServiceGoal[];
  onFilterPending?: () => void;
  onFilterClinical?: () => void;
}

export const StatsOverview: React.FC<StatsOverviewProps> = ({
  shifts,
  goals,
  onFilterPending,
  onFilterClinical,
}) => {
  const totalHours = shifts.reduce((sum, s) => sum + s.hours, 0);
  const verifiedShifts = shifts.filter((s) => s.verificationStatus === 'verified');
  const verifiedHours = verifiedShifts.reduce((sum, s) => sum + s.hours, 0);
  const pendingShifts = shifts.filter((s) => s.verificationStatus === 'pending');
  const pendingHours = pendingShifts.reduce((sum, s) => sum + s.hours, 0);

  const clinicalHours = shifts
    .filter((s) => s.category === 'clinical')
    .reduce((sum, s) => sum + s.hours, 0);

  const uniqueOrgs = new Set(shifts.map((s) => s.organization)).size;
  const verificationRate = totalHours > 0 ? Math.round((verifiedHours / totalHours) * 100) : 0;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {/* 1. Total Volunteer Hours */}
      <div className="bg-white border border-slate-200 rounded-xl p-4.5 shadow-xs">
        <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
          <span className="font-medium">Total Logged Hours</span>
          <span className="text-slate-400">{shifts.length} shifts</span>
        </div>
        <div className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 font-mono tabular-nums">
          {totalHours.toFixed(1)}
          <span className="text-sm font-sans font-normal text-slate-500 ml-1.5">hrs</span>
        </div>
        <div className="mt-2 text-xs text-slate-500 flex items-center gap-1.5">
          <span className="font-mono tabular-nums text-slate-700 font-medium">{verificationRate}%</span>
          <span>verified by supervisors</span>
        </div>
      </div>

      {/* 2. Verified Hours */}
      <div className="bg-white border border-slate-200 rounded-xl p-4.5 shadow-xs">
        <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
          <span className="font-medium">Official Verified</span>
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
        </div>
        <div className="text-2xl sm:text-3xl font-bold tracking-tight text-emerald-700 font-mono tabular-nums">
          {verifiedHours.toFixed(1)}
          <span className="text-sm font-sans font-normal text-emerald-600 ml-1.5">hrs</span>
        </div>
        <div className="mt-2 text-xs text-slate-500">
          <span>{verifiedShifts.length} verified timesheets</span>
        </div>
      </div>

      {/* 3. Pending Sign-offs */}
      <button
        onClick={onFilterPending}
        className="text-left bg-white border border-slate-200 hover:border-amber-300 rounded-xl p-4.5 shadow-xs transition-colors group cursor-pointer"
      >
        <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
          <span className="font-medium group-hover:text-amber-700 transition-colors">Pending Sign-off</span>
          <Clock3 className="w-3.5 h-3.5 text-amber-500" />
        </div>
        <div className="text-2xl sm:text-3xl font-bold tracking-tight text-amber-600 font-mono tabular-nums">
          {pendingHours.toFixed(1)}
          <span className="text-sm font-sans font-normal text-slate-500 ml-1.5">hrs</span>
        </div>
        <div className="mt-2 text-xs text-amber-700 font-medium">
          <span>{pendingShifts.length} shifts awaiting signature →</span>
        </div>
      </button>

      {/* 4. Pre-Med Clinical Contact (or Orgs) */}
      <button
        onClick={onFilterClinical}
        className="text-left bg-white border border-slate-200 hover:border-rose-300 rounded-xl p-4.5 shadow-xs transition-colors group cursor-pointer"
      >
        <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
          <span className="font-medium group-hover:text-rose-700 transition-colors">AMCAS Clinical Contact</span>
          <Stethoscope className="w-3.5 h-3.5 text-rose-500" />
        </div>
        <div className="text-2xl sm:text-3xl font-bold tracking-tight text-rose-700 font-mono tabular-nums">
          {clinicalHours.toFixed(1)}
          <span className="text-sm font-sans font-normal text-rose-600 ml-1.5">hrs</span>
        </div>
        <div className="mt-2 text-xs text-slate-500">
          <span>Across {uniqueOrgs} community partners</span>
        </div>
      </button>
    </div>
  );
};
