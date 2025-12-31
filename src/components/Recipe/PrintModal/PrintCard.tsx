import React from "react";

interface PrintCardProps {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

const PrintCard: React.FC<PrintCardProps> = ({ title, icon, children }) => {
  return (
    <div className="bg-white rounded-xl p-6 my-6 shadow-sm">
      <h2 className="text-2xl text-[#558B2F] mb-4 flex items-center gap-2 font-semibold">
        {icon} {title}
      </h2>
      <div>{children}</div>
    </div>
  );
};

export default PrintCard;
