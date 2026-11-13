'use strict';
// Mandatory rules below are this practice school's policy, not national admissions rules.
const ORDER_SOURCE='https://www.goe.go.kr/resource/old/BBSMSTR_000000030224/BBS_202503070136292750.pdf';
const COURSE_ORDER=[
 {course:4,before:1,kind:'required',concurrent:false},
 {course:1,before:0,kind:'recommended',concurrent:true},
 {course:12,before:8,kind:'recommended',concurrent:false},
 {course:13,before:10,kind:'recommended',concurrent:false}
];
function orderAudit(plan=s.schedule||[]){
 const errors=[],warnings=[];
 for(const r of COURSE_ORDER){const at=plan.indexOf(r.course);if(at<0)continue;const previous=plan.indexOf(r.before),term=Math.floor(at/3),priorTerm=Math.floor(previous/3);
  const ok=previous>=0&&(priorTerm<term||(r.concurrent&&priorTerm===term));
  if(!ok)(r.kind==='required'?errors:warnings).push({...r,slot:at,text:`${SUBJECTS[r.course].name}: ${SUBJECTS[r.before].name}을 ${r.concurrent?'앞 학기 또는 같은 학기에':'앞 학기에'} 신청하세요.`,reason:previous<0?'앞 단계 과목이 없습니다.':priorTerm===term?'같은 학기에 배치되어 있습니다.':'앞 단계 과목이 더 늦은 학기에 있습니다.'});
 }
 return {errors,warnings,valid:errors.length===0};
}
function orderHTML(){const a=orderAudit();return `<section class="order-panel" aria-live="polite"><h3>과목 순서 점검</h3><p>필수 신청 조건은 반드시 수정해야 하고, 권장 순서는 확인 후 그대로 신청할 수 있어요.</p>${[...a.errors,...a.warnings].map(r=>`<div class="order-message ${r.kind}"><strong>${r.kind==='required'?'신청 조건 미충족':'학습 순서 권장'}</strong><p>${r.text} ${r.reason}</p>${button('orderFix','수정할 칸 선택',r.slot)}</div>`).join('')||'<p>현재 선택한 과목의 순서에 문제가 없어요.</p>'}<details><summary>필수·권장·동시 수강은 어떻게 다른가요?</summary><p>이 연습용 학교는 미적분Ⅰ을 앞 학기에 배치해야 미적분Ⅱ를 신청할 수 있도록 설정했습니다. 이는 전국 모든 학교에 동일하게 적용되는 신청 제한이 아닙니다. 교육청 자료에는 병행 편성을 다루는 안내도 있으므로 실제 학교의 편성표를 확인하세요.</p><p>대수 → 미적분Ⅰ은 앞 학기 또는 같은 학기 수강을 권장합니다. 물리학 → 역학과 에너지, 생명과학 → 세포와 물질대사는 앞 학기 학습을 권장하며, 미선택했다고 신청을 막지는 않습니다. 일반·진로·융합 선택이라는 분류 자체는 선후 관계가 아닙니다.</p>${link(ORDER_SOURCE,'경기도교육청 2025 고등학교 교육과정 안내 · 2022 개정 부분')}</details></section>`;}
function coursePlanStatus(slot){if(s.phase==='major'&&s.stage==='subjects')return '신청 계획';if(!s.registrationConfirmed)return '이전 기록 · 이수 상태 미확인';const start=12+Math.floor(slot/3)*6;return s.month<start?'수강 예정':s.month<start+6?'수강 중':'이수 완료 (게임)';}
const timetable9=timetable;
timetable=function(){let html=timetable9();if(s.schedule)for(let i=0;i<s.schedule.length;i++){const id=s.schedule[i];if(Number.isInteger(id))html=html.replace(`<strong>${SUBJECTS[id].name}</strong>`,`<strong>${SUBJECTS[id].name}</strong><small>${coursePlanStatus(i)}</small>`);}return html;};
const planner9=renderCoursePlanner;
renderCoursePlanner=function(){return planner9().replace('<h1>두 학기 시간표 만들기</h1>','<h1>고2 선택과목 수강 신청</h1><p class="notice"><b>연습용 학교 편성</b> · 실제 과목명과 교육과정 안내를 참고한 모의 신청입니다. 개설 학기·선택 묶음·선이수 제한은 학교마다 다릅니다.</p>').replace('실제 수강 신청의 선택 묶음·학점·선이수 조건과는 다릅니다.','학교별 실제 편성과는 다릅니다. 이 화면의 순서 점검에서 필수 신청 조건과 학습 권장 순서를 구별합니다.').replace('<h2>나의 시간표',orderHTML()+'<h2>나의 시간표');};
const detail9=courseDetail;
courseDetail=function(id){detail9(id);const rules=COURSE_ORDER.filter(r=>r.course===id||r.before===id);if(rules.length)$('dialogContent').innerHTML+=`<section class="order-panel"><h3>연결되는 학습 순서</h3>${rules.map(r=>`<p>${SUBJECTS[r.before].name} → ${SUBJECTS[r.course].name}<br>${r.kind==='required'?'이 연습용 학교의 필수 신청 조건':'학습 순서 권장'} · ${r.concurrent?'같은 학기 병행 가능':'앞 학기 배치'}</p>`).join('')}</section>`;};
const curriculum9=curriculumAction;
curriculumAction=function(action,value){
 if(['subjects','courseConfirm'].includes(action)&&s.stage==='subjects'&&s.phase==='major'){
  const a=orderAudit();if(!a.valid){openDialog(`<h1>신청 조건을 먼저 확인해 주세요</h1>${orderHTML()}${button('close','시간표 수정하기','','primary')}`);return true;}
  if(action==='subjects') {s.registrationReview=JSON.stringify(s.schedule);curriculum9(action,value);if($('dialog').open)$('dialogContent').innerHTML+=orderHTML();return true;}
  if(s.registrationReview!==JSON.stringify(s.schedule)){toast('시간표가 바뀌었어요. 신청 내용을 다시 확인해 주세요.');return true;}
  curriculum9(action,value);if(s.phase==='feedback'){s.registrationConfirmed=true;save();}return true;
 }
 return curriculum9(action,value);
};
const dispatch9=dispatch;
dispatch=function(action,value){if(action==='orderFix'){if(s.stage!=='subjects'||s.phase!=='major')return;closeDialog();s.activeCourseSlot=+value;save();render();return;}dispatch9(action,value);};
render();
