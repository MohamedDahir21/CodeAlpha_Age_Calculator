document.getElementById('ageForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const day = parseInt(document.getElementById('day').value);
  const month = parseInt(document.getElementById('month').value);
  const year = parseInt(document.getElementById('year').value);

  const result = document.getElementById('result');

  // Validate inputs
  if (isNaN(day) || isNaN(month) || isNaN(year)) {
    result.textContent = "Please enter valid numbers for day, month, and year.";
    return;
  }

  if (month < 1 || month > 12 || day < 1 || day > 31 || year < 1900 || year > new Date().getFullYear()) {
    result.textContent = "Please enter a valid date range.";
    return;
  }

  // Validate actual date (e.g., 30 Feb is invalid)
  const dob = new Date(year, month - 1, day);
  if (
    dob.getDate() !== day ||
    dob.getMonth() !== month - 1 ||
    dob.getFullYear() !== year
  ) {
    result.textContent = "Please enter a valid calendar date.";
    return;
  }

  const today = new Date();

  if (dob > today) {
    result.textContent = "Birth date cannot be in the future.";
    return;
  }

  // Calculate age
  let ageYears = today.getFullYear() - dob.getFullYear();
  let ageMonths = today.getMonth() - dob.getMonth();
  let ageDays = today.getDate() - dob.getDate();

  if (ageDays < 0) {
    ageMonths--;
    const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    ageDays += prevMonth.getDate();
  }

  if (ageMonths < 0) {
    ageYears--;
    ageMonths += 12;
  }

  result.textContent = `You are ${ageYears} year(s), ${ageMonths} month(s), and ${ageDays} day(s) old.`;
});
