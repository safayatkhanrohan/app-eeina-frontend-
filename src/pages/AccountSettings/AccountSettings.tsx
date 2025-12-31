import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Separator } from '../../components/ui/separator';
import {
  Settings,
  User,
  Bell,
  Shield,
  Eye,
  Globe,
  Smartphone,
  Mail,
  Lock,
  Trash2,
  Download,
  Upload,
  ChevronRight,
  X,
  ChevronLeft,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDeleteAccountMutation } from '@/redux/Features/User/userApi';
import { toast } from 'sonner';
import { DeleteAccountDialog } from '@/components/ui/DeleteModal';
import { useAppDispatch } from '@/hooks/hook';
import { baseApi } from '@/redux/API/baseApi';
import { getLocalizedPath } from '@/lib/getLocalizedPath';

export const AccountSettings = (): JSX.Element => {
  const { t, isRTL, language } = useLanguage();
  const dispatch = useAppDispatch();

  const [deleteAccount] = useDeleteAccountMutation();
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: false,
    marketing: true,
  });

  const [privacy, setPrivacy] = useState({
    profileVisibility: 'public',
    showEmail: false,
    showFollowers: true,
    allowMessages: true,
  });

  const [showModal, setShowModal] = useState<string | null>(null);
  const [tempPassword, setTempPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');

  const ChevronIcon = isRTL ? ChevronLeft : ChevronRight;
  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const togglePrivacy = (key: keyof typeof privacy) => {
    if (key === 'profileVisibility') return; // Handle separately
    setPrivacy((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handlePasswordChange = () => {
    if (tempPassword !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    if (tempPassword.length < 8) {
      alert('Password must be at least 8 characters long!');
      return;
    }
    console.log('Password changed successfully');
    setShowModal(null);
    setTempPassword('');
    setConfirmPassword('');
    setCurrentPassword('');
  };

  const handleDownloadData = () => {
    console.log('Downloading user data...');
    // Simulate download
    const data = {
      profile: { name: 'Adam Ahmed', email: 'adam@example.com' },
      recipes: ['Recipe 1', 'Recipe 2'],
      activity: ['Activity 1', 'Activity 2'],
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'my-account-data.json';
    a.click();
  };

  const handleImportRecipes = () => {
    console.log('Opening import dialog...');
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json,.csv';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        console.log('Importing recipes from:', file.name);
        // Handle file import logic here
      }
    };
    input.click();
  };

  const handleDeleteAccount = async () => {
    try {
      await deleteAccount().unwrap();
      dispatch(baseApi.util.resetApiState());

      toast.success(t.settings.deleted_successfully);
    } catch (error: any) {
      toast.error(error?.data?.message || t.settings.failed_delete_account);
    }
  };

  const Modal = ({
    title,
    children,
    onClose,
  }: {
    title: string;
    children: React.ReactNode;
    onClose: () => void;
  }) => (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md bg-white shadow-2xl">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">{title}</h3>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
          {children}
        </CardContent>
      </Card>
    </div>
  );
  const settingSections = [
    {
      title: t.settings.account,
      icon: User,
      items: [
        {
          name: t.settings.edit_profile,
          description: t.settings.update_profile_info,
          link: getLocalizedPath('/edit-profile', language),
          icon: User,
        },
        {
          name: t.settings.change_password,
          description: t.settings.update_password_desc,
          action: 'password',
          icon: Lock,
          interactive: true,
        },
        {
          name: t.settings.email_settings,
          description: t.settings.manage_email_pref,
          action: 'email',
          icon: Mail,
          interactive: true,
        },
        {
          name: t.settings.two_factor_auth,
          description: t.settings.secure_account,
          action: '2fa',
          icon: Shield,
          interactive: true,
        },
      ],
    },
    {
      title: t.settings.privacy,
      icon: Shield,
      items: [
        {
          name: t.settings.profile_visibility,
          description: t.settings.control_profile_vis,
          action: 'visibility',
          icon: Eye,
          interactive: true,
        },
        {
          name: t.settings.Data_Privacy,
          description: t.settings.manage_data_pref,
          action: 'data',
          icon: Globe,
          interactive: true,
        },
        {
          name: t.settings.Blocked_Users,
          description: t.settings.manage_blocked,
          action: 'blocked',
          icon: X,
          interactive: true,
        },
      ],
    },
    {
      title: t.settings.notifications,
      icon: Bell,
      items: [
        {
          name: t.settings.push_notifications,
          description: t.settings.mobile_desktop_notif,
          action: 'push',
          icon: Smartphone,
          interactive: true,
        },
        {
          name: t.settings.email_notifications,
          description: t.settings.email_updates_alerts,
          action: 'email-notif',
          icon: Mail,
          interactive: true,
        },
        {
          name: t.settings.marketing_communications,
          description: t.settings.promotional_emails,
          action: 'marketing',
          icon: Globe,
          interactive: true,
        },
      ],
    },
    {
      title: t.settings.data_storage,
      icon: Download,
      items: [
        {
          name: t.settings.download_data,
          description: t.settings.download_account_data,
          action: 'download',
          icon: Download,
          interactive: true,
        },
        {
          name: t.settings.import_recipes,
          description: t.settings.import_recipes_platform,
          action: 'import',
          icon: Upload,
          interactive: true,
        },
        {
          name: t.settings.Storage_Usage,
          description: t.settings.view_storage_usage,
          action: 'storage',
          icon: Globe,
          interactive: true,
        },
      ],
    },
  ];

  const handleItemClick = (action: string) => {
    switch (action) {
      case 'password':
        setShowModal('password');
        break;
      case 'email':
        setShowModal('email');
        break;
      case '2fa':
        setShowModal('2fa');
        break;
      case 'visibility':
        setShowModal('visibility');
        break;
      case 'data':
        setShowModal('data');
        break;
      case 'blocked':
        setShowModal('blocked');
        break;
      case 'download':
        handleDownloadData();
        break;
      case 'import':
        handleImportRecipes();
        break;
      case 'storage':
        setShowModal('storage');
        break;
      default:
        console.log('Action not implemented:', action);
    }
  };
  return (
    <>
      <div className="max-w-6xl xl2:max-w-7xl mx-auto px-6 py-8 mb-[3rem] md:mb-[4rem] lg:mb-0 bg-gray-50">
        {/* Header */}
        <div className=" mt-5 sm:mt-0 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Settings className="w-8 h-8 text-primaryColor" />
            <div>
              <div className="text-sm text-primaryColor font-medium">{t.settings.account}</div>
              <h1 className="text-[20px] md:text-3xl font-bold text-gray-900">
                {t.settings.title}
              </h1>
            </div>
          </div>
          <p className="text-gray-600">{t.settings.manage_account_settings}</p>
        </div>

        <div className="grid grid-cols-12 gap-4 sm:gap-8">
          {/* Main Settings */}
          <div className="col-span-12 lg:col-span-8">
            <div className="space-y-8">
              {settingSections.map((section, sectionIndex) => (
                <Card key={sectionIndex}>
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 bg-primaryColor rounded-full flex items-center justify-center">
                        <section.icon className="w-5 h-5 text-white" />
                      </div>
                      <h2 className="text-xl font-bold text-gray-900">{section.title}</h2>
                    </div>

                    <div className="space-y-4">
                      {section.items.map((item, itemIndex) => (
                        <div key={itemIndex}>
                          {item.link ? (
                            <Link to={item.link}>
                              <div className="flex items-center justify-between p-2 sm:p-4 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                                <div className="flex items-center gap-4">
                                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                                    <item.icon className="w-4 h-4 text-gray-600" />
                                  </div>
                                  <div>
                                    <h3 className="font-semibold text-gray-900">{item.name}</h3>
                                    <p className="text-sm text-gray-600">{item.description}</p>
                                  </div>
                                </div>
                                <ChevronIcon className="w-5 h-5 text-gray-400" />
                              </div>
                            </Link>
                          ) : (
                            <div
                              className="flex items-center justify-between p-2 sm:p-4 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                              onClick={() =>
                                item.interactive && item.action && handleItemClick(item.action)
                              }
                            >
                              <div className="flex items-center gap-4">
                                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                                  <item.icon className="w-4 h-4 text-gray-600" />
                                </div>
                                <div>
                                  <h3 className="font-semibold text-gray-900">{item.name}</h3>
                                  <p className="text-sm text-gray-600">{item.description}</p>
                                </div>
                              </div>

                              {/* Toggle switches for notifications */}
                              {item.action === 'push' && (
                                <div
                                  className={`min-w-[48px] sm:w-12 h-6 rounded-full 
                                    cursor-pointer transition-colors ${
                                      notifications.push ? 'bg-primaryColor' : 'bg-gray-300'
                                    }`}
                                  onClick={() => toggleNotification('push')}
                                >
                                  <div
                                    className={`w-5 h-5 bg-white rounded-full shadow-md
                                   transform transition-transform ${
                                     isRTL
                                       ? notifications.push
                                         ? 'translate-x-[-1.5rem]'
                                         : '-translate-x-1/42'
                                       : notifications.push
                                         ? 'translate-x-6'
                                         : 'translate-x-0.5'
                                   } mt-0.5`}
                                  />
                                </div>
                              )}

                              {item.action === 'email-notif' && (
                                <div
                                  className={`min-w-[48px] sm:w-12 h-6 rounded-full cursor-pointer transition-colors ${
                                    notifications.email ? 'bg-primaryColor' : 'bg-gray-300'
                                  }`}
                                  onClick={() => toggleNotification('email')}
                                >
                                  <div
                                    className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
                                      isRTL
                                        ? notifications.email
                                          ? 'translate-x-[-1.5rem]'
                                          : '-translate-x-1/42'
                                        : notifications.email
                                          ? 'translate-x-6'
                                          : 'translate-x-0.5'
                                    } mt-0.5`}
                                  />
                                </div>
                              )}

                              {item.action === 'marketing' && (
                                <div
                                  className={`min-w-[48px] sm:w-12 h-6 rounded-full cursor-pointer transition-colors ${
                                    notifications.marketing ? 'bg-primaryColor' : 'bg-gray-300'
                                  }`}
                                  onClick={() => toggleNotification('marketing')}
                                >
                                  <div
                                    className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
                                      isRTL
                                        ? notifications.marketing
                                          ? 'translate-x-[-1.5rem]'
                                          : '-translate-x-1/42'
                                        : notifications.marketing
                                          ? 'translate-x-6'
                                          : 'translate-x-0.5'
                                    } mt-0.5`}
                                  />
                                </div>
                              )}

                              {/* Action buttons for other items */}
                              {!item.action?.includes('notif') &&
                                !item.action?.includes('push') &&
                                !item.action?.includes('marketing') && (
                                  <ChevronIcon className="w-5 h-5 text-gray-400" />
                                )}
                            </div>
                          )}

                          {itemIndex < section.items.length - 1 && (
                            <Separator className={`${isRTL ? 'ml-2 sm:ml-16' : 'me-2 sm:me-16'}`} />
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Danger Zone */}
              <Card className="border-red-200">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                      <Trash2 className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="text-xl font-bold text-red-600">{t.settings.danger_zone}</h2>
                  </div>

                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-lg border border-red-200 bg-red-50 gap-2">
                      <div>
                        <h3 className="font-semibold text-red-900">{t.settings.delete_account}</h3>
                        <p className="text-sm text-red-700">
                          {language === 'ar'
                            ? 'حذف حسابك وجميع البيانات نهائياً'
                            : 'Permanently delete your account and all data'}
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        className="border-red-300 text-red-600 hover:bg-red-600 hover:text-white"
                        onClick={() => setOpenConfirmDelete(true)}
                      >
                        {t.settings.delete_account}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="col-span-12 lg:col-span-4">
            <div className="sticky top-24 space-y-6">
              {/* Quick Actions */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    {t.profile.quick_actions}
                  </h3>
                  <div className="space-y-3">
                    <Link to={getLocalizedPath('/edit-profile', language)}>
                      <Button className="w-full bg-primaryColor hover:bg-[#1c9a40] text-white justify-start">
                        <User className="w-4 h-4 mr-2" />
                        {t.settings.edit_profile}
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => setShowModal('password')}
                    >
                      <Lock className="w-4 h-4 mr-2" />
                      {t.settings.change_password}
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={handleDownloadData}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      {t.settings.download_data}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Account Info */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    {language === 'ar' ? 'معلومات الحساب' : 'Account Information'}
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t.profile.member_since}</span>
                      <span className="font-medium">
                        {language === 'ar' ? 'يناير 2023' : 'January 2023'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t.profile.recipes_created}</span>
                      <span className="font-medium">12</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">
                        {language === 'ar' ? 'إجمالي المتابعين' : 'Total followers'}
                      </span>
                      <span className="font-medium">1,247</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t.profile.account_type}</span>
                      <span className="font-medium text-primaryColor">{t.profile.premium}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Help & Support */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    {language === 'ar' ? 'المساعدة والدعم' : 'Help & Support'}
                  </h3>
                  <div className="space-y-3 text-sm text-gray-600">
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-primaryColor rounded-full mt-2 flex-shrink-0" />
                      <p>{t.settings.access_support}</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-primaryColor rounded-full mt-2 flex-shrink-0" />
                      <p>{t.settings.faq_desc}</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-primaryColor rounded-full mt-2 flex-shrink-0" />
                      <p>{t.settings.report_bugs}</p>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full mt-4">
                    {t.settings.contact_support}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showModal === 'password' && (
        <Modal title={t.settings.change_password} onClose={() => setShowModal(null)}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.settings.Current_Password}
              </label>
              <Input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder={
                  language == 'ar' ? 'أدخل كلمة المرور الحالية' : 'Enter current password'
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.settings.New_Password}
              </label>
              <Input
                type="password"
                value={tempPassword}
                onChange={(e) => setTempPassword(e.target.value)}
                placeholder={language == 'ar' ? 'أدخل كلمة المرور الجديدة' : 'Enter New password'}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.settings.Confirm_Password}
              </label>
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder={t.settings.Confirm_Password}
              />
            </div>
            <div className="flex gap-3 pt-4">
              <Button
                onClick={handlePasswordChange}
                className="flex-1 bg-primaryColor hover:bg-[#1c9a40] text-white"
              >
                {t.settings.Update_Password}
              </Button>
              <Button variant="outline" onClick={() => setShowModal(null)} className="flex-1">
                {t.common.cancel}
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {showModal === 'email' && (
        <Modal title={t.settings.email_settings} onClose={() => setShowModal(null)}>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="font-medium">{t.settings.Recipe_notifications}</span>
              <div
                className={`w-12 h-6 rounded-full cursor-pointer transition-colors ${
                  notifications.email ? 'bg-primaryColor' : 'bg-gray-300'
                }`}
                onClick={() => toggleNotification('email')}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform
                ${
                  isRTL
                    ? notifications.email
                      ? 'translate-x-[-1.5rem]'
                      : '-translate-x-1/42'
                    : notifications.email
                      ? 'translate-x-6'
                      : 'translate-x-0.5'
                }
                mt-0.5`}
                />
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="font-medium">{t.settings.Marketing_emails}</span>
              <div
                className={`w-12 h-6 rounded-full cursor-pointer transition-colors ${
                  notifications.marketing ? 'bg-primaryColor' : 'bg-gray-300'
                }`}
                onClick={() => toggleNotification('marketing')}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform
                
                ${
                  isRTL
                    ? notifications.marketing
                      ? 'translate-x-[-1.5rem]'
                      : '-translate-x-1/42'
                    : notifications.marketing
                      ? 'translate-x-6'
                      : 'translate-x-0.5'
                }
                mt-0.5`}
                />
              </div>
            </div>
            <Button
              onClick={() => setShowModal(null)}
              className="w-full bg-primaryColor hover:bg-[#1c9a40] text-white"
            >
              {t.settings.Save_Settings}
            </Button>
          </div>
        </Modal>
      )}

      {showModal === '2fa' && (
        <Modal title={t.settings.two_factor_auth} onClose={() => setShowModal(null)}>
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
              <Shield className="w-5 h-5 text-green-600" />
              <div>
                <h4 className="font-medium text-green-900">{t.settings.TwoFA_Status}</h4>
                <p className="text-sm text-green-700">{t.settings.two_factor_auth}</p>
              </div>
            </div>
            <div className="space-y-3">
              <p className="text-sm text-gray-600">{t.settings.TwoFA_Description}</p>
              <Button className="w-full bg-primaryColor hover:bg-[#1c9a40] text-white">
                {t.settings.Enable_2FA}
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {showModal === 'visibility' && (
        <Modal title={t.settings.profile_visibility} onClose={() => setShowModal(null)}>
          <div className="space-y-4">
            <div className="space-y-3">
              <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="visibility"
                  value="public"
                  checked={privacy.profileVisibility === 'public'}
                  onChange={(e) =>
                    setPrivacy((prev) => ({ ...prev, profileVisibility: e.target.value }))
                  }
                  className="text-primaryColor"
                />
                <div>
                  <div className="font-medium">{t.settings.Public}</div>
                  <div className="text-sm text-gray-600">{t.settings.public_dusc}</div>
                </div>
              </label>
              <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="visibility"
                  value="private"
                  checked={privacy.profileVisibility === 'private'}
                  onChange={(e) =>
                    setPrivacy((prev) => ({ ...prev, profileVisibility: e.target.value }))
                  }
                  className="text-primaryColor"
                />
                <div>
                  <div className="font-medium">{t.settings.privacy}</div>
                  <div className="text-sm text-gray-600">{t.settings.Private_dusc}</div>
                </div>
              </label>
            </div>
            <Button
              onClick={() => setShowModal(null)}
              className="w-full bg-primaryColor hover:bg-[#1c9a40] text-white"
            >
              {t.settings.Save_Changes}
            </Button>
          </div>
        </Modal>
      )}

      {showModal === 'data' && (
        <Modal title={t.settings.Data_Privacy} onClose={() => setShowModal(null)}>
          <div className="space-y-4">
            <div className="space-y-3">
              <label className="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                <span className="font-medium">{t.settings.Show_Email_Publicly}</span>
                <input
                  type="checkbox"
                  checked={privacy.showEmail}
                  onChange={() => togglePrivacy('showEmail')}
                  className="w-5 h-5 text-primaryColor rounded focus:ring-primaryColor"
                />
              </label>
              <label className="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                <span className="font-medium">{t.settings.Show_Followers_Count}</span>
                <input
                  type="checkbox"
                  checked={privacy.showFollowers}
                  onChange={() => togglePrivacy('showFollowers')}
                  className="w-5 h-5 text-primaryColor rounded focus:ring-primaryColor"
                />
              </label>
              <label className="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                <span className="font-medium">{t.settings.Allow_Direct_Messages}</span>
                <input
                  type="checkbox"
                  checked={privacy.allowMessages}
                  onChange={() => togglePrivacy('allowMessages')}
                  className="w-5 h-5 text-primaryColor rounded focus:ring-primaryColor"
                />
              </label>
            </div>
            <Button
              onClick={() => setShowModal(null)}
              className="w-full bg-primaryColor hover:bg-[#1c9a40] text-white"
            >
              {t.settings.Save_Changes}
            </Button>
          </div>
        </Modal>
      )}

      {showModal === 'blocked' && (
        <Modal title={t.settings.Blocked_Users} onClose={() => setShowModal(null)}>
          <div className="space-y-4">
            <div className="text-center py-8 text-gray-500">
              <p>{t.settings.No_Blocked_Users_Message}</p>
            </div>
            <Button variant="outline" onClick={() => setShowModal(null)} className="w-full">
              {t.common.close}
            </Button>
          </div>
        </Modal>
      )}

      {showModal === 'storage' && (
        <Modal title={t.settings.Storage_Usage} onClose={() => setShowModal(null)}>
          <div className="space-y-6">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">{t.settings.Photos_Videos}</span>
                  <span className="text-sm text-gray-500">1.2 GB</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 w-[60%]" />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">{t.settings.Recipes_Data}</span>
                  <span className="text-sm text-gray-500">450 MB</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 w-[25%]" />
                </div>
              </div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-900">{t.settings.Total_Used}</span>
                <span className="font-bold text-gray-900">1.65 GB / 5 GB</span>
              </div>
            </div>
            <Button variant="outline" className="w-full">
              {t.settings.Manage_Storage}
            </Button>
          </div>
        </Modal>
      )}

      <DeleteAccountDialog
        open={openConfirmDelete}
        onClose={() => setOpenConfirmDelete(false)}
        onConfirm={handleDeleteAccount}
      />
    </>
  );
};
