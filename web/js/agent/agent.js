/**
 * 兔兔小助手 - 主 Agent 模块
 * 调度解析器 + 回复引擎，与购物车和订单系统交互
 */

class ChatAgent {
  constructor() {
    this.parser = new AgentParser();
    this.responder = new AgentResponder(this);
    this.messages = [];
    this.lastIntent = null;
    this.lastOrderItem = null;
    this.listeners = [];
    this.typingTimer = null;
  }

  onUpdate(callback) {
    this.listeners.push(callback);
  }

  notify() {
    this.listeners.forEach(fn => fn());
  }

  // 处理用户消息
  async handleMessage(text) {
    if (!text.trim()) return;

    // 添加用户消息
    this.addMessage({ role: 'user', text: text.trim() });

    // 显示打字指示
    this.setTyping(true);

    // 解析意图
    const intent = this.parser.parse(text);
    this.lastIntent = intent;

    // 模拟 LLM 思考延迟
    const delay = 400 + Math.random() * 600;
    await this.sleep(delay);

    // 生成回复
    const context = this.getContext();
    const response = this.responder.generate(intent, context);
    
    // 特殊处理确认下单
    if (intent.action === 'unknown' && this.isConfirm(text)) {
      response.text = this.processConfirm(context);
      response.type = 'success';
    }

    // 更新上下文记忆
    if (intent.dish) this.lastOrderItem = intent.dish;

    // 添加回复
    this.setTyping(false);
    this.addMessage({ role: 'assistant', ...response });

    return response;
  }

  addMessage(msg) {
    this.messages.push({
      ...msg,
      id: Date.now() + Math.random(),
      time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
    });
    this.notify();
  }

  setTyping(typing) {
    if (typing) {
      this.addMessage({ role: 'typing', id: 'typing' });
    } else {
      this.messages = this.messages.filter(m => m.id !== 'typing');
      this.notify();
    }
  }

  getContext() {
    return {
      currentUser: typeof currentUser !== 'undefined' ? currentUser : null,
      cart: typeof cart !== 'undefined' ? cart : [],
      orders: typeof orders !== 'undefined' ? orders : [],
      lastOrderItem: this.lastOrderItem
    };
  }

  // ===== 与购物车系统的集成 =====

  executeAdd(dishId) {
    if (typeof addToCart === 'function') {
      addToCart(dishId, null);
    }
  }

  executeRemove(dishId) {
    if (typeof removeFromCart === 'function') {
      const item = cart.find(i => i.id === dishId);
      if (item) {
        removeFromCart(dishId);
        return true;
      }
      return false;
    }
    return false;
  }

  executeClear() {
    cart.forEach(item => {
      for (let i = 0; i < item.qty; i++) {
        if (typeof removeFromCart === 'function') removeFromCart(item.id);
      }
    });
  }

  executeCheckout() {
    if (typeof checkout === 'function') {
      checkout();
      return true;
    }
    return false;
  }

  isConfirm(text) {
    return /^(确认|确定|是的|对|嗯|好|可以|下单吧|是的|ok|好的|行|要的)/.test(text.trim());
  }

  processConfirm(context) {
    if (!context.cart || context.cart.length === 0) {
      return '购物车是空的呢～ 先加点好吃的吧 🥕';
    }
    this.executeCheckout();
    return '好的，已经帮你下单啦！🎉 兔兔马上开始做，请稍等哦～ 可以随时跟我说「我的订单」查看状态 💪';
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // 添加快捷引导消息
  addWelcomeMessage() {
    if (this.messages.length === 0) {
      const context = this.getContext();
      const hour = new Date().getHours();
      const timeWord = hour < 9 ? '早上好' : hour < 14 ? '中午好' : hour < 18 ? '下午好' : '晚上好';
      this.addMessage({
        role: 'assistant',
        text: `${timeWord}！我是兔兔小助手 🐰\n\n想吃什么尽管告诉我～\n比如「来一份胡萝卜松饼」或者「有什么好吃的」`,
        type: 'greeting'
      });
    }
  }

  get lastMessage() {
    return this.messages[this.messages.length - 1];
  }
}
