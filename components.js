var el = {

    // Function to take a selector, optional content, and a style object, and return an element
    _make: function (selector, optionalDescendants, optionalStyleObject, optionalNamespace) {

      var optionalText;
      var optionalChildren;

      if (typeof selector === "object") {
        optionalText = selector.text;
        optionalChildren = selector.children;
        optionalStyleObject = selector.style;
        selector = selector.selector;
      }

      if (typeof optionalDescendants === "object" && optionalDescendants.html) {
        optionalText = optionalDescendants;
      } else if (typeof optionalDescendants === "object") {
        optionalChildren = optionalDescendants;
      } else if (typeof optionalDescendants === "string" || typeof optionalDescendants === "number") {
        optionalText = optionalDescendants.toString();
      }

      if (optionalChildren && optionalChildren.tagName) optionalChildren = [optionalChildren];

      var elementDefinition = {
        elementType: [],
        id: [],
        classList: [],
        attributeList: [],
        junk: []
      };

      // Split the selector into an array of characters to run through
      var parts = selector.split("");

      var currentlyUpdating = "elementType";
      var currentValue = "";

      for (var i = 0; i <= parts.length; i++) {
        if (i === parts.length) {
          elementDefinition[currentlyUpdating].push(currentValue);
        } else if (currentlyUpdating === "attributeList" && parts[i] === "]") {
          elementDefinition[currentlyUpdating].push(currentValue);
          currentValue = "";
          currentlyUpdating = "junk";
        } else if (currentlyUpdating === "attributeList") {
          currentValue += parts[i];
        } else if (parts[i] === ".") {
          elementDefinition[currentlyUpdating].push(currentValue);
          currentValue = "";
          currentlyUpdating = "classList";
        } else if (parts[i] === "#") {
          elementDefinition[currentlyUpdating].push(currentValue);
          currentValue = "";
          currentlyUpdating = "id";
        } else if (parts[i] === "[") {
          elementDefinition[currentlyUpdating].push(currentValue);
          currentValue = "";
          currentlyUpdating = "attributeList";
        } else {
          currentValue += parts[i]
        }
      }

      var element = optionalNamespace ?
        document.createElementNS(optionalNamespace, elementDefinition.elementType)
        :
        document.createElement(elementDefinition.elementType || "div");

      element.elementDefinition = elementDefinition;

      elementDefinition.classList.forEach(function (c) {
        element.classList.add(c);
      });

      elementDefinition.attributeList.forEach(function (attrString) {
        if (optionalNamespace) {
          element.setAttributeNS(null, attrString.split("=")[0], attrString.split("=").splice(1).join("="));
        } else {
          element.setAttribute(attrString.split("=")[0], attrString.split("=").splice(1).join("="));
        }
      });

      if (elementDefinition.id.length > 0) {
        if (optionalNamespace) {
          element.setAttributeNS(null, "id", elementDefinition.id[0]);
        } else {
          element.setAttribute("id", elementDefinition.id[0]);
        }
      }

      var styles = [];
      if (optionalStyleObject && !Array.isArray(optionalStyleObject)) {
        styles.push(optionalStyleObject);
      } else if (optionalStyleObject && Array.isArray(optionalStyleObject)) {
        styles = styles.concat(optionalStyleObject);
      }
      styles.forEach(function (styleObject) {
        for (var k in styleObject) {
          element.style[k] = styleObject[k];
        }
      });

      if (optionalText && typeof optionalText !== "object") {
        element.appendChild(this.text(optionalText));
      } else if (optionalText && typeof optionalText === "object" && optionalText.html) {
        element.innerHTML = optionalText.html; // yucky...
      }

      if (optionalChildren) {
        optionalChildren
          .filter(function (child) {
            return child.tagName;
          })
          .forEach(function (child) {
            element.appendChild(child);
          });
      }

      return element;
    },

    make: function (selector, optionalDescendants, optionalStyleObject) {
      return this._make(selector, optionalDescendants, optionalStyleObject);
    },

    draw: function (selector, optionalText, optionalStyleObject) {
      return this._make(selector, optionalText, optionalStyleObject, "http://www.w3.org/2000/svg");
    },

    text: function (value) {
      return document.createTextNode(value);
    }
  };


el.draw.polarToCartesian = function(centerX, centerY, radius, angleInDegrees) {

  var angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;

  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians)),
    toXY: function (spacer) { return this.x + spacer + this.y; }
  };

}

el.draw.regularNGon = function(n, centerX, centerY, radius, filled, rotationOffset, optionalStyleObject){
  var points = [];
  for (var i = 0; i < n; i++) {
    points.push(el.draw.polarToCartesian(centerX, centerY, radius, rotationOffset + (i * 360 / n)));
  }
  if(!filled) points.push(el.draw.polarToCartesian(centerX, centerY, radius, rotationOffset));

  var strPoints = points.map(function(p){ return p.toXY(","); }).join(" ");

  var poly = el.draw((filled ? "polygon" : "polyline") + "[points=" + strPoints + "]", undefined, optionalStyleObject);
  if(!filled){
    poly.setAttribute("fill","none");
    poly.setAttribute("stroke-width", "1px");
    poly.setAttribute("stroke", "black");
  } else {
    poly.setAttribute("fill","black");
    poly.setAttribute("stroke", "none");
  }
  return poly;
}

el.draw.rectangle = function(x, y, width, height, optionalStyleObject){
  return el.draw("rect[x=" + x + "][y=" + y + "][width=" + width + "][height=" + height + "]", undefined, optionalStyleObject);
}

el.draw.roundedRectangle = function(x, y, width, height, cornerRadius, optionalStyleObject){
  return el.draw("rect[x=" + x + "][y=" + y + "][width=" + width + "][height=" + height + "][rx=" + cornerRadius + "]", undefined, optionalStyleObject);
}

el.draw.circle = function(centerX, centerY, radius, optionalStyleObject){
  return el.draw("circle[cx=" + centerX + "][cy=" + centerY + "][r=" + radius + "]", undefined, optionalStyleObject);
};

el.draw.cog = function(centerX, centerY, innerRadius, outerRadius, teeth, rotationOffset, optionalStyleObject){
  rotationOffset = rotationOffset || 0;
  rotationOffset -= (360 / (teeth * 4));
  var bump = 360 / (teeth * 2) * 0.2;
  var points = [];
  for (var i = 0; i < teeth * 4; i++) {
    if(i % 4 === 0){
      points.push(el.draw.polarToCartesian(centerX, centerY, innerRadius, rotationOffset - bump + (i * 360 / (teeth * 4))));
      points.push(el.draw.polarToCartesian(centerX, centerY, outerRadius, rotationOffset + (i * 360 / (teeth * 4))));
    } else if(i % 4 === 1){
      points.push(el.draw.polarToCartesian(centerX, centerY, outerRadius, rotationOffset + (i * 360 / (teeth * 4))));
    } else if(i % 4 === 2){
      points.push(el.draw.polarToCartesian(centerX, centerY, outerRadius, rotationOffset + (i * 360 / (teeth * 4))));
      points.push(el.draw.polarToCartesian(centerX, centerY, innerRadius, rotationOffset + (bump + (i * 360 / (teeth * 4)))));
    } else {
      points.push(el.draw.polarToCartesian(centerX, centerY, innerRadius, rotationOffset + (i * 360 / (teeth * 4))));
    }
  }
  var strPoints = points.map(function(p){ return p.toXY(","); }).join(" ");

  var poly = el.draw("polygon[points=" + strPoints + "]", undefined, optionalStyleObject);
  poly.setAttribute("fill","black");
  poly.setAttribute("stroke", "none");
  return poly;
}

el.draw.svg = function(width, height, viewBox, optionalChildren, optionalStyle){
  var svg = el.draw("svg[width=" + width + "][height=" + height + "]" + (viewBox ? "[viewBox=" + viewBox + "]" : ""), optionalChildren, optionalStyle);
  var defs = el.draw("defs");
  svg.appendChild(defs);
  svg.appendDefs = function(itemToAppend){
    defs.appendChild(itemToAppend);
  }
  return svg;
}

el.draw.gradient = function(id, stops, direction){
  var gradient = el.draw([
    "linearGradient",
    "[id=" + id + "]",
    "[x1=0]",
    "[y1=0]",
    "[x2=" + (direction === "horizontal" ? "1" : "0") + "]",
    "[y2=" + (direction === "horizontal" ? "0" : "1") + "]"
  ].join(""));

  // for each member of stops that is a colour string, convert it to an object
  stops = stops.map(function(stop){
    if(typeof stop === "string"){
      return { color: stop };
    } else {
      return stop;
    }
  });

  // if the first stop has no offset, set it to zero
  if(stops[0].offset === undefined) stops[0].offset = 0;
  // if the last stop has no offset, set it to 100%
  if(stops[stops.length - 1].offset === undefined) stops[stops.length - 1].offset = "100%";
  // if there are exactly three stops and the middle has no offset, set it to 50%
  if(stops.length === 3 && stops[1].offset === undefined) stops[1].offset = "50%";
  
  stops.forEach(function(stop){
    gradient.appendChild(el.draw("stop[offset=" + stop.offset + "][stop-color=" + stop.color + "]"));
  });
  return gradient;
}

el.draw.line = function(x1, y1, x2, y2, optionalStyleObject){
  return el.draw("line[x1=" + x1 + "][y1=" + y1 + "][x2=" + x2 + "][y2=" + y2 + "]", undefined, optionalStyleObject);
}