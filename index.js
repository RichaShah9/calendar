document.addEventListener("DOMContentLoaded", function () {
  var calendarEl = document.getElementById("calendar");

  /**
   * Render Calendar
   */
  var calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: "dayGridMonth",
    initialDate: new Date(),
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
    events: [
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
    ],
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
