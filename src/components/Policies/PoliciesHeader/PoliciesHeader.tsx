
interface PageHeaderProps {
  icon: JSX.Element;
  title: string;
  extraInfo?:string;
  subtitle: string;
  lastUpdated: string;
}
export const PoliciesHeader = ({ icon, title,extraInfo, subtitle, lastUpdated }: PageHeaderProps): JSX.Element => {
  
  return (
    <div className="mb-8  mt-5 sm:mt-0">
             <div className="flex items-center gap-3 mb-4">
               {icon}
               <h1 className="text-[20px] md:text-3xl lg:text-4xl font-bold text-gray-900 whitespace-pre-line">
                
                 {title}
                 </h1>
                
             </div>
               {extraInfo && (
                    <p className="text-gray-600 py-2 text-base sm:text-xl whitespace-pre-line">
                    {extraInfo}
                    </p>
                )}
             <p className="text-gray-600 ">
                {lastUpdated}
                </p>
             <p className="text-gray-600 py-4 text-base sm:text-xl whitespace-pre-line">
           
             {subtitle}
              </p>
    </div>
  )
}

