/**
 * Created by j514340 on 06.05.2019.
 */
'use strict';

class CommandList{

    constructor(){
        this.ifCounter = 1;
        this.secondIfSwitch = true;
        this.ifZwischenspeicher = null;
        this.lastIf = [];
        this.whileCounter = 1;
        this.secondWhileSwitch = true;
        this.whileZwischenspeicher = null;
        this.lastWhile = [];
        this.liste = [];
        this.width = tileSize*3;
        this.height = tileSize;
        this.hue = 210; //Farbe 210 bis 330 und zurück
        this.farbRichtung = 'up'; //Boolean der angibt in welche Richtung die Farbe sich ändert
        this.scrollerY = tileSize*2;
        this.entries = {
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
             * 10 empty
             */

            MOVE: {id: 0, text: "Gehe", color: color('#6591cb'), func: function(){player.changeDestination(1)}, index: this.liste.length},

            TURN_LEFT: {id: 1, text: "Dreh links", color: color('#6591cb'), func: function(){player.turnLeft()}, index: this.liste.length},

            TURN_RIGHT: {id: 2, text: "Dreh rechts", color: color('#6591cb'), func: function(){player.turnRight()}, index: this.liste.length},

            IF: {id: 4, isNew: true, text: "Wenn", color: color('#f56476'), func: function(){

                if(ifStarted && player.instructions[0].subID == list.lastIf[list.lastIf.length-1]){
                    //erst bei letzem lastif im array//ifStarted = false;
                    list.lastIf.pop();
                    if(list.lastIf.length == 0){
                        ifStarted=false;
                    }
                }else {
                    list.lastIf.push(player.instructions[0].subID);
                    player.instructions.shift();
                    if (player.instructions[0].func()) {
                        ifStarted = true;
                    } else {
                        var count = 0;
                        while (player.instructions[count].subID != list.lastIf[list.lastIf.length-1]) {
                            count++;
                        }
                        for (var i = 0; i < count; i++) {
                            player.instructions.shift();
                        }
                        list.lastIf.pop();
                    }
                }
            }, index: this.liste.length},
            WHILE: {id: 5, text: "Solange", isNew: true, color: color('#009bde'), func: function(){

                if(whileStarted){
                    if(whileCondition()){
                        var newArray = [];
                        newArray.push({func: function(){return true}});
                        for(var i = 0; i < whileBlock.length; i++){
                            newArray.push(whileBlock[i]);
                        }
                        for(var i = 0; i < player.instructions.length; i++){
                            newArray.push(player.instructions[i]);
                        }
                        player.instructions = newArray;
                    }else{
                        whileStarted = false;
                    }

                }else {
                    whileBlock =[];
                    var whileCount = 1;
                    var window = new Notification("Fehler", "Syntaxfehler");
                    try {
                        while (player.instructions[whileCount].id != 5) {
                            whileBlock.push(player.instructions[whileCount]);
                            whileCount++;

                        }
                    } catch (e){
                        list.runListe();
                        return;
                    }
                    player.instructions.shift();
                    whileCondition = player.instructions[0].func;
                    if (whileCondition()) {
                        whileStarted = true;
                        var zwischenSpeicher = [];
                        for( var i = whileCount; i < player.instructions.length;i++){
                            zwischenSpeicher.push(player.instructions[i]);
                        }
                        player.instructions.splice(whileCount,player.instructions.length-whileCount);
                        for(var i = 0; i < zwischenSpeicher.length; i++){
                            player.instructions.push(zwischenSpeicher[i]);
                        }
                        var newArr = [];
                        newArr.push({func: function(){return true}});
                        for(var i = 0; i < player.instructions.length; i++){
                            newArr.push(player.instructions[i]);
                        }
                        player.instructions = newArr;
                    } else {
                        var count = 0;
                        while (player.instructions[count].id != 5) {
                            count++;
                        }
                        for (var i = 0; i < count; i++) {
                            player.instructions.shift();
                        }
                    }
                }
            }, index: this.liste.length},
            ON_BENEFIT: {id: 7, text: "Auf Vorteil", color: color('#c4d6b0'), func: function(){
                if(player.playfield[player.yIndex][player.xIndex].id == 4){
                    return true;
                }
                return false;
            }, index: this.liste.length},
            NOT_ON_BENEFIT: {id: 7, text: "Nicht auf Vorteil", color: color('#a93f55'), func: function(){
                if(player.playfield[player.yIndex][player.xIndex].id == 4){
                    return false;
                }
                return true;
            }, index: this.liste.length},
            WALL_INFRONT: {id: 8, text: "Vor Wand", color: color('#c4d6b0'), func: function(){
                switch(player.dir){
                    case 0:
                        var newY = player.yIndex-1;
                        if(newY < 0){
                            console.log("Vor Wand");
                            return true;
                        }
                        if(player.playfield[player.yIndex-1][player.xIndex] === undefined || player.playfield[player.yIndex-1][player.xIndex].id == 3){
                            console.log("Vor Wand");
                            return true;
                        }
                        console.log("Nicht vor Wand");
                        return false;
                        break;
                    case 90:
                        var newX = player.xIndex+1;
                        if(newX > 9){
                            console.log("Vor Wand");
                            return true;
                        }
                        if(player.playfield[player.yIndex][player.xIndex+1] === undefined || player.playfield[player.yIndex][player.xIndex+1].id == 3){
                            console.log("Vor Wand");
                            return true;
                        }
                        console.log("Nicht vor Wand");
                        return false;
                        break;
                    case 180:
                        var newY = player.yIndex+1;
                        if(newY > 9){
                            console.log("Vor Wand");
                            return true;
                        }
                        if(player.playfield[player.yIndex+1][player.xIndex] === undefined || player.playfield[player.yIndex+1][player.xIndex].id == 3){
                            console.log("Vor Wand");
                            return true;
                        }
                        console.log("Nicht vor Wand");
                        return false;
                        break;
                    case 270:
                        var newX = player.xIndex-1;
                        if(newX < 0){
                            console.log("Vor Wand");
                            return true;
                        }
                        if(player.playfield[player.yIndex][player.xIndex-1] === undefined || player.playfield[player.yIndex][player.xIndex-1].id == 3){
                            console.log("Vor Wand");
                            return true;
                        }
                        console.log("Nicht vor Wand");
                        return false;
                        break;
                    default:
                        break;
                }
            }, index: this.liste.length},
            NO_WALL_INFRONT: {id: 8, text: "Nicht vor Wand", color: color('#a93f55'), func: function(){
                switch(player.dir){
                    case 0:
                        var newY = player.yIndex-1;
                        if(newY < 0){
                            return false;
                        }
                        if(player.playfield[player.yIndex-1][player.xIndex] === undefined || player.playfield[player.yIndex-1][player.xIndex].id == 3){
                            return false;
                        }
                        return true;
                        break;
                    case 90:
                        var newX = player.xIndex+1;
                        if(newX > 9){
                            return false;
                        }
                        if(player.playfield[player.yIndex][player.xIndex+1] === undefined || player.playfield[player.yIndex][player.xIndex+1].id == 3){
                            return false;
                        }
                        return true;
                        break;
                    case 180:
                        var newY = player.yIndex+1;
                        if(newY > 9){
                            return false;
                        }
                        if(player.playfield[player.yIndex+1][player.xIndex] === undefined || player.playfield[player.yIndex+1][player.xIndex].id == 3){
                            return false;
                        }
                        return true;
                        break;
                    case 270:
                        var newX = player.xIndex-1;
                        if(newX < 0){
                            return false;
                        }
                        if(player.playfield[player.yIndex][player.xIndex-1] === undefined || player.playfield[player.yIndex][player.xIndex-1].id == 3){
                            return false;
                        }
                        return true;
                        break;
                    default:
                        break;
                }
            }, index: this.liste.length},
            TRUE: {id: 9, text: "Wahr", color: color('#c4d6b0'), func: function(){return true}, index: this.liste.length},
            FALSE: {id: 9, text: "Falsch", color: color('#a93f55'), func: function(){return false}, index: this.liste.length},
            LESE_BENEFIT: {id: 6, text: "Lese Vorteil", color: color('#477998'), func: function(){
                console.log("Lese Vorteil");

                if(field[player.yIndex][player.xIndex].benefit != null){
                    punkte += 100;
                    field[player.yIndex][player.xIndex].benefit.open();
                }else{
                    punkte -= 50;
                }

            }, index: this.liste.length},
            // FOR: {id: 3, text: "For", color:"", func: function(){console.log("forButton")}, index: this.liste.length},
            EMPTY:{id: 10, text: "", color: color(200, 200, 200) }
        }
    }

    baueListe(){
        var listZaehler = 0;
        var scrollerTile = Math.floor((this.scrollerY/tileSize)-2);
        var relationsIndex = scrollerTile/10;
        this.liste.forEach(function(listEntry, i){
            if((listZaehler < 10)
                    //Scrolleiste noch zu lang!!!
                && (i >= Math.round((this.liste.length-1)*relationsIndex))
                &&(i <= Math.round((this.liste.length-1)*relationsIndex)+10)){
                this.baueStein(listEntry, listZaehler);
                listZaehler++;
            }


        }.bind(this));
    }

    baueStein(listEntry, index){
        var x = tileSize*12;
        var y = tileSize;
        if( listEntry.id == 6){
            stroke(204,204,204);
            colorMode(HSB);
            if(this.farbRichtung === 'up'){
                fill(this.hue, 100, 100);
                this.hue = this.hue + 0.5;
                if(this.hue >= 329){
                    this.farbRichtung = 'down';
                }
            }else if(this.farbRichtung = 'down'){
                fill(this.hue, 100, 100);
                this.hue = this.hue - 0.5;
                if(this.hue <= 198){
                    this.farbRichtung = 'up';
                }
            }
            rect(x, 2 * y + y * index, this.width, this.height);
            noStroke();
            colorMode(RGB);
            textAlign(CENTER, CENTER);
            textSize(this.height / 3);
            fill(255,255,255);
            text(listEntry.text, x + (this.width / 2), 2 * y + y * index + (this.height / 2));
        }else {
            stroke(204,204,204);
            fill(listEntry.color);
            rect(x, 2 * y + y * index, this.width, this.height);
            noStroke();
            textAlign(CENTER, CENTER);
            textSize(this.height / 3);
            fill(BLACK);
            if(listEntry.text ==="Nicht auf Vorteil" || listEntry.text ==="Nicht vor Wand" || listEntry.text ==="Falsch"){
                fill(255);
            }
            text(listEntry.text, x + (this.width / 2), 2 * y + y * index + (this.height / 2));
        }
    }

    addEntry(type){
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
         * 10 empty
         */
        var scrollerTile = Math.floor((this.scrollerY/tileSize)-2);
        var relationIndex = scrollerTile/10;
        var firstShownIndex = Math.round((this.liste.length-1)*relationIndex);

        var tileY = Math.floor(mouseY/tileSize);
        tileY -= 2;

        var InsertIndex = firstShownIndex + tileY;

        switch(type){
            case moveButton:
                this.insert(this.entries.MOVE, InsertIndex);
                break;
            case turnLeftButton:
                this.insert(this.entries.TURN_LEFT, InsertIndex);
                break;
            case turnRightButton:
                this.insert(this.entries.TURN_RIGHT, InsertIndex);
                break;
            case ifButton:
                if(this.ifZwischenspeicher != null){
                    this.insert(this.ifZwischenspeicher, InsertIndex);
                    if(this.ifZwischenspeicher.isNew && this.checkSecondItem(4,this.ifZwischenspeicher.subID)) {
                        this.ifZwischenspeicher = null;
                    }
                }else {
                    this.insert(this.entries.IF, InsertIndex);
                }
                break;
            case whileButton:
                if(this.whileZwischenspeicher != null){
                    this.insert(this.whileZwischenspeicher, InsertIndex);
                    if(this.whileZwischenspeicher.isNew && this.checkSecondItem(5,this.whileZwischenspeicher.subID)) {
                        this.whileZwischenspeicher = null;
                    }
                }else {
                    this.insert(this.entries.WHILE, InsertIndex);
                }
                break;
            case leseBenefitButton:
                this.insert(this.entries.LESE_BENEFIT, InsertIndex);
                break;
            case onBenefitButton:
                this.insert(this.entries.ON_BENEFIT, InsertIndex);
                break;
            case wallInfrontButton:
                this.insert(this.entries.WALL_INFRONT, InsertIndex);
                break;
            case trueButton:
                this.insert(this.entries.TRUE, InsertIndex);
                break;
            case notOnBenefitButton:
                this.insert(this.entries.NOT_ON_BENEFIT, InsertIndex);
                break;
            case noWallInfrontButton:
                this.insert(this.entries.NO_WALL_INFRONT, InsertIndex);
                break;
            case falseButton:
                this.insert(this.entries.FALSE, InsertIndex);
                break;
            default:
                if(type instanceof InputButton) {
                    var btnInput = type.festWert;
                    if (!forButton.getForSchluss()) {
                        var btnText = forButton.text + ' ' + btnInput + ' mal';
                    } else {
                        var btnText = forButton.text;
                    }
                    this.insert({
                        id: 3, text: btnText, input: btnInput, color: color('#009bde'), func: function () {
                            var functions = [];
                            player.instructions.shift();
                            var firstElement = player.instructions[0];
                            while (player.instructions[0].id !== 3) {
                                functions.push(player.instructions[0]);
                                player.instructions.shift();
                            }
                            player.instructions.shift();
                            var instructions_copy = player.instructions.slice(0);

                            player.instructions = [];
                            for (var i = 0; i < btnInput; i++) {
                                for (var u = 0; u < functions.length; u++) {
                                    player.instructions.push(functions[u]);
                                }
                            }
                            for (var x = 0; x < instructions_copy.length; x++) {
                                player.instructions.push(instructions_copy[x]);
                            }

                            //Das erste Element muss doppelt sein, da die Listenausführung noch FOR rauskicken will, was wir hier aber schon entfernt haben
                            player.instructions.unshift(firstElement);
                        }, index: this.liste.length
                    }, InsertIndex);
                    forButton.setForSchluss();
                }
                break;
        }
    }

    hoverEdit(){
        var scrollerTile = Math.floor((this.scrollerY/tileSize)-2);
        var relationIndex = scrollerTile/10;
        var firstShownIndex = Math.round((this.liste.length-1)*relationIndex);

        var tileY = Math.floor(mouseY/tileSize);
            tileY -= 2;

        var InsertIndex = firstShownIndex + tileY;

        if ((mouseX >= tileSize*12) && (mouseX <= tileSize*15) &&
            ((mouseY >= tileSize*2) && (mouseY <=  tileSize*102)&&(gehaltenerButton!=null))
        ) {
            if (this.liste[InsertIndex] == this.entries.EMPTY) {
                return;
            } else {
                for (var i = 0; i < this.liste.length; i++) {
                    if (this.liste[i] == this.entries.EMPTY) {
                        this.liste.splice(i, 1);
                    }
                }
                this.liste.splice(InsertIndex, 0, this.entries.EMPTY);
            }
        }else {
            for (var i = 0; i < this.liste.length; i++) {
                if (this.liste[i] == this.entries.EMPTY) {
                    this.liste.splice(i, 1);
                }
            }
        }

    }

    takeFromList(){
        var scrollerTile = Math.floor((this.scrollerY/tileSize)-2);
        var relationIndex = scrollerTile/10;
        var firstShownIndex = Math.round((this.liste.length-1)*relationIndex);

        var tileY = Math.floor(mouseY/tileSize);
        tileY -= 2;

        var insertIndex = firstShownIndex + tileY;
        if ((mouseX >= tileSize*12) && (mouseX <= tileSize*15) &&
            ((mouseY >= tileSize*2) && (mouseY <=  tileSize*102)&&(gehaltenerButton==null)&&(insertIndex < this.liste.length))
        ) {
            if(this.liste[insertIndex].id == 0){
                gehaltenerButton = moveButton;
            }
            if(this.liste[insertIndex].id == 1){
                gehaltenerButton = turnLeftButton;
            }
            if(this.liste[insertIndex].id == 2){
                gehaltenerButton = turnRightButton;
            }
            if(this.liste[insertIndex].id == 4){
                gehaltenerButton = ifButton;
                this.ifZwischenspeicher = this.getCommandCopy(this.liste[insertIndex]);
            }
            if(this.liste[insertIndex].id == 7){
                if(this.liste[insertIndex].text == "Nicht auf Vorteil"){
                    if(notOnBenefitButton) {
                        gehaltenerButton = notOnBenefitButton;
                    }else{
                        switchBenefitButton();
                        gehaltenerButton = notOnBenefitButton;
                    }
                }else {
                    if(onBenefitButton) {
                        gehaltenerButton = onBenefitButton;
                    }else{
                        switchBenefitButton();
                        gehaltenerButton = onBenefitButton;
                    }
                }
            }
            if(this.liste[insertIndex].id == 8){
                if(this.liste[insertIndex].text == "Nicht vor Wand"){
                    if(noWallInfrontButton) {
                        gehaltenerButton = noWallInfrontButton;
                    }else{
                        switchWallInfrontButton();
                        gehaltenerButton = noWallInfrontButton;
                    }
                }else {
                    if(wallInfrontButton) {
                        gehaltenerButton = wallInfrontButton;
                    }else{
                        switchWallInfrontButton();
                        gehaltenerButton = wallInfrontButton;
                    }
                }
            }
            if(this.liste[insertIndex].id == 9){
                if(this.liste[insertIndex].text == "Falsch"){
                    if(falseButton){
                        gehaltenerButton = falseButton;
                    }else{
                        switchTrueButton();
                        gehaltenerButton = falseButton;
                    }
                }else {
                    if(trueButton) {
                        gehaltenerButton = trueButton;
                    }else{
                        switchTrueButton();
                        gehaltenerButton = trueButton;
                    }
                }
            }
            if(this.liste[insertIndex].id === 3){
                //todo 13 -> 10???
                //todo was soll das doppelte zuweisen?
                gehaltenerButton = gehaltenerButton = new InputButton('Wiederhole', color('#009bde'),tileSize / 2 * 16, tileSize * 13, tileSize * 3.5, tileSize);
                gehaltenerButton.festWert = this.liste[insertIndex].input;
            }
            if(this.liste[insertIndex].id == 5){
                gehaltenerButton = whileButton;
                this.whileZwischenspeicher = this.getCommandCopy(this.liste[insertIndex]);
            }
            if(this.liste[insertIndex].id == 6){
                gehaltenerButton = leseBenefitButton;
            }
            this.liste.splice(insertIndex,1);
        }
    }

    getCommandCopy(command){
        return Object.assign({}, command);
    }

    checkSecondItem(id, subID, grenze){
        if(grenze == undefined){
            grenze = 1;
        }
        var localCount = 0;
        for(var i = 0; i < this.liste.length; i++){
            if(this.liste[i].subID == subID && this.liste[i].id == id){
                localCount++;
            }
        }
        if(localCount > grenze){
            return true;
        }
        return false;
    }

    removeItem(id, subID){
        for(var i = 0; i < this.liste.length;i++){
            if(this.liste[i].id== id && this.liste[i].subID == subID){
                this.liste.splice(i,1);
                break;
            }
        }
        this.counterAnpassen(id, subID);
    }

    counterAnpassen(id, grenze){
        for(var i = 0 ; i < this.liste.length; i++){
            if(this.liste[i].id == id && this.liste[i].subID){
                if( this.liste[i].subID > grenze) {
                    this.liste[i].subID--;
                    if(id == 4){
                        this.liste[i].text = 'Wenn (' + this.liste[i].subID + ')';
                    }
                    if(id == 5){
                        this.liste[i].text = 'Solange (' + this.liste[i].subID + ')';
                    }
                }
            }
        }
        var highest = 1;
        var nichtVorhanden = true;
        for(var i = 0 ; i < this.liste.length; i++){
            if(this.liste[i].id == id && this.liste[i].subID){
                nichtVorhanden = false;
                if(this.liste[i].subID > highest){
                    highest = this.liste[i].subID;
                }
            }
        }
        if(nichtVorhanden){
            if(id == 4){
                this.ifCounter=1;
            }
            if(id == 5){
                this.whileCounter=1;
            }
        }else {
            if(id == 4){
                this.ifCounter = highest + 1;
            }
            if(id == 5){
                this.whileCounter=highest+1;
            }
        }
    }

    insert(command, tileY){
        var newCommand = this.getCommandCopy(command);
        if(tileY >= this.liste.length){
            if(newCommand.id == 4){
                if(newCommand.isNew) {
                    newCommand.isNew=false;
                    newCommand.subID = this.ifCounter;
                    newCommand.text = "Wenn (" + newCommand.subID + ")";
                    if (!this.secondIfSwitch) {
                        this.ifCounter++;
                        this.secondIfSwitch = !this.secondIfSwitch;
                    } else {
                        this.secondIfSwitch = !this.secondIfSwitch;
                    }
                }
            }
            if(newCommand.id == 5){
                if(newCommand.isNew) {
                    newCommand.isNew=false;
                    newCommand.subID = this.whileCounter;
                    newCommand.text = "Solange (" + newCommand.subID + ")";
                    if (!this.secondWhileSwitch) {
                        this.whileCounter++;
                        this.secondWhileSwitch = !this.secondWhileSwitch;
                    } else {
                        this.secondWhileSwitch = !this.secondWhileSwitch;
                    }
                }
            }
            this.liste.push(newCommand);
        }else{
            if(newCommand.id == 4) {
                if(newCommand.isNew) {
                    newCommand.isNew = false;
                    newCommand.subID = this.ifCounter;
                    newCommand.text = "Wenn (" + newCommand.subID + ")";
                    if (!this.secondIfSwitch) {
                        this.ifCounter++;
                        this.secondIfSwitch = !this.secondIfSwitch;
                    } else {
                        this.secondIfSwitch = !this.secondIfSwitch;
                    }
                }
            }
            if(newCommand.id == 5){
                if(newCommand.isNew) {
                    newCommand.isNew=false;
                    newCommand.subID = this.whileCounter;
                    newCommand.text = "Solange (" + newCommand.subID + ")";
                    if (!this.secondWhileSwitch) {
                        this.whileCounter++;
                        this.secondWhileSwitch = !this.secondWhileSwitch;
                    } else {
                        this.secondWhileSwitch = !this.secondWhileSwitch;
                    }
                }
            }
            this.liste.splice(tileY,0,newCommand);
            for(var i = 0; i < this.liste.length; i++){
                if(this.liste[i] == this.entries.EMPTY){
                    this.liste.splice(i,1);
                }
            }
        }
    }
    
    resize(){
        this.width = tileSize*3;
        this.height = tileSize;
    }

    checkSyntax(){
        var ifCount = 0;
        var forCount = 0;
        var whileCount = 0;

        /*
        ** 3 for
         * 4 if
         * 5 while*/

        for(var i = 0; i < this.liste.length; i++){
            if ((this.liste.length - i) > 1) {
                if (this.liste[i].id == 3 && this.liste[i + 1].id == 3 || this.liste[i].id == 4 && this.liste[i + 1].id == 4 || this.liste[i].id == 5 && this.liste[i + 1].id == 5) {
                    return false;
                }
            }
            switch(this.liste[i].id){
                case 3:
                    forCount++;
                    break;
                case 4:
                    ifCount++;
                    break;
                case 5:
                    whileCount++;
                    break;
                default:
                    break;
            }
        }
        if((ifCount+forCount+whileCount)%2 == 0){
            return true;
        }
        return false;
    }
    
    runListe(){
        if(this.checkSyntax()) {
            list.lastIf = [];
            player.reset();
            for (var i = 0; i < this.liste.length; i++) {
                player.addInstruction(this.liste[i].func, this.liste[i].id, this.liste[i].subID);
            }
            started = true;
            wasStarted = true;
        }else{
            syntaxError.open();
        }
    }

    stopListe(){
        started = false;
        player.reset();
        this.lastIf=[];
    }

    refresh(){
        started = false;
        player.reset();
        this.liste = [];
        this.ifCounter =1;
        this.whileCounter=1;
        this.lastIf=[];
    }
    
    drawScrollLeiste(){
        fill(color('#dbdbdb'));
        stroke(204,204,204);
        rect(tileSize*16,tileSize*2,tileSize/4,tileSize*10);
    }

    drawScroller(){
        fill(color('#e43f6f'));
        circle(tileSize*16+tileSize/8,this.scrollerY,tileSize,tileSize*10)
    }

    setScroller(){
        //ButtonBox feststellen, außerhalb des Buttons drücken
        if((mouseIsPressed)&&(mouseX >= (tileSize*15)+(tileSize/2)+(tileSize/8)) && (mouseX<=(tileSize*16)+(tileSize/2)+(tileSize/8)) &&
            ((mouseY >= tileSize) && (mouseY <=  tileSize*12))&&(gehaltenerButton == null)){
            if(mouseY <= tileSize*2){
                list.scrollerY = tileSize*2;
            }else if(mouseY >= tileSize*12){
                list.scrollerY = tileSize*12;
            }else {
                list.scrollerY = mouseY;
            }
        }else{
            return;
        }
    }

}

