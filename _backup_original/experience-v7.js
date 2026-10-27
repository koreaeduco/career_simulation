'use strict';
// Backwards-compatible UI and event expansion. Existing saves are retained.
const v7Initial=initial;
initial=function(){return {...v7Initial(),introSeen:false,roleSeen:[],roleHistory:[],autoSeen:[],roleDeltas:[]};};
function initRoleState(){s.roleSeen??=[];s.roleHistory??=[];s.autoSeen??=[];s.roleDeltas??=[];}
function showWelcome(){return !s.started&&!s.introSeen&&tab==='story';}
function welcomeHTML(inDialog=false){return `<section class="welcome panel"><span class="eyebrow">다음 장 · 나의 첫 진로 시뮬레이션</span><h1>같은 나, 다른 선택.<br><span>미래는 얼마나 달라질까?</span></h1><p class="welcome-lead">새봄고 입학부터 첫 일자리까지.<br>어떤 수업을 듣고, 어떤 역할을 맡을지는 당신이 정합니다.</p><div class="welcome-route" aria-label="활동 순서"><span>고등학교 생활</span><b>→</b><span>시간표 선택</span><b>→</b><span>대학·다른 경로</span><b>→</b><span>첫 일자리</span></div><h2>이번 활동에서 찾아볼 세 가지</h2><ol class="welcome-goals"><li><strong>관심 가는 직업 2개 찾기</strong><span>하는 일과 필요한 준비를 살펴보세요.</span></li><li><strong>과목을 고른 이유 설명하기</strong><span>시간표가 희망 학과의 기초와 어떻게 연결되는지 확인하세요.</span></li><li><strong>다르게 살아 보고 비교하기</strong><span>다음 플레이에서는 계열이나 역할을 바꾸어 결과를 비교하세요.</span></li></ol><p class="notice">높은 연봉이나 합격만이 목표는 아니에요. 나에게 맞는 선택의 이유를 찾는 활동입니다. 결과는 실제 능력 평가나 미래 예측이 아닙니다.</p><details><summary>어떻게 진행하나요?</summary><p>수업 시간 70분 동안 2~3번의 삶을 경험하는 활동입니다. 사전 심리검사는 이미 마쳤으므로 여기서 다시 검사하지 않아요.</p><p>선택지 아래 설명을 읽고 역할을 고르세요. 현재 계열의 역할은 해당 준비도를 크게 올리고, 다른 역할은 다른 계열의 경험으로 남습니다. 비용과 컨디션도 함께 살펴보세요.</p><p>시간은 상단 바에서 흐르고, 선택과 정보 확인 중에는 멈춥니다. 1×·2×·4×로 속도를 바꿀 수 있어요. 모두 같은 자산 100만 원으로 시작합니다.</p><p>대학에 합격하지 않아도 재수나 취업으로 이어집니다. 모르는 직업은 아래 직업 지도에서 살펴보고, 과목·학과 정보는 실제 모집요강과 별도로 확인하세요.</p></details><div class="welcome-actions">${button(inDialog?'close':'beginStory',inDialog?'안내 닫기':'나의 첫 번째 삶 시작하기 →','','primary')}${!inDialog&&read(HISTORY,[]).length?button('beginStory','안내 건너뛰고 다시 플레이'):''}</div></section>`;}

// No event countdown or numeric progress text: only the current period and live bar.
renderClock=function(){const t=term();const running=s.started&&!s.ended&&!s.paused&&s.phase==='gap'&&tab==='story'&&!$('dialog').open;const status=!s.started?'시작 전':s.ended?'기록 완성':running?'시간이 흐르고 있어요':'잠시 멈춤';$('journey').innerHTML=`<div class="row"><div><span class="eyebrow">지금 지나가는 시간</span><h2 id="livePeriod">${t.label}</h2></div><div class="speed">${button('pause',s.paused?'▶':'Ⅱ','','icon-button')}${[1,2,4].map(n=>button('speed',n+'×',n,s.speed===n?'active':'')).join('')}</div></div><div id="liveProgress" class="progress ${running?'flowing':''}" role="progressbar" aria-label="현재 학기 진행" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${Math.floor(t.pct)}"><i id="liveFill" style="width:${t.pct}%"></i></div><span class="tiny" id="flowStatus">${status}</span>`;};
updateLiveClock=function(){const t=term();$('livePeriod').textContent=t.label;$('liveFill').style.width=t.pct+'%';$('liveProgress').setAttribute('aria-valuenow',Math.floor(t.pct));};

function roleRate(field){return Math.round(clamp(30+s.prep[field]*.45+s.stats[3]*.25-(s.stats[4]<30?15:0),20,90));}
const v7Decorated=decoratedInfo;
decoratedInfo=function(info){if(!String(info).includes('관련 역할'))return v7Decorated(info);return infoV6(info).replace(/([가-힣/]+ · [가-힣/]+) 준비도 ([+−-])(\d+)/g,(_,field,sign,n)=>`<span class="effect ${sign==='+'?'gain':'loss'}">${field} 준비도 ${sign}${n}</span>`);};
function roleOption(field,scene){const r=FIELD_ROLES[field][scene],own=field===s.field,cost=2+((scene+field)%3)*2,delta=[1,0,own?8:6,2,-cost],risk=[2,8,9].includes(scene)?roleRate(field):null;const related=FIELDS[field][0]===FIELDS[s.field][0];return {title:r.title,task:r.task,field,delta,risk,info:`${r.task}。<br><b>${fieldName(field)} 관련 역할</b><br>${risk!=null?'완료 가능성 '+chanceLabel(risk)+' · 완료 시 ':''}${fieldName(field)} 준비도 +${delta[2]} · 활동 역량 +2 · 컨디션 −${cost}${!own&&related?' · 현재 계열 준비도 +1':''}${risk!=null?'<br>수정이 필요하면: 이 역할의 계열 준비도 +2 · 컨디션 −'+cost:''}`.replace('。','.')};}
function buildRoleEvent(scene){initRoleState();const others=shuffle(FIELDS.map((_,f)=>f).filter(f=>f!==s.field)).slice(0,2);return {id:`role-${s.field}-${scene}`,scene,roleEvent:true,title:ROLE_SCENES[scene][0],desc:ROLE_SCENES[scene][1]+' 역할마다 배우는 것이 달라요. 내 목표와 현재 컨디션을 함께 살펴보세요.',options:shuffle([s.field,...others].map(f=>roleOption(f,scene)))};}
const v7MakeEvent=makeEvent;
makeEvent=function(){initRoleState();if(s.field==null)return v7MakeEvent();
 // Keep pure everyday and route-specific stories between role events.
 if(s.events%8===0)return v7MakeEvent();
 const pool=ROLE_SCENES.map((_,i)=>i).filter(i=>(s.route==='school'||ROLE_SCENES[i][2]==='all')&&!s.roleSeen.includes(i));
 if(!pool.length)return v7MakeEvent();const scene=shuffle(pool)[0];s.roleSeen.push(scene);return buildRoleEvent(scene);
};
const v7Resolve=resolveDailyChoice;
resolveDailyChoice=function(index){const e=s.pending;if(!e?.roleEvent)return v7Resolve(index);if(s.phase!=='event')return;const o=e.options[index];if(!o||s.stats[4]<-o.delta[4])return;initRoleState();
 const ok=o.risk==null||Math.random()*100<o.risk,delta=ok?[...o.delta]:[0,0,2,1,o.delta[4]],before=[...s.prep];
 change(delta,o.field);if(o.field!==s.field&&FIELDS[o.field][0]===FIELDS[s.field][0])s.prep[s.field]=clamp(s.prep[s.field]+1);
 s.roleDeltas=s.prep.map((p,f)=>({field:f,value:p-before[f]})).filter(x=>x.value!==0);
 const detail=`맡은 역할: ${o.title}. ${ok?'실행한 일: '+o.task+'. 결과를 팀에 공유했어요.':'시험 운영에서 보완할 부분이 발견됐어요. '+o.task+'. 이 과정에서 막힌 부분을 기록하고 다음 시도에 쓸 수정안을 남겼어요.'} ${effects(delta,o.field)}${s.roleDeltas.some(x=>x.field===s.field)&&o.field!==s.field?' · '+fieldName()+' 준비도 +1':''}`;
 s.roleHistory.push({scene:e.scene,field:o.field,title:o.title,ok,route:s.route,month:s.month});s.roleHistory=s.roleHistory.slice(-40);unlock(o.field,0);if(ok)unlock(o.field,5);
 log(e.title+' — '+(ok?'역할 수행 완료':'수정할 부분 발견'),detail,ok?'choice':'setback');s.phase='feedback';s.pending={title:ok?'맡은 역할을 마쳤어요':'수정할 부분을 찾았어요',text:detail,resumeDaily:true,outcome:o.risk==null?'choice':ok?'success':'failure'};save();render();
};
const v7Auto=autoEvent;
autoEvent=function(){initRoleState();const matching=AUTO_EVENT_CATALOG.filter(e=>e.field===s.field&&!s.autoSeen.includes(e.id)&&(e.index>=4||s.roleHistory.some(h=>h.field===e.field&&h.scene===e.index&&h.route===s.route&&s.month-h.month<=6)));if(!matching.length||s.events%5===0){s.roleDeltas=[];return v7Auto();}
 // Follow up on a role when available; never claim the player did unchosen work.
 const follow=matching.filter(e=>e.index<4),pool=follow.length?follow:matching,e=shuffle(pool)[0],negative=[0,2,5].includes(e.index);
 const tired=s.stats[4]<30,delta=negative?[0,0,1,0,tired?-5:-3]:[1,1,3,1,2];change(delta,e.field);s.roleDeltas=[{field:e.field,value:s.lastDelta[2]}];s.autoSeen.push(e.id);
 const text=e.text+(negative&&tired?' 컨디션이 낮아 정리하는 데 더 힘이 들었다.':'');log(e.title,text+' '+effects(delta,e.field),negative?'setback':'achievement');s.phase='ambient';s.pending={title:e.title,text:text+' '+effects(delta,e.field)};save();
};

// Fictional school organisation; not nationally prescribed year-2 fixed courses.
const FIXED_COURSES=[22,25,42];
const v7Audit=courseAudit;
courseAudit=function(f=s.field,m=s.majorChoice??0,preview=false){const a=v7Audit(f,m,preview);if((s.curriculumVersion||0)<3&&s.stage!=='subjects')return a;const areas=a.areas.map(x=>({...x,met:x.met||x.ids.some(id=>FIXED_COURSES.includes(id))})),missing=areas.filter(x=>!x.met);return {...a,areas,missing,blocked:missing.some(x=>x.core),penalty:missing.reduce((n,x)=>n+(x.core?12:8),0)};};
const v7Timetable=timetable;
const v7CourseSummary=courseSummary;
courseSummary=function(preview=false){return (!preview&&s.curriculumVersion===3&&Array.isArray(s.schedule)?timetable():'')+v7CourseSummary(preview);};
timetable=function(){return (s.curriculumVersion===3||s.stage==='subjects'?`<div class="fixed-courses"><strong>학교 지정 과목 · 자동 편성</strong><p>${FIXED_COURSES.map(id=>SUBJECTS[id].name).join(' · ')}</p><small>가상 새봄고의 고2 편성 예시입니다. 실제 학교의 지정 과목·학점과 다를 수 있어요.</small></div>`:'')+v7Timetable().replace('고2 1학기</h3>','고2 1학기 · 묶음 A (3과목)</h3>').replace('고2 2학기</h3>','고2 2학기 · 묶음 B (3과목)</h3>').replace(/선택 ([123])/g,'선택 $1');};
function courseDetail(id){const c=SUBJECTS[id];if(!c)return;const linked=c.fields.map(f=>fieldName(f)),relatedMajors=c.fields.flatMap(f=>MAJORS[f].map(m=>m.name)).slice(0,5),jobs=JOBS.filter(j=>c.fields.includes(j.field)).slice(0,4);openDialog(`<span class="badge">과목 알아보기 · ${c.type} 선택</span><h1>${c.name}</h1><h2>무엇을 배우나요?</h2><p>${c.desc}</p><h2>이 게임에서 연결되는 기초</h2><p>${courseAreas().filter(a=>a.ids.includes(id)).map(a=>a.name).join(' · ')||'현재 목표 학과 외의 분야를 탐색할 수 있어요.'}</p><h2>연결해서 살펴볼 계열·학과</h2><p>${linked.join(' · ')}</p><p>${relatedMajors.join(' · ')}</p><h2>함께 알아볼 직업</h2><p>${jobs.map(j=>j.name+' — '+j.work).join('<br>')}</p><p class="notice">${COURSE_RULE_NOTICE}</p>${link(SOURCES.subjects,'교육청 과목 안내 확인')}${button('close','시간표로 돌아가기','','primary')}`);}
renderCoursePlanner=function(){timetable();const filled=s.schedule.filter(Number.isInteger).length;return `<section class="panel story-card"><span class="badge">핵심 선택 · 시간표가 진로 준비를 바꿔요</span><h1>두 학기 시간표 만들기</h1><p>학교 지정 과목은 이미 들어 있어요. 선택 묶음 A(1학기)와 B(2학기)에서 각각 3과목을 골라 두 학기 시간표를 완성하세요. 같은 과목은 한 번만 선택합니다.</p><details class="notice"><summary>실제 과목을 참고하지만, 이 시간표는 게임용입니다</summary><p>${COURSE_RULE_NOTICE}</p><p>학기별 3과목 규칙은 게임의 간소화된 편성입니다. 실제 수강 신청의 선택 묶음·학점·선이수 조건과는 다릅니다.</p>${link(SOURCES.subjects,'교육청 과목 안내')}</details>${majorPicker()}${courseSummary(true)}<p class="notice">부족한 기초는 진학 전에 무료 보충(영역당 2개월) 또는 유료 보충(20만 원·1개월)으로 준비할 수 있어요. 다른 학과를 검토할 수도 있어요. 아래 감점과 지원 제한은 게임 안에서만 적용됩니다.</p><h2>나의 시간표 · 선택과목 ${filled}/6</h2>${timetable()}<p class="tiny">시간표에서 채울 칸을 선택한 뒤 아래 과목을 고르세요. 과목 설명을 읽는 것만으로는 선택되지 않습니다.</p><label class="course-search-label" for="courseSearch">과목 찾기<input id="courseSearch" type="search" placeholder="예: 정보, 생명과학, 경제"></label><div class="subject-grid">${SUBJECTS.filter(c=>!FIXED_COURSES.includes(c.id)).map(c=>`<article class="course-item subject" data-name="${esc(c.name)}"><h3>${c.name}</h3><p>${c.type} 선택 · ${courseAreas().filter(a=>a.ids.includes(c.id)).map(a=>a.name).join(' · ')||'다른 분야 탐색'}</p><div>${button('coursePick',s.schedule.includes(c.id)?'선택됨 ✓':'이 과목 선택',c.id,s.schedule.includes(c.id)?'selected':'')}${button('courseInfo','무엇을 배우나요?',c.id)}</div></article>`).join('')}</div>${s.schedule[s.activeCourseSlot]!=null?button('courseClear','현재 칸 비우기',s.activeCourseSlot):''}${button('subjects','완성 시간표와 준비 결과 확인','','primary')}</section>`;};
const v7Curriculum=curriculumAction;
curriculumAction=function(action,value){if(action==='coursePick'&&FIXED_COURSES.includes(+value)){toast('이 과목은 학교 지정 과목에 이미 들어 있어요.');return true;}if(action==='courseConfirm'&&s.stage==='subjects'&&s.phase==='major'){if(!s.schedule||s.schedule.some(x=>x==null)||new Set(s.schedule).size!==6||s.schedule.some(id=>!SUBJECTS[id]||FIXED_COURSES.includes(id)))return true;s.curriculumVersion=3;v7Curriculum(action,value);if(s.phase==='feedback'){s.curriculumVersion=3;save();}return true;}return v7Curriculum(action,value);};
const v7Dialog=openDialog;
openDialog=function(html){v7Dialog(html.replace(/불이익을 확인하고 확정|과목 준비 결과를 확인하고 확정/g,'이 시간표로 확정하기').replace(/다시 고르기|과목 다시 고르기/g,'다시 살펴보기').replace(/과목 부족에 따른 불이익은 게임 규칙입니다/g,'과목 준비에 따른 감점과 지원 제한은 게임 규칙입니다'));};
const v7Present=presentStory;
presentStory=function(){if(showWelcome()){if($('choiceDialog').open)$('choiceDialog').close();return;}v7Present();};
const v7Story=renderStory;
renderStory=function(){if(showWelcome()){$('content').innerHTML=welcomeHTML();return;}v7Story();$('content').innerHTML=$('content').innerHTML.replace(/관련 직업3개/g,'관련 직업 5개');
 if(s.phase==='event'&&s.pending?.roleEvent)$('content').innerHTML=$('content').innerHTML.replace('YOUR STORY, YOUR CHOICE','같은 상황, 서로 다른 역할').replace('취향 선택','역할 선택');
 if(['feedback','ambient'].includes(s.phase)&&s.roleDeltas.length&&s.lastDeltaField!=null)$('content').innerHTML=$('content').innerHTML.replace(/계열 준비도 ([+−-]\d+)/g,fieldName(s.lastDeltaField)+' 준비도 $1');
 if(s.pending?.title==='수정할 부분을 찾았어요')$('content').innerHTML=$('content').innerHTML.replace('이번에는 미완료','수정할 부분 발견');
};
let courseInfoScroll=0;
const v7Dispatch=dispatch;
dispatch=function(action,value){if(action==='beginStory'&&!s.started){s.introSeen=true;save();render();return;}if(action==='help'){openDialog(welcomeHTML(true));return;}if(action==='courseInfo'){courseInfoScroll=$('choiceDialog').scrollTop||0;courseDetail(+value);return;}
 if(action==='event'&&s.pending?.roleEvent&&s.phase==='event'){const o=s.pending.options[+value];if(!o)return;if(s.stats[4]<-o.delta[4]){toast('컨디션이 부족해요. 휴식 후 선택할 수 있어요.');return;}resolveDailyChoice(+value);return;}
 if(!['showDecision','hideDecision','close','pause','speed','journal','moreJournal','tab'].includes(action))s.roleDeltas=[];
 v7Dispatch(action,value);if(action==='confirmRestart'){s.introSeen=true;save();render();}if(action==='close')$('choiceDialog').scrollTop=courseInfoScroll;
};
const v7Render=render;
render=function(){initRoleState();v7Render();const welcome=showWelcome();document.body.classList.toggle('show-welcome',welcome);if(welcome){$('journal').hidden=true;}
 if(s.roleDeltas.length){const chips=s.roleDeltas.map(x=>`<span class="effect ${x.value>0?'gain':'loss'}">${fieldName(x.field)} 준비도 ${x.value>0?'+':''}${x.value}</span>`).join('');$('readiness').innerHTML+=`<div class="role-growth"><strong>이번 역할로 쌓인 준비</strong><p>${chips}</p></div>`;if(['feedback','ambient'].includes(s.phase))$('choiceContent').innerHTML+=`<div class="role-growth"><strong>계열별 변화</strong><p>${chips}</p></div>`;}
};
render();
