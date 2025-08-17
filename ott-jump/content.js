/** @type {string} 현재 감지된 URL */
let previousUrl = location.pathname;
let tvingTrackerStarted = false;
let wavveTrackerStarted = false;

const initTracker = () => {
  const remainEl = document.querySelector('.uihide .remain-time');
  if (!remainEl || trackerStarted) return;

  const thisContent = new globalThis.EpisodeManager().getTvingContentId();
  const tracker = new TvingWatchTracker(thisContent, '.uihide .remain-time');
  tracker.startTracking();
  tvingTrackerStarted = true;

  console.log('✅ Tracker initialized for content:', thisContent);
};

const initWavveTracker = (contentId) => {
  const tempContent = JSON.parse(
    localStorage.getItem('ojWatchedContent') || '{}'
  );
  if (!tempContent.wavve || tempContent.wavve !== contentId) {
    const tracker = new WavveWatchTracker(
      contentId,
      '.text-time.text',
      '.text-duration.text'
    );
    tracker.startTracking();
    wavveTrackerStarted = true;
    console.log('⏱️ Wavve Tracker initialized for content:', contentId);
  }
};
/**
 * URL 변경을 감지하고 플랫폼별 자동 재생 기능을 재설정합니다.
 */
function handleUrlChange() {
  const currentPath = location.pathname;
  if (currentPath === previousUrl) return;
  console.log(
    `URL 변경 감지: 이전 URL: ${previousUrl}, 새로운 URL: ${currentPath}`
  );
  previousUrl = currentPath;
  initializePlatformFeatures();
}

/**
 * Tving 트래커 초기화
 */
const initTvingTracker = () => {
  if (trackerStarted) return;

  const remainEl = document.querySelector('.uihide .remain-time');
  if (!remainEl) return;

  const thisContent = new globalThis.EpisodeManager().getTvingContentId();
  const tracker = new TvingWatchTracker(thisContent, '.uihide .remain-time');
  tracker.startTracking();
  trackerStarted = true;

  console.log('✅ Tving Tracker initialized for content:', thisContent);
};

/**
 * 플랫폼 별 설정을 읽고 적절한 Observer를 세팅합니다.
 */
function initializePlatformFeatures() {
  chrome.storage.local.get(['ojPop'], (result) => {
    const settings = result.ojPop || {};
    const hostname = location.hostname;

    /** @type {Object<string, PlatformConfig>} */
    const platformMap = {
      wavve: {
        hostnameMatch: 'wavve',
        selectors: {
          opening: 'opening-skip-btn',
          next: 'next-episode-box',
        },
        playNext: playWavvesNextEpisode,
      },
      tving: {
        hostnameMatch: 'tving',
        selectors: {
          opening: 'PcSkipOpeningButton_overlayButton',
          next: 'PcContinueNextEpisodeButton_episode',
        },
        playNext: playTvingNextEpisode,
      },
    };

    for (const [platform, config] of Object.entries(platformMap)) {
      if (hostname.includes(config.hostnameMatch) && settings[platform]) {
        console.log(`${platform} 설정 감지됨:`, settings[platform]);
        setupObserversByPlatform(config, settings[platform]);
      }
    }

    // 트래커 초기화
    if (hostname.includes('tving')) initTvingTracker();
    if (hostname.includes('wavve')) {
      const contentId = globalThis.Utility.getContentIdFromUrl();
      initWavveTracker(contentId);
    }
  });
}

/**
 * 해당 플랫폼 설정에 따라 옵저버를 설정합니다.
 * @param {PlatformConfig} config 플랫폼 구성 정보
 * @param {FeatureToggle} toggles 사용자 설정 정보
 */
function setupObserversByPlatform(config, toggles) {
  const { opening, next } = config.selectors;
  const { openingSkip, nextPlay, all } = toggles;

  if (all || (openingSkip && nextPlay)) {
    observeFeature(opening, handleSkip);
    observeFeature(next, config.playNext, true);
  } else if (openingSkip) {
    observeFeature(opening, handleSkip);
  } else if (nextPlay) {
    observeFeature(next, config.playNext, true);
  }
}

/**
 * ElementObserver 래핑 함수
 * @param {string} selector 감지할 CSS 선택자
 * @param {(target: HTMLElement) => void} callback 감지 시 실행할 콜백 함수
 * @param {boolean} [once=false] 한 번만 감지할지 여부
 */
function observeFeature(selector, callback, once = false) {
  if (!selector || typeof callback !== 'function') return;
  const observer = new globalThis.ElementObserver(selector, callback, once);
  observer.observe();
}

/**
 * 오프닝 스킵 버튼을 클릭합니다.
 * @param {HTMLElement} targetNode 클릭할 대상 요소
 */
function handleSkip(targetNode) {
  if (targetNode) targetNode.click();
}

/**
 * Wavve 플랫폼에서 다음 에피소드 자동 재생
 * @param {HTMLElement} targetNode 다음 에피소드 버튼 컨테이너
 */
function playWavvesNextEpisode(targetNode) {
  const link = targetNode?.querySelector('a');
  const episodeManager = new globalThis.EpisodeManager();

  const thisContent = globalThis.Utility.getContentIdFromUrl();
  const tempContent = JSON.parse(
    localStorage.getItem('ojWatchedContent') || '{}'
  );
  const lastContent = JSON.parse(localStorage.getItem('ojLastContent') || '{}');
  const previous = lastContent.wavve;

  // 진행시간/전체시간 확인
  const duration = document
    .querySelector('.text-duration')
    ?.textContent?.split('/ ')
    .pop();
  const now = document.querySelector('.text-time')?.textContent;

  // 1분 이하 남으면 다음 회차 재생 스킵
  if (episodeManager.isLessThanOneMinute(duration, now)) {
    if (tempContent.wavve) {
      localStorage.setItem(
        'ojWatchedContent',
        JSON.stringify({ ...tempContent, wavve: thisContent })
      );
      console.log('✅ Wavve 콘텐츠 임시 -> 확정 저장:', tempContent.wavve);
      localStorage.removeItem('ojWatchedContent');
    }
    return;
  }

  // 이전 회차보다 새 콘텐츠인지 확인
  if (link && globalThis.Utility.isContentIdNewer(previous, thisContent)) {
    if (tempContent.wavve) {
      localStorage.removeItem('ojWatchedContent');
    }
    localStorage.setItem(
      'ojLastContent',
      JSON.stringify({ ...lastContent, wavve: thisContent })
    );
    link.click();
  } else {
    if (tempContent.wavve) {
      localStorage.removeItem('ojWatchedContent');
    }
    localStorage.setItem(
      'ojLastContent',
      JSON.stringify({ ...lastContent, wavve: thisContent })
    );
  }
}

/**
 * Tving 플랫폼에서 다음 에피소드 자동 재생
 * @param {HTMLElement} targetNode 다음 에피소드 버튼 컨테이너
 */
function playTvingNextEpisode(targetNode) {
  const nextBtn = targetNode?.querySelector('button');
  const episodeManager = new globalThis.EpisodeManager();
  const thisContent = episodeManager.getTvingContentId();

  const tempContent = JSON.parse(
    localStorage.getItem('ojWatchedContent') || '{}'
  );
  const lastContent = JSON.parse(localStorage.getItem('ojLastContent') || '{}');
  const previous = lastContent.tving;

  // 기존 비교 로직: 현재 콘텐츠가 이전보다 최신이 아닌 경우
  if (!globalThis.Utility.isContentIdNewer(previous, thisContent, 'tving')) {
    localStorage.setItem(
      'ojLastContent',
      JSON.stringify({ ...lastContent, tving: thisContent })
    );
    return;
  }

  // 남은 시간 체크
  const remainTimeText = document
    .querySelector('.remain-time')
    ?.textContent?.trim();
  if (remainTimeText) {
    const [m, s] = remainTimeText.split(':').map(Number);
    if (m < 1 && s < 40) {
      console.log(
        `✅ Tving 콘텐츠 40초 미만. 다음 에피소드 재생 스킵`,
        this.contentId
      );
      if (tempContent.tving) {
        localStorage.setItem(
          'ojLastContent',
          JSON.stringify({ ...lastContent, tving: tempContent.tving })
        );
        console.log('✅ Tving 콘텐츠 임시 -> 확정 저장:', tempContent.tving);
        localStorage.removeItem('ojWatchedContent');
      }

      return;
    }
  }

  // 다음 회차 재생
  if (nextBtn) {
    localStorage.setItem(
      'ojLastContent',
      JSON.stringify({ ...lastContent, tving: thisContent })
    );
    nextBtn.click();
  }
}

// 초기 로딩 시 platform 설정
if (
  location.hostname.includes('wavve') ||
  location.hostname.includes('tving')
) {
  initializePlatformFeatures();
}

// URL 변경 감지
const urlChangeObserver = new MutationObserver(handleUrlChange);
urlChangeObserver.observe(document.body, { childList: true, subtree: true });

console.info(`OTT JUMP 초기화 완료. ${Math.random()}`);

/**
 * @typedef {Object} PlatformConfig
 * @property {string} hostnameMatch - 호스트 이름 포함 문자열
 * @property {{ opening: string, next: string }} selectors - 요소 선택자
 * @property {(targetNode: HTMLElement) => void} playNext - 다음 회차 실행 함수
 */

/**
 * @typedef {Object} FeatureToggle
 * @property {boolean} all - 전체 자동화 실행 여부
 * @property {boolean} openingSkip - 오프닝 스킵 여부
 * @property {boolean} nextPlay - 다음 에피소드 자동 재생 여부
 */
