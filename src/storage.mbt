/// 数据持久化模块
/// 提供菜品/订单数据的 CSV 导出及简化 JSON 转换

/// 将菜品存储序列化为 CSV 字符串
pub fn DishStore::to_csv(self : DishStore) -> String {
  let mut result = "id,name,desc,price,category,tag,tag_type\n"
  for dish in self.dishes {
    result = result + dish.to_csv_row() + "\n"
  }
  result
}

/// 将单个菜品转为 JSON 对象字符串
fn Dish::to_json_entry(self : Dish) -> String {
  "{\"id\":\{self.id},\"name\":\"\{self.name}\",\"desc\":\"\{self.desc}\",\"price\":\{self.price},\"category\":\"\{self.category}\",\"tag\":\"\{self.tag}\",\"tagType\":\"\{self.tag_type}\"}"
}

/// 将菜品列表导出为 JSON 数组字符串
pub fn DishStore::to_json(self : DishStore) -> String {
  let buf = StringBuilder::new()
  buf.write_string("[")
  let mut first = true
  for dish in self.dishes {
    if !first { buf.write_string(",") }
    first = false
    buf.write_string(dish.to_json_entry())
  }
  buf.write_string("]")
  buf.to_string()
}

/// 将单个订单转为 JSON 对象字符串
pub fn Order::to_json(self : Order) -> String {
  let buf = StringBuilder::new()
  buf.write_string("{\"id\":")
  buf.write_string(self.id.to_string())
  buf.write_string(",\"status\":\"")
  buf.write_string(self.status.to_string())
  buf.write_string("\",\"total\":")
  buf.write_string(self.total.to_string())
  buf.write_string(",\"subtotal\":")
  buf.write_string(self.subtotal.to_string())
  buf.write_string(",\"delivery\":")
  buf.write_string(self.delivery.to_string())
  buf.write_string(",\"items\":[")
  let mut first = true
  for item in self.items {
    if !first { buf.write_string(",") }
    first = false
    buf.write_string("{\"id\":")
    buf.write_string(item.dish_id.to_string())
    buf.write_string(",\"name\":\"")
    buf.write_string(item.name)
    buf.write_string("\",\"price\":")
    buf.write_string(item.price.to_string())
    buf.write_string(",\"qty\":")
    buf.write_string(item.qty.to_string())
    buf.write_string("}")
  }
  buf.write_string("]}")
  buf.to_string()
}

/// 订单列表转为 JSON 数组字符串
pub fn OrderStore::to_json(self : OrderStore) -> String {
  let buf = StringBuilder::new()
  buf.write_string("[")
  let mut first = true
  for order in self.orders {
    if !first { buf.write_string(",") }
    first = false
    buf.write_string(order.to_json())
  }
  buf.write_string("]")
  buf.to_string()
}

/// 从 CSV 字符串加载菜品
pub fn DishStore::load_from_csv(self : DishStore, csv_content : String) -> Result[Unit, String] {
  let lines = csv_content.split("\n").map(fn(sv) { sv.to_string() }).to_array()
  // 跳过表头
  let data_lines = if lines.length() > 0 && lines[0].contains("id") {
    lines[1..].to_array()
  } else {
    lines
  }
  for line in data_lines {
    let trimmed = line.trim()
    if trimmed != "" {
      let dish = Dish::from_csv_row(trimmed)
      match dish {
        Ok(d) => self.dishes.push(d)
        Err(e) => return Err("Parse error: \{e}")
      }
    }
  }
  Ok(())
}
