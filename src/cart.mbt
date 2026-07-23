/// 购物车单项
pub struct CartItem {
  dish_id : Int
  name : String
  price : Float
  mut qty : Int
  svg : String
}

/// 购物车
pub struct Cart {
  mut items : Array[CartItem]
}

pub fn Cart::new() -> Cart {
  { items: [] }
}

/// 添加菜品到购物车
pub fn Cart::add(self : Cart, dish_id : Int, name : String, price : Float, svg : String) {
  let found = self.items.iter().find_first(fn(item) { item.dish_id == dish_id })
  match found {
    Some(item) => { item.qty = item.qty + 1 }
    None => {
      self.items.push({
        dish_id: dish_id,
        name: name,
        price: price,
        qty: 1,
        svg: svg,
      })
    }
  }
}

/// 从购物车移除菜品
pub fn Cart::remove(self : Cart, dish_id : Int) {
  self.items = self.items.filter(fn(item) { item.dish_id != dish_id })
}

/// 更新购物车中某项的数量
pub fn Cart::update_qty(self : Cart, dish_id : Int, delta : Int) {
  let found = self.items.iter().find_first(fn(item) { item.dish_id == dish_id })
  match found {
    Some(item) => {
      item.qty = item.qty + delta
      if item.qty <= 0 {
        self.remove(dish_id)
      }
    }
    None => { () }
  }
}

/// 计算购物车商品总价（不含配送费）
pub fn Cart::subtotal(self : Cart) -> Float {
  self.items.fold(init=0.0, fn(sum, item) { sum + item.price * Float::from_int(item.qty) })
}

/// 计算购物车商品总数
pub fn Cart::total_qty(self : Cart) -> Int {
  self.items.fold(init=0, fn(sum, item) { sum + item.qty })
}

/// 获取配送费（固定 6 元）
pub fn delivery_fee() -> Float {
  6.0
}

/// 计算总价（含配送费）
pub fn Cart::total(self : Cart) -> Float {
  self.subtotal() + delivery_fee()
}

/// 清空购物车
pub fn Cart::clear(self : Cart) {
  self.items = []
}
