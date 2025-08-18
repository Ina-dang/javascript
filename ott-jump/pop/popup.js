document.addEventListener('DOMContentLoaded', function () {
  chrome.storage.local.get(['ojPop'], function (result) {
    const ojPop = result.ojPop || {};

    setInitialSwitchState('wavve', ojPop.wavve);
    setInitialSwitchState('tving', ojPop.tving);
    setInitialSwitchState('netflix', ojPop.netflix);
  });

  const platforms = ['wavve', 'tving', 'netflix'];
  const features = ['openingSkip', 'nextPlay'];

  platforms.forEach((platform) => {
    // 전체 스위치
    addEventListenerToSwitch(`#${platform}All`, (checked) => {
      handleAllSwitch(platform, features, checked);
    });

    // 개별 기능 스위치
    features.forEach((feature) => {
      addEventListenerToSwitch(
        `#${platform}${capitalize(feature)}`,
        (checked) => {
          handleFeatureSwitch(platform, feature, checked);
        }
      );
    });
  });

  function addEventListenerToSwitch(selector, action) {
    const switchElement = document.querySelector(`${selector} input`);
    if (!switchElement) {
      console.warn(`⚠️ ${selector} 요소를 찾을 수 없음`);
      return;
    }

    switchElement.addEventListener('change', (event) => {
      action(event.target.checked);
    });
  }

  function handleAllSwitch(platform, features, isChecked) {
    features.forEach((feature) => {
      updateSwitchUI(`#${platform}${capitalize(feature)} input`, isChecked);
    });
    setTimeout(() => {
      updatePlatformStorage(platform, {
        all: isChecked,
        ...Object.fromEntries(features.map((f) => [f, isChecked])),
      });
    }, 50);
  }

  function handleFeatureSwitch(platform, feature, isChecked) {
    chrome.storage.local.get(['ojPop'], function (result) {
      const current = result.ojPop?.[platform] ?? {};
      const updated = {
        ...current,
        [feature]: isChecked,
      };

      // all 계산
      updated.all = features.every((f) => updated[f]);

      // UI 반영
      updateSwitchUI(`#${platform}All input`, updated.all);

      updatePlatformStorage(platform, updated);
    });
  }

  function updatePlatformStorage(platform, platformData) {
    chrome.storage.local.get(['ojPop'], function (result) {
      const updatedStorage = {
        ...(result.ojPop ?? {}),
        [platform]: platformData,
      };
      chrome.storage.local.set({ ojPop: updatedStorage }, function () {
        console.log(`[${platform}] 스토리지 업데이트:`, updatedStorage);
      });
    });
  }

  function updateSwitchUI(selector, isChecked) {
    const switchElement = document.querySelector(selector);
    if (switchElement) {
      switchElement.checked = isChecked;
    } else {
      console.warn(`⚠️ ${selector} 요소를 찾을 수 없음`);
    }
  }

  function setInitialSwitchState(platform, data) {
    if (!data) return;

    updateSwitchUI(`#${platform}All input`, data.all);
    updateSwitchUI(`#${platform}OpeningSkip input`, data.openingSkip);
    updateSwitchUI(`#${platform}NextPlay input`, data.nextPlay);
  }

  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
});
