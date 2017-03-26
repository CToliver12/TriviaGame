$(document).ready(function() {

	//displays start page
	showSection(startPage);

	//Listens for start click event
	addStartClickListener();

	//Listens for restart click event
	addRestartClickListener();

});


//Data
//_______________________________________________________________
//The questions object contain questions.
//Each question object has a question, array of answers, correct answer and video ID.
var questions = {
		q1:{
			question: "How many siblings did Michael have?",
			answers: ["six", "seven", "nine", "ten"],
			correctAnswer:   "nine",
			//videoLink: 
		},
		q2:{
			question: "Where was Michael born and raised?",
			answers: ["Indianapolis, Indiana", "Gary, Indiana", "Gary, Michigan", "Flint, Michigan"],
			correctAnswer:   "Gary, Indiana",
			//videoLink
		},
		q3:{
			question: "What was the original name of the Jackson 5?",
			answers: ["The Jackson Brothers", "The Motown 5", "Diana Ross's Jacksons", "The ABCs"],
			correctAnswer:   "The Jackson Brothers",
			//VideoLink
		},
		q4:{
			question: "In what year did Michael start recording solo?",
			answers: ["1971", "1974", "1975", "1978"],
			correctAnswer:   "1971",
			//VideoLink
		},
		q5:{
			question: "Which of Michael's albums has sold the most?",
			answers: ["Off the Wall", "Thriller", "Bad", "HIStory"],
			correctAnswer:   "Thriller",
			//VideoLink
		},
		q6:{
			question: "How many #1 Hits did Michael have during his career?",
			answers: ["8", "12", "13", "16"],
			correctAnswer:   "13",
			//videoLink
		},
		q7:{
			question: "Michael and Janet Jackson released a grammy-nominated duet called?",
			answers: ["His/Hers", "That's Why", "Scream", "He/She"],
			correctAnswer:   "Scream",
			//videoLink
		}
	};

//Creates array of questions for questions object.
var questionsArray = [questions.q1, questions.q2, questions.q3, questions.q4, questions.q5, questions.q6, questions.q7];

//COntrol which page is displayed.
var startPage = $("#start-page");
var questionPage = $("#question-page");
var answerPage = $("#answer-page");
var resultsPage = $("#results-page");

//More global variables
//________________________________________________________________
var questionID;
var index = 0;
var correctAnswers = 0;
var incorrectAnswers = 0;
var unanswered = 0; 
var section = "";
var timeNumber = 5;
var timeIntervalID;

//Event listners. 
//________________________________________________________________

//Fires when start button clicked. 
function addStartClickListener(){	
	$("#start").on("click",function(){
		//console.log("Start button clicked");
		 

// Reset index so first question on start.
index = 0;
questionID = questionsArray[index];

//Shows question page.
showSection(questionPage);

//Displays question and possible answers.
displayQuestion();

//Start question countdown.
startTimer();

//Reset correct answer counter.
correctAnswers = 0;

//Reset incorrect answers counter.
incorrectAnswers = 0;

//Reset unanswered counter. 
unanswered = 0;

});

};

//Fires when answer list item selected 
function addAnswerClickListener(){
	$("li").on("click", function() {

		//Set selected answer to selected list item 
		selectedAnswer = $(this).html();

		//Show answer page.
		showSection (answerPage);

		//Add answer information to answer page 
		createAnswerSection(selectedAnswer);
	});
}

//When fired, return to start page. 
function addRestartClickListener(){
	$("#restart").on("click", function(){
		showSection(startPage);
	});
};


//Functions
//_______________________________________________________--

//Displays only one active page. 

function showSection(section) {
	startPage.css({'display' : 'none'});
	questionPage.css({'display' : 'none'});
	answerPage.css({'display' : 'none'});
	resultsPage.css({'display': 'none'});

	if (section) {
		section.css({'display' : 'block'});
	}

};

//Displays question and list of possible answers 
function displayQuestion() {
	$("#question").html(questionID.question);



	//Displays question's and possible answers. 
	displayQuestionAnswers();

};

//Starts timer on question page
//setInterval() method calls a function or evaluates an expression as specified intervals (milliseconds)
//setInterval() method will contine calling the funtion until clearInterval() is called, or the window is closed 
//The ID value returned by setInterval() is used as the parameter for the clearInterval () method
function startTimer(){
	timeIntervalID = setInterval(decrement, 1000);

};

//Decrements time on question page 
function decrement(){
	timeNumber--;

	//Show time in time span
	$(".time").html(timeNumber);

	//if time runs out, set question to unanswered. 
	if(timeNumber === 0){
		setQuestionUnanswered();
	}
};

//Set question ananswered 
function setQuestionUnanswered(){
	showSection(answerPage);
	selectedAnswer = false;
	createAnswerSection(selectedAnswer);

};

//Stops timer
function stopTimer(){
	clearInterval(timeIntervalID);

};

//Displays possible answers to question
//function displayQuestionAnswers(){

//Empties out existing answers from previous question
	function displayQuestionAnswers(){

	//Empties out existing answers from previous question
		$(".answer-choices").empty();

		//Creats new list of answers for question. 
		for (var i = 0; i < questionID.answers.length; i++){

			//create answer option list item 
			var answerOption = $("<li>");

	//List item selectable. 
	$(answerOption).addClass("ui-widget-content");
	console.log(answerOption);

	//Set answer option text to answer in questions array.
	answerOption.html(questionID.answers[i]);

	//append answer option to the list of answer choices
	answerOption.appendTo(".answer-choices");
}
}
$("li").hover(function(){
	$(this).addclass("hover");
	}, function(){
		$(this).removeClass("hover");
	}
	);


//Listens for answer click event



//Displays content in answer section.

function createAnswerSection(selectedAnswer){

	//Stops timer. 
	stopTimer();

	//Get correct answer for question 
	var correctAnswer = questionID.correctAnswer;

	//Display correct answer information 
	$("#correct-answer-info").html("The correct answer was:" + correctAnswer);

	//If selected answer correct...
	if (correctAnswer === selectedAnswer) {

		//Empty out preview question's correct answer infomation 
		$("#correct-answer-info").empty();

		//Update ccorrect answers count
		correctAnswers++;
		$("#answer-assessment").html("Correct!");

		//Else if no answer selected
	} else if (selectedAnswer === false) {

		//Update unanswered answers count
		unanswered++;
		$("#answer-assessment").html("Out of Time!");

		//Else selected answer incorrect.
	} else {
		//Update incorrect answers count.
		incorrectAnswers++;
		$("#answer-assessment").html("Nope!");
	}
	
	//Display question's video
	displayVideo();

	//Length of time answer page appears
	setTimeout(answerTimeOut, 5000);
};

//Called when answer page times out 
function answerTimeOut(){

	//If there's another question, display it 
	if(index < questionsArray.length - 1) {
		index ++;
		questionID = questionsArray[index];
		goToNextQuestion();

		//If there's no more questions, show results
	} else{
		showTriviaResults();
	}
}

// Display correct, incorrect, and unanswered question counts 
function showTriviaResults() {
	showSection(resultsPage);
	$("#correct-answers").html(correctAnswers);
	$("#incorrect-answers").html(incorrectAnswers);
	$("#unanswered").html(unanswered);
}

//Display video for correct answer
function displayVideo() {
	var correctVideoLink = questionID.videoLink;
	//console.log("value of src = " + correctVideoLink);
	$("#answer-media").attr("src", correctVideoLink);
};

//Go to next question 
function goToNextQuestion(){

	//Display question page 
	showSection(questionPage);

	//Empties out existing answers from previous question.
	$(".answer-choices").empty();

	//Displays question and possible answers
	displayQuestion ();

	//Resets question timer 
	resetTimer();

}

//Resets question timer 
function resetTimer() {

	//Timer interval countdowns from 5 seconds
	timeNumber = 10;

	//Starts timer with number reset
	startTimer();

}





