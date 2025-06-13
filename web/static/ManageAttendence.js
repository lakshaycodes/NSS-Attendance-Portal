function navigateTo(path) {
  window.location.href = path;
}

function loadEvents() {
  const container = document.getElementById("eventsContainer");
  const events = JSON.parse(localStorage.getItem("events") || "[]");

  if (events.length === 0) {
    container.innerHTML = `
      <div class="empty-card">
        <div style="font-size: 48px; color: #9ca3af;">📅</div>
        <h3>No Events Created</h3>
        <p>Create your first event to start managing attendance</p>
        <button onclick="navigateTo('/CreateEvents')">Create Event</button>
      </div>
    `;
    return;
  }

  const grid = document.createElement("div");
  grid.className = "card-grid";

  events.forEach((event) => {
    const card = document.createElement("div");
    card.className = "card";
    card.onclick = () => navigateTo(`/MarkAttendence/${event.id}`);

    card.innerHTML = `
      <div class="card-title">${event.name}</div>
      <div class="card-content">
        <p><strong>Location:</strong> ${event.location}</p>
        <p><strong>Date:</strong> ${new Date(
          event.date
        ).toLocaleDateString()}</p>
        <p><strong>Working Hours:</strong> ${event.workingHours} hrs</p>
        <button class="card-button" onclick="event.stopPropagation(); navigateTo('/MarkAttendence/${
          event.id
        }')">
          Mark Attendance
        </button>
      </div>
    `;
    grid.appendChild(card);
  });

  container.appendChild(grid);
}

document.addEventListener("DOMContentLoaded", loadEvents);
