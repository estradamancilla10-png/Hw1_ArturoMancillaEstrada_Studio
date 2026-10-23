import React, { useState } from 'react';
import { Plus, Award, CheckCircle2, Calendar, Trash2, Edit2, Sparkles, AlertCircle } from 'lucide-react';
import { ServiceGoal, VolunteerShift, ServiceCategory } from '../types';
import { triggerConfetti } from '../utils/storage';

interface GoalsSectionProps {
  goals: ServiceGoal[];
  shifts: VolunteerShift[];
  onAddGoal: (goal: ServiceGoal) => void;
  onUpdateGoal: (goal: ServiceGoal) => void;
  onDeleteGoal: (goalId: string) => void;
}

export const GoalsSection: React.FC<GoalsSectionProps> = ({
  goals,
  shifts,
  onAddGoal,
  onUpdateGoal,
  onDeleteGoal,
}) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState<ServiceGoal | null>(null);

  // Form state
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<ServiceCategory>('clinical');
  const [targetHours, setTargetHours] = useState(50);
  const [term, setTerm] = useState('Fall 2026');
  const [deadline, setDeadline] = useState('2026-12-15');
  const [notes, setNotes] = useState('');

  const openAddModal = () => {
    setTitle('');
    setCategory('clinical');
    setTargetHours(40);
    setTerm('Fall 2026');
    setDeadline('2026-12-15');
    setNotes('');
    setEditingGoal(null);
    setIsAddModalOpen(true);
  };

  const openEditModal = (goal: ServiceGoal) => {
    setTitle(goal.title);
    setCategory(goal.category);
    setTargetHours(goal.targetHours);
    setTerm(goal.term);
    setDeadline(goal.deadline);
    setNotes(goal.notes || '');
    setEditingGoal(goal);
    setIsAddModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || targetHours <= 0) return;

    if (editingGoal) {
      onUpdateGoal({
        ...editingGoal,
        title: title.trim(),
        category,
        targetHours: Number(targetHours),
        term,
        deadline,
        notes: notes.trim(),
      });
    } else {
      const newGoal: ServiceGoal = {
        id: `goal-${Date.now()}`,
        title: title.trim(),
        category,
        targetHours: Number(targetHours),
        term,
        deadline,
        notes: notes.trim(),
      };
      onAddGoal(newGoal);
    }
    setIsAddModalOpen(false);
  };

  // Calculate progress for each goal
  const getGoalStats = (goal: ServiceGoal) => {
    const linkedShifts = shifts.filter((s) => s.goalId === goal.id || s.category === goal.category);
    const completedHours = linkedShifts.reduce((sum, s) => sum + s.hours, 0);
    const verifiedHours = linkedShifts
      .filter((s) => s.verificationStatus === 'verified')
      .reduce((sum, s) => sum + s.hours, 0);

    const percent = Math.min(100, Math.round((completedHours / goal.targetHours) * 100));
    const remaining = Math.max(0, goal.targetHours - completedHours);
    const isCompleted = completedHours >= goal.targetHours;

    return { completedHours, verifiedHours, percent, remaining, isCompleted };
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900">
            Mandate &amp; Requirement Trackers
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Monitor progress toward Pre-Med clinical thresholds, Greek Life philanthropy, and honors requirements.
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors shrink-0 shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>New Requirement Goal</span>
        </button>
      </div>

      {/* Goal Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {goals.map((goal) => {
          const { completedHours, verifiedHours, percent, remaining, isCompleted } = getGoalStats(goal);

          return (
            <div
              key={goal.id}
              className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-colors"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 tracking-tight">
                      {goal.title}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                      <span className="capitalize">{goal.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>{goal.term}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => openEditModal(goal)}
                      className="p-1 text-slate-400 hover:text-slate-700 rounded-md"
                      title="Edit Goal"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onDeleteGoal(goal.id)}
                      className="p-1 text-slate-400 hover:text-rose-600 rounded-md"
                      title="Delete Goal"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {goal.notes && (
                  <p className="text-xs text-slate-600 line-clamp-2 mb-4 bg-slate-50 p-2 rounded-md">
                    {goal.notes}
                  </p>
                )}

                {/* Progress Bar & Numerical stats */}
                <div className="space-y-1.5 my-3">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="font-bold text-slate-900 tabular-nums">
                      {completedHours.toFixed(1)}{' '}
                      <span className="font-normal text-slate-500 font-sans">
                        / {goal.targetHours} hrs target
                      </span>
                    </span>
                    <span className="font-semibold text-indigo-600 tabular-nums">
                      {percent}%
                    </span>
                  </div>

                  {/* Visual Bar */}
                  <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 rounded-full ${
                        isCompleted ? 'bg-emerald-500' : 'bg-indigo-600'
                      }`}
                      style={{ width: `${percent}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-0.5">
                    <span>
                      Verified:{' '}
                      <strong className="font-mono tabular-nums text-slate-700">
                        {verifiedHours.toFixed(1)} hrs
                      </strong>
                    </span>
                    <span>
                      {remaining > 0 ? (
                        <span className="text-amber-700 font-medium">
                          {remaining.toFixed(1)} hrs remaining
                        </span>
                      ) : (
                        <span className="text-emerald-700 font-medium flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          Requirement Met!
                        </span>
                      )}
                    </span>
                  </div>
                </div>
              </div>

              {/* Deadline & Confetti Trigger */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 mt-2">
                <div className="flex items-center gap-1.5 text-slate-500">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Due by {goal.deadline}</span>
                </div>

                {isCompleted && (
                  <button
                    onClick={triggerConfetti}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 hover:text-emerald-800"
                  >
                    <Sparkles className="w-3 h-3 text-emerald-600" />
                    <span>Celebrate Milestone</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add / Edit Goal Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full border border-slate-200 shadow-xl overflow-hidden p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">
                {editingGoal ? 'Edit Service Mandate' : 'Add Requirement Goal'}
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Goal Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. AMCAS Clinical Direct Patient Hours"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as ServiceCategory)}
                    className="w-full px-2.5 py-2 text-xs border border-slate-200 rounded-lg bg-white"
                  >
                    <option value="clinical">Clinical / Pre-Health</option>
                    <option value="community">Community Service</option>
                    <option value="tutoring">Tutoring &amp; Outreach</option>
                    <option value="environmental">Environmental</option>
                    <option value="greek">Greek Life Philanthropy</option>
                    <option value="campus">Campus Engagement</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Target Hours *
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="1000"
                    required
                    value={targetHours}
                    onChange={(e) => setTargetHours(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs font-mono font-bold border border-slate-200 rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Academic Term
                  </label>
                  <input
                    type="text"
                    value={term}
                    onChange={(e) => setTerm(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Target Deadline
                  </label>
                  <input
                    type="date"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    className="w-full px-2.5 py-2 text-xs border border-slate-200 rounded-lg font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Notes / Regulations (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Must be verified directly by hospital volunteer coordinator..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full p-2.5 text-xs border border-slate-200 rounded-lg"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-3 py-1.5 text-slate-600 hover:bg-slate-100 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md"
                >
                  {editingGoal ? 'Save' : 'Create Goal'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
