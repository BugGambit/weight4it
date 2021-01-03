/* eslint-disable no-param-reassign */
import db from 'api/database';
import { action, Action, thunk, Thunk } from 'easy-peasy';
import firebase from 'api/firebase';
import { stringifyDate } from 'utils/datetime';
import { v4 as uuidv4 } from 'uuid';

export interface Food {
  name: string;
  kcal: number;
  picturePath?: string;
  timestamp: Date;
}

export interface FirebaseFood extends Omit<Food, 'timestamp'> {
  timestamp: firebase.firestore.Timestamp;
}

export interface FoodModel {
  data: Food[] | null;
  kcalEaten: number;
  setFood: Action<FoodModel, Food[] | null>;
  saveFood: Thunk<FoodModel, { email: string; food: Food }>;
}

export function getFoodCollectionRef(email: string) {
  return db.collection('users').doc(email).collection('food');
}

export async function saveFoodPicture(email: string, picture: File) {
  const storageRef = firebase.storage().ref();
  const pictureRef = storageRef.child(`${email}/food-images/${uuidv4()}`);
  await pictureRef.put(picture);
  return pictureRef.fullPath;
}

export async function saveFoodToDatabase(
  email: string,
  { name, kcal, timestamp, picturePath }: Food
) {
  const food: FirebaseFood = {
    name,
    kcal,
    picturePath,
    timestamp: firebase.firestore.Timestamp.fromDate(timestamp),
  };
  const key = stringifyDate(timestamp);
  await getFoodCollectionRef(email)
    .doc(key)
    .set(
      {
        items: firebase.firestore.FieldValue.arrayUnion(food),
      },
      { merge: true }
    );
}

export const foodModel: FoodModel = {
  data: null,
  kcalEaten: 0,
  setFood: action((state, food) => {
    state.data = food;
    state.kcalEaten = food
      ? food.reduce(
          (accumulatedKcal, foodItem) => accumulatedKcal + foodItem.kcal,
          0
        )
      : 0;
  }),
  saveFood: thunk(async (actions, { email, food }) => {
    await saveFoodToDatabase(email, food);
  }),
};
