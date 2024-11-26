const questions = [
    {
        question: "What is the correct way to write a comment in JavaScript?",
        answers: [
            { text: "# This is a comment", correct: false },
            { text: "// This is a comment", correct: true },
            { text: "<-- This is a comment -->", correct: false },
            { text: "/* This is a comment */", correct: false },
        ]
    },
    {
        question: "What does NaN stand for in JavaScript?",
        answers: [
            { text: "Not a Number", correct: true },
            { text: "Null and Nullified", correct: false },
            { text: "Number and Name", correct: false },
            { text: "New Array Number", correct: false },
        ]
    },
    {
        question: "Which of the following is a JavaScript data type?",
        answers: [
            { text: "String", correct: false },
            { text: "Boolean", correct: false },
            { text: "Undefined", correct: false },
            { text: "All of the above", correct: true },
        ]
    },
    {
        question: "What is the correct way to define a variable in JavaScript?",
        answers: [
            { text: "var myVariable;", correct: false },
            { text: "let myVariable;", correct: false },
            { text: "const myVariable;", correct: false },
            { text: "All of the above", correct: true },
        ]
    },
    {
        question: "Which symbol is used for strict equality in JavaScript?",
        answers: [
            { text: "=", correct: false },
            { text: "==", correct: false },
            { text: "===", correct: true },
            { text: "!=", correct: false },
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    const questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = `${questionNo}. ${currentQuestion.question}`;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const isCorrect = selectedButton.dataset.correct === "true";
    if (isCorrect) {
        selectedButton.classList.add("correct");
        score++;
    } else {
        selectedButton.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `Your Score: ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();
