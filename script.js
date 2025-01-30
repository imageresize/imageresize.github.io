let originalWidth, originalHeight;

document.getElementById("imageInput").addEventListener("change", function(event) {
    let file = event.target.files[0];
    if (file) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function(event) {
            let img = new Image();
            img.src = event.target.result;
            img.onload = function() {
                let canvas = document.getElementById("canvas");
                let ctx = canvas.getContext("2d");
                originalWidth = img.width;
                originalHeight = img.height;
                canvas.width = originalWidth;
                canvas.height = originalHeight;
                ctx.drawImage(img, 0, 0, originalWidth, originalHeight);
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

    if (!isNaN(percentage) && percentage > 0) {
        newWidth = Math.round(originalWidth * (percentage / 100));
        newHeight = Math.round(originalHeight * (percentage / 100));
        document.getElementById("widthInput").value = newWidth;
        document.getElementById("heightInput").value = newHeight;
    }

    if (aspectRatioChecked) {
        let aspectRatio = originalWidth / originalHeight;
        newHeight = Math.round(newWidth / aspectRatio);
        document.getElementById("heightInput").value = newHeight;
    }

    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");
    canvas.width = newWidth;
    canvas.height = newHeight;
    ctx.drawImage(canvas, 0, 0, newWidth, newHeight);

    let downloadLink = document.getElementById("downloadLink");
    downloadLink.href = canvas.toDataURL(format, quality);
    downloadLink.download = `resized-image.${format.split("/")[1]}`;
    downloadLink.style.display = "block";
}
