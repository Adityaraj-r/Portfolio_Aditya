export type Project = {
  slug: string;
  name: string;
  category: string;
  subtitle: string;
  description: string;
  summary: string;
  problem: string;
  solution: string;
  architecture: string[];
  features: string[];
  decisions: string[];
  engineeringChallenge?: string;
  technologies: string[];
  images: {
    src: string;
    alt: string;
    width: number;
    height: number;
    caption: string;
  }[];
  github?: string;
  demo?: string;
  featured: boolean;
  showcaseOnly?: boolean;
};

export const projects: Project[] = [
  {
    slug: "talentflow-hrms",
    name: "TalentFlow HRMS",
    category: "Full stack / Human resources",
    subtitle: "Connected workflows across the employee lifecycle",
    description: "An HR management system covering recruitment, onboarding, employee records, attendance, performance, payroll, and offboarding with role-based access.",
    summary: "TalentFlow combines a React frontend with an Express and TypeScript API backed by MongoDB. Its modules connect hiring and onboarding with ongoing employee operations, payroll, and resignation or termination workflows.",
    problem: "HR teams, managers, and employees need connected workflows while accessing different records and actions according to their responsibilities.",
    solution: "Organized employee operations into React workflows and module-based Express APIs, with MongoDB models for HR records, JWT authentication, role checks, and a permission matrix for protected operations.",
    architecture: ["React interface with TanStack Query", "Express and TypeScript module APIs", "JWT authentication and permission checks", "MongoDB and Mongoose HR records"],
    features: ["Recruitment, interviews, offers, and onboarding", "Employee profiles and document workflows", "Attendance, leave, and shift management", "Performance reviews, goals, and improvement plans", "Payroll operations, policies, and salary slips", "Resignation, termination, and offboarding clearance", "Role-based dashboards and module permissions"],
    decisions: ["Separated HR modules into Express routes, controllers, and MongoDB models.", "Used JWT authentication and role permissions to guard API operations.", "Applied a permission matrix to module actions, with explicit performance access checks.", "Represented offboarding through approval stages, notice periods, clearance, and audit history."],
    engineeringChallenge: "Employee operations span roles with different authority. Authentication middleware, module permissions, and workflow-specific approval checks connect the interface to controlled API actions, including recruitment and offboarding transitions.",
    technologies: ["React.js", "TypeScript", "Node.js", "Express.js", "MongoDB", "TanStack Query", "Tailwind CSS"],
    images: [
      {
        src: "/projects/talentflow/overview.webp",
        alt: "TalentFlow HRMS product visual showing an employee dashboard, recruitment workflow, resume screening panel, and role-based access overview.",
        width: 1672,
        height: 941,
        caption: "The supplied TalentFlow overview visual brings hiring and employee operations together.",
      },
      {
        src: "/projects/talentflow/lifecycle.webp",
        alt: "TalentFlow HRMS product visual with a hiring dashboard, candidate analysis panel, employee lifecycle stages, and a mobile interface.",
        width: 1672,
        height: 941,
        caption: "A supplied visual of recruitment and the employee journey through onboarding and exit.",
      },
      {
        src: "/projects/talentflow/dashboard.webp",
        alt: "TalentFlow HRMS dashboard product visual with recruitment, employee management, performance, payroll, attendance, and exit modules.",
        width: 1536,
        height: 1024,
        caption: "A supplied visual of the dashboard and its HR management modules.",
      },
    ],
    github: "https://github.com/Adityaraj-r/talentflow-hrms",
    featured: true,
  },
  {
    slug: "docai-brain",
    name: "DocAI Brain",
    category: "AI / Document intelligence",
    subtitle: "A knowledge base that answers back",
    description: "A PDF question-answering platform that turns documents into a searchable knowledge base with contextual AI answers.",
    summary: "DocAI Brain combines a Next.js interface with FastAPI AI services, hybrid retrieval, and LangGraph orchestration for document question answering.",
    problem: "Finding a specific answer in long PDFs takes time. Keyword search alone can miss the meaning behind a question.",
    solution: "Built a RAG chatbot with ChromaDB vector retrieval and keyword-aware reranking, LangGraph workflows for contextual answers, and Redis Pub/Sub for asynchronous communication between Node.js and Python services.",
    architecture: ["PDF ingestion and processing", "ChromaDB vector retrieval + keyword-aware reranking", "LangGraph contextual answer generation", "FastAPI services + Next.js interface"],
    features: ["PDF question answering", "Vector retrieval with keyword-aware reranking", "Contextual LLM answers", "Asynchronous AI microservice communication"],
    decisions: ["Combined vector similarity with a keyword-overlap bonus to rank retrieved context.", "Used LangGraph to orchestrate contextual answer generation.", "Used Redis Pub/Sub for asynchronous communication between AI services."],
    engineeringChallenge: "A question can use different wording from the source PDF. The retrieval pipeline combines vector similarity with a keyword-overlap bonus to rank context before LangGraph orchestrates answer generation.",
    technologies: ["Next.js", "TypeScript", "FastAPI", "LangChain", "LangGraph", "ChromaDB", "Redis"],
    images: [
      {
        src: "/projects/docai-brain/overview.webp",
        alt: "DocAI Brain product visual with a document question, an AI answer, and a source list beside PDF upload and search features.",
        width: 1672,
        height: 941,
        caption: "Document questions, contextual answers, and source references in the supplied product visual.",
      },
      {
        src: "/projects/docai-brain/architecture.webp",
        alt: "DocAI Brain concept visual showing PDFs flowing through document processing, vector embeddings, and semantic search into a chat interface.",
        width: 1536,
        height: 1024,
        caption: "A supplied visual of the path from document processing to an answer interface.",
      },
    ],
    github: "https://github.com/Adityaraj-r/DocAi",
    demo: "https://docbrain-ai-frontend.vercel.app/",
    featured: true,
  },
  {
    slug: "echoguard",
    name: "EchoGuard",
    category: "Machine learning / Audio analysis",
    subtitle: "AI-powered deepfake audio detection system",
    description: "Built an audio classification pipeline that converts recordings into Mel spectrograms for ResNet-18 classification and exposes inference through FastAPI.",
    summary: "EchoGuard combines audio feature extraction, deep-learning classification, and API-based inference in one audio scoring workflow.",
    problem: "The project focuses on classifying audio to detect synthetic and cloned audio.",
    solution: "Converted audio into Mel spectrograms with Librosa, used a ResNet-18 CNN with trained weights for classification and scoring, and built FastAPI REST endpoints for audio processing and inference.",
    architecture: ["Audio processing with Librosa", "Mel-spectrogram feature extraction", "ResNet-18 CNN classification and scoring", "FastAPI REST endpoints for inference"],
    features: ["Audio feature extraction", "Deep-learning audio classification", "Classification and scoring", "FastAPI inference endpoints"],
    decisions: ["Converted audio recordings into Mel-spectrogram representations.", "Used a ResNet-18 CNN model for classification.", "Exposed processing and inference through FastAPI REST endpoints."],
    engineeringChallenge: "Audio preprocessing and model inference need a consistent representation. Librosa converts recordings into Mel spectrograms for the ResNet-18 classifier, while FastAPI exposes processing and inference through REST endpoints.",
    technologies: ["Python", "PyTorch", "FastAPI", "Librosa", "CNN", "Audio Processing"],
    images: [
      {
        src: "/projects/echoguard/overview.webp",
        alt: "EchoGuard product visual showing an audio upload interface, a classification panel, spectrograms, and the audio processing pipeline.",
        width: 1672,
        height: 941,
        caption: "Audio input, spectrogram analysis, and classification in the supplied product visual.",
      },
      {
        src: "/projects/echoguard/analysis.webp",
        alt: "EchoGuard concept visual with an audio detection interface, Mel-spectrogram preprocessing, a ResNet-18 model, and example audio comparisons.",
        width: 1672,
        height: 941,
        caption: "A supplied visual of preprocessing, model inference, and example audio analysis.",
      },
    ],
    github: "https://github.com/Adityaraj-r/echoguard",
    featured: true,
  },
  {
    slug: "syncspace",
    name: "SyncSpace",
    category: "Full stack / Real-time communication",
    subtitle: "Language exchange through chat and video",
    description: "Built a language-exchange platform with React, Express REST services, JWT authentication, MongoDB, and Stream chat and video integrations.",
    summary: "SyncSpace connects language learners through friend requests, real-time chat, and video calls, combining a React frontend with Express APIs, MongoDB, and Stream.",
    problem: "Language learners need a way to find conversation partners and move from a connection request into a chat or video conversation.",
    solution: "Built React workflows for onboarding and connections, Express services with JWT authentication, MongoDB storage for users and friendships, and Stream integrations for chat and video calls.",
    architecture: ["React.js frontend with TanStack Query", "Express REST APIs and JWT authentication", "MongoDB user and friendship storage", "Stream chat and video SDK integration"],
    features: ["Language-learning profiles and onboarding", "Friend requests and connections", "Real-time chat with Stream", "Video calls with Stream", "JWT-based authentication"],
    decisions: ["Used MongoDB and Mongoose for user and friendship records.", "Used JWT authentication for protected application workflows.", "Integrated Stream SDKs for chat and video communication.", "Used TanStack Query for frontend server-state management."],
    engineeringChallenge: "The application connects account onboarding and friendships with chat and video workflows. MongoDB stores user and friendship records, JWT protects application workflows, and Stream SDKs provide the conversation layer.",
    technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "Stream", "TanStack Query", "Tailwind CSS"],
    images: [
      {
        src: "/projects/syncspace/overview.webp",
        alt: "SyncSpace product visual showing a language partner directory with profiles, language filters, and chat actions on a laptop.",
        width: 1672,
        height: 941,
        caption: "Language partner discovery and conversation entry points in the supplied product visual.",
      },
      {
        src: "/projects/syncspace/experience.webp",
        alt: "SyncSpace concept visual showing language partner profiles, a mobile video call, messaging, and language matching panels.",
        width: 1672,
        height: 941,
        caption: "A supplied visual of the language exchange, chat, and video experience.",
      },
    ],
    github: "https://github.com/Adityaraj-r/SyncSpace",
    demo: "https://syncspace-0a4n.onrender.com/login",
    featured: true,
  },
  {
    slug: "placement-portal",
    name: "Placement Portal",
    category: "Full stack / Campus recruitment",
    subtitle: "Campus opportunities, applications, and placement workflows",
    description: "A campus placement platform with student profiles, eligibility-aware applications, placement drives, and staff workflows using Next.js and Supabase.",
    summary: "Placement Portal provides separate student and placement-team workflows. Next.js Server Actions coordinate Supabase authentication, profiles, companies, placement drives, applications, interviews, offers, and placement records.",
    problem: "Students need a clear path from a published placement opportunity to an application, while coordinators and placement staff need controlled tools to manage drives and review applicants.",
    solution: "Built student and staff routes backed by Supabase, with role checks in Server Actions, eligibility and deadline validation for applications, resume upload controls, and database migrations for access policies and placement workflows.",
    architecture: ["Next.js App Router and React interface", "Server Actions with role and ownership checks", "Supabase Auth, PostgreSQL, and Storage", "Placement drives, applications, and lifecycle records"],
    features: ["Student, coordinator, TPO, and admin roles", "Student profiles and PDF resume uploads", "Company records and placement drive management", "Application eligibility, deadline, and duplicate checks", "Application tracking and applicant review", "Interview, offer, and placement workflows in source", "Student resume feedback through Gemini"],
    decisions: ["Checked authentication, roles, and record ownership inside Server Actions.", "Validated eligibility, registration deadlines, resume presence, and duplicate applications before submission.", "Added Supabase database access policies and limited application update permissions.", "Kept Gemini resume feedback server-side and validated the returned response structure."],
    engineeringChallenge: "Student and staff actions need distinct access rules. Server Actions verify the caller and record ownership, application rules check eligibility and deadlines, and database migrations define additional access controls. The inspected lifecycle workflows still require runtime verification.",
    technologies: ["Next.js", "React.js", "JavaScript", "Supabase", "PostgreSQL", "Tailwind CSS", "Gemini"],
    images: [
      {
        src: "/projects/placement-portal-dashboard.webp",
        alt: "College Placement Portal dashboard overview with student, company, placement drive, and application management screens.",
        width: 1672,
        height: 941,
        caption: "Dashboard overview of student management, company records, placement drives, and application tracking.",
      },
    ],
    github: "https://github.com/Adityaraj-r/placement-portal",
    featured: true,
  },
];
