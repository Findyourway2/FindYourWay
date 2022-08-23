/**
 * Created by j508000 on 25.04.2019.
 */
"use strict";

//TODO: sortieren und in die entsprechenden Draw***.js Dateien auslagern (Übersichtlichkeit)
var canvas, reference, tileSize, field, player, loadedLevel, logo_fi, logo_fi_neu, dir, list, turnLeftButton, moveButton, turnRightButton, started,
    playButton, stopButton, refreshButton, whileButton, onBenefitButton, wallInfrontButton, trueButton, notOnBenefitButton, noWallInfrontButton, falseButton,
    ifButton, leseBenefitButton, forButton, gehaltenerButton, currentIndex, ifStarted, ifNotStarted, wasStarted, syntaxError, winNotification,
    punkte, gewonnen, benefitOpen, whileStarted, whileBlock, whileCondition, onOrNotOnBenefit, wallOrNoWallInfront, trueOrFalse, BLACK, levelButton,
    tutorialButton, drawGameSwitch ,drawTutorialSwitch, drawSelectLevelSwitch, returnToGameButton, wideScreen;

//Image vars
var player_up, player_right, player_down, player_left, play, stop, refresh;

//Font
var spkFont;

//T O D O zeigen?
var showToDo = false;
var todo =
    "TODO (zum ausschalten showToDo=false):\n" +
    "- Punktesystem überarbeiten, z.B. for 9999 darf nicht besser sein als eine Lösung mit while\n" +
    "- Man kann while und for verschachteln!\n" +
    "- scrollup button?\n" +
    "- start in widescreen -> zu hochkant -> rip\n" +
    "- beim levelwechsel wird die liste nicht gelöscht";

function setup() {
    punkte = 0;

    drawGameSwitch = true;
    drawTutorialSwitch = false;
    drawSelectLevelSwitch = false;

    BLACK = color('#373f51');
    
    started = false;
    onOrNotOnBenefit = true;
    wallOrNoWallInfront = true;
    trueOrFalse = true;

    //Font Preload
    spkFont = loadFont("../font/Sparkasse_Rg.ttf");
    textFont(spkFont);
    //Image Preload
    player_up = loadImage('../res/player_new_up.png');
    player_right = loadImage('../res/player_new_right.png');
    player_down = loadImage('../res/player_new_down.png');
    player_left = loadImage('../res/player_new_left.png');
    play = loadImage('../res/play.png');
    stop = loadImage('../res/stop.png');
    refresh = loadImage('../res/refresh.png');
    logo_fi = loadImage('../res/logo_neu_fi.png');
    logo_fi_neu = loadImage('../res/logo_neu_fi.png');
    canvas = createCanvas(window.innerWidth, window.innerHeight);
    field = [];
    reference = getReference();
    tileSize = (reference * 0.6) / 10;

    loadLevels();
    
    loadedLevel = level1;
    updateLevel();

    list = new CommandList();

    currentIndex = 0;
    ifStarted = false;
    ifNotStarted = false;
    wasStarted = false;

    //GUI Elemente
    //    
    //GAME
    setupGuiGame();
    //ENDE GAME

    //TUTORIAL
    setupGuiTutorial();
    //ENDE TUTORIAL
    
    //SELECTLEVEL
    setupGuiSelectLevel();
    //ENDE SELECTLEVEL
    
}

function draw() {
    if(drawGameSwitch){
        resizeGame();
        drawGame();
    }else if(drawTutorialSwitch){
        resizeTutorial();
        drawTutorial();
    }else if(drawSelectLevelSwitch){
        resizeSelectLevel();
        drawSelectLevel();
    }else{
        alert("ERROR: No draw method!");
    }
}

window.onresize = function () {
    var w = window.innerWidth;
    var h = window.innerHeight;
    canvas.size(w, h);
    reference = getReference();
    tileSize = (reference * 0.6) / 10;

    if(drawGameSwitch){
        resizeGame();
    }else if(drawTutorialSwitch){
        resizeTutorial();
    }else if(drawSelectLevelSwitch){
        resizeSelectLevel();
    }else{
        //TODO das hat beim ipad einen fehler erwirkt!
        alert("ERROR: No draw method!");
    }
};

function getReference() {
    if (width >= height) {
        wideScreen = true;
        return height;
    } else {
        wideScreen = false;
        return width;
    }
}