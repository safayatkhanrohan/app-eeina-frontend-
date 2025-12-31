
import { useGetMeQuery } from '@/redux/Features/User/userApi';
import { Outlet } from 'react-router-dom';
import { useEditProfileForm } from '../ProfileSetup/hook/useEditProfileForm';
import Loader from '@/components/ui/Loader';
import { FormProvider } from 'react-hook-form';
import { Button } from '@/components/ui/button';

const EditProfile = () => {

  const { data, isLoading } = useGetMeQuery();
  const userProfile = data?.data;

  const { methods, handleSave } = useEditProfileForm(userProfile);

  if (isLoading) return <Loader />;
  return (
    <FormProvider {...methods}>
      <form  id="edit-profile-form" onSubmit={handleSave} className=''>
        <Outlet />
      </form>
    </FormProvider>
  );
};

export default EditProfile;
