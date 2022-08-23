/**
 * Created by j514340 on 22.07.2019.
 */
"use strict";

function mouseClicked() {
    if(drawGameSwitch){
        mouseClickedInGame();
    }else if(drawTutorialSwitch){
        mouseClickedInTutorial();
    }else if(drawSelectLevelSwitch){
        mouseClickedInSelectLevel();
    }else{
        alert("ERROR: No draw method!");
    }
}

function mousePressed() {
    if(drawGameSwitch){
        mousePressedInGame();
    }else if(drawTutorialSwitch){
        mousePressedInTutorial();
    }else if(drawSelectLevelSwitch){
        mousePressedInSelectLevel();
    }else{
        alert("ERROR: No draw method!");
    }
}

function mouseReleased() {
    if(drawGameSwitch){
        mouseReleasedInGame();
    }else if(drawTutorialSwitch){
        mouseReleasedInTutorial();
    }else if(drawSelectLevelSwitch){
        mouseReleasedInSelectLevel();
    }else{
        alert("ERROR: No draw method!");
    }
}

/*
 Soll dafür sorgen, dass der Browser auf iOS nicht scrollt wenn man den Finger bewegt.
 */
function touchStarted() {
    if(drawGameSwitch){
        touchStartedInGame();
    }else if(drawTutorialSwitch){
        touchStartedInTutorial();
    }else if(drawSelectLevelSwitch){
        touchStartedInSelectLevel();
    }else{
        alert("ERROR: No draw method!");
    }
}
function touchMoved() {
    return false;
}
function touchEnded() {
    if(drawGameSwitch){
        touchEndedInGame();
    }else if(drawTutorialSwitch){
        touchEndedInTutorial();
    }else if(drawSelectLevelSwitch){
        touchEndedInSelectLevel();
    }else{
        alert("ERROR: No draw method!");
    }
}