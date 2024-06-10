## 슬기로운 가계부 생활

### Git Commit Convention

##### 메시지 구조
```
type(옵션) : Subject(제목, 50자 이내)
(한줄을 띄워 분리)
body(72자 이내로 상세히 작성. 무엇을, 왜 변경했는지 작성)  // body도 선택사항으로 합니다.
(한줄을 띄워 분리)
footer(꼬리말. 선택사항)
```

##### 예시
```
feat: 로그인 기능 구현
// 한줄 띄고
작업 내용에 대한 설명
```

|type|description|
|:---|:---|
|feat|새로운 기능을 추가|
|fix| 버그 수정|
|design| CSS 등 UI 디자인 변경|
|docs| 문서 수정|
|style| 코드 포멧팅, 세미콜론 누락, 코드 변경이 없는 경우|
|refactor| 코드 리팩토링|
|test| 테스트 코드 추가|
|comment| 주석 추가|
|remove| 파일, 폴더 삭제|
|rename| 파일, 폴더명 수정|
