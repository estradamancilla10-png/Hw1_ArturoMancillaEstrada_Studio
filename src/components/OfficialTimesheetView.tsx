import React, { useState } from 'react';
import { Printer, Download, CheckCircle2, ShieldCheck, Filter } from 'lucide-react';
import { VolunteerShift, StudentProfile } from '../types';
import { exportShiftsToCSV } from '../utils/storage';

interface OfficialTimesheetViewProps {
  shifts: VolunteerShift[];
  profile: StudentProfile;
}

export const OfficialTimesheetView: React.FC<OfficialTimesheetViewProps> = ({
  shifts,
  profile,
}) => {
  const [onlyVerified, setOnlyVerified] = useState(true);

  const displayedShifts = onlyVerified
    ? shifts.filter((s) => s.verificationStatus === 'verified')
    : shifts;

  const totalHours = displayedShifts.reduce((sum, s) => sum + s.hours, 0);
  const hpacClinicalHours = displayedShifts
    .filter((s) => s.category === 'clinical' || s.utdDepartment === 'hpac')
    .reduce((sum, s) => sum + s.hours, 0);
  const osvCommunityHours = displayedShifts
    .filter((s) => s.utdDepartment === 'osv' || s.category === 'community')
    .reduce((sum, s) => sum + s.hours, 0);
  const jsomHours = displayedShifts
    .filter((s) => s.utdDepartment === 'jsom')
    .reduce((sum, s) => sum + s.hours, 0);
  const fslHours = displayedShifts
    .filter((s) => s.utdDepartment === 'fsl' || s.category === 'greek')
    .reduce((sum, s) => sum + s.hours, 0);

  const handlePrint = () => {
    window.print();
  };

  const handleExportCSV = () => {
    exportShiftsToCSV(displayedShifts, profile);
  };

  const currentDate = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="space-y-6">
      {/* Action Controls Bar (Hidden in Print) */}
      <div className="no-print bg-white border border-slate-200 rounded-xl p-4 flex flex-wrap items-center justify-between gap-4 shadow-xs">
        <div>
          <h2 className="text-base font-bold text-slate-900 tracking-tight">
            UTD Official Volunteer Verification Transcript
          </h2>
          <p className="text-xs text-slate-500">
            Certified for HPAC Pre-Health committee packets, JSOM 100-Hour prerequisite, OSV Comet Honors, and Greek Life.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
            <input
              type="checkbox"
              checked={onlyVerified}
              onChange={(e) => setOnlyVerified(e.target.checked)}
              className="rounded text-orange-600 focus:ring-orange-500"
            />
            <span>Verified Hours Only</span>
          </label>

          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors shadow-xs"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Official Form / PDF</span>
          </button>
        </div>
      </div>

      {/* The Printable Academic Document */}
      <div className="bg-white border border-slate-300 rounded-xl p-8 sm:p-12 shadow-sm max-w-4xl mx-auto print:border-none print:p-0 print:shadow-none text-slate-900">
        {/* Document Header with UTD Crest */}
        <div className="border-b-2 border-slate-900 pb-6 mb-6">
          <div className="flex items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <img
                src="/src/assets/images/utd_comets_campus_crest_1792795208919.jpg"
                alt="The University of Texas at Dallas Crest"
                referrerPolicy="no-referrer"
                className="w-16 h-16 sm:w-20 sm:h-20 object-contain rounded-full border border-slate-200 print:w-16 print:h-16"
              />
              <div>
                <h1 className="text-lg sm:text-xl font-bold uppercase tracking-wider text-slate-950 font-serif">
                  The University of Texas at Dallas
                </h1>
                <div className="text-xs uppercase tracking-widest text-slate-600 font-semibold mt-0.5">
                  Office of Student Volunteerism &amp; Health Professions Advising Center (HPAC)
                </div>
                <div className="text-[11px] text-slate-500 mt-1">
                  OFFICIAL AUDIT TRANSCRIPT OF VERIFIED COMMUNITY SERVICE &amp; CLINICAL HOURS
                </div>
              </div>
            </div>

            <div className="text-right shrink-0">
              <div className="text-[11px] uppercase tracking-wider text-slate-400 font-mono">UTD Audit Ref</div>
              <div className="text-xs font-mono font-bold text-slate-900">
                UTD-{profile.netId.toUpperCase()}-2026
              </div>
              <div className="text-[11px] text-slate-500 mt-1">Issued: {currentDate}</div>
            </div>
          </div>
        </div>

        {/* Student Information Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-slate-50 border border-slate-200 rounded-lg text-xs mb-6 print:bg-white print:border-slate-300">
          <div>
            <div className="text-[10px] uppercase font-bold text-slate-500">Student Name</div>
            <div className="font-semibold text-slate-900 mt-0.5">{profile.name}</div>
          </div>
          <div>
            <div className="text-[10px] uppercase font-bold text-slate-500">NetID / Student ID</div>
            <div className="font-mono text-slate-900 mt-0.5 font-semibold">
              {profile.netId} · {profile.studentId}
            </div>
          </div>
          <div>
            <div className="text-[10px] uppercase font-bold text-slate-500">School &amp; Major Track</div>
            <div className="text-slate-900 mt-0.5 font-medium truncate">{profile.major}</div>
            <div className="text-[10px] text-slate-500 truncate">{profile.school}</div>
          </div>
          <div>
            <div className="text-[10px] uppercase font-bold text-slate-500">Academic Standing / Term</div>
            <div className="text-slate-900 mt-0.5 font-medium">{profile.standing} · {profile.term}</div>
          </div>
        </div>

        {/* Hours Summary Breakdown with UTD Department Standards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <div className="border border-slate-200 rounded-lg p-3 text-center print:border-slate-300">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Total Verified Hours
            </div>
            <div className="text-2xl font-bold font-mono text-slate-950 mt-1 tabular-nums">
              {totalHours.toFixed(1)}
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5 font-mono">UTD Cumulative</div>
          </div>

          <div className="border border-slate-200 rounded-lg p-3 text-center print:border-slate-300">
            <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">
              HPAC Clinical (TMDSAS)
            </div>
            <div className="text-2xl font-bold font-mono text-emerald-800 mt-1 tabular-nums">
              {hpacClinicalHours.toFixed(1)}
            </div>
            <div className="text-[10px] text-emerald-600 mt-0.5 font-mono">Direct Patient Contact</div>
          </div>

          <div className="border border-slate-200 rounded-lg p-3 text-center print:border-slate-300">
            <div className="text-[10px] font-bold uppercase tracking-wider text-orange-700">
              OSV Comet Service Honor
            </div>
            <div className="text-2xl font-bold font-mono text-orange-800 mt-1 tabular-nums">
              {osvCommunityHours.toFixed(1)}
            </div>
            <div className="text-[10px] text-orange-600 mt-0.5 font-mono">501(c)(3) Community</div>
          </div>

          <div className="border border-slate-200 rounded-lg p-3 text-center print:border-slate-300">
            <div className="text-[10px] font-bold uppercase tracking-wider text-purple-700">
              JSOM / Greek / Other
            </div>
            <div className="text-2xl font-bold font-mono text-purple-800 mt-1 tabular-nums">
              {(totalHours - hpacClinicalHours).toFixed(1)}
            </div>
            <div className="text-[10px] text-purple-600 mt-0.5 font-mono">Civic &amp; Philanthropy</div>
          </div>
        </div>

        {/* Detailed Timesheet Table */}
        <div className="mb-8">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 border-b border-slate-200 pb-1">
            Itemized Shift Log &amp; Verified Supervisor Signatures
          </h3>

          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-300 text-[11px] font-bold text-slate-600 bg-slate-50 print:bg-transparent">
                <th className="py-2 px-2">Date</th>
                <th className="py-2 px-2">Organization &amp; Location</th>
                <th className="py-2 px-2">Dept / Standard</th>
                <th className="py-2 px-2 text-right">Hours</th>
                <th className="py-2 px-2">Supervisor Contact</th>
                <th className="py-2 px-2 text-center">Verification</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-800">
              {displayedShifts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400">
                    No verified shifts recorded for this selection.
                  </td>
                </tr>
              ) : (
                displayedShifts.map((shift) => (
                  <tr key={shift.id} className="print-break-inside-avoid hover:bg-slate-50/50">
                    <td className="py-2.5 px-2 font-mono whitespace-nowrap text-slate-600">
                      {shift.date}
                    </td>
                    <td className="py-2.5 px-2">
                      <div className="font-semibold text-slate-900">{shift.organization}</div>
                      <div className="text-[11px] text-slate-500">{shift.location}</div>
                      <div className="text-[10px] text-slate-600 italic mt-0.5 line-clamp-1">
                        {shift.description}
                      </div>
                    </td>
                    <td className="py-2.5 px-2 uppercase text-slate-600 whitespace-nowrap font-mono text-[11px]">
                      {shift.utdDepartment ? shift.utdDepartment.toUpperCase() : shift.category}
                    </td>
                    <td className="py-2.5 px-2 text-right font-mono font-bold text-slate-900 tabular-nums whitespace-nowrap">
                      {shift.hours.toFixed(1)}h
                    </td>
                    <td className="py-2.5 px-2 whitespace-nowrap">
                      <div className="font-medium text-slate-800">{shift.supervisorName}</div>
                      <div className="text-[10px] text-slate-500 font-mono">{shift.supervisorEmail}</div>
                    </td>
                    <td className="py-2.5 px-2 text-center whitespace-nowrap">
                      {shift.verificationStatus === 'verified' ? (
                        <div className="inline-flex flex-col items-center">
                          {shift.supervisorSignature ? (
                            <img
                              src={shift.supervisorSignature}
                              alt="Supervisor Signature"
                              className="h-6 max-w-[90px] object-contain"
                            />
                          ) : (
                            <span className="text-[10px] font-bold text-emerald-700 uppercase">
                              VERIFIED
                            </span>
                          )}
                          <span className="text-[9px] font-mono text-slate-400">
                            {shift.verifiedAt ? shift.verifiedAt.split('T')[0] : shift.date}
                          </span>
                        </div>
                      ) : (
                        <span className="text-[10px] text-amber-600 font-medium">Pending Sign-off</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Academic Attestation & Signature Lines */}
        <div className="print-break-inside-avoid border-t-2 border-slate-300 pt-6 mt-8 space-y-6 text-xs text-slate-700">
          <p className="text-[11px] text-slate-600 leading-relaxed italic">
            I hereby certify that the above recorded service hours, clinical encounters, and volunteer engagements represent true and accurate records completed under approved institutional guidelines at The University of Texas at Dallas. Falsification of volunteer hours constitutes a violation of the UTD Student Code of Conduct (UTDPP1044).
          </p>

          <div className="grid grid-cols-2 gap-12 pt-6">
            <div>
              <div className="border-b border-slate-400 pb-1 h-8 flex items-end">
                <span className="font-serif italic text-sm text-slate-800">{profile.name}</span>
              </div>
              <div className="flex justify-between text-[10px] uppercase font-bold text-slate-500 mt-1">
                <span>Student Signature</span>
                <span>Date: {currentDate}</span>
              </div>
            </div>

            <div>
              <div className="border-b border-slate-400 pb-1 h-8 flex items-end justify-between">
                <span className="font-serif text-xs text-slate-500">Official Stamp / Seal Authorized</span>
                <span className="text-[10px] font-mono text-slate-400">UTD OSV/HPAC AUDITED</span>
              </div>
              <div className="flex justify-between text-[10px] uppercase font-bold text-slate-500 mt-1">
                <span>Office of Student Volunteerism</span>
                <span>The University of Texas at Dallas</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
