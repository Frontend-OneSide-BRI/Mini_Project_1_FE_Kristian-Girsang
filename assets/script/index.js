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

        // Open modal and show image details on image click
        var modalTriggerImages = document.querySelectorAll(".compressed-img");
        modalTriggerImages.forEach(function (image) {
          image.addEventListener("click", function () {
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