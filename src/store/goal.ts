/* eslint-disable no-param-reassign */
import db from 'api/database';
import { action, Action, thunk, Thunk } from 'easy-peasy';
import firebase from 'api/firebase';

export interface Goal {
  targetWeight: number;
  startWeight: number;
  startDate: Date;
}

export interface FirebaseGoal extends Omit<Goal, 'startDate'> {
  startDate: firebase.firestore.Timestamp;
}

export interface GoalModel {
  data: Goal | null;
  hasGoalBeenSet: boolean;
  setGoal: Action<GoalModel, Goal | null>;
  saveGoal: Thunk<GoalModel, { email: string; goal: Goal }>;
}

export async function saveGoalToDatabase(
  email: string,
  { targetWeight, startWeight, startDate }: Goal
) {
  const goal: FirebaseGoal = {
    targetWeight,
    startWeight,
    startDate: firebase.firestore.Timestamp.fromDate(startDate),
  };
  await db.collection('users').doc(email).set(
    {
      goal,
    },
    { merge: true }
  );
}

export const goalModel: GoalModel = {
  data: null,
  hasGoalBeenSet: false,
  setGoal: action((state, goal) => {
    state.data = goal;
    state.hasGoalBeenSet = true;
  }),
  saveGoal: thunk(async (actions, { email, goal }) => {
    await saveGoalToDatabase(email, goal);
    actions.setGoal(goal);
  }),
};
