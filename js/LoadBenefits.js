/**
 * Created by j514340 on 15.05.2019.
 */
"use strict";

var benefits = [];

function loadBenefits(){

    var benefitText = "";
    var file = "../res/benefits.json";

    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status == 0) {
                benefitText = rawFile.responseText;
                parseBenefits(benefitText);
            }
        }
    }
    rawFile.send(null);
}

function parseBenefits(benefitText){
    var jsonData = JSON.parse(benefitText);

    for(var i = 0; i < 14; i++){
        benefits.push(jsonData.benefits[i]);
    }
}