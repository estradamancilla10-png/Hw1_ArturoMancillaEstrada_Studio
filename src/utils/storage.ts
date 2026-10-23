import confetti from 'canvas-confetti';
import { VolunteerShift, ServiceGoal, StudentProfile, ActiveShiftState } from '../types';
import { INITIAL_SHIFTS, INITIAL_GOALS, INITIAL_STUDENT_PROFILE } from '../data/initialData';

const SHIFTS_KEY = 'campus_serve_shifts_v1';
const GOALS_KEY = 'campus_serve_goals_v1';
const PROFILE_KEY = 'campus_serve_profile_v1';
const TIMER_KEY = 'campus_serve_active_timer_v1';

export function loadShifts(): VolunteerShift[] {
  try {
    const raw = localStorage.getItem(SHIFTS_KEY);
    if (!raw) return INITIAL_SHIFTS;
    return JSON.parse(raw);
  } catch {
    return INITIAL_SHIFTS;
  }
}

export function saveShifts(shifts: VolunteerShift[]): void {
  try {
    localStorage.setItem(SHIFTS_KEY, JSON.stringify(shifts));
  } catch (e) {
    console.error('Failed to save shifts', e);
  }
}

export function loadGoals(): ServiceGoal[] {
  try {
    const raw = localStorage.getItem(GOALS_KEY);
    if (!raw) return INITIAL_GOALS;
    return JSON.parse(raw);
  } catch {
    return INITIAL_GOALS;
  }
}

export function saveGoals(goals: ServiceGoal[]): void {
  try {
    localStorage.setItem(GOALS_KEY, JSON.stringify(goals));
  } catch (e) {
    console.error('Failed to save goals', e);
  }
}

export function loadProfile(): StudentProfile {
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    if (!raw) return INITIAL_STUDENT_PROFILE;
    return JSON.parse(raw);
  } catch {
    return INITIAL_STUDENT_PROFILE;
  }
}

export function saveProfile(profile: StudentProfile): void {
  try {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  } catch (e) {
    console.error('Failed to save profile', e);
  }
}

export function loadTimerState(): ActiveShiftState {
  const defaultState: ActiveShiftState = {
    isActive: false,
    startTime: null,
    elapsedSeconds: 0,
    organization: '',
    location: '',
    category: 'community',
    supervisorName: '',
    supervisorEmail: '',
    notes: '',
  };
  try {
    const raw = localStorage.getItem(TIMER_KEY);
    if (!raw) return defaultState;
    return JSON.parse(raw);
  } catch {
    return defaultState;
  }
}

export function saveTimerState(state: ActiveShiftState): void {
  try {
    localStorage.setItem(TIMER_KEY, JSON.stringify(state));
  } catch (e) {
    console.error('Failed to save timer state', e);
  }
}

export function resetAllData(): void {
  localStorage.removeItem(SHIFTS_KEY);
  localStorage.removeItem(GOALS_KEY);
  localStorage.removeItem(PROFILE_KEY);
  localStorage.removeItem(TIMER_KEY);
}

export function exportShiftsToCSV(shifts: VolunteerShift[], profile: StudentProfile): void {
  const headers = [
    'Date',
    'Organization',
    'Category',
    'Hours',
    'Start Time',
    'End Time',
    'Location',
    'Supervisor Name',
    'Supervisor Title',
    'Supervisor Email',
    'Supervisor Phone',
    'Status',
    'Verified At',
    'Duties / Description',
    'Skills Learned',
    'Student Name',
    'Student ID',
    'Term',
  ];

  const escapeCSV = (val: string | number | undefined | null) => {
    if (val === undefined || val === null) return '""';
    const stringVal = String(val).replace(/"/g, '""');
    return `"${stringVal}"`;
  };

  const rows = shifts.map(s => [
    escapeCSV(s.date),
    escapeCSV(s.organization),
    escapeCSV(s.category),
    escapeCSV(s.hours.toFixed(1)),
    escapeCSV(s.startTime),
    escapeCSV(s.endTime),
    escapeCSV(s.location),
    escapeCSV(s.supervisorName),
    escapeCSV(s.supervisorTitle),
    escapeCSV(s.supervisorEmail),
    escapeCSV(s.supervisorPhone),
    escapeCSV(s.verificationStatus),
    escapeCSV(s.verifiedAt || 'Unverified'),
    escapeCSV(s.description),
    escapeCSV(s.skillsLearned.join(', ')),
    escapeCSV(profile.name),
    escapeCSV(profile.netId || profile.studentId),
    escapeCSV(s.term),
  ]);

  const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `UTD_${profile.netId || 'Comet'}_Volunteer_Hours_${profile.term.replace(/\s+/g, '_')}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function exportBackupJSON(shifts: VolunteerShift[], goals: ServiceGoal[], profile: StudentProfile): void {
  const backupData = {
    app: 'UTD CometServe',
    version: '1.0',
    exportedAt: new Date().toISOString(),
    profile,
    goals,
    shifts,
  };
  const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `UTD_CometServe_Backup_${profile.netId || 'NetID'}_${new Date().toISOString().split('T')[0]}.json`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function triggerConfetti() {
  try {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#c75b12', '#154734', '#e87500', '#10b981'],
    });
  } catch {
    // ignore
  }
}
