import { Action, action } from 'easy-peasy';
import { goalModel, GoalModel } from 'store/goal';
import { measurementsModel, MeasurementsModel } from 'store/measurements';
import { profileModel, ProfileModel } from 'store/profile';

const initialState = {
  profile: { ...profileModel },
  goal: { ...goalModel },
  measurements: { ...measurementsModel },
};

export interface StoreModel {
  profile: ProfileModel;
  goal: GoalModel;
  measurements: MeasurementsModel;
  reset: Action<StoreModel>;
}

export const storeModel: StoreModel = {
  ...initialState,
  reset: action(() => ({ ...initialState })),
};
