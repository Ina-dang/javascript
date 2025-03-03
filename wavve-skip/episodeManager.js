// 콘텐츠 관련 처리하는 EpisodeManager 클래스
class EpisodeManager {
  constructor() {
    this.lastContent = localStorage.getItem('lastContent');
  }

  getContentId() {
    const urlParams = new URLSearchParams(
      new URL(document.location.href).search
    );
    return urlParams.get('contentid');
  }

  playNextEpisode(link) {
    const currentContentId = this.getContentId();

    if (this.lastContent !== currentContentId) {
      localStorage.setItem('lastContent', currentContentId);
      link.click();
    }
  }

  isLessThanOneMinute(duration, currentTime) {
    const diff = Math.abs(
      globalThis.Utility.getSeconds(duration) -
        globalThis.Utility.getSeconds(currentTime)
    );
    return diff < 60;
  }
}

globalThis.EpisodeManager = EpisodeManager;
