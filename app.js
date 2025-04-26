import { preguntas } from './menu.js';

let availableQuestions = [...preguntas];
let correct = 0;
let total = 0;
let currentQuestion = null;

const questionDiv = document.getElementById("question");
const answerDiv = document.getElementById("answer");
const showAnswerBtn = document.getElementById("show-answer");
const correctAnswerBtn = document.getElementById("correct-answer");
const nextQuestionBtn = document.getElementById("next-question");
const statsDiv = document.getElementById("stats");
const restartBtn = document.getElementById("restart");
const correctSound = document.getElementById("correct-sound");
const finishSound = document.getElementById("finish-sound");

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function pickQuestion() {
  if (availableQuestions.length === 0) {
    questionDiv.innerText = "🎉 ¡Quiz terminado!";
    answerDiv.style.display = "none";
    showAnswerBtn.style.display = "none";
    correctAnswerBtn.style.display = "none";
    nextQuestionBtn.style.display = "none";
    restartBtn.style.display = "inline-block";
    finishSound.play();
    return;
  }
  answerDiv.style.display = "none";
  currentQuestion = availableQuestions.pop();
  questionDiv.innerText = `¿Qué significa: ${currentQuestion.pregunta}?`;
}

function showAnswer() {
  answerDiv.innerText = currentQuestion.respuesta;
  answerDiv.style.display = "block";
}

function correctAnswer() {
  correct++;
  total++;
  correctSound.play();
  updateStats();
  pickQuestion();
}

function nextWithoutCorrect() {
  total++;
  updateStats();
  pickQuestion();
}

function updateStats() {
  const percentage = total === 0 ? 0 : Math.round((correct / total) * 100);
  statsDiv.innerText = `Correctas: ${correct} | Total: ${total} | Puntaje: ${percentage}%`;
}

function restartQuiz() {
  availableQuestions = shuffle([...preguntas]);
  correct = 0;
  total = 0;
  updateStats();
  restartBtn.style.display = "none";
  showAnswerBtn.style.display = "inline-block";
  correctAnswerBtn.style.display = "inline-block";
  nextQuestionBtn.style.display = "inline-block";
  pickQuestion();
}

showAnswerBtn.addEventListener("click", showAnswer);
correctAnswerBtn.addEventListener("click", correctAnswer);
nextQuestionBtn.addEventListener("click", nextWithoutCorrect);
restartBtn.addEventListener("click", restartQuiz);

availableQuestions = shuffle([...preguntas]);
pickQuestion();