let currentQuestionIndex = 0;
let questions = [];
let score=0;
let longeststreak=0;
let currentstreak=0;

async function loadQuestions(jsonFile) {
  try {
    const response = await fetch(jsonFile); //subs in selected json on page
    if (!response.ok) throw new Error('Failed to load questions'); //i beg this never happens 
    questions = await response.json(); //questions is the array in the json


    currentQuestionIndex = 0;
    score = 0;
    currentstreak = 0;
    longeststreak = 0;

    renderQuizUI()
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
    document.getElementById('quiz-container').innerHTML = `<h2> Quiz Completed! You got ${score}, with a longest streak of ${longeststreak}</h2>`; 
    return;
  } 

  questionEl.textContent = currentQuestion.question;
  inputEl.value = '';
  inputEl.focus();
}

function checkAnswer() {
  const inputEl = document.getElementById('answer-input');
  const userAnswer = inputEl.value.trim();
  for(const answer of questions[currentQuestionIndex].answers) {
    if (userAnswer===answer)
  
  }
  //const correctAnswer = questions[currentQuestionIndex].answers;
  console.log(correctAnswer);
  if (userAnswer.toLowerCase() === String.prototype.toLowerCase.call(correctAnswer)) {
    score++
    currentstreak++
    alert('✅ Correct!');
    if (currentstreak>longeststreak) {
      longeststreak=currentstreak
    }
  } else {
    alert(`❌ Wrong! The correct answer was: ${correctAnswer}`);
    currentstreak=0
  }
  if (userAnswer === '') {
    return alert('Please answer');
  }

  currentQuestionIndex++;
  showQuestion();
}

document.getElementById('answer-input').addEventListener('keydown', function(e) {
  if (e.key === 'Enter') {
    checkAnswer();
  }
});

document.getElementById('load-quiz-btn').addEventListener('click', () => {
  const selectedFile = document.getElementById('quiz-select').value;
  loadQuestions(selectedFile); 
});

function renderQuizUI() {
  document.getElementById('quiz-container').innerHTML = `
    <div id="question" class="question"></div>
    <input type="text" id="answer-input" placeholder="Type your answer here" />
  `;
  document.getElementById('answer-input').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
      checkAnswer();
    }
  });
}
