const TABLE = document.querySelector("table");
const CALENDAR_CELLS = TABLE.querySelectorAll("tr:not(:first-of-type) td");
const PREVIOUS_MONTH_BUTTON = document.getElementById("previous-month");
const NEXT_MONTH_BUTTON = document.getElementById("next-month");
const CURRENT_MONTH_ELEMENT = document.getElementById("current-month");
const CURRENT_DATE = new Date();

let currentMonth = CURRENT_DATE.getMonth();
let currentYear = CURRENT_DATE.getFullYear();

/**
 * Updates the calendar cells with the dates for the specified year and month.
 *
 * @param {number} year - The year value.
 * @param {number} month - The month value (0-11).
 */
function updateCalendarCells(year, month) {
  const NEW_DATE = new Date(year, month);
  const MONTH_NAME = NEW_DATE.toLocaleString("en", { month: "long" });
  const LAST_DAY = new Date(year, month + 1, 0);
  const LAST_DAY_OF_PREVIOUS_MONTH = new Date(year, month, 0).getDate();
  const EMPTY_SQUARES_AT_START = NEW_DATE.getDay();

  let date = 1;
  let nextMonthDate = 1;

  clearCalendarClasses();

  for (let i = 0; i < CALENDAR_CELLS.length; i++) {
    const CELL = CALENDAR_CELLS[i];
    const IS_PREV_MONTH = i < EMPTY_SQUARES_AT_START;

    let cellDate;

    if (IS_PREV_MONTH) {
      cellDate = LAST_DAY_OF_PREVIOUS_MONTH - (EMPTY_SQUARES_AT_START - i) + 1;
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

    if (isActualDay(currentYear, currentMonth, CURRENT_DATE, cellDate)) {
      CELL.classList.add("actual-day");
    }
  }

  CURRENT_MONTH_ELEMENT.textContent = `${MONTH_NAME} of ${year}`;
}

/**
 * Clears the classes of calendar cells that represent the previous month, next month, and the current day.
 */
function clearCalendarClasses() {
  const CELLS_WITH_CLASSES = TABLE.querySelectorAll(
    ".prev-month, .next-month, .actual-day"
  );
  CELLS_WITH_CLASSES.forEach((cell) => {
    cell.classList.remove("prev-month", "next-month", "actual-day");
  });
}

/**
 * Checks if a specific date matches the provided year, month, and day.
 *
 * @param {number} year - The year value.
 * @param {number} month - The month value (0-11).
 * @param {Date} date - The Date object representing the date.
 * @param {number} cellDate - The day of the month.
 * @returns {boolean} Returns true if the date matches the provided year, month, and day, otherwise returns false.
 */
function isActualDay(year, month, date, cellDate) {
  return (
    year === date.getFullYear() &&
    month === date.getMonth() &&
    cellDate === date.getDate()
  );
}

/**
 * Changes the displayed month to the previous month and updates the calendar.
 */
function previousMonth() {
  if (currentMonth === 0) {
    currentYear--;
    currentMonth = 11;
  } else {
    currentMonth--;
  }

  updateCalendarCells(currentYear, currentMonth);
}

/**
 * Changes the displayed month to the next month and updates the calendar.
 */
function nextMonth() {
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
