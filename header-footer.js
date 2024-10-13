// Function to fetch and insert HTML content (header or footer)
function loadContent(section, url) {
  fetch(url)
    .then((response) => {
      if (!response.ok) throw new Error(`Failed to load ${url}`);
      return response.text();
    })
    .then((data) => {
      document.getElementById(section).innerHTML = data;

      // If the section is the header, add the active tab logic
      if (section === "header") {
        highlightActiveTab();
      }
    })
    .catch((error) => {
      console.error("Error loading content:", error);
    });
}

// Load the header and footer
loadContent("header", "header.html");
loadContent("footer", "footer.html");
