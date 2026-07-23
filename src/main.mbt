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
  
  println("")
  println("🐰 感谢光临兔兔小厨房！")
}
