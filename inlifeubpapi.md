# Overview
​
- API: IL_QNX-API Ver. 1
​
## URLs
​
| Environment | Domain      |
| ----------- | ----------- |
| UAT         | Coming soon |
| Prod        | Coming soon |
​
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
| Method   | Resource                                   | Description                  |
| -------- | ------------------------------------------ | ---------------------------- |
| **GET**  | [`/meter/:meter_id`](#getmeter)            | Get Powerplant records       |
| **GET**  | [`/meter/:meter_id/today`](#getmetertoday) | Get Powerplant records today |
| **POST** | [`/uploader`](#postuploader)               | Post Powerplant records      |
​
### <a name="getmeter"></a> `GET` /meter/:meter_id
​
- Get Plant Records by meter_id
​
#### Request Path
​
| Query    | Tags  | Description                                          |
| -------- | ----- | ---------------------------------------------------- |
| meter_id | query | Meter Data id to get the specific per meter readings |
| page     | query | Current page for Pagination, default is `1`          |
| limit    | query | records Limit for Pagination, default is `50`        |
​
#### Sample Request
​
{url}/meter/7?page=1&limit=2
​
#### Sample Success Response
​
```json
{
  "message": "Success.",
  "data": [
    {
      "id": 5,
      "meter_id": "456",
      "date_stamp": "2019-12-31T16:00:00.000Z",
      "time_stamp": "00:00:00",
      "voltage_l1": 234,
      "voltage_l3": 4543,
      "current_l1": 345,
      "current_l3": 5654,
      "active_energy_import": 567,
      "active_energy_export": 657,
      "reactive_energy_import": 56756,
      "mains_frequency": 567,
      "last_average_power_factor": 567,
      "active_power": 567,
      "reactive_power": 567,
      "quality": "good"
    }
  ]
}
```
​
## <a name="errorresponses"></a> Error Responses
​
#### Error Codes
​
| Status | Code | Description                               |
| ------ | ---- | ----------------------------------------- |
| ---    | 000  | Error message from core/internal systems. |
| 500    | -1   | Internal server error.                    |
​
#### Sample Error Response
​
```json
{
  "id": "dadff877-7ebf-4924-a62c-d16dbacbfc2e",
  "code": -1,
  "message": "Internal server error."
}
```
​
### <a name="getmetertoday"></a> `GET` /meter/:meter_id/today
​
- Get Plant Records by meter_id today
​
#### Request Path
​
| Query    | Tags  | Description                                          |
| -------- | ----- | ---------------------------------------------------- |
| meter_id | query | Meter Data id to get the specific per meter readings |
| page     | query | Current page for Pagination, default is `1`          |
| limit    | query | records Limit for Pagination, default is `50`        |
​
#### Sample Request
​
{url}/meter/7?page=1&limit=2/today
​
#### Sample Success Response
​
```json
{
  "message": "Success.",
  "data": [
    {
      "id": 5,
      "meter_id": "456",
      "date_stamp": "2019-12-31T16:00:00.000Z",
      "time_stamp": "00:00:00",
      "voltage_l1": 234,
      "voltage_l3": 4543,
      "current_l1": 345,
      "current_l3": 5654,
      "active_energy_import": 567,
      "active_energy_export": 657,
      "reactive_energy_import": 56756,
      "mains_frequency": 567,
      "last_average_power_factor": 567,
      "active_power": 567,
      "reactive_power": 567,
      "quality": "good"
    }
  ]
}
```
​
## <a name="errorresponses"></a> Error Responses
​
#### Error Codes
​
| Status | Code | Description                               |
| ------ | ---- | ----------------------------------------- |
| ---    | 000  | Error message from core/internal systems. |
| 500    | -1   | Internal server error.                    |
​
#### Sample Error Response
​
```json
{
  "id": "dadff877-7ebf-4924-a62c-d16dbacbfc2e",
  "code": -1,
  "message": "Internal server error."
}
```
​
### <a name="postuploader"></a> `POST` /uploader
​
- POST Plant Records by uploading sql insert file
​
#### Request Path
​
| Query      | Tags   | Description                                          |
| ---------- | ------ | ---------------------------------------------------- |
| x-client-ip | header | IP of the caller |
| guid   | header  | uuid generated for the specific plant |
| plant_code       | header  | plant_code that matches the guid |
​
#### Sample Request
​
{url}/powerplant/uploader
​
#### Sample Success Response
​
```json
{
  "message": "Success."
}
```
​
## <a name="errorresponses"></a> Error Responses
​
#### Error Codes
​
| Status | Code | Description                               |
| ------ | ---- | ----------------------------------------- |
| ---    | 000  | Error message from core/internal systems. |
| 500    | -1   | Internal server error.                    |
| 422    | -1   | Unprocessable Entity.                     |
​
#### Sample Error Response
​
```json
{
    "id": "c9c8f22f-056d-4bf0-b3e0-64fcd36910af",
    "code": -9,
    "message": "Error while validating request.",
    "data": {
        "errors": [
            {
                "value": "8d148bf6-5ded-419c-ab6c-ce8d3a8fc1a2",
                "msg": "Invalid IP from PLANT PLANT_A",
                "param": "guid",
                "location": "headers"
            }
        ]
    }
}
```