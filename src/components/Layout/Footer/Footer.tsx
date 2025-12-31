import { useLanguage } from '@/contexts/LanguageContext';
import { Separator } from '@/components/ui/separator';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, TiktokIcon, Xtwetter } from '@/assets';
interface FooterLink {
  title: string;
  path: string;
}
const FooterLinks = ({ links }: { links: FooterLink[] }) => (
  <nav>
    <ul className="space-y-3 sm:space-y-4">
      {links.map((link, index) => (
        <li key={index}>
          <Link
            to={link.path}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-white text-sm sm:text-base font-normal"
          >
            {link.title}
          </Link>
        </li>
      ))}
    </ul>
  </nav>
);
export const Footer = () => {
  const { t, isRTL,language } = useLanguage();
  const eeina_com_url =`https://eeina.com/${language=="ar"?"ar":"en"}`
  // Company links data
  const mainLinks = [
    { title: t.footer.Home, path: '/' },
    { title: t.footer.Recipes, path: '/recipes' },
    { title: t.footer.terms_conditions, path: '/Terms_Conditions' },
    { title: t.footer.paymentpolicy, path: `${eeina_com_url}/paymentpolicy` },
  ];

  // Help links data
  const helpLinks = [
    { title: t.footer.Shop, path: '/lists' },
    { title: t.footer.About, path: `${eeina_com_url}/about` },
    { title: t.footer.Contact, path: `${eeina_com_url}/contact` },
    { title: t.footer.privacy_policy, path: '/privacy-policy' },
  ];
const year = new Date().getFullYear();
  return (
    <footer className={`mb-10 lg:mb-0  w-full bg-[#87B740]  py-10 z-40  ${isRTL ? 'rtl' : 'ltr'}`}>
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl xl2:max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 items-start">
          {/* Logo and description */}
          <div className="col-span-2 md:col-span-2">
            <img
              className="w-[140px] h-[100px] md:w-[190px] md:h-[142px] object-cover"
              alt="EEINA Logo"
              src="/EEINA_GBg_RGB-01-removebg-preview.png"
            />
          </div>

          {/* mainLinks */}
          <div className="col-span-1">
            <FooterLinks links={mainLinks} />
          </div>
          <div className="col-span-1">
            <FooterLinks links={helpLinks} />
          </div>
        </div>

        {/* Divider */}
        <Separator className="my-5 bg-white/20" />

        {/* Copyright */}
        <div className="flex flex-col md:flex-row gap-5 items-start justify-between md:items-center ">
          <p className="flex-1 text-white text-xs sm:text-sm font-normal !leading-6">{t.footer.copyright.replace('{{year}}', year.toString())}</p>
          {/* social media  */}
          <div className="flex-1 flex gap-5 md:justify-end">
            <a href="https://facebook.com/eeina_life" target="_blank" rel="noopener noreferrer">
              <Facebook className="w-10 h-10" />
            </a>
            <a href="https://x.com/eeina_life" target="_blank" rel="noopener noreferrer">
              <div className="w-10 h-10 flex justify-center items-center border border-white rounded-full  bg-[#61A23C]">
                <Xtwetter className="text-white w-5" />
              </div>
            </a>
            <a href="https://www.tiktok.com/@eeina_life" target="_blank" rel="noopener noreferrer">
              <div className="w-10 h-10 flex justify-center items-center border border-white rounded-full bg-[#61A23C]">
                <TiktokIcon className="text-white w-5" />
              </div>
            </a>

            <a href="https://instagram.com/eeina_life" target="_blank" rel="noopener noreferrer">
              <Instagram className="w-10 h-10" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
