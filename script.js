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
        image: "democritus.png",
        extraInfo: {
          whenWhere: "Lived around 460–370 BC in Greece.",
          contribution: "First proposed the idea that all matter is made up of small, indivisible particles called atoms.",
          experiment: "Philosophical argument rather than a scientific experiment.",
          interestingFacts: "He was a student of Leucippus, another early atomist."
        }
      },
      {
        question: "Which scientist formulated the law of conservation of mass?",
        options: ["Antoine Lavoisier", "John Dalton", "Ernest Rutherford", "Niels Bohr"],
        correct: 0,
        hint: "He is known as the father of modern chemistry.",
        image: "lavoisier.png",
        extraInfo: {
          whenWhere: "Lived 1743–1794 in France.",
          contribution: "Discovered the law of conservation of mass, which states that mass is neither created nor destroyed in chemical reactions.",
          experiment: "Careful measurements of chemical reactions, including combustion.",
          interestingFacts: "Executed during the French Revolution."
        }
      },
      {
        question: "Who proposed the atomic theory that atoms of a given element are identical?",
        options: ["John Dalton", "J.J. Thomson", "Max Planck", "Marie Curie"],
        correct: 0,
        hint: "He also created the first table of atomic weights.",
        image: "dalton.png",
        extraInfo: {
          whenWhere: "Lived 1766–1844 in England.",
          contribution: "Developed Dalton's Atomic Theory, which proposed that all matter is made of atoms, and atoms of the same element are identical.",
          experiment: "Measured weights of gases and studied chemical reactions.",
          interestingFacts: "Also known for work in color blindness."
        }
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
        image: "thomson.png",
        extraInfo: {
          whenWhere: "Lived 1856–1940 in England.",
          contribution: "Discovered the electron, a negatively charged subatomic particle.",
          experiment: "Conducted experiments with cathode ray tubes.",
          interestingFacts: "Awarded the Nobel Prize in Physics in 1906."
        }
      },
      {
        question: "Which one has a positive charge?",
        options: ["Neutron", "Electron", "Proton", "Ari Chavez"],
        correct: 2,
        hint: "Think of what’s in the nucleus of an atom.",
        image: "proton.png",
        extraInfo: {
          whenWhere: "Proton is part of every atomic nucleus.",
          contribution: "Protons are positively charged particles in the nucleus of an atom.",
          experiment: "Discovered by Ernest Rutherford through his gold foil experiment.",
          interestingFacts: "The word 'proton' comes from the Greek word for 'first'."
        }
      },
      {
        question: "What is the charge of the cathode ray?",
        options: ["Positive", "Negative", "Neutral", "None of the above"],
        correct: 1,
        hint: "Cathode rays bend toward a positively charged plate.",
        image: "cathode-ray.png",
        extraInfo: {
          whenWhere: "Cathode rays were studied in the late 19th century.",
          contribution: "Cathode rays are streams of electrons, which have a negative charge.",
          experiment: "J.J. Thomson used cathode ray tubes to discover the electron.",
          interestingFacts: "The discovery of the electron paved the way for quantum mechanics."
        }
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
  const extraInfoElement = document.getElementById("extra-info");

  // Display question
  let questionData = levels[currentLevel].questions[currentQuestion];
  questionElement.innerHTML = questionData.question;
  hintElement.innerHTML = "Hint: " + questionData.hint;

  // Clear previous options and extra info
  optionsElement.innerHTML = '';
  extraInfoElement.innerHTML = '';

  // Display options
  questionData.options.forEach((option, index) => {
    let optionDiv = document.createElement("div");
    optionDiv.classList.add("option");
    optionDiv.innerHTML = option;
    optionDiv.onclick = () => checkAnswer(index, questionData.correct, questionData.image, questionData.extraInfo);
    optionsElement.appendChild(optionDiv);
  });

  // Hide the next button initially
  nextBtn.style.display = 'none';
}

function checkAnswer(selected, correct, image, extraInfo) {
  const options = document.querySelectorAll('.option');
  const imageContainer = document.getElementById('image-container');
  const extraInfoElement = document.getElementById("extra-info");
  options.forEach((option, index) => {
    if (index === correct) {
      option.classList.add('correct');
      imageContainer.innerHTML = `<img src="${image}" alt="Correct Answer Image">`;

      // Display extra information about the scientist
      extraInfoElement.innerHTML = `
        <strong>When/Where:</strong> ${extraInfo.whenWhere} <br>
        <strong>Contribution:</strong> ${extraInfo.contribution} <br>
        <strong>Experiment:</strong> ${extraInfo.experiment} <br>
        <strong>Interesting Facts:</strong> ${extraInfo.interestingFacts}
      `;
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
