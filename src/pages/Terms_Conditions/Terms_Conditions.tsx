import {
  AlertTriangle,
  Ban,
  CheckCircle,
  Edit2,
  FileText,
  FileTextIcon,
  Globe,
  Globe2,
  LogOut,
  Scale,
  Shield,
  User,
} from 'lucide-react';
import { PoliciesHeader } from '../../components/Policies/PoliciesHeader';
import { useLanguage } from '../../contexts/LanguageContext';
import { PoliciesCard } from '../../components/Policies/PoliciesCard';
import { PolicyCardItem } from '../../components/Policies/PoliciesCard/PoliciesCard';
import { PoliciesContact } from '../../components/Policies/PoliciesContact';

export const Terms_Conditions = (): JSX.Element => {
  const { t, language } = useLanguage();
  const Terms_Condition: PolicyCardItem[] = [
    {
      icon: <CheckCircle />,
      title: `${t.Terms_Conditions.Acceptance_Terms}`,
      subtitle: `${t.Terms_Conditions.Acceptance_Terms_info}`,
    },
    {
      icon: <Globe />,
      title: `${t.Terms_Conditions.Description_Service}`,
      subtitle: `${t.Terms_Conditions.Description_Service_info}`,
    },
    {
      icon: <User />,
      title: `${t.Terms_Conditions.User_Account}`,
      bullets: [
        `${t.Terms_Conditions.Eligibility}`,
        `${t.Terms_Conditions.Account_Security}`,
        `${t.Terms_Conditions.Accuracy_Information}`,
      ],
    },
    {
      icon: <FileTextIcon />,
      title: `${t.Terms_Conditions.User_Generated_Content}`,
      bullets: [
        `${t.Terms_Conditions.Ownership}`,
        `${t.Terms_Conditions.License_Grant_Company}`,
        `${t.Terms_Conditions.Content_Responsibility}`,
      ],
    },
    {
      icon: <Ban />,
      title: `${t.Terms_Conditions.Prohibited_Conduct}`,
      subtitle: `${t.Terms_Conditions.Prohibited_ConductInfo}`,
      bullets: [
        `${t.Terms_Conditions.Violation_Sharia}`,
        `${t.Terms_Conditions.Violation_Law_Morals}`,
        `${t.Terms_Conditions.Defamation_HateSpeech}`,
        `${t.Terms_Conditions.Infringement_IP}`,
        `${t.Terms_Conditions.Malware_Viruses}`,
        `${t.Terms_Conditions.Unauthorized_DataCollection}`,
      ],
      extraInfo: `${t.Terms_Conditions.Enforcement_Action}`,
    },
    {
      icon: <Shield />,
      title: `${t.Terms_Conditions.Data_Protection}`,
      subtitle: `${t.Terms_Conditions.Data_Protection_info}`,
    },
    {
      icon: <FileText />,
      title: `${t.Terms_Conditions.Company_IP}`,
      subtitle: `${t.Terms_Conditions.Company_IP_info}`,
    },
    {
      icon: <LogOut />,
      title: `${t.Terms_Conditions.Termination}`,
      subtitle: `${t.Terms_Conditions.Termination_info}`,
    },
    {
      icon: <AlertTriangle />,
      title: `${t.Terms_Conditions.Disclaimer_Liability}`,
      subtitle: `${t.Terms_Conditions.Disclaimer_Liability_info}`,
    },
    {
      icon: <Scale />,
      title: `${t.Terms_Conditions.Governing_Law}`,
      subtitle: `${t.Terms_Conditions.Governing_Law_info}`,
    },
    {
      icon: <Globe2 />,
      title: `${t.Terms_Conditions.Terms_Language}`,
      subtitle: `${t.Terms_Conditions.Terms_Language_info}`,
    },
    {
      icon: <Edit2 />,
      title: `${t.Terms_Conditions.Terms_Modification}`,
      subtitle: `${t.Terms_Conditions.Terms_Modification_info}`,
    },
  ];
  return (
    <div className="min-h-screen">
      <div className="max-w-5xl mx-auto px-6 py-8 mb-[2rem] md:mb-[4rem] lg:mb-0">
        <PoliciesHeader
          icon={<FileText className="w-8 h-8 text-primaryColor" />}
          title={t.Terms_Conditions.Terms_Conditions}
          extraInfo={t.Terms_Conditions.Terms_Conditions_gov}
          subtitle={t.Terms_Conditions.Terms_subTitle}
          lastUpdated={
            language === 'ar' ? 'آخر تحديث: 4 سبتمبر 2025' : 'Last Updated: September 4, 2025'
          }
        />
        <div className="space-y-8">
          {Terms_Condition.map((item, index) => (
            <PoliciesCard
              key={index}
              icon={item.icon}
              title={item.title}
              subtitle={item.subtitle}
              bullets={item.bullets}
              extraInfo={item.extraInfo}
            />
          ))}
        </div>
        <PoliciesContact
          title={t.Terms_Conditions.Contact_Information}
          subtitle={t.Terms_Conditions.Contact_Information_dusc}
          email={t.Terms_Conditions.contactEmail}
          bg_color="bg-[#ececec]"
        />
      </div>
    </div>
  );
};
