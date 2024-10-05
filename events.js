// Function to handle sliding images with animation
function addSliderFunctionality(eventDiv) {
  const slider = eventDiv.querySelector(".slider");
  const images = slider.querySelectorAll(".event-image");
  const prevArrow = eventDiv.querySelector(".prev-arrow");
  const nextArrow = eventDiv.querySelector(".next-arrow");

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
  prevArrow.addEventListener("click", () => {
    updateImageIndex(currentImageIndex - 1);
    resetOtherSliders(eventDiv); // Reset other sliders to cover image
  });

  nextArrow.addEventListener("click", () => {
    updateImageIndex(currentImageIndex + 1);
    resetOtherSliders(eventDiv); // Reset other sliders to cover image
  });
}

// Function to reset all other sliders to their cover image
function resetOtherSliders(activeEvent) {
  const allSliders = document.querySelectorAll(".event");
  allSliders.forEach((slider) => {
    if (slider !== activeEvent) {
      const sliderElement = slider.querySelector(".slider");
      sliderElement.style.transform = `translateX(0%)`;
    }
  });
}

// Add slider functionality to all events
const eventDivs = document.querySelectorAll(".event");
eventDivs.forEach((eventDiv) => {
  addSliderFunctionality(eventDiv);
});
