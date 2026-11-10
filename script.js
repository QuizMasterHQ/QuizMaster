
const startButton = document.getElementById("start-btn");
const welcomeScreen = document.getElementById("welcome-screen");
const quizScreen = document.getElementById("quiz-screen");
const difficultySelect = document.getElementById("difficulty");

const questionBank = {
    easy: [
    {
        question: "What does HTML stand for?",
        answers: [
            "Hyper Text Markup Language",
            "High Text Machine Language",
            "Hyperlinks Text Management Language",
            "Home Tool Markup Language"
        ],
        correct: 0
    },
    {
        question: "Which language is used to style web pages?",
        answers: ["Python", "CSS", "Java", "C++"],
        correct: 1
    },
    {
        question: "Which language makes a website interactive?",
        answers: ["HTML", "CSS", "JavaScript", "SQL"],
        correct: 2
    },
    {
        question: "Which tag creates a paragraph in HTML?",
        answers: ["<h1>", "<p>", "<div>", "<br>"],
        correct: 1
    },
    {
        question: "Which CSS property changes the background colour?",
        answers: ["color", "font-size", "background-color", "padding"],
        correct: 2
    },
    {
    question: "Which HTML tag creates the largest heading?",
    answers: ["<h6>", "<head>", "<h1>", "<header>"],
    correct: 2
},
{
    question: "Which CSS property controls the size of text?",
    answers: ["font-family", "font-size", "text-style", "font-weight"],
    correct: 1
},
{
    question: "Which HTML tag creates a line break?",
    answers: ["<break>", "<br>", "<lb>", "<line>"],
    correct: 1
},
{
    question: "Which HTML attribute specifies a link destination?",
    answers: ["src", "alt", "href", "class"],
    correct: 2
},
{
    question: "Which CSS property rounds the corners of an element?",
    answers: ["border-radius", "margin", "padding", "box-shadow"],
    correct: 0
}
],

    medium: [
        {
            question: "Which HTML tag creates a hyperlink?",
            answers: ["<link>", "<a>", "<href>", "<url>"],
            correct: 1
        },
        {
            question: "Which CSS property changes text colour?",
            answers: ["font-style", "background", "color", "text-size"],
            correct: 2
        },
        {
            question: "Which symbol represents an ID selector in CSS?",
            answers: [".", "#", "*", "&"],
            correct: 1
        },
        {
            question: "Which HTML tag displays an image?",
            answers: ["<image>", "<picture>", "<img>", "<src>"],
            correct: 2
        },
        {
            question: "Which keyword declares a variable in JavaScript?",
            answers: ["var", "print", "define", "echo"],
            correct: 0
        },
        {
            question: "Which method displays a message in the browser console?",
            answers: [
                "console.log()",
                "print()",
                "message()",
                "display()"
            ],
            correct: 0
        },
        {
            question: "Which CSS property controls space inside an element?",
            answers: ["margin", "padding", "border", "width"],
            correct: 1
        },
        {
    question: "Which HTML attribute is used to provide alternative text for an image?",
    answers: ["src", "alt", "href", "title"],
    correct: 1
},
{
    question: "Which CSS property makes text bold?",
    answers: ["font-weight", "font-style", "text-align", "text-decoration"],
    correct: 0
},
{
    question: "Which JavaScript operator checks both value and type?",
    answers: ["=", "==", "===", "!="],
    correct: 2
}
    ],

    hard: [
        {
            question: "Which JavaScript method converts a JSON string into an object?",
            answers: [
                "JSON.stringify()",
                "JSON.parse()",
                "JSON.convert()",
                "JSON.object()"
            ],
            correct: 1
        },
        {
            question: "Which CSS layout system is designed for two-dimensional layouts?",
            answers: ["Flexbox", "Grid", "Float", "Position"],
            correct: 1
        },
        {
            question: "Which JavaScript keyword creates a variable that cannot be reassigned?",
            answers: ["let", "var", "const", "static"],
            correct: 2
        },
        {
    question: "What does the DOM stand for?",
    answers: [
        "Document Object Model",
        "Data Object Management",
        "Digital Ordinance Model",
        "Document Oriented Method"
    ],
    correct: 0
},
{
    question: "Which JavaScript method adds an item to the end of an array?",
    answers: [
        "pop()",
        "shift()",
        "push()",
        "slice()"
    ],
    correct: 2
},
{
    question: "Which JavaScript method removes the last item from an array?",
    answers: ["push()", "pop()", "shift()", "unshift()"],
    correct: 1
},
{
    question: "Which CSS property controls the stacking order of elements?",
    answers: ["display", "position", "z-index", "overflow"],
    correct: 2
},
{
    question: "Which HTML element is used to link an external JavaScript file?",
    answers: ["<script>", "<javascript>", "<code>", "<link>"],
    correct: 0
},
{
    question: "Which JavaScript method selects an element by its ID?",
    answers: [
        "getElementById()",
        "querySelectorAll()",
        "getElementsByClassName()",
        "createElement()"
    ],
    correct: 0
},
{
    question: "What does CSS stand for?",
    answers: [
        "Computer Style Sheets",
        "Creative Style System",
        "Cascading Style Sheets",
        "Colorful Style Sheets"
    ],
    correct: 2
}
    ]
};

let currentQuestionIndex = 0;
let score = 0;
let selectedQuestions = [];
let userAnswers = [];
let timeLeft = 20;
let timerInterval;
function selectRandomQuestions() {
    const difficulty = difficultySelect.value;
    const availableQuestions = [...questionBank[difficulty]];

    availableQuestions.sort(() => Math.random() - 0.5);

    return availableQuestions.slice(0, 5);
    }
   function startTimer() {
    clearInterval(timerInterval);
    


    timeLeft = 20;
    timerElement.textContent = "Time left: " + timeLeft + "s";

    timerInterval = setInterval(function() {
        timeLeft--;
        if (timeLeft <= 5) {
    timerElement.style.color = "#ef4444";
    timerElement.style.borderColor = "#ef4444";
} else {
    timerElement.style.color = "#38bdf8";
    timerElement.style.borderColor = "#38bdf8";
}

        timerElement.textContent = "Time left: " + timeLeft + "s";


        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            userAnswers[currentQuestionIndex] = null;
            timeoutMessage.style.display = "block";

            Array.from(answerButtons.children).forEach(function(button) {
                button.disabled = true;
            });

            answerButtons.children[selectedQuestions[currentQuestionIndex].correct].style.background = "#22c55e";

            nextButton.style.display = "inline-block";
        }
    }, 1000);
} 
function showAnswerReview() {
    answerReview.style.display = "block";
    reviewList.innerHTML = "";

    selectedQuestions.forEach(function(question, index) {
        const reviewItem = document.createElement("div");
        reviewItem.classList.add("review-item");

        const questionText = document.createElement("h3");
        questionText.textContent = (index + 1) + ". " + question.question;

        const yourAnswer = document.createElement("p");
        const correctAnswer = document.createElement("p");
        const status = document.createElement("p");

        correctAnswer.textContent =
            "Correct answer: " + question.answers[question.correct];

        if (userAnswers[index] === null || userAnswers[index] === undefined) {
            yourAnswer.textContent = "Your answer: Not answered";
            status.textContent = "Time ran out";
            status.classList.add("unanswered");
        } else {
            yourAnswer.textContent =
                "Your answer: " + question.answers[userAnswers[index]];

            if (userAnswers[index] === question.correct) {
                status.textContent = "Correct!";
                status.classList.add("correct");
            } else {
                status.textContent = "Incorrect";
                status.classList.add("incorrect");
            }
        }

        reviewItem.appendChild(questionText);
        reviewItem.appendChild(yourAnswer);
        reviewItem.appendChild(correctAnswer);
        reviewItem.appendChild(status);

        reviewList.appendChild(reviewItem);
    });
}

const scoreElement = document.getElementById("score");
const questionNumberElement = document.getElementById("question-number");
const timerElement = document.getElementById("timer");
const timeoutMessage = document.getElementById("timeout-message");
const progressBar = document.getElementById("progress-bar");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");

const nextButton = document.getElementById("next-btn");
const restartButton = document.getElementById("restart-btn");
const resultCircle = document.getElementById("result-circle");
const resultPercentage = document.getElementById("result-percentage");
 const resultMessage = document.getElementById("result-message");
 const answerReview = document.getElementById("answer-review");
const reviewList = document.getElementById("review-list");
const trophy = document.getElementById("trophy");
const performanceTitle = document.getElementById("performance-title");
const performanceDescription = document.getElementById("performance-description");

startButton.addEventListener("click", function() {
    welcomeScreen.style.display = "none";
    quizScreen.style.display = "block";

    selectedQuestions = selectRandomQuestions();

    showQuestion();
});

function showQuestion() {
    let currentQuestion = selectedQuestions[currentQuestionIndex];
    resultMessage.style.display = "none";
    resultCircle.style.display = "none";
    timeoutMessage.style.display = "none";

    questionNumberElement.textContent =
        "Question " + (currentQuestionIndex + 1) + " of " + selectedQuestions.length;

    progressBar.style.width =
        ((currentQuestionIndex + 1) / selectedQuestions.length) * 100 + "%";

    questionElement.textContent = currentQuestion.question;
    answerButtons.innerHTML = "";

    currentQuestion.answers.forEach(function(answer, index) {
        const button = document.createElement("button");

        button.textContent = answer;
        button.classList.add("answer-btn");

        answerButtons.appendChild(button);

        button.addEventListener("click", function() {
            clearInterval(timerInterval);
            userAnswers[currentQuestionIndex] = index;
            if (index === currentQuestion.correct) {
                button.style.background = "#22c55e";
                score++;
                scoreElement.textContent = "Score: " + score;
            } else {
                button.style.background = "#ef4444";
                answerButtons.children[currentQuestion.correct].style.background = "#22c55e";
            }

            Array.from(answerButtons.children).forEach(function(btn) {
                btn.disabled = true;
            });

            nextButton.style.display = "inline-block";
        });
    });
    startTimer();
}

nextButton.addEventListener("click", function() {
    currentQuestionIndex++;

    if (currentQuestionIndex < selectedQuestions.length) {
        showQuestion();
        nextButton.style.display = "none";

        
   
    } else {
        answerButtons.innerHTML = "";
        nextButton.style.display = "none";

        clearInterval(timerInterval);
showAnswerReview();

        const percentage = Math.round((score / selectedQuestions.length) * 100);
        resultPercentage.textContent = percentage + "%";

resultCircle.style.display = "flex";

resultCircle.style.background =
    `conic-gradient(#38bdf8 ${percentage}%, #263b5b ${percentage}%)`;

        scoreElement.textContent =
            "Your Final Score: " + score + " / " + selectedQuestions.length +
            " (" + percentage + "%)";

       

resultMessage.style.display = "block";

if (percentage === 100) {
    trophy.textContent = "🏆";
    performanceTitle.textContent = "Outstanding!";
    performanceDescription.textContent = "You got every question right. Excellent work!";
} else if (percentage >= 60) {
    trophy.textContent = "🥈";
    performanceTitle.textContent = "Great Job!";
    performanceDescription.textContent = "You're doing well. Keep learning and improving!";
} else {
    trophy.textContent = "💪";
    performanceTitle.textContent = "Keep Practising!";
    performanceDescription.textContent = "Every attempt helps you learn. Try again!";
}

        restartButton.style.display = "inline-block";
        resultMessage.scrollIntoView({
    behavior: "smooth",
    block: "start"
});
    }
});

restartButton.addEventListener("click", function() {
    currentQuestionIndex = 0;
    score = 0;

    userAnswers = [];
answerReview.style.display = "none";
reviewList.innerHTML = "";
    
    scoreElement.textContent = "Score: 0";
    restartButton.style.display = "none";

    selectedQuestions = selectRandomQuestions();

showQuestion();
});
