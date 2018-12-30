var sound1;
var sound2;
var sound3;
var sound3FFT; //cette variable va stocker un objet permettant d' effectuer une analyse audio sur le son 'drone1'
var sound4;
var sound4Amp;
var sound5;
var sound5FFT;
var sound6;
var sound6FFT;
var sound7;
var sound8;

function preload() {
    sound1 = loadSound("../assets/CLAP_CLAP.wav"); // .. pour remonter /selection le dossier assets
    sound2 = loadSound("../assets/high_bell.wav");
    sound3 = loadSound("../assets/synthwave.wav");
    sound4 = loadSound("../assets/basse_menace.wav");
    sound5 = loadSound("../assets/bell.wav");
    sound6 = loadSound("../assets/basse_mélo.wav");
    sound7 = loadSound("../assets/wave_speed_slow.wav");
    sound8 = loadSound("../assets/triangle.wav");
}

function setup() {
    // put setup code here
    createCanvas(windowWidth, windowHeight); //CAnvas est l'espace de travail
    background(0);

    // on créee un objet de type FFT (fast fourier transform) pour analyser l'énergie des bandes de fréquence de notre son
    sound3FFT = new p5.FFT(0.8, 16); // premier paramètre est le smoothing, le second est le nombre de bandes de fréquences souhaité.
    sound3FFT.setInput(sound3) // on 'branche' cet analyseur à notre son drone1.
    sound4Amp = new p5.Amplitude();
    sound4Amp.setInput(sound4);
    // on créee un objet de type FFT (fast fourier transform) pour obtenir une représentation sous forme de waveform.
    sound5FFT = new p5.FFT(0.8, 2048)
    sound5FFT.setInput(sound5) // on 'branche' cet analyseur à notre son sound5
    sound6FFT = new p5.FFT(0.8, 16);
    sound6FFT.setInput(sound6)

    //if (condition)alors le code {}est executé
    // sound1.loop(); =lancement au démarrage 

}

function draw() {

    background(0);

    playSound(sound1, 65); //toujours dans l'ordre jouer le son, puis le if, puis le push et pop
    if (sound1.isPlaying() == true) { //map = regles de proportionalité 
        push();
        var radius = map(sound1.currentTime(), 0, sound1.duration(), 50, width);
        // = rayon du cercle /situer par rapport au son/ durée du son/ début/ fin (longueur)/ rayon min/jusqu'a la longueur
        strokeWeight(10);
        stroke(150, 200, 0);
        fill(250, 200, 15);
        ellipse(width * 0.5, height * 0.5, radius, radius); // * equivaut à multiplié
        pop();
    }
    if (sound2.isPlaying() == true) {
        push();
        var angle = map(sound2.currentTime(), 0, sound2.duration(), 0, PI);
        translate(width * 0.5, height * 0.5);
        rotate(angle);
        rectMode(CENTER);
        noStroke();
        fill(250, 205, 108);
        rect(0, 0, width * 0.5, height * 0.2);

        pop();

    }
    playSound(sound4, 82);
    if (sound4.isPlaying() == true) {
        push()
        var lvl = sound4Amp.getLevel();
        var whitelvl = map(lvl, 0, 0.25, 0, 255)
        noStroke();
        fill(whitelvl);
        rect(0, 0, width, height);
        console.log(lvl);

    }
    playSound(sound3, 69); // 'e' == sound3
    if (sound3.isPlaying() == true) {
        push()
        sound3FFT.analyze();
        rectMode(CENTER);
        var nrj1 = sound3FFT.getEnergy("bass")
        push()
        noStroke
        fill(146, 41, 235, nrj1)
        translate(width * 0.25, height * 0.5)
        rotate(PI / 4)
        rect(0, 0, width * 0.2, width * 0.2)
        pop()

        push()
        noStroke
        fill(146, 41, 255, 50)
        translate(width * 0.5, height * 0.5)
        rotate(PI / 4)
        rect(0, 0, nrj1, nrj1)
        pop()

        push()
        noStroke
        fill(146, 41, 235, nrj1)
        translate(width * 0.75, height * 0.5)
        rotate(PI / 4)
        rect(0, 0, width * 0.2, width * 0.2)
        pop()

        pop()
    }
    playSound(sound5, 84) //t = sound5
    if (sound5.isPlaying() == true) {
        push()
        var waveform = sound5FFT.waveform();
        noFill();
        beginShape();
        stroke(150, 255, 225); // waveform is mint
        strokeWeight(10);
        for (var i = 0; i < waveform.length; i++) {
            var x = map(i, 0, waveform.length, 0, width);
            var y = map(waveform[i], -1, 1, 0, height);
            curveVertex(x, y);
        }
        endShape();
        pop()

    }
    playSound(sound6, 89)
    if (sound6.isPlaying() == true) {
        push()
        translate(width * 0.5, height * 0.5);
        rotate (frameCount/100.0);
        star(0, 0, 1000, 10, 40);
        pop();

    }

    function star(x, y, radius1, radius2, npoints) {
        var angle = TWO_PI / npoints;
        var halfAngle = angle / 2.0;
        beginShape();
        for (var a = 0; a < TWO_PI; a += angle) {
            var sx = x + cos(a) * radius2;
            var sy = y + sin(a) * radius2;
            vertex(sx, sy);
            sx = x + cos(a + halfAngle) * radius1;
            sy = y + sin(a + halfAngle) * radius1;
            vertex(sx, sy);
        }
        endShape(CLOSE);
    }
    playSound(sound7, 85)
    if (sound6.isPlaying() == true) {
        push()

    }
    playSound(sound2, 90);
    playSound(sound3, 69);
    playSound(sound4, 82);
    playSound(sound5, 84);
    playSound(sound6, 89);
    playSound(sound7, 85);
    playSound(sound8, 73);
}


/*if (keyIsDown(90) == true) {
        if (sound2.isPlaying() == false) {
            sound2.play();
        }
    }*/


function playSound(sound, keyId) {
    if (keyIsDown(keyId) == true) {
        if (sound.isPlaying() == false) {
            sound.play();
        }
    }
}
// put drawing code here



function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    background(0); //windowWidth, windowHeight=dimensions de la fenêtre
}
