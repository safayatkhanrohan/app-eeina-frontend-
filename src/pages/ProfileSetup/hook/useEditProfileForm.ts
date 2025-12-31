import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useEffect } from 'react';
import { editProfileSchema, EditProfileType } from '@/schemas/auth/User.Validation';
import { useEditProfileMutation } from '@/redux/Features/User/userApi';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { getLocalizedPath } from '@/lib/getLocalizedPath';

export const useEditProfileForm = (userProfile?: EditProfileType) => {
  const { t, language } = useLanguage();
  const [editProfile] = useEditProfileMutation();
  const navigat = useNavigate();
  const methods = useForm<EditProfileType>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      phone: '',
      dob: undefined,
      gender: 'male',
      bio: '',
      location: {
        zip: '',
        city: '',
        streetAddress: '',
        country: '',
      },
      profilePicture: undefined,
      coverPhoto: undefined,
      marketplaceNotifications: false,
      recipeUpdates: false,
      promotionalEmails: false,
      pushNotifications: true,
      facebook: '',
      instagram: '',
      twitter: '',
      linkedin: '',
      website: '',
    },
    reValidateMode: 'onChange',
  });
  useEffect(() => {
    if (userProfile) {
      const profile = userProfile;

      const formattedDob = profile.dob
        ? new Date(profile.dob).toISOString().slice(0, 10)
        : undefined;
      methods.reset({
        ...methods.getValues(),
        ...profile,
        dob: formattedDob,
        profilePicture: profile.profilePicture || undefined,
        coverPhoto: profile.coverPhoto || undefined,
      });
    }
  }, [userProfile, methods]);

  const handleSave = methods.handleSubmit(async (data) => {
    console.log('dddddddd');
    try {
      const response = await editProfile(data).unwrap();
      console.log('resp', response);
      toast.success(response.message || t.profile.profile_updated_success);
      navigat(getLocalizedPath('/profile', language));
    } catch (err: any) {
      console.error(err);
      toast.error(err.data.message || t.profile.profile_update_failed);
    }
  });

  return { methods, handleSave };
};
