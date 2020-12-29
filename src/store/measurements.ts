/* eslint-disable no-param-reassign */
import db from 'api/database';
import { action, Action, thunk, Thunk } from 'easy-peasy';
import firebase from 'api/firebase';

export interface Measurement {
  date: Date;
  weightInKg: number;
}

export interface FirebaseMeasurement extends Omit<Measurement, 'date'> {
  date: firebase.firestore.Timestamp;
}

export interface MeasurementsModel {
  data: Measurement[] | null;
  setMeasurements: Action<MeasurementsModel, Measurement[] | null>;
  saveAMeasurement: Thunk<
    MeasurementsModel,
    { email: string; measurement: Measurement }
  >;
}

function stringifyDate(date: Date) {
  const d = date.getDate();
  const m = date.getMonth();
  const y = date.getFullYear();
  return `${d}-${m + 1}-${y}`;
}

// function parseDate(str: string) {
//   const [d, m, y] = str.split('-').map(Number);
//   return new Date(y, m - 1, d);
// }

export async function saveMeasurementToDatabase(
  email: string,
  { weightInKg, date }: Measurement
) {
  const key = stringifyDate(date);
  await db
    .collection('users')
    .doc(email)
    .collection('measurements')
    .doc(key)
    .set(
      {
        weightInKg,
      },
      { merge: true }
    );
}

export const measurementsModel: MeasurementsModel = {
  data: null,
  setMeasurements: action((state, measurements) => {
    state.data = measurements;
  }),
  saveAMeasurement: thunk(async (actions, { email, measurement }) => {
    await saveMeasurementToDatabase(email, measurement);
  }),
};
