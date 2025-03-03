globalThis.getContentIdFromUrl = function () {
  const urlParams = new URLSearchParams(new URL(document.location.href).search);
  return urlParams.get('contentid');
};

const getSeconds = (timeStr) => {
  const [mm, ss] = timeStr.split(':').map(Number);
  return mm * 60 + ss;
};

globalThis.isLessThanOneMinute = (start, end) => {
  const diff = Math.abs(getSeconds(start) - getSeconds(end));
  return diff < 60;
};
