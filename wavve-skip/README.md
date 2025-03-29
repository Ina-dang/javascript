# OTT JUMP

## OTT 넘겨주는거 귀찮아서 만들었다!

- 넷플릭스는 관련된 크롬익스텐션이 있어서.. 내가 보는 다른 OTT도 하고싶어서 만들었다

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

[ // TODO ]

- 첫 화는 오프닝을 건너뛰지 않도록 설정 (contentId로 구분 가능할지 확인)
- 티빙의 오프닝 시작 시간과 다음 회차 재생 기준을 찾아 적용
- 티빙에서 발생하는 메모리 누수 점검 및 최적화 (3.9 모니터링결과 => 임시 보류)

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

## 파일 구조

```bash
OTT-JUMP
 ┣ 📂images
 ┃ ┣ 📜16.png
 ┃ ┗ 📜32.png
 ┣ 📂pop
 ┃ ┣ 📜popup.html
 ┃ ┗ 📜popup.js
 ┣ 📜common.js          # 유틸리티 함수
 ┣ 📜elementObserver.js # DOM 변화 감지하는 옵저버 클래스
 ┣ 📜episodeManager.js  # 오프닝 건너뛰기 및 다음 회차 재생 관리 클래스
 ┣ 📜content.js         # 메인 로직: 각 클래스 조합하여 사용
 ┣ 📜manifest.json
 ┗ 📜README.md
```
