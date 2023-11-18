# Selector API 명세서

### 선택하기
```graphql
# Operation
mutation Mutation($surveyId: Int!, $questionId: Int!, $answerId: Int!) {
    createSelector(surveyId: $surveyId, questionId: $questionId, answerId: $answerId) {
        code
        data
        message
    }
}

# Variable
{
    "surveyId": 1,
    "questionId": 2,
    "answerId": 2
}
```

### 선택 항목 변경
```graphql
# Operation
mutation EditSelector($surveyId: Int!, $questionId: Int!, $answerId: Int!, $selectorId: Int!, $selected: Int!) {
    editSelector(surveyId: $surveyId, questionId: $questionId, answerId: $answerId, selectorId: $selectorId, selected: $selected) {
        code
        data
        message
    }
}

# Variable
{
    "surveyId": 1,
    "questionId": 2,
    "answerId": 2,
    "selectorId": 1,
    "selected": 1
}
```

### 문제 항목 취소
```graphql
# Operation
mutation Mutation($surveyId: Int!, $questionId: Int!, $answerId: Int!, $selectorId: Int!) {
    deleteSelector(surveyId: $surveyId, questionId: $questionId, answerId: $answerId, selectorId: $selectorId) {
        code
        data
        message
    }
}

# Variable
{
    "surveyId": 1,
    "questionId": 2,
    "answerId": 2,
    "selectorId": 1,
}
```

### 선택 항목 조회
```graphql
# Operation
query Query($surveyId: Int!, $questionId: Int!, $answerId: Int!, $selectorId: Int!) {
    getSelector(surveyId: $surveyId, questionId: $questionId, answerId: $answerId, selectorId: $selectorId) {
        code
        message
        data {
            createdAt
            id
            point
            selected
            updatedAt
        }
    }
}

# Variable
{
    "surveyId": 1,
    "questionId": 2,
    "answerId": 2,
    "selectorId": 2
}
```

### 선택 항목 목록 조회
```graphql
# Operation
query GetSelectors($surveyId: Int!, $questionId: Int!, $answerId: Int!) {
    getSelectors(surveyId: $surveyId, questionId: $questionId, answerId: $answerId) {
        code
        message
        data {
            createdAt
            id
            point
            selected
            updatedAt
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

