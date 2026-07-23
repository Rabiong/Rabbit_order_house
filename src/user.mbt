/// 用户数据模型

/// 用户
pub struct User {
  id : Int
  username : String
  password_hash : String
  mut nickname : String
  mut phone : String
  mut address : String
  avatar : String
  created_at : String
}

/// 用户管理集合
pub struct UserStore {
  users : Array[User]
  mut current_user : User?
  mut next_id : Int
}

pub fn UserStore::new() -> UserStore {
  { users: [], current_user: None, next_id: 1 }
}

/// 用户注册
pub fn UserStore::register(self : UserStore, username : String, password : String, nickname : String) -> Result[User, String] {
  if username == "" || password == "" {
    return Err("Username and password are required")
  }
  let found = self.users.iter().find_first(fn(u) { u.username == username })
  if found is Some(_) {
    return Err("Username already exists")
  }
  let id = self.next_id
  self.next_id = self.next_id + 1
  let now = "2026-07-23 12:00:00"
  let user = {
    id: id,
    username: username,
    password_hash: password,
    nickname: if nickname != "" { nickname } else { username },
    phone: "",
    address: "",
    avatar: "",
    created_at: now,
  }
  self.users.push(user)
  Ok(user)
}

/// 用户登录
pub fn UserStore::login(self : UserStore, username : String, password : String) -> Result[User, String] {
  let found = self.users.iter().find_first(fn(u) { u.username == username && u.password_hash == password })
  match found {
    Some(user) => {
      self.current_user = Some(user)
      Ok(user)
    }
    None => Err("Invalid username or password")
  }
}

/// 退出登录
pub fn UserStore::logout(self : UserStore) -> Unit {
  self.current_user = None
}

/// 获取当前用户
pub fn UserStore::current(self : UserStore) -> User? {
  self.current_user
}

/// 更新个人信息
pub fn UserStore::update_profile(self : UserStore, user_id : Int, nickname : String, phone : String, address : String) -> Result[Unit, String] {
  let found = self.users.iter().find_first(fn(u) { u.id == user_id })
  match found {
    Some(user) => {
      user.nickname = nickname
      user.phone = phone
      user.address = address
      self.current_user = Some(user)
      Ok(())
    }
    None => Err("User not found")
  }
}

/// 根据 ID 获取用户
pub fn UserStore::user_by_id(self : UserStore, id : Int) -> User? {
  self.users.iter().find_first(fn(u) { u.id == id })
}

/// 获取用户的所有订单
pub fn UserStore::user_orders(self : UserStore, order_store : OrderStore, _user_id : Int) -> Array[Order] {
  // 简单实现：返回所有订单（实际应按用户筛选）
  order_store.all_orders()
}

/// 用户信息转 JSON
pub fn User::to_json(self : User) -> String {
  let buf = StringBuilder::new()
  buf.write_string("{\"id\":")
  buf.write_string(self.id.to_string())
  buf.write_string(",\"username\":\"")
  buf.write_string(self.username)
  buf.write_string("\",\"nickname\":\"")
  buf.write_string(self.nickname)
  buf.write_string("\",\"phone\":\"")
  buf.write_string(self.phone)
  buf.write_string("\",\"address\":\"")
  buf.write_string(self.address)
  buf.write_string("\",\"avatar\":\"")
  buf.write_string(self.avatar)
  buf.write_string("\"}")
  buf.to_string()
}
