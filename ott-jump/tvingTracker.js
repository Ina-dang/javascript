// MutationObserver로 DOM 변화를 감지해 플레이어 로딩 확인
const observer = new MutationObserver(() => {
  initTracker();
});

// 페이지 전체 감시 (동적 로딩 대응)
observer.observe(document.body, { childList: true, subtree: true });

class TvingWatchTracker {
  constructor(contentId, remainSelector) {
    this.contentId = contentId;
    this.remainSelector = remainSelector;
    this.initialRemain = null;
    this.startTime = null;
    this.interval = null;
  }

  getRemainSeconds() {
    const remainText = document.querySelector(this.remainSelector)?.textContent;
    if (!remainText) return null;
    return globalThis.Utility.getSeconds(remainText);
  }

  startTracking() {
    this.interval = setInterval(() => {
      const remain = this.getRemainSeconds();
      if (remain == null) return;

      if (this.initialRemain == null) {
        this.initialRemain = remain;
        this.startTime = Date.now();
        console.log('⏱️ Tving tracking started:', this.initialRemain, '초');
        return;
      }

      const watchSec = this.initialRemain - remain;

      console.log('tving current watchSec:', watchSec);

      if (watchSec >= 180) {
        // 3분 경과
        this.saveTemporary();
        this.stopTracking();
      }
    }, 5000);
  }

  stopTracking() {
    if (this.interval) clearInterval(this.interval);
  }

  // 임시 저장
  saveTemporary() {
    localStorage.setItem(
      'ojWatchedContent',
      JSON.stringify({ tving: this.contentId, timestamp: Date.now() })
    );
    console.log('📝 Tving 콘텐츠 임시 저장됨:', this.contentId);
  }
}
