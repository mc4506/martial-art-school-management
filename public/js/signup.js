$(document).ready(function () {
  const signUpForm = $("form.signup");

  // using jquery mask plugin from http://igorescobar.github.io/jQuery-Mask-Plugin/
  $('#phoneNumber').mask('000-000-0000');

  signUpForm.on("submit", event => {
      event.preventDefault();

      // retrieve form values
      const firstName = $("#firstName").val();
      const lastName = $("#lastName").val();
      const birthday = $("#birthday").val();
      const experienceLevel = $("#experienceLevel").val();
      const phoneNumber = $("#phoneNumber").val().trim();
      const email = $("#signUpEmail").val().trim();
      const password = $("#signUpPassword").val().trim();

      const age = convertBdayToAge(birthday);
      // console.log(age);
      const certLevel = getCertLevel(experienceLevel);
      // console.log(certLevel);

      // check form validation - other required fields are checked for not null using "required" in html
      const validPassword = validatePassword(password);
      const validEmail = validateEmail(email);
      const validPhone = validatePhoneNumber(phoneNumber);

      if (validPassword && validEmail && validPhone) {
        const userData = {
          "firstName": firstName,
          "lastName": lastName,
          "age": age,
          "certLevel": certLevel,
          "phone": phoneNumber,
          "email": email,
          "password": password
        };

        // console.log(userData)

        signUpUser(userData);

        // reset form data
        $("#firstName").val("");
        $("#lastName").val("");
        $("#birthday").val("");
        $("#phoneNumber").val("");
        $("#signUpEmail").val("");
        $("#signUpPassword").val("");

      } else {
        $(".alert").removeClass("d-none")
      };

  });
})

const validateEmail = function(email) {
  const emailRegex = /^[a-zA-Z\d\-_.]+@[a-zA-Z\d]+\.[a-zA-Z\d]{2,}$/i;
  if(emailRegex.test(email)) {
    $("label[for='signUpEmail']").text("Email address").css("color", "black");
    return true;
  } else {
    $("label[for='signUpEmail']").text("Enter a valid email address").css("color", "red");
  }
}

const validatePhoneNumber = function(number) {
  if(number.length===12) {
    $("label[for='phoneNumber']").text("Phone number").css("color", "black");
    return true
  } else {
    $("label[for='phoneNumber']").text("Enter a valid phone number").css("color", "red");
  }
}

const validatePassword = function (password) {
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
  if (passwordRegex.test(password)) {
    $("label[for='signUpPassword']").text("Enter a password").css("color", "black");
    return true;
  } else {
    $("label[for='signUpPassword']").text("Enter a valid password").css("color", "red");
  }
}

const convertBdayToAge = function (bday) {
  const bDate = new Date(bday);
  const today = new Date();
  // console.log(bDate, today);
  const bM = bDate.getMonth();
  const bY = bDate.getFullYear()
  const tM = today.getMonth();
  const tY = today.getFullYear();
  return Math.floor((tY + tM / 12) - (bY + bM / 12));
}

const getCertLevel = function(level) {
  const assignRank = {
    "I don't have one": 0,
    "White": 1,
    "Blue": 2,
    "Yellow": 3,
    "Green": 4,
    "Red": 5,
    "Brown": 6,
    "Black": 7
  }
  return assignRank[level]
}

const signUpUser = function (userdata) {
  $.post("/api/signup", userdata)
    .then(function (data) {
      window.location.replace("/members");
      // If there's an error, handle it by throwing up a bootstrap alert
    })
    .catch(handleLoginErr);
}

const handleLoginErr = function (err) {
  $("#alert .msg").text(err.responseJSON);
  $("#alert").fadeIn(500);
}