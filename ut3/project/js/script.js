function generateImages() {
    const table = document.getElementById('imageList');
    table.innerHTML = '';

    var dh = parseInt(document.getElementById("size").value);
    if (dh > 1) {
        var bw = parseInt(document.getElementById("border-width").value);
        var bc = document.getElementById("border-color").value;
        bc = bc.startsWith("#") ? bc.slice(1) : bc;
        var sharpen = document.getElementById("image-focus").value;
        var blur = document.getElementById("image-blur").value;

        console.log("Tamaño: " + dh);
        console.log("Ancho del Borde: " + bw);
        console.log("Color del Borde: " + bc);
        console.log("Enfoque: " + sharpen);
        console.log("Desenfoque: " + blur);

        const numImages = 20;
        const URL_base = "http://192.168.1.140/project/images/";
        for (let i = 1; i <= numImages; i++) {
            const numberWithZero = i.toString().padStart(2, '0');
            const imageURL = `${URL_base}image${numberWithZero}.jpg?dw=${dh}&dh=${dh}&bw=${bw}&bh=${bw}&bc=${bc}&sharpe>
            const listItem = document.createElement("li");
            const image = document.createElement("img");
            image.src = imageURL;
            listItem.appendChild(image);
            table.appendChild(listItem);
        }
    } else {
        alert("El tamaño de la imagen debe ser mayor que 1 píxel.");
    }
}
