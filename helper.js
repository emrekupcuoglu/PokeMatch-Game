export const getRandomId = function () {

  const randomId = new Set();
  while (randomId.size < 8) {
    const randomNumber = Math.ceil(Math.random() * 150);
    randomId.add(randomNumber);
  }
  return [...randomId];


};


export const shuffleArray = function (array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
};


export const getBackAndFront = function (el) {
  const back = el.querySelector(".back");
  const front = el.querySelector(".front");
  return [back, front];
};

export const rotateElements = function (elements) {
  if (!Array.isArray(elements) || !elements.length) return;
  elements.forEach(el => el.classList.toggle("rotate"));

};