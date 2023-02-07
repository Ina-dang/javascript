// const delayedColorChange = (newColor, delay, doNext) => {
//   setTimeout(() => {
//     document.body.style.backgroundColor = newColor;
//     doNext && doNext();
//   }, delay);
// };

// delayedColorChange("olive", 1000, () => {
//   delayedColorChange("orange", 1000, () => {
//     delayedColorChange("magenta", 1000, () => {
//       delayedColorChange("steelblue", 1000, () => {
//         delayedColorChange("white", 1000, () => {});
//       });
//     });
//   });
// });

const delayedColorChange = (color, delay) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      document.body.style.backgroundColor = color;
      resolve();
    }, delay);
  });
};

delayedColorChange("red", 1500)
  .then(() => delayedColorChange("orange", 1500))
  .then(() => delayedColorChange("yellow", 1500))
  .then(() => delayedColorChange("green", 1500))
  .then(() => delayedColorChange("blue", 1500))
  .then(() => delayedColorChange("navy", 1500))
  .then(() => delayedColorChange("violet", 1500))
  .then(() => delayedColorChange("pink", 1500));
