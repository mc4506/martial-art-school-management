$(document).ready(() => {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(data => {
    $(".member-name").text(`${data.firstName} ${data.lastName}`);
  });

  // get class info
  // $.get("/api/class_info").then(data=> {

  // })
  

});
