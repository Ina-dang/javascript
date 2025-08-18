/**
 * Utility 클래스
 * URL에서 파라미터 추출, 시간 계산, 콘텐츠 ID 비교 등의 유틸리티 메서드 제공
 */
class Utility {
  /**
   * 현재 URL에서 'contentid' 파라미터 값을 추출합니다.
   * @returns {string | null} 콘텐츠 ID (예: 'E004267586'), 없으면 null
   */
  static getContentIdFromUrl() {
    const urlParams = new URLSearchParams(
      new URL(document.location.href).search
    );
    return urlParams.get('contentid');
  }

  /**
   * 현재 URL에서 'trackId' 파라미터 값을 추출합니다.
   * @returns {string | null} 콘텐츠 ID (예: 'E004267586'), 없으면 null
   */
  static getTrackIdFromUrl() {
    const urlParams = new URLSearchParams(
      new URL(document.location.href).search
    );
    return urlParams.get('trackId');
  }

  /**
   * 'hh:mm:ss' 또는 'mm:ss' 형식 문자열을 초 단위로 변환합니다.
   * @param {string} timeStr 시간 문자열 (예: '01:30' 또는 '01:02:15')
   * @returns {number} 초 단위의 시간
   */
  static getSeconds(timeStr) {
    const parts = timeStr.split(':').map(Number);
    if (parts.length === 2) {
      const [mm, ss] = parts;
      return mm * 60 + ss;
    } else if (parts.length === 3) {
      const [hh, mm, ss] = parts;
      return hh * 3600 + mm * 60 + ss;
    }
    return 0;
  }

  /**
   * 시작 시간과 종료 시간 간의 차이가 60초 미만인지 확인합니다.
   * @param {string} start 'mm:ss' 형식의 시작 시간
   * @param {string} end 'mm:ss' 형식의 종료 시간
   * @returns {boolean} 두 시간 차이가 60초 미만이면 true, 아니면 false
   */
  static isLessThanOneMinute(start, end) {
    const diff = Math.abs(Utility.getSeconds(start) - Utility.getSeconds(end));
    return diff < 60;
  }

  /**
   * 플랫폼에 따라 콘텐츠 ID가 새로운지 판단합니다.
   * - wavve: target ID가 base보다 크면 true
   * - tving: target ID가 base와 다르거나, 현재 회차가 '1화'면 true
   *
   * @param {string} base 기준 콘텐츠 ID
   * @param {string} target 비교할 콘텐츠 ID
   * @param {string} platform 'tving' 또는 'wavve' 등
   * @returns {boolean}
   */
  static isContentIdNewer(base, target, platform) {
    if (platform === 'tving') {
      const isDifferent = base !== target;

      const isFirstEpisode = (() => {
        const header = document.querySelector(
          'div[data-testid="player-header"] span[data-testid="player-header-title"]'
        );
        return header?.textContent.includes('1화') ?? false;
      })();

      return isDifferent || isFirstEpisode;
    }

    // 기본 비교: 숫자 추출 후 크기 비교
    const extractNumber = (str = '') => {
      const numberOnly = str?.replace(/\D/g, '');
      return BigInt(numberOnly || 0n);
    };

    const baseNum = extractNumber(base);
    const targetNum = extractNumber(target);

    return targetNum > baseNum;
  }
}

globalThis.Utility = Utility; // 전역 객체에 클래스를 등록
