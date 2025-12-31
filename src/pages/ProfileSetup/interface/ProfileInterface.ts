import { EditProfileType } from "@/schemas/auth/User.Validation";
// basic info 
export interface Question {
  id: number;
  title: string;
  description?: string;
  field?: keyof EditProfileType | string;
  type: 'profilePicture' | 'coverPhoto' | 'text' | 'date' | 'select' | 'textarea';
  options?: { value: string; label: string }[];
  placeholder?: string;
}

export interface QuestionInputProps {
  question: Question;
  onNext: (value?: any) => void;
  register: any;
  control: any;
  errors: any;
  language: string;
}
