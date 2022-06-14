var gh = "";
Webcam.set({
  width: 350,
  height: 300,
  image_format: "png",
  png_quality: 90,
});
var op = "The Gesture Is - ";
var prediction = "";
camera = document.getElementById("camera");
Webcam.attach("#camera");

function takeSnapshot() {
  Webcam.snap(function (data_uri) {
    document.getElementById("result").innerHTML =
      '<img id="captured_image" src="' + data_uri + '"/>';
  });
}

console.log("ml5 version:", ml5.version);
function modelLoaded() {
  console.log("Model Loaded!");
}

function speak() {
  var synth = window.speechSynthesis;
  speak_data = "The gesture is " + prediction + "  " + gh;
  var utterThis = new SpeechSynthesisUtterance(speak_data);
  synth.speak(utterThis);
}

classifier = ml5.imageClassifier(
  "https://teachablemachine.withgoogle.com/models/PBo_xN5-B/model.json",
  modelLoaded
);

function modelLoaded() {
  console.log("ModelLoaded!");
}

function check() {
  img = document.getElementById("captured_image");
  classifier.classify(img, gotResult);
}

function gotResult(error, results) {
  if (error) {
    console.error(error);
  } else {
    console.log(results);
    document.getElementById("result_gesture_name").innerHTML =
      op + results[0].label;

    if (results[0].label == "hi") {
      document.getElementById("update_gesture").innerHTML = "&#128075;";
      gh = "it is used to say hello or goodbye ";
    }
    if (results[0].label == "thumbs up") {
      document.getElementById("update_gesture").innerHTML = "&#128077;";
      gh = "it is used to express approval";
    }
    if (results[0].label == "thumbs down") {
      document.getElementById("update_gesture").innerHTML = "&#128078;";
      gh = "it is used to express disapproval";
    }

    if (results[0].label == "up") {
      document.getElementById("update_gesture").innerHTML = "&#128070;";
      gh = "it is used to show upwards";
    }
    if (results[0].label == "down") {
      document.getElementById("update_gesture").innerHTML = "&#128071;";
      gh = "it is used to show downwards";
    }
    if (results[0].label == "nice") {
      document.getElementById("update_gesture").innerHTML = "&#128071;";
      gh = "it is used to tell something nice";
    }
    prediction = results[0].label;
    speak();
  }
}
