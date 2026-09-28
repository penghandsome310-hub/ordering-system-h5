/**
 * 菜品初始数据
 * 包含11个菜系：豫菜、鲁菜、川菜、粤菜、苏菜、浙菜、闽菜、湘菜、徽菜、主食、饮品
 */

const DISHES_DATA = [
  // 豫菜
  {
    id: 1,
    name: '糖醋黄河鲤鱼',
    category: '豫菜',
    price: 88,
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400',
    description: '黄河鲤鱼，色泽金黄，外焦里嫩，酸甜适口',
    tags: ['招牌', '微辣'],
    spicy: 1
  },
  {
    id: 2,
    name: '开封灌汤包',
    category: '豫菜',
    price: 38,
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400',
    description: '皮薄馅大，灌汤流油，鲜香四溢',
    tags: ['招牌'],
    spicy: 0
  },
  {
    id: 3,
    name: '烩面',
    category: '豫菜',
    price: 28,
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400',
    description: '汤鲜味美，面筋道，羊肉酥烂',
    tags: [],
    spicy: 0
  },

  // 鲁菜
  {
    id: 4,
    name: '九转大肠',
    category: '鲁菜',
    price: 68,
    image: 'https://images.unsplash.com/photo-1582169296194-e4d644c48063?w=400',
    description: '酸甜咸辣香五味俱全，口感软嫩',
    tags: ['招牌', '微辣'],
    spicy: 1
  },
  {
    id: 5,
    name: '葱烧海参',
    category: '鲁菜',
    price: 188,
    image: 'https://images.unsplash.com/photo-1559847844-5315695dadae?w=400',
    description: '海参软糯，葱香浓郁，营养丰富',
    tags: ['招牌'],
    spicy: 0
  },
  {
    id: 6,
    name: '德州扒鸡',
    category: '鲁菜',
    price: 58,
    image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400',
    description: '肉烂脱骨，色泽红润，香气扑鼻',
    tags: [],
    spicy: 0
  },

  // 川菜
  {
    id: 7,
    name: '宫保鸡丁',
    category: '川菜',
    price: 48,
    image: 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=400',
    description: '鸡肉鲜嫩，花生酥脆，酸辣开胃',
    tags: ['招牌', '特辣'],
    spicy: 3
  },
  {
    id: 8,
    name: '麻婆豆腐',
    category: '川菜',
    price: 32,
    image: 'https://images.unsplash.com/photo-1581006852262-e4307cf6283a?w=400',
    description: '麻辣鲜香，豆腐嫩滑，下饭神器',
    tags: ['特辣', '素食'],
    spicy: 3
  },
  {
    id: 9,
    name: '水煮鱼',
    category: '川菜',
    price: 78,
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400',
    description: '鱼片嫩滑，麻辣鲜香，油而不腻',
    tags: ['招牌', '特辣'],
    spicy: 3
  },
  {
    id: 10,
    name: '回锅肉',
    category: '川菜',
    price: 42,
    image: 'https://images.unsplash.com/photo-1626804475297-41608ea09aeb?w=400',
    description: '肥而不腻，香气浓郁，经典川味',
    tags: ['微辣'],
    spicy: 1
  },

  // 粤菜
  {
    id: 11,
    name: '白切鸡',
    category: '粤菜',
    price: 68,
    image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400',
    description: '皮爽肉滑，保持原味，清淡鲜美',
    tags: ['招牌'],
    spicy: 0
  },
  {
    id: 12,
    name: '烧鹅',
    category: '粤菜',
    price: 98,
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=400',
    description: '皮脆肉嫩，色泽金红，香味四溢',
    tags: ['招牌'],
    spicy: 0
  },
  {
    id: 13,
    name: '虾饺',
    category: '粤菜',
    price: 38,
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400',
    description: '皮薄馅鲜，晶莹剔透，鲜虾饱满',
    tags: [],
    spicy: 0
  },
  {
    id: 14,
    name: '叉烧',
    category: '粤菜',
    price: 58,
    image: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=400',
    description: '色泽红亮，肉质软嫩，甜而不腻',
    tags: [],
    spicy: 0
  },

  // 苏菜
  {
    id: 15,
    name: '松鼠鳜鱼',
    category: '苏菜',
    price: 108,
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400',
    description: '造型生动，外脆里嫩，酸甜可口',
    tags: ['招牌'],
    spicy: 0
  },
  {
    id: 16,
    name: '蟹粉狮子头',
    category: '苏菜',
    price: 88,
    image: 'https://images.unsplash.com/photo-1582169296194-e4d644c48063?w=400',
    description: '肉质细腻，蟹香浓郁，入口即化',
    tags: ['招牌'],
    spicy: 0
  },
  {
    id: 17,
    name: '盐水鸭',
    category: '苏菜',
    price: 58,
    image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400',
    description: '皮白肉嫩，肥而不腻，鲜香美味',
    tags: [],
    spicy: 0
  },

  // 浙菜
  {
    id: 18,
    name: '东坡肉',
    category: '浙菜',
    price: 68,
    image: 'https://images.unsplash.com/photo-1626804475297-41608ea09aeb?w=400',
    description: '色泽红亮，酥烂而形不碎，香糯不腻',
    tags: ['招牌'],
    spicy: 0
  },
  {
    id: 19,
    name: '西湖醋鱼',
    category: '浙菜',
    price: 88,
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400',
    description: '肉质鲜嫩，酸甜适口，别具风味',
    tags: ['招牌'],
    spicy: 0
  },
  {
    id: 20,
    name: '龙井虾仁',
    category: '浙菜',
    price: 78,
    image: 'https://images.unsplash.com/photo-1559847844-5315695dadae?w=400',
    description: '虾仁鲜嫩，茶香清雅，色泽淡雅',
    tags: [],
    spicy: 0
  },

  // 闽菜
  {
    id: 21,
    name: '佛跳墙',
    category: '闽菜',
    price: 288,
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400',
    description: '料多味浓，荤香四溢，营养丰富',
    tags: ['招牌'],
    spicy: 0
  },
  {
    id: 22,
    name: '荔枝肉',
    category: '闽菜',
    price: 48,
    image: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=400',
    description: '酸甜适口，形似荔枝，风味独特',
    tags: [],
    spicy: 0
  },
  {
    id: 23,
    name: '醉排骨',
    category: '闽菜',
    price: 58,
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400',
    description: '酒香浓郁，肉质酥嫩，回味无穷',
    tags: [],
    spicy: 0
  },

  // 湘菜
  {
    id: 24,
    name: '剁椒鱼头',
    category: '湘菜',
    price: 88,
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400',
    description: '鱼肉细嫩，剁椒鲜辣，汁浓味美',
    tags: ['招牌', '特辣'],
    spicy: 3
  },
  {
    id: 25,
    name: '毛氏红烧肉',
    category: '湘菜',
    price: 58,
    image: 'https://images.unsplash.com/photo-1626804475297-41608ea09aeb?w=400',
    description: '色泽红亮，肥而不腻，软糯香甜',
    tags: ['招牌'],
    spicy: 0
  },
  {
    id: 26,
    name: '辣椒炒肉',
    category: '湘菜',
    price: 38,
    image: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=400',
    description: '辣味十足，肉香四溢，下饭佳品',
    tags: ['特辣'],
    spicy: 3
  },

  // 徽菜
  {
    id: 27,
    name: '臭鳜鱼',
    category: '徽菜',
    price: 98,
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400',
    description: '闻起来臭，吃起来香，肉质鲜嫩',
    tags: ['招牌'],
    spicy: 0
  },
  {
    id: 28,
    name: '黄山炖鸽',
    category: '徽菜',
    price: 78,
    image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400',
    description: '汤清味鲜，肉质细嫩，营养滋补',
    tags: [],
    spicy: 0
  },
  {
    id: 29,
    name: '徽州毛豆腐',
    category: '徽菜',
    price: 32,
    image: 'https://images.unsplash.com/photo-1581006852262-e4307cf6283a?w=400',
    description: '外酥里嫩，鲜而不腻，风味独特',
    tags: ['素食'],
    spicy: 0
  },

  // 主食
  {
    id: 30,
    name: '扬州炒饭',
    category: '主食',
    price: 28,
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400',
    description: '粒粒分明，色泽金黄，配料丰富',
    tags: [],
    spicy: 0
  },
  {
    id: 31,
    name: '手工水饺',
    category: '主食',
    price: 25,
    image: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=400',
    description: '皮薄馅大，鲜香可口，现包现煮',
    tags: [],
    spicy: 0
  },
  {
    id: 32,
    name: '葱油拌面',
    category: '主食',
    price: 18,
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400',
    description: '葱香浓郁，面条劲道，简单美味',
    tags: [],
    spicy: 0
  },
  {
    id: 33,
    name: '小笼包',
    category: '主食',
    price: 22,
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400',
    description: '皮薄汁多，鲜香扑鼻，轻咬一口满口香',
    tags: [],
    spicy: 0
  },

  // 饮品
  {
    id: 34,
    name: '鲜榨西瓜汁',
    category: '饮品',
    price: 18,
    image: 'https://images.unsplash.com/photo-1546548970-71785318a17b?w=400',
    description: '清凉解渴，香甜可口，现榨鲜饮',
    tags: [],
    spicy: 0
  },
  {
    id: 35,
    name: '酸梅汤',
    category: '饮品',
    price: 15,
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400',
    description: '酸甜适口，生津止渴，传统饮品',
    tags: [],
    spicy: 0
  },
  {
    id: 36,
    name: '鲜榨橙汁',
    category: '饮品',
    price: 20,
    image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400',
    description: '维C丰富，酸甜可口，健康营养',
    tags: [],
    spicy: 0
  },
  {
    id: 37,
    name: '冰糖雪梨',
    category: '饮品',
    price: 16,
    image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400',
    description: '润肺止咳，清甜养生，滋润身心',
    tags: [],
    spicy: 0
  },
  {
    id: 38,
    name: '柠檬薄荷水',
    category: '饮品',
    price: 12,
    image: 'https://images.unsplash.com/photo-1523677011781-c91d1bbe2f0f?w=400',
    description: '清新提神，酸爽解腻，夏日必备',
    tags: [],
    spicy: 0
  }
];
