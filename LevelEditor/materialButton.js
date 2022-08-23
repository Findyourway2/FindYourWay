/**
 * Created by j514340 on 26.04.2019.
 */
'use strict';
//TODO alle alerts wegmachen!

class materialButton{
    //Button für Materialauswahl
    constructor(material){
        this.x=50+(50*material)+(50*material);
        this.y=550;
        this.size = 50;
        this.material = material;
        this.dir = 0;
    }

    draw(){
        switch(this.material){
            case 0:
                fill(255);
                break;
            case 1:
                fill(0,255,0);
                switch(this.dir) {
                    case 0:
                        triangle(this.x-this.size/2, this.y, this.x, this.y-this.size*0.75, this.x+this.size/2, this.y);
                        break;
                    case 1:
                        triangle(this.x, this.y-this.size/2, this.x+this.size*0.75, this.y, this.x, this.y+this.size/2);
                        break;
                    case 2:
                        triangle(this.x-this.size/2, this.y, this.x, this.y+this.size*0.75, this.x+this.size/2, this.y);
                        break;
                    case 3:
                        triangle(this.x, this.y-this.size/2, this.x-this.size*0.75, this.y, this.x, this.y+this.size/2);
                        break;
                    default:
                        alert("INVALID DIRECTION");
                }
                break;
            case 2:
                fill(80);
                break;
            case 3:
                fill(0);
                break;
            case 4:
                fill(255,0,0);
                break;
            default:
                fill(0,0,255);
                alert('INVALID MATERIAL ID!');
                break;
        }
        circle(this.x,this.y,this.size,this.size);
    }
    
    isClicked(){
        if((mouseX > (this.x-(this.size/2)) && mouseX < (this.x-(this.size/2)) + this.size) &&
            mouseY > (this.y-(this.size/2)) && mouseY < (this.y-(this.size/2)) + this.size){
            if(this.material==1){
                if(this.dir < 3){
                    this.dir++;
                }else{
                    this.dir = 0;
                }
            }
            return true;
        }
        return false;
    }

    getDirection(){
        if(this.material == 1){
            return this.dir;
        }
        else{
            console.log("Nicht der Spielerbutton!");
        }
    }


}