/// 收藏夹数据模型
/// 用户收藏喜欢的菜品，方便快速点单

/// 收藏项
pub struct FavoriteItem {
  dish_id : Int
  dish_name : String
  added_at : String
}

/// 收藏夹
pub struct FavoriteStore {
  mut items : Array[FavoriteItem]
}

pub fn FavoriteStore::new() -> FavoriteStore {
  { items: [] }
}

/// 添加收藏
pub fn FavoriteStore::add(self : FavoriteStore, dish_id : Int, dish_name : String) -> Result[Unit, String] {
  let found = self.items.iter().find_first(fn(f) { f.dish_id == dish_id })
  if found is Some(_) {
    return Err("Already in favorites")
  }
  let now = "2026-07-23 12:00:00"
  self.items.push({ dish_id: dish_id, dish_name: dish_name, added_at: now })
  Ok(())
}

/// 取消收藏
pub fn FavoriteStore::remove(self : FavoriteStore, dish_id : Int) -> Unit {
  self.items = self.items.filter(fn(f) { f.dish_id != dish_id })
}

/// 检查是否已收藏
pub fn FavoriteStore::is_favorited(self : FavoriteStore, dish_id : Int) -> Bool {
  self.items.iter().find_first(fn(f) { f.dish_id == dish_id }) is Some(_)
}

/// 获取所有收藏
pub fn FavoriteStore::all(self : FavoriteStore) -> Array[FavoriteItem] {
  self.items
}

/// 获取收藏的菜品 ID 列表
pub fn FavoriteStore::dish_ids(self : FavoriteStore) -> Array[Int] {
  self.items.map(fn(f) { f.dish_id })
}

/// 收藏数量
pub fn FavoriteStore::count(self : FavoriteStore) -> Int {
  self.items.length()
}

/// 清空收藏
pub fn FavoriteStore::clear(self : FavoriteStore) -> Unit {
  self.items = []
}

/// 收藏项转 JSON
pub fn FavoriteItem::to_json(self : FavoriteItem) -> String {
  "{\"dish_id\":\{self.dish_id},\"dish_name\":\"\{self.dish_name}\",\"added_at\":\"\{self.added_at}\"}"
}
