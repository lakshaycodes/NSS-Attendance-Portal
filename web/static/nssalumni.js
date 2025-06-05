function showDetails(alumniId) {
  const detailsElement = document.getElementById(alumniId + '-details');
  
  detailsElement.style.display = 'flex'; 
  document.body.classList.add('dimmed'); 

  detailsElement.addEventListener('click', function(event) {
      if (event.target === detailsElement) {
          closeDetails();
      }
  });
}

function closeDetails() {
  const details = document.querySelectorAll('.alumni-details');
  details.forEach(detail => {
      detail.style.display = 'none';
  });
  
  document.body.classList.remove('dimmed');
}
