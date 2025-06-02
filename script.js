let currentQuestionIndex = 0;
let questions = [];
let selected = false;

fetch('questions.json')
  .then(response => response.json())
  .then(data => {
    questions = data;
    shuffleArray(questions);
    showQuestion();
  });

function showQuestion() {
  selected = false;
  const questionElement = document.getElementById('question');
  const optionsElement = document.getElementById('options');
  const currentQuestion = questions[currentQuestionIndex];
  questionElement.innerText = `${currentQuestionIndex + 1}. ${currentQuestion.question}`;

  const shuffledOptions = [...currentQuestion.options];
  shuffleArray(shuffledOptions);

  optionsElement.innerHTML = '';
  shuffledOptions.forEach(option => {
    const button = document.createElement('button');
    button.innerText = option;
    button.classList.add('option-btn');
    button.onclick = () => {
      if (selected) return;
      selected = true;
      if (option === currentQuestion.correct_answer) {
        button.classList.add('correct');
      } else {
        button.classList.add('wrong');
        const correctButton = [...optionsElement.children].find(
          btn => btn.innerText === currentQuestion.correct_answer
        );
        correctButton.classList.add('correct');
      }
    };
    optionsElement.appendChild(button);
  });
}

document.getElementById('next-btn').addEventListener('click', () => {
  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++;
    showQuestion();
  } else {
    window.location.href = "result.html"; // Тест аяқталған соң нәтиже бетіне өтеді
  }
});

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
