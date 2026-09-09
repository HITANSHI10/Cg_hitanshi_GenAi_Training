# Video Game DB CRUD API Test Plan

## Application Overview

Black-box API test plan for https://videogamedb.uk/swagger-ui/index.html. The API exposes GET /api/videogame, POST /api/videogame, GET/PUT/DELETE /api/videogame/{id}, and POST /api/authenticate. The service documentation states it runs in READ ONLY mode, so POST/PUT/DELETE responses must be validated without assuming persistence. The plan covers response status codes, content types, response bodies, authentication, validation, missing resources, and the observed browser-context CORS behavior.

## Test Scenarios

### 1. Video Game DB CRUD API

**Seed:** `tests/seed.spec.ts`

#### 1.1. List all video games returns a JSON array

**File:** `tests/video-game-db/get-list.spec.ts`

**Steps:**
  1. Start from a fresh browser state and open the Swagger UI at https://videogamedb.uk/swagger-ui/index.html.
    - expect: Swagger UI loads successfully and shows the Video Game DB API definition.
  2. Send GET https://videogamedb.uk/api/videogame with Accept: application/json.
    - expect: HTTP status is 200.
    - expect: Content-Type is application/json.
    - expect: The response body is a JSON array of video-game objects.
    - expect: Each returned object contains id, name, releaseDate, reviewScore, category, and rating; the observed seed data includes id 1 Resident Evil 4 and id 10 Grand Theft Auto III.

#### 1.2. Get an existing video game by ID

**File:** `tests/video-game-db/get-by-id.spec.ts`

**Steps:**
  1. Send GET https://videogamedb.uk/api/videogame/1 with Accept: application/json.
    - expect: HTTP status is 200.
    - expect: Content-Type is application/json.
    - expect: The response body is one JSON object with id 1, name Resident Evil 4, releaseDate 2005-10-01 23:59:59, reviewScore 85, category Shooter, and rating Universal.

#### 1.3. Get a missing video game returns a structured 404

**File:** `tests/video-game-db/get-missing.spec.ts`

**Steps:**
  1. Send GET https://videogamedb.uk/api/videogame/999999 with Accept: application/json.
    - expect: HTTP status is 404.
    - expect: Content-Type is application/json.
    - expect: The response body contains timestamp, status 404, error Not Found, and path /api/videogame/999999.

#### 1.4. Authenticate and create a video game

**File:** `tests/video-game-db/post-create.spec.ts`

**Steps:**
  1. Send POST https://videogamedb.uk/api/authenticate with Content-Type application/json and body {"username":"admin","password":"admin"}.
    - expect: HTTP status is 200.
    - expect: Content-Type is application/json.
    - expect: The response contains a non-empty token string.
  2. Send POST https://videogamedb.uk/api/videogame with Bearer token, Content-Type application/json, Accept application/json, and body {"category":"Platform","name":"API Test Game","rating":"Mature","releaseDate":"2024-01-15","reviewScore":85}.
    - expect: HTTP status is 200.
    - expect: The response body is a JSON video-game object.
    - expect: The response echoes name API Test Game, category Platform, rating Mature, releaseDate 2024-01-15, and reviewScore 85; the observed response assigns id 0.
    - expect: Because the service is read-only, a later GET is not required to find this object persisted.

#### 1.5. Reject unauthenticated or invalid create requests

**File:** `tests/video-game-db/post-negative.spec.ts`

**Steps:**
  1. From a fresh state, send POST /api/videogame without a bearer token using a valid JSON body.
    - expect: The request is rejected with an authorization error; the observed browser request returned HTTP 403 with JSON containing timestamp, status 403, error Forbidden, and path /api/videogame.
  2. Send POST /api/videogame with valid authorization but invalid request content, such as a one-character name or missing required fields.
    - expect: HTTP status is 400 according to the OpenAPI contract.
    - expect: The response indicates invalid request content or a duplicate existing video game.

#### 1.6. Update a video game and verify response content

**File:** `tests/video-game-db/put-update.spec.ts`

**Steps:**
  1. Authenticate with admin/admin and send PUT https://videogamedb.uk/api/videogame/1 with Bearer token, Content-Type application/json, and body {"category":"Platform","name":"API Test Game","rating":"Mature","releaseDate":"2024-01-15","reviewScore":85}.
    - expect: In a correctly authorized API client, HTTP status is 200 and the JSON response is the updated video-game object with id 1 and the submitted fields.
    - expect: In the observed Swagger browser context, the call returned HTTP 403 with body Invalid CORS request; record this as a current environment/API defect or access prerequisite rather than treating it as a successful update.
    - expect: Do not assume persistence because the API is documented as read-only.

#### 1.7. Handle update validation and missing IDs

**File:** `tests/video-game-db/put-negative.spec.ts`

**Steps:**
  1. Send PUT /api/videogame/999999 with authorization and an otherwise valid VideoGameRequest body.
    - expect: A correctly authorized request returns HTTP 404 and identifies the video game as not found, per the OpenAPI contract.
    - expect: If run from the same browser context as the inspection, capture the observed 403 authorization/CORS response and its response body before classifying the endpoint as blocked.
  2. Send PUT /api/videogame/1 with authorization and invalid request content, such as a one-character name or omitted required property.
    - expect: HTTP status is 400 and the response indicates invalid request content, per the OpenAPI contract.

#### 1.8. Delete a video game and verify response content

**File:** `tests/video-game-db/delete.spec.ts`

**Steps:**
  1. Authenticate with admin/admin and send DELETE https://videogamedb.uk/api/videogame/1 with Bearer token and Accept application/json.
    - expect: In a correctly authorized API client, HTTP status is 200.
    - expect: The response Content-Type is application/json and the body is a JSON string, per the OpenAPI contract.
    - expect: In the observed Swagger browser context, the call returned HTTP 403 with body Invalid CORS request; record this as a current environment/API defect or access prerequisite.
    - expect: Do not assume deletion persists because the API is documented as read-only.

#### 1.9. Delete a missing video game returns 404

**File:** `tests/video-game-db/delete-missing.spec.ts`

**Steps:**
  1. Send DELETE /api/videogame/999999 with authorization.
    - expect: A correctly authorized request returns HTTP 404 and identifies the video game as not found, per the OpenAPI contract.
    - expect: The observed unauthenticated browser request returned HTTP 403 with JSON containing timestamp, status 403, error Forbidden, and path /api/videogame/999999; capture this access response when authorization is unavailable.
