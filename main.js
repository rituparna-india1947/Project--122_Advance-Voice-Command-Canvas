x = 0;
y = 0;
draw_apple = "";
screen_width = 0;
screen_height = 0;
apple = "";
speak_data = "";
to_number = 0;

function preload() {
    apple = loadImage("apple.png");
}

var SpeechRecognition = window.webkitSpeechRecognition;
var recognition = new SpeechRecognition();

function start() {
    document.getElementById("status").innerHTML = "System is listening, please speak!";
    recognition.start();
}

recognition.onresult = function(event) {
    console.log(event);
    var content = event.results[0][0].transcript;
    document.getElementById("status").innerHTML = "The speech has been recognised as " + content;
    to_number = Number(content);

    if (Number.isInteger(to_number)) {
        document.getElementById("status").innerHTML = "Started drawing Apple(s)!";
        draw_apple = "set";
    }
    else {
        document.getElementById("status").innerHTML = "Speech is not recognised!"
    }
};

function setup() {
    screen_height = window.innerHeight;
    screen_width = window.innerWidth;
    canvas = createCanvas(screen_width, screen_height - 150);
    canvas.position(0, 150);
}

function draw() {
    if (draw_apple == "set") {
        for (var i = 1; i<= to_number; i++) {
          x = Math.floor(Math.random()*700);
          y = Math.floor(Math.random()*400);
          image(apple, x, y, 50, 50);
        }
        document.getElementById("status").innerHTML = "Apple(s) is(are) drawn!";
        speak_data = to_number + "Apple or Apples Drawn!";
        speak()
        draw_apple = "";
    }
}

function speak() {
    var synth = window.speechSynthesis;
    var utter_this = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utter_this);
    speak_data = "";
}