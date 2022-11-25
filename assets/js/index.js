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
    if (subject.trim() == "") {
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

const openModel = (info) => {
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
            // YYYY-MM-DD hh:mm A
            $('.datepicker').val(moment(info.start).format("YYYY-MM-DD"));
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
    $('.date').datepicker({
        'format': 'yyyy-m-d',
        'autoclose': true
    });
}

function InitTimePicker() {
    //$(".timepicker").daterangepicker({
    //    "singleDatePicker": true,
    //    timePicker: true,
    //    timePicker24Hour: false,
    //    timePickerIncrement: 15,
    //    timePickerSeconds: false,
    //    locale: {
    //        format: 'HH:mm A'
    //    }
    //}).on('show.daterangepicker', function (ev, picker) {
    //    picker.container.find(".calendar-table").hide();
    //});

    //$('.timepicker').on('apply.daterangepicker', function (ev, picker) {
    //    $(this).val(picker.startDate.format('HH:mm A'));
    //});

    $('.time').timepicker({ 'scrollDefault': 'now' });
}

//YYYY-MM-DD hh:mm A

$(document).ready(function () {
    InItDatePicker();
    InitTimePicker();
    $('#datepairExample').datepair();

    var hospitalOptions = [];
    for (var i = 1; i <= 10; i++) {
        hospitalOptions.push({ id: i, text: "Guest "+i });
    }
    $("#guest").select2({
        placeholder:'Add guests',
        multiple: false,
        width: '100%',
        data: hospitalOptions
    });
    $("#guest").val(null).trigger('change');
    var lstGuest = [];
    $('#guest').on('select2:selecting', function (e) {
        var list = document.getElementById('guests');
        const guest = e.params.args.data

        if (!lstGuest.includes(guest?.id)) {
            //add list element
            var entry = document.createElement('li');
            entry.appendChild(document.createTextNode(guest?.text));
            list.appendChild(entry);

            lstGuest.push(guest?.id);
        }

        setTimeout(function () {
            $("#guest").val(null).trigger('change');
        }, 50);
    });

    $("#chkAllDay").click(function () {
        if ($(this).is(':checked')) {
            $(".divToDatePicker").addClass("d-none");
            $(".divTimePicker").removeClass("d-none");
        } else {
            $(".divTimePicker").addClass("d-none");
            $(".divToDatePicker").removeClass("d-none");
        }
    });
})
