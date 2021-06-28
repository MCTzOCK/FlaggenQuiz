/**
 * @author Ben Siebert
 * @copyright 2018-2021 Ben Siebert. All rights reserved.
 */

let codes = {};
let points = 0

let lost = false
let currentCode = ""

let pt;

window.onload = function () {
    (async () => {
        let x = new XMLHttpRequest();
        await x.open("GET", "https://flagcdn.com/de/codes.json", true)
        await x.send(null)
        x.onreadystatechange = () => {
            if (x.readyState === 4) {
                codes = JSON.parse(x.responseText)
                nextFlag()
            }
        }
    })();
    pt = setInterval(() => {
        document.getElementById('points').innerText = 'Punkte: ' + points
    }, 50)
    document.getElementById('enter').addEventListener('click', check);
    document.addEventListener('keydown', event => {
        if(event.keyCode === 13){
            check();
        }
    });
}

function check(){
    if (!lost) {
        if (document.getElementById('answer').value.toLowerCase() === codes[currentCode].toLowerCase()) {
            points += 50
            nextFlag()
        } else {
            clearInterval(pt)
            console.log(codes[currentCode])
            document.getElementById('points').innerText = "Du hast verloren! Pukte: " + points
            document.getElementById('answer').disabled = true
            document.getElementById('enter').disabled = true
            lost = true
        }
    }
    document.getElementById('answer').value = ''
}

function nextFlag() {
    currentCode = Object.keys(codes)[getRandomInt(0, Object.keys((codes)).length - 1)];
    document.getElementById('flagImage').src = `https://flagcdn.com/h240/${currentCode}.png`
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
