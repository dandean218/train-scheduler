// 1) populate table with jQuery
// 2) set data on Firebase in object
// 3) map through object and call on Firebase to populate values

//initialize Firebase
var config = {
    apiKey: "AIzaSyC6yc_X3qhF38gSBc3_hi7tfI8P741n7Sw",
    authDomain: "mega-train-scheduler.firebaseapp.com",
    databaseURL: "https://mega-train-scheduler.firebaseio.com",
    projectId: "mega-train-scheduler",
    storageBucket: "mega-train-scheduler.appspot.com",
    messagingSenderId: "1016728795537"
  };

  firebase.initializeApp(config);

  //create a variable to reference the database
  var database = firebase.database();
  let audioSound = new Audio('./Assets/morning_train.m4a');

  //Grab database values and populate table on load
  database.ref().on("value", function(data){
    

  })

  // var date = "03/19/2019";
  // var format = "MM/DD/YYYY";
  // var convertDate = moment(date, format);

  var nextTrain = moment();
  var firstTrainTime = moment().startOf("day");
  // var randomFormat = "hh:mm";
  // var convertedDate = moment(addTrainTime, randomFormat);

  
  //initialize values
$("#train-submit").on("click", function(event){
  audioSound.play();
    // alert(convertDate.format("MM/DD/YY"));

    // console.log(moment().add(60, "minutes").format("MM/DD/YY: HH:MM"));

    event.preventDefault();
    
    //Form Variables with Values
    const addTrainName = $('#addTrainName').val().trim();
    const addDestination = $("#addDestination").val().trim();
    const addFrequency = $("#frequency").val().trim();
    const addTrainTime = $("#addTrainTime").val();


    //Table Variables to append form values to
    const tableRow = $('<tr>');
    const tableDataTrainName = $('<td>').append(addTrainName);
    const tableDataDestination = $('<td>').append(addDestination);
    const tableDataFrequency = $('<td>').append(addFrequency);
    

    let formattedTrainTime ="";


 
   
    // alert(nextTrain);
    
    if(addTrainTime.length !== 4){
      alert("please try entering the time like a normal human!");
    }
    else{
      formattedTrainTime = addTrainTime.charAt(0) + addTrainTime.charAt(1) + ":" + addTrainTime.charAt(2) + addTrainTime.charAt(3);
    }

    // firstTrainTime = moment(firstTrainTime.add(formattedTrainTime, "hh:mm"));

    firstTrainTime = moment(formattedTrainTime, "HH:mm");

    // alert(firstTrainTime);

    nextTrain = moment(firstTrainTime).add(addFrequency, "minutes");

    while (nextTrain < moment()){
      nextTrain = moment(nextTrain).add(addFrequency, "minutes");
    }
   

    let timeNow = moment();
    let timeRemaining = nextTrain.diff(moment(), "minutes");
    nextTrain = nextTrain.format("hh:mm");

    const tableNextTrain = $('<td>').append(nextTrain);
    const tableTimeRemaining = $('<td>').append(timeRemaining);
    // alert(timeRemaining + " minutes away");

    //Append table data to the table row
    tableRow.append(tableDataTrainName);
    tableRow.append(tableDataDestination);
    tableRow.append(tableDataFrequency);
    tableRow.append(tableNextTrain);
    tableRow.append(tableTimeRemaining);
       
       $("#train-info").append(tableRow);

    database.ref().push({
        trainName: addTrainName,
        destination: addDestination,
        frequency: addFrequency,
        firstTrain: addTrainTime,
        nextTraintime: nextTrain,
        minutesAway: timeRemaining,

    });

})