/// 配送地址数据模型

/// 配送地址
pub struct Address {
  id : Int
  mut label : String          // 标签：家/公司/学校
  mut receiver : String       // 收货人
  mut phone : String          // 联系电话
  mut detail : String         // 详细地址
  mut is_default : Bool       // 是否默认地址
}

/// 地址管理集合
pub struct AddressStore {
  mut addresses : Array[Address]
  mut next_id : Int
}

pub fn AddressStore::new() -> AddressStore {
  { addresses: [], next_id: 1 }
}

/// 添加地址
pub fn AddressStore::add(self : AddressStore, label : String, receiver : String,
    phone : String, detail : String, is_default : Bool) -> Address {
  let id = self.next_id
  self.next_id = self.next_id + 1
  
  // 如果设为默认，取消其他地址的默认状态
  if is_default {
    for addr in self.addresses {
      addr.is_default = false
    }
  }
  
  let addr : Address = {
    id: id, label: label, receiver: receiver,
    phone: phone, detail: detail, is_default: is_default
  }
  self.addresses.push(addr)
  addr
}

/// 更新地址
pub fn AddressStore::update(self : AddressStore, id : Int, label : String, receiver : String,
    phone : String, detail : String, is_default : Bool) -> Result[Unit, String] {
  let found = self.addresses.iter().find_first(fn(a) { a.id == id })
  match found {
    Some(addr) => {
      if is_default {
        for a in self.addresses {
          a.is_default = false
        }
      }
      addr.label = label
      addr.receiver = receiver
      addr.phone = phone
      addr.detail = detail
      addr.is_default = is_default
      Ok(())
    }
    None => Err("Address not found")
  }
}

/// 删除地址
pub fn AddressStore::remove(self : AddressStore, id : Int) -> Result[Unit, String] {
  let found = self.addresses.iter().find_first(fn(a) { a.id == id })
  match found {
    Some(_) => {
      self.addresses = self.addresses.filter(fn(a) { a.id != id })
      Ok(())
    }
    None => Err("Address not found")
  }
}

/// 获取所有地址
pub fn AddressStore::all(self : AddressStore) -> Array[Address] {
  self.addresses
}

/// 获取默认地址
pub fn AddressStore::default(self : AddressStore) -> Address? {
  self.addresses.iter().find_first(fn(a) { a.is_default })
}

/// 根据 ID 获取地址
pub fn AddressStore::by_id(self : AddressStore, id : Int) -> Address? {
  self.addresses.iter().find_first(fn(a) { a.id == id })
}

/// 地址信息转 JSON
pub fn Address::to_json(self : Address) -> String {
  let buf = StringBuilder::new()
  buf.write_string("{\"id\":")
  buf.write_string(self.id.to_string())
  buf.write_string(",\"label\":\"")
  buf.write_string(self.label)
  buf.write_string("\",\"receiver\":\"")
  buf.write_string(self.receiver)
  buf.write_string("\",\"phone\":\"")
  buf.write_string(self.phone)
  buf.write_string("\",\"detail\":\"")
  buf.write_string(self.detail)
  buf.write_string("\",\"is_default\":")
  buf.write_string(if self.is_default { "true" } else { "false" })
  buf.write_string("}")
  buf.to_string()
}
