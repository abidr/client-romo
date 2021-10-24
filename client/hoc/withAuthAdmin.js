import { useRouter } from 'next/router';
import React from 'react';
import Loader from '../components/Loader';
import useCheckAuth from '../data/useCheckAuth';
import useProfile from '../data/useProfile';
import useSettings from '../data/useSettings';

const withAuthAdmin = (WrappedComponent) => (props) => {
  const Router = useRouter();

  const { data, loading } = useCheckAuth();
  const { data: userData, loading: userLoading } = useProfile();
  const { data: settings, loading: settingsLoading } = useSettings();

  if (loading || userLoading || settingsLoading) {
    return <Loader height="100vh" />;
  }

  if (data?.isAdmin) {
    return <WrappedComponent {...props} userData={userData} settings={settings} />;
  }
  Router.replace('/admin');
  return null;
};

export default withAuthAdmin;
