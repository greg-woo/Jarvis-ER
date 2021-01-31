//links
//http://eloquentjavascript.net/09_regexp.html
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions

//const { task } = require("gulp");

localStorage.setItem("Tasks", JSON.stringify(
  [
    { name: "Get five clients", finished: false },
    { name: "Finish project", finished: false },
    { name: "Call Pablo", finished: true },
    { name: "Finish mockup", finished: false },
    { name: "Prepare for meeting", finished: true }
  ]))


var messages = ["<b>" + "Chatbot" + ":</b> " + "Great to see you again!"], //array that hold the record of each string in chat
  lastUserMessage = "", //keeps track of the most recent input string from the user
  botMessage = "", //var keeps track of what the chatbot is going to say
  botName = 'Chatbot', //name of the chatbot
  talking = true; //when false the speach function doesn't work

var Calendar = {
  "Jack": {
    "2021-01-30": [{ title: "Daily Scrum meeting", startTime: "16:00", endTime: "16:15" }, { title: "Lunch and learn", startTime: "12:00", endTime: "13:00" }],
    "2021-01-31": [{ title: "Project presentation", startTime: "9:00", endTime: "11:00" }]
  },
  "Jill": {
    "2021-01-30": [{ title: "Coffee with Carl", startTime: "11:00", endTime: "11:30" }],
    "2021-01-31": [{ title: "Deadline for report numbers", startTime: "16:00", endTime: "16:15" }]
  }
}

var profiles = [{
  "Name": "Jack",
  "id": "27794733",
  "Specializations": [{ "field": "IT", "level": "advanced" },
  { "field": "Data Analytics", "level": "moderate" }],
  "calendarId": "jacks-calendar-1"
},
{
  "Name": "Jill",
  "id": "87394788",
  "Specializations": [{ "field": "Analysis", "level": "advanced" },
  { "field": "Development", "level": "moderate" }],
  "calendar-link": "jills-calendar-1"
},
{
  "Name": "Brian",
  "id": "83762453",
  "Specializations": [{ "field": "IT", "level": "advanced" },
  { "field": "Data Analytics", "level": "advanced" }],
  "calendar-link": "jills-calendar-1"
}]

localStorage.setItem('Profiles', JSON.stringify(profiles));
localStorage.setItem('Calendar', JSON.stringify(Calendar));


var messageHelp
var askedForHelp = false
var userWantsHelp = false




// document.addEventListener("DOMContentLoaded", function(event) {
//     /* DOM is ready, so we can query for its elements */
//     var dragonHealth = document.getElementById("progbar").aria-valuenow;
//     console.log(dragonHealth);
//     // 410

//     /*additional code for comment*/
//     document.querySelector('checkTask').addEventListener("change", function(event){
//         if(this.checked) {
//             // Checkbox is checked..
//            document.getElementById("progbar").aria-valuenow += 10;
//         } else {
//             document.getElementById("progbar").aria-valuenow -= 10;

//         }
//             // Checkbox is not checked..
//     });
//     //
// });

var numberTasksTotal = 0;
var numberTasksLeft = 1;

function UpdatePercentage() {

  var allCheckBoxes = document.getElementsByClassName("option-input radio");

  numberTasksLeft = 0;
  var tasksCompleted = 0;
  for (var i = 0; i < allCheckBoxes.length; i++) {
    if (allCheckBoxes[i].checked) {
      tasksCompleted++;
    } else {
      numberTasksLeft++;
    }
  }
  numberTasksTotal = tasksCompleted + numberTasksLeft;
  var percentage = (tasksCompleted / numberTasksTotal) * 100;
  document.getElementById("completed_percentage").innerHTML = percentage.toFixed(0)  + "%";
  document.getElementById("progbar").style.width = percentage.toFixed(0)  + "%";
  document.getElementById("tasksLeft").innerHTML = numberTasksLeft;
  // if (this.checked) {
  //   tasksCompleted ++;
  //   percentage = tasksCompleted/numberTasksTotal * 100;
  //   numberTasksLeft --;
  //   document.getElementById("completed_percentage").innerHTML = percentage+"%";
  // } else {
  //   tasksCompleted --;
  //   percentage = tasksCompleted/numberTasksTotal * 100;
  //   numberTasksLeft ++;
  //   document.getElementById("completed_percentage").innerHTML = percentage+"%";
  // }

}

// ER BELOW
var maladie = "Broken Arm";
var waitime = "2h35";
var placeInQueue = "10";


var listingSymptoms = false
var updateDisease = false
var updatingDisease = false
var updatePain = false
var updatingPain = false
var updateCovidSymptoms = false
var updatingSymptoms = false
//
//
//****************************************************************
//****************************************************************
//****************************************************************
//****************************************************************
//****************************************************************
//****************************************************************
//****************************************************************
//edit this function to change what the chatbot says
function chatbotResponse() {
  var text = lastUserMessage
  if (text.toLowerCase().includes("add") || text.toLowerCase().includes("create") || text.toLowerCase().includes("new") || text.toLowerCase().includes("schedule"))
  {
    if (text.toLowerCase().includes("emergency") || text.toLowerCase().includes("appointment") || text.toLowerCase().includes("visit"))
    {
      botMessage = "Please let me know what your emergency is and I'll be happy to put you in the queue."
      userWantsHelp = true
    }
  }
  else if (userWantsHelp)
  {
    userWantsHelp = false
    botMessage = "I'll schedule you in for " + text.toLowerCase() + ". However, I'm going to need you to tell me about your symptoms. On a scale of 1 to 10 (10 being worst), how bad is your current pain?"
    maladie = text.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    listingSymptoms = true
    if (text.toLowerCase().includes("heart") || text.toLowerCase().includes("crisis") || text.toLowerCase().includes("breathing"))
    {
      waitime = "0h25"
      placeInQueue = "2"
    }
  }
  else if (listingSymptoms)
  {
    if (text.includes("0") || text.includes("1") || text.includes("2") || text.includes("3") || text.includes("4") || text.includes("5") || text.includes("6") || text.includes("7") || text.includes("8") || text.includes("9") || text.includes("10"))
    {
      botMessage = "Thank you. In the past 14 days, have you been tested positive for Covid-19, travelled outside the country, or had symptoms of Covid-19 (nausea, stomach pain, difficulty breathing, cough)?"
    }
    else 
    {
      botMessage = "Thank you. I have updated your information and your place in the queue according to your provided details."
      document.getElementById("maladie").innerHTML = maladie
      document.getElementById("timeLeft").innerHTML = waitime
      document.getElementById("tasksLeft").innerHTML = placeInQueue
      listingSymptoms = false
    }
  }
  else if (text.includes("hello") || text.includes("hi") || text.includes("howdy") || text.includes("morning") || text.includes("greetings"))
  {
    botMessage = "Hi there! How can I help you?"
  }
  else if (text.toLowerCase().includes("commands"))
  {
    botMessage = "Based on what you say in our conversation, I would be happy to book a new appointment for you, schedule you in for an emergency, update your personal information, or help you in a variety of other ways."
  }
  else if ((text.toLowerCase().includes("update") || text.toLowerCase().includes("change")) && (text.toLowerCase().includes("emergency") || text.toLowerCase().includes("appointment")))
  {
    botMessage = "Is your issue still: " + maladie + "?"
    updateDisease = true
  }
  else if (updateDisease)
  {
    if (text.toLowerCase().includes("no"))
    {
      botMessage = "What is your new emergency?"
      updateDisease = false
      updatingDisease = true
    }
    else
    {
      botMessage = "Has your pain level changed?"
      updateDisease = false
      updatePain = true
    }
  }
  else if (updatingDisease)
  {
    botMessage = "Thank you for updating your emergency. I have changed your information"
    maladie = text.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    document.getElementById("maladie").innerHTML = maladie
    waitime = "2h05"
    document.getElementById("timeLeft").innerHTML = waitime
    placeInQueue = "11"
    document.getElementById("tasksLeft").innerHTML = placeInQueue
    updatingDisease = false
  }
  else if (updatePain)
  {
    if (text.toLowerCase().includes("yes"))
    {
      botMessage = "On a scale of 1 to 10 (10 being the worst), how bad is your current pain?"
      updatePain = false
      updatingPain = true
    }
    else
    {
      botMessage = "In the past 14 days, have you been tested positive for Covid-19, travelled outside the country, or had symptoms of Covid-19 (nausea, stomach pain, difficulty breathing, cough)?"
      updatePain = false
      updateCovidSymptoms = true
    }
  }
  else if (updatingPain)
  {
    updatingPain = false
    waitime = "1h30"
    document.getElementById("timeLeft").innerHTML = waitime
    placeInQueue = "4"
    document.getElementById("tasksLeft").innerHTML = placeInQueue
  }
  else if (updateCovidSymptoms)
  {
    botMessage = "Thank you for letting us know. I have updated your information"
    updateCovidSymptoms = false
  }
  else botMessage = "I'm sorry but I'm not sure what that means. \nIs there something else I can help you with?"
}
function ScheduleProvider() {
  var available_people = []
  const today = new Date()
  const str_time = today.toJSON().toString().substring(11, 16)
  const str_day = today.toJSON().toString().substring(0, 10)
  for (var usr in Calendar) {
    for (var day in Calendar[usr]) {
      if (day === str_day) {
        for (var event in Calendar[usr][str_day]) {
          if (Date.parse("01/01/2011 " + Calendar[usr][str_day][0]["endTime"]) < Date.parse("01/01/2011 " + str_time) || (Date.parse("01/01/2011 " + Calendar[usr][str_day2][0]["startTime"]) > 90000 + Date.parse("01/01/2011 " + str_time))) {
            // available_people.push(usr);
            break;
          }
        }
      }
    }
  }
  response = ""
  if (available_people.length > 1) {
    response += "It seems like "
    for (var i = 0; i < available_people.length - 1; i++) {
      response += available_people[i] + ", "
    }
    response += "and " + available_people[available_people.length - 1] + " are available right now. Do you want to send one of them a message?"
  }
  if (available_people.length == 1) {
    response += "It seems like " + available_people[0] + " is available right now. Do you want to send them a message?"
  }
  if (available_people.length == 0) {
    response += "Unfortunately, it seems like no one is available right now... why not take a little coffee break to think it over?"
  }
  console.log(response);
  return response;
}
//****************************************************************
//****************************************************************
//****************************************************************
//****************************************************************
//****************************************************************
//****************************************************************
//****************************************************************
//
//
//
//this runs each time enter is pressed.
//It controls the overall input and output
function newEntry() {
  //if the message from the user isn't empty then run 
  if (document.getElementById("chatbox").value != "") {
    //pulls the value from the chatbox ands sets it to lastUserMessage
    lastUserMessage = document.getElementById("chatbox").value;
    //sets the chat box to be clear
    document.getElementById("chatbox").value = "";
    //adds the value of the chatbox to the array messages
    messages.push(lastUserMessage);
    //Speech(lastUserMessage);  //says what the user typed outloud
    //sets the variable botMessage in response to lastUserMessage
    chatbotResponse();
    //add the chatbot's name and message to the array messages
    messages.push("<b>" + botName + ":</b> " + botMessage);
    // says the message using the text to speech function written below
    //Speech(botMessage);
    //outputs the last few array elements of messages to html
    for (var i = 1; i < 8; i++) {
      if (messages[messages.length - i])
        document.getElementById("chatlog" + i).innerHTML = messages[messages.length - i];
    }
  }
}

//text to Speech
//https://developers.google.com/web/updates/2014/01/Web-apps-that-talk-Introduction-to-the-Speech-Synthesis-API
function Speech(say) {
  if ('speechSynthesis' in window && talking) {
    var utterance = new SpeechSynthesisUtterance(say);
    //msg.voice = voices[10]; // Note: some voices don't support altering params
    //msg.voiceURI = 'native';
    //utterance.volume = 1; // 0 to 1
    //utterance.rate = 0.1; // 0.1 to 10
    //utterance.pitch = 1; //0 to 2
    //utterance.text = 'Hello World';
    //utterance.lang = 'en-US';
    speechSynthesis.speak(utterance);
  }
}

//runs the keypress() function when a key is pressed
document.onkeypress = keyPress;
//if the key pressed is 'enter' runs the function newEntry()
function keyPress(e) {
  var x = e || window.event;
  var key = (x.keyCode || x.which);
  if (key == 13 || key == 3) {
    //runs this function when enter is pressed
    newEntry();
  }
  if (key == 38) {
    console.log('hi')
    //document.getElementById("chatbox").value = lastUserMessage;
  }
}

//clears the placeholder text ion the chatbox
//this function is set to run when the users brings focus to the chatbox, by clicking on it
function placeHolder() {
  document.getElementById("chatbox").placeholder = "";
}

function getRecommendation(field) {
  var available_peers = []
  const devProfiles = JSON.parse(localStorage.getItem("Profiles")).map(profile => ({ name: profile.Name, special: profile.Specializations.map((special) => special.field) })).filter(mem => (mem.special.includes(field)))
  const today = new Date();
  const str_time = today.toJSON().toString().substring(11, 16)
  const str_day = today.toJSON().toString().substring(0, 10)
  var events = JSON.parse(localStorage.getItem("Calendar"))
  var i = 0
  while (i < devProfiles.length) {
    var usr = devProfiles[i]
    if (events[usr.name])
    {  
      var usr_events = events[usr.name][str_day]
      //var usr_events = events[usr["name"]][str_day]
      var available = true;

      var j = 0
      while (j < usr_events.length) {
        var event = usr_events[j]
        if ((Date.parse("01/01/2011 " + event["endTime"]) >= Date.parse("01/01/2011 " + str_time)) && (Date.parse("01/01/2011 " + event["startTime"]) <= 90000 + Date.parse("01/01/2011 " + str_time))) {
          available = false;
        }
        j++
      }
      if (available) {
        available_peers.push(usr);
      }

    }
    i++
  }
  //const filtered = devProfiles.filter(value => available_peers.includes(value));

  return available_peers
}

function addTask(word) {
  document.getElementById('taskList').innerHTML += ('<div class="d-flex align-items-center"><label><input onclick = "UpdatePercentage()" type="checkbox" class="option-input radio"><span class="label-text">' + word + '</span></label></div>');
}

var buttonStatus = document.getElementById("statusB");
var status = 0;

function changeStatus() {
    if (status == 0) {
      buttonStatus.style.background= "red";
      document.getElementById("statusB").innerHTML = "Closed";
      status = 1;
    } else {
      buttonStatus.style.background= "#5cb85c";
      document.getElementById("statusB").innerHTML = "Open";
      status = 0;
    }
    
}


function downloadFile() { // create and download report
  var filename = "weekly_report.txt";
  var text = "This is your weekly team performance report:";
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}