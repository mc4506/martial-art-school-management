const belt = {
  "0": "N/A",
  "1": "White",
  "2": "Blue",
  "3": "Yellow",
  "4": "Green",
  "5": "Red",
  "6": "Brown",
  "7": "Black"
};

const role = {
  "0": "student",
  "1": "teacher",
};

let memberId = null;

$(document).ready(() => {

  let memberStatus = null;
  let rank = null;
  let isAdult = 1;

  $.get("/api/user_data").then(data => {
    $(".member-name").text(`${data.firstName}`);
    $(".member-email").text(`${data.email}`);
    $(".member-phone").text(`${data.phoneNumber}`);
    $(".member-belt").text(belt[data.certLevel] + " Belt");

    memberId = parseInt(data.id);
    rank = parseInt(data.certLevel);
    if (data.age < 18) isAdult = 0;
    memberStatus = data.memberStatus;
  })
  .then(() => {
    if (memberStatus === 0) {
      // unhide enrolled and eligible class Div
      $('.is-member').removeClass('d-none');

      const level = getEligibleClassLevel(rank);
      // get eligible class based on level and isAdult
      $.get(`/api/class_schedule/${level}/${isAdult}`)
      .then( data => {
        // console.log(data);
        listEligibleClasses(data);
      }).then( () => {
        $.get(`/api/classes/${memberId}`)
        .then((data) => {
          if(data.length === 0) {
            return;
          } else {
            displayEnrolledClasses(data);            
          }
        })
      });
    } else if (memberStatus === 1) {
      $('.is-teacher').removeClass('d-none');

      $.get("/api/all_members")
      .then( data => {
        console.log(data);
        displayMembers(data);
      })
    }
  });
});

const getEligibleClassLevel = function (rank) {
  switch (true) {
    case (rank >= 1 && rank <= 2):
      return 1;
    case (rank > 2 && rank <= 5):
      return 2;
    case (rank > 5 && rank <= 7):
      return 3;
    default:
      return 0;
  }
};

const listEligibleClasses = function (results) {

  results.forEach(e => {
    const inputEl = $('<input class="form-check-input classInfo" type="checkbox">');
    // use checkbox value of SessionId to select class
    inputEl.attr("value", `${e.id}`);
    $(`#calSession${e.id}`).prepend(inputEl);
    $(`#calSession${e.id}>.classInfo`).wrapAll('<div class="form-check"></div>')
    $(`#calSession${e.id}`).css("background", "#FFBA25");
  })
}

const displayMembers = function(data) {
  data.forEach( e => {
    const tableRow = $('<tr>');
    const idTd = $(`<td>${e.id}</td>`);
    const memberRole = role[e.memberStatus];
    const roleTd = $(`<td>${memberRole}</td>`);
    const firstNameTd = $(`<td>${e.firstName}</td>`);
    const lastNameTd = $(`<td>${e.lastName}</td>`);
    const ageTd = $(`<td>${e.age}</td>`);
    const emailTd = $(`<td>${e.email}</td>`);
    const phoneTd = $(`<td>${e.phoneNumber}</td>`);
    const memberRank = belt[e.certLevel];
    const beltTd = $(`<td>${memberRank}</td>`);

    $('tbody.members').append(tableRow);
    tableRow.append(idTd, roleTd, firstNameTd, lastNameTd, ageTd, emailTd, phoneTd, beltTd);
  })
}

const displayEnrolledClasses = function(data) {
  data.forEach( e => {
    $(`#calSession${e.CalendarSessionId}`).css("background", "#00DA28");
    $(`#calSession${e.CalendarSessionId} input`).remove();
  })
}


// click events
$('#enrollBtn').on('click', event => {
  event.preventDefault();
  const newSessions=[];
  $('td input:checked').each( function() {
    // console.log(this);
    const checkboxVal = {
      CalendarSessionId: $(this).val(), 
      UserId: memberId
    }
    newSessions.push(checkboxVal);
  })

  if (newSessions.length === 0) {
    return;
  } else {
    console.log(newSessions);
    $.post("/api/enroll", {data: newSessions})
    .then( (data) => {
      console.log(data);
      if(data.message = "exceeded limit") {
        $('#exceededLimitModal').modal('toggle');
      } else {
        location.reload();
      }
    });
  }
})

// display all-members tab
$('.show-members').on('click', function() {
  $('.class-schedule').addClass('d-none');
  $('.class-schedule').removeClass('d-block');
  $('.all-members').removeClass('d-none');
  $('.all-members').addClass('d-block');

  $('.show-schedule').removeClass('active');
  $('.show-members').addClass('active');
})


// display class schedule tab
$('.show-schedule').on('click', function() {
  $('.all-members').removeClass('d-block');
  $('.all-members').addClass('d-none');
  $('.class-schedule').removeClass('d-none');
  $('.class-schedule').addClass('d-block');

  $('.show-schedule').addClass('active');
  $('.show-members').removeClass('active');
  
})