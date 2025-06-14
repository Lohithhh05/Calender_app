let currentDate = new Date();
let events = JSON.parse(document.getElementById("eventData").textContent);

function renderCalendar() {
  const monthYear = document.getElementById("monthYear");
  const calendarGrid = document.getElementById("calendarGrid");

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0); // Last date of month

  // Update header
  monthYear.textContent = firstDay.toLocaleString("default", { month: "long", year: "numeric" });

  // Clear previous grid
  calendarGrid.innerHTML = "";

  // Add day names
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  dayNames.forEach(day => {
    const el = document.createElement("div");
    el.className = "calendar-day header";
    el.textContent = day;
    calendarGrid.appendChild(el);
  });

  // Fill empty cells before 1st
  for (let i = 0; i < firstDay.getDay(); i++) {
    const emptyCell = document.createElement("div");
    emptyCell.className = "calendar-day empty";
    calendarGrid.appendChild(emptyCell);
  }

  // Fill actual days
  for (let day = 1; day <= lastDay.getDate(); day++) {
    const cell = document.createElement("div");
    cell.className = "calendar-day";

    const date = new Date(year, month, day);
    cell.textContent = day;

    // Highlight today
    const today = new Date();
    if (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    ) {
      cell.classList.add("today");
    }

    // Add events
    const dayStr = date.toISOString().split("T")[0];
    const dayEvents = events.filter(e => e.date === dayStr);
    dayEvents.forEach(event => {
      const ev = document.createElement("div");
      ev.className = "event";
      ev.style.backgroundColor = event.color;
      ev.textContent = event.title;
      cell.appendChild(ev);
    });

    calendarGrid.appendChild(cell);
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

// Initial render
renderCalendar();
