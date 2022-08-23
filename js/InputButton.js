/**
 * Created by j511640 on 07.05.2019.
 */
"use strict";
class InputButton extends Button {

    constructor(text, color, x, y, tileSize, width, height, image) {
        super(text, color, x, y, tileSize, width, height, image);
        this.oldValue = '';
        this.forSchluss = false;
        this.festWert = null;
    }

    setInputField(){
        this.input = createInput(null,'tel');
        this.input.input(this.inputEvent);
        this.input.position(this.x + 60, this.y + 15);
    }

    inputEvent(){
        var str = this.value()[this.value().length - 1];
        var regex = /[0-9]/gi;
        var matches = str.match(regex);
        if(matches != null && matches.length > 0){
            this.oldValue = this.value();
        }else{
            this.value(this.oldValue || '');
        }
    }

    drawButton() {
        stroke(204,204,204);
        fill(this.color);
        if(!this.forSchluss) {
            rect(this.x, this.y, this.width, this.height, 10);
        }else{
            rect(this.x, this.y, this.width/2, this.height, 10);
        }
        if (this.image) {
            image(this.image, this.x, this.y, this.width, this.height);
        } else{
            noStroke();
            fill(BLACK);
            textSize(this.height / 3);
            if(!this.forSchluss) {
                textAlign(LEFT, CENTER);
                text(this.text, this.x + 5, this.y, this.width, this.height);
            }else{
                textAlign(CENTER, CENTER);
                text(this.text, this.x + 5, this.y, this.width -tileSize*2, this.height);
            }
            this.drawInputbox();
        }
    }

    dragButton(){
        stroke(204,204,204);
        fill(this.color);
        if(!this.forSchluss) {
            rect(mouseX - (this.width / 2), mouseY - (this.height / 2), this.width, this.height, 10);
            noStroke();
            fill(BLACK);
            textAlign(CENTER, CENTER);
            textSize(this.height / 3);
            text(this.text + " " + this.festWert+ " mal", mouseX - (this.width / 2), mouseY - (this.height / 2), this.width, this.height);
        }else{
            rect(mouseX - (this.width / 4), mouseY - (this.height / 2), this.width/2, this.height, 10);
            noStroke();
            fill(BLACK);
            textAlign(CENTER, CENTER);
            textSize(this.height / 3);
            text(this.text, mouseX - (this.width / 4), mouseY - (this.height / 2), this.width/2, this.height);

        }
    }
    
    mouseWithinButton() {
        if ((mouseX >= this.x) && (mouseX <= (this.x + this.width)) &&
            ((mouseY >= this.y) && (mouseY <= (this.y + this.height))&&(this.input.value()!="" || this.forSchluss))
        ) {
            return true;
        } else if((mouseX >= this.x) && (mouseX <= (this.x + this.width)) &&
            ((mouseY >= this.y) && (mouseY <= (this.y + this.height)))){
            this.input.elt.focus();
            return false;
        } else{
            return false;
        }
    }

    drawInputbox() {
        if(this.input == null){
            this.input = createInput(null,'tel');
            this.input.input(this.inputEvent);
            this.input.position(this.x + 60, this.y + 15);
        }
        this.input.size(round(this.width / 6), round(this.height / 2));
        this.input.position(this.x + (this.width/2 ) + (this.input.width / 6),
                            this.y + (this.height / 2) - (this.input.height / 2)+78);
        noStroke();
        fill(BLACK);
        textAlign(RIGHT, CENTER);
        textSize(this.height / 3);
        if(!this.forSchluss){
            text("mal", this.x - (tileSize)/6, this.y, this.width, this.height);
        }
    }

    getInput() {
        if (this.input.value() != null) {
            return this.input.value();
        } else return 0;
    }

    getInputBox(){
        return this.input;
    }

    setForSchluss(){
        this.forSchluss = !this.forSchluss;
        if(!this.forSchluss){
            this.text = 'Wiederhole';
            this.input.value('');
            this.input.show();
        }else{
            this.text = 'Ende';
            this.input.value(' ');
            this.input.hide();
        }
    }
    getForSchluss(){
        return this.forSchluss;
    }
}