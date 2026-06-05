const questions = [
  {
    question: "¿Cuántas islas habitadas componen oficialmente el archipiélago canario?",
    options: ["6", "7", "8", "9"],
    correct: 2,
  },
  {
    question: "¿Cuál es el pico más alto de España, situado en Tenerife?",
    options: ["Mulhacén", "Aneto", "Teide", "Veleta"],
    correct: 2,
  },
  {
    question: "¿Cómo se llama la salsa típica canaria?",
    options: ["Alioli", "Mojo", "Romesco", "Chimichurri"],
    correct: 1,
  },
  {
    question: "¿Qué plato consiste en papas pequeñas arrugadas?",
    options: ["Papas fritas", "Papas al horno", "Papas arrugadas", "Tortilla"],
    correct: 2,
  },
  {
    question: "¿Qué animal está en el escudo de Canarias?",
    options: ["Cabra", "Perro", "Gato", "León"],
    correct: 1,
  },
  {
    question: "¿Cuál es el principal cultivo de exportación?",
    options: ["Naranja", "Plátano", "Mango", "Uva"],
    correct: 1,
  },
  {
    question: "¿Cuándo se celebran los carnavales?",
    options: ["Enero", "Febrero", "Abril", "Junio"],
    correct: 1,
  },
  {
    question: "¿Cuál es la capital de Canarias?",
    options: ["Santa Cruz de Tenerife", "Las Palmas", "Ambas", "Ninguna"],
    correct: 2,
  },
  {
    question: "¿Qué parque nacional volcánico está en Lanzarote?",
    options: ["Teide", "Garajonay", "Timanfaya", "Doñana"],
    correct: 2,
  },
  {
    question: "¿Cómo se llama el silbo tradicional?",
    options: ["Silbo canario", "Silbo gomero", "Silbo atlántico", "Silbo isleño"],
    correct: 1,
  },
];

const state = {
  currentScreen: "screen-welcome",
  questionIndex: 0,
  score: 0,
  answering: false,
};

function showScreen(id) {
  document.querySelectorAll(".screen").forEach((s) => s.classList.remove("active"));
  const screen = document.getElementById(id);
  if (screen) {
    screen.classList.add("active");
  }
  state.currentScreen = id;
}

function goToRobbery() {
  showScreen("screen-robbery");
  document.getElementById("arrow-hint").classList.remove("visible");
}

function showArrowHint() {
  const hint = document.getElementById("arrow-hint");
  hint.classList.add("visible");
}

function goToQuizIntro() {
  showScreen("screen-quiz-intro");
}

function startQuiz() {
  state.questionIndex = 0;
  state.score = 0;
  state.answering = false;
  showScreen("screen-quiz");
  renderQuestion();
}

function renderQuestion() {
  const q = questions[state.questionIndex];
  document.getElementById("question-text").textContent = q.question;
  document.getElementById("quiz-progress").textContent = `${state.questionIndex + 1}/${questions.length}`;

  const container = document.getElementById("options-container");
  container.innerHTML = "";

  q.options.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.textContent = opt;
    btn.dataset.index = i;
    btn.addEventListener("click", () => selectAnswer(i));
    container.appendChild(btn);
  });
}

function selectAnswer(index) {
  if (state.answering) return;
  state.answering = true;

  const q = questions[state.questionIndex];
  const btns = document.querySelectorAll(".option-btn");

  btns.forEach((btn, i) => {
    btn.style.pointerEvents = "none";
    if (i === q.correct) {
      btn.classList.add("correct");
    } else if (i === index && i !== q.correct) {
      btn.classList.add("incorrect");
    }
  });

  if (index === q.correct) {
    state.score++;
  }

  setTimeout(() => {
    const next = state.questionIndex + 1;
    if (next < questions.length) {
      state.questionIndex = next;
      renderQuestion();
      state.answering = false;
    } else {
      showResult();
    }
  }, 900);
}

function showResult() {
  showScreen("screen-result");
  document.getElementById("result-text").textContent = `sacaste ${state.score}/${questions.length}`;
}

function showFinalScreen() {
  const msg = state.score >= 5
    ? "ser linda e inteligente es algo que no todo el mundo consigue amiga... cuidado que salió el sol y te vas a derretir, bombona."
    : "bueno... no todo el mundo puede ser perfecta. al menos sos linda.";
  document.getElementById("final-message").textContent = msg;
  showScreen("screen-final");
}

function restart() {
  state.questionIndex = 0;
  state.score = 0;
  state.answering = false;
  showScreen("screen-welcome");
}

document.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-action]");
  if (!btn) return;
  const action = btn.dataset.action;
  switch (action) {
    case "go-robbery":
      goToRobbery();
      break;
    case "show-arrow":
      showArrowHint();
      break;
    case "go-quiz-intro":
      goToQuizIntro();
      break;
    case "start-quiz":
      startQuiz();
      break;
    case "show-final":
      showFinalScreen();
      break;
    case "restart":
      restart();
      break;
  }
});
