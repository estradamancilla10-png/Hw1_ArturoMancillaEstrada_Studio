export type ServiceCategory = 
  | 'clinical'
  | 'community'
  | 'tutoring'
  | 'environmental'
  | 'greek'
  | 'campus';

export type VerificationStatus = 'verified' | 'pending' | 'rejected';

export type UTDDepartmentCode = 'hpac' | 'osv' | 'jsom' | 'ecs' | 'fsl' | 'honors' | 'epps';

export interface VolunteerShift {
  id: string;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  hours: number;
  organization: string;
  location: string;
  category: ServiceCategory;
  goalId?: string;
  utdDepartment?: UTDDepartmentCode;
  description: string;
  skillsLearned: string[];
  supervisorName: string;
  supervisorTitle: string;
  supervisorEmail: string;
  supervisorPhone: string;
  verificationStatus: VerificationStatus;
  supervisorSignature?: string | null; // dataURL string
  verifiedAt?: string | null;
  reflection?: string;
  term: string; // e.g. "Fall 2026"
}

export interface ServiceGoal {
  id: string;
  title: string;
  category: ServiceCategory;
  targetHours: number;
  term: string;
  deadline: string;
  utdDepartment?: UTDDepartmentCode;
  notes?: string;
}

export interface StudentProfile {
  name: string;
  studentId: string; // UTD NetID or Student ID
  netId: string;
  university: string;
  school: string; // e.g. "School of Natural Sciences and Mathematics" or "Naveen Jindal School of Management"
  major: string;
  standing: 'Freshman' | 'Sophomore' | 'Junior' | 'Senior' | 'Graduate';
  gradYear: string;
  email: string;
  campusOrg: string;
  term: string;
  avatarUrl: string;
}

export interface ActiveShiftState {
  isActive: boolean;
  startTime: number | null; // Date.now() timestamp
  elapsedSeconds: number;
  organization: string;
  location: string;
  category: ServiceCategory;
  utdDepartment?: UTDDepartmentCode;
  supervisorName: string;
  supervisorEmail: string;
  notes: string;
}

export interface UTDDepartmentProtocol {
  id: UTDDepartmentCode;
  name: string;
  shortCode: string;
  schoolOrDivision: string;
  targetAudience: string;
  overview: string;
  hourRequirementSummary: string;
  eligibilityCriteria: string[];
  approvedSites: { name: string; location: string; description: string }[];
  prohibitedActivities: string[];
  verificationRules: string[];
  submissionInstructions: {
    portalName: string;
    deadlineInfo: string;
    stepByStep: string[];
  };
  contact: {
    office: string;
    location: string;
    email: string;
    phone: string;
  };
}
