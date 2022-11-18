var colnames = [
  "red",
  "green",
  "blue",
  "yellow",
  "orange",
  "purple",
  "pink",
  "brown",
  "grey",
  "white",
  "black",
  "bisque",
  "cyan",
  "darkblue",
  "darkcyan",
  "darkgoldenrod",
  "darkgray",
  "darkgreen",
  "darkgrey",
  "darkkhaki",
  "darkmagenta",
  "darkolivegreen",
  "darkorange",
  "darkorchid",
  "darkred",
  "darksalmon",
  "darkseagreen",
  "darkslateblue",
  "darkslategray",
  "darkslategrey",
  "darkturquoise",
  "darkviolet",
  "deeppink",
  "deepskyblue",
  "dimgray",
  "dimgrey",
  "gold",
  "greenyellow",
  "indigo",
  "khaki",
  "lightblue",
  "lightcoral",
  "lightcyan",
  "lightgoldenrodyellow",
  "lightgray",
  "lightgreen",
  "lightgrey",
  "lightpink",
  "lightsalmon",
  "lightseagreen",
  "lightskyblue",
  "lightslategray",
  "lightslategrey",
  "lightsteelblue",
  "lime",
  "limegreen",
  "magenta",
  "mediumaquamarine",
  "mediumblue",
  "mediumorchid",
  "mediumpurple",
  "mediumseagreen",
  "mediumslateblue",
  "mediumspringgreen",
  "mediumturquoise",
  "mediumvioletred",
  "midnightblue",
  "navy",
  "olive",
  "olivedrab",
  "orangered",
  "orchid",
  "saddlebrown",
  "seagreen",
  "sienna",
  "aqua",
  "aquamarine",
  "azure",
  "beige",
  "bisque",
  "black",
  "blue",
  "brown",
  "chartreuse",
  "chocolate",
  "coral",
  "cornsilk",
  "crimson",
  "cyan",
  "darkorange",
  "fuchsia",
  "gainsboro",
  "gold",
  "grey",
  "green",
  "indigo",
  "ivory",
  "khaki",
  "lavender",
  "lime",
  "linen",
  "magenta",
  "maroon",
  "moccasin",
  "navy",
  "olive",
  "orange",
  "orchid",
  "peru",
  "pink",
  "plum",
  "purple",
  "red",
  "salmon",
  "sienna",
  "silver",
  "snow",
  "tan",
  "teal",
  "thistle",
  "tomato",
  "turquoise",
  "violet",
  "wheat",
  "white",
  "yellow"
];




var colString = colnames.map(function(colname){
  return `
.word-${colname} {
  background: ${colname};
}
.last-word-${colname} {
  color: ${colname};
}`;
}).join("\n");

document.head.appendChild(el.make("style#htmlcolors", colString));