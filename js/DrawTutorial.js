/**
 * Created by j514340 on 22.07.2019.
 */
"use strict";

var tutorialTitle, imgSolange, imgWenn, imgZiel, imgSteuerung;

/*
 GUI-Elemente-Setup
 */
function setupGuiTutorial(){
    //new Button(text, color, x, y, tileSize, width, height, image)
    returnToGameButton = new Button("Zurück", color(225),tileSize, 0,tileSize*3,tileSize);
    // 5 Leerzeichen vor und hinter Tutorial, sonst wird der Schriftzug nach unten verschoben! WARUM?
    tutorialTitle = new Title("     Tutorial     ",7*tileSize,0,3*tileSize,tileSize);

    //Image Preload
    imgSolange = loadImage('../res/solangeblock.PNG');
    imgWenn = loadImage('../res/wennblock.PNG');
    imgZiel = loadImage('../res/ziel.png');
    imgSteuerung = loadImage('../res/startstopreset.PNG');

}

/*
    Draw- / Resizemethoden
 */
function drawTutorial(){
    background(250);
    //Titel
    tutorialTitle.drawTitle();
    //GUI-Elemente
    forButton.input.remove();
    returnToGameButton.drawButton();

    //Text


    var zielTitel = "Ziel des Spiels";
    var ziel = "Ziel des Spiels ist es, die Spielfigur durch das Level zum Ziel, " +
        "der Finanz Informatik zu navigieren. Dabei kannst Du durch Lesen der blinkenden Felder, " +
        "den \"Benefits\", vieles über die FI erfahren und Bonuspunkte sammeln.";

    var steuerungTitel = "Steuerung";
    var steuerung = "Du steuerst die Figur, indem Du die Befehlsbausteine unter dem " +
        "Spielfeld in die Befehlsliste rechts vom Spielfeld ziehst. " +
        "Dunkelblaue Blöcke sind für die Steuerung der Figur zuständig. " +
        "Mit dem blinkenden \"Lese Vorteil\"-Block kannst Du die Benefits lesen. " +
        "Achtung, versuchst Du ein Benefit zu lesen, aber die Spielfigur steht nicht auf einem Benefit, gibt es Punktabzug! " +
        "Der rote \"Wenn\"-Block überprüft auf Bedingungen, welche durch die grünen Blöcke dargestellt werden. " +
        "Diese werden auch für den \"Solange\"-Block verwendet, der einen Code so lange ausführt, wie die Bedingung wahr ist. " +
        "Um auf eine Bedingung zu prüfen, musst Du nach einem \"Wenn\", oder \"Solange\" eine Bedingung direkt unter den " +
        "\"Wenn\"-, oder \"Solange\"-Block in die Befehlsliste ziehen. Mit einem Klick kannst Du Bedingungen negieren. " +
        "Mit \"Wiederhole\" kannst Du Code eine bestimmte Anzahl oft wiederholen. " +
        "Achtung: \"Wenn\" und die beiden Schleifen müssen den Code, der zu ihnen gehört, mit einem Weiteren Block umschließen!";

    fill(0);
    // text(text,x,y,width,height)

    textAlign(LEFT,TOP);

    textSize(tileSize*0.75);
    text(zielTitel,tileSize,1.5*tileSize,(((window.innerWidth/tileSize)*tileSize)-2*tileSize)/2,tileSize);

    image(imgZiel,((((window.innerWidth/tileSize)*tileSize)-2*tileSize)/2)+3*tileSize,3*tileSize, 6*tileSize,2*tileSize);

    textSize(tileSize*0.4);
    text(ziel,tileSize,2.5*tileSize,(((window.innerWidth/tileSize)*tileSize)-2*tileSize)/1.8,3*tileSize);

    textSize(tileSize*0.75);
    text(steuerungTitel,tileSize,5.5*tileSize,(((window.innerWidth/tileSize)*tileSize)-2*tileSize)/2,tileSize);

    image(imgSteuerung,((((window.innerWidth/tileSize)*tileSize)-2*tileSize)/2)+4.75*tileSize,7.5*tileSize, 3*tileSize,1.333*tileSize);

    image(imgWenn,((((window.innerWidth/tileSize)*tileSize)-2*tileSize)/2)+3*tileSize,10.5*tileSize, 3*tileSize, 4*tileSize);
    image(imgSolange,((((window.innerWidth/tileSize)*tileSize)-2*tileSize)/2)+6.5*tileSize,10.5*tileSize, 3*tileSize, 4*tileSize);

    textSize(tileSize*0.4);
    text(steuerung,tileSize,6.5*tileSize,(((window.innerWidth/tileSize)*tileSize)-2*tileSize)/1.8,20*tileSize);

}

function resizeTutorial(){
    //(x,y, width, height)
    returnToGameButton.resize(tileSize,0, tileSize*3, tileSize);

    tutorialTitle.resizeTitle(7*tileSize,0,3*tileSize,tileSize);
}

/*
    Mouse- / Touchlistener
 */
function mouseClickedInTutorial(){
    if(returnToGameButton.mouseWithinButton()){
        forButton.setInputField();

        drawGameSwitch = true;
        drawTutorialSwitch = false;
        drawSelectLevelSwitch = false;
    }
}

function mousePressedInTutorial(){

}

function mouseReleasedInTutorial(){

}

function touchStartedInTutorial(){

}

function touchEndedInTutorial(){
    if(returnToGameButton.mouseWithinButton()){
        forButton.setInputField();

        drawGameSwitch = true;
        drawTutorialSwitch = false;
        drawSelectLevelSwitch = false;
    }
}