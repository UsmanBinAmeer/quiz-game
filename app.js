const questions = [
    {
        question: "How much money did Umer lose in Sadar",
        answers: [
            { text: 1000, correct: false },
            { text: 1500, correct: false },
            { text: 3000, correct: false },
            { text: 5000, correct: true },
        ]
    },
    {
        question: "What does HTML stand for?",
        answers: [
            { text: "Hyperlinks and Text Markup Language", correct: true },
            { text: "Home Tool Markup Language", correct: false },
            { text: "Hyper and Text Markup Language", correct: false },
            { text: "Hyper  Text Markup Language", correct: false },
        ]
    },
    {
        question: "Who is making the Web standards?",
        answers: [
            { text: "The World Wide Web Consortium", correct: true },
            { text: "Microsoft", correct: false },
            { text: "Google", correct: false },
            { text: "Mozilla", correct: false },
        ]
    },
    {
        question: "Choose the correct HTML element for the largest heading:",
        answers: [
            { text: "Heading", correct: false },
            { text: "h6", correct: false },
            { text: "h1", correct: true },
            { text: "h2", correct: false },
        ]
    },
    {
        question: "What is the correct HTML element for inserting a line break",
        answers: [
            { text: "br", correct: true },
            { text: "lb", correct: false },
            { text: "break", correct: false },
            { text: "broken", correct: false },
        ]
    }
]
//////////////////////////////////////////////////////////////////////
/////s////////////////////////////////////////////////////////////////

const questionElement = document.getElementById("question")
const answerButtons = document.getElementById("answer-buttons")
const nextButton = document.getElementById("next-btn")

let currentQuestionIndex = 0
let score = 0

function startQuiz() {
    currentQuestionIndex = 0
    score = 0
    nextButton.innerHTML = "Next"
    showQuestion()
}

function showQuestion() {
    resetState()
    let currentQuestion = questions[currentQuestionIndex]
    let questionNo = currentQuestionIndex + 1
    questionElement.innerHTML = questionNo + " " + currentQuestion.question

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button")
        button.innerHTML = answer.text
        button.classList.add("btn")
        answerButtons.appendChild(button)
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click", selectAnswer)
    })
}

function resetState() {
    nextButton.style.display = "none"
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild)
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target
    const isCorrect = selectedBtn.dataset.correct === "true"
    if (isCorrect) {
        selectedBtn.classList.add("correct")
        score++
    } else {
        selectedBtn.classList.add("incorrect")
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct")
        }
        button.disabled = "true"
    })
    nextButton.style.display = "block"
}
function showScore() {
    resetState()
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`
    nextButton.innerHTML = "Try Again!"
    nextButton.style.display = "block"
}

function handleNextButton() {
    currentQuestionIndex++
    if (currentQuestionIndex < questions.length) {
        showQuestion()
    } else {
        showScore()
    }
}
nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton()
    } else {
        startQuiz()
    }
})


startQuiz() 