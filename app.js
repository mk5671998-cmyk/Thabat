/* ثبات — local-first, dependency-free Arabic PWA.
   All personal data remains in this browser unless the user exports it. */
(() => {
  'use strict';

  const STORE_KEY = 'thabat_app_v1';
  const DAYS = 86_400_000;
  const icons = {
    home: '<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z"/><path d="M9 21v-8h6v8"/>',
    chart: '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M7 16v-4m5 4V8m5 8v-6"/>',
    book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z"/><path d="M9 7h7M9 11h5"/>',
    toolbox: '<rect x="3" y="7" width="18" height="14" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 13h18M10 13v2h4v-2"/>',
    settings: '<path d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z"/><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-1.86 1.86-.06-.06A1.7 1.7 0 0 0 16 18.4a1.7 1.7 0 0 0-1.02 1.55V20H9v-.05A1.7 1.7 0 0 0 7.98 18.4a1.7 1.7 0 0 0-1.88.34l-.06.06-1.86-1.86.06-.06A1.7 1.7 0 0 0 4.6 15 1.7 1.7 0 0 0 3.05 14H3v-4h.05A1.7 1.7 0 0 0 4.6 9a1.7 1.7 0 0 0-.34-1.88L4.2 7.06 6.06 5.2l.06.06A1.7 1.7 0 0 0 8 5.6 1.7 1.7 0 0 0 9 4.05V4h6v.05A1.7 1.7 0 0 0 16 5.6a1.7 1.7 0 0 0 1.88-.34l.06-.06 1.86 1.86-.06.06A1.7 1.7 0 0 0 19.4 9a1.7 1.7 0 0 0 1.55 1H21v4h-.05A1.7 1.7 0 0 0 19.4 15Z"/>',
    heart: '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z"/>',
    bolt: '<path d="m13 2-9 12h7l-1 8 10-12h-7z"/>',
    shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/>',
    arrow: '<path d="m14 7-5 5 5 5"/>',
    arrowleft: '<path d="m10 7 5 5-5 5"/>',
    calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/>',
    check: '<path d="m5 12 4 4L19 6"/>',
    x: '<path d="M18 6 6 18M6 6l12 12"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"/>',
    moon: '<path d="M20.5 13A9 9 0 0 1 11 3.5 9 9 0 1 0 20.5 13Z"/>',
    spark: '<path d="m12 3 2.1 6.9L21 12l-6.9 2.1L12 21l-2.1-6.9L3 12l6.9-2.1L12 3Z"/>',
    target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
    lock: '<rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
    download: '<path d="M12 3v12m-4-4 4 4 4-4"/><path d="M4 17v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3"/>',
    upload: '<path d="M12 16V4m-4 4 4-4 4 4"/><path d="M4 17v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3"/>',
    trash: '<path d="M3 6h18M8 6V4h8v2m3 0-1 15H6L5 6M10 10v7m4-7v7"/>',
    rotate: '<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/>',
    bell: '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7h.01"/>',
    fire: '<path d="M12 22c4.4 0 7-3.1 7-7 0-3.3-1.4-5-3.2-6.8.1 2.4-1.3 3.3-2.4 3.6C14 7.7 11 4 9 2c.5 4.7-1.5 6.1-3.6 9A8 8 0 0 0 5 15c0 3.9 2.6 7 7 7Z"/>',
    coffee: '<path d="M4 8h13v7a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V8Zm13 1h2a3 3 0 0 1 0 6h-2M8 3v2m4-2v2"/>',
    more: '<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>',
    pencil: '<path d="m15 5 4 4M4 20l4.5-.8L20 7.7 16.3 4 4.8 15.5 4 20Z"/>',
    clipboard: '<rect x="5" y="4" width="14" height="18" rx="2"/><path d="M9 4.5V3h6v1.5M9 11h6m-6 4h6"/>',
    external: '<path d="M13 5h6v6M19 5l-9 9"/><path d="M19 13v6H5V5h6"/>'
  };
  const glyph = (name, extra = '') => `<svg class="icon ${extra}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name] || icons.spark}</svg>`;
  const e = value => String(value == null ? '' : value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const today = () => dateKey(new Date());
  const dateKey = (d) => `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
  const fromKey = (key) => new Date(`${key}T12:00:00`);
  const dateFmt = (d, opts = {day:'numeric',month:'long'}) => new Intl.DateTimeFormat('ar-EG-u-nu-latn',opts).format(d);
  const weekday = () => new Intl.DateTimeFormat('ar-EG',{weekday:'long'}).format(new Date());
  const cap = (t, max) => String(t || '').trim().slice(0,max);
  const uid = () => `${Date.now()}-${Math.random().toString(36).slice(2,10)}`;

  const milestones = [
    {days:1,label:'أول 24 ساعة',icon:'spark'},
    {days:3,label:'3 أيام',icon:'sun'},
    {days:7,label:'أسبوع كامل',icon:'target'},
    {days:14,label:'أسبوعين',icon:'shield'},
    {days:30,label:'شهر',icon:'fire'},
    {days:60,label:'60 يوم',icon:'heart'},
    {days:90,label:'90 يوم',icon:'spark'},
    {days:180,label:'نصف سنة',icon:'target'},
    {days:365,label:'سنة',icon:'shield'}
  ];
  const dailyMessages = [
    'مش مطلوب منك تكسب كل يوم بسهولة؛ المهم إنك ترجع تختار اللي يناسبك.',
    'الرغبة إحساس، مش أمر لازم تنفّذه. تقدر تسيبها تعدّي.',
    'أنت أكتر من مجرد رقم في عداد. خليك لطيف مع نفسك.',
    'كل مرة بتختار فيها تتصرف بوعي، بتتعلّم حاجة جديدة.',
    'التقدم مش خط مستقيم. المهم الاتجاه اللي أنت ماشي فيه.',
    'مش لازم تبقى متحمس طول الوقت. خطوة صغيرة كفاية النهارده.',
    'افتكر السبب اللي خلاك تبدأ، وادّي نفسك فرصة تكمل.',
    'التغيير الحقيقي بيتكوّن من اختيارات هادية ومتكررة.',
    'وقت الملل، جرّب تغيّر المكان قبل ما تاخد أي قرار.',
    'الراحة والنوم والحركة عوامل بتساعدك تحافظ على توازنك.',
    'لو اليوم صعب، صغّر الهدف: العشر دقايق الجايين وبس.',
    'أنت تقدر تطلب مساندة، ومش لازم تواجه كل حاجة لوحدك.'
  ];
  const challenges = [
    'امشِ 10 دقايق من غير موبايل.',
    'حضّر حاجة بسيطة تفرحك بعد يومك.',
    'ابعد الموبايل عن السرير الليلة.',
    'اختار نشاط بديل للملل واكتبه.',
    'ابعت رسالة اطمئنان لشخص بتحبه.',
    'رتّب مكانك لمدة 5 دقايق.',
    'اتمدد أو اتحرك 10 دقايق.',
    'خد استراحة بعيد عن الشاشة.',
    'اكتب جملة واحدة عن سبب هدفك.',
    'نام بدري عن المعتاد بنص ساعة.'
  ];
  const tips = [
    {icon:'arrow',title:'غيّر مكانك',desc:'قوم من السرير أو الأوضة، وروح مكان فيه حركة أو نور.'},
    {icon:'coffee',title:'اشغل إيدك',desc:'اعمل مشروب، اغسل وشك، أو رتّب حاجة صغيرة.'},
    {icon:'sun',title:'اتحرك شوية',desc:'امشِ خمس دقايق أو اعمل تمدد خفيف في البيت.'},
    {icon:'heart',title:'اطلب تواصل',desc:'ابعت رسالة لصديق تثق فيه عن يومك؛ مش لازم تشرح تفاصيل.'},
    {icon:'book',title:'اكتب اللي حاسس بيه',desc:'سمّي الإحساس: ملل، توتر، وحدة؟ تحديده بيساعدك تتصرف.'},
    {icon:'moon',title:'ابعد عن الشاشة',desc:'لو قرب النوم، حط الموبايل بعيد وشغّل حاجة هادية.'}
  ];
  const moodOptions = [
    {id:'great',emoji:'🌞',label:'مرتاح'},
    {id:'okay',emoji:'🙂',label:'عادي'},
    {id:'low',emoji:'😕',label:'متضايق'},
    {id:'anxious',emoji:'🌧️',label:'متوتر'}
  ];
  const triggers = {
    boredom:'ملل',stress:'توتر',alone:'وحدة',night:'قبل النوم',content:'محتوى مثير',other:'مش متأكد'
  };
  const menus = [
    {id:'home',label:'الرئيسية',icon:'home'},
    {id:'progress',label:'تقدمي',icon:'chart'},
    {id:'journal',label:'يومياتي',icon:'book'},
    {id:'tools',label:'صندوق الأدوات',icon:'toolbox'},
    {id:'settings',label:'الإعدادات',icon:'settings'}
  ];
  function defaultState() {
    return {
      version:1,
      profile:{name:'',reason:'عايز أتحكم في وقتي وقراراتي بشكل أفضل.'},
      startAt:new Date().toISOString(),bestDays:0,previousStreaks:[],
      checkins:{},urges:[],notes:[],
      plan:{when:'لما أكون لوحدي أو زهقان',then:'هقوم أغيّر مكاني وأمشي 5 دقايق'},
      habits:{bed:false,activity:false,social:false,blocks:false},
      theme:'light',
      reminder:{enabled:false,time:'20:30',lastNotified:''}
    };
  }
  function loadState() {
    try {
      const raw = localStorage.getItem(STORE_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      if (!parsed || parsed.version !== 1 || !parsed.profile || typeof parsed.startAt !== 'string') return null;
      return normalizeState(parsed);
    } catch { return null; }
  }
  function normalizeState(v) {
    const d = defaultState();
    if (!v || !v.profile || !Number.isFinite(Date.parse(v.startAt))) throw new Error('ملف غير صالح');
    const validDate = value => typeof value === 'string' && Number.isFinite(Date.parse(value));
    const rawChecks = (v.checkins && typeof v.checkins==='object' && !Array.isArray(v.checkins))?v.checkins:{};
    const checkins = Object.fromEntries(Object.entries(rawChecks)
      .filter(([key,item])=>/^\d{4}-\d{2}-\d{2}$/.test(key) && item && typeof item==='object')
      .slice(-3000).map(([key,item])=>[key,{
        mood:moodOptions.some(m=>m.id===item.mood)?item.mood:'okay',
        note:cap(item.note,300),at:validDate(item.at)?item.at:new Date().toISOString()
      }]));
    const notes = (Array.isArray(v.notes)?v.notes:[])
      .filter(item=>item && typeof item==='object' && validDate(item.createdAt))
      .slice(-1500).map(item=>({
        id:cap(item.id,80)||uid(),createdAt:item.createdAt,
        mood:moodOptions.some(m=>m.id===item.mood)?item.mood:'okay',
        urge:Math.max(1,Math.min(5,Math.floor(Number(item.urge)||3))),
        trigger:triggers[item.trigger]?item.trigger:'other',text:cap(item.text,600)
      }));
    const urges=(Array.isArray(v.urges)?v.urges:[])
      .filter(item=>item && typeof item==='object' && validDate(item.date))
      .slice(-3000).map(item=>({id:cap(item.id,80)||uid(),date:item.date,
        trigger:triggers[item.trigger]?item.trigger:'other',outcome:'passed'}));
    const previousStreaks=(Array.isArray(v.previousStreaks)?v.previousStreaks:[])
      .filter(item=>item && validDate(item.from) && validDate(item.to))
      .slice(-100).map(item=>({from:item.from,to:item.to,days:Math.max(0,Math.floor(Number(item.days)||0))}));
    return {
      ...d,version:1,
      profile:{name:cap(v.profile.name,35),reason:cap(v.profile.reason,250) || d.profile.reason},
      startAt:new Date(Math.min(Date.parse(v.startAt),Date.now())).toISOString(),
      bestDays:Math.max(0,Math.min(99999,Math.floor(Number(v.bestDays)||0))),
      previousStreaks,checkins,urges,notes,
      plan:{when:cap(v.plan?.when,110)||d.plan.when,then:cap(v.plan?.then,160)||d.plan.then},
      habits:Object.fromEntries(Object.keys(d.habits).map(key=>[key,Boolean(v.habits?.[key])])),
      theme:v.theme==='dark'?'dark':'light',
      reminder:{enabled:Boolean(v.reminder?.enabled),time:/^\d{2}:\d{2}$/.test(v.reminder?.time)?v.reminder.time:'20:30',lastNotified:cap(v.reminder?.lastNotified,10)}
    };
  }

  let state = loadState();
  let isNew = !state;
  if (isNew) state = defaultState();
  let view = 'home';
  let modal = isNew ? 'onboarding' : null;
  let checkinMood = 'okay';
  let sosSession = {step:'start',trigger:'other',tip:0,startedAt:0};
  let monthCursor = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  let installEvent = null;
  let lastDayRendered = today();
  let toastTimeout;

  function save() {
    if (isNew) return;
    try { localStorage.setItem(STORE_KEY,JSON.stringify(state)); }
    catch { toast('تعذر الحفظ على الجهاز. جرّب مساحة تخزين أو متصفح آخر.','warn'); }
  }
  function getElapsed() {return Math.max(0,Date.now()-new Date(state.startAt).getTime());}
  function streakDays() {return Math.floor(getElapsed()/DAYS);}
  function bestDays() {return Math.max(streakDays(),state.bestDays);}
  function selectedMotivation() {return dailyMessages[hash(today())%dailyMessages.length];}
  function selectedChallenge() {return challenges[hash(today())%challenges.length];}
  function hash(v) {return [...v].reduce((h,c)=>((h*31+c.charCodeAt(0))>>>0),7);}
  function nextMilestone() {return milestones.find(m=>streakDays()<m.days);}
  function milestoneNote() { const n=nextMilestone();return n ? `فاضل ${n.days-streakDays()} ${n.days-streakDays()===1?'يوم':'أيام'} على ${n.label}`:'إنجاز كبير، كمّل على راحتك'; }
  function remind() {
    const r = state.reminder;
    if (!r?.enabled || isNew || state.checkins[today()] || r.lastNotified===today()) return;
    if (!('Notification' in window) || Notification.permission!=='granted') return;
    const now = new Date();
    const hhmm=`${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
    if (hhmm < r.time) return;
    try { new Notification('ثبات · لحظتك اليومية', {body:'دقيقة صغيرة تسجل فيها إحساسك وتفتكر هدفك 🌿',icon:'./icons/icon-192.png',tag:'thabat-daily'}); r.lastNotified=today(); save(); }
    catch { /* Notifications may be blocked by device settings. */ }
  }
  function toast(message, type='success') {
    const root=document.getElementById('toast-root');
    if (!root) return;
    root.innerHTML=`<div class="toast ${type==='warn'?'toast-warn':''}">${glyph(type==='warn'?'info':'check')}<span>${e(message)}</span></div>`;
    clearTimeout(toastTimeout);
    toastTimeout=setTimeout(()=>{root.innerHTML='';},4200);
  }
  function statCard(iconName, label, value, suffix='', soft='') {
    return `<div class="stat-card"><div class="stat-icon ${soft}">${glyph(iconName)}</div><div><span class="stat-label">${label}</span><div class="stat-number">${value}<small>${suffix}</small></div></div></div>`;
  }
  function navButton(item, mobile=false) {
    return `<button type="button" data-nav="${item.id}" class="${mobile?'bottom-link':'nav-link'} ${view===item.id?'active':''}" aria-current="${view===item.id?'page':'false'}">${glyph(item.icon)}<span>${item.label}</span></button>`;
  }
  function renderApp() {
    document.documentElement.dataset.theme=state.theme;
    const name = state.profile.name ? `، ${e(state.profile.name)}` : '';
    document.getElementById('app').innerHTML=`
      <div class="app-shell">
        <aside class="sidebar" aria-label="التنقل الرئيسي">
          <div class="brand-wrap"><div class="brand-mark" aria-hidden="true"><span class="brand-path">↗</span></div><div><div class="brand-name">ثبات<span class="brand-dot">.</span></div><div class="brand-description">كل يوم خطوة</div></div></div>
          <div class="sidebar-rule"></div>
          <div class="nav-heading">مساحتك</div>
          <nav class="side-nav">${menus.map(m=>navButton(m)).join('')}</nav>
          <div class="sidebar-grow"></div>
          <div class="side-support"><span class="support-icon">${glyph('heart')}</span><div><b>لحظة صعبة؟</b><p>عندك مساحة تهدى فيها.</p></div><button data-action="open-sos" class="btn btn-on-dark">ساعدني دلوقتي ${glyph('arrow')}</button></div>
          <div class="side-bottom">${glyph('lock')} بياناتك على جهازك فقط</div>
        </aside>
        <div class="main-wrap">
          <header class="topbar"><div><div class="eyebrow">${e(weekday())} · ${e(dateFmt(new Date()))}</div><div class="top-title">أهلًا بيك${name} <span aria-hidden="true">🌿</span></div></div><div class="top-actions"><span class="privacy-pill">${glyph('lock')} خاص بيك</span><button type="button" class="circle-action" data-action="toggle-theme" aria-label="تغيير الوضع الفاتح والداكن" title="تغيير المظهر">${glyph(state.theme==='light'?'moon':'sun')}</button></div></header>
          <main id="app-main" class="main-content">${view==='home'?renderHome():view==='progress'?renderProgress():view==='journal'?renderJournal():view==='tools'?renderTools():renderSettings()}</main>
          <footer class="site-footer">ثبات · تقدم واقعي، من غير جلد ذات <span>مصنوع عشانك وبخصوصيتك</span></footer>
        </div>
      </div>
      <nav class="bottom-nav" aria-label="التنقل على الهاتف">${menus.map(m=>navButton(m,true)).join('')}</nav>
      <button type="button" class="sos-fab" data-action="open-sos" aria-label="مساعدة سريعة وقت الرغبة">${glyph('heart')}<span>ساعدني</span></button>
    `;
    updateLiveNumbers();
    renderModal();
  }

  function renderHome() {
    const d=streakDays(), n=nextMilestone(), pct=n?Math.min(100,Math.round(100*d/n.days)):100;
    const done=Boolean(state.checkins[today()]);
    const week=Array.from({length:7},(_,i)=>{const date=new Date();date.setDate(date.getDate()-6+i);return date;});
    return `
      <section class="page-title-row"><div><span class="section-kicker">مساحة صغيرة ليك</span><h1>خطوة النهارده بتفرق<span class="accent-dot">.</span></h1><p>مش سباق ولا اختبار. تابع طريقك بالراحة، يوم ورا يوم.</p></div><span class="date-chip">${glyph('calendar')} ${e(dateFmt(new Date(),{day:'numeric',month:'long',year:'numeric'}))}</span></section>
      <div class="hero-grid">
        <section class="hero-card" aria-label="عداد سلسلة الاستمرار">
          <div class="hero-orb hero-orb-a"></div><div class="hero-orb hero-orb-b"></div>
          <div class="hero-text"><span class="hero-label">${glyph('fire')} سلسلتك الحالية</span><h2 class="hero-count"><span id="streak-days">${d}</span><small>يوم</small></h2><p>اللي فات دليل إنك تقدر تختار لنفسك. والنهارده فرصة جديدة.</p>
            <div class="hero-timer"><div><strong id="streak-hours">0</strong><span>ساعة</span></div><i></i><div><strong id="streak-minutes">0</strong><span>دقيقة</span></div><i></i><div><strong id="streak-seconds">0</strong><span>ثانية</span></div></div>
            <span class="hero-foot">${glyph('shield')} كل التقدم محفوظ على جهازك</span>
          </div>
          <div class="hero-ring-wrap"><div class="hero-ring" style="--ring-progress:${pct}%"><div class="hero-ring-inside">${glyph('target')}<strong>${n?`${pct}%`:'100%'}</strong><span>${n?'من هدفك الجاي':'إنجاز رائع'}</span></div></div><div class="hero-next">${e(milestoneNote())}</div></div>
        </section>
        <section class="quote-card"><div class="quote-header"><span class="small-label">${glyph('sun')} رسالة ليك النهارده</span><span class="quote-emoji">✳</span></div><div class="quote-mark">“</div><p class="quote-content">${e(selectedMotivation())}</p><div class="daily-divider"></div><div class="daily-task"><span class="task-icon">${glyph('spark')}</span><div><b>تحدي بسيط</b><p>${e(selectedChallenge())}</p></div></div><button data-action="open-checkin" class="btn ${done?'btn-soft':'btn-primary'} block">${glyph(done?'check':'pencil')} ${done?'سجّلت يومك · عدّل لو حابب':'سجّل إحساسك النهارده'}</button></section>
      </div>
      <div class="stats-grid">
        ${statCard('target','أفضل سلسلة',e(bestDays()),'يوم','green')}
        ${statCard('heart','لحظات صعبة عدّت',e(state.urges.filter(u=>u.outcome==='passed').length),'مرة','peach')}
        ${statCard('calendar','أيام دوّنت فيها',e(Object.keys(state.checkins).length),'يوم','blue')}
      </div>
      <div class="home-bottom-grid">
        <section class="panel milestones-panel"><div class="panel-heading"><div><span class="section-kicker">معالم الطريق</span><h3>احتفل بكل خطوة</h3></div><button class="text-link" data-nav="progress">كل التقدم ${glyph('arrow')}</button></div><div class="milestones-list">${milestones.slice(0,5).map(m=>`<div class="milestone-item ${d>=m.days?'completed':''}"><div class="milestone-icon">${glyph(d>=m.days?'check':m.icon)}</div><strong>${m.label}</strong><span>${d>=m.days?'اتحققت ✨':`اليوم ${m.days}`}</span></div>`).join('')}</div></section>
        <section class="panel week-panel"><div class="panel-heading"><div><span class="section-kicker">الروتين اليومي</span><h3>آخر 7 أيام</h3></div>${glyph('calendar','muted')}</div><div class="week-days">${week.map(t=>{const k=dateKey(t),v=state.checkins[k];return `<div class="week-day"><span>${e(dateFmt(t,{weekday:'short'}))}</span><div class="day-bubble ${v?'day-done':''} ${k===today()?'day-today':''}">${v?glyph('check'):e(String(t.getDate()))}</div></div>`;}).join('')}</div><div class="week-note">${glyph('info')} التسجيل مش اختبار؛ حتى يوم صعب يستاهل تدوّنه.</div></section>
      </div>
      <section class="rescue-strip"><span class="rescue-strip-icon">${glyph('heart')}</span><div><b>حاسس إن الرغبة قوية دلوقتي؟</b><p>فيه خطوات هادية وسريعة تساعدك تعدّي اللحظة من غير ضغط.</p></div><button data-action="open-sos" class="btn btn-white">افتح وضع المساعدة ${glyph('arrow')}</button></section>
    `;
  }
  function renderCalendar() {
    const year=monthCursor.getFullYear(),month=monthCursor.getMonth();
    const start=new Date(year,month,1),offset=start.getDay(),count=new Date(year,month+1,0).getDate();
    const cells=[];
    for(let i=0;i<offset;i++) cells.push('<span class="calendar-blank" aria-hidden="true"></span>');
    for(let day=1;day<=count;day++) {
      const dt=new Date(year,month,day),k=dateKey(dt),marked=Boolean(state.checkins[k]),helped=state.urges.some(u=>dateKey(new Date(u.date))===k && u.outcome==='passed'),isToday=k===today(),future=dt>new Date();
      cells.push(`<div class="calendar-cell ${marked?'logged':''} ${helped?'helped':''} ${isToday?'current':''} ${future?'future':''}" title="${marked?'تم تسجيل اليوم':'لا يوجد تسجيل'}${helped?' · تم تجاوز لحظة صعبة':''}"><span>${day}</span>${marked?'<i class="cell-dot"></i>':helped?'<i class="cell-help"></i>':''}</div>`);
    }
    return `<div class="calendar-head"><button type="button" class="icon-btn" data-action="month-prev" aria-label="الشهر السابق">${glyph('arrow')}</button><strong>${e(dateFmt(monthCursor,{month:'long',year:'numeric'}))}</strong><button type="button" class="icon-btn" data-action="month-next" aria-label="الشهر التالي">${glyph('arrowleft')}</button></div><div class="calendar-grid">${['أحد','إثن','ثلا','أرب','خمي','جمع','سبت'].map(day=>`<span class="weekday-label">${day}</span>`).join('')}${cells.join('')}</div><div class="calendar-legend"><span><i class="legend-dot green-dot"></i> سجلت إحساسك</span><span><i class="legend-dot orange-dot"></i> عدّيت لحظة صعبة</span></div>`;
  }
  function renderProgress() {
    const d=streakDays(),n=nextMilestone();
    const last7=Array.from({length:7},(_,i)=>{const t=new Date();t.setDate(t.getDate()-6+i);return t;});
    const triggerCount={};
    [...state.urges,...state.notes].forEach(v=>{if(v.trigger && v.trigger!=='other' && triggers[v.trigger])triggerCount[v.trigger]=(triggerCount[v.trigger]||0)+1;});
    const ranked=Object.entries(triggerCount).sort((a,b)=>b[1]-a[1]);
    const max=Math.max(1,...ranked.map(([_,n])=>n));
    return `<section class="page-title-row"><div><span class="section-kicker">بص على رحلتك</span><h1>كل تقدم له معنى<span class="accent-dot">.</span></h1><p>الأرقام تساعدك تلاحظ، مش تحكم عليك.</p></div></section>
      <div class="stats-grid">${statCard('fire','السلسلة الحالية',e(d),'يوم','green')}${statCard('target','أطول سلسلة',e(bestDays()),'يوم','peach')}${statCard('heart','مواقف تعاملت معاها',e(state.urges.filter(u=>u.outcome==='passed').length),'مرة','blue')}</div>
      <div class="progress-grid"><section class="panel"><div class="panel-heading"><div><span class="section-kicker">تقويم الرحلة</span><h3>شوف أيامك</h3></div></div>${renderCalendar()}</section>
      <section class="panel insight-panel"><div class="panel-heading"><div><span class="section-kicker">نظرة سريعة</span><h3>اللي بتتعلمه</h3></div>${glyph('chart','muted')}</div>
       <div class="insight-subtitle">تسجيلات آخر أسبوع</div><div class="weekly-chart">${last7.map(t=>{const has=Boolean(state.checkins[dateKey(t)]);return `<div class="weekly-col"><div class="bar-track"><div class="bar-fill ${has?'bar-filled':''}" style="height:${has?'82%':'12%'}"></div></div><span>${e(dateFmt(t,{weekday:'short'}))}</span></div>`;}).join('')}</div>
       <div class="insight-divider"></div><div class="insight-subtitle">المحفزات اللي لاحظتها${ranked.length?'':' (لسه مفيش بيانات)'}</div>
       ${ranked.length?`<div class="trigger-bars">${ranked.slice(0,3).map(([k,v])=>`<div class="trigger-line"><span>${e(triggers[k])}</span><div class="trigger-track"><span style="width:${v/max*100}%"></span></div><b>${v}</b></div>`).join('')}</div>`:'<p class="muted-copy">دوّن شوية ملاحظات في يومياتك، وهتلاقي هنا أكتر الأوقات اللي بتحتاج فيها دعم.</p>'}
      </section></div>
      <section class="panel journey-panel"><div class="panel-heading"><div><span class="section-kicker">إنجازاتك</span><h3>الطريق قدامك</h3></div><span class="subtle-tag">${n?e(milestoneNote()):'كل المعالم اتحققت!'}</span></div><div class="achievement-grid">${milestones.map(m=>`<div class="achievement ${d>=m.days?'is-earned':'is-locked'}"><span class="achievement-icon">${glyph(d>=m.days?m.icon:'lock')}</span><b>${e(m.label)}</b><small>${d>=m.days?'تم الإنجاز':`بعد ${Math.max(0,m.days-d)} يوم`}</small></div>`).join('')}</div></section>
      <section class="panel history-panel"><div class="panel-heading"><div><span class="section-kicker">من محطات رحلتك</span><h3>البدايات الجديدة جزء من الطريق</h3></div>${glyph('rotate','muted')}</div>
      ${state.previousStreaks.length?`<div class="history-list">${[...state.previousStreaks].reverse().slice(0,5).map(item=>`<div class="history-row"><span>${glyph('calendar')} ${e(dateFmt(new Date(item.to),{day:'numeric',month:'long',year:'numeric'}))}</span><b>سلسلة سابقة: ${Math.max(0,Number(item.days)||0)} يوم</b></div>`).join('')}</div>`:'<p class="muted-copy">لو قررت تبدأ سلسلة جديدة في أي وقت، هتفضل بداياتك السابقة محفوظة هنا — لأن اللي اتعلمته مابيروحش.</p>'}</section>`;
  }
  function moodLabel(id) {return moodOptions.find(m=>m.id===id)?.label||'مش محدد';}
  function renderJournal() {
    const entries=[...state.notes].sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt));
    return `<section class="page-title-row"><div><span class="section-kicker">اعرف نفسك أحسن</span><h1>يومياتك الخاصة<span class="accent-dot">.</span></h1><p>سجل اللي حاسس بيه من غير أحكام؛ ملاحظاتك مش بتخرج من جهازك.</p></div></section>
      <div class="journal-grid"><section class="panel form-panel"><div class="panel-heading"><div><span class="section-kicker">تفريغ بسيط</span><h3>إيه اللي في بالك؟</h3></div>${glyph('pencil','muted')}</div>
      <form id="journal-form" class="form-stack"><label for="note-mood">حالتك دلوقتي</label><select id="note-mood" name="mood" class="input">${moodOptions.map(m=>`<option value="${m.id}">${m.emoji} ${m.label}</option>`).join('')}</select>
        <label for="note-urge">قوة الرغبة: <output id="urge-value">3 من 5</output></label><input id="note-urge" name="urge" type="range" min="1" max="5" value="3" class="range-input" />
        <label for="note-trigger">إيه اللي حرك الإحساس؟</label><select id="note-trigger" name="trigger" class="input">${Object.entries(triggers).map(([k,v])=>`<option value="${k}">${v}</option>`).join('')}</select>
        <label for="note-text">ملاحظة لنفسك <span class="optional">(اختياري)</span></label><textarea name="text" id="note-text" rows="4" maxlength="600" placeholder="أنا حاسس بـ... وممكن أساعد نفسي عن طريق..."></textarea>
        <button type="submit" class="btn btn-primary block">${glyph('check')} احفظ الملاحظة</button></form></section>
      <section class="panel entries-panel"><div class="panel-heading"><div><span class="section-kicker">من مذكراتك</span><h3>آخر تسجيلاتك</h3></div><span class="subtle-tag">${entries.length} تسجيل</span></div>
        ${entries.length?`<div class="entry-list">${entries.slice(0,30).map(note=>`<article class="entry-card"><div class="entry-top"><div><span class="entry-date">${e(dateFmt(new Date(note.createdAt),{day:'numeric',month:'long',year:'numeric'}))}</span><span class="entry-mood">${e(moodLabel(note.mood))}</span></div><button data-action="delete-note" data-id="${e(note.id)}" class="icon-btn minor" title="حذف الملاحظة" aria-label="حذف الملاحظة">${glyph('trash')}</button></div>${note.text?`<p class="entry-text">${e(note.text)}</p>`:''}<div class="entry-foot"><span>الرغبة ${e(note.urge)}/5</span><span>${e(triggers[note.trigger]||'مش محدد')}</span></div></article>`).join('')}</div>`:'<div class="empty-state"><span>✍️</span><b>لسه مفيش ملاحظات</b><p>أول تسجيل مش لازم يكون طويل؛ حتى كلمة صغيرة كفاية.</p></div>'}
      </section></div>`;
  }
  function renderTools() {
    const habitList=[
      {key:'bed',label:'هسيب الموبايل بعيد عن السرير قبل النوم',icon:'moon'},
      {key:'activity',label:'هجهز نشاط بديل وقت الملل',icon:'sun'},
      {key:'social',label:'هختار شخص أقدر أكلمه لما أحتاج',icon:'heart'},
      {key:'blocks',label:'هقلل المحتوى اللي بيزود الرغبة لو بيحفزني',icon:'shield'}
    ];
    return `<section class="page-title-row"><div><span class="section-kicker">وقت ما تحتاج</span><h1>صندوق أدواتك<span class="accent-dot">.</span></h1><p>وسائل عملية تساعدك تختار رد فعلك، بدل ما تحس إنك متساق.</p></div></section>
      <section class="reason-hero"><span class="reason-hero-icon">${glyph('heart')}</span><div><span>فكّر نفسك ليه بدأت</span><h2>«${e(state.profile.reason)}»</h2></div><button data-nav="settings" class="btn btn-white">عدّل هدفك ${glyph('pencil')}</button></section>
      <div class="tools-grid"><section class="panel"><div class="panel-heading"><div><span class="section-kicker">خطة لو / هعمل</span><h3>جهّز ردك قبل الموقف</h3></div>${glyph('target','muted')}</div><p class="form-help">لما تحدد رد فعل بسيط من بدري، بيبقى أسهل تفتكره وقت الرغبة.</p><form id="plan-form" class="form-stack"><label for="plan-when">لو حصل...</label><input class="input" id="plan-when" name="when" maxlength="110" value="${e(state.plan.when)}" required /><label for="plan-then">هعمل...</label><input class="input" id="plan-then" name="then" maxlength="160" value="${e(state.plan.then)}" required /><button type="submit" class="btn btn-primary block">${glyph('check')} احفظ خطتي</button></form></section>
      <section class="panel"><div class="panel-heading"><div><span class="section-kicker">بيئة أريح</span><h3>حاجات تساعدك</h3></div>${glyph('shield','muted')}</div><p class="form-help">اختار الخطوات اللي مناسبة ليك. تقدر تغيّرها في أي وقت.</p><div class="habit-list">${habitList.map(h=>`<button type="button" data-action="toggle-habit" data-key="${h.key}" aria-pressed="${Boolean(state.habits[h.key])}" class="habit-row ${state.habits[h.key]?'habit-checked':''}"><span class="habit-check">${state.habits[h.key]?glyph('check'):''}</span><span>${h.label}</span></button>`).join('')}</div></section></div>
      <section class="panel tip-bank"><div class="panel-heading"><div><span class="section-kicker">بدائل جاهزة</span><h3>جرّب واحدة من دول</h3></div></div><div class="tips-grid">${tips.map(t=>`<div class="tip-tile"><div class="tip-tile-icon">${glyph(t.icon)}</div><b>${t.title}</b><p>${t.desc}</p></div>`).join('')}</div><button data-action="open-sos" class="btn btn-primary rescue-main">${glyph('heart')} محتاج مساعدة دلوقتي؟</button></section>`;
  }
  function renderSettings() {
    const r=state.reminder;
    return `<section class="page-title-row"><div><span class="section-kicker">كل شيء في إيدك</span><h1>الإعدادات والخصوصية<span class="accent-dot">.</span></h1><p>تحكم في هدفك وبياناتك وطريقة استخدامك للتطبيق.</p></div></section>
      <div class="settings-grid"><section class="panel settings-panel"><div class="panel-heading"><div><span class="section-kicker">ملفي</span><h3>عرّف هدفك بطريقتك</h3></div>${glyph('pencil','muted')}</div><form id="profile-form" class="form-stack"><label for="profile-name">اسم تحب نناديك بيه <span class="optional">(اختياري)</span></label><input class="input" id="profile-name" name="name" maxlength="35" placeholder="اسمك أو لقبك" value="${e(state.profile.name)}" /><label for="profile-reason">السبب اللي عايز تكمل عشانه</label><textarea id="profile-reason" name="reason" rows="4" maxlength="250" required>${e(state.profile.reason)}</textarea><button type="submit" class="btn btn-primary block">${glyph('check')} حفظ التغييرات</button></form></section>
      <section class="panel settings-panel"><div class="panel-heading"><div><span class="section-kicker">تذكير هادي</span><h3>افتكر تسجل يومك</h3></div>${glyph('bell','muted')}</div><p class="form-help">تذكير اختياري لو التطبيق مفتوح، ومش هيبعتلك حاجة من سيرفر.</p><div class="reminder-row"><label for="reminder-time">ميعاد مناسب</label><input type="time" class="input" id="reminder-time" value="${e(r.time)}" /></div><button type="button" data-action="toggle-reminder" class="btn ${r.enabled?'btn-soft':'btn-outline'} block">${glyph('bell')} ${r.enabled?'أوقف التذكير':'فعّل التذكير'}</button><p class="hint-note">ملحوظة: الإشعارات هنا بتشتغل أثناء فتح التطبيق فقط، وممكن المتصفح يمنعها. تقدر تعتمد على تسجيل الدخول اليومي بدلها.</p><div class="settings-rule"></div><div class="setting-line"><div><b>المظهر</b><span>اختار اللي يريح عينك</span></div><button type="button" data-action="toggle-theme" class="btn btn-outline">${glyph(state.theme==='light'?'moon':'sun')} ${state.theme==='light'?'داكن':'فاتح'}</button></div><div class="setting-line"><div><b>التثبيت على الموبايل</b><span>افتح ثبات كأنه تطبيق</span></div><button type="button" data-action="install-app" class="btn btn-outline">${glyph('download')} تثبيت</button></div></section>
      <section class="panel settings-panel"><div class="panel-heading"><div><span class="section-kicker">نسخة احتياطية</span><h3>بياناتك ملكك</h3></div>${glyph('lock','muted')}</div><p class="form-help">بياناتك متخزنة محليًا في المتصفح. التصدير بيحفظ ملف JSON تقدر ترجّعه على نفس الجهاز أو جهاز تاني.</p><div class="settings-actions"><button type="button" data-action="export" class="btn btn-primary">${glyph('download')} صدّر نسخة</button><label class="btn btn-outline upload-label" for="import-file">${glyph('upload')} استرجع نسخة</label><input type="file" id="import-file" accept=".json,application/json" hidden /></div><p class="hint-note">مهم: مسح بيانات المتصفح أو تغيير الجهاز ممكن يضيّع تقدمك لو معندكش نسخة احتياطية.</p></section>
      <section class="panel settings-panel"><div class="panel-heading"><div><span class="section-kicker">المرونة</span><h3>ابدأ من جديد وقت ما تحب</h3></div>${glyph('rotate','muted')}</div><p class="form-help">بداية جديدة هتصفّر السلسلة الحالية بس، وهتحتفظ بأفضل سلسلة وملاحظاتك وإنجازاتك السابقة. مش معناها إن أي تقدم راح.</p><button type="button" data-action="restart" class="btn btn-outline block">${glyph('rotate')} ابدأ سلسلة جديدة</button><div class="settings-rule"></div><p class="form-help">لو عايز تحذف كل البيانات المحلية نهائيًا من الجهاز ده:</p><button type="button" data-action="delete-all" class="btn btn-danger-outline block">${glyph('trash')} احذف كل بياناتي</button></section></div>
      <section class="disclaimer">${glyph('info')} <p><b>رسالة مهمة:</b> التوقف عن العادة السرية اختيار شخصي، وممارستها في حد ذاتها مش مرض. التطبيق أداة متابعة ودعم، مش تشخيص أو علاج. لو السلوك خارج عن سيطرتك أو مأثر على نومك أو حياتك، ممكن تستفيد من مساعدة أخصائي نفسي.</p></section>`;
  }

  function renderModal() {
    const root=document.getElementById('modal-root');
    document.body.classList.toggle('modal-open',Boolean(modal));
    if (!modal) {root.innerHTML='';return;}
    const closable=modal!=='onboarding';
    let contents='';
    if (modal==='onboarding') {
      contents=`<div class="modal-heading welcome-heading"><div class="welcome-icon">↗</div><span class="section-kicker">أهلًا بيك في ثبات</span><h2 id="modal-title">هنا تبدأ على مهلك 🌿</h2><p>مساحة خاصة تتابع فيها قرارك وأيامك، وتلاقي مساعدة وقت ما تحتاجها. مفيش حسابات ولا أحكام.</p></div>
        <form id="onboarding-form" class="form-stack"><label for="onboard-name">تحب نناديك بإيه؟ <span class="optional">(اختياري)</span></label><input class="input" id="onboard-name" name="name" maxlength="35" placeholder="اسم أو لقب بسيط" />
        <label for="onboard-reason">إيه السبب الأهم بالنسبالك؟</label><textarea name="reason" id="onboard-reason" maxlength="250" rows="3" required>عايز أتحكم في وقتي وقراراتي بشكل أفضل.</textarea>
        <div class="reason-suggestions"><button type="button" data-action="pick-reason" data-text="عايز أكون أهدى وأتحكم في قراراتي.">راحة وهدوء</button><button type="button" data-action="pick-reason" data-text="عايز أركز أكتر في يومي وأستغل وقتي.">تركيز ووقت</button><button type="button" data-action="pick-reason" data-text="عايز أبني عادات صحية تناسبني.">عادات جديدة</button></div>
        <label for="onboard-date">بداية رحلتك</label><input class="input" id="onboard-date" type="date" name="startDate" max="${today()}" value="${today()}" required /><div class="welcome-note">${glyph('lock')} كل البيانات هتفضل على الجهاز ده، وتقدر تعمل نسخة احتياطية بعدين.</div><button class="btn btn-primary block btn-large" type="submit">ابدأ رحلتي ${glyph('arrow')}</button></form>`;
    } else if (modal==='checkin') {
      const record=state.checkins[today()];
      contents=`<div class="modal-heading"><span class="modal-badge">${glyph('sun')} لحظتك اليومية</span><h2 id="modal-title">إنت عامل إيه النهارده؟</h2><p>مفيش إجابة صح أو غلط. حتى اليوم الصعب يستحق يتسجل.</p></div><form id="checkin-form" class="form-stack"><label>اختار إحساسك الأقرب</label><div class="mood-options">${moodOptions.map(m=>`<button type="button" data-action="pick-mood" data-mood="${m.id}" class="mood-option ${checkinMood===m.id?'is-selected':''}" aria-pressed="${checkinMood===m.id}"><span>${m.emoji}</span><b>${m.label}</b></button>`).join('')}</div><label for="checkin-note">كلمة صغيرة لنفسك <span class="optional">(اختياري)</span></label><textarea id="checkin-note" name="note" rows="3" maxlength="300" placeholder="حاجة ممتن ليها، أو شيء عايز تجربه بكرة...">${e(record?.note||'')}</textarea><button type="submit" class="btn btn-primary block btn-large">${glyph('check')} ${record?'حدّث تسجيلي':'سجّل يومي'}</button></form>`;
    } else if (modal==='sos') {
      const d=streakDays(),step=sosSession.step,tip=tips[sosSession.tip%tips.length];
      if (step==='start') contents=`<div class="sos-top"><div class="sos-symbol">${glyph('heart')}</div><span class="modal-badge sos-badge">مساحة هدوء · بدون أحكام</span><h2 id="modal-title">مش لازم تقرر دلوقتي.</h2><p>الرغبة ممكن تكون قوية، لكنها بتتغير مع الوقت. خلّينا نهتم بالدقيقة الجاية بس.</p></div>
        <div class="reason-reminder"><small>افتكر سببك</small><p>«${e(state.profile.reason)}»</p></div><div class="sos-streak-note">${glyph('target')}<span>أنت مكمل بقالك <b>${d} يوم</b>، لكن قيمتك مش مرتبطة بالرقم.</span></div>
        <label for="sos-trigger" class="sos-field-label">إيه أقرب سبب للرغبة دلوقتي؟</label><select class="input" id="sos-trigger">${Object.entries(triggers).map(([k,v])=>`<option value="${k}" ${sosSession.trigger===k?'selected':''}>${v}</option>`).join('')}</select>
        <button type="button" data-action="start-breathing" class="btn btn-primary block btn-large">${glyph('sun')} ابدأ تهدئة لمدة 90 ثانية</button><button type="button" data-action="skip-breathing" class="btn btn-quiet block">عايز أفكار سريعة بدل التمرين</button>`;
      if (step==='breathe') contents=`<div class="sos-top"><span class="modal-badge sos-badge">خطوة 1 من 2</span><h2 id="modal-title">نفّس براحة</h2><p>اتنفس بشكل مريح، من غير ما تحبس نفسك. لو التمرين مش مريح ليك، تقدر تتخطاه.</p></div><div class="breathing-zone"><div class="breathing-orbit" id="breathing-orbit"><div><span id="breathing-phase">شهيق هادي</span><b id="breathing-count">90</b><small>ثانية باقية</small></div></div></div><div class="breathing-caption">الهدف مش تختفي الرغبة فورًا؛ الهدف تاخد مسافة صغيرة منها.</div><button type="button" data-action="skip-breathing" class="btn btn-outline block">انتقل للأفكار العملية</button>`;
      if (step==='options') contents=`<div class="sos-top"><span class="modal-badge sos-badge">خطوة 2 من 2</span><h2 id="modal-title">اختار تصرّف صغير</h2><p>مش لازم تعمل كل حاجة. خطوة واحدة بس ممكن تغيّر شكل اللحظة.</p></div><div class="sos-tip"><div class="tip-large-icon">${glyph(tip.icon)}</div><span>اقتراح ${sosSession.tip%tips.length+1} من ${tips.length}</span><h3>${tip.title}</h3><p>${tip.desc}</p></div><button type="button" data-action="next-tip" class="btn btn-outline block">${glyph('rotate')} ورّيني فكرة تانية</button><button type="button" data-action="sos-passed" class="btn btn-primary block btn-large">${glyph('check')} عدّيت اللحظة دي</button><p class="sos-footer-note">لو لسه صعب، جرّب تتواصل مع شخص بتثق فيه أو ابعد عن الموقف اللي بيحفّزك.</p>`;
      if (step==='done') contents=`<div class="done-modal"><div class="done-icon">${glyph('check')}</div><span class="section-kicker">خطوة تستحق التقدير</span><h2 id="modal-title">عدّيتها ✨</h2><p>مبسوط إنك ادّيت لنفسك فرصة تهدى وتختار. احتفظ بالإحساس ده، من غير ما تحوّله لضغط.</p><div class="done-count">سجّلت ${state.urges.filter(u=>u.outcome==='passed').length} لحظة صعبة اتعاملت معاها بوعي.</div><button type="button" data-action="close-modal" class="btn btn-primary block btn-large">ارجع لرحلتك ${glyph('arrow')}</button><button type="button" data-action="open-journal" class="btn btn-quiet block">اكتب ملاحظة عن اللي حصل</button></div>`;
    } else if (modal==='install') {
      contents=`<div class="modal-heading"><span class="modal-badge">${glyph('download')} التطبيق على جهازك</span><h2 id="modal-title">ثبّت ثبات على الشاشة الرئيسية</h2><p>تقدر تفتح التطبيق بسرعة كأنه تطبيق عادي، وتستخدمه من غير إنترنت بعد أول زيارة ناجحة.</p></div><div class="install-instructions"><div><b>على iPhone و iPad</b><p>افتح الرابط في Safari، اضغط مشاركة، وبعدها «إضافة إلى الشاشة الرئيسية».</p></div><div><b>على Android أو الكمبيوتر</b><p>افتح الرابط في Chrome أو Edge، واختار «تثبيت التطبيق» من قائمة المتصفح لو متاح.</p></div></div><button data-action="close-modal" class="btn btn-primary block">تمام، فهمت</button>`;
    }
    root.innerHTML=`<div class="overlay ${modal==='onboarding'?'onboard-overlay':''}" role="presentation"><div class="modal-dialog ${modal==='sos'?'sos-dialog':''} ${modal==='onboarding'?'onboard-dialog':''}" role="dialog" aria-modal="true" aria-labelledby="modal-title">${closable?`<button type="button" class="modal-close" data-action="close-modal" aria-label="إغلاق">${glyph('x')}</button>`:''}${contents}</div></div>`;
    if (modal==='sos'&&sosSession.step==='breathe') updateSosTimer();
    const initialFocus = root.querySelector(modal==='onboarding'?'#onboard-name':modal==='checkin'?'.mood-option':'.modal-close, .sos-dialog button, .modal-dialog button');
    if (initialFocus) initialFocus.focus({preventScroll:true});
  }
  function updateLiveNumbers() {
    const elapsed=getElapsed();
    const fields={
      'streak-days':String(Math.floor(elapsed/DAYS)),
      'streak-hours':String(Math.floor(elapsed/3_600_000)%24).padStart(2,'0'),
      'streak-minutes':String(Math.floor(elapsed/60_000)%60).padStart(2,'0'),
      'streak-seconds':String(Math.floor(elapsed/1000)%60).padStart(2,'0')
    };
    for (const [id,value] of Object.entries(fields)){const el=document.getElementById(id);if(el)el.textContent=value;}
  }
  function updateSosTimer() {
    if (modal!=='sos'||sosSession.step!=='breathe') return;
    const seconds=Math.floor((Date.now()-sosSession.startedAt)/1000);
    const left=Math.max(0,90-seconds);
    const count=document.getElementById('breathing-count');
    if (count) count.textContent=String(left);
    const phase=seconds%10;
    const el=document.getElementById('breathing-phase');
    if (el) el.textContent=phase<4?'شهيق هادي':'زفير ببطء';
    const orbit=document.getElementById('breathing-orbit');
    if (orbit) orbit.classList.toggle('exhale',phase>=4);
    if (left===0) {sosSession.step='options';renderModal();}
  }
  function closeModal() {
    if (modal==='onboarding') return;
    modal=null;renderModal();
  }
  function changeView(next) {
    if (!menus.some(m=>m.id===next)) return;
    view=next;modal=null;renderApp();window.scrollTo({top:0,behavior:'instant'});
  }
  function openSos() {sosSession={step:'start',trigger:'other',tip:0,startedAt:0};modal='sos';renderModal();}
  function openCheckin() {checkinMood=state.checkins[today()]?.mood||'okay';modal='checkin';renderModal();}
  function exportData() {
    const payload={app:'thabat',version:1,exportedAt:new Date().toISOString(),data:state};
    const blob=new Blob([JSON.stringify(payload,null,2)],{type:'application/json;charset=utf-8'});
    const url=URL.createObjectURL(blob),a=document.createElement('a');
    a.href=url;a.download=`thabat-backup-${today()}.json`;document.body.appendChild(a);a.click();a.remove();
    setTimeout(()=>URL.revokeObjectURL(url),1000);toast('تم تنزيل النسخة الاحتياطية. احتفظ بيها في مكان آمن.');
  }
  async function importData(file) {
    if (!file) return;
    if (file.size>2_000_000) {toast('الملف كبير جدًا، اختار نسخة احتياطية من ثبات.','warn');return;}
    try {
      const payload=JSON.parse(await file.text());
      if (payload?.app!=='thabat'||payload?.version!==1) throw new Error('ملف غير صحيح');
      const imported=normalizeState(payload.data);
      if (!confirm('استرجاع النسخة هيستبدل بياناتك الحالية بالكامل. الأفضل تصدّر نسخة من تقدمك الأول. نكمل؟')) return;
      state=imported;isNew=false;save();view='home';modal=null;renderApp();toast('تم استرجاع بياناتك بنجاح.');
    } catch {toast('مش قادر أقرأ الملف. استخدم نسخة JSON متصدّرة من ثبات.','warn');}
  }
  async function toggleReminder() {
    if (state.reminder.enabled) {state.reminder.enabled=false;save();renderApp();toast('تم إيقاف التذكير.');return;}
    if (!('Notification' in window) || !window.isSecureContext) {toast('المتصفح أو طريقة التشغيل دي مش بتدعم الإشعارات.','warn');return;}
    try {
      const result=await Notification.requestPermission();
      if (result!=='granted') {toast('الإشعارات مش مسموحة في المتصفح حاليًا.','warn');return;}
      state.reminder.enabled=true;state.reminder.time=document.getElementById('reminder-time')?.value||'20:30';
      state.reminder.lastNotified='';save();renderApp();toast('التذكير اتفعل أثناء فتح التطبيق.');
    } catch {toast('تعذر تشغيل الإشعارات على الجهاز ده.','warn');}
  }
  async function installApp() {
    if (installEvent) {
      const prompt=installEvent;installEvent=null;
      try {await prompt.prompt();await prompt.userChoice;} catch { /* browser may reject */ }
      return;
    }
    modal='install';renderModal();
  }
  function restartStreak() {
    if(!confirm('تبدأ سلسلة جديدة من دلوقتي؟ هتحتفظ بأفضل سلسلة وبسجل يومياتك، ومفيش أي حكم على اللي حصل.')) return;
    const days=streakDays();
    state.bestDays=Math.max(state.bestDays,days);
    state.previousStreaks.push({from:state.startAt,to:new Date().toISOString(),days});
    state.startAt=new Date().toISOString();save();view='home';renderApp();toast('بداية جديدة. كل خبرة فاتت لسه معاك 🌿');
  }
  function deleteAll() {
    if(!confirm('ده هيحذف كل سجلّك وملاحظاتك وإعداداتك من المتصفح ده. هل أنت متأكد؟')) return;
    if(!confirm('آخر تأكيد: البيانات مش هترجع إلا لو عندك نسخة احتياطية. تحذف؟')) return;
    try {localStorage.removeItem(STORE_KEY);}catch {/* no storage */}
    state=defaultState();isNew=true;view='home';modal='onboarding';renderApp();toast('اتمسحت البيانات المحلية من التطبيق.');
  }

  document.addEventListener('click', async event => {
    const nav=event.target.closest('[data-nav]');
    if (nav) {changeView(nav.dataset.nav);return;}
    const button=event.target.closest('[data-action]');
    if (!button) return;
    const a=button.dataset.action;
    if (a==='open-sos') openSos();
    else if (a==='close-modal') closeModal();
    else if (a==='open-checkin') openCheckin();
    else if (a==='toggle-theme') {state.theme=state.theme==='light'?'dark':'light';save();renderApp();}
    else if (a==='pick-reason') {const el=document.getElementById('onboard-reason');if(el) el.value=button.dataset.text;}
    else if (a==='pick-mood') {
      checkinMood=button.dataset.mood;
      document.querySelectorAll('.mood-option').forEach(el=>{const selected=el.dataset.mood===checkinMood;el.classList.toggle('is-selected',selected);el.setAttribute('aria-pressed',String(selected));});
    }
    else if (a==='toggle-habit') {const k=button.dataset.key;if(Object.prototype.hasOwnProperty.call(state.habits,k)){state.habits[k]=!state.habits[k];save();renderApp();}}
    else if (a==='month-prev'||a==='month-next') {monthCursor=new Date(monthCursor.getFullYear(),monthCursor.getMonth()+(a==='month-prev'?-1:1),1);renderApp();}
    else if (a==='start-breathing'||a==='skip-breathing') {
      sosSession.trigger=document.getElementById('sos-trigger')?.value||sosSession.trigger;
      sosSession.step=a==='start-breathing'?'breathe':'options';sosSession.startedAt=Date.now();renderModal();
    }
    else if (a==='next-tip') {sosSession.tip++;renderModal();}
    else if (a==='sos-passed') {
      state.urges.push({id:uid(),date:new Date().toISOString(),trigger:sosSession.trigger,outcome:'passed'});
      save();sosSession.step='done';renderModal();
    }
    else if (a==='open-journal') changeView('journal');
    else if (a==='export') exportData();
    else if (a==='toggle-reminder') await toggleReminder();
    else if (a==='install-app') await installApp();
    else if (a==='restart') restartStreak();
    else if (a==='delete-all') deleteAll();
    else if (a==='delete-note') {
      if(confirm('تحب تمسح الملاحظة دي؟')) {state.notes=state.notes.filter(note=>note.id!==button.dataset.id);save();renderApp();toast('تم حذف الملاحظة.');}
    }
  });
  document.addEventListener('input', event => {
    if (event.target.id==='note-urge') {const output=document.getElementById('urge-value');if(output) output.textContent=`${event.target.value} من 5`;}
    if (event.target.id==='reminder-time') {state.reminder.time=event.target.value||'20:30';save();}
  });
  document.addEventListener('change', event => {
    if (event.target.id==='import-file') {importData(event.target.files?.[0]);event.target.value='';}
  });
  document.addEventListener('submit', event => {
    const form=event.target;
    if (!['onboarding-form','checkin-form','journal-form','plan-form','profile-form'].includes(form.id)) return;
    event.preventDefault();
    const data=new FormData(form);
    if (form.id==='onboarding-form') {
      const start=String(data.get('startDate')||today());
      if (!/^\d{4}-\d{2}-\d{2}$/.test(start) || start>today() || !Number.isFinite(fromKey(start).getTime())) {toast('اختار تاريخ بداية صحيح.','warn');return;}
      const startAt=start===today()?new Date():new Date(`${start}T00:00:00`);
      state.profile={name:cap(data.get('name'),35),reason:cap(data.get('reason'),250)||defaultState().profile.reason};
      state.startAt=startAt.toISOString();isNew=false;save();modal=null;renderApp();toast('بداية موفقة! دي مساحتك من النهارده 🌱');
    }
    if (form.id==='checkin-form') {
      state.checkins[today()]={mood:checkinMood,note:cap(data.get('note'),300),at:new Date().toISOString()};
      save();modal=null;renderApp();toast('اتسجل يومك. شكرًا إنك خصصت لنفسك لحظة.');
    }
    if (form.id==='journal-form') {
      state.notes.push({id:uid(),createdAt:new Date().toISOString(),mood:cap(data.get('mood'),20),urge:Math.max(1,Math.min(5,Number(data.get('urge'))||3)),trigger:cap(data.get('trigger'),20),text:cap(data.get('text'),600)});
      save();renderApp();toast('اتحفظت الملاحظة على جهازك.');
    }
    if (form.id==='plan-form') {
      state.plan={when:cap(data.get('when'),110),then:cap(data.get('then'),160)};
      save();renderApp();toast('حفظنا خطتك الخاصة.');
    }
    if (form.id==='profile-form') {
      state.profile={name:cap(data.get('name'),35),reason:cap(data.get('reason'),250)||defaultState().profile.reason};
      save();renderApp();toast('اتحفظت التغييرات.');
    }
  });
  document.addEventListener('keydown', event => {
    if (event.key==='Escape'&&modal&&modal!=='onboarding') closeModal();
    if (event.key==='Tab'&&modal) {
      const focusable=[...document.querySelectorAll('#modal-root button:not([disabled]),#modal-root input:not([disabled]),#modal-root textarea:not([disabled]),#modal-root select:not([disabled])')];
      if(!focusable.length)return;
      const first=focusable[0],last=focusable[focusable.length-1];
      if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}
      else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}
    }
  });
  window.addEventListener('beforeinstallprompt', event=>{event.preventDefault();installEvent=event;});
  window.addEventListener('storage', event=>{if(event.key===STORE_KEY&&!isNew){const loaded=loadState();if(loaded){state=loaded;renderApp();}}});
  setInterval(()=>{
    updateLiveNumbers();updateSosTimer();remind();
    if (!isNew && streakDays()>state.bestDays) {state.bestDays=streakDays();save();}
    if (today()!==lastDayRendered) {lastDayRendered=today();renderApp();}
  },1000);
  renderApp();
  if ('serviceWorker' in navigator && (location.protocol==='https:'||location.hostname==='localhost'||location.hostname==='127.0.0.1')) {
    window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}));
  }
})();
