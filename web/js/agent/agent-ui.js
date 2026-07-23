/**
 * 兔兔小助手 - UI 控制器
 */

const chatAgent = new ChatAgent();
let agentOpen = false;

function toggleAgent() {
  agentOpen = !agentOpen;
  document.getElementById('agentPanel').classList.toggle('open', agentOpen);
  document.getElementById('agentOverlay').classList.toggle('open', agentOpen);
  document.getElementById('agentFab').classList.toggle('hidden', agentOpen);
  
  if (agentOpen) {
    if (chatAgent.messages.length === 0) {
      chatAgent.addWelcomeMessage();
    }
    setTimeout(() => {
      scrollAgentToBottom();
      document.getElementById('agentInput').focus();
    }, 100);
  }
}

function agentSendMessage() {
  const input = document.getElementById('agentInput');
  const text = input.value.trim();
  if (!text) return;
  
  input.value = '';
  document.getElementById('agentSendBtn').disabled = true;
  
  chatAgent.handleMessage(text).then(() => {
    document.getElementById('agentSendBtn').disabled = false;
    scrollAgentToBottom();
    renderAgentMessages();
  });
  
  // 立即显示用户消息
  renderAgentMessages();
  scrollAgentToBottom();
}

function agentSendSuggestion(text) {
  document.getElementById('agentInput').value = text;
  agentSendMessage();
}

function agentHandleKey(event) {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault();
    agentSendMessage();
  }
}

function renderAgentMessages() {
  const container = document.getElementById('agentMessages');
  let lastTime = '';
  
  container.innerHTML = chatAgent.messages.map(msg => {
    if (msg.role === 'typing') {
      return '<div class="agent-msg agent-msg-typing"><div class="typing-indicator"><span></span><span></span><span></span></div></div>';
    }
    
    const isUser = msg.role === 'user';
    const msgClass = isUser ? 'agent-msg-user' : 'agent-msg-bot';
    
    // 时间分隔
    let timeSep = '';
    if (msg.time && msg.time !== lastTime) {
      lastTime = msg.time;
      timeSep = `<div class="agent-time-sep">${msg.time}</div>`;
    }
    
    let content = '';
    if (!isUser && msg.type === 'confirm') {
      content = `<div class="agent-msg-text">${formatText(msg.text)}</div>
        <div class="agent-msg-actions">
          <button class="agent-action-btn primary" onclick="agentConfirmOrder()">✅ 确认下单</button>
          <button class="agent-action-btn" onclick="agentCancelOrder()">↩️ 再看看</button>
        </div>`;
    } else if (!isUser && msg.type === 'recommend' && msg.recommendations) {
      content = `<div class="agent-msg-text">${formatText(msg.text)}</div>
        <div class="agent-rec-cards">
          ${msg.recommendations.map(d => `
            <div class="agent-rec-card" onclick="agentAddRec(${d.id})">
              <div class="agent-rec-svg">${d.svg}</div>
              <div class="agent-rec-info">
                <div class="agent-rec-name">${d.name}</div>
                <div class="agent-rec-price">¥${d.price}</div>
              </div>
              <button class="agent-rec-plus"><i class="fas fa-plus"></i></button>
            </div>
          `).join('')}
        </div>`;
    } else if (!isUser && msg.type === 'menu') {
      content = `<div class="agent-msg-text">${formatText(msg.text)}</div>`;
    } else if (!isUser && msg.type === 'cart') {
      content = `<div class="agent-msg-text">${formatText(msg.text)}</div>
        <div class="agent-msg-actions">
          <button class="agent-action-btn primary" onclick="agentSendSuggestion('下单')">💰 去结算</button>
        </div>`;
    } else if (!isUser && msg.type === 'orders') {
      content = `<div class="agent-msg-text">${formatText(msg.text)}</div>
        <div class="agent-msg-actions">
          <button class="agent-action-btn" onclick="agentSendSuggestion('看看菜单')">🍽️ 继续点餐</button>
        </div>`;
    } else if (!isUser && msg.action === 'require_login') {
      content = `<div class="agent-msg-text">${formatText(msg.text)}</div>
        <div class="agent-msg-actions">
          <button class="agent-action-btn primary" onclick="toggleAgent();showAuthModal()">🔑 去登录</button>
        </div>`;
    } else {
      content = `<div class="agent-msg-text">${formatText(msg.text || '')}</div>`;
    }
    
    return `${timeSep}<div class="agent-msg ${msgClass}">${content}</div>`;
  }).join('');
  
  scrollAgentToBottom();
}

function formatText(text) {
  if (!text) return '';
  // 支持简易 Markdown（加粗、换行）
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br>');
}

function scrollAgentToBottom() {
  const container = document.getElementById('agentMessages');
  setTimeout(() => {
    container.scrollTop = container.scrollHeight;
  }, 50);
}

function agentAddRec(dishId) {
  if (typeof addToCart === 'function') addToCart(dishId, null);
  const dish = DISHES.find(d => d.id === dishId);
  if (dish) showToast(`已加入：${dish.name}`, 'success');
}

function agentConfirmOrder() {
  agentSendSuggestion('确认下单');
}

function agentCancelOrder() {
  agentSendSuggestion('再看看');
}

// 监听 cart 更新，刷新 agent 推荐面板
if (typeof updateCart === 'function') {
  const origUpdateCart = updateCart;
  updateCart = function() {
    origUpdateCart.apply(this, arguments);
    if (agentOpen) renderAgentMessages();
  };
}

// 挂载 renderAgentMessages 到 chatAgent
chatAgent.onUpdate(() => {
  if (agentOpen) renderAgentMessages();
});
