/* global moment */
var userInfo;
var kick = {};
$(document).ready(() => {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(data => {
    console.log(data);
    userInfo = data;
    $("span.member").text(userInfo.name);
  });
  getTopics(1);
  getKicks(1);
});


function getUserName(num) {
  $.get("/api/username/" + num)
    .then(data => {
      console.log(data);
      return string(data)

    })
    .catch(function (err) {
      return "";
    })

}

$("#topicAdd").on("click", function (event) {
  event.preventDefault();
  if ($("#topic").val() === "") {
    alert("Enter something!")
    return;
  }
  // Make a newChirp object
  var newTopic = {
    title: $("#topic").val().trim(),
  };

  console.log(newTopic);

  // Send an AJAX POST-request with jQuery
  $.post("/api/topicnew", newTopic)
    // On success, run the following code
    .then(function () {
      getTopics(0);
    })
    .then(function (){
      $("#kicks-area").html("");
      $("#topics").val(1);
    });

});

function getTopics(boo) {
  $.get("/api/topicsall").then(data => {
    console.log(data);
    $("#topicChoice").html('');
    $("#topicChoice").prepend('<select name="topics" class="form-control" id="topics" onchange="getChangeTopic()"></select>');
    for (let i = 0; i < data.length; i++) {
      $("#topics").append('<option value=' + parseInt(data[i].id) + '>' + data[i].topicTitle + '</option>');
    }
    $("#topic").val("");
    if (boo===0){
      $("#topics").val(data.length);
    }else{
      $("#topics").val(1);
    }
  });
}


function getChangeTopic(){
  $("#kicks-area").html("");
  getKicks($("#topics").val());
}


function getKicks(num) {
  let userName;

  $.get("/api/topic/" + num).then(data => {
    if (data.length !== 0) {
      for (var i = 0; i < data.length; i++) {
        
      
        
        $.post("/api/username", data[i])
          .then(res => {
            console.log(res);
            var row = $("<div>");
            row.addClass("kick");
            row.append("<p>" +res.name + " kicks.. </p>");
            row.append("<p>" + res.message + "</p>");
            row.append("<p>At " + moment(res.time).format("h:mma on dddd") + "</p>");
            $("#kicks-area").prepend(row);

          })
         

      }

    }

  });





};




// When user clicks add-btn
$("#kick-submit").on("click", function (event) {
  event.preventDefault();

  // Make a newChirp object
  var newKick = {
    message: $("#kick-box").val().trim(),
    UserId: userInfo.id,
    KickTopicId: $("select option:selected").val(),
  };
  var dateNow = new Date();

  // Send an AJAX POST-request with jQuery
  $.post("/api/kicknew", newKick)
    // On success, run the following code
    .then(function () {

      var row = $("<div>");
      row.addClass("kick");

      row.append("<p>" + userInfo.name + " kicked: </p>");
      row.append("<p>" + newKick.message + "</p>");
      row.append("<p>At " + moment(dateNow).format("h:mma on dddd") + "</p>");

      $("#kicks-area").prepend(row);

    });

  // Empty each input box by replacing the value with an empty string
  $("#author").val("");
  $("#kick-box").val("");
});

// When the page loads, grab all of our chirps
