
let currentPage = 0;
const questionsPerPage = 5;
const totalQuestions = 20;
const correctAnswers = [
    "John McCarthy", 
    "Python", 
    ["Supervised Learning", "Unsupervised Learning", "Reinforcement Learning", "Semi-supervised Learning"],
    "Natural Language Processing", 
    "To determine if a machine exhibits human-like intelligence", 
    "K-Means", 
    ["TensorFlow", "PyTorch", "Keras"],
    "Support Vector Machine",
    "MNIST", 
    "RNN", 
    ["ReLU", "Sigmoid", "Tanh"], 
    "JavaScript",
    "Application Programming Interface", 
    "Stack", 
    ["MongoDB", "CouchDB"], 
    "Cascading Style Sheets", 
    "To structure web content", 
    "HTTPS",
    ["Phishing", "SQL Injection", "DDoS"],
    "Graphical Processing Unit" 
];

function startQuiz() {
    const userName = document.getElementById("userName").value;
    if (userName.trim() === "") {
        alert("Please enter your name.");
        return;
    }
    document.querySelector(".homepage").style.display = "none";
    document.getElementById("quizContainer").style.display = "block";
    showPage(0);
    startTimer();
}

function showPage(pageNumber) {
    const questionsContainer = document.getElementById("questionsContainer");
    const questions = questionsContainer.getElementsByClassName("question");
    const totalPages = Math.ceil(questions.length / questionsPerPage);

    for (let i = 0; i < questions.length; i++) {
        questions[i].style.display = (i >= pageNumber * questionsPerPage && i < (pageNumber + 1) * questionsPerPage) ? "block" : "none";
    }

    document.getElementById("prevBtn").style.display = pageNumber === 0 ? "none" : "inline-block";
    document.getElementById("nextBtn").style.display = pageNumber === totalPages - 1 ? "none" : "inline-block";
    document.getElementById("submitBtn").style.display = pageNumber === totalPages - 1 ? "inline-block" : "none";

    currentPage = pageNumber;
}

function changePage(direction) {
    if ((direction === -1 && currentPage > 0) || (direction === 1 && (currentPage + 1) * questionsPerPage < totalQuestions)) {
        showPage(currentPage + direction);
    }
}

function submitQuiz() {
    const questionsContainer = document.getElementById("questionsContainer");
    const questions = questionsContainer.getElementsByClassName("question");
    let score = 0;
    let detailedResults = '';

    for (let i = 0; i < questions.length; i++) {
        const userAnswer = getUserAnswer(i);
        const isCorrect = checkAnswer(i, userAnswer);

        detailedResults += `<p>Question ${i + 1}: ${isCorrect ? 'Correct' : 'Incorrect'}</p>`;

        if (isCorrect) {
            score++;
        }
    }

    document.getElementById("score").innerText = `Your score is ${score} out of ${totalQuestions}`;
    document.getElementById("detailedResults").innerHTML = detailedResults;

    document.getElementById("quizContainer").style.display = "none";
    document.getElementById("resultPopup").style.display = "block";
}

function getUserAnswer(questionIndex) {
    const questionElement = document.getElementsByName(`question${questionIndex}`);
    let userAnswer = null;

    if (questionElement[0].type === 'radio' || questionElement[0].type === 'checkbox') {
        userAnswer = [];
        for (let j = 0; j < questionElement.length; j++) {
            if (questionElement[j].checked) {
                userAnswer.push(questionElement[j].value);
            }
        }
    } else if (questionElement[0].type === 'select-one') {
        userAnswer = questionElement[0].value;
    } else {
        userAnswer = questionElement[0].value.trim();
    }

    return userAnswer;
}

function checkAnswer(questionIndex, userAnswer) {
    const correctAnswer = correctAnswers[questionIndex];

    if (Array.isArray(correctAnswer)) {
        if (!Array.isArray(userAnswer)) return false;
        userAnswer.sort();
        correctAnswer.sort();
        return JSON.stringify(userAnswer) === JSON.stringify(correctAnswer);
    } else {
        return userAnswer === correctAnswer;
    }
}

function returnToHomepage() {
    document.getElementById("resultPopup").style.display = "none";
    document.querySelector(".homepage").style.display = "block";
}

function startTimer() {
    let timeLeft = 300;
    const timerElement = document.getElementById("timer");

    const timer = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timer);
            submitQuiz();
        } else {
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            timerElement.innerText = `Time Remaining: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
            timeLeft--;
        }
    }, 1000);
}
