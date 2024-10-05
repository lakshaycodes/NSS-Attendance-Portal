// JavaScript for Read More Button
document.getElementById('readMoreBtn').addEventListener('click', function() {
    var collapsibleSection = document.getElementById('collapsibleSection');

    // Toggle the 'expanded' class on the collapsible section
    if (collapsibleSection.classList.contains('expanded')) {
        collapsibleSection.classList.remove('expanded');
        this.textContent = 'Read More'; // Change button text
    } else {
        collapsibleSection.classList.add('expanded');
        this.textContent = 'Show Less'; // Change button text
    }
});
