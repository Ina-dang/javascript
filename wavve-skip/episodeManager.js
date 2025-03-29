// 콘텐츠 관련 처리하는 EpisodeManager 클래스
class EpisodeManager {
  constructor() {
    this.lastContent = localStorage.getItem('ojLastContent');
  }

  getContentId() {
    const urlParams = new URLSearchParams(
      new URL(document.location.href).search
    );
    return urlParams.get('contentid');
  }

  getTvingContentId() {
    const pathSegments = document.location.pathname.split('/');
    return pathSegments[pathSegments.length - 1]; // URL의 마지막 경로 추출
  }

  playNextEpisode(link) {
    const currentContentId = this.getContentId();

    if (this.lastContent !== currentContentId) {
      localStorage.setItem('ojLastContent', currentContentId);
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
