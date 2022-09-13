/**
 * Created by j514340 on 26.04.2019.
 */
'use strict';

//Level Editor
/*
0 Leer
1 Spieler
2 Ziel
3 Wand
4 Benefit
 */

//TODO Farben durch Bilder ersetzen

const SIZE = 50;
const BENEFITS = 14; //TODO Richtige Anzahl???

//Ausgewähltes Material
var selectedMaterial = 0;

//Geladenes Level
var loadedLevel = " ";

//Array für Feld erstellen
var field = new Array(10);
for(var i = 0; i < 10; i++){
    field[i] = new Array(10);
}

//Array für Feld befüllen
for(var i = 0; i < 10; i++){
    for(var u = 0; u < 10; u++){
        field[i][u] = 0;
    }
}

//Material Buttons
var bEmpty = new materialButton(0);
var bPlayer = new materialButton(1);
var bGoal = new materialButton(2);
var bWall = new materialButton(3);
var bBenefit = new materialButton(4);

var dir = bPlayer.getDirection();
var playerTile = false;

//Save Buttons
var bSave = new Button(200,600,100,50,'Speichern');

var img;

function setup(){
    var canvas = createCanvas(500,675);
    img = loadImage('../res/fi_logo.png');
    canvas.parent('canvas');
    background(255);
}

function draw(){
    dir = bPlayer.getDirection();
    background(255);
    for (var i = 0; i < field.length; i++) {
        for (var j = 0; j < field.length; j++) {
            switch(field[i][j]) {
                case 0:
                    fill(255);
                    break;
                case 1:
                    playerTile = true;
                    break;
                case 2:
                    image(img,i*SIZE, j*SIZE, SIZE, SIZE);
                    break;
                case 3:
                    fill(0);
                    break;
                case 4:
                    fill(255,0,0);
                    break;
                default:
                    fill(0,0,255);
                    alert('INVALID FIELD ID! '+ field[i][j]);
                    break;
            }
            if(!playerTile && field[i][j] != 2){
                rect(i * SIZE, j * SIZE, SIZE, SIZE);
            }else if(field[i][j] != 2){
                fill(255);
                rect(i * SIZE, j * SIZE, SIZE, SIZE);
                fill(0,255,0);
                switch(dir) {
                    case 0:
                        triangle(i*SIZE, j*SIZE+SIZE, i*SIZE+SIZE/2, j*SIZE, i*SIZE+SIZE, j*SIZE+SIZE);
                        break;
                    case 1:
                        triangle(i*SIZE, j*SIZE+SIZE, i*SIZE, j*SIZE, i*SIZE+SIZE, j*SIZE+SIZE/2);
                        break;
                    case 2:
                        triangle(i*SIZE, j*SIZE, i*SIZE+SIZE/2, j*SIZE+SIZE, i*SIZE+SIZE, j*SIZE);
                        break;
                    case 3:
                        triangle(i*SIZE+SIZE, j*SIZE, i*SIZE, j*SIZE+SIZE/2, i*SIZE+SIZE, j*SIZE+SIZE);
                        break;
                    default:
                        alert("INVALID DIRECTION");
                }
                playerTile = false;
            }
        }
    }
    bEmpty.draw();
    bPlayer.draw();
    bGoal.draw();
    bWall.draw();
    bBenefit.draw();

    bSave.draw();
}

//Level-Text Generieren
function saveLevel() {
    var levelText = "";

    var playerCount = 0;
    var fiCount = 0;
    var benefitCount = 0;

    for (var i = 0; i < field.length; i++) {
        for (var j = 0; j < field.length; j++) {
            levelText += "" + field[j][i];
            if (field[i][j] == 1) {
                playerCount++;
            }
            if (field[i][j] == 2) {
                fiCount++;
            }
            if (field[i][j] == 4) {
                benefitCount++;
            }
        }
        levelText += "-";
    }
    levelText+="D"+dir;
    if (playerCount === 1 && fiCount === 1 && benefitCount <= BENEFITS) {
        window.prompt("Kopieren und in \"LEVELNAME.txt\" im Ordner FindYourWay/levels abspeichern!", levelText);
    } else {
        alert("Es müssen sich genau ein Spieler, ein Ziel und elf Benefits auf dem Feld befinden!");
    }
}

//MouseListener
document.addEventListener("click", function () {

    if(bEmpty.isClicked()){
        selectedMaterial = 0;
    }
    else if(bPlayer.isClicked()){
        selectedMaterial = 1;
    }
    else if(bGoal.isClicked()){
        selectedMaterial = 2;
    }
    else if(bWall.isClicked()){
        selectedMaterial = 3;
    }
    else if(bBenefit.isClicked()){
        selectedMaterial = 4;
    }

    //Click im Spielfeld
    if(mouseY <= 500) {
        field[Math.floor(mouseX / SIZE)][Math.floor(mouseY / SIZE)] = selectedMaterial;
    }

    //Speichern
    if(bSave.isClicked()){
        saveLevel();
    }
});

function loadLevel() {
    var fakePath = document.getElementById("load").value;

    var path = "../levels"+fakePath.substring(11);

    loadedLevel = getLevel(path);



    bPlayer.dir = Number.parseInt(loadedLevel.charAt(loadedLevel.indexOf('D')+1));


    loadedLevel = loadedLevel.substring(0,loadedLevel.indexOf('D'));



    levelToArray();
}

function levelToArray() {
    var count = 0;
    for (var i = 0; i < field.length; i++) {
        for (var j = 0; j < field.length; j++) {

            if(!Number.isInteger(Number.parseInt(loadedLevel.charAt(count)))) {
                count++;
            }

            field[j][i] = Number.parseInt(loadedLevel.charAt(count));
            count++;
        }
    }
}