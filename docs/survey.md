# Survey API 명세서


### 설문지 생성
```graphql
# Operation
mutation Mutation($title: String!, $author: String) {
    createSurvey(title: $title, author: $author) {
        code
        data
        message
    }
}

# Variable Example
{
    "title": "마음 코딩 인터뷰 설문지",
    "author": 표다몬
}
```

### 설문지 수정
```graphql
# Operation
mutation Mutation($editSurveyId: Int!, $title: String!, $author: String) {
  editSurvey(id: $editSurveyId, title: $title, author: $author) {
    code
    data
    message
  }
}

# Variable
{
    "editSurveyId": 1,
    "title": "윤정기 백엔드 인터뷰",
    "author": "표다몬"
}
```

### 설문지 삭제
```graphql
# Operation
mutation Mutation($deleteSurveyId: Int!) {
    deleteSurvey(id: $deleteSurveyId) {
        code
        data
        message
    }
}

# Variable
{
  "deleteSurveyId": 1
}
```

### 설문지 조회
```graphql
# Operation
query Query($surveyId: Int!) {
  getSurvey(surveyId: $surveyId) {
    code
    message
    data {
      author
      createdAt
      id
      title
      updatedAt
    }
  }
}

# Variable
{
    "surveyId": 1
}
```

### 설문지 목록 조회
```graphql
query Query {
  getSurveys {
    code
    message
    data {
      author
      createdAt
      id
      title
      updatedAt
    }
  }
}
```

### 설문지 완료하기
```graphql
# Operation
mutation Mutation($surveyId: Int!) {
    saveSurveyCompleted(surveyId: $surveyId) {
        code
        data
        message
    }
}

# Variable
{
    "surveyId": 1
}
```

### 완료된 설문지 목록 조회
```graphql
# Operation
query Query {
  getSurveys {
    code
    message
    data {
      author
      createdAt
      id
      title
      updatedAt
    }
  }
}

# Variable

```