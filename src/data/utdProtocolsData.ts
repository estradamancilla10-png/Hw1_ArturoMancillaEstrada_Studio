import { UTDDepartmentProtocol, UTDDepartmentCode } from '../types';

export const UTD_DEPARTMENT_PROTOCOLS: Record<UTDDepartmentCode, UTDDepartmentProtocol> = {
  hpac: {
    id: 'hpac',
    name: 'Health Professions Advising Center (HPAC)',
    shortCode: 'HPAC',
    schoolOrDivision: 'School of Natural Sciences and Mathematics (NSM) / Pre-Health',
    targetAudience: 'Pre-Med, Pre-Dental, Pre-Physician Assistant, Pre-Pharmacy, and Pre-Optometry Comets',
    overview: 'HPAC coordinates clinical and healthcare experiential requirements for TMDSAS (Texas Medical & Dental Schools Application Service) and AMCAS/AACOMAS applicant evaluations, including HPAC Committee Letter preparation.',
    hourRequirementSummary: 'Recommended minimum 150–200+ hours of direct clinical exposure + 50+ hours of non-clinical community service before submitting TMDSAS applications.',
    eligibilityCriteria: [
      'Direct patient interaction: Student must be close enough to observe, speak with, or directly care for patients (TMDSAS standard).',
      'Clinical settings: Inpatient hospital units, emergency departments, community outpatient free clinics, hospice care facilities, or memory care centers.',
      'Physician Shadowing vs. Clinical Volunteering: Shadowing hours must be logged separately; do NOT conflate pure physician shadowing with active volunteer service.',
      'Consistent longitudinal commitment: Medical admissions committees favor 6–12 months of sustained service over one-week bursts.',
    ],
    approvedSites: [
      {
        name: 'UT Southwestern Medical Center (Clements University Hospital)',
        location: '6201 Harry Hines Blvd, Dallas, TX 75390',
        description: 'Inpatient rounding, emergency triage navigation, and surgical liaison services.',
      },
      {
        name: 'Parkland Health & Hospital System',
        location: '5200 Harry Hines Blvd, Dallas, TX 75235',
        description: 'Level 1 trauma triage support, medical Spanish translation, and burn center assistance.',
      },
      {
        name: 'Methodist Richardson Medical Center',
        location: '2831 E President George Bush Hwy, Richardson, TX 75082',
        description: 'Directly adjacent to UTD campus; cardiac rehab, patient ambulation, and comfort rounds.',
      },
      {
        name: 'Children’s Medical Center Dallas',
        location: '1935 Medical District Dr, Dallas, TX 75235',
        description: 'Pediatric playroom activity coordination, family respite, and outpatient clinics.',
      },
      {
        name: 'Agape Clinic (East Dallas Community Health)',
        location: '4104 Junius St, Dallas, TX 75246',
        description: 'Community free clinic serving uninsured Dallas residents; intake vitals and patient advocacy.',
      },
    ],
    prohibitedActivities: [
      'Performing medical procedures without licensed credentialing (e.g., administering injections or interpreting labs independently).',
      'Counting paid clinical scribe/CNA hours as non-compensated volunteer hours (classify as Paid Healthcare Employment on TMDSAS).',
      'Shadowing a parent, sibling, or immediate family physician as primary clinical verification.',
    ],
    verificationRules: [
      'Supervisor must hold a valid institutional clinical title (e.g., RN, MD, Director of Volunteer Services).',
      'Official institutional email required (e.g., @utsouthwestern.edu, @parknet.pmh.org, @mhd.com); personal Gmail or Yahoo addresses are rejected during committee review.',
      'Digital signature or signed official time verification log required for the HPAC Health Professions Evaluation (HPE) packet.',
    ],
    submissionInstructions: {
      portalName: 'HPAC HPE Packet Portal / TMDSAS Section',
      deadlineInfo: 'March 15 for juniors applying for HPAC Committee Letters; May 1 for summer TMDSAS submission.',
      stepByStep: [
        'Log all shifts with specific clinical competencies (e.g., Patient Triage, Empathy, Vital Checks).',
        'Collect supervisor digital signature or verification receipt at the end of each semester.',
        'Export the official UTD Verified Timesheet from this tracker.',
        'Upload into the HPAC HPE Box submission folder under your UTD NetID.',
      ],
    },
    contact: {
      office: 'Health Professions Advising Center (HPAC)',
      location: 'Founders Building (FO 2.710)',
      email: 'hpac@utdallas.edu',
      phone: '(972) 883-6789',
    },
  },

  osv: {
    id: 'osv',
    name: 'Office of Student Volunteerism (OSV)',
    shortCode: 'OSV',
    schoolOrDivision: 'Division of Student Affairs',
    targetAudience: 'All Undergraduate and Graduate UTD Comets',
    overview: 'The Office of Student Volunteerism promotes civic engagement, community leadership, and recognizes outstanding student service through the prestigious annual UTD Comet Service Honors.',
    hourRequirementSummary: 'Annual Tiers: Bronze (50 hrs), Silver (100 hrs), and Gold (200 hrs). Gold recipients receive an official honors medallion at graduation commencement.',
    eligibilityCriteria: [
      'Hours must be served with a verified 501(c)(3) nonprofit, public school, hospital, or civic government body.',
      'Zero monetary compensation, stipends, or commercial sales incentives.',
      'Campus-based service must directly benefit student welfare (e.g., Comet Cupboard, campus community garden) or environmental initiatives.',
      'Must maintain continuous undergraduate or graduate enrollment at UTD during the tracking period.',
    ],
    approvedSites: [
      {
        name: 'The Comet Cupboard (UTD On-Campus Food Pantry)',
        location: 'UTD Student Union Basement (SU 0.01)',
        description: 'Stocking nutritious groceries, inventory audits, and confidential food distributions for UTD students.',
      },
      {
        name: 'Network of Community Ministries',
        location: '1500 International Pkwy, Richardson, TX 75081',
        description: 'Food distribution, mobile pantry outreach, and emergency clothing closet for Richardson families.',
      },
      {
        name: 'Comet Campus Community Garden & Monarch Waystation',
        location: 'UTD Campus (Near University Village Phase 1)',
        description: 'Organic farming, composting, harvesting produce for Comet Cupboard, and pollinator conservation.',
      },
      {
        name: 'Richardson Animal Shelter',
        location: '1801 Plano Rd, Richardson, TX 75081',
        description: 'Canine socialization, adoption clinic logistics, and shelter enrichment programs.',
      },
      {
        name: 'Alternative Spring Break (ASB) Partnerships',
        location: 'Various Regional Sites (OSV Led)',
        description: 'Intensive week-long service projects tackling disaster relief, housing, and public health.',
      },
    ],
    prohibitedActivities: [
      'Partisan political campaigning, electioneering, or lobbying on behalf of specific candidates.',
      'Proselytizing or religious conversion activities (humanitarian food drives by faith organizations are eligible).',
      'Service rendered strictly for family members or private for-profit entities.',
    ],
    verificationRules: [
      'Each shift entry must be verified by the on-site supervisor within 30 days of service.',
      'Third-party timesheet certification or digital signature stamp required for annual Comet Honor audits.',
      'Random audit checks conducted by OSV student coordinators each April.',
    ],
    submissionInstructions: {
      portalName: 'OSV Comet Service Honor Portal / Engage UTD',
      deadlineInfo: 'April 15 annually for Spring Commencement Honor Medallions; August 1 for Summer recognition.',
      stepByStep: [
        'Track all volunteer shifts throughout the academic year in this tool.',
        'Review total verified hours against the Bronze (50h), Silver (100h), or Gold (200h) tier.',
        'Export your certified UTD Timesheet with supervisor signatures.',
        'Submit the timesheet PDF through Engage UTD or email directly to volunteer@utdallas.edu.',
      ],
    },
    contact: {
      office: 'Office of Student Volunteerism',
      location: 'Student Union (SU 2.506)',
      email: 'volunteer@utdallas.edu',
      phone: '(972) 883-6393',
    },
  },

  jsom: {
    id: 'jsom',
    name: 'Naveen Jindal School of Management (JSOM 100-Hour Requirement)',
    shortCode: 'JSOM',
    schoolOrDivision: 'Naveen Jindal School of Management',
    targetAudience: 'All JSOM Undergraduate Degree Candidates (BCOM, ACCT, FIN, ITS, MKT, BA, BMAN)',
    overview: 'All undergraduate students in the Naveen Jindal School of Management are required to complete 100 hours of community service (or an approved business internship) as an official degree prerequisite for graduation.',
    hourRequirementSummary: 'Mandatory 100 verified community service hours required for graduation certification.',
    eligibilityCriteria: [
      'Service must be with a registered 501(c)(3) charitable nonprofit organization or government entity.',
      'Students cannot receive pay, course credit, or commercial sales commissions for community service hours.',
      'Maximum allowable hours per calendar day is 8 hours.',
      'Organizations must have an active physical presence and a designated non-student supervisor.',
    ],
    approvedSites: [
      {
        name: 'North Texas Food Bank (NTFB)',
        location: '3677 Mapleshade Ln, Plano, TX 75075',
        description: 'Warehouse logistics, volunteer pack-box shifts, sorting non-perishables for regional food pantries.',
      },
      {
        name: 'Junior Achievement of Dallas',
        location: 'Dallas Independent School District Classrooms',
        description: 'Teaching financial literacy, business ethics, and entrepreneurship to local K-12 students.',
      },
      {
        name: 'Habitat for Humanity Dallas ReStore',
        location: 'Plano & Dallas Retail Logistics Centers',
        description: 'Inventory merchandising, donation intake, and hardware logistics supporting affordable housing.',
      },
      {
        name: 'VITA (Volunteer Income Tax Assistance) - JSOM IRS Program',
        location: 'JSOM Executive Education Center (Jindal School)',
        description: 'IRS-certified tax return preparation for low-to-moderate income community families.',
      },
    ],
    prohibitedActivities: [
      'Working for private for-profit corporations (corporations must go through the JSOM Internship Approval Process instead).',
      'Having a parent, sibling, or family member act as the supervisor or sign the verification.',
      'Fraternity or sorority internal chapter operational tasks (only external third-party philanthropy qualifies).',
      'Shifts exceeding 8 hours in a single 24-hour period.',
    ],
    verificationRules: [
      'Supervisor must provide a valid organizational email and direct contact phone number.',
      'Digital signature on official timesheet or formal agency letterhead timesheet.',
      'Students must submit the verification package through Handshake at least one semester before graduation.',
    ],
    submissionInstructions: {
      portalName: 'Handshake - JSOM Community Service Experience Form',
      deadlineInfo: 'Final semester graduation deadline: October 15 (Fall graduates) or March 15 (Spring graduates).',
      stepByStep: [
        'Complete community service shifts with certified 501(c)(3) agencies.',
        'Ensure supervisor signs each entry digitally or provides signed timesheet.',
        'Export the UTD Official Timesheet PDF from this tracker.',
        'Log into Handshake -> Career Center -> Experiences -> Request an Experience -> select "JSOM Community Service Requirement".',
        'Attach the exported UTD Timesheet and submit for Career Management Center audit.',
      ],
    },
    contact: {
      office: 'JSOM Career Management Center (CMC)',
      location: 'JSOM 13.100 (Jindal School of Management)',
      email: 'jsomcmc@utdallas.edu',
      phone: '(972) 883-6911',
    },
  },

  ecs: {
    id: 'ecs',
    name: 'Erik Jonsson School of Engineering & Computer Science (ECS)',
    shortCode: 'ECS',
    schoolOrDivision: 'Erik Jonsson School of Engineering and Computer Science',
    targetAudience: 'CS, SE, EE, CE, ME, and BMEN Engineering Comets',
    overview: 'The Jonsson School sponsors community STEM outreach, robotics competition mentoring, and coding education for underrepresented K-12 students across North Texas.',
    hourRequirementSummary: 'Recommended 30–50 hours per academic year for ECS Leadership Distinction & Student Organization Honors.',
    eligibilityCriteria: [
      'Activities must promote STEM literacy, coding skills, robotics, or engineering education for youth.',
      'Includes university-sponsored coding camps, hackathon mentorship, and FIRST Robotics / VEX judging.',
      'Must complete the UTD Youth Protection Program (YPP) training and background check prior to working with minors.',
    ],
    approvedSites: [
      {
        name: 'UTD CS Outreach Coding Camps & Clubs',
        location: 'Engineering and Computer Science South (ECSS Building)',
        description: 'Teaching Python, Scratch, and Java to Dallas-area elementary, middle, and high school students.',
      },
      {
        name: 'FIRST Tech Challenge (FTC) & FLL North Texas Tournaments',
        location: 'Activity Center / DFW Area High Schools',
        description: 'Judging, field coordination, and technical inspection for K-12 competitive robotics teams.',
      },
      {
        name: 'Dallas ISD STEM Academy After-School Tutoring',
        location: 'Local Title 1 Dallas ISD Middle Schools',
        description: 'Assisting students with algebra, physics, and introductory computer programming concepts.',
      },
      {
        name: 'HackUTD Youth Track & Workshop Mentoring',
        location: 'UTD Davidson-Gundy Alumni Center',
        description: 'Guiding novice high school coders through their first web or mobile application projects.',
      },
    ],
    prohibitedActivities: [
      'Tutoring without completed UTD Youth Protection Program (YPP) certification when minors are present.',
      'Private paid tutoring or freelance software development projects.',
    ],
    verificationRules: [
      'Approved by ECS Outreach Director, student organization faculty advisor (IEEE, ACM, SWE), or event coordinator.',
      'Digital signature recorded on shift log.',
    ],
    submissionInstructions: {
      portalName: 'ECS Student Leadership & Outreach Portal',
      deadlineInfo: 'Semester-end review: December 1 (Fall) and May 1 (Spring).',
      stepByStep: [
        'Complete UTD YPP background check prior to shifts.',
        'Log youth mentoring and robotics referee hours in this tracker.',
        'Export verified timesheet.',
        'Submit to ECS Student Organizations advisor or outreach office.',
      ],
    },
    contact: {
      office: 'Jonsson School Student Outreach',
      location: 'Engineering and Computer Science West (ECSW 2.140)',
      email: 'ecs_outreach@utdallas.edu',
      phone: '(972) 883-4856',
    },
  },

  fsl: {
    id: 'fsl',
    name: 'Fraternity & Sorority Life (FSL / Greek Life)',
    shortCode: 'FSL',
    schoolOrDivision: 'Student Organization Center (SOC) / FSL',
    targetAudience: 'Active Greek Members in IFC, CPC, NPHC, and MGC Chapters',
    overview: 'Fraternity and Sorority Life at UTD oversees chapter philanthropy mandates, community service standards, and the annual Greek Cup service competition.',
    hourRequirementSummary: 'Mandatory 15–20 hours per member each semester (varies by national chapter bylaws) + annual chapter philanthropy event.',
    eligibilityCriteria: [
      'Direct service rendered to recognized external 501(c)(3) philanthropy partners.',
      'Greek members cannot count internal chapter business meetings, ritual meetings, or rush events as community service.',
      'Both Greek-sponsored service days and individual volunteer service qualify toward individual chapter active status.',
    ],
    approvedSites: [
      {
        name: 'Alpha Phi Omega (Nu Gamma Chapter) Service Projects',
        location: 'Campus & Richardson Community',
        description: 'National co-ed service fraternity campus cleanups, food recovery, and youth mentoring.',
      },
      {
        name: 'Dallas Children’s Advocacy Center',
        location: '5351 Samuell Blvd, Dallas, TX 75228',
        description: 'Toy drives, back-to-school backpack distributions, and campus philanthropy fundraisers.',
      },
      {
        name: 'St. Jude Children’s Research Hospital Philanthropy',
        location: 'UTD Plinth & Student Union Mall',
        description: 'Fundraising, letter-writing campaigns, and pediatric awareness outreach.',
      },
      {
        name: 'Keep Richardson Beautiful (KRB) Campus Cleanups',
        location: 'Spring Creek Nature Area & Campus Perimeters',
        description: 'Creek cleanup, litter removal along Floyd Road, and trail maintenance.',
      },
    ],
    prohibitedActivities: [
      'Logging social events, mixers, date dashes, or chapter brotherhood/sisterhood retreats.',
      'Counting monetary donations as hour equivalents without physical volunteer labor.',
    ],
    verificationRules: [
      'Must be signed off by the Chapter Philanthropy Chair or the external non-profit volunteer lead.',
      'Exported timesheet reviewed for Greek Cup annual award calculations.',
    ],
    submissionInstructions: {
      portalName: 'FSL Greek Life Service Tracker / SOC Engage',
      deadlineInfo: 'Semester cut-off: November 20 (Fall) and April 20 (Spring).',
      stepByStep: [
        'Log all chapter and individual philanthropy hours.',
        'Have chapter philanthropy lead or site supervisor sign the digital signature pad.',
        'Export UTD Timesheet for submission to your chapter executive board and FSL advisor.',
      ],
    },
    contact: {
      office: 'Fraternity and Sorority Life',
      location: 'Student Union (SU 2.410)',
      email: 'fsl@utdallas.edu',
      phone: '(972) 883-6539',
    },
  },

  honors: {
    id: 'honors',
    name: 'Hobson Wildenthal Honors College / Collegium V',
    shortCode: 'HONORS',
    schoolOrDivision: 'Hobson Wildenthal Honors College',
    targetAudience: 'Collegium V Honors, McDermott Scholars, and National Merit Scholars',
    overview: 'The Honors College requires students to engage in high-impact community leadership, civic scholarship, and undergraduate mentorship as part of the Collegium V Honors Distinction.',
    hourRequirementSummary: '50 hours of verified civic engagement / community leadership before graduation capstone review.',
    eligibilityCriteria: [
      'Projects must demonstrate scholarly engagement, civic responsibility, or community-based research.',
      'Can include volunteer tutoring for disadvantaged youth, civic policy research, or pro bono community consulting.',
    ],
    approvedSites: [
      {
        name: 'UTD Peer Tutoring & Honors Mentorship',
        location: 'McDermott Library (Student Success Center)',
        description: 'Volunteer academic tutoring in calculus, biology, chemistry, and honors seminars.',
      },
      {
        name: 'Dallas Public Library Adult Literacy Program',
        location: 'J. Erik Jonsson Central Library (Dallas)',
        description: 'Teaching adult ESL, basic computer literacy, and citizenship preparation.',
      },
      {
        name: 'North Texas Civil Rights & Civic Fellows',
        location: 'Richardson & Dallas Municipalities',
        description: 'Nonpartisan community research, civic survey analysis, and public forums.',
      },
    ],
    prohibitedActivities: [
      'Standard paid undergraduate research with stipends (unless specific volunteer hours are designated).',
    ],
    verificationRules: [
      'Supervisor digital signature and reflective narrative required for Honors Dean review.',
    ],
    submissionInstructions: {
      portalName: 'Honors College Capstone & Civic Engagement Portal',
      deadlineInfo: 'Graduation semester priority: March 1 (Spring) and October 1 (Fall).',
      stepByStep: [
        'Record hours and detailed reflections on community impact.',
        'Collect supervisor signature verification.',
        'Attach exported UTD timesheet to your Honors Capstone Portfolio.',
      ],
    },
    contact: {
      office: 'Hobson Wildenthal Honors College',
      location: 'Green Hall (GR 2.510)',
      email: 'honors@utdallas.edu',
      phone: '(972) 883-2586',
    },
  },

  epps: {
    id: 'epps',
    name: 'School of Economic, Political & Policy Sciences (EPPS / Pre-Law)',
    shortCode: 'EPPS',
    schoolOrDivision: 'School of Economic, Political and Policy Sciences',
    targetAudience: 'Political Science, Public Policy, Criminology, and Pre-Law Comets',
    overview: 'EPPS guidelines for public service, pro bono legal assistance observation, municipal justice volunteering, and nonpartisan civic advocacy.',
    hourRequirementSummary: '40 hours recommended per academic year for EPPS Public Service Honors & Pre-Law Society portfolios.',
    eligibilityCriteria: [
      'Service in court administration, legal aid societies, voter registration, or civic non-profits.',
      'Must maintain strictly nonpartisan conduct during civic engagement.',
    ],
    approvedSites: [
      {
        name: 'Legal Aid of NorthWest Texas (Dallas Office)',
        location: '1515 Main St, Dallas, TX 75201',
        description: 'Intake assistance, client document organization, and pro bono clinic coordination for low-income clients.',
      },
      {
        name: 'Dallas County Public Defender Volunteer Program',
        location: 'Frank Crowley Courts Building (Dallas)',
        description: 'Assisting investigators, case file synthesis, and observing criminal court proceedings.',
      },
      {
        name: 'League of Women Voters of Dallas County',
        location: 'Dallas / Richardson Public Libraries',
        description: 'Nonpartisan voter registration drives, distributing nonpartisan voter guides to UTD students.',
      },
    ],
    prohibitedActivities: [
      'Partisan campaign endorsement or paid election canvassing.',
      'Providing unauthorized legal advice to clients.',
    ],
    verificationRules: [
      'Signed by licensed attorney, court clerk, or legal aid program director.',
    ],
    submissionInstructions: {
      portalName: 'EPPS Public Service & Pre-Law Dossier',
      deadlineInfo: 'December 1 (Fall) and May 1 (Spring).',
      stepByStep: [
        'Log court and civic service shifts.',
        'Collect supervising attorney or coordinator signature.',
        'Export verified timesheet for Pre-Law Dean verification.',
      ],
    },
    contact: {
      office: 'EPPS Dean of Public Affairs & Pre-Law',
      location: 'Cecil H. Green Hall (GR 3.104)',
      email: 'epps@utdallas.edu',
      phone: '(972) 883-2935',
    },
  },
};
