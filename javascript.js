var firebaseConfig = {
    apiKey: "AIzaSyC_s1rI4Tth2aIbg7wKbtIkSwf19KDswJY",
    authDomain: "fir-project-6c632.firebaseapp.com",
    databaseURL: "https://fir-project-6c632.firebaseio.com",
    projectId: "fir-project-6c632",
    storageBucket: "fir-project-6c632.appspot.com",
    messagingSenderId: "41063335494",
    appId: "1:41063335494:web:950d520c5e764016"
};

firebase.initializeApp(firebaseConfig);

var database = firebase.database();

$("#add-train-btn").on("click", function (event) {
    event.preventDefault();

    var trainName = $("#train-name-input").val().trim();
    var trainDes = $("#destination-input").val().trim();
    var trainTime = $("#train-time-input").val().trim();
    var trainsFreq = $("#frequency-input").val().trim();

    var trainSet = {
        name: trainName,
        destination: trainDes,
        time: trainTime,
        frequency: trainsFreq
    };

    database.ref().push(trainSet);

    console.log(trainSet.name);
    console.log(trainSet.destination);
    console.log(trainSet.time);
    console.log(trainSet.frequency);


    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#train-time-input").val("");
    $("#frequency-input").val("");
});

database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());

    var trainName = childSnapshot.val().name;
    var trainDes = childSnapshot.val().destination;
    var trainTime = childSnapshot.val().time;
    var trainsFreq = childSnapshot.val().frequency;

    console.log(trainName);
    console.log(trainDes);
    console.log(trainTime);
    console.log(trainsFreq);


    var timeCalculate = moment.unix(trainTime).format("HH:mm");
    console.log(timeCalculate);

    // Current Time
    var currentTime = moment();
    console.log(moment(currentTime).format("HH:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(timeCalculate, "X"), "minutes");
    console.log(diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % trainsFreq;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = trainsFreq - tRemainder;
    console.log(tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log(moment(nextTrain).format("HH:mm"));


    // Add each train's data into the table

    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(trainDes),
        $("<td>").text(trainsFreq),
        $("<td>").text(nextTrain).format("HH:mm"),
        $("<td>").text(nextTrain),
        $("<td>").text(tMinutesTillTrain),
        $("#trainRow > tbody").append(newRow)


    );
});

