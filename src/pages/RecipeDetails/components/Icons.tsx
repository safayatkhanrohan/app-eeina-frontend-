interface IconProps {
   className?: string;
}

export const NutrientIcon = ({ className = "w-5 h-5" }: IconProps) => (
   <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
         strokeLinecap="round"
         strokeLinejoin="round"
         strokeWidth={2}
         d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
   </svg>
);

export const EnergyIcon = ({ className = "w-6 h-6" }: IconProps) => (
   <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
         strokeLinecap="round"
         strokeLinejoin="round"
         strokeWidth={2}
         d="M13 10V3L4 14h7v7l9-11h-7z"
      />
   </svg>
);

export const ProteinIcon = ({ className = "w-4 h-4" }: IconProps) => (
   <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
         strokeLinecap="round"
         strokeLinejoin="round"
         strokeWidth={2}
         d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
      />
   </svg>
);

export const CarbsIcon = ({ className = "w-4 h-4" }: IconProps) => (
   <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
         strokeLinecap="round"
         strokeLinejoin="round"
         strokeWidth={2}
         d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
      />
   </svg>
);

export const FatIcon = ({ className = "w-4 h-4" }: IconProps) => (
   <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
         strokeLinecap="round"
         strokeLinejoin="round"
         strokeWidth={2}
         d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
      />
   </svg>
);

export const SugarIcon = ({ className = "w-4 h-4" }: IconProps) => (
   <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
         strokeLinecap="round"
         strokeLinejoin="round"
         strokeWidth={2}
         d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
   </svg>
);
