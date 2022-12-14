# ๐ป์น IoT Backend

๋ชจ๋  ๊ณผ์ ์ IntelliJ 2022.2 ๊ธฐ์ค์ผ๋ก ์ค๋ช๋์์ต๋๋ค.



## ๐ ๊ธฐ์ ์คํ ๋ฐ ๋ผ์ด๋ธ๋ฌ๋ฆฌ

| Project         | Version | Description |
| --------------- | ------- | ----------- |
| Java            | 11      |             |
| Spring Boot     | 2.7.1   |             |
| Gradle          |         |             |
| Spring Security | 5.7.2   |             |
| MariaDB         | 10.6.8  |             |

- Dependencies
  - spring-boot-starter-web
  - spring-boot-starter-security
  - spring-boot-starter-oauth2-client
  - spring-boot-starter-oauth2-resource-server
  - jjwt-api:0.11.2
  - mybatis-spring-boot-starter:2.1.2
  - mariadb-java-client:2.1.2
  - lombok
  - springfox-swagger-ui:2.9.2
  - springfox-swagger2:2.9.2
  - spring-security-core:5.7.1



## ๐ฅ ์๋น์ค ์ํคํ์ฒ

![architecture](.\์ง์๊ณต์ \architecture.png)



## ๐ทโโ๏ธ๊ฐ๋ฐ ํ๊ฒฝ ๊ตฌ์ฑ ๋ฐ ๋ฐฐํฌ ๊ณผ์ 

### ํ๋ก์ ํธ ๋ค์ด๋ก๋

1. Gitlab์ ๋ ํฌ์งํ ๋ฆฌ๋ฅผ cloneํฉ๋๋ค.

   ```
   git clone https://lab.ssafy.com/s07-webmobile3-sub2/S07P12D204.git
   ```

2. backendํด๋๋ก ์ด๋ํฉ๋๋ค.

   ```
   cd S07P12D204/backend
   ```

3. gradle ์์กด์ฑ์ ๋ค์๊ณผ ๊ฐ์ด ์ถ๊ฐํฉ๋๋ค.

   ```
   plugins {
   	id 'org.springframework.boot' version '2.7.1'
   	id 'io.spring.dependency-management' version '1.0.11.RELEASE'
   	id 'java'
   }
   
   group = 'com.yodel.imagnaryPlayground'
   version = '0.0.1-SNAPSHOT'
   sourceCompatibility = '11'
   
   configurations {
   	compileOnly {
   		extendsFrom annotationProcessor
   	}
   }
   
   repositories {
   	mavenCentral()
   }
   
   dependencies {
   	// Spring Boot
   	implementation 'org.springframework.boot:spring-boot-starter-web'
       implementation 'org.springframework.boot:spring-boot-starter-security'
   	implementation 'org.springframework.boot:spring-boot-starter-validation'
   	testImplementation 'org.springframework.boot:spring-boot-starter-test'
   
   	// oauth
   	implementation 'org.springframework.boot:spring-boot-starter-oauth2-client'
   	implementation 'org.springframework.boot:spring-boot-starter-oauth2-resource-server'
   
   	// Jwt
   	implementation 'io.jsonwebtoken:jjwt-api:0.11.2'
   	runtimeOnly 'io.jsonwebtoken:jjwt-impl:0.11.2'
   	runtimeOnly 'io.jsonwebtoken:jjwt-jackson:0.11.2'
   
   	// OAuth
   	implementation 'org.mybatis.spring.boot:mybatis-spring-boot-starter:2.1.2'
   	implementation 'org.mariadb.jdbc:mariadb-java-client:2.1.2'
   	compileOnly 'org.projectlombok:lombok'
   	annotationProcessor 'org.projectlombok:lombok'
   
   	// Swagger
   	implementation group: 'io.springfox', name: 'springfox-swagger-ui', version: '2.9.2'
   	implementation group: 'io.springfox', name: 'springfox-swagger2', version: '2.9.2'
   
   	// mail ์ธ์ฆ
   	implementation 'org.springframework.boot:spring-boot-starter-mail'
   
   	// Security
   	implementation group: 'org.springframework.security', name: 'spring-security-core', version: '5.7.1'
   
   	// File upload
   	implementation 'commons-io:commons-io:2.6'
   	implementation group: 'org.json', name: 'json', version: '20220320'
   
   }
   
   tasks.named('test') {
   	useJUnitPlatform()
   }
   ```



### ๋ฐฐํฌ ๊ณผ์ 

ํด๋น ์๋น์ค๋ AWS EC2๋ฅผ ์ด์ฉํ์ฌ ๋ฐฐํฌํ์์ต๋๋ค.

๋ฐฐํฌ๋ฅผ ํ๊ธฐ ์ํด ๋ค์๊ณผ ๊ฐ์ ๋ฐฉ๋ฒ์ผ๋ก ์คํํ์์ต๋๋ค.

1. AWS EC2 ์ธ์คํด์ค ์์ฑ

2. ๊ณต๊ฐํค ๊ธฐ๋ฐ ์ธ์ฆ SSH ์ ์

   ```
   ssh -i "๊ฐ์ธํค ๊ฒฝ๋ก" ubuntu@i7d204.p.ssafy.io

3. Docker + Jenkins ์ค์น

4. Gitlab Webhook ์ค์ 

5. ssl ์ธ์ฆ์ ์ ์ฉ

6. Jenkins pipeline์ ์ด์ฉํ์ฌ ์๋ ๋ฐฐํฌ ๊ตฌ์ถ

7. ๋ฐฑ์๋ Spring boot์ ํ๋ก ํธ์๋ React, Database๋ฅผ docker image๋ก ๋น๋

8. Nginx ํ๊ฒฝ ์ค์ 

   ```
   server {
       listen 80;
       listen [::]:80;
   
   	location / {
   		root /usr/share/nginx/html;
   		index index.html;
   		try_files $uri $uri/ /index.html;
       }
   }
   ```

   

## ๐Routes

```
//AdminController
POST     http://localhost:8080/admin/
DELETE   http://localhost:8080/admin/
GET      http://localhost:8080/admin/lookup/unapproved/{page}
GET      http://localhost:8080/admin/lookup/approved/{page}
GET      http://localhost:8080/admin/lookup/all/{mode}
POST     http://localhost:8080/admin/lookup
POST     http://localhost:8080/admin/user/edit

//AnswerController
POST     http://localhost:8080/answer/
PUT      http://localhost:8080/answer/
POST     http://localhost:8080/answer/delete
GET      http://localhost:8080/answer/detail/{question_id}

//HospitalController
GET      http://localhost:8080/hospital/{value}
GET      http://localhost:8080/lookup/{id}

//QuestionController
POST     http://localhost:8080/question/
PUT      http://localhost:8080/question/
DELETE   http://localhost:8080/question/
POST     http://localhost:8080/question/lookup/all
GET      http://localhost:8080/question/lookup/all
GET      http://localhost:8080/question/lookup/{id}

//TestController
GET      http://localhost:8080/test/

//UserCareController
POST     http://localhost:8080/user/care/
PUT      http://localhost:8080/user/care/
DELETE   http://localhost:8080/user/care/
POST     http://localhost:8080/user/care/lookup/all
POST     http://localhost:8080/user/care/lookup
POST     http://localhost:8080/user/care/data/consult

//UserController
POST     http://localhost:8080/user/register
POST     http://localhost:8080/user/login
GET      http://localhost:8080/user
PUT      http://localhost:8080/user
DELETE   http://localhost:8080/user
POST     http://localhost:8080/user/authEmail/send
POST     http://localhost:8080/user/authEmail/receive
POST     http://localhost:8080/user/token
POST     http://localhost:8080/user/logout
```



## ๐๋๋ ํ ๋ฆฌ ๊ตฌ์กฐ

```
java
โโโ com.yodel.imaginaryPlayground
ย ย   โโโ config
ย ย   โ	โโโ SecurityConfing
    โย ย  โโโ SwaggerConfig
    โ	โโโ WebConfig
    โโโ controller
    โ	โโโ AdminController
    โย ย  โโโ AnswerController
    โ	โโโ BabyController
    โ	โโโ ClovaFaceController
    โ	โโโ ClovaSpeechController
    โ	โโโ HospitalController
    โ	โโโ QuestionController
    โ	โโโ TestController
    โ	โโโ UserCareController
    โ	โโโ UserController
    โโโ mapper
    โ	โโโ AdminMapper
    โ	โโโ AnswerMapper
    โ	โโโ HospitalMapper
    โ	โโโ QuestionMapper
    โ	โโโ UserCareMapper
    โ	โโโ UserMapper
    โโโ model
    โ	โโโ dto
    โ   โย ย  โโโ AnswerDto
    โ   โ	โโโ BabyDto
    โ   โ	โโโ ConsultDto
    โ   โ	โโโ HospitalDto
    โ   โ	โโโ PageDto
    โ   โ	โโโ QuestionDto
    โ   โ	โโโ Role
    โ   โ	โโโ UserDto
    โ	โโโ jwt
    โ   โ	โโโ JwtAuthenticationFilter
    โ   โ	โโโ JwtTokenService
    โ	โโโ oauth
    โ   โ	โโโ OAuth2SuccessHandler
    โ   โ	โโโ OAuthAttributes
    โ	โโโ vo
    โ   โ	โโโ BabyVO
    โ   โ	โโโ EmailCodeVO
    โ   โ	โโโ IdVO
    โ   โ	โโโ PasswordVO
    โโโ Service
    โย ย  โโโ jwt
    โ   โ	โโโ CustomUserDetailService
    โย ย  โโโ oauth
    โ   โ	โโโ CustomOAuth2UserService
    โย ย  โโโ oauth
    โย ย  โโโ AdminService
    โย ย  โโโ AdminServiceImpl
    โย ย  โโโ AnswerService
    โย ย  โโโ AnswerServiceImpl
    โย ย  โโโ EmailService
    โย ย  โโโ EmailServiceImpl
    โย ย  โโโ HospitalService
    โย ย  โโโ HospitalServiceImpl
    โย ย  โโโ QuestionService
    โย ย  โโโ QuestionServiceImpl
    โย ย  โโโ UserCareService
    โย ย  โโโ UserCareServiceImpl
    โย ย  โโโ UserService
    โย ย  โโโ UserServiceImpl
    โโโ ImagnaryPlaygroundApplication
resources
โโโ mappers
		โโโ admin.xml
		โโโ answer.xml
		โโโ hospital.xml
 		โโโ question.xml
		โโโ user.xml
		โโโ usercare.xml
โโโ application-oauth.properties
โโโ application-prod.properties
โโโ application.properties
```

