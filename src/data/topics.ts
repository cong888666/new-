export interface Quiz {
  question: string;
  options: string[];
  answer: number;
  explanation: string;
}

export interface Topic {
  id: number;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  icon: string;
  color: string;
  prerequisites: string[];
  learningObjectives: string[];
  theory: string;
  code: string;
  businessCase: string;
  exercises: string[];
  quizzes: Quiz[];
}

export const topics: Topic[] = [
  {
    id: 1,
    title: "Python基础",
    description: "数据分析必备的Python语法",
    difficulty: "beginner",
    icon: "code",
    color: "from-blue-500 to-blue-600",
    prerequisites: [],
    learningObjectives: [
      "认识Python语言，熟悉在线代码编辑器使用",
      "掌握Python基础语法、常用数据类型",
      "学会编写简单业务代码"
    ],
    theory: `# Python基础
## 变量和数据类型
- 整数、浮点数、字符串、布尔值
- 列表、字典、元组、集合

## 流程控制
- if-elif-else条件判断
- for循环和while循环

## 函数
- def定义函数
- 参数和返回值
- 模块导入
`,
    code: `# Python基础练习
customer_name = "客户张三"
order_num = 15
order_money = 1299.5
is_vip = True

print("客户信息:")
print(f"姓名: {customer_name}")
print(f"订单数: {order_num}")
print(f"消费金额: {order_money}")
print(f"是否VIP: {is_vip}")

week_sales = [230, 450, 320, 670, 510, 420, 380]
avg_sale = sum(week_sales) / len(week_sales)
print(f"周平均销售额: {avg_sale:.2f}")

def calculate_total(sales):
    total = sum(sales)
    return total

total = calculate_total(week_sales)
print(f"周总销售额: {total}")
`,
    businessCase: `# 业务案例
电商平台需要批量存储客户信息、统计每日销售额
`,
    exercises: [
      "存储5位客户的姓名和消费金额",
      "编写函数计算总消费额",
      "使用循环打印每位客户信息"
    ],
    quizzes: [
      {
        question: "Python中存储键值对的数据结构是？",
        options: ["列表", "字典", "元组", "集合"],
        answer: 1,
        explanation: "字典用{}表示，适合存储结构化数据如客户信息"
      },
      {
        question: "定义函数使用什么关键字？",
        options: ["function", "def", "func", "define"],
        answer: 1,
        explanation: "Python使用def关键字定义函数"
      },
      {
        question: "列表索引从多少开始？",
        options: ["1", "0", "-1", "任意数"],
        answer: 1,
        explanation: "Python列表索引从0开始"
      }
    ]
  },
  {
    id: 2,
    title: "数据清洗",
    description: "处理缺失值、异常值、重复值",
    difficulty: "beginner",
    icon: "sparkles",
    color: "from-emerald-500 to-emerald-600",
    prerequisites: ["Python基础"],
    learningObjectives: [
      "理解脏数据的类型和危害",
      "掌握Pandas基础操作",
      "学会处理缺失值、重复值、异常值"
    ],
    theory: `# 数据清洗
## 常见脏数据类型
- 缺失值
- 重复值
- 异常值
- 格式混乱数据

## Pandas操作
- 读取数据
- 查看信息
- 数据处理
`,
    code: `import pandas as pd

# 模拟数据
data = {
    '订单号': [101, 102, 103, 102, 104, 105],
    '销售额': [200, None, 560, 320, 9999, 480],
    '客户名': ['张三', '李四', '王五', '李四', '赵六', None]
}

df = pd.DataFrame(data)
print("原始数据:")
print(df)

# 查看缺失值
print("缺失值统计:")
print(df.isnull().sum())

# 处理缺失值
df['销售额'].fillna(df['销售额'].mean(), inplace=True)
df.dropna(subset=['客户名'], inplace=True)

# 删除重复值
df.drop_duplicates(inplace=True)

# 筛选正常销售额
df = df[(df['销售额'] > 0) & (df['销售额'] < 2000)]

print("处理后数据:")
print(df)
`,
    businessCase: `# 业务案例
电商订单数据清洗，剔除异常订单，确保分析数据准确
`,
    exercises: [
      "模拟数据并添加缺失值和重复值",
      "使用均值填充缺失值",
      "设置合理阈值剔除异常值"
    ],
    quizzes: [
      {
        question: "Pandas中检测缺失值用什么方法？",
        options: ["isnull()", "empty()", "missing()", "nan()"],
        answer: 0,
        explanation: "isnull()方法用于检测缺失值"
      },
      {
        question: "删除重复值用什么方法？",
        options: ["remove_duplicates()", "drop_duplicates()", "delete_duplicates()", "clear_duplicates()"],
        answer: 1,
        explanation: "drop_duplicates()用于删除重复数据"
      }
    ]
  },
  {
    id: 3,
    title: "数据可视化",
    description: "Matplotlib图表绘制",
    difficulty: "intermediate",
    icon: "bar-chart-2",
    color: "from-purple-500 to-purple-600",
    prerequisites: ["Python基础", "Pandas"],
    learningObjectives: [
      "掌握图表选型规则",
      "学会绘制柱状图、折线图、饼图",
      "能够将数据转化为可视化图表"
    ],
    theory: `# 数据可视化
## 图表选型
- 柱状图：对比不同分类
- 折线图：展示时间趋势
- 饼图：展示占比关系
- 散点图：展示相关性
`,
    code: `import matplotlib.pyplot as plt

# 柱状图 - 各品类月度销售额
categories = ['Fushi', 'Meizhuang', 'Shipin', 'Jiadian']
sales = [1200, 890, 1500, 600]

plt.figure(figsize=(10, 6))
plt.bar(categories, sales, color='#4472C4')
plt.title('Monthly Sales by Category')
plt.xlabel('Category')
plt.ylabel('Sales')
for i, v in enumerate(sales):
    plt.text(i, v + 20, str(v), ha='center')
plt.show()

print("柱状图绘制完成！")
`,
    businessCase: `# 业务案例
制作月度销售对比图，用于业务汇报和决策支持
`,
    exercises: [
      "用折线图绘制一周销售额趋势",
      "用饼图展示客户分层占比",
      "为图表添加标题和标签"
    ],
    quizzes: [
      {
        question: "对比不同分类的数据用什么图表？",
        options: ["折线图", "饼图", "柱状图", "散点图"],
        answer: 2,
        explanation: "柱状图适合对比不同分类的数据"
      },
      {
        question: "展示随时间变化的趋势用什么图表？",
        options: ["柱状图", "折线图", "饼图", "散点图"],
        answer: 1,
        explanation: "折线图适合展示时间维度的趋势变化"
      }
    ]
  },
  {
    id: 4,
    title: "统计分析",
    description: "描述性统计和假设检验",
    difficulty: "intermediate",
    icon: "trending-up",
    color: "from-orange-500 to-orange-600",
    prerequisites: ["Python基础", "Pandas"],
    learningObjectives: [
      "理解统计指标含义",
      "掌握描述性统计",
      "学会相关性分析"
    ],
    theory: `# 统计分析
## 核心指标
- 均值、中位数、众数
- 方差、标准差
- 相关系数
`,
    code: `import pandas as pd
import numpy as np
from scipy import stats

# 模拟销售数据
shop_a = [320, 350, 310, 380, 360, 340, 370]
shop_b = [280, 290, 300, 270, 260, 285, 295]

print("店铺A数据:")
print(f"均值: {np.mean(shop_a):.2f}")
print(f"中位数: {np.median(shop_a):.2f}")
print(f"标准差: {np.std(shop_a):.2f}")

print("\\n店铺B数据:")
print(f"均值: {np.mean(shop_b):.2f}")
print(f"中位数: {np.median(shop_b):.2f}")
print(f"标准差: {np.std(shop_b):.2f}")

# t检验
t_stat, p_val = stats.ttest_ind(shop_a, shop_b)
print(f"\\nt检验结果:")
print(f"t值: {t_stat:.4f}")
print(f"p值: {p_val:.6f}")

if p_val < 0.05:
    print("结论: 两家店铺销售额存在显著差异")
else:
    print("结论: 两家店铺销售额无显著差异")
`,
    businessCase: `# 业务案例
对比两家店铺销售数据，评估营销活动效果
`,
    exercises: [
      "计算一组销售数据的统计指标",
      "对比两组数据是否有显著差异",
      "分析两个指标的相关性"
    ],
    quizzes: [
      {
        question: "不受极端值影响的指标是？",
        options: ["均值", "中位数", "总和", "最大值"],
        answer: 1,
        explanation: "中位数不受极端值影响，更能代表典型水平"
      },
      {
        question: "p值小于0.05通常表示？",
        options: ["两组数据完全相同", "两组数据有显著差异", "统计检验失败", "数据有误"],
        answer: 1,
        explanation: "p值小于0.05通常表示拒绝原假设，认为差异显著"
      }
    ]
  },
  {
    id: 5,
    title: "客户分群",
    description: "K-means聚类分析",
    difficulty: "advanced",
    icon: "users",
    color: "from-indigo-500 to-indigo-600",
    prerequisites: ["统计分析", "Pandas"],
    learningObjectives: [
      "理解聚类算法概念",
      "掌握K-means算法应用",
      "学会客户分群和业务标签"
    ],
    theory: `# 客户分群
## K-means算法
- 随机选择中心点
- 计算距离并分配
- 更新中心点
- 迭代至收敛
`,
    code: `import pandas as pd
import numpy as np
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler

# 模拟客户数据
np.random.seed(42)
customer_data = pd.DataFrame({
    '消费频次': np.random.randint(1, 50, 50),
    '客单价': np.random.randint(100, 2000, 50),
    '活跃度': np.random.randint(1, 100, 50)
})

print("原始客户数据（前10条）:")
print(customer_data.head(10))

# 数据标准化
scaler = StandardScaler()
data_scaled = scaler.fit_transform(customer_data)

# K-means聚类
kmeans = KMeans(n_clusters=3, random_state=42)
customer_data['客户分组'] = kmeans.fit_predict(data_scaled)

print("\\n分群结果统计:")
group_stats = customer_data.groupby('客户分组').agg({
    '消费频次': 'mean',
    '客单价': 'mean',
    '活跃度': 'mean'
}).round(2)

print(group_stats)

# 给客户打标签
def get_label(row):
    if row['客户分组'] == 0:
        return '高价值客户'
    elif row['客户分组'] == 1:
        return '潜力客户'
    else:
        return '普通客户'

customer_data['客户标签'] = customer_data.apply(get_label, axis=1)

print("\\n客户标签分布:")
print(customer_data['客户标签'].value_counts())
`,
    businessCase: `# 业务案例
对客户进行分层，为不同群体制定差异化营销策略
`,
    exercises: [
      "准备客户特征数据",
      "选择合适的聚类数量",
      "为每个群体定义业务标签"
    ],
    quizzes: [
      {
        question: "K-means中K代表什么？",
        options: ["特征数量", "数据点数量", "聚类数量", "迭代次数"],
        answer: 2,
        explanation: "K代表想要分成多少个簇，即聚类数量"
      },
      {
        question: "聚类前为什么要标准化？",
        options: ["为了加快运算速度", "消除不同指标的量纲影响", "让数据更美观", "必须步骤否则报错"],
        answer: 1,
        explanation: "不同指标的数值范围不同，标准化可以消除量纲影响，让各指标权重相当"
      }
    ]
  }
];
