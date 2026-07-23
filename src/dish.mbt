/// 菜品数据结构
pub struct Dish {
  id : Int
  mut name : String
  mut desc : String
  mut price : Float
  mut category : String
  mut tag : String
  mut tag_type : String
  mut svg : String
}

/// 菜品管理集合
pub struct DishStore {
  mut dishes : Array[Dish]
}

pub fn DishStore::new() -> DishStore {
  { dishes: [] }
}

/// 从 CSV 行解析菜品
pub fn Dish::from_csv_row(row : String) -> Result[Dish, String] {
  let fields = row.split(",").map(fn(sv) { sv.to_owned() }).to_array()
  if fields.length() < 7 {
    return Err("Invalid CSV row: insufficient fields")
  }
  let id_str = fields[0].trim().to_owned()
  let id = try {
    @string.parse_int(id_str)
  } catch {
    _ => return Err("Invalid id")
  }
  let price_str = fields[3].trim().to_owned()
  let price = try {
    Float::from_double(@string.parse_double(price_str))
  } catch {
    _ => 0.0
  }
  Ok({
    id: id,
    name: fields[1].trim().to_owned(),
    desc: fields[2].trim().to_owned(),
    price: price,
    category: fields[4].trim().to_owned(),
    tag: fields[5].trim().to_owned(),
    tag_type: fields[6].trim().to_owned(),
    svg: if fields.length() > 7 { fields[7].trim().to_owned() } else { "" },
  })
}

/// 将菜品序列化为 CSV 行
pub fn Dish::to_csv_row(self : Dish) -> String {
  let buf = StringBuilder::new()
  buf.write_string(self.id.to_string())
  buf.write_string(",")
  buf.write_string(self.name)
  buf.write_string(",")
  buf.write_string(self.desc)
  buf.write_string(",")
  buf.write_string(self.price.to_string())
  buf.write_string(",")
  buf.write_string(self.category)
  buf.write_string(",")
  buf.write_string(self.tag)
  buf.write_string(",")
  buf.write_string(self.tag_type)
  buf.to_string()
}
