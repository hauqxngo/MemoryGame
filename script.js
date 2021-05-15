const gameContainer = document.getElementById("game");
let card1 = null;
let card2 = null; 
let count = 0;
let noClicking = false;
let guess = 0;

const COLORS = [
  "#444f5a",
  "#ffe0ac",
  "#ffacb7",
  "#6886c5",
  "#85a392",
  "#444f5a",
  "#ffe0ac",
  "#ffacb7",
  "#6886c5",
  "#85a392"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  if (noClicking) return;
  if (event.target.classList.contains('selected')) return;
  // you can use event.target to see which element was clicked
  let clicked = event.target;
  console.log("you just clicked", clicked);
  const cardColor = clicked.className;
  clicked.style.backgroundColor = cardColor;

  if (card1 !== '' || card2 !== '') {
    clicked.classList.add('selected');
    card1 = card1 || clicked;
    if (clicked === card1) {
      card2 = '';
    } else {
      card2 = clicked;
    }
  }

  if (card1 && card2) {
    noClicking = true;
    let img1 = card1.className;
    let img2 = card2.className;

    if (img1 === img2) {
      count +=2;
      card1.removeEventListener('click', handleCardClick);
      card2.removeEventListener('click', handleCardClick);
      card1 = null;
      card2 = null;
      noClicking = false;
    } else {
      setTimeout(function() {
        card1.style.backgroundColor = '';
        card2.style.backgroundColor = '';
        card1.classList.remove('selected');
        card2.classList.remove('selected');
        card1 = null;
        card2 = null;
        noClicking = false;
      }, 1000);
    }
  }

  if (count === COLORS.length) {
    alert('YOU WIN!');
  }
}

// when the DOM loads
createDivsForColors(shuffledColors);
