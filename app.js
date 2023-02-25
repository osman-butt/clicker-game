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
  let topPositionGarbage = randomNumber(35, 89);
  document.getElementById("bag_container").style.top = topPositionGarbage + "%";
  document.querySelector("#bag_container").classList.add("move_slow");

  // Click events Fish
  document
    .querySelector("#fish1_container")
    .addEventListener("click", clickFish);
  // Random start after each iteration
  document
    .querySelector("#fish1_container")
    .addEventListener("animationiteration", randomFishStart);

  // Click events Garbage
  document
    .querySelector("#bag_container")
    .addEventListener("click", clickGarbage);

  // Random start after each iteration
  document
    .querySelector("#bag_container")
    .addEventListener("animationiteration", randomGarbageStart);
}

function randomFishStart() {
  let topPosition = randomNumber(35, 89);
  document.getElementById("fish1_container").style.top = topPosition + "%";
  console.log("random fish position: " + topPosition);
}

function randomGarbageStart() {
  let topPosition = randomNumber(35, 89);
  document.getElementById("bag_container").style.top = topPosition + "%";
  console.log("random garbage position: " + topPosition);
}

function clickFish() {
  console.log("Fish is clicked");

  // Remove eventlistner to prevent double click
  document
    .querySelector("#fish1_container")
    .removeEventListener("click", clickFish);

  // Pause fish
  document.querySelector("#fish1_container").classList.add("paused");

  // Disappear animation
  document.querySelector("#fish1_sprite").classList.add("zoom_out_rotate");

  // Spawn fish
  document
    .querySelector("#fish1_container")
    .addEventListener("animationend", spawnFish);

  // Remove one life
  decrementLives();
}

function spawnFish() {
  console.log("New fish spawned");

  // Remove eventlistner
  document
    .querySelector("#fish1_container")
    .removeEventListener("animationend", spawnFish);

  // Remove pause and disappear animation
  document.querySelector("#fish1_sprite").classList.remove("zoom_out_rotate");
  document.querySelector("#fish1_container").classList.remove("paused");

  // Random start
  let topPosition = randomNumber(35, 89);
  document.getElementById("fish1_container").style.top = topPosition + "%";

  // Restart animation
  document.querySelector("#fish1_container").classList.remove("move");
  document.querySelector("#fish1_container").offsetHeight;
  document.querySelector("#fish1_container").classList.add("move");

  // Make clickable again
  document
    .querySelector("#fish1_container")
    .addEventListener("click", clickFish);
}

function clickGarbage() {
  console.log("Garbage is clicked");

  // Remove eventlistner to prevent double click
  document
    .querySelector("#bag_container")
    .removeEventListener("click", clickGarbage);

  // Pause animation
  document.querySelector("#bag_container").classList.add("paused");

  // Disappear animation
  document.querySelector("#bag_sprite").classList.add("hidden");
  document.querySelector("#star_bag_sprite").classList.remove("hidden");
  document.querySelector("#star_bag_sprite").offsetHeight;
  document.querySelector("#star_bag_sprite").classList.add("zoom_out");

  // Spawn garbage
  document
    .querySelector("#bag_container")
    .addEventListener("animationend", spawnGarbage);

  // Add point
  incrementPoints();
}

function spawnGarbage() {
  console.log("New garbage spawned");

  // Remove eventlistner
  document
    .querySelector("#bag_container")
    .removeEventListener("animationend", spawnGarbage);

  // Remove pause and disappear animation
  document.querySelector("#star_bag_sprite").classList.add("hidden");
  document.querySelector("#bag_sprite").classList.remove("hidden");
  document.querySelector("#bag_container").classList.remove("paused");

  // Random start
  let topPosition = randomNumber(35, 89);
  document.getElementById("bag_container").style.top = topPosition + "%";

  // Restart animation
  document.querySelector("#bag_container").classList.remove("move_slow");
  document.querySelector("#bag_container").offsetHeight;
  document.querySelector("#bag_container").classList.add("move_slow");

  // Make clickable again
  document
    .querySelector("#bag_container")
    .addEventListener("click", clickGarbage);
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
