function deptHandleSubmit(event) {
  event.preventDefault();

  const roll = document.getElementById('roll').value;
  const department = document.getElementById('department').value;
  const date = document.getElementById('date').value;
  const work = document.getElementById('work').value;
  const hours = document.getElementById('hours').value;

  console.log("Submitted Department Work:", {
    roll,
    department,
    date,
    work,
    hours
  });

  alert("Department work marked successfully!");

  // Reset the form
  event.target.reset();
  return false;
}
