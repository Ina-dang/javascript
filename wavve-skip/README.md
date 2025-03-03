# Wavve AutoPlay

## 웨이브 광고뜨는거 넘겨주는거 귀찮아서 만들었다!

- 넷플릭스는 관련된 크롬익스텐션이 있어서.. 웨이브도 하고싶어서 만들었다

[작업히스토리]

- 25.03.03
  - 첫 테스트 (content-initial.js)
  - 옵저버패턴으로 변경 (content.js)
- 25.03.04: 다음화 재생 때 비하인드 보고있는데도 넘어가버림
  - 1분 미만으로 남았을때는 다음화 재생 하지 않도록 수정

[해결해야할거]

- 다음 회차 재생 때 a태그 링크가 javascript로 되어있어서 발생하는 콘솔 오류 제거
  - CSP(Content Security Policy)는 웹사이트에서 XSS(Cross-Site Scripting) 공격 및 코드 인젝션을 방지하기 위한 보안 기능으로 해당 정책을 위반해서 뜨는오류
  - 운영에도 똑같이 뜨려나.. 헤더에서 허용하는 방법은 위험할 것같아 고민중.
    > 오류내용  
    > content.js:68 Refused to run the JavaScript URL because it violates the following Content Security Policy directive: "script-src 'self' 'wasm-unsafe-eval' 'inline-speculation-rules' http://localhost:_ http://127.0.0.1:_ chrome-extension:". Either the 'unsafe-inline' keyword, a hash ('sha256-...'), or a nonce ('nonce-...') is required to enable inline execution. Note that hashes do not apply to event handlers, style attributes and javascript: navigations unless the 'unsafe-hashes' keyword is present.
