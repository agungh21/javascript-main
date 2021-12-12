function CustomValidation() {
  this.invalidities = [];

  this.validityChecks = [];
}

CustomValidation.prototype = {
  addInvalidity: function (message) {
    this.invalidities.push(message);
  },
  getInvalidities: function () {
    return this.invalidities.join(". \n");
  },
  checkValidity: function (input) {
    for (var i = 0; i < this.validityChecks.length; i++) {
      var isInvalid = this.validityChecks[i].isInvalid(input);
      if (isInvalid) {
        this.addInvalidity(this.validityChecks[i].invalidityMessage);
      }

      var requirementElement = this.validityChecks[i].element;

      if (requirementElement) {
        if (isInvalid) {
          requirementElement.classList.add("invalid");
          requirementElement.classList.remove("valid");
        } else {
          requirementElement.classList.remove("invalid");
          requirementElement.classList.add("valid");
        }
      }
    } // end if requirementElement
  },
};

// validity check

var usernameValidityChecks = [
  {
    isInvalid: function (input) {
      return input.value.length < 3;
    },
    invalidityMessage: "Minimal 3 karakter",
    element: document.querySelector(
      'label[for="username"] .input-requirements li:nth-child(1)'
    ),
  },
  {
    isInvalid: function (input) {
      var illegalCharacters = input.value.match(/[^a-zA-Z0-9]/g);
      return illegalCharacters ? true : false;
    },
    invalidityMessage:
      "Hanya boleh berisi huruf dan angka (tidak boleh karakter khusus)",
    element: document.querySelector(
      'label[for="username"] .input-requirements li:nth-child(2)'
    ),
  },
];

var passwordValidityChecks = [
  {
    isInvalid: function (input) {
      return (input.value.length < 8) | (input.value.length > 100);
    },
    invalidityMessage:
      "Panjang minimal 8 karakter (dan kurang dari 100 karakter)",
    element: document.querySelector(
      'label[for="password"] .input-requirements li:nth-child(1)'
    ),
  },
  {
    isInvalid: function (input) {
      return !input.value.match(/[0-9]/g);
    },
    invalidityMessage: "Berisi setidaknya 1 Angka",
    element: document.querySelector(
      'label[for="password"] .input-requirements li:nth-child(2)'
    ),
  },
  {
    isInvalid: function (input) {
      return !input.value.match(/[a-z]/g);
    },
    invalidityMessage: "Berisi minimal 1 huruf kecil",
    element: document.querySelector(
      'label[for="password"] .input-requirements li:nth-child(3)'
    ),
  },
  {
    isInvalid: function (input) {
      return !input.value.match(/[A-Z]/g);
    },
    invalidityMessage: "Berisi minimal 1 huruf besar",
    element: document.querySelector(
      'label[for="password"] .input-requirements li:nth-child(4)'
    ),
  },
  {
    isInvalid: function (input) {
      return !input.value.match(/[\!\@\#\$\%\^\&\*]/g);
    },
    invalidityMessage: "Berisi karakter khusus (contoh: @ ! & #)",
    element: document.querySelector(
      'label[for="password"] .input-requirements li:nth-child(5)'
    ),
  },
];

var passwordRepeatValidityChecks = [
  {
    isInvalid: function () {
      return passwordRepeatInput.value != passwordInput.value;
    },
    invalidityMessage: "Kata sandi ini harus cocok dengan yang pertama",
  },
];

function checkValidity(input) {
  input.CustomValidation.invalidities = [];
  input.CustomValidation.checkValidity(input);

  if (input.CustomValidation.invalidities.length == 0 && input.value != "") {
    input.setCustomValidity("");
  } else {
    var message = input.CustomValidation.getInvalidities();
    input.setCustomValidity(message);
  }
}

var usernameInput = document.getElementById("username");
var passwordInput = document.getElementById("password");
var passwordRepeatInput = document.getElementById("password_repeat");

usernameInput.CustomValidation = new CustomValidation(usernameInput);
usernameInput.CustomValidation.validityChecks = usernameValidityChecks;

passwordInput.CustomValidation = new CustomValidation(passwordInput);
passwordInput.CustomValidation.validityChecks = passwordValidityChecks;

passwordRepeatInput.CustomValidation = new CustomValidation(
  passwordRepeatInput
);
passwordRepeatInput.CustomValidation.validityChecks =
  passwordRepeatValidityChecks;

var inputs = document.querySelectorAll('input:not([type="submit"])');
for (var i = 0; i < inputs.length; i++) {
  inputs[i].addEventListener("keyup", function () {
    checkValidity(this);
  });
}

var submit = document.querySelector('input[type="submit"]');
submit.addEventListener("click", function () {
  for (var i = 0; i < inputs.length; i++) {
    checkValidity(this);
  }
});
