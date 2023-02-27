"use strict";
window.addEventListener("load", start);

// Variables
let points = 0;
let lives = 0;
let timeLeft = 0;
let gametime = 0;
const pointsToWin = 50;

function start() {
  console.log("start");

  setInterval(updateCountdown, 1000);
  // Restart points, lives and timer
  points = 0;
  lives = 3;
  timeLeft = 60;
  gametime = timeLeft + "s";

  // Variables
  let animationDelayMaxFish = 6;
  let animationDelayMaxGarbage = 7;

  // set CSS gametime var
  document.querySelector(":root").style.setProperty("--gametime", gametime);

  // Start fish animations
  let topPositionFish1 = randomNumber(35, 89, true);
  document.getElementById("fish1_container").style.top = topPositionFish1 + "%"; // Set CSS top property
  let animationDelayFish1 = randomNumber(0, animationDelayMaxFish, false);
  document.getElementById("fish1_container").style.animationDelay =
    animationDelayFish1 + "s"; // Set CSS animation delay
  document.querySelector("#fish1_container").classList.add("move");

  let topPositionFish2 = randomNumber(35, 89, true);
  document.getElementById("fish2_container").style.top = topPositionFish2 + "%"; // Set CSS top property
  let animationDelayFish2 = randomNumber(0, animationDelayMaxFish, false);
  document.getElementById("fish2_container").style.animationDelay =
    animationDelayFish2 + "s"; // Set CSS animation delay
  document.querySelector("#fish2_container").classList.add("move");

  let topPositionFish3 = randomNumber(35, 89, true);
  document.getElementById("fish3_container").style.top = topPositionFish3 + "%"; // Set CSS top property
  let animationDelayFish3 = randomNumber(0, animationDelayMaxFish, false);
  document.getElementById("fish3_container").style.animationDelay =
    animationDelayFish3 + "s"; // Set CSS animation delay
  document.querySelector("#fish3_container").classList.add("move");

  let topPositionFish4 = randomNumber(35, 89, true);
  document.getElementById("fish4_container").style.top = topPositionFish4 + "%"; // Set CSS top property
  let animationDelayFish4 = randomNumber(0, animationDelayMaxFish, false);
  document.getElementById("fish4_container").style.animationDelay =
    animationDelayFish4 + "s"; // Set CSS animation delay
  document.querySelector("#fish4_container").classList.add("move");

  // Start garbage animations
  let topPositionBag = randomNumber(35, 89, true);
  document.getElementById("bag_container").style.top = topPositionBag + "%"; // Set CSS top property
  let animationDelayBag = randomNumber(0, animationDelayMaxGarbage, false);
  document.getElementById("bag_container").style.animationDelay =
    animationDelayBag + "s"; // Set CSS animation delay
  document.querySelector("#bag_container").classList.add("move_slow");

  let topPositionCan = randomNumber(35, 89, true);
  document.getElementById("can_container").style.top = topPositionCan + "%"; // Set CSS top property
  let animationDelayCan = randomNumber(0, animationDelayMaxGarbage, false);
  document.getElementById("can_container").style.animationDelay =
    animationDelayCan + "s"; // Set CSS animation delay
  document.querySelector("#can_container").classList.add("move_slow");

  let topPositionBattery = randomNumber(35, 89, true);
  document.getElementById("battery_container").style.top =
    topPositionBattery + "%"; // Set CSS top property
  let animationDelayBattery = randomNumber(0, animationDelayMaxGarbage, false);
  document.getElementById("battery_container").style.animationDelay =
    animationDelayBattery + "s"; // Set CSS animation delay
  document.querySelector("#battery_container").classList.add("move_slow");

  let topPositionBottle = randomNumber(35, 89, true);
  document.getElementById("bottle_container").style.top =
    topPositionBottle + "%"; // Set CSS top property
  let animationDelayBottle = randomNumber(0, animationDelayMaxGarbage, false);
  document.getElementById("bottle_container").style.animationDelay =
    animationDelayBottle + "s"; // Set CSS animation delay
  document.querySelector("#bottle_container").classList.add("move_slow");

  // Click events Fish
  document
    .querySelector("#fish1_container")
    .addEventListener("click", clickFish);
  document
    .querySelector("#fish2_container")
    .addEventListener("click", clickFish);
  document
    .querySelector("#fish3_container")
    .addEventListener("click", clickFish);
  document
    .querySelector("#fish4_container")
    .addEventListener("click", clickFish);

  // Random start after each iteration
  document
    .querySelector("#fish1_container")
    .addEventListener("animationiteration", randomStart);
  document
    .querySelector("#fish2_container")
    .addEventListener("animationiteration", randomStart);
  document
    .querySelector("#fish3_container")
    .addEventListener("animationiteration", randomStart);
  document
    .querySelector("#fish4_container")
    .addEventListener("animationiteration", randomStart);

  // Click events Garbage
  document
    .querySelector("#bag_container")
    .addEventListener("click", clickGarbage);
  document
    .querySelector("#can_container")
    .addEventListener("click", clickGarbage);
  document
    .querySelector("#battery_container")
    .addEventListener("click", clickGarbage);
  document
    .querySelector("#bottle_container")
    .addEventListener("click", clickGarbage);

  // Random start after each iteration
  document
    .querySelector("#bag_container")
    .addEventListener("animationiteration", randomStart);
  document
    .querySelector("#can_container")
    .addEventListener("animationiteration", randomStart);
  document
    .querySelector("#battery_container")
    .addEventListener("animationiteration", randomStart);
  document
    .querySelector("#bottle_container")
    .addEventListener("animationiteration", randomStart);
}

function randomStart() {
  let topPosition = randomNumber(35, 89, true);
  this.style.top = topPosition + "%";
  console.log("Random start position: " + topPosition);
}

function clickGarbage() {
  console.log("Garbage is clicked");

  // Remove eventlistner to prevent double click
  this.removeEventListener("click", clickGarbage);

  // Pause animation
  this.classList.add("paused");

  // Disappear animation
  this.querySelector("[id$='_sprite']").classList.add("hidden");
  this.querySelector("[id$='_star']").classList.remove("hidden");
  this.querySelector("[id$='_star']").offsetHeight;
  this.querySelector("[id$='_star']").classList.add("zoom_out");

  // Spawn garbage
  this.addEventListener("animationend", spawnGarbage);

  // Add point
  incrementPoints();
}

function spawnGarbage() {
  console.log("New garbage spawned");

  // Remove eventlistner
  this.removeEventListener("animationend", spawnGarbage);

  // Remove pause and disappear animation
  this.querySelector("[id$='_star']").classList.add("hidden");
  this.querySelector("[id$='_sprite']").classList.remove("hidden");
  this.classList.remove("paused");

  // Random start
  let topPosition = randomNumber(35, 89, true);
  this.style.top = topPosition + "%";

  // Restart animation
  this.classList.remove("move_slow");
  this.offsetHeight;
  this.classList.add("move_slow");

  // Make clickable again
  this.addEventListener("click", clickGarbage);
}

function clickFish() {
  console.log("Fish is clicked");

  // Remove eventlistner to prevent double click
  this.removeEventListener("click", clickFish);

  // Pause fish
  this.classList.add("paused");

  // Disappear animation
  this.querySelector("[id$='_sprite']").classList.add("zoom_out_rotate");

  // Spawn fish
  this.addEventListener("animationend", spawnFish);

  // Remove one life
  decrementLives();
}

function spawnFish() {
  console.log("New fish spawned");

  // Remove eventlistner
  this.removeEventListener("animationend", spawnFish);

  // Remove pause and disappear animation
  this.querySelector("[id$='_sprite']").classList.remove("zoom_out_rotate");
  this.classList.remove("paused");

  // Random start
  let topPosition = randomNumber(35, 89, true);
  this.style.top = topPosition + "%";

  // Restart animation
  this.classList.remove("move");
  this.offsetHeight;
  this.classList.add("move");

  // Make clickable again
  this.addEventListener("click", clickFish);
}

function decrementLives() {
  console.log("Lives decremented");
  if (lives > 1) {
    displayLives();
    lives--;
  } else {
    displayGameOver();
  }
}

function displayLives() {
  document.querySelector("#life" + lives).classList.add("hidden");
}

function incrementPoints() {
  console.log("Point added");
  points++;
  displayPoints();
}

function displayPoints() {
  document.querySelector("#score").textContent = points;
}

function endGame() {
  // Remove animation classes
  document.querySelector("#fish1_container").classList.remove("move");
  document.querySelector("#fish2_container").classList.remove("move");
  document.querySelector("#fish3_container").classList.remove("move");
  document.querySelector("#fish4_container").classList.remove("move");
  document.querySelector("#bag_container").classList.remove("move");
  document.querySelector("#can_container").classList.remove("move");
  document.querySelector("#battery_container").classList.remove("move");
  document.querySelector("#bottle_container").classList.remove("move");

  // Remove eventlistners
  document
    .querySelector("#fish1_container")
    .removeEventListener("click", clickFish);
  document
    .querySelector("#fish2_container")
    .removeEventListener("click", clickFish);
  document
    .querySelector("#fish3_container")
    .removeEventListener("click", clickFish);
  document
    .querySelector("#fish4_container")
    .removeEventListener("click", clickFish);
  document
    .querySelector("#fish1_container")
    .removeEventListener("animationiteration", randomStart);
  document
    .querySelector("#fish2_container")
    .removeEventListener("animationiteration", randomStart);
  document
    .querySelector("#fish3_container")
    .removeEventListener("animationiteration", randomStart);
  document
    .querySelector("#fish4_container")
    .removeEventListener("animationiteration", randomStart);
  document
    .querySelector("#bag_container")
    .removeEventListener("click", clickGarbage);
  document
    .querySelector("#can_container")
    .removeEventListener("click", clickGarbage);
  document
    .querySelector("#battery_container")
    .removeEventListener("click", clickGarbage);
  document
    .querySelector("#bottle_container")
    .removeEventListener("click", clickGarbage);
  document
    .querySelector("#bag_container")
    .removeEventListener("animationiteration", randomStart);
  document
    .querySelector("#can_container")
    .removeEventListener("animationiteration", randomStart);
  document
    .querySelector("#battery_container")
    .removeEventListener("animationiteration", randomStart);
  document
    .querySelector("#bottle_container")
    .removeEventListener("animationiteration", randomStart);
}

function displayGameOver() {
  console.log("Game over");
  console.log("Gametime: " + gametime);
  console.log("timeleft: " + timeLeft);
  document.querySelector("#game").classList.add("hidden");
  document.querySelector("#game-over").classList.remove("hidden");
  endGame();
}

function displayLevelComplete() {
  console.log("Level complete");
  console.log("Gametime: " + gametime);
  console.log("timeleft: " + timeLeft);
  document.querySelector("#game").classList.add("hidden");
  document.querySelector("#level-complete").classList.remove("hidden");
  endGame();
}

function updateCountdown() {
  timeLeft--;
  if (timeLeft == 0) {
    if (points >= pointsToWin) {
      displayLevelComplete();
    } else {
      displayGameOver();
    }
  }
}

function randomNumber(min, max, integer = false) {
  if (integer) {
    return Math.floor(Math.random() * (max - min)) + min;
  } else {
    return Math.random() * (max - min) + min;
  }
}
