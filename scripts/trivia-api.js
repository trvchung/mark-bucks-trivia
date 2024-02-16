// store API base URL in a variable
const baseURL = 'https://opentdb.com/api.php?amount=50?type=multipe';

// receive question element
const questionEl = document.querySelector('.main__question');



async function getTrivia() {
    try {
        // get response from API
        const response = await axios.get(baseURL);

        // get results from response
        const responseResults = response.data.results;
      
        // get a random trivia question/answer object
        const questionObject = await responseResults[Math.floor(Math.random() * responseResults.length)];

        // populate question element with dynamic question from API
        questionEl.innerText = decodeEntities(questionObject.question);

        // create an answers array object
        let answersArray = []

        // create a variable for the correct answer from API
        let answerCorrect = questionObject.correct_answer;

        // create a variable for the incorrect answers from API
        let answerIncorrect = questionObject.incorrect_answers;

        // encompass both answer sets in new array
        answersArray.push(answerCorrect)
        for (i = 0; i < answerIncorrect.length; i++) {
          answersArray.push(answerIncorrect[i])
        }

        // get the main answers ul
        const answerList = document.querySelector(".main__answers-list");


        // create a function to get answers from API and populate HTML elements
        function createAnswer(answerValue) {

          // create a container for each answer (button and text) and append to the answer list
          const answerContainerEl = document.createElement("div");
          answerContainerEl.classList.add("answer__container");
          answerList.appendChild(answerContainerEl);

          // create an input (radio button)
          const inputEl = document.createElement("input");
          inputEl.type = "radio";
          inputEl.name = "answerinput";
          inputEl.value = answerValue;

          // create a label element with an answer from the API
          const pEl = document.createElement("label");
          pEl.value = answerValue;
          pEl.className = "main__answer-text";
          pEl.textContent = decodeEntities(answerValue);

          // append to button and label to answerContainerEl
          answerContainerEl.appendChild(inputEl);
          answerContainerEl.appendChild(pEl);
        }

        for (i = 0; i < answersArray.length; i++){
          createAnswer(answersArray[i])
        }


        document.getElementById("submit-button").onclick = async function(event) {
          
          // prevent default reload behaviour
          event.preventDefault();
        
          // create a variable to store the value of the user selected answer
          const selectedAnswerValue = document.querySelector('input[type=radio]:checked').value;
          console.log(selectedAnswerValue);
        
          // check if user answer matches correct ansewr
          const answerCorrect = await questionObject.correct_answer;

          // get mark bucks value element
          const markBucksValue = document.querySelector('.main__markbucks-value');

          let markBucksBalance = 0;
          
          if (selectedAnswerValue === answerCorrect) {
              markBucksBalance += Math.floor(Math.random() * 9000);
              alert('You have been showered with Mark Bucks!!!');
              markBucksValue.innerText = markBucksBalance;
            } else {
              markBucksBalance -= Math.floor(Math.random() * 9000);
              alert('GIMME YOUR MARK BUCKS!!!!!');
              markBucksValue.innerText = markBucksBalance;
          }
        }
      } catch {
        alert('GIVE US A BREAK! WE ONLY HAD A DAY TO WORK ON IT.');
      }
};





getTrivia();




// function to replace HTML entity codes with actual HTML entity
function decodeEntities(str) {
  return str.replace(/&quot;/g, '"')
            .replace(/&#039;/g, "'")
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&amp;/g, '&')
            .replace(/&ouml;/g, 'Ó')
            .replace(/&eacute;/g, 'É');
}
