/// Bunny Bites · 兔兔小厨房 — 点餐系统入口
/// 提供系统初始化、测试运行与 CLI 交互功能

fn main {
  println("🐰 Bunny Bites · 兔兔小厨房")
  println("============================")
  
  // 初始化菜品数据
  let dish_store = DishStore::new()
  dish_store.init_default()
  println("✓ 已加载 \{dish_store.all_dishes().length()} 道菜品")
  
  // 获取所有分类
  let cats = dish_store.categories()
  println("✓ 分类: \{cats.join(", ")}")
  
  // 模拟购物车操作
  let cart = Cart::new()
  cart.add_dish_from_store(1, dish_store).unwrap()  // 胡萝卜松饼
  cart.add_dish_from_store(2, dish_store).unwrap()  // 草莓奶昔
  cart.add_dish_from_store(1, dish_store).unwrap()  // 再来一份胡萝卜松饼
  println("")
  println("🛒 购物车: \{cart.summary()}")
  
  // 列出购物车中的商品
  println("")
  println("📋 购物车明细:")
  for item in cart.items {
    println("  ×\{item.qty} \{item.name} — ¥\{item.price}")
  }
  println("  小计: ¥\{cart.subtotal()}")
  println("  配送费: ¥\{delivery_fee()}")
  println("  总计: ¥\{cart.total()}")
  
  // 下单
  let order_store = OrderStore::new()
  let order = order_store.place_order(cart)
  println("")
  println("📦 订单已创建: \{order.summary()}")
  println("  状态: \{order.status.to_string()}")
  println("  共 \{order.item_count()} 件商品")
  
  // 更新订单状态
  order_store.start_preparing(order.id).unwrap()
  println("")
  println("🍳 订单 #\{order.id} 状态更新: \{order.status.to_string()}")
  
  order_store.complete_order(order.id).unwrap()
  println("✅ 订单 #\{order.id} 已完成!")
  
  // 导出 JSON
  println("")
  println("📄 菜品 JSON:")
  println(dish_store.to_json())
  
  println("")
  println("📄 订单 JSON:")
  println(order_store.to_json())
  
  // 测试搜索
  let results = dish_store.search_dishes("胡萝卜")
  println("")
  println("🔍 搜索 \"胡萝卜\":")
  for d in results {
    println("  - \{d.name} (\{d.desc})")
  }
  
  // ===== 新功能测试 =====
  
  // 1. 收藏夹测试
  let fav_store = FavoriteStore::new()
  fav_store.add(1, "胡萝卜松饼").unwrap()
  fav_store.add(3, "兔兔便当").unwrap()
  println("")
  println("❤️ 收藏夹: \{fav_store.count()} 项")
  for f in fav_store.all() {
    println("  - \{f.dish_name}")
  }
  println("  胡萝卜松饼已收藏? \{fav_store.is_favorited(1)}")
  fav_store.remove(1)
  println("  取消收藏后: \{fav_store.count()} 项")
  
  // 2. 地址管理测试
  let addr_store = AddressStore::new()
  addr_store.add("家", "兔兔", "13800138000", "森林路 123 号胡萝卜公寓 101", true)
  addr_store.add("公司", "Mochi", "13900139000", "萝卜街 456 号", false)
  println("")
  println("📮 地址簿: \{addr_store.all().length()} 个地址")
  for a in addr_store.all() {
    println("  [\{a.label}] \{a.receiver} - \{a.phone}")
    println("    \{a.detail} \{if a.is_default { "(默认)" } else { "" }}")
  }
  match addr_store.default() {
    Some(d) => println("  默认地址: \{d.label} - \{d.detail}")
    None => println("  无默认地址")
  }
  
  // 3. 后台管理测试
  let admin = AdminStore::new(dish_store, order_store)
  let stats = admin.dashboard()
  println("")
  println("📊 管理后台统计:")
  println("  菜品数: \{stats.total_dishes}")
  println("  订单数: \{stats.total_orders}")
  println("  总收入: ¥\{stats.total_revenue}")
  println("  待处理: \{stats.pending_count} | 准备中: \{stats.preparing_count} | 已完成: \{stats.completed_count} | 已取消: \{stats.cancelled_count}")
  println("  热门菜品:")
  for t in stats.top_dishes {
    println("    - \{t.name}: 售出 \{t.order_count} 份")
  }
  
  println("")
  println("🐰 感谢光临兔兔小厨房！")
}
