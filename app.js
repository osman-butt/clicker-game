"use strict";
window.addEventListener("load", start);

// Variables
let points = 0;
let lives = 0;
let timeLeft = 0;
let gametime = 0;

function start() {
  console.log("start");

  setInterval(updateCountdown, 1000);
  // Restart points, lives and timer
  points = 0;
  lives = 3;
  timeLeft = 60;
  gametime = timeLeft + "s";

  // set CSS gametime var
  document.querySelector(":root").style.setProperty("--gametime", gametime);

  // Start fish animations
  let topPositionFish = randomNumber(35, 89);
  document.getElementById("fish1_container").style.top = topPositionFish + "%"; // Set CSS top property
  document.querySelector("#fish1_container").classList.add("move");

  // Start garbage animations
  let topPositionBag = randomNumber(35, 89);
  document.getElementById("bag_container").style.top = topPositionBag + "%";
  document.querySelector("#bag_container").classList.add("move_slow");

  let topPositionCan = randomNumber(35, 89);
  document.getElementById("can_container").style.top = topPositionCan + "%";
  document.querySelector("#can_container").classList.add("move_slow");

  // Click events Fish
  document
    .querySelector("#fish1_container")
    .addEventListener("click", clickFish);
  // Random start after each iteration
  document
    .querySelector("#fish1_container")
    .addEventListener("animationiteration", randomStart);

  // Click events Garbage
  document
    .querySelector("#bag_container")
    .addEventListener("click", clickGarbage);

  // Random start after each iteration
  document
    .querySelector("#bag_container")
    .addEventListener("animationiteration", randomStart);

  // Click events Garbage
  document
    .querySelector("#can_container")
    .addEventListener("click", clickGarbage);

  // Random start after each iteration
  document
    .querySelector("#can_container")
    .addEventListener("animationiteration", randomStart);
}

function randomStart() {
  let topPosition = randomNumber(35, 89);
  this.style.top = topPosition + "%";
  console.log("THIS random garbage position: " + topPosition);
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
  let topPosition = randomNumber(35, 89);
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
  let topPosition = randomNumber(35, 89);
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
  if (points >= 20) {
    displayLevelComplete();
  } else {
    displayPoints();
  }
}

function displayPoints() {
  document.querySelector("#score").textContent = points;
}

function displayGameOver() {
  document.querySelector("#game").classList.add("hidden");
  document.querySelector("#game-over").classList.remove("hidden");
}

function displayLevelComplete() {
  document.querySelector("#game").classList.add("hidden");
  document.querySelector("#level-complete").classList.remove("hidden");
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function updateCountdown() {
  timeLeft--;
  if (timeLeft == 0) {
    if (points >= 3) {
      displayLevelComplete();
    } else {
      displayGameOver();
    }
  }
}
