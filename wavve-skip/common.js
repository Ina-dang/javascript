class Utility {
  static getContentIdFromUrl() {
    const urlParams = new URLSearchParams(
      new URL(document.location.href).search
    );
    return urlParams.get('contentid');
  }

  static getSeconds(timeStr) {
    const [mm, ss] = timeStr.split(':').map(Number);
    return mm * 60 + ss;
  }

  static isLessThanOneMinute(start, end) {
    const diff = Math.abs(Utility.getSeconds(start) - Utility.getSeconds(end));
    return diff < 60;
  }
}

globalThis.Utility = Utility; // 전역 객체에 클래스를 등록
