const validCredentials = {
    'MLT840529': '20030625',
    'MLT852478': '20040815'
};

const questions = [
    {
        question: "What does HTML stand for?",
        options: ["Hyper Text Markup Language", "High Tech Modern Language", "Hyperlink and Text Markup Language", "Home Tool Markup Language"],
        correctAnswer: 0
    },
    {
        question: "Which tag is used to define an unordered list in HTML?",
        options: ["<ol>", "<li>", "<ul>", "<list>"],
        correctAnswer: 2
    },
    {
        question: "What is the correct HTML element for inserting a line break?",
        options: ["<lb>", "<break>", "<br>", "<newline>"],
        correctAnswer: 2
    },
    {
        question: "Which attribute is used to specify an alternate text for an image?",
        options: ["alt", "title", "src", "description"],
        correctAnswer: 0
    },
    {
        question: "What is the correct HTML for creating a hyperlink?",
        options: ["<a url='http://www.example.com'>Example</a>", "<a href='http://www.example.com'>Example</a>", "<a>http://www.example.com</a>", "<hyperlink>http://www.example.com</hyperlink>"],
        correctAnswer: 1
    },
    {
        question: "Which HTML element is used to define important text?",
        options: ["<important>", "<b>", "<strong>", "<i>"],
        correctAnswer: 2
    },
    {
        question: "What is the correct HTML for inserting an image?",
        options: ["<img href='image.gif' alt='MyImage'>", "<img src='image.gif' alt='MyImage'>", "<image src='image.gif' alt='MyImage'>", "<img>image.gif</img>"],
        correctAnswer: 1
    },
    {
        question: "Which HTML attribute specifies an inline style for an element?",
        options: ["class", "style", "font", "styles"],
        correctAnswer: 1
    },
    {
        question: "What is the correct HTML for making a checkbox?",
        options: ["<input type='check'>", "<check>", "<checkbox>", "<input type='checkbox'>"],
        correctAnswer: 3
    },
    {
        question: "Which HTML element defines the title of a document?",
        options: ["<meta>", "<head>", "<title>", "<header>"],
        correctAnswer: 2
    }
];

let currentQuestion = 0;
let answers = new Array(questions.length).fill(null);
let score = 0;
let timer;

document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const mentorId = document.getElementById('mentorId').value;
    const password = document.getElementById('password').value;

    if (validCredentials[mentorId] === password) {
        document.getElementById('loginPage').classList.add('hidden');
        document.getElementById('testPage').classList.remove('hidden');
        startTest();
    } else {
        document.getElementById('loginError').classList.remove('hidden');
    }
});

function startTest() {
    displayQuestion();
    createQuestionPanel();
    startTimer();
}

function displayQuestion() {
    const question = questions[currentQuestion];
    document.getElementById('questionNumber').textContent = `Question ${currentQuestion + 1}`;
    document.getElementById('questionText').textContent = question.question;
    
    const optionsHtml = question.options.map((option, index) => 
        `<div>
            <input type="radio" id="option${index}" name="answer" value="${index}" ${answers[currentQuestion] === index ? 'checked' : ''}>
            <label for="option${index}">${option}</label>
        </div>`
    ).join('');
    
    document.getElementById('options').innerHTML = optionsHtml;
}

function createQuestionPanel() {
    const panel = document.getElementById('questionPanel');
    for (let i = 0; i < questions.length; i++) {
        const button = document.createElement('button');
        button.textContent = i + 1;
        button.className = 'w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300';
        button.onclick = () => goToQuestion(i);
        panel.appendChild(button);
    }
}

function startTimer() {
    let timeLeft = 40;
    updateTimer(timeLeft);
    timer = setInterval(() => {
        timeLeft--;
        updateTimer(timeLeft);
        if (timeLeft === 0) {
            clearInterval(timer);
            nextQuestion();
        }
    }, 1000);
}

function updateTimer(time) {
    document.getElementById('timer').textContent = `Time left: ${time}s`;
}

function saveAnswer() {
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    if (selectedOption) {
        answers[currentQuestion] = parseInt(selectedOption.value);
    }
}

function nextQuestion() {
    saveAnswer();
    currentQuestion++;
    if (currentQuestion < questions.length) {
        displayQuestion();
        clearInterval(timer);
        startTimer();
    } else {
        showSubmitButton();
    }
}

function goToQuestion(index) {
    if (index !== currentQuestion) {
        saveAnswer();
        currentQuestion = index;
        displayQuestion();
        clearInterval(timer);
        startTimer();
    }
}

function showSubmitButton() {
    document.getElementById('submit').classList.remove('hidden');
}

document.getElementById('saveNext').addEventListener('click', nextQuestion);
document.getElementById('next').addEventListener('click', nextQuestion);
document.getElementById('markReview').addEventListener('click', () => {
    // Implement mark for review functionality
    nextQuestion();
});

document.getElementById('submit').addEventListener('click', submitTest);

function submitTest() {
    clearInterval(timer);
    calculateScore();
    showResults();
}

function calculateScore() {
    score = 0;
    for (let i = 0; i < questions.length; i++) {
        if (answers[i] === questions[i].correctAnswer) {
            score += 4;
        } else if (answers[i] !== null) {
            score -= 1;
        }
    }
}

function showResults() {
    document.getElementById('testPage').classList.add('hidden');
    document.getElementById('resultPage').classList.remove('hidden');
    
    const percentage = (score / 40) * 100;
    let grade;
    if (percentage >= 90) grade = 'A';
    else if (percentage >= 80) grade = 'B';
    else if (percentage >= 70) grade = 'C';
    else if (percentage >= 60) grade = 'D';
    else grade = 'F';

    document.getElementById('obtainedMarks').textContent = score;
    document.getElementById('percentage').textContent = percentage.toFixed(2);
    document.getElementById('grade').textContent = grade;
}