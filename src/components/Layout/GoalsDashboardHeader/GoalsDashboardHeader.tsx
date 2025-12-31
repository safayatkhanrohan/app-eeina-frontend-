import { Bell, Chevrondown, Message, Search } from '@/assets';
import { useLanguage } from '@/contexts/LanguageContext';
import { getLocalizedPath } from '@/lib/getLocalizedPath';
import { Link } from 'react-router-dom';

const GoalsDashboardHeader: React.FC = () => {
  const {isRTL, language } = useLanguage();
  return (
    <header className="flex items-center h-20 bg-white border-b border-gray-200">
      <div
        className={`flex items-center justify-center h-full w-[100px] flex-shrink-0 border-r border-gray-200`}
      >
        <Link to={getLocalizedPath('/', language)} className="w-[66px] h-[50px] flex-shrink-0">
          <img src="/EEINA_BBg-01.png" className="w-full h-full object-contain" alt="logo" />
        </Link>
      </div>

      <div className="flex justify-between items-center gap-8 flex-1 h-full px-6">
        <div className="flex-2 relative flex items-center flex-1">
          <Search className={`absolute w-5 h-5 ${isRTL?"mr-3":"ml-3"} text-gray-400`} />
          <input
            type="text"
            placeholder={language=="ar"?"بحث":"Search"}
            className={`border-[#EAEAEA] border w-full text-[14px] py-2 pl-10 ${isRTL?"pr-10":"pr-4"} text-[#A3A3A3] bg-[#FCFCFC] h-[51px]  rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500`}
          />
        </div>

        <div className=" flex  items-center space-x-3">
          <div className="w-[48px] h-[48px] rounded-[9px] bg-[#D9D9D9]">
            <img src="/unnamed.jpg" alt="user" className="w-full h-full object-cover" />
          </div>
          <div className="text-right">
            <p className="text-[16px] font-medium text-[#000000]">Folqqh Brillanti</p>
            <p className="text-[14px] text-[#999999] font-medium">abcs@gmail.com</p>
          </div>

          <Chevrondown className={`w-6 h-6 cursor-pointer ${isRTL?"border-l":"border-r"} border-[#EAEAEA] ${isRTL?"ml-3":"mr-3"}`} />
          <div className="flex gap-5">
            <Bell className="w-6 h-6 cursor-pointer " />
            <Message className="w-6 h-6 cursor-pointer text-[#79869F]" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default GoalsDashboardHeader;
