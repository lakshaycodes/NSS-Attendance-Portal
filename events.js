const eventsData = [
    {
        title: "Plantation Drive",
        images: [
            "images/events-images/August/plantation 14-august/cover.PNG",
            "images/events-images/August/plantation 14-august/1.PNG",
            "images/events-images/August/plantation 14-august/2.PNG",
            "images/events-images/August/plantation 14-august/3.PNG"
        ]
    },
    {
        title: "Food Distribution",
        images: [
            "images/events-images/August/food-distribution/cover.PNG",
            "images/events-images/August/food-distribution/1.PNG",
            "images/events-images/August/food-distribution/2.PNG",
            "images/events-images/August/food-distribution/3.PNG",
            "images/events-images/August/food-distribution/4.PNG",
            "images/events-images/August/food-distribution/5.PNG"
        ]
    },
    {
        title: "Cloth Donation",
        images: [
            "images/events-images/August/cloth-distribution/cover.PNG",
            "images/events-images/August/cloth-distribution/1.PNG",
            "images/events-images/August/cloth-distribution/2.PNG",
            "images/events-images/August/cloth-distribution/3.PNG",
            "images/events-images/August/cloth-distribution/4.PNG",
            "images/events-images/August/cloth-distribution/5.PNG",
            "images/events-images/August/cloth-distribution/6.PNG",
        ]
    },
    {
        title: "Budget Session",
        images: [
            "images/events-images/August/budget-session/cover.PNG",
            "images/events-images/August/budget-session/1.PNG",
            "images/events-images/August/budget-session/2.PNG"
        ]
    }
];

// Function to create event element with slider functionality
function createEventElement(event) {
    const eventDiv = document.createElement('div');
    eventDiv.classList.add('event');

    // Slider container
    const sliderContainer = document.createElement('div');
    sliderContainer.classList.add('slider-container');

    // Slider
    const slider = document.createElement('div');
    slider.classList.add('slider');

    // Add images to slider
    event.images.forEach(imageSrc => {
        const img = document.createElement('img');
        img.src = imageSrc;
        img.alt = event.title;
        img.classList.add('event-image');
        slider.appendChild(img);
    });

    // Add arrows
    const prevArrow = document.createElement('button');
    prevArrow.classList.add('prev-arrow');
    prevArrow.innerHTML = "&#10094;";

    const nextArrow = document.createElement('button');
    nextArrow.classList.add('next-arrow');
    nextArrow.innerHTML = "&#10095;";

    sliderContainer.appendChild(slider);
    sliderContainer.appendChild(prevArrow);
    sliderContainer.appendChild(nextArrow);

    // Event title
    const eventTitle = document.createElement('h3');
    eventTitle.classList.add('event-title');
    eventTitle.textContent = event.title;

    // Append everything to the event div
    eventDiv.appendChild(sliderContainer);
    eventDiv.appendChild(eventTitle);

    // Functionality for sliding images with animation
    let currentImageIndex = 0;
    const images = slider.querySelectorAll('.event-image');
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
        resetOtherSliders(eventDiv); // Reset other sliders to cover image
    });

    nextArrow.addEventListener('click', () => {
        updateImageIndex(currentImageIndex + 1);
        resetOtherSliders(eventDiv); // Reset other sliders to cover image
    });

    return eventDiv;
}

// Function to reset all other sliders to their cover image
function resetOtherSliders(activeEvent) {
    const allSliders = document.querySelectorAll('.event');
    allSliders.forEach(slider => {
        if (slider !== activeEvent) {
            const eventImages = slider.querySelectorAll('.event-image');
            const sliderElement = slider.querySelector('.slider');
            sliderElement.style.transform = `translateX(0%)`;
        }
    });
}

// Append all events to the main container
const eventsContainer = document.getElementById('events-container');
eventsData.forEach(event => {
    const eventElement = createEventElement(event);
    eventsContainer.appendChild(eventElement);
});
