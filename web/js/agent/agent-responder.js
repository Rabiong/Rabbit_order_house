/**
 * 兔兔小助手 - 回复引擎
 * 根据解析后的意图生成自然语言回复
 */

class AgentResponder {
  constructor(agent) {
    this.agent = agent;
    this.seasonalGreetings = this.initSeasonal();
  }

  initSeasonal() {
    const month = new Date().getMonth();
    const season = month < 3 ? 'spring' : month < 6 ? 'summer' : month < 9 ? 'autumn' : 'winter';
    return {
      spring: { emoji: '🌸', msg: '春天来啦，来点清新美味吧～' },
      summer: { emoji: '☀️', msg: '天气好热，来杯冰饮消消暑吧～' },
      autumn: { emoji: '🍂', msg: '秋高气爽，最适合吃点暖心的～' },
      winter: { emoji: '❄️', msg: '天冷了，来份热乎的暖暖肚子吧～' }
    }[season] || { emoji: '🥕', msg: '今天想吃什么呢？' };
  }

  pickRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  generate(intent, context) {
    const { action, dish, quantity, raw } = intent;

    switch (action) {
      case 'greet': return this.greet(context);
      case 'help': return this.help(context);
      case 'list': return this.listMenu();
      case 'add': return this.handleAdd(intent, context);
      case 'remove': return this.handleRemove(intent, context);
      case 'checkout': return this.handleCheckout(context);
      case 'cart': return this.handleCart(context);
      case 'order': return this.handleOrder(context);
      case 'recommend': return this.handleRecommend(context);
      case 'clear': return this.handleClear(context);
      default: return this.handleUnknown(raw);
    }
  }

  greet(context) {
    const hour = new Date().getHours();
    const timeGreet = hour < 6 ? '这么晚还没睡呀' :
                      hour < 9 ? '早上好' :
                      hour < 12 ? '上午好' :
                      hour < 14 ? '中午好' :
                      hour < 18 ? '下午好' : '晚上好';
    const name = context.currentUser?.nickname || '小伙伴';
    const openers = [
      `${timeGreet}，${name}！${this.seasonalGreetings.emoji}`,
      `嗨嗨，${name}～ ${this.seasonalGreetings.msg}`,
      `${timeGreet}呀${name}！想我了吗～🥕`,
    ];
    return {
      text: `${this.pickRandom(openers)}\n\n我可以帮你：\n🥕 点餐 — "来一份胡萝卜松饼"\n📋 看菜单 — "有什么好吃的"\n🛒 查购物车 — "看看购物车"\n📦 查订单 — "我的订单"\n💡 推荐 — "推荐一下"\n\n想吃什么尽管跟我说～`,
      type: 'greeting'
    };
  }

  help(context) {
    return {
      text: '我能帮你做的事情可多啦：\n\n🍽️ **点餐**\n  "来一份胡萝卜松饼"\n  "要两杯草莓奶茶"\n  "再加一份兔兔便当"\n\n🗑️ **取消**\n  "不要松饼"\n  "取消蛋糕"\n\n📋 **菜单**\n  "有什么好吃的"\n  "看看菜单"\n\n🛒 **购物车**\n  "看看购物车"\n  "清空购物车"\n\n📦 **订单**\n  "我的订单"\n\n💡 **推荐**\n  "推荐一下"\n  "今天吃什么"\n\n💰 **结账**\n  "下单"\n  "结账"',
      type: 'help'
    };
  }

  listMenu() {
    const categories = {};
    DISHES.forEach(d => {
      if (!categories[d.category]) categories[d.category] = [];
      categories[d.category].push(d);
    });
    const catNames = { main: '🍚 主食', dessert: '🍰 甜品', drink: '🥤 饮品', salad: '🥗 沙拉', limited: '🎉 限定' };
    let text = '这是我们的菜单～ 🥕\n\n';
    Object.entries(categories).forEach(([cat, dishes]) => {
      text += `**${catNames[cat] || cat}**\n`;
      dishes.forEach(d => {
        text += `  • ${d.name} — ¥${d.price} ${d.tag ? '[' + d.tag + ']' : ''}\n`;
      });
      text += '\n';
    });
    text += '想吃哪个告诉我呀～';
    return { text, type: 'menu' };
  }

  handleAdd(intent, context) {
    const { dish, quantity, text } = intent;
    if (!dish) {
      // 上下文追加上一单
      if (context.lastOrderItem) {
        this.agent.executeAdd(context.lastOrderItem.id);
        return {
          text: `好的，再帮你要了一份${context.lastOrderItem.name}～ 已加到购物车啦 🛒`,
          type: 'success'
        };
      }
      return {
        text: `抱歉，我没听懂「${text}」是哪道菜🥲 能说完整名字吗？比如「胡萝卜松饼」～`,
        type: 'error'
      };
    }

    this.agent.executeAdd(dish.id, quantity);

    const qtyWord = quantity > 1 ? `${quantity}份` : '';
    const addMsgs = [
      qtyWord ? `好的，${qtyWord}${dish.name}已加入购物车啦 🛒 还需要别的吗？` : `好的，${dish.name}已加入购物车啦 🛒 还需要别的吗？`,
      qtyWord ? `${dish.name}×${quantity} 搞定！加进购物车了～ 还要再来点别的吗？🥕` : `${dish.name}已经放进购物车啦！还要再来点别的吗？🥕`,
      `好嘞！${qtyWord || '一份'}${dish.name}安排上了 ✅ 还想吃什么尽管说～`,
    ];
    return {
      text: this.pickRandom(addMsgs),
      type: 'success',
      action: 'added',
      dishId: dish.id,
      quantity
    };
  }

  handleRemove(intent, context) {
    const { dish, text } = intent;
    if (!dish) {
      return {
        text: `我没找到「${text}」这道菜在你的购物车里呢🤔 看看菜单再告诉我吧～`,
        type: 'error'
      };
    }

    const removed = this.agent.executeRemove(dish.id);
    if (removed) {
      return {
        text: `好的，已经把${dish.name}从购物车拿走啦 🗑️`,
        type: 'success',
        action: 'removed',
        dishId: dish.id
      };
    } else {
      return {
        text: `购物车里好像没有${dish.name}哦 🤔`,
        type: 'info'
      };
    }
  }

  handleCheckout(context) {
    if (!context.currentUser) {
      return { text: '请先登录才能下单哦～ 🐰', type: 'error', action: 'require_login' };
    }
    if (!context.cart || context.cart.length === 0) {
      return { text: '购物车还是空的呢，先加点好吃的吧～ 🥕', type: 'info' };
    }
    const total = context.cart.reduce((s, i) => s + i.price * i.qty, 0);
    const itemList = context.cart.map(i => `  • ${i.name} × ${i.qty} — ¥${i.price * i.qty}`).join('\n');
    return {
      text: `好的，来确认一下你的订单～\n\n${itemList}\n\n**合计：¥${total}（含配送费¥6）**\n\n确认下单吗？回复「确认」就好啦 ✅`,
      type: 'confirm',
      action: 'confirm_checkout'
    };
  }

  handleCart(context) {
    if (!context.cart || context.cart.length === 0) {
      return { text: '购物车还是空的呢 🥲 想吃点什么？我帮你加～', type: 'info' };
    }
    const total = context.cart.reduce((s, i) => s + i.price * i.qty, 0);
    const itemList = context.cart.map(i => `  • ${i.name} × ${i.qty} — ¥${i.price * i.qty}`).join('\n');
    return {
      text: `你的购物车里有这些～ 🛒\n\n${itemList}\n\n**小计：¥${total}**\n\n要下单还是再加点什么？`,
      type: 'cart'
    };
  }

  handleOrder(context) {
    const orders = context.orders || [];
    const userOrders = orders.filter(o => o.user === context.currentUser?.username);
    if (userOrders.length === 0) {
      return { text: '你还没有下过单呢，想试试吗？🥕', type: 'info' };
    }
    const statusNames = { pending: '⏳ 等待处理', preparing: '🍳 准备中', completed: '✅ 已完成', cancelled: '❌ 已取消' };
    const recent = userOrders.slice(-3).reverse();
    const orderText = recent.map(o => {
      const items = o.items.map(i => `${i.name}×${i.qty}`).join('、');
      return `  #${o.id} ${statusNames[o.status] || o.status}\n  ${items} — ¥${o.total}`;
    }).join('\n\n');
    return {
      text: `你最近的订单：\n\n${orderText}\n\n需要什么帮助吗？`,
      type: 'orders'
    };
  }

  handleRecommend(context) {
    const hour = new Date().getHours();
    let timeRec = [];
    if (hour >= 6 && hour <= 10) timeRec = DISHES.filter(d => [1, 4, 7].includes(d.id));
    else if (hour >= 11 && hour <= 14) timeRec = DISHES.filter(d => [3, 8, 9].includes(d.id));
    else if (hour >= 17 && hour <= 21) timeRec = DISHES.filter(d => [1, 3, 9, 12].includes(d.id));
    else timeRec = DISHES.filter(d => [6, 10, 11].includes(d.id));

    // 推荐不在购物车里的
    const cartIds = (context.cart || []).map(i => i.id);
    const recs = timeRec.filter(d => !cartIds.includes(d.id)).slice(0, 3);

    const timeWord = hour < 11 ? '早餐' : hour < 14 ? '午餐' : hour < 17 ? '下午茶' : '晚餐';
    const recText = recs.map(d => `  • ${d.name} — ¥${d.price} ${d.desc}`).join('\n');

    return {
      text: `🍽️ ${timeWord}时间到！推荐你试试这些～\n\n${recText}\n\n想来一份吗？`,
      type: 'recommend',
      recommendations: recs
    };
  }

  handleClear(context) {
    if (!context.cart || context.cart.length === 0) {
      return { text: '购物车本来就是空的呢～ 🐰', type: 'info' };
    }
    this.agent.executeClear();
    return { text: '购物车已经清空啦 🧹 需要重新挑些什么吗？', type: 'success' };
  }

  handleUnknown(text) {
    // 尝试解析是否是菜品名
    const parsed = this.agent.parser.parse(text);
    if (parsed.dish) {
      return this.handleAdd(parsed, {});
    }
    return {
      text: `唔…我不太明白「${text}」是什么意思呢 🤔\n\n试试这样说：\n  • "来一份胡萝卜松饼"\n  • "有什么好吃的"\n  • "帮我下单"\n  • "推荐一下"`,
      type: 'error'
    };
  }
}
