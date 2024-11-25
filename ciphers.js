//POV: your system is really bored one night
function K_encode(input) {
  let chunk = input;
  let storage = "";
  chunk = chunk.replaceAll(" ", "ඞ");
  while (chunk.length > 2) {
    let first = chunk[0];
    let last = chunk[chunk.length - 1];
    storage += first + last;
    chunk = chunk.slice(1, -1);
    let inner = "";
    for (let i = chunk.length - 1; i >= 0; i--) {
      inner += chunk[i];
    }
    chunk = inner;
  }
  let output = "";
  for (const letter of storage) {
    output += letter;
  }
  output += chunk;
  output = output.replaceAll("ඞ", " ");
  return output;
}
function K_decode(input) {
  let chunk = input;
  let left = "";
  let right = "";
  let reverse = false;
  chunk = chunk.replaceAll(" ", "ඞ");
  while (chunk.length > 2) {
    left += reverse ? chunk[1] : chunk[0];
    right = reverse ? chunk[0] + right : chunk[1] + right;
    let inner = chunk.slice(2);
    chunk = inner;
    reverse = !reverse;
  }
  chunk = chunk.split("").reverse().join("");
  let output = left + chunk + right;
  output = output.replaceAll("ඞ", " ");
  return output;
}
//Y.xesob,  tthxeist  itls uaa fed

const scrabblePoints = {
  a: 1,
  b: 3,
  c: 3,
  d: 2,
  e: 1,
  f: 4,
  g: 2,
  h: 4,
  i: 1,
  j: 8,
  k: 5,
  l: 1,
  m: 3,
  n: 1,
  o: 1,
  p: 3,
  q: 10,
  r: 1,
  s: 1,
  t: 1,
  u: 1,
  v: 4,
  w: 4,
  x: 8,
  y: 4,
  z: 10,
};
const vowelValues = { 0: "a", 1: "e", 2: "i", 3: "o", 4: "u" };
const vowelValues2 = { a: 0, e: 1, i: 2, o: 3, u: 4 };
function L_encode(input) {
  let output = "";
  let skip = false;
  for (let i = 0; i < input.length; i++) {
    let letter = input.toLowerCase()[i];
    if (["a", "e", "i", "o", "u"].includes(letter) && !skip) {
      skip = true;
      let currentVal = vowelValues2[letter];
      let leftVal =
        i > 0 && scrabblePoints.hasOwnProperty(input.toLowerCase()[i - 1])
          ? scrabblePoints[input.toLowerCase()[i - 1]]
          : 0;
      let rightVal =
        i < input.length &&
        scrabblePoints.hasOwnProperty(input.toLowerCase()[i + 1])
          ? scrabblePoints[input.toLowerCase()[i + 1]]
          : 0;
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
function L_decode(input) {
  let decode = ""; // Holds the result string
  let i = 0;

  while (i < input.length) {
    if (/[0-9]/.test(input[i])) {
      let numStr = "";
      let leftVal =
        i > 0 && scrabblePoints.hasOwnProperty(input.toLowerCase()[i - 1])
          ? scrabblePoints[input.toLowerCase()[i - 1]]
          : 0;
      while (i < input.length && /[0-9]/.test(input[i])) {
        numStr += input[i];
        i++;
      }
      let rightVal =
        i < input.length &&
        scrabblePoints.hasOwnProperty(input.toLowerCase()[i])
          ? scrabblePoints[input.toLowerCase()[i]]
          : 0;
      let foundVowel = vowelValues[parseInt(numStr) - leftVal - rightVal];
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

const suits = [
  ["🂥", "e"],
  ["🂵", "t"],
  ["🃅", "o"],
  ["🂤", "d"],
  ["🂴", "r"],
  ["🃄", "m"],
  ["🃔", "b"],
  ["🂣", "a"],
  ["🂳", "a"],
  ["🃃", "a"],
  ["🃓", "u"],
  ["🂢", "p"],
  ["🂲", "e"],
  ["🃂", "i"],
  ["🃒", "l"],
  ["🂡", "s"],
  ["🂱", "h"],
  ["🃁", "d"],
  ["🃑", "c"],
];
//club, heart, diamond, spade
//"thank you fireisgood for showing us the unicode cards", we all say in a slowed unison
function M_encode(input) {
  suits.forEach(([card, letter]) => {
    input = input.replaceAll(letter, card);
  });
  return input;
}
function M_decode(input) {
  suits.forEach(([card, letter]) => {
    input = input.replaceAll(card, letter);
  });
  return input;
}
// Y🂥🂡, 🂵🂱🃂🂡 🃂🂡 🂣 🂤🂥f🂣🃓🃒🂵 🂵🂥x🂵 🃔🃅x.

const ike = "bcdfghqrvxyz";
const angry = [
  ["b", "!"],
  ["c", "@"],
  ["d", "#"],
  ["f", "$"],
  ["g", "%"],
  ["h", "^"],
  ["q", "&"],
  ["r", "*"],
  ["v", "("],
  ["x", ")"],
  ["y", "-"],
  ["z", "+"],
];
function A_encode(input) {
  let encode = "";
  let kijetesantakalu = "🦝";
  let waste = "🗑️";
  let bin = "";
  input = input.replaceAll(" ", "¬");
  let i = 0;
  while (i < input.length) {
    if (ike.includes(input[i].toLowerCase())) {
      for (let pair of angry) {
        if (input[i].toLowerCase() == pair[0]) {
          kijetesantakalu += pair[1];
          break;
        }
      }
      bin += "1";
    } else {
      encode += input[i];
      bin += "ඞ";
    }
    i++;
    if (bin.length == 4){
      bin = bin.replaceAll("ඞ","0");
      waste += parseInt(bin,2).toString(16).toUpperCase();
      bin = "";
    }
  }
  if (bin.length > 0){
    bin.padEnd(4,"ඞ");
    bin = bin.replaceAll("ඞ","0");
    waste += parseInt(bin,2).toString(16).toUpperCase();
  }
  encode = encode + kijetesantakalu + waste;
  encode = encode.replaceAll("¬", " ");
  return encode;
}
function A_decode(input) {
  let decode = "";
  input = input.replaceAll(" ", "¬");
  let chunks = input.split("🦝");
  let start = chunks[0];
  chunks = chunks[1].split("🗑️");
  for (let pair of angry){
    chunks[0] = chunks[0].replaceAll(pair[1],pair[0]);
  }
  if (start && chunks){
    let split = [];
    for (let i = 0; i < chunks[1].length; i += 2){
      split.push(chunks[1].substring(i, i+2));
    }
    if (split[split.length-1].length == 1){
      split[split.length-1] += "0";
    }
    let bin = "";
    for (let pair in split){
      let nibble = parseInt(split[pair],16).toString(2);
      while (nibble.length < 8){
        nibble = "0" + nibble;
      }
      bin += nibble;
    }
    let i = 0, j = 0;
    for (let bit of bin){
      if (bit == "1"){
        if (chunks[0][i] == null){
          continue;
        }
        decode += chunks[0][i];
        i++;
      } else {
        if (start[j] == null){
          continue;
        }
        decode += start[j];
        j++;
      }
    }
  }
  decode = decode.replaceAll("¬", " ");
  return decode;
}
//es, tis is a eault tet o.🦝-^#$)!)🗑️8201404A

let finalInput = "";
let currentCipher = "";
let encoding = true;
let globalOut = "";
const output = $("#output");
function update() {
  let outputText = finalInput;
    switch (currentCipher) {
      case "K":
        outputText = encoding ? K_encode(finalInput) : K_decode(finalInput);
        break;
      case "L":
        outputText = encoding ? L_encode(finalInput) : L_decode(finalInput);
        break;
      case "M":
        outputText = encoding ? M_encode(finalInput) : M_decode(finalInput);
        break;
      case "A":
        outputText = encoding ? A_encode(finalInput) : A_decode(finalInput);
        break;
    }
  $("#output").val(outputText);
  globalOut = outputText;
}

async function clipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
  } catch (err) {
    console.error("Failed to copy: ", err);
    //doesn't work in iframes (aka the vscode extension preview window)
  }
}

$(document).ready(function () {
  const input = $("#input");
  $("#output").val(input.val());
  input.on("keyup change", function (e) {
    let key = e.key;
    if (toString(key).length > 1) {
      key = "";
    }
    finalInput = input.val() + key;
    update();
  });
  const dropdown = $("#dropcontent");
  dropdown.change(function () {
    const dropvalue = dropdown.val();
    currentCipher = dropvalue;
    finalInput = input.val();
    update();
  });
  $("#encodetoggle").click(function () {
    encoding = !encoding;
    if (encoding) {
      $("#encodetoggle").html("<b>Encoding</b>");
    } else {
      $("#encodetoggle").html("<b>Decoding</b>");
    }
    update();
  });
  $("#copy").click(function () {
    $("#output").select();
    $("#output").setSelectionRange(0, 99999);
    clipboard(output.val());
  });
});
