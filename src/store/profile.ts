/* eslint-disable no-param-reassign */
import db from 'api/database';
import { action, Action, thunk, Thunk } from 'easy-peasy';
import firebase from 'api/firebase';

export enum Gender {
  Male = 'male',
  Female = 'female',
}

export interface Profile {
  email: string;
  gender: Gender;
  dateOfBirth: Date;
  heightInCm: number;
}

export interface FirebaseProfile extends Omit<Profile, 'dateOfBirth'> {
  dateOfBirth: firebase.firestore.Timestamp;
}

export interface ProfileModel {
  data: Profile | null;
  setProfile: Action<ProfileModel, Profile | null>;
  saveProfile: Thunk<ProfileModel, Profile>;
}

export async function saveProfileToDatabase({
  email,
  gender,
  heightInCm,
  dateOfBirth,
}: Profile) {
  const profile: FirebaseProfile = {
    email,
    gender,
    heightInCm,
    dateOfBirth: firebase.firestore.Timestamp.fromDate(dateOfBirth),
  };
  await db.collection('users').doc(email).set(
    {
      profile,
    },
    { merge: true }
  );
}

export const profileModel: ProfileModel = {
  data: null,
  setProfile: action((state, profile) => {
    state.data = profile;
  }),
  saveProfile: thunk(async (actions, profile) => {
    await saveProfileToDatabase(profile);
    actions.setProfile(profile);
  }),
};
