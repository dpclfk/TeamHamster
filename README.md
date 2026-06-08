# Hamster Market

## Tech Stack

<img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white">
<img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white">
<img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white">
<img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white">
<img src="https://img.shields.io/badge/AWS-232F3E?style=for-the-badge&logo=amazonaws&logoColor=white">
<img src="https://img.shields.io/badge/GitHub Actions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white">

## 햄스터 마켓

- 중개 수수료 없이 택배 기사와 사용자를 직접 연결하고, 포인트 시스템으로 결제 안전성을 확보한 C2C 물류 마켓

## 프로젝트 기간

- 2024.07.05 ~ 2024.08.05 (4주)

## 프로젝트 인원

- 4명 (Backend 1, Frontend 3)

## 프로젝트 목적

- 사용자 맞춤형 서비스 설계: 개발 지식이 없는 일반 사용자(외부 인원)의 니즈를 분석하여, 직관적이고 실용적인 웹 서비스 기획 및 제작
- 기술적 R&D를 통한 역량 고도화: OAuth 2.0 표준 프로토콜 분석 및 TypeScript 기반의 안정적인 백엔드 시스템 구축
- 효율적인 팀 매니징: 팀장으로서 프로젝트 일정 관리 및 기술 의사결정을 주도하며 협업 프로세스 최적화

## 주요 역할

### Project Leader & Backend Developer

- 요구사항 정의서 작성 및 시스템 설계(DB, API) 주도
- 단계별 진척도 관리 및 최종 결과물 검수

## 주요 구현 및 담당 업무

### 보안 및 사용자 편의성 강화

- OAuth 2.0 기반 간편 인증 시스템: 외부 리소스 서버(Google, Kakao 등)로부터 권한을 위임받아 복잡한 절차 없는 사용자 인증 및 회원가입 로직 구현
- TypeScript 정적 타이핑: 엄격한 타입 정의를 통해 런타임 오류를 사전에 차단하고, 코드의 가독성과 유지보수성 향상

### 비즈니스 로직 및 데이터 관리

- 트랜잭션 기반 포인트 시스템: 상품 구매 및 포인트 충전/차감 로직을 구현하여 데이터 무결성 확보
- MongoDB & Mongoose 활용: 대용량 로그 데이터 처리에 최적화된 NoSQL을 도입하여 포인트 내역, 배송 기사 위치 정보 등 비정형 데이터의 효율적 적재 및 조회 구현

### 워터폴 기반 팀 매니지먼트

- 단계별 공정 관리: 기획-설계-개발-테스트로 이어지는 정교한 일정 계획을 수립하고, 팀원 간 업무 분장을 통해 마감 기한 엄수
- 일별 성과 관리: 일일 업무 보고 및 성과 확인을 통해 리스크를 사전에 파악하고 프로젝트의 완성도 제어

## 기술 역량

### Backend Development

- Express.js & TypeScript: 정적 타이핑을 통해 런타임 에러를 최소화하고, 미들웨어 중심의 유연하고 안정적인 백엔드 시스템을 구축합니다.

- Authentication: 세션(Session) 및 OAuth 2.0 프로토콜을 이해하고, 서비스 특성에 맞는 안전한 사용자 인증 및 인가 로직을 구현합니다.

### Database Management

- MySQL (RDB): ERD를 활용한 정밀한 데이터 모델링과 Sequelize ORM 연동을 통해 데이터 무결성을 보장하는 관계형 DB를 설계합니다.

- MongoDB (NoSQL): Mongoose를 활용하여 로그 데이터나 실시간 위치 정보와 같은 비정형 데이터를 효율적으로 처리하는 스키마를 설계하고 관리합니다.

# 구현전 회의록

## 주기능

- 개인판매 가능

## 화폐

- 포인트(돈 대신)는 관리자가 특정유저한테 주는방식

## 어드민 및 택배기사 페이지

- 하위 라우팅 사용
- 어드민 페이지 : 주소창에 루트이후 /admin
- 택배기사 페이지 : 주소창에 루트이후 /delivery

### 어드민 및 택배기사 로그인 및 회원가입

- 일반페이지에서 회원가입을 하면 어드민 페이지에서 관리자가 권한부여 하는방식

- 어드민 및 택배기사 이메일 및 비밀번호
  - 이메일: admin1@admin.com
  - 비밀번호: admin11@

## 개인페이지

- 관리자페이지 : 백엔드 위주로
- 가입시 상점페이지 생김(프로필 느낌으로 1인당 1개의 상점페이지)
  - 여기서 평판 및 판매 등록가능

전체 틀

- 레퍼런스 : 당근, 채팅기능x

필요 스택
구글 맵 api
OAuth 2.0 : 간편로그인 사용

프론트엔드

1. UI 나누기, API - 이동찬
2. react로 페이지 틀(비동기) - 이동찬
   component(동기) 만들기 - 전체(각자 페이지)
3. Ajax : API 요청,응답 받아서 코드 짜오기 - 손민복
4. 모바일크기 변환 - 프로젝트 막바지에 적용(컴포넌트 만든사람이 변환하기)

백엔드

1. DB (mySQL | MongoDB) : ERD그리기 - 이승배
2. SERVER : - 이승배
3. 지도 API - 이정배
4. OAuth 2.0 - 이정배

프론트에서 검색하면 -> 키워드랑 제목 검색

판매글 페이지

- 판매페이지에서 판매자는 구매요청한 당사자에 한해 현재위치 올릴수있게 gps기능으로
- 택배 위치추적 기능
- 신고기능 필수

회원가입할때 mysql user-> id 받아와서 -> mongDB에 id 저장

택배회사

택배기사-> 판매자 집으로 보낸다음 -> 물건을 픽업하면 -> 주소x 물건을 택배회사가 가져왔습니다. -> 택배회사에서 영업소 도착시 위치 gps로 출력
택배비 기본값 2500원이긴한데, 관리자가 수정가능
판매자

구매자

질문 : 택배비 관련은 어떻게? (선불, 착불, 선택 여부, 가격)

- 문제 발생시 문제 발생한쪽에서 추가금 지불, 기본은 구매:판매 = 50:50으로 가격은 미정

택배기사가 판매자의 물건을 회수하면 gps는 언제부터 찍으면 좋을지?

- 물류센터에 들어왔을때 찍고, 그 이후로 구매자한테 도착할때까지 gps
- 판매자 쪽에서도 물건위치 볼수있게

회원가입(유저정보)는 회사가 가지고 있을건지? (OAuth 2.0로 다른 간편로그인 할때도 저장할건지)

포인트 환전은 어떻게?(수수료관련) ex) 10만원 충전하면 10만포인트 할건지?/10만포인트를 환전하면 그대로 10만원 줄건지

- 사업얘기라 신경 x
- 시연할때는 10만원 충전하면 10만포인트 충전하게

구매자가 구매요청시 구매자쪽 바로 포인트차감, 구매자가 구매확인시 판매자에게 포인트지급 하면될지?O

### 직접 생각해볼것

1. 사기친 유저에 관한 대응은 어떻게 할건지?
   사기친경우 사기친 유저 상점페이지 이용금지(구매와 판매글 작성 불가) 및 환전 불가를 적용

2. 검색
   검색시 제목만 검색되게 할 예정
   ex) 판매글 제목이 아이폰 13 중고 판매합니다.
   검색어에 '아이'만 쳐도 아이폰이 나옴(다만 아이용품등이 나올수도있음)
   카테고리내 검색 가능하게 할 예정
   전자제품 카테고리에서 검색할경우 다른 카테고리물건은 검색안됨

# Arcalive Clonecoding

## Tech Stack

<div align="left">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"/>
  <img src="https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=sequelize&logoColor=white"/>
  <img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white">
  <img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white">
  <img src="https://img.shields.io/badge/AWS-232F3E?style=for-the-badge&logo=amazonaws&logoColor=white">
  <img src="https://img.shields.io/badge/GitHub Actions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white">
</div>

## 아카라이브 클론코딩

- 다주제, 다목적 커뮤니티 사이트 ‘아카라이브’의 핵심 기능을 구현한 커뮤니티 플랫폼

## 프로젝트 기간

- 2024.05.20 ~ 2024.06.04 (2주)

## 프로젝트 인원

- 3명 (Backend 1, Frontend 2)

## 프로젝트 목적

- Express.js 기반 백엔드 아키텍처 이해: Node.js 환경에서 Express 프레임워크를 활용해 RESTful API를 설계하고, 서버-데이터베이스 간의 효율적인 연동 프로세스 습득

- 웹 표준 기반 UI 구현: HTML/CSS를 활용하여 사용자 친화적인 웹 화면을 구축하고, 백엔드 데이터와의 동적 바인딩 실습

- 애자일 협업 프로세스 경험: 스프린트 단위의 기능 개발을 통해 변화하는 요구사항에 유연하게 대응하고 팀워크 강화

## 주요 역할

### Backend Developer

- 서비스 핵심 도메인(게시판, 인증) API 설계 및 DB 모델링

- 프론트엔드 팀과의 긴밀한 협업을 통한 API 인터페이스 구축 및 성능 최적화

## 주요 구현 및 담당 업무

### 관계형 데이터베이스(RDB) 설계 및 최적화

- Sequelize ORM 활용: JS 객체와 DB 테이블을 매핑하여 데이터 관리의 생산성을 높이고, 팀원 간의 데이터 접근 방식을 표준화

- ERD 기반 데이터 모델링: 서비스 도메인 간의 관계(1:N, M:N)를 ERD로 시각화하여 데이터 정규화를 수행하고 무결성 확보

### 보안 및 커뮤니티 핵심 기능 구현

- Session 기반 인증 시스템: 서버 측 세션을 통해 사용자 인증 상태를 안전하게 관리하여 보안 안정성 강화

- 상호작용 시스템 구축: 추천/비추천, 계층형 댓글(답글) 기능을 구현하여 사용자 간 활발한 상호작용이 가능한 커뮤니티 비즈니스 로직 완성

### 애자일 기반의 원활한 협업

- API 명세서 관리: 개발 초기 단계에서 API 규격을 정의하여 프론트엔드-백엔드 간 병렬 개발 프로세스를 구축하고, 런타임 오류 사전 방지

- 반복적 기능 고도화: 애자일 방법론에 따라 스프린트 단위로 기능을 개발하고, 팀 피드백을 실시간으로 수용하여 서비스 완성도 향상

## 기술 역량

### Backend Development

Express.js: 미들웨어 구조를 활용한 확장성 있는 RESTful API 서버를 구축합니다.

### Database Management

MySQL (RDB): Sequelize ORM을 활용하여 관계형 데이터의 무결성을 보장하고, 효율적인 데이터 접근 구조를 설계합니다.
