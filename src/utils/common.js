import {DIGIT_SPACE} from "../const";

export const extend = (a, b) => {
  return Object.assign({}, a, b);
};

export const getPreviousElement = (array, element) => {
  return array[(array.indexOf(element) + array.length - 1) % array.length];
};

export const getNextElement = (array, element) => {
  return array[(array.indexOf(element) + 1) % array.length];
};

export const Repeat = (props) => {
  let items = [];
  for (let i = 0; i < props.numTimes; i++) {
    items.push(props.children(i));
  }
  return items;
};

export const shakeEffect = (element) => {
  element.style.animation = `shake ${600 / 1000}s`;
  setTimeout(() => {
    element.style.animation = ``;
  }, 600);
};

export const divideNumberToSpace = (num) => {
  const str = String(num);

  if (str.length <= DIGIT_SPACE) {
    return str;
  }

  let space = 0;
  let result = ``;

  for (let i = str.length - 1; i >= 0; i--) {
    if (space === 3) {
      result = ` ` + result;
      space = 0;
    }

    result = str.charAt(i) + result;
    space++;
  }

  return result;
};
