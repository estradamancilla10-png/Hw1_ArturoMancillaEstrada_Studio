import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, Mail, Copy, Check, FileCheck } from 'lucide-react';
import { VolunteerShift, StudentProfile } from '../types';
import { DigitalSignaturePad } from './DigitalSignaturePad';

interface VerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  shift: VolunteerShift;
  profile: StudentProfile;
  onConfirmVerification: (shiftId: string, signatureDataUrl: string) => void;
}

export const VerificationModal: React.FC<VerificationModalProps> = ({
  isOpen,
  onClose,
  shift,
  profile,
  onConfirmVerification,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [supervisorAck, setSupervisorAck] = useState(true);

  if (!isOpen) return null;

  const handleSignatureSave = (signatureDataUrl: string) => {
    onConfirmVerification(shift.id, signatureDataUrl);
    onClose();
  };

  const verificationCode = `CS-VERIF-${shift.id.toUpperCase().slice(-6)}-${shift.date.replace(/-/g, '')}`;

  const copyVerificationReceipt = () => {
    const text = `VOLUNTEER HOURS VERIFICATION REQUEST
Student: ${profile.name} (ID: ${profile.studentId})
Institution: ${profile.university}
Shift Date: ${shift.date} (${shift.startTime} - ${shift.endTime})
Hours: ${shift.hours} hours
Organization: ${shift.organization}
Location: ${shift.location}
Supervisor: ${shift.supervisorName} (${shift.supervisorEmail})
Duties: ${shift.description}
Verification Code: ${verificationCode}`;

    navigator.clipboard.writeText(text);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="relative bg-white rounded-2xl max-w-xl w-full border border-slate-200 shadow-xl overflow-hidden my-6">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 tracking-tight">
                Supervisor Sign-off &amp; Verification
              </h2>
              <p className="text-xs text-slate-500">
                Official accreditation for university &amp; AMCAS hours
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

        {/* Content */}
        <div className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          {/* Shift Details Summary */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs space-y-2">
            <div className="flex items-center justify-between border-b border-slate-200/60 pb-2">
              <div>
                <span className="font-semibold text-slate-900 text-sm">{shift.organization}</span>
                <span className="text-slate-400 mx-1.5">·</span>
                <span className="text-slate-600">{shift.location || 'Main Site'}</span>
              </div>
              <span className="font-mono font-bold text-indigo-700 text-sm tabular-nums">
                {shift.hours.toFixed(1)} hrs
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-slate-600 pt-1">
              <div>
                <span className="text-slate-400">Student: </span>
                <span className="font-medium text-slate-800">{profile.name}</span>
              </div>
              <div>
                <span className="text-slate-400">Date: </span>
                <span className="font-mono tabular-nums text-slate-800">{shift.date}</span>
              </div>
              <div>
                <span className="text-slate-400">Time: </span>
                <span className="font-mono tabular-nums text-slate-800">
                  {shift.startTime} - {shift.endTime}
                </span>
              </div>
              <div>
                <span className="text-slate-400">Supervisor: </span>
                <span className="text-slate-800 font-medium">{shift.supervisorName}</span>
              </div>
            </div>

            <div className="pt-1.5 border-t border-slate-200/60 text-slate-700">
              <span className="text-slate-400 font-medium">Duties: </span>
              {shift.description}
            </div>
          </div>

          {shift.verificationStatus === 'verified' && shift.supervisorSignature ? (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-3">
              <div className="flex items-center gap-2 text-emerald-800 font-semibold text-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Officially Verified &amp; Signed</span>
              </div>
              <div className="bg-white p-3 rounded-lg border border-emerald-100 flex items-center justify-between">
                <div>
                  <div className="text-[11px] text-slate-400">Supervisor Signature on Record:</div>
                  <img
                    src={shift.supervisorSignature}
                    alt="Supervisor signature"
                    className="h-12 max-w-[200px] object-contain my-1"
                  />
                  <div className="text-[11px] text-slate-500 font-mono">
                    Verified on {shift.verifiedAt ? new Date(shift.verifiedAt).toLocaleDateString() : shift.date}
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 font-mono block">Auth Ref</span>
                  <span className="text-[11px] font-mono font-medium text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                    {verificationCode}
                  </span>
                </div>
              </div>
              <p className="text-xs text-emerald-700">
                This shift is locked as verified for your official university timesheet.
              </p>
            </div>
          ) : (
            <>
              {/* Supervisor Attestation */}
              <label className="flex items-start gap-2.5 p-3 rounded-lg bg-amber-50/70 border border-amber-200/80 cursor-pointer text-xs text-amber-900">
                <input
                  type="checkbox"
                  checked={supervisorAck}
                  onChange={(e) => setSupervisorAck(e.target.checked)}
                  className="mt-0.5 rounded text-indigo-600 focus:ring-indigo-500"
                />
                <span>
                  <strong>Supervisor Attestation:</strong> I confirm that {profile.name} completed the {shift.hours} volunteer hours indicated above in good standing under organizational supervision.
                </span>
              </label>

              {/* Digital Signature Drawing Canvas */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold text-slate-800">
                    Sign with Mouse, Touch, or Stylus
                  </label>
                  <span className="text-[11px] text-slate-400">Digital signature stamp</span>
                </div>
                <DigitalSignaturePad
                  onSave={handleSignatureSave}
                  onCancel={onClose}
                />
              </div>

              {/* Alternative: Copy Verification Receipt */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>Need to email your supervisor for remote verification?</span>
                <button
                  type="button"
                  onClick={copyVerificationReceipt}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 text-slate-700 hover:text-indigo-600 hover:bg-slate-100 rounded-md transition-colors"
                >
                  {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedLink ? 'Copied Details' : 'Copy Verification Data'}</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
