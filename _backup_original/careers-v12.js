'use strict';
// 75 game jobs, each paired with a cited public CareerNet occupational record.
// A different official occupation name is clearly presented as a comparison,
// not as a factual description of the game's invented job title.
const careerSourceV12=CAREER_SOURCE_V12.profiles;
const careerSameV12=(a,b)=>String(a||'').replace(/\s|ㆍ|·|\/|및/g,'')===String(b||'').replace(/\s|ㆍ|·|\/|및/g,'');
const careerShortV12=t=>{const value=String(t||'').trim();const sentence=value.match(/^.{1,130}?[.!?](?:\s|$)/);return sentence?sentence[0].trim():value.slice(0,132)+(value.length>132?'…':'');};

renderCareers=function(){
 if(s.field==null){$('content').innerHTML='<section class="panel"><h1>직업 지도</h1><p>계열을 선택하면 관련 직업 다섯 가지를 바로 볼 수 있어요.</p></section>';return;}
 const group=JOBS.filter(j=>j.field===s.field);
 $('content').innerHTML=`<section class="panel"><h1>${esc(fieldName())} · 직업 지도</h1><p>직업을 누르면 하는 일, 진출 분야, 준비 경로를 이 화면에서 읽을 수 있어요. 게임의 직업명과 공식 직업명이 다르면 비교 직업으로 표시합니다.</p><div class="job-grid">${group.map(j=>{const d=careerSourceV12[j.id];const p=OFFICIAL_CAREER_PROFILES[j.id];const exact=careerSameV12(j.name,d.matched);const summary=exact?(p?.tasks?.[0]||d.tasks?.[0]):('게임 속 업무: '+j.work);return `<button class="career" data-action="jobDetail" data-value="${j.id}"><h3>${esc(j.name)}</h3><p>${esc(careerShortV12(summary))}</p><small>${exact?'공식 직업정보':'비교 직업: '+esc(d.matched)} · 자세히 보기 ↗</small></button>`;}).join('')}</div><p class="tiny">직업 분류와 입직 요건은 시점과 기관에 따라 달라집니다. 오래된 전망 수치를 현재의 전망처럼 제시하지 않습니다.</p></section>`;
};

careerDetail=function(id){
 const j=JOBS.find(x=>x.id===id);if(!j)return;
 const d=careerSourceV12[id],p=OFFICIAL_CAREER_PROFILES[id];
 if(!d)return;
 const exact=careerSameV12(j.name,d.matched);
 const title=exact?'커리어넷 공식 직업명과 일치':`비교 직업: ${d.matched}`;
 const tasks=p?.tasks?.length?p.tasks:d.tasks.slice(0,3).map(careerShortV12);
 const workplace=p?.places||careerShortV12(d.work);
 const education=p?.route||careerShortV12(d.education);
 let html=`<span class="eyebrow">직업 정보 · 커리어넷 자료 기반</span><h1>${esc(j.name)}</h1><p class="notice">${esc(title)}${exact?'':' · 아래 정보는 게임 속 직업과 완전히 같은 직업의 설명이 아니라, 관련 직무를 비교하기 위한 공공 자료입니다.'}</p>`;
 if(!exact)html+=`<h3>게임 속에서 맡는 업무</h3><p>${esc(j.work)}</p><p class="tiny">이 문장은 시뮬레이션의 역할 설정이며 실제 직업정보가 아닙니다.</p>`;
 html+=`<h3>${exact||p?'실제로 하는 일':'관련 직업이 하는 일'}</h3><ul>${tasks.map(t=>`<li>${esc(t)}</li>`).join('')}</ul>`;
 if(workplace)html+=`<h3>일하는 곳·입직 사례</h3><p>${esc(workplace)}</p>`;
 if(education)html+=`<h3>준비 경로</h3><p>${esc(education)}</p>`;
 if(p?.changes)html+=`<h3>업무 환경의 변화</h3><p>${esc(p.changes)}</p>`;
 else html+=`<h3>최근 동향을 볼 때</h3><p>이 직업에 대한 최신 고용 전망은 이 자료만으로 단정할 수 없습니다. 업무 내용과 입직 사례를 살핀 뒤, 관심이 생기면 발표 연도가 표시된 최신 공공 고용자료와 채용 공고를 함께 비교해 보세요.</p>`;
 html+=`<p class="tiny">출처: 커리어넷 직업정보 · 2026년 10월 23일 열람. 자료에 소개된 학과·자격·채용 방식은 작성 당시 기준일 수 있으며, 현재의 필수 요건은 해당 기관의 최신 안내를 확인해야 합니다. 게임의 연봉과 일자리 제안은 실제 통계가 아닙니다.</p>${link(d.source,`커리어넷 · ${d.matched} 원문`)}${button('close','직업 지도로 돌아가기','','primary')}`;
 openDialog(html);
};
render();
