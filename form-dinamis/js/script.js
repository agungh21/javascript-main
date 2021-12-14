var inputs = document.getElementById("inputs");
var tambah = document.getElementById("tambah");
var kurang = document.getElementById("kurang");

tambah.onclick = function () {
  var newInput = document.createElement("input");
  newInput.setAttribute("type", "text");
  newInput.setAttribute("name", "input[]");
  inputs.appendChild(newInput);
};

kurang.onclick = function () {
  var inputTags = inputs.getElementsByTagName("input");
  if (inputTags.length > 1) {
    inputs.removeChild(inputTags[(inputTags.length = 1)]);
  }
};
