import { Action, action } from 'easy-peasy';
import { foodModel, FoodModel } from 'store/food';
import { goalModel, GoalModel } from 'store/goal';
import { measurementsModel, MeasurementsModel } from 'store/measurements';
import { profileModel, ProfileModel } from 'store/profile';

const initialState = {
  profile: { ...profileModel },
  goal: { ...goalModel },
  measurements: { ...measurementsModel },
  food: { ...foodModel },
};

export interface StoreModel {
  profile: ProfileModel;
  goal: GoalModel;
  measurements: MeasurementsModel;
  food: FoodModel;
  reset: Action<StoreModel>;
}

export const storeModel: StoreModel = {
  ...initialState,
  reset: action(() => ({ ...initialState })),
};
