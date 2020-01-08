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

// Create a variable to reference the database.
var database = firebase.database();

// Define initial variables.
var trainName;
var destination;
var frequency = 0;
var minutesAway = 0;
var firstTrain = 0;
var nextArrival = 0;

// Capture button click.
$("#add-train").on("click", function(event) {
  event.preventDefault();

  // Take in user input.
  trainName = $("#train-name-input").val().trim();
  destination = $("#destination-input").val().trim();
  firstTrain = $("#first-train-input").val().trim();
  frequency = $("#frequency-input").val().trim();

  // Create database keys.
  database.ref().push({
    trainName: trainName,
    destination: destination,
    frequency: frequency,
    firstTrain: firstTrain,
    nextArrival: nextArrival,
    dateAdded: firebase.database.ServerValue.TIMESTAMP
  });

  // Clears text boxes.
  nameInput = $("#train-name-input").val("");
  destinationInput = $("#destination-input").val("");
  firstTrainInput = $("#first-train-input").val("");
  frequencyInput = $("#frequency-input").val("");
});

// Conversion of input to next train time and minutes away.
database.ref().on("child_added", function(childSnapshot) {
  var firstTrainConverted = moment(childSnapshot.val().firstTrain, "hh:mm").subtract(1, "years");
  var timeDiff = moment().diff(moment(firstTrainConverted), "minutes");
  var timeRemain = timeDiff % childSnapshot.val().frequency;
  var minutesAway = childSnapshot.val().frequency - timeRemain;
  var nextArrival = moment().add(minutesAway, "minutes");
  nextArrival = moment(nextArrival).format("hh:mm");
  var firebaseName = childSnapshot.val().trainName;
	var firebaseDestination = childSnapshot.val().destination;
	var firebaseFrequency = childSnapshot.val().frequency;

// Create responsive table to display user input.

$("#train-table > tbody").append("<tr><td>" + firebaseName + 
"</td><td>" + firebaseDestination + 
"</td><td>"+ firebaseFrequency + 
"</td><td>" + nextArrival + 
"</td><td>" + minutesAway + "</td></tr>");

// Handle the errors
}, function(errorObject) {
console.log("Errors handled: " + errorObject.code);
});
