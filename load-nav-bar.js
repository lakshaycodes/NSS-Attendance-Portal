// Function to load the navigation HTML
function loadNavigation() {
    const navDiv = document.getElementById('navigation');
    fetch('navigation.html')
        .then(response => response.text())
        .then(data => {
            navDiv.innerHTML = data; // Insert the fetched HTML into the navigation div

            // Call function to highlight active link after the navigation loads
            highlightActiveLink();
        })
        .catch(error => console.error('Error loading navigation:', error));
}

// Function to highlight the active navigation link based on the current URL
function highlightActiveLink() {
    const currentPage = window.location.pathname.split("/").pop(); // Get the current page name
    const navLinks = document.querySelectorAll('.nav-link'); // Get all nav links

    // Clear active class from all links
    navLinks.forEach(link => {
        link.classList.remove('active');
    });

    // Loop through each link and compare the href with the current page
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');

        // If the link's href matches the current page, add 'active' class
        if (linkHref === currentPage || linkHref.includes(currentPage)) {
            link.classList.add('active');
        }
    });
}

// Call the function to load the navigation
loadNavigation();
