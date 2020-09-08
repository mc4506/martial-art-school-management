$(document).ready(() => {
  // Getting references to our form and inputs
  const loginForm = $("form.login");
  const emailInput = $("#userEmail");
  const passwordInput = $("#userPassword");
  // When the form is submitted, we validate there's an email and password entered
  loginForm.on("submit", event => {
    event.preventDefault();
    const userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };

    if (!userData.email || !userData.password) {
      alertMe("Input Error", "Wake UP!\n You forgot to push keys!!!!\n Try again!!\n You can DO IT!!!!")
      return;
    }

    // If we have an email and password we run the loginUser function and clear the form
    loginUser(userData.email, userData.password);
    emailInput.val("");
    passwordInput.val("");
  });

  // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
  function loginUser(email, password) {
    $.post("/api/login", {
      email: email,
      password: password
    })
      .then(() => {
        window.location.replace("/members");
        // If there's an error, log the error
      })
      .catch(err => {
        console.log(err);
        alertMe(`Input Error: ${err.status} (${err.responseText})`, "Your password or email\n Does not match our record!!!!\n Access denied!!\n Try again!!!!")
      });
  }
});
// alert function
function alertMe(header, message) {
  // setting up recall of the appointment edit form in the modal
  $(".modal-title").text(header);
  $("#alertText").text(message);
  $('#myModal').modal("show");
}

