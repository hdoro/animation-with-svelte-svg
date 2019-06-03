export function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomNum(min, max) {
  return (Math.random() * (max - min + 1)) + min;
}

export function getArrayEntry(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}