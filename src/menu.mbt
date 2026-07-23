/// 菜品管理引擎
/// 提供菜品的增删改查、分类筛选等功能

pub fn DishStore::add_dish(self : DishStore, dish : Dish) {
  self.dishes.push(dish)
}

pub fn DishStore::init_default(self : DishStore) {
  let csv = "id,name,desc,price,category,tag,tag_type\n1,胡萝卜松饼,新鲜胡萝卜烘焙松软香甜,18,dessert,招牌,hot\n2,草莓奶昔,新鲜草莓与牛奶的完美融合,22,drink,热卖,hot\n3,兔兔便当,小兔子饭团配时令蔬菜,38,main,推荐,\n4,棉花糖可可,温暖可可配上软绵棉花糖,26,drink,新品,new\n5,蜂蜜松饼,层层叠叠淋上金黄蜂蜜,28,dessert,热卖,hot\n6,抹茶冰淇淋,清新抹茶配香脆蛋筒,24,dessert,推荐,\n7,蓝莓优格,新鲜蓝莓配香浓优格,20,salad,健康,new\n8,玉米浓汤,香浓玉米熬制温暖人心,16,main,限定,limited"
  self.load_from_csv(csv).unwrap()
}

/// 获取所有菜品
pub fn DishStore::all_dishes(self : DishStore) -> Array[Dish] {
  self.dishes
}

/// 按分类获取菜品
pub fn DishStore::dishes_by_category(self : DishStore, category : String) -> Array[Dish] {
  if category == "all" || category == "" {
    self.dishes
  } else {
    self.dishes.filter(fn(d) { d.category == category })
  }
}

/// 根据 ID 获取菜品
pub fn DishStore::dish_by_id(self : DishStore, id : Int) -> Dish? {
  self.dishes.iter().find_first(fn(d) { d.id == id })
}

/// 获取所有可用分类
pub fn DishStore::categories(self : DishStore) -> Array[String] {
  let mut unique : Array[String] = []
  for d in self.dishes {
    let found = unique.iter().find_first(fn(c) { c == d.category })
    if found.is_none() {
      unique.push(d.category)
    }
  }
  unique
}

/// 按名称搜索菜品
pub fn DishStore::search_dishes(self : DishStore, query : String) -> Array[Dish] {
  let q = query.lowercase()
  self.dishes.filter(fn(d) {
    d.name.lowercase().contains(q) || d.desc.lowercase().contains(q)
  })
}

/// 删除菜品
pub fn DishStore::remove_dish(self : DishStore, id : Int) {
  self.dishes = self.dishes.filter(fn(d) { d.id != id })
}

/// 更新菜品
pub fn DishStore::update_dish(self : DishStore, updated : Dish) -> Result[Unit, String] {
  let found = self.dishes.iter().find_first(fn(d) { d.id == updated.id })
  match found {
    Some(d) => {
      d.name = updated.name
      d.desc = updated.desc
      d.price = updated.price
      d.category = updated.category
      d.tag = updated.tag
      d.tag_type = updated.tag_type
      d.svg = updated.svg
      Ok(())
    }
    None => Err("Dish not found")
  }
}
