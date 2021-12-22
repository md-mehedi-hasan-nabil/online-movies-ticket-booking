const shuffleArray = (arr) => {
  const n = arr.length;
  let myArray = [...arr];
  for (let i = n - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = myArray[j];
    myArray[j] = myArray[i];
    myArray[i] = temp;
  }
  return myArray;
};

module.exports = shuffleArray;
