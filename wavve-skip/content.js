/**
 *
 * setInterval로 계속 스타일 확인하는것보다
 * 옵저버 패턴을 사용해서 DOM변경을 감지하는데 불필요한 반복 실행을
 * 막고, 리소스 사용도 줄일 수 있을것 같아서 코드 변경
 *
 */

// 특정 엘리먼트의 스타일 변화를 감지하는 함수
function observeElement(selector, callback, observeClass = false) {
  // MutationObserver 객체 생성 (API)
  const observer = new MutationObserver(() => {
    const targetNode = document.querySelector(selector);

    if (!targetNode) return;

    // 하나의 조건문으로 쓰려헀는데, 오프닝버튼이랑 다음회차 로직이 달라서 조건문을 추가함
    if (observeClass) {
      // class 속성 변경을 감지하는 경우
      const classList = targetNode.classList;

      if (!classList.contains('next-episode-box-hidden')) {
        callback(targetNode);
      }
    } else {
      // style 속성 변경을 감지하는 경우
      const displayValue = getComputedStyle(targetNode).display;

      if (displayValue !== 'none') {
        callback(targetNode);
      }
    }
  });

  // MutationObserver 설정
  observer.observe(document.body, {
    childList: true, // 자식 노드의 추가/삭제 감지
    attributes: true, // 속성 변화 감지
    attributeFilter: observeClass ? ['class'] : ['style'], // class 속성만 감지할지 style만 감지할지
    subtree: true, // 하위노드 감지 안함. 타겟노드만
  });
}

function skipOpening() {
  const skipOpeningButton = document.querySelector('.opening-skip-btn');
  if (skipOpeningButton) {
    skipOpeningButton.click();
  }
}

function getContentIdFromUrl() {
  const urlParams = new URLSearchParams(new URL(document.location.href).search);
  return urlParams.get('contentid');
}
function playNextEpisode() {
  const nextEposiodeButton = document.querySelector('.next-episode-box');
  if (
    nextEposiodeButton &&
    !nextEposiodeButton.classList.contains('next-episode-box-hidden')
  ) {
    const link = nextEposiodeButton.querySelector('a');
    const thisContent = getContentIdFromUrl();
    const lastContent =
      localStorage.getItem('lastContent') ??
      localStorage.setItem('lastContent', thisContent);
    if (link && lastContent !== thisContent) {
      localStorage.setItem('lastContent', thisContent);
      link.click();
    }
  }
}

console.info('스크립트 테스토');
observeElement('.opening-skip-btn', skipOpening);
observeElement('.next-episode-box', playNextEpisode, true);
