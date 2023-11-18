# Question API 명세서

### 문제 항목 생성
```graphql
# Operation
mutation Mutation($surveyId: Int!, $title: String!, $point: Float!) {
    createQuestion(surveyId: $surveyId, title: $title, point: $point) {
        code
        data
        message
    }
}

# Variable
{
    "surveyId": 1,
    "title": "당신은 다가올 휴가때 해외여행을 선호하시나요?",
    "point": 10
}
```

### 문제 항목 수정
```graphql
# Operation
mutation Mutation($surveyId: Int!, $questionId: Int!, $title: String!) {
    editQuestion(surveyId: $surveyId, questionId: $questionId, title: $title) {
        code
        data
        message
    }
}

# Variable
{
    "surveyId": 1,
    "questionId": 1,
    "title": "당신이 희망하는 해외여행의 종류는?"
}
```

### 문제 항목 삭제
```graphql
# Operation
mutation Mutation($surveyId: Int!, $questionId: Int!) {
    deleteQuestion(surveyId: $surveyId, questionId: $questionId) {
        code
        data
        message
    }
}

# Variable
{
    "surveyId": 1,
    "questionId": 1
}
```

### 문제 항목 조회
```graphql
# Operation
query Query($questionId: Int!, $surveyId: Int!) {
    getQuestion(questionId: $questionId, surveyId: $surveyId) {
        code
        data {
            id
            point
            title
            hint
        }
        message
    }
}

# Variable
{
    "questionId": 2,
    "surveyId": 1
}
```

### 문제 항목 목록 조회
```graphql
# Operation
query Query($surveyId: Int!) {
    getQuestions(surveyId: $surveyId) {
        code
        data {
            hint
            id
            point
            title
        }
        message
    }
}

# Variable
{
    "surveyId": 1
}
```

