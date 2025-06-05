
document.getElementById("readMoreBtn").addEventListener("click", function () {
  var collapsibleSection = document.getElementById("collapsibleSection");

  if (collapsibleSection.classList.contains("expanded")) {
    collapsibleSection.classList.remove("expanded");
    this.textContent = "Read More"; 
  } else {
    collapsibleSection.classList.add("expanded");
    this.textContent = "Show Less"; 
  }
});

function addRecentSliderFunctionality(recentEventDiv) {
  const slider = recentEventDiv.querySelector(".recent-slider");
  const images = slider.querySelectorAll(".recent-event-image");
  const prevArrow = recentEventDiv.querySelector(".recent-prev-arrow");
  const nextArrow = recentEventDiv.querySelector(".recent-next-arrow");

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
    resetOtherRecentSliders(recentEventDiv); 
  });

  nextArrow.addEventListener("click", () => {
    updateImageIndex(currentImageIndex + 1);
    resetOtherRecentSliders(recentEventDiv); 
  });
}

function resetOtherRecentSliders(activeRecentEvent) {
  const allRecentSliders = document.querySelectorAll(".recent-event");
  allRecentSliders.forEach((recentSlider) => {
    if (recentSlider !== activeRecentEvent) {
      const recentSliderElement = recentSlider.querySelector(".recent-slider");
      recentSliderElement.style.transform = `translateX(0%)`;
    }
  });
}

const recentEventDivs = document.querySelectorAll(".recent-event");
recentEventDivs.forEach((recentEventDiv) => {
  addRecentSliderFunctionality(recentEventDiv);
});
