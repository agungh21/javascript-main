let button = document.getElementById("tombol_form");
button.addEventListener("click", cariKataPanjang, false);

let button_reset = document.getElementById("tombol_reset");
button_reset.addEventListener("click", reset);

let myList = document.getElementById("myList");
let msg = document.getElementById("message");

function cariKataPanjang() {
  let input = document.getElementById("input_form").value;
  if (input == "") {
    msg.style.display = "block";
    myList.style.display = "none";
  }
  let kata = input.split(" ");
  let katapanjang = "";

  for (let k of kata) {
    if (k.length > katapanjang.length) {
      katapanjang = k;
    }
  }

  for (let i = 0; i < kata.length; i++) {
    var x = document.createElement("LI");
    var t = document.createTextNode(kata[i] + " = " + kata[i].length);
    x.appendChild(t);
    document.getElementById("myList").appendChild(x);

    if (kata[i].length == katapanjang.length) {
      x.style.color = "green";
    }
  }

  button.disabled = true;
  button_reset.disabled = false;
}

function reset() {
  location.reload();
}
