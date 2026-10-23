import React, { useState } from 'react';
import { X, User, GraduationCap, School, Mail, Award, RotateCcw } from 'lucide-react';
import { StudentProfile } from '../types';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: StudentProfile;
  onSaveProfile: (profile: StudentProfile) => void;
  onResetData: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSaveProfile,
  onResetData,
}) => {
  const [name, setName] = useState(profile.name);
  const [netId, setNetId] = useState(profile.netId || 'mxl240019');
  const [studentId, setStudentId] = useState(profile.studentId);
  const [university, setUniversity] = useState(profile.university);
  const [school, setSchool] = useState(profile.school || 'School of Natural Sciences and Mathematics (NSM)');
  const [major, setMajor] = useState(profile.major);
  const [standing, setStanding] = useState(profile.standing);
  const [gradYear, setGradYear] = useState(profile.gradYear);
  const [email, setEmail] = useState(profile.email);
  const [campusOrg, setCampusOrg] = useState(profile.campusOrg);
  const [term, setTerm] = useState(profile.term);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile({
      ...profile,
      name: name.trim(),
      netId: netId.trim(),
      studentId: studentId.trim(),
      university: university.trim(),
      school: school.trim(),
      major: major.trim(),
      standing,
      gradYear: gradYear.trim(),
      email: email.trim(),
      campusOrg: campusOrg.trim(),
      term: term.trim(),
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="relative bg-white rounded-2xl max-w-lg w-full border border-slate-200 shadow-xl overflow-hidden my-6">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/70">
          <div className="flex items-center gap-3">
            <img
              src={profile.avatarUrl}
              alt={profile.name}
              referrerPolicy="no-referrer"
              className="w-10 h-10 rounded-full object-cover border border-slate-200"
            />
            <div>
              <h2 className="text-base font-bold text-slate-900 tracking-tight">
                UTD Comet Student Profile &amp; NetID
              </h2>
              <p className="text-xs text-slate-500">
                Printed on official UTD timesheets, HPAC dossiers, and OSV awards.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/50 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[78vh] overflow-y-auto text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Student Full Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                UTD NetID *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. abc123456"
                value={netId}
                onChange={(e) => setNetId(e.target.value)}
                className="w-full px-3 py-2 font-mono font-semibold text-orange-700 border border-slate-200 rounded-lg uppercase"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                UTD Student ID Number (10-Digit) *
              </label>
              <input
                type="text"
                required
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                className="w-full px-3 py-2 font-mono border border-slate-200 rounded-lg"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                UTD School / College
              </label>
              <select
                value={school}
                onChange={(e) => setSchool(e.target.value)}
                className="w-full px-2.5 py-2 border border-slate-200 rounded-lg bg-white"
              >
                <option value="School of Natural Sciences and Mathematics (NSM)">Natural Sciences &amp; Math (NSM - Pre-Med)</option>
                <option value="Naveen Jindal School of Management (JSOM)">Naveen Jindal School of Management (JSOM)</option>
                <option value="Erik Jonsson School of Engineering (ECS)">Jonsson School of Engineering (ECS)</option>
                <option value="School of Behavioral and Brain Sciences (BBS)">Behavioral &amp; Brain Sciences (BBS)</option>
                <option value="School of Economic, Political & Policy Sciences (EPPS)">Economic, Political &amp; Policy Sciences (EPPS)</option>
                <option value="Hobson Wildenthal Honors College">Hobson Wildenthal Honors College</option>
                <option value="School of Arts, Humanities, and Technology (AHT)">Arts, Humanities &amp; Tech (AHT)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Major &amp; Track
              </label>
              <input
                type="text"
                placeholder="e.g. Biology (Pre-Med / HPAC Track)"
                value={major}
                onChange={(e) => setMajor(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                UTD Student Email
              </label>
              <input
                type="email"
                required
                placeholder="netid@utdallas.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 font-mono border border-slate-200 rounded-lg"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Standing
              </label>
              <select
                value={standing}
                onChange={(e) => setStanding(e.target.value as any)}
                className="w-full px-2.5 py-2 border border-slate-200 rounded-lg bg-white"
              >
                <option value="Freshman">Freshman</option>
                <option value="Sophomore">Sophomore</option>
                <option value="Junior">Junior</option>
                <option value="Senior">Senior</option>
                <option value="Graduate">Graduate</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Grad Year
              </label>
              <input
                type="text"
                value={gradYear}
                onChange={(e) => setGradYear(e.target.value)}
                className="w-full px-3 py-2 font-mono border border-slate-200 rounded-lg"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Active Term
              </label>
              <input
                type="text"
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Campus Organizations &amp; Greek Affiliation
            </label>
            <input
              type="text"
              placeholder="e.g. Alpha Phi Omega (Nu Gamma), Comet Cupboard Lead, AED"
              value={campusOrg}
              onChange={(e) => setCampusOrg(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg"
            />
          </div>

          {/* Data Backup & Persistence Info */}
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
            <div className="flex items-center justify-between text-slate-700">
              <span className="font-semibold text-slate-900">Data Persistence &amp; Backup</span>
              <span className="text-[10px] text-emerald-700 font-medium">✓ Auto-saves in browser</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-normal">
              Your shifts and hours are automatically saved in real-time in your browser. Download a backup file anytime to keep a permanent copy or transfer to another laptop.
            </p>
            <div className="pt-1 flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  const shifts = JSON.parse(localStorage.getItem('campus_serve_shifts_v1') || '[]');
                  const goals = JSON.parse(localStorage.getItem('campus_serve_goals_v1') || '[]');
                  import('../utils/storage').then(mod => mod.exportBackupJSON(shifts, goals, profile));
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg text-slate-700 text-xs font-medium transition-colors shadow-xs"
              >
                <span>Download Backup (.json)</span>
              </button>

              <label className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg text-slate-700 text-xs font-medium transition-colors shadow-xs cursor-pointer">
                <span>Restore Backup (.json)</span>
                <input
                  type="file"
                  accept=".json"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (event) => {
                        try {
                          const parsed = JSON.parse(event.target?.result as string);
                          if (parsed.shifts) localStorage.setItem('campus_serve_shifts_v1', JSON.stringify(parsed.shifts));
                          if (parsed.goals) localStorage.setItem('campus_serve_goals_v1', JSON.stringify(parsed.goals));
                          if (parsed.profile) localStorage.setItem('campus_serve_profile_v1', JSON.stringify(parsed.profile));
                          window.location.reload();
                        } catch (err) {
                          alert('Invalid backup JSON file.');
                        }
                      };
                      reader.readAsText(file);
                    }
                  }}
                />
              </label>
            </div>
          </div>

          {/* Reset Demo Data Action */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-slate-500">
            <button
              type="button"
              onClick={() => {
                if (window.confirm('Reset all shifts, goals, and profile back to authentic UTD sample data?')) {
                  onResetData();
                  onClose();
                }
              }}
              className="inline-flex items-center gap-1.5 text-xs text-rose-600 hover:text-rose-700 hover:underline"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset to UTD Sample Data</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3 py-1.5 text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg"
              >
                Save Profile
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
