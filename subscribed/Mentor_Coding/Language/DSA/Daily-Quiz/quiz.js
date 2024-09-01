document.addEventListener('DOMContentLoaded', function () {
    const quizContainer = document.getElementById('quizContainer');
    const quizQuestion = document.getElementById('quizQuestion');
    const optionsContainer = document.getElementById('optionsContainer');
    const submitQuizButton = document.getElementById('submitQuiz');
    const pointsDisplay = document.getElementById('pointsDisplay');
    const downloadCertificateButton = document.getElementById('downloadCertificate');
    const certificatePopup = document.getElementById('certificatePopup');
    const nameInput = document.getElementById('nameInput');
    const mentorIdInput = document.getElementById('mentorIdInput');
    const notEnoughPointsPopup = document.getElementById('notEnoughPointsPopup');
    const notEnoughPointsMessage = document.getElementById('notEnoughPointsMessage');
    const closeNotEnoughPointsPopup = document.getElementById('closeNotEnoughPointsPopup');
    const timerElement = document.getElementById('timer');

    const quizData = [
        { question: "What does HTML stand for?", options: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language", "Hyperlinking Text Marking Language"], correctAnswer: 0 },
        { question: "Who is making the Web standards?", options: ["Mozilla", "Microsoft", "Apple", "The World Wide Web Consortium"], correctAnswer: 3 },
        { question: "Choose the correct HTML element for the largest heading:", options: ["<head>", "<h6>", "<h1>", "<heading>"], correctAnswer: 2 },
        { question: "What is the correct HTML element for inserting a line break?", options: ["<break>", "<lb>", "<br>", "<line>"], correctAnswer: 2 },
        { question: "What is the correct HTML for adding a background color?", options: ["<background>yellow</background>", "<body bg='yellow'>", "<body style='background-color:yellow;'>", "<body background='yellow'>"], correctAnswer: 2 },
        { question: "Choose the correct HTML element to define important text", options: ["<strong>", "<b>", "<i>", "<important>"], correctAnswer: 0 },
        { question: "How can you make a numbered list?", options: ["<ul>", "<list>", "<ol>", "<dl>"], correctAnswer: 2 },
        { question: "How can you make a bulleted list?", options: ["<list>", "<ol>", "<ul>", "<dl>"], correctAnswer: 2 },
        { question: "What is the correct HTML for making a checkbox?", options: ["<check>", "<checkbox>", "<input type='checkbox'>", "<input type='check'>"], correctAnswer: 2 },
        { question: "What is the correct HTML for making a text input field?", options: ["<input type='textfield'>", "<textinput>", "<input type='text'>", "<textinput type='text'>"], correctAnswer: 2 },
    ];

    const maxQuestions = 10;
    const pointsForCorrectAnswer = 4;
    const pointsForIncorrectAnswer = -1;
    const quizDuration = 40000; // 40 seconds
    const quizCooldown = 86400000; // 24 hours

    function getLocalStoragePoints() {
        return parseInt(localStorage.getItem('quizPoints') || '0', 10);
    }

    function setLocalStoragePoints(points) {
        localStorage.setItem('quizPoints', points);
    }

    function getLocalStorageQuizTimestamp() {
        return parseInt(localStorage.getItem('quizTimestamp') || '0', 10);
    }

    function setLocalStorageQuizTimestamp(timestamp) {
        localStorage.setItem('quizTimestamp', timestamp);
    }

    function disableQuiz() {
        quizContainer.classList.add('disabled');
        submitQuizButton.disabled = true;
    }

    function enableQuiz() {
        quizContainer.classList.remove('disabled');
        submitQuizButton.disabled = false;
    }

    function initializeQuiz() {
        const lastQuizTimestamp = getLocalStorageQuizTimestamp();
        const now = Date.now();

        if (now - lastQuizTimestamp >= quizCooldown) {
            enableQuiz();
            setLocalStorageQuizTimestamp(now);

            const randomIndex = Math.floor(Math.random() * maxQuestions);
            const currentQuiz = quizData[randomIndex];
            quizQuestion.textContent = currentQuiz.question;
            optionsContainer.innerHTML = '';
            currentQuiz.options.forEach((option, index) => {
                const optionButton = document.createElement('button');
                optionButton.className = 'w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded';
                optionButton.textContent = option;
                optionButton.addEventListener('click', () => handleOptionClick(index, currentQuiz.correctAnswer));
                optionsContainer.appendChild(optionButton);
            });

            startTimer(quizDuration);
        } else {
            disableQuiz();
        }
    }

    function handleOptionClick(selectedIndex, correctAnswerIndex) {
        let points = getLocalStoragePoints();

        if (selectedIndex === correctAnswerIndex) {
            points += pointsForCorrectAnswer;
        } else {
            points += pointsForIncorrectAnswer;
        }

        setLocalStoragePoints(points);
        pointsDisplay.textContent = points;
        disableQuiz();
    }

    function startTimer(duration) {
        let timeRemaining = duration / 1000;
        const timerInterval = setInterval(() => {
            timeRemaining--;
            timerElement.textContent = `Time Left: ${timeRemaining}s`;

            if (timeRemaining <= 0) {
                clearInterval(timerInterval);
                disableQuiz();
            }
        }, 1000);
    }

    downloadCertificateButton.addEventListener('click', () => {
        const points = getLocalStoragePoints();
        if (points >= 100) {
            certificatePopup.classList.add('show');
        } else {
            notEnoughPointsMessage.textContent = `You have not enough points to download the certificate. You need ${100 - points} more points.`;
            notEnoughPointsPopup.classList.add('show');
        }
    });

    certificatePopup.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = nameInput.value.trim();
        const mentorId = mentorIdInput.value.trim();
        if (name && mentorId) {
            const certificateUrl = `https://example.com/certificate?name=${encodeURIComponent(name)}&mentorId=${encodeURIComponent(mentorId)}`;
            window.open(certificateUrl, '_blank');
            certificatePopup.classList.remove('show');
        }
    });

    closeNotEnoughPointsPopup.addEventListener('click', () => {
        notEnoughPointsPopup.classList.remove('show');
    });

    pointsDisplay.textContent = getLocalStoragePoints();
    initializeQuiz();
});