'use strict';
// 성광고등학교 2026학년도 입학생 3년간 교육과정 편제표(1학년), p.3.
// The school publishes a PLAN. Actual class assignment, capacity and prerequisites are not in it.
const SG_SOURCE='https://www.schoolinfo.go.kr/ei/ss/pneiss_a03_s0.do';
const SG_TERMS=['1-1','1-2','2-1','2-2','3-1','3-2'];
const SG_LABELS={'1-1':'고1 1학기','1-2':'고1 2학기','2-1':'고2 1학기','2-2':'고2 2학기','3-1':'고3 1학기','3-2':'고3 2학기'};
const SG_CREATIVE={'1-1':3,'1-2':3,'2-1':3,'2-2':3,'3-1':4,'3-2':2};
const SG_GROUP_MIN={국어:8,수학:8,영어:8,한국사:6,사회:8,과학:10,체육:10,예술:10,'기술·가정/정보/제2외국어/한문/교양':16};
const SG_MISC='기술·가정/정보/제2외국어/한문/교양';
const SG_FIXED={
 '1-1':[
  ['공통국어1','국어','공통과목',4,4,'5R','읽기·쓰기·말하기의 공통 기초를 연습해요.'],
  ['공통수학1','수학','공통과목',4,4,'5R','여러 수학 개념을 연결해 문제를 해결해요.'],
  ['공통영어1','영어','공통과목',4,4,'5R','영어 자료를 듣고 읽으며 뜻을 파악해요.'],
  ['한국사1','한국사','공통과목',3,3,'5R','우리 역사의 흐름과 사건의 배경을 살펴요.'],
  ['통합사회1','사회','공통과목',4,4,'5R','사회 현상을 여러 관점에서 살펴요.'],
  ['통합과학1','과학','공통과목',4,4,'5R','물질·생명·지구 현상을 연결해 탐구해요.'],
  ['과학탐구실험1','과학','공통과목',1,1,'3','질문을 세우고 실험 결과를 기록해요.'],
  ['체육1','체육','일반선택',3,2,'3','기본 움직임과 운동 참여 방법을 익혀요.'],
  ['미술 또는 음악','예술','일반선택',3,3,'3','반 편성에 따라 미술 또는 음악 수업을 들어요.'],
  ['인간과 철학','교양','진로선택',3,2,'P','삶과 생각에 관한 질문을 토론해요.']
 ],
 '1-2':[
  ['공통국어2','국어','공통과목',4,4,'5R','여러 글을 읽고 자신의 생각을 표현해요.'],
  ['공통수학2','수학','공통과목',4,4,'5R','수학적 관계를 식과 그래프로 다뤄요.'],
  ['공통영어2','영어','공통과목',4,4,'5R','영어로 정보를 이해하고 의견을 표현해요.'],
  ['한국사2','한국사','공통과목',3,3,'5R','근현대사까지 한국사의 흐름을 살펴요.'],
  ['통합사회2','사회','공통과목',4,4,'5R','사회 문제와 공동체의 선택을 탐구해요.'],
  ['통합과학2','과학','공통과목',4,4,'5R','과학 지식을 활용해 현상을 설명해요.'],
  ['과학탐구실험2','과학','공통과목',1,1,'3','자료를 분석하고 탐구 결과를 설명해요.'],
  ['체육2','체육','일반선택',3,2,'3','운동 동작을 익히고 몸 상태를 살핀다.'],
  ['음악 또는 미술','예술','일반선택',3,3,'3','반 편성에 따라 음악 또는 미술 수업을 들어요.']
 ],
 '2-1':[
  ['문학','국어','일반선택',4,5,'5R','작품의 표현과 주제를 읽고 해석해요.'],
  ['대수','수학','일반선택',4,4,'5R','식과 함수의 관계를 다뤄요.'],
  ['영어Ⅰ','영어','일반선택',4,5,'5R','다양한 영어 글을 읽고 내용을 파악해요.'],
  ['운동과 건강','체육','진로선택',3,2,'3','운동이 몸과 건강에 주는 영향을 살펴요.']
 ],
 '2-2':[
  ['화법과 언어','국어','일반선택',4,5,'5R','상황에 맞게 말하고 언어의 구조를 살펴요.'],
  ['미적분Ⅰ','수학','일반선택',4,4,'5R','변화와 누적을 수학으로 설명해요.'],
  ['영어Ⅱ','영어','일반선택',4,5,'5R','영어 자료를 깊게 읽고 의견을 표현해요.'],
  ['스포츠 생활1','체육','융합선택',3,2,'3','생활 속 스포츠 참여와 문화를 경험해요.']
 ],
 '3-1':[
  ['독서와 작문','국어','일반선택',4,4,'5R','자료를 읽고 근거 있는 글을 써요.'],
  ['영어 독해와 작문','영어','일반선택',4,4,'5R','영어 글을 분석하고 생각을 글로 써요.'],
  ['스포츠 문화','체육','진로선택',2,1,'3','스포츠가 사회와 문화 속에서 갖는 의미를 살펴요.'],
  ['음악 감상과 비평','예술','진로선택',3,2,'3','음악을 듣고 표현 방식과 느낌을 설명해요.']
 ],
 '3-2':[
  ['스포츠 과학','체육','진로선택',2,1,'3','운동을 과학의 관점에서 살펴요.'],
  ['미술 감상과 비평','예술','진로선택',3,2,'3','작품을 보고 표현과 의미를 해석해요.']
 ]
};
// Row format: 교과군 | 과목유형 | 이름 | 성적처리 | 연결 계열 번호 | 배우는 내용.
// 5R = 원점수·성취도 5단계·석차 5등급, 5 = 원점수·성취도 5단계, 3 = 성취도 3단계, P = 이수/미이수.
const SG_GROUP_ROWS={
 1:`교양|진로선택|삶과 종교|P|9,13|여러 종교와 삶의 질문을 비교해요.
교양|진로선택|인간과 심리|P|9,10,14|생각·감정·행동을 살피는 질문을 다뤄요.`,
 2:`수학|일반선택|확률과 통계|5R|1,3,4,6,10,12|자료의 분포와 확률을 분석해요.
사회|일반선택|현대사회와 윤리|5R|9,10,11,13|현대 사회의 문제를 윤리적으로 토론해요.
사회|일반선택|세계시민과 지리|5R|2,6,10,13|지역과 세계의 생활·환경을 비교해요.
사회|일반선택|사회와 문화|5R|9,10,11,12,13|사회 현상을 조사하고 문화의 차이를 살펴요.
사회|일반선택|세계사|5R|10,11,13,14|세계 여러 지역의 역사를 연결해요.
과학|일반선택|물리학|5R|0,2,3,8|힘·운동·에너지로 현상을 설명해요.
과학|일반선택|화학|5R|0,3,4,5,6|물질의 성질과 변화를 탐구해요.
과학|일반선택|생명과학|5R|3,4,5,6,8|생명체의 구조와 작용을 살펴요.
과학|일반선택|지구과학|5R|2,3,6|지구와 우주의 변화를 살펴요.
정보|일반선택|정보|5R|0,1,6,12|컴퓨팅으로 문제를 해결하는 방법을 배워요.
제2외국어|일반선택|중국어|5R|11,12,13,14|중국어 기초 표현과 문화를 배워요.`,
 3:`수학|진로선택|기하|5R|0,1,2,3|도형과 공간의 관계를 탐구해요.
수학|진로선택|경제 수학|5R|10,12|경제 상황을 수학으로 설명해요.
사회|진로선택|윤리와 사상|5R|9,10,11,13|여러 사상가의 생각을 비교해요.
사회|진로선택|도시의 미래 탐구|5R|2,10,11,12|도시의 문제와 미래 모습을 탐구해요.
사회|진로선택|경제|5R|10,11,12|생산·소비·시장의 움직임을 살펴요.
사회|진로선택|동아시아 역사 기행|5R|10,13,14|동아시아의 역사와 문화를 연결해요.
과학|진로선택|전자기와 양자|5R|0,1,2,3|전기·자기·빛과 물질의 원리를 살펴요.
과학|진로선택|화학 반응의 세계|5R|0,3,4,5|화학 반응의 규칙과 활용을 탐구해요.
과학|진로선택|생물의 유전|5R|3,4,5,6|유전 정보가 전달되는 과정을 살펴요.
과학|진로선택|행성우주과학|5R|2,3|행성과 우주를 관측 자료로 탐구해요.
정보|진로선택|인공지능 기초|5R|0,1,6,12|인공지능의 원리와 사용 사례를 살펴요.
기술·가정|융합선택|지식 재산 일반|5R|0,1,2,7,12|아이디어를 권리로 보호하는 방법을 본다.`,
 4:`국어|진로선택|주제 탐구 독서|5R|7,9,10,11,13,14|한 주제를 여러 자료로 깊게 읽어요.
수학|진로선택|미적분Ⅱ|5R|0,1,2,3|미적분 개념을 더 깊게 적용해요.
수학|융합선택|수학과 문화|5R|1,7,9,13|문화 속 수학적 규칙을 찾아봐요.
수학|진로선택|인공지능 수학|5R|0,1,3,12|인공지능에 쓰이는 수학 표현을 살펴요.
영어|진로선택|심화 영어|5R|9,10,12,14|복잡한 영어 자료를 읽고 의견을 표현해요.
사회|융합선택|윤리문제 탐구|5|9,10,11,13|현실의 윤리 문제를 자료로 탐구해요.
사회|융합선택|여행지리|5|2,7,10,12,13|여행을 통해 지역의 환경과 문화를 살펴요.
사회|융합선택|금융과 경제생활|5|10,11,12|저축·소비·투자에 관한 생활 사례를 살펴요.
사회|융합선택|기후변화와 지속가능한 세계|5|2,3,6,10,11|기후변화가 사회에 미치는 영향을 탐구해요.
과학|진로선택|역학과 에너지|5R|0,2,3,8|운동과 에너지의 관계를 깊게 탐구해요.
과학|진로선택|물질과 에너지|5R|0,3,4,5|물질과 에너지의 변화를 살펴요.
과학|진로선택|세포와 물질대사|5R|3,4,5,6|세포의 작용과 에너지 사용을 탐구해요.
과학|진로선택|지구시스템과학|5R|2,3,6|지구를 이루는 체계의 상호작용을 살펴요.
과학|융합선택|과학의 역사와 문화|5|3,7,9,13|과학 발견이 시대와 문화에 미친 영향을 살펴요.`,
 5:`국어|진로선택|문학과 영상|5R|7,9,13,14|문학 작품과 영상 표현을 비교해요.
국어|융합선택|독서 토론과 글쓰기|5R|9,10,11,13,14|자료를 읽고 토론한 뒤 글로 정리해요.
수학|융합선택|실용 통계|5R|1,3,4,6,10,12|생활 속 자료를 모아 통계로 해석해요.
수학|융합선택|수학과제 탐구|5R|0,1,2,3,12|질문을 정하고 수학으로 탐구해요.
영어|진로선택|심화 영어 독해와 작문|5R|9,10,12,14|긴 영어 글을 읽고 근거 있는 글을 써요.
영어|진로선택|영어 발표와 토론|5R|7,9,10,12,14|영어로 생각을 발표하고 의견을 나눠요.
사회|진로선택|인문학과 윤리|5R|9,10,11,13,14|사람과 사회의 문제를 인문학으로 살펴요.
사회|진로선택|한국지리 탐구|5R|2,6,10,11,13|우리 지역의 환경과 생활을 조사해요.
사회|진로선택|국제 관계의 이해|5R|10,11,12,13,14|국가 사이의 협력과 갈등을 살펴요.
사회|융합선택|역사로 탐구하는 현대 세계|5|10,11,13,14|역사적 사건을 통해 지금의 세계를 이해해요.
사회|융합선택|사회문제 탐구|5|9,10,11,12,13|사회 문제를 조사하고 해결 방안을 비교해요.
과학|융합선택|기후변화와 환경생태|5|2,3,6|기후와 생태계의 변화를 연결해요.
과학|융합선택|융합과학 탐구|5|0,1,2,3,4,5,6|여러 과학 분야를 묶어 한 질문을 탐구해요.
과학|진로선택|과학과제 연구|5R|0,2,3,4,5,6|과학 질문을 정하고 연구 과정을 기록해요.
기술·가정|진로선택|로봇과 공학세계|5R|0,1,2|로봇이 움직이는 원리와 쓰임을 살펴요.
교양|융합선택|논술|P|9,10,11,13,14|자료를 읽고 근거를 갖춘 글을 써요.
교양|진로선택|논리와 사고|P|0,1,9,10,11,12,13|주장의 근거를 점검하고 논리를 세워요.`
};
const SG_GROUPS=Object.fromEntries(Object.entries(SG_GROUP_ROWS).map(([group,rows])=>[+group,rows.split('\n').map((row,index)=>{
 const [area,type,name,evaluation,fields,desc]=row.split('|');
 return {id:`${group}-${index}`,group:+group,area,type,name,basic:+group===1?3:+group===5&&['논술','논리와 사고'].includes(name)?3:4,credits:+group===1?2:3,evaluation,fields:fields.split(',').map(Number),desc};
})]));
const SG_FIXED_COURSES=Object.fromEntries(Object.entries(SG_FIXED).map(([term,rows])=>[term,rows.map(([name,area,type,basic,credits,evaluation,desc])=>({name,area,type,basic,credits,evaluation,desc,fixed:true,term}))]));
const SG_BY_ID=new Map(Object.values(SG_GROUPS).flat().map(c=>[c.id,c]));
const SG_COURSES=[...Object.values(SG_FIXED_COURSES).flat(),...SG_BY_ID.values()];
for(const c of SG_COURSES){
 let subject=SUBJECTS.find(x=>x.name===c.name);
 if(!subject){subject={id:SUBJECTS.length,name:c.name,type:c.type.replace('선택','').replace('과목',''),desc:c.desc,fields:c.fields||[],icon:0};SUBJECTS.push(subject);}
 c.subjectId=subject.id;
}
function sgFresh(){return {version:14,school:'성광고등학교',choices:{'1-2':[],'2-1':[],'2-2':[],'3-1':[],'3-2':[]},confirmed:{},uiTerm:'1-2'};}
const sgInitialV13=initial;
initial=function(){const state=sgInitialV13();state.schoolPlan=sgFresh();state.queue=[['book',6],['courseIntro',9],['subjects',12],['activity',18],['switch',24],['subjects3',26],['exam',30],['apply',35]];return state;};
// Preserve already progressed legacy runs. An untouched or early run can adopt the new schedule.
if(!s.schoolPlan&&(!s.started||s.month<9||s.stage==='subjects')){
 s.schoolPlan=sgFresh();
 if(s.stage==='subjects')s.schoolPlan.uiTerm='2-1';
 const q=s.queue||[];
 const subjects=q.find(x=>x[0]==='subjects');
 const exam=q.find(x=>x[0]==='exam');
 if(subjects&&!q.some(x=>x[0]==='courseIntro')&&s.month<9)q.push(['courseIntro',subjects[1]-3]);
 if(exam&&!q.some(x=>x[0]==='subjects3'))q.push(['subjects3',exam[1]-4]);
 q.sort((a,b)=>a[1]-b[1]);s.queue=q;
 save();
}
function sgActive(){return s.schoolPlan?.version===14;}
function sgStageTerms(){return s.stage==='courseIntro'?['1-2']:s.stage==='subjects'?['2-1','2-2']:s.stage==='subjects3'?['3-1','3-2']:[];}
function sgChoice(term){return s.schoolPlan.choices[term]||[];}
function sgAllSelected(){return Object.values(s.schoolPlan.choices).flat().map(id=>SG_BY_ID.get(id)).filter(Boolean);}
function sgArea(c){return ['정보','제2외국어','교양','기술·가정'].includes(c.area)?SG_MISC:c.area;}
function sgFixed(term){return SG_FIXED_COURSES[term]||[];}
function sgTermCredits(term){return sgFixed(term).reduce((n,c)=>n+c.credits,0)+sgChoice(term).reduce((n,id)=>n+(SG_BY_ID.get(id)?.credits||0),0);}
function sgCreditAudit(){
 const selected=sgAllSelected(),all=[...Object.values(SG_FIXED_COURSES).flat(),...selected];
 const groups=Object.entries(SG_GROUP_MIN).map(([name,min])=>({name,min,credits:all.filter(c=>sgArea(c)===name).reduce((n,c)=>n+c.credits,0)}));
 const curricular=all.reduce((n,c)=>n+c.credits,0),core=groups.filter(g=>['국어','수학','영어'].includes(g.name)).reduce((n,g)=>n+g.credits,0);
 const g2a=sgChoice('2-1').some(id=>['정보','중국어'].includes(SG_BY_ID.get(id)?.name));
 const g2b=sgChoice('2-2').some(id=>['인공지능 기초','지식 재산 일반'].includes(SG_BY_ID.get(id)?.name));
 const full=['1-2','2-1','2-2','3-1','3-2'].every(term=>sgChoice(term).length===({'1-2':1,'2-1':5,'2-2':5,'3-1':6,'3-2':8})[term]);
 return {groups,curricular,total:curricular+18,core,g2a,g2b,full,valid:full&&g2a&&g2b&&core<=84&&groups.every(g=>g.credits>=g.min)&&curricular>=174};
}
const sgCreditAuditV13=creditAudit;
creditAudit=function(){return sgActive()?sgCreditAudit():sgCreditAuditV13();};
const sgCreditHTMLV13=creditHTML;
creditHTML=function(){if(!sgActive())return sgCreditHTMLV13();const a=sgCreditAudit();return `<section class="credit-plan"><h3>3년간 과목 편성 · ${a.total}/198학점</h3><p>학교 지정과목과 선택과목의 운영학점을 더한다. ${a.full?'모든 선택군을 채웠다.':'아직 고르지 않은 과목은 합계에 없다.'}</p><div class="credit-grid">${a.groups.map(g=>`<div><span>${g.name}</span><b>${g.credits} / 최소 ${g.min}</b></div>`).join('')}</div><p>교과 ${a.curricular}/174 이상 · 창의적 체험활동 18학점 · 국어·수학·영어 합계 ${a.core}/84 이하</p><p>${a.g2a?'✓':'○'} 고2 1학기 정보 또는 중국어 · ${a.g2b?'✓':'○'} 고2 2학기 인공지능 기초 또는 지식 재산 일반</p><small>학교 편성 조건과 게임의 진학 점수는 별개예요.</small></section>`;};
function sgRelated(c,f){return (c.fields||SUBJECTS[c.subjectId]?.fields||[]).includes(f);}
const sgCourseAuditV13=courseAudit;
courseAudit=function(f=s.field,m=s.majorChoice??0,preview=false){
 if(!sgActive())return sgCourseAuditV13(f,m,preview);
 const at2=[...sgChoice('2-1'),...sgChoice('2-2')].map(id=>SG_BY_ID.get(id)).filter(Boolean);
 const at3=[...sgChoice('3-1'),...sgChoice('3-2')].map(id=>SG_BY_ID.get(id)).filter(Boolean);
 const n2=at2.filter(c=>sgRelated(c,f)).length,n3=at3.filter(c=>sgRelated(c,f)).length;
 const base=courseAreas(f,m),bridges=s.bridgeSubjects||[];
 const areas=[
  {name:'관련 과목을 꾸준히 선택',ids:base[0].ids,index:0,core:true,met:n2+n3>=5||bridges.includes(base[0].ids[0])},
  {name:'고2 때 관련 기초 쌓기',ids:base[1].ids,index:1,core:false,met:n2>=2||bridges.includes(base[1].ids[0])},
  {name:'고3 때 관련 분야 넓히기',ids:base[2].ids,index:2,core:false,met:n3>=3||bridges.includes(base[2].ids[0])}
 ];
 const missing=areas.filter(a=>!a.met);
 return {areas,missing,blocked:missing.some(a=>a.core),penalty:missing.reduce((n,a)=>n+(a.core?12:8),0),legacy:false,year2:n2,year3:n3};
};
const sgCourseSummaryV13=courseSummary;
courseSummary=function(preview=false){if(!sgActive())return sgCourseSummaryV13(preview);const a=courseAudit(s.field,s.majorChoice??0,preview);return `<section class="course-audit"><h3>${s.stage==='apply'?selectedMajor().name:fieldName()} · 과목 준비 ${3-a.missing.length}/3</h3><p>고른 과목 중 현재 계열과 연결되는 과목: 고2 ${a.year2}개 · 고3 ${a.year3}개</p><div class="area-grid">${a.areas.map(x=>`<div class="area ${x.met?'met':'missing'}"><strong>${x.met?'충족':'부족'} · ${x.name}${x.core?' (핵심)':''}</strong></div>`).join('')}</div><p>게임 지원 점수 −${a.penalty}점${a.blocked?' · 준비 보충 전 지원 제한':''}</p><small>이 기준은 진로 탐색 게임의 규칙입니다. 학교 학점 이수와 실제 대학 지원 요건은 별도로 확인해요.</small></section>`;};
function sgEvaluation(c){return {'5R':'원점수 · 성취도 5단계 · 석차 5등급 산출','5':'원점수 · 성취도 5단계 · 석차등급 미산출','3':'성취도 3단계 · 석차등급 미산출','P':'이수/미이수 · 석차등급 미산출'}[c.evaluation]||'학교 공시 확인 필요';}
function sgTermBlock(term,editable=false){
 const fixed=sgFixed(term),choice=sgChoice(term).map(id=>SG_BY_ID.get(id)).filter(Boolean),need=({'1-2':1,'2-1':5,'2-2':5,'3-1':6,'3-2':8})[term]||0;
 return `<section class="sg-term"><h3>${SG_LABELS[term]} · 교과 ${sgTermCredits(term)}학점${editable?' / 목표 '+(sgTermCredits(term)+(need-choice.length)*(term==='1-2'?2:3))+'학점':''}</h3><div class="sg-fixed"><strong>🔒 학교 지정과목 · ${fixed.reduce((n,c)=>n+c.credits,0)}학점</strong>${fixed.map(c=>`<div class="sg-course"><span>🔒 ${esc(c.name)}</span><small>${esc(c.area)} · ${esc(c.type)} · 운영 ${c.credits}학점</small>${editable?button('sgInfo','과목 정보',c.name):''}</div>`).join('')}</div>${need?`<div class="sg-choice-slots"><strong>내가 고르는 선택군 · ${choice.length}/${need}과목</strong>${choice.map(c=>`<div class="sg-course selected"><span>${esc(c.name)}</span><small>${esc(c.area)} · ${esc(c.type)} · 운영 ${c.credits}학점</small><p class="tiny">${esc(c.desc)}</p><div>${button('sgInfo','과목 정보',c.id)}${editable?button('sgToggle','빼기',c.id):''}</div></div>`).join('')}${Array.from({length:Math.max(0,need-choice.length)},()=>'<div class="sg-empty">+ 선택과목 빈칸</div>').join('')}</div>`:''}<p class="tiny">창의적 체험활동 ${SG_CREATIVE[term]}학점 별도</p></section>`;
}
const sgTimetableV13=timetable;
timetable=function(){if(!sgActive())return sgTimetableV13();return `<div class="sg-all-terms">${SG_TERMS.map(term=>sgTermBlock(term,false)).join('')}</div>`;};
function sgPlanner(){
 const terms=sgStageTerms(),term=terms.includes(s.schoolPlan.uiTerm)?s.schoolPlan.uiTerm:terms[0];s.schoolPlan.uiTerm=term;
 const group=({'1-2':1,'2-1':2,'2-2':3,'3-1':4,'3-2':5})[term],choices=sgChoice(term),need=({'1-2':1,'2-1':5,'2-2':5,'3-1':6,'3-2':8})[term],credits=choices.reduce((n,id)=>n+SG_BY_ID.get(id).credits,0),target=need*(group===1?2:3),audit=sgCreditAudit();
 const title=s.stage==='courseIntro'?'고1 · 첫 과목 선택':s.stage==='subjects'?'고2 과목 신청':'고3 과목 신청';
 const stageTerms=terms.map(t=>`<button class="${t===term?'active':''}" data-action="sgTerm" data-value="${t}">${SG_LABELS[t]} ${sgChoice(t).length}/${({'1-2':1,'2-1':5,'2-2':5,'3-1':6,'3-2':8})[t]}</button>`).join('');
 return `<section class="panel story-card sg-planner"><span class="badge">성광고등학교 2026학년도 입학생 편성표</span><h1>${title}</h1><p>🔒 표시 과목은 학교 지정이라 바꿀 수 없다. 선택군의 빈칸을 채운다. 학과는 수능 이후에 고른다.</p><div class="sg-tabs">${stageTerms}</div><aside class="course-float sg-summary"><strong>이번 학기 ${choices.length}/${need}과목 · 운영학점 ${credits}/${target}</strong><span>국어·수학·영어 3년 합계 ${audit.core}/84학점 이하</span><span>${group===2?(audit.g2a?'✓':'필수: 정보 또는 중국어'):group===3?(audit.g2b?'✓':'필수: 인공지능 기초 또는 지식 재산 일반'):group===5?`${SG_MISC} ${audit.groups.find(g=>g.name===SG_MISC).credits}/16학점 이상`:'학교 지정과목은 자동 배치'}</span></aside>${sgTermBlock(term,true)}<div class="sg-search-row"><label>과목 찾기 <input id="sgSearch" type="search" placeholder="과목명 검색"></label><label>교과군 <select id="sgArea"><option value="">전체 교과군</option>${[...new Set(SG_GROUPS[group].map(c=>c.area))].map(area=>`<option value="${esc(area)}">${esc(area)}</option>`).join('')}</select></label></div><div class="subject-grid sg-grid">${SG_GROUPS[group].map(c=>`<article class="course-item subject" data-name="${esc(c.name)}" data-area="${esc(c.area)}"><h3>${esc(c.name)}</h3><p>${esc(c.area)} · ${esc(c.type)} · 운영 ${c.credits}학점</p><p class="tiny">${esc(c.desc)}</p><div>${button('sgToggle',choices.includes(c.id)?'선택됨 ✓ · 빼기':'이 과목 선택',c.id,choices.includes(c.id)?'selected':'')}${button('sgInfo','평가 방식·상세',c.id)}</div></article>`).join('')}</div>${creditHTML()}${s.stage!=='courseIntro'?courseSummary(true):''}<p class="tiny">출처: 성광고등학교 「2026 학교교육과정 편성·운영·평가 계획」의 2026학년도 입학생 편제표 · ${link(SG_SOURCE,'학교알리미 공시 찾기')}</p>${button('sgReview',s.stage==='courseIntro'?'첫 과목 선택 확정':'두 학기 신청 내용 확인','','primary')}</section>`;
}
const sgPlannerV13=renderCoursePlanner;
renderCoursePlanner=function(){return sgActive()?sgPlanner():sgPlannerV13();};
const sgStageTitleV13=stageTitle;
stageTitle=function(){return sgActive()&&['courseIntro','subjects','subjects3'].includes(s.stage)?({courseIntro:'고1 첫 과목 선택',subjects:'고2 두 학기 과목 신청',subjects3:'고3 두 학기 과목 신청'})[s.stage]:sgStageTitleV13();};
const sgRenderStoryV13=renderStory;
renderStory=function(){if(sgActive()&&sgStageTerms().length&&s.phase==='major'){$('content').innerHTML=sgPlanner();return;}sgRenderStoryV13();};
function sgApplyFilter(){const root=$('choiceDialog'),query=root.querySelector('#sgSearch')?.value.trim().toLocaleLowerCase('ko-KR')||'',area=root.querySelector('#sgArea')?.value||'';root.querySelectorAll('.sg-grid .subject').forEach(el=>el.hidden=!!query&&!el.dataset.name.toLocaleLowerCase('ko-KR').includes(query)||!!area&&el.dataset.area!==area);}
document.addEventListener('input',e=>{if(e.target?.id==='sgSearch')sgApplyFilter();});
document.addEventListener('change',e=>{if(e.target?.id==='sgArea')sgApplyFilter();});
function sgSnapshot(){const root=$('choiceDialog');return {top:root.scrollTop,grid:root.querySelector('.sg-grid')?.scrollTop||0,search:root.querySelector('#sgSearch')?.value||'',area:root.querySelector('#sgArea')?.value||''};}
function sgRestore(snapshot){if(!snapshot)return;const root=$('choiceDialog');if(root.querySelector('#sgSearch'))root.querySelector('#sgSearch').value=snapshot.search;if(root.querySelector('#sgArea'))root.querySelector('#sgArea').value=snapshot.area;sgApplyFilter();root.scrollTop=snapshot.top;const grid=root.querySelector('.sg-grid');if(grid)grid.scrollTop=snapshot.grid;}
const SG_FIELD_LINKS=[
 '기계가 움직이는 방식과 재료의 차이를 알아야 설계를 시작할 수 있다.',
 '자료를 정리하고 코딩으로 문제를 푸는 데 쓰인다.',
 '건물과 도시를 볼 때 공간뿐 아니라 자원과 환경도 따진다.',
 '자연 현상을 그냥 지나치지 않고 관찰·실험으로 확인한다.',
 '몸에서 일어나는 일을 배우고 건강 정보의 근거를 확인한다.',
 '먹고 입고 사는 데 쓰는 재료를 살핀다. 생활의 불편도 조사한다.',
 '작물과 생태를 관찰하고 생산 방법을 비교한다.',
 '작품을 만드는 방법을 배우고 왜 그런 표현을 썼는지 묻는다.',
 '몸의 움직임을 배우고 운동·경기에서 써 본다.',
 '설명이 어려우면 어떻게 바꿀까? 배우는 사람의 반응을 본다.',
 '사람들이 사는 모습을 조사하고 자료를 읽는다.',
 '규칙과 공공 문제를 읽고 근거를 찾아 의견을 쓴다.',
 '돈과 시장 자료를 놓고 왜 그런 선택을 했는지 따져 본다.',
 '역사와 문화를 읽는다. 같은 자료도 해석이 갈릴 수 있다.',
 '글의 표현을 고르고 생각이 제대로 전해지는지 확인한다.'
];
// One-class 교과목 안내의 '지식 이해'를 학생 눈높이로 다시 쓴 요약. 없는 과목은 편제표용 짧은 설명을 사용한다.
const SG_GUIDE_TOPICS=Object.fromEntries(`
인간과 심리|심리학의 연구 방법, 감정과 성격, 사람 사이의 관계와 집단의 영향을 살펴요.
확률과 통계|경우의 수와 조건부확률을 배우고, 자료의 분포로 전체의 특징을 추정해요.
현대사회와 윤리|생명·환경·사회 문제를 여러 윤리 관점에서 비교하고 자신의 근거를 세워요.
세계시민과 지리|기후·문화·종교가 지역별 삶에 주는 영향을 지리 자료로 살펴요.
사회와 문화|사회 집단과 문화의 변화, 불평등을 조사 방법과 함께 배워요.
세계사|지역 간 교류와 국가의 형성, 산업화와 전쟁을 세계의 흐름으로 연결해요.
물리학|힘과 에너지, 전기와 자기, 빛과 물질의 성질을 실험과 법칙으로 설명해요.
화학|분자의 구조, 화학 평형, 산과 염기의 반응을 다뤄요.
생명과학|생명체의 구성, 몸의 조절, 생태계와 생명 현상을 배워요.
지구과학|대기와 바다의 움직임, 암석과 지구의 역사, 우주 관측을 살펴요.
정보|컴퓨팅 시스템과 데이터, 알고리즘과 프로그래밍으로 문제를 해결해요.
중국어|발음과 한자, 기본 문장과 일상 대화를 익혀요.
기하|이차곡선, 공간좌표, 벡터를 통해 도형과 공간을 수학적으로 다뤄요.
경제 수학|금융과 경제 현상을 수열·함수·행렬·미분으로 설명해요.
윤리와 사상|동양과 서양의 윤리 사상을 비교하고 삶의 문제에 적용해요.
도시의 미래 탐구|도시 공간의 변화, 생활 문제, 지속 가능한 도시를 탐구해요.
경제|수요와 공급, 경기와 정책, 국제 거래가 경제에 미치는 영향을 배워요.
동아시아 역사 기행|동아시아의 교류와 갈등을 역사 자료와 장소를 통해 살펴요.
전자기와 양자|전기·자기·빛과 미시 세계의 현상을 물리 개념으로 살펴요.
화학 반응의 세계|산·염기 반응, 산화·환원, 전지와 새 물질의 개발을 살펴요.
생물의 유전|DNA의 구조와 복제, 유전 형질과 유전자 발현을 탐구해요.
행성우주과학|행성과 별을 관측하고 우주 탐사 자료로 우주의 구조를 살펴요.
인공지능 기초|인공지능의 원리, 기계학습과 데이터, 사회적 영향과 윤리를 배워요.
주제 탐구 독서|관심 주제를 정해 책과 여러 자료를 비교하며 깊이 읽어요.
미적분Ⅱ|수열의 극한과 급수, 다양한 함수의 미분과 적분을 배워요.
수학과 문화|예술·생활·사회·환경에서 수학이 쓰이는 장면을 찾아요.
인공지능 수학|글과 그림 데이터를 수학으로 표현하고 예측과 최적화를 살펴요.
심화 영어|사회와 학문 주제의 영어 자료를 읽고 듣고 자신의 생각을 표현해요.
윤리문제 탐구|현실의 윤리 문제를 조사하고 서로 다른 판단 기준을 비교해요.
여행지리|여행지의 자연과 문화를 살피고 안전하고 책임 있는 여행을 계획해요.
금융과 경제생활|수입·지출·저축·투자와 금융 소비자 보호를 생활 사례로 배워요.
기후변화와 지속가능한 세계|기후 위기의 원인과 불평등, 지역의 대응과 에너지 전환을 살펴요.
역학과 에너지|물체의 운동과 에너지, 열의 이동, 파동의 성질을 깊게 배워요.
물질과 에너지|기체와 액체의 성질, 용액의 변화, 반응 속도와 에너지를 살펴요.
세포와 물질대사|세포막과 소기관, 효소, 세포호흡과 광합성을 탐구해요.
지구시스템과학|지구 내부, 바다와 대기의 운동, 지구 환경의 상호작용을 살펴요.
과학의 역사와 문화|과학 발견이 사회와 예술에 영향을 준 사례를 탐색해요.
문학과 영상|소설과 시가 영상으로 옮겨질 때 표현 방식과 의미가 어떻게 달라지는지 살펴요.
독서 토론과 글쓰기|자료를 읽고 서로 토론한 뒤 근거를 갖춘 글을 써요.
실용 통계|자료를 모으고 정리해 추정과 검정으로 실제 문제를 분석해요.
수학과제 탐구|수학 질문을 정하고 자료 조사·실험·발표로 답을 찾아요.
심화 영어 독해와 작문|학문·문화 주제의 긴 영어 글을 읽고 논리적인 글을 써요.
인문학과 윤리|고전과 현대의 글을 통해 자신·관계·자유·평등의 의미를 생각해요.
한국지리 탐구|지역을 조사하고 공간 자료로 산업·인구·환경 변화를 살펴요.
역사로 탐구하는 현대 세계|전쟁 이후 세계의 변화와 기술·환경 문제를 역사로 살펴요.
사회문제 탐구|사회 문제를 조사하고 연구 윤리를 지키며 해결 방안을 비교해요.
기후변화와 환경생태|기후 변화가 생태계에 미치는 영향과 복원 방법을 탐구해요.
융합과학 탐구|여러 과학 분야를 연결해 질문을 만들고 데이터를 모아 설명해요.
논술|자료를 비판적으로 읽고 주장·근거를 짜서 설득력 있게 글을 써요.
`.trim().split('\n').map(line=>line.split('|')));
const SG_OTHER_TOPICS={
 '삶과 종교':'여러 종교의 역사와 문화, 삶의 의미를 묻는 방식을 비교해요.',
 '지식 재산 일반':'발명·상표·저작물 같은 아이디어를 어떻게 기록하고 보호하는지 살펴요.',
 '영어 발표와 토론':'자료를 찾아 영어로 주장을 발표하고 질문과 반론에 답해요.',
 '국제 관계의 이해':'국가 사이의 협력과 갈등, 국제기구의 역할을 사례로 살펴요.',
 '과학과제 연구':'탐구 주제를 정하고 실험·관찰 결과를 분석해 보고서로 정리해요.',
 '로봇과 공학세계':'로봇의 구조와 센서·제어 방식을 살펴보고 문제 해결에 적용해요.',
 '논리와 사고':'주장과 근거를 구분하고 잘못된 추론을 찾아 생각을 정리해요.'
};
function sgFieldInfo(c){if(c.fixed)return '';const fields=c.fields||[];return `<h2>어떤 계열과 연결되나요?</h2><p>이 과목에서 배우는 내용을 다음 계열의 관심사와 연결해 볼 수 있어요.</p><ul>${fields.map(f=>`<li><strong>${esc(fieldName(f))}${f===s.field?' · 현재 선택 계열':''}</strong> — ${esc(SG_FIELD_LINKS[f])}</li>`).join('')}</ul><p class="tiny">연결 계열은 진로 탐색을 돕기 위한 예시예요. 목록에 없는 계열을 선택해도 이 과목을 배울 수 있습니다.</p>`;}
function sgInfo(id){
 const c=SG_BY_ID.get(id)||SG_COURSES.find(x=>x.name===id);if(!c)return;
 const topics=SG_GUIDE_TOPICS[c.name]||SG_OTHER_TOPICS[c.name];
 const majors=[...new Set((c.fields||[]).flatMap(f=>REAL_MAJORS.filter(m=>m.field===f).map(m=>m.name)))].slice(0,10);
 const jobs=(c.fields||[]).map(f=>JOBS.find(j=>j.field===f&&j.index===0)||JOBS.find(j=>j.field===f)).filter(Boolean).slice(0,5);
 const source=SG_GUIDE_TOPICS[c.name]?`주요 학습 내용: ${link('https://one-class.kr/webapps/oneclass_webapp1/#/subject-guide','교과목 안내')}를 학생용으로 요약 · `:'';
 openDialog(`<span class="badge">${esc(c.area)} · ${esc(c.type)}</span><h1>${esc(c.name)}</h1><p><b>기본학점 ${c.basic}</b> · 이 학교 운영학점 <b>${c.credits}</b></p><h2>과목 소개</h2><p>${esc(c.desc)}</p>${topics?`<h2>주요 학습 내용</h2><p>${esc(topics)}</p>`:''}${sgFieldInfo(c)}${majors.length?`<h2>게임에서 이어지는 학과</h2><p>${majors.map(esc).join(' · ')}</p>`:''}${jobs.length?`<h2>함께 살펴볼 직업</h2><p>${jobs.map(j=>esc(j.name)).join(' · ')}</p>`:''}<h2>성적처리 방식</h2><p>${sgEvaluation(c)}</p><p>성적처리 방식과 게임에서 얻는 학업 점수는 달라요.</p><p class="tiny">편제표에 과목별 필수 선이수 규칙은 기재되지 않았어요. 공부 순서는 상담을 통해 계획할 수 있지만, 신청 제한으로 적용하지 않습니다.</p><p class="tiny">${source}운영학점과 평가 방식: 성광고 2026학년도 입학생 편제표 · 계열·학과·직업 연결: 게임 내 진로 탐색 안내</p>${button('close','신청 화면으로 돌아가기','','primary')}`);
}
function sgStageCheck(){const terms=sgStageTerms();for(const t of terms){const want=({'1-2':1,'2-1':5,'2-2':5,'3-1':6,'3-2':8})[t];if(sgChoice(t).length!==want)return `${SG_LABELS[t]}에서 ${want}과목을 골라 주세요.`;}
 const a=sgCreditAudit();if(s.stage==='subjects'&&!a.g2a)return '고2 1학기는 정보 또는 중국어 중 한 과목 이상이 필요해요.';if(s.stage==='subjects'&&!a.g2b)return '고2 2학기는 인공지능 기초 또는 지식 재산 일반 중 한 과목 이상이 필요해요.';
 if(a.core>84)return `국어·수학·영어 합계가 ${a.core}학점입니다. 84학점을 넘지 않도록 조정해 주세요.`;
 if(s.stage==='subjects3'){const low=a.groups.filter(g=>g.credits<g.min);if(low.length)return `${low.map(g=>g.name+' '+g.credits+'/'+g.min+'학점').join(' · ')}: 최소 이수 학점을 채워 주세요.`;if(a.curricular<174)return `교과 이수 계획이 ${a.curricular}학점입니다. 174학점 이상이 필요해요.`;}
 return '';
}
function sgReview(){const message=sgStageCheck();if(message){toast(message);return;}s.schoolPlan.review=JSON.stringify(s.schoolPlan.choices);openDialog(`<h1>과목 신청을 확정할까요?</h1>${sgStageTerms().map(t=>sgTermBlock(t,false)).join('')}${creditHTML()}${s.stage!=='courseIntro'?courseSummary(true):''}<p class="tiny">학교 편성 조건 확인과 게임 속 진학 준비 점수는 따로 계산해요.</p>${button('sgConfirm','신청 확정','','primary')}${button('close','선택 수정하기')}`);}
function sgConfirm(){if(s.schoolPlan.review!==JSON.stringify(s.schoolPlan.choices)){toast('신청 내용이 바뀌었어요. 다시 확인해 주세요.');return;}const problem=sgStageCheck();if(problem){toast(problem);return;}const terms=sgStageTerms();terms.forEach(t=>s.schoolPlan.confirmed[t]=true);s.subjects=sgAllSelected().map(c=>c.subjectId);s.curriculumVersion=5;closeDialog();
 if(s.stage==='courseIntro'){finishChoice('고1 첫 과목을 신청했어요',SG_BY_ID.get(sgChoice('1-2')[0]).name+' 2학점을 시간표에 담았어요.',[0,1,1,0,-1]);return;}
 const a=courseAudit(),related=s.stage==='subjects'?a.year2:a.year3,kind=s.stage==='subjects'?'고2':'고3';
 const delta=s.stage==='subjects'?[0,2+Math.min(related,5),2+Math.min(related*2,10),1,-3]:[0,2+Math.min(related,7),2+Math.min(related*2,12),1,-3];
 finishChoice(`${kind} 두 학기 과목을 확정했어요`,`학교 편성 조건을 확인했어요. 현재 계열과 연결된 선택과목은 ${kind} ${related}개예요.`,delta);
}
const sgDispatchV13=dispatch;
dispatch=function(action,value){
 if(sgActive()&&action==='sgInfo'){sgInfo(value);return;}
 if(sgActive()&&sgStageTerms().length&&s.phase==='major'){
  if(action==='sgTerm'){if(sgStageTerms().includes(value)){s.schoolPlan.uiTerm=value;save();render();}return;}
  if(action==='sgToggle'){
   const c=SG_BY_ID.get(value),term=s.schoolPlan.uiTerm,group=({'1-2':1,'2-1':2,'2-2':3,'3-1':4,'3-2':5})[term];
   if(!c||c.group!==group||s.schoolPlan.confirmed[term])return;
   const snapshot=sgSnapshot(),list=sgChoice(term),limit=({'1-2':1,'2-1':5,'2-2':5,'3-1':6,'3-2':8})[term];
   if(list.includes(value))s.schoolPlan.choices[term]=list.filter(x=>x!==value);
   else if(list.length<limit)list.push(value);else {toast(`이번 학기는 ${limit}과목까지 선택할 수 있어요.`);return;}
   s.subjects=sgAllSelected().map(x=>x.subjectId);save();render();sgRestore(snapshot);requestAnimationFrame(()=>sgRestore(snapshot));return;
  }
  if(action==='sgReview'){sgReview();return;}
  if(action==='sgConfirm'){sgConfirm();return;}
  if(['coursePick','courseSlot','courseClear','courseToggle','subjects','courseConfirm','orderFix'].includes(action))return;
 }
 sgDispatchV13(action,value);
};
render();
