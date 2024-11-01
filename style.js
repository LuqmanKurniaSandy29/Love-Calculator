const textElement = document.getElementById("typing-text");
const text = "Love Calculator";
let index = 0;
let isAdding = true;

function typeEffect() {
  textElement.textContent = text.substring(0, index);

  if (isAdding) {
    if (index < text.length) {
      index++;
    } else {
      isAdding = false;
      setTimeout(typeEffect, 2000); // Pause before deleting
      return;
    }
  } else {
    if (index > 0) {
      index--;
    } else {
      isAdding = true;
    }
  }

  setTimeout(typeEffect, isAdding ? 200 : 100); // Speed of typing/deleting
}

typeEffect();

  