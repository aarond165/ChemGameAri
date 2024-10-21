// Function to start the game, redirects to game.html
function startGame() {
    window.location.href = "game.html";
}

// Add quiz game logic here for game.html
document.addEventListener('DOMContentLoaded', function() {
    // Logic for displaying questions, tracking level, etc.
});


let currentLevel = 1;
let currentQuestion = 0;

let levels = {
  1: {
    title: "Level 1: Early Atomic Theory",
    questions: [
      {
        question: "Who first proposed the concept of the atom?",
        options: ["Democritus", "Aristotle", "Plato", "Socrates"],
        correct: 0,
        hint: "He believed atoms were indivisible and indestructible.",
        image: "democritus.png"
      },
      {
        question: "Which scientist formulated the law of conservation of mass?",
        options: ["Antoine Lavoisier", "John Dalton", "Ernest Rutherford", "Niels Bohr"],
        correct: 0,
        hint: "He is known as the father of modern chemistry.",
        image: "lavoisier.png"
      },
      {
        question: "Who proposed the atomic theory that atoms of a given element are identical?",
        options: ["John Dalton", "J.J. Thomson", "Max Planck", "Marie Curie"],
        correct: 0,
        hint: "He also created the first table of atomic weights.",
        image: "dalton.png"
      }
    ]
  },
  2: {
    title: "Level 2: Discoveries about Subatomic Particles",
    questions: [
      {
        question: "Who discovered the electron?",
        options: ["Niels Bohr", "J.J. Thomson", "Ernest Rutherford", "James Chadwick"],
        correct: 1,
        hint: "Used a cathode ray tube to find this negatively charged particle.",
        image: "thomson.png"
      },
      {
        question: "Which one has a positive charge?",
        options: ["Neutron", "Electron", "Proton", "Ari Chavez"],
        correct: 2,
        hint: "Think of what’s in the nucleus of an atom.",
        image: "proton.png"
      },
      {
        question: "What is the charge of the cathode ray?",
        options: ["Positive", "Negative", "Neutral", "None of the above"],
        correct: 1,
        hint: "Cathode rays bend toward a positively charged plate.",
        image: "cathode-ray.png"
      }
    ]
  }
};

function loadLevel() {
  const levelTitle = document.getElementById('level-title');
  levelTitle.innerText = levels[currentLevel].title;
  loadQuestion();
}

function loadQuestion() {
  const questionElement = document.getElementById("question");
  const hintElement = document.getElementById("hint");
  const optionsElement = document.getElementById("options");
  const imageContainer = document.getElementById("image-container");
  const nextBtn = document.getElementById("next-btn");

  // Display question
  let questionData = levels[currentLevel].questions[currentQuestion];
  questionElement.innerHTML = questionData.question;
  hintElement.innerHTML = "Hint: " + questionData.hint;

  // Clear previous options
  optionsElement.innerHTML = '';

  // Display options
  questionData.options.forEach((option, index) => {
    let optionDiv = document.createElement("div");
    optionDiv.classList.add("option");
    optionDiv.innerHTML = option;
    optionDiv.onclick = () => checkAnswer(index, questionData.correct, questionData.image);
    optionsElement.appendChild(optionDiv);
  });

  // Hide the next button initially
  nextBtn.style.display = 'none';
}

function checkAnswer(selected, correct, image) {
  const options = document.querySelectorAll('.option');
  const imageContainer = document.getElementById('image-container');
  options.forEach((option, index) => {
    if (index === correct) {
      option.classList.add('correct');
      imageContainer.innerHTML = `<img src="${image}" alt="Correct Answer Image">`;
    } else if (index === selected) {
      option.classList.add('wrong');
    }
    option.onclick = null; // Disable further clicks
  });

  document.getElementById('next-btn').style.display = 'inline-block';
}

function loadNextQuestion() {
  currentQuestion++;
  if (currentQuestion < levels[currentLevel].questions.length) {
    loadQuestion();
  } else {
    currentLevel++;
    if (currentLevel <= 2) {
      currentQuestion = 0;
      loadLevel();
    } else {
      displayEndMessage();
    }
  }
}

function displayEndMessage() {
  const questionElement = document.getElementById("question");
  const optionsElement = document.getElementById("options");
  const imageContainer = document.getElementById("image-container");
  const nextBtn = document.getElementById("next-btn");

  questionElement.innerHTML = "Congratulations! You've completed the game.";
  optionsElement.innerHTML = '';
  imageContainer.innerHTML = '';
  nextBtn.style.display = 'none';
}

// Initialize the game
loadLevel();
