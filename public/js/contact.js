$("#submitBTN").on("click", function (event) {
    event.preventDefault();
    console.log("click")
    let message = {
        firstname: $("#fname").val(),
        lastname: $("#lname").val(),
        faq: $("#faq").val(),
        subject: $("#subject").val(),
    }
    
})