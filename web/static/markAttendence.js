const mockStudents = [
  { id: 1, name: "John Doe", studentId: "CS001", branch: "Computer Science" },
  { id: 2, name: "Jane Smith", studentId: "CS002", branch: "Computer Science" },
  {
    id: 3,
    name: "Mohammad Masham",
    studentId: "2024UCM2376",
    branch: "MAC",
  },
  {
    id: 4,
    name: "Lakshay Aggarwal",
    studentId: "2024UCM2377",
    branch: "EVDT",
  },
  {
    id: 5,
    name: "David Brown",
    studentId: "EE001",
    branch: "Electrical Engineering",
  },
  {
    id: 6,
    name: "Lisa Davis",
    studentId: "EE002",
    branch: "Electrical Engineering",
  },
  {
    id: 7,
    name: "Tom Anderson",
    studentId: "CE001",
    branch: "Civil Engineering",
  },
  {
    id: 8,
    name: "Emma Taylor",
    studentId: "CE002",
    branch: "Civil Engineering",
  },
];

const branches = [
  "Computer Science",
  "Mechanical Engineering",
  "Electrical Engineering",
  "Civil Engineering",
];

const eventId =
  new URLSearchParams(window.location.search).get("eventId") || "1";
let attendance = {};
let selectedBranch = "";

document.addEventListener("DOMContentLoaded", () => {
  const eventData = JSON.parse(localStorage.getItem("events") || "[]").find(
    (e) => e.id === parseInt(eventId)
  );

  if (eventData) {
    document.getElementById("eventDetails").textContent = `Event: ${
      eventData.name
    } - ${new Date(eventData.date).toLocaleDateString()}`;
  }

  mockStudents.forEach((s) => (attendance[s.id] = false));
  renderBranchButtons();
  renderStudentList();

  document.getElementById("submitBtn").addEventListener("click", () => {
    const records = Object.entries(attendance)
      .filter(([_, present]) => present)
      .map(([sid]) => ({
        studentId: parseInt(sid),
        eventId: parseInt(eventId),
        date: new Date().toISOString(),
      }));

    const existing = JSON.parse(
      localStorage.getItem("attendanceRecords") || "[]"
    );
    localStorage.setItem(
      "attendanceRecords",
      JSON.stringify([...existing, ...records])
    );

    alert(`Marked ${records.length} students as present.`);
    window.location.href = "/manage-attendance";
  });

  document.getElementById("backBtn").addEventListener("click", () => {
    window.location.href = "/manage-attendance";
  });
});

function renderBranchButtons() {
  const container = document.getElementById("branchButtons");
  container.innerHTML = "";

  const allBtn = createBranchBtn("All Branches", "");
  container.appendChild(allBtn);

  branches.forEach((branch) => {
    container.appendChild(createBranchBtn(branch, branch));
  });
}

function createBranchBtn(label, value) {
  const btn = document.createElement("button");
  btn.textContent = label;
  btn.className = `px-4 py-1 border rounded-lg ${
    value === selectedBranch
      ? "bg-blue-600 text-white"
      : "bg-white text-gray-800 border-gray-300 hover:bg-blue-50"
  }`;
  btn.onclick = () => {
    selectedBranch = value;
    renderBranchButtons();
    renderStudentList();
  };
  return btn;
}

function renderStudentList() {
  const list = document.getElementById("studentList");
  list.innerHTML = "";

  const students = selectedBranch
    ? mockStudents.filter((s) => s.branch === selectedBranch)
    : mockStudents;
  document.getElementById("studentListTitle").textContent = `Students${
    selectedBranch ? " - " + selectedBranch : ""
  }`;

  students.forEach((s) => {
    const div = document.createElement("div");
    div.className =
      "flex justify-between items-center p-4 bg-white rounded-lg border";

    const left = document.createElement("div");
    left.innerHTML = `<p class="font-medium text-gray-900">${s.name}</p>
                      <p class="text-sm text-gray-600">ID: ${s.studentId} | ${s.branch}</p>`;

    const label = document.createElement("label");
    label.className = "flex items-center gap-2 text-sm font-medium";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = attendance[s.id];
    checkbox.addEventListener("change", () => {
      attendance[s.id] = checkbox.checked;
    });

    label.appendChild(checkbox);
    label.appendChild(document.createTextNode("Present"));

    div.appendChild(left);
    div.appendChild(label);
    list.appendChild(div);
  });
}
