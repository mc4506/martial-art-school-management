$(document).ready(() => {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  addModal();
  loadPageTopic(1)
  // $.get("/api/user_data").then(data => {
  //   userInfo = data;
  //   console.log(userInfo);
  //   $("span.member").text(userInfo.firstName + " " + userInfo.lastName);
  // }).then(function () {
  //   if (userInfo.memberStatus === 0) {
  //     $("#topic").hide();
  //     $("#topicAdd").hide();
  //   }
  //   getTopics(1);
  //   getKicks(1);
  // });
});
var userInfo;

// load topic on page
function loadPageTopic(num) {
  $.get("/api/user_data").then(data => {
    userInfo = data;
    console.log(userInfo);
    $("span.member").text(userInfo.firstName + " " + userInfo.lastName);
  }).then(function () {
    if (userInfo.memberStatus === 0) {
      $("#topic").hide();
      $("#topicAdd").hide();
    }
    getTopics(num);
    getKicks(num);
  });

}

$("#topicAdd").on("click", function (event) {
  event.preventDefault();
  if ($("#topic").val() === "") {
    alertMe("Input Error", "Enter something!\n You forgot to push keys!!!!\n Try again!!\n You can DO IT!!!!")
    return;
  }
  // Make a newTopic object
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
    .then(function () {
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
    if (boo === 0) {
      // select last topic from KickTopic table
      $("#topics").val(data.length);
    } else {
      // select boo topic from KickTopic table
      $("#topics").val(boo);
    }
  });
}

function getChangeTopic() {
  $("#kicks-area").html("");
  getKicks($("#topics").val());
}

function getKicks(num) {
  $.get("/api/topic/" + num).then(data => {
    if (data.length !== 0) {
      let oneKick = {};
      let kicks = [];
      console.log(data);
      for (var i = data.length - 1; i >= 0; i--) {
        oneKick = {
          id: data[i].id,
          memberStatus: userInfo.memberStatus === 1 ? true : false,
          name: data[i].User.firstName + ' ' + data[i].User.lastName + " kicks.. ",
          message: data[i].message,
          time: moment(data[i].createdAt).format("h:mma on dddd")
        }
        kicks.push(oneKick)
      }
      var theTemplateScript = $("#example-template").html();

      // Compile the template
      var theTemplate = Handlebars.compile(theTemplateScript);

      // This is the default context, which is passed to the template
      var context = {
        kicks: kicks
      };

      // Pass our data to the template
      var theCompiledHtml = theTemplate(context);

      // Add the compiled html to the page
      $("#kicks-area").append(theCompiledHtml);
    }
  });
};

// When user clicks delete-btn
function delButtonClick(event) {
  var recordId = $(event.target).attr("data-id");
  var topicID=0;
  console.log(recordId)
  $.get("/api/kickTopic/" + recordId).then(data => {
    topicID=data.KickTopicId;
    console.log(topicID)
    $.ajax({
      method: "DELETE",
      url: "/api/kick/" + recordId
    }).then(response => {
      $("#kicks-area").html("");
      loadPageTopic(topicID);
    })
  })

};

// When user clicks add-btn
$("#kick-submit").on("click", function (event) {
  event.preventDefault();

  // Make a newKick object
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
      $.post("/api/kickID", newKick)
        .then(res => {
          var row = $("<div>");
          row.addClass("kick");
          row.append("<p>" + userInfo.firstName + " " + userInfo.lastName + " kicked: </p>");
          row.append("<p>" + newKick.message + "</p>");
          row.append("<p>At " + moment(dateNow).format("h:mma on dddd") + "</p>");
          if (userInfo.memberStatus === 1) {
            row.append('<button class="btn btn-danger" onclick="delButtonClick(event)" data-id=' + res.id + ">Delete</button");
          }
          $("#kicks-area").prepend(row);
        })
    });

  // Empty each input box by replacing the value with an empty string
  $("#author").val("");
  $("#kick-box").val("");
});

// When the page loads, grab all of our kicks
