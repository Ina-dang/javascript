class WavveWatchTracker {
  constructor(contentId, currentSelector, durationSelector) {
    this.contentId = contentId;
    this.currentSelector = currentSelector;
    this.durationSelector = durationSelector;
    this.initialSec = null;
    this.startTime = null;
    this.interval = null;
  }

  getCurrentSeconds() {
    const currentText = document.querySelector(
      this.currentSelector
    )?.textContent;
    if (!currentText) return null;
    return globalThis.Utility.getSeconds(currentText);
  }

  getDurationSeconds() {
    const durationText = document.querySelector(
      this.durationSelector
    )?.textContent;
    if (!durationText) return null;
    return globalThis.Utility.getSeconds(durationText);
  }

  startTracking() {
    this.interval = setInterval(() => {
      const current = this.getCurrentSeconds();
      if (current == null) return;

      if (this.initialSec == null) {
        this.initialSec = current;
        this.startTime = Date.now();
        console.log('⏱️ Wavve tracking started:', current, '초');
        return;
      }

      const watchSec = current - this.initialSec;

      console.log('Wavve current:', current, '초, watchSec:', watchSec);

      if (watchSec >= 180) {
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
    if (tempContent['wavve'] === this.contentId) return;

    localStorage.setItem(
      'ojWatchedContent',
      JSON.stringify({ ...tempContent, wavve: this.contentId })
    );
    console.log(`✅ Wavve 콘텐츠 3분 경과 임시 저장:`, this.contentId);
  }
}
