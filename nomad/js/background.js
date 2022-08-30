const images = [
    "0.jfif",
    "1.jfif",
    "2.jfif",
    "3.jfif",
    "4.jfif",
    "5.jfif",
    "6.jfif",
    "7.jfif",
    "8.jfif",
    "9.jfif",
    "10.jfif",
    "11.jfif",
    "12.jfif",
    "13.jfif",
    "14.jfif",
    "15.jfif",
    "16.jfif",
    "17.jfif",
    "18.jfif",
    "19.jfif",
    "20.jfif",
];

const chosenImage = images[Math.floor(Math.random() * images.length)];
const bgImage = document.createElement("img");
bgImage.src = `img/${chosenImage}`;

document.body.appendChild(bgImage);

