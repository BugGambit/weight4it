import { profileModel, ProfileModel } from 'store/profile';

export interface StoreModel {
  profile: ProfileModel;
}
export const storeModel: StoreModel = {
  profile: profileModel,
};
