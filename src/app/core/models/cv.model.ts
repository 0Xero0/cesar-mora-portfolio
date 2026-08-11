export interface SocialNetwork {
  network: string;
  username: string;
}

export interface Experience {
  company: string;
  position: string;
  location?: string;
  start_date: string;
  end_date?: string | null;
  highlights?: string[];
}

export interface Education {
  institution: string;
  area: string;
  degree: string;
  start_date?: string;
  end_date?: string;
  date?: string;
  location?: string;
  highlights?: string[];
}

export interface Certification {
  name: string;
  summary?: string;
  location?: string;
  date?: string;
}

export interface SkillGroup {
  label: string;
  details: string;
}

export interface Project {
  name: string;
  company?: string;
  date?: string;
  url?: string;
  summary?: string;
  highlights?: string[];
}

export interface CvSections {
  summary?: string[];
  experience?: Experience[];
  education?: Education[];
  certifications?: Certification[];
  skills?: SkillGroup[];
  projects?: Project[];
}

export interface CvProfile {
  name: string;
  display_name?: string;
  location?: string;
  headline?: string;
  email?: string;
  phone?: string;
  website?: string;
  social_networks?: SocialNetwork[];
  sections: CvSections;
}
