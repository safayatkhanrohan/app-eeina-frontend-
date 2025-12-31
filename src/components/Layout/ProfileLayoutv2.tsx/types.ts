export type SectionKey = 'recipes' | 'saved' | 'goals' | 'profile' | 'settings';
export interface SubLink {
  label: string;
  to: string;
  status?: string;
}

export interface SectionProps {
  id: SectionKey;
  title: string;
  icon: React.ReactNode;
  links: SubLink[];
}