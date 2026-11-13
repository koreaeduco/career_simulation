'use strict';
// v14: 직업마다 고유 아이콘을 붙입니다. (총 105개 직업 = 15개 계열 × 7개)
// 아이콘을 바꾸고 싶으면 아래 JOB_ICONS 의 이모지만 수정하면 됩니다.
// 키는 "계열번호-직업번호" 이며 content-v3.js / experience-v6.js 의 직업 id 와 같습니다.
const JOB_ICONS={
 // 0 공학 · 기계/재료
 '0-0':'⚙️','0-1':'⚗️','0-2':'🏭','0-3':'🤖','0-4':'✅','0-5':'🔧','0-6':'📐',
 // 1 공학 · 정보/컴퓨터
 '1-0':'💻','1-1':'📊','1-2':'🔐','1-3':'🎮','1-4':'🌐','1-5':'♿','1-6':'🗂️',
 // 2 공학 · 건축/환경
 '2-0':'🏛️','2-1':'♻️','2-2':'🏙️','2-3':'🌳','2-4':'🌍','2-5':'🏘️','2-6':'⚡',
 // 3 자연과학
 '3-0':'🔬','3-1':'🧪','3-2':'💡','3-3':'🔭','3-4':'🧲','3-5':'🧭','3-6':'🗃️',
 // 4 자연과학 · 보건/의료
 '4-0':'🩺','4-1':'🩸','4-2':'🍎','4-3':'🧬','4-4':'🏥','4-5':'💁','4-6':'🫀',
 // 5 자연과학 · 생활과학
 '5-0':'🍱','5-1':'🥗','5-2':'👗','5-3':'🧴','5-4':'🛋️','5-5':'🔍','5-6':'🛒',
 // 6 자연과학 · 농림/수산
 '6-0':'🚜','6-1':'🌲','6-2':'🐟','6-3':'🌱','6-4':'📦','6-5':'🌾','6-6':'🦋',
 // 7 예술체육 · 예술
 '7-0':'🎨','7-1':'🎬','7-2':'✏️','7-3':'🎭','7-4':'👾','7-5':'🖼️','7-6':'🎧',
 // 8 예술체육 · 체육
 '8-0':'🏃','8-1':'🏅','8-2':'📈','8-3':'💪','8-4':'📣','8-5':'🦺','8-6':'🏸',
 // 9 교육
 '9-0':'👩‍🏫','9-1':'📚','9-2':'🗓️','9-3':'🖥️','9-4':'💬','9-5':'📝','9-6':'🎪',
 // 10 사회과학
 '10-0':'📋','10-1':'📜','10-2':'🤝','10-3':'📢','10-4':'👀','10-5':'🗺️','10-6':'🙋',
 // 11 사회과학 · 법/행정
 '11-0':'🗄️','11-1':'🏗️','11-2':'⚖️','11-3':'🔎','11-4':'👷','11-5':'📄','11-6':'🏷️',
 // 12 사회과학 · 상업/경제
 '12-0':'🚀','12-1':'🎯','12-2':'🧮','12-3':'🏦','12-4':'🚚','12-5':'🛍️','12-6':'📉',
 // 13 인문
 '13-0':'🎟️','13-1':'🏺','13-2':'📖','13-3':'🕰️','13-4':'✒️','13-5':'🏯','13-6':'🎙️',
 // 14 인문 · 문학/언어
 '14-0':'📕','14-1':'🌏','14-2':'🖋️','14-3':'🗣️','14-4':'🔤','14-5':'🕹️','14-6':'🔠'
};
// 계열별 배지 색상 (아이콘 뒤 배경)
const FIELD_BADGE_COLORS=['#4f7cff','#27b7b0','#4cae6a','#8f6cf0','#ef6a78','#f08a3c','#7cbf3d','#e85aa6','#f0b429','#3ca6d9','#a1745b','#5b6b8a','#c9893a','#9a6bb0','#d9667c'];
JOBS.forEach(j=>{j.emoji=JOB_ICONS[j.id]||'💼';});

function jobBadge(id,size=''){
 const j=JOBS.find(x=>x.id===id);
 if(!j)return '';
 const color=FIELD_BADGE_COLORS[j.field]||'#5b6b8a';
 return `<span class="job-icon${size?' '+size:''}" style="--jc:${color}" aria-hidden="true">${j.emoji}</span>`;
}

// 직업 카드(직업 지도, 첫 일자리 제안)에 아이콘을 한 번씩만 붙입니다.
function decorateJobIcons(root=document){
 root.querySelectorAll('.career[data-action="jobDetail"]:not([data-ji])').forEach(el=>{
  el.dataset.ji='1';
  el.insertAdjacentHTML('afterbegin',jobBadge(el.dataset.value));
 });
 root.querySelectorAll('.job-offer:not([data-ji])').forEach(card=>{
  const detail=card.querySelector('[data-action="jobDetail"]');
  card.dataset.ji='1';
  if(detail)card.insertAdjacentHTML('afterbegin',jobBadge(detail.dataset.value));
 });
}

// 직업 상세 팝업 제목 앞에도 아이콘을 붙입니다.
const careerDetailBefore14=careerDetail;
careerDetail=function(id){
 careerDetailBefore14(id);
 const title=$('dialogContent')?.querySelector('h1');
 if(title&&!title.querySelector('.job-icon'))title.insertAdjacentHTML('afterbegin',jobBadge(id,'big'));
};

// 학과 소개의 "연결해서 탐색할 직업"도 아이콘 칩으로 보여줍니다.
const majorFactsBefore14=majorFacts;
majorFacts=function(m){
 const html=majorFactsBefore14(m);
 const chips=m.jobs.map(id=>{const j=JOBS.find(x=>x.id===id);return j?`<span class="job-chip">${j.emoji} ${esc(j.name)}</span>`:'';}).join('');
 return html.replace(/(<h3>연결해서 탐색할 직업<\/h3>)<p>[^<]*<\/p>/,`$1<div class="chips job-chips">${chips}</div>`);
};

// 화면이 다시 그려질 때마다(서브트리 변경) 새 직업 카드에 아이콘을 붙입니다.
const jobIconObserver=new MutationObserver(()=>{
 jobIconObserver.disconnect();
 decorateJobIcons();
 observeJobIcons();
});
function observeJobIcons(){
 ['careerSection','content','choiceContent'].forEach(id=>{const el=$(id);if(el)jobIconObserver.observe(el,{childList:true,subtree:true});});
}
decorateJobIcons();
observeJobIcons();
