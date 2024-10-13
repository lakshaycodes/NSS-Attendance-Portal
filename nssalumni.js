function showDetails(alumniId) {
  // Get the alumni details element
  const detailsElement = document.getElementById(alumniId + '-details');
  
  // Show the details
  detailsElement.style.display = 'flex'; // Make it visible
  document.body.classList.add('dimmed'); // Dim the background

  // Optional: To close the details when clicking outside
  detailsElement.addEventListener('click', function(event) {
      if (event.target === detailsElement) {
          closeDetails();
      }
  });
}

function closeDetails() {
  // Hide all alumni details
  const details = document.querySelectorAll('.alumni-details');
  details.forEach(detail => {
      detail.style.display = 'none';
  });
  
  // Remove the dimmed background
  document.body.classList.remove('dimmed');
}
