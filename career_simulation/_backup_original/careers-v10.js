'use strict';
// Only claims supported by the linked public occupational records are shown here.
const OFFICIAL_CAREER_PROFILES={
 '1-2':{source:'https://www.career.go.kr/cloud/m/job/view?seq=435',sourceName:'커리어넷 · 정보보호전문가',updated:'직업정보 내 임금·만족도 통계 기준: 2021년',match:'게임의 정보보안 담당자와 관련된 공식 직업: 정보보호전문가',tasks:['정보시스템의 보안 정책을 마련하고 접근 권한과 운영을 통제합니다.','침입이나 악성코드에 대비하고, 보안 사고가 발생하면 발견·대응·복구합니다.','시스템의 취약한 부분을 확인하고 방화벽 등 보호 수단을 관리합니다.'],places:'정보보안 업체, 기업의 정보 관리·보안 부서, 공공기관',route:'컴퓨터·정보통신·정보보호 관련 전공이 도움이 되며, 채용 분야에 따라 학력과 경력 조건이 달라집니다. 정보보안기사 등은 관련 자격으로 소개됩니다.',changes:'커리어넷 자료는 클라우드·모바일·사물인터넷 환경의 확대가 보안 업무 수요에 영향을 준다고 설명합니다. 자료의 전망 시점과 조사 연도를 함께 확인하세요.'},
 '9-0':{source:'https://www.career.go.kr/cloud/m/job/view?seq=410',sourceName:'커리어넷 · 초등학교교사',updated:'공식 직업백과 자료',match:'게임의 교사와 관련된 공식 세부 직업: 초등학교교사',tasks:['교육 계획에 맞춰 학습 계획과 교수·학습 자료를 준비합니다.','수업과 학습 평가를 진행하고 학생의 생활지도와 상담을 맡습니다.','출결·생활기록부 등 학사 업무와 학교 교육과정 운영에 참여합니다.'],places:'초등학교',route:'커리어넷은 초등교육과와 정교사 자격을 관련 학과·자격으로 안내합니다. 실제 교원 자격과 임용 조건은 별도로 확인해야 합니다.',changes:null}
};
const CAREER_HUB='https://work.go.kr/consltJobCarpa/srch/jobInfoSrch/srchJobInfo.do';
const CAREER_REPORT='https://statistics.keis.or.kr/keis/ko/proj/114/pblc/detail.do?categoryIdx=125&pubIdx=11276';
renderCareers=function(){const groups=FIELDS.map((f,i)=>({i,jobs:JOBS.filter(j=>j.field===i&&s.unlocks.includes(j.id))})).filter(g=>g.jobs.length);$('content').innerHTML=`<section class="panel"><h1>계열별 직업 지도</h1><p>직업별 공식 자료를 확인하며 실제 업무를 비교해 보세요. 직업명에 대응하는 공공 직업 분류가 다를 수 있습니다.</p>${groups.map(g=>`<h2>${fieldName(g.i)}</h2><div class="job-grid">${g.jobs.map(j=>{const p=OFFICIAL_CAREER_PROFILES[j.id];return `<button class="career" data-action="jobDetail" data-value="${j.id}"><h3>${esc(j.name)}</h3><p>${p?esc(p.tasks[0]):'공식 직업정보 원문에서 업무와 진입 경로 확인'}</p><small>${p?'공식 자료 요약 보기':'공식 자료 검색하기'} ↗</small></button>`;}).join('')}</div>`).join('')||'<p>계열을 선택하면 관련 직업을 살펴볼 수 있어요.</p>'}<p>${link(CAREER_HUB,'한국고용정보원 직업정보')} · ${link(CAREER_REPORT,'2025~2035 일자리 전망')}</p></section>`;};
careerDetail=function(id){const j=JOBS.find(x=>x.id===id);if(!j)return;const p=OFFICIAL_CAREER_PROFILES[id];let html=`<span class="eyebrow">공식 자료로 직업 탐색</span><h1>${esc(j.name)}</h1>`;
 if(p){html+=`<p class="notice">${esc(p.match)}</p><h3>실제로 하는 일</h3><ul>${p.tasks.map(t=>`<li>${esc(t)}</li>`).join('')}</ul><h3>주로 일하는 곳</h3><p>${esc(p.places)}</p><h3>준비 경로</h3><p>${esc(p.route)}</p>${p.changes?`<h3>업무 환경의 변화</h3><p>${esc(p.changes)}</p>`:''}<p class="tiny">${esc(p.updated)} · 직업의 세부 분야와 고용 기관에 따라 실제 업무가 달라집니다.</p>${link(p.source,p.sourceName+' 원문')}`;}
 else {html+=`<p>이 게임의 직업명과 공공 직업정보의 분류명이 반드시 일치하지는 않습니다. 아래 공식 직업정보에서 ${esc(j.name)} 또는 비슷한 직무명을 검색해 업무, 근무환경, 준비 경로를 확인하세요.</p><p class="notice">이 직업의 세부 업무와 최근 동향은 현재 이 화면에 검증된 자료가 없습니다. 확인되지 않은 설명은 표시하지 않습니다.</p>${link(CAREER_HUB,'한국고용정보원 직업정보 검색')}`;}
 html+=`<h3>최근 동향 자료</h3><p>한국고용정보원 『2025~2035 정성적 일자리 전망』(2026년 발행)은 수록 직업별 일자리 변화와 그 근거를 다룹니다. 이 직업이 보고서에 포함되어 있는지 원문에서 먼저 확인하세요.</p>${link(CAREER_REPORT,'한국고용정보원 전망 보고서')}<p class="tiny">게임 안의 일자리 제안·연봉은 실제 채용 통계가 아닌 시뮬레이션 결과입니다.</p>`;
 openDialog(html+button('close','직업 지도로 돌아가기','','primary'));
};
render();
