'use strict';
// Classroom feedback: clearer semester flow, optional tour, and everyday field stories.
const V16_TERM_NEED={'1-2':1,'2-1':5,'2-2':5,'3-1':6,'3-2':8};
let v16CourseWarning='';
let v16WarningStage='';
const v16Planner=sgPlanner;
sgPlanner=function(){
 const terms=sgStageTerms(),html=v16Planner();if(!terms.length)return html;
 const counts=terms.map(t=>({term:t,selected:sgChoice(t).length,need:V16_TERM_NEED[t]}));
 const done=counts.filter(x=>x.selected===x.need).length;
 const title=s.stage==='courseIntro'?'첫 과목 선택':`${s.stage==='subjects'?'고2':'고3'} 1·2학기 모두 신청`;
 const guide=`<div class="sg-stage-guide" aria-live="polite"><strong>${title} · ${done}/${terms.length}학기 완료</strong><p>${terms.length===1?'과목 하나를 골라 첫 신청을 마쳐 보자.':'두 학기의 선택군을 각각 채워야 다음으로 넘어갈 수 있다. 아래 학기 버튼을 눌러 오가며 고른다.'}</p><div class="sg-stage-steps">${counts.map(x=>`<button type="button" class="${x.selected===x.need?'done':''}" data-action="sgTerm" data-value="${x.term}">${x.selected===x.need?'✓':'○'} ${SG_LABELS[x.term]} · ${x.selected}/${x.need}과목</button>`).join('')}</div></div>`;
 const warning=v16CourseWarning&&v16WarningStage===s.stage?`<div class="sg-stage-warning" role="alert"><strong>아직 신청을 확정할 수 없다</strong><p>${esc(v16CourseWarning)}</p><p>표시된 학기의 과목을 고치고 다시 확인해 보자.</p></div>`:'';
 return html.replace(/(<h1>[^<]*<\/h1>)/,`$1${guide}${warning}`).replace('두 학기 신청 내용 확인','1·2학기 신청 확인');
};
const v16Review=sgReview;
sgReview=function(){
 const problem=sgStageCheck();
 if(!problem){v16CourseWarning='';v16WarningStage='';v16Review();return;}
 v16CourseWarning=problem;v16WarningStage=s.stage;
 const match=sgStageTerms().find(t=>problem.includes(SG_LABELS[t]));
 if(match)s.schoolPlan.uiTerm=match;
 else if(problem.includes('고2 1학기'))s.schoolPlan.uiTerm='2-1';
 else if(problem.includes('고2 2학기'))s.schoolPlan.uiTerm='2-2';
 save();render();
 const root=$('choiceDialog');if(root?.open)root.scrollTop=0;
};

const V16_TOUR=[
 ['시간 막대','화면 상단. 지금 어느 학기인지 보고 1×·2×·4×로 속도를 바꾼다. 사건을 읽거나 선택할 때 시간은 멈춘다.','time'],
 ['나의 이야기','시간 막대 바로 아래 첫 번째 탭. 여기서 사건을 읽고 행동을 고른다. 선택 결과는 곧바로 상태와 기록에 남는다.','story'],
 ['현재 상태','화면 왼쪽의 현재 상태. 휴대폰에서는 이야기 위쪽에 있다. 같은 행동도 지금 준비와 컨디션에 따라 결과가 달라진다.','stats'],
 ['활동 신청·자산 관리','시간 막대 아래 두 번째 탭. 책·강좌·체험을 신청하거나 쉬는 데 자산을 쓴다. 학습·체험은 완료한 뒤 다음 도전에 도움을 준다.','shop'],
 ['나의 일상 기록','이야기 아래에 있다. 최근 선택과 사건이 맨 위에 쌓인다. 왜 준비도가 달라졌는지 여기서 다시 볼 수 있다.','journal'],
 ['계열별 직업 보기','화면 아래로 내려가면 직업 지도가 보인다. 계열을 고르면 관련 직업이 열리고 활동을 하면 더 알아볼 수 있다.','careers']
];
let v16TourPage=0,v16TourOldTab='story';
function v16TourImpact(){if(v16TourPage!==2)return '';return `<div class="tour-impact"><span><strong>계열 준비도</strong> · 같은 계열의 도전 가능성, 학과 지원 점수, 일자리 제안에 반영</span><span><strong>학업 준비도</strong> · 학과 지원 점수와 일자리 제안에 반영. 수능 점수는 문제 결과로 따로 계산</span><span><strong>컨디션</strong> · 낮으면 일부 행동을 고를 수 없고 도전 가능성도 떨어짐. 0이면 회복 사건 발생</span><span>고2·고3에 고른 과목이 계열과 얼마나 연결되는지도 진학에 영향을 준다.</span></div>`;}
function v16TourHTML(){const [title,desc]=V16_TOUR[v16TourPage];return `<section class="tour-content"><span class="badge">화면 소개 · ${v16TourPage+1}/${V16_TOUR.length}</span><h1>${title}</h1><p>${desc}</p>${v16TourImpact()}<div class="tour-preview"><iframe title="${title} 화면 미리보기" tabindex="-1" aria-hidden="true" sandbox="allow-same-origin"></iframe></div><small class="tour-caption">지금 게임 화면의 모습을 작게 보여줍니다. 밝게 표시된 곳이 실제 위치입니다.</small><div class="tour-actions">${v16TourPage?button('tourBack','이전'):''}${button('tourNext',v16TourPage===V16_TOUR.length-1?'화면 소개 끝내기':'다음','','primary')}${button('tourSkip','건너뛰기')}</div></section>`;}
function v16PreviewMarkup(){
 const kind=V16_TOUR[v16TourPage][2],content=$('content'),current=content.innerHTML;
 let body='';
 if(kind==='time')body=`<main><section id="journey" class="panel journey">${$('journey').innerHTML}</section></main>`;
 if(kind==='story')body=`<main><nav class="tabs">${document.querySelector('.tabs')?.innerHTML||''}</nav><div id="content">${$('choiceContent').innerHTML||current}</div></main>`;
 if(kind==='stats'){const panel=[...$('sidebar').querySelectorAll('.panel')].find(el=>el.textContent.includes('현재 상태'));body=`<aside id="sidebar">${panel?.outerHTML||$('sidebar').innerHTML}</aside>`;}
 if(kind==='shop'){const category=s.shopCategory;s.shopCategory='learning';renderShop();body=`<main><div id="content">${content.innerHTML}</div></main>`;content.innerHTML=current;s.shopCategory=category;}
 if(kind==='journal')body=`<main><section id="journal" class="panel journal">${$('journal').innerHTML}</section></main>`;
 if(kind==='careers')body=`<main><section id="careerSection">${$('careerSection').innerHTML}</section></main>`;
 const styles=['theme-v3','journal-v4','experience-v6','experience-v7','experience-v8','experience-v13','registration-v9','experience-v14','experience-v15'].map(name=>`<link rel="stylesheet" href="css/${name}.css">`).join('');
 const theme=document.documentElement.getAttribute('data-theme')||'dark';
 return `<!doctype html><html lang="ko" data-theme="${theme}"><head><meta charset="utf-8"><base href="${esc(location.href)}">${styles}<style>html,body{width:800px;min-width:800px;margin:0;overflow:hidden}body{padding:12px;box-sizing:border-box}.layout,main,#sidebar{display:block;width:100%;max-width:none}.tour-shot *{pointer-events:none}#content{max-height:420px;overflow:hidden}</style></head><body class="tour-shot">${body}</body></html>`;
}
function v16TourTarget(){const kind=V16_TOUR[v16TourPage][2];if(kind==='stats')return [...$('sidebar').querySelectorAll('.panel')].find(el=>el.textContent.includes('현재 상태'));if(kind==='journal')return document.querySelector('#journal .journal-heading')||$('journal');if(kind==='careers')return document.querySelector('#careerSection h1')||$('careerSection');return document.querySelector({time:'#journey',story:'.tabs [data-value="story"]',shop:'.tabs [data-value="shop"]'}[kind]);}
function v16PlaceFocus(){const overlay=$('tourOverlay');if(overlay.hidden)return;const target=v16TourTarget(),focus=$('tourFocus'),card=$('tourCard');if(!target){focus.hidden=true;return;}focus.hidden=false;const rect=target.getBoundingClientRect(),w=window.innerWidth,h=window.innerHeight,pad=6,left=Math.max(5,rect.left-pad),top=Math.max(5,rect.top-pad),right=Math.min(w-5,rect.right+pad),bottom=Math.min(h-5,rect.bottom+pad);if(right<=left||bottom<=top){focus.hidden=true;return;}
 for(const name of ['top','bottom','left','right']){const el=overlay.querySelector(`[data-tour-shade="${name}"]`),box=name==='top'?[0,0,w,top]:name==='bottom'?[0,bottom,w,h-bottom]:name==='left'?[0,top,left,bottom-top]:[right,top,w-right,bottom-top];Object.assign(el.style,{left:box[0]+'px',top:box[1]+'px',width:box[2]+'px',height:box[3]+'px'});}
 Object.assign(focus.style,{left:left+'px',top:top+'px',width:right-left+'px',height:bottom-top+'px'});card.classList.toggle('at-top',(top+bottom)/2>h*.53);
}
function v16PaintTour(){const card=$('tourCard');card.innerHTML=v16TourHTML();const frame=card.querySelector('iframe'),box=card.querySelector('.tour-preview');if(frame&&box){frame.srcdoc=v16PreviewMarkup();const scale=Math.min(1,(box.clientWidth||360)/800);frame.style.transform=`scale(${scale})`;}
 const target=v16TourTarget();target?.scrollIntoView?.({block:'center',inline:'nearest',behavior:'auto'});requestAnimationFrame(v16PlaceFocus);card.querySelector('[data-action="tourNext"]')?.focus({preventScroll:true});}
function v16OpenTour(){if(!$('tourOverlay').hidden)return;v16TourPage=0;v16TourOldTab=tab;if($('choiceDialog').open)$('choiceDialog').close();tab='story';render();if($('choiceDialog').open)$('choiceDialog').close();$('tourOverlay').hidden=false;v16PaintTour();renderClock();}
function v16CloseTour(){$('tourOverlay').hidden=true;tab=v16TourOldTab;render();if(s.introSeen&&tab==='story'&&s.phase!=='gap'&&!s.ended){dismissedDecision='';if(!$('choiceDialog').open&&!$('periodDialog').open)$('choiceDialog').showModal();}renderClock();}
const v16TourTick=tick;
tick=function(seconds){if(!$('tourOverlay').hidden)return;v16TourTick(seconds);};
const v16TourClock=renderClock;
renderClock=function(){v16TourClock();if(!$('tourOverlay').hidden&&$('flowStatus'))$('flowStatus').textContent='화면 소개 중 · 시간 멈춤';};
if(typeof window!=='undefined'){window.addEventListener('resize',v16PlaceFocus);window.addEventListener('scroll',v16PlaceFocus,{passive:true});window.addEventListener('keydown',e=>{if($('tourOverlay')?.hidden)return;if(e.key==='Escape'){e.preventDefault();v16CloseTour();}if(e.key==='ArrowRight'){e.preventDefault();dispatch('tourNext','');}if(e.key==='ArrowLeft'&&v16TourPage){e.preventDefault();dispatch('tourBack','');}});}
const v16Dispatch=dispatch;
dispatch=function(action,value){
 if(action==='tour'){v16OpenTour();return;}
 if(action==='tourBack'||action==='tourNext'){if(action==='tourNext'&&v16TourPage===V16_TOUR.length-1){v16CloseTour();return;}v16TourPage=Math.max(0,Math.min(V16_TOUR.length-1,v16TourPage+(action==='tourNext'?1:-1)));v16PaintTour();return;}
 if(action==='tourSkip'){v16CloseTour();return;}
 if(['sgToggle','sgTerm'].includes(action)){v16CourseWarning='';v16WarningStage='';}
 if(action==='sgConfirm'&&sgActive()&&sgStageCheck()){sgReview();return;}
 const firstTour=action==='beginStory'&&!s.started&&!s.tourSeen;
 const riskyActivity=action==='activity'&&value==='0'&&s.phase==='major'&&s.stage==='activity';
 v16Dispatch(action,value);
 if(firstTour){s.tourSeen=true;save();v16OpenTour();}
 if(riskyActivity&&s.phase==='feedback'&&v16BoostCount(s.field)>0){v16UseBoost(s.field);save();}
};

// A completed paid learning activity helps with the next limited number of challenges.
const V16_BOOST_STEPS={book:1,usedbook:1,advanced:2,course:2,academy:3,kit:1,visit:1,peerpractice:1,careerfair:1,training:3};
AUTO_EVENTS.push(
 ['발표 파일이 예전 버전이었다','모둠 발표가 끝나고야 어제 고친 내용이 빠진 파일을 보냈다는 걸 알았다. 다시 정리해 팀에 보냈다.',[0,-3,-2,0,-3],0,'busy'],
 ['지난 단원을 거의 잊어버렸다','새 과제를 하다가 지난달 배운 개념이 생각나지 않았다. 처음 자료부터 다시 읽어야 한다.',[0,-2,-2,0,-2],0,'ready'],
 ['실험 기록 한 장이 빠졌다','결과를 비교하려는데 첫날 측정값을 적은 종이가 없다. 자료를 다시 모으기로 했다.',[0,-1,-3,0,-3],0,'ready']
);
function v16BoostCount(field){return s.challengeBoost?.[field]||0;}
function v16UseBoost(field){if(!v16BoostCount(field))return;s.challengeBoost[field]--;log('준비 활동 활용','앞서 끝낸 학습·체험이 이번 도전에 도움이 됐다.','achievement');}
const v16AdvanceTasks=advanceTasks;
advanceTasks=function(){const completed=s.tasks.filter(t=>t.remaining===1).map(t=>({id:t.id,field:t.field}));v16AdvanceTasks();for(const t of completed){const count=V16_BOOST_STEPS[t.id]||0;if(count){s.challengeBoost??=Array(15).fill(0);s.challengeBoost[t.field]=Math.min(4,s.challengeBoost[t.field]+count);log('다음 도전 준비',`${fieldName(t.field)} 관련 도전 ${count}회에 준비 활동이 반영된다.`,'asset');}}};
const v16SuccessRate=successRate;
successRate=function(){return Math.min(90,v16SuccessRate()+(v16BoostCount(s.field)?15:0));};
const v16RoleRate=roleRate;
roleRate=function(field){return Math.min(90,v16RoleRate(field)+(v16BoostCount(field)?15:0));};
const v16MakeEvent=makeEvent;
makeEvent=function(){
 const field=s.field;
 if(s.route==='school'&&field!=null&&s.events%3===1){
  const scenes=V16_FIELD_STORIES[field],seen=s.fieldStorySeen??[],open=scenes.map((_,i)=>i).filter(i=>!seen.includes(field+'-'+i));
  if(open.length){const index=open[Math.floor(Math.random()*open.length)],row=scenes[index];s.fieldStorySeen??=[];s.fieldStorySeen.push(field+'-'+index);return v16Story(field,index,row);}
 }
 const event=v16MakeEvent();
 if(event.id?.startsWith('field')&&event.options?.[0]?.risk!=null)event.options[0].info=`완료 가능성 ${chanceLabel(event.options[0].risk)} · 완료하면 계열 준비도 상승 · 완료하지 못하면 학업 준비도 −2, 계열 준비도 −3, 컨디션 −5`;
 if(v16BoostCount(field))event.options?.forEach(o=>{if(o.risk!=null)o.info+=' · 끝낸 학습·체험으로 가능성 상승';});
 return event;
};
function v16Story(field,index,row){
 const [title,desc,learn,rest,detour]=row;
 const walk=/걷|산책|둘러|구경/.test(detour[0]);
 return {id:`dailyfield-${field}-${index}`,fieldStory:true,title,desc,options:[
  {title:learn[0],info:learn[1]+' · 계열 준비도 상승 · 컨디션 −2',delta:[0,0,6,0,-2]},
  {title:rest[0],info:rest[1]+' · 컨디션 +5',delta:[0,0,0,0,5]},
  {title:detour[0],info:detour[1]+(walk?' · 컨디션 +3':' · 학업 준비도 +1 · 컨디션 +2'),delta:walk?[0,0,0,0,3]:[0,1,0,0,2]}
 ]};
}
const v16ResolveDaily=resolveDailyChoice;
resolveDailyChoice=function(index){const event=s.pending,option=event?.options?.[index],risky=option?.risk!=null,field=option?.field??s.field,boost=v16BoostCount(field);v16ResolveDaily(index);if(risky&&boost&&s.phase==='feedback'){v16UseBoost(field);save();render();}};
const v16Shop=renderShop;
renderShop=function(){v16Shop();if(s.shopCategory==='learning'&&s.field!=null){const count=v16BoostCount(s.field);const note=`<div class="notice"><strong>학습·체험을 마치면 다음 도전에 도움</strong><p>현재 ${fieldName()} 도전 준비 ${count}회. 책·강좌·현장 체험을 끝내면 해당 계열의 다음 도전 완료 가능성이 높아진다. 신청만으로는 적용되지 않는다.</p></div>`;$('content').innerHTML=$('content').innerHTML.replace('<div class="shop-sections">',note+'<div class="shop-sections">');}};

// Two ordinary, specific situations for each field. Every option is a plausible way to spend the moment.
const V16_FIELD_STORIES=[
 [
  ['아버지 차에서 이상한 소리가 난다','아버지와 정비소에 왔다. 정비사가 꺼낸 부품을 보여 주며 왜 소리가 났는지 설명한다.', ['아버지 옆에서 설명을 듣는다','고장 난 부품이 어디에 쓰이는지 물어본다.'],['휴게실에서 음료를 마시며 쉰다','수리가 끝나면 아버지가 불러 주기로 했다.'],['정비소 주변을 한 바퀴 걷는다','밖에 세워 둔 차들을 구경하다가 들어온다.']],
  ['고장 난 우산을 버리려다 멈췄다','비가 그친 뒤 우산을 접는데 손잡이 쪽 나사가 빠졌다. 집에 작은 드라이버가 있다.', ['빠진 나사를 찾아 끼워 본다','어느 부분이 헐거워졌는지 살펴본다.'],['오늘은 그냥 말려 둔다','급하게 고치다 손을 다칠 필요는 없다.'],['우산 가게에 들러 본다','어떤 우산이 튼튼한지 진열대를 구경한다.']]
 ],
 [
  ['집 와이파이가 갑자기 끊겼다','숙제를 올리려는데 인터넷이 안 된다. 가족은 각자 휴대폰만 만지며 답답해한다.', ['공유기 불빛과 연결 상태를 살핀다','어느 기기부터 문제가 생겼는지 확인한다.'],['휴대폰 데이터로 먼저 숙제를 보낸다','급한 일부터 끝내고 잠깐 쉰다.'],['동생과 동네 도서관으로 간다','인터넷이 되는 곳에서 숙제를 마무리한다.']],
  ['모둠 발표 파일이 열리지 않는다','발표 30분 전, 친구가 보낸 파일을 열었는데 글자와 그림이 전부 밀려 있다.', ['파일 형식과 글꼴을 확인한다','다른 컴퓨터에서도 열리는 형식으로 다시 저장한다.'],['발표 전 물 한 잔을 마신다','잠깐 숨을 고르고 친구에게 연락한다.'],['친구에게 종이 자료가 있는지 묻는다','파일 없이도 발표할 수 있는 순서를 정리한다.']]
 ],
 [
  ['버스 정류장 앞에 물이 고였다','비가 멈췄는데 정류장 앞만 여전히 발목까지 물이 찬다. 사람들은 차도로 돌아간다.', ['물이 빠지는 곳을 찾아본다','주변 배수구가 막혔는지 안전한 거리에서 살핀다.'],['가까운 실내에서 비가 그치길 기다린다','젖은 양말을 갈아 신을 수 있을지 생각한다.'],['다른 정류장으로 걸어간다','가는 길과 시간을 비교해 본다.']],
  ['교실 창가 자리만 너무 덥다','같은 교실인데 창가 친구들은 햇빛 때문에 눈을 찡그린다. 커튼은 한쪽만 내려온다.', ['창가와 안쪽의 차이를 살핀다','햇빛과 바람이 들어오는 방향을 비교한다.'],['자리를 잠깐 바꿔 쉰다','더운 자리에서 잠깐 벗어난다.'],['친구들과 커튼을 다시 건다','수업에 방해되지 않게 교실을 정리한다.']]
 ],
 [
  ['냉동실 문에 하얀 서리가 생겼다','아이스크림을 꺼내려는데 문 가장자리에 서리가 두껍다. 어제는 없던 것 같다.', ['문이 잘 닫히는지 확인한다','어디에서 물기가 들어왔는지 가족과 이야기한다.'],['아이스크림부터 먹고 쉰다','잠깐 쉬고 나서 가족에게 알린다.'],['냉동실 정리 날짜를 적어 둔다','무엇이 언제부터 들어 있었는지 살펴본다.']],
  ['운동장에 작은 무지개가 떴다','비가 그친 뒤 친구가 물웅덩이 위의 색을 가리킨다. 보는 각도에 따라 색이 달라 보인다.', ['자리와 빛 방향을 바꿔 본다','어느 위치에서 색이 가장 선명한지 비교한다.'],['사진 한 장 찍고 그늘에서 쉰다','짧게 구경하고 더위를 피한다.'],['친구와 비슷한 사진을 찾아본다','집에 가서 왜 그런지 자료를 읽는다.']]
 ],
 [
  ['할머니가 약 봉투를 찾는다','할머니가 약 두 봉지를 들고 어느 것을 언제 먹는지 헷갈려 한다. 약국 전화번호가 적혀 있다.', ['봉투의 이름과 복용 시간을 같이 읽는다','모르는 부분은 약사에게 확인한다.'],['할머니와 앉아 물을 마신다','서두르지 말고 함께 쉬며 약국에 물어본다.'],['약국까지 같이 걸어간다','직접 물어보는 편이 낫겠다고 생각한다.']],
  ['친구가 체육 시간 뒤 어지럽다고 한다','달리기 뒤 친구가 벤치에 앉아 있다. 얼굴빛이 좋지 않아 보인다.', ['선생님을 바로 부른다','친구 상태를 전하고 필요한 도움을 요청한다.'],['친구 곁에서 함께 앉아 있는다','혼자 두지 않고 선생님이 오기를 기다린다.'],['물과 그늘이 있는 곳을 확인한다','선생님에게 어디에 있는지 알려 준다.']]
 ],
 [
  ['도시락 반찬이 자꾸 남는다','동생이 같은 반찬만 골라 남긴다. 엄마는 매번 얼마나 싸야 할지 고민한다.', ['남기는 이유를 동생에게 묻는다','맛과 양 중 무엇이 문제인지 들어 본다.'],['오늘은 내 도시락부터 먹는다','점심을 천천히 먹고 쉰다.'],['친구들은 뭘 가져오는지 본다','점심시간 이야기를 나눠 본다.']],
  ['새로 산 니트가 줄어들었다','세탁 뒤 니트 소매가 짧아졌다. 세탁 표시에는 작은 그림이 여러 개 있다.', ['옷의 재질과 세탁 표시를 확인한다','다음에는 어떻게 세탁해야 할지 알아본다.'],['다른 옷을 입고 나간다','지금은 약속 시간에 늦지 않는 게 먼저다.'],['수선 가게를 구경한다','고쳐 입을 방법이 있는지 물어본다.']]
 ],
 [
  ['베란다 바질 잎이 축 처졌다','며칠 전까지만 해도 싱싱하던 바질이 축 늘어졌다. 화분 흙은 아직 촉촉하다.', ['빛과 흙 상태를 살핀다','물을 더 주기 전에 무엇이 달라졌는지 본다.'],['오늘은 창가에서 잠깐 쉰다','화분은 가족과 함께 다시 보기로 한다.'],['꽃가게에 들러 질문한다','비슷한 식물을 어떻게 키우는지 묻는다.']],
  ['횟집 수조의 물이 흐릿하다','가족과 식당에 왔다. 입구 수조의 물이 다른 날보다 뿌옇다.', ['수조 관리 방법을 물어본다','물의 상태를 어떻게 확인하는지 들어 본다.'],['자리에 앉아 메뉴를 고른다','식사를 기다리며 쉰다.'],['근처 어시장도 둘러본다','어떤 생선이 들어왔는지 구경한다.']]
 ],
 [
  ['친구가 만든 포스터가 잘 안 보인다','축제 포스터를 복도 끝에 붙였는데 날짜 글씨가 너무 작아 보인다.', ['멀리서 읽히는지 같이 확인한다','글씨 크기와 색을 바꿔 보자고 말한다.'],['친구와 매점에 다녀온다','잠깐 쉬고 다시 포스터를 보기로 한다.'],['다른 반 포스터를 구경한다','눈에 띄는 부분이 무엇인지 이야기한다.']],
  ['버스킹 공연이 갑자기 멈췄다','거리 공연을 보는데 마이크가 꺼졌다. 연주자는 당황했지만 관객은 그대로 기다린다.', ['소리가 닿는 위치를 살펴본다','마이크 없이도 들리는 자리를 찾아본다.'],['옆 카페에서 음료를 마신다','공연이 다시 시작하면 돌아오기로 한다.'],['관객과 함께 박자를 맞춘다','연주자가 준비하는 동안 분위기를 이어 간다.']]
 ],
 [
  ['축구화가 자꾸 미끄러진다','친구와 공을 차는데 한 친구가 방향을 바꿀 때마다 미끄러진다. 운동장은 조금 젖어 있다.', ['신발 밑창과 바닥을 살핀다','잠시 멈추고 안전하게 뛸 수 있는지 확인한다.'],['벤치에서 물을 마시며 쉰다','무리하지 않고 경기를 지켜본다.'],['다른 자리에서 가볍게 패스한다','바닥이 덜 젖은 곳으로 옮긴다.']],
  ['체육대회 릴레이 순서가 바뀌었다','한 친구가 발목을 삐어 뛰지 못한다. 출발까지 20분 남았다.', ['남은 친구들의 달리기 순서를 다시 짠다','누가 어느 구간에서 편한지 묻는다.'],['다친 친구 옆에서 쉬게 돕는다','선생님께 상태를 알린다.'],['응원석에서 목소리를 보탠다','경기에 못 뛰어도 함께할 방법을 찾는다.']]
 ],
 [
  ['동생이 문제를 읽고도 멈춘다','동생은 숙제 답을 알려 달라고 한다. 그런데 문제의 뜻부터 헷갈려 하는 눈치다.', ['문제를 자기 말로 설명하게 한다','어느 부분에서 막혔는지 함께 찾는다.'],['간식부터 먹자고 한다','잠깐 쉬고 다시 보기로 한다.'],['그림을 그려 설명해 본다','말보다 그림이 쉬울지 확인한다.']],
  ['친구가 발표를 시작하지 못한다','발표 순서가 왔는데 친구가 첫 문장을 잊었다. 교실이 조용해진다.', ['첫 질문을 건네 말을 시작하게 돕는다','친구가 준비한 내용을 떠올리게 한다.'],['옆에서 기다려 준다','급하게 재촉하지 않는다.'],['발표 자료의 첫 그림을 가리킨다','그림부터 이야기해 보자고 눈짓한다.']]
 ],
 [
  ['동네 버스 노선이 바뀌었다','학교 가는 버스가 다른 길로 돈다. 정류장에는 왜 바뀌었는지 묻는 사람이 많다.', ['노선 변경 안내를 읽는다','누가 더 편해지고 불편해졌는지 생각한다.'],['한 대를 보내고 벤치에서 쉰다','시간을 다시 확인한다.'],['친구들에게 다른 길을 물어본다','각자 얼마나 걸리는지 비교한다.']],
  ['반 친구들 의견이 반반이다','체험학습 장소를 정하려는데 두 후보의 표가 같다. 몇몇 친구는 아직 투표하지 않았다.', ['왜 그 장소를 원하는지 들어 본다','표 수만 보지 말고 이유를 모은다.'],['잠깐 쉬었다 다시 회의에 간다','서두르면 목소리 큰 친구 말만 들릴 수 있다.'],['익명 설문을 제안한다','말하기 어려운 친구도 의견을 낼 수 있게 한다.']]
 ],
 [
  ['복도에서 주운 이어폰의 주인은?','청소하다 무선 이어폰 한 쪽을 주웠다. 단체방에는 주인을 찾는 글이 아직 없다.', ['학교 분실물 규칙을 찾아본다','어디에 맡겨야 하는지 확인한다.'],['선생님께 맡기고 쉬러 간다','주인을 찾는 일은 학교에 부탁한다.'],['친구들에게 잃어버린 사람이 있는지 묻는다','성급히 주인을 단정하지 않는다.']],
  ['학교 앞 횡단보도가 너무 어둡다','야간 자율학습을 마치고 나오니 신호등 앞 가로등 하나가 꺼져 있다.', ['고장 신고 방법을 찾아본다','위치와 시간을 적어 담당 기관에 알린다.'],['밝은 길로 돌아서 간다','안전을 먼저 챙긴다.'],['친구와 같이 귀가한다','서로 집에 도착했는지 확인한다.']]
 ],
 [
  ['카페 적립 도장이 바뀌었다','친구가 카페 쿠폰을 내밀며 새 적립 방식이 더 이득인지 묻는다. 가격도 조금 올랐다.', ['두 쿠폰의 실제 지출을 계산한다','몇 번 사야 혜택을 받는지 비교한다.'],['오늘은 집에서 음료를 마신다','돈을 아끼고 쉰다.'],['친구와 다른 카페 가격을 본다','비슷한 음료의 가격을 비교한다.']],
  ['중고 장터에서 같은 물건 가격이 다르다','같은 모델의 태블릿이 두 가격으로 올라왔다. 사진만 보면 상태 차이가 잘 안 보인다.', ['상태와 거래 조건을 비교한다','가격 외에 배터리와 수리 여부를 확인한다.'],['지금은 사지 않고 예산을 지킨다','필요한 물건인지 다시 생각한다.'],['친구의 사용 후기를 듣는다','실제로 쓰는 사람의 경험을 물어본다.']]
 ],
 [
  ['오래된 가족사진에 날짜가 없다','할머니가 앨범을 꺼냈다. 사진 속 거리는 지금 동네와 비슷한데 간판은 전혀 다르다.', ['할머니에게 그날 이야기를 듣는다','사진 속 장소와 사람을 기록한다.'],['사진을 보고 잠깐 쉰다','가족과 옛날 이야기를 나눈다.'],['지금 거리 사진을 찍으러 간다','같은 장소가 어떻게 바뀌었는지 본다.']],
  ['박물관 설명판과 친구의 말이 다르다','친구가 유물을 보고 설명판과 다른 추측을 한다. 둘 다 그럴듯하게 들린다.', ['설명판의 근거를 다시 읽는다','무엇을 보고 그렇게 해석했는지 찾는다.'],['다음 전시실에서 쉬어 간다','한꺼번에 다 읽지는 않는다.'],['안내 직원에게 질문한다','다른 해석이 있는지 들어 본다.']]
 ],
 [
  ['할아버지의 문자 뜻을 친구가 못 알아본다','할아버지가 보낸 사투리 문자를 친구에게 보여 주자 전혀 다른 뜻으로 읽는다.', ['어떤 뜻인지 할아버지께 묻는다','같은 말도 지역마다 어떻게 쓰는지 듣는다.'],['답장을 보내고 잠깐 쉰다','친구와 웃으며 이야기를 마친다.'],['비슷한 표현을 더 찾아본다','친구가 아는 지역 말도 들어 본다.']],
  ['동네 식당 메뉴판 번역이 이상하다','외국인 손님이 메뉴의 영어 설명을 보고 엉뚱한 음식을 주문할 뻔했다.', ['짧고 정확한 표현을 생각해 본다','음식 재료를 어떻게 설명할지 살펴본다.'],['내 메뉴를 주문하고 쉰다','직원이 도와주는 동안 기다린다.'],['사진 메뉴가 있는지 찾는다','말보다 사진이 쉬울 때가 있다.']]
 ]
];
render();

