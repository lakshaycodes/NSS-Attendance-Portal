// JavaScript to navigate between images
const sliders = document.querySelectorAll('.slider-container');

sliders.forEach((container) => {
    let currentSlide = 0;
    const slider = container.querySelector('.slider');
    const slides = slider.querySelectorAll('.event-image');
    const prevButton = container.querySelector('.prev-arrow');
    const nextButton = container.querySelector('.next-arrow');
    
    // Initialize the slider to show the first image
    slider.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    prevButton.addEventListener('click', () => {
        currentSlide = (currentSlide > 0) ? currentSlide - 1 : slides.length - 1;
        slider.style.transform = `translateX(-${currentSlide * 100}%)`;
    });

    nextButton.addEventListener('click', () => {
        currentSlide = (currentSlide < slides.length - 1) ? currentSlide + 1 : 0;
        slider.style.transform = `translateX(-${currentSlide * 100}%)`;
    });
});
