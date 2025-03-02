setInterval(() => {
  //  1. 오프닝 건너뛰기 버튼 찾기
  let skipOpeningButton = document.querySelector('.opening-skip-btn');
  if (
    skipOpeningButton &&
    getComputedStyle(skipOpeningButton).display !== 'none'
  ) {
    console.info('오프닝을 자동으로 건너뛸게요~');
    skipOpeningButton.click();
  }

  // 2. 다음회차 버튼 찾기
  let nextEposiodeButton = document.querySelector('.next-episode-box');
  if (
    nextEposiodeButton &&
    getComputedStyle(nextEposiodeButton).display !== 'none'
  ) {
    console.info('다음 회차를 자동으로 재생할게요~');
    nextEposiodeButton.click();
  }
}, 5000);
