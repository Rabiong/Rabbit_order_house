/**
 * 兔兔小助手 - 意图解析器
 * 将自然语言解析为结构化操作指令
 */

class AgentParser {
  constructor() {
    this.dishAliases = this.buildDishAliases();
    this.actionPatterns = this.buildActionPatterns();
    this.numberMap = {
      '一': 1, '二': 2, '两': 2, '三': 3, '四': 4, '五': 5,
      '六': 6, '七': 7, '八': 8, '九': 9, '十': 10,
      '1': 1, '2': 2, '3': 3, '4': 4, '5': 5,
      '6': 6, '7': 7, '8': 8, '9': 9, '10': 10
    };
  }

  buildDishAliases() {
    const map = {};
    DISHES.forEach(d => {
      // 全称
      map[d.name] = d.id;
      // 简称：取前2-3个字
      if (d.name.length >= 3) {
        map[d.name.slice(0, 2)] = d.id;
        map[d.name.slice(0, 3)] = d.id;
      }
      // 英文名小写
      if (d.nameEn) map[d.nameEn.toLowerCase()] = d.id;
    });
    // 额外别名
    map['胡萝卜'] = DISHES.find(d => d.name.includes('胡萝卜'))?.id || 1;
    map['松饼'] = 1;
    map['蛋糕'] = 2;
    map['便当'] = 3;
    map['奶茶'] = 4;
    map['咖啡'] = 5;
    map['沙拉'] = 6;
    map['冰沙'] = 7;
    map['卷'] = 8;
    map['咖喱'] = 9;
    map['布丁'] = 10;
    map['奶昔'] = 11;
    map['果茶'] = 12;
    return map;
  }

  buildActionPatterns() {
    return {
      add: [
        /要(?:一个|一份|一杯|一碗|)?(.+)/,
        /来(?:一个|一份|一杯|一碗|)?(.+)/,
        /加(?:一个|一份|一杯|一碗|)?(.+)/,
        /点(?:一个|一份|一杯|一碗|)?(.+)/,
        /想要(.+)/,
        /我想吃(.+)/,
        /我需要(.+)/,
        /(?:买|下单)(.+)/,
        /再加(?:一个|一份|一杯|一碗|)?(.+)/,
      ],
      remove: [
        /不要(.+)/,
        /取消(.+)/,
        /删除(.+)/,
        /去掉(.+)/,
        /移除(.+)/,
      ],
      list: [
        /(?:有|菜单|看看|都有|有些)什么/,
        /有哪些/,
        /菜单/,
        /有什么(?:推荐|好吃的)/,
        /看看菜单/,
      ],
      checkout: [
        /(?:结账|结算|下单|付款|买单)/,
        /确认订单/,
        /我要下单/,
        /(?:帮我)?下(?:单|订单)/,
      ],
      cart: [
        /购物车/,
        /(?:看看|查看)?(?:我的)?购物车/,
        /(?:有什么|有哪些)/,
      ],
      help: [
        /(?:帮助|帮助|help|功能|你会什么)/,
        /你可以做什么/,
        /怎么用/,
      ],
      greet: [
        /(?:你好|嗨|hi|hello|早|晚上好|下午好)/,
        /(?:在吗|兔兔)/,
        /^你好/,
      ],
      order: [
        /(?:我的)?(?:订单|订单状态)/,
        /(?:查|看|查询)(?:我的)?订单/,
        /订单(?:怎么样|如何|状态|情况)/,
        /(?:之前|刚才|历史).*(?:订单|点了什么)/,
      ],
      recommend: [
        /(?:推荐|推荐菜|招牌|人气|热门)/,
        /有什么好吃的/,
        /(?:今天|现在)吃什么/,
        /推荐一下/,
      ],
      clear: [
        /清空(?:购物车|购物篮)/,
        /全部取消/,
      ],
    };
  }

  parse(text) {
    const trimmed = text.trim();
    if (!trimmed) return { action: 'unknown', text: '' };

    // 1. 检测动作类型
    let action = 'unknown';
    let matchText = trimmed;

    for (const [act, patterns] of Object.entries(this.actionPatterns)) {
      for (const pattern of patterns) {
        const m = trimmed.match(pattern);
        if (m) {
          action = act;
          matchText = m[1] ? m[1].trim() : '';
          break;
        }
      }
      if (action !== 'unknown') break;
    }

    // 2. 提取数量
    const qty = this.extractQuantity(matchText || trimmed);

    // 3. 匹配菜品
    const dishId = this.matchDish(matchText || trimmed);

    // 4. 构建结果
    return {
      action,
      text: matchText || trimmed,
      quantity: qty,
      dishId,
      dish: dishId ? DISHES.find(d => d.id === dishId) : null,
      raw: trimmed
    };
  }

  extractQuantity(text) {
    // 匹配 "两杯"、"3份"、"二个" 等
    const qtyPatterns = [
      /(\d+)\s*(?:份|杯|碗|个|块|瓶)/,
      /([一两三四五六七八九十])\s*(?:份|杯|碗|个|块|瓶)/,
    ];
    for (const p of qtyPatterns) {
      const m = text.match(p);
      if (m) {
        const num = this.numberMap[m[1]] || parseInt(m[1]) || 1;
        return num;
      }
    }
    // 检测 "一份"、"一个" 等
    const unitPattern = /(?:一|一个|一份|一杯|一碗|一块)/;
    if (unitPattern.test(text)) return 1;
    return 1;
  }

  matchDish(text) {
    if (!text) return null;

    // 1. 精确别名匹配
    for (const [alias, id] of Object.entries(this.dishAliases)) {
      if (text.includes(alias)) return id;
    }

    // 2. 模糊匹配：计算相似度
    let bestMatch = null;
    let bestScore = 0;

    DISHES.forEach(d => {
      let score = 0;
      const dishChars = new Set(d.name);
      const textChars = new Set(text);
      // 交集字符比例
      let common = 0;
      for (const c of dishChars) {
        if (textChars.has(c)) common++;
      }
      score = common / dishChars.size;
      if (score > bestScore) {
        bestScore = score;
        bestMatch = d.id;
      }
    });

    // 阈值 0.3 以上才匹配
    return bestScore >= 0.3 ? bestMatch : null;
  }

  // 清除数量词和前缀后提取核心意图名
  stripQuantifiers(text) {
    return text
      .replace(/[一两三四五六七八九十0-9]+\s*(?:份|杯|碗|个|块|瓶)/g, '')
      .replace(/^(?:一个|一份|一杯|一碗|一块|来|要|点|加)/, '')
      .trim();
  }
}
