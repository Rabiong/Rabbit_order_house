/* Bunny Bites · 兔兔小厨房 — 前端交互逻辑 */

// ======= 菜品数据 =======
const DISHES = [
  {
    id: 1, name: '胡萝卜松饼', desc: '新鲜胡萝卜烘焙，松软香甜', price: 18, category: 'dessert', tag: '招牌', tagType: 'hot',
    svg: `<svg viewBox="0 0 200 150"><defs><linearGradient id="bg1" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffe4ec"/><stop offset="1" stop-color="#ffc0d4"/></linearGradient></defs><rect width="200" height="150" fill="url(#bg1)"/><ellipse cx="100" cy="120" rx="60" ry="8" fill="rgba(0,0,0,0.1)"/><path d="M 60 100 Q 60 60 100 60 Q 140 60 140 100 L 140 110 Q 100 120 60 110 Z" fill="#d4915c"/><rect x="55" y="95" width="90" height="12" rx="3" fill="#a87444"/><circle cx="80" cy="80" r="4" fill="#ff7ba9"/><circle cx="110" cy="75" r="3" fill="#7fdcb8"/><circle cx="125" cy="85" r="3" fill="#ff9a56"/><path d="M 95 55 L 90 40 M 100 55 L 100 38 M 105 55 L 110 40" stroke="#7fdcb8" stroke-width="2" stroke-linecap="round"/></svg>`
  },
  {
    id: 2, name: '草莓奶昔', desc: '新鲜草莓与牛奶的完美融合', price: 22, category: 'drink', tag: '热卖', tagType: 'hot',
    svg: `<svg viewBox="0 0 200 150"><defs><linearGradient id="bg2" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffc0d4"/><stop offset="1" stop-color="#ff9ec5"/></linearGradient></defs><rect width="200" height="150" fill="url(#bg2)"/><ellipse cx="100" cy="135" rx="40" ry="6" fill="rgba(0,0,0,0.1)"/><path d="M 70 60 L 75 130 Q 100 138 125 130 L 130 60 Z" fill="#fff" stroke="#5a3a44" stroke-width="2"/><path d="M 72 75 L 128 75 Q 125 110 100 115 Q 75 110 72 75" fill="#ff7ba9"/><circle cx="85" cy="90" r="3" fill="#ff3866"/><circle cx="110" cy="95" r="3" fill="#ff3866"/><circle cx="100" cy="105" r="2.5" fill="#ff3866"/><path d="M 90 60 Q 95 40 105 50" stroke="#ff7ba9" stroke-width="3" fill="none" stroke-linecap="round"/><circle cx="90" cy="50" r="8" fill="#ff3866"/><circle cx="93" cy="47" r="2" fill="#fff" opacity="0.6"/><path d="M 88 45 L 86 38 M 92 44 L 92 36" stroke="#7fdcb8" stroke-width="1.5" stroke-linecap="round"/><path d="M 135 30 L 100 90" stroke="#fff" stroke-width="4" stroke-linecap="round"/></svg>`
  },
  {
    id: 3, name: '兔兔便当', desc: '小兔子饭团配时令蔬菜', price: 38, category: 'main', tag: '推荐', tagType: '',
    svg: `<svg viewBox="0 0 200 150"><defs><linearGradient id="bg3" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff4e6"/><stop offset="1" stop-color="#ffc89a"/></linearGradient></defs><rect width="200" height="150" fill="url(#bg3)"/><ellipse cx="100" cy="130" rx="70" ry="6" fill="rgba(0,0,0,0.1)"/><rect x="35" y="60" width="130" height="65" rx="8" fill="#8a6770"/><rect x="40" y="65" width="120" height="55" rx="5" fill="#fff8f0"/><rect x="45" y="70" width="55" height="45" rx="3" fill="#ffe4ec"/><rect x="105" y="70" width="50" height="45" rx="3" fill="#fff4e6"/><circle cx="72" cy="92" r="14" fill="#fff"/><ellipse cx="65" cy="80" rx="3" ry="8" fill="#fff"/><ellipse cx="79" cy="80" rx="3" ry="8" fill="#fff"/><ellipse cx="65" cy="80" rx="1.5" ry="5" fill="#ffb3c8"/><ellipse cx="79" cy="80" rx="1.5" ry="5" fill="#ffb3c8"/><circle cx="68" cy="92" r="1.5" fill="#5a3a44"/><circle cx="76" cy="92" r="1.5" fill="#5a3a44"/><ellipse cx="65" cy="97" rx="2" ry="1.5" fill="#ff9ec5" opacity="0.7"/><ellipse cx="79" cy="97" rx="2" ry="1.5" fill="#ff9ec5" opacity="0.7"/><circle cx="130" cy="85" r="5" fill="#ff9a56"/><circle cx="140" cy="95" r="4" fill="#7fdcb8"/><circle cx="125" cy="100" r="3" fill="#ff7ba9"/><circle cx="135" cy="105" r="3" fill="#ff9a56"/></svg>`
  },
  {
    id: 4, name: '棉花糖可可', desc: '温暖可可配上软绵棉花糖', price: 26, category: 'drink', tag: '新品', tagType: 'new',
    svg: `<svg viewBox="0 0 200 150"><defs><linearGradient id="bg4" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#e6f9f1"/><stop offset="1" stop-color="#b5e8d4"/></linearGradient></defs><rect width="200" height="150" fill="url(#bg4)"/><ellipse cx="100" cy="135" rx="45" ry="6" fill="rgba(0,0,0,0.1)"/><path d="M 65 70 L 70 130 Q 100 138 130 130 L 135 70 Z" fill="#fff" stroke="#5a3a44" stroke-width="2"/><path d="M 67 85 L 133 85 Q 130 120 100 125 Q 70 120 67 85" fill="#7a4a2a"/><circle cx="85" cy="95" r="6" fill="#fff"/><circle cx="105" cy="100" r="7" fill="#fff"/><circle cx="95" cy="108" r="5" fill="#fff"/><circle cx="115" cy="92" r="5" fill="#fff"/><circle cx="88" cy="93" r="1.5" fill="#5a3a44"/><circle cx="107" cy="98" r="1.5" fill="#5a3a44"/><path d="M 90 95 Q 92 96 90 97" stroke="#5a3a44" stroke-width="0.8" fill="none"/><path d="M 110 100 Q 112 101 110 102" stroke="#5a3a44" stroke-width="0.8" fill="none"/><path d="M 130 50 L 105 80" stroke="#fff" stroke-width="4" stroke-linecap="round"/><ellipse cx="100" cy="55" rx="8" ry="6" fill="rgba(255,255,255,0.7)"><animate attributeName="cy" values="55;35;55" dur="2.5s" repeatCount="indefinite"/><animate attributeName="opacity" values="0;0.8;0" dur="2.5s" repeatCount="indefinite"/></ellipse></svg>`
  },
  {
    id: 5, name: '蜂蜜松饼', desc: '层层叠叠淋上金黄蜂蜜', price: 28, category: 'dessert', tag: '热卖', tagType: 'hot',
    svg: `<svg viewBox="0 0 200 150"><defs><linearGradient id="bg5" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff4e6"/><stop offset="1" stop-color="#ffc89a"/></linearGradient></defs><rect width="200" height="150" fill="url(#bg5)"/><ellipse cx="100" cy="130" rx="65" ry="6" fill="rgba(0,0,0,0.1)"/><ellipse cx="100" cy="125" rx="60" ry="8" fill="#a87444"/><ellipse cx="100" cy="115" rx="55" ry="10" fill="#d4915c"/><ellipse cx="100" cy="100" rx="50" ry="10" fill="#e8a878"/><ellipse cx="100" cy="85" rx="45" ry="10" fill="#d4915c"/><ellipse cx="100" cy="70" rx="40" ry="8" fill="#e8a878"/><circle cx="85" cy="70" r="4" fill="#ff7ba9"/><circle cx="105" cy="68" r="3" fill="#7fdcb8"/><circle cx="115" cy="72" r="3" fill="#ff9a56"/><path d="M 80 60 Q 85 40 100 50 Q 115 40 120 60" fill="#ffc000" stroke="#e8a500" stroke-width="1.5"/><circle cx="90" cy="55" r="2" fill="#fff" opacity="0.6"/></svg>`
  },
  {
    id: 6, name: '抹茶冰淇淋', desc: '清新抹茶配香脆蛋筒', price: 24, category: 'dessert', tag: '推荐', tagType: '',
    svg: `<svg viewBox="0 0 200 150"><defs><linearGradient id="bg6" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#e6f9f1"/><stop offset="1" stop-color="#7fdcb8"/></linearGradient></defs><rect width="200" height="150" fill="url(#bg6)"/><ellipse cx="100" cy="135" rx="35" ry="5" fill="rgba(0,0,0,0.1)"/><path d="M 75 70 L 100 130 L 125 70 Z" fill="#d4915c"/><path d="M 80 75 L 100 120 L 120 75" fill="none" stroke="#a87444" stroke-width="1.5"/><path d="M 85 80 L 100 110 L 115 80" fill="none" stroke="#a87444" stroke-width="1"/><circle cx="100" cy="55" r="28" fill="#7fdcb8"/><circle cx="85" cy="60" r="22" fill="#5fb89a"/><circle cx="115" cy="60" r="22" fill="#5fb89a"/><circle cx="100" cy="40" r="20" fill="#a8e8c8"/><circle cx="92" cy="50" r="4" fill="#ff7ba9"/><circle cx="108" cy="45" r="3" fill="#ff9a56"/><circle cx="95" cy="35" r="2" fill="#fff" opacity="0.7"/><circle cx="105" cy="38" r="2" fill="#fff" opacity="0.7"/></svg>`
  },
  {
    id: 7, name: '蓝莓优格', desc: '新鲜蓝莓配香浓优格', price: 20, category: 'salad', tag: '健康', tagType: 'new',
    svg: `<svg viewBox="0 0 200 150"><defs><linearGradient id="bg7" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#e6e6ff"/><stop offset="1" stop-color="#b8c4ff"/></linearGradient></defs><rect width="200" height="150" fill="url(#bg7)"/><ellipse cx="100" cy="135" rx="45" ry="5" fill="rgba(0,0,0,0.1)"/><path d="M 65 70 L 70 130 Q 100 138 130 130 L 135 70 Z" fill="#fff" stroke="#5a3a44" stroke-width="2"/><path d="M 67 85 L 133 85 Q 130 120 100 125 Q 70 120 67 85" fill="#fff8f0"/><circle cx="80" cy="100" r="6" fill="#7c5ac4"/><circle cx="100" cy="95" r="7" fill="#7c5ac4"/><circle cx="120" cy="100" r="6" fill="#7c5ac4"/><circle cx="90" cy="110" r="5" fill="#7c5ac4"/><circle cx="115" cy="110" r="5" fill="#7c5ac4"/><circle cx="100" cy="105" r="4" fill="#7c5ac4"/><circle cx="82" cy="98" r="1.5" fill="#a888d4"/><circle cx="102" cy="93" r="1.5" fill="#a888d4"/><circle cx="118" cy="98" r="1.5" fill="#a888d4"/><path d="M 80 90 L 82 85 M 100 85 L 102 80 M 120 90 L 118 85" stroke="#7fdcb8" stroke-width="1.5" stroke-linecap="round"/></svg>`
  },
  {
    id: 8, name: '玉米浓汤', desc: '香浓玉米熬制，温暖人心', price: 16, category: 'main', tag: '限定', tagType: 'limited',
    svg: `<svg viewBox="0 0 200 150"><defs><linearGradient id="bg8" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff4e6"/><stop offset="1" stop-color="#ffc89a"/></linearGradient></defs><rect width="200" height="150" fill="url(#bg8)"/><ellipse cx="100" cy="135" rx="55" ry="5" fill="rgba(0,0,0,0.1)"/><ellipse cx="100" cy="130" rx="50" ry="8" fill="#fff" stroke="#5a3a44" stroke-width="2"/><ellipse cx="100" cy="125" rx="48" ry="7" fill="#fff8f0"/><path d="M 55 90 Q 55 70 100 70 Q 145 70 145 90 L 145 115 Q 100 125 55 115 Z" fill="#fff" stroke="#5a3a44" stroke-width="2"/><ellipse cx="100" cy="92" rx="42" ry="18" fill="#ffc000"/><circle cx="80" cy="88" r="4" fill="#ff9a56"/><circle cx="115" cy="85" r="5" fill="#ff9a56"/><circle cx="95" cy="95" r="3" fill="#ff9a56"/><circle cx="120" cy="95" r="4" fill="#ff9a56"/><circle cx="75" cy="95" r="3" fill="#ff9a56"/><path d="M 130 50 L 110 75" stroke="#fff" stroke-width="3" stroke-linecap="round"/><ellipse cx="100" cy="55" rx="6" ry="5" fill="rgba(255,255,255,0.7)"><animate attributeName="cy" values="55;35;55" dur="2s" repeatCount="indefinite"/><animate attributeName="opacity" values="0;0.8;0" dur="2s" repeatCount="indefinite"/></ellipse></svg>`
  }
];

// ======= 状态管理 =======
let cart = [];
let currentCategory = 'all';
let orders = [];
let orderIdCounter = 1;
const DELIVERY_FEE = 6;

// ======= API 通信层 =======
const API = {
  baseURL: '/api',
  async fetchDishes() {
    try {
      const res = await fetch(`${this.baseURL}/dishes`);
      if (res.ok) return await res.json();
    } catch (e) { /* fallback to local data */ }
    return null;
  },
  async submitOrder(orderData) {
    try {
      const res = await fetch(`${this.baseURL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });
      if (res.ok) return await res.json();
    } catch (e) { /* fallback to local order */ }
    return null;
  },
  async fetchOrders() {
    try {
      const res = await fetch(`${this.baseURL}/orders`);
      if (res.ok) return await res.json();
    } catch (e) { /* fallback */ }
    return null;
  }
};

// ======= 菜品渲染 =======
function renderDishes() {
  const grid = document.getElementById('dishGrid');
  const filtered = currentCategory === 'all' ? DISHES : DISHES.filter(d => d.category === currentCategory);
  
  grid.innerHTML = filtered.map(dish => `
    <div class="dish-card reveal visible">
      <div class="dish-image">
        ${dish.svg}
        ${dish.tag ? `<div class="dish-tag ${dish.tagType}">${dish.tag}</div>` : ''}
        <button class="add-btn" onclick="addToCart(${dish.id}, event)" aria-label="加入购物车">
          <i class="fas fa-plus"></i>
        </button>
      </div>
      <div class="p-5">
        <h3 class="font-bold text-lg mb-1" style="color: var(--text);">${dish.name}</h3>
        <p class="text-sm mb-3" style="color: var(--text-soft);">${dish.desc}</p>
        <div class="flex items-center justify-between">
          <span class="price text-xl">¥${dish.price}</span>
          <div class="flex items-center gap-1 text-xs" style="color: var(--accent);">
            <i class="fas fa-star"></i>
            <span class="font-semibold">4.${Math.floor(Math.random() * 4) + 5}</span>
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

// ======= 分类切换 =======
function initCategories() {
  document.querySelectorAll('.category-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('.category-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      currentCategory = pill.dataset.category;
      renderDishes();
    });
  });
}

// ======= 购物车操作 =======
function addToCart(id, event) {
  const dish = DISHES.find(d => d.id === id);
  if (!dish) return;
  
  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...dish, qty: 1 });
  }
  
  updateCart();
  showToast(`${dish.name} 加入购物篮`, 'success');
  
  // 飞出动画
  if (event) {
    const btn = event.currentTarget;
    const rect = btn.getBoundingClientRect();
    const cartBtn = document.querySelector('.cart-btn');
    const cartRect = cartBtn.getBoundingClientRect();
    
    const fly = document.createElement('div');
    fly.className = 'fly-dot';
    fly.style.left = rect.left + rect.width / 2 - 12 + 'px';
    fly.style.top = rect.top + rect.height / 2 - 12 + 'px';
    document.body.appendChild(fly);
    
    requestAnimationFrame(() => {
      fly.style.left = cartRect.left + cartRect.width / 2 - 12 + 'px';
      fly.style.top = cartRect.top + cartRect.height / 2 - 12 + 'px';
      fly.style.transform = 'scale(0.3)';
      fly.style.opacity = '0.5';
    });
    
    setTimeout(() => fly.remove(), 800);
  }
  
  // 徽章弹跳
  const badge = document.getElementById('cartBadge');
  badge.classList.remove('bounce');
  void badge.offsetWidth;
  badge.classList.add('bounce');
}

function updateCart() {
  const cartItems = document.getElementById('cartItems');
  const badge = document.getElementById('cartBadge');
  const subtotal = document.getElementById('subtotal');
  const total = document.getElementById('total');
  
  const totalQty = cart.reduce((s, i) => s + i.qty, 0);
  badge.textContent = totalQty;
  badge.style.display = totalQty > 0 ? 'flex' : 'flex';
  
  if (cart.length === 0) {
    cartItems.innerHTML = `
      <div class="empty-cart">
        <svg width="120" height="120" viewBox="0 0 120 120" class="mx-auto mb-4">
          <ellipse cx="40" cy="30" rx="8" ry="22" fill="#fff" stroke="#ffd1dc" stroke-width="2"/>
          <ellipse cx="80" cy="30" rx="8" ry="22" fill="#fff" stroke="#ffd1dc" stroke-width="2"/>
          <ellipse cx="40" cy="32" rx="4" ry="15" fill="#ffb3c8"/>
          <ellipse cx="80" cy="32" rx="4" ry="15" fill="#ffb3c8"/>
          <circle cx="60" cy="65" r="30" fill="#fff" stroke="#ffd1dc" stroke-width="2"/>
          <ellipse cx="48" cy="70" rx="6" ry="4" fill="#ffb3c8" opacity="0.6"/>
          <ellipse cx="72" cy="70" rx="6" ry="4" fill="#ffb3c8" opacity="0.6"/>
          <path d="M 52 60 Q 54 56 56 60" stroke="#5a3a44" stroke-width="2" fill="none" stroke-linecap="round"/>
          <path d="M 64 60 Q 66 56 68 60" stroke="#5a3a44" stroke-width="2" fill="none" stroke-linecap="round"/>
          <path d="M 56 75 Q 60 78 64 75" stroke="#5a3a44" stroke-width="2" fill="none" stroke-linecap="round"/>
        </svg>
        <p class="font-medium">购物篮还是空的</p>
        <p class="text-sm mt-1">快去挑些好吃的吧～</p>
      </div>
    `;
  } else {
    cartItems.innerHTML = cart.map(item => `
      <div class="cart-item">
        <div class="cart-item-img">${item.svg}</div>
        <div class="flex-1 min-w-0">
          <h4 class="font-bold text-sm truncate">${item.name}</h4>
          <p class="price text-sm">¥${item.price}</p>
          <div class="flex items-center gap-2 mt-1">
            <button class="qty-btn" onclick="changeQty(${item.id}, -1)">−</button>
            <span class="font-semibold text-sm w-6 text-center">${item.qty}</span>
            <button class="qty-btn" onclick="changeQty(${item.id}, 1)">+</button>
          </div>
        </div>
        <button onclick="removeFromCart(${item.id})" class="text-sm w-7 h-7 rounded-full flex items-center justify-center transition" style="color: var(--text-light);" onmouseover="this.style.background='#ffe4ec';this.style.color='var(--primary)'" onmouseout="this.style.background='transparent';this.style.color='var(--text-light)'">
          <i class="fas fa-trash-alt text-xs"></i>
        </button>
      </div>
    `).join('');
  }
  
  const subtotalVal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  subtotal.textContent = `¥${subtotalVal}`;
  total.textContent = `¥${subtotalVal + DELIVERY_FEE}`;
}

function changeQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    cart = cart.filter(i => i.id !== id);
  }
  updateCart();
}

function removeFromCart(id) {
  const dish = DISHES.find(d => d.id === id);
  cart = cart.filter(i => i.id !== id);
  updateCart();
  if (dish) showToast(`${dish.name} 已移出购物篮`, 'info');
}

// ======= 购物车面板 =======
function toggleCart() {
  document.getElementById('cartPanel').classList.toggle('open');
  document.getElementById('cartOverlay').classList.toggle('open');
}

// ======= 订单面板 =======
function toggleOrders() {
  document.getElementById('orderPanel').classList.toggle('open');
  document.getElementById('orderOverlay').classList.toggle('open');
  renderOrders();
}

function renderOrders() {
  const container = document.getElementById('orderList');
  if (orders.length === 0) {
    container.innerHTML = `
      <div class="empty-cart">
        <svg width="100" height="100" viewBox="0 0 100 100" class="mx-auto mb-4">
          <circle cx="50" cy="45" r="25" fill="#fff" stroke="#ffd1dc" stroke-width="2"/>
          <path d="M 35 65 L 65 65" stroke="#ffd1dc" stroke-width="2" stroke-linecap="round"/>
          <path d="M 40 70 L 60 70" stroke="#ffd1dc" stroke-width="2" stroke-linecap="round"/>
          <ellipse cx="40" cy="20" rx="4" ry="12" fill="#fff" stroke="#ffd1dc" stroke-width="1.5"/>
          <ellipse cx="60" cy="20" rx="4" ry="12" fill="#fff" stroke="#ffd1dc" stroke-width="1.5"/>
        </svg>
        <p class="font-medium">还没有订单记录</p>
        <p class="text-sm mt-1">快去下单吧～</p>
      </div>
    `;
    return;
  }
  
  container.innerHTML = orders.map(order => {
    const statusClass = order.status;
    const statusMap = { pending: '等待处理', preparing: '准备中', completed: '已完成', cancelled: '已取消' };
    const itemSummary = order.items.map(i => `${i.name}×${i.qty}`).join('、');
    return `
      <div class="order-card ${statusClass}">
        <div class="flex items-center justify-between mb-2">
          <span class="font-bold">订单 #${order.id}</span>
          <span class="order-status ${statusClass}">${statusMap[statusClass]}</span>
        </div>
        <p class="text-sm" style="color: var(--text-soft);">${itemSummary}</p>
        <div class="flex items-center justify-between mt-2">
          <span class="price font-bold">¥${order.total}</span>
          <span class="text-xs" style="color: var(--text-light);">${order.createdAt}</span>
        </div>
      </div>
    `;
  }).join('');
}

// ======= 结算 =======
function checkout() {
  if (cart.length === 0) {
    showToast('购物篮空空的，先挑些好吃的吧～', 'info');
    return;
  }
  
  const totalQty = cart.reduce((s, i) => s + i.qty, 0);
  const totalPrice = cart.reduce((s, i) => s + i.price * i.qty, 0) + DELIVERY_FEE;
  const subtotalVal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  
  // 创建订单
  const order = {
    id: orderIdCounter++,
    items: [...cart],
    subtotal: subtotalVal,
    delivery: DELIVERY_FEE,
    total: totalPrice,
    status: 'pending',
    createdAt: new Date().toLocaleString('zh-CN')
  };
  orders.unshift(order);
  
  // 尝试提交到 Moonbit 后端
  API.submitOrder({
    items: cart.map(i => ({ dish_id: i.id, name: i.name, price: i.price, qty: i.qty })),
    subtotal: subtotalVal,
    delivery: DELIVERY_FEE,
    total: totalPrice
  });
  
  showToast(`下单成功！${totalQty} 件商品共 ¥${totalPrice}，兔兔开始做啦～`, 'success');
  
  // 撒花
  confetti();
  
  cart = [];
  updateCart();
  setTimeout(() => {
    toggleCart();
    toggleOrders();
  }, 1500);
}

// ======= 撒花动画 =======
function confetti() {
  const colors = ['#ff7ba9', '#ff9a56', '#7fdcb8', '#ffb3c8', '#ffc000'];
  for (let i = 0; i < 50; i++) {
    const c = document.createElement('div');
    c.className = 'confetti';
    c.style.left = Math.random() * 100 + 'vw';
    c.style.background = colors[Math.floor(Math.random() * colors.length)];
    c.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
    c.style.animationDelay = Math.random() * 0.5 + 's';
    c.style.animationDuration = (2 + Math.random() * 2) + 's';
    document.body.appendChild(c);
    setTimeout(() => c.remove(), 4000);
  }
}

// ======= Toast =======
function showToast(message, type = 'success') {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = 'toast';
  
  const iconMap = {
    success: { icon: 'fa-check-circle', color: 'var(--mint)' },
    info: { icon: 'fa-info-circle', color: 'var(--accent)' },
    error: { icon: 'fa-times-circle', color: 'var(--primary)' }
  };
  const { icon, color } = iconMap[type] || iconMap.success;
  toast.style.borderLeftColor = color;
  
  toast.innerHTML = `
    <i class="fas ${icon}" style="color: ${color}; font-size: 1.2rem;"></i>
    <span class="font-medium">${message}</span>
  `;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

// ======= 导航滚动 =======
function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
  event.target.classList.add('active');
}

// ======= 兔兔挥手 =======
function bunnyWave() {
  showToast('兔兔向你挥手！耳朵都摇起来啦～', 'success');
  const mascot = document.querySelector('.bunny-mascot');
  if (mascot) {
    mascot.style.animation = 'none';
    void mascot.offsetWidth;
    mascot.style.animation = 'gentleShake 0.6s ease';
    setTimeout(() => mascot.style.animation = '', 600);
  }
}

// ======= 飘落小元素 =======
function createFallingItems() {
  const container = document.getElementById('fallingItems');
  if (!container) return;
  const items = [
    { svg: '<svg width="20" height="20" viewBox="0 0 20 20"><path d="M 10 4 C 8 2, 4 2, 4 6 C 4 10, 10 14, 10 14 C 10 14, 16 10, 16 6 C 16 2, 12 2, 10 4 Z" fill="#ff7ba9"/></svg>', count: 8 },
    { svg: '<svg width="20" height="20" viewBox="0 0 20 20"><path d="M 10 2 L 12 8 L 18 8 L 13 12 L 15 18 L 10 14 L 5 18 L 7 12 L 2 8 L 8 8 Z" fill="#ff9a56"/></svg>', count: 5 },
    { svg: '<svg width="16" height="20" viewBox="0 0 16 20"><path d="M 8 4 L 8 16 M 6 4 L 6 8 M 10 4 L 10 8 M 4 6 L 4 10 M 12 6 L 12 10" stroke="#7fdcb8" stroke-width="2" stroke-linecap="round"/></svg>', count: 6 }
  ];
  
  items.forEach(item => {
    for (let i = 0; i < item.count; i++) {
      const el = document.createElement('div');
      el.className = 'falling-item';
      el.innerHTML = item.svg;
      el.style.left = Math.random() * 100 + 'vw';
      el.style.animationDuration = (8 + Math.random() * 12) + 's';
      el.style.animationDelay = Math.random() * 10 + 's';
      el.style.opacity = 0.6;
      container.appendChild(el);
    }
  });
}

// ======= 滚动揭示 =======
function setupReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });
  
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ======= 导航高亮 =======
function initScrollSpy() {
  const sections = ['home', 'menu', 'features', 'kitchen'];
  const sectionNames = { home: '首页', menu: '菜单', features: '特色', kitchen: '小厨房' };
  
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY + 100;
    let current = 'home';
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el && el.offsetTop <= scrollY) current = id;
    });
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.toggle('active', link.textContent.trim() === sectionNames[current]);
    });
  });
}

// ======= 初始化 =======
document.addEventListener('DOMContentLoaded', () => {
  renderDishes();
  updateCart();
  createFallingItems();
  setupReveal();
  initCategories();
  initScrollSpy();
  
  // 绑定兔子点击事件
  const bunny = document.querySelector('.bunny-mascot');
  if (bunny) bunny.addEventListener('click', bunnyWave);
  
  // 尝试从 Moonbit 后端加载数据
  API.fetchDishes().then(data => {
    if (data && data.length > 0) {
      console.log('✓ 从 Moonbit 后端加载菜品数据:', data.length, '项');
    }
  });
});
