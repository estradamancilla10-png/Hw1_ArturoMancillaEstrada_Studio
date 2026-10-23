import React, { useState } from 'react';
import { 
  Building2, 
  CheckCircle2, 
  AlertTriangle, 
  MapPin, 
  ExternalLink, 
  Mail, 
  Phone, 
  Copy, 
  Check, 
  Plus, 
  BookOpen, 
  FileCheck2, 
  ArrowRight,
  ShieldCheck,
  Stethoscope,
  GraduationCap,
  Sparkles
} from 'lucide-react';
import { UTDDepartmentCode, ServiceGoal } from '../types';
import { UTD_DEPARTMENT_PROTOCOLS } from '../data/utdProtocolsData';

interface UTDProtocolsViewProps {
  onQuickLogForSite: (orgName: string, location: string, utdDept: UTDDepartmentCode, category: any) => void;
  onAddGoalFromProtocol: (goal: ServiceGoal) => void;
  activeDeptFromQuery?: UTDDepartmentCode;
}

export const UTDProtocolsView: React.FC<UTDProtocolsViewProps> = ({
  onQuickLogForSite,
  onAddGoalFromProtocol,
  activeDeptFromQuery = 'hpac',
}) => {
  const [selectedDept, setSelectedDept] = useState<UTDDepartmentCode>(activeDeptFromQuery);
  const [copiedProtocol, setCopiedProtocol] = useState(false);
  const [adoptedGoalSuccess, setAdoptedGoalSuccess] = useState(false);

  const deptList: { id: UTDDepartmentCode; label: string; badge: string; icon: string }[] = [
    { id: 'hpac', label: 'HPAC Pre-Health (TMDSAS)', badge: 'HPAC', icon: '🩺' },
    { id: 'osv', label: 'OSV Comet Service Honors', badge: 'OSV', icon: '☄️' },
    { id: 'jsom', label: 'JSOM 100-Hr Requirement', badge: 'JSOM', icon: '💼' },
    { id: 'ecs', label: 'ECS STEM Outreach', badge: 'ECS', icon: '🤖' },
    { id: 'fsl', label: 'Greek Life (FSL Philanthropy)', badge: 'FSL', icon: '🏛️' },
    { id: 'honors', label: 'Honors College (Collegium V)', badge: 'HONORS', icon: '🎓' },
    { id: 'epps', label: 'EPPS Pre-Law / Civic Affairs', badge: 'EPPS', icon: '⚖️' },
  ];

  const protocol = UTD_DEPARTMENT_PROTOCOLS[selectedDept];

  const handleCopyChecklist = () => {
    const text = `UTD DEPARTMENT PROTOCOL: ${protocol.name} (${protocol.shortCode})
Target: ${protocol.targetAudience}
Requirement: ${protocol.hourRequirementSummary}

APPROVED ELIGIBILITY:
${protocol.eligibilityCriteria.map((c) => `• ${c}`).join('\n')}

RESTRICTIONS / PROHIBITIONS:
${protocol.prohibitedActivities.map((p) => `✗ ${p}`).join('\n')}

VERIFICATION RULES:
${protocol.verificationRules.map((v) => `• ${v}`).join('\n')}

SUBMISSION PORTAL: ${protocol.submissionInstructions.portalName}
DEADLINE: ${protocol.submissionInstructions.deadlineInfo}
CONTACT: ${protocol.contact.office} (${protocol.contact.location}) | ${protocol.contact.email} | ${protocol.contact.phone}`;

    navigator.clipboard.writeText(text);
    setCopiedProtocol(true);
    setTimeout(() => setCopiedProtocol(false), 2500);
  };

  const handleAdoptGoal = () => {
    let targetHours = 50;
    let category: any = 'community';
    if (selectedDept === 'hpac') {
      targetHours = 60;
      category = 'clinical';
    } else if (selectedDept === 'jsom') {
      targetHours = 100;
      category = 'community';
    } else if (selectedDept === 'osv') {
      targetHours = 50;
      category = 'community';
    } else if (selectedDept === 'fsl') {
      targetHours = 20;
      category = 'greek';
    } else if (selectedDept === 'ecs') {
      targetHours = 30;
      category = 'tutoring';
    } else if (selectedDept === 'honors') {
      targetHours = 50;
      category = 'community';
    } else if (selectedDept === 'epps') {
      targetHours = 40;
      category = 'community';
    }

    const newGoal: ServiceGoal = {
      id: `goal-${selectedDept}-${Date.now()}`,
      title: `${protocol.shortCode} Service Standard Requirement`,
      category,
      targetHours,
      term: 'Fall 2026',
      deadline: selectedDept === 'jsom' ? '2026-12-15' : '2026-12-01',
      utdDepartment: selectedDept,
      notes: `Official hours tracking aligned with ${protocol.name} protocols.`,
    };

    onAddGoalFromProtocol(newGoal);
    setAdoptedGoalSuccess(true);
    setTimeout(() => setAdoptedGoalSuccess(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Header Context */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-orange-600 flex items-center justify-center text-white font-bold text-lg shadow-xs">
              UTD
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                  UTD Department Volunteer Protocols
                </h1>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                  Fall 2026 Official Guidelines
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Verified compliance standards for HPAC Pre-Health, JSOM 100-Hr Graduation Mandate, OSV Comet Honors, and Academic Schools.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyChecklist}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg transition-colors shadow-xs"
            >
              {copiedProtocol ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedProtocol ? 'Checklist Copied' : 'Copy Department Protocol'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Department Tabs Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-2 shadow-xs">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {deptList.map((dept) => {
            const isActive = selectedDept === dept.id;
            return (
              <button
                key={dept.id}
                onClick={() => setSelectedDept(dept.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium whitespace-nowrap shrink-0 transition-all ${
                  isActive
                    ? 'bg-slate-900 text-white font-semibold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <span>{dept.icon}</span>
                <span>{dept.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Protocol Details Container */}
      <div className="space-y-6">
        {/* Department Overview Banner */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 shadow-xs space-y-4">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 border-b border-slate-100 pb-5">
            <div>
              <div className="text-xs uppercase tracking-wider font-semibold text-orange-700 mb-1">
                {protocol.schoolOrDivision}
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                {protocol.name}
              </h2>
              <div className="text-xs text-slate-500 mt-1 flex items-center gap-2">
                <span className="font-medium text-slate-700">Applies to:</span>
                <span>{protocol.targetAudience}</span>
              </div>
            </div>

            <div className="shrink-0 flex items-center gap-2">
              <button
                onClick={handleAdoptGoal}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{adoptedGoalSuccess ? 'Goal Added to Tracker!' : `Adopt ${protocol.shortCode} Hour Goal`}</span>
              </button>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            {protocol.overview}
          </p>

          {/* Hour Requirement Callout Card */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                Official Hour Threshold / Graduation Standard
              </span>
              <span className="text-sm font-semibold text-slate-950 mt-0.5 block">
                {protocol.hourRequirementSummary}
              </span>
            </div>
            <div className="text-right shrink-0">
              <span className="text-[11px] text-slate-500">Official Portal: </span>
              <strong className="text-slate-900 font-medium">{protocol.submissionInstructions.portalName}</strong>
            </div>
          </div>
        </div>

        {/* 2-Column Split: Criteria & Prohibitions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Column 1: Approved Criteria */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-3">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <h3 className="text-sm font-bold text-slate-900">
                Eligible &amp; Approved Service Criteria
              </h3>
            </div>
            <ul className="space-y-2.5 text-xs text-slate-700">
              {protocol.eligibilityCriteria.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold mt-0.5">✓</span>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Prohibitions & Common Mistakes */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-3">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <h3 className="text-sm font-bold text-slate-900">
                Prohibited Activities / Will NOT Qualify
              </h3>
            </div>
            <ul className="space-y-2.5 text-xs text-slate-700">
              {protocol.prohibitedActivities.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold mt-0.5">✗</span>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Approved UTD & DFW Community Partners Directory */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Approved UTD &amp; Regional Partner Sites
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Vetted locations recognized for {protocol.shortCode} compliance. Click "Log Shift Here" to pre-fill your entry.
              </p>
            </div>
            <span className="text-xs text-slate-400 font-mono">
              {protocol.approvedSites.length} partners
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {protocol.approvedSites.map((site, index) => (
              <div
                key={index}
                className="p-4 rounded-xl border border-slate-200/90 hover:border-slate-300 bg-slate-50/50 flex flex-col justify-between space-y-2 transition-colors"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-xs font-bold text-slate-900 leading-snug">
                      {site.name}
                    </h4>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mt-1 font-mono">
                    <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                    <span className="truncate">{site.location}</span>
                  </div>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {site.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-200/60 flex items-center justify-end">
                  <button
                    onClick={() => {
                      const category = selectedDept === 'hpac' ? 'clinical' : selectedDept === 'ecs' ? 'tutoring' : selectedDept === 'fsl' ? 'greek' : 'community';
                      onQuickLogForSite(site.name, site.location, selectedDept, category);
                    }}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-orange-700 hover:text-orange-900 transition-colors"
                  >
                    <span>Log Shift at this Site</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Verification Rules & Step-by-Step Submission Instructions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Verification Rules */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-3">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
              <ShieldCheck className="w-4 h-4 text-indigo-600" />
              <h3 className="text-sm font-bold text-slate-900">
                Supervisor Verification &amp; Audit Rules
              </h3>
            </div>
            <ul className="space-y-2.5 text-xs text-slate-700">
              {protocol.verificationRules.map((rule, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-indigo-600 font-bold mt-0.5">•</span>
                  <span className="leading-relaxed">{rule}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Submission Instructions */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-3">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
              <FileCheck2 className="w-4 h-4 text-emerald-600" />
              <h3 className="text-sm font-bold text-slate-900">
                Official Submission Process
              </h3>
            </div>
            <div className="text-xs text-slate-600 mb-2">
              <span className="font-semibold text-slate-900">Deadlines: </span>
              {protocol.submissionInstructions.deadlineInfo}
            </div>
            <ol className="space-y-2 text-xs text-slate-700 list-decimal list-inside leading-relaxed">
              {protocol.submissionInstructions.stepByStep.map((step, idx) => (
                <li key={idx} className="pl-1">
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Campus Office Directory & Contact */}
        <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-7 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-xs uppercase tracking-wider font-mono text-orange-400">
                UTD Campus Directory Contact
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white mt-0.5">
                {protocol.contact.office}
              </h3>
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300 mt-2">
                <span className="flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-orange-400" />
                  <span>{protocol.contact.location}</span>
                </span>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span className="flex items-center gap-1.5 font-mono">
                  <Mail className="w-3.5 h-3.5 text-orange-400" />
                  <a href={`mailto:${protocol.contact.email}`} className="hover:underline text-slate-200">
                    {protocol.contact.email}
                  </a>
                </span>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span className="flex items-center gap-1.5 font-mono">
                  <Phone className="w-3.5 h-3.5 text-orange-400" />
                  <span>{protocol.contact.phone}</span>
                </span>
              </div>
            </div>

            <div className="shrink-0">
              <span className="inline-block px-3 py-1 rounded bg-slate-800 text-xs font-mono text-slate-300 border border-slate-700">
                UTD On-Campus Office
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
