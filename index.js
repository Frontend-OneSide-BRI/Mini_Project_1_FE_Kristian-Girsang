document.addEventListener("DOMContentLoaded", function () {
  // Load images from JSON
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var data = JSON.parse(xhr.responseText);
      var someImageGallery = document.getElementById("some-image-gallery");

      // Display random images
      var randomImages = getRandomElements(data.images, 6); // Change the number of random images here
      displayImages(randomImages);

      // Function to get random elements from an array
      function getRandomElements(arr, count) {
        var shuffled = arr.slice(0);
        var i = arr.length;
        var min = i - count;
        var temp;
        var index;

        while (i-- > min) {
          index = Math.floor((i + 1) * Math.random());
          temp = shuffled[index];
          shuffled[index] = shuffled[i];
          shuffled[i] = temp;
        }

        return shuffled.slice(min);
      }

      // Display images in the gallery
      function displayImages(images) {
        someImageGallery.innerHTML = "";

        images.map(function (image) {
          var card = document.createElement("div");
          card.className = "col-lg-4 col-md-6 col-sm-12 my-3";
          card.innerHTML =
            `<div class="card">
              <img src="${image.url}" class="card-img compressed-img" alt="${image.name}" data-bs-toggle="modal" data-bs-target="#image-modal" data-image-url="${image.url}" data-image-title="${image.title}" data-image-description="${image.description}">
            </div>`;

          someImageGallery.appendChild(card);
        });

        // Attach event listeners to the modal-triggering images
        var modalTriggerImages = document.querySelectorAll(".compressed-img");
        modalTriggerImages.forEach(function (image) {
          image.addEventListener("click", function () {
            var modalImage = document.getElementById("modal-image");
            var modalTitle = document.getElementById("modal-title");
            var modalDescription = document.getElementById("modal-description");

            var imageUrl = this.getAttribute("data-image-url");
            var imageTitle = this.getAttribute("data-image-title");
            var imageDescription = this.getAttribute("data-image-description");

            modalImage.src = imageUrl;
            modalTitle.textContent = imageTitle;
            modalDescription.textContent = imageDescription;
          });
        });
      }
    }
  };

  xhr.open("GET", "../db.json", true);
  xhr.send();
});
