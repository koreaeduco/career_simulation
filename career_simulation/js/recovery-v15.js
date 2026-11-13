'use strict';
// v15: 생활·회복 — 매점 음식에 아이콘(둥실둥실 떠다님)을 붙이고 4열 카드로 보여줍니다.
// 아이템 하나(아이스크림)를 새로 추가했어요. 회복 규칙(구간별 횟수·컨디션)은 기존 로직을 그대로 씁니다.
RECOVERY_ITEMS.push({id:'icecream',name:'시원한 아이스크림',price:.5,recover:9,limit:1,desc:'매점 냉동고 아이스크림으로 기분 전환'});
const RECOVERY_ICONS={snack:'🌭',meal:'🍱',leisure:'🎭',icecream:'🍦'};

recoveryShop=function(){
 const cards=RECOVERY_ITEMS.map((p,i)=>{
  const reason=recoveryReason(p);
  return `<article class="shop-item recovery-item"><div class="food-float" style="--d:${(i*.45).toFixed(2)}s" aria-hidden="true"><span class="food-icon">${RECOVERY_ICONS[p.id]||'🍙'}</span><i class="food-shadow"></i></div>`
   +`<h3>${p.name}</h3><p>${p.desc}</p><b>${won(p.price)} · 컨디션 +${p.recover}</b><p>구간별 ${p.limit}회 · 사용 ${s.recoveryUsed[recoveryKey(p.id)]||0}회</p>`
   +`<button data-action="recoveryBuy" data-value="${p.id}" ${reason?'disabled':''}>${reason||'구매하고 회복'}</button></article>`;
 }).join('');
 return `<h2>생활·회복</h2><p>회복 아이템은 즉시 사용됩니다. 각각 6개월 구간별 횟수 제한이 있어요.</p><div class="shop-grid recovery-grid">${cards}</div>${button('freeRest','무료 휴식 · 컨디션 +25 / 1개월 추가')}<p class="tiny">자산이 없어도 휴식할 수 있어요. 회복을 위해 쓴 시간은 나이와 추가 준비 기간에 남습니다.</p>`;
};
render();
