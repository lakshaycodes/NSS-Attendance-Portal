document.addEventListener('DOMContentLoaded', function() {
    const dropdownButtons = document.querySelectorAll('.dropbtn'); // Select all dropdown buttons

    // Toggle dropdown on button click
    dropdownButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.stopPropagation(); // Prevent event from bubbling up
            const dropdownContent = this.nextElementSibling; // Get the next sibling (dropdown content)
            dropdownContent.classList.toggle('show'); // Toggle dropdown visibility
        });
    });

    // Close the dropdown if clicking outside
    window.addEventListener('click', function(event) {
        dropdownButtons.forEach(button => {
            const dropdownContent = button.nextElementSibling; // Get the dropdown content
            if (dropdownContent.classList.contains('show')) {
                dropdownContent.classList.remove('show'); // Close dropdown
            }
        });
    });
});

// Add Animation to nav items on hover
document.querySelectorAll('.nav-list a').forEach(link => { // Changed selector to target nav links
    link.addEventListener('mouseover', () => {
        link.style.transform = "scale(1.1)";
        link.style.transition = "transform 0.3s ease";
    });
    
    link.addEventListener('mouseout', () => {
        link.style.transform = "scale(1)";
    });
});
