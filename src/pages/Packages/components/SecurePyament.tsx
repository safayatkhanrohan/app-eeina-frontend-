import LockLamin from '@/components/icons/LockLamin';
import Wallet from '@/components/icons/Wallet';
import SunGlasses from '@/components/icons/Sunglasses';
import Lock from '@/components/icons/Lock';
import { Card } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

const SecurePayments = () => {
  const { t } = useLanguage();
  const features = [
    {
      icon: <LockLamin />,
      title: t.Package.EncryptedTransactions,
      desc: t.Package.EncryptedTransactionsinfo,
    },
    {
      icon: <Wallet />,
      title: t.Package.TrustedPaymentPartners,
      desc: t.Package.TrustedPaymentPartnersinfo,
    },
    {
      icon: <SunGlasses />,
      title: t.Package.PrivacyProtection,
      desc: t.Package.PrivacyProtectioninfo,
    },
  ];
  return (
    <div className="pt-0 lg:pt-16 flex flex-col justify-center items-center gap-3">
      <div className="border rounded-xl shadow shadow-[#F2F2F4] border-[#F2F2F4] flex justify-between items-center gap-2 py-3 px-5">
        <Lock />
        <span className="flex-1 text-base font-medium text-[#6AB240]">
          {t.Package.dataandpayments}
        </span>
      </div>
      <h1 className="text-center text-[#242424] text-[20px] xl:text-[36px] xl2:text-[44px]!  font-semibold">
        {t.Package.dataandpaymentstitle}
      </h1>
      <p className="text-center text-[#878787]  text-[16px] xl:text-[20px] xl2:text-[24px]! font-normal">
        {t.Package.dataandpaymentsdusc}
      </p>

      <div className="flex flex-col md:flex-row gap-5 my-5">
        {features.map((feature, i) => (
          <Card
            key={i}
            className="p-5 border border-[#F5F5F5] shadow-xl shadow-[#C2C2C217] flex flex-col justify-center items-center gap-5"
          >
            <span className="bg-[#6AB240] p-2 rounded-[10px] shadow-lg shadow-[#80808017]">
              {feature.icon}
            </span>
            <div className="flex flex-col justify-center items-center gap-3">
              <h3 className="text-center text-[20px] font-semibold text-[#242424]">
                {' '}
                {feature.title}
              </h3>
              <p className="text-center font-normal text-base text-[#606060]"> {feature.desc}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SecurePayments;
