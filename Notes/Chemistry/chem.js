let currentQuestionIndex = 0;
let questions = [];

async function loadQuestions(jsonFile) {
  try {
    const response = await fetch(jsonFile);
    if (!response.ok) throw new Error('Failed to load questions');
    questions = await response.json();
    currentQuestionIndex = 0;
    showQuestion();
  } catch (error) {
    console.error('Error loading questions:', error);
    document.getElementById('quiz-container').innerHTML = '<p>⚠️ Could not load questions.</p>';
  }
}

function showQuestion() {
  const questionEl = document.getElementById('question');
  const inputEl = document.getElementById('answer-input');
  const currentQuestion = questions[currentQuestionIndex];

  if (!currentQuestion) {
    document.getElementById('quiz-container').innerHTML = '<h2>🎉 Quiz Completed!</h2>';
    return;
  }

  questionEl.textContent = currentQuestion.question;
  inputEl.value = '';
  inputEl.focus();
}

function checkAnswer() {
  const inputEl = document.getElementById('answer-input');
  const userAnswer = inputEl.value.trim();
  const correctAnswer = questions[currentQuestionIndex].answer;

  if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
    alert('✅ Correct!');
  } else {
    alert(`❌ Wrong! The correct answer was: ${correctAnswer}`);
  }

  currentQuestionIndex++;
  showQuestion();
}

// Press Enter to submit
document.getElementById('answer-input').addEventListener('keydown', function(e) {
  if (e.key === 'Enter') {
    checkAnswer();
  }
});

// Load quiz button
document.getElementById('load-quiz-btn').addEventListener('click', () => {
  const selectedFile = document.getElementById('quiz-select').value;
  loadQuestions(selectedFile);  // Pass the selected JSON file to loadQuestions
});
