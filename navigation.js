document.addEventListener('DOMContentLoaded', function() {
    const dropdownButton = document.getElementById('hamburger');
    const dropdownContent = document.getElementById('menu');

    // Toggle dropdown on button click
    dropdownButton.addEventListener('click', function(event) {
        event.stopPropagation(); // Prevent event from bubbling up
        dropdownContent.classList.toggle('show'); // Toggle dropdown
    });

    // Close the dropdown if clicking outside
    window.addEventListener('click', function(event) {
        if (!event.target.matches('#hamburger')) {
            if (dropdownContent.classList.contains('show')) {
                dropdownContent.classList.remove('show'); // Close dropdown
            }
        }
    });
});

// Add Animation to nav items on hover
document.querySelectorAll('.nav-item').forEach(link => {
    link.addEventListener('mouseover', () => {
        link.style.transform = "scale(1.1)";
        link.style.transition = "transform 0.3s ease";
    });
    
    link.addEventListener('mouseout', () => {
        link.style.transform = "scale(1)";
    });
});
