import { Gender } from 'store/profile';

export default function basalMetabolicRate(
  gender: Gender,
  weightInKg: number,
  heightInCm: number,
  ageInYears: number
) {
  // https://en.wikipedia.org/wiki/Harris%E2%80%93Benedict_equation
  const genderConstant = gender === Gender.Male ? 5 : -161;
  return 10 * weightInKg + 6.25 * heightInCm - 5 * ageInYears + genderConstant;
}

export function idealWeight(gender: Gender, heightInCm: number) {
  // J. D. Robinson Formula https://www.calculator.net/ideal-weight-calculator.html
  const baseWeight = gender === Gender.Male ? 52 : 49;
  const weightStep = gender === Gender.Male ? 1.9 : 1.7;
  const fiveFeetInCm = 152.4;
  const cmInAInch = 2.54;
  return baseWeight + (weightStep * (heightInCm - fiveFeetInCm)) / cmInAInch;
}

export function bodyMassIndex(weightInKg: number, heightInCm: number) {
  // https://people.maths.ox.ac.uk/trefethen/bmi.html
  return (1.3 * weightInKg) / (heightInCm / 100) ** 2.5;
}

export function getWeightFromBodyMassIndex(bmi: number, heightInCm: number) {
  // https://people.maths.ox.ac.uk/trefethen/bmi.html
  return (bmi * (heightInCm / 100) ** 2.5) / 1.3;
}

export function healtyBMIRange(heightInCm: number) {
  const minBMI = 18.5;
  const maxBMI = 25;
  return {
    min: getWeightFromBodyMassIndex(minBMI, heightInCm),
    max: getWeightFromBodyMassIndex(maxBMI, heightInCm),
  };
}

export function generateWeightLossPlan(
  currentWeight: number,
  targetWeight: number
) {
  const weightPerDay: { dayNumber: number; weight: number }[] = [];
  const percentageWeightLossInAWeek = 0.75;
  const dailyWeightLossFactor = percentageWeightLossInAWeek / 100 / 7;
  let weight = currentWeight;
  while (weight >= targetWeight) {
    weightPerDay.push({
      dayNumber: weightPerDay.length,
      weight,
    });
    weight *= 1 - dailyWeightLossFactor;
  }
  return weightPerDay;
}
