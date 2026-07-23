/// 订单处理引擎
/// 提供订单创建、状态流转、查询等高级功能

/// 从购物车创建订单并清空购物车
pub fn OrderStore::place_order(self : OrderStore, cart : Cart) -> Order {
  let order = self.create_order(cart)
  order
}

/// 获取订单的详细信息摘要
pub fn Order::summary(self : Order) -> String {
  let buf = StringBuilder::new()
  buf.write_string("Order #")
  buf.write_string(self.id.to_string())
  buf.write_string(" [")
  buf.write_string(self.status.to_string())
  buf.write_string("] - ¥")
  buf.write_string(self.total.to_string())
  buf.to_string()
}

/// 获取订单中菜品数量
pub fn Order::item_count(self : Order) -> Int {
  self.items.fold(init=0, fn(sum, item) { sum + item.qty })
}

/// 取消订单（仅 Pending 状态的订单可取消）
pub fn OrderStore::cancel_order(self : OrderStore, order_id : Int) -> Result[Unit, String] {
  let found = self.orders.iter().find_first(fn(o) { o.id == order_id })
  match found {
    Some(order) => {
      match order.status {
        Pending => {
          order.status = Cancelled
          Ok(())
        }
        _ => Err("Can only cancel pending orders")
      }
    }
    None => Err("Order not found")
  }
}

/// 将订单标记为准备中
pub fn OrderStore::start_preparing(self : OrderStore, order_id : Int) -> Result[Unit, String] {
  self.update_status(order_id, Preparing)
}

/// 将订单标记为已完成
pub fn OrderStore::complete_order(self : OrderStore, order_id : Int) -> Result[Unit, String] {
  self.update_status(order_id, Completed)
}

/// 获取待处理订单
pub fn OrderStore::pending_orders(self : OrderStore) -> Array[Order] {
  self.orders_by_status(Pending)
}

/// 获取进行中订单
pub fn OrderStore::preparing_orders(self : OrderStore) -> Array[Order] {
  self.orders_by_status(Preparing)
}

/// 获取最近的 N 个订单
pub fn OrderStore::recent_orders(self : OrderStore, n : Int) -> Array[Order] {
  let len = self.orders.length()
  if len <= n {
    self.orders
  } else {
    let result : Array[Order] = []
    let start = len - n
    for i in start ..< len {
      result.push(self.orders[i])
    }
    result
  }
}
