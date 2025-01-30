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
    let aspectRatioChecked = document.getElementById("aspectRatio").checked;

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
    downloadLink.href = canvas.toDataURL("image/png");
    downloadLink.style.display = "block";
}