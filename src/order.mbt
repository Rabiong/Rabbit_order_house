/// 订单状态
pub enum OrderStatus {
  Pending     // 等待处理
  Preparing   // 准备中
  Completed   // 已完成
  Cancelled   // 已取消
} derive(Eq)

/// 订单
pub struct Order {
  id : Int
  items : Array[CartItem]
  subtotal : Float
  delivery : Float
  total : Float
  mut status : OrderStatus
  created_at : String
}

/// 订单管理集合
pub struct OrderStore {
  mut orders : Array[Order]
  mut next_id : Int
}

pub fn OrderStore::new() -> OrderStore {
  { orders: [], next_id: 1 }
}

/// 从购物车创建订单
pub fn OrderStore::create_order(self : OrderStore, cart : Cart) -> Order {
  let order_id = self.next_id
  self.next_id = self.next_id + 1
  let now = "2026-07-23 12:00:00"
  let order = {
    id: order_id,
    items: cart.items,
    subtotal: cart.subtotal(),
    delivery: delivery_fee(),
    total: cart.total(),
    status: Pending,
    created_at: now,
  }
  self.orders.push(order)
  order
}

/// 更新订单状态
pub fn OrderStore::update_status(self : OrderStore, order_id : Int, new_status : OrderStatus) -> Result[Unit, String] {
  let found = self.orders.iter().find_first(fn(o) { o.id == order_id })
  match found {
    Some(order) => {
      order.status = new_status
      Ok(())
    }
    None => Err("Order not found")
  }
}

/// 获取所有订单
pub fn OrderStore::all_orders(self : OrderStore) -> Array[Order] {
  self.orders
}

/// 按状态获取订单
pub fn OrderStore::orders_by_status(self : OrderStore, status : OrderStatus) -> Array[Order] {
  self.orders.filter(fn(o) { o.status == status })
}

/// 订单状态转换为字符串
pub fn OrderStatus::to_string(self : OrderStatus) -> String {
  match self {
    Pending => "pending"
    Preparing => "preparing"
    Completed => "completed"
    Cancelled => "cancelled"
  }
}

/// 从字符串解析订单状态
pub fn OrderStatus::from_string(s : String) -> Result[OrderStatus, String] {
  match s {
    "pending" => Ok(Pending)
    "preparing" => Ok(Preparing)
    "completed" => Ok(Completed)
    "cancelled" => Ok(Cancelled)
    _ => Err("Invalid order status: \{s}")
  }
}
