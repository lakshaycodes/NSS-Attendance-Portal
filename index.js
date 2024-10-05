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

// Function to handle sliding images with animation for recent events
function addRecentSliderFunctionality(recentEventDiv) {
    const slider = recentEventDiv.querySelector('.recent-slider');
    const images = slider.querySelectorAll('.recent-event-image');
    const prevArrow = recentEventDiv.querySelector('.recent-prev-arrow');
    const nextArrow = recentEventDiv.querySelector('.recent-next-arrow');

    let currentImageIndex = 0;
    const totalImages = images.length;

    // Function to update the displayed image with swipe animation
    function updateImageIndex(index) {
        currentImageIndex = (index + totalImages) % totalImages;
        slider.style.transform = `translateX(-${currentImageIndex * 100}%)`;
        slider.style.transition = "transform 0.5s ease-in-out";
    }

    // Initialize the first image as cover
    updateImageIndex(0);

    // Add event listeners to arrows
    prevArrow.addEventListener('click', () => {
        updateImageIndex(currentImageIndex - 1);
        resetOtherRecentSliders(recentEventDiv); // Reset other sliders to cover image
    });

    nextArrow.addEventListener('click', () => {
        updateImageIndex(currentImageIndex + 1);
        resetOtherRecentSliders(recentEventDiv); // Reset other sliders to cover image
    });
}

// Function to reset all other recent sliders to their cover image
function resetOtherRecentSliders(activeRecentEvent) {
    const allRecentSliders = document.querySelectorAll('.recent-event');
    allRecentSliders.forEach(recentSlider => {
        if (recentSlider !== activeRecentEvent) {
            const recentSliderElement = recentSlider.querySelector('.recent-slider');
            recentSliderElement.style.transform = `translateX(0%)`;
        }
    });
}

// Add recent slider functionality to all recent events
const recentEventDivs = document.querySelectorAll('.recent-event');
recentEventDivs.forEach(recentEventDiv => {
    addRecentSliderFunctionality(recentEventDiv);
});
