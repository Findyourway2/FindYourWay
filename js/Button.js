/**
 * Created by j511640 on 30.04.2019.
 */
"use strict";

class Button {
    constructor(text, color, x, y, width, height, image) {
        this.text = text;
        this.color = color;
        this.x = x;
        this.y = y;
        this.width = width || tileSize*2;
        this.height = height || tileSize;
        this.image = image;
        this.id = text;
        this.hue = 210; //Farbe 210 bis 330 und zurück
        this.farbRichtung = 'up'; //Boolean der angibt in welche Richtung die Farbe sich ändert
    }

    drawButton() {
        if(this.text === 'Lese Vorteil'){
            colorMode(HSB);
            if(this.farbRichtung === 'up'){
                fill(this.hue, 100, 100);
                this.hue = this.hue + 0.5;
                if(this.hue >= 330){
                    this.farbRichtung = 'down';
                }
            }else if(this.farbRichtung = 'down'){
                fill(this.hue, 100, 100);
                this.hue = this.hue - 0.5;
                if(this.hue <= 210){
                    this.farbRichtung = 'up';
                }
            }

            colorMode(RGB);
            stroke(204,204,204);
            rect(this.x, this.y, this.width, this.height, 10);
            fill(color(255, 255, 255));
            noStroke();
            textAlign(CENTER, CENTER);
            textSize(this.height / 3);
            text(this.text, this.x, this.y, this.width, this.height);

        }else{
            fill(this.color);
            stroke(204,204,204);
            rect(this.x, this.y, this.width, this.height, 10);
            noStroke();
        if(this.image){
            image(this.image, this.x, this.y, this.width, this.height);
        }else {
            if(this.text == 'Nicht auf Vorteil' || this.text == 'Nicht vor Wand' || this.text == 'Falsch'){
                fill(255);
            }else {
                fill(BLACK);
            }
            textAlign(CENTER, CENTER);
            textSize(this.height / 3);
            text(this.text, this.x, this.y, this.width, this.height);
            }
        }
    }
    
    dragButton(){
        if(this.text === 'Lese Vorteil'){
            stroke(204,204,204);
            colorMode(HSB);
            if(this.farbRichtung === 'up'){
                fill(this.hue, 100, 100);
                this.hue = this.hue + 0.5;
                if(this.hue >= 330){
                    this.farbRichtung = 'down';
                }
            }else if(this.farbRichtung = 'down'){
                fill(this.hue, 100, 100);
                this.hue = this.hue - 0.5;
                if(this.hue <= 210){
                    this.farbRichtung = 'up';
                }
            }
            colorMode(RGB);
            rect(mouseX-(this.width/2), mouseY-(this.height/2), this.width, this.height, 10);
            noStroke();
            fill(color(255, 255, 255));
            textAlign(CENTER,CENTER);
            textSize(this.height/3);
            text(this.text, mouseX-(this.width/2), mouseY-(this.height/2), this.width, this.height);
        }else{
            stroke(204,204,204);
            fill(this.color);
            rect(mouseX-(this.width/2), mouseY-(this.height/2), this.width, this.height, 10);
            if(this.image){
                image(this.image, this.x, this.y, this.width, this.height);
            }else {
                noStroke();
                if(this.text == 'Nicht auf Vorteil' || this.text == 'Nicht vor Wand' || this.text == 'Falsch'){
                    fill(255);
                }else {
                    fill(BLACK);
                }
                textAlign(CENTER, CENTER);
                textSize(this.height / 3);
                text(this.text, mouseX - (this.width / 2), mouseY - (this.height / 2), this.width, this.height);
            }
        }
    }

    mouseWithinButton() {
        if ((mouseX >= this.x) && (mouseX <= (this.x + this.width)) &&
            ((mouseY >= this.y) && (mouseY <= (this.y + this.height)))
        ) {
            return true;
        } else {
            return false;
        }
    }
    resize(x,y, width, height){
        this.width = width || tileSize*2;
        this.height = height || tileSize;
        this.x = x;
        this.y = y;
    }
}

//Level-Button

class LevelButton{

    constructor(x, y, width, height, lvlID) {
        this.x = x;
        this.y = y;
        this.width = width || tileSize*2;
        this.height = height || tileSize;
        this.smallTile = tileSize/2;
        this.lvlID = parseInt(lvlID);
        this.color;
        this.hue = 210; //Farbe 210 bis 330 und zurück
        this.farbRichtung = 'up'; //Boolean der angibt in welche Richtung die Farbe sich ändert
    }

    drawButton() {
        switch(this.lvlID){
            case 1:
                this.drawVorschau(level1);
                break;
            case 2:
                this.drawVorschau(level2);
                break;
            case 3:
                this.drawVorschau(level3);
                break;
            case 4:
                this.drawVorschau(level4);
                break;
        }
    }

    drawVorschau(lvl){
        var y = 0;
        var x = 0;

        for(var i = 0; i < lvl.length-3; i++){
            if(lvl.charAt(i) != '-'){
                colorMode(RGB);
                switch(parseInt(lvl.charAt(i))){
                    /*
                     0 Leer
                     1 Spieler
                     2 Ziel
                     3 Wand
                     4 Benefit
                     */
                    case 0:
                        fill(250);
                        break;
                    case 1:
                        fill('#dbdbdb');
                        switch(parseInt(lvl.charAt(lvl.length-1))){
                            case 0:
                                fill(250);
                                rect(this.x + this.smallTile * x, this.y + this.smallTile * y, this.smallTile, this.smallTile);
                                image(player_up, this.x+this.smallTile*x, this.y+this.smallTile*y, this.smallTile, this.smallTile);
                                noFill();
                                rect(this.x + this.smallTile * x, this.y+ this.smallTile * y, this.smallTile, this.smallTile);
                                break;
                            case 1:
                                fill(250);
                                rect(this.x + this.smallTile * x, this.y + this.smallTile * y, this.smallTile, this.smallTile);
                                image(player_right, this.x+this.smallTile*x, this.y+this.smallTile*y, this.smallTile, this.smallTile);
                                noFill();
                                rect(this.x + this.smallTile * x, this.y+ this.smallTile * y, this.smallTile, this.smallTile);
                                break;
                            case 2:
                                fill(250);
                                rect(this.x + this.smallTile * x, this.y + this.smallTile * y, this.smallTile, this.smallTile);
                                image(player_down, this.x+this.smallTile*x, this.y+this.smallTile*y, this.smallTile, this.smallTile);
                                noFill();
                                rect(this.x + this.smallTile * x, this.y+ this.smallTile * y, this.smallTile, this.smallTile);
                                break;
                            case 3:
                                fill(250);
                                rect(this.x + this.smallTile * x, this.y + this.smallTile * y, this.smallTile, this.smallTile);
                                image(player_left, this.x+this.smallTile*x, this.y+this.smallTile*y, this.smallTile, this.smallTile);
                                noFill();
                                rect(this.x + this.smallTile * x, this.y+ this.smallTile * y, this.smallTile, this.smallTile);
                                break;
                        }
                        break;
                    case 2:
                        image(logo_fi_neu, this.x+this.smallTile*x, this.y+this.smallTile*y, this.smallTile, this.smallTile);
                        noFill();
                        rect(this.x + this.smallTile * x, this.y+ this.smallTile * y, this.smallTile, this.smallTile);
                        break;
                    case 3:
                        fill('#373f51');
                        break;
                    case 4:
                        //this.color = color(255,0,0);
                        colorMode(HSB);
                        if(this.farbRichtung === 'up'){
                            this.color = color(this.hue, 100, 100);
                            this.hue = this.hue + 0.05;
                            if(this.hue >= 329){
                                this.farbRichtung = 'down';
                            }
                        }else if(this.farbRichtung = 'down'){
                            this.color = color(this.hue, 100, 100);
                            this.hue = this.hue - 0.05;
                            if(this.hue <= 198){
                                this.farbRichtung = 'up';
                            }
                        }
                        fill(this.color);
                        break;
                }
                if(parseInt(lvl.charAt(i))!=2 && parseInt(lvl.charAt(i)) != 1) {
                    stroke(0);
                    rect(this.x + this.smallTile * x, this.y + this.smallTile * y, this.smallTile, this.smallTile);
                }
                x++;
            }
            if(lvl.charAt(x) == '-'){
                y++;
                x =0;
            }
        }
    }
    
    mouseWithinButton() {
        if ((mouseX >= this.x) && (mouseX <= (this.x + this.width)) &&
            ((mouseY >= this.y) && (mouseY <= (this.y + this.height)))
        ) {
            return true;
        } else {
            return false;
        }
    }
    resize(x,y, width, height){
        tileSize = tileSize;
        this.width = width || tileSize*2;
        this.height = height || tileSize;
        this.x = x;
        this.y = y;
        this.smallTile=tileSize/2;
    }
    
    
    
    
}