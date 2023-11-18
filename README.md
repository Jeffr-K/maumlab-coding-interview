# Maum Coding Interview

---

## 사용 기술

- typescript
- nest.js
- graphql
- typeorm
- postgresql

---
## 유의 사항

> 본 코딩 과제 전형의 작업 환경
> 
> OS: Mac OS M1
> 
> Database: Postgresql 14.1
> 
> IDE: Webstorm
> 
> Package Manager: Yarn

## 실행 방법

1. 의존성을 설치해주세요.

```bash
$ git clone https://github.com/Jeffr-K/maumlab-coding-interview.git
$ yarn install
```

2. `.env` 파일을 수정해주세요.
```dotenv
SERVER_PORT=서버가 실행될 포트
NODE_ENV=dev * 이것은 변경하지 않으셔도 괜찮습니다!

# Database 설정
DB_HOST=데이터베이스 주소<예: localhost>
DB_PORT=데이터베이스 포트<예: 5432>
DB_USER=데이터베이스 유저<예: root>
DB_PASS=데이터베이스 비번<예: root>
DB_NAME=데이터베이스 이름<예: maum_db>
```

3. 서버를 실행시켜 주세요.
```bash
$ yarn run start:dev
```

4. GraphQL Playground 에 접속해주세요.

루트 디렉토리 Docs 문서에 테스트 한 예제를 약간 문서화하였습니다.
쿼리를 이용한 로그 저장은 Root Directory 에 /logs 파일에 저장됩니다.

```text
On Chrome:
http://<서버호스트>:<포트>/graphql

예) http://localhost:4000/graphql
```

