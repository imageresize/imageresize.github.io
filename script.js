let originalImage, originalWidth, originalHeight;

document.getElementById("imageInput").addEventListener("change", function(event) {
    let file = event.target.files[0];
    if (file) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function(event) {
            originalImage = new Image();
            originalImage.src = event.target.result;
            originalImage.onload = function() {
                let canvas = document.getElementById("canvas");
                let ctx = canvas.getContext("2d");
                originalWidth = originalImage.width;
                originalHeight = originalImage.height;
                canvas.width = originalWidth;
                canvas.height = originalHeight;
                ctx.drawImage(originalImage, 0, 0, originalWidth, originalHeight);
                document.getElementById("widthInput").value = originalWidth;
                document.getElementById("heightInput").value = originalHeight;
            };
        };
    }
});

function resizeImage() {
    let newWidth = parseInt(document.getElementById("widthInput").value);
    let newHeight = parseInt(document.getElementById("heightInput").value);
    let percentage = parseInt(document.getElementById("percentageInput").value);
    let aspectRatioChecked = document.getElementById("aspectRatio").checked;
    let quality = parseInt(document.getElementById("qualityInput").value) / 100;
    let format = document.getElementById("formatInput").value;

    // Resize by percentage if provided
    if (!isNaN(percentage) && percentage > 0) {
        newWidth = Math.round(originalWidth * (percentage / 100));
        newHeight = Math.round(originalHeight * (percentage / 100));
        document.getElementById("widthInput").value = newWidth;
        document.getElementById("heightInput").value = newHeight;
    }

    // Maintain aspect ratio if selected
    if (aspectRatioChecked) {
        let aspectRatio = originalWidth / originalHeight;
        newHeight = Math.round(newWidth / aspectRatio);
        document.getElementById("heightInput").value = newHeight;
    }

    // Set canvas size and render the resized image
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");
    canvas.width = newWidth;
    canvas.height = newHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas before redrawing
    ctx.drawImage(originalImage, 0, 0, newWidth, newHeight);

    // Create download link
    let downloadLink = document.getElementById("downloadLink");
    downloadLink.href = canvas.toDataURL(format, quality);
    downloadLink.download = `resized-image.${format.split("/")[1]}`;
    downloadLink.style.display = "block";
}
