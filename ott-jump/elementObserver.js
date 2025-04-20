//  DOM의 변화를 감지하고, 특정 스타일이나 클래스 변화를 감지하는 로직을 이 파일에 넣습니다.
class ElementObserver {
  constructor(selector, callback, observeClass = false) {
    this.selector = selector;
    this.callback = callback;
    this.observeClass = observeClass; // class 변경을 감지할지 style 변경을 감지할지 선택
    this.previousState = undefined;
  }

  observe() {
    const observer = new MutationObserver(() => {
      const targetNode = document.querySelector(`[class*="${this.selector}"]`);
      if (!targetNode) return;
      let currentState;

      if (this.observeClass) {
        const classList = targetNode.classList;
        currentState = classList.contains('next-episode-box-hidden')
          ? 'hidden'
          : 'visible';
      } else {
        const displayValue = getComputedStyle(targetNode).display;
        currentState = displayValue !== 'none' ? 'visible' : 'hidden';
      }

      // 첫 번째 감지 시 상태를 변경하지 않고, 그 이후에 상태가 변경되었을 때만 콜백 실행
      if (
        // this.previousState !== undefined &&
        this.previousState !== currentState
      ) {
        console.log(this.previousState, currentState);
        this.previousState = currentState; // 상태가 변경되면 previousState 갱신
        this.callback(targetNode); // 상태가 변화했을 때만 콜백 호출
      } else if (this.previousState === undefined) {
        console.log(
          `현재 상태: ${currentState}, 이전 상태: ${this.previousState}`
        );
        // 첫 번째 상태 감지 시 이전 상태를 현재 상태로 설정
        this.previousState = currentState;
      }
    });

    // MutationObserver 설정
    observer.observe(document.body, {
      childList: true, // 자식 노드의 추가/삭제 감지
      attributes: true, // 속성 변화 감지
      attributeFilter: this.observeClass ? ['class'] : ['style'], // class 속성만 감지할지 style만 감지할지
      subtree: true, // 하위노드 감지
    });
  }
}

globalThis.ElementObserver = ElementObserver;
