import { Link } from 'react-router-dom';
import { useAppSelector } from '../../../hooks/hook';
import { useLanguage } from '../../../contexts/LanguageContext';
import { Button } from '../../../components/ui/button';

import { getLocalizedPath } from '../../../lib/getLocalizedPath';

import { VerifiedProfile } from '@/assets';
import Fastprocedures from './Fastprocedures';

export const Sidebar = () => {
  const { t, language, isRTL } = useLanguage();
  const { user } = useAppSelector((state) => state.auth);

  if (!user) return null;
  console.log('user', user);
  return (
    <div className="hidden md:flex flex-col gap-3 md:sticky md:-top-44">
      <div className="w-full !border-[#E1E1E1] border rounded-[24px] overflow-hidden">
        <div className="relative bg-[#6AB240] h-[80px] w-full rounded-t-[24px]">
          <div
            className={`${isRTL ? 'right-2' : 'left-2'} -bottom-5 absolute bg-white w-[60px] h-[60px] rounded-full`}
          >
            <div className="p-1   w-full h-full">
              <img
                className="relative p-[2px] object-cover  border-[3px] border-[#6AB240] w-full h-full rounded-full"
                src={user?.profilePicture?.url || '/unnamed.jpg'}
                alt="profile"
                 onError={(e) => (e.currentTarget.src = '/unnamed.jpg')}
              />
              {user?.isEmailVerified && <VerifiedProfile className="absolute bottom-0 right-0" />}
            </div>
          </div>
        </div>
        <div className="bg-[#F9F9F9] rounded-b-[24px]">
          <div className="bg-white py-4 px-5 flex flex-col gap-3 border rounded-b-[24px]">
            <h2 className="font-bold text-[20px] text-[#22212C]">{`${user?.firstName} ${user?.lastName}`}</h2>

            <p className="font-normal text-[14px] text-[#22212C]">{user?.bio}</p>
            <div className="flex flex-col gap-2 justify-center items-center">
              <Link to={getLocalizedPath('/profile', language)} className="w-full">
                <Button
                  variant={'outline'}
                  className="h-[43px] font-normal text-[14px] w-full border-[#E1E1E1] border rounded-[20px]"
                >
                  {t.profile.view_profile}
                </Button>
              </Link>
              <Link to={getLocalizedPath('/recipes', language)} className="w-full">
                <Button
                  variant={'outline'}
                  className="h-[43px] font-normal text-[14px] w-full border-[#E1E1E1] border rounded-[20px]"
                >
                  {t.profile.view_recipe}
                </Button>
              </Link>
              {/* <Link to={getLocalizedPath('/nutrition', language)} className="w-full">
                <Button
                  variant={'outline'}
                  className="h-[43px] font-normal text-[14px] w-full border-[#E1E1E1] border rounded-[20px]"
                >
                  {t.profile.View_plans_programs}
                </Button>
              </Link> */}
            </div>
          </div>
          <div className="bg-[#F9F9F9] w-full flex justify-between py-3 px-5  rounded-b-[24px]">
            <div className="flex flex-col gap-1 items-center">
              <h3 className="font-normal text-[10px] text-[#22212C]">{t.profile.followers}</h3>
              <p className="font-bold text-[14px] text-[#22212C]">{user?.followerCount || 0}</p>
            </div>
            <div className="flex flex-col gap-1 items-center">
              <h3 className="font-normal text-[10px] text-[#22212C]">{t.profile.following}</h3>
              <p className="font-bold text-[14px] text-[#22212C]">
                {' '}
                {user?.following?.length || 0}
              </p>
            </div>
            <div className="flex flex-col gap-1 items-center">
              <h3 className="font-normal text-[10px] text-[#22212C]">{t.profile.recipes}</h3>
              <p className="font-bold text-[14px] text-[#22212C]"> {user?.totalRecipe || 0}</p>
            </div>
          </div>
        </div>
      </div>
      <Fastprocedures />
    </div>
  );
};
