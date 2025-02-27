const numSteps = 20.0;

let boxElement;
let prevRatio = 0.0;
let increasingColor = (ratio) => `rgba(40, 40, 190, ${ratio})`;
let decreasingColor = (ratio) => `rgba(190, 40, 40, ${ratio})`;

window.addEventListener(
  'load',
  () => {
    boxElement = document.querySelector('#box');
    if (boxElement) {
      console.log('✅ boxElement 찾음:', boxElement);
      createObserver();
    } else {
      console.error('❌ boxElement를 찾을 수 없습니다!');
    }
  },
  false
);

const createObserver = () => {
  let options = {
    root: null, // 뷰포트 기준
    rootMargin: '0px',
    threshold: buildThresholdList(),
  };

  let observer = new IntersectionObserver(handleIntersect, options);
  observer.observe(boxElement);
  console.log('✅ Intersection Observer 실행됨');
};

const buildThresholdList = () => {
  let thresholds = [];
  for (let i = 1.0; i <= numSteps; i++) {
    let ratio = i / numSteps;
    thresholds.push(ratio);
  }
  thresholds.push(0);
  return thresholds;
};

const handleIntersect = (entries) => {
  entries.forEach((entry) => {
    console.log('📌 Intersection Ratio:', entry.intersectionRatio);

    if (entry.intersectionRatio > prevRatio) {
      entry.target.style.backgroundColor = increasingColor(
        entry.intersectionRatio
      );
    } else {
      entry.target.style.backgroundColor = decreasingColor(
        entry.intersectionRatio
      );
    }

    prevRatio = entry.intersectionRatio;
  });
};
