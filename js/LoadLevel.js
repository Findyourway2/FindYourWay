/**
 * Created by j514340 on 29.04.2019.
 */
"use strict";
var levelText = "";

var level1,level2,level3,level4;

function loadLevels(){

    //SAVE!
    level1 = getLevel("../levels/beginner.txt");
    //level1 = getLevel("../levels/testlevel3.txt");
    //SAVE!
    level2 = getLevel("../levels/10ben_test.txt");
    level3 = getLevel("../levels/jan4.txt");
    //SAVE!
    level4 = getLevel("../levels/jan5.txt");
}

function getLevel(file){

    //Pfad wird übergeben bei Editor, ingame wird keine Datei extra ausgewählt
    if(file === undefined){
        //file = "../levels/testlevel1.txt";
        //file = "../levels/testlevel2.txt";
        //file = "../levels/yikes.txt";
        //file = "../levels/while_test.txt";
        //file="../levels/jan1.txt";
        file="../levels/beginner.txt";
        //file="../levels/testlevel3.txt";
    }

    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status == 0) {
                levelText = rawFile.responseText;
                //alert(levelText);
            }
        }
    }
    rawFile.send(null);

    return levelText;
}

function fillLevel() {

    var x = 0;
    var y = 0;

    for (var i = 0; i < loadedLevel.length; i++) {
        if (loadedLevel.charAt(i) === '-') {
            y++;
            x = 0;
        } else if (loadedLevel.charAt(i) === '1') {
            player.setPlayer(x, y);
            field[y][x].setId(Number.parseInt(loadedLevel.charAt(i)));
            x++;
        } else if (loadedLevel.charAt(i) === '2') {
            field[y][x].setSprite(logo_fi_neu);
            field[y][x].setId(Number.parseInt(loadedLevel.charAt(i)));
            x++;
        } else if (loadedLevel.charAt(i) === '4') {
            field[y][x].setId(Number.parseInt(loadedLevel.charAt(i)));
            x++;
        } else {
            field[y][x].setId(Number.parseInt(loadedLevel.charAt(i)));
            x++;
        }
    }
}

function updateLevel(){
    loadBenefits();
    
    dir = Number.parseInt(loadedLevel.charAt(loadedLevel.indexOf('D') + 1));


    loadedLevel = loadedLevel.substring(0, loadedLevel.indexOf('D'));

    for (var i = 0; i < 10; i++) {
        field[i] = [];
        for (var j = 0; j < 10; j++) {
            field[i].push(new Tile(j * tileSize, i * tileSize, tileSize));
        }
    }

    player = new Player(dir * 90, player_up, player_left, player_right, player_down, tileSize, field);
    fillLevel();
    player.getKoordinatenFromField(field);
}
