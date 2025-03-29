let currentObserver = null;
let previousUrl = location.pathname;

function handleUrlChange() {
  if (location.pathname !== previousUrl) {
    console.log(
      `URL 변경 감지: 이전 URL: ${previousUrl}, 새로운 URL: ${location.pathname}`
    );
  }

  if (currentObserver) {
    console.log('currentObserver:: ', currentObserver);
    currentObserver.disconnect();
    currentObserver.null;
    return;
  }

  setTimeout(() => {
    createNewEpisodeObserver();
  }, 100);

  previousUrl = location.pathname;
}

function createNewEpisodeObserver() {
  /** @type {ElementObserver} 오프닝 스킵 버튼 감지 */
  const openingObserver = new globalThis.ElementObserver(
    'PcSkipOpeningButton_overlayButton',
    handleSkip
  );
  openingObserver.observe();

  /** @type {ElementObserver} 다음 에피소드 자동 재생 감지 */
  const nextEpisodeObserver = new globalThis.ElementObserver(
    'PcContinueNextEpisodeButton_episode',
    playTivingNextEpisode
  );
  nextEpisodeObserver.observe();
}
// URL 변경을 감지하는 MutationObserver 설정
const urlChangeObserver = new MutationObserver(handleUrlChange);
urlChangeObserver.observe(document.body, { childList: true, subtree: true });

/**
 * OTT 플랫폼에 따라 특정 요소를 감지하고 이벤트를 처리하는 Observer를 생성
 */
if (location.hostname.includes('wavve')) {
  console.log('여기는 웨이브');

  /** @type {ElementObserver} 오프닝 스킵 버튼 감지 */
  const openingObserver = new globalThis.ElementObserver(
    'opening-skip-btn',
    handleSkip
  );
  openingObserver.observe();

  /** @type {ElementObserver} 다음 에피소드 자동 재생 감지 */
  const nextEpisodeObserver = new globalThis.ElementObserver(
    'next-episode-box',
    playWavvesNextEpisode,
    true
  );
  nextEpisodeObserver.observe();
} else if (location.hostname.includes('tving')) {
  console.log('여기는 티빙');
  createNewEpisodeObserver();
}

/**
 * 특정 요소가 감지되면 클릭 이벤트를 실행
 * @param {HTMLElement} targetNode 클릭할 대상 요소
 */
function handleSkip(targetNode) {
  if (targetNode) {
    targetNode.click();
  }
}

/**
 * 웨이브(Wavve)에서 다음 에피소드 자동 재생을 수행
 * @param {HTMLElement} targetNode 다음 에피소드 버튼이 있는 요소
 */
function playWavvesNextEpisode(targetNode) {
  const isWavve = location.hostname.includes('wavve');

  if (
    isWavve &&
    targetNode &&
    !targetNode.classList.contains('next-episode-box-hidden')
  ) {
    const link = targetNode.querySelector('a');

    const episodeManager = new globalThis.EpisodeManager(); // EpisodeManager 인스턴스 생성

    /** @type {string} 현재 시청 중인 콘텐츠 ID */
    const thisContent = globalThis.Utility.getContentIdFromUrl();

    const lastContent =
      localStorage.getItem('ojLastContent') ??
      localStorage.setItem('ojLastContent', thisContent);

    /** @type {HTMLElement | null} 전체 영상 길이 표시 요소 */
    const durationElement = document.querySelector('.text-duration');

    /** @type {HTMLElement | null} 현재 재생 시간 표시 요소 */
    const nowElement = document.querySelector('.text-time');

    /** @type {string} 전체 영상 길이 */
    const duration = durationElement
      ? durationElement.textContent.split('/ ').pop()
      : '';

    /** @type {string} 현재 재생 시간 */
    const now = nowElement ? nowElement.textContent : '';

    console.log(link, lastContent, thisContent);

    // 재생 시간이 1분 미만이면 자동 재생하지 않음
    if (episodeManager.isLessThanOneMinute(duration, now)) {
      return;
    }

    // 다음 에피소드로 넘어갈 수 있는 경우 클릭
    if (link && lastContent !== thisContent) {
      localStorage.setItem('ojLastContent', thisContent);
      link.click();
    }
  }
}

/**
 * 티빙에서 다음 에피소드 자동 재생을 수행
 * @param {HTMLElement} targetNode 다음 에피소드 버튼이 있는 요소
 */
function playTivingNextEpisode(targetNode) {
  const isTving = location.hostname.includes('tving');
  console.log(isTving);
  if (!isTving || !targetNode) {
    return;
  }

  const episodeManager = new globalThis.EpisodeManager(); // EpisodeManager 인스턴스 생성
  const currentContentId = episodeManager.getTvingContentId(); // 현재 시청 중인 콘텐츠 ID
  const lastContent =
    localStorage.getItem('ojLastContent') ??
    localStorage.setItem('ojLastContent', currentContentId);
  console.log('ojLastContent', lastContent);
  console.log('currentContent', currentContentId);

  if (lastContent === currentContentId) {
    console.log('이미 재생한 콘텐츠이므로 자동 재생을 중지합니다.');
    return;
  }

  const remainTimeElement = document.querySelector('.remain-time');

  if (remainTimeElement) {
    const remainTimeText = remainTimeElement.textContent.trim();
    const [minutes, seconds] = remainTimeText.split(':').map(Number);

    // 티빙은 어떤기준으로 다음회차 재생을 해야할지 고민이넴
    if (minutes < 1 && seconds < 40) {
      console.log('남은 시간이 40초 미만이므로 자동 재생을 중지합니다.');
      return;
    }
  }

  const nextEpisodeButton = targetNode.querySelector('button');

  if (nextEpisodeButton) {
    localStorage.setItem('ojLastContent', currentContentId);
    nextEpisodeButton.click();
  } else {
    console.log('다음 에피소드 버튼을 찾을 수 없습니다.');
  }
}

console.info(`OTT JUMP 초기화 완료. ${Math.random()}`);
