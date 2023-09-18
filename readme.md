# CG Countdown Library

`CG Countdown`는 사용하기 쉬운 JavaScript 카운트다운 라이브러리입니다. 날짜와 시간을 설정하면 해당 시간까지의 카운트다운을 화면에 표시해줍니다.

## 설치

이 라이브러리는 npm을 통해 설치할 수 있습니다 (만약 npm 패키지로 배포하려는 경우):

```bash
npm install cg-countdown
```

또는 GitHub 저장소에서 직접 코드를 복제할 수 있습니다:

```bash
git clone [YOUR_GITHUB_REPO_URL]
```

## 사용법

### 기본적인 사용법:

```javascript
import { Clock, DateTimeConverter } from 'cg-countdown';

const config = {
    ElSelector: "#yourElementSelector",
    targetDate: DateTimeConverter.convertStringToDate("2023/12/31 00:00"),
    output: `...`,  // 여기에 원하는 HTML 구조를 입력하세요.
    targetId: "yourTargetId",
    callback: () => {
        console.log("Countdown Finished!");
    }
};

const countdown = new Clock(config);
```

### 설정 옵션:

- `ElSelector`: 카운트다운이 표시될 부모 엘리먼트의 CSS 선택자.
- `targetDate`: 카운트다운의 종료 시간. `DateTimeConverter`를 사용하여 문자열을 날짜로 변환합니다.
- `output`: 카운트다운 컨테이너의 HTML 구조.
- `targetId`: 카운트다운 트래커가 추가될 엘리먼트의 ID.
- `callback`: 카운트다운이 종료될 때 호출될 콜백 함수.

### 주의

*ElSelector로 선택된 엘리먼트와 output에 입력한 div는 같은 레벨에 위치하게 됨.*
*targetId는 output html 내부에 존재해야함.*

  

## 라이센스

이 라이브러리는 MIT 라이센스 하에 배포됩니다.

---

이 README는 간단한 버전이므로, 필요에 따라 추가 정보나 세부 사항을 추가하여 커스터마이징할 수 있습니다.
