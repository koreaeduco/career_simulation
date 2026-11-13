'use strict';
// Career cards and details use the same CareerNet occupation throughout.
const careerSourceV12=CAREER_SOURCE_V12.profiles;
const careerReplacementV12={
 '3-2':'3-0','3-4':'3-1','3-6':'3-5',
 '4-6':'4-4','5-4':'5-2','6-6':'6-0',
 '8-5':'8-0','9-6':'9-2','11-0':'11-1',
 '11-6':'11-2'
};
for(const [id,replacement] of Object.entries(careerReplacementV12))careerSourceV12[id]=careerSourceV12[replacement];
careerSourceV12['14-3']={
 matched:'언어학연구원',
 source:'https://www.career.go.kr/cnet/app/base/job/jobView.m?SEQ=272',
 tasks:[
  '언어의 구조와 변화 과정을 과학적인 방법으로 연구한다.',
  '옛말과 현대 언어를 비교하고 단어와 문장 구조가 어떻게 달라졌는지 조사한다.',
  '언어 자료를 분석해 문법, 소리, 뜻의 특징을 밝힌다.'
 ],
 work:'대학교나 언어학 관련 연구소에서 연구하거나 가르치는 분야로 진출할 수 있다.',
 education:'대학교에서 언어학 관련 공부를 하고 대학원에서 석사 또는 박사 과정을 밟는 것이 도움이 된다.'
};
const careerShortV12=t=>{const value=String(t||'').trim();const sentence=value.match(/^.{1,130}?[.!?](?:\s|$)/);return sentence?sentence[0].trim():value.slice(0,132)+(value.length>132?'…':'');};
const careerGlossaryV12={
 '플랜트 레이아웃':'공장 안에 기계와 작업 공간을 어떻게 배치할지 정하는 일',
 '플랜트':'여러 기계와 설비가 함께 작동하는 큰 생산 시설',
 '레이아웃':'물건이나 공간을 보기 좋고 쓰기 편하게 배치하는 방식',
 '공정':'제품을 만들거나 서비스를 제공할 때 거치는 작업 단계',
 '설비':'일을 하는 데 쓰는 기계와 시설',
 '원자재':'제품을 만들 때 처음 사용하는 재료',
 '시제품':'본격적으로 만들기 전에 시험 삼아 만든 제품',
 '자동화':'기계나 컴퓨터가 반복 작업을 스스로 처리하도록 하는 것',
 '데이터베이스':'많은 정보를 체계적으로 저장하고 찾을 수 있게 만든 자료 모음',
 '검체':'검사하려고 채취한 혈액이나 조직 등의 물질',
 '임상':'실제 환자를 진료하거나 치료하는 현장',
 '도수치료':'치료사가 손을 사용해 몸의 움직임과 통증을 살피고 치료하는 방법',
 '근골격계':'뼈, 관절, 근육 등 몸을 움직이게 하는 부분',
 '표본':'전체를 살펴보기 어려울 때 일부를 골라 조사한 대상',
 '여론조사':'사람들의 생각이나 의견을 조사하는 일',
 '재무제표':'조직의 돈이 들어오고 나간 내역과 재산 상태를 보여 주는 문서',
 '원가':'물건이나 서비스를 만드는 데 실제로 들어간 비용',
 '입직':'어떤 직업에 처음 들어가 일을 시작하는 것',
 '공채':'여러 지원자에게 공개적으로 지원 기회를 주는 채용 방식',
 '특채':'특정 자격이나 경력을 기준으로 사람을 뽑는 채용 방식',
 '응용':'배운 원리나 기술을 실제 문제에 맞게 활용하는 것',
 '최적':'주어진 조건에서 가장 알맞은 상태',
 '모델링':'실제 대상을 간단한 모형이나 수식으로 나타내는 것',
 '시뮬레이션':'실제 상황을 비슷하게 만들어 결과를 미리 살펴보는 것'
};
const careerFullV12=t=>esc(String(t||'').trim()).replace(/\r?\n/g,'<br>');
for(const job of JOBS){
 const source=careerSourceV12[job.id];
 if(source){job.name=source.matched;job.work=careerShortV12(source.tasks?.[0]||job.work);}
}
function careerCardsV12(field){
 const seen=new Set();
 return JOBS.filter(j=>j.field===field)
  .map(j=>({id:j.id,data:careerSourceV12[j.id]}))
  .filter(({data})=>{if(!data||seen.has(data.source))return false;seen.add(data.source);return true;});
}
if(typeof MAJORS!=='undefined'){
 for(const group of MAJORS)for(const major of group){
  const seen=new Set(),wanted=major.jobs.length;
  major.jobs=[...major.jobs,...careerCardsV12(major.field).map(({id})=>id)]
   .filter(id=>{const source=careerSourceV12[id]?.source;if(!source||seen.has(source))return false;seen.add(source);return true;})
   .slice(0,wanted);
 }
}

if(typeof offers==='function'){
 const previousOffersV12=offers;
 offers=function(){
  const used=new Set();
  const candidates=careerCardsV12(s.field).map(({id})=>JOBS.find(j=>j.id===id)).filter(j=>j&&!j.qualified);
  return previousOffersV12().map(offer=>{
   if(!offer.job)return offer;
   let job=offer.job;
   const source=careerSourceV12[job.id]?.source;
   if(used.has(source))job=candidates.find(candidate=>!used.has(careerSourceV12[candidate.id]?.source))||job;
   used.add(careerSourceV12[job.id]?.source);
   if(job===offer.job)return offer;
   const title=offer.title.endsWith(offer.job.name)?offer.title.slice(0,-offer.job.name.length)+job.name:job.name;
   return {...offer,job,title,desc:offer.desc===offer.job.work?job.work:offer.desc};
  });
 };
}
renderCareers=function(){
 if(s.field==null){$('content').innerHTML='<section class="panel"><h1>직업 지도</h1><p>계열을 선택하면 관련 직업을 바로 볼 수 있어요.</p></section>';return;}
 const group=careerCardsV12(s.field);
 $('content').innerHTML=`<section class="panel"><h1>${esc(fieldName())} · 직업 지도</h1><p>관심 가는 직업을 누르면 담당 업무와 일하는 곳, 준비 경로를 살펴볼 수 있어요.</p><div class="job-grid">${group.map(({id,data:d})=>`<button class="career" data-action="jobDetail" data-value="${id}"><h3>${esc(d.matched)}</h3><p>${esc(careerShortV12(d.tasks?.[0]||''))}</p><small>커리어넷 직업정보 · 자세히 보기 ↗</small></button>`).join('')}</div></section>`;
};

careerDetail=function(id){
 const d=careerSourceV12[id];if(!d)return;
 const tasks=Array.isArray(d.tasks)?d.tasks.filter(Boolean):[];
 const allText=[...tasks,d.work,d.education].join(' ');
 const terms=Object.entries(careerGlossaryV12).filter(([term])=>allText.includes(term));
 let html=`<span class="eyebrow">직업 정보 · 커리어넷</span><h1>${esc(d.matched)}</h1>`;
 if(tasks.length)html+=`<h3>담당 업무</h3><ul>${tasks.map(t=>`<li>${careerFullV12(t)}</li>`).join('')}</ul>`;
 if(d.work)html+=`<h3>일하는 곳과 취업 방법</h3><p>${careerFullV12(d.work)}</p>`;
 if(d.education)html+=`<h3>준비 경로</h3><p>${careerFullV12(d.education)}</p>`;
 if(terms.length)html+=`<h3>낯선 말 풀이</h3><ul>${terms.map(([term,meaning])=>`<li><strong>${esc(term)}</strong>: ${esc(meaning)}</li>`).join('')}</ul>`;
 html+=`<p class="tiny">출처: 커리어넷 직업정보</p>${link(d.source,`커리어넷 · ${d.matched} 원문`)}${button('close','직업 지도로 돌아가기','','primary')}`;
 openDialog(html);
};
render();
