function getAllTheLettersWithColor(letterParam) {
  const lettersAndColors = [];
  for (let i = 65; i < 91; ++i) {
    const letter = String.fromCharCode(i);
    const randColorForLetter = getRgbColorForLetter(i);
    lettersAndColors.push({ letter, rgb: randColorForLetter });
  }
  return lettersAndColors.find((item) => item.letter === letterParam);
}

function getRandomColorCode(letterNo, randomDefaultValue) {
  return Math.floor((randomDefaultValue * letterNo) % 255);
}

function getRgbColorForLetter(letterNo) {
  const red = getRandomColorCode(letterNo, 50);
  const green = getRandomColorCode(letterNo, 100);
  const blue = getRandomColorCode(letterNo, 150);

  return `rgb( ${red} , ${green}, ${blue})`;
}

export default function getUserLogoBasedOnName(name) {
  // extract first letter
  const firstLetter = name[0].toUpperCase();
  const letterAndRGB = getAllTheLettersWithColor(firstLetter);
  return letterAndRGB;
}
