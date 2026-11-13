'use strict';
// v15: 다크 모드 ON/OFF 스위치. 설정은 이 브라우저(localStorage 'next-theme')에만 저장됩니다.
// 색상은 css/experience-v15.css 의 html[data-theme="light"] 규칙이 바꿉니다.
(function(){
 const KEY='next-theme',root=document.documentElement,toggle=document.getElementById('themeToggle');
 const meta=document.querySelector('meta[name="theme-color"]');
 function current(){return root.getAttribute('data-theme')==='light'?'light':'dark';}
 function apply(mode,persist){
  root.setAttribute('data-theme',mode);
  if(meta)meta.setAttribute('content',mode==='light'?'#f7f5ee':'#0a111b');
  if(toggle)toggle.checked=mode==='dark';
  if(persist){try{localStorage.setItem(KEY,mode);}catch(e){}}
 }
 apply(current(),false);
 if(toggle)toggle.addEventListener('change',()=>apply(toggle.checked?'dark':'light',true));
})();
