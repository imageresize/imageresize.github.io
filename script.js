// script.js
document.getElementById('resizeButton').addEventListener('click', function () {
    const imageInput = document.getElementById('imageInput');
    const widthInput = document.getElementById('width');
    const heightInput = document.getElementById('height');
    const cropCheckbox = document.getElementById('crop');
    const rotateSelect = document.getElementById('rotate');
    const flipSelect = document.getElementById('flip');
    const qualityInput = document.getElementById('quality');
    const canvas = document.getElementById('canvas');
    const downloadLink = document.getElementById('downloadLink');

    if (imageInput.files && imageInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const img = new Image();
            img.onload = function () {
                // Set canvas dimensions
                let width = widthInput.value ? parseInt(widthInput.value) : img.width;
                let height = heightInput.value ? parseInt(heightInput.value) : img.height;

                // Handle rotation (swap width and height for 90° and 270°)
                const rotateValue = parseInt(rotateSelect.value);
                if (rotateValue === 90 || rotateValue === 270) {
                    [width, height] = [height, width];
                }

                // Set canvas size
                canvas.width = width;
                canvas.height = height;

                const ctx = canvas.getContext('2d');

                // Clear canvas
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                // Handle flipping
                ctx.save();
                if (flipSelect.value === 'horizontal') {
                    ctx.translate(canvas.width, 0);
                    ctx.scale(-1, 1);
                } else if (flipSelect.value === 'vertical') {
                    ctx.translate(0, canvas.height);
                    ctx.scale(1, -1);
                }

                // Handle rotation
                if (rotateValue !== 0) {
                    ctx.translate(canvas.width / 2, canvas.height / 2);
                    ctx.rotate((rotateValue * Math.PI) / 180);
                    ctx.translate(-canvas.width / 2, -canvas.height / 2);
                }

                // Draw image on canvas
                ctx.drawImage(img, 0, 0, width, height);
                ctx.restore();

                // Handle cropping
                if (cropCheckbox.checked) {
                    const croppedCanvas = document.createElement('canvas');
                    const croppedCtx = croppedCanvas.getContext('2d');
                    croppedCanvas.width = width;
                    croppedCanvas.height = height;
                    croppedCtx.drawImage(canvas, 0, 0, width, height, 0, 0, width, height);
                    canvas.width = width;
                    canvas.height = height;
                    ctx.drawImage(croppedCanvas, 0, 0);
                }

                // Set download link
                const quality = parseFloat(qualityInput.value);
                downloadLink.href = canvas.toDataURL('image/jpeg', quality);
                downloadLink.download = 'resized-image.jpg';
                downloadLink.style.display = 'block';
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(imageInput.files[0]);
    } else {
        alert('Please upload an image first.');
    }
});
