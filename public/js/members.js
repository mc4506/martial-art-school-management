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
let memberStatus = null; // student, teacher, 
let rank = null; // belt rank, white, blue, etc...
let isAdult = 1;
let level = null; // beginner, intermediate, advanced

$(document).ready(() => {

  // display Member info
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
      // If member is a student
      if (memberStatus === 0) {
        // unhide enrolled and eligible class Div
        $('.is-member').removeClass('d-none');

        level = getEligibleClassLevel(rank);
        displayMemberClassInfo();
        // If member is a teacher
      } else if (memberStatus === 1) {
        $('.is-teacher').removeClass('d-none');

        $.get("/api/all_members")
          .then(data => {
            // console.log(data);
            displayMembers(data);
          }).then(() => {
            updateStudentClickEvents();
            applyHoverEvents();
            applyTdClickEvents();
          });
      };
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

// list all eligible classes a student can take based on his/her rank
const listEligibleClasses = function (results) {

  results.forEach(e => {
    const inputEl = $('<input class="form-check-input class-info" type="checkbox">');
    // use checkbox value of SessionId to select class
    inputEl.attr("value", `${e.id}`);
    $(`#calSession${e.id}`).prepend(inputEl);
    $(`#calSession${e.id}>.class-info`).wrapAll('<div class="form-check"></div>')
    $(`#calSession${e.id}`).css("background", "#FFBA25");
  })
}

// indicate which classes has reached its in person limit
const listReachedLimitClasses = function (results) {
  results.forEach(e => {
    if (e.hasOwnProperty("reachedLimit")) {
      const newDiv = $('<div style="background: red">Class is Full</div>')
      $(`#calSession${e.id} input`).remove();
      $(`#calSession${e.id}`).prepend(newDiv);
      $(`#calSession${e.id}`).css("background", "#333333");
    }
  })
}

// list all school members
const displayMembers = function (data) {
  data.forEach(e => {
    const tableRow = $('<tr>');
    const idTd = $(`<td>${e.id}</td>`);
    idTd.attr("id", `student${e.id}`);
    const memberRole = role[e.memberStatus];
    const roleTd = $(`<td>${memberRole}</td>`);
    roleTd.attr("id", `student${e.id}-role`);
    const firstNameTd = $(`<td>${e.firstName}</td>`);
    firstNameTd.attr("id", `student${e.id}-firstName`);
    const lastNameTd = $(`<td>${e.lastName}</td>`);
    lastNameTd.attr("id", `student${e.id}-lastName`);
    const ageTd = $(`<td>${e.age}</td>`);
    ageTd.attr("id", `student${e.id}-age`);
    const emailTd = $(`<td>${e.email}</td>`);
    emailTd.attr("id", `student${e.id}-email`);
    const phoneTd = $(`<td>${e.phoneNumber}</td>`);
    phoneTd.attr("id", `student${e.id}-phone`);
    const memberRank = belt[e.certLevel];
    const beltTd = $(`<td>${memberRank}</td>`);
    beltTd.attr("id", `student${e.id}-belt`);
    const updateBtnTd = $(`<td id="update${e.id}"><button type="button" class="btn btn-warning updateBtn">Update</button></td>`);
    const deleteBtnTd = $(`<td id="delete${e.id}"><button type="button" class="btn btn-danger deleteBtn">Delete</button></td>`);

    const updateBtnDisabledTd = $(`<td id="update${e.id}"><button type="button" class="btn btn-warning updateBtn disabled">Update</button></td>`);
    const deleteBtnDisabledTd = $(`<td id="delete${e.id}"><button type="button" class="btn btn-danger deleteBtn disabled">Delete</button></td>`);

    $('tbody.members').append(tableRow);
    if (memberRole === "student") {
      tableRow.append(idTd, roleTd, firstNameTd, lastNameTd, ageTd, emailTd, phoneTd, beltTd, updateBtnTd, deleteBtnTd);
    } else if (memberRole === "teacher") { // only allow teachers to change student records
      tableRow.append(idTd, roleTd, firstNameTd, lastNameTd, ageTd, emailTd, phoneTd, beltTd, updateBtnDisabledTd, deleteBtnDisabledTd);
    }
  })
}

// list students of a particular class
const displayStudents = function (data) {
  $('ul.student-list').html("")
  data.forEach(e => {
    const listItemEl = $('<li class="list-group-item">');
    const formCheckEl = $('<div class="form-check"></div>');
    const inputEl = $('<input class="form-check-input is-present" type="checkbox">');
    const labelEl = $('<label class="form-check-label">');
    // assign userId to checkbox value
    inputEl.attr("value", `${e.UserId}`);
    inputEl.attr("id", `student${e.UserId}`);
    const memberRank = belt[e.User.certLevel];
    labelEl.text(`${e.User.firstName} ${e.User.lastName} - ${memberRank} belt`);
    labelEl.attr("for", `student${e.UserId}`);
    listItemEl.append(formCheckEl);
    formCheckEl.append(inputEl, labelEl);
    $('ul.student-list').append(listItemEl);
  })
}

// display classes the student has enrolled in
const displayEnrolledClasses = function (data) {
  data.forEach(e => {
    $(`#calSession${e.CalendarSessionId}`).css("background", "#00DA28");
    $(`#calSession${e.CalendarSessionId} input`).remove();
  })
}

const addSession = function (teacherId, dataDateValue, dataTimeValue) {
  $('#addSessionModal').modal('toggle');

  // clear all form fields
  $('form input').val("");
  $('form select').val("");

  // if repeat class checkbox is checked show start/end date calendar to select dates
  $('#repeat-class').change(function (event) {
    event.stopImmediatePropagation(); // prevent propagation of events outside of modal
    $('#repeat-dates').toggle();
    if (this.checked) {
      $('#start-date').attr("required", true);
      $('#end-date').attr("required", true);
      $('#start-date').val(dataDateValue);
    } else {
      $('#start-date').attr("required", false);
      $('#end-date').attr("required", false);
      $('#start-date').val("");
    };
  });

  // function getWeeklySchedule(){
  //   let sum=0;
  //   let arr=$('#dayOfWeeks').val()
  //   for (let i=1; i<8; i++){}
  //     console.log($('#dayOfWeeks').val())
      
    
  //   console.log(sum.toString(2))
  //   return sum
  // }
  // add a session and calendar sessions
  $('form.add-session').on('submit', function (event) {
    event.preventDefault();

    // retrieve session info
    const sessionName = $('#class-name-input').val();
    const adultclass = ($('#adult-class').val() === "Adult") ? true : false;
    const level = parseInt($('#experience-level').val().slice(0, 1));
    const inPersonLimit = parseInt($('#in-person-limit').val());

    // retrieve calendar and calendarSession info
    const repeatClass = $('#repeat-class').is(':checked');

    let startDate = null;
    let endDate = null;
    let dayOfWeek="";
    if(repeatClass) {
      startDate = $('#start-date').val();
      endDate = $('#end-date').val();
    } else {
      startDate = dataDateValue;
      endDate = dataDateValue;
    }
    dayOfWeek = (moment(dataDateValue).day()+" ").trim();
    let weekdaysArr=$('#dayOfWeeks').val();
    console.log(weekdaysArr);
    if (weekdaysArr.indexOf(dayOfWeek)<0){
      weekdaysArr.push(dayOfWeek)
    }
    console.log(weekdaysArr)
    const newSession = {
      sessionName: sessionName,
      adultclass: adultclass,
      level: level,
      inPersonLimit: inPersonLimit,
      teacherId: teacherId,
      startTime: dataTimeValue,
      dayOfWeek: weekdaysArr,
      startDate: startDate,
      endDate: endDate
    }

    console.log(newSession);
    $.post("/api/new_session", newSession)
      .then(function (data) {
        console.log(data);
        location.reload();
      });
  });
}

const displayMemberClassInfo = function() {
  // get eligible class based on level and isAdult
  $.get(`/api/class_schedule/${level}/${isAdult}`)
  .then(data => {
    // console.log(data);
    listEligibleClasses(data);
    listReachedLimitClasses(data);
  }).then(() => {
    $.get(`/api/classes/${memberId}`)
      .then((data) => {
        if (data.length === 0) {
          return;
        } else {
          displayEnrolledClasses(data);
        }
      })
  });
}

const applyHoverEvents = function () {
  $('td').css("cursor", "pointer");
  $('td > .class-info').hover(function () {
    $(this).parent().addClass("class-info-hover");
  }, function () {
    $(this).parent().removeClass("class-info-hover");
  });

  $('td:not([id])').hover(function () {
    $(this).text("+")
    $(this).addClass("add-session-hover");
  }, function () {
    $(this).text("")
    $(this).removeClass("add-session-hover");
  });
}

const updateStudentClickEvents = function() {
  let id = null;

  $('.updateBtn').on('click', function(event) {
    event.preventDefault();
    $('#updateStudentModal').modal("toggle");
    id = $(this).parent().attr("id").slice(6);
    const firstName = $(`#student${id}-firstName`).text();
    const lastName = $(`#student${id}-lastName`).text();
    $('.student-name').text(`${firstName} ${lastName}`);
  });
  
  $('.deleteBtn').on('click', function(event) {
    event.preventDefault();
    $('#confirmDeleteModal').modal("toggle");
    id = $(this).parent().attr("id").slice(6);
    const firstName = $(`#student${id}-firstName`).text();
    const lastName = $(`#student${id}-lastName`).text();
    $('.student-name').text(`${firstName} ${lastName}`);
  });

  $('#updateStudentBtn').on('click', function() {
    const newCertLevel = getKeyByValue(belt, $('#rankSelect').val());
    const newRole = getKeyByValue(role, $('#roleSelect').val().toLowerCase());

    const studentRecord = {
      certLevel: newCertLevel,
      role: newRole,
    };

    // console.log(id, studentRecord);

    $.ajax({
      method: "PUT",
      url: `/api/members/${id}`,
      data: studentRecord,
    }).then( response => {
      location.reload();
    })
  });

  $('#confirmDeleteBtn').on('click', function() {
    // console.log(id);
    $.ajax({
      method: "DELETE",
      url: `/api/members/${id}`
    }).then( response => {
      location.reload();
    })
  })
}

const applyTdClickEvents = function() {
  // Click on table cell to display who is enrolled in that class and check off student's attendance for that class
  $('td > .class-info').on('click', function (event) {
    const id = $(this).parent().attr("id").slice(10);
    // console.log(id);
    $.get(`/api/enrollto_class/${id}`).then(results => {
      console.log(results);
      $('#studentsModal').modal('toggle');
      $('ul.student-list').attr("data-calSession", id);
      displayStudents(results);
    });
  });

  // selector to select td elements that do not have an "id"
  $('td:not([id])').on('click', function (event) {
    // pass teacherId, date, and time of clicked cell to addSession function
    const teacherId = memberId;
    const dataDateValue = $(this).attr("data-datevalue");
    const dataTimeValue = $(this).attr("data-timevalue");
    addSession(teacherId, dataDateValue, dataTimeValue);
  });
}

// helper function to find key given a value
const getKeyByValue = function(obj, val) {
  for (const  prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      if (obj[prop] === val) return prop;
    }
  }
}

// click events
$('#enrollBtn').on('click', event => {
  event.preventDefault();
  const newSessions = [];
  $('td input:checked').each(function () {
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
    $.post("/api/enroll", {
        data: newSessions
      })
      .then((data) => {
        console.log(data);
        location.reload();
      })
      .catch(err => {
        console.log(err);
      });
  }
})

// display all-members tab
$('.show-members').on('click', function () {
  $('.class-schedule').addClass('d-none');
  $('.class-schedule').removeClass('d-block');
  $('.all-members').removeClass('d-none');
  $('.all-members').addClass('d-block');

  $('.show-schedule').removeClass('active');
  $('.show-members').addClass('active');
})


// display class schedule tab
$('.show-schedule').on('click', function () {
  $('.all-members').removeClass('d-block');
  $('.all-members').addClass('d-none');
  $('.class-schedule').removeClass('d-none');
  $('.class-schedule').addClass('d-block');

  $('.show-schedule').addClass('active');
  $('.show-members').removeClass('active');
})

$('.prev-week').on('click', function () {
  let weekNumber = parseInt($('#weekNum').attr("data-week-num"));
  // console.log(weekNumber)
  weekNumber--;
  generateTable(weekNumber);

  $.get(`/api/class_schedule/${weekNumber}`)
    .then(function (data) {
      // console.log(data);
      displayClassSchedule(data);
    }).then( () => {
      if(memberStatus === 0) {
        displayMemberClassInfo();
      } else if (memberStatus === 1) {
        applyHoverEvents();
        applyTdClickEvents();
      }
    });
});

$('.next-week').on('click', function () {
  let weekNumber = parseInt($('#weekNum').attr("data-week-num"));
  // console.log(weekNumber)
  weekNumber++;
  // run function from classSchedule.js
  generateTable(weekNumber);

  $.get(`/api/class_schedule/${weekNumber}`)
    .then(function (data) {
      // console.log(data);
      displayClassSchedule(data);
    }).then( () => {
      if(memberStatus === 0) {
        displayMemberClassInfo();
      } else if (memberStatus === 1) {
        applyHoverEvents();
        applyTdClickEvents();
      }
    });
});

$('.this-week').on('click', function () {
  let weekNumber = moment().week();
  if (parseInt($('#weekNum').attr("data-week-num")) === weekNumber) return;
  // run function from classSchedule.js
  generateTable(weekNumber);

  $.get(`/api/class_schedule/${weekNumber}`)
    .then(function (data) {
      // console.log(data);
      displayClassSchedule(data);
    }).then( () => {
      if(memberStatus === 0) {
        displayMemberClassInfo();
      } else if (memberStatus === 1) {
        applyHoverEvents();
        applyTdClickEvents();
      }
    });
});


// TODO Post attendance click event and api route to update UserSession attendance