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
              <img src="${image.url}" class="card-img compressed-img" alt="${image.name}">
            </div>`;

          someImageGallery.appendChild(card);
        });
      }
    }
  };

  xhr.open("GET", "../db.json", true);
  xhr.send();
});
