// Set the specific date (in the format: YYYY, MM-1, DD)
const startDate = new Date(2021, 4, 8); 

// Function to calculate the time difference and update the timer
function updateTimer() {
    const now = new Date(); // Get the current date and time

    // Calculate the difference in years first
    let years = now.getFullYear() - startDate.getFullYear();

    // Adjust the start date by adding the years difference
    let adjustedStartDate = new Date(startDate);
    adjustedStartDate.setFullYear(startDate.getFullYear() + years);

    // If the current date is earlier in the year than the start date, subtract one year
    if (now < adjustedStartDate) {
        years--;
        adjustedStartDate = new Date(startDate);
        adjustedStartDate.setFullYear(startDate.getFullYear() + years);
    }

    // Calculate the time difference in milliseconds
    const timeDiff = now - adjustedStartDate;

    // Convert time difference to days, hours, minutes, and seconds
    const months = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 30));
    const weeks = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 7));
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    // Display the result in the "timer" element
    document.getElementById("timer").innerHTML = 
        `Been Together: <br> ${years} years, ${months} months, ${weeks} weeks, ${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
}

// Update the timer every second
setInterval(updateTimer, 1000);


function triggerUpload() {
    document.getElementById("imageFile").click();
  }
  
  function addImage() {
    const fileInput = document.getElementById("imageFile");
    const file = fileInput.files[0];
  
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
  
      reader.onload = function (e) {
        const dataUrl = e.target.result;
  
        // Get and update saved images
        const savedImages = JSON.parse(localStorage.getItem("savedImages")) || [];
        savedImages.push(dataUrl);
        localStorage.setItem("savedImages", JSON.stringify(savedImages));
  
        // Create and insert image block
        const newImage = createImageBlock(dataUrl, savedImages.length - 1);
        const gallery = document.getElementById("gallery");
        gallery.insertBefore(newImage, gallery.querySelector(".add-image-box"));
      };
  
      reader.readAsDataURL(file);
      fileInput.value = "";
    }
  }
  
  function createImageBlock(dataUrl, index) {
    const newDiv = document.createElement("div");
    newDiv.className = "square";
  
    const img = document.createElement("img");
    img.src = dataUrl;
    img.alt = "";
  
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "✕";
    deleteBtn.onclick = function () {
      deleteImage(index);
    };
  
    newDiv.appendChild(img);
    newDiv.appendChild(deleteBtn);
  
    return newDiv;
  }
  
  function deleteImage(index) {
    const savedImages = JSON.parse(localStorage.getItem("savedImages")) || [];
    savedImages.splice(index, 1); // Remove the image
    localStorage.setItem("savedImages", JSON.stringify(savedImages));
  
    // Reload to reflect changes (you can also dynamically re-render without reload)
    location.reload();
  }
  
  window.onload = function () {
    const savedImages = JSON.parse(localStorage.getItem("savedImages")) || [];
    const gallery = document.getElementById("gallery");
  
    savedImages.forEach((dataUrl, index) => {
      const imageBlock = createImageBlock(dataUrl, index);
      gallery.insertBefore(imageBlock, gallery.querySelector(".add-image-box"));
    });
  };
  
