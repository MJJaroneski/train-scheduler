// Initialize Firebase.
const firebaseConfig = {
  apiKey: "AIzaSyB2VpHAmv2-feqadQFC52IALupkeDO5CXg",
  authDomain: "train-time-adb17.firebaseapp.com",
  databaseURL: "https://train-time-adb17.firebaseio.com",
  projectId: "train-time-adb17",
  storageBucket: "train-time-adb17.appspot.com",
  messagingSenderId: "320241579668",
  appId: "1:320241579668:web:42aa66c507483441572681"
};
  
  firebase.initializeApp(firebaseConfig);

console.log(firebase)
var trainData = firebase.database
// Define initial variables.
var Name;
var destination;
var frequency = 0;
var minutesAway = 0;
var firstTrain = 0;
var nextArrival = 0;

// Capture button click.
$("#add-train").on("click", function(event) {
  event.preventDefault();

  // Take in user input.
  var Name = $("#train-name-input")
 .val()
 .trim();
  var destination = $("#destination-input")
  .val()
  .trim();
  var firstTrain = $("#first-train-input")
  .val()
  .trim();
  var frequency = $("#frequency-input")
  .val()
  .trim();

  // Create database keys.
  var newTrain = {
   Name: Name,
    destination: destination,
    frequency: frequency,
    firstTrain: firstTrain,
    nextArrival: nextArrival,
    dateAdded: firebase.database.ServerValue.TIMESTAMP
  };
  trainData.ref().push(newTrain);
alert("You added a train! Choo Choo!")
  // Clears text boxes.
  $("#train-name-input").val("");
  $("#destination-input").val("");
 $("#first-train-input").val("");
$("#frequency-input").val("");
});

// Conversion of input to next train time and minutes away.
database.ref().on("child_added", function(childSnapshot) {
  var firstTrainConverted = moment(childSnapshot.val().firstTrain, "hh:mm").subtract(1, "years");
  var timeDiff = moment().diff(moment(firstTrainConverted), "minutes");
  var timeRemain = timeDiff % childSnapshot.val().frequency;
  var minutesAway = childSnapshot.val().frequency - timeRemain;
  var nextArrival = moment().add(minutesAway, "minutes");
  nextArrival = moment(nextArrival).format("hh:mm");
  var firebaseName = childSnapshot.val().Name;
	var firebaseDestination = childSnapshot.val().destination;
	var firebaseFrequency = childSnapshot.val().frequency;

// Create responsive table to display user input.

$("#train-table > tbody").append("<tr><td>" + firebaseName + 
"</td><td>" + firebaseDestination + 
"</td><td>"+ firebaseFrequency + 
"</td><td>" + nextArrival + 
"</td><td>" + minutesAway + "</td></tr>");


