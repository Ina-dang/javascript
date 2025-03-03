// DOM 요소를 감지하여 이벤트를 처리하는 기능을 담당하는 클래스
const elementObserver = new globalThis.ElementObserver(
  '.opening-skip-btn',
  skipOpening
);
elementObserver.observe();

const nextEpisodeObserver = new globalThis.ElementObserver(
  '.next-episode-box',
  playNextEpisode,
  true
);
nextEpisodeObserver.observe();

// 오프닝 건너뛰기
function skipOpening(targetNode) {
  if (targetNode) {
    targetNode.click();
  }
}

// 다음 에피소드 자동 재생
function playNextEpisode(targetNode) {
  if (
    targetNode &&
    !targetNode.classList.contains('.next-episode-box-hidden')
  ) {
    const link = targetNode.querySelector('a');
    const episodeManager = new globalThis.EpisodeManager(); //EpisodeManager 인스턴스 생성
    const thisContent = globalThis.Utility.getContentIdFromUrl();
    const lastContent =
      localStorage.getItem('lastContent') ??
      localStorage.setItem('lastContet', thisContent);

    const durationElement = document.querySelector('.text-duration');
    const nowElement = document.querySelector('.text-time');
    const duration = durationElement.textContent.split('/ ').pop();
    const now = nowElement.textContent;
    console.log(link, lastContent, thisContent);
    if (episodeManager.isLessThanOneMinute(duration, now)) {
      return;
    }

    if (link && lastContent !== thisContent) {
      localStorage.setItem('lastContent', thisContent);
      link.click();
    }
  }
}

console.info('웨이브 초기화');
