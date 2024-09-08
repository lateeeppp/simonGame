"use strict";

let level = 0;
let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let playerPattern = [];
let alive = true;

function playSound(e) {
  switch (e) {
    case "blue":
      const blueSound = new Audio("./sounds/blue.mp3");
      blueSound.play();
      break;
    case "green":
      const greenSound = new Audio("./sounds/green.mp3");
      greenSound.play();
      break;
    case "red":
      const redSound = new Audio("./sounds/red.mp3");
      redSound.play();
      break;
    case "yellow":
      const yellowSound = new Audio("./sounds/yellow.mp3");
      yellowSound.play();
      break;
    default:
      const wrongSound = new Audio("./sounds/wrong.mp3");
      wrongSound.play();
      break;
  }
}

function handlePlayerClick() {
  for (let i = 0; i < level; i++) {
    $(".btn").click(function () {
      const playerColour = $(this).attr("id");
      $(`.${playerColour}`).addClass("pressed");
      playSound(playerColour);

      playerPattern.push(playerColour);
      console.log(playerPattern);

      setTimeout(() => {
        $(`.${playerColour}`).removeClass("pressed");
      }, 500);

      // cheackAnswer(level);
    });
  }
}

function cheackAnswer(level) {
  // Check Pattern
  if (
    playerPattern[playerPattern.length - level] !=
    gamePattern[playerPattern.length - level]
  ) {
    $("#level-title").text(`Game Over`);
    alive = false;
    playerPattern = [];
  }
  nextLevel();
}
function gamePatternColours() {
  const nameButton = gamePattern[gamePattern.length - 1];
  setTimeout(() => {
    $(`.${nameButton}`).addClass("pressed");
    playSound(nameButton);
  }, 500);
  setTimeout(() => {
    $(`.${nameButton}`).removeClass("pressed");
  }, 1500);
}

function nextLevel() {
  level++;
  $("#level-title").text(`Level ${level}`);

  // Random Number for random button
  let randomNumber = Math.random() * 4;
  randomNumber = Math.floor(randomNumber);

  gamePattern.push(buttonColours[randomNumber]);
  console.log(gamePattern);
}

$(".start").click(function () {
  nextLevel();
  gamePatternColours();
  handlePlayerClick();
});

// Algoritma
// Buat Angka random untuk warna random
// Warna random muncul setiap kali naik level
// Jika baru mulai, maka ke level 1
// jalankan fungsi muncul warna sesuai pattern game
// cek apakah pattern player sama dengan pattern game
// jika sama, maka level++
// lalu tambahkan warna random di akhir pattern game
// cek lagi apakah pattern player == pattern game
// jika beda, maka restart level dari 0
