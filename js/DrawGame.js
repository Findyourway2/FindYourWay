/**
 * Created by j514340 on 22.07.2019.
 */
"use strict";

/*
 GUI-Elemente-Setup
 */
function setupGuiGame(){
    tutorialButton = new Button('Tutorial', color(225),tileSize, 0,tileSize*3,tileSize);
    levelButton = new Button('Level auswählen', color(225),6*tileSize, 0,tileSize*3,tileSize);

    playButton = new Button('', 255, tileSize * 12, 0, tileSize, tileSize, play);
    refreshButton = new Button('', 255, tileSize * 13, 0, tileSize, tileSize, refresh);
    stopButton = new Button('', 255, tileSize * 14, 0,  tileSize, tileSize, stop);

    moveButton = new Button('Gehe', color('#6591cb'), tileSize / 2, tileSize * 13);
    turnLeftButton = new Button('Dreh links', color('#6591cb'), tileSize / 2 * 6, tileSize * 13);
    turnRightButton = new Button('Dreh rechts', color('#6591cb'), tileSize / 2 * 11, tileSize * 13);
    forButton = new InputButton('Wiederhole', color('#009bde'), tileSize / 2 * 16, tileSize * 13, tileSize * 3.5, tileSize);
    ifButton = new Button('Wenn', color('#f56476'), tileSize / 2, tileSize / 2 * 29);
    whileButton = new Button('Solange', color('#009bde'), tileSize / 2 * 6, tileSize / 2 * 29);
    leseBenefitButton = new Button('Lese Vorteil', color('#477998'), tileSize / 2 * 11, tileSize / 2 * 29);

    onBenefitButton = new Button('Auf Vorteil', color('#c4d6b0'), tileSize / 2, tileSize / 2 * 32);
    wallInfrontButton = new Button('Vor Wand', color('#c4d6b0'), tileSize / 2 * 6, tileSize / 2 * 32);
    trueButton = new Button('Wahr', color('#c4d6b0'), tileSize / 2 * 11, tileSize / 2 * 32);

    syntaxError = new Notification("Warnung", "Syntaxfehler");
    winNotification = new Notification("Gewonnen", "Du hast gewonnen!\nDeine Punktzahl: " + punkte);
}

/*
 Drawmethode
 */
function drawGame(){
    background(250);
    fill(color('#dbdbdb'));
    stroke(204, 204, 204);
    rect(tileSize * 12, tileSize * 2, tileSize * 3, tileSize * 10);
    noStroke();
    for (var i = 0; i < field.length; i++) {
        for (var j = 0; j < field[i].length; j++) {
            field[i][j].drawTile();
        }
    }
    noFill();
    rect(0, 2*tileSize, 10 * tileSize, 10 * tileSize);
    if (started === true) {
        if ((frameCount * 0.95) % (whileStarted ? 0.0625 : 1) === 0) {
            player.runInstruction();
        }
    }
    player.draw();

    levelButton.drawButton();
    tutorialButton.drawButton();

    playButton.drawButton();
    refreshButton.drawButton();
    stopButton.drawButton();

    moveButton.drawButton();
    turnLeftButton.drawButton();
    turnRightButton.drawButton();
    forButton.drawButton();


    ifButton.drawButton();

    whileButton.drawButton();
    leseBenefitButton.drawButton();

    if (onOrNotOnBenefit) {
        onBenefitButton.drawButton();
    } else {
        notOnBenefitButton.drawButton();
    }

    if (wallOrNoWallInfront) {
        wallInfrontButton.drawButton();
    } else {
        noWallInfrontButton.drawButton();
    }

    if (trueOrFalse) {
        trueButton.drawButton();
    } else {
        falseButton.drawButton();
    }


    list.setScroller();
    list.baueListe();
    list.drawScrollLeiste();
    list.drawScroller();

    if (gehaltenerButton != null) {
        gehaltenerButton.dragButton();
    }
    list.hoverEdit();
    //Benefits werden gezeichnet, falls active
    for (var i = 0; i < field.length; i++) {
        for (var j = 0; j < field[i].length; j++) {
            if (field[i][j].id == 4) {
                field[i][j].benefit.drawPopUp();
            }
        }
    }
    syntaxError.draw();
    winNotification.draw();
}
/*
    Resizemethode
 */
function resizeGame(){
    //FIXME: Buttontext erst klein, wird dann aber sofort "normal"
    for (var i = 0; i < field.length; i++) {
        for (var j = 0; j < field[i].length; j++) {
            field[i][j].resize(j * tileSize, i * tileSize);
        }
    }
    player.tileSize = tileSize;
    player.getKoordinatenFromField(field);
    list.resize();

    //(tileSize,x,y, width, height)
    tutorialButton.resize(tileSize,0, tileSize*3, tileSize);
    levelButton.resize(6*tileSize,0, tileSize*3, tileSize);

    playButton.resize(tileSize * 12, 0, tileSize, tileSize);
    refreshButton.resize(tileSize * 13, 0, tileSize, tileSize);
    stopButton.resize(tileSize * 14, 0, tileSize, tileSize);

    if(wideScreen){
        moveButton.resize(tileSize*17+tileSize/4, tileSize*4);
        turnLeftButton.resize(tileSize*19+tileSize/4+tileSize/2, tileSize * 4);
        turnRightButton.resize(tileSize*21+tileSize/4+tileSize, tileSize * 4);
        forButton.resize(tileSize*19, tileSize * 8.5, tileSize * 3.5, tileSize);

        ifButton.resize(tileSize*17+tileSize/4, tileSize*5.5);
        whileButton.resize(tileSize*19+tileSize/4+tileSize/2, tileSize*5.5);
        leseBenefitButton.resize(tileSize*21+tileSize/4+tileSize, tileSize*5.5);

        if (onBenefitButton) {
            onBenefitButton.resize(tileSize*17+tileSize/4, tileSize*7);
        }
        if (notOnBenefitButton) {
            notOnBenefitButton.resize(tileSize*17+tileSize/4, tileSize*7);
        }
        if (wallInfrontButton) {
            wallInfrontButton.resize(tileSize*19+tileSize/4+tileSize/2, tileSize*7);
        }
        if (noWallInfrontButton) {
            noWallInfrontButton.resize(tileSize*19+tileSize/4+tileSize/2, tileSize*7);
        }
        if (trueButton) {
            trueButton.resize(tileSize*21+tileSize/4+tileSize, tileSize*7);
        }
        if (falseButton) {
            falseButton.resize(tileSize*21+tileSize/4+tileSize, tileSize*7);
        }
    }else {
        moveButton.resize(tileSize / 2, tileSize * 13);
        turnLeftButton.resize(tileSize / 2 * 6, tileSize * 13);
        turnRightButton.resize(tileSize / 2 * 11, tileSize * 13);
        forButton.resize(tileSize / 2 * 16, tileSize * 13, tileSize * 3.5, tileSize);


        ifButton.resize(tileSize / 2, tileSize / 2 * 29);

        whileButton.resize(tileSize / 2 * 6, tileSize / 2 * 29);
        leseBenefitButton.resize(tileSize / 2 * 11, tileSize / 2 * 29);
        if (onBenefitButton) {
            onBenefitButton.resize(tileSize / 2, tileSize / 2 * 32);
        }
        if (notOnBenefitButton) {
            notOnBenefitButton.resize(tileSize / 2, tileSize / 2 * 32);
        }
        if (wallInfrontButton) {
            wallInfrontButton.resize(tileSize / 2 * 6, tileSize / 2 * 32);
        }
        if (noWallInfrontButton) {
            noWallInfrontButton.resize(tileSize / 2 * 6, tileSize / 2 * 32);
        }
        if (trueButton) {
            trueButton.resize(tileSize / 2 * 11, tileSize / 2 * 32);
        }
        if (falseButton) {
            falseButton.resize(tileSize / 2 * 11, tileSize / 2 * 32);
        }

    }

    for (var i = 0; i < field.length; i++) {
        for (var j = 0; j < field[i].length; j++) {
            if (field[i][j].id == 4) {
                field[i][j].benefit.resize();
            }
        }
    }

    syntaxError.resize();
    winNotification.resize();
}


/*
 Mouse- / Touchlistener
 */
function mouseClickedInGame(){
    /**
     * 0 move
     * 1 turnleft
     * 2 turn right
     * 3 for
     * 4 if
     * 5 while
     * 6 leseBenefit
     * 7 onBenefit
     * 8 wallInfront
     * 9 true
     */

    if (!gewonnen) {
        if (stopButton.mouseWithinButton()) {
            punkte = 0;
            list.stopListe();
        }
    }

    if (!gewonnen && !started && !benefitOpen) {
        if(tutorialButton.mouseWithinButton()){
            drawGameSwitch = false;
            drawSelectLevelSwitch=false;
            drawTutorialSwitch=true;
        }
        else if(levelButton.mouseWithinButton()){
            drawGameSwitch = false;
            drawSelectLevelSwitch=true;
            drawTutorialSwitch=false;
        }
        else if (playButton.mouseWithinButton()) {
            punkte = 0;
            list.runListe();
        } else if (refreshButton.mouseWithinButton()) {
            punkte = 0;
            list.refresh();
        } else if (onOrNotOnBenefit === true && onBenefitButton.mouseWithinButton()) {
            switchBenefitButton();
        } else if (onOrNotOnBenefit === false && notOnBenefitButton.mouseWithinButton()) {
            switchBenefitButton();
        } else if (wallOrNoWallInfront === true && wallInfrontButton.mouseWithinButton()) {
            switchWallInfrontButton();
        } else if (wallOrNoWallInfront === false && noWallInfrontButton.mouseWithinButton()) {
            switchWallInfrontButton();
        } else if (trueOrFalse === true && trueButton.mouseWithinButton()) {
            switchTrueButton();
        } else if (trueOrFalse === false && falseButton.mouseWithinButton()) {
            switchTrueButton();
        }
    }

    if (syntaxError.xClicked()) {
        syntaxError.close();
    }
    if (winNotification.xClicked()) {
        winNotification.close();
    }

    for (var i = 0; i < field.length; i++) {
        for (var j = 0; j < field[i].length; j++) {
            if (field[i][j].id == 4) {
                if (field[i][j].benefit.xClicked()) {
                    if (wasStarted) {
                        started = true;
                    }
                    field[i][j].benefit.close();
                }
            }
        }
    }
}

function mousePressedInGame(){
    if (!gewonnen && !started && !benefitOpen) {
        if (moveButton.mouseWithinButton()) {
            gehaltenerButton = moveButton;
        } else if (turnLeftButton.mouseWithinButton()) {
            gehaltenerButton = turnLeftButton;
        } else if (turnRightButton.mouseWithinButton()) {
            gehaltenerButton = turnRightButton;
        } else if (ifButton.mouseWithinButton()) {
            gehaltenerButton = ifButton;
        } else if (whileButton.mouseWithinButton()) {
            gehaltenerButton = whileButton;
        } else if (onBenefitButton && onBenefitButton.mouseWithinButton()) {
            gehaltenerButton = onBenefitButton;
        } else if (notOnBenefitButton && notOnBenefitButton.mouseWithinButton()) {
            gehaltenerButton = notOnBenefitButton;
        } else if (wallInfrontButton && wallInfrontButton.mouseWithinButton()) {
            gehaltenerButton = wallInfrontButton;
        } else if (noWallInfrontButton && noWallInfrontButton.mouseWithinButton()) {
            gehaltenerButton = noWallInfrontButton;
        } else if (trueButton && trueButton.mouseWithinButton()) {
            gehaltenerButton = trueButton;
        } else if (falseButton && falseButton.mouseWithinButton()) {
            gehaltenerButton = falseButton;
        } else if (leseBenefitButton.mouseWithinButton()) {
            gehaltenerButton = leseBenefitButton;
        } else if (forButton.mouseWithinButton()) {
            if (forButton.getForSchluss()){
                gehaltenerButton = forButton;
            }else {
                gehaltenerButton = new InputButton('Wiederhole', color('#009bde'), tileSize / 2 * 16, tileSize * 13, tileSize * 3.5, tileSize);
                gehaltenerButton.festWert = forButton.getInput();
            }
        }
        list.takeFromList();
    }
}

function mouseReleasedInGame(){

    if (!gewonnen && !started && !benefitOpen) {
        if ((mouseX >= tileSize * 12) && (mouseX <= tileSize * 15) &&
            ((mouseY >= tileSize * 2) && (mouseY <= tileSize * 102) && (gehaltenerButton != null))
        ) {
            list.addEntry(gehaltenerButton);
            if(gehaltenerButton === ifButton && list.ifZwischenspeicher == null) {
                list.addEntry(gehaltenerButton);
            }
            if(gehaltenerButton === whileButton && list.whileZwischenspeicher == null) {
                list.addEntry(gehaltenerButton);
            }

        }else if(gehaltenerButton === ifButton && list.ifZwischenspeicher!=null){
            list.removeItem(4,list.ifZwischenspeicher.subID);
        }else if(gehaltenerButton === whileButton && list.whileZwischenspeicher!=null){
            list.removeItem(5,list.whileZwischenspeicher.subID);
        }

        list.ifZwischenspeicher = null;
        list.whileZwischenspeicher = null;

        gehaltenerButton = null;
    }
}

function touchStartedInGame(){
    if (!gewonnen && !started && !benefitOpen) {
        if (moveButton.mouseWithinButton()) {
            gehaltenerButton = moveButton;
        } else if (turnLeftButton.mouseWithinButton()) {
            gehaltenerButton = turnLeftButton;
        } else if (turnRightButton.mouseWithinButton()) {
            gehaltenerButton = turnRightButton;
        } else if (ifButton.mouseWithinButton()) {
            gehaltenerButton = ifButton;
        } else if (whileButton.mouseWithinButton()) {
            gehaltenerButton = whileButton;
        } else if (onBenefitButton && onBenefitButton.mouseWithinButton()) {
            gehaltenerButton = onBenefitButton;
        } else if (notOnBenefitButton && notOnBenefitButton.mouseWithinButton()) {
            gehaltenerButton = notOnBenefitButton;
        } else if (wallInfrontButton && wallInfrontButton.mouseWithinButton()) {
            gehaltenerButton = wallInfrontButton;
        } else if (noWallInfrontButton && noWallInfrontButton.mouseWithinButton()) {
            gehaltenerButton = noWallInfrontButton;
        } else if (trueButton && trueButton.mouseWithinButton()) {
            gehaltenerButton = trueButton;
        } else if (falseButton && falseButton.mouseWithinButton()) {
            gehaltenerButton = falseButton;
        } else if (leseBenefitButton.mouseWithinButton()) {
            gehaltenerButton = leseBenefitButton;
        } else if (forButton.mouseWithinButton()) {
            if (forButton.getForSchluss()){
                gehaltenerButton = forButton;
            }else {
                gehaltenerButton = new InputButton('Wiederhole', color('#009bde'), tileSize / 2 * 16, tileSize * 13, tileSize * 3.5, tileSize);
                gehaltenerButton.festWert = forButton.getInput();
            }
        }
        list.takeFromList();
    }
    return false;
}

function touchEndedInGame(){

    if (!gewonnen) {
        if (stopButton.mouseWithinButton()) {
            punkte = 0;
            list.stopListe();
        }
    }

    if (!gewonnen && !started && !benefitOpen) {
        if(tutorialButton.mouseWithinButton()){
            drawGameSwitch = false;
            drawSelectLevelSwitch=false;
            drawTutorialSwitch=true;
        }
        else if(levelButton.mouseWithinButton()){
            drawGameSwitch = false;
            drawSelectLevelSwitch=true;
            drawTutorialSwitch=false;
        }
        else if (playButton.mouseWithinButton()) {
            punkte = 0;
            list.runListe();
        } else if (refreshButton.mouseWithinButton()) {
            punkte = 0;
            list.refresh();
        } else if (onOrNotOnBenefit === true && onBenefitButton.mouseWithinButton()) {
            switchBenefitButton();
        } else if (onOrNotOnBenefit === false && notOnBenefitButton.mouseWithinButton()) {
            switchBenefitButton();
        } else if (wallOrNoWallInfront === true && wallInfrontButton.mouseWithinButton()) {
            switchWallInfrontButton();
        } else if (wallOrNoWallInfront === false && noWallInfrontButton.mouseWithinButton()) {
            switchWallInfrontButton();
        } else if (trueOrFalse === true && trueButton.mouseWithinButton()) {
            switchTrueButton();
        } else if (trueOrFalse === false && falseButton.mouseWithinButton()) {
            switchTrueButton();
        }
    }

    if (syntaxError.xClicked()) {
        syntaxError.close();
    }
    if (winNotification.xClicked()) {
        winNotification.close();
    }

    for (var i = 0; i < field.length; i++) {
        for (var j = 0; j < field[i].length; j++) {
            if (field[i][j].id == 4) {
                if (field[i][j].benefit.xClicked()) {
                    if (wasStarted) {
                        started = true;
                    }
                    field[i][j].benefit.close();
                }
            }
        }
    }

    if (!gewonnen && !started) {
        if ((mouseX >= tileSize * 12) && (mouseX <= tileSize * 15) &&
            ((mouseY >= tileSize * 2) && (mouseY <= tileSize * 102) && (gehaltenerButton != null))
        ) {
            list.addEntry(gehaltenerButton);
            if(gehaltenerButton === ifButton && list.ifZwischenspeicher == null) {
                list.addEntry(gehaltenerButton);
            }
            if(gehaltenerButton === whileButton && list.whileZwischenspeicher == null) {
                list.addEntry(gehaltenerButton);
            }
        }else if(gehaltenerButton === ifButton && list.ifZwischenspeicher!=null){
            list.removeItem(4,list.ifZwischenspeicher.subID);
        }else if(gehaltenerButton === whileButton && list.whileZwischenspeicher!=null){
            list.removeItem(5,list.whileZwischenspeicher.subID);
        }

        list.ifZwischenspeicher = null;
        list.whileZwischenspeicher = null;

        gehaltenerButton = null;
        if (forButton.getInputBox().focused) {
            forButton.getInputBox().blur();
        }
        return false;
    }
}

function switchBenefitButton(){
    if (onOrNotOnBenefit === true) {
        onOrNotOnBenefit = false;
        notOnBenefitButton = new Button('Nicht auf Vorteil', color('#a93f55'), tileSize / 2, tileSize / 2 * 28, tileSize);
        onBenefitButton = undefined;
    } else if (onOrNotOnBenefit === false) {
        onOrNotOnBenefit = true;
        notOnBenefitButton = undefined;
        onBenefitButton = new Button('Auf Vorteil', color('#c4d6b0'), tileSize / 2, tileSize / 2 * 28, tileSize);
    }
}

function switchWallInfrontButton(){
    if (wallOrNoWallInfront === true ) {
        wallOrNoWallInfront = false;
        noWallInfrontButton = new Button('Nicht vor Wand', color('#a93f55'), tileSize / 2 * 6, tileSize / 2 * 28, tileSize);
        wallInfrontButton = undefined;
    } else if (wallOrNoWallInfront === false) {
        wallOrNoWallInfront = true;
        noWallInfrontButton = undefined;
        wallInfrontButton = new Button('Vor Wand', color('#c4d6b0'), tileSize / 2 * 6, tileSize / 2 * 28, tileSize);
    }
}

function switchTrueButton(){
    if (trueOrFalse === true) {
        trueOrFalse = false;
        falseButton = new Button('Falsch', color('#a93f55'), tileSize / 2 * 11, tileSize / 2 * 28, tileSize);
        trueButton = undefined;
    } else if (trueOrFalse === false) {
        trueOrFalse = true;
        falseButton = undefined;
        trueButton = new Button('Wahr', color('#c4d6b0'), tileSize / 2 * 11, tileSize / 2 * 28, tileSize);
    }
}