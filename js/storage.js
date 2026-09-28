/**
 * localStorage 数据管理模块
 * 负责所有数据的存取操作
 */

const Storage = {
  // 存储键名常量
  KEYS: {
    DISHES: 'dishes',           // 菜品数据
    ORDERS: 'orders',           // 所有订单
    CURRENT_TABLE: 'currentTable', // 当前桌号
    CART: 'cart'                // 购物车
  },

  // 获取菜品列表
  getDishes() {
    const data = localStorage.getItem(this.KEYS.DISHES);
    return data ? JSON.parse(data) : [];
  },

  // 保存菜品列表
  saveDishes(dishes) {
    localStorage.setItem(this.KEYS.DISHES, JSON.stringify(dishes));
  },

  // 获取所有订单
  getOrders() {
    const data = localStorage.getItem(this.KEYS.ORDERS);
    return data ? JSON.parse(data) : [];
  },

  // 保存所有订单
  saveOrders(orders) {
    localStorage.setItem(this.KEYS.ORDERS, JSON.stringify(orders));
  },

  // 添加新订单
  addOrder(order) {
    const orders = this.getOrders();
    orders.push(order);
    this.saveOrders(orders);
  },

  // 获取指定桌号的订单
  getOrdersByTable(tableNumber) {
    const orders = this.getOrders();
    return orders.filter(order => order.tableNumber === tableNumber);
  },

  // 更新订单状态
  updateOrderStatus(orderId, status) {
    const orders = this.getOrders();
    const order = orders.find(o => o.id === orderId);
    if (order) {
      order.status = status;
      order.updateTime = new Date().toISOString();
      this.saveOrders(orders);
    }
  },

  // 获取当前桌号
  getCurrentTable() {
    return localStorage.getItem(this.KEYS.CURRENT_TABLE);
  },

  // 设置当前桌号
  setCurrentTable(tableNumber) {
    localStorage.setItem(this.KEYS.CURRENT_TABLE, tableNumber);
  },

  // 获取购物车
  getCart() {
    const data = localStorage.getItem(this.KEYS.CART);
    return data ? JSON.parse(data) : [];
  },

  // 保存购物车
  saveCart(cart) {
    localStorage.setItem(this.KEYS.CART, JSON.stringify(cart));
  },

  // 清空购物车
  clearCart() {
    localStorage.setItem(this.KEYS.CART, JSON.stringify([]));
  },

  // 初始化数据（首次使用时）
  initData(dishesData) {
    if (!this.getDishes().length) {
      this.saveDishes(dishesData);
    }
  }
};
