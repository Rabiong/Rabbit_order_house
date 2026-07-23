/// 管理员后台引擎
/// 提供菜品管理、订单管理、数据统计等后台功能

/// 仪表盘统计数据
pub struct DashboardStats {
  total_dishes : Int
  total_orders : Int
  total_revenue : Float
  pending_count : Int
  preparing_count : Int
  completed_count : Int
  cancelled_count : Int
  top_dishes : Array[TopDish]
}

/// 热门菜品统计
pub struct TopDish {
  dish_id : Int
  name : String
  order_count : Int
}

/// 生成仪表盘统计
pub fn AdminStore::dashboard(self : AdminStore) -> DashboardStats {
  let orders = self.order_store.all_orders()
  let mut total_rev = 0.0
  let mut pending = 0
  let mut preparing = 0
  let mut completed = 0
  let mut cancelled = 0
  
  for order in orders {
    total_rev = total_rev + order.total
    match order.status {
      Pending => pending = pending + 1
      Preparing => preparing = preparing + 1
      Completed => completed = completed + 1
      Cancelled => cancelled = cancelled + 1
    }
  }

  // 统计菜品销售次数
  let dish_count : Array[(Int, Int)] = []
  for order in orders {
    for item in order.items {
      let found = dish_count.iter().find_first(fn((id, _)) { id == item.dish_id })
      match found {
        Some((_, ref count)) => { count = count + item.qty }
        None => { dish_count.push((item.dish_id, item.qty)) }
      }
    }
  }

  // 排序取前 3
  let sorted = dish_count.sort(fn(a, b) { b.1 - a.1 })
  let top : Array[TopDish] = []
  let max_top = if sorted.length() > 3 { 3 } else { sorted.length() }
  for i in 0 ..< max_top {
    let (did, cnt) = sorted[i]
    let dish_name = match self.dish_store.dish_by_id(did) {
      Some(d) => d.name
      None => "Unknown"
    }
    top.push({ dish_id: did, name: dish_name, order_count: cnt })
  }

  {
    total_dishes: self.dish_store.all_dishes().length(),
    total_orders: orders.length(),
    total_revenue: total_rev,
    pending_count: pending,
    preparing_count: preparing,
    completed_count: completed,
    cancelled_count: cancelled,
    top_dishes: top,
  }
}

/// 仪表盘统计转 JSON
pub fn DashboardStats::to_json(self : DashboardStats) -> String {
  let buf = StringBuilder::new()
  buf.write_string("{\"total_dishes\":")
  buf.write_string(self.total_dishes.to_string())
  buf.write_string(",\"total_orders\":")
  buf.write_string(self.total_orders.to_string())
  buf.write_string(",\"total_revenue\":")
  buf.write_string(self.total_revenue.to_string())
  buf.write_string(",\"pending_count\":")
  buf.write_string(self.pending_count.to_string())
  buf.write_string(",\"preparing_count\":")
  buf.write_string(self.preparing_count.to_string())
  buf.write_string(",\"completed_count\":")
  buf.write_string(self.completed_count.to_string())
  buf.write_string(",\"cancelled_count\":")
  buf.write_string(self.cancelled_count.to_string())
  buf.write_string(",\"top_dishes\":[")
  let mut first = true
  for d in self.top_dishes {
    if !first { buf.write_string(",") }
    first = false
    buf.write_string("{\"dish_id\":")
    buf.write_string(d.dish_id.to_string())
    buf.write_string(",\"name\":\"")
    buf.write_string(d.name)
    buf.write_string("\",\"order_count\":")
    buf.write_string(d.order_count.to_string())
    buf.write_string("}")
  }
  buf.write_string("]}")
  buf.to_string()
}

/// 管理员后台
pub struct AdminStore {
  dish_store : DishStore
  order_store : OrderStore
}

pub fn AdminStore::new(dish_store : DishStore, order_store : OrderStore) -> AdminStore {
  { dish_store: dish_store, order_store: order_store }
}

/// 添加菜品（管理员）
pub fn AdminStore::add_dish(self : AdminStore, name : String, desc : String,
    price : Float, category : String, tag : String, tag_type : String) -> Dish {
  let dishes = self.dish_store.all_dishes()
  let max_id = dishes.fold(init=0, fn(max, d) { if d.id > max { d.id } else { max } })
  let new_id = max_id + 1
  let dish : Dish = {
    id: new_id, name: name, desc: desc, price: price,
    category: category, tag: tag, tag_type: tag_type, svg: ""
  }
  self.dish_store.add_dish(dish)
  dish
}

/// 删除菜品（管理员）
pub fn AdminStore::remove_dish(self : AdminStore, id : Int) -> Result[Unit, String] {
  let found = self.dish_store.dish_by_id(id)
  match found {
    Some(_) => {
      self.dish_store.remove_dish(id)
      Ok(())
    }
    None => Err("Dish not found")
  }
}

/// 更新菜品（管理员）
pub fn AdminStore::update_dish(self : AdminStore, dish : Dish) -> Result[Unit, String] {
  self.dish_store.update_dish(dish)
}

/// 获取所有订单（管理员）
pub fn AdminStore::all_orders(self : AdminStore) -> Array[Order] {
  self.order_store.all_orders()
}

/// 更新订单状态（管理员）
pub fn AdminStore::update_order_status(self : AdminStore, order_id : Int, status : OrderStatus) -> Result[Unit, String] {
  self.order_store.update_status(order_id, status)
}

/// 获取待处理订单
pub fn AdminStore::pending_orders(self : AdminStore) -> Array[Order] {
  self.order_store.pending_orders()
}

/// 按状态统计
pub fn AdminStore::order_count_by_status(self : AdminStore) -> String {
  let orders = self.order_store.all_orders()
  let mut pending = 0
  let mut preparing = 0
  let mut completed = 0
  let mut cancelled = 0
  for o in orders {
    match o.status {
      Pending => pending = pending + 1
      Preparing => preparing = preparing + 1
      Completed => completed = completed + 1
      Cancelled => cancelled = cancelled + 1
    }
  }
  "pending:\{pending},preparing:\{preparing},completed:\{completed},cancelled:\{cancelled}"
}
