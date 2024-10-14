
function addSliderFunctionality(eventDiv) {
  const slider = eventDiv.querySelector(".slider");
  const images = slider.querySelectorAll(".event-image");
  const prevArrow = eventDiv.querySelector(".prev-arrow");
  const nextArrow = eventDiv.querySelector(".next-arrow");

  let currentImageIndex = 0;
  const totalImages = images.length;

  function updateImageIndex(index) {
    currentImageIndex = (index + totalImages) % totalImages;
    slider.style.transform = `translateX(-${currentImageIndex * 100}%)`;
    slider.style.transition = "transform 0.5s ease-in-out";
  }

  updateImageIndex(0);

  prevArrow.addEventListener("click", () => {
    updateImageIndex(currentImageIndex - 1);
    resetOtherSliders(eventDiv); 
  });

  nextArrow.addEventListener("click", () => {
    updateImageIndex(currentImageIndex + 1);
    resetOtherSliders(eventDiv);
  });
}

function resetOtherSliders(activeEvent) {
  const allSliders = document.querySelectorAll(".event");
  allSliders.forEach((slider) => {
    if (slider !== activeEvent) {
      const sliderElement = slider.querySelector(".slider");
      sliderElement.style.transform = `translateX(0%)`;
    }
  });
}

const eventDivs = document.querySelectorAll(".event");
eventDivs.forEach((eventDiv) => {
  addSliderFunctionality(eventDiv);
});
