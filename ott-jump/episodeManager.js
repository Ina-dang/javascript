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

  getNetflixContentId() {
    const urlParams = new URLSearchParams(
      new URL(document.location.href).search
    );
    return urlParams.get('trackId');
  }

  playNextEpisode(link, platform) {
    const currentContentId = this.getContentId(); // 현재 콘텐츠 ID
    const lastContent = JSON.parse(
      localStorage.getItem('ojLastContent') || '{}'
    );
    const platformLastContent = lastContent[platform]; // 'wavve' or 'tving' 등

    if (platformLastContent !== currentContentId) {
      localStorage.setItem(
        'ojLastContent',
        JSON.stringify({
          ...lastContent,
          [platform]: currentContentId,
        })
      );
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
