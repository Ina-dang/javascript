class NetflixWatchTracker {
  constructor(contentId, remainSelector) {
    this.contentId = contentId;
    this.remainSelector = remainSelector; // 남은 시간 span 선택자
    this.initialSec = null;
    this.startTime = null;
    this.interval = null;
  }

  getRemainSeconds() {
    const remainText = document.querySelector(this.remainSelector)?.textContent;
    if (!remainText) return null;

    // 예: "0:45" → 45초
    const [m, s] = remainText.split(':').map(Number);
    return m * 60 + s;
  }

  startTracking() {
    this.interval = setInterval(() => {
      const remain = this.getRemainSeconds();
      if (remain == null) return;

      if (this.initialRemain == null) {
        this.initialRemain = remain;
        this.startTime = Date.now();
        console.log('⏱️ Netflix tracking started, remain:', remain, '초');
        return;
      }

      const watchSec = this.initialRemain - remain;
      console.log('Netflix current remain:', remain, '초, watchSec:', watchSec);
      if (watchSec < 0) {
        console.warn(
          '⚠️ watchSec 음수 발생. 초기화 재시도',
          remain,
          this.initialRemain
        );
        this.initialRemain = remain;
        return;
      } else if (watchSec >= 180) {
        // 3분 경과
        this.saveTempContent();
        this.stopTracking();
      }
    }, 5000);
  }

  stopTracking() {
    if (this.interval) clearInterval(this.interval);
  }

  saveTempContent() {
    const tempContent = JSON.parse(
      localStorage.getItem('ojWatchedContent') || '{}'
    );
    if (tempContent['netflix'] === this.contentId) return;

    localStorage.setItem(
      'ojWatchedContent',
      JSON.stringify({ ...tempContent, netflix: this.contentId })
    );
    console.log(`✅ Netflix 콘텐츠 3분 경과 임시 저장:`, this.contentId);
  }
}
