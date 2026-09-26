export type Project = {
  slug: string;
  name: string;
  subtitle: string;
  description: string;
  summary: string;
  problem: string;
  solution: string;
  architecture: string[];
  features: string[];
  decisions: string[];
  technologies: string[];
  github?: string;
  demo?: string;
  featured: boolean;
};

export const projects: Project[] = [
  {
    slug: "echoguard",
    name: "EchoGuard",
    subtitle: "AI-powered deepfake audio detection system",
    description: "An audio classification pipeline for detecting synthetic and cloned audio.",
    summary: "EchoGuard combines audio feature extraction, deep-learning classification, and API-based inference in one audio scoring workflow.",
    problem: "The project focuses on classifying audio to detect synthetic and cloned audio.",
    solution: "Extracted MFCC and Mel-Spectrogram features, trained a ResNet-18 CNN model for audio classification and scoring, and built FastAPI REST endpoints for audio processing and inference.",
    architecture: ["Audio processing with Librosa", "MFCC and Mel-Spectrogram feature extraction", "ResNet-18 CNN classification and scoring", "FastAPI REST endpoints for inference"],
    features: ["Audio feature extraction", "Deep-learning audio classification", "Classification and scoring", "FastAPI inference endpoints"],
    decisions: ["Used MFCC and Mel-Spectrogram representations for audio features.", "Used a ResNet-18 CNN model for classification.", "Exposed processing and inference through FastAPI REST endpoints."],
    technologies: ["Python", "PyTorch", "FastAPI", "Librosa", "CNN", "Audio Processing"],
    featured: true,
  },
  {
    slug: "syncspace",
    name: "SyncSpace",
    subtitle: "Real-time chat application",
    description: "A real-time messaging platform with JWT authentication and Supabase synchronization.",
    summary: "SyncSpace brings together a React frontend, RESTful backend services, authentication, and real-time data synchronization.",
    problem: "The project focuses on building a real-time messaging application.",
    solution: "Built a React.js application with Node.js and Express.js RESTful backend services, JWT-based authentication, and real-time database synchronization using Supabase.",
    architecture: ["React.js frontend", "Node.js and Express.js RESTful backend services", "JWT-based authentication", "Supabase real-time synchronization and persistent storage"],
    features: ["Real-time messaging", "JWT-based authentication", "User connection workflows", "Message routing and persistent data storage"],
    decisions: ["Used RESTful backend services for application workflows.", "Implemented JWT-based authentication.", "Used Supabase for real-time database synchronization and persistent storage."],
    technologies: ["React.js", "Node.js", "Express.js", "Supabase", "Tailwind CSS", "REST APIs"],
    featured: true,
  },
];
