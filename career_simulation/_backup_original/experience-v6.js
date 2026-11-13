'use strict';
// The next version keeps the existing local save key and routes.
const NEW_JOBS=[
 ['설비 유지관리 담당자|기계의 진동과 온도를 기록하고 고장 징후를 찾는다|설비 점검·부품 교체|기계·안전|학교 설비 점검표 구상|안전 절차와 측정 기록|진동 자료를 비교해 점검 순서를 정한다|제조 현장·설비 관리팀|고장을 예방한다|안전 절차와 긴급 수리에 주의한다|공개 기계 점검 사례 비교','제품 설계 검증원|시제품이 설계 기준을 만족하는지 시험한다|시험 계획·결과 기록|물리·설계|종이 구조물 하중 시험|측정과 보고서 작성|시제품의 힘과 무게를 측정해 설계 기준과 비교한다|제조업 시험실|제품의 안전을 높인다|같은 시험을 반복해 오차를 확인한다|종이 다리의 하중 시험 기록'],
 ['접근성 설계 담당자|시각·청각·운동 특성이 다른 사람도 서비스를 쓰도록 돕는다|화면 검토·사용자 시험|정보·디자인|읽기 쉬운 학교 안내 화면|접근성 기준과 사용자 조사|버튼의 글자 크기와 키보드 이동을 점검한다|웹 서비스팀|더 많은 사람이 서비스를 이용한다|다양한 이용 환경을 시험한다|키보드만으로 웹 화면 사용해 보기','데이터 품질 담당자|데이터의 누락과 오류를 찾고 정리 기준을 만든다|자료 정리·검증|통계·정보|급식 설문 중복 응답 확인|데이터 정제와 기록|같은 사람이 두 번 제출한 설문을 찾아 집계 방식을 고친다|기업 데이터팀|분석 결과의 신뢰를 높인다|작은 입력 오류도 결과에 영향을 준다|가상 설문의 중복값 찾기'],
 ['건축 모형 제작자|도면을 입체 모형으로 만들어 공간을 검토한다|모형 제작·수정|공간·재료|안전한 재료로 쉼터 모형|축척과 안전한 제작|축척에 맞게 건물 모형을 만들고 동선을 확인한다|설계회사·모형 제작실|아이디어를 눈에 보이게 만든다|치수와 일정에 맞춰 수정한다|종이로 축척 모형 만들기','에너지 관리 담당자|건물 에너지 사용량을 비교하고 절감 방안을 찾는다|사용량 분석·설비 점검|수학·환경|교실 전력 사용 비교|자료 해석과 안전|월별 전력량을 비교해 낭비가 많은 시간을 찾는다|건물 관리·에너지 회사|에너지 낭비를 줄인다|날씨와 이용 인원을 함께 고려한다|공개 전력 자료로 그래프 그리기'],
 ['현장 조사 보조원|연구 계획에 따라 자연환경의 측정 자료를 기록한다|현장 관찰·자료 정리|과학·측정|학교 주변 환경 관찰표|안전한 현장 조사|정해진 위치의 기온과 습도를 측정해 기록한다|연구기관·조사팀|연구의 기초 자료를 만든다|날씨와 장소에 따라 관찰 조건이 달라진다|안전한 장소에서 날씨 기록','연구 데이터 관리자|실험 파일의 이름과 조건을 정리해 재현을 돕는다|실험 자료 관리|통계·정보|실험 기록 양식 제작|자료 정리와 출처 표기|조건별 실험 파일을 분류하고 누락된 기록을 찾는다|대학·기업 연구실|다른 연구자가 결과를 확인할 수 있다|작은 기록 오류가 분석을 어렵게 한다|가상 실험 파일명 규칙 만들기'],
 ['병원 서비스 안내 담당자|환자에게 진료 절차와 이용 공간을 안내한다|절차 안내·문의 응대|보건·소통|병원 이용 안내문 만들기|정확한 설명과 개인정보 보호|진료실을 찾는 사람에게 이동 경로를 설명한다|의료기관 안내 부서|처음 방문한 사람의 불안을 덜어준다|건강 정보는 임의로 판단하지 않는다|가상 병원 동선 안내도 만들기','건강 정보 디자이너|검증된 건강 자료를 읽기 쉬운 그림과 글로 바꾼다|자료 확인·시각화|보건·디자인|청소년 수면 카드뉴스|공식 자료 확인|공식 수면 지침을 학생 눈높이 카드로 편집한다|공공 보건 홍보팀|건강 정보를 쉽게 전달한다|과장된 표현이나 잘못된 자료를 피한다|공식 보건 자료로 안내 카드 제작'],
 ['식품 품질관리 담당자|식품의 표시와 제조 기록을 검사한다|기준 확인·검사 기록|화학·식품|식품 표시 비교표|안전과 정확한 기록|제품 표시와 실제 원재료 기록이 같은지 확인한다|식품회사 품질팀|안전한 식품 제공을 돕는다|작은 표기 오류도 확인해야 한다|시중 식품의 공개 표시사항 비교','소비자 연구원|생활용품 사용자의 불편을 조사한다|설문·사용 관찰|생활과학·통계|필통 사용 불편 조사|조사 윤리와 자료 해석|사용자에게 물건을 쓰며 불편했던 순간을 질문한다|기업 조사팀|제품 개선의 근거를 찾는다|적은 의견을 모두의 의견으로 일반화하지 않는다|친구 동의를 받고 사용 경험 묻기'],
 ['농업 데이터 기록원|재배 기록을 모아 작물 관리에 쓰기 쉽게 정리한다|생육 기록·자료 관리|생명·정보|화분 성장 기록표|측정 기준 통일|일별 온도와 식물의 성장을 같은 표에 기록한다|농장·농업 기술팀|재배 계획의 근거를 만든다|계절과 날씨에 따른 차이를 고려한다|화분 성장 사진을 날짜별 기록','생태 안내 기획자|지역 생태 정보를 방문객이 이해할 안내로 만든다|자료 조사·안내 제작|생태·소통|공원 생태 안내판|자연 보호와 자료 확인|산책길의 식물 정보를 확인하고 안내판을 구성한다|공원·환경 교육기관|지역 자연에 대한 관심을 높인다|보호 대상 생물과 출입 규칙을 지킨다|공원의 공개 식물 자료로 설명문 작성'],
 ['전시 그래픽 디자이너|전시의 제목과 설명을 보기 쉬운 시각물로 만든다|글자·동선 설계|미술·소통|학교 작품전 안내판|읽기 쉬운 글자 설계|전시장 안내 지도를 만들고 글자 크기를 시험한다|전시 회사·문화기관|작품을 이해하기 쉽게 돕는다|공간과 예산의 제약을 맞춘다|교내 전시의 안내 표지 설계','사운드 디자이너|영상·게임 장면에 맞는 소리를 제작하고 배치한다|소리 편집·녹음|음악·매체|저작권 없는 소리 편집|소리 편집과 저작권|걸음 소리를 녹음해 다른 장소의 장면에 맞춘다|영상·게임 제작팀|장면의 분위기를 소리로 만든다|소리 크기와 사용 권한을 확인한다|휴대폰으로 생활 소리 녹음·편집'],
 ['스포츠 행사 안전 담당자|행사 전 장소와 동선을 점검하고 비상 절차를 준비한다|안전 계획·현장 점검|체육·안전|학급 경기 안전표|응급 절차와 소통|경기장의 미끄러운 곳과 물 공급 위치를 점검한다|체육 행사 조직|참여자가 안전하게 활동한다|돌발 상황에 침착하게 대응한다|학교 체육대회 안전 체크리스트','생활체육 운영 담당자|지역 주민의 수준에 맞는 운동 프로그램을 운영한다|참여자 조사·일정 관리|체육·기획|주말 걷기 모임 계획|안전과 운영|처음 참가하는 사람의 활동 수준을 묻고 시간을 조정한다|지역 체육시설|다양한 사람이 운동을 시작하도록 돕는다|연령과 경험 차이를 고려한다|걷기 모임의 일정과 안내문 작성'],
 ['학습 자료 편집자|교재 설명과 문제의 난이도를 확인해 고친다|원고 검토·문제 수정|국어·교육|어려운 설명 고쳐 쓰기|정확한 설명과 교정|문제의 조건이 빠졌는지 확인하고 문장을 고친다|교육 출판사|더 쉬운 배움을 돕는다|오탈자와 모호한 표현을 꼼꼼히 찾는다|친구의 허락을 받아 설명문 다듬기','교육 행사 코디네이터|강사·학생·장소의 일정을 맞추고 행사를 진행한다|일정·참여 안내|교육·소통|진로 체험 일정표|운영과 안내|강사의 도착 시간과 교실 배치를 확인한다|학교·교육기관|배움의 기회를 연결한다|일정 변경에 신속히 대응한다|가상 진로의 날 시간표 작성'],
 ['지역 데이터 조사원|지역의 이동·생활 자료를 모아 지도에 표시한다|자료 수집·지도 작성|사회·통계|학교 주변 이동 지도|자료 출처와 개인정보|횡단보도와 버스 정류장의 위치를 기록한다|조사 회사·공공 프로젝트팀|동네 개선에 쓸 자료를 만든다|위치와 개인정보를 조심해 다룬다|공개 지도에 통학 불편 표시','시민 참여 프로그램 운영자|주민 의견을 듣는 모임을 준비하고 결과를 정리한다|의견 수렴·행사 운영|사회·소통|학교 의견 모임 진행|중립적인 질문과 기록|서로 다른 의견을 분류해 회의록으로 정리한다|지역사회 기관|더 많은 의견이 정책에 반영되도록 돕는다|목소리가 큰 사람에게만 치우치지 않는다|학급 의견 수렴 질문지 작성'],
 ['행정 문서 편집 담당자|신청서와 안내문의 복잡한 문장을 쉽게 고친다|문서 검토·양식 설계|국어·행정|학교 안내문 간소화|정확한 절차와 쉬운 표현|신청서의 어려운 용어를 풀이하고 제출 순서를 정리한다|기관 행정부서|필요한 서비스를 찾기 쉽게 돕는다|내용을 쉽게 쓰면서 규정은 지킨다|복잡한 가상 신청서 다시 쓰기','공공 기록 분류원|정해진 기준에 따라 기관 자료를 분류하고 보관한다|문서 분류·보존|정보·사회|가상 자료 분류표|기록 관리와 보안|문서의 작성일과 종류를 확인해 저장 위치를 정한다|공공기관 기록 부서|필요한 기록을 제때 찾도록 돕는다|공개 범위와 보관 기한을 확인한다|공개 자료의 분류 기준 설계'],
 ['온라인 상점 운영 담당자|상품 설명과 주문·재고 정보를 관리한다|상품 등록·주문 확인|경제·정보|가상 상점 상품 페이지|가격·소비자 안내|재고가 없는 상품을 표시하고 주문 문의에 답한다|전자상거래 회사|상품을 필요한 사람에게 연결한다|정확한 가격과 배송 정보를 유지한다|가상 상품의 설명과 재고표 작성','시장 조사 보조원|경쟁 상품의 특징과 가격을 표로 비교한다|시장 자료 수집|경제·통계|상품 가격 비교표|표본과 자료 검증|비슷한 상품의 가격·구성·고객층을 비교한다|기업 기획팀|사업 판단의 기초를 제공한다|오래된 가격 정보를 걸러낸다|공개 상품 정보를 표로 정리'],
 ['문화유산 안내 작가|공개 자료를 바탕으로 유산의 이야기를 짧게 쓴다|자료 조사·해설 작성|역사·글쓰기|지역 문화유산 소개 카드|출처와 쉬운 설명|유산의 제작 시기와 쓰임을 확인해 해설을 고친다|문화기관·전시팀|지역의 기록을 사람들에게 전한다|추측과 검증된 사실을 구분한다|공식 자료로 1분 해설문 작성','구술 기록 정리 담당자|인터뷰 동의를 받고 음성 내용을 기록으로 정리한다|인터뷰·전사|역사·언어|동의받은 이야기 기록|기록 윤리와 정확성|말한 사람의 허락 범위를 확인하고 대화를 글로 옮긴다|기록관·연구팀|잊히는 경험을 보존한다|개인정보와 표현의 뜻을 정확히 다룬다|가족에게 허락받아 짧은 인터뷰 요약'],
 ['게임 대사 편집자|캐릭터 말투와 이야기 흐름이 일관되도록 문장을 고친다|대사 검토·수정|문학·게임|짧은 게임 대사 쓰기|문맥과 협업|캐릭터 설정과 맞지 않는 대사를 찾아 다시 쓴다|게임 콘텐츠팀|이야기에 생동감을 더한다|글자 수와 화면 공간의 제약을 맞춘다|같은 상황의 대사 세 가지 쓰기','다국어 안내문 검토자|번역된 안내가 읽기 쉬운지 비교하고 고친다|문장 비교·교정|언어·문화|두 언어 안내문 비교|언어 학습과 문화 이해|버튼과 경고 문구가 같은 행동을 안내하는지 확인한다|서비스 현지화팀|다른 언어 사용자도 같은 정보를 얻는다|짧은 문구에서도 뜻을 정확히 맞춘다|무료 공개 안내문을 두 언어로 비교']
];
NEW_JOBS.forEach((pair,f)=>pair.forEach((row,k)=>{const [name,work,day,learn,project,prepare,task,place,reward,hard,tryIt]=row.split('|');const index=k+5;JOBS.push({id:f+'-'+index,field:f,index,name,work,day,learn,project,prepare,qualified:false,icon:FIELD_ICONS[f]});CAREER_DETAILS[f].push([task,place,reward,hard,tryIt].join('|'));}));
const MORE_QUIZ=[
 ['사회','학교 앞 횡단보도를 늘려 달라는 제안이 나왔습니다. 결정을 내리기 전에 가장 먼저 확인할 자료는 무엇일까요?',['친구 한 명의 느낌','보행량과 사고 기록','포스터 색상','다른 도시의 별명'],1,'이용 규모와 사고 자료를 확인해야 필요성을 판단할 수 있어요.'],
 ['사회','한 학급의 30명 중 12명이 버스를 이용합니다. 이 학급의 버스 이용 비율은 얼마인가요?',['30%','40%','50%','60%'],1,'12÷30=0.4이므로 40%예요.'],
 ['사회','설문에 응답한 사람이 모두 축구부라면 학교 전체의 운동 선호도를 알기 어려운 까닭은?',['질문이 짧아서','응답 집단이 한쪽으로 치우쳐서','숫자가 많아서','응답 시간이 빨라서'],1,'한 집단만 조사하면 전체 학생의 생각을 대표하기 어려워요.'],
 ['과학','같은 식물 두 개에 주는 빛의 양만 바꾸어 성장 차이를 조사합니다. 일정하게 유지해야 할 조건은?',['물의 양과 식물 종류','빛의 양','관찰 결과','성장 차이'],0,'빛 외의 조건이 같아야 성장 차이를 빛과 연결해 살펴볼 수 있어요.'],
 ['과학','차가운 컵 바깥에 물방울이 생겼습니다. 가장 알맞은 설명은?',['컵이 녹았다','공기 중 수증기가 액체로 변했다','컵 속 물이 순간이동했다','공기가 고체가 되었다'],1,'공기 중 수증기가 차가운 표면에서 응결한 거예요.'],
 ['과학','두 물체의 질량이 같고 한 물체만 더 빠르게 움직일 때 운동 에너지가 더 큰 것은?',['느린 물체','빠른 물체','항상 같다','알 수 없다'],1,'질량이 같다면 속도가 빠른 물체의 운동 에너지가 더 커요.'],
 ['영어','도서관 안내문 “The library closes at 6 p.m.”의 뜻은?',['오전 6시에 연다','오후 6시에 문을 닫는다','6시간 동안 연다','6권을 빌릴 수 있다'],1,'closes at 6 p.m.은 오후 6시에 닫는다는 뜻이에요.'],
 ['영어','“Please return the book by Friday.”를 읽고 해야 할 행동은?',['금요일까지 책을 돌려준다','금요일에 책을 산다','책을 금요일에 읽기 시작한다','금요일에 도서관을 닫는다'],0,'return은 돌려주다, by Friday는 금요일까지라는 뜻이에요.'],
 ['영어','“I missed the bus, so I was late.”에서 늦은 이유는?',['버스가 빨라서','버스를 놓쳐서','길이 짧아서','일찍 일어나서'],1,'missed the bus는 버스를 놓쳤다는 뜻이에요.'],
 ['국어','“참가 학생은 12명이다”라는 주장과 “신청서는 12장 접수됐다”는 자료 사이에 더 확인할 것은?',['신청서의 색','한 학생의 중복 신청 여부','교실 벽의 색','신청서 글꼴'],1,'신청서 수와 서로 다른 참가 학생 수가 같으려면 중복 신청 여부를 확인해야 해요.'],
 ['국어','“무료”라는 광고를 보고 신청했는데 재료비를 받습니다. 안내문에 가장 먼저 추가해야 할 정보는?',['광고의 배경색','재료비 금액과 부과 조건','담당자의 취미','행사의 별명'],1,'참여자가 비용을 예상할 수 있도록 금액과 조건을 밝혀야 해요.'],
 ['국어','다음 중 조사 결과를 과장하지 않은 문장은? “학생 20명을 조사했고 12명이 도서관을 좋아했다.”',['모든 학생이 도서관을 좋아한다','조사한 20명 중 12명이 도서관을 좋아했다','학교 학생 대부분이 매일 간다','도서관을 싫어하는 학생은 없다'],1,'자료가 말해 주는 범위인 조사 대상 20명과 응답 12명을 그대로 밝혀야 해요.']
];
MORE_QUIZ.forEach(([category,question,options,answer,explanation])=>QUIZ.push({id:QUIZ.length,difficulty:'m',category,question,options,answer,explanation}));
const oldChooseField=chooseField;
chooseField=function(f){oldChooseField(f);[3,4].forEach(i=>unlock(f,i));};
if(s.field!=null){[3,4].forEach(i=>unlock(s.field,i));save();}
const oldStartExam=startExam;
startExam=function(){const math=shuffle(QUIZ.filter(q=>!q.category)).slice(0,2);const others=['사회','과학','영어','국어'].map(category=>shuffle(QUIZ.filter(q=>q.category===category))[0]);s.exam={ids:[...math,...others].map(q=>q.id),answers:[],score:100,review:false};s.phase='exam';};
function chanceLabel(rate){return rate>=65?'높은 편':rate>=40?'보통':'낮은 편';}
function decoratedInfo(info){return String(info).replace(/(성공|성과) 가능성\s*(\d+)%/g,(_,name,n)=>`${name} 가능성 ${chanceLabel(+n)}`).replace(/(탐색 의욕|학업 준비도|계열 준비도|활동 역량|컨디션|관심|공부|준비|경험|균형)\s*([+−-])(\d+)/g,(_,name,sign,n)=>`<span class="effect ${sign==='+'?'gain':'loss'}">${name} ${sign}${n}</span>`);}
const oldCard=card;
card=function(title,info,action,value,ico,extra){return oldCard(title,decoratedInfo(info),action,value,ico,extra);};
const oldMakeEvent=makeEvent;
makeEvent=function(){const e=oldMakeEvent();if(e.id.startsWith('field')){const rate=e.options[0].risk;e.options[0].delta=[1,0,12,8,-8];e.options[0].info=`성과 가능성 ${chanceLabel(rate)} · 성과를 내면 계열 준비도 +12·활동 역량 +8·컨디션 −8 · 미완료하면 계열 준비도 +1·컨디션 −5`;e.options[1].delta=[1,4,3,0,1];e.options[1].info='시간을 들여 사례를 읽고 학업 준비도 +4·계열 준비도 +3·컨디션 +1';e.options[2].delta=[1,0,1,5,2];e.options[2].info='협업하며 활동 역량 +5·컨디션 +2·관련 직업 정보 추가';}else{const source=LIFE_CHOICES.find(x=>x[0]===e.id);if(source){e.options=e.options.map((o,i)=>{const d=[...o.delta];if(i===0){const best=d.findIndex((x,j)=>j!==4&&x>0);if(best>=0)d[best]+=2;d[4]=Math.min(d[4]-2,-3);}if(i===1){d[4]=Math.max(d[4],1);}if(i===2){d[3]+=2;d[4]+=2;}return {...o,delta:d,info:source[4][i][1]+' '+effects(d)};});}}return e;};
const oldChange=change;
change=function(delta,f=s.field){const before=[...s.stats],oldPrep=f==null?0:s.prep[f];oldChange(delta,f);s.lastDelta=delta.map((_,i)=>i===2?(f==null?0:s.prep[f]-oldPrep):s.stats[i]-before[i]);s.lastDeltaField=f;};
function deltaBadge(i){const v=s.lastDelta?.[i]||0;if(!v||i===2&&s.lastDeltaField!==s.field)return '';return `<span class="stat-delta ${v>0?'gain':'loss'}">${v>0?'+':''}${v}</span>`;}
const oldRender=render;
render=function(){oldRender();let statIndex=0;$('sidebar').innerHTML=$('sidebar').innerHTML.replace(/(<div class="stat"><span>[^<]+<\/span><strong>[^<]+<\/strong>)/g,(part)=>part+deltaBadge([0,1,3,4][statIndex++]));$('careerSection').innerHTML=$('careerSection').innerHTML.replace(/계열 선택으로 세 직업이 열립니다/g,'계열 선택으로 다섯 직업이 열립니다').replace(/(\d+)\/5/g,'$1/7');$('choiceContent').innerHTML=$('choiceContent').innerHTML.replace(/계열별 직업3개는 바로 열리고/g,'계열별 직업5개는 바로 열리고');if(document.body&&s.field!=null)document.body.dataset.fieldGroup=FIELDS[s.field][0];};
const oldResolveDailyChoice=resolveDailyChoice;
resolveDailyChoice=function(index){oldResolveDailyChoice(index);if(s.phase==='feedback'&&s.pending?.outcome==='failure'){s.pending.title='이번에는 목표를 마치지 못했어요';s.pending.text=s.pending.text.replace('도전 실패','미완료');if(s.logs[0])s.logs[0].title=s.logs[0].title.replace('도전 실패','활동 미완료');save();render();}};
const oldRenderStory=renderStory;
renderStory=function(){if(s.phase==='ambient'&&s.pending){$('content').innerHTML=`<section class="panel story-card ambient-story"><span class="badge">오늘의 일상 · 확인하기</span>${intro(s.pending.title,s.pending.text)}<p class="effects-line">${decoratedInfo(s.pending.effectText||'')}</p>${button('ackAmbient','기록을 확인하고 계속','','primary')}</section>`;return;}oldRenderStory();$('content').innerHTML=$('content').innerHTML.replace('>실패</div>','>이번에는 미완료</div>').replace(/(<h2 class="question">)/,'<p class="badge">영역: '+(QUIZ[s.exam?.ids?.[s.exam.answers.length]||0]?.category||'수리·논리')+'</p>$1');if(['event','major'].includes(s.phase)&&s.stats[4]<8)$('content').innerHTML+=`<div class="recovery-notice"><strong>컨디션 ${Math.round(s.stats[4])}점</strong><p>지금 할 수 없는 선택이 있다면 한 달 쉬고 다시 결정할 수 있어요.</p>${button('recover','한 달 쉬고 컨디션 +12','','primary')}</div>`;};
const oldAutoEvent=autoEvent;
autoEvent=function(){oldAutoEvent();const last=s.logs[0];if(!last)return;s.pending={title:last.title,text:last.detail,effectText:last.detail.replace(/^.*?((?:탐색 의욕|학업 준비도|계열 준비도|활동 역량|컨디션|준비|경험|균형|관심|공부)\s*[+−-]\d+.*)$/,'$1')};s.phase='ambient';};
function canSpendCondition(delta){return !delta||!Number.isFinite(delta[4])||s.stats[4]+delta[4]>=0;}
function timetable(){if(!Array.isArray(s.schedule))s.schedule=[...(s.subjects||[]).slice(0,3),...Array(Math.max(0,6-(s.subjects||[]).length)).fill(null)].slice(0,6);return `<div class="timetable">${[0,1].map(term=>`<section><h3>고2 ${term+1}학기</h3><div class="term-slots">${[0,1,2].map(slot=>{const index=term*3+slot,id=s.schedule[index],course=SUBJECTS[id];return `<button class="term-slot ${s.activeCourseSlot===index?'active':''} ${course?'filled':''}" data-action="courseSlot" data-value="${index}"><small>선택 ${slot+1}</small><strong>${course?course.name:'과목 선택'}</strong><small>${course?course.type:'아직 비어 있어요'}</small></button>`;}).join('')}</div></section>`).join('')}</div>`;}
renderCoursePlanner=function(){timetable();const filled=s.schedule.filter(Number.isInteger).length;return `<section class="panel story-card"><span class="badge">핵심 선택 · 고2 실제 과목명 활용</span><h1>두 학기 시간표 만들기</h1><p>각 학기 선택과목 3개씩 고르세요. 같은 과목은 한 번만 넣을 수 있습니다. 이 시간표는 탐색용 예시이며 실제 개설 과목과 이수·학과별 전형 요건은 학교와 희망 학과 모집요강을 반드시 확인해야 합니다.</p><div class="notice">${COURSE_RULE_NOTICE}<br>${link(SOURCES.subjects,'교육청 과목 안내')}</div>${majorPicker()}${courseSummary(true)}<h2>나의 선택과목 시간표 · ${filled}/6</h2>${timetable()}<p class="tiny">시간표 칸을 먼저 고른 뒤 아래에서 과목을 누르세요. 핵심 기초가 부족하면 지원 점수가 낮아지고 보충 전 지원이 제한될 수 있어요.</p><label class="course-search-label" for="courseSearch">과목 찾기 <input id="courseSearch" type="search" placeholder="예: 미적분, 생명과학, 경제"></label><div class="subject-grid">${SUBJECTS.map(c=>`<button class="subject ${s.schedule.includes(c.id)?'selected':''}" data-action="coursePick" data-value="${c.id}" data-name="${esc(c.name)}"><span><strong>${s.schedule.includes(c.id)?'✓ ':''}${c.name}</strong><small>${c.type} 선택 · ${courseAreas().filter(a=>a.ids.includes(c.id)).map(a=>a.name).join(' · ')||'다른 분야 탐색'}</small><small>${c.desc}</small></span></button>`).join('')}</div>${s.schedule[s.activeCourseSlot]!=null?button('courseClear','현재 칸 비우기',s.activeCourseSlot):''}${button('subjects','시간표 결과 확인','','primary')}</section>`;};
const oldCurriculumAction=curriculumAction;
curriculumAction=function(action,value){if(action==='courseSlot'){timetable();s.activeCourseSlot=+value;save();render();return true;}if(action==='coursePick'){timetable();const id=+value;if(!SUBJECTS[id])return true;if(s.schedule.includes(id)){toast('같은 과목은 두 번 선택할 수 없어요.');return true;}s.schedule[s.activeCourseSlot??s.schedule.findIndex(x=>x==null)]=id;s.subjects=s.schedule.filter(Number.isInteger);s.activeCourseSlot=s.schedule.findIndex(x=>x==null);if(s.activeCourseSlot<0)s.activeCourseSlot=5;save();render();return true;}if(action==='courseClear'){timetable();const slot=+value;if(slot>=0&&slot<6){s.schedule[slot]=null;s.subjects=s.schedule.filter(Number.isInteger);s.activeCourseSlot=slot;save();render();}return true;}if(action==='subjects'&&s.stage==='subjects'){timetable();if(s.schedule.some(x=>x==null)){toast('두 학기 시간표의 6칸을 채워 주세요.');return true;}openDialog(`<h1>이 시간표로 결정할까요?</h1>${timetable()}${courseSummary(true)}<p>과목 부족에 따른 불이익은 게임 규칙입니다. 실제 진학 조건은 희망 학과 모집요강을 확인해 주세요.</p>${button('courseConfirm','과목 준비 결과를 확인하고 확정','','primary')}${button('close','다시 고르기')}`);return true;}if(action==='courseConfirm'&&s.stage==='subjects'){timetable();if(s.schedule.some(x=>x==null))return true;s.curriculumVersion=2;s.courseTarget={field:s.field,major:s.majorChoice??0};const a=courseAudit(),n=3-a.missing.length;closeDialog();finishChoice('고2 선택과목 시간표를 확정했어요',`${s.schedule.map(id=>SUBJECTS[id].name).join(' · ')}. ${selectedMajor().name}: 준비 영역 ${n}/3, 지원 점수 −${a.penalty}점${a.blocked?', 핵심 기초 보충 전 지원 제한':''}.`,[1,4+n,4+6*n,2,-3]);return true;}return oldCurriculumAction(action,value);};
const oldCourseSummary=courseSummary;
courseSummary=function(preview=false){const summary=oldCourseSummary(preview);return !preview&&s.curriculumVersion===2&&Array.isArray(s.schedule)?timetable()+summary:summary;};
document.addEventListener('input',event=>{if(event.target?.id!=='courseSearch')return;const query=event.target.value.trim().toLocaleLowerCase('ko');document.querySelectorAll('.subject-grid .subject').forEach(el=>el.hidden=!el.dataset.name?.toLocaleLowerCase('ko').includes(query));});
const oldDispatch=dispatch;
dispatch=function(action,value){if(action==='ackAmbient'&&s.phase==='ambient'){s.pending=null;s.phase='gap';save();render();return;}if(action==='recover'){s.stats[4]=clamp(s.stats[4]+12);s.month+=1;s.extraMonths+=1;s.queue=s.queue.map(q=>[q[0],q[1]+1]);log('한 달 동안 컨디션 회복','선택을 잠시 미루고 쉬며 컨디션을 회복했어요. 컨디션 +12 · 추가 1개월','choice');save();render();return;}let delta=null;if(action==='event')delta=s.pending?.options?.[+value]?.delta;if(action==='activity')delta=[[-5,-5,-5,-5,-8],[1,1,7,6,-5],[3,0,3,8,-4]][+value];if(action==='book')delta=[[4,1,5,0,0],[1,1,7,2,-3],[5,3,1,0,0]][+value];if(action==='generic')delta={deep:[0,6,3,0,-5],steady:[0,4,1,0,4],project:[2,2,10,7,-5],team:[4,1,5,9,-4],portfolio:[1,0,7,6,-4],training:[0,3,20,10,-6]}[value];if(action==='study')delta={self:[0,7,2,0,-4],academy:[0,14,3,0,-8],group:[1,5,2,3,-2]}[value];if(action==='campusClub')delta={major:[1,0,6,3,-2],arts:[4,0,0,5,3],volunteer:[2,0,2,6,0]}[value];if(delta&&!canSpendCondition(delta)){toast('컨디션이 부족해요. 한 달 쉬고 다시 선택할 수 있어요.');return;}const courseScroll=$('choiceDialog')?.scrollTop||0,gridScroll=document.querySelector('.subject-grid')?.scrollTop||0;oldDispatch(action,value);if(['courseToggle','courseSlot','coursePick','courseClear','pickMajor'].includes(action)){if($('choiceDialog'))$('choiceDialog').scrollTop=courseScroll;const grid=document.querySelector('.subject-grid');if(grid)grid.scrollTop=gridScroll;}if(action==='activity'&&s.phase==='feedback'&&s.pending?.outcome==='failure'){s.pending.title='이번에는 입상하지 못했어요';if(s.logs[0])s.logs[0].title='교내 탐구 대회 · 미입상';save();render();}if(action==='generic'&&['project','team'].includes(value)&&s.field!=null){unlock(s.field,6);save();render();}};
// Guard the planner after commitment, including stale buttons in an open dialog.
const plannerActionV6=curriculumAction;
curriculumAction=function(action,value){
 const actions=['courseSlot','coursePick','courseClear','courseToggle','subjects','courseConfirm'];
 if(!actions.includes(action))return plannerActionV6(action,value);
 if(s.stage!=='subjects'||s.phase!=='major')return true;
 if($('dialog').open&&['courseSlot','coursePick','courseClear'].includes(action))return true;
 if(action==='courseToggle')return true;
 if(action==='courseSlot'&&(!Number.isInteger(+value)||+value<0||+value>5))return true;
 if(action==='coursePick'&&(!Number.isInteger(+value)||!SUBJECTS[+value]))return true;
 return plannerActionV6(action,value);
};
const timetableV6=timetable;
timetable=function(){
 if(!Array.isArray(s.schedule)){
  s.schedule=Array(6).fill(null);
  (s.subjects||[]).slice(0,6).forEach((id,i)=>{if(Number.isInteger(id)&&SUBJECTS[id])s.schedule[i]=id;});
 }
 if(!Number.isInteger(s.activeCourseSlot)||s.activeCourseSlot<0||s.activeCourseSlot>5)s.activeCourseSlot=Math.max(0,s.schedule.findIndex(x=>x==null));
 const editable=s.stage==='subjects'&&s.phase==='major'&&!$('dialog').open;
 return timetableV6().replace(/data-action="courseSlot"/g,editable?'data-action="courseSlot"':'disabled aria-label="확정된 과목"');
};
// Every field has five immediately available careers and two attainable discoveries.
const eventV6=makeEvent;
makeEvent=function(){
 const e=eventV6();
 if(e.id.startsWith('field')){
  e.options[2].unlock=5;
  e.options[2].info=effects(e.options[2].delta)+' · '+(s.unlocks.includes(s.field+'-5')?'직업 정보 복습':'새 직업: '+JOBS.find(j=>j.id===s.field+'-5').name);
  e.options[1].info=effects(e.options[1].delta)+' · 결과 추첨 없이 기초를 다져요.';
 }
 return e;
};
const examProfiles={
 balanced:{name:'영역 골고루',detail:'국어·수리·영어·사회·과학을 모두 경험해요.',areas:['국어','수리','영어','사회','과학','수리']},
 society:{name:'사회·언어 탐구',detail:'국어 2 · 사회 2 · 영어 1 · 수리 1문항',areas:['국어','사회','영어','수리','국어','사회']},
 science:{name:'과학·수리 탐구',detail:'과학 2 · 수리 2 · 국어 1 · 영어 1문항',areas:['과학','수리','국어','영어','과학','수리']}
};
[
 ['사회','시청이 버스 이용 만족도를 조사합니다. 출근 시간 버스 승객 100명만 조사했을 때 가장 타당한 해석은?',['모든 시민의 만족도다','출근 시간 승객의 의견이며 다른 시간·비이용자 조사도 필요하다','100명이므로 편향이 없다','응답이 많으면 질문 내용은 무관하다'],1,'표본의 크기뿐 아니라 누가 조사에 포함됐는지도 확인해야 해요.'],
 ['사회','A 가게는 2개 묶음에 6,000원, B 가게는 개당 3,500원이며 2개 구매 시 총액의 20%를 할인합니다. 같은 물건 2개를 살 때 더 저렴한 곳과 차액은?',['A, 400원','B, 400원','B, 1,000원','같다'],1,'B는 7,000×0.8=5,600원. A의 6,000원보다 400원 저렴해요.'],
 ['사회','공원 예산으로 도서관 또는 체육관 중 하나만 지을 수 있습니다. 도서관을 선택할 때 포기한 최선의 대안은?',['이미 쓴 설계비','체육관에서 얻을 수 있었던 편익','모든 도시 예산','도서관 방문자 수'],1,'선택으로 포기한 가장 가치 있는 대안이 기회비용을 이해하는 핵심이에요.'],
 ['과학','보온병 A·B의 성능을 비교하려고 합니다. 어떤 실험이 가장 공정할까요?',['A에 뜨거운 물, B에 찬물','같은 양·같은 온도의 물을 넣고 같은 환경에서 같은 시간 후 온도를 비교','A만 뚜껑을 열기','서로 다른 날 창밖에 두기'],1,'물의 양·초기 온도·환경·측정 시간을 같게 해야 보온병의 차이를 비교할 수 있어요.'],
 ['과학','같은 거리에서 세 번 측정한 시간은 10초, 10초, 25초입니다. 마지막 측정 때 타이머를 늦게 멈췄다면 다음 행동으로 가장 적절한 것은?',['25초를 몰래 삭제한다','세 값 중 가장 작은 값만 쓴다','측정 오류를 기록하고 같은 조건에서 다시 측정한다','무조건 평균만 발표한다'],2,'이상한 값을 임의로 없애기보다 오류의 이유를 기록하고 재측정해야 해요.'],
 ['과학','밀폐 용기 속 얼음이 모두 녹았습니다. 용기 밖으로 물질이 나가지 않았다면 녹기 전후 전체 질량은?',['줄어든다','늘어난다','같다','얼음 모양에 달렸다'],2,'상태가 바뀌어도 닫힌 계 안에서 물질이 출입하지 않으면 전체 질량은 같아요.'],
 ['영어','안내문: “The workshop starts at 2 p.m. Please arrive 15 minutes early.” 참가자가 도착해야 하는 시각은?',['오후 1시 45분','오후 2시','오후 2시 15분','오전 1시 45분'],0,'오후 2시보다 15분 먼저이므로 오후 1시 45분이에요.'],
 ['영어','“You may borrow three books, but you must return them within two weeks.” 안내에 맞는 행동은?',['책 네 권을 빌린다','빌린 책을 3주 뒤 돌려준다','책 세 권을 빌리고 2주 안에 돌려준다','책을 반드시 세 권 빌린다'],2,'may는 허용, must는 의무예요. 최대 세 권을 빌릴 수 있고 2주 안에 돌려줘야 해요.'],
 ['영어','“The outdoor concert will move indoors if it rains.” 비가 올 때 공연은 어떻게 될까요?',['취소된다','실내로 장소를 옮긴다','반드시 다음 주에 열린다','야외에서 계속한다'],1,'if it rains는 비가 오면, move indoors는 실내로 옮긴다는 뜻이에요.'],
 ['국어','“지난달보다 대출 건수가 20% 늘었다. 따라서 모든 학생이 독서를 좋아하게 됐다.” 이 주장에 대한 타당한 지적은?',['수치가 있으므로 항상 옳다','대출 증가만으로 모든 학생의 취향 변화를 단정할 수 없다','대출 건수는 셀 수 없다','독서 취향은 누구나 같다'],1,'행동의 총량과 학생 모두의 취향은 다른 정보예요. 근거가 뒷받침하는 범위를 넘어섰어요.'],
 ['국어','공지: “동아리 신청은 금요일 오후 5시까지이며, 정원을 넘으면 추첨합니다.” 신청자가 알아야 할 내용과 일치하는 것은?',['먼저 신청하면 반드시 합격한다','정원을 넘으면 추첨하므로 기한 내 신청해도 선정되지 않을 수 있다','금요일 밤까지 신청할 수 있다','추첨은 신청 전에 한다'],1,'신청 마감과 선정 방식은 서로 다른 조건이에요. 기한 내 접수와 최종 선정은 같지 않아요.'],
 ['국어','자료 ① 작년 참가자 40명 중 30명 만족 ② 올해 참가자 80명 중 48명 만족. 정확한 설명은?',['만족 비율과 인원 모두 증가','만족 인원은 늘었지만 비율은 낮아졌다','만족 인원은 줄었다','두 해 만족 비율은 같다'],1,'작년은 75%, 올해는 60%예요. 만족 인원은 30명에서 48명으로 늘었지만 비율은 낮아졌어요.']
].forEach(([category,question,options,answer,explanation])=>QUIZ.push({id:QUIZ.length,difficulty:'m',category,question,options,answer,explanation}));
startExam=function(){s.exam=null;s.phase='examSetup';};
function beginExam(type){
 const profile=examProfiles[type];if(!profile||s.phase!=='examSetup')return;
 const used=new Set();
 const ids=profile.areas.map(area=>{
  const pool=QUIZ.filter(q=>(q.category||'수리')===area&&!used.has(q.id));
  const q=shuffle(pool)[0];used.add(q.id);return q.id;
 });
 s.exam={ids,answers:[],score:100,review:false,type};s.phase='exam';save();render();
}
const infoV6=decoratedInfo;
decoratedInfo=function(info){
 const plain=String(info).replace(/([가-힣/]+) 준비도\s*([+−-]\d+)/g,(all,field,delta)=>['계열','학업'].includes(field)?all:`계열 준비도 ${delta}`);
 return infoV6(plain);
};
function conditionCost(action,value){
 if(action==='event'){const o=s.pending?.options?.[+value];return o?Math.max(0,-o.delta[4],o.risk!=null?5:0):0;}
 if(action==='activity')return [8,5,4][+value]||0;
 if(action==='book')return +value===1?3:0;
 if(action==='generic')return {deep:5,steady:0,project:5,team:4,portfolio:4,training:6}[value]||0;
 if(action==='study')return {self:4,academy:8,group:2}[value]||0;
 if(action==='campusClub')return value==='major'?2:0;
 if(action==='courseConfirm')return 3;
 if(action==='switchConfirm')return switchPreview(+value)?.loss||0;
 return 0;
}
const storyV6=renderStory;
renderStory=function(){
 if(s.phase==='examSetup'){
  $('content').innerHTML=`<section class="panel story-card"><span class="badge">진로 시뮬레이션 수능 · 문제 유형 선택</span><h1>어떤 영역을 더 풀어볼까요?</h1><p>유형에 따라 출제 영역이 달라집니다. 모든 유형은 6문항·100점이며 오답은 해당 문항 배점만큼 감점됩니다.</p>${Object.entries(examProfiles).map(([id,p])=>card(p.name,p.detail,'examType',id)).join('')}<p class="tiny">게임용 문제이며 실제 수능 과목 선택이나 시험 성적과는 다릅니다.</p></section>`;return;
 }
 storyV6();
 if(['event','major'].includes(s.phase)&&s.stats[4]>=8&&s.stats[4]<12)$('content').innerHTML+=`<div class="recovery-notice"><p>컨디션을 더 쓰는 선택을 위해 먼저 쉴 수 있어요.</p>${button('recover','한 달 쉬고 컨디션 +12')}</div>`;
 if(s.phase==='ambient'){
  $('content').innerHTML=`<section class="panel story-card ambient-story"><span class="badge">오늘의 일상</span>${intro(s.pending.title,s.pending.text)}${button('ackAmbient','읽었어요 · 계속','','primary')}</section>`;
 }
 if(['feedback','ambient'].includes(s.phase)&&s.lastDelta){
  const chips=s.lastDelta.map((v,i)=>v?`<span class="effect ${v>0?'gain':'loss'}">${names[i]} ${v>0?'+':''}${v}</span>`:'').join('');
  if(chips)$('content').innerHTML+=`<section class="result-changes" aria-live="polite"><strong>이번 상태 변화</strong><div>${chips}</div></section>`;
 }
 // Show the cost before clicking, not just after a rejected choice.
 if(['event','major'].includes(s.phase)){
  $('content').innerHTML=$('content').innerHTML.replace(/<button([^>]*data-action="([^"]+)"[^>]*data-value="([^"]*)"[^>]*)>/g,(tag,attrs,action,value)=>{
   const cost=conditionCost(action,value);
   return cost>s.stats[4]?`<button${attrs} disabled aria-label="컨디션 ${cost}점 필요 · 현재 ${Math.round(s.stats[4])}점">`:tag;
  });
 }
};
const dispatchV6=dispatch;
dispatch=function(action,value){
 if(action==='examType'){beginExam(value);return;}
 if(action==='recover'){
  if(s.ended||!['event','major'].includes(s.phase)||s.stats[4]>=12)return;
  change([0,0,0,0,12]);s.month+=1;s.extraMonths+=1;s.queue=s.queue.map(q=>[q[0],q[1]+1]);
  if(s.gap){s.gap.from+=1;s.gap.to+=1;}
  log('한 달 동안 컨디션 회복','컨디션 +12 · 추가 준비 1개월','choice');save();render();return;
 }
 if(conditionCost(action,value)>s.stats[4]){toast('이 선택에 필요한 컨디션이 부족해요. 휴식 후 다시 선택하세요.');return;}
 const scrollActions=['coursePick','courseSlot','courseClear','pickMajor'];
 const preserve=scrollActions.includes(action),modal=$('choiceDialog'),scroll=modal.scrollTop||0;
 const grid=document.querySelector('.subject-grid'),gridScroll=grid?.scrollTop||0;
 const search=document.querySelector('#courseSearch'),query=search?.value||'';
 const beforePhase=s.phase;
 dispatchV6(action,value);
 if(preserve){
  modal.scrollTop=scroll;
  const nextGrid=document.querySelector('.subject-grid');if(nextGrid)nextGrid.scrollTop=gridScroll;
  const nextSearch=document.querySelector('#courseSearch');if(nextSearch)nextSearch.value=query;
  document.querySelectorAll('.subject-grid .subject').forEach(el=>el.hidden=!el.dataset.name?.includes(query));
 }
 if(action==='generic'&&['portfolio','training'].includes(value)&&beforePhase==='major'&&s.phase==='feedback'){
  unlock(s.field,6);save();render();
 }
};
// Display readable, attainable discovery conditions and the selected field's delta.
const renderV6=render;
const dialogV6=openDialog;
openDialog=function(html){dialogV6(html.replace(/data-action="courseSlot"/g,'disabled aria-label="확정할 과목"'));};
render=function(){
 renderV6();
 $('careerSection').innerHTML=$('careerSection').innerHTML.replace(/포트폴리오·실무 준비/g,'친구와 공동 체험 또는 대학·취업 프로젝트');
 if(s.field!=null&&s.lastDeltaField===s.field&&s.lastDelta?.[2])$('readiness').innerHTML+=`<p class="last-prep-change">최근 계열 준비도 변화 ${deltaBadge(2)}</p>`;
 if(s.phase==='ambient')$('content').innerHTML=`<div class="decision-prompt"><strong>${esc(s.pending.title)}</strong>${button('showDecision','일상 사건 읽기','','primary')}</div>`;
};
// The base render ran during game-v3.js initialization; redraw with the new presentation.
render();
