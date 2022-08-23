/**
 * Created by j514340 on 29.04.2019.
 */
"use strict";

class Player{

    constructor(dir,player_up,player_left,player_right,player_down,tileSize,field){
        this.xIndex=0;
        this.yIndex=0;
        this.xDest=0;
        this.yDest=0;
        this.dir=dir;
        this.player_up = player_up;
        this.player_left = player_left;
        this.player_right = player_right;
        this.player_down = player_down;
        this.tileSize = tileSize;
        this.x = 0;
        this.y = 0;
        this.playfield = field;
        this.instructions = [];
        this.startPos = {x: 0, y: 0, dir: dir};
    }

    setPlayer(x,y){
        this.xIndex = x;
        this.yIndex = y;
        this.xDest=x;
        this.yDest=y;
        this.startPos.x = x;
        this.startPos.y = y;
    }

    getKoordinatenFromField(field){
        var tile = field[this.yIndex][this.xIndex];
        this.playfield = field;
        this.x = tile.x;
        this.y = tile.y+(2*tileSize);
    }

    changeDestination(steps){
        switch(this.dir){
            case 0:
                for(var i = 0; i < steps; i++){
                    if(this.yDest > 0 && this.playfield[this.yDest-1][this.xDest].id != 3){
                        this.yDest--;
                    }
                }
                break;
            case 90:
                for(var i = 0; i < steps; i++){
                    if(this.xDest < this.playfield.length-1 && this.playfield[this.yDest][this.xDest+1].id != 3){
                        this.xDest++;
                    }
                }
                break;
            case 180:
                for(var i = 0; i < steps; i++){
                    if(this.yDest < this.playfield.length-1 && this.playfield[this.yDest+1][this.xDest].id != 3){
                        this.yDest++;
                    }
                }
                break;
            case 270:
                for(var i = 0; i < steps; i++){
                    if(this.xDest > 0 && this.playfield[this.yDest][this.xDest-1].id != 3){
                        this.xDest--;
                    }
                }
                break;
            default:
                break;
        }
    }


    berechnePunkte(){
        list.liste
        for(var i = 0; i < list.liste.length;i++){
            if(list.liste[i].id == 3 ||list.liste[i].id == 4 ||list.liste[i].id == 5){
                punkte+=50;
            }
        }
        punkte /= list.liste.length;
        punkte = Math.round(punkte);
    }

    move(){
        console.log('move');
        if(this.xDest > this.xIndex){
            this.xIndex++;
        }else if(this.xDest < this.xIndex){
            this.xIndex--;
        }
        if(this.yDest > this.yIndex){
            this.yIndex++;
        }else if(this.yDest < this.yIndex){
            this.yIndex--;
        }
        this.getKoordinatenFromField(this.playfield);
        this.playfield[this.yIndex][this.xIndex].outputBenefit();
        if(this.playfield[this.yIndex][this.xIndex].id == 2){
            started=false;
            gewonnen = true;
            this.berechnePunkte();
            winNotification.text="Du hast gewonnen!\nDeine Punktzahl: "+punkte;
            winNotification.open();
        }
    }

    turnLeft(){
        if(this.dir === 0){
            this.dir = 360;
        }
        this.dir -= 90;
    }

    turnRight(){
        if(this.dir + 90 === 360){
            this.dir = 0;
        }else{
            this.dir += 90;
        }
    }

    addInstruction(fun, id, subID){
        if(subID){
            this.instructions.push({func: fun, id: id, subID: subID});
        }else {
            this.instructions.push({func: fun, id: id});
        }
    }

    runInstruction(){
        if(this.instructions.length > 0){
            this.instructions[0].func();
            this.instructions.shift();
            console.log(this.instructions);
        }else {
            wasStarted = false;
            started = false;
        }
    }

    draw(){
        if(this.yIndex != this.yDest || this.xIndex != this.xDest){
            player.move();
        }
        switch(this.dir){
            case 0:
                image(this.player_up, this.x, this.y, this.tileSize, this.tileSize);
                stroke(0);
                noFill();
                rect(this.x, this.y, this.tileSize, this.tileSize);
                break;
            case 90:
                image(this.player_right, this.x, this.y, this.tileSize,this.tileSize);
                stroke(0);
                noFill();
                rect(this.x, this.y, this.tileSize, this.tileSize);
                break;
            case 180:
                image(this.player_down, this.x, this.y, this.tileSize,this.tileSize);
                stroke(0);
                noFill();
                rect(this.x, this.y, this.tileSize, this.tileSize);
                break;
            case 270:
                image(this.player_left, this.x, this.y, this.tileSize,this.tileSize);
                stroke(0);
                noFill();
                rect(this.x, this.y, this.tileSize, this.tileSize);
                break;
            default:
                alert("INVALID DIRECTION!");
                break;
        }
    }
    
    reset(){
        ifStarted = false;
        whileStarted = false;
        ifNotStarted = false;
        this.instructions = [];
        this.xIndex = this.startPos.x;
        this.yIndex = this.startPos.y;
        this.xDest = this.startPos.x;
        this.yDest = this.startPos.y;
        this.dir = this.startPos.dir;
        this.getKoordinatenFromField(this.playfield);
    }

}