export const clinicClientAPI = {
  createPatient: 'patients',
};

export const profilesClientAPI = {
  createProfile: 'profiles',
};

export const getPrefixedToken = (token: string) => `Bearer ${token}`;
