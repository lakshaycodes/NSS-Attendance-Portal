document.addEventListener('DOMContentLoaded', function() {
    // Toggle mobile menu
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('.nav-list');
    
    menuToggle.addEventListener('click', function() {
        navList.classList.toggle('show');
    });

    // Toggle dropdown on button click for small screens
    const dropdownButtons = document.querySelectorAll('.dropbtn');
    
    dropdownButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.stopPropagation();
            const dropdownContent = this.nextElementSibling;
            dropdownContent.classList.toggle('show');
        });
    });

    // Close dropdown if clicking outside
    window.addEventListener('click', function(event) {
        dropdownButtons.forEach(button => {
            const dropdownContent = button.nextElementSibling;
            if (dropdownContent.classList.contains('show')) {
                dropdownContent.classList.remove('show');
            }
        });
    });
});

// Add scale animation on hover
document.querySelectorAll('.nav-list a').forEach(link => {
    link.addEventListener('mouseover', () => {
        link.style.transform = "scale(1.1)";
        link.style.transition = "transform 0.3s ease";
    });

    link.addEventListener('mouseout', () => {
        link.style.transform = "scale(1)";
    });
});
