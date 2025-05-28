function eventHandleSubmit(event) {
  event.preventDefault();

  const date = document.getElementById('date').value;
  const eventName = document.getElementById('eventName').value.trim();
  const location = document.getElementById('location').value.trim();
  const hours = parseFloat(document.getElementById('hours').value);

  console.log("New Event Created:", {
    date,
    eventName,
    location,
    hours,
  });

  alert("Event created successfully!");

  event.target.reset();

  return false;
}