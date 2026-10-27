'use strict';
// Fictional admissions simulation, NOT real university prerequisites.
const COURSE_RULE_NOTICE='과목명은 실제 교육과정을 참고했습니다. 아래 학과별 준비 영역·감점·지원 제한·보충 비용은 모두 게임 규칙이며 실제 대학의 필수 과목이 아닙니다. 소속 학교 개설 과목과 희망 대학·학과의 해당 연도 모집요강·권장 및 필수 이수과목 안내를 반드시 확인하세요.';
const BASE_AREAS=[
 [['수학 기초',[0,1,4]],['물리·구조',[8,12]],['설계·제작',[19,20]]],
 [['프로그래밍',[15,18]],['수학·논리',[0,1,6]],['데이터 이해',[2,7,17]]],
 [['공간 이해',[3,38]],['물리·구조',[8,12]],['환경 이해',[11,14]]],
 [['과학 탐구',[8,9]],['수학 분석',[0,1,2]],['생명·지구',[10,11]]],
 [['인체·생명',[10,13]],['건강 이해',[37,36]],['자료 분석',[2,7]]],
 [['생활 탐구',[21]],['과학 기초',[9,10]],['표현·설계',[38,40]]],
 [['생명 이해',[10,13]],['생태·환경',[11,14]],['데이터 기록',[2,7,17]]],
 [['예술 표현',[38,39,40]],['이야기 구성',[23,22]],['매체 활용',[41,18]]],
 [['운동 기초',[42,43]],['인체 이해',[10,44]],['사회·소통',[24,27]]],
 [['교육 이해',[35]],['학습·심리',[36]],['설명과 표현',[22,24]]],
 [['사회 이해',[27,33]],['조사·통계',[2,7]],['읽기·소통',[22,24]]],
 [['법·제도',[30,31]],['사회 이해',[27,29,33]],['읽기·논증',[22,24]]],
 [['경제 이해',[32,34]],['수리·자료',[2,5,7]],['사회·정보',[27,15]]],
 [['역사·윤리',[28,29]],['읽기·해석',[22,26]],['문학·문화',[23,27]]],
 [['읽기·쓰기',[22,23]],['언어 이해',[24,25]],['주제 탐구',[26,28]]]
];
const MAJOR_AREA_OVERRIDES={
 '0-1':[['소재 이해',[9]],['수학 분석',[0,1]],['실험 탐구',[8,10]]],
 '0-2':[['로봇 제작',[19,20]],['물리 기초',[8,12]],['프로그래밍',[15,16]]],
 '1-1':[['자료 분석',[2,7,17]],['프로그래밍',[15,16]],['수학 모델',[0,6]]],
 '1-2':[['정보 시스템',[15,18]],['논리·수학',[0,6]],['사회·규범',[30,29]]],
 '2-1':[['환경 탐구',[14,11]],['물질 분석',[9]],['자료 해석',[2,7]]],
 '2-2':[['공간 분석',[3]],['자료 분석',[2,17]],['사회 문제',[27,33]]],
 '3-1':[['생명 탐구',[10,13]],['화학 기초',[9]],['자료 해석',[2,7]]],
 '3-2':[['지구 탐구',[11]],['물리 기초',[8]],['수학 분석',[0,1]]],
 '4-1':[['인체·생명',[10,13]],['측정 원리',[8,9]],['건강 이해',[37]]],
 '4-2':[['보건 이해',[37]],['사회·제도',[27,31]],['조사·통계',[2,7]]],
 '5-1':[['식품·생활',[21]],['화학 기초',[9]],['생명 기초',[10]]],
 '5-2':[['의생활',[21]],['시각 표현',[38,40]],['소재 기초',[9]]],
 '6-1':[['작물·생명',[10]],['정보 기술',[15,17]],['환경 이해',[14,11]]],
 '6-2':[['수산생물',[10,13]],['환경 이해',[11,14]],['화학 기초',[9]]],
 '7-1':[['이야기 구성',[22,23]],['매체 표현',[41]],['소통',[24,27]]],
 '7-2':[['공연 표현',[39,40]],['문학 읽기',[23]],['소통',[24,36]]],
 '8-1':[['운동 과학',[44,43]],['인체·생명',[10]],['자료 분석',[2,7]]],
 '8-2':[['스포츠 이해',[42,44]],['매체 표현',[41,22]],['사회·소통',[24,27]]],
 '9-1':[['학습 심리',[36]],['교육 이해',[35]],['조사·분석',[2,7]]],
 '9-2':[['교육 이해',[35]],['사회 이해',[27,33]],['운영·소통',[24,32]]],
 '10-1':[['미디어 표현',[24,41]],['사회 이해',[27]],['자료 분석',[2,7]]],
 '10-2':[['지역사회',[27,33]],['윤리·제도',[29,31]],['소통',[22,24]]],
 '11-1':[['법 이해',[30]],['윤리',[29]],['읽기·논증',[22,24]]],
 '11-2':[['제도 이해',[31,30]],['예산 기초',[32,34]],['자료·문서',[7,22]]],
 '12-1':[['금융·경제',[34,32]],['수리 분석',[5,2]],['자료 처리',[15,17]]],
 '12-2':[['시장 이해',[32]],['소비자·사회',[27,36]],['자료 분석',[2,7]]],
 '13-1':[['역사 이해',[28]],['자료 읽기',[22,26]],['사회 이해',[27]]],
 '13-2':[['윤리 탐구',[29]],['읽기·논증',[22,26]],['사회 문제',[33,30]]],
 '14-1':[['문학 읽기',[23]],['글쓰기',[22]],['주제 탐구',[26,28]]],
 '14-2':[['외국어 읽기',[25]],['언어 이해',[24]],['문화 이해',[28,27]]]
};
function courseAreas(f=s.field,m=s.majorChoice??0){return (MAJOR_AREA_OVERRIDES[f+'-'+m]||BASE_AREAS[f]||BASE_AREAS[0]).map(([name,ids],index)=>({name,ids,index,core:index===0}));}
function courseAudit(f=s.field,m=s.majorChoice??0,preview=false){
 const ids=preview?s.subjects:[...(s.subjects||[]),...(s.bridgeSubjects||[])];
 const legacy=!preview&&!s.curriculumVersion&&!s.subjects?.length;
 const areas=courseAreas(f,m).map(a=>({...a,met:legacy||a.ids.some(id=>ids.includes(id))}));
 const missing=areas.filter(a=>!a.met),blocked=missing.some(a=>a.core),penalty=missing.reduce((n,a)=>n+(a.core?12:8),0);
 return {areas,missing,blocked,penalty,legacy};
}
function courseSummary(preview=false){const a=courseAudit(s.field,s.majorChoice??0,preview);return `<section class="course-audit"><h3>${selectedMajor().name} · 과목 준비 ${3-a.missing.length}/3</h3>${a.legacy?'<p>이전 저장에는 과목 이수 기록이 없어 이번 플레이에는 새 과목 제한을 적용하지 않습니다.</p>':''}<div class="area-grid">${a.areas.map(x=>`<div class="area ${x.met?'met':'missing'}"><strong>${x.met?'충족':'부족'} · ${x.name}${x.core?' (핵심)':''}</strong><p>${x.ids.map(id=>SUBJECTS[id].name).join(' / ')} 중 1과목</p></div>`).join('')}</div><p role="status"><b>${a.blocked?'보충 전 이 학과 지원 제한':a.missing.length?'지원 가능 · 과목 준비 감점':'과목 준비 조건 충족'}</b> · 지원 점수 −${a.penalty}점</p><p class="tiny">일반 준비도를 올려도 과목 부족은 없어지지 않아요. 다른 학과를 고르면 그 학과 기준으로 다시 평가합니다.</p></section>`;}
function renderCoursePlanner(){return `<section class="panel story-card"><span class="badge">핵심 선택 · 고2 선택과목 설계</span><h1>어떤 학과를 준비할 시간표인가요?</h1><p>과목 3개로 목표 학과의 서로 다른 기초를 준비하세요. 다른 분야 과목이 나쁜 것은 아니지만, 필요한 기초를 놓치면 진학에 불이익이 있어요.</p><div class="notice">${COURSE_RULE_NOTICE}<br>${link(SOURCES.subjects,'교육청 과목 안내')}</div>${majorPicker()}${courseSummary(true)}<p><b>선택한 과목 ${s.subjects.length}/3</b> · 아래 분류는 과목의 종류입니다.</p><div class="subject-grid">${SUBJECTS.map(c=>`<button class="subject ${s.subjects.includes(c.id)?'selected':''}" aria-pressed="${s.subjects.includes(c.id)}" data-action="courseToggle" data-value="${c.id}"><span><strong>${s.subjects.includes(c.id)?'✓ ':''}${c.name}</strong><small>${c.type} 선택 · ${courseAreas().filter(a=>a.ids.includes(c.id)).map(a=>a.name).join(' · ')||'다른 분야 탐색'}</small><small>${c.desc}</small></span></button>`).join('')}</div>${button('subjects','이 조합의 결과 확인','','primary')}</section>`;}
function bridgePanel(){const a=courseAudit();if(!a.missing.length)return '';return `<section class="course-audit"><h3>부족한 기초를 보충할 수 있어요</h3><p>영역마다 유료 20만 원·1개월 또는 무료 2개월. 완료하면 표시된 과목의 보충 이수로 기록돼요. 기간은 나이에 반영됩니다.</p>${a.missing.map(x=>`<div class="bridge-row"><strong>${x.name} · ${SUBJECTS[x.ids[0]].name} 보충</strong>${button('bridge',s.cash<20?'유료 보충: 20만 원 부족':'유료 보충 · 20만 원 / 1개월',x.index+'-paid')}${button('bridge','무료 보충 · 2개월',x.index+'-free')}</div>`).join('')}</section>`;}
function curriculumAction(action,value){
 if(action==='courseToggle'){if(s.stage!=='subjects'||s.phase!=='major')return true;const id=+value;if(!SUBJECTS[id])return true;if(s.subjects.includes(id))s.subjects=s.subjects.filter(x=>x!==id);else if(s.subjects.length<3)s.subjects.push(id);else {toast('3과목까지 선택할 수 있어요. 먼저 한 과목을 해제하세요.');return true;}save();render();return true;}
 if(action==='subjects'){if(s.stage!=='subjects'||s.phase!=='major')return true;if(s.subjects.length!==3){toast('과목 3개를 선택해 주세요.');return true;}openDialog(`<h1>이 시간표로 결정할까요?</h1><p>${s.subjects.map(id=>SUBJECTS[id].name).join(' · ')}</p>${courseSummary(true)}<p>부족한 영역은 진학 전 보충하거나 목표 학과를 바꿔야 해요. 위 조건은 게임 규칙입니다.</p>${button('courseConfirm','불이익을 확인하고 확정','','primary')}${button('close','과목 다시 고르기')}`);return true;}
 if(action==='courseConfirm'){if(s.stage!=='subjects'||s.phase!=='major'||s.subjects.length!==3)return true;s.curriculumVersion=1;s.courseTarget={field:s.field,major:s.majorChoice??0};const a=courseAudit(),n=3-a.missing.length;closeDialog();finishChoice('고2 선택과목을 확정했어요',`${s.subjects.map(id=>SUBJECTS[id].name).join(' · ')}. ${selectedMajor().name}: 준비 영역 ${n}/3, 지원 점수 −${a.penalty}점${a.blocked?', 핵심 기초 보충 전 지원 제한':''}.`,[1,4+n,4+6*n,2,-3]);return true;}
 if(action==='bridge'){if(s.stage!=='apply'||s.phase!=='major')return true;const [i,mode]=String(value).split('-'),a=courseAudit().missing.find(x=>x.index===+i);if(!a||!['paid','free'].includes(mode))return true;if(mode==='paid'&&s.cash<20){toast('20만 원이 부족해요. 무료 보충을 선택할 수 있어요.');return true;}const months=mode==='paid'?1:2;if(mode==='paid')money(-20,a.name+' 보충 수업');s.bridgeSubjects=[...new Set([...(s.bridgeSubjects||[]),a.ids[0]])];s.month+=months;s.extraMonths+=months;s.queue=s.queue.map(q=>[q[0],q[1]+months]);log(SUBJECTS[a.ids[0]].name+' 보충 완료',`${months}개월 학습 · ${mode==='paid'?'20만 원 사용':'무료'}. 해당 과목의 기초 준비를 보충했어요.`,'achievement');save();render();return true;}
 return false;
}
