$(document).ready(function () {

    $("#currentMonth").text(moment().format("MMMM YYYY"));
    for (let i = 0; i < 7; i++) {
        let dayOfWeek = moment().startOf("week").add(1 + i, "days").format("dddd M/D");
        $(`#day${i}`).text(dayOfWeek);
    }

    generateTable();

    $.get("/api/class_schedule")
        .then(function (data) {
            console.log(data);
            displayClassSchedule(data);
        });


});

const generateTable = function () {
    const tableBody = $("tbody.schedule");

    // set a unique data-value for each table cell
    let dataCellValue = 0;

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
            tableData.attr("data-cellvalue", dataCellValue);

            // tableData.text(`day: ${j}, classTime: ${classTime}, value: ${dataValue}`);
            tableRow.append(tableData);
            dataCellValue++;
        }
        classTime++;
    }
}

const displayClassSchedule = function (data) {
    
    for (let i = 0; i < data.length; i++) {
        const sessionName = data[i].Session.sessionName;
        const limit = data[i].Session.inPersonLimit;
        const sessionId = data[i].id;

        // get unique cell value based on day and time of class. Use this to populate the correct cell in the table
        const tdID = (data[i].time - 10) * 7 + data[i].weekDay;
        // console.log(tdID);
        // assign a unique sessionId to each non-empty table cell
        const newDiv = $('<div class="classInfo">');
        newDiv.text(`${sessionName} / In-Person limit of ${limit} people`);

        $(`td[data-cellvalue=${tdID}]`).attr("id", `calSession${sessionId}`);
        $(`td[data-cellvalue=${tdID}]`).append(newDiv);

    }
}