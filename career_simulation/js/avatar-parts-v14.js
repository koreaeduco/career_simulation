'use strict';
// v14 아바타 파츠 데이터: 눈 모양, 눈 색, 새 의상·모자·목·망토·효과·펫의 그림 정의.
// 좌표계는 SVG viewBox "0 -8 64 80" 기준이며, 캐릭터 중심은 x=31 입니다.
// 이 파일은 "그림 데이터"만 담고, 착용·구매·화면 로직은 avatar-v14.js 가 담당합니다.

// ───────────────────────── 공통 그리기 도구 ─────────────────────────
const R=(x,y,w,h,f,extra='')=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${f}"${extra}/>`;
function hexMix(a,b,t){
 if(a[0]!=='#')return a; // 레인보우처럼 그라디언트(url(...))가 들어오면 그대로 둡니다.
 const p=h=>[1,3,5].map(i=>parseInt(h.slice(i,i+2),16));
 const [r1,g1,b1]=p(a),[r2,g2,b2]=p(b);
 const m=(x,y)=>Math.round(x+(y-x)*t).toString(16).padStart(2,'0');
 return '#'+m(r1,r2)+m(g1,g2)+m(b1,b2);
}
const lighter=(c,t=.3)=>hexMix(c,'#ffffff',t);
const darker=(c,t=.25)=>hexMix(c,'#000000',t);
// 문자열 도트 도안('X' = 칠함)을 가로 줄 단위 사각형으로 변환합니다.
function pix(rows,x,y,fill,extra=''){
 let out='';
 rows.forEach((row,r)=>{
  let c=0;
  while(c<row.length){
   if(row[c]==='X'){let e=c;while(row[e+1]==='X')e++;out+=R(x+c,y+r,e-c+1,1,fill,extra);c=e+1;}
   else c++;
  }
 });
 return out;
}
const mirrorRows=rows=>rows.map(r=>[...r].reverse().join(''));
const star3=(x,y,f)=>R(x+1,y,1,3,f)+R(x,y+1,3,1,f);
const HEART5=['.X.X.','XXXXX','.XXX.','..X..'];
const HEART7=['.XX.XX.','XXXXXXX','XXXXXXX','.XXXXX.','..XXX..','...X...'];
const STAR7=['...X...','...X...','..XXX..','XXXXXXX','.XXXXX.','..XXX..','.XX.XX.'];

// ───────────────────────── 눈 모양 (모두 무료) ─────────────────────────
// ox: 눈 왼쪽 x 좌표(왼눈 24 / 오른눈 36), left: 왼눈 여부, col: 눈동자 색
const EYE_DARK='#192436';
const EYE_COLORS=[
 {name:'먹빛',color:'#192436'},{name:'갈색',color:'#6b3f26'},{name:'하늘색',color:'#2d7fe0'},
 {name:'초록',color:'#2f9e6f'},{name:'보라',color:'#8b5cf6'},{name:'핑크',color:'#e0457b'},{name:'황금',color:'#e0a020'}
];
const EYE_STYLES=[
 {id:'eye-basic',name:'기본 눈',
  draw:(ox,left,col)=>R(ox,29,3,4,col)},
 {id:'eye-big',name:'동그란 큰 눈',
  draw:(ox,left,col)=>R(ox-1,28,5,6,'#ffffff')+R(ox,29,3,5,col)+R(ox+1,31,1,2,EYE_DARK)+R(ox,29,1,1,'#ffffff')},
 {id:'eye-happy',name:'웃는 눈',
  draw:(ox,left,col)=>R(ox-1,32,1,1,EYE_DARK)+R(ox,31,1,1,EYE_DARK)+R(ox+1,30,1,1,EYE_DARK)+R(ox+2,31,1,1,EYE_DARK)+R(ox+3,32,1,1,EYE_DARK)},
 {id:'eye-wink',name:'윙크',
  draw:(ox,left,col)=>left?R(ox,29,3,4,col)+R(ox,29,1,1,'#ffffff'):R(ox-1,31,5,1,EYE_DARK)+R(ox+3,30,1,1,EYE_DARK)+R(ox+3,32,1,1,EYE_DARK)},
 {id:'eye-sleepy',name:'졸린 눈',
  draw:(ox,left,col)=>R(ox-1,30,5,1,EYE_DARK)+R(ox,31,3,2,col)},
 {id:'eye-star',name:'별 눈',
  draw:(ox,left,col)=>R(ox+1,28,1,5,'#f6c945')+R(ox-1,30,5,1,'#f6c945')+R(ox,29,1,1,'#f6c945')+R(ox+2,29,1,1,'#f6c945')+R(ox,31,1,1,'#f6c945')+R(ox+2,31,1,1,'#f6c945')+R(ox+1,30,1,1,'#ffffff')},
 {id:'eye-heart',name:'하트 눈',
  draw:(ox,left,col)=>pix(HEART5,ox-1,29,'#ff4f7b')+R(ox,30,1,1,'#ffd0dd')},
 {id:'eye-cat',name:'고양이 눈',
  draw:(ox,left,col)=>R(ox-1,28,5,1,EYE_DARK)+R(ox-1,29,5,4,col)+R(ox+1,29,1,4,EYE_DARK)+R(ox,29,1,1,'#ffffff')},
 {id:'eye-wow',name:'깜짝 눈',
  draw:(ox,left,col)=>R(ox-1,28,5,6,EYE_DARK)+R(ox,29,3,4,'#ffffff')+R(ox+1,30,1,2,col)},
 {id:'eye-lash',name:'속눈썹 눈',
  draw:(ox,left,col)=>R(ox,29,3,4,col)+R(ox+1,30,1,1,'#ffffff')+(left?R(ox-2,28,1,1,EYE_DARK)+R(ox-2,30,1,1,EYE_DARK):R(ox+4,28,1,1,EYE_DARK)+R(ox+4,30,1,1,EYE_DARK))+R(ox-(left?1:0),28,4,1,EYE_DARK)},
 {id:'eye-sparkle',name:'반짝 눈',
  draw:(ox,left,col)=>R(ox-1,28,5,6,col)+R(ox,29,2,2,'#ffffff')+R(ox+2,32,1,1,'#ffffff')+R(ox+3,28,1,1,'#ffffff')+R(ox-1,33,5,1,EYE_DARK)},
 {id:'eye-tear',name:'울먹 눈',
  draw:(ox,left,col)=>R(ox-1,28,5,6,'#ffffff')+R(ox,29,3,4,col)+R(ox,29,1,1,'#ffffff')+R(ox+1,29,1,1,'#ffffff')+R(left?ox-1:ox+3,34,1,2,'#8ad8ff')}
];
function eyesMarkup(av){
 const style=EYE_STYLES.find(e=>e.id===av.eye)||EYE_STYLES[0];
 const col=(EYE_COLORS[av.eyeColor]||EYE_COLORS[0]).color;
 return style.draw(24,true,col)+style.draw(36,false,col);
}

// ───────────────────────── 머리 모양 ─────────────────────────
const HAIR_BASE=c=>`<path d="M19 8h24v5h5v25h-5v5H19v-5h-5V13h5z" fill="${c}"/>`;
const HAIR_FRINGE=c=>`<path d="M20 16h22v7H20zM20 23h6v4h-6" fill="${c}"/>`+(c[0]==='#'?R(23,17,8,1,lighter(c,.3)):R(23,17,8,1,'#ffffff',' opacity=".35"'));
const HAIR_LONG_PANELS=c=>`<path d="M14 23h8v26H12V27zm26 0h8v26H38V27z" fill="${c}"/>`;
const HAIR_DRAW={
 'hair-basic':c=>({back:HAIR_BASE(c),front:HAIR_FRINGE(c)}),
 'hair-long':c=>({back:HAIR_BASE(c)+HAIR_LONG_PANELS(c),front:HAIR_FRINGE(c)}),
 'hair-bob':c=>({back:HAIR_BASE(c)+R(14,38,6,9,c)+R(42,38,6,9,c)+R(15,46,5,1,darker(c,.15))+R(42,46,5,1,darker(c,.15)),front:HAIR_FRINGE(c)}),
 'hair-twin':c=>({back:HAIR_BASE(c)+R(7,22,7,22,c)+R(48,22,7,22,c)+R(8,44,5,3,c)+R(49,44,5,3,c)+R(7,21,7,3,'#ffd34d')+R(48,21,7,3,'#ffd34d'),front:HAIR_FRINGE(c)}),
 'hair-spiky':c=>({back:HAIR_BASE(c)+R(17,4,4,4,c)+R(24,1,4,7,c)+R(31,-1,4,9,c)+R(38,3,4,5,c)+R(45,6,3,3,c)+R(14,6,3,3,c),front:`<path d="M20 15h22v7h-3v3h-3v-3h-4v4h-3v-4h-4v3h-3v-3h-2z" fill="${c}"/>`+R(23,16,8,1,lighter(c,.3))}),
 'hair-bun':c=>({back:HAIR_BASE(c)+R(25,-1,13,9,c)+R(27,-3,9,2,c)+R(25,7,13,1,'#ff9db8'),front:HAIR_FRINGE(c)}),
 'hair-curly':c=>({back:HAIR_BASE(c)+R(11,14,3,24,c)+R(9,20,3,12,c)+R(48,14,3,24,c)+R(51,20,3,12,c)+R(17,5,6,4,c)+R(25,3,6,6,c)+R(33,3,6,6,c)+R(40,5,6,4,c),front:HAIR_FRINGE(c)}),
 'hair-ponytail':c=>({back:HAIR_BASE(c)+R(48,14,4,6,c)+R(51,18,5,22,c)+R(52,40,3,5,c)+R(48,16,5,3,'#ff6b6b'),front:HAIR_FRINGE(c)})
};

// ───────────────────────── 머리 모양 · 머리 색 (따로 고르기, 모두 무료) ─────────────────────────
// 모양과 색을 분리했어요. 저장 데이터에는 av.hair(모양 id)와 av.hairColor(색 번호)가 따로 들어갑니다.
const HAIR_STYLES=[
 {id:'hair-basic',name:'단정한 머리'},{id:'hair-long',name:'긴 머리'},{id:'hair-bob',name:'단발 머리'},{id:'hair-twin',name:'트윈테일'},
 {id:'hair-ponytail',name:'포니테일'},{id:'hair-bun',name:'올림머리'},{id:'hair-curly',name:'곱슬머리'},{id:'hair-spiky',name:'스파이크'}
];
const HAIR_COLORS=[
 {name:'먹빛',color:'#403945'},{name:'갈색',color:'#594038'},{name:'구릿빛',color:'#c76a3a'},{name:'금발',color:'#e8c25b'},
 {name:'실버',color:'#cfd6e4'},{name:'레드',color:'#d84a4a'},{name:'핑크',color:'#f58fb4'},{name:'라일락',color:'#b7a2f1'},
 {name:'블루',color:'#4d8cff'},{name:'민트',color:'#6ce1b5'},{name:'레인보우',color:'#ff8fd1',rainbow:true}
];
// 예전 저장 데이터(머리 아이템 하나에 모양+색이 묶여 있던 것)를 새 방식으로 바꾸는 표: [모양, 색 번호]
const LEGACY_HAIR={
 'hair-basic':['hair-basic',0],'hair-long':['hair-long',1],'hair-bob':['hair-bob',0],'hair-mint':['hair-basic',9],
 'hair-lilac':['hair-basic',7],'hair-silver':['hair-basic',4],'hair-twin':['hair-twin',6],'hair-spiky':['hair-spiky',8],
 'hair-bun':['hair-bun',3],'hair-curly':['hair-curly',2],'hair-ponytail':['hair-ponytail',5],'hair-rainbow':['hair-basic',10]
};
// av.hair + av.hairColor → {back, front, defs}. u는 그라디언트 id가 겹치지 않게 하는 번호입니다.
function hairParts(av,u){
 const draw=HAIR_DRAW[av.hair]||HAIR_DRAW['hair-basic'];
 const col=HAIR_COLORS[av.hairColor]||HAIR_COLORS[0];
 if(!col.rainbow)return draw(col.color);
 const g=`<linearGradient id="hg${u}" gradientUnits="userSpaceOnUse" x1="8" x2="56" y1="0" y2="0">${BAND_COLORS_HAIR.map((k,i)=>`<stop offset="${i/5}" stop-color="${k}"/>`).join('')}</linearGradient>`;
 return {...draw(`url(#hg${u})`),defs:g};
}
const BAND_COLORS_HAIR=['#ff5a5a','#ff9a3c','#ffe14d','#5bd37a','#4da3ff','#a77bff'];

// ───────────────────────── 상의 ─────────────────────────
const TORSO=(c)=>R(21,42,20,16,c)+R(16,44,5,12,c)+R(41,44,5,12,c);
const BAND_COLORS=['#ff5a5a','#ff9a3c','#ffe14d','#5bd37a','#4da3ff','#a77bff'];
function rainbowBands(){
 const bands=[[42,3],[45,3],[48,3],[51,3],[54,2],[56,2]];let o='';
 bands.forEach(([y,h],i)=>{
  const k=BAND_COLORS[i];o+=R(21,y,20,h,k);
  const ay=Math.max(y,44),ah=Math.min(y+h,56)-ay;
  if(ah>0)o+=R(16,ay,5,ah,k)+R(41,ay,5,ah,k);
 });
 return o;
}
function sequins(x0,y0,w,h,light,dark){
 let o='';
 for(let y=0;y<h;y+=2)for(let x=0;x<w;x+=2){
  const odd=((x+y)/2)%2===0;
  o+=R(x0+x,y0+y,1,1,odd?light:dark);
 }
 return o;
}
const SHIRT_DRAW={
 'shirt-basic':(c)=>({body:TORSO(c)+R(23,42,16,2,lighter(c,.35))+R(28,44,1,5,'#ffffff')+R(34,44,1,5,'#ffffff')+R(26,53,10,1,darker(c,.2))}),
 'shirt-coral':(c)=>({body:TORSO(c)+R(31,42,1,16,'#7a3b32')+R(23,42,16,2,lighter(c,.3))+R(23,50,5,1,darker(c,.2))+R(35,50,5,1,darker(c,.2))}),
 'shirt-mint':(c)=>{let o=TORSO(c);for(let y=44;y<58;y+=3){o+=R(21,y,20,1,lighter(c,.35));if(y<56)o+=R(16,y,5,1,lighter(c,.35))+R(41,y,5,1,lighter(c,.35));}return {body:o};},
 'shirt-stripe':(c)=>{let o=TORSO('#f4f6fa');for(let y=43;y<58;y+=4){o+=R(21,y,20,2,'#2f4f8f');if(y>=44&&y<56)o+=R(16,y+1,5,2,'#2f4f8f')+R(41,y+1,5,2,'#2f4f8f');}return {body:o+R(27,42,8,1,'#2f4f8f')};},
 'shirt-denim':(c)=>({body:TORSO(c)+`<path d="M27 42h8l-4 7z" fill="#ffffff"/>`+R(23,48,5,4,darker(c,.2))+R(34,48,5,4,darker(c,.2))+R(21,56,20,1,lighter(c,.3))+R(31,50,1,1,'#d9e4f5')+R(31,53,1,1,'#d9e4f5')+R(31,56,1,1,'#d9e4f5')+R(16,54,5,2,lighter(c,.3))+R(41,54,5,2,lighter(c,.3))}),
 'shirt-sports':(c)=>({body:TORSO(c)+R(18,44,1,12,'#ffffff')+R(43,44,1,12,'#ffffff')+R(31,42,1,16,'#ffffff')+R(23,42,16,2,'#ffffff')}),
 'shirt-neon':(c)=>({body:TORSO(c)+R(21,48,20,3,'#ff3fa4')+R(16,48,5,3,'#ff3fa4')+R(41,48,5,3,'#ff3fa4')+R(23,42,16,2,'#ff3fa4')+R(24,53,2,2,'#ffffff')+R(36,45,2,2,'#ffffff')+R(29,55,2,2,'#38e8ff')}),
 'shirt-star':(c)=>({body:TORSO(c)+R(23,42,16,2,'#e85d4a')+star3(23,45,'#ffffff')+star3(35,47,'#ffffff')+star3(28,52,'#e85d4a')+star3(36,54,'#e85d4a')+R(16,50,5,1,'#e85d4a')+R(41,50,5,1,'#e85d4a')+R(16,53,5,1,'#ffffff')+R(41,53,5,1,'#ffffff')}),
 'shirt-rainbow':(c)=>({body:rainbowBands()+R(23,42,16,1,'#ffffff',' opacity=".5"')}),
 'shirt-hanbok':(c)=>({body:TORSO(c)+R(16,44,5,12,lighter(c,.35))+R(41,44,5,12,lighter(c,.35))+`<path d="M26 42h10l-5 8z" fill="#ffffff"/>`+R(30,48,2,9,'#e0394d')+R(16,53,5,3,'#4a7fd9')+R(41,53,5,3,'#4a7fd9')+R(21,57,20,1,'#f3d27a')+R(21,50,20,1,'#f3d27a',' opacity=".6"')}),
 'shirt-suit':(c)=>({body:TORSO(c)+`<path d="M27 42h8l-4 9z" fill="#f5f7fb"/>`+R(25,42,2,8,darker(c,.3))+R(35,42,2,8,darker(c,.3))+R(30,44,2,10,'#d93b4a')+R(30,43,2,2,'#b32c3b')+R(32,54,1,1,'#d6b25e')+R(16,55,5,1,'#ffffff')+R(41,55,5,1,'#ffffff')}),
 'shirt-hero':(c)=>({body:TORSO(c)+`<path d="M31 44l4 4-4 4-4-4z" fill="#ffd23f"/>`+R(30,47,2,2,c)+R(21,55,20,3,'#ffd23f')+R(30,55,3,3,'#ffffff')+R(16,53,5,3,'#ffd23f')+R(41,53,5,3,'#ffd23f')}),
 'shirt-galaxy':(c,u)=>({defs:`<linearGradient id="sg${u}" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#1d1b5e"/><stop offset=".55" stop-color="#6a2fb0"/><stop offset="1" stop-color="#d94fa6"/></linearGradient>`,
  body:TORSO(`url(#sg${u})`)+R(24,45,1,1,'#ffffff')+R(28,50,1,1,'#ffffff')+R(36,47,1,1,'#7cf3ff')+R(34,54,1,1,'#ffffff')+R(25,55,1,1,'#ffd1f0')+R(38,52,1,1,'#ffffff')+R(18,47,1,1,'#ffffff')+R(43,51,1,1,'#7cf3ff')+R(18,53,1,1,'#ffd1f0')+star3(26,47,'#ffe9a8')+R(31,42,1,16,'#f6d36b')+R(23,42,16,1,'#f6d36b')+R(21,57,20,1,'#f6d36b')}),
 'shirt-gold':(c)=>({body:TORSO(c)+sequins(21,42,20,16,'#fff3b0','#c9962f')+sequins(16,44,5,12,'#fff3b0','#c9962f')+sequins(41,44,5,12,'#fff3b0','#c9962f')+R(31,42,1,16,'#7a5a14')+R(25,42,12,1,'#ffffff',' opacity=".8"')}),
 'shirt-dress':(c,u,skin)=>({defs:`<linearGradient id="dg${u}" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#ff9ad0"/><stop offset="1" stop-color="#9a6bff"/></linearGradient>`,
  body:R(16,44,5,6,'#ffb3dc')+R(41,44,5,6,'#ffb3dc')+R(16,50,5,6,skin)+R(41,50,5,6,skin)+R(21,42,20,10,`url(#dg${u})`)+`<path d="M21 52h20l6 10H15z" fill="url(#dg${u})"/>`+R(21,51,20,2,'#ffffff')+R(24,42,14,1,'#ffffff')+R(18,60,26,1,'#ffffff',' opacity=".7"')+R(22,56,1,1,'#ffffff')+R(28,58,1,1,'#ffffff')+R(34,55,1,1,'#ffffff')+R(40,58,1,1,'#ffffff')+R(26,54,1,1,'#fff3b0')+R(37,59,1,1,'#fff3b0')+R(19,59,1,1,'#fff3b0'),
  legs:R(23,62,5,2,skin)+R(35,62,5,2,skin)})
};

// ───────────────────────── 하의 ─────────────────────────
const LEGS=(c)=>R(22,58,7,6,c)+R(34,58,7,6,c)+R(29,58,5,2,c);
const PANTS_DRAW={
 'pants-basic':c=>LEGS(c),
 'pants-jeans':c=>LEGS(c)+R(22,58,1,6,lighter(c,.3))+R(40,58,1,6,lighter(c,.3))+R(24,59,3,1,darker(c,.2)),
 'pants-white':c=>LEGS(c)+R(28,60,1,4,darker(c,.12))+R(34,60,1,4,darker(c,.12)),
 'pants-black':c=>LEGS(c)+R(22,58,1,6,'#5b6b8a')+R(40,58,1,6,'#5b6b8a'),
 'pants-shorts':(c,u,skin)=>R(22,58,7,3,c)+R(34,58,7,3,c)+R(29,58,5,2,c)+R(23,61,5,3,skin)+R(35,61,5,3,skin)+R(22,60,7,1,darker(c,.2))+R(34,60,7,1,darker(c,.2)),
 'pants-skirt':(c,u,skin)=>`<path d="M21 56h20l3 6H18z" fill="${c}"/>`+R(24,56,1,6,darker(c,.2))+R(28,56,1,6,darker(c,.2))+R(34,56,1,6,darker(c,.2))+R(38,56,1,6,darker(c,.2))+R(18,61,26,1,lighter(c,.4))+R(23,62,5,2,skin)+R(35,62,5,2,skin),
 'pants-gold':c=>LEGS(c)+R(23,58,1,6,'#fff0a8')+R(35,58,1,6,'#fff0a8')+R(26,60,1,1,'#ffffff')+R(38,62,1,1,'#ffffff'),
 'pants-rainbow':c=>['#ff7aa8','#ffe14d','#5ad1ff'].map((k,i)=>R(22,58+i*2,7,2,k)+R(34,58+i*2,7,2,k)+R(29,58+i*2,5,i===0?2:0,k)).join('')
};

// ───────────────────────── 신발 ─────────────────────────
const SHOE=(c)=>R(20,64,10,3,c)+R(33,64,10,3,c)+R(20,66,10,1,darker(c,.18))+R(33,66,10,1,darker(c,.18));
const SHOES_DRAW={
 'shoes-basic':c=>SHOE(c),
 'shoes-yellow':c=>SHOE(c),
 'shoes-red':c=>SHOE(c)+R(21,62,8,2,c)+R(34,62,8,2,c)+R(20,64,4,3,'#ffffff')+R(33,64,4,3,'#ffffff'),
 'shoes-rainbow':c=>['#ff6f7d','#ffe14d','#5ab8ff'].map((k,i)=>R(20,64+i,10,1,k)+R(33,64+i,10,1,k)).join(''),
 'shoes-gold':c=>R(21,61,8,3,c)+R(34,61,8,3,c)+R(20,64,10,3,c)+R(33,64,10,3,c)+R(22,61,1,5,'#fff0a8')+R(35,61,1,5,'#fff0a8')+R(20,66,10,1,darker(c,.25))+R(33,66,10,1,darker(c,.25)),
 'shoes-pink':c=>SHOE(c)+R(26,64,2,1,'#ffffff')+R(39,64,2,1,'#ffffff'),
 'shoes-black':c=>SHOE(c)+R(25,64,2,1,'#e0b43a')+R(38,64,2,1,'#e0b43a'),
 'shoes-glow':c=>R(19,63,12,5,'#35f0ff',' opacity=".25"')+R(32,63,12,5,'#35f0ff',' opacity=".25"')+R(20,64,10,3,'#101a2e')+R(33,64,10,3,'#101a2e')+R(20,64,10,1,'#35f0ff')+R(33,64,10,1,'#35f0ff')+R(20,66,10,1,'#ff4fd8')+R(33,66,10,1,'#ff4fd8')
};

// ───────────────────────── 모자·머리 장식 ─────────────────────────
const HAT_DRAW={
 'hat-crown':c=>({front:R(19,5,24,5,c)+R(19,1,4,4,c)+R(28,-1,6,6,c)+R(39,1,4,4,c)+R(30,6,2,2,'#e8384f')+R(22,6,2,2,'#3b82f6')+R(38,6,2,2,'#2fbf71')+R(19,9,24,1,darker(c,.2))+R(29,0,2,2,'#fff7c2')}),
 'hat-tiara':c=>({front:R(20,9,22,2,c)+R(24,6,2,3,c)+R(30,4,2,5,c)+R(36,6,2,3,c)+R(30,2,2,2,'#7cd7ff')+R(24,5,2,1,'#ff7ab8')+R(36,5,2,1,'#ff7ab8')+R(22,9,2,1,'#ffffff')}),
 'hat-beret':c=>({front:R(15,8,28,4,c)+R(18,5,22,4,c)+R(21,3,16,3,c)+R(29,1,3,3,darker(c,.3))+R(20,6,5,1,lighter(c,.3))}),
 'hat-beanie':c=>({front:R(17,4,28,8,c)+R(20,2,22,3,c)+R(16,11,30,3,lighter(c,.3))+R(28,-3,6,5,'#ffffff')+R(20,6,1,5,lighter(c,.25))+R(26,5,1,6,lighter(c,.25))+R(32,5,1,6,lighter(c,.25))+R(38,6,1,5,lighter(c,.25))}),
 'hat-ribbon':c=>({front:R(33,2,6,7,c)+R(41,2,6,7,c)+R(39,4,2,3,darker(c,.25))+R(34,3,2,5,lighter(c,.35))+R(42,3,2,5,lighter(c,.35))}),
 'hat-flower':c=>{
  const fl=(x,k)=>R(x,6,5,5,k)+R(x+1,5,3,7,k)+R(x+2,7,1,1,'#ffe14d');
  return {front:R(16,10,30,2,'#4aa66a')+fl(17,'#ff7ab8')+fl(25,'#ffffff')+fl(33,'#ffb36b')+fl(41,'#c08bff')+R(23,11,2,2,'#3f9559')+R(39,11,2,2,'#3f9559')};
 },
 'hat-cap':c=>({front:R(18,4,24,7,c)+R(15,11,32,2,darker(c,.2))+R(29,2,3,2,darker(c,.3))+R(28,6,5,3,'#ffffff')+R(30,7,1,1,c)}),
 'hat-bunny':c=>({back:R(22,-7,5,15,'#ffffff')+R(23,-4,3,10,'#ffb6c8')+R(36,-7,5,15,'#ffffff')+R(37,-4,3,10,'#ffb6c8'),front:R(18,8,26,2,'#ffb6c8')}),
 'hat-cat':c=>({front:`<path d="M18 9l2-9 7 9z" fill="${c}"/><path d="M36 9l7-9 2 9z" fill="${c}"/>`+`<path d="M21 8l1-5 3 5z" fill="#ffb6c8"/><path d="M38 8l3-5 1 5z" fill="#ffb6c8"/>`}),
 'hat-halo':c=>({front:`<ellipse cx="31" cy="1" rx="11" ry="3.5" fill="none" stroke="${c}" stroke-width="5" opacity=".3"/><ellipse cx="31" cy="1" rx="10" ry="3" fill="none" stroke="${c}" stroke-width="2"/>`}),
 'hat-headphone':c=>({front:`<path d="M15 24V15a16 16 0 0 1 32 0v9" fill="none" stroke="#2b2f44" stroke-width="3"/>`+R(10,20,6,11,c)+R(46,20,6,11,c)+R(11,22,2,7,lighter(c,.35))+R(49,22,2,7,lighter(c,.35))}),
 'hat-wizard':c=>({front:R(12,9,40,3,c)+`<path d="M20 9L29 -7h4L42 9z" fill="${c}"/>`+R(20,6,22,3,'#ffd34d')+R(30,-1,2,2,'#ffe14d')+R(26,2,1,1,'#ffe14d')+R(35,3,1,1,'#ffffff')+R(14,10,36,1,darker(c,.25))})
};

// ───────────────────────── 얼굴 꾸밈 ─────────────────────────
const ACC_DRAW={
 'accessory-star':c=>`<path d="M40 15h3v3h3v3h-3v3h-3v-3h-3v-3h3z" fill="${c}"/>`,
 'accessory-glasses':c=>`<path d="M22 28h9v7h-9zm11 0h9v7h-9z" fill="none" stroke="${c}" stroke-width="1.5"/>`+R(31,30,2,1,c),
 'accessory-sunglasses':c=>R(22,28,9,6,'#12161f')+R(33,28,9,6,'#12161f')+R(31,29,2,1,'#12161f')+R(20,29,2,1,'#12161f')+R(42,29,2,1,'#12161f')+R(24,29,2,1,'#5b6b8a')+R(35,29,2,1,'#5b6b8a'),
 'accessory-heart':c=>pix(HEART7,22,28,c,' opacity=".75"')+pix(HEART7,34,28,c,' opacity=".75"')+R(31,29,3,1,'#9b2b53'),
 'accessory-starshades':c=>pix(STAR7,22,27,c,' opacity=".85"')+pix(STAR7,34,27,c,' opacity=".85"')+R(29,30,5,1,'#9a7a14'),
 'accessory-blush':c=>R(21,35,4,2,c,' opacity=".65"')+R(39,35,4,2,c,' opacity=".65"'),
 'accessory-freckles':c=>R(23,35,1,1,c)+R(25,36,1,1,c)+R(27,35,1,1,c)+R(35,35,1,1,c)+R(37,36,1,1,c)+R(39,35,1,1,c),
 'accessory-bandaid':c=>R(35,33,7,3,c)+R(37,33,3,3,darker(c,.12))+R(38,34,1,1,lighter(c,.4)),
 'accessory-earring':c=>R(17,36,2,4,c)+R(43,36,2,4,c)+R(17,40,2,2,'#7cd7ff')+R(43,40,2,2,'#7cd7ff')
};

// ───────────────────────── 목 꾸밈 ─────────────────────────
const LEI=[[22,41,'#ff7ab8'],[23,43,'#ffe14d'],[25,45,'#ff9a3c'],[28,46,'#ff7ab8'],[31,47,'#ffe14d'],[34,46,'#ff9a3c'],[37,45,'#ff7ab8'],[39,43,'#ffe14d'],[40,41,'#ff9a3c']];
const NECK_DRAW={
 'neck-scarf':c=>R(21,40,20,4,c)+R(24,40,2,4,'#ffffff')+R(30,40,2,4,'#ffffff')+R(36,40,2,4,'#ffffff')+R(35,44,5,9,c)+R(35,47,5,2,'#ffffff')+R(35,51,5,2,'#ffffff'),
 'neck-bowtie':c=>R(26,41,5,4,c)+R(33,41,5,4,c)+R(30,41,3,4,darker(c,.25))+R(27,42,2,1,lighter(c,.4))+R(34,42,2,1,lighter(c,.4)),
 'neck-necklace':c=>[[24,41],[25,42],[26,43],[27,44],[28,45],[29,46],[30,47],[38,41],[37,42],[36,43],[35,44],[34,45],[33,46],[32,47]].map(([x,y])=>R(x,y,1,1,c)).join('')+R(30,47,3,3,c)+R(31,48,1,1,'#ff4f7b'),
 'neck-lei':c=>LEI.map(([x,y,k])=>R(x,y,3,3,k)+R(x+1,y+1,1,1,'#ffffff')).join(''),
 'neck-medal':c=>R(27,40,2,5,'#d9413f')+R(34,40,2,5,'#3b82f6')+R(29,44,5,6,c)+R(30,45,3,4,lighter(c,.35))+R(31,46,1,2,'#ffffff'),
 'neck-pearl':c=>LEI.map(([x,y])=>R(x,y,2,2,'#fdfcff')+R(x,y+1,2,1,'#d8d4e8')).join('')
};

// ───────────────────────── 망토·날개 (몸 뒤) ─────────────────────────
const CAPE_SHAPE=(c)=>`<path d="M16 42L11 66h40L46 42z" fill="${c}"/>`+R(14,60,34,6,darker(c,.2),' opacity=".7"');
const WING_ROWS=['......XXXXXX','....XXXXXXXX','..XXXXXXXXXX','.XXXXXXXXXXX','XXXXXXXXXXXX','XXXXXXXXXXXX','.XXXXXXXXXXX','..XXXXXXXXXX','...XXXXXXXXX','....XXXXXXXX','....XXXXXXXX','.....XXXXXXX','......XXXXXX'];
const CAPE_DRAW={
 'cape-hero':c=>CAPE_SHAPE(c)+R(18,42,3,2,'#ffd23f')+R(41,42,3,2,'#ffd23f'),
 'cape-royal':c=>CAPE_SHAPE(c)+R(12,62,40,4,'#ffffff')+R(16,63,2,2,'#222233')+R(24,63,2,2,'#222233')+R(32,63,2,2,'#222233')+R(40,63,2,2,'#222233')+R(19,41,24,3,'#ffffff')+R(18,42,3,2,'#ffd23f')+R(41,42,3,2,'#ffd23f'),
 'cape-angel':c=>R(8,34,8,4,c)+R(4,38,12,4,c)+R(2,42,14,4,c)+R(4,46,12,3,c)+R(8,49,8,3,c)+R(46,34,8,4,c)+R(46,38,12,4,c)+R(46,42,14,4,c)+R(46,46,12,3,c)+R(46,49,8,3,c)+R(3,45,13,1,'#cfe3ff')+R(46,45,13,1,'#cfe3ff')+R(6,41,10,1,'#cfe3ff')+R(46,41,10,1,'#cfe3ff'),
 'cape-butterfly':c=>{
  const left=WING_ROWS.map((r,i)=>pix([r],3,31+i,i<8?c:'#5ad1ff')).join('');
  const right=WING_ROWS.map((r,i)=>pix([[...r].reverse().join('')],49,31+i,i<8?c:'#5ad1ff')).join('');
  return left+right+R(8,35,2,2,'#ffffff')+R(52,35,2,2,'#ffffff')+R(10,41,2,2,'#fff3b0')+R(50,41,2,2,'#fff3b0');
 },
 'cape-star':c=>CAPE_SHAPE(c)+R(18,42,3,2,'#ffd23f')+R(41,42,3,2,'#ffd23f')+star3(16,50,'#ffffff')+star3(38,56,'#fff3b0')+star3(26,59,'#ffffff')+R(22,48,1,1,'#ffffff')+R(44,52,1,1,'#ffffff')+R(33,50,1,1,'#7cf3ff')
};

// ───────────────────────── 반짝이 효과 ─────────────────────────
const fx=(inner,delay,cls='av-tw')=>`<g class="${cls}" style="animation-delay:${delay}s">${inner}</g>`;
const AURA_DRAW={
 'aura-sparkle':c=>({front:[[6,12],[54,8],[4,40],[57,34],[9,60],[52,50],[20,-5],[44,-4]].map(([x,y],i)=>fx(star3(x,y,['#fff3a8','#ffffff','#ffd1f0'][i%3]),(i*.37).toFixed(2))).join('')}),
 'aura-hearts':c=>({front:[[5,18],[53,22],[8,46],[56,44],[45,-2]].map(([x,y],i)=>fx(pix(HEART5,x,y,'#ff6b9a'),(i*.5).toFixed(2),'av-float')).join('')}),
 'aura-glow':(c,u)=>({defs:`<radialGradient id="ag${u}" cx=".5" cy=".5" r=".5"><stop offset=".45" stop-color="${c}" stop-opacity=".55"/><stop offset="1" stop-color="${c}" stop-opacity="0"/></radialGradient>`,back:`<circle cx="31" cy="34" r="32" fill="url(#ag${u})"/><ellipse cx="31" cy="66" rx="24" ry="4" fill="${c}" opacity=".35"/>`}),
 'aura-sakura':c=>({front:[[4,6],[54,2],[8,30],[56,26],[3,52],[53,48],[46,14],[12,-4]].map(([x,y],i)=>fx(pix(['XX.','XXX','.XX'],x,y,'#ffb7c9'),(i*.43).toFixed(2),'av-float')).join('')}),
 'aura-snow':c=>({front:[[4,8],[55,6],[6,34],[56,30],[8,58],[52,56]].map(([x,y],i)=>fx(pix(['X.X.X','.XXX.','XXXXX','.XXX.','X.X.X'],x,y,'#eaf6ff'),(i*.5).toFixed(2),'av-float')).join('')}),
 'aura-music':c=>({front:[[4,12],[55,10],[6,42],[56,38],[48,-4]].map(([x,y],i)=>fx(pix(['..XXX','..X..','..X..','XXX..','XXX..'],x,y,['#8be9ff','#ffd1f0','#fff3a8'][i%3]),(i*.45).toFixed(2),'av-float')).join('')})
};

// ───────────────────────── 펫 ─────────────────────────
const PET_DRAW={
 'pet-cat':c=>`<path d="M49 54h10v10H49zM49 50h3v4h-3zm7 0h3v4h-3z" fill="${c}"/>`+R(51,57,2,2,'#203144')+R(56,57,2,2,'#203144')+R(59,58,3,2,c)+R(53,60,3,1,'#b36b68'),
 'pet-bird':c=>R(50,56,9,8,c)+R(52,52,6,5,c)+R(58,54,3,2,'#f5a623')+R(55,53,1,1,'#203144')+R(51,58,4,4,darker(c,.15))+R(48,62,3,2,darker(c,.15))+R(53,64,1,2,'#f5a623')+R(56,64,1,2,'#f5a623'),
 'pet-dog':c=>R(49,56,11,8,c)+R(50,51,9,7,c)+R(48,51,3,6,darker(c,.3))+R(58,51,3,6,darker(c,.3))+R(52,55,5,3,'#f1d3b0')+R(54,55,1,1,'#222222')+R(52,53,1,1,'#203144')+R(56,53,1,1,'#203144')+R(60,56,2,4,c)+R(54,58,1,2,'#ff7a8a')+R(50,64,3,2,darker(c,.2))+R(56,64,3,2,darker(c,.2)),
 'pet-rabbit':c=>R(50,57,9,7,c)+R(51,52,7,6,c)+R(52,45,2,8,c)+R(56,45,2,8,c)+R(52,47,1,5,'#ffb6c8')+R(56,47,1,5,'#ffb6c8')+R(53,54,1,1,'#203144')+R(56,54,1,1,'#203144')+R(54,56,2,1,'#ff9db8')+R(59,61,3,3,c)+R(51,64,3,2,'#e6e9f2')+R(55,64,3,2,'#e6e9f2'),
 'pet-slime':c=>R(49,58,12,6,c)+R(51,55,8,3,c)+R(53,53,4,2,c)+R(52,59,2,2,'#203144')+R(56,59,2,2,'#203144')+R(52,56,2,1,'#d8ffe6')+R(54,62,3,1,'#203144')+R(49,63,12,1,darker(c,.2)),
 'pet-dragon':c=>R(49,56,10,8,c)+R(50,50,8,7,c)+R(50,48,2,3,'#f6d36b')+R(56,48,2,3,'#f6d36b')+R(46,53,4,5,'#ffb86b')+R(58,53,4,5,'#ffb86b')+R(52,52,1,2,'#203144')+R(55,52,1,2,'#203144')+R(51,59,6,5,'#d8f5a2')+R(59,62,4,2,c)+R(60,60,2,2,'#f6d36b')+R(53,55,2,1,darker(c,.3)),
 'pet-ghost':c=>R(49,52,10,12,c,' opacity=".92"')+R(49,64,2,2,c,' opacity=".92"')+R(53,64,2,2,c,' opacity=".92"')+R(57,64,2,2,c,' opacity=".92"')+R(52,56,2,3,'#203144')+R(56,56,2,3,'#203144')+R(54,60,2,2,'#203144')+R(47,58,2,3,c,' opacity=".92"')+R(59,58,2,3,c,' opacity=".92"'),
 'pet-panda':c=>R(50,59,9,6,'#ffffff')+R(50,52,9,7,'#ffffff')+R(49,51,3,3,'#222222')+R(57,51,3,3,'#222222')+R(51,54,3,3,'#222222')+R(55,54,3,3,'#222222')+R(52,55,1,1,'#ffffff')+R(56,55,1,1,'#ffffff')+R(54,57,2,1,'#222222')+R(49,60,2,4,'#222222')+R(58,60,2,4,'#222222')+R(51,64,3,2,'#222222')+R(55,64,3,2,'#222222'),
 'pet-star':c=>`<g class="av-float" style="animation-delay:.2s">`+pix(['....X....','....X....','...XXX...','XXXXXXXXX','.XXXXXXX.','..XXXXX..','..XX.XX..','.XX...XX.'],50,50,c)+R(53,56,1,1,'#203144')+R(56,56,1,1,'#203144')+R(54,58,2,1,'#e0457b')+`</g>`
};

// ───────────────────────── 배경 (캐릭터 맨 뒤) ─────────────────────────
// 64x80 전체를 덮는 장면입니다. 캐릭터·날개·펫이 모두 이 안에 들어옵니다.
// 움직임은 av-tw(반짝)·av-float(둥실)·av-drift(좌우로 천천히) 클래스를 씁니다.
const BG_FULL=f=>R(0,-8,64,80,f);
const bgGrad=(id,stops,x2=0,y2=1)=>`<linearGradient id="${id}" x1="0" x2="${x2}" y1="0" y2="${y2}">${stops.map(([o,k])=>`<stop offset="${o}" stop-color="${k}"/>`).join('')}</linearGradient>`;
const cloud=(x,y,k='#ffffff')=>R(x+2,y,6,2,k)+R(x,y+2,10,2,k)+R(x+3,y-1,3,1,k);
const drift=(inner,delay=0,cls='av-drift')=>`<g class="${cls}" style="animation-delay:${delay}s">${inner}</g>`;
function bookRow(base,seed){
 const ks=['#c0504d','#4f81bd','#e0b43a','#5aa77c','#8a62c8','#d98a3d','#3c8c9c'];
 let o='',x=1,i=seed;
 while(x<62){
  const w=2+(i*7)%3,h=8+(i*5)%4,k=ks[i%ks.length];
  o+=R(x,base-h,w,h,k)+R(x,base-h,w,1,lighter(k,.35));
  x+=w+(i%4===0?1:0);i++;
 }
 return o+R(0,base,64,2,'#3a2418')+R(0,base,64,1,'#6b4630');
}
function tree(x,base,h,w,k,k2){
 return `<path d="M${x-w} ${base}L${x} ${base-h}L${x+w} ${base}z" fill="${k}"/>`
  +`<path d="M${x-w+2} ${base-h*.45}L${x} ${base-h+4}L${x+w-2} ${base-h*.45}z" fill="${k2}" opacity=".55"/>`+R(x-1,base,2,3,'#6b4a2f');
}
function solidBg(c){
 const dots=[[6,2],[22,-4],[48,6],[56,24],[10,30],[52,46],[4,52],[26,22]].map(([x,y])=>R(x,y,2,2,lighter(c,.55),' opacity=".7"')).join('');
 return {body:BG_FULL(c)+dots+R(0,64,64,8,darker(c,.12))+R(0,64,64,1,lighter(c,.35))};
}
const CITY=[[0,9,30],[8,8,42],[15,10,26],[24,7,36],[32,9,22],[40,8,40],[47,9,28],[55,9,36]];
function cityBuildings(){
 let shapes='',lit='',blink='';
 CITY.forEach(([x,w,h],bi)=>{
  const top=66-h;
  shapes+=R(x,top,w,h,bi%2?'#2b3366':'#232a55')+R(x,top,w,1,'#4a56a0');
  for(let y=top+3,r=0;y<62;y+=4,r++)for(let cx=x+1,c=0;cx<x+w-1;cx+=3,c++){
   const k=(bi*7+r*3+c*5)%6;
   if(k<2)lit+=R(cx,y,2,2,'#ffe28a');
   else if(k===2)blink+=R(cx,y,2,2,'#9be7ff');
  }
 });
 return shapes+lit+`<g class="av-tw" style="animation-delay:.4s">${blink}</g>`;
}
const BG_DRAW={
 'bg-mint':c=>solidBg(c),
 'bg-lilac':c=>solidBg(c),
 'bg-peach':c=>solidBg(c),
 'bg-sky':(c,u)=>({defs:bgGrad('bs'+u,[[0,'#6fc3ff'],[1,'#d9f2ff']]),
  body:BG_FULL(`url(#bs${u})`)+drift(cloud(4,2),0)+drift(cloud(40,12),-3)+drift(cloud(18,26,'#f3fbff'),-5)+R(0,66,64,6,'#6cc77a')+R(0,66,64,1,'#9cecA6')}),
 'bg-classroom':c=>({body:BG_FULL('#f1e2c2')+R(0,-8,64,3,'#e3cf9f')
  +R(6,-3,52,24,'#8a5a35')+R(8,-1,48,20,'#2f5d4a')+R(8,-1,48,1,'#3f7a60')+R(6,21,52,2,'#6a4326')
  +R(12,3,16,1,'#e8f5ee',' opacity=".85"')+R(12,7,11,1,'#e8f5ee',' opacity=".85"')+R(12,11,18,1,'#e8f5ee',' opacity=".85"')+star3(40,4,'#ffe27a')+R(37,12,10,1,'#8be9ff')+R(48,10,4,4,'#ffb7c9')
  +R(26,22,8,1,'#d7c18a')+R(0,62,64,10,'#b98a5a')+R(0,62,64,1,'#d9ab78')+R(0,66,64,1,'#a07548')+R(0,69,64,1,'#a07548')}),
 'bg-library':c=>({body:BG_FULL('#4a3122')+bookRow(5,1)+bookRow(23,4)+bookRow(41,2)+bookRow(59,6)
  +drift(R(46,-1,3,3,'#ffe9a8',' opacity=".8"')+R(8,35,2,2,'#ffe9a8',' opacity=".8"'),0,'av-tw')}),
 'bg-sunset':(c,u)=>({defs:bgGrad('bn'+u,[[0,'#5b3f8f'],[.4,'#e8627a'],[.72,'#ffa45c'],[1,'#ffd37a']]),
  body:BG_FULL(`url(#bn${u})`)+`<circle cx="46" cy="42" r="9" fill="#fff0a8" opacity=".35"/><circle cx="46" cy="42" r="6.5" fill="#fff0a8"/>`
  +drift(cloud(6,6,'#ffc2cf'),0)+drift(cloud(30,16,'#ffd9b8'),-4)
  +`<path d="M0 62L10 49l9 8 11-15 12 15 8-7 14 12v18H0z" fill="#3b2a52"/>`+R(0,66,64,6,'#2a1d3d')}),
 'bg-sakura':c=>{
  const petals=[[6,10],[20,22],[44,16],[54,34],[10,42],[36,48],[52,54],[26,4]].map(([x,y],i)=>`<g class="av-float" style="animation-delay:${(i*.41).toFixed(2)}s">${pix(['XX.','XXX','.XX'],x,y,i%2?'#ff9fbd':'#ffb7cf')}</g>`).join('');
  let blossom='';for(let x=0;x<64;x+=8)blossom+=R(x,-6,7,4,'#ffb7cf')+R(x+2,-3,4,3,'#ff9fbd')+R(x+1,-7,4,1,'#ffd6e4');
  return {body:BG_FULL('#fff1f6')+R(0,-8,64,2,'#8a5a48')+blossom+petals+R(0,66,64,6,'#f3c9d8')+R(0,66,64,1,'#ffe3ee')};
 },
 'bg-forest':(c,u)=>({defs:bgGrad('bf'+u,[[0,'#bfe8c0'],[1,'#eaf8dc']]),
  body:BG_FULL(`url(#bf${u})`)+tree(10,62,34,9,'#4f9d6a','#8fd09a')+tree(30,62,40,10,'#4f9d6a','#8fd09a')+tree(52,62,32,9,'#4f9d6a','#8fd09a')
  +tree(2,66,30,8,'#2f7d4f','#5fb97f')+tree(21,66,26,7,'#2f7d4f','#5fb97f')+tree(42,66,30,8,'#2f7d4f','#5fb97f')+tree(60,66,28,8,'#2f7d4f','#5fb97f')
  +R(0,66,64,6,'#3d7a47')+R(0,66,64,1,'#6fb07a')+drift(R(12,12,2,2,'#fff7a8')+R(46,20,2,2,'#fff7a8')+R(30,30,2,2,'#fff7a8'),0,'av-tw')}),
 'bg-beach':(c,u)=>({defs:bgGrad('bb'+u,[[0,'#8fd8ff'],[1,'#e1f6ff']]),
  body:BG_FULL(`url(#bb${u})`)+R(48,-2,7,7,'#fff1a0')+R(46,0,11,3,'#fff1a0',' opacity=".5"')+drift(cloud(6,4),0)+drift(cloud(30,12,'#f3fbff'),-4)
  +R(0,44,64,16,'#3fa9e0')+drift(R(4,47,12,1,'#bfeaff')+R(30,50,16,1,'#bfeaff')+R(10,54,12,1,'#bfeaff')+R(44,56,14,1,'#bfeaff'),0)
  +R(0,58,64,14,'#f3dca6')+R(0,58,64,2,'#fff3cf')+R(8,64,2,2,'#e0c27a')+R(50,68,2,2,'#e0c27a')}),
 'bg-city':(c,u)=>({defs:bgGrad('bc'+u,[[0,'#1b2246'],[1,'#454b8c']]),
  body:BG_FULL(`url(#bc${u})`)+R(50,-3,6,6,'#fff6c8')+R(52,-1,2,1,'#e6d99a')+cityBuildings()+R(0,66,64,6,'#14182f')+R(0,66,64,1,'#3a4180')}),
 'bg-night':(c,u)=>{
  const stars=[[6,-3],[16,10],[28,-5],[40,6],[56,16],[10,28],[50,34],[22,42],[58,2],[34,18]].map(([x,y],i)=>fx(i%3===0?star3(x,y,'#ffffff'):R(x,y,2,2,'#fff3a8'),(i*.33).toFixed(2))).join('');
  return {defs:bgGrad('bn'+u,[[0,'#090c2b'],[1,'#303075']]),
   body:BG_FULL(`url(#bn${u})`)+stars+R(46,0,10,10,'#fff4c0')+R(44,2,14,6,'#fff4c0')+R(49,2,2,2,'#e6d99a')+R(53,6,2,2,'#e6d99a')
   +`<path d="M0 62L12 54l10 6 14-8 14 8 14-4v16H0z" fill="#171a4a"/>`+R(0,66,64,6,'#0f1236')};
 },
 'bg-space':(c,u)=>{
  const stars=[[8,4],[20,-4],[36,2],[54,8],[12,18],[48,24],[58,40],[6,36],[30,28],[44,52],[22,56]].map(([x,y],i)=>i%2?R(x,y,1,1,'#ffffff'):fx(star3(x,y,'#cfe8ff'),(i*.29).toFixed(2))).join('');
  return {defs:`<radialGradient id="bsp${u}" cx=".5" cy=".4" r=".8"><stop offset="0" stop-color="#5b2a8f"/><stop offset=".6" stop-color="#25104f"/><stop offset="1" stop-color="#090520"/></radialGradient>`,
   body:BG_FULL(`url(#bsp${u})`)+`<circle cx="46" cy="14" r="14" fill="#ff5fb0" opacity=".16"/>`+stars
   +`<circle cx="12" cy="52" r="8" fill="#ff9a5c"/><circle cx="9.5" cy="49.5" r="3" fill="#ffc48a" opacity=".6"/>`
   +`<ellipse cx="12" cy="52" rx="13" ry="3" fill="none" stroke="#ffe0b0" stroke-width="1.4" transform="rotate(-20 12 52)"/>`};
 },
 'bg-rainbow':(c,u)=>{
  let arcs='';BAND_COLORS.forEach((k,i)=>{const r=37-i*2.6;arcs+=`<path d="M${32-r} 68A${r} ${r} 0 0 1 ${32+r} 68" fill="none" stroke="${k}" stroke-width="2.7"/>`;});
  return {defs:bgGrad('br'+u,[[0,'#b9e6ff'],[1,'#f3fbff']]),
   body:BG_FULL(`url(#br${u})`)+arcs+drift(cloud(0,50),0)+drift(cloud(52,46),-3)+R(0,66,64,6,'#7ad58a')+R(0,66,64,1,'#a6efae')};
 }
};
