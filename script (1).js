const F=[
{n:'Mewa',bg:'#F7E3BE',stick:'#F4EBD9',speck:'#7C9A52',accent:'#862A2B'},
{n:'Paan',bg:'#DDE9C6',stick:'#A9C27A',speck:'#4F7A32',accent:'#2F5A2A'},
{n:'Rose',bg:'#F9D6DF',stick:'#E5518B',speck:'#F9D6DF',accent:'#8A1F4A'},
{n:'Tutti Frutti',bg:'#FBE0B8',stick:'#F2BC8A',speck:'#D94F3A',accent:'#A8431B'},
{n:'Chocolate',bg:'#E8D2BD',stick:'#5A3322',speck:'#2E170E',accent:'#4A2418'},
{n:'Mango',bg:'#FFE79F',stick:'#F7B733',speck:'#E58A12',accent:'#9A5008'},
{n:'Malai Kulfi',bg:'#F3E6EE',stick:'#EEDDE5',speck:'#C9A4B9',accent:'#6B3A5A'}];
const root=document.documentElement,wipe=document.getElementById('wipe'),chips=document.getElementById('chips'),rows=document.getElementById('rows'),stage=document.getElementById('stage');
let cur=0,busy=false;
const reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
const D=['A rich, creamy kulfi loaded with dry fruits and nuts. The classic you can never go wrong with.','Cool and fragrant, with the taste of paan. A sweet way to finish a meal.','Light, floral and pink. Rose kulfi tastes like a summer evening.','Sweet and colourful, with candied fruit in every bite. A favourite with kids.','Deep chocolate in a creamy kulfi, for when you want something indulgent.','Fruity and bright. Mango kulfi is made for mango season and every day after.','Thick, creamy and milky. The traditional kulfi taste, just the way it should be.'];
F.forEach((f,i)=>{
 const r=document.createElement('li');r.innerHTML=`<button class="row" aria-pressed="${i==0}">${f.n}</button><div class="more"><div><p>${D[i]}</p></div></div>`;rows.append(r);
 r.firstChild.onclick=e=>pick(i,e);
});
function mark(){document.querySelectorAll('.chip,.row').forEach((b,k)=>b.setAttribute('aria-pressed',(k%F.length===0?0:0)||[...b.parentNode.parentNode.children].indexOf(b.parentNode)===cur))}
function setVars(f,all){['stick','speck'].forEach(k=>root.style.setProperty('--'+k,f[k]));if(all){root.style.setProperty('--bg',f.bg);root.style.setProperty('--accent',f.accent);root.style.setProperty('--ink',f.n==='Chocolate'?'#3B1D12':'#4A2418')}}
function pick(i,e){
 if(i===cur||busy)return;cur=i;const f=F[i];mark();
 stage.classList.remove('wob');void stage.getBoundingClientRect();stage.classList.add('wob');
 root.style.setProperty('--accent',f.accent);
 if(reduce){setVars(f,true);return}
 busy=true;setVars(f,false);
 const x=e&&e.clientX?e.clientX:innerWidth/2,y=e&&e.clientY?e.clientY:innerHeight/2;
 wipe.style.background=f.bg;wipe.style.visibility='visible';
 const a=wipe.animate([{clipPath:`circle(0px at ${x}px ${y}px)`},{clipPath:`circle(150vmax at ${x}px ${y}px)`}],{duration:850,easing:'cubic-bezier(.7,0,.2,1)'});
 a.onfinish=()=>{setVars(f,true);wipe.style.visibility='hidden';busy=false};
}
addEventListener('pointermove',e=>{if(reduce||busy)return;const x=(e.clientX/innerWidth-.5)*10;stage.style.rotate=x+'deg'});
