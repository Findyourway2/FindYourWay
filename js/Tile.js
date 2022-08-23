"use strict";

class Tile{
    /*
     0 Leer
     1 Spieler
     2 Ziel
     3 Wand
     4 Benefit
     */

    constructor(x, y, size, color){
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color || 170;
        this.id = 0;
        this.sprite;
        this.benefit;
        this.hue = 210; //Farbe 210 bis 330 und zurück
        this.farbRichtung = 'up'; //Boolean der angibt in welche Richtung die Farbe sich ändert
        //this.brickWall = loadImage('../res/brickwall_cut.png');
        this.brickWall = loadImage('../res/wall2.png');
    }

    setId(id){
        this.id = id;
        if(this.id == 4){
            this.benefit= new BenefitPopUp(benefits[0].imagePath,benefits[0].title,benefits[0].text);
            benefits.shift();
        }
    }


    drawTile(){

        switch(this.id){
            case 0:
            case 1:
                this.color = color('#dbdbdb');
                break;
            case 2:
                this.color = color('#dbdbdb');
                break;
            case 3:
                this.color = color('#373f51');
                break;
            case 4:
                //this.color = color(255,0,0);
                colorMode(HSB);
                if(this.farbRichtung === 'up'){
                    this.color = color(this.hue, 100, 100);
                    this.hue = this.hue + 0.5;
                    if(this.hue >= 329){
                        this.farbRichtung = 'down';
                    }
                }else if(this.farbRichtung = 'down'){
                    this.color = color(this.hue, 100, 100);
                    this.hue = this.hue - 0.5;
                    if(this.hue <= 198){
                        this.farbRichtung = 'up';
                    }
                }

                break;
            default:
                this.color = color(0,0,255);
                alert('INVALID FIELD ID! ID: ' + "+"+this.id+"+");
        }


        
        stroke(0);
        fill(this.color);
        rect(this.x, this.y+2*tileSize, this.size, this.size);

        if(this.sprite){
            image(this.sprite, this.x, this.y+2*tileSize, this.size, this.size);
            noFill();
            rect(this.x, this.y+2*tileSize, this.size, this.size);
        }
        fill(125);
        //text(this.id,this.x+this.size/2,this.y+this.size/2);
        colorMode(RGB);
    }

    resize(newX, newY){
        this.x = newX;
        this.y = newY;
        this.size = tileSize;
    }

    outputBenefit(){
        if(this.id === 4){
            console.log('Benefit');
        }
    }

    setSprite(sprite){
        this.sprite = sprite;
    }
}