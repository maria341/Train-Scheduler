// Web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyCrGLFTqnFbWSQ0JDsfNkfZ0yjPdTFc1SI",
    authDomain: "train-scheduler-9fd69.firebaseapp.com",
    databaseURL: "https://train-scheduler-9fd69.firebaseio.com",
    projectId: "train-scheduler-9fd69",
    storageBucket: "train-scheduler-9fd69.appshot.com",
    messagingSenderId: "1037539209968",
    appId: "1:1037539209968:web:24ebcf8df98298d0948835"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var database = firebase.database();

//create a button function
 $("#add-train-btn").on("click", function(event) {
 event.preventDefault();

 //create a variables of all the data that you want to input

 var trainName = $("#train-name").val().trim();
 var trainDest = $("#destination-input").val().trim();
 var trainTime = $("#firstTrain-input").val().trim();
 var freqTime = $("#frequency-input").val().trim();

  var newTravelTrain = {
     name: trainName,
     destination: trainDest,
     time: trainTime,
     frequency: freqTime
   };
  
  //Use the input collected from variables and push the response to firebase
   database.ref().push(newTravelTrain);

   console.log(newTravelTrain.name);
   console.log(newTravelTrain.destination);
   console.log(newTravelTrain.time);
   console.log(newTravelTrain.frequency);

   alert("New train schedule successfully added");

   $("#train-name").val("");
   $("#destination-input").val("");
   $("#firstTrain-input").val("");
   $("#frequency-input").val("");

  });
  database.ref().on("child_added", function(childSnapshot, prevChildKey) {
    console.log(childSnapshot.val());
    
    var trainName = childSnapshot.val().name;
    var trainDest = childSnapshot.val().destination;
    var trainTime = childSnapshot.val().time;
    var freqTime = childSnapshot.val().frequency;
   
    //Time difference 
    var firstTimeConverted = moment(trainTime, "hh:mm a").subtract(1, "years");
    
    var currentTime = moment().format("HH:mm a");
    console.log("Current Time: " + currentTime);

    var trainTimeCurrentDiff = moment().diff(moment(firstTimeConverted), "minutes");
    //remainder
    var timeLeft = trainTimeCurrentDiff % freqTime;
    //Times until next train arrive
    var minutesAway = freqTime - timeLeft;
    //Next train arrival
    var nextArrival = moment().add(minutesAway, "minutes").format("hh:mm a");

   //Show data into the table when user add new train
    $("#train-table > tbody").append(
     "<tr><td>" + trainName + 
     "</td><td>" + trainDest + 
     "</td><td>" + freqTime +
     "</td><td>" + nextArrival + 
     "</td><td>" + minutesAway + 
     "</td><td>" );
  
});



  