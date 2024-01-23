# Vite, React Testing Library 및 Vitest를 사용한 스타터

이 프로젝트는 Udemy 강의 React Testing Library with Jest / Vitest를 위해 만들어졌습니다.

## 이 프로젝트가 어떻게 생성되었는지

이 프로젝트는 다음 명령어를 사용하여 생성되었습니다.

```sh
npm create vite@latest vite-starter -- --template react
```

그리고 아래의 모든 단계를 따랐습니다.

또한 몇 가지 불필요한 파일을 제거하고 다음 파일을 업데이트했습니다.

- App.jsx
- 이 README 파일 😄

## Vite 프로젝트에 Vitest 및 React Testing Library 설치

### 의존성 설치

```sh
npm install -D vitest @vitest/ui eslint-plugin-vitest
npm install -D jsdom @testing-library/jest-dom @testing-library/react
```

## package.json의 test 객체에 테스트 스크립트 추가

```json
  "test": "vitest --watch",
```

## setup 파일 추가

jest-dom matchers를 모든 테스트 파일에서 사용할 수 있게 하려면:

1. src/setupTests.js 파일을 생성합니다.
2. 다음 내용을 추가합니다.

```js
import "@testing-library/jest-dom";
```

## ESLint에 Vitest 플러그인 추가

이 단계를 거치면 test 및 expect Vitest 글로벌을 미리 가져오지 않고 사용할 때 발생하는 린팅 오류를 방지할 수 있습니다.

*.eslintrc.cjs*에 다음을 추가합니다:

1. extends 배열에 다음을 추가합니다.

```js
   'plugin:vitest/recommended',
```

2. Vitest 플러그인을 require합니다.

```js
const vitest = require("eslint-plugin-vitest");
```

3. 그런 다음 최상위 module.exports 객체에 다음 속성/값을 추가합니다.

```js
    globals: {
      ...vitest.environments.env.globals,
    },
```

## 몇 가지 ESLint 규칙 업데이트

*.eslintrc.cjs*의 rules 객체에 다음을 추가합니다.

```js
    "no-unused-vars": "warn", // 경고, 오류가 아님
    "vitest/expect-expect": "off", // 테스트를 작성하는 동안 혼란스러운 빨간 줄을 제거합니다.
    "react/prop-types": "off", // 프로퍼티 유효성 검사를 해제합니다.
```

**참고** : VSCode에서 ESLint를 올바르게 작동시키는 데 문제가 있는 경우 이 문제 해결 가이드를 참조하십시오.

## 테스트를 위한 vite 구성 업데이트

Vitest Testing Library 예제를 기반으로 *vite.config.js*를 업데이트합니다. defineConfig 인자에 다음 속성/값을 추가합니다.

```js
  test: {
    globals: true,
    environment: "jsdom",
    // 이것은 앞서 만든 setup 파일을 가리킵니다.
    setupFiles: "./src/setup.js",
    // CSS에 의존하지 않는 테스트가 없으므로 `css: true` 줄을 비활성화하는 것이 좋습니다.
    // 테스트에서 CSS를 파싱하지 않으려면 비활성화하는 것이 좋습니다.
    // CSS를 테스트에서 파싱하려는 경우 이 줄을 그대로 둡니다.
    css: true,
  },
```

## 테스트 실행 명령어

```sh
npm test
```

## 참고

- [Vite 프로젝트 생성](https://vitejs.dev/guide/#scaffolding-your-first-vite-project)
- [Vitest Testing Library 예제](https://github.com/vitest-dev/vitest/tree/main/examples/react-testing-lib)
- [Vitest ESLint 플러그인](https://www.npmjs.com/package/eslint-plugin-vitest)
