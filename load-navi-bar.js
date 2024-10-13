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


// Call the function to load the navigation
loadNavigation();
