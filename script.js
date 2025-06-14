let currentDate = new Date();
let events = [];

fetch("events.json")
  .then(res => res.json())
  .then(data => {
    events = data;
    renderCalendar();
  });

function renderCalendar() {
  const monthYear = document.getElementById("monthYear");
  const calendarGrid = document.getElementById("calendarGrid");

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  monthYear.textContent = `${currentDate.toLocaleString("default", { month: "long" })} ${year}`;

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startDay = new Date(firstDay);
  startDay.setDate(firstDay.getDate() - firstDay.getDay());

  const endDay = new Date(lastDay);
  endDay.setDate(lastDay.getDate() + (6 - lastDay.getDay()));

  calendarGrid.innerHTML = "";

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  dayNames.forEach(day => {
    const el = document.createElement("div");
    el.className = "calendar-day";
    el.style.fontWeight = "bold";
    el.textContent = day;
    calendarGrid.appendChild(el);
  });

  let day = new Date(startDay);
  while (day <= endDay) {
    const cell = document.createElement("div");
    cell.className = "calendar-day";
    if (day.toDateString() === new Date().toDateString()) {
      cell.classList.add("today");
    }

    const dayNum = document.createElement("div");
    dayNum.textContent = day.getDate();
    cell.appendChild(dayNum);

    const dayStr = day.toISOString().split("T")[0];
    const dayEvents = events.filter(e => e.date === dayStr);

    dayEvents.forEach(event => {
      const ev = document.createElement("div");
      ev.className = "event";
      ev.style.backgroundColor = event.color;
      ev.textContent = event.title;
      cell.appendChild(ev);
    });

    calendarGrid.appendChild(cell);
    day.setDate(day.getDate() + 1);
  }
}

function prevMonth() {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar();
}

function nextMonth() {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar();
}
