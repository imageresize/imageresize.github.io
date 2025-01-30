let originalImage, canvas, ctx;

function showUploadOptions() {
    let selectedOption = document.getElementById('uploadOption').value;
    if (selectedOption === 'local') {
        document.getElementById('imageInput').style.display = 'block'; // Show file input
    } else {
        document.getElementById('imageInput').style.display = 'none'; // Hide file input
        alert(`Upload image using ${selectedOption}`);
    }
}

function loadImage() {
    let fileInput = document.getElementById('imageInput');
    let file = fileInput.files[0];
    if (file) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function(event) {
            originalImage = new Image();
            originalImage.src = event.target.result;
            originalImage.onload = function() {
                canvas = document.getElementById("canvas");
                ctx = canvas.getContext("2d");
                canvas.width = originalImage.width;
                canvas.height = originalImage.height;
                ctx.drawImage(originalImage, 0, 0);
                document.getElementById('resizeControls').style.display = 'block'; // Show resize controls
            };
        };
    }
}

function resizeImage() {
    let newWidth = parseInt(document.getElementById('widthInput').value);
    let newHeight = parseInt(document.getElementById('heightInput').value);
    
    // Resize the canvas
    canvas.width = newWidth;
    canvas.height = newHeight;
    
    // Draw the resized image
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear previous image
    ctx.drawImage(originalImage, 0, 0, newWidth, newHeight);

    // Enable download link
    let downloadLink = document.getElementById('downloadLink');
    downloadLink.href = canvas.toDataURL('image/png');
    downloadLink.style.display = 'block'; // Show the download button
}

function toggleCropOption() {
    let isChecked = document.getElementById('cropImage').checked;
    if (isChecked) {
        alert("Crop option selected. Implement crop functionality here.");
    }
}
