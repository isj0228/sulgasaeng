## 슬기로운 가계부 생활
test2

### Pull Reqeust
fork 이후의 작업.
1. 자신의 로컬 환경에서 이름으로 브랜치 생성 후 작업하기

   ```
   ex)
   git branch woohyeong // pc에 branch 생성 ※원격 Repository 환경에 생성된 것은 아님
   git checkout woohyeong // 작업할 브랜치로 전환 (main -> woohyeong)
   또는 git switch woohyeong // checkout이랑 같은 명령어
   ```

2. 작업 후 push

   ```
   git add .   // 작업한 내용을 stage로 올리기
   git commit -m"message"   // commit message 작성
   git push origin woohyeong // 원격(fork한 자신의 repo)에 자신의 이름 branch가 있으면 거기에 push 없으면 자동으로 branch가 생성되며 push
   ```
   ![image](https://github.com/wxxhyeong/kb-study/assets/78301292/6403b0f7-3690-425e-af89-a01eb78843ab)

3. push 이후 web에서 pull request 작성
   ![image](https://github.com/wxxhyeong/kb-study/assets/78301292/1483839a-743f-4970-9098-2d962421d6d0)



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
