document.getElementById("generateButton").addEventListener("click", function() {
    let images = document.querySelectorAll("img");
    let imageSize = document.getElementById("imageSize").value;
    let borderWidth = document.getElementById("borderWidth").value;
    let borderColor = document.getElementById("borderColor").value;
    let focus = document.getElementById("focus").value;
    let blur = document.getElementById("blur").value;
    let dom = location.host;

    for (image of images) {
        image.src = `http://${dom}/img/${image.alt}.jpg?dw=${imageSize}&dh=${imageSize}&bh=${borderWidth}&bc=${borderColor}&bw=${borderWidth}&bh={borderWidth}&sharpen=${focus}&blur=${blur}`
    }
});
