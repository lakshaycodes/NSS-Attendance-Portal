// JavaScript to handle the expansion of alumni card
document.addEventListener('DOMContentLoaded', function() {
    const alumniCards = document.querySelectorAll('.alumni-card');

    // Iterate through each alumni card
    alumniCards.forEach(card => {
        // Toggle the 'active' class on click to show/hide the message
        card.addEventListener('click', function() {
            // Close other open cards if necessary
            alumniCards.forEach(c => {
                if (c !== this) {
                    c.classList.remove('active');
                }
            });
            // Toggle the active state of the clicked card
            this.classList.toggle('active');
        });
    });
});
