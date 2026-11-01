console.log("script.js connected!");

// 1. Notebook for the answers, e.g. { "1": 3, "2": 4, "3": 2, "4": 4 }
let userAnswers = {};

// 2. Select every question block
let questionBlocks = document.querySelectorAll(".question-block");

// 3. For each question, listen for clicks on ITS buttons
questionBlocks.forEach(function (block) {
  let answerButtons = block.querySelectorAll(".answer-btn");

  answerButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      // Remove highlight from all buttons in this question
      answerButtons.forEach(function (btn) {
        btn.classList.remove("selected");
      });

      // Highlight the clicked one
      button.classList.add("selected");

      // Read the data-* attributes
      let questionNumber = block.dataset.question;   // "1", "2", ...
      let answerLetter = button.dataset.answer;      // "A", "B", ...
      let points = Number(button.dataset.points);    // "3" -> 3

      // Save (re-clicking the same question overwrites it)
      userAnswers[questionNumber] = points;

      console.log("Question " + questionNumber + ": " + answerLetter + " (" + points + " pts)");
      console.log(userAnswers);
    });
  });
});

// 4. Add up the points
function calculateScore() {
  let total = 0;
  for (let question in userAnswers) {
    total = total + userAnswers[question];
  }
  return total;
}

// 5. Turn the score (4 to 16) into a dog breed
function getResult(score) {
  if (score <= 6) {
    return { breed: "Bulldog", emoji: "🐶", description: "Chill, cozy, and proud of it. A good nap fixes almost everything." };
  } else if (score <= 9) {
    return { breed: "Golden Retriever", emoji: "🦮", description: "Friendly, loyal, and everyone's favorite. You make people feel welcome." };
  } else if (score <= 12) {
    return { breed: "Siberian Husky", emoji: "🐺", description: "Adventurous and full of energy. Always ready for the next wild idea." };
  } else {
    return { breed: "German Shepherd", emoji: "🐕‍🦺", description: "Smart, focused, and a natural leader. People count on you." };
  }
}

// 6. Show the result on the page
function displayResult() {
  let resultContainer = document.getElementById("result-container");
  let resultText = document.getElementById("result-text");

  // The starter hides the box with display: none, so show it
  resultContainer.style.display = "block";

  // Make sure every question is answered
  let answeredCount = Object.keys(userAnswers).length;
  if (answeredCount < questionBlocks.length) {
    resultText.innerHTML = `<span class="text-danger fw-bold">Please answer all ${questionBlocks.length} questions first! (You've answered ${answeredCount}.)</span>`;
    return;
  }

  let score = calculateScore();
  let result = getResult(score);
  console.log("Total score: " + score + " -> " + result.breed);

  resultText.innerHTML = `
    <span class="result-emoji">${result.emoji}</span>
    <strong>You're a ${result.breed}!</strong><br>
    ${result.description}<br>
    <small class="text-muted">Your score: ${score} / 16</small>
  `;
}

// 7. Connect the "Show Results" button
let showResultButton = document.getElementById("show-result");
showResultButton.addEventListener("click", displayResult);