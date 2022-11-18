var input = document.querySelector('input#text');
input.addEventListener('keyup', function (ev) {

  if (ev.keyCode === 13) input.value += "#";

  var output = document.querySelector('#output');

  var text = (input.value || "").toLowerCase().split("").concat("cursor");

  var lastWord = "";

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


});
