import { Card } from "@/components/ui/card";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

interface CollapsibleProfileSectionProps {
  title: string;
  icon: React.ReactNode;
  iconBgColor: string;
  iconColor: string;
  children: React.ReactNode;
}

export function CollapsibleProfileSection({
  title,
  icon,
  iconBgColor,
  iconColor,
  children,
}: CollapsibleProfileSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleSection = () => setIsExpanded((prev) => !prev);

  return (
    <Card className="overflow-hidden">
      <button
        onClick={toggleSection}
        type="button"
        className="w-full p-6 flex items-center justify-between hover:bg-slate-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full ${iconBgColor} flex items-center justify-center`}>
            <div className={iconColor}>{icon}</div>
          </div>
          <h3 className="text-lg font-bold text-slate-800">{title}</h3>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-slate-600" />
        ) : (
          <ChevronDown className="w-5 h-5 text-slate-600" />
        )}
      </button>

      {isExpanded && (
        <div className="px-6 pb-6 pt-0 flex flex-col gap-3 animate-fade-in">
          {children}
        </div>
      )}
    </Card>
  );
}
