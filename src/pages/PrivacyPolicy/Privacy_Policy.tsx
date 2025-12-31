import { AlertCircle, Database, Eye, Globe, Lock, Shield, UserCheck } from 'lucide-react';

import { PoliciesCard } from '../../components/Policies/PoliciesCard';
import { useLanguage } from '../../contexts/LanguageContext';
import { PoliciesHeader } from '../../components/Policies/PoliciesHeader';
import { PolicyCardItem } from '../../components/Policies/PoliciesCard/PoliciesCard';
import { PoliciesContact } from '../../components/Policies/PoliciesContact';

export const Privacy_Policy = (): JSX.Element => {
  const { t, language } = useLanguage();
  const Privacy_Policy: PolicyCardItem[] = [
    {
      title: `${t.privacy_policy.ScopeofApplication}`,
      subtitle: `${t.privacy_policy.ScopeofApplicationTitle}`,
    },
    {
      icon: <Eye />,
      title: `${t.privacy_policy.individualscoveredbypolicy}`,
      SecTitle: `1. ${t.privacy_policy.individualscoveredbypolicytitle}`,
      subtitle: `${t.privacy_policy.individualscoveredbypolicySubtitle}`,
      bullets: [
        {
          items: [
            `${t.privacy_policy.coveredbypolicy_1}`,
            `${t.privacy_policy.coveredbypolicy_2}`,
            `${t.privacy_policy.coveredbypolicy_3}`,
          ],
        },
        {
          section: `${t.privacy_policy.coveredbypolicy_bullet2}`,
          items: [`${t.privacy_policy.coveredbypolicy_bullet2_Info} `],
        },
      ],
    },
    {
      icon: <Database />,
      title: `${t.privacy_policy.Datacollect}`,
      subtitle: `${t.privacy_policy.Datacollectinfo}`,
      bullets: [
        {
          section: `${t.privacy_policy.personalInfo}`,
          text: `${t.privacy_policy.personalInfoTitle}`,
          items: [
            `${t.privacy_policy.personalInfo_Bullet_1} `,
            `${t.privacy_policy.personalInfo_Bullet_2} `,
            `${t.privacy_policy.personalInfo_Bullet_3} `,
            `${t.privacy_policy.personalInfo_Bullet_4} `,
            `${t.privacy_policy.personalInfo_Bullet_5} `,
            `${t.privacy_policy.personalInfo_Bullet_6} `,
            `${t.privacy_policy.personalInfo_Bullet_7} `,
            `${t.privacy_policy.personalInfo_Bullet_8} `,
            `${t.privacy_policy.personalInfo_Bullet_9} `,
            `${t.privacy_policy.personalInfo_Bullet_10} `,
          ],
        },
        {
          section: `${t.privacy_policy.Authenticationdata}`,
          text: `${t.privacy_policy.AuthenticationdataInfo}`,
          items: [
            `${t.privacy_policy.Authenticationdata_bullet_1} `,
            `${t.privacy_policy.Authenticationdata_bullet_2} `,
            `${t.privacy_policy.Authenticationdata_bullet_3} `,
            `${t.privacy_policy.Authenticationdata_bullet_4} `,
            `${t.privacy_policy.Authenticationdata_bullet_5} `,
            `${t.privacy_policy.Authenticationdata_bullet_6} `,
            `${t.privacy_policy.Authenticationdata_bullet_7} `,
            `${t.privacy_policy.Authenticationdata_bullet_8} `,
            `${t.privacy_policy.Authenticationdata_bullet_9} `,
            `${t.privacy_policy.Authenticationdata_bullet_10} `,
            `${t.privacy_policy.Authenticationdata_bullet_11} `,
            `${t.privacy_policy.Authenticationdata_bullet_12} `,
            `${t.privacy_policy.Authenticationdata_bullet_13} `,
          ],
        },
        {
          section: `${t.privacy_policy.Profiledata}`,
          text: `${t.privacy_policy.ProfiledataInfo}`,
          items: [
            `${t.privacy_policy.ProfiledataBullet_1} `,
            `${t.privacy_policy.ProfiledataBullet_2} `,
            `${t.privacy_policy.ProfiledataBullet_3} `,
          ],
        },
        {
          section: `${t.privacy_policy.Foodpreferences}`,
          text: `${t.privacy_policy.FoodpreferencesInfo}`,
        },
        {
          section: `${t.privacy_policy.Usagedata}`,
          text: `${t.privacy_policy.Usagedatainfo}`,
        },
        {
          section: `${t.privacy_policy.Geographicallocation}`,
          text: `${t.privacy_policy.GeographicallocationInfo}`,
        },
        {
          section: `${t.privacy_policy.Contactdata}`,
          text: `${t.privacy_policy.Contactdatainfo}`,
        },
        {
          section: `${t.privacy_policy.Grocerydata}`,
          text: `${t.privacy_policy.Grocerydatainfo}`,
        },
        {
          section: `${t.privacy_policy.Healthdata}`,
          text: `${t.privacy_policy.Healthdatainfo}`,
        },
        {
          section: `${t.privacy_policy.Thirdpartyaccountdata}`,
          text: `${t.privacy_policy.Thirdpartyaccountdatainfo}`,
        },
        {
          section: `${t.privacy_policy.RewardsTransactionData}`,
          text: `${t.privacy_policy.RewardsTransactionDatainfo}`,
          items: [
            `${t.privacy_policy.RewardsTransactionData_bullet_1}`,
            `${t.privacy_policy.RewardsTransactionData_bullet_2}`,
            `${t.privacy_policy.RewardsTransactionData_bullet_3}`,
            `${t.privacy_policy.RewardsTransactionData_bullet_4}`,
          ],
        },
        {
          section: `${t.privacy_policy.PromotionalOffersData}`,
          text: `${t.privacy_policy.PromotionalOffersDatainfo}`,
          items: [
            `${t.privacy_policy.PromotionalOffersData_bullet_1}`,
            `${t.privacy_policy.PromotionalOffersData_bullet_2}`,
            `${t.privacy_policy.PromotionalOffersData_bullet_3}`,
          ],
        },
        {
          section: `${t.privacy_policy.collectdata}`,
          text: `${t.privacy_policy.collectdatainfo}`,
        },
        {
          section: `${t.privacy_policy.usedata}`,
          text: `${t.privacy_policy.usedatainfo}`,
          items: [
            `${t.privacy_policy.usedatainfoBullet_1}`,
            `${t.privacy_policy.usedatainfoBullet_2}`,
            `${t.privacy_policy.usedatainfoBullet_3}`,
            `${t.privacy_policy.usedatainfoBullet_4}`,
            `${t.privacy_policy.usedatainfoBullet_5}`,
            `${t.privacy_policy.usedatainfoBullet_6}`,
            `${t.privacy_policy.usedatainfoBullet_7}`,
            `${t.privacy_policy.usedatainfoBullet_8}`,
            `${t.privacy_policy.usedatainfoBullet_9}`,
            `${t.privacy_policy.usedatainfoBullet_10}`,
            `${t.privacy_policy.usedatainfoBullet_11}`,
            `${t.privacy_policy.usedatainfoBullet_12}`,
            `${t.privacy_policy.usedatainfoBullet_13}`,
          ],
        },
      ],
      tableTitle: `${t.privacy_policy.Moredetailedinformation}`,
      tableHeaders: [
        `${t.privacy_policy.Categoriespersonaldataused}`,
        `${t.privacy_policy.Purposeprocessing}`,
      ],
      extraInfo: [
        {
          label: `${t.privacy_policy.Categoriespersonaldataused_1}`,
          value: `${t.privacy_policy.Purposeprocessing_1}`,
        },
        {
          label: `${t.privacy_policy.Categoriespersonaldataused_2}`,
          value: `${t.privacy_policy.Purposeprocessing_2}`,
        },
        {
          label: `${t.privacy_policy.Categoriespersonaldataused_3}`,
          value: `${t.privacy_policy.Purposeprocessing_3}`,
        },
        {
          label: `${t.privacy_policy.Categoriespersonaldataused_4}`,
          value: `${t.privacy_policy.Purposeprocessing_4}`,
        },
        {
          label: `${t.privacy_policy.Categoriespersonaldataused_5}`,
          value: `${t.privacy_policy.Purposeprocessing_5}`,
        },
        {
          label: `${t.privacy_policy.Categoriespersonaldataused_6}`,
          value: `${t.privacy_policy.Purposeprocessing_6}`,
        },
        {
          label: `${t.privacy_policy.Categoriespersonaldataused_7}`,
          value: `${t.privacy_policy.Purposeprocessing_7}`,
        },
      ],
    },
    {
      icon: <Eye />,
      title: `${t.privacy_policy.Processingartificialintelligence}`,
      subtitle: `${t.privacy_policy.ProcessingartificialintelligenceInfo}`,
      bullets: [
        `${t.privacy_policy.Processingartificialintelligencebullet_1}`,
        `${t.privacy_policy.Processingartificialintelligencebullet_2}`,
        `${t.privacy_policy.Processingartificialintelligencebullet_3}`,
        `${t.privacy_policy.Processingartificialintelligencebullet_4}`,
        `${t.privacy_policy.Processingartificialintelligencebullet_5}`,
        `${t.privacy_policy.Processingartificialintelligencebullet_6}`,
        `${t.privacy_policy.Processingartificialintelligencebullet_7}`,
        `${t.privacy_policy.Processingartificialintelligencebullet_8}`,
        `${t.privacy_policy.Processingartificialintelligencebullet_9}`,
        `${t.privacy_policy.Processingartificialintelligencebullet_10}`,
        `${t.privacy_policy.Processingartificialintelligencebullet_11}`,
        `${t.privacy_policy.Processingartificialintelligencebullet_12}`,
        `${t.privacy_policy.Processingartificialintelligencebullet_13}`,
        `${t.privacy_policy.Processingartificialintelligencebullet_14}`,
        `${t.privacy_policy.Processingartificialintelligencebullet_15}`,
        `${t.privacy_policy.Processingartificialintelligencebullet_16}`,
        `${t.privacy_policy.Processingartificialintelligencebullet_17}`,
        `${t.privacy_policy.Processingartificialintelligencebullet_18}`,
        `${t.privacy_policy.Processingartificialintelligencebullet_19}`,
        `${t.privacy_policy.Processingartificialintelligencebullet_20}`,
      ],
    },
    {
      icon: <Shield />,
      title: `${t.privacy_policy.personaldatatransferred}`,
      subtitle: `${t.privacy_policy.personaldatatransferredinfo}`,
    },
    {
      icon: <UserCheck />,
      title: `${t.privacy_policy.protectpersonaldata}`,
      subtitle: `${t.privacy_policy.protectpersonaldatainfo}`,
      bullets: [
        `${t.privacy_policy.protectpersonaldatabullet_1}`,
        `${t.privacy_policy.protectpersonaldatabullet_2}`,
        `${t.privacy_policy.protectpersonaldatabullet_3}`,
        `${t.privacy_policy.protectpersonaldatabullet_4}`,
        `${t.privacy_policy.protectpersonaldatabullet_5}`,
        `${t.privacy_policy.protectpersonaldatabullet_6}`,
        `${t.privacy_policy.protectpersonaldatabullet_7}`,
        `${t.privacy_policy.protectpersonaldatabullet_8}`,
        `${t.privacy_policy.protectpersonaldatabullet_9}`,
        `${t.privacy_policy.protectpersonaldatabullet_10}`,
      ],
    },
    {
      icon: <Globe />,
      title: `${t.privacy_policy.ChangesPolicy}`,
      subtitle: `${t.privacy_policy.ChangesPolicyInfo}`,
    },
    {
      icon: <Globe />,
      title: `${t.privacy_policy.linksWeb}`,
      subtitle: `${t.privacy_policy.linksWebinfo}`,
    },
    {
      icon: <AlertCircle />,
      title: `${t.privacy_policy.ComplianceSupplement}`,
      subtitle: `${t.privacy_policy.ComplianceSupplementinfo}`,
      bullets: [
        `${t.privacy_policy.ComplianceSupplement_bullet_1}`,
        `${t.privacy_policy.ComplianceSupplement_bullet_2}`,
        `${t.privacy_policy.ComplianceSupplement_bullet_3}`,
        `${t.privacy_policy.ComplianceSupplement_bullet_4}`,
        `${t.privacy_policy.ComplianceSupplement_bullet_5}`,
        `${t.privacy_policy.ComplianceSupplement_bullet_6}`,
        `${t.privacy_policy.ComplianceSupplement_bullet_7}`,
        `${t.privacy_policy.ComplianceSupplement_bullet_8}`,
        `${t.privacy_policy.ComplianceSupplement_bullet_9}`,
        `${t.privacy_policy.ComplianceSupplement_bullet_10}`,
        `${t.privacy_policy.ComplianceSupplement_bullet_11}`,
        `${t.privacy_policy.ComplianceSupplement_bullet_12}`,
        `${t.privacy_policy.ComplianceSupplement_bullet_13}`,
        `${t.privacy_policy.ComplianceSupplement_bullet_14}`,
        `${t.privacy_policy.ComplianceSupplement_bullet_15}`,
        `${t.privacy_policy.ComplianceSupplement_bullet_16}`,
        `${t.privacy_policy.ComplianceSupplement_bullet_17}`,
        `${t.privacy_policy.ComplianceSupplement_bullet_18}`,
        `${t.privacy_policy.ComplianceSupplement_bullet_19}`,
      ],
    },
    {
      icon: <AlertCircle />,
      title: `${t.privacy_policy.Enforcement_Implementation}`,
      subtitle: `${t.privacy_policy.Enforcement_Implementationinfo}`,
    },
    {
      icon: <AlertCircle />,
      title: `${t.privacy_policy.personalInformation}`,
      subtitle: `${t.privacy_policy.personalInformationSubtitle}`,
    },
    {
      icon: <AlertCircle />,
      title: `${t.privacy_policy.personalInformationsource}`,
      subtitle: `${t.privacy_policy.personalInformationsourceinfo}`,
    },
    {
      icon: <AlertCircle />,
      title: `${t.privacy_policy.Disclosurepersonalinformation}`,
      subtitle: `${t.privacy_policy.Disclosurepersonalinformationinfo}`,
      tableHeaders: [
        `${t.privacy_policy.CategoriesofBeneficiariesorRecipients}`,
        `${t.privacy_policy.PersonalInformationCategory}`,
      ],
      extraInfo: [
        {
          label: `${t.privacy_policy.CategoriesofBeneficiariesorRecipients_1}`,
          value: `${t.privacy_policy.PersonalInformationCategory_1}`,
        },
        {
          label: `${t.privacy_policy.CategoriesofBeneficiariesorRecipients_2}`,
          value: `${t.privacy_policy.PersonalInformationCategory_2}`,
        },
        {
          label: `${t.privacy_policy.CategoriesofBeneficiariesorRecipients_3}`,
          value: `${t.privacy_policy.PersonalInformationCategory_3}`,
        },
        {
          label: `${t.privacy_policy.CategoriesofBeneficiariesorRecipients_4}`,
          value: `${t.privacy_policy.PersonalInformationCategory_4}`,
        },
        {
          label: `${t.privacy_policy.CategoriesofBeneficiariesorRecipients_5}`,
          value: `${t.privacy_policy.PersonalInformationCategory_5}`,
        },
      ],
      extraTableInfo: `${t.privacy_policy.extraTableInfo}`,
    },
    {
      title: `${t.privacy_policy.Rightsdatasubjects}`,
      subtitle: `${t.privacy_policy.Rightsdatasubjectsinfo}`,
    },
    {
      title: `${t.privacy_policy.submitapplicationsorinquiries}`,
      subtitle: `${t.privacy_policy.submitapplicationsorinquiriesinfo}`,

      bullets: [
        `${t.privacy_policy.submitapplicationsorinquiriesinfo_1}`,
        `${t.privacy_policy.submitapplicationsorinquiriesinfo_2}`,
        `${t.privacy_policy.submitapplicationsorinquiriesinfo_3}`,
        `${t.privacy_policy.submitapplicationsorinquiriesinfo_4}`,
        `${t.privacy_policy.submitapplicationsorinquiriesinfo_5}`,
        `${t.privacy_policy.submitapplicationsorinquiriesinfo_6}`,
      ],
    },
    {
      title: `${t.privacy_policy.trackingnotifications}`,
      subtitle: `${t.privacy_policy.trackingnotificationsinfo}`,
    },
    {
      title: `${t.privacy_policy.EffectiveDateandUpdates}`,
      subtitle: `${t.privacy_policy.EffectiveDateandUpdatesinfo}`,
    },
  ];
  return (
    <div className="min-h-screen">
      <div className="max-w-5xl mx-auto px-6 py-8 mb-[2rem] md:mb-[4rem] lg:mb-0">
        <PoliciesHeader
          icon={<Lock className="w-8 h-8 text-primaryColor" />}
          title={t.footer.privacy_policy}
          subtitle={t.privacy_policy.privacyIntro}
          lastUpdated={
            language === 'ar' ? 'آخر تحديث: 3 سبتمبر 2025' : 'Last Updated: September 3, 2025'
          }
        />
        <div className="space-y-8">
          {Privacy_Policy.map((item, index) => (
            <PoliciesCard
              key={index}
              icon={item.icon}
              title={item.title}
              SecTitle={item.SecTitle}
              subtitle={item.subtitle}
              bullets={item.bullets}
              tableTitle={item.tableTitle}
              extraInfo={item.extraInfo}
              tableHeaders={item.tableHeaders}
              extraTableInfo={item.extraTableInfo}
            />
          ))}
        </div>
        <PoliciesContact
          title={t.privacy_policy.contactUs}
          subtitle={t.privacy_policy.contactinfo}
          email={t.privacy_policy.contactemail}
          info={t.privacy_policy.extraContactInfo}
          bg_color="bg-green-100"
        />
      </div>
    </div>
  );
};

export default Privacy_Policy;
