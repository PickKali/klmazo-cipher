//POV: your system is really bored one night
function K_encode(input){
    let chunk = input;
    let storage = "";
    chunk = chunk.replaceAll(" ","ඞ");
    while (chunk.length > 2){
        let first = chunk[0];
        let last = chunk[chunk.length-1];
        storage += first+last;
        chunk = chunk.slice(1, -1);
        let inner = "";
        for (let i = chunk.length - 1; i >= 0; i--){
            inner += chunk[i];
        }
        chunk = inner;
    }
    let output = "";
    for (const letter of storage){
        output += letter;
    }
    output += chunk;
    output = output.replaceAll("ඞ"," ");
    return output;
}
function K_decode(input){
    let chunk = input;
    let left = "";
    let right = "";
    let reverse = false;
    chunk = chunk.replaceAll(" ","ඞ");
    while (chunk.length > 2){
        left += reverse ? chunk[1] : chunk[0];
        right = reverse ? chunk[0] + right : chunk[1] + right;
        let inner = chunk.slice(2);
        chunk = inner;
        reverse = !reverse;
    }
    chunk=chunk.split('').reverse().join('');
    let output = left + chunk + right;
    output = output.replaceAll("ඞ"," ");
    return output;
}
//Y.xesob,  tthxeist  itls uaa fed

const scrabblePoints = {
    a: 1, b: 3, c: 3, d: 2, e: 1, f: 4, g: 2, h: 4, i: 1, j: 8, k: 5, l: 1,
    m: 3, n: 1, o: 1, p: 3, q: 10, r: 1, s: 1, t: 1, u: 1, v: 4, w: 4, x: 8, y: 4, z: 10
  };
const vowelValues = { 0: 'a', 1: 'e', 2: 'i', 3: 'o', 4: 'u'};
const vowelValues2 = {a: 0, e: 1, i: 2, o: 3, u: 4};
function L_encode(input){
    let output = "";
    let skip = false;
    for (let i = 0; i < input.length; i++){
        let letter = input.toLowerCase()[i];
        if (['a','e','i','o','u'].includes(letter) && !skip) {
            skip = true;
            let currentVal = vowelValues2[letter];
            let leftVal = i > 0 && scrabblePoints.hasOwnProperty(input.toLowerCase()[i-1]) ? scrabblePoints[input.toLowerCase()[i-1]] : 0;
            let rightVal = i < input.length && scrabblePoints.hasOwnProperty(input.toLowerCase()[i+1]) ?
             scrabblePoints[input.toLowerCase()[i+1]] : 0;
            currentVal += leftVal + rightVal;
            output += currentVal;
        } else {
            output += input[i];
            if (skip) {
                skip = false;
            }
        }
    }
    return output;
}
function L_decode(input){
    let decode = '';  // Holds the result string
    let i = 0;
  
    while (i < input.length) {
      if (/[0-9]/.test(input[i])) {
        let numStr = '';
        let leftVal = i > 0 && scrabblePoints.hasOwnProperty(input.toLowerCase()[i-1]) ? scrabblePoints[input.toLowerCase()[i-1]] : 0;
        while (i < input.length && /[0-9]/.test(input[i])) {
          numStr += input[i];
          i++;
        }
        let rightVal = i < input.length && scrabblePoints.hasOwnProperty(input.toLowerCase()[i]) ?
             scrabblePoints[input.toLowerCase()[i]] : 0;
        let foundVowel = vowelValues[parseInt(numStr)-leftVal-rightVal];
        if (foundVowel) {
            decode += foundVowel;
        } else {
            decode += numStr;
        }
      } else {
        decode += input[i];
        i++;
      }
    }
  
    return decode;
}
//Y6s, th7s 3s 0 d7f5ult t10xt b14x.

const suits = [ ['♠♠♠♠♠','e'],['♥♥♥♥♥','t'],['♦♦♦♦♦','o'],
                ['♠♠♠♠','d'],['♥♥♥♥','r'],['♦♦♦♦','m'],['♣♣♣♣','b'],
                ['♠♠♠','a'],['♥♥♥','a'],['♦♦♦','a'],['♣♣♣','u'],
                ['♠♠','p'],['♥♥','e'],['♦♦','i'],['♣♣','l'],
                ['♠','s'],['♥','h'],['♦','d'],['♣','c']] 
//club, heart, diamond, spade
function M_encode(input){
    let encode = '';
    let i = 0;
    let checked;
    while (i < input.length){
        checked = false;
        for (let pair of suits){
            if (input[i].toLowerCase() == pair[1]){
                if (pair[0][0] != encode[encode.length-1]){
                    encode += pair[0];
                    checked = true;
                    break;
                }
            }
        }
        if (!checked){
            encode += input[i];
        }
        i++;
    }
    return encode;
}
function M_decode(input){
    let decode = '';
    let i = 0;
    let checked;
    while (i < input.length){
        let suitStr = '';
        while (i < input.length && ['♠','♥','♦','♣'].includes(input[i])) {
            if (suitStr == '' || suitStr[0] == input[i]){
                suitStr += input[i];
                i++;
            } else {
                break;
            }
        }
        console.log(suitStr);
        checked = false;
        for (let pair of suits){
            if (suitStr == pair[0]){
                decode += pair[1];
                checked = true;
                break;
            }
        }
        if (!checked){
            decode += input[i];
            i++;
        }
    }
    return decode;
}
//Y♠♠♠♠♠s, ♥♥♥♥♥h♦♦♠ ♦♦♠ ♠♠♠ ♠♠♠♠♥♥f♠♠♠♣♣♣l♥♥♥♥♥ ♥♥♥♥♥♠♠♠♠♠x♥♥♥♥♥ ♣♣♣♣♦♦♦♦♦x.

const ike = 'bcdfghqrvxyz';
const angry = [
    ['b','!'],['c','@'],['d','#'],['f','$'],['g','%'],['h','^'],
    ['q','&'],['r','*'],['v','('],['x',')'],['y','-'],['z','+']
];
function A_encode(input){
    let encode = '';
    let append = '🦝';
    input = input.replaceAll(' ','¬');
    let i = 0;
    while (i < input.length) {
        if (ike.includes(input[i].toLowerCase())){
            encode += 'ඞ';
            for (let pair of angry){
                if (input[i].toLowerCase() == pair[0]){
                    append += pair[1];
                    break;
                }
            }
        } else {
            encode += input[i];
            if (input[i] == '¬'){
                append += '¬';
            }
        }
        i++;
    }
    encode = encode + append;
    encode = encode.replaceAll('¬','\u2009').replaceAll('ඞ','\u200a');
    return encode;
}
function A_decode(input){
    let decode = '';
    input = input.replaceAll('\u200a','ඞ').replaceAll('\u2009','¬');
    let halves = input.split('🦝');
    let i = 0;
    let second = 0;
    
    while (i < halves[0].length) {
        console.log(halves[0][i]);
        if (halves[0][i] == 'ඞ' || halves[0][i] == '¬'){
            if (halves[0][i] == 'ඞ' && second < halves[0].length){
                for (let pair of angry){
                    if (halves[1][second] == pair[1]){
                        decode += pair[0];
                        break;
                    }
                }
            } else {
                decode += '\u0020';
            }
            second++;
        } else {
            decode += halves[0][i];
        }
        i++;
    }
    return decode;
}
// es, t is is a  e ault te t  o .🦝- ^   #$ ) !)

let finalInput = "";
let currentCipher = "";
let encoding = true;
let globalOut = "";
function update(){
    const output = document.querySelector("#output");
    let outputText = finalInput;
    if (currentCipher == "K"){
        outputText = encoding ? K_encode(finalInput): K_decode(finalInput);
    }
    if (currentCipher == "L"){
        outputText = encoding ? L_encode(finalInput): L_decode(finalInput);
    }
    if (currentCipher == "M"){
        outputText = encoding ? M_encode(finalInput): M_decode(finalInput);
    }
    if (currentCipher == "A"){
        outputText = encoding ? A_encode(finalInput): A_decode(finalInput);
    }
    output.value = outputText;
    globalOut = outputText;
}

async function clipboard(text) {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error('Failed to copy: ', err);
      //doesn't work in iframes (aka the vscode extension preview window)
    }
  }

document.addEventListener('DOMContentLoaded', (e) => {
    const input = document.querySelector("#input");
    const output = document.querySelector("#output");
    output.value = input.value;
    input.addEventListener("keyup", (e)=>{
        let key = e.key;
        if (toString(key).length > 1) {
            key = "";
        };
        finalInput = input.value + key;
        update();
    });

    const dropdown = document.getElementById("dropcontent");
    dropdown.addEventListener("change",function(){
        const dropvalue = dropdown.value;
        currentCipher = dropvalue;
        finalInput = input.value;
        update();
    });
    document.querySelector("#encodetoggle").addEventListener('click',(e)=>{
        encoding = !encoding;
        if (encoding){
            document.querySelector("#encodetoggle").innerHTML = "<b>Encoding</b>";
        } else {
            document.querySelector("#encodetoggle").innerHTML = "<b>Decoding</b>";
        }
        update();
    });
    document.querySelector("#copy").addEventListener('click',(e)=>{
        output.select();
        output.setSelectionRange(0, 99999);
        clipboard(output.value);
    })
});

