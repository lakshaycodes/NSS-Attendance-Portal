// Function to fetch and insert HTML content (header or footer)
function loadContent(section, url) {
  fetch(url)
    .then(response => {
      if (!response.ok) throw new Error(`Failed to load ${url}`);
      return response.text();
    })
    .then(data => {
      document.getElementById(section).innerHTML = data;

      // If the section is the header, add the active tab logic
      if (section === 'header') {
        highlightActiveTab();
      }
    })
    .catch(error => {
      console.error('Error loading content:', error);
    });
}

// Highlight the active tab based on the current URL
function highlightActiveTab() {
  const currentPage = window.location.pathname.split('/').pop();
  const navLinks = document.querySelectorAll('.navbar a');

  navLinks.forEach(link => {
    // Compare currentPage with the last segment of the link's href
    const linkPage = link.getAttribute('href').split('/').pop();
    
    if (linkPage === currentPage) {
      link.classList.add('active');
    }
  });
}

// Load the header and footer
loadContent('header', 'header.html');
loadContent('footer', 'footer.html');
