// 흔히 보게되는 여러 중첩이 되어있는 콜백 함수

// searchMoviesAPI(
//   "amadeus",
//   () => {
//     saveToMyDB(
//       movies,
//       () => {
//         // 성공 시 실행할 함수
//       },
//       () => {
//         // 실패 시 실행할 함수
//       }
//     );
//   },
//   () => {}
// );

const fakeRequestCallback = (url, success, failure) => {
  const delay = Math.floor(Math.random() * 4500) + 500;
  setTimeout(() => {
    if (delay > 4000) {
      failure("Connect Timeout");
    } else {
      success(`Here is your fake data from ${url}`);
    }
  }, delay);
};

// fakeRequestCallback(
//   "books.com",
//   function (response) {
//     console.log("IT WORKED!!!");
//     console.log(response);
//     fakeRequestCallback("books.com/page2", function (response) {
//       console.log("IT WORKED!!!");
//       console.log(response);
//     });
//   },
//   function () {
//     console.log("CONNECTED ERROR!!!");
//   }
// );

const fakeRequestPromise = (url) => {
  return new Promise((resolve, reject) => {
    const delay = Math.floor(Math.random() * 4500) + 500;
    setTimeout(() => {
      if (delay > 4000) {
        reject("Connect Timeout");
      } else {
        resolve(`Here is your fake data from ${url}`);
      }
    }, delay);
  });
};

// const request = fakeRequestPromise("book.com");
// request
//   .then(() => {
//     console.log("IT WORKED!!!!");
//     fakeRequestPromise("book.com/page2")
//       .then(() => {
//         console.log("IT WORKED!!! 2");
//         fakeRequestPromise("book.com/page3")
//           .then(() => {
//             console.log("IT WORKED!!! 3");
//           })
//           .catch(() => {
//             console.log("OH NO ERROR 3!!!");
//           });
//       })
//       .catch(() => {
//         console.log("OH NO ERROR 2!!!");
//       });
//   })
//   .catch(() => {
//     console.log("OH, NO! ERROR!!!");
//   });

fakeRequestPromise("book.com/page")
  .then((data) => {
    console.log("IT WORKED !!!! ");
    console.log(data);
    return fakeRequestPromise("book.com/page2");
  })
  .then((data) => {
    console.log("IT WORKED !!!! ");
    console.log(data);
    return fakeRequestPromise("book.com/page3");
  })
  .then((data) => {
    console.log("IT WORKED !!!! ");
    console.log(data);
    return fakeRequestPromise("book.com/page4");
  })
  .catch(() => {
    console.log("OH NO, A REQUEST FAILED!!! ");
  });
