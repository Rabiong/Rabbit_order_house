/// 购物车引擎
/// 提供基于 DishStore 的购物车操作

/// 将菜品添加到购物车（通过 DishStore 查找）
pub fn Cart::add_dish_from_store(self : Cart, dish_id : Int, store : DishStore) -> Result[Unit, String] {
  let dish = store.dish_by_id(dish_id)
  match dish {
    Some(d) => {
      self.add(d.id, d.name, d.price, d.svg)
      Ok(())
    }
    None => Err("Dish not found: \{dish_id}")
  }
}

/// 批量添加多个菜品到购物车
pub fn Cart::add_dishes(self : Cart, dish_ids : Array[Int], store : DishStore) -> Result[Unit, String] {
  for id in dish_ids {
    let result = self.add_dish_from_store(id, store)
    if result.is_err() {
      return result
    }
  }
  Ok(())
}

/// 获取购物车中某项的数量
pub fn Cart::item_qty(self : Cart, dish_id : Int) -> Int {
  let found = self.items.iter().find_first(fn(item) { item.dish_id == dish_id })
  match found {
    Some(item) => item.qty
    None => 0
  }
}

/// 检查购物车是否包含某菜品
pub fn Cart::contains(self : Cart, dish_id : Int) -> Bool {
  self.items.iter().find_first(fn(item) { item.dish_id == dish_id }).is_some()
}

/// 格式化购物车摘要
pub fn Cart::summary(self : Cart) -> String {
  let buf = StringBuilder::new()
  buf.write_string("Cart(items: ")
  buf.write_string(self.total_qty().to_string())
  buf.write_string(", total: ¥")
  buf.write_string(self.total().to_string())
  buf.write_string(")")
  buf.to_string()
}
