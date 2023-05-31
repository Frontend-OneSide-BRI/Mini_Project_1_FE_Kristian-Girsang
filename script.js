document.addEventListener("DOMContentLoaded", function () {
  // Load images from JSON
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var data = JSON.parse(xhr.responseText);
      var imageGallery = document.getElementById("image-gallery");

      // Display all images initially
      displayImages(data.images);

      // Filter images on button click
      var filterButtons = document.querySelectorAll(".filter-button");
      filterButtons.forEach(function (button) {
        button.addEventListener("click", function () {
          var category = this.getAttribute("data-filter");
          var filteredImages = data.images;

          if (category !== "all") {
            filteredImages = data.images.filter(function (image) {
              return image.category === category;
            });
          }

          displayImages(filteredImages);

          // Add active class to clicked filter button
          filterButtons.forEach(function (btn) {
            btn.classList.remove("active");
          });
          this.classList.add("active");
        });
      });

      // Display images in the gallery
      function displayImages(images) {
        imageGallery.innerHTML = "";
        var rowContainer = document.createElement("div");
        rowContainer.className = "row";

        images.forEach(function (image, index) {
          var card = document.createElement("div");
          card.className = "col-lg-4 col-md-6 col-sm-12 my-3";
          card.innerHTML = `
            <div class="card">
              <img src="${image.url}" class="card-img compressed-img" alt="${image.name}">
            </div>`;

          rowContainer.appendChild(card);

          // After every 3 image cards, add the row container to the gallery and create a new row container
          if ((index + 1) % 3 === 0) {
            imageGallery.appendChild(rowContainer);
            rowContainer = document.createElement("div");
            rowContainer.className = "row justify-content-between";
          }
        });

        // Add the last row container if there are remaining image cards
        if (images.length % 3 !== 0) {
          imageGallery.appendChild(rowContainer);
        }

        // Open modal and show image details on image click
        var compressedImgs = document.querySelectorAll(".compressed-img");
        compressedImgs.forEach(function (img) {
          img.addEventListener("click", function () {
            var modalImage = document.getElementById("modal-image");
            var modalTitle = document.getElementById("modal-title");
            var modalDescription = document.getElementById("modal-description");
            var imageSrc = this.getAttribute("src");
            var imageAlt = this.getAttribute("alt");
            var image = images.find(function (img) {
              return img.url === imageSrc && img.name === imageAlt;
            });

            modalImage.setAttribute("src", image.url);
            modalTitle.textContent = image.name;
            modalDescription.textContent = image.description;
            document.getElementById("image-modal").classList.add("show");
          });
        });
      }
    }
  };

  xhr.open("GET", "../db.json", true);
  xhr.send();

});