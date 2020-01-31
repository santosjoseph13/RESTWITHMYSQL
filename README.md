# Overview
​
- API: inlifeubpapi 1.0.0
​
## URLs
​

| Environment | Domain |
|----------- | ----------- |
| UAT | Coming soon |
| Prod | Coming soon |​
# Contents
​

- [API](#api)
  - [Endpoints](#endpoints)
  - [Error Responses](#errorresponses)
​

# <a name="api"></a> API
​
### <a name="endpoints"></a> Endpoints
​

| Method   | Resource                                           | Description                         |  
| -------- | ---------------------------------------------------| ----------------------------------- |  
| **GET**  | [`/plans/:planCode?&vendor=?`](#getplandetails)    | Get plan details by using plan code |  
| **POST** | [`/orders`](#postplaceorder)                       | Post order                          |  
| **POST** | [`/orders/cancel`](#postcancelorder)               | Post cancel order                   |​
### <a name="getplandetails"></a> `GET` /plans/:planCode?&vendor=?
​
- Get plan details using planCode
​
#### Request Path
​

| Query    | Tags  | Field Type  | Length  | Description                                                |
| -------- | ----- | ----------- | ------- | ---------------------------------------------------------- |
|:planCode | params|   varchar   |   20    | Plan code to get the specific plan details                 |
| vendor   | query |   varchar   |   50    | Channel Id/Partner Id provided by UBP to InLife - REQUIRED |​
#### Sample Request
​
{url} /plans/:abc?vendor=10
​
​
## <a name="errorresponses"></a> Error Responses
​
#### Error Codes
​

| Status | Code | Description                               |
| ------ | ---- | ----------------------------------------- |
| 422    | --   | Error while validating request.           |​
#### Sample Error Response
​
```json
{
    "message": "Error while validating request.",
    "errors": {
        "errors": [
            {
                "msg": "Vendor must be indicated",
                "param": "vendor",
                "location": "query"
            }
        ]
    }
}
```
​
### <a name="postplaceorder"></a> `POST` /orders
​
- Place/add order
​
#### Request Path
​

| Query                  | Tags   | Field Type                | Length | Description                                                          |
|------------------------|--------|---------------------------|--------|----------------------------------------------------------------------|
| orderId                | params | varchar                   | 50     | Order id provided by channel/partner - REQUIRED                      |
| orderItem              | body   | Object (array of orders)  |        | OrderItem Object                                                     |
| id                     | body   | varchar                   | 50     | Order item id provided by channel/partner/vendor - REQUIRED          |
| planCode               | body   | varchar                   | 20     | plan id - REQUIRED                                                   |
| planName               | body   | varchar                   | 50     | plan Name - REQUIRED                                                 |
| premium                | body   | numeric                   | 18,2   | Premium of each plan availed - REQUIRED                              |
| lineOfBusiness         | body   | varchar                   | 20     | line Of Business of the plan - REQUIRED                              |
| totalTransactionAmount | body   | numeric                   | 18,2   | Total amount paid for the orders - REQUIRED                          |
| approvalCode           | body   | varchar                   | 20     | Approval code from the bank                                          |
| cardHolderName         | body   | varchar                   | 100    | Card Holder Name                                                     |
| issuingBank            | body   | varchar                   | 20     | Card Issuing Bank                                                    |
| cardNo                 | body   | varchar                   | 30     | Truncated Card Numbere.g. 1234 56XX XXXX 7890                        |
| cardPaymentType        | body   | varchar                   | 10     | Card Payment typee.g. Credit or Debit                                |
| currency               | body   | varchar                   | 3      | Currency of paymente.g. PHP or USD                                   |
| transactionRefNo       | body   | varchar                   | 20     | Reference Number from Bank                                           |
| memberFirstName        | body   | varchar                   | 100    | Member firstname from channel site                                   |
| memberMiddleName       | body   | varchar                   | 100    | Member middlename from channel site                                  |
| memberLastName         | body   | varchar                   | 100    | Member lastname from channel site                                    |
| memberEmailAddress     | body   | varchar                   | 50     | Member emailaddress from channel site - REQUIRED                     |
| memberMobileNo         | body   | varchar                   | 20     | Member mobile number from channel site - REQUIRED                    |
| membershipDate         | body   | datetime                  |        | Date of membership in a channel                                      |
| voucherId              | body   | varchar                   | 20     | Voucher Id issued by channel                                         |
| voucherAmount          | body   | numeric                   | 18,2   | Voucher amount issued by channel                                     |
| voucherdatetime        | body   | datetime                  |        | Voucher datetime by channel                                          |
| voucherStatus          | body   | varchar                   | 20     | Voucher Status issued by channel                                     |
| vendor                 | body   | ALPHANUMERIC              | 50     | Channel Id/Partner Id provided by UBP to InLife - REQUIRED           |
| address                | body   | Object (array of address) |        |                                                                      |
| address1               | body   | varchar                   | 100    | Address 1                                                            |
| address2               | body   | varchar                   | 100    | Address 2                                                            |
| address3               | body   | varchar                   | 100    | Address 3                                                            |
| address4               | body   | varchar                   | 100    | Address 4                                                            |
| address5               | body   | varchar                   | 100    | Address 5                                                            |
| city                   | body   | varchar                   | 50     | Municipality                                                         |
| postalCode             | body   | varchar                   | 10     | Postal Code                                                          |
| country                | body   | varchar                   | 50     | Country                                                              |​
#### Sample Request
​
{url}/orders

body

```json
​{
    "orderId":"1",
    "totalTransactionAmount": "1000000000000000000000000",
    "cancelRequestdatetime":	"2020-01-27",
    "reasonForCancellation": "sda@qes.com",
    "memberMobileNo":"2132423",
    "vendor":"2",
    "OrderItem":[{"id":1}]    
}
```

## <a name="errorresponses"></a> Error Responses
​
#### Error Codes
​

| Status | Code | Description                               |
| ------ | ---- | ----------------------------------------- |
| 422    | ---- | Error while validating request.           |​
#### Sample Error Response
​
​
```json
{
    "message": "Error while validating request.",
    "errors": {
        "errors": [
            {
                "value": "1000000000000000000000000",
                "msg": " Minimum length of 2 and maximum of 18",
                "param": "totalTransactionAmount",
                "location": "body"
            },
            {
                "msg": "  Must be valid and follows ISO8601 format",
                "param": "transactiondatetime",
                "location": "body"
            },
            {
                "msg": " Must not be empty",
                "param": "memberEmailAddress",
                "location": "body"
            },
            {
                "msg": " Must not be empty",
                "param": "OrderItem[0].planCode",
                "location": "body"
            },
            {
                "msg": " Must not be empty",
                "param": "OrderItem[0].planName",
                "location": "body"
            },
            {
                "msg": " Must be numeric",
                "param": "OrderItem[0].premium",
                "location": "body"
            },
            {
                "msg": " Must not be empty and with a minimum length of 2 and maximum of 18",
                "param": "OrderItem[0].premium",
                "location": "body"
            },
            {
                "msg": " Must not be empty ",
                "param": "OrderItem[0].lineOfBusiness",
                "location": "body"
            },
            {
                "msg": "Must be an array",
                "param": "address",
                "location": "body"
            }
        ]
    }
}
```
​
​
### <a name="p"></a> `POST` /orders/cancel
​
- POST Cancel order give the orders ID
​
#### Request Path

​

| Query                 | Tags | Field Type               | Length | Description                                                                                                |
|-----------------------|------|--------------------------|--------|------------------------------------------------------------------------------------------------------------|
| orderItem             | body | Object (array of orders) |        | OrderItem Object                                                                                           |
| id                    | body | varchar                  | 50     | Order item id provided by channel/partner/vendor - Optional fill if a particular item will be cancelled    |
| planCode              | body | varchar                  | 20     | plan id - will only be required if id is provided                                                          |
| planName              | body | varchar                  | 50     | plan Name - required if a particular item will be cancelled                                                |
| premium               | body | numeric                  | 18,2   | Premium of each plan availed - required if a particular item will be cancelled                             |
| lineOfBusiness        | body | varchar                  | 20     | line Of Business of the plan - required if a particular item will be cancelled                             |
| reasonForCancellation | body | varchar                  | 500    | reason for cancellation - REQUIRED                                                                         |
| vendor                | body | varchar                  | 100    | Channel Id/Partner Id provided by UBP to InLife - REQUIRED                                                 |​
#### Sample Request
​
{url}/orders/cancel

```json
{
  "OrderItem":[{"id":1}]
}    
```

## <a name="errorresponses"></a> Error Responses
​
#### Error Codes
​

| Status | Code | Description                               |
| ------ | ---- | ----------------------------------------- |
| 422    | ---- | Error while validating request.           |​
#### Sample Error Response
​
```json
{
    "message": "Error while validating request.",
    "errors": {
        "errors": [
            {
                "msg": " Must not be empty",
                "param": "orderId",
                "location": "body"
            },
            {
                "msg": " Must not be empty",
                "param": "reasonForCancellation",
                "location": "body"
            },
            {
                "msg": " Must not be empty",
                "param": "OrderItem[0].planCode",
                "location": "body"
            },
            {
                "msg": " Must not be empty",
                "param": "OrderItem[0].planName",
                "location": "body"
            },
            {
                "msg": " Must be numeric",
                "param": "OrderItem[0].premium",
                "location": "body"
            },
            {
                "msg": " Must not be empty and with a minimum length of 2 and maximum of 18",
                "param": "OrderItem[0].premium",
                "location": "body"
            },
            {
                "msg": " Must not be empty ",
                "param": "OrderItem[0].lineOfBusiness",
                "location": "body"
            }
        ]
    }
}
```
