function alertMe(header, message) {
  // setting up recall of the appointment edit form in the modal
  $(".modal-title").text(header);
  $("#alertText").text(message);
  // jQuery.noConflict();
  $('#myModal').modal("show");
}

function addModal() {
  $("#myModal").load("modal.html");
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