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

const displayClassSchedule = function (data) {
    
    for (let i = 0; i < data.length; i++) {
        let sessionName = data[i].Session.sessionName;
        let sessionId = data[i].id;

        // get uniqueID based on day and time of class. Use this to populate the correct cell in the table
        let tdID = (data[i].time - 10) * 7 + data[i].weekDay;
        // console.log(tdID);

        $(`td[data-value=${tdID}]`).text(`${sessionName}`);


    }
}