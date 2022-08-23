/**
 * Created by j514340 on 23.07.2019.
 */
"use strict";
    //TODO: Vielleicht die GUI-Elementeklassen in eine Datei zusammenpacken? -> Weniger Dateien

class Title{
    constructor(text, x,y,width,height,color){
        this.text = text;
        this.x = x;
        this.y = y+tileSize/3;
        this.width = width;
        this.height = height;
        this.color = (color!=null && color != undefined) ? color : 0;
    }


    drawTitle(){
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(this.height/2);
        fill(this.color);
        text(this.text, this.x, this.y, this.width, this.height);
    }
    
    resizeTitle(x,y,width,height){
        this.x = x;
        this.y = y+tileSize/3;
        this.width = width;
        this.height = height;
    }
}