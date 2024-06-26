const questions = [
    {
        question: "What is the capital of France?",
        answers: [
            { text: "Berlin", correct: "false" },
            { text: "Madrid", correct: "false" },
            { text: "Paris", correct: "true" },
            { text: "Rome", correct: "false" }
        ]
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: [
            { text: "Earth", correct: "false" },
            { text: "Jupiter", correct: "false" },
            { text: "Mars", correct: "true" },
            { text: "Venus", correct: "false" }
        ]
    },
    {
        question: "Who wrote 'Romeo and Juliet'?",
        answers: [
            { text: "Charles Dickens", correct: "false" },
            { text: "J.K. Rowling", correct: "false" },
            { text: "Mark Twain", correct: "false" },
            { text: "William Shakespeare", correct: "true" }
        ]
    },
    {
        question: "What is the largest ocean on Earth?",
        answers: [
            { text: "Atlantic Ocean", correct: "false" },
            { text: "Indian Ocean", correct: "false" },
            { text: "Pacific Ocean", correct: "true" },
            { text: "Southern Ocean", correct: "false" }
        ]
    }
]

const quizQuestion = document.querySelector("#question")
const answerButton = document.querySelector(".answer-button")
const nextButton = document.querySelector("#next-btn")

let currentQuestionIndex = 0
let score = 0

function startQuiz(){
    currentQuestionIndex = 0
    score = 0
    showQuestion()
}

function resetPreviousState()
{
    nextButton.style.display = "none"
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild)
    }
}

function showQuestion()
{
    resetPreviousState()
    let currentquestion = questions[currentQuestionIndex]
    let questionNo =  currentQuestionIndex + 1
    quizQuestion.innerHTML = questionNo + ". " + currentquestion.question

    currentquestion.answers.forEach(answer =>{
        let button = document.createElement("button")
        button.classList.add("btn")
        button.innerHTML = answer.text
        answerButton.appendChild(button)

        if(answer.correct){
            button.dataset.correct = answer.correct
        }

        button.addEventListener("click",answerQustions)
    })

}

function answerQustions(e){
    let selectedButton = e.target
    if(selectedButton.dataset.correct == "true"){
        selectedButton.classList.add("correct")
        score++
    }
    else{
        selectedButton.classList.add("incorrect")
    }

    Array.from(answerButton.children).forEach(button=>{
        if(button.dataset.correct == "true"){
            button.classList.add("correct")
        }
        button.disabled = true
    })
    nextButton.style.display = "block"
}

function handleNextButton(){
    currentQuestionIndex ++
    if(currentQuestionIndex < questions.length){
        showQuestion()
    }
    else{
        quizQuestion.innerHTML = `Your score is ${score} out of ${questions.length} !`
        answerButton.innerHTML=''
        nextButton.innerHTML = "Restart Quiz"
    }
}
nextButton.addEventListener('click',()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton()
    }

    else{
        startQuiz()
    }
})

startQuiz()