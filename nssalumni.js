function showDetails(cardId) {
    // Dim the background
    document.body.classList.add("dimmed");
  
    // Show the details for the clicked card
    const detailsElement = document.getElementById(cardId + "-details");
    if (detailsElement) {
      detailsElement.style.display = "flex"; // Use flex or block depending on your layout
    }
  }
  
  // To close the details when clicking outside
  document.addEventListener("click", function (event) {
    // Ensure that we are checking against the correct class and not child elements
    const isDetails = event.target.classList.contains("alumni-details") || 
                     event.target.closest('.alumni-details');
  
    // Only remove dim and hide details if the click is outside the details
    if (!isDetails) {
      const openDetails = document.querySelector(".alumni-details[style*='display: flex']");
      if (openDetails) {
        document.body.classList.remove("dimmed");
        openDetails.style.display = "none";
      }
    }
  });
  