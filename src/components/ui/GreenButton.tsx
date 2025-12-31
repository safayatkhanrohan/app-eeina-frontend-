
type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  className?: string;
};

const GreenButton: React.FC<Props> = ({ children, className = '', ...props }) => {
  return (
    <button
      className={` bg-[#87B740] text-white rounded-lg
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};

export default GreenButton;
