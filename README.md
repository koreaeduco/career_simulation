# 다음 장 · 진로 시뮬레이션 (Career Simulation)

웹 기반 진로 탐색 및 생애 설계 시뮬레이션 게임 프로젝트입니다.  
디자인(CSS)과 로직/데이터(JavaScript)가 표준적인 프로젝트 구조로 명확히 분리되어 있어, 디자이너와 개발자/기획자가 원활하게 공동 작업(협업)할 수 있습니다.

---

## 📁 프로젝트 폴더 구조

```text
career_simulation/
├── index.html              # 🌐 메인 웹 애플리케이션 진입점 (정돈된 HTML)
├── README.md               # 📖 협업 및 프로젝트 가이드 문서
│
├── css/                    # 🎨 디자인 & 퍼블리싱 작업 영역
│   ├── theme-v3.css        # 기본 테마, 컬러 팔레트, 폰트, 공통 베이스 스타일
│   ├── journal-v4.css      # 2컬럼 레이아웃, 반응형 미디어쿼리, 저널 패널
│   ├── experience-v6.css   # 다크 테마 변수, 뱃지, 카드 컴포넌트
│   ├── experience-v7.css   # 여정(타임라인) 패널 및 상태 표시 UI
│   ├── experience-v8.css   # 아바타 프로필 에디터, 재화(돈) 피드백 스타일
│   ├── experience-v13.css  # 상단 플로팅 고정 바 및 저널 아카이브 페이징
│   └── registration-v9.css # 수강신청 패널 및 과목 순서 안내 스타일
│
├── js/                     # ⚙️ 게임 로직 & 데이터 작업 영역
│   │
│   │── [데이터셋 (기획 / 문구 / 통계)]
│   ├── content-v3.js       # 고교 과목 목록, 15개 계열 기초 데이터
│   ├── daily-choices.js    # 일상 속 질문과 3가지 선택지 리스트
│   ├── quiz-v3.js          # 학업/적성 퀴즈 문항 및 정답 데이터
│   ├── events-v3.js        # 학기별 자동 사건 및 활동 신청 상점 항목
│   ├── majors-v4.js        # 75개 전공 학과 목록 및 대학 유형
│   ├── copy-v5.js          # 도서 부제 및 추천 도서 문구
│   ├── role-events-v7.js   # 15개 계열별 역할 사건 카탈로그 (대규모 텍스트)
│   ├── data-v8.js          # '어디가' 실제 대학/학과 데이터, 회복/아바타 아이템
│   ├── career-source-v12.js# '커리어넷' 75개 직업 공식 상세 데이터 (JSON, 169KB)
│   │
│   └── [게임 엔진 & 프로세스 로직]
│       ├── game-v3.js      # 코어 엔진 (게임 루프, 로컬스토리지 저장, 시간 진행)
│       ├── journal-v4.js   # 사건 기록 및 저널 렌더링 로직
│       ├── curriculum-v5.js# 고교학점제 이수 체계 및 과목 플래너 로직
│       ├── careers-v5.js   # 직업 상세 정보 팝업 및 기초 렌더러
│       ├── experience-v6.js# v6 기능 확장 (신규 직업, 추가 퀴즈, 렌더링 파이프라인)
│       ├── experience-v7.js# v7 기능 확장 (계열별 역할 시스템, 실시간 시계)
│       ├── experience-v8.js# v8 기능 확장 (자산/재화 시스템, 아바타 커스텀 에디터)
│       ├── registration-v9.js # v9 기능 확장 (선수과목 이수 체계 감사 및 수강신청)
│       ├── careers-v10.js  # v10 커리어넷 직업 프로필 1단계 연동
│       ├── careers-v11.js  # v11 커리어넷 직업 프로필 2단계 연동
│       ├── careers-v12.js  # v12 커리어넷 최종 연동 및 직업 지도 렌더러
│       └── experience-v13.js # v13 최신 인터랙션 패치 (저널 페이징, 지출 이벤트)
│
├── _backup_original/       # 🔒 리팩토링 전 원본 파일 보관함 (안전 백업)
└── .vscode/
    └── launch.json         # VS Code 디버깅 및 Live Server 연동 설정
```

---

## ❓ 버전별 파일에 대한 안내 (자주 묻는 질문)

> **Q. `v3`, `v5`, `v6` ... `v13` 처럼 여러 버전 파일이 있는데, 실제 웹에서 쓰이는 파일인가요?**
>
> **A. 네, 현재 모든 파일이 100% 실제 웹사이트에서 동작하고 있습니다.**  
> 이 프로젝트는 과거 버전을 삭제하고 대체한 방식이 아니라, **기본 엔진(`game-v3.js`) 위에 상위 버전의 스크립트들이 순차적으로 실행되면서 기능을 점진적으로 가로채고 확장하는 형태(Monkey-Patching / Layering Architecture)**로 개발되었습니다.
>
> - 예: `game-v3.js`의 화면 렌더링 기능을 `experience-v6.js`가 확장하고, 이를 다시 `experience-v7.js`, `experience-v8.js`, `experience-v13.js`가 덧씌워 최종 화면을 만듭니다.
> - 따라서 특정 이전 버전 파일을 "안 쓰는 파일"로 오인하여 지우면 게임 전체가 멈추게 됩니다.
> - `index.html`에 정의된 **스크립트 및 CSS 로드 순서가 절대적으로 유지**되어야 합니다.

---

## 👥 협업 가이드 (역할별 안내)

### 1. 🎨 디자인 / 퍼블리싱 작업자 (CSS)
모든 스타일 파일은 `css/` 폴더에 있으며, 읽기 쉽도록 표준 들여쓰기 및 속성 분리가 완료되어 있습니다.

| 변경하고 싶은 디자인 요소 | 수정할 파일 |
| :--- | :--- |
| 전체 배경색, 기본 폰트, 버튼 스타일, 본문 글자색 | `css/theme-v3.css` |
| 좌우 분할 2컬럼 레이아웃, 모바일/태블릿 반응형 크기 | `css/journal-v4.css` |
| 다크 모드 톤앤매너, 카드 및 배지 디자인 | `css/experience-v6.css` |
| 상단 타임라인/여정 바, 상태 표시창 디자인 | `css/experience-v7.css` |
| 아바타 꾸미기 팝업, 골드/재화 획득 말풍선 | `css/experience-v8.css` |
| 수강신청 모달 창, 선택 과목 카드 스타일 | `css/registration-v9.css` |
| 상단 고정 플로팅 바, 저널 이전/다음 페이지 버튼 | `css/experience-v13.css` |

### 2. 📝 기획 / 텍스트 / 데이터 작업자 (Data JS)
게임에 등장하는 문구, 질문, 직업 통계 등은 `js/` 폴더의 데이터 파일들을 수정합니다.

| 바꾸고 싶은 콘텐츠 내용 | 수정할 파일 |
| :--- | :--- |
| 일상 선택지 문구 및 3개 옵션 내용 | `js/daily-choices.js` |
| 미니게임 퀴즈 문제와 선택지, 정답 | `js/quiz-v3.js` |
| 학기별 이벤트 문구 및 활동 상점 아이템 | `js/events-v3.js` |
| 15개 계열별 역할 상황 및 전용 스토리 | `js/role-events-v7.js` |
| 75개 직업의 실제 커리어넷 공공데이터 정보 | `js/career-source-v12.js` |
| 대학 학과 목록 및 학점 그룹 데이터 | `js/data-v8.js`, `js/majors-v4.js` |

### 3. ⚙️ 개발 / 프로세스 로직 작업자 (Engine JS)
게임 규칙, 수강 신청 알고리즘, 세이브 데이터 등은 아래 파일들을 참고하세요.

| 바꾸고 싶은 시스템 로직 | 수정할 파일 |
| :--- | :--- |
| 게임 턴 진행, 로컬 스토리지 저장 방식 (`localStorage`) | `js/game-v3.js` |
| 수강신청 필수 선수과목 규칙 및 신청 조건 로직 | `js/curriculum-v5.js`, `js/registration-v9.js` |
| 직업 카드 클릭 시 상세 정보 모달 로직 | `js/careers-v12.js` |
| 학기 전환, 지출/체력 회복 및 최근 저널 페이징 로직 | `js/experience-v13.js` |

---

## 🚀 실행 및 배포 방법

### VS Code Live Server로 실행하기 (로컬 확인)
1. VS Code에서 이 폴더(`career_simulation`)를 엽니다.
2. `index.html` 파일을 우클릭한 후 **Open with Live Server**를 클릭합니다. (또는 하단 상태바의 **Go Live** 클릭)
3. 브라우저에서 `http://127.0.0.1:5500/index.html` 주소로 즉시 게임이 실행됩니다.
4. CSS나 JS를 수정하고 `Ctrl + S`로 저장하면 Live Server가 브라우저를 자동으로 새로고침합니다.

### 향후 배포 (GPT 또는 웹 호스팅 배포)
- 이 프로젝트는 **Webpack, Vite, npm build 같은 복잡한 번들러가 전혀 필요 없는 순수 정적 웹 애플리케이션(Vanilla HTML5/CSS3/JS)**입니다.
- 따라서 프로젝트 폴더 전체(`index.html`, `css/`, `js/`)를 그대로:
  - **GitHub Pages**
  - **Vercel** / **Netlify**
  - **AWS S3** / **Firebase Hosting** / **Cloudflare Pages**
  - **GPT 안내에 따른 정적 웹 호스팅 서비스**  
  어디에나 파일 업로드만으로 즉시 전 세계에 배포할 수 있습니다.
- 모든 리소스 참조가 상대 경로(`css/...`, `js/...`)로 완벽하게 구성되어 있어 서브 디렉터리 배포 시에도 경로 깨짐이 발생하지 않습니다.
