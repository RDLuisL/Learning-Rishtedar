import { preguntas } from './menu.js';

let availableQuestions = [...preguntas];
let correct = 0;
let total = 0;
let currentQuestion = null;

const questionDiv = document.getElementById("question");
const imageContainer = document.getElementById("image-container");
const answerDiv = document.getElementById("answer");
const showAnswerBtn = document.getElementById("show-answer");
const correctAnswerBtn = document.getElementById("correct-answer");
const nextQuestionBtn = document.getElementById("next-question");
const statsDiv = document.getElementById("stats");
const restartBtn = document.getElementById("restart");
const correctSound = document.getElementById("correct-sound");
const wrongSound = document.getElementById("wrong-sound");
const finishSound = document.getElementById("finish-sound");

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function pickQuestion() {
  if (availableQuestions.length === 0) {
    questionDiv.innerText = "🎉 ¡Terminaste el quiz!";
    imageContainer.innerHTML = "";
    finishSound.play();
    restartBtn.style.display = "inline";
    return;
  }

  currentQuestion = availableQuestions.pop();
  questionDiv.innerText = currentQuestion.pregunta;
  answerDiv.innerText = "Respuesta";
  answerDiv.style.display = "none";
  

  if (currentQuestion.imagen && currentQuestion.imagen !== "imagen no disponible") {
    imageContainer.innerHTML = `<img src="${currentQuestion.imagen}" alt="Imagen del plato" style="max-width: 300px; margin: 10px 0;">`;
  } else {
    imageContainer.innerHTML = `<p style="color: gray;">Imagen no disponible</p>`;
  }
}

function showAnswer() {
  if (currentQuestion) {
    answerDiv.innerText = currentQuestion.respuesta;
    answerDiv.style.display = "block";
  }
}


function markCorrect() {
  correct++;
  total++;
  updateStats();
  correctSound.play();
  pickQuestion();
}

function nextQuestion() {
  total++;
  updateStats();
  wrongSound.play(); // ▶️ Reproduce sonido de error
  pickQuestion();
}


function updateStats() {
  const percent = total > 0 ? ((correct / total) * 100).toFixed(0) : 0;
  statsDiv.innerText = `Correctas: ${correct} | Total: ${total} | Puntaje: ${percent}%`;
}

function restartQuiz() {
  correct = 0;
  total = 0;
  availableQuestions = shuffle([...preguntas]);
  restartBtn.style.display = "none";
  updateStats();
  pickQuestion();
}

showAnswerBtn.addEventListener("click", showAnswer);
correctAnswerBtn.addEventListener("click", markCorrect);
nextQuestionBtn.addEventListener("click", nextQuestion);
restartBtn.addEventListener("click", restartQuiz);

restartQuiz();
