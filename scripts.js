let questions = [
    {
        type: "text",
        question: "1. Who is known as the father of Artificial Intelligence?",
        answer: "John McCarthy"
    },
    {
        type: "radio",
        question: "2. Which of the following is a commonly used programming language for AI?",
        options: ["Python", "Java", "C++", "Ruby"],
        answer: "Python"
    },
    {
        type: "checkbox",
        question: "3. Which of the following are types of machine learning? (Select all that apply)",
        options: ["Supervised Learning", "Unsupervised Learning", "Reinforcement Learning", "Semi-supervised Learning"],
        answer: ["Supervised Learning", "Unsupervised Learning", "Reinforcement Learning"]
    },
    {
        type: "dropdown",
        question: "4. What is the full form of NLP?",
        options: ["Natural Logic Processing", "Neural Language Processing","Natural Language Processing", "Natural Learning Process"],
        answer: "Natural Language Processing"
    },
    {
        type: "text",
        question: "5. What is the purpose of a Turing Test?",
        answer: "To determine if a machine can exhibit intelligent behavior equivalent to a human"
    },
    {
        type: "radio",
        question: "6. Which algorithm is used for clustering in Machine Learning?",
        options: ["K-Means", "Decision Tree", "SVM", "Linear Regression"],
        answer: "K-Means"
    },
    {
        type: "checkbox",
        question: "7. Which of the following are deep learning frameworks? (Select all that apply)",
        options: ["TensorFlow", "PyTorch", "SciKit-Learn", "Keras"],
        answer: ["TensorFlow", "PyTorch", "Keras"]
    },
    {
        type: "dropdown",
        question: "8. What does SVM stand for?",
        options: ["Simple Vector Machine", "Sequential Vector Machine","Support Vector Machine", "Structured Vector Machine"],
        answer: "Support Vector Machine"
    },
    {
        type: "text",
        question: "9. Name a common dataset used for image classification.",
        answer: "MNIST"
    },
    {
        type: "radio",
        question: "10. Which of the following is a type of neural network?",
        options: ["RNN", "Random Forest", "Decision Tree", "KNN"],
        answer: "RNN"
    },
    {
        type: "checkbox",
        question: "11. What are some common activation functions in neural networks? (Select all that apply)",
        options: ["ReLU", "Sigmoid", "Tanh", "Step"],
        answer: ["ReLU", "Sigmoid", "Tanh"]
    },
    {
        type: "dropdown",
        question: "12. Which language is primarily used for web development?",
        options: ["Python","JavaScript", "C#", "Ruby"],
        answer: "JavaScript"
    },
    {
        type: "text",
        question: "13. What does API stand for?",
        answer: "Application Programming Interface"
    },
    {
        type: "radio",
        question: "14. Which data structure uses LIFO (Last In, First Out)?",
        options: ["Queue", "Stack", "LinkedList", "Array"],
        answer: "Stack"
    },
    {
        type: "checkbox",
        question: "15. Which of the following are NoSQL databases? (Select all that apply)",
        options: ["MongoDB", "CouchDB", "MySQL", "PostgreSQL"],
        answer: ["MongoDB", "CouchDB"]
    },
    {
        type: "dropdown",
        question: "16. What does CSS stand for?",
        options: ["Creative Style Sheets","Cascading Style Sheets","Computer Style Sheets", "Colorful Style Sheets"],
        answer: "Cascading Style Sheets"
    },
    {
        type: "text",
        question: "17. What is the primary purpose of HTML?",
        answer: "To structure web content"
    },
    {
        type: "radio",
        question: "18. Which protocol is used for secure communication over a computer network?",
        options: ["HTTP", "HTTPS", "FTP", "SMTP"],
        answer: "HTTPS"
    },
    {
        type: "checkbox",
        question: "19. Which of the following are types of cybersecurity attacks? (Select all that apply)",
        options: ["Phishing", "SQL Injection", "DDoS", "Spamming"],
        answer: ["Phishing", "SQL Injection", "DDoS"]
    },
    {
        type: "dropdown",
        question: "20. What does GPU stand for?",
        options: ["General Processing Unit", "Graphical Processing Unit", "General Purpose Unit", "Graphical Purpose Unit"],
        answer: "Graphical Processing Unit"
    }
];

let currentPage = 0;
const questionsPerPage = 5;
let timeRemaining = 300; // 5 minutes in seconds
let timerInterval;
let quizStartTime;
let username = '';

document.addEventListener('DOMContentLoaded', () => {
    renderHomepage();
});

function renderHomepage() {
    const homepage = document.querySelector('.homepage');
    homepage.style.display = 'block'; // Show homepage
}

function startQuiz() {
    username = document.getElementById('userName').value.trim();
    if (username === '') {
        alert('Please enter your name to start the quiz.');
        return;
    }

    quizStartTime = new Date(); // Capture start time

    const homepage = document.querySelector('.homepage');
    homepage.style.display = 'none'; // Hide homepage

    const quizContainer = document.getElementById('quizContainer');
    quizContainer.style.display = 'block'; // Show quiz container

    renderQuestions();
    showPage(currentPage);
    startTimer();
}

function renderQuestions() {
    const quizContainer = document.getElementById('questionsContainer');
    quizContainer.innerHTML = ''; // Clear any existing content
    questions.forEach((question, index) => {
        const questionElement = document.createElement('div');
        questionElement.className = 'question';
        questionElement.innerHTML = getQuestionHTML(question, index);
        quizContainer.appendChild(questionElement);
    });
}

function getQuestionHTML(question, index) {
    let html = `<p>${question.question}</p>`;
    switch (question.type) {
        case 'text':
            html += `<input type="text" name="question${index}" style="margin-bottom: 10px;" />`;
            break;
        case 'radio':
            question.options.forEach(option => {
                html += `
                    <div style="margin-bottom: 10px;">
                        <input type="radio" name="question${index}" value="${option}" /> ${option}
                    </div>
                `;
            });
            break;
        case 'checkbox':
            question.options.forEach(option => {
                html += `
                    <div style="margin-bottom: 10px;">
                        <input type="checkbox" name="question${index}" value="${option}" /> ${option}
                    </div>
                `;
            });
            break;
        case 'dropdown':
            html += `<select name="question${index}" style="margin-bottom: 10px;">`;
            question.options.forEach(option => {
                html += `<option value="${option}">${option}</option>`;
            });
            html += `</select>`;
            break;
    }
    return html;
}

function showPage(page) {
    const questions = document.querySelectorAll('.question');
    questions.forEach((question, index) => {
        question.style.display = (index >= page * questionsPerPage && index < (page + 1) * questionsPerPage) ? 'block' : 'none';
    });
    document.getElementById('prevBtn').style.display = page === 0 ? 'none' : 'inline';
    document.getElementById('nextBtn').style.display = page === Math.ceil(questions.length / questionsPerPage) - 1 ? 'none' : 'inline';

    // Show submit button only on the last page
    document.getElementById('submitBtn').style.display = page === Math.ceil(questions.length / questionsPerPage) - 1 ? 'inline' : 'none';
}

function changePage(step) {
    currentPage += step;
    showPage(currentPage);
}

function startTimer() {
    const timerElement = document.getElementById('timer');
    timerInterval = setInterval(() => {
        timeRemaining--;
        const minutes = Math.floor(timeRemaining / 60);
        const seconds = timeRemaining % 60;
        timerElement.textContent = `Time Remaining: ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            autoSubmitQuiz();
        }
    }, 1000);
}

function autoSubmitQuiz() {
    alert('Time is up! Submitting your quiz.');
    submitQuiz();
}

function submitQuiz() {
    clearInterval(timerInterval); // Stop the timer when the form is submitted
    const score = calculateScore();
    const timeTaken = calculateTimeTaken(); // Calculate time taken
    showResultsPage(score, timeTaken);
}

function calculateScore() {
    let score = 0;
    questions.forEach((question, index) => {
        const userAnswer = getUserAnswer(index, question.type);
        if (Array.isArray(question.answer)) {
            if (arraysEqual(userAnswer, question.answer)) {
                score++;
            }
        } else {
            if (userAnswer === question.answer) {
                score++;
            }
        }
    });
    return score;
}

function getUserAnswer(index, type) {
    const name = `question${index}`;
    switch (type) {
        case 'text':
            return document.querySelector(`input[name="${name}"]`).value.trim();
        case 'radio':
            return document.querySelector(`input[name="${name}"]:checked`)?.value;
        case 'checkbox':
            return Array.from(document.querySelectorAll(`input[name="${name}"]:checked`)).map(input => input.value);
        case 'dropdown':
            return document.querySelector(`select[name="${name}"]`).value;
    }
}

function arraysEqual(arr1, arr2) {
    return Array.isArray(arr1) && Array.isArray(arr2) && arr1.length === arr2.length && arr1.every((val, index) => val === arr2[index]);
}

function calculateTimeTaken() {
    const endTime = new Date();
    const timeDiff = endTime - quizStartTime; // Time difference in milliseconds
    const seconds = Math.floor(timeDiff / 1000);
    const minutes = Math.floor(seconds / 60);
    return `${minutes.toString().padStart(2, '0')}:${(seconds % 60).toString().padStart(2, '0')}`;
}

function showResultsPage(score, timeTaken) {
    const resultPopup = document.getElementById('resultPopup');
    resultPopup.style.display = 'block'; // Show results page

    const quizContainer = document.getElementById('quizContainer');
    quizContainer.style.display = 'none'; // Hide quiz container

    const scoreElement = document.getElementById('score');
    scoreElement.innerHTML = `
        <h2>Your Score: ${score} / ${questions.length}</h2>
        <p>Name: ${username}</p>
        <p>Time Taken: ${timeTaken}</p>
    `;

    const detailedResultsElement = document.getElementById('detailedResults');
    detailedResultsElement.innerHTML = questions.map((question, index) => {
        const userAnswer = getUserAnswer(index, question.type);
        return `
            <div>
                <p>${question.question}</p>
                <p>Your answer: ${Array.isArray(userAnswer) ? userAnswer.join(', ') : userAnswer}</p>
                <p>Correct answer: ${Array.isArray(question.answer) ? question.answer.join(', ') : question.answer}</p>
            </div>
        `;
    }).join('');
}

function returnToHomepage() {
    const resultPopup = document.getElementById('resultPopup');
    resultPopup.style.display = 'none'; // Hide results page

    const homepage = document.querySelector('.homepage');
    homepage.style.display = 'block'; // Show homepage

    // Reset the quiz form and state
    document.getElementById('quizForm').reset();
    currentPage = 0;
    timeRemaining = 300;
}
