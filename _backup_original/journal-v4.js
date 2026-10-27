'use strict';
let dismissedDecision='',expandedJournal=false,clockRunning=false;
function decisionKey(){return [s.stage,s.phase,s.events,s.exam?.answers.length,s.exam?.review,s.pending?.title].join('|');}
function presentStory(){const modal=$('choiceDialog');
 if(tab!=='story'||s.ended||s.phase==='gap'){if(modal.open)modal.close();if(tab==='story'&&s.phase==='gap')$('content').innerHTML='';return;}
 const key=decisionKey(),html=$('content').innerHTML;
 $('choiceContent').innerHTML=html;$('choiceNotice').textContent='';
 $('content').innerHTML=`<div class="decision-prompt"><div><span class="eyebrow">${s.phase==='feedback'?'결과 확인':'선택 대기'}</span><strong>${esc(s.phase==='feedback'?s.pending.title:s.phase==='event'?s.pending.title:stageTitle())}</strong></div>${button('showDecision',s.phase==='feedback'?'결과 보기':'선택창 열기','','primary')}</div>`;
 if(modal.open||dismissedDecision!==key){if(!modal.open&&!$('dialog').open)modal.showModal();}
}
function renderJournal(){const labels={choice:'내가 고른 선택',life:'일상 사건',setback:'아쉬운 사건',achievement:'활동 결과',asset:'자산 · 활동'};
 $('journal').hidden=tab!=='story';
 $('journal').innerHTML=`<div class="journal-heading"><div><span class="eyebrow">MY LIFE JOURNAL</span><h1>나의 일상 기록</h1></div>${button('journal',s.journal?'접기 ⌃':'펼치기 ⌄')}</div><p class="journal-description">${s.started?'지금의 선택과 일상, 가장 최근 이야기부터.':'새봄고 입학을 앞두고 있어요. 첫 계열을 선택하면 나의 이야기가 시작됩니다.'}</p><div ${s.journal?'':'hidden'}>${s.logs.length?s.logs.slice(0,expandedJournal?60:6).map(l=>`<article class="life-card ${l.kind}"><div class="row"><span class="badge">${labels[l.kind]||'기록'}</span><time>${esc(l.time)}</time></div><h2>${esc(l.title)}</h2><p>${esc(l.detail)}</p></article>`).join(''):'<div class="empty-journal">아직 쓰이지 않은 첫 페이지</div>'}${s.logs.length>6?button('moreJournal',expandedJournal?'최근 기록만 보기':'이전 기록 더 보기','','more-records'):''}</div>`;
}
function renderCareersInline(){const retained=$('content').innerHTML;renderCareers();$('careerSection').innerHTML=$('content').innerHTML;$('content').innerHTML=retained;}
function resolveDailyChoice(index){const e=s.pending,o=e.options[index];if(!o)return;let d=[...o.delta],title='선택 결과',detail=`${o.title}을 선택했어요.`;
 if(o.risk!=null){const ok=Math.random()*100<o.risk;d=ok?d:[0,0,1,0,-5];title=ok?'도전 성공':'도전 실패';detail=ok?'계획한 실습을 마치고 결과를 발표했어요.':'실습을 끝내지 못했어요. 막힌 부분을 복습하며 해당 계열의 기초를 다시 확인했어요.';}
 if(o.unlock!=null)unlock(s.field,o.unlock);change(d);log(`${e.title} — ${title}`,`${o.title}. ${detail} ${effects(d)}`,'choice');
 s.phase='feedback';s.pending={title,text:detail+' '+effects(d),resumeDaily:true,outcome:o.risk==null?'choice':title==='도전 성공'?'success':'failure'};save();render();
}
function dispatchPresentation(action,value){
 if(action==='hideDecision'){dismissedDecision=decisionKey();$('choiceDialog').close();return true;}
 if(action==='showDecision'){dismissedDecision='';presentStoryFromState();return true;}
 if(action==='moreJournal'){expandedJournal=!expandedJournal;renderJournal();return true;}
 if(action==='pickMajor'){if(['apply','subjects'].includes(s.stage)&&s.phase==='major'&&MAJORS[s.field][+value]){s.majorChoice=+value;save();render();}return true;}
 if(action==='campusClub'){if(s.stage!=='campus'||s.phase!=='major')return true;const options={major:['전공 실습 동아리',[1,0,6,3,-2]],arts:['공연·스포츠 동아리',[4,0,0,5,3]],volunteer:['지역 봉사 동아리',[2,0,2,6,0]]};const o=options[value];if(o){s.club=o[0];finishChoice('첫 대학 동아리를 골랐어요',o[0]+'에 가입했어요.',o[1]);}return true;}
 if(action==='event'&&s.phase==='event'){resolveDailyChoice(+value);return true;}
 if(action==='continue'&&s.phase==='feedback'&&s.pending?.resumeDaily){s.pending=null;s.phase='gap';save();render();return true;}
 if(action==='continue'&&s.phase==='feedback'&&s.pending?.enterCampus){setStage('campus',s.collegeStart);return true;}
 if(action==='tab'&&value==='careers'){tab='story';if($('choiceDialog').open){dismissedDecision=decisionKey();$('choiceDialog').close();}render();$('careerSection').scrollIntoView?.({behavior:'smooth',block:'start'});return true;}
 return false;
}
function presentStoryFromState(){renderStory();presentStory();}
