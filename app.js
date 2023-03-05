"use strict";
window.addEventListener("load", initApp);

// Variables
let points = 0;
let lives = 0;
let timeLeft = 0;
let gametime = 0;
const pointsToWin = 25;
let updateCountdownID;

function initApp() {
  console.log("Initialize app");
  document.querySelector("#menu-how-to-play-container").classList.add("hidden");
  document.querySelector("#menu-container").classList.remove("hidden");
  document.querySelector("#start").classList.remove("hidden");
  document.querySelector("#start").offsetHeight;
  document.querySelector(".start-btn").addEventListener("click", start);
  document
    .querySelector(".how-to-play-btn")
    .addEventListener("click", howToPlayMenu);

  // load sound
  document.querySelector("#sound_fish").load();
  document.querySelector("#sound_garbage").load();
  document.querySelector("#sound_gameover").load();
  document.querySelector("#sound_ingame").load();
  document.querySelector("#sound_complete").load();
}

function howToPlayMenu() {
  document
    .querySelector(".how-to-play-btn")
    .removeEventListener("click", howToPlayMenu);
  document.querySelector("#menu-container").classList.add("hidden");
  document
    .querySelector("#menu-how-to-play-container")
    .classList.remove("hidden");
  document.querySelector("#start").offsetHeight;
  document.querySelector("#go-to-menu-btn").addEventListener("click", initApp);
}

function start() {
  console.log("Start Game");
  document.querySelector("#sound_ingame").play();
  updateCountdownID = setInterval(updateCountdown, 1000);
  // Reset points, lives and timer
  resetLives();
  resetPoints();
  resetTimer();
  // Remove eventlistner
  document.querySelector(".start-btn").removeEventListener("click", start);

  // Start game
  document.querySelector("#start").classList.add("hidden");
  document.querySelector("#game").classList.remove("hidden");

  animationStart();
  animationClick();
  animationRestart();
}

function resetLives() {
  lives = 3;
  document.querySelector("#life1").offsetHeight;
  document.querySelector("#life1").classList.remove("hidden");
  document.querySelector("#life2").offsetHeight;
  document.querySelector("#life2").classList.remove("hidden");
  document.querySelector("#life3").offsetHeight;
  document.querySelector("#life3").classList.remove("hidden");
}

function resetPoints() {
  points = 0;
  displayPoints();
}

function resetTimer() {
  timeLeft = 60;
  gametime = timeLeft + "s";
  // Remove timebar animation
  document.querySelector("#timebar").classList.remove("scaleX");
  document.querySelector("#timebar").offsetHeight;
  document.querySelector("#time_board").classList.remove("glow");
  document.querySelector("#time_board").offsetHeight;

  // set CSS gametime var
  document.querySelector(":root").style.setProperty("--gametime", gametime);
  // Start timebar animation
  document.querySelector("#timebar").classList.add("scaleX");
  document.querySelector("#time_board").classList.add("glow");
  console.log("timeLeft = " + timeLeft);
}

function randomStart() {
  let pos = randomNumber(1, 5, true);
  this.classList.remove(
    "position1",
    "position2",
    "position3",
    "position4",
    "position5"
  );
  this.offsetHeight;
  this.classList.add("position" + pos);
  console.log(this + "Random start position: " + pos);
}

function clickGarbage() {
  console.log("Garbage is clicked");

  // Sound effect
  document.querySelector("#sound_garbage").currentTime = 0;
  document.querySelector("#sound_garbage").play();

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
  randomStart.call(this);

  // Restart animation
  this.classList.remove("move_slow");
  this.offsetHeight;
  this.classList.add("move_slow");

  // Make clickable again
  this.addEventListener("click", clickGarbage);
}

function clickFish() {
  console.log("Fish is clicked");
  // Sound effect
  document.querySelector("#sound_fish").currentTime = 0;
  document.querySelector("#sound_fish").play();

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
  randomStart.call(this);

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
  if (points >= pointsToWin) {
    displayLevelComplete();
  }
}

function displayPoints() {
  document.querySelector("#score").textContent = points;
}

function displayGameOver() {
  console.log("Game over");
  console.log("Gametime: " + gametime);
  console.log("timeleft: " + timeLeft);
  // game over sound
  document.querySelector("#sound_ingame").pause();
  document.querySelector("#sound_ingame").currentTime = 0;
  document.querySelector("#sound_gameover").play();
  document.querySelector("#game").classList.add("hidden");
  document.querySelector("#game-over").classList.remove("hidden");
  // Main menu eventlistner
  document
    .querySelector("#gameover-menu-btn")
    .addEventListener("click", showStartScreen);
  endGame();
}

function displayLevelComplete() {
  console.log("Level complete");
  console.log("Gametime: " + gametime);
  console.log("timeleft: " + timeLeft);
  // level complete sound
  document.querySelector("#sound_ingame").pause();
  document.querySelector("#sound_ingame").currentTime = 0;
  document.querySelector("#sound_complete").play();
  // document.querySelector("#game").classList.add("hidden");
  document.querySelector("#level-complete").classList.remove("hidden");
  // Main menu eventlistner
  document
    .querySelector("#level-complete-btn")
    .addEventListener("click", showStartScreen);
  endGame();
}

function showStartScreen() {
  document.querySelector("#level-complete").classList.add("hidden");
  document.querySelector("#game-over").classList.add("hidden");
  document.querySelector("#start").classList.remove("hidden");
  initApp();
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
    return Math.floor(Math.random() * max) + min;
  } else {
    return Math.random() * max + min;
  }
}

function animationStart() {
  // Variables
  let animationDelayMaxFish = 6;
  let animationDelayMaxGarbage = 7;

  // Start fish animations
  let pos1 = randomNumber(1, 5, true);
  document.querySelector("#fish1_container").classList.add("position" + pos1);
  console.log("Fish1 position = " + pos1);
  // let topPositionFish1 = randomNumber(35, 89, true);
  // document.getElementById("fish1_container").style.top = topPositionFish1 + "%"; // Set CSS top property
  let animationDelayFish1 = randomNumber(0, animationDelayMaxFish, false);
  document.getElementById("fish1_container").style.animationDelay =
    animationDelayFish1 + "s"; // Set CSS animation delay
  document.querySelector("#fish1_container").classList.add("move");
  document.querySelector("#fish1_container").classList.add("position1");

  let pos2 = randomNumber(1, 5, true);
  document.querySelector("#fish2_container").classList.add("position" + pos2);
  console.log("Fish2 position = " + pos2);
  // let topPositionFish2 = randomNumber(35, 89, true);
  // document.getElementById("fish2_container").style.top = topPositionFish2 + "%"; // Set CSS top property
  let animationDelayFish2 = randomNumber(0, animationDelayMaxFish, false);
  document.getElementById("fish2_container").style.animationDelay =
    animationDelayFish2 + "s"; // Set CSS animation delay
  document.querySelector("#fish2_container").classList.add("move");

  let pos3 = randomNumber(1, 5, true);
  document.querySelector("#fish3_container").classList.add("position" + pos3);
  console.log("Fish3 position = " + pos3);
  // let topPositionFish3 = randomNumber(35, 89, true);
  // document.getElementById("fish3_container").style.top = topPositionFish3 + "%"; // Set CSS top property
  let animationDelayFish3 = randomNumber(0, animationDelayMaxFish, false);
  document.getElementById("fish3_container").style.animationDelay =
    animationDelayFish3 + "s"; // Set CSS animation delay
  document.querySelector("#fish3_container").classList.add("move");

  let pos4 = randomNumber(1, 5, true);
  document.querySelector("#fish4_container").classList.add("position" + pos4);
  console.log("Fish4 position = " + pos4);
  // let topPositionFish4 = randomNumber(35, 89, true);
  // document.getElementById("fish4_container").style.top = topPositionFish4 + "%"; // Set CSS top property
  let animationDelayFish4 = randomNumber(0, animationDelayMaxFish, false);
  document.getElementById("fish4_container").style.animationDelay =
    animationDelayFish4 + "s"; // Set CSS animation delay
  document.querySelector("#fish4_container").classList.add("move");

  // Start garbage animations
  let pos5 = randomNumber(1, 5, true);
  document.querySelector("#bag_container").classList.add("position" + pos5);
  console.log("Bag position = " + pos5);
  // let topPositionBag = randomNumber(35, 89, true);
  // document.getElementById("bag_container").style.top = topPositionBag + "%"; // Set CSS top property
  let animationDelayBag = randomNumber(0, animationDelayMaxGarbage, false);
  document.getElementById("bag_container").style.animationDelay =
    animationDelayBag + "s"; // Set CSS animation delay
  document.querySelector("#bag_container").classList.add("move_slow");

  let pos6 = randomNumber(1, 5, true);
  document.querySelector("#can_container").classList.add("position" + pos6);
  console.log("Can position = " + pos6);
  // let topPositionCan = randomNumber(35, 89, true);
  // document.getElementById("can_container").style.top = topPositionCan + "%"; // Set CSS top property
  let animationDelayCan = randomNumber(0, animationDelayMaxGarbage, false);
  document.getElementById("can_container").style.animationDelay =
    animationDelayCan + "s"; // Set CSS animation delay
  document.querySelector("#can_container").classList.add("move_slow");

  let pos7 = randomNumber(1, 5, true);
  document.querySelector("#battery_container").classList.add("position" + pos7);
  console.log("Battery position = " + pos7);
  // let topPositionBattery = randomNumber(35, 89, true);
  // document.getElementById("battery_container").style.top =
  //   topPositionBattery + "%"; // Set CSS top property
  let animationDelayBattery = randomNumber(0, animationDelayMaxGarbage, false);
  document.getElementById("battery_container").style.animationDelay =
    animationDelayBattery + "s"; // Set CSS animation delay
  document.querySelector("#battery_container").classList.add("move_slow");

  let pos8 = randomNumber(1, 5, true);
  document.querySelector("#bottle_container").classList.add("position" + pos8);
  console.log("Bottle position = " + pos8);
  // let topPositionBottle = randomNumber(35, 89, true);
  // document.getElementById("bottle_container").style.top =
  //   topPositionBottle + "%"; // Set CSS top property
  let animationDelayBottle = randomNumber(0, animationDelayMaxGarbage, false);
  document.getElementById("bottle_container").style.animationDelay =
    animationDelayBottle + "s"; // Set CSS animation delay
  document.querySelector("#bottle_container").classList.add("move_slow");
}

function animationClick() {
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
}

function animationRestart() {
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

function endGame() {
  document.querySelector("#game").classList.add("hidden");
  document.querySelector("#game").offsetHeight;
  // stop countdown update
  clearInterval(updateCountdownID);
  // Remove animation classes
  document.querySelector("#fish1_container").offsetHeight;
  document.querySelector("#fish1_container").classList.remove("move");
  document.querySelector("#fish2_container").offsetHeight;
  document.querySelector("#fish2_container").classList.remove("move");
  document.querySelector("#fish3_container").offsetHeight;
  document.querySelector("#fish3_container").classList.remove("move");
  document.querySelector("#fish4_container").offsetHeight;
  document.querySelector("#fish4_container").classList.remove("move");
  document.querySelector("#bag_container").offsetHeight;
  document.querySelector("#bag_container").classList.remove("move_slow");
  document.querySelector("#can_container").offsetHeight;
  document.querySelector("#can_container").classList.remove("move_slow");
  document.querySelector("#battery_container").offsetHeight;
  document.querySelector("#battery_container").classList.remove("move_slow");
  document.querySelector("#bottle_container").offsetHeight;
  document.querySelector("#bottle_container").classList.remove("move_slow");
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
