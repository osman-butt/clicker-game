"use strict";
window.addEventListener("load", start);

// Variables
let points = 0;
let lives = 0;

function start() {
  console.log("start");

  // Restart points and lives
  points = 0;
  lives = 3;

  // Start fish animations
  for (let i = 1; i < 10; i++) {
    document
      .querySelector("#fish" + i + "_container")
      .classList.add("move_left_right");
  }

  //   Start garbage animations
  document.querySelector("#bag_container").classList.add("rotate");
  document.querySelector("#can_container").classList.add("rotate");
  document.querySelector("#battery_container").classList.add("rotate");
  document.querySelector("#bottle_container").classList.add("rotate");
  document.querySelector("#plastic_container").classList.add("rotate");

  // Click events
  document.querySelector("#bag_container").addEventListener("click", clickBag);
  document.querySelector("#can_container").addEventListener("click", clickCan);
  document
    .querySelector("#battery_container")
    .addEventListener("click", clickBattery);
  document
    .querySelector("#bottle_container")
    .addEventListener("click", clickBottle);
  document
    .querySelector("#plastic_container")
    .addEventListener("click", clickPlastic);
}

function clickBag() {
  console.log("Bag click");

  // Remove addEventListener to avoid double click
  document
    .querySelector("#bag_container")
    .removeEventListener("click", clickBag);

  // Pause animation
  document.querySelector("#bag_container").classList.add("paused");

  // Add disappear animation
  document.querySelector("#bag_sprite").classList.add("zoom_out_rotate");

  // Restart animation
  document
    .querySelector("#bag_container")
    .addEventListener("animationend", bagRestart);

  // Add points
  incrementPoints();
}

function bagRestart() {
  console.log("Bag restart");
  // Remove addEventListener
  document
    .querySelector("#bag_container")
    .removeEventListener("animationend", bagRestart);

  // Remove pause and disappear animation
  document.querySelector("#bag_sprite").classList.remove("zoom_out_rotate");
  document.querySelector("#bag_container").classList.remove("paused");

  // Restart animation
  document.querySelector("#bag_container").classList.remove("rotate");
  document.querySelector("#bag_container").offsetHeight;
  document.querySelector("#bag_container").classList.add("rotate");

  // Make clickable again
  document.querySelector("#bag_container").addEventListener("click", clickBag);
}

function clickCan() {
  console.log("Can click");
  // Remove addEventListener to avoid double click
  document
    .querySelector("#can_container")
    .removeEventListener("click", clickCan);

  // Pause animation
  document.querySelector("#can_container").classList.add("paused");

  // Add disappear animation
  document.querySelector("#can_sprite").classList.add("zoom_out_rotate");

  // Restart animation
  document
    .querySelector("#can_container")
    .addEventListener("animationend", canRestart);

  // Add points
  incrementPoints();
}

function canRestart() {
  console.log("Can restart");
  // Remove addEventListener
  document
    .querySelector("#can_container")
    .removeEventListener("animationend", canRestart);

  // Remove pause and disappear animation
  document.querySelector("#can_sprite").classList.remove("zoom_out_rotate");
  document.querySelector("#can_container").classList.remove("paused");

  // Restart animation
  document.querySelector("#can_container").classList.remove("rotate");
  document.querySelector("#can_container").offsetHeight;
  document.querySelector("#can_container").classList.add("rotate");

  // Make clickable again
  document.querySelector("#can_container").addEventListener("click", clickCan);
}

function clickBattery() {
  console.log("Battery click");
  // Remove addEventListener to avoid double click
  document
    .querySelector("#battery_container")
    .removeEventListener("click", clickBattery);

  // Pause animation
  document.querySelector("#battery_container").classList.add("paused");

  // Add disappear animation
  document.querySelector("#battery_sprite").classList.add("zoom_out_rotate");

  // Restart animation
  document
    .querySelector("#battery_container")
    .addEventListener("animationend", batteryRestart);

  // Add points
  incrementPoints();
}

function batteryRestart() {
  console.log("Battery restart");
  // Remove addEventListener
  document
    .querySelector("#battery_container")
    .removeEventListener("animationend", batteryRestart);

  // Remove pause and disappear animation
  document.querySelector("#battery_sprite").classList.remove("zoom_out_rotate");
  document.querySelector("#battery_container").classList.remove("paused");

  // Restart animation
  document.querySelector("#battery_container").classList.remove("rotate");
  document.querySelector("#battery_container").offsetHeight;
  document.querySelector("#battery_container").classList.add("rotate");

  // Make clickable again
  document
    .querySelector("#battery_container")
    .addEventListener("click", clickBattery);
}

function clickBottle() {
  console.log("Bottle click");
  // Remove addEventListener to avoid double click
  document
    .querySelector("#bottle_container")
    .removeEventListener("click", clickBottle);

  // Pause animation
  document.querySelector("#bottle_container").classList.add("paused");

  // Add disappear animation
  document.querySelector("#bottle_sprite").classList.add("zoom_out_rotate");

  // Restart animation
  document
    .querySelector("#bottle_container")
    .addEventListener("animationend", bottleRestart);

  // Add points
  incrementPoints();
}

function bottleRestart() {
  console.log("Bottle restart");
  // Remove addEventListener
  document
    .querySelector("#bottle_container")
    .removeEventListener("animationend", bottleRestart);

  // Remove pause and disappear animation
  document.querySelector("#bottle_sprite").classList.remove("zoom_out_rotate");
  document.querySelector("#bottle_container").classList.remove("paused");

  // Restart animation
  document.querySelector("#bottle_container").classList.remove("rotate");
  document.querySelector("#bottle_container").offsetHeight;
  document.querySelector("#bottle_container").classList.add("rotate");

  // Make clickable again
  document
    .querySelector("#bottle_container")
    .addEventListener("click", clickBottle);
}

function clickPlastic() {
  console.log("Plastic click");
  // Remove addEventListener to avoid double click
  document
    .querySelector("#plastic_container")
    .removeEventListener("click", clickPlastic);

  // Pause animation
  document.querySelector("#plastic_container").classList.add("paused");

  // Add disappear animation
  document.querySelector("#plastic_sprite").classList.add("zoom_out_rotate");

  // Restart animation
  document
    .querySelector("#plastic_container")
    .addEventListener("animationend", plasticRestart);

  // Add points
  incrementPoints();
}

function plasticRestart() {
  console.log("Bottle restart");
  // Remove addEventListener
  document
    .querySelector("#plastic_container")
    .removeEventListener("animationend", plasticRestart);

  // Remove pause and disappear animation
  document.querySelector("#plastic_sprite").classList.remove("zoom_out_rotate");
  document.querySelector("#plastic_container").classList.remove("paused");

  // Restart animation
  document.querySelector("#plastic_container").classList.remove("rotate");
  document.querySelector("#plastic_container").offsetHeight;
  document.querySelector("#plastic_container").classList.add("rotate");

  // Make clickable again
  document
    .querySelector("#plastic_container")
    .addEventListener("click", clickPlastic);
}

function incrementPoints() {
  console.log("Point added");
  points++;
  displayPoints();
}

function displayPoints() {
  document.querySelector("#score").textContent = points;
}
