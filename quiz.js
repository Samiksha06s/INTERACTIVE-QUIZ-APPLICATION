const questions = [
    {
        question: "What does HTML stand for?",
        options: ["Hyper Text Markup Language", "Hyper Text Management Language", "High Text Markup Language", "Hyper Tool Markup Language"],
        answer: "Hyper Text Markup Language"
    },
    {
        question: "What does CSS stand for?",
        options: ["Cascading Style Sheets", "Creative Style Sheets", "Computer Style Sheets", "Cascading Super Sheets"],
        answer: "Cascading Style Sheets"
    },
    {
        question: "Which company developed JavaScript?",
        options: ["Microsoft", "Google", "Netscape", "Oracle"],
        answer: "Netscape"
    },
    {
        question: "Which of the following is used to declare a variable in JavaScript?",
        options: ["var", "let", "const", "All"],
        answer: "All"
    },
    {
        question: "How do you write a comment in JavaScript?",
        options: ["&lt;-- comment --&gt;", "// comment", "# comment", "/* comment */"],
        answer: "// comment"
    },
    {
        question: "What will the following code output: console.log(2 + '2');?",
        options: ["4", "22", "NaN", "Error"],
        answer: "22"
    },
    {
        question: "Which of the following is NOT a JavaScript data type?",
        options: ["String", "Boolean", "Object", "Character"],
        answer: "Character"
    },
    {
        question: "What is the result of false == '0' in JavaScript?",
        options: ["true", "false", "NaN", "Error"],
        answer: "true"
    },
    {
        question: "Which method is used to find an element by ID in JavaScript?",
        options: ["getElementById()", "getElementByClass()", "getElementByTag()", "getElementByQuery()"],
        answer: "getElementById()"
    },
    {
        question: "What is the default value of a variable declared with let?",
        options: ["null", "undefined", "NaN", "false"],
        answer: "undefined"
    }
];

let currentQuestionIndex = 0;
let score = 0;
let isAnswered = false;
let userName = "";

// Function to shuffle an array (Fisher-Yates shuffle)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

let shuffledQuestions = shuffleArray([...questions]);

// Prompt user for name and start the quiz
document.getElementById("start-button").onclick = () => {
    userName = document.getElementById("username-input").value.trim();
    if (userName) {
        document.getElementById("greeting-message").innerHTML = `Welcome, ${userName}! Ready to start the quiz?`;
        document.getElementById("greeting-message").style.display = "block";

        setTimeout(() => {
            document.getElementById("welcome-page").style.display = "none";
            document.getElementById("quiz-container").style.display = "block";
            loadQuestion();
        }, 2000); 
    } else {
        alert("Please enter your name to start the quiz.");
    }
};

function loadQuestion() {
    const question = shuffledQuestions[currentQuestionIndex];
    const questionContainer = document.getElementById("question-container");
    const optionsContainer = document.getElementById("options-container");
    const nextButton = document.getElementById("next-button");
    const resultContainer = document.getElementById("result-container");

    questionContainer.innerHTML = "";
    optionsContainer.innerHTML = "";
    resultContainer.innerHTML = "";
    resultContainer.style.display = "none";

    questionContainer.innerHTML = `<p>${question.question}</p>`;

    const shuffledOptions = shuffleArray([...question.options]);
    shuffledOptions.forEach(option => {
        const optionDiv = document.createElement("div");
        optionDiv.classList.add("option");
        optionDiv.innerHTML = option;
        optionDiv.onclick = () => {
            if (!isAnswered) {
                selectOption(option);
                isAnswered = true;
                nextButton.style.display = "inline-block";
            }
        };
        optionsContainer.appendChild(optionDiv);
    });

    nextButton.style.display = "none";
}

function selectOption(option) {
    const selectedOptions = document.querySelectorAll(".option");
    selectedOptions.forEach(opt => opt.classList.remove("selected"));

    const optionElements = document.querySelectorAll(".option");
    optionElements.forEach(opt => {
        if (opt.innerHTML === option) {
            opt.classList.add("selected");
        }
    });

    if (option === shuffledQuestions[currentQuestionIndex].answer) {
        score++;
        showFeedback(true);
    } else {
        showFeedback(false);
    }

    const optionsContainer = document.getElementById("options-container");
    optionsContainer.querySelectorAll(".option").forEach(option => {
        option.classList.add("disabled");
        option.style.pointerEvents = "none";

        if (option.innerHTML !== shuffledQuestions[currentQuestionIndex].answer) {
            option.classList.remove("incorrect");
        }
    });
}

function showFeedback(isCorrect) {
    const resultContainer = document.getElementById("result-container");
    resultContainer.innerHTML = "";

    const resultMessage = document.createElement("p");

    if (isCorrect) {
        resultMessage.classList.add("correct");
        resultMessage.innerHTML = `Correct! ✅ Your score is ${score}`;
    } else {
        resultMessage.classList.add("incorrect");
        resultMessage.innerHTML = "Incorrect! ❌";
    }

    resultContainer.style.display = "block";
    resultContainer.appendChild(resultMessage);
}

document.getElementById("next-button").onclick = () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < shuffledQuestions.length) {
        isAnswered = false;
        loadQuestion();
    } else {
        showFinalResults();
    }
};

function showFinalResults() {
    const quizContainer = document.getElementById("quiz-container");

    let scoreMessage = "";
    if (score === 10) {
        scoreMessage = "You won🏅! Perfect score!";
    } else if (score >= 8) {
        scoreMessage = "Well done! You did great!";
    } else if (score >= 6) {
        scoreMessage = "Good job! Keep it up!";
    } else if (score >= 4) {
        scoreMessage = "Nice try! You'll get there!";
    } else {
        scoreMessage = "Oops! Better luck next time!";
    }

    const resultContent = `
        <h1>Quiz Completed! 🎉</h1>
        <p>Your final score: ${score}/${shuffledQuestions.length}</p>
        <p>${scoreMessage}</p>
        <button id="play-again" onclick="playAgain()">Play Again 🏁</button>
    `;
    quizContainer.innerHTML = resultContent;
}

function playAgain() {
    currentQuestionIndex = 0;
    score = 0;
    isAnswered = false;
    shuffledQuestions = shuffleArray([...questions]);

    const quizContainer = document.getElementById("quiz-container");
    quizContainer.innerHTML = `
        <h1>JavaScript Quiz</h1>
        <div id="question-container"></div>
        <div id="options-container"></div>
        <button id="next-button" style="display: none;">Next Question →</button>
        <div id="result-container" style="display: none;"></div>
    `;

    document.getElementById("next-button").onclick = () => {
        currentQuestionIndex++;
        if (currentQuestionIndex < shuffledQuestions.length) {
            isAnswered = false;
            loadQuestion();
        } else {
            showFinalResults();
        }
    };

    loadQuestion();
}

// Ensure start button exists before adding event listener
/*const startButton = document.getElementById("start-button");
if (startButton) {
    startButton.onclick = () => {
        document.getElementById("welcome-page").style.display = "none";
        document.getElementById("quiz-container").style.display = "block";
        loadQuestion();
    };
}
*/