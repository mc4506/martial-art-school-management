$(document).ready(() => {
    // display Member info
    $.get("/api/user_data").then(data => {
        $(".member-name").text(`${data.firstName}`);
        $(".member-lastName").text(`${data.lastName}`);
    });
})
$(document).ready(function () {
    const updateForm = $("form.update");
    // using jquery mask plugin from http://igorescobar.github.io/jQuery-Mask-Plugin/
    $('#phoneNumber').mask('000-000-0000');
  
    updateForm.on("submit", event => {
        event.preventDefault();
  
        // retrieve form values
        const birthday = $("#birthday").val();
        const experienceLevel = $("#experienceLevel").val();
        const phoneNumber = $("#phoneNumber").val().trim();
  
        const age = convertBdayToAge(birthday);
        // console.log(age);
        const certLevel = getCertLevel(experienceLevel);
        // console.log(certLevel);
  
        const validPhone = validatePhoneNumber(phoneNumber);
  
        if (validPhone === confirm) {
          const userData = {
            "age": age,
            "certLevel": certLevel,
            "phone": phoneNumber,
          };
  
          // console.log(userData)
  
          signUpUser(userData);
  
          // reset form data
          $("#birthday").val("");
          $("#phoneNumber").val("");
  
        } else {
          $(".alert").removeClass("d-none")
        };
  
    });
  })
  
  const validatePhoneNumber = function(number) {
    if(number.length===12) {
      $("label[for='phoneNumber']").text("Phone number").css("color", "black");
      return true
    } else {
      $("label[for='phoneNumber']").text("Enter a valid phone number").css("color", "red");
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
    console.log(err.responseJSON.errors[0].message)
    alertMe(`Input Error: ${err.status} (${err.responseJSON.errors[0].message})`, "Your email\n has a record already!\n Try again!!!!")
    // $("#alert .msg").text(err.responseJSON);
    // $("#alert").fadeIn(500);
  }