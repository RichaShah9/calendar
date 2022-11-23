const events = [
    {
        title: "All Day Event",
        start: "2022-11-01",
    },
    {
        title: "Long Event",
        start: "2022-11-07",
        end: "2022-11-10",
    },
    {
        title: "Conference",
        start: "2022-11-11",
        end: "2022-11-13",
    },
    {
        title: "Birthday Party",
        start: "2022-11-13T07:00:00",
    },
];


$("#createBtn").click(function () {
    $("#schedule-add .form-control").val("");
    $("#schedule-add").modal("show");
})

const addEvent = () => {
    var subject = $("#subject").val();
    var from = $("#fromDate").val();
    var to = $("#toDate").val();
	if(subject.trim() == ""){
		alert('Title required to add event');
		return;
	}
    calendar.addEvent({
        title: subject,
        start: moment(from).format("YYYY-MM-DD"),
        end: moment(to).format("YYYY-MM-DD")
    });
    $("#schedule-add").modal("hide");
    $("#schedule-add .form-control").val("");
}

const openModel = () => {
    // info
    $("#schedule-add").modal("show");
};

var calendar;
document.addEventListener("DOMContentLoaded", function () {
    var calendarEl = document.getElementById("calendar");

    /**
     * Render Calendar
     */
    calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: "dayGridMonth",
        initialDate: new Date(),
        selectable: true,
        editable: true,
        selectHelper: true,
        headerToolbar: {
            left: "today prev,next",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
        },
        buttonText: {
            today: "Today",
            month: "Month",
            week: "Week",
            day: "Day",
        },
        events,
        eventClick: function (event) {
            var modal = $("#schedule-edit");
        },
        select: function (info) {
            debugger;
            $('.datepicker').val(moment(info.start).format("YYYY-MM-DD hh:mm A"));
            InItDatePicker(info.start);
            openModel();
        },
        dateClick: function (info) {
            InItDatePicker(moment(info.start));
            openModel();
        },
    });

    calendar.render();

    /**
     * Add date picker
     */
    const datePicker = $("#datepicker");
    datePicker.datepicker({
        dateFormat: "yy-m-d",
        onSelect: function (dateText, dp) {
            calendar.gotoDate(new Date(Date.parse(dateText)));
        },
    });

    /**
     * Update picker with calendar trigger
     */
    $("body").on("click", "button.fc-prev-button", function () {
        var date = calendar.getDate();
        datePicker.datepicker("setDate", date);
    });

    $("body").on("click", "button.fc-next-button", function () {
        var date = calendar.getDate();
        datePicker.datepicker("setDate", date);
    });
    $(".fc-today-button").click(function () {
        datePicker.datepicker("setDate", new Date());
    });
});


function InItDatePicker(startdate) {
    // added additional 1 year due to bug of disabled months 
    $('.datepicker').daterangepicker({
        "singleDatePicker": true,
        "showDropdowns": true,
        "minYear": 1901,
        "maxYear": parseInt(moment().format('YYYY'), 10) + 1,
        "timePicker": true,
        "autoApply": true,
        "startDate":new Date(startdate),
        "locale": {
            "format": "YYYY-MM-DD hh:mm A",
        },
        "autoUpdateInput": false,
    }, function (start, end, label) {

    });

    $('.datepicker').on('apply.daterangepicker', function (ev, picker) {
        $(this).val(picker.startDate.format('YYYY-MM-DD hh:mm A'));
    });
}

$(document).ready(function () {
    InItDatePicker();
})
