document.addEventListener('DOMContentLoaded', function () {
  chrome.storage.local.get(['ojPop'], function (result) {
    const ojPop = result.ojPop || {};

    setInitialSwitchState('wavve', ojPop.wavve);
    setInitialSwitchState('tving', ojPop.tving);
    console.log('ojPop');
  });

  // 각 섹션에 대한 설정
  const settings = {
    wavve: {
      allSwitch: '#wavveAll',
      openingSkipSwitch: '#wavveOpeningSkip',
      nextPlaySwitch: '#wavveNextPlay',
      enableFeatures: enableWavveFeatures,
      disableFeatures: disableWavveFeatures,
      actions: {
        all: handleWavveAllSwitch,
        openingSkip: handleWavveOpeningSkipSwitch,
        nextPlay: handleWavveNextPlaySwitch,
      },
    },
    tving: {
      allSwitch: '#tvingAll',
      openingSkipSwitch: '#tvingOpeningSkip',
      nextPlaySwitch: '#tvingNextPlay',
      enableFeatures: enableTvingFeatures,
      disableFeatures: disableTvingFeatures,
      actions: {
        all: handleTvingAllSwitch,
        openingSkip: handleTvingOpeningSkipSwitch,
        nextPlay: handleTvingNextPlaySwitch,
      },
    },
  };

  for (const platform in settings) {
    const platformSettings = settings[platform];

    Object.keys(platformSettings.actions).forEach((key) => {
      addEventListenerToSwitch(
        platformSettings[`${key}Switch`],
        platformSettings.actions[key]
      );
    });
  }

  function addEventListenerToSwitch(selector, action) {
    const switchElement = document.querySelector(selector);
    if (!switchElement) {
      console.warn(`⚠️ ${selector} 요소를 찾을 수 없음`);
      return;
    }

    switchElement.addEventListener('change', (event) => {
      console.log(`${selector} changed, checked: `, event.target.checked);
      action(event.target.checked);
    });
  }

  function setInitialSwitchState(platform, platformData) {
    if (!platformData) return;

    // 전체 켜기 상태에 따른 개별 기능 스위치 설정
    if (platformData.all !== undefined) {
      updateSwitchUI(`#${platform}All input`, platformData.all);
    }
    if (platformData.openingSkip !== undefined) {
      updateSwitchUI(`#${platform}OpeningSkip input`, platformData.openingSkip);
    }
    if (platformData.nextPlay !== undefined) {
      updateSwitchUI(`#${platform}NextPlay input`, platformData.nextPlay);
    }
  }
});

/**
 * 웨이브 전체 켜기/끄기 핸들러
 */
function handleWavveAllSwitch(isChecked) {
  console.log(`handleWavveAllSwitch 실행됨: ${isChecked}`);

  // "전체 켜기" 상태에 맞춰 관련 스위치 UI 변경
  updateSwitchUI('#wavveOpeningSkip input', isChecked);
  updateSwitchUI('#wavveNextPlay input', isChecked);

  setTimeout(() => {
    updateWavveStorage(isChecked);
  }, 50);
}

/**
 * UI에서 스위치 상태 변경 (이벤트 트리거 포함)
 */
function updateSwitchUI(selector, isChecked) {
  const switchElement = document.querySelector(selector);
  if (switchElement) {
    switchElement.checked = isChecked;
  } else {
    console.warn(`⚠️ ${selector} 요소를 찾을 수 없음`);
  }
}

/**
 * 웨이브 관련 설정을 스토리지에 저장
 */
function updateWavveStorage(isChecked) {
  chrome.storage.local.get(['ojPop'], function (result) {
    const updatedStorage = {
      ...(result.ojPop ?? {}),
      wavve: {
        all: isChecked,
        openingSkip: isChecked,
        nextPlay: isChecked,
      },
    };

    chrome.storage.local.set({ ojPop: updatedStorage }, function () {
      console.log('업데이트된 스토리지 값:', updatedStorage);
    });
  });
}

/**
 * 개별 기능 토글 핸들러
 */
function handleWavveOpeningSkipSwitch(isChecked) {
  console.log(`handleWavveOpeningSkipSwitch 실행됨: ${isChecked}`);
  updateWavveFeature('openingSkip', isChecked);
}

function handleWavveNextPlaySwitch(isChecked) {
  console.log(`handleWavveNextPlaySwitch 실행됨: ${isChecked}`);
  updateWavveFeature('nextPlay', isChecked);
}

/**
 * 개별 기능 스토리지 업데이트
 */
function updateWavveFeature(feature, isChecked) {
  chrome.storage.local.get(['ojPop'], function (result) {
    const updatedStorage = {
      ...(result.ojPop ?? {}),
      wavve: {
        ...(result.ojPop?.wavve ?? {}),
        [feature]: isChecked,
      },
    };

    chrome.storage.local.set({ ojPop: updatedStorage }, function () {
      console.log(`${feature} 업데이트됨:`, updatedStorage);
    });
  });
}

// TVING 핸들러 (추후 확장 가능)
function handleTvingAllSwitch() {}
function handleTvingOpeningSkipSwitch() {}
function handleTvingNextPlaySwitch() {}

function enableWavveFeatures() {}
function disableWavveFeatures() {}
function enableTvingFeatures() {}
function disableTvingFeatures() {}
