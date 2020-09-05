$(document).ready(function () {

    $("#currentMonth").text(moment().format("MMMM YYYY"));
    for(let i=0; i<7; i++){
        let dayOfWeek = moment().startOf("week").add(1+i, "days").format("dddd M/D");
        $(`#day${i}`).text(dayOfWeek);
    }

    generateTable();
    displayClassSchedule();


});


const data = [
    // Monday 
    {
        day: 0,
        sessions: [{
                sessionId: 1,
                sessionName: "Beginner KickBoxing - Adults",
                teacher: "Master Teacher",
                inPersonLimit: 10,
                currentNumberOfStudents: 5,
                time: 18,
                level: 1, // level 1: beginner, level 2: intermediate: level 3: advanced
                adultClass: true
            },
            {
                sessionId: 2,
                sessionName: "Advanced KickBoxing - Adults",
                teacher: "Master Teacher",
                inPersonLimit: 10,
                currentNumberOfStudents: 10,
                time: 19,
                level: 3,
                adultClass: true
            },
            {
                sessionId: 3,
                sessionName: "Kids Beginner KickBoxing ",
                teacher: "Master Teacher",
                inPersonLimit: 10,
                currentNumberOfStudents: 6,
                level: 1,
                time: 16,
                adultClass: false
            },
            {
                sessionId: 4,
                sessionName: "Kids Beginner Jiu-Jitsu",
                teacher: "Master Teacher",
                inPersonLimit: 10,
                currentNumberOfStudents: 8,
                level: 1,
                time: 17,
                adultClass: false
            },
        ]
    },
    // Tuesday
    {
        day: 1,
        sessions: [{
                sessionId: 5,
                sessionName: "Intermediate KickBoxing - Adults",
                teacher: "Master Teacher",
                inPersonLimit: 10,
                currentNumberOfStudents: 5,
                time: 18,
                level: 2,
                adultClass: true
            },
            {
                sessionId: 6,
                sessionName: "Advanced Jiu-Jitsu - Adults",
                teacher: "Master Teacher",
                inPersonLimit: 10,
                currentNumberOfStudents: 10,
                time: 19,
                level: 3,
                adultClass: true
            },
            {
                sessionId: 7,
                sessionName: "Intermediate Jiu-Jitsu - Adults",
                teacher: "Master Teacher",
                inPersonLimit: 10,
                currentNumberOfStudents: 6,
                level: 2,
                time: 16,
                adultClass: false
            },
        ]
    },
    // Wednesday 
    {
        day: 2,
        sessions: [{
                sessionId: 8,
                sessionName: "Beginner KickBoxing - Adults",
                teacher: "Master Teacher",
                inPersonLimit: 10,
                currentNumberOfStudents: 5,
                time: 18,
                level: 1, // level 1: beginner, level 2: intermediate: level 3: advanced
                adultClass: true
            },
            {
                sessionId: 9,
                sessionName: "Advanced KickBoxing - Adults",
                teacher: "Master Teacher",
                inPersonLimit: 10,
                currentNumberOfStudents: 10,
                time: 19,
                level: 3,
                adultClass: true
            },
            {
                sessionId: 10,
                sessionName: "Kids Beginner KickBoxing ",
                teacher: "Master Teacher",
                inPersonLimit: 10,
                currentNumberOfStudents: 6,
                level: 1,
                time: 16,
                adultClass: false
            },
            {
                sessionId: 11,
                sessionName: "Kids Beginner Jiu-Jitsu",
                teacher: "Master Teacher",
                inPersonLimit: 10,
                currentNumberOfStudents: 8,
                level: 1,
                time: 17,
                adultClass: false
            },
        ]
    },
    //Thursday
    {
        day: 3,
        sessions: [{
                sessionId: 12,
                sessionName: "Intermediate KickBoxing - Adults",
                teacher: "Master Teacher",
                inPersonLimit: 10,
                currentNumberOfStudents: 5,
                time: 18,
                level: 2,
                adultClass: true
            },
            {
                sessionId: 13,
                sessionName: "Advanced Jiu-Jitsu - Adults",
                teacher: "Master Teacher",
                inPersonLimit: 10,
                currentNumberOfStudents: 10,
                time: 19,
                level: 3,
                adultClass: true
            },
            {
                sessionId: 14,
                sessionName: "Intermediate Jiu-Jitsu - Adults",
                teacher: "Master Teacher",
                inPersonLimit: 10,
                currentNumberOfStudents: 6,
                level: 2,
                time: 16,
                adultClass: false
            },
        ]
    },
    // Friday
    {
        day: 4,
        sessions: [{
                sessionId: 15,
                sessionName: "Beginner KickBoxing - Adults",
                teacher: "Master Teacher",
                inPersonLimit: 10,
                currentNumberOfStudents: 5,
                time: 18,
                level: 1, // level 1: beginner, level 2: intermediate: level 3: advanced
                adultClass: true
            },
            {
                sessionId: 16,
                sessionName: "Advanced KickBoxing - Adults",
                teacher: "Master Teacher",
                inPersonLimit: 10,
                currentNumberOfStudents: 10,
                time: 19,
                level: 3,
                adultClass: true
            },
            {
                sessionId: 17,
                sessionName: "Kids Beginner KickBoxing ",
                teacher: "Master Teacher",
                inPersonLimit: 10,
                currentNumberOfStudents: 6,
                level: 1,
                time: 16,
                adultClass: false
            },
            {
                sessionId: 18,
                sessionName: "Kids Beginner Jiu-Jitsu",
                teacher: "Master Teacher",
                inPersonLimit: 10,
                currentNumberOfStudents: 8,
                level: 1,
                time: 17,
                adultClass: false
            },
        ]
    },
    //Saturday
    {
        day: 5,
        sessions: [{
            sessionId: 19,
                sessionName: "Intermediate KickBoxing - Adults",
                teacher: "Master Teacher",
                inPersonLimit: 10,
                currentNumberOfStudents: 5,
                time: 10,
                level: 2,
                adultClass: true
            },
            {
                sessionId: 20,
                sessionName: "Advanced Jiu-Jitsu - Adults",
                teacher: "Master Teacher",
                inPersonLimit: 10,
                currentNumberOfStudents: 10,
                time: 11,
                level: 3,
                adultClass: true
            },
            {
                sessionId: 21,
                sessionName: "Intermediate Jiu-Jitsu - Adults",
                teacher: "Master Teacher",
                inPersonLimit: 10,
                currentNumberOfStudents: 6,
                level: 2,
                time: 12, // (12-10)*7 +5
                adultClass: false
            },
        ]
    },
    //Sunday
    {
        day: 6,
        sessions: [{
                sessionId: 22,
                sessionName: "Intermediate KickBoxing - Adults",
                teacher: "Master Teacher",
                inPersonLimit: 10,
                currentNumberOfStudents: 5,
                time: 10,
                level: 2,
                adultClass: true
            },
            {
                sessionId: 23,
                sessionName: "Advanced Jiu-Jitsu - Adults",
                teacher: "Master Teacher",
                inPersonLimit: 10,
                currentNumberOfStudents: 10,
                time: 11, //(11-10) *7 +6
                level: 3, 
                adultClass: true
            },
            {
                sessionId: 24,
                sessionName: "Intermediate Jiu-Jitsu - Adults",
                teacher: "Master Teacher",
                inPersonLimit: 10,
                currentNumberOfStudents: 6,
                level: 2,
                time: 12, //(12-10) * 7 +6
                adultClass: false
            },
        ]
    },
]



const generateTable = function () {
    const tableBody = $("tbody.schedule");

    // set a unique data-value for each table cell
    let dataValue = 0;

    // first class at 10am
    let classTime = 10;
    // last class at 6pm
    const numberOfRows = 10;

    for (let i = 0; i < numberOfRows; i++) {
        const tableRow = $("<tr>");
        const tableHead = $("<th scope='row'>")

        tableBody.append(tableRow);
        const hour = moment(`${classTime}`, "hh:mm").format("LT");
        // set a data attribute for each row
        tableHead.attr("data-hour", classTime);
        tableHead.text(hour);
        // append th to tr
        tableRow.append(tableHead);

        for (let j = 0; j < 7; j++) { 
            const tableData = $("<td>")
            // assign unique data value to each td cell
            tableData.attr("data-value", dataValue);

            // tableData.text(`day: ${j}, classTime: ${classTime}, value: ${dataValue}`);
            tableRow.append(tableData);
            dataValue++;
        }
        classTime++;
    }
}

const displayClassSchedule = function(){
    for (let i=0; i<data.length; i++) {
        for (let j=0; j<data[i].sessions.length; j++) {
            let sessionName = data[i].sessions[j].sessionName;
            let sessionId = data[i].sessions[j].sessionId;
            
            // get uniqueID based on day and time of class. Use this to populate the correct cell in the table
            let tdID = (data[i].sessions[j].time-10) * 7 + data[i].day;
            console.log(tdID);

            $(`td[data-value=${tdID}]`).text(`${sessionName}`);

        }
    }
}