document.addEventListener('DOMContentLoaded', function () {
  // 각 섹션에 대한 설정
  const settings = {
    wavve: {
      allSwitch: '#wavveAll', // 변경된 id 사용
      openingSkipSwitch: '#wavveOpeningSkip', // 변경된 id 사용
      nextPlaySwitch: '#wavveNextPlay', // 변경된 id 사용
      enableFeatures: enableWavveFeatures,
      disableFeatures: disableWavveFeatures,
      actions: {
        all: handleWavveAllSwitch,
        openingSkip: handleWavveOpeningSkipSwitch,
        nextPlay: handleWavveNextPlaySwitch,
      },
    },
    tving: {
      allSwitch: '#tvingAll', // 변경된 id 사용
      openingSkipSwitch: '#tvingOpeningSkip', // 변경된 id 사용
      nextPlaySwitch: '#tvingNextPlay', // 변경된 id 사용
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

    addEventListenerToSwitch(
      platformSettings.allSwitch,
      platformSettings.actions.all
    );
    addEventListenerToSwitch(
      platformSettings.openingSkipSwitch,
      platformSettings.actions.openingSkip
    );
    addEventListenerToSwitch(
      platformSettings.nextPlaySwitch,
      platformSettings.actions.nextPlay
    );
  }

  function addEventListenerToSwitch(selector, action) {
    const switchElement = document.querySelector(selector);
    console.log(`Switch Element for ${selector}: `, switchElement); // 요소 확인 로그

    if (switchElement) {
      switchElement.addEventListener('change', (event) => {
        console.log(`${selector} changed, checked: `, event.target.checked);
        action(event.target.checked);
      });
    } else {
      console.log(`${selector} not found!`); // 요소를 찾지 못한 경우 로그
    }
  }
});

function handleWavveAllSwitch() {}
function handleTvingAllSwitch() {}
function handleWavveOpeningSkipSwitch() {}
function handleTvingOpeningSkipSwitch() {}
function handleWavveNextPlaySwitch() {}
function handleTvingNextPlaySwitch() {}

function enableWavveFeatures() {}
function disableWavveFeatures() {}
function enableTvingFeatures() {}
function disableTvingFeatures() {}
