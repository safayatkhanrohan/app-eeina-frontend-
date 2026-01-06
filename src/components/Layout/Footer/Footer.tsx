import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";
import FooterWave from "./FooterWave";
import ImgSvg from "./ImgSvg";
import { Facebook, Instagram, TiktokIcon, Xtwetter } from "@/assets";
interface FooterLink {
  title: string;
  path: string;
}
const FooterLinks = ({ links }: { links: FooterLink[] }) => (
  <nav>
    <ul className="space-y-3 ">
      {links.map((link, index) => (
        <li key={index}>
          <Link
            to={link.path}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-white text-sm lg:text-[14px] xl:text-base font-normal"
          >
            {link.title}
          </Link>
        </li>
      ))}
    </ul>
  </nav>
);
export const Footer = () => {
  const { t, isRTL, language } = useLanguage();
  const eeina_com_url = `https://eeina.com/${language == "ar" ? "ar" : "en"}`;
  // Company links data
  const mainLinks = [
    { title: t.footer.Home, path: "/" },
    { title: t.footer.Recipes, path: "/recipes" },
    { title: t.nav.Blog, path: `${eeina_com_url}/blog` },
    { title: t.footer.About, path: `${eeina_com_url}/about` },
    { title: t.footer.privacy_policy, path: "/privacy-policy" },
    { title: t.footer.programs, path: `${eeina_com_url}/nutrition-program` },
    { title: t.nav.planner, path: `/planner` },
    { title: t.nav.Packages, path: `/packages` },
    { title: t.footer.terms_conditions, path: "/Terms_Conditions" },
    { title: t.footer.Profile, path: `/Profile` },
    { title: t.footer.Shop, path: "/lists" },
    { title: t.footer.MyGoals, path: `/goals-dashboard` },
    { title: t.footer.Nutritionist, path: `/nutritionist` },
    { title: t.footer.paymentpolicy, path: `${eeina_com_url}/paymentpolicy` },
    { title: t.footer.Contact, path: `${eeina_com_url}/contact` },
  ];

  const year = new Date().getFullYear();
  return (
    <footer className="overflow-auto relative w-full lg:mt-10 xl:mt-0 xl2:mt-20 bg-primaryColor xl:bg-transparent ">
      <div className="container mx-auto max-w-6xl xl2:max-w-7xl px-3 ">
        <FooterWave />

        <ImgSvg />

        {/* Footer Content */}
        <div className="relative z-10 pt-10 xl:pt-48  flex flex-col-reverse lg:flex-col">
          <Link to={"/"} className="hidden w-[149px] h-[100px] lg:inline-block">
            <img
              src="./eeinaaWhitlogo.png"
              className="w-full h-full object-cover"
              alt="logo"
            />
          </Link>
          <div className="flex ">
            <div className="flex-3 flex flex-col-reverse w-full lg:grid grid-cols-12 gap-6">
              <div className="col-span-12 lg:col-span-4">
                <div className="mb-10 lg:mb-0 flex flex-row lg:flex-col gap-5 items-center lg:items-start justify-between">
                  <p className="hidden lg:block flex-1 text-white text-xs sm:text-sm font-normal !leading-6">
                    {t.footer.copyright.replace("{{year}}", year.toString())}
                  </p>
                  <Link
                    to={"/"}
                    className="flex-1 max-w-[66px] h-[50px] sm:max-w-[80px] sm:h-[70px] lg:w-[149px] lg:h-[100px] block lg:hidden"
                  >
                    <img
                      src="./eeinaaWhitlogo.png"
                      className="w-full h-full object-cover"
                      alt="logo"
                    />
                  </Link>
                  {/* social media  */}

                  <div className="flex-1 flex gap-5 justify-end items-center">
                    <a
                      href="https://facebook.com/eeina_life"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Facebook className="w-10 h-10" />
                    </a>
                    <a
                      href="https://x.com/eeina_life"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="w-10 h-10 flex justify-center items-center border border-white rounded-full  bg-[#61A23C]">
                        <Xtwetter className="text-white w-5" />
                      </div>
                    </a>
                    <a
                      href="https://www.tiktok.com/@eeina_life"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="w-10 h-10 flex justify-center items-center border border-white rounded-full bg-[#61A23C]">
                        <TiktokIcon className="text-white w-5" />
                      </div>
                    </a>

                    <a
                      href="https://instagram.com/eeina_life"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Instagram className="w-10 h-10" />
                    </a>
                  </div>
                </div>
              </div>

              <div className="col-span-12 lg:col-span-4 xl2:col-span-4 ">
                <div className="col-span-12 lg:col-span-8">
                  <div className="grid  grid-cols-3 gap-5">
                    {Array.from(
                      { length: Math.ceil(mainLinks.length / 5) },
                      (_, colIndex) => {
                        const start = colIndex * 5;
                        const end = start + 5;
                        const columnLinks = mainLinks.slice(start, end);

                        return (
                          <div key={colIndex} className="flex flex-col gap-2">
                            <FooterLinks links={columnLinks} />
                          </div>
                        );
                      }
                    )}
                  </div>
                </div>
              </div>
              <div className="flex-1 hidden lg:flex flex-col gap-5 text-white col-span-12 lg:col-span-4  xl2:col-span-4 -mt-5">
                <p className="-mt-4 text-[14px] xl:text-[16px]/7 font-normal">
                  {t.footer.exclusiveoffers}
                </p>

                <div className="h-[62x] flex items-center bg-white rounded-xl overflow-hidden">
                  <input
                    type="email"
                    placeholder={t.footer.EmailAddress}
                    className="px-4 w-full text-[#8A8A8A] outline-none"
                  />
                  <button
                    className=" shadow-button !bg-primaryColor text-white! m-2 rounded-lg 
                text-[14px] font-medium w-30 px-3 py-3"
                  >
                    {t.footer.Subscribe}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr className="hidden lg:block relative w-[85%] mx-auto z-10 border-white my-8" />

        <div className="flex flex-col pb-5 items-center justify-center">
          <p className="relative z-10 text-start text-sm opacity-90 text-white">
            {t.footer.reservRights.replace("{{year}}", year.toString())}
          </p>
        </div>
      </div>
    </footer>
  );
};
