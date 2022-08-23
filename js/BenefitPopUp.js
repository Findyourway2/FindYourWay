/**
 * Created by j514340 on 13.05.2019.
 */
"use strict";

class BenefitPopUp{

    constructor(img, title, text){
        this.x = tileSize;
        this.y = tileSize*3;
        this.width = tileSize*8;
        this.height = tileSize*8;
        this.title = title;
        this.text = text;
        this.image = loadImage(img);
        this.active=false;
    }

    drawPopUp(){
        if(this.active){
            fill(255);
            rect(this.x, this.y, this.width, this.height, 20);

            //X
            textAlign(LEFT,TOP);
            textSize(tileSize/2);
            fill(120);
            text("X", this.x+this.width-tileSize*0.75,this.y+tileSize/4);

            //TITEL
            textAlign(CENTER,CENTER);
            textSize(this.height/16);
            stroke(25, 46, 209);
            //fill(25, 46, 209);
            fill(BLACK);
            text(this.title, this.width/2+tileSize,this.y+tileSize);

            //TEXT
            textAlign(LEFT,TOP);
            textSize(this.height/24);
            noStroke();
            fill(BLACK);
            text(this.text, this.x+tileSize/2,this.y+tileSize*1.5,(this.width/2)-tileSize/2,this.height-tileSize*1.5);

            //BILD
            var aspectRatio = this.image.height/this.image.width,
                imgHeight = this.image.height,
                imgWidth = this.image.width;
            if(this.image.width > (this.width/2)-tileSize/2){
                imgWidth = (this.width/2)-tileSize;
                imgHeight = imgWidth * aspectRatio;
            }else if(this.image.height > this.height-tileSize*1.5){
                imgHeight = this.height-tileSize*1.5;
                imgWidth = imgHeight * (this.image.height/this.image.width);
            }
            image(this.image,this.width/2+tileSize*1.5,this.y+tileSize*1.5, imgWidth, imgHeight);
        }

    }
    
    resize(){
        this.x = tileSize;
        this.y = tileSize*3;
        this.width = tileSize*8;
        this.height = tileSize*8;
    }


    xClicked(){
        if((mouseX >= this.x+this.width-tileSize*0.75 && mouseX <= this.x+this.width-tileSize*0.75+tileSize/2) && (mouseY >= this.y+tileSize/4 && mouseY <=this.y+tileSize/4+tileSize/2)){
            return true;
        }
        return false;
    }

    close(){
        this.active = false;
        benefitOpen=false;
    }

    open(){
        this.active = true;
        benefitOpen=true
        started = false;
    }


}
