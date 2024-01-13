const trattini = document.querySelector("#trattini");
const immagine = document.getElementById("impiccato");
const lettereSbagliate = document.getElementById("lettereSbagliate");
const fineGioco = document.querySelector(".fineGioco");
const statoPartita = document.getElementById("statoPartita");
const parolaPersa = document.getElementById("parolaPersa");

let letteraGiusta;
let arr = [];
let arrTrattini = [];
let conta = 0;
let conta2 = 0;
let parolaIndovino = "LA PAROLA ERA: ";

function memorizzaValore() {
    let inputVal = document.getElementById("inputParola").value;
    inputVal = inputVal.toLowerCase();
    lettereSbagliate.innerHTML = " ";
    immagine.setAttribute("src", "image/impiccato/impiccato1.png");
    arr = [...inputVal];
    arrTrattini = new Array(arr.length).fill('_'); // crea un nuovo array di trattini con la lunghezza della parola inserita
    generaTrattini();
}

function generaTrattini(){
    trattini.innerHTML = arrTrattini.join(''); // fa comparire i trattini
    document.getElementById("inputParola").value = "";
}

function indovinaLettera(){
    let letteraVal = document.getElementById("inputLettera").value;
    letteraVal = letteraVal.toLowerCase();
    document.getElementById("inputLettera").value = "";
    letteraGiusta = false;
    for(let i = 0; i < arr.length; i++){
        if(letteraVal === arr[i]){
            arrTrattini[i] = letteraVal;
            letteraGiusta = true;
            conta2++;
            if(conta2 === arr.length){
                funcFineGioco();
                statoPartita.innerHTML = "HAI VINTO";
                conta2 = 0;
            }
        }   
    }
    if(!letteraGiusta){    
        lettereSbagliate.innerHTML += letteraVal + " ";
        if(conta >= 5){
            immagine.setAttribute("src", "image/impiccato/impiccato1.png");
            arrTrattini = new Array(arr.length).fill(" ");
            lettereSbagliate.innerHTML = " ";
            conta = -1;
            generaTrattini();
            funcFineGioco();
            statoPartita.innerHTML = "HAI PERSO";
        }
        else {
            switch (conta) {
                case 0:
                    immagine.setAttribute("src", "image/impiccato/impiccato2.png");
                    break;
                case 1:
                    immagine.setAttribute("src", "image/impiccato/impiccato3.png");
                    break;
                case 2:
                    immagine.setAttribute("src", "image/impiccato/impiccato4.png");
                    break;
                case 3:
                    immagine.setAttribute("src", "image/impiccato/impiccato5.png");
                    break;
                case 4:
                    immagine.setAttribute("src", "image/impiccato/impiccato6.png");
                    break;
                case 5:
                    immagine.setAttribute("src", "image/impiccato/impiccato7.png");
                    conta = 0;
                    break;
            }
        }
        conta++;
    }
    generaTrattini();
}

function funcFineGioco (){
    fineGioco.style.visibility = 'visible';
    for(let i = 0; i < arr.length; i++){
        parolaIndovino += arr[i];
    }
    parolaPersa.innerHTML = parolaIndovino;
    parolaIndovino = "LA PAROLA ERA: ";
    lettereSbagliate.innerHTML = "";
}

function restart(){
    fineGioco.style.visibility = 'hidden';
}