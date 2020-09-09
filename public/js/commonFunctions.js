function alertMe(header, message) {
    // setting up recall of the appointment edit form in the modal
    $(".modal-title").text(header);
    $("#alertText").text(message);
    // jQuery.noConflict();
    $('#myModal').modal("show");
  }
  function addModal(){$("#myModal").load("modal.html");}
