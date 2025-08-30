/************************************************************
 * OTT 자동 재생 & 오프닝 스킵 통합 스크립트
 * 지원 플랫폼: Wavve / Tving / Netflix
 ************************************************************/

/** @type {string} 현재 감지된 URL */
let previousUrl = location.pathname;

/** 트래커 상태 플래그 */
let tvingTrackerStarted = false;
let wavveTrackerStarted = false;
let netflixTrackerStarted = false;

/************************************************************
 * 1. URL 변경 감지
 ************************************************************/
function handleUrlChange() {
  const currentPath = location.pathname;
  if (currentPath === previousUrl) return;

  console.log(`URL 변경 감지: ${previousUrl} → ${currentPath}`);
  previousUrl = currentPath;
  initializePlatformFeatures();
}

/************************************************************
 * 2. 플랫폼 기능 초기화
 ************************************************************/
function initializePlatformFeatures() {
  chrome.storage.local.get(['ojPop'], (result) => {
    const settings = result.ojPop || {};
    const hostname = location.hostname;

    const platformMap = {
      wavve: {
        hostnameMatch: 'wavve',
        selectors: { opening: 'opening-skip-btn', next: 'next-episode-box' },
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
      netflix: {
        hostnameMatch: 'netflix',
        selectors: {
          opening: 'button.watch-video--skip-content-button',
          next: 'button[data-uia="next-episode-seamless-button"]',
        },
        playNext: playNetflixNextEpisode,
      },
    };

    for (const [platform, config] of Object.entries(platformMap)) {
      if (hostname.includes(config.hostnameMatch) && settings[platform]) {
        console.log(`${platform} 설정 감지됨:`, settings[platform]);
        setupObserversByPlatform(config, settings[platform], platform);
      }
    }

    // 트래커 초기화
    if (hostname.includes('tving')) initTvingTracker();
    if (hostname.includes('wavve'))
      initWavveTracker(globalThis.Utility.getContentIdFromUrl());
    if (hostname.includes('netflix')) initNetflixTracker();

    console.info(`OTT JUMP 초기화 완료 for ${hostname}`);
  });
}

/************************************************************
 * 3. 트래커 초기화 함수
 ************************************************************/

/**
 * tving 트래커 초기화
 */
const initTvingTracker = () => {
  const remainEl = document.querySelector('.uihide .remain-time');
  if (!remainEl || tvingTrackerStarted) return;

  const thisContent = new globalThis.EpisodeManager().getTvingContentId();
  const tracker = new TvingWatchTracker(thisContent, '.uihide .remain-time');
  tracker.startTracking();
  tvingTrackerStarted = true;

  console.log('✅ Tracker initialized for content:', thisContent);
};

/**
 * Wavve 트래커 초기화
 */
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
 * Netflix 트래커 초기화
 */
function initNetflixTracker() {
  if (netflixTrackerStarted) return;

  const remainSelector =
    'div.watch-video--bottom-controls-container span[data-uia="controls-time-remaining"]';
  const trackId = globalThis.Utility.getTrackIdFromUrl();
  const tempContent = JSON.parse(
    localStorage.getItem('ojWatchedContent') || '{}'
  );

  if (!tempContent.netflix || tempContent.netflix !== trackId) {
    const tracker = new NetflixWatchTracker(trackId, remainSelector);
    tracker.startTracking();
    netflixTrackerStarted = true;
    console.log('⏱️ Netflix Tracker initialized for content:', trackId);
  }
}

/************************************************************
 * 4. 옵저버 및 자동 실행
 ************************************************************/

/** Netflix 전용 오프닝 스킵 감지 */
let netflixObserver = null;
let netflixIntervalId = null;

/**
 * Netflix 오프닝 스킵 버튼 감지 후 클릭
 */
function handleNetflixSkip() {
  const skipButton = document.querySelector(
    'button.watch-video--skip-content-button'
  );

  if (skipButton) {
    console.log('🎬 Netflix 오프닝 스킵 버튼 감지');
    skipButton.click();
  }
}

/**
 * Netflix용 옵저버 + Interval 시작
 */
function startNetflixSkipWatcher() {
  if (netflixObserver || netflixIntervalId) return;

  netflixObserver = new MutationObserver(handleNetflixSkip);
  netflixObserver.observe(document.body, { childList: true, subtree: true });

  netflixIntervalId = window.setInterval(handleNetflixSkip, 500);
}

/**
 * Netflix 옵저버 + Interval 종료
 */
function stopNetflixSkipWatcher() {
  if (netflixObserver) {
    netflixObserver.disconnect();
    netflixObserver = null;
  }
  if (netflixIntervalId) {
    clearInterval(netflixIntervalId);
    netflixIntervalId = null;
  }
}

/** 플랫폼별 옵저버 설정 */
function setupObserversByPlatform(config, toggles, platform) {
  const { opening, next } = config.selectors;
  const { openingSkip, nextPlay, all } = toggles;

  if (platform === 'netflix') {
    // Netflix 오프닝 스킵
    if (openingSkip || all) startNetflixSkipWatcher();

    // Netflix 다음 회차
    if (nextPlay || all) observeFeature(next, config.playNext, platform, true);
  } else {
    // 다른 플랫폼 기존 로직
    if (all || (openingSkip && nextPlay)) {
      observeFeature(opening, handleSkip, platform);
      observeFeature(next, config.playNext, platform, true);
    } else if (openingSkip) {
      observeFeature(opening, handleSkip, platform);
    } else if (nextPlay) {
      observeFeature(next, config.playNext, platform, true);
    }
  }
}

/**
 * ElementObserver 래핑 함수
 * @param {string} selector 감지할 CSS 선택자
 * @param {(target: HTMLElement) => void} callback 감지 시 실행할 콜백 함수
 * @param {boolean} [once=false] 한 번만 감지할지 여부
 */
function observeFeature(selector, callback, platform = '', once = false) {
  if (!selector || typeof callback !== 'function') return;
  const observer = new globalThis.ElementObserver(
    selector,
    callback,
    platform,
    once
  );
  observer.observe();
}

/** 오프닝 스킵 버튼 클릭 */
function handleSkip(targetNode) {
  console.log('🎬 오프닝 스킵 버튼 클릭:', targetNode);
  if (targetNode) targetNode.click();
}

/************************************************************
 * 5. 플랫폼별 다음 회차 자동 재생
 ************************************************************/

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
  console.log('playTvingNextEpisode thisContent:', thisContent);
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
  console.log('remainTimeText:', remainTimeText);
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

/**
 * Netflix 플랫폼에서 다음 에피소드 자동 재생
 * @param {HTMLElement} targetNode 다음 회차 버튼
 */
function playNetflixNextEpisode(targetNode) {
  const btn = targetNode;
  const trackId = globalThis.Utility.getTrackIdFromUrl(); // 변경됨

  const tempContent = JSON.parse(
    localStorage.getItem('ojWatchedContent') || '{}'
  );
  const lastContent = JSON.parse(localStorage.getItem('ojLastContent') || '{}');
  const previous = lastContent.netflix;

  // 기존 비교 로직: 현재 콘텐츠가 이전보다 최신이 아닌 경우
  if (!globalThis.Utility.isContentIdNewer(previous, trackId, 'netflix')) {
    localStorage.setItem(
      'ojLastContent',
      JSON.stringify({ ...lastContent, netflix: trackId })
    );
    return;
  }

  // 남은 시간 체크
  const remainTimeText = document
    .querySelector(
      'div.watch-video--bottom-controls-container span[data-uia="controls-time-remaining"]'
    )
    ?.textContent?.trim();

  if (remainTimeText) {
    const [m, s] = remainTimeText.split(':').map(Number);
    if (m < 1 && s < 40) {
      console.log(
        `✅ Netflix 콘텐츠 40초 미만. 다음 에피소드 재생 스킵`,
        trackId
      );

      if (tempContent.netflix) {
        localStorage.setItem(
          'ojLastContent',
          JSON.stringify({ ...lastContent, netflix: tempContent.netflix })
        );
        console.log(
          '✅ Netflix 콘텐츠 임시 -> 확정 저장:',
          tempContent.netflix
        );
        localStorage.removeItem('ojWatchedContent');
      }

      return;
    }
  }

  // 다음 회차 재생
  if (btn) {
    if (tempContent.netflix) localStorage.removeItem('ojWatchedContent');
    localStorage.setItem(
      'ojLastContent',
      JSON.stringify({ ...lastContent, netflix: trackId })
    );
    btn.click();
  }
}

// 초기 로딩 시 platform 설정
if (
  location.hostname.includes('wavve') ||
  location.hostname.includes('tving') ||
  location.hostname.includes('netflix')
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
