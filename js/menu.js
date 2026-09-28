/**
 * 点餐页面业务逻辑
 */

// 菜系列表
const CATEGORIES = ['豫菜', '鲁菜', '川菜', '粤菜', '苏菜', '浙菜', '闽菜', '湘菜', '徽菜', '主食', '饮品'];

// 当前选中的菜系
let currentCategory = CATEGORIES[0];

// 购物车数据
let cart = [];

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
  // 检查是否选择了桌号
  const tableNumber = Storage.getCurrentTable();
  if (!tableNumber) {
    alert('请先选择桌号');
    window.location.href = 'index.html';
    return;
  }

  // 显示当前桌号
  document.getElementById('currentTable').textContent = tableNumber + '号桌';
  document.getElementById('modalTableNumber').textContent = tableNumber + '号桌';

  // 加载购物车数据
  cart = Storage.getCart();

  // 渲染菜系列表
  renderCategories();

  // 渲染菜品列表（默认显示第一个菜系）
  renderDishes(currentCategory);

  // 更新购物车显示
  updateCartDisplay();
});

// 渲染菜系列表
function renderCategories() {
  const categoryList = document.getElementById('categoryList');
  categoryList.innerHTML = '';

  CATEGORIES.forEach(category => {
    const button = document.createElement('button');
    button.className = `category-btn w-full py-4 px-3 mb-2 rounded-xl text-lg font-medium transition-all ${
      category === currentCategory ? 'active' : 'bg-white hover:bg-amber-50 text-gray-700'
    }`;
    button.textContent = category;
    button.onclick = () => selectCategory(category);
    categoryList.appendChild(button);
  });
}

// 切换菜系
function selectCategory(category) {
  currentCategory = category;
  renderCategories();
  renderDishes(category);
}

// 渲染菜品列表
function renderDishes(category) {
  const dishes = Storage.getDishes().filter(dish => dish.category === category);
  const dishesGrid = document.getElementById('dishesGrid');
  const title = document.getElementById('currentCategoryTitle');

  title.textContent = category;
  dishesGrid.innerHTML = '';

  if (dishes.length === 0) {
    dishesGrid.innerHTML = '<div class="col-span-3 text-center text-gray-500 text-xl py-12">该菜系暂无菜品</div>';
    return;
  }

  dishes.forEach(dish => {
    const card = createDishCard(dish);
    dishesGrid.appendChild(card);
  });
}

// 创建菜品卡片
function createDishCard(dish) {
  const card = document.createElement('div');
  card.className = 'bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all overflow-hidden';

  // 获取该菜品在购物车中的数量
  const cartItem = cart.find(item => item.id === dish.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  // 辣度图标
  const spicyIcons = ['', '🌶️', '🌶️🌶️', '🌶️🌶️🌶️'];
  const spicyHtml = dish.spicy > 0 ? `<span class="spicy-icon">${spicyIcons[dish.spicy]}</span>` : '';

  // 标签
  const tagsHtml = dish.tags.map(tag => {
    let color = 'bg-gray-100 text-gray-600';
    if (tag === '招牌') color = 'bg-red-100 text-red-600';
    if (tag === '特辣') color = 'bg-red-100 text-red-600';
    if (tag === '微辣') color = 'bg-orange-100 text-orange-600';
    if (tag === '素食') color = 'bg-green-100 text-green-600';
    return `<span class="px-2 py-1 rounded-full text-xs font-medium ${color}">${tag}</span>`;
  }).join('');

  card.innerHTML = `
    <div class="relative">
      <img src="${dish.image}" alt="${dish.name}" class="w-full h-48 object-cover">
      ${dish.tags.includes('招牌') ? '<div class="absolute top-2 left-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">🔥 招牌</div>' : ''}
    </div>
    <div class="p-4">
      <div class="flex items-start justify-between mb-2">
        <h3 class="text-xl font-bold text-gray-800 flex-1">${dish.name} ${spicyHtml}</h3>
        <div class="text-2xl font-bold text-amber-600">¥${dish.price}</div>
      </div>
      <p class="text-gray-600 text-sm mb-3 line-clamp-2">${dish.description}</p>
      <div class="flex items-center justify-between">
        <div class="flex gap-1">${tagsHtml}</div>
        <div class="flex items-center gap-3">
          ${quantity > 0 ? `
            <button onclick="decreaseQuantity(${dish.id})" class="w-10 h-10 bg-gray-200 hover:bg-gray-300 rounded-full text-xl font-bold">-</button>
            <span class="text-xl font-bold text-gray-800 w-8 text-center">${quantity}</span>
          ` : ''}
          <button onclick="addToCart(${dish.id})" class="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white rounded-full text-2xl font-bold shadow-lg">+</button>
        </div>
      </div>
    </div>
  `;

  return card;
}

// 添加到购物车
function addToCart(dishId) {
  const dishes = Storage.getDishes();
  const dish = dishes.find(d => d.id === dishId);
  if (!dish) return;

  const existingItem = cart.find(item => item.id === dishId);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({
      id: dish.id,
      name: dish.name,
      price: dish.price,
      quantity: 1,
      image: dish.image
    });
  }

  Storage.saveCart(cart);
  updateCartDisplay();
  renderDishes(currentCategory); // 重新渲染以更新数量显示
}

// 减少数量
function decreaseQuantity(dishId) {
  const existingItem = cart.find(item => item.id === dishId);
  if (!existingItem) return;

  existingItem.quantity--;
  if (existingItem.quantity <= 0) {
    cart = cart.filter(item => item.id !== dishId);
  }

  Storage.saveCart(cart);
  updateCartDisplay();
  renderDishes(currentCategory);
}

// 更新购物车显示
function updateCartDisplay() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  document.getElementById('cartCount').textContent = totalItems;
  document.getElementById('cartItemCount').textContent = totalItems;
  document.getElementById('cartTotal').textContent = totalPrice.toFixed(0);

  // 更新购物车面板
  updateCartPanel();
}

// 更新购物车面板
function updateCartPanel() {
  const cartItemsList = document.getElementById('cartItemsList');
  cartItemsList.innerHTML = '';

  if (cart.length === 0) {
    cartItemsList.innerHTML = '<div class="text-center text-gray-500 py-4">购物车是空的</div>';
    return;
  }

  cart.forEach(item => {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'flex items-center justify-between bg-white p-3 rounded-lg';
    itemDiv.innerHTML = `
      <div class="flex items-center gap-3 flex-1">
        <img src="${item.image}" alt="${item.name}" class="w-16 h-16 rounded-lg object-cover">
        <div class="flex-1">
          <div class="font-medium text-gray-800">${item.name}</div>
          <div class="text-sm text-amber-600">¥${item.price}</div>
        </div>
      </div>
      <div class="flex items-center gap-3">
        <button onclick="decreaseQuantity(${item.id})" class="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-full text-lg">-</button>
        <span class="text-lg font-bold w-6 text-center">${item.quantity}</span>
        <button onclick="addToCart(${item.id})" class="w-8 h-8 bg-amber-500 hover:bg-amber-600 text-white rounded-full text-lg">+</button>
        <button onclick="removeFromCart(${item.id})" class="ml-2 text-red-500 hover:text-red-700 text-xl">🗑️</button>
      </div>
    `;
    cartItemsList.appendChild(itemDiv);
  });
}

// 从购物车移除
function removeFromCart(dishId) {
  cart = cart.filter(item => item.id !== dishId);
  Storage.saveCart(cart);
  updateCartDisplay();
  renderDishes(currentCategory);
}

// 清空购物车
function clearCart() {
  if (cart.length === 0) {
    alert('购物车已经是空的');
    return;
  }
  if (confirm('确定要清空购物车吗？')) {
    cart = [];
    Storage.clearCart();
    updateCartDisplay();
    renderDishes(currentCategory);
  }
}

// 切换购物车面板
function toggleCartPanel() {
  const panel = document.getElementById('cartPanel');
  panel.classList.toggle('hidden');
}

// 提交订单
function submitOrder() {
  if (cart.length === 0) {
    alert('购物车是空的，请先选择菜品');
    return;
  }

  // 显示订单确认弹窗
  showOrderModal();
}

// 显示订单确认弹窗
function showOrderModal() {
  const modal = document.getElementById('orderModal');
  const tableNumber = Storage.getCurrentTable();
  const now = new Date();
  const timeStr = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')} ${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;

  document.getElementById('modalTableNumber').textContent = tableNumber + '号桌';
  document.getElementById('modalTime').textContent = timeStr;

  // 渲染菜品清单
  const dishesList = document.getElementById('modalDishesList');
  dishesList.innerHTML = '';
  cart.forEach(item => {
    const div = document.createElement('div');
    div.className = 'flex justify-between items-center py-2 border-b';
    div.innerHTML = `
      <div class="flex-1">
        <span class="font-medium">${item.name}</span>
        <span class="text-gray-500 ml-2">x${item.quantity}</span>
      </div>
      <div class="text-amber-600 font-medium">¥${(item.price * item.quantity).toFixed(0)}</div>
    `;
    dishesList.appendChild(div);
  });

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  document.getElementById('modalTotal').textContent = totalPrice.toFixed(0);

  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

// 关闭订单确认弹窗
function closeOrderModal() {
  const modal = document.getElementById('orderModal');
  modal.classList.add('hidden');
  modal.classList.remove('flex');
  document.getElementById('orderNote').value = '';
}

// 确认订单
function confirmOrder() {
  const tableNumber = Storage.getCurrentTable();
  const note = document.getElementById('orderNote').value.trim();
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const order = {
    id: Date.now(),
    tableNumber: parseInt(tableNumber),
    dishes: [...cart],
    totalPrice: totalPrice,
    note: note,
    status: '待上菜',
    createTime: new Date().toISOString(),
    updateTime: new Date().toISOString()
  };

  Storage.addOrder(order);

  // 清空购物车
  cart = [];
  Storage.clearCart();
  updateCartDisplay();
  renderDishes(currentCategory);

  closeOrderModal();

  alert('订单提交成功！');
}

// 查看本桌订单
function viewOrders() {
  window.location.href = 'orders.html';
}

// 返回选桌页
function goBack() {
  if (cart.length > 0) {
    if (confirm('购物车中还有未提交的菜品，确定要返回吗？')) {
      window.location.href = 'index.html';
    }
  } else {
    window.location.href = 'index.html';
  }
}
