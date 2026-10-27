'use strict';
// Interaction fixes and small, optional uses of the shared starting budget.
let journalArchivePage=0;
const JOURNAL_PAGE_SIZE=12;
renderJournal=function(){
 const labels={choice:'내가 고른 선택',life:'일상 사건',setback:'아쉬운 사건',achievement:'활동 결과',asset:'자산 · 활동'};
 $('journal').hidden=tab!=='story';
 $('journal').innerHTML=`<div class="journal-heading"><div><span class="eyebrow">MY LIFE JOURNAL</span><h1>나의 일상 기록</h1></div>${button('journal',s.journal?'접기 ⌃':'펼치기 ⌄')}</div><p class="journal-description">${s.started?'지금의 선택과 일상, 가장 최근 이야기부터.':'새봄고 입학을 앞두고 있어요. 첫 계열을 선택하면 나의 이야기가 시작됩니다.'}</p><div ${s.journal?'':'hidden'}>${s.logs.length?s.logs.slice(0,4).map(l=>`<article class="life-card ${l.kind}"><div class="row"><span class="badge">${labels[l.kind]||'기록'}</span><time>${esc(l.time)}</time></div><h2>${esc(l.title)}</h2><p>${esc(l.detail)}</p></article>`).join(''):'<div class="empty-journal">아직 쓰이지 않은 첫 페이지</div>'}${s.logs.length>4?button('moreJournal','전체 기록 보기','','more-records'):''}</div>`;
};
function journalArchiveHTML(){
 const labels={choice:'내가 고른 선택',life:'일상 사건',setback:'아쉬운 사건',achievement:'활동 결과',asset:'자산 · 활동'};
 const count=Math.max(1,Math.ceil(s.logs.length/JOURNAL_PAGE_SIZE));
 journalArchivePage=Math.min(Math.max(0,journalArchivePage),count-1);
 const first=journalArchivePage*JOURNAL_PAGE_SIZE;
 return `<section class="journal-archive"><span class="eyebrow">MY LIFE JOURNAL</span><h1>전체 기록</h1><p>최근 기록부터 · ${s.logs.length}개 중 ${first+1}–${Math.min(first+JOURNAL_PAGE_SIZE,s.logs.length)}개</p>${s.logs.slice(first,first+JOURNAL_PAGE_SIZE).map(l=>`<article class="life-card ${l.kind}"><div class="row"><span class="badge">${labels[l.kind]||'기록'}</span><time>${esc(l.time)}</time></div><h2>${esc(l.title)}</h2><p>${esc(l.detail)}</p></article>`).join('')}<div class="archive-nav">${journalArchivePage>0?button('journalPage','더 최근 기록',journalArchivePage-1):''}<span>${journalArchivePage+1} / ${count}</span>${journalArchivePage<count-1?button('journalPage','이전 기록',journalArchivePage+1):''}</div></section>`;
}

const planner13=renderCoursePlanner;
renderCoursePlanner=function(){
 const html=planner13(),audit=courseAudit(s.field,s.majorChoice??0,true);
 const core=audit.areas.find(a=>a.core);
 const missing=audit.missing.map(a=>a.name);
 const summary=`<aside class="course-float" aria-live="polite"><div><strong>현재 계열 과목 준비 ${3-audit.missing.length}/3</strong><span>핵심: ${core?.name||'없음'} ${core?.met?'충족':'부족'}</span></div><p>${missing.length?'부족: '+missing.join(' · '):'세 영역을 모두 채웠어요.'} · 게임 지원 점수 −${audit.penalty}점</p><small>게임의 준비 기준입니다. 실제 지원 과목은 희망 학과 모집요강을 확인하세요.</small></aside>`;
 return html.replace('<label class="course-search-label"',summary+'<label class="course-search-label"');
};
function courseViewSnapshot(action,value){
 if(s.stage!=='subjects'||s.phase!=='major'||!['coursePick','courseSlot','courseClear','orderFix'].includes(action))return null;
 const root=$('choiceDialog'),grid=root?.querySelector?.('.subject-grid'),search=root?.querySelector?.('#courseSearch');
 const anchor=action==='coursePick'?grid?.querySelector(`[data-action="coursePick"][data-value="${String(value)}"]`)?.closest('.subject'):null;
 return {dialogScroll:root?.scrollTop||0,gridScroll:grid?.scrollTop||0,query:search?.value||'',focused:document.activeElement===search,anchor:value,anchorTop:anchor?.getBoundingClientRect().top};
}
function restoreCourseView(snapshot){
 if(!snapshot||s.stage!=='subjects'||s.phase!=='major')return;
 const root=$('choiceDialog'),grid=root?.querySelector?.('.subject-grid'),search=root?.querySelector?.('#courseSearch');
 if(!root||!grid)return;
 if(search){
  search.value=snapshot.query;
  const q=snapshot.query.trim().toLocaleLowerCase('ko-KR');
  grid.querySelectorAll('.subject').forEach(el=>{el.hidden=!!q&&!el.dataset.name.toLocaleLowerCase('ko-KR').includes(q);});
  if(snapshot.focused)search.focus({preventScroll:true});
 }
 root.scrollTop=snapshot.dialogScroll;
 grid.scrollTop=snapshot.gridScroll;
 const anchor=grid.querySelector(`[data-action="coursePick"][data-value="${String(snapshot.anchor)}"]`)?.closest('.subject');
 if(anchor&&snapshot.anchorTop!=null)grid.scrollTop+=anchor.getBoundingClientRect().top-snapshot.anchorTop;
}

// These are optional spending decisions; the free route remains meaningful.
const SPENDING_SCENES=[
 ['bookstore','school','서점에서 관심 계열 책을 발견했다','서점에 들렀다가 지금 배우는 분야의 입문서를 발견했다. 오늘 어떻게 알아볼까?',[
  ['입문서 구입 · 8만 원','책을 집에서 읽고 중요한 개념을 메모해요.',[1,2,5,0,-1]],
  ['학교 도서관에서 빌린다','비용 없이 읽지만 대출 기간 안에 돌려줘야 해요.',[1,1,3,0,0]],
  ['서점에서 목차만 보고 질문을 적는다','지금 궁금한 주제를 먼저 정리해요.',[2,0,1,0,1]]]],
 ['materials','school','동아리 발표에 준비물이 필요하다','발표까지 일주일. 예산을 어디에 쓸지 팀원과 의논한다.',[
  ['재료 공동구매 · 12만 원','실물 모형을 만들어보고 작업도 분담해요.',[1,0,4,5,-3]],
  ['학교의 공용 재료를 빌린다','쓸 수 있는 재료에 맞춰 계획을 바꿔요.',[2,0,2,4,-2]],
  ['발표 자료를 중심으로 준비한다','모형 대신 자료를 명확하게 정리해요.',[1,2,1,3,0]]]],
 ['cultureday','all','시험 뒤 하루의 여유','친구와 만나기로 했다. 오늘은 무엇을 해볼까?',[
  ['전시 관람 · 3만 원','새로운 표현을 보고 친구와 감상을 나눠요.',[3,0,0,2,4]],
  ['무료 지역 전시를 찾아간다','가까운 문화 공간을 찾아 함께 둘러봐요.',[2,0,0,2,3]],
  ['동네를 산책하며 쉰다','돈을 쓰지 않고 몸과 마음을 쉬게 해요.',[1,0,0,2,5]]]],
 ['portfolioPrint','campus','지원용 포트폴리오를 보여줄 기회','관심 기업의 현직자에게 작업물을 보여줄 수 있다. 어떤 방식으로 준비할까?',[
  ['인쇄·제본 · 12만 원','완성물을 손에 쥐고 설명하는 연습을 해요.',[0,0,3,5,-2]],
  ['무료 온라인 파일로 정리한다','작업 과정을 링크와 설명으로 정리해요.',[0,1,2,4,-1]],
  ['친구와 서로 검토한다','누가 무엇을 만들었는지 명확하게 고쳐요.',[1,0,2,4,0]]]]
];
SPENDING_SCENES.forEach(scene=>LIFE_CHOICES.push(scene));
const EVENT_COSTS={bookstore:[8,0,0],materials:[12,0,0],cultureday:[3,0,0],portfolioPrint:[12,0,0]};
const makeEvent13=makeEvent;
makeEvent=function(){
 const event=makeEvent13(),costs=EVENT_COSTS[event.id];
 if(costs)event.options.forEach((option,index)=>{
  option.cost=costs[index];
  option.info=`${option.cost?'자산 −'+won(option.cost)+' · ':'무료 · '}${option.info}`;
 });
 return event;
};
const resolveDailyChoice13=resolveDailyChoice;
resolveDailyChoice=function(index){
 const event=s.pending,option=event?.options?.[index];
 if(!option||s.phase!=='event')return;
 if(option.cost&&s.cash<option.cost){toast('자산이 부족해요. 무료 선택지도 살펴보세요.');return;}
 if(option.cost)money(-option.cost,event.title+' · '+option.title);
 resolveDailyChoice13(index);
 if(option.cost&&s.phase==='feedback'){
  s.pending.text+=` 자산 −${won(option.cost)} · 현재 잔액 ${won(s.cash)}.`;
  save();render();
 }
};
const renderStory13=renderStory;
renderStory=function(){
 renderStory13();
 if(s.phase==='event'&&EVENT_COSTS[s.pending?.id]){
  $('content').querySelectorAll?.('[data-action="event"]').forEach((el,index)=>{
   const cost=s.pending.options[index]?.cost||0;
   if(cost>s.cash){el.disabled=true;el.setAttribute('aria-label',el.textContent+' · 자산 부족');}
  });
 }
};
SHOP.push(
 {id:'usedbook',name:'중고 계열 도서',price:4,steps:2,delta:[1,1,3,0,0],icon:0,field:true,limit:2,desc:'비용을 아끼며 계열의 기초 개념을 읽어요. 도서관 무료 독서도 가능합니다.'},
 {id:'peerpractice',name:'소규모 발표 연습',price:12,steps:2,delta:[1,0,2,5,-2],icon:13,field:true,limit:2,desc:'친구와 발표를 연습하고 서로 설명을 고쳐요. 참여만으로 입상이 보장되지는 않아요.'},
 {id:'careerfair',name:'직업 현장 대화',price:6,steps:2,delta:[3,0,2,2,-1],icon:15,field:true,limit:2,desc:'현업자의 일과 준비 과정을 질문해요. 무료 온라인 직업 정보도 이용할 수 있어요.'}
);
const dispatch13=dispatch;
dispatch=function(action,value){
 if(action==='hideDecision'){
  dismissedDecision=decisionKey();
  if($('choiceDialog').open)$('choiceDialog').close();
  renderClock();
  return;
 }
 if(action==='showDecision'){
  dismissedDecision='';
  renderStory();
  presentStory();
  // Explicitly reopen even when the previous dismissal used the same decision key.
  if(!$('choiceDialog').open&&!$('dialog').open&&!$('periodDialog').open&&tab==='story'&&s.phase!=='gap'&&!s.ended)$('choiceDialog').showModal();
  renderClock();
  return;
 }
 if(action==='moreJournal'){
  journalArchivePage=0;
  openDialog(journalArchiveHTML());
  return;
 }
 if(action==='journalPage'){
  journalArchivePage=Number(value)||0;
  $('dialogContent').innerHTML=journalArchiveHTML();
  $('dialog').scrollTop=0;
  return;
 }
 if(action==='event'&&s.phase==='event'&&s.pending?.options?.[Number(value)]?.cost>s.cash){
  toast('자산이 부족해요. 무료 선택지도 살펴보세요.');
  return;
 }
 const snapshot=courseViewSnapshot(action,value);
 dispatch13(action,value);
 if(snapshot){
  restoreCourseView(snapshot);
  if(typeof requestAnimationFrame==='function')requestAnimationFrame(()=>restoreCourseView(snapshot));
 }
};
render();
