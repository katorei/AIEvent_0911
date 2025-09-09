
const STORAGE_KEY = 'saas_customers_v1';

function seedData(){
  return [
    {id:'c1', name:'田中太郎', company:'株式会社サンプル', email:'tanaka@example.com', status:'active', plan:'pro', lastLogin:'2024-12-15', createdAt:'2024-01-15', memo:'', notify:true},
    {id:'c2', name:'佐藤花子', company:'佐藤商事株式会社', email:'sato@company.co.jp', status:'active', plan:'enterprise', lastLogin:'2024-12-14', createdAt:'2024-02-10', memo:'', notify:false},
    {id:'c3', name:'山田一郎', company:'テックコーポレーション', email:'yamada@tech-corp.jp', status:'pending', plan:'basic', lastLogin:'2024-12-10', createdAt:'2024-03-01', memo:'', notify:false},
    {id:'c4', name:'鈴木美咲', company:'デザインスタジオ合同会社', email:'suzuki@design-studio.com', status:'active', plan:'pro', lastLogin:'2024-12-13', createdAt:'2024-01-30', memo:'', notify:true},
    {id:'c5', name:'高橋健', company:'スタートアップ株式会社', email:'takahashi@startup.io', status:'inactive', plan:'basic', lastLogin:'2024-11-28', createdAt:'2024-04-04', memo:'', notify:false},
    {id:'c6', name:'伊藤真理', company:'コンサルティングファーム', email:'ito@consulting.jp', status:'active', plan:'enterprise', lastLogin:'2024-12-15', createdAt:'2024-05-10', memo:'', notify:true},
    {id:'c7', name:'渡辺進一', company:'製造業株式会社', email:'watanabe@manufacturing.com', status:'pending', plan:'pro', lastLogin:'2024-12-12', createdAt:'2024-06-18', memo:'', notify:false},
    {id:'c8', name:'中村あき', company:'リテール株式会社', email:'nakamura@retail.co.jp', status:'active', plan:'basic', lastLogin:'2024-12-14', createdAt:'2024-07-22', memo:'', notify:true}
  ];
}

function getCustomers(){
  const raw = localStorage.getItem(STORAGE_KEY);
  if(!raw){
    const data = seedData();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return data;
  }
  try{
    return JSON.parse(raw);
  }catch(e){
    console.warn('Broken storage. Reseeding.');
    const data = seedData();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return data;
  }
}

function saveCustomers(list){
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

function byId(id){ return getCustomers().find(c=>c.id===id); }

function badgeStatusHTML(status){
  const map = {active:'status-active', pending:'status-pending', inactive:'status-inactive'};
  return `<span class="badge ${map[status]||''}">${status}</span>`;
}
function badgePlanHTML(plan){
  const map = {basic:'plan-basic', pro:'plan-pro', enterprise:'plan-enterprise'};
  return `<span class="badge ${map[plan]||''}">${plan}</span>`;
}

// ---------- Index (一覧) ----------
function renderIndex(){
  const tbody = document.querySelector('#customer-tbody');
  if(!tbody) return; // not on this page
  const customers = getCustomers();
  tbody.innerHTML = customers.map(c => `
    <tr data-id="${c.id}">
      <td>${c.name}</td>
      <td>${c.company||'—'}</td>
      <td>${c.email}</td>
      <td>${badgeStatusHTML(c.status)}</td>
      <td>${badgePlanHTML(c.plan)}</td>
      <td class="mono">${c.lastLogin||'—'}</td>
      <td><div class="kebab"></div></td>
    </tr>
  `).join('');

  // row click - disabled
  // tbody.querySelectorAll('tr').forEach(tr => {
  //   tr.addEventListener('click', (e) => {
  //     if(e.target.closest('.copy')) return;
  //     location.href = `detail.html?id=${tr.dataset.id}`;
  //   });
  // });

  setupSearch();
  setupKebabMenu();
  // setupCopy(); // disabled
}

function setupSearch(){
  const input = document.querySelector('#search');
  if(!input) return;
  input.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase();
    document.querySelectorAll('tbody tr').forEach(tr => {
      const text = tr.innerText.toLowerCase();
      tr.style.display = text.includes(q) ? '' : 'none';
    });
  });
}

async function copyToClipboard(text){
  try{
    await navigator.clipboard.writeText(text);
    return true;
  }catch{
    return false;
  }
}

function setupKebabMenu(){
  document.querySelectorAll('.kebab').forEach(kebab => {
    kebab.addEventListener('click', (e) => {
      e.stopPropagation();
      
      // 既存のメニューを閉じる
      document.querySelectorAll('.kebab-menu').forEach(menu => {
        menu.remove();
      });
      
      // 新しいメニューを作成
      const menu = document.createElement('div');
      menu.className = 'kebab-menu';
      menu.innerHTML = `
        <button class="kebab-item edit-btn" data-id="${kebab.closest('tr').dataset.id}">編集</button>
        <button class="kebab-item delete-btn" data-id="${kebab.closest('tr').dataset.id}">削除</button>
      `;
      
      // メニューの位置を設定
      const rect = kebab.getBoundingClientRect();
      menu.style.position = 'absolute';
      menu.style.top = `${rect.bottom + 4}px`;
      menu.style.right = `${window.innerWidth - rect.right}px`;
      menu.style.zIndex = '1000';
      
      // メニューを追加
      document.body.appendChild(menu);
      
      // 編集ボタンのイベント
      menu.querySelector('.edit-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        const id = e.target.dataset.id;
        location.href = `detail.html?id=${id}`;
      });
      
      // 削除ボタンのイベント
      menu.querySelector('.delete-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        const id = e.target.dataset.id;
        if(confirm('この顧客を削除しますか？')) {
          const list = getCustomers().filter(c => c.id !== id);
          saveCustomers(list);
          location.reload();
        }
      });
      
      // メニュー外をクリックしたら閉じる
      setTimeout(() => {
        document.addEventListener('click', function closeMenu() {
          menu.remove();
          document.removeEventListener('click', closeMenu);
        });
      }, 0);
    });
  });
}

function setupCopy(){
  document.querySelectorAll('[data-copy]').forEach(el => {
    el.addEventListener('click', async (ev) => {
      ev.stopPropagation();
      const ok = await copyToClipboard(el.getAttribute('data-copy'));
      el.textContent = ok ? '✓' : '×';
      setTimeout(()=>{ el.textContent = '📋'; }, 900);
    });
  });
}

// ---------- Detail (詳細) ----------
function parseQuery(){
  const q = Object.fromEntries(new URL(location.href).searchParams.entries());
  return q;
}

function setupSwitch(){
  const sw = document.querySelector('#f-notify');
  if(!sw) return;
  sw.addEventListener('click', () => sw.classList.toggle('on'));
}

function loadDetail(){
  const q = parseQuery();
  const id = q.id;
  const fields = {
    name: document.querySelector('#f-name'),
    email: document.querySelector('#f-email'),
    company: document.querySelector('#f-company'),
    status: document.querySelector('#f-status'),
    plan: document.querySelector('#f-plan'),
    memo: document.querySelector('#f-memo'),
    notify: document.querySelector('#f-notify'),
    statId: document.querySelector('#stat-id'),
    statCreated: document.querySelector('#stat-created'),
    statLast: document.querySelector('#stat-lastlogin'),
    copyEmail: document.querySelector('#copy-email')
  };
  if(!fields.name) return; // not on detail page

  let customer = id ? byId(id) : null;

  if(customer){
    fields.name.value = customer.name||'';
    fields.email.value = customer.email||'';
    fields.company.value = customer.company||'';
    fields.status.value = customer.status||'active';
    fields.plan.value = customer.plan||'basic';
    fields.memo.value = customer.memo||'';
    if(customer.notify) fields.notify.classList.add('on');
    fields.statId.textContent = customer.id;
    fields.statCreated.textContent = customer.createdAt || '—';
    fields.statLast.textContent = customer.lastLogin || '—';
  }else{
    // new
    fields.name.value = '';
    fields.email.value = '';
    fields.company.value = '';
    fields.status.value = 'active';
    fields.plan.value = 'pro';
    fields.memo.value = '';
    fields.notify.classList.add('on');
    fields.statId.textContent = '—';
    fields.statCreated.textContent = '—';
    fields.statLast.textContent = '—';
  }

  // copy
  if(fields.copyEmail){
    fields.copyEmail.addEventListener('click', async ()=>{
      const ok = await copyToClipboard(fields.email.value);
      fields.copyEmail.textContent = ok ? '✓' : '×';
      setTimeout(()=>fields.copyEmail.textContent='📋', 900);
    });
  }

  // save
  const btnSave = document.querySelector('#btn-save');
  btnSave?.addEventListener('click', () => {
    const list = getCustomers();
    const payload = {
      id: customer?.id || 'c' + Date.now(),
      name: fields.name.value.trim(),
      email: fields.email.value.trim(),
      company: fields.company.value.trim(),
      status: fields.status.value,
      plan: fields.plan.value,
      memo: fields.memo.value,
      notify: fields.notify.classList.contains('on'),
      createdAt: customer?.createdAt || new Date().toISOString().slice(0,10),
      lastLogin: customer?.lastLogin || ''
    };
    const idx = list.findIndex(c => c.id === payload.id);
    if(idx >= 0) list[idx] = payload; else list.push(payload);
    saveCustomers(list);
    alert('保存しました');
    location.href = 'index.html';
  });

  // delete
  const btnDel = document.querySelector('#btn-delete');
  btnDel?.addEventListener('click', () => {
    if(!customer){ alert('まだ作成されていません'); return; }
    if(!confirm('削除しますか？')) return;
    const list = getCustomers().filter(c => c.id !== customer.id);
    saveCustomers(list);
    alert('削除しました');
    location.href = 'index.html';
  });

  setupSwitch();
}

document.addEventListener('DOMContentLoaded', () => {
  renderIndex();
  loadDetail();
});
