/**
 * Created by j514340 on 22.07.2019.
 */
"use strict";

var selectLevelTitle, levelB1, levelB2, levelB3, levelB4;

/*
    GUI-Elemente-Setup
 */
function setupGuiSelectLevel(){
    //new Button(text, color, x, y,, width, height, image)
    //                              text,      color,        x,    y,  width,     height
    returnToGameButton = new Button("Zurück", color(225),tileSize, 0,tileSize*3, tileSize);
    
    selectLevelTitle = new Title("Level-Auswahl",7*tileSize,0,3*tileSize,tileSize);

    levelB1 = new LevelButton(tileSize*3, tileSize*3,tileSize*5, tileSize*5,1);
    levelB2 = new LevelButton(tileSize*9, tileSize*3,tileSize*5, tileSize*5,2);
    levelB3 = new LevelButton(tileSize*3, tileSize*9,tileSize*5, tileSize*5,3);
    levelB4 = new LevelButton(tileSize*9, tileSize*9,tileSize*5, tileSize*5,4);
}

/*
    Drawmethode
 */
function drawSelectLevel(){
    background(250);
    forButton.input.remove();

    //Titel
    selectLevelTitle.drawTitle();
    //GUI-Elemente
    returnToGameButton.drawButton();

    levelB1.drawButton();
    levelB2.drawButton();
    levelB3.drawButton();
    levelB4.drawButton();
}
/*
    Resizemethode
 */
function resizeSelectLevel(){
    //(x,y, width, height)
    returnToGameButton.resize(tileSize,0, tileSize*3, tileSize);

    selectLevelTitle.resizeTitle(7*tileSize,0,3*tileSize,tileSize);

    levelB1.resize(window.innerWidth/4-(5*(tileSize/2))/2, tileSize*3,tileSize*5, tileSize*5);
    levelB2.resize(window.innerWidth/2+(5*(tileSize/2))/2, tileSize*3, tileSize*5, tileSize*5);
    levelB3.resize(window.innerWidth/4-(5*(tileSize/2))/2, tileSize*9, tileSize*5, tileSize*5);
    levelB4.resize(window.innerWidth/2+(5*(tileSize/2))/2, tileSize*9, tileSize*5, tileSize*5);
}

/*
 Mouse- / Touchlistener
 */
function mouseClickedInSelectLevel(){
    if(returnToGameButton.mouseWithinButton()) {
        forButton.setInputField();

        drawGameSwitch = true;
        drawTutorialSwitch = false;
        drawSelectLevelSwitch = false;
    }
    if(levelB1.mouseWithinButton()){
        loadedLevel = level1;
        updateLevel();
        forButton.setInputField();

        drawGameSwitch = true;
        drawTutorialSwitch = false;
        drawSelectLevelSwitch = false;
    }
    if(levelB2.mouseWithinButton()){
        loadedLevel = level2;
        updateLevel();
        forButton.setInputField();

        drawGameSwitch = true;
        drawTutorialSwitch = false;
        drawSelectLevelSwitch = false;
    }
    if(levelB3.mouseWithinButton()){
        loadedLevel = level3;
        updateLevel();
        forButton.setInputField();

        drawGameSwitch = true;
        drawTutorialSwitch = false;
        drawSelectLevelSwitch = false;
    }
    if(levelB4.mouseWithinButton()){
        loadedLevel = level4;
        updateLevel();
        forButton.setInputField();

        drawGameSwitch = true;
        drawTutorialSwitch = false;
        drawSelectLevelSwitch = false;
    }
}

function mousePressedInSelectLevel(){

}

function mouseReleasedInSelectLevel(){

}

function touchStartedInSelectLevel(){

}

function touchEndedInSelectLevel(){
    if(returnToGameButton.mouseWithinButton()){
        forButton.setInputField();

        drawGameSwitch = true;
        drawTutorialSwitch = false;
        drawSelectLevelSwitch = false;
    }
    if(levelB1.mouseWithinButton()){
        loadedLevel = level1;
        updateLevel();
        forButton.setInputField();

        drawGameSwitch = true;
        drawTutorialSwitch = false;
        drawSelectLevelSwitch = false;
    }
    if(levelB2.mouseWithinButton()){
        loadedLevel = level2;
        updateLevel();
        forButton.setInputField();

        drawGameSwitch = true;
        drawTutorialSwitch = false;
        drawSelectLevelSwitch = false;
    }
    if(levelB3.mouseWithinButton()){
        loadedLevel = level3;
        updateLevel();
        forButton.setInputField();

        drawGameSwitch = true;
        drawTutorialSwitch = false;
        drawSelectLevelSwitch = false;
    }
    if(levelB4.mouseWithinButton()){
        loadedLevel = level4;
        updateLevel();
        forButton.setInputField();

        drawGameSwitch = true;
        drawTutorialSwitch = false;
        drawSelectLevelSwitch = false;
    }
}