var letters = [
  ["a", "-160", "-10"],
  ["b", "-300", "-10"],
  ["c", "-435", "-10"],
  ["d", "-570", "-10"],
  ["e", "-705", "-10"],
  ["£", "-830", "50"],
  ["f", "-990", "0"],
  ["g", "-140", "-180"],
  ["h", "-280", "-185"],
  ["i", "-410", "-190"],
  ["j", "-540", "-190"],
  ["k", "-680", "-180"],
  ["l", "-810", "-180"],
  ["m", "-960", "-180"],
  ["n", "-150", "-360"],
  ["o", "-280", "-360"],
  ["p", "-410", "-360"],
  ["q", "-540", "-360"],
  ["r", "-680", "-360"],
  ["s", "-810", "-360"],
  ["t", "-960", "-360"],
  ["u", "-150", "-530"],
  ["v", "-280", "-530"],
  ["w", "-410", "-540"],
  ["x", "-540", "-540"],
  ["y", "-680", "-540"],
  ["z", "-810", "-540"]
];

var letterString = letters.map(function(letterData){
  return `
.${letterData[0]} {
  background: url('images.jpg') ${letterData[1]}px ${letterData[2]}px;
  background-repeat: no-repeat;
}`;
}).join("\n");

document.head.appendChild(el.make("style#alphablockCoordinates", letterString));