function showDetails(cardId) {
  // Dim the background
  document.body.classList.add("dimmed");

  // Show the details for the clicked card
  document.getElementById(cardId + "-details").style.display = "flex";
}

// To close the details when clicking outside
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("alumni-details")) {
    document.body.classList.remove("dimmed");
    event.target.style.display = "none";
  }
});
