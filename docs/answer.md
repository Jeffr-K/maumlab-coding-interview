# Answer API 명세서

### 보기 항목 생성
```graphql
# Operation
mutation Mutation($surveyId: Int!, $questionId: Int!, $answers: [AnswerRequest!]!) {
    createAnswer(surveyId: $surveyId, questionId: $questionId, answers: $answers) {
        code
        data
        message
    }
}

# Variable
{
    "surveyId": 1,
    "questionId": 2,
    "answers": [
        {
            "nums": 1,
            "value": "예"
        },
        {
            "nums": 2,
            "value": "아니오"
        }
    ]   
}
```

### 보기 항목 수정
```graphql
# Operation
mutation Mutation($surveyId: Int!, $questionId: Int!, $answerId: Int!, $nums: Float!, $value: String!) {
    editAnswer(surveyId: $surveyId, questionId: $questionId, answerId: $answerId, nums: $nums, value: $value) {
        code
        data
        message
    }
}

# Variable
{
    "surveyId": 1,
    "questionId": 2,
    "answerId": 1,
    "nums": 2,
    "value": "변경된 보기"
}
```

### 보기 항목 삭제
```graphql
# Operation
mutation Mutation($surveyId: Int!, $questionId: Int!, $answerId: Int!) {
    deleteAnswer(surveyId: $surveyId, questionId: $questionId, answerId: $answerId) {
        code
        data
        message
    }
}

# Variable
{
    "surveyId": 1,
    "questionId": 2,
    "answerId": 1
}
```

### 보기 항목 조회
```graphql
# Operation
query Query($surveyId: Int!, $questionId: Int!, $answerId: Int!) {
    getAnswer(surveyId: $surveyId, questionId: $questionId, answerId: $answerId) {
        code
        message
        data {
            id
            nums
            value
        }
    }
}

# Variable
{
    "surveyId": 1,
    "questionId": 2,
    "answerId": 2
}
```

### 보기 항목 목록 조회
```graphql
# Operation
query GetAnswers($surveyId: Int!, $questionId: Int!) {
    getAnswers(surveyId: $surveyId, questionId: $questionId) {
        code
        message
        data {
            id
            nums
            value
        }
    }
}

# Variable
{
    "surveyId": 1,
    "questionId": 2
}
```

