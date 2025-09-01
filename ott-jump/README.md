# OTT JUMP

브라우저 확장 프로그램(Chrome)으로, OTT 플레이어에서 **오프닝/엔딩 건너뛰기**와 **다음 회차 자동 재생**을 돕는 스크립트 모음입니다.  
서비스별 트래커와 공통 유틸, DOM 옵저버를 조합해 동작합니다.

## OTT 넘겨주는거 귀찮아서 만들었다!

[작업히스토리]

- 25.03.03
  - 첫 테스트 (content-initial.js)
  - 옵저버패턴으로 변경 (content.js)
- 25.03.04: 다음화 재생 때 비하인드 보고있는데도 넘어가버림
  - 1분 미만으로 남았을때는 다음화 재생 하지 않도록 수정
  - OOP 도입: 코드 재사용성, 유지보수성, 데이터 캡슐화를 위해 클래스를 사용하여 리팩토링. 책임 분리를 명확히 하여 가독성과 확장성 향상.
- 25.03.08: 티빙추가, 아이콘추가
  - 티빙 오프닝 넘기기는 괜찮은데 다음회차 재생이 감지가 잘 안됨
  - 티빙은 그리고 오프닝 넘기기가 오프닝넘기기 기능이 아닌듯함
    - 빙속성, 허당상사 보는데 오프닝 건너뛰기 지나서 초반스토리나오고 오프닝 노래가 나옴;
    - 다음회차 재생도 기준을 좀더 찾아봐야겠다.
- 25.03.09: 티빙 자동 넘어가기 개선
  - 씁.. 근데 뭔가 티빙이 느려진 것 같아서 보니까 누수가 있는것같아서 좀더 모니터링 해야할 듯
  - 한달정도 쓰면서 봤는데, 만든 익스텐션을 켜던지 안켜던지 메모리레코딩 결과가 똑같아서 OTT Jump 내의 문제가 아니라 티빙이슈로 생각하여 일단 해당 이슈는 보류
- 25.03.29: popup.js 토글 연결, OTT JUMP 팝업 스타일 추가
- 25.03.30: 익스텐션 아이콘 UI, 웨이브 기능 연결
  - 아이콘에서 스위치 상태에 따라 컨텐츠 제어하도록 기능 추가
- 25.04.20: 컨텐츠 확인 로직 수정
  - 뭔가.. 일단은 굴러가니까 하는게 더뎌졌다. \
  - 티빙도 토글연결하고 새로고침해야 적용되는것도 빨리 고쳐야하는디.. 토글을 나는 안쓸꺼다보니까 진행이 더디네 (콧쓱)
- 25.05.03: 티빙 컨텐츠 확인 로직 수정
  - E004354971다음이 왜 E004354900이고. 티빙은 컨텐츠 id 관리를 어떻게하는거야.. (쒸익)
  - 1화는 자동으로 건너뛰기 안하도록 수정했다.
- 25.08.17: 넷플릭스 추가

[ // TODO ]

- 티빙에서 발생하는 메모리 누수 점검 및 최적화 (3.9 모니터링결과 => 임시 보류)
- 새로고침을 하지않아도 업데이트 되도록 수정
- 티빙 전생귀족 감정스킬로 성공하다가 시즌 2개인데 1끝나고 자동으로 안넘어간다. 시리즈들은 자동으로 다음시즌 해주면 좋겠는데
- 티빙.. ㅌ빙...티.빙....... 오류 박박나온다

[error]

- Wavve

  - 다음 회차 재생 때 a태그 링크가 javascript로 되어있어서 발생하는 콘솔 오류 제거
  - CSP(Content Security Policy)는 웹사이트에서 XSS(Cross-Site Scripting) 공격 및 코드 인젝션을 방지하기 위한 보안 기능으로 해당 정책을 위반해서 뜨는오류
  - 운영에도 똑같이 뜨려나.. 헤더에서 허용하는 방법은 위험할 것같아 고민중.
    > 오류내용  
    > content.js:68 Refused to run the JavaScript URL because it violates the following Content Security Policy directive: "script-src 'self' 'wasm-unsafe-eval' 'inline-speculation-rules' http://localhost:_ http://127.0.0.1:_ chrome-extension:". Either the 'unsafe-inline' keyword, a hash ('sha256-...'), or a nonce ('nonce-...') is required to enable inline execution. Note that hashes do not apply to event handlers, style attributes and javascript: navigations unless the 'unsafe-hashes' keyword is present.

- Tving
  - 새로고침시 발생
    > E004325319:1 Attestation check for Topics on https://www.tving.com/ failed.

---

## 파일 구조

```
OTT-JUMP
 ┣ 📂images
 ┃ ┣ 📜16.png
 ┃ ┗ 📜32.png
 ┣ 📂pop
 ┃ ┣ 📜popup.html
 ┃ ┗ 📜popup.js
 ┣ 📜common.js            # 공통 유틸리티 함수
 ┣ 📜content-initial.js # 초기 버전(legacy)
 ┣ 📜content-functional.js # 초기 버전(legacy)
 ┣ 📜content.js            # 메인 로직: 플랫폼 감지 → 트래커 초기화 → 옵저버/매니저 결합
 ┣ 📜elementObserver.js    # DOM 변화 감지용 옵저버 클래스
 ┣ 📜episodeManager.js     # 오프닝 스킵 및 다음 회차 재생 관리
 ┣ 📜netflixTracker.js     # Netflix 전용 트래커
 ┣ 📜tvingTracker.js       # TVING 전용 트래커
 ┣ 📜waveTracker.js        # wavve 전용 트래커
 ┣ 📜manifest.json         # 확장 프로그램 메타데이터/권한
 ┗ 📜README.md
```

> `content-initial.js`, `content-functional.js`는 현재 메인 로직(`content.js`)에 통합되기 전 **초기 버전(legacy 코드)** 으로만 남아있습니다.

## 주요 기능

- 🕒 **오프닝/엔딩 자동 건너뛰기**  
  탐지 지점에 도달하면 자동으로 스킵하거나 안내 UI를 트리거합니다.
- ▶️ **다음 회차 자동 재생**  
  에피소드 종료 시 다음 회차를 찾아 재생 대기/자동 시작.
- 🧭 **서비스별 트래커 분리**  
  Netflix, TVING, Wavve 각 플랫폼 전용 트래커
- 👀 **DOM 변화 감지 기반 동작**  
  `elementObserver.js`로 플레이어/컨트롤이 로드될 때만 안전하게 동작.  
  URL 변경 감지 → 트래커 재생 초기화

---

## 동작 개요

1. **콘텐츠 스크립트 주입**: `content.js`가 환경을 준비하고 동작 시작
2. **감시 시작**: `elementObserver.js`가 플레이어 및 컨트롤 영역 관찰
3. **에피소드 제어**: `episodeManager.js`가 스킵/다음 회차 재생 수행
4. **플랫폼 적응**: 현재 호스트에 맞는 `*Tracker.js`를 선택해 동작
5. **팝업 UI**: `/pop/popup.html`로 상태 확인/간단 제어

---

## 파일별 역할

- `manifest.json` — 확장 이름/버전/권한/매칭 URL/콘텐츠 스크립트 정의
- `common.js` — 포맷터, 안전 실행 래퍼, 타임아웃/지연 유틸 등 공통 함수
- `elementObserver.js` — DOM 로드/변화 이벤트 감지
- `episodeManager.js` — 스킵 버튼 탐지·클릭, 다음 에피소드 탐색 및 재생
- `content.js` — 서비스 감지 → 트래커 선택 → 옵저버/매니저 결합
- `netflixTracker.js` / `tvingTracker.js` / `waveTracker.js` — 사이트별 셀렉터/동작 캡슐화, 시청 시간 트래킹 및 임시 저장
- `content-initial.js`, `content-functional.js` — **초기 버전(legacy)**
- `/pop/popup.html`, `/pop/popup.js` — 브라우저 툴바 팝업 UI
- `/images/16.png`, `/images/32.png` — 확장 아이콘
