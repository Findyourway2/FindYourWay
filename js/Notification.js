/**
 * Created by j514340 on 17.05.2019.
 */
'use strict';

class Notification{

    constructor(title, text){
        this.title = title;
        this.text = text;
        this.width = 8*tileSize;
        this.height = 4*tileSize;
        this.x = (innerWidth/2)-this.width/2;
        this.y = (innerHeight/2)-this.height/2;
        
        this.active = false;
    }

    draw(){
        if(this.active) {

            fill(255);
            rect(this.x, this.y, this.width, this.height);

            //X
            textAlign(LEFT,TOP);
            textSize(tileSize/2);
            fill(120);
            text("X", this.x+this.width-tileSize*0.75,this.y+tileSize/4);

            //TITLE
            fill(255,0,0);
            noStroke();
            textSize(tileSize/2);
            textAlign(CENTER,CENTER);
            text(this.title,this.x,this.y+tileSize/4,this.width,tileSize/2);
            //TEXT
            fill(BLACK);
            noStroke();
            textSize(tileSize/3);
            textAlign(CENTER,CENTER);
            text(this.text,this.x,this.y+tileSize/2,this.width,this.height-tileSize/2);

        }
    }
    
    setText(text){
        this.text = text;
    }

    xClicked(){
        if((mouseX >= this.x+this.width-tileSize*0.75 && mouseX <= this.x+this.width-tileSize*0.75+tileSize/2) && (mouseY >= this.y+tileSize/4 && mouseY <=this.y+tileSize/4+tileSize/2)){
            return true;
        }
        return false;
    }

    resize(){
        this.width = 8*tileSize;
        this.height = 4*tileSize;
        this.x = (innerWidth/2)-this.width/2;
        this.y = (innerHeight/2)-this.height/2;
    }
    
    open(){
        this.active = true;
    }
    
    close(){
        this.active = false;
        gewonnen = false;
    }

}