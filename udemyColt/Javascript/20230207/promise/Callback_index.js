// 콜백지옥

// setTimeout(() => {
//   document.body.style.backgroundColor = "red";
//   setTimeout(() => {
//     document.body.style.backgroundColor = "orange";
//     setTimeout(() => {
//       document.body.style.backgroundColor = "yellow";
//       setTimeout(() => {
//         document.body.style.backgroundColor = "green";
//         setTimeout(() => {
//           document.body.style.backgroundColor = "blue";
//           setTimeout(() => {
//             document.body.style.backgroundColor = "purple";
//           }, 1000);
//         }, 1000);
//       }, 1000);
//     }, 1000);
//   }, 1000);
// }, 1000);

// const delayedColorChange = (newColor, delay) => {
//   setTimeout(() => {
//     document.body.style.backgroundColor = newColor;
//   }, delay);
// };

// delayedColorChange("olive", 1000);
// delayedColorChange("steelblue", 2000);

const delayedColorChange = (newColor, delay, doNext) => {
  setTimeout(() => {
    document.body.style.backgroundColor = newColor;
    doNext && doNext();
  }, delay);
};

delayedColorChange("olive", 1000, () => {
  delayedColorChange("orange", 1000, () => {
    delayedColorChange("magenta", 1000, () => {
      delayedColorChange("steelblue", 1000, () => {
        delayedColorChange("white", 1000, () => {});
      });
    });
  });
});
