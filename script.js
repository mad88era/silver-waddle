//the following event is triggered when the page is fully loaded.
document.addEventListener('DOMContentLoaded', function () {
    //Selecting various HTML elements by their ID's 
   //create a start button for the quiz to begin when you open the page
    var startBtn = document.getElementById('start-btn');
    //create button that will initiate quiz once clicked
    var quizScreen = document.getElementById('quiz-screen');
    //create a display for the end of the quiz
    var endScreen = document.getElementById('end-screen');
    //create a timer for the questions
    var timerDisplay = document.getElementById('time');
    //create a button to submit your answer
    var submitBtn = document.getElementById('submit-btn');
    //create a save button to save the quiz
    var saveBtn = document.getElementById('save-btn');
    

    //create variable for questions on quiz
    //var to start timer
    var timer;
    //var to display time left
    var timeLeft = 90;
    //display question number
    var currentQuestionIndex = 0;
    //keep track of current score
    var score = 0;

    //create questions about the NFL
    var questions = [
        {
            //this is indicatin the type of question. 
            type: 'multiple-choice',
            //the question to display to the user
            question: '1. Who won the first Super Bowl?',
            //array of options for the user to choose from
            options: ['A. Green Bay Packers.', 'B. New England Patriots.','C. Dallas Cowboys.', 'D. San Francisco 49ers.'],
            //The correct answer to the question
            correctAnswer: 'A. Green Bay Packers.'
        },
        {
            type: 'multiple-choice',
            question: '2. Which team has the most Super Bowl Victories?',
            options: ['A. Pittsburgh Steelers.', 'B. New England Patriots.','C. Dallas Cowboys.', 'D.San Francisco 49ers.'],
            correctAnswer: 'B. New England Patriots.'
        },
        {
            type: 'multiple-choice',
            question: '3. Which team won the most consecutive Super Bowls?',
            options: ['A. Pittsburgh Steelers.', 'B. New England Patriots.','C. Dallas Cowboys.', 'D.San Francisco 49ers.'],
            correctAnswer: 'A. Pittsburgh Steelers.'
        },
        {
            type: 'multiple-choice',
            question: '4. Who is the only team to have appeared in the Super Bowl but never won?',
            options: ['A. Buffalo Bills.', 'B. Miami Dolphins.','C. Detroit Lions.', 'D.Atlanta Falcons.'],
            correctAnswer: 'A. Buffalo Bills.'
        },
        {
            type: 'multiple-choice',
            question: '5. Which city has hosted the most Super Bowls?',
            options: ['A. Los Angeles.', 'B. Miami.','C. New Orleans.', 'D. Dallas.'],
            correctAnswer: 'B. Miami.'
        },
        {
            type: 'multiple-choice',
            question: '6. Who holds the record for the most Super Bowl MVP awards?',
            options: ['A. Joe Montana.', 'B. Tom Brady.','C. Peyton Manning.', 'D. Troy Aikman.'],
            correctAnswer: 'B. Tom Brady.'
        },
        {
            type: 'multiple-choice',
            question: '7. Which Super Bowl is famously known for the "The Catch" by Dwight Clark?',
            options: ['A. Super Bowl X.', 'B. Super Bowl XXIII.','C. Super Bowl I.', 'D.Super Bowl XLII.'],
            correctAnswer: 'B. Super Bowl XXIII.'
        },
        {
            type: 'multiple-choice',
            question: '8. In what year did the NFL start using Roman numerals to denote Super Bowls?',
            options: ['A. Super Bowl III.', 'B. Super Bowl X.','C. Super Bowl XX.', 'D.Super Bowl XL.'],
            correctAnswer: 'C. Super Bowl XX.'
        },
        {
            type: 'multiple-choice',
            question: '9. Which Super Bowl was the first to go into overtime?',
            options: ['A. Super Bowl LI.', 'B. Super Bowl XXXIV.','C. Super Bowl XLIII.', 'D.Super Bowl XVII.'],
            correctAnswer: 'A. Super Bowl LI.'
        },
        {
            type: 'multiple-choice',
            question: '10. In which Super Bowl did the "Wardrobe Malfunction" incident occur during the halftime show?',
            options: ['A. Super Bowl XXXVIII.', 'B. Super Bowl XXXIX.','C. Super Bowl XL.', 'D.Super Bowl XLI.'],
            correctAnswer: 'A. Super Bowl XXXVIII.'
        },
    ];

    //create event listeners for the Start quiz button click initiating the quiz functions
    startBtn.addEventListener('click', startQuiz);
    //create event listener to submit your answer when you click the button
    submitBtn.addEventListener('click', submitAnswer);
    //create event listener to save your quiz when you click the button
    saveBtn.addEventListener('click', saveScore);

    //Create a function to start the quiz
    function startQuiz() {
        //Hide the 'Start' button when quiz has been initiated
        startBtn.style.display = 'none';
        //Display the quiz screen
        quizScreen.style.display = 'block';
        //show the first question
        showQuestion();
        //set up a timer to call the 'updateTimer' fuction every second (1000 milliseconds)
        timer = setInterval(updateTimer, 1000);
    }

    //Function to display the current question on the quiz screen
    function showQuestion() {
        var currentQuestion = questions[currentQuestionIndex];
        //set the context of the HTML element with the ID 'question' to the question text.
        document.getElementById('question').textContent = currentQuestion.question;
        //Display the multiple Choice question
        if (currentQuestion.type === 'multiple-choice') {
            // - Display the options container
            document.getElementById('options').style.display = 'flex';
            // - Show multiple-chocie options
            createOptions(currentQuestion.options);
        } 
        // Display the 'Submit' button.
        submitBtn.style.display = 'block';
    }

    //Function to create multiple-choice options. 
    function createOptions(options) {
        //Get the HTML element to serve as the container for the options.
        var optionsContainer = document.getElementById('options');
        //this clears any exiting content within the options container.
        optionsContainer.innerHTML = '';

        //Create event listener to confirm if answer was correct
        options.forEach((option, index) => {
            //Create a new button element for each option.
            var button = document.createElement('button');
            //set the tex content of the button  to the current option.
            button.textContent = option;
            //Add an event listener, when clicked it checks for the 'checkAnwer' function with the index of the selected option.
            button.addEventListener('click', () => checkAnswer(index));
            //Append the button to the options container.
            optionsContainer.appendChild(button);
        });
    }

    //Function to check the user's answers are correct.
    function checkAnswer(answerIndex) {
        //Retrieve the current question selection from the 'questions' array.
        var currentQuestion = questions[currentQuestionIndex];
        
        if (currentQuestion.type === 'multiple-choice') {
            //Retrieve the user's selected answer.
            var userAnswer = currentQuestion.options[answerIndex];
            //Compare the user's answer with the correct answer.
            if (userAnswer === currentQuestion.correctAnswer) {
                // if the answer is correct then increase the score.
                score++;
                //then re-set the timer to 90 seconds
                timeLeft = 90;
                // and display 'Touchdown'
                showFeedback('TOUCHDOWN!!!');
                //in incorrect
            } else {
                //then subtract 10 seconds from the timer for the incorrect answer.
                timeLeft -= 10;
                //then ensure that the timer doesn't go below 0.
                if (timeLeft < 0) timeLeft = 0;
                // and show 'Incomplete Pass'
                showFeedback('Incomplete Pass');
            }
        } 
         //Increase the current question index to move to the next question.
        currentQuestionIndex++;
        //check if there are any more question left of the quiz..
        if (currentQuestionIndex < questions.length) {
            //if there are more questions then display the next question.
            showQuestion();
            //if there are no more questions
        } else {
            //end the quiz
            endQuiz();
        }
    }

    //Function to display the feedback ont he quiz screen. 
    function showFeedback(feedback) {
        //Retrieve the HTML element with the ID 'feedback' to display feeback 
        var feedbackElement = document.getElementById('feedback');
        //Set the text context of the feedback element to the provided feedback message.
        feedbackElement.textContent = feedback;
    }

    //Function to submit the answers
    function submitAnswer() {
       {   // proceed to the next question after answering
            currentQuestionIndex++;
            //confirm if there are any remaining queestions in the quiz.
            if (currentQuestionIndex < questions.length) {
                //If there is, then display the next question
                showQuestion();
                //if not
            } else {
                //if there isnt any more questions then end the quiz
                endQuiz();
            }
        }
    }

    //Function to end the quiz
    function endQuiz() {
        //Clear the timer interval to stop the countdown.
        clearInterval(timer);
        //hide the quiz screen when the quiz is over 
        quizScreen.style.display = 'none';
        //display the end of the screen to show the user's score
        endScreen.style.display = 'block';
        //Set the text context of the HTML element with the ID 'Final-Score to the user's final score
        document.getElementById('final-score').textContent = score;
    }

    //Fuction to update the countdown timer
    function updateTimer() {
        //check if there is remaining time on the count down.
        if (timeLeft > 0) {
            //if there is time left
            timeLeft--;
            //then update the timer value on the HTML element with the ID 'time'
            timerDisplay.textContent = timeLeft;
            //otherwise
        } else {
            //if there is no time left then End the quiz .
            endQuiz();
        }
    }

    // Function to save the user's score along with their initials.
    function saveScore() {
        // Retrieve the HTML element with the ID 'initials' to get the user's initials input.
        var initialsInput = document.getElementById('initials');

        // Trim and convert the user's entered initials to uppercase.
        var initials = initialsInput.value.trim().toUpperCase();

        // Check if initials are provided.
        if (initials !== '') {
            // Save the score and initials in local storage.
            saveToLocalStorage(initials, score);

            // Display an alert indicating that the score is saved.
            alert(`Score saved: ${score}`);
        } else {
            // If no initials are provided:
            // - Display an alert instructing the user to enter their initials.
            alert('Please enter your initials.');
        }
    }

    // Function to save data in local storage.
    function saveToLocalStorage(initials, score) {
        // Retrieve existing data from local storage or initialize an empty array.
        var savedScores = JSON.parse(localStorage.getItem('quizScores')) || [];

        // Add the current score and initials to the array.
        savedScores.push({ initials: initials, score: score });

        // Save the updated array back to local storage.
        localStorage.setItem('quizScores', JSON.stringify(savedScores));
    }
});