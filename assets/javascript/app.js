
  var config = {
    apiKey: "AIzaSyAcKrMCPc1pUv4ZB9BXT_qDG6MQODpAtmg",
    authDomain: "train-scheduler-9541d.firebaseapp.com",
    databaseURL: "https://train-scheduler-9541d.firebaseio.com",
    projectId: "train-scheduler-9541d",
    storageBucket: "train-scheduler-9541d.appspot.com",
    messagingSenderId: "951868345143"
  };
  firebase.initializeApp(config);

  
  var database = firebase.database();


  $("#add-train-btn").click(function(){
  

    event.preventDefault();


    var trainName = $("#train-name-input").val();
    var destinationName = $("#destination-input").val();
    var firstTrainTime = $("#first-train-time-input").val();
    var freqMin = $("#frequency-input").val();


    var dataObject = {
        TrainName: trainName,
        destinationName : destinationName,
        firstTrainTIme: firstTrainTime,
        freqMin: freqMin
    }


    database.ref().push(dataObject);



    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-time-input").val("");
    $("#frequency-input").val("");
    $("#train-name-input").focus();


  });




database.ref().on("child_added", function(snap){


  var trainName = snap.val().TrainName;
  var destinationName = snap.val().destinationName;
  var firstTrainTIme = snap.val().firstTrainTIme;
  var freqMin = snap.val().freqMin;


  var now = moment();
  var convertedFirstTime = moment(firstTrainTIme, "h:mm:a");
  var timeDif = moment(now).diff(convertedFirstTime, "minutes");
  

  var mod =  timeDif % freqMin ;
  var timeTillNext = freqMin - mod;


  var nextArrival = moment().add(timeTillNext, "minutes");
  nextArrival = moment(nextArrival).format("h:mm A");


  var newtblrow = '<tr><td>'+firstTrainTIme+'</td><td>'+trainName+'</td><td>'+destinationName+'</td><td>'+freqMin+'</td><td>'+nextArrival+'</td><td>'+timeTillNext+'</td></tr>';
  $("#resultsTB").append(newtblrow);
  


});