/**
 * Created by j514340 on 26.04.2019.
 */
'use strict';

class Button{
    //Button
    constructor(x,y,width,height,text){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.text = text;
    }

    draw(){
        fill(255);
        rect(this.x,this.y, this.width, this.height,10);
        fill(0);
        textAlign(CENTER, CENTER);
        textSize(this.height/3);
        text(this.text, this.x+(this.width/2), this.y+(this.height/2));
    }

    isClicked(){
        if((mouseX > this.x && mouseX < this.x + this.width) &&
            mouseY > this.y && mouseY < this.y + this.height){
            return true;
        }
        return false;
    }

}