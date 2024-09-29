document.addEventListener("DOMContentLoaded", function() {
    const villages = document.querySelectorAll(".village");
    const modal = document.getElementById("villageModal");
    const modalTitle = document.getElementById("modalTitle");
    const modalAddress = document.getElementById("modalAddress");
    const modalHead = document.getElementById("modalHead");
    const modalWork = document.getElementById("modalWork");
    const closeModal = document.querySelector(".close");

    // Add click event listener to each village
    villages.forEach(village => {
        village.addEventListener("click", function() {
            // Extract data from the village's data attributes
            modalTitle.innerText = this.dataset.name;
            modalAddress.innerText = "Address: " + this.dataset.address;
            modalHead.innerText = "Village Head: " + this.dataset.head;
            modalWork.innerText = "Work by NSS: " + this.dataset.work;
            modal.style.display = "block"; // Show the modal
        });
    });

    // Close modal when X is clicked
    closeModal.addEventListener("click", function() {
        modal.style.display = "none"; // Hide the modal
    });

    // Close modal if clicked outside of it
    window.addEventListener("click", function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });
});
