import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, CheckSquare, MapPin, Building, Sparkles } from 'lucide-react';
import { ActiveShiftState, ServiceCategory, VolunteerShift } from '../types';
import { loadTimerState, saveTimerState } from '../utils/storage';

interface ShiftTimerProps {
  onFinishShift: (data: Partial<VolunteerShift>) => void;
  recentOrganizations: string[];
}

export const ShiftTimer: React.FC<ShiftTimerProps> = ({
  onFinishShift,
  recentOrganizations,
}) => {
  const [timerState, setTimerState] = useState<ActiveShiftState>(() => loadTimerState());
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (timerState.isActive && !isPaused) {
      interval = setInterval(() => {
        setTimerState((prev) => {
          const nextState = {
            ...prev,
            elapsedSeconds: prev.elapsedSeconds + 1,
          };
          saveTimerState(nextState);
          return nextState;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerState.isActive, isPaused]);

  const handleStart = () => {
    if (!timerState.organization.trim()) return;
    const now = Date.now();
    const nextState: ActiveShiftState = {
      ...timerState,
      isActive: true,
      startTime: timerState.startTime || now,
    };
    setTimerState(nextState);
    saveTimerState(nextState);
    setIsPaused(false);
  };

  const handlePause = () => {
    setIsPaused(true);
  };

  const handleResume = () => {
    setIsPaused(false);
  };

  const handleReset = () => {
    const nextState: ActiveShiftState = {
      isActive: false,
      startTime: null,
      elapsedSeconds: 0,
      organization: '',
      location: '',
      category: 'clinical',
      supervisorName: '',
      supervisorEmail: '',
      notes: '',
    };
    setTimerState(nextState);
    saveTimerState(nextState);
    setIsPaused(false);
  };

  const handleComplete = () => {
    // Calculate start time HH:mm and end time HH:mm
    const startTimeDate = timerState.startTime ? new Date(timerState.startTime) : new Date();
    const endTimeDate = new Date();

    const formatTime = (d: Date) =>
      `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;

    // Convert elapsed seconds to hours, rounded to 0.25 (minimum 0.25h for test/quick shifts)
    const rawHours = timerState.elapsedSeconds / 3600;
    const hours = Math.max(0.25, Number((Math.round(rawHours * 4) / 4).toFixed(2)));

    onFinishShift({
      organization: timerState.organization,
      location: timerState.location,
      category: timerState.category,
      supervisorName: timerState.supervisorName,
      supervisorEmail: timerState.supervisorEmail,
      startTime: formatTime(startTimeDate),
      endTime: formatTime(endTimeDate),
      hours,
      description: timerState.notes,
    });

    handleReset();
  };

  const formatElapsedTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const hoursCalculated = (timerState.elapsedSeconds / 3600).toFixed(2);

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 max-w-2xl mx-auto shadow-xs">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900">
            Active Volunteer Shift Clock
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Check in live while serving on-site to automatically tally exact hours.
          </p>
        </div>
        <div className="text-right">
          <span className="text-[11px] font-medium text-slate-400 block">State</span>
          <span
            className={`text-xs font-semibold ${
              timerState.isActive
                ? isPaused
                  ? 'text-amber-600'
                  : 'text-emerald-600'
                : 'text-slate-500'
            }`}
          >
            {timerState.isActive ? (isPaused ? 'Paused' : 'Active Clocking') : 'Standby'}
          </span>
        </div>
      </div>

      {/* Big Stopwatch Display */}
      <div className="text-center py-6 bg-slate-900 rounded-2xl text-white my-4 shadow-inner relative overflow-hidden">
        <div className="text-xs tracking-widest uppercase text-slate-400 mb-1 font-mono">
          Elapsed Service Time
        </div>
        <div className="text-5xl sm:text-6xl font-mono font-bold tracking-wider tabular-nums text-emerald-400">
          {formatElapsedTime(timerState.elapsedSeconds)}
        </div>
        <div className="mt-2 text-xs font-mono text-slate-300">
          Approx. <span className="font-bold text-white">{hoursCalculated}</span> hours recorded
        </div>
      </div>

      {/* Quick Shift Setup Fields */}
      <div className="space-y-4 my-6">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Organization / Site *
          </label>
          <div className="relative">
            <Building className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              disabled={timerState.isActive}
              placeholder="e.g. St. Jude Regional Hospital"
              value={timerState.organization}
              onChange={(e) => {
                const next = { ...timerState, organization: e.target.value };
                setTimerState(next);
                saveTimerState(next);
              }}
              className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 disabled:bg-slate-50"
            />
          </div>

          {/* Quick Org Chips if inactive */}
          {!timerState.isActive && recentOrganizations.length > 0 && (
            <div className="flex items-center gap-1.5 mt-2 flex-wrap text-xs text-slate-500">
              <span className="text-[11px]">Recent:</span>
              {recentOrganizations.slice(0, 3).map((org) => (
                <button
                  key={org}
                  type="button"
                  onClick={() => {
                    const next = { ...timerState, organization: org };
                    setTimerState(next);
                    saveTimerState(next);
                  }}
                  className="px-2 py-0.5 rounded text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                >
                  {org}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Location / Room
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                disabled={timerState.isActive}
                placeholder="e.g. Pediatrics Wing 3B"
                value={timerState.location}
                onChange={(e) => {
                  const next = { ...timerState, location: e.target.value };
                  setTimerState(next);
                  saveTimerState(next);
                }}
                className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 disabled:bg-slate-50"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Category
            </label>
            <select
              disabled={timerState.isActive}
              value={timerState.category}
              onChange={(e) => {
                const next = { ...timerState, category: e.target.value as ServiceCategory };
                setTimerState(next);
                saveTimerState(next);
              }}
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 disabled:bg-slate-50 bg-white"
            >
              <option value="clinical">Clinical / Pre-Health</option>
              <option value="community">Community Service</option>
              <option value="tutoring">Tutoring &amp; STEM Outreach</option>
              <option value="environmental">Environmental</option>
              <option value="greek">Greek Life Philanthropy</option>
              <option value="campus">Campus Engagement</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Running Shift Notes (Optional)
          </label>
          <input
            type="text"
            placeholder="Jot down duties as they happen (e.g. assisted with triage transport)..."
            value={timerState.notes}
            onChange={(e) => {
              const next = { ...timerState, notes: e.target.value };
              setTimerState(next);
              saveTimerState(next);
            }}
            className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20"
          />
        </div>
      </div>

      {/* Timer Controls */}
      <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          {!timerState.isActive ? (
            <button
              onClick={handleStart}
              disabled={!timerState.organization.trim()}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Start Shift Clock</span>
            </button>
          ) : (
            <>
              {isPaused ? (
                <button
                  onClick={handleResume}
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>Resume</span>
                </button>
              ) : (
                <button
                  onClick={handlePause}
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors"
                >
                  <Pause className="w-4 h-4" />
                  <span>Pause</span>
                </button>
              )}

              <button
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 px-3 py-2.5 border border-slate-200 hover:bg-slate-100 text-slate-600 text-xs font-medium rounded-xl transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </>
          )}
        </div>

        {timerState.isActive && (
          <button
            onClick={handleComplete}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors"
          >
            <CheckSquare className="w-4 h-4" />
            <span>Finish &amp; Record Shift</span>
          </button>
        )}
      </div>
    </div>
  );
};
