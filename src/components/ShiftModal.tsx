import React, { useState, useEffect } from 'react';
import { X, Clock, MapPin, Building, User, Mail, Phone, BookOpen, Sparkles, Plus, GraduationCap } from 'lucide-react';
import { VolunteerShift, ServiceCategory, ServiceGoal, UTDDepartmentCode } from '../types';

interface ShiftModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (shift: VolunteerShift) => void;
  shiftToEdit?: VolunteerShift | null;
  goals: ServiceGoal[];
  initialValues?: Partial<VolunteerShift>;
}

const COMMON_SKILLS = [
  'Direct Patient Contact (TMDSAS)',
  'Clinical Triage Flow',
  'Crisis Empathy',
  'Bedside Manner',
  'STEM Pedagogy / Python',
  'K-12 Mentorship',
  'Food Insecurity Advocacy',
  'Warehouse Logistics',
  'Ecological Stewardship',
  'Bilingual Spanish Translation',
  'Team Leadership',
  'Youth Protection (YPP)',
];

export const ShiftModal: React.FC<ShiftModalProps> = ({
  isOpen,
  onClose,
  onSave,
  shiftToEdit,
  goals,
  initialValues,
}) => {
  const [organization, setOrganization] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState<ServiceCategory>('clinical');
  const [utdDepartment, setUtdDepartment] = useState<UTDDepartmentCode | ''>('hpac');
  const [goalId, setGoalId] = useState<string>('');
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('13:00');
  const [hours, setHours] = useState<number>(4.0);
  const [description, setDescription] = useState('');
  const [skillsLearned, setSkillsLearned] = useState<string[]>([]);
  const [customSkillInput, setCustomSkillInput] = useState('');
  const [supervisorName, setSupervisorName] = useState('');
  const [supervisorTitle, setSupervisorTitle] = useState('');
  const [supervisorEmail, setSupervisorEmail] = useState('');
  const [supervisorPhone, setSupervisorPhone] = useState('');
  const [reflection, setReflection] = useState('');
  const [term, setTerm] = useState('Fall 2026');

  useEffect(() => {
    if (shiftToEdit) {
      setOrganization(shiftToEdit.organization);
      setLocation(shiftToEdit.location);
      setCategory(shiftToEdit.category);
      setUtdDepartment(shiftToEdit.utdDepartment || 'hpac');
      setGoalId(shiftToEdit.goalId || '');
      setDate(shiftToEdit.date);
      setStartTime(shiftToEdit.startTime);
      setEndTime(shiftToEdit.endTime);
      setHours(shiftToEdit.hours);
      setDescription(shiftToEdit.description);
      setSkillsLearned(shiftToEdit.skillsLearned || []);
      setSupervisorName(shiftToEdit.supervisorName);
      setSupervisorTitle(shiftToEdit.supervisorTitle);
      setSupervisorEmail(shiftToEdit.supervisorEmail);
      setSupervisorPhone(shiftToEdit.supervisorPhone);
      setReflection(shiftToEdit.reflection || '');
      setTerm(shiftToEdit.term || 'Fall 2026');
    } else if (initialValues) {
      if (initialValues.organization) setOrganization(initialValues.organization);
      if (initialValues.location) setLocation(initialValues.location);
      if (initialValues.category) setCategory(initialValues.category);
      if (initialValues.utdDepartment) setUtdDepartment(initialValues.utdDepartment);
      if (initialValues.startTime) setStartTime(initialValues.startTime);
      if (initialValues.endTime) setEndTime(initialValues.endTime);
      if (initialValues.hours) setHours(initialValues.hours);
      if (initialValues.supervisorName) setSupervisorName(initialValues.supervisorName);
      if (initialValues.supervisorEmail) setSupervisorEmail(initialValues.supervisorEmail);
      if (initialValues.description) setDescription(initialValues.description);
    } else {
      // Default reset
      setOrganization('');
      setLocation('');
      setCategory('clinical');
      setUtdDepartment('hpac');
      setGoalId(goals[0]?.id || '');
      setDate(new Date().toISOString().split('T')[0]);
      setStartTime('09:00');
      setEndTime('13:00');
      setHours(4.0);
      setDescription('');
      setSkillsLearned(['Direct Patient Contact (TMDSAS)', 'Crisis Empathy']);
      setSupervisorName('');
      setSupervisorTitle('');
      setSupervisorEmail('');
      setSupervisorPhone('');
      setReflection('');
      setTerm('Fall 2026');
    }
  }, [shiftToEdit, initialValues, isOpen, goals]);

  // Auto calculate duration from start and end time
  const handleTimeChange = (newStart: string, newEnd: string) => {
    setStartTime(newStart);
    setEndTime(newEnd);
    if (newStart && newEnd) {
      const [sh, sm] = newStart.split(':').map(Number);
      const [eh, em] = newEnd.split(':').map(Number);
      const startMin = sh * 60 + sm;
      const endMin = eh * 60 + em;
      let diff = endMin - startMin;
      if (diff < 0) diff += 24 * 60; // crossed midnight
      const calculatedHours = Number((diff / 60).toFixed(1));
      if (calculatedHours > 0) {
        setHours(calculatedHours);
      }
    }
  };

  const toggleSkill = (skill: string) => {
    if (skillsLearned.includes(skill)) {
      setSkillsLearned(skillsLearned.filter((s) => s !== skill));
    } else {
      setSkillsLearned([...skillsLearned, skill]);
    }
  };

  const handleAddCustomSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (customSkillInput.trim() && !skillsLearned.includes(customSkillInput.trim())) {
      setSkillsLearned([...skillsLearned, customSkillInput.trim()]);
      setCustomSkillInput('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!organization.trim() || hours <= 0) return;

    const shiftData: VolunteerShift = {
      id: shiftToEdit ? shiftToEdit.id : `shift-${Date.now()}`,
      date,
      startTime,
      endTime,
      hours: Number(hours),
      organization: organization.trim(),
      location: location.trim(),
      category,
      utdDepartment: utdDepartment ? (utdDepartment as UTDDepartmentCode) : undefined,
      goalId: goalId || undefined,
      description: description.trim(),
      skillsLearned,
      supervisorName: supervisorName.trim(),
      supervisorTitle: supervisorTitle.trim(),
      supervisorEmail: supervisorEmail.trim(),
      supervisorPhone: supervisorPhone.trim(),
      verificationStatus: shiftToEdit ? shiftToEdit.verificationStatus : 'pending',
      supervisorSignature: shiftToEdit ? shiftToEdit.supervisorSignature : null,
      verifiedAt: shiftToEdit ? shiftToEdit.verifiedAt : null,
      reflection: reflection.trim(),
      term,
    };

    onSave(shiftData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="relative bg-white rounded-2xl max-w-2xl w-full border border-slate-200 shadow-xl overflow-hidden my-6">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/70">
          <div>
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">
              {shiftToEdit ? 'Edit UTD Volunteer Shift' : 'Log UTD Volunteer Shift'}
            </h2>
            <p className="text-xs text-slate-500">
              Align with UTD department protocols (HPAC, JSOM, OSV, ECS, FSL) for verified certification.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/50 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[78vh] overflow-y-auto">
          {/* UTD Department Protocol Alignment */}
          <div className="bg-orange-50/60 border border-orange-200/70 rounded-xl p-3.5 space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-orange-900">
                UTD Department Protocol Alignment *
              </label>
              <span className="text-[11px] text-orange-700 font-medium">Compliance Check</span>
            </div>
            <select
              value={utdDepartment}
              onChange={(e) => {
                const dept = e.target.value as UTDDepartmentCode;
                setUtdDepartment(dept);
                if (dept === 'hpac') setCategory('clinical');
                else if (dept === 'ecs') setCategory('tutoring');
                else if (dept === 'fsl') setCategory('greek');
                else setCategory('community');
              }}
              className="w-full px-3 py-2 text-xs border border-orange-300 rounded-lg bg-white font-medium text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-orange-500/30"
            >
              <option value="hpac">HPAC Pre-Health (Direct Patient Clinical - TMDSAS)</option>
              <option value="osv">OSV Comet Service Honors (Bronze/Silver/Gold Tiers)</option>
              <option value="jsom">JSOM 100-Hour Community Service Prerequisite</option>
              <option value="ecs">ECS Jonsson School STEM Outreach &amp; Robotics</option>
              <option value="fsl">Fraternity &amp; Sorority Life (FSL Philanthropy)</option>
              <option value="honors">Hobson Wildenthal Honors College (Collegium V)</option>
              <option value="epps">EPPS Pre-Law &amp; Civic Engagement</option>
            </select>

            {utdDepartment === 'jsom' && (
              <p className="text-[11px] text-orange-800">
                ⚠️ JSOM Policy: Max 8 hours/day. Must be registered 501(c)(3). Supervisor cannot be an immediate family member.
              </p>
            )}
            {utdDepartment === 'hpac' && (
              <p className="text-[11px] text-emerald-800">
                ✓ HPAC TMDSAS Policy: Direct patient contact required. Supervisor must have an official institutional healthcare email.
              </p>
            )}
          </div>

          {/* Organization & Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Organization / Partner Site *
              </label>
              <div className="relative">
                <Building className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  required
                  placeholder="e.g. UT Southwestern Clements Hospital"
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-orange-500/20 focus:border-orange-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Department / Unit / Location
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="e.g. Emergency Triage Wing 4B"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-orange-500/20 focus:border-orange-600"
                />
              </div>
            </div>
          </div>

          {/* Category & Associated Goal */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as ServiceCategory)}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-orange-500/20 bg-white"
              >
                <option value="clinical">Clinical / Pre-Health (Direct Patient Contact)</option>
                <option value="community">Community Service / Food Security</option>
                <option value="tutoring">STEM Tutoring &amp; Robotics (ECS)</option>
                <option value="environmental">Environmental Stewardship (OSV)</option>
                <option value="greek">Greek Life Philanthropy (FSL)</option>
                <option value="campus">Campus &amp; Service Learning</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Linked Requirement / Goal
              </label>
              <select
                value={goalId}
                onChange={(e) => setGoalId(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-orange-500/20 bg-white"
              >
                <option value="">General Service (No linked goal)</option>
                {goals.map((g) => (
                  <option key={g.id} value={g.id}>
                    {g.title} ({g.targetHours}h)
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Date & Time Calculation */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3.5 space-y-3">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Shift Date
                </label>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs font-mono border border-slate-200 rounded-md bg-white focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Start Time
                </label>
                <input
                  type="time"
                  required
                  value={startTime}
                  onChange={(e) => handleTimeChange(e.target.value, endTime)}
                  className="w-full px-2.5 py-1.5 text-xs font-mono border border-slate-200 rounded-md bg-white focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  End Time
                </label>
                <input
                  type="time"
                  required
                  value={endTime}
                  onChange={(e) => handleTimeChange(startTime, e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs font-mono border border-slate-200 rounded-md bg-white focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Total Hours *
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.25"
                    min="0.25"
                    max="24"
                    required
                    value={hours}
                    onChange={(e) => setHours(parseFloat(e.target.value) || 0)}
                    className="w-full px-2.5 py-1.5 text-xs font-mono font-bold text-orange-700 border border-slate-200 rounded-md bg-white focus:outline-hidden"
                  />
                  <span className="absolute right-2.5 top-1.5 text-[11px] text-slate-400 font-sans">
                    hrs
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Duties & Description */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Duties Performed &amp; Core Activities *
            </label>
            <textarea
              required
              rows={2}
              placeholder="e.g. Conducted patient wheelchair transports, assisted triage charge nurse, restocked trauma rooms..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2.5 text-sm border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-orange-500/20"
            />
          </div>

          {/* Competencies & Skills */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Demonstrated Competencies (AAMC / UTD Standards)
            </label>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {COMMON_SKILLS.map((skill) => {
                const isSelected = skillsLearned.includes(skill);
                return (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => toggleSkill(skill)}
                    className={`px-2.5 py-1 text-xs rounded-md transition-colors ${
                      isSelected
                        ? 'bg-slate-900 text-white font-medium'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {isSelected ? '✓ ' : '+ '}
                    {skill}
                  </button>
                );
              })}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add other skill (e.g. Bilingual Advocacy)"
                value={customSkillInput}
                onChange={(e) => setCustomSkillInput(e.target.value)}
                className="flex-1 px-3 py-1.5 text-xs border border-slate-200 rounded-md"
              />
              <button
                type="button"
                onClick={handleAddCustomSkill}
                className="px-3 py-1.5 text-xs font-medium bg-slate-100 hover:bg-slate-200 rounded-md text-slate-700"
              >
                Add
              </button>
            </div>
          </div>

          {/* Supervisor Contact Information */}
          <div className="border-t border-slate-100 pt-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">
              Supervisor Verification Contact
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-medium text-slate-600 mb-1">
                  Supervisor Name *
                </label>
                <div className="relative">
                  <User className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Sarah Thornton, RN"
                    value={supervisorName}
                    onChange={(e) => setSupervisorName(e.target.value)}
                    className="w-full pl-8 pr-2.5 py-1.5 text-xs border border-slate-200 rounded-md focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-600 mb-1">
                  Supervisor Title / Credential
                </label>
                <input
                  type="text"
                  placeholder="e.g. Director of Clinical Volunteer Programs"
                  value={supervisorTitle}
                  onChange={(e) => setSupervisorTitle(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-md focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-600 mb-1">
                  Supervisor Email * (Institutional)
                </label>
                <div className="relative">
                  <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                  <input
                    type="email"
                    required
                    placeholder="s.thornton@utsouthwestern.edu"
                    value={supervisorEmail}
                    onChange={(e) => setSupervisorEmail(e.target.value)}
                    className="w-full pl-8 pr-2.5 py-1.5 text-xs border border-slate-200 rounded-md focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-600 mb-1">
                  Supervisor Phone
                </label>
                <div className="relative">
                  <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                  <input
                    type="text"
                    placeholder="(214) 645-0000"
                    value={supervisorPhone}
                    onChange={(e) => setSupervisorPhone(e.target.value)}
                    className="w-full pl-8 pr-2.5 py-1.5 text-xs border border-slate-200 rounded-md focus:outline-hidden"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Reflection */}
          <div className="border-t border-slate-100 pt-3">
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-semibold text-slate-700">
                TMDSAS / JSOM Reflection Log
              </label>
              <span className="text-[11px] text-slate-400">Required for HPAC packet</span>
            </div>
            <textarea
              rows={2}
              placeholder="What challenged or inspired you during this shift? What did this teach you about community care or systemic need?"
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
              className="w-full p-2.5 text-xs border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-orange-500/20"
            />
          </div>

          {/* Footer Actions */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-800 rounded-lg hover:bg-slate-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold text-white bg-orange-600 hover:bg-orange-700 rounded-lg transition-colors shadow-xs"
            >
              {shiftToEdit ? 'Save Changes' : 'Record Shift'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
