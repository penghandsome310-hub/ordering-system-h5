/**
 * 商家后台管理页面业务逻辑
 */

let currentTab = 'dishes'; // 当前标签页
let currentDishFilter = '全部'; // 当前菜品筛选
let currentOrderFilter = '全部'; // 当前订单筛选
let editingDishId = null; // 正在编辑的菜品ID

document.addEventListener('DOMContentLoaded', function() {
  // 初始化数据
  Storage.initData(DISHES_DATA);

  // 默认显示菜品管理
  switchTab('dishes');

  // 表单提交事件
  document.getElementById('dishForm').addEventListener('submit', saveDish);
});

// 切换标签页
function switchTab(tab) {
  currentTab = tab;

  // 更新标签按钮状态
  document.getElementById('dishesTab').classList.toggle('active', tab === 'dishes');
  document.getElementById('ordersTab').classList.toggle('active', tab === 'orders');

  // 显示/隐藏对应区域
  document.getElementById('dishesSection').classList.toggle('hidden', tab !== 'dishes');
  document.getElementById('ordersSection').classList.toggle('hidden', tab !== 'orders');

  // 加载数据
  if (tab === 'dishes') {
    loadDishes();
  } else {
    loadOrders();
  }
}

// ============ 菜品管理 ============

// 加载菜品列表
function loadDishes() {
  const dishes = Storage.getDishes();
  let filteredDishes = dishes;

  if (currentDishFilter !== '全部') {
    filteredDishes = dishes.filter(dish => dish.category === currentDishFilter);
  }

  const table = document.getElementById('dishesTable');

  if (filteredDishes.length === 0) {
    table.innerHTML = '<div class="p-8 text-center text-gray-500">暂无菜品</div>';
    return;
  }

  let html = `
    <table class="w-full">
      <thead class="bg-gray-50">
        <tr>
          <th class="px-6 py-4 text-left text-sm font-bold text-gray-700">图片</th>
          <th class="px-6 py-4 text-left text-sm font-bold text-gray-700">菜品名称</th>
          <th class="px-6 py-4 text-left text-sm font-bold text-gray-700">菜系</th>
          <th class="px-6 py-4 text-left text-sm font-bold text-gray-700">价格</th>
          <th class="px-6 py-4 text-left text-sm font-bold text-gray-700">标签</th>
          <th class="px-6 py-4 text-left text-sm font-bold text-gray-700">辣度</th>
          <th class="px-6 py-4 text-center text-sm font-bold text-gray-700">操作</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-100">
  `;

  filteredDishes.forEach(dish => {
    const spicyIcons = ['不辣', '🌶️ 微辣', '🌶️🌶️ 中辣', '🌶️🌶️🌶️ 特辣'];
    const tagsHtml = dish.tags.map(tag => {
      let color = 'bg-gray-100 text-gray-600';
      if (tag === '招牌') color = 'bg-red-100 text-red-600';
      if (tag === '特辣') color = 'bg-red-100 text-red-600';
      if (tag === '微辣') color = 'bg-orange-100 text-orange-600';
      if (tag === '素食') color = 'bg-green-100 text-green-600';
      return `<span class="px-2 py-1 rounded-full text-xs font-medium ${color}">${tag}</span>`;
    }).join(' ');

    html += `
      <tr class="hover:bg-gray-50">
        <td class="px-6 py-4">
          <img src="${dish.image}" alt="${dish.name}" class="w-16 h-16 rounded-lg object-cover">
        </td>
        <td class="px-6 py-4">
          <div class="font-medium text-gray-800">${dish.name}</div>
          <div class="text-sm text-gray-500 line-clamp-1">${dish.description}</div>
        </td>
        <td class="px-6 py-4 text-gray-700">${dish.category}</td>
        <td class="px-6 py-4 text-amber-600 font-bold">¥${dish.price}</td>
        <td class="px-6 py-4">${tagsHtml || '-'}</td>
        <td class="px-6 py-4 text-gray-700">${spicyIcons[dish.spicy]}</td>
        <td class="px-6 py-4 text-center">
          <button onclick="editDish(${dish.id})" class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium mr-2">
            编辑
          </button>
          <button onclick="deleteDish(${dish.id})" class="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-medium">
            删除
          </button>
        </td>
      </tr>
    `;
  });

  html += `</tbody></table>`;
  table.innerHTML = html;
}

// 筛选菜品
function filterDishes(category) {
  currentDishFilter = category;

  // 更新筛选按钮状态
  const buttons = document.querySelectorAll('.filter-btn');
  buttons.forEach(btn => {
    if (btn.textContent === category) {
      btn.className = 'filter-btn px-4 py-2 rounded-lg bg-amber-500 text-white font-medium';
    } else {
      btn.className = 'filter-btn px-4 py-2 rounded-lg bg-white hover:bg-gray-100';
    }
  });

  loadDishes();
}

// 显示添加菜品弹窗
function showAddDishModal() {
  editingDishId = null;
  document.getElementById('dishModalTitle').textContent = '添加菜品';
  document.getElementById('dishForm').reset();
  document.getElementById('dishModal').classList.remove('hidden');
  document.getElementById('dishModal').classList.add('flex');
}

// 编辑菜品
function editDish(dishId) {
  const dishes = Storage.getDishes();
  const dish = dishes.find(d => d.id === dishId);
  if (!dish) return;

  editingDishId = dishId;
  document.getElementById('dishModalTitle').textContent = '编辑菜品';

  // 填充表单
  document.getElementById('dishId').value = dish.id;
  document.getElementById('dishName').value = dish.name;
  document.getElementById('dishCategory').value = dish.category;
  document.getElementById('dishPrice').value = dish.price;
  document.getElementById('dishImage').value = dish.image;
  document.getElementById('dishDescription').value = dish.description;
  document.getElementById('dishSpicy').value = dish.spicy;

  // 标签复选框
  const checkboxes = document.querySelectorAll('.dish-tag');
  checkboxes.forEach(cb => {
    cb.checked = dish.tags.includes(cb.value);
  });

  document.getElementById('dishModal').classList.remove('hidden');
  document.getElementById('dishModal').classList.add('flex');
}

// 关闭菜品弹窗
function closeDishModal() {
  document.getElementById('dishModal').classList.add('hidden');
  document.getElementById('dishModal').classList.remove('flex');
  editingDishId = null;
}

// 保存菜品
function saveDish(e) {
  e.preventDefault();

  const dishes = Storage.getDishes();

  // 获取选中的标签
  const tags = [];
  document.querySelectorAll('.dish-tag:checked').forEach(cb => {
    tags.push(cb.value);
  });

  const dishData = {
    name: document.getElementById('dishName').value.trim(),
    category: document.getElementById('dishCategory').value,
    price: parseInt(document.getElementById('dishPrice').value),
    image: document.getElementById('dishImage').value.trim(),
    description: document.getElementById('dishDescription').value.trim(),
    spicy: parseInt(document.getElementById('dishSpicy').value),
    tags: tags
  };

  if (editingDishId) {
    // 编辑现有菜品
    const index = dishes.findIndex(d => d.id === editingDishId);
    if (index !== -1) {
      dishes[index] = { ...dishes[index], ...dishData };
    }
  } else {
    // 添加新菜品
    const newId = Math.max(...dishes.map(d => d.id), 0) + 1;
    dishes.push({ id: newId, ...dishData });
  }

  Storage.saveDishes(dishes);
  closeDishModal();
  loadDishes();
  alert('保存成功！');
}

// 删除菜品
function deleteDish(dishId) {
  if (!confirm('确定要删除这道菜品吗？')) return;

  const dishes = Storage.getDishes();
  const filteredDishes = dishes.filter(d => d.id !== dishId);
  Storage.saveDishes(filteredDishes);
  loadDishes();
  alert('删除成功！');
}

// ============ 订单管理 ============

// 加载订单列表
function loadOrders() {
  let orders = Storage.getOrders();

  if (currentOrderFilter !== '全部') {
    orders = orders.filter(order => order.status === currentOrderFilter);
  }

  const container = document.getElementById('ordersTable');

  if (orders.length === 0) {
    container.innerHTML = '<div class="bg-white rounded-2xl p-8 text-center text-gray-500">暂无订单</div>';
    return;
  }

  // 按时间倒序排列
  const sortedOrders = [...orders].sort((a, b) => new Date(b.createTime) - new Date(a.createTime));

  container.innerHTML = '';
  sortedOrders.forEach(order => {
    const orderCard = createOrderCard(order);
    container.appendChild(orderCard);
  });
}

// 创建订单卡片
function createOrderCard(order) {
  const card = document.createElement('div');
  card.className = 'bg-white rounded-2xl shadow-lg overflow-hidden';

  // 格式化时间
  const createTime = new Date(order.createTime);
  const timeStr = `${createTime.getFullYear()}-${String(createTime.getMonth()+1).padStart(2,'0')}-${String(createTime.getDate()).padStart(2,'0')} ${String(createTime.getHours()).padStart(2,'0')}:${String(createTime.getMinutes()).padStart(2,'0')}`;

  const statusClass = `status-${order.status}`;

  card.innerHTML = `
    <div class="p-6">
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center gap-6">
          <div>
            <div class="text-sm text-gray-500">订单编号</div>
            <div class="text-lg font-bold text-gray-800">#${order.id}</div>
          </div>
          <div>
            <div class="text-sm text-gray-500">桌号</div>
            <div class="text-2xl font-bold text-amber-600">${order.tableNumber}号桌</div>
          </div>
          <div>
            <div class="text-sm text-gray-500">下单时间</div>
            <div class="text-gray-700">${timeStr}</div>
          </div>
        </div>
        <div class="flex items-center gap-4">
          <span class="status-badge ${statusClass}">${order.status}</span>
          <div class="flex gap-2">
            ${order.status === '待上菜' ? `
              <button onclick="updateOrderStatus(${order.id}, '已上菜')" class="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium">
                标记已上菜
              </button>
            ` : ''}
            ${order.status === '已上菜' ? `
              <button onclick="updateOrderStatus(${order.id}, '已结账')" class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium">
                标记已结账
              </button>
            ` : ''}
          </div>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div>
          <div class="text-sm font-medium text-gray-700 mb-2">菜品清单</div>
          <div class="space-y-1">
            ${order.dishes.map(dish => `
              <div class="text-gray-600">${dish.name} x ${dish.quantity} = ¥${(dish.price * dish.quantity).toFixed(0)}</div>
            `).join('')}
          </div>
        </div>
        <div>
          ${order.note ? `
            <div class="mb-3">
              <div class="text-sm font-medium text-gray-700 mb-1">备注</div>
              <div class="text-gray-600 p-2 bg-amber-50 rounded">${order.note}</div>
            </div>
          ` : ''}
          <div class="text-right">
            <div class="text-sm text-gray-500">订单总额</div>
            <div class="text-3xl font-bold text-amber-600">¥${order.totalPrice.toFixed(0)}</div>
          </div>
        </div>
      </div>
    </div>
  `;

  return card;
}

// 筛选订单
function filterOrders(status) {
  currentOrderFilter = status;

  // 更新筛选按钮状态
  const buttons = document.querySelectorAll('.order-filter-btn');
  buttons.forEach(btn => {
    if (btn.textContent === status) {
      btn.className = 'order-filter-btn px-6 py-2 rounded-lg bg-amber-500 text-white font-medium';
    } else {
      btn.className = 'order-filter-btn px-6 py-2 rounded-lg bg-white hover:bg-gray-100';
    }
  });

  loadOrders();
}

// 更新订单状态
function updateOrderStatus(orderId, newStatus) {
  Storage.updateOrderStatus(orderId, newStatus);
  loadOrders();
  alert('订单状态已更新！');
}

// 返回首页
function goBack() {
  window.location.href = 'index.html';
}
