"use strict";

let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let started = false;

function playSound(name) {
  switch (name) {
    case "red":
      let redAudio = new Audio("./sounds/red.mp3");
      redAudio.play();
      break;
    case "blue":
      let blueAudio = new Audio("./sounds/blue.mp3");
      blueAudio.play();
      break;
    case "green":
      let greenAudio = new Audio("./sounds/green.mp3");
      greenAudio.play();
      break;
    case "yellow":
      let yellowAudio = new Audio("./sounds/yellow.mp3");
      yellowAudio.play();
      break;
  }
}

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text(`Level ${level}`);
  let randomNumber = Math.random() * 4;
  randomNumber = Math.floor(randomNumber);

  let randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  $(`#${randomChosenColour}`).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);
}

function handleUserClick() {
  $(".btn").click(function () {
    let userChosenCoulour = $(this).attr("id");

    $(`.${userChosenCoulour}`).addClass("pressed");
    setTimeout(() => {
      $(`.${userChosenCoulour}`).removeClass("pressed");
    }, 100);
    userClickedPattern.push(userChosenCoulour);
    playSound(userChosenCoulour);
    cheackAnswer(userClickedPattern.length - 1);
  });
}

function cheackAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    const wrongAudio = new Audio("./sounds/wrong.mp3");
    wrongAudio.play();

    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
}

function startOver() {
  $("#level-title").text(`Your High Level is ${level - 1}`);
  $(".start").show("fast");
  $(".start a").text("Restart");
  $(".start a").attr("href", "");
  $(".row").hide("fast");
  level = 0;
  gamePattern = [];
  started = false;
}

$(".start").click(function () {
  if (!started) {
    $("#level-title").text("Level" + level);
    nextSequence();
    handleUserClick();
    $(".start").hide("slow");
    started = true;
  }
});
