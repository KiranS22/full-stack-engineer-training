let questions = [
  {
    question: "What is the name of the Greek goddess of the earth?",
    choice1: "Gaea",
    choice2: "Hera",
    choice3: "Aphrodite",
    choice4: "Demeter",
    answer: 1,
  },
  {
    question: "Which Greek goddess in known as the goddess of chance?",
    choice1: "Atropos",
    choice2: "Hera",
    choice3: "Aphrodite",
    choice4: "Tyche",
    answer: 4,
  },
  {
    question: "In Greek mythology who shaped and formed the dreams?",
    choice1: "Cybele",
    choice2: "Eunostus",
    choice3: "Morpheus",
    choice4: "Dryades",
    answer: 3,
  },
  {
    question:
      "The name of which Greek goddess means youth or in the prime life?",
    choice1: "Harmonia",
    choice2: "Athena",
    choice3: "Hebe",
    choice4: "Hestia",
    answer: 3,
  },
  {
    question: "Which Greek goddess is considered the queen of gods?",
    choice1: "Ananke",
    choice2: "Athena",
    choice3: "Nemesis",
    choice4: "Hera",
    answer: 4,
  },
  {
    question: "How long did the Trojan War last?",
    choice1: "35 years",
    choice2: "40 years",
    choice3: "10 years",
    choice4: "15 years",
    answer: 3,
  },
  {
    question: "What is the staff carried by Hermes called?",
    choice1: "Hammer",
    choice2: "Bow",
    choice3: "Trident",
    choice4: "Caduceus",
    answer: 4,
  },
  {
    question:
      "How many heads did Cerberus, the guards of the underworld, have?",
    choice1: "3",
    choice2: "2",
    choice3: "4",
    choice4: "12",
    answer: 1,
  },
  {
    question: "Who fell in love with his reflection?",
    choice1: "Narcissus",
    choice2: "Cladeus",
    choice3: "Pan",
    choice4: "Hestia",
    answer: 1,
  },
  {
    question: "Who is the Greek god of love?",
    choice1: "Thaumas",
    choice2: "Pontos",
    choice3: "Eros",
    choice4: "Phorcys",
    answer: 3,
  },
];
let points = 0;
let questionCount = 0;
let questionIndex = 0;
const questionContainer = document.querySelector(".question");
let nextQuestion = questions[questionIndex];
const choicesArray = Array.from(document.querySelectorAll("button"));
let nextQuequestionObj = {};

const startGame = () => {
  getNextQuestion();
};
const getNextQuestion = () => {
  if (questionCount >= questions.length) {
    endGame();
    return;
  }
  nextQuequestionObj = questions[questionIndex];
  questionContainer.innerHTML = nextQuequestionObj.question;
  choicesArray.forEach((choice) => {
    choice.innerHTML = nextQuequestionObj["choice" + choice.dataset.choice];
  });
};

function endGame() {
  let gameContainer = document.querySelector(".gameContainer");
  gameContainer.innerHTML = `<div class='end'><h2>${points} </h2> <a href="./index.html">Play Again</a></div>`;
}

choicesArray.forEach((button) => {
  button.addEventListener("click", (e) => {
    let correctAnswer = nextQuequestionObj.answer;
    let selectedAnswer = e.target.dataset.choice;
    let userResponse;
    correctAnswer == selectedAnswer
      ? ((userResponse = "correct"), (points += 10))
      : ((userResponse = "incorrect"), (points += 0));
    questionCount++;
    console.log(questionCount);

    document.querySelector(".points").innerHTML = `<span>${points}<span>`;

    e.target.classList.add(userResponse);
    questionIndex++;

    setTimeout(() => {
      e.target.classList.remove(userResponse);

      getNextQuestion();
    }, 1000);
  });
});
startGame();

// Loop through the questions array
///hen it comes to the first object displa uestion

// underneath display choices
// onClick... if the user oics the button matching answer value that is the right answer. anything else is incorect
// if the index in the array is not found call popUp
