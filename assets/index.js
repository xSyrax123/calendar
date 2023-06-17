const TABLE = document.querySelector("table");
const CALENDAR_ROWS = TABLE.querySelectorAll("tr:not(:first-of-type)");
const PREVIOUS_MONTH_BUTTON = document.getElementById("previous-month");
const NEXT_MONTH_BUTTON = document.getElementById("next-month");
const CURRENT_MONTH_ELEMENT = document.getElementById("current-month");
const NUM_ROWS_CALENDAR = 6;
const NUM_COLUMNS_CALENDAR = 7;
const CURRENT_DATE = new Date();

let currentMonth = CURRENT_DATE.getMonth();
let currentYear = CURRENT_DATE.getFullYear();

function clearCalendarClasses() {
  /**
   * Clears the classes of calendar cells that represent the previous month, next month, and the current day.
   */
  const CELLS_WITH_CLASSES = TABLE.querySelectorAll(
    ".prev-month, .next-month, .actual-day"
  );
  CELLS_WITH_CLASSES.forEach((cell) => {
    cell.classList.remove("prev-month", "next-month", "actual-day");
  });
}

function updateCalendarCells(year, month) {
  /**
   * Updates the calendar cells with the dates for the specified year and month.
   *
   * @param {number} year - The year value.
   * @param {number} month - The month value (0-11).
   */
  const NEW_DATE = new Date(year, month);
  const MONTH_NAME = NEW_DATE.toLocaleString("en", { month: "long" });
  const LAST_DAY = new Date(year, month + 1, 0);
  const LAST_DAY_OF_PREVIOUS_MONTH = new Date(year, month, 0).getDate();
  const EMPTY_SQUARES_AT_START = NEW_DATE.getDay();

  let date = 1;
  let nextMonthDate = 1;

  clearCalendarClasses();

  for (let i = 0; i < NUM_ROWS_CALENDAR; i++) {
    const ROW = CALENDAR_ROWS[i];
    const CALENDAR_COLUMNS = ROW.children;

    for (let j = 0; j < NUM_COLUMNS_CALENDAR; j++) {
      const CELL = CALENDAR_COLUMNS[j];
      let cellDate;

      if (i === 0 && j < EMPTY_SQUARES_AT_START) {
        cellDate = LAST_DAY_OF_PREVIOUS_MONTH - (EMPTY_SQUARES_AT_START-j) + 1;
        CELL.classList.add("prev-month");
      } else if (date <= LAST_DAY.getDate()) {
        cellDate = date;
        date++;
      } else {
        cellDate = nextMonthDate;
        nextMonthDate++;
        CELL.classList.add("next-month");
      }

      CELL.textContent = cellDate;

      if (
        currentYear === CURRENT_DATE.getFullYear() &&
        currentMonth === CURRENT_DATE.getMonth() &&
        cellDate === CURRENT_DATE.getDate()
      ) {
        CELL.classList.add("actual-day");
      }
    }
  }

  CURRENT_MONTH_ELEMENT.textContent = `${MONTH_NAME} of ${year}`;
}

function previousMonth() {
  /**
   * Changes the displayed month to the previous month and updates the calendar.
   */
  if (currentMonth === 0) {
    currentYear--;
    currentMonth = 11;
  } else {
    currentMonth--;
  }

  updateCalendarCells(currentYear, currentMonth);
}

function nextMonth() {
  /**
   * Changes the displayed month to the next month and updates the calendar.
   */
  if (currentMonth === 11) {
    currentYear++;
    currentMonth = 0;
  } else {
    currentMonth++;
  }

  updateCalendarCells(currentYear, currentMonth);
}

document.addEventListener("click", (event) => {
  const TARGET = event.target;

  if (TARGET === PREVIOUS_MONTH_BUTTON) {
    previousMonth();
  } else if (TARGET === NEXT_MONTH_BUTTON) {
    nextMonth();
  }
});

updateCalendarCells(currentYear, currentMonth);
