'use strict';
// v14: 아바타 꾸미기 확장 — 눈 모양 12종 + 눈 색 7종(무료), 화려한 상의 15종,
// 하의·신발·모자·얼굴 꾸밈·목 꾸밈·망토/날개·반짝 효과·펫·배경 추가, 아이템별 미리보기.
// 머리는 '모양 8종'과 '색 11종'을 따로 고르며(모두 무료), 배경 14종은 꾸미기 상점에서 고릅니다.
// 그림 데이터는 avatar-parts-v14.js, 이 파일은 착용·구매·화면 로직을 담당합니다.
// 로드 순서: experience-v8.js(아바타 기본)와 experience-v13.js 이후에 불러와야 합니다.

// ───────────────────────── 아이템 등록 ─────────────────────────
// price 단위는 기존과 같은 "만원"입니다. (예: 12 = 120,000원)
AVATAR_ITEMS.push(
 // 상의
 {id:'shirt-stripe',slot:'shirt',name:'스트라이프 티',color:'#2f4f8f',price:6},
 {id:'shirt-sports',slot:'shirt',name:'레드 트랙 재킷',color:'#d94f5c',price:8},
 {id:'shirt-denim',slot:'shirt',name:'데님 재킷',color:'#3f6fb5',price:9},
 {id:'shirt-neon',slot:'shirt',name:'네온 후디',color:'#a8ee32',price:12},
 {id:'shirt-star',slot:'shirt',name:'스타 저지',color:'#f5c945',price:12},
 {id:'shirt-rainbow',slot:'shirt',name:'레인보우 스웨터',color:'#ff9a3c',price:14},
 {id:'shirt-suit',slot:'shirt',name:'네이비 정장',color:'#263552',price:15},
 {id:'shirt-hanbok',slot:'shirt',name:'꽃분홍 한복 저고리',color:'#f7a9c4',price:16},
 {id:'shirt-hero',slot:'shirt',name:'히어로 슈트',color:'#d9413f',price:18},
 {id:'shirt-galaxy',slot:'shirt',name:'은하수 재킷',color:'#6a2fb0',price:20},
 {id:'shirt-dress',slot:'shirt',name:'반짝 드레스',color:'#ff9ad0',price:24,dress:true},
 {id:'shirt-gold',slot:'shirt',name:'골드 스팽글 재킷',color:'#f2c14e',price:25},
 // 하의
 {id:'pants-basic',slot:'pants',name:'기본 바지',color:'#50617c',price:0},
 {id:'pants-jeans',slot:'pants',name:'청바지',color:'#3d5f9e',price:4},
 {id:'pants-white',slot:'pants',name:'흰 바지',color:'#e8ebf2',price:4},
 {id:'pants-shorts',slot:'pants',name:'카키 반바지',color:'#c9a66b',price:4},
 {id:'pants-black',slot:'pants',name:'블랙 슬랙스',color:'#232b3b',price:5},
 {id:'pants-skirt',slot:'pants',name:'플리츠 스커트',color:'#d96a9a',price:7},
 {id:'pants-rainbow',slot:'pants',name:'레인보우 팬츠',color:'#ff7aa8',price:9},
 {id:'pants-gold',slot:'pants',name:'골드 팬츠',color:'#e0b43a',price:10},
 // 신발
 {id:'shoes-pink',slot:'shoes',name:'핑크 슈즈',color:'#f7a1c4',price:5},
 {id:'shoes-black',slot:'shoes',name:'블랙 로퍼',color:'#222a38',price:5},
 {id:'shoes-red',slot:'shoes',name:'레드 하이탑',color:'#d9413f',price:6},
 {id:'shoes-rainbow',slot:'shoes',name:'레인보우 스니커즈',color:'#ff6f7d',price:8},
 {id:'shoes-glow',slot:'shoes',name:'네온 글로우 슈즈',color:'#35f0ff',price:10},
 {id:'shoes-gold',slot:'shoes',name:'골드 부츠',color:'#e8b93a',price:12},
 // 모자·머리 장식
 {id:'hat-cap',slot:'hat',name:'야구 모자',color:'#d94f5c',price:5},
 {id:'hat-beanie',slot:'hat',name:'방울 비니',color:'#4a6fa5',price:6},
 {id:'hat-ribbon',slot:'hat',name:'큰 리본',color:'#ff7ab8',price:6},
 {id:'hat-beret',slot:'hat',name:'베레모',color:'#b8445a',price:7},
 {id:'hat-cat',slot:'hat',name:'고양이 귀',color:'#3a3a4a',price:7},
 {id:'hat-bunny',slot:'hat',name:'토끼 귀',color:'#ffffff',price:8},
 {id:'hat-headphone',slot:'hat',name:'헤드폰',color:'#e0457b',price:8},
 {id:'hat-flower',slot:'hat',name:'꽃관',color:'#ff7ab8',price:9},
 {id:'hat-halo',slot:'hat',name:'천사 링',color:'#ffe27a',price:10},
 {id:'hat-wizard',slot:'hat',name:'마법사 모자',color:'#6a2fb0',price:16},
 {id:'hat-tiara',slot:'hat',name:'반짝 티아라',color:'#cfd8e8',price:18},
 {id:'hat-crown',slot:'hat',name:'황금 왕관',color:'#f2c14e',price:20},
 // 얼굴 꾸밈
 {id:'accessory-freckles',slot:'accessory',name:'주근깨',color:'#a8673f',price:2},
 {id:'accessory-bandaid',slot:'accessory',name:'반창고',color:'#f3d3a8',price:2},
 {id:'accessory-blush',slot:'accessory',name:'볼터치',color:'#ff8fa3',price:3},
 {id:'accessory-earring',slot:'accessory',name:'금 귀걸이',color:'#f6d36b',price:4},
 {id:'accessory-sunglasses',slot:'accessory',name:'선글라스',color:'#12161f',price:5},
 {id:'accessory-heart',slot:'accessory',name:'하트 안경',color:'#ff5c8a',price:7},
 {id:'accessory-starshades',slot:'accessory',name:'별 안경',color:'#f6c945',price:7},
 // 목 꾸밈
 {id:'neck-bowtie',slot:'neck',name:'나비 넥타이',color:'#e0457b',price:5},
 {id:'neck-scarf',slot:'neck',name:'빨간 목도리',color:'#d9413f',price:6},
 {id:'neck-lei',slot:'neck',name:'하와이 꽃목걸이',color:'#ff7ab8',price:6},
 {id:'neck-necklace',slot:'neck',name:'금 목걸이',color:'#f6d36b',price:8},
 {id:'neck-pearl',slot:'neck',name:'진주 목걸이',color:'#fdfcff',price:9},
 {id:'neck-medal',slot:'neck',name:'금메달',color:'#f6c945',price:10},
 // 망토·날개
 {id:'cape-hero',slot:'cape',name:'히어로 망토',color:'#d9413f',price:14},
 {id:'cape-angel',slot:'cape',name:'천사 날개',color:'#f7fbff',price:16},
 {id:'cape-butterfly',slot:'cape',name:'나비 날개',color:'#c07bff',price:16},
 {id:'cape-royal',slot:'cape',name:'왕실 망토',color:'#6a2fb0',price:18},
 {id:'cape-star',slot:'cape',name:'별빛 망토',color:'#232a63',price:20},
 // 반짝 효과
 {id:'aura-snow',slot:'aura',name:'눈꽃 효과',color:'#eaf6ff',price:10},
 {id:'aura-music',slot:'aura',name:'음표 효과',color:'#8be9ff',price:10},
 {id:'aura-sparkle',slot:'aura',name:'반짝이 효과',color:'#fff3a8',price:12},
 {id:'aura-hearts',slot:'aura',name:'하트 효과',color:'#ff6b9a',price:12},
 {id:'aura-sakura',slot:'aura',name:'벚꽃잎 효과',color:'#ffb7c9',price:12},
 {id:'aura-glow',slot:'aura',name:'오로라 후광',color:'#7cf3d0',price:16},
 // 펫
 {id:'pet-slime',slot:'pet',name:'말랑 슬라임',color:'#6ee08e',price:8},
 {id:'pet-ghost',slot:'pet',name:'수줍은 유령',color:'#f4f7ff',price:9},
 {id:'pet-star',slot:'pet',name:'별 친구',color:'#ffd84d',price:10},
 {id:'pet-dog',slot:'pet',name:'강아지',color:'#c98e5a',price:12},
 {id:'pet-rabbit',slot:'pet',name:'토끼',color:'#ffffff',price:12},
 {id:'pet-panda',slot:'pet',name:'아기 판다',color:'#ffffff',price:14},
 {id:'pet-dragon',slot:'pet',name:'아기 용',color:'#5ccf8a',price:18},
 // 배경 (캐릭터 맨 뒤)
 {id:'bg-mint',slot:'bg',name:'민트 단색',color:'#bfeedd',price:0},
 {id:'bg-lilac',slot:'bg',name:'라일락 단색',color:'#d9ccff',price:0},
 {id:'bg-peach',slot:'bg',name:'복숭아 단색',color:'#ffd9c4',price:0},
 {id:'bg-sky',slot:'bg',name:'맑은 하늘',color:'#6fc3ff',price:3},
 {id:'bg-classroom',slot:'bg',name:'교실 칠판',color:'#2f5d4a',price:3},
 {id:'bg-library',slot:'bg',name:'도서관',color:'#4a3122',price:5},
 {id:'bg-sunset',slot:'bg',name:'노을 언덕',color:'#e8627a',price:5},
 {id:'bg-sakura',slot:'bg',name:'벚꽃 정원',color:'#ffb7cf',price:6},
 {id:'bg-forest',slot:'bg',name:'초록 숲',color:'#2f7d4f',price:6},
 {id:'bg-beach',slot:'bg',name:'바닷가',color:'#3fa9e0',price:7},
 {id:'bg-city',slot:'bg',name:'도시 야경',color:'#2b3366',price:8},
 {id:'bg-night',slot:'bg',name:'별이 뜬 밤',color:'#303075',price:9},
 {id:'bg-space',slot:'bg',name:'우주 여행',color:'#5b2a8f',price:12},
 {id:'bg-rainbow',slot:'bg',name:'무지개 하늘',color:'#ff9a3c',price:14}
);
// 머리는 이제 아이템이 아니라 '모양+색' 고르기입니다. 예전 아이템 정의가 남아 있으면 지웁니다.
for(let i=AVATAR_ITEMS.length-1;i>=0;i--)if(AVATAR_ITEMS[i].slot==='hair')AVATAR_ITEMS.splice(i,1);

const AVATAR_SLOTS=[['shirt','상의'],['pants','하의'],['shoes','신발'],['hat','모자'],['accessory','얼굴'],['neck','목'],['cape','망토·날개'],['aura','효과'],['pet','펫'],['bg','배경']];
const AVATAR_OPTIONAL_SLOTS=['hat','accessory','neck','cape','aura','pet','bg'];
const AVATAR_SKINS=['#f5c8a4','#c98e66','#80563f','#fbe2d0','#a8714e'];
const AVATAR_DEFAULTS={shirt:'shirt-basic',pants:'pants-basic',shoes:'shoes-basic'};

// ───────────────────────── 저장 데이터 보정 ─────────────────────────
// 예전 저장 데이터(눈·바지 정보가 없는 것)도 그대로 이어 쓸 수 있게 기본값을 채웁니다.
const migrate8Before14=migrate8;
migrate8=function(){
 migrate8Before14();
 s.avatar??={};
 s.avatar.eye??='eye-basic';
 s.avatar.eyeColor??=0;
 s.avatar.pants??='pants-basic';
 // 머리: 예전(모양+색이 한 아이템) 저장 데이터를 모양 + 색 번호로 나눕니다.
 if(!Number.isInteger(s.avatar.hairColor)){
  const m=LEGACY_HAIR[s.avatar.hair]||LEGACY_HAIR['hair-basic'];
  s.avatar.hair=m[0];s.avatar.hairColor=m[1];
 }
 if(!HAIR_STYLES.some(h=>h.id===s.avatar.hair))s.avatar.hair='hair-basic';
 if(!HAIR_COLORS[s.avatar.hairColor])s.avatar.hairColor=0;
 if(!AVATAR_SLOTS.some(([id])=>id===s.avatarTab))s.avatarTab='shirt';
 s.avatarTab??='shirt';
 const free=AVATAR_ITEMS.filter(x=>!x.price).map(x=>x.id);
 if(free.some(id=>!s.wardrobe.includes(id)))s.wardrobe=[...new Set([...s.wardrobe,...free])];
};

// ───────────────────────── 캐릭터 그리기 ─────────────────────────
let avatarUid=0;
avatarSVG=function(av=s.avatar,opts={}){
 av=av||{};
 const u=++avatarUid;
 const item=slot=>AVATAR_ITEMS.find(x=>x.slot===slot&&x.id===av[slot])||(AVATAR_DEFAULTS[slot]?AVATAR_ITEMS.find(x=>x.id===AVATAR_DEFAULTS[slot]):null);
 const skin=AVATAR_SKINS[av.skin]||AVATAR_SKINS[0];
 const shirt=item('shirt'),pants=item('pants'),shoes=item('shoes');
 const hat=item('hat'),acc=item('accessory'),neck=item('neck'),cape=item('cape'),aura=item('aura'),pet=item('pet'),bg=item('bg');
 let defs='';
 const grab=(table,it,...extra)=>{const fn=it&&table[it.id];if(!fn)return {};const r=fn(it.color,u,...extra);if(typeof r==='string')return {body:r};if(r.defs)defs+=r.defs;return r;};
 const a=grab(AURA_DRAW,aura),hd=grab(HAT_DRAW,hat),sh=grab(SHIRT_DRAW,shirt,skin),b=grab(BG_DRAW,bg);
 const hr=hairParts(av,u);if(hr.defs)defs+=hr.defs;
 const bgMarkup=b.body?`<g clip-path="url(#bgc${u})">${b.body}</g>`:'';
 if(bgMarkup)defs+=`<clipPath id="bgc${u}"><rect x="0" y="-8" width="64" height="80" rx="4"/></clipPath>`;
 const legs=shirt?.dress?(sh.legs||''):(grab(PANTS_DRAW,pants,skin).body||'');
 const shoeMarkup=grab(SHOES_DRAW,shoes).body||'';
 const capeMarkup=grab(CAPE_DRAW,cape).body||'';
 const neckMarkup=grab(NECK_DRAW,neck).body||'';
 const accMarkup=grab(ACC_DRAW,acc).body||'';
 const petMarkup=grab(PET_DRAW,pet).body||'';
 const tired=opts.tired??(s.stats?.[4]<20);
 return `<svg class="avatar-pixel${tired?' tired':''}${opts.thumb?' thumb':''}" viewBox="0 -8 64 80" role="img" aria-label="${opts.thumb?'미리보기':'나의 캐릭터'}" shape-rendering="crispEdges"><defs>${defs}</defs>`
  +bgMarkup+(a.back||'')+capeMarkup
  +`<ellipse cx="30" cy="65" rx="20" ry="3" fill="#1d3042"${bgMarkup?' opacity=".4"':''}/>`
  +(hd.back||'')+hr.back
  +legs+(sh.body||TORSO('#86b8f4'))+R(16,56,5,2,skin)+R(41,56,5,2,skin)+shoeMarkup
  +`<path d="M20 21h22v20H20zM16 26h4v10h-4zm26 0h4v10h-4z" fill="${skin}"/>`
  +hr.front+eyesMarkup(av)+R(28,36,8,2,'#b36b68')
  +neckMarkup+accMarkup+(hd.front||'')+petMarkup+(a.front||'')
  +`</svg>`;
};

// 눈 모양 버튼용 작은 미리보기 (현재 피부색·눈 색 반영)
function eyePreview(style){
 const col=(EYE_COLORS[s.avatar.eyeColor]||EYE_COLORS[0]).color,skin=AVATAR_SKINS[s.avatar.skin]||AVATAR_SKINS[0];
 return `<svg class="eye-preview" viewBox="20 26 22 9" aria-hidden="true" shape-rendering="crispEdges">${R(20,26,22,9,skin)}${style.draw(24,true,col)}${style.draw(36,false,col)}</svg>`;
}

// 머리 모양 버튼용 작은 미리보기 (현재 피부색·머리 색·눈 반영)
function hairPreview(style){
 const av={...s.avatar,hair:style.id},skin=AVATAR_SKINS[av.skin]||AVATAR_SKINS[0],hp=hairParts(av,++avatarUid);
 return `<svg class="hair-preview" viewBox="4 -5 54 56" aria-hidden="true" shape-rendering="crispEdges"><defs>${hp.defs||''}</defs>${hp.back}<path d="M20 21h22v20H20zM16 26h4v10h-4zm26 0h4v10h-4z" fill="${skin}"/>${hp.front}${eyesMarkup(av)}${R(28,36,8,2,'#b36b68')}</svg>`;
}

// ───────────────────────── 편집 화면 ─────────────────────────
avatarEditor=function(start=false){
 const av=s.avatar,owned=s.wardrobe||[];
 const bgs=AVATAR_ITEMS.filter(x=>x.slot==='bg'&&owned.includes(x.id));
 return `<section class="avatar-editor"><div class="avatar-preview">${avatarSVG()}<strong>${esc(s.nickname||'새봄이')}</strong></div>`
  +(start?'<label>게임에서 사용할 이름 또는 별칭<input id="nicknameInput" maxlength="16" autocomplete="off" placeholder="이름이나 별칭을 적어주세요" value="'+esc(s.nickname)+'"></label><p class="tiny">실명이나 나를 나타내는 별칭을 적어주세요.</p>':'')
  +`<div class="avatar-controls"><strong>피부색</strong><div>${AVATAR_SKINS.map((c,i)=>button('skin','<i class="dot" style="background:'+c+'"></i>피부색 '+(i+1),i,av.skin===i||(av.skin==null&&i===0)?'active':'')).join('')}</div>`
  +`<strong>머리 모양</strong><div class="hair-grid">${HAIR_STYLES.map(h=>button('hairStyle',hairPreview(h)+'<span>'+h.name+'</span>',h.id,'hair-btn'+(av.hair===h.id?' active':''))).join('')}</div>`
  +`<strong>머리 색</strong><div class="hair-colors">${HAIR_COLORS.map((c,i)=>button('hairColor','<i class="dot'+(c.rainbow?' rainbow':'')+'" style="background:'+(c.rainbow?'':c.color)+'"></i>'+c.name,i,av.hairColor===i?'active':'')).join('')}</div>`
  +`<strong>배경</strong><div class="bg-owned">${button('unequip','<i class="dot none"></i>배경 없음','bg',!av.bg?'active':'')}${bgs.map(x=>button('equip','<i class="dot" style="background:'+x.color+'"></i>'+x.name,x.id,av.bg===x.id?'active':'')).join('')}</div>`
  +`<strong>눈 모양</strong><div class="eye-grid">${EYE_STYLES.map(e=>button('eye',eyePreview(e)+'<span>'+e.name+'</span>',e.id,'eye-btn'+(av.eye===e.id?' active':''))).join('')}</div>`
  +`<strong>눈 색</strong><div class="eye-colors">${EYE_COLORS.map((c,i)=>button('eyeColor','<i class="dot" style="background:'+c.color+'"></i>'+c.name,i,av.eyeColor===i?'active':'')).join('')}</div>`
  +`<div class="avatar-extra">${button('avatarRandom','🎲 무작위 코디 (가진 아이템으로)')}</div></div></section>`;
};

function avatarItemCard(p){
 const owned=s.wardrobe.includes(p.id),on=s.avatar[p.slot]===p.id;
 const thumb=avatarSVG({...s.avatar,[p.slot]:p.id},{thumb:true,tired:false});
 const label=on?'착용 중':owned?'착용하기':'구매 후 착용';
 const disabled=!owned&&(!s.started||s.cash<p.price||s.ended);
 return `<article class="shop-item avatar-item${on?' on':''}"><div class="avatar-thumb">${thumb}</div><h3>${esc(p.name)}</h3><p>${owned?'보유 중':won(p.price)}</p><button data-action="${owned?'equip':'cosmeticBuy'}" data-value="${p.id}" ${disabled?'disabled':''}>${label}</button>${on&&AVATAR_OPTIONAL_SLOTS.includes(p.slot)?button('unequip','착용 해제',p.slot):''}</article>`;
}
wardrobeShop=function(){
 const tab=AVATAR_SLOTS.some(([id])=>id===s.avatarTab)?s.avatarTab:'shirt';
 const items=AVATAR_ITEMS.filter(x=>x.slot===tab).sort((a,b)=>a.price-b.price);
 return `<h2>아바타 꾸미기 · 나의 보관함</h2>${avatarEditor()}<p>꾸미기는 능력치·합격·연봉에 영향을 주지 않아요. 구매한 아이템은 이번 삶에서 다시 착용할 수 있습니다. 머리 모양·머리 색·눈 모양·눈 색은 언제든 무료예요.</p>`
  +`<div class="shop-sections avatar-tabs">${AVATAR_SLOTS.map(([id,name])=>button('avatarTab',name+' <small>'+AVATAR_ITEMS.filter(x=>x.slot===id).length+'</small>',id,tab===id?'active':'')).join('')}</div>`
  +`<div class="shop-grid avatar-shop-grid">${items.map(avatarItemCard).join('')}</div>`;
};

// ───────────────────────── 동작 처리 ─────────────────────────
// 새 동작은 기존 dispatch 체인 앞에서 먼저 처리하고, 나머지는 그대로 넘깁니다.
function randomPick(list){return list[Math.floor(Math.random()*list.length)];}
const dispatchBefore14=dispatch;
dispatch=function(action,value){
 const mine=['skin','eye','eyeColor','hairStyle','hairColor','avatarTab','avatarRandom'].includes(action)||(action==='unequip'&&AVATAR_OPTIONAL_SLOTS.includes(value));
 if(!mine){dispatchBefore14(action,value);return;}
 if($('periodDialog').open)return;
 migrate8();
 playClick();
 if(action==='skin'){const i=+value;if(Number.isInteger(i)&&i>=0&&i<AVATAR_SKINS.length)s.avatar.skin=i;}
 else if(action==='eye'){if(EYE_STYLES.some(e=>e.id===value))s.avatar.eye=value;}
 else if(action==='eyeColor'){const i=+value;if(Number.isInteger(i)&&i>=0&&i<EYE_COLORS.length)s.avatar.eyeColor=i;}
 else if(action==='hairStyle'){if(HAIR_STYLES.some(h=>h.id===value))s.avatar.hair=value;}
 else if(action==='hairColor'){const i=+value;if(Number.isInteger(i)&&i>=0&&i<HAIR_COLORS.length)s.avatar.hairColor=i;}
 else if(action==='avatarTab'){if(AVATAR_SLOTS.some(([id])=>id===value))s.avatarTab=value;}
 else if(action==='unequip'){delete s.avatar[value];}
 else if(action==='avatarRandom'){
  ['shirt','pants','shoes'].forEach(slot=>{const pool=AVATAR_ITEMS.filter(x=>x.slot===slot&&s.wardrobe.includes(x.id));if(pool.length)s.avatar[slot]=randomPick(pool).id;});
  AVATAR_OPTIONAL_SLOTS.forEach(slot=>{const pool=AVATAR_ITEMS.filter(x=>x.slot===slot&&s.wardrobe.includes(x.id));if(pool.length&&Math.random()<.5)s.avatar[slot]=randomPick(pool).id;else delete s.avatar[slot];});
  s.avatar.hair=randomPick(HAIR_STYLES).id;s.avatar.hairColor=Math.floor(Math.random()*HAIR_COLORS.length);
  s.avatar.eye=randomPick(EYE_STYLES).id;s.avatar.eyeColor=Math.floor(Math.random()*EYE_COLORS.length);
 }
 save();render();
};

// ───────────────────────── '사용 가능한 자산' 회전 코인 ─────────────────────────
// 화면이 다시 그려질 때마다(사이드바가 새로 만들어짐) 자산 패널 앞에 코인을 붙입니다.
// 움직임은 CSS(.coin)가 담당하고, '동작 줄이기'를 켜면 멈춥니다.
const COIN_HTML='<span class="coin-spin" aria-hidden="true"><span class="coin"><i class="coin-face front">₩</i>'
 +'<i class="coin-rim" style="--z:-2px"></i><i class="coin-rim" style="--z:-1px"></i><i class="coin-rim" style="--z:0px"></i><i class="coin-rim" style="--z:1px"></i><i class="coin-rim" style="--z:2px"></i>'
 +'<i class="coin-face back">₩</i></span></span>';
const renderBefore14=render;
render=function(){
 renderBefore14();
 const box=document.querySelector('.asset-mini');
 if(box&&!box.querySelector('.coin-spin'))box.insertAdjacentHTML('afterbegin',COIN_HTML);
};

migrate8();render();
