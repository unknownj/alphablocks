var input = document.querySelector('input#text');

var render = function(){

  var output = document.querySelector('#output');
  var curated = document.querySelector("div#curated");

  var lines = input.value.split("#").map(function (line) {
    return line.trim().split(" ");
  });

  // remove all child nodes from output
  while (output.firstChild) {
    output.removeChild(output.firstChild);
  }

  while (curated.firstChild) {
    curated.removeChild(curated.firstChild);
  }

  lines.forEach(function(line){
    output.appendChild(el.make("div.line", line.map(function(word, wordIndex, wordArray){
      if(word === "apple") word = "apple-whole";
      return el.make(
        "div.word." + word + (wordIndex > 0 ? ".last-word-" + wordArray[wordIndex - 1] : ""),
        word.split("-")[0].split("").map(function(letter, letterIndex, letterArray){
          return el.make("div.alphablock." + letter);
        })
        .concat(
          faicons.indexOf(word) >= 0 ?
            el.make("div.alphablock.faicon", el.make("i.fa-regular.fa-" + word + "[data-fa-transform=up-6]"))
            :
            []
        )
      );
    })));
  })

  lines.forEach(function(line){
    line.forEach(function(word, wordIndex, wordArray){
      if(faicons.indexOf(word) >= 0){
        curated.appendChild(
          el.make("div.word." + word + (wordIndex > 0 ? ".last-word-" + wordArray[wordIndex - 1] : "") + ".faicon", el.make("i.fa-regular.fa-" + word + "[data-fa-transform=up-6]"), {fontSize: "72pt", display: "inline-block", marginRight: "40px"})
        );
      }
    });
  });
}

input.addEventListener('keyup', function (ev) {

  if (ev.keyCode === 13) input.value += "#";

  render();

});




/*
  output.innerHTML = text.map(function (a, i, arr) {
    if (a === " " || a === "cursor" || a === "#") {
      // find the previous instance of space in the array
      var prev = Math.max(arr.slice(0, i).lastIndexOf(" "), arr.slice(0, i).lastIndexOf("#"));
      // get the contents of the array between the #
      var contents = arr.slice(prev + 1, i);
      var icon = "";
      if(faicons.indexOf(contents.join("")) >= 0){
        icon = `<i class="fa-regular fa-${contents.join("")}" data-fa-transform="up-6"></i>`;
      }
      var op = `<div class="alphablock word ${a === "cursor" ? " cursor " : ""} last-word-${lastWord} word-${contents.join("")}">${icon}</div>` + (a === "#" ? "<br/>" : "");
      lastWord = contents.join("");
      return op;
    }
    return `<div class="alphablock ${a}"></div>`;
  }).join("");
*/
