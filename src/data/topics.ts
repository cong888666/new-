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
import numpy as np

# 柱状图 - 各品类月度销售额
categories = ['Fushi', 'Meizhuang', 'Shipin', 'Jiadian']
sales = [1200, 890, 1500, 600]

# 创建图表
plt.figure(figsize=(8, 5))
plt.bar(categories, sales, color='#4472C4')
plt.title('Monthly Sales by Category')
plt.xlabel('Category')
plt.ylabel('Sales')

# 添加数值标签
for i, v in enumerate(sales):
    plt.text(i, v + 30, str(v), ha='center')

plt.tight_layout()

print("图表已生成！")
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
  },
  {
    id: 6,
    title: "Excel数据分析",
    description: "Pandas批量处理表格数据",
    difficulty: "intermediate",
    icon: "file-spreadsheet",
    color: "from-green-500 to-green-600",
    prerequisites: ["Python基础", "数据清洗"],
    learningObjectives: [
      "掌握Excel文件读写",
      "学会数据筛选和排序",
      "掌握数据透视表功能",
      "学会多表关联和合并"
    ],
    theory: `# Excel数据分析
## Pandas Excel操作
- pd.read_excel() 读取
- df.to_excel() 写入
- 指定工作表
## 数据处理
- 筛选数据
- 排序数据
- 数据透视表
## 多表关联
- pd.concat() 拼接
- pd.merge() 关联
`,
    code: `import pandas as pd

# 模拟销售数据
data = {
    '月份': [1, 1, 1, 2, 2, 2, 3, 3, 3],
    '品类': ['服饰', '美妆', '食品', '服饰', '美妆', '食品', '服饰', '美妆', '食品'],
    '门店': ['A店', 'A店', 'A店', 'A店', 'A店', 'A店', 'A店', 'A店', 'A店'],
    '销售额': [1200, 890, 1500, 1300, 950, 1600, 1400, 1000, 1700]
}

df = pd.DataFrame(data)
print("原始销售数据:")
print(df)

# 数据筛选 - 只看服饰品类
print("\\n服饰品类数据:")
clothing_data = df[df['品类'] == '服饰']
print(clothing_data)

# 数据排序 - 按销售额降序
print("\\n按销售额降序排序:")
sorted_data = df.sort_values('销售额', ascending=False)
print(sorted_data)

# 数据透视表 - 按月份和品类统计
print("\\n数据透视表 - 月度品类销售:")
pivot_table = pd.pivot_table(
    df,
    values='销售额',
    index='月份',
    columns='品类',
    aggfunc='sum'
)
print(pivot_table)

# 统计汇总
print("\\n总销售额:", df['销售额'].sum())
print("平均单月销售额:", df['销售额'].mean())
`,
    businessCase: `# 业务案例
电商月度销售数据分析，生成数据透视表用于汇报
`,
    exercises: [
      "读取Excel文件并查看数据",
      "按条件筛选数据",
      "创建数据透视表",
      "合并多个表格数据"
    ],
    quizzes: [
      {
        question: "Pandas读取Excel文件用什么方法？",
        options: ["read_csv()", "read_excel()", "load_excel()", "open_excel()"],
        answer: 1,
        explanation: "pd.read_excel()用于读取Excel文件"
      },
      {
        question: "创建数据透视表用什么方法？",
        options: ["pivot()", "pivot_table()", "table()", "summary()"],
        answer: 1,
        explanation: "pd.pivot_table()用于创建数据透视表"
      }
    ]
  },
  {
    id: 7,
    title: "机器学习入门",
    description: "回归与分类算法",
    difficulty: "advanced",
    icon: "brain",
    color: "from-pink-500 to-pink-600",
    prerequisites: ["统计分析", "Pandas"],
    learningObjectives: [
      "理解监督学习概念",
      "掌握线性回归算法",
      "掌握逻辑回归算法",
      "学会模型评估方法"
    ],
    theory: `# 机器学习入门
## 监督学习
- 回归：预测连续值
- 分类：预测类别
## 核心概念
- 特征（X）
- 标签（y）
- 训练集/测试集
## 常用算法
- 线性回归
- 逻辑回归
`,
    code: `import numpy as np
import pandas as pd
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, r2_score

# 模拟数据 - 广告投入 vs 销售额
np.random.seed(42)
ad_cost = np.linspace(10, 100, 50).reshape(-1, 1)
sales = 50 + 15 * ad_cost.flatten() + np.random.normal(0, 30, 50)

data = pd.DataFrame({
    '广告投入': ad_cost.flatten(),
    '销售额': sales
})

print("数据预览（前10条）:")
print(data.head(10))

# 划分训练集和测试集
X = data[['广告投入']]
y = data['销售额']
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

print("\\n训练集大小:", len(X_train))
print("测试集大小:", len(X_test))

# 训练线性回归模型
model = LinearRegression()
model.fit(X_train, y_train)

print("\\n模型参数:")
print(f"截距: {model.intercept_:.2f}")
print(f"系数: {model.coef_[0]:.2f}")

# 预测
y_pred = model.predict(X_test)

print("\\n模型评估:")
print(f"均方误差 (MSE): {mean_squared_error(y_test, y_pred):.2f}")
print(f"R² 得分: {r2_score(y_test, y_pred):.4f}")

# 预测新数据
new_ad_cost = np.array([[80], [90], [100]])
predictions = model.predict(new_ad_cost)
print("\\n新数据预测:")
for cost, pred in zip(new_ad_cost.flatten(), predictions):
    print(f"广告投入 {cost} → 预测销售额 {pred:.2f}")
`,
    businessCase: `# 业务案例
根据广告投入预测销售额，优化营销预算分配
`,
    exercises: [
      "准备特征和标签数据",
      "训练回归模型",
      "评估模型性能",
      "用模型预测新数据"
    ],
    quizzes: [
      {
        question: "预测连续数值用什么类型的算法？",
        options: ["分类", "回归", "聚类", "降维"],
        answer: 1,
        explanation: "回归算法用于预测连续数值，如销售额、价格等"
      },
      {
        question: "R² 得分越接近什么表示模型越好？",
        options: ["-1", "0", "1", "100"],
        answer: 2,
        explanation: "R² 得分范围0-1，越接近1表示模型解释力越强"
      }
    ]
  },
  {
    id: 8,
    title: "时间序列分析",
    description: "趋势与预测",
    difficulty: "advanced",
    icon: "clock",
    color: "from-teal-500 to-teal-600",
    prerequisites: ["Pandas", "数据可视化"],
    learningObjectives: [
      "认识时间序列数据",
      "掌握日期处理方法",
      "学会滑动窗口统计",
      "掌握简单预测方法"
    ],
    theory: `# 时间序列分析
## 时间序列特征
- 趋势
- 季节性
- 周期性
- 随机噪声
## Pandas时间操作
- 日期解析
- 重采样
- 滑动窗口
## 预测方法
- 移动平均
- 指数平滑
`,
    code: `import pandas as pd
import numpy as np

# 创建时间序列数据
dates = pd.date_range(start='2024-01-01', periods=60, freq='D')
np.random.seed(42)

# 模拟有趋势和季节性的销售数据
trend = np.linspace(100, 500, 60)
seasonality = 50 * np.sin(np.linspace(0, 8 * np.pi, 60))
noise = np.random.normal(0, 30, 60)
sales = trend + seasonality + noise

data = pd.DataFrame({
    '日期': dates,
    '销售额': sales.round(2)
})
data.set_index('日期', inplace=True)

print("时间序列数据（前10条）:")
print(data.head(10))

# 按月重采样
print("\\n按月汇总销售额:")
monthly_data = data.resample('M').sum()
print(monthly_data)

# 7日移动平均
data['7日移动平均'] = data['销售额'].rolling(window=7).mean()
print("\\n带移动平均的数据（最后10条）:")
print(data.tail(10))

# 简单预测 - 用最近7天平均值预测未来
last_7_days_avg = data['销售额'].tail(7).mean()
print(f"\\n最近7天平均销售额: {last_7_days_avg:.2f}")
print(f"未来7天预测销售额（按平均值）: {(last_7_days_avg * 7):.2f}")

# 计算增长趋势
first_week_avg = data['销售额'].head(7).mean()
last_week_avg = data['销售额'].tail(7).mean()
growth_rate = (last_week_avg - first_week_avg) / first_week_avg * 100
print(f"\\n期间增长率: {growth_rate:.2f}%")
`,
    businessCase: `# 业务案例
分析销售趋势，预测未来销量，辅助库存决策
`,
    exercises: [
      "创建时间序列数据",
      "进行日期重采样",
      "计算移动平均",
      "做简单的趋势预测"
    ],
    quizzes: [
      {
        question: "将日数据转为月数据用什么操作？",
        options: ["rolling()", "resample()", "shift()", "diff()"],
        answer: 1,
        explanation: "resample()用于时间序列的重采样，如日→月"
      },
      {
        question: "滑动窗口统计用什么方法？",
        options: ["window()", "rolling()", "slide()", "moving()"],
        answer: 1,
        explanation: "rolling()用于创建滑动窗口，可计算移动平均等"
      }
    ]
  },
  {
    id: 9,
    title: "A/B测试",
    description: "产品与运营效果评估",
    difficulty: "advanced",
    icon: "git-branch",
    color: "from-violet-500 to-violet-600",
    prerequisites: ["统计分析"],
    learningObjectives: [
      "理解A/B测试概念",
      "掌握实验设计原则",
      "学会数据收集和清洗",
      "掌握假设检验方法"
    ],
    theory: `# A/B测试
## 什么是A/B测试
- 对照组 vs 实验组
- 单一变量原则
- 统计显著性
## 实验流程
- 确定目标
- 设计实验
- 收集数据
- 分析结果
## 统计检验
- t检验
- 卡方检验
`,
    code: `import numpy as np
import pandas as pd
from scipy import stats

# 模拟A/B测试数据 - 按钮颜色对转化率的影响
np.random.seed(42)

# 对照组 - 蓝色按钮
n_control = 1000
conversion_rate_control = 0.12
conversions_control = np.random.binomial(1, conversion_rate_control, n_control)

# 实验组 - 绿色按钮
n_treatment = 1000
conversion_rate_treatment = 0.15
conversions_treatment = np.random.binomial(1, conversion_rate_treatment, n_treatment)

# 创建DataFrame
data = pd.DataFrame({
    '组': ['对照组'] * n_control + ['实验组'] * n_treatment,
    '是否转化': np.concatenate([conversions_control, conversions_treatment])
})

print("A/B测试数据预览:")
print(data.sample(10))

# 统计描述
print("\\n各组转化率:")
summary = data.groupby('组')['是否转化'].agg(['count', 'sum', 'mean'])
summary.columns = ['访问人数', '转化人数', '转化率']
print(summary)

# 提取数据
control_conv = data[data['组'] == '对照组']['是否转化']
treatment_conv = data[data['组'] == '实验组']['是否转化']

# 双样本t检验
t_stat, p_value = stats.ttest_ind(treatment_conv, control_conv)

print(f"\\n假设检验结果:")
print(f"t统计量: {t_stat:.4f}")
print(f"p值: {p_value:.6f}")

# 判断结果
alpha = 0.05
if p_value < alpha:
    print("\\n✅ 结论: 实验组效果显著优于对照组！")
    improvement = (summary.loc['实验组', '转化率'] - summary.loc['对照组', '转化率']) / summary.loc['对照组', '转化率'] * 100
    print(f"   相对提升: {improvement:.2f}%")
else:
    print("\\n❌ 结论: 两组效果无显著差异")

# 计算置信区间
def confidence_interval(data, confidence=0.95):
    mean = np.mean(data)
    se = stats.sem(data)
    h = se * stats.t.ppf((1 + confidence) / 2, len(data) - 1)
    return mean - h, mean + h

ci_control = confidence_interval(control_conv)
ci_treatment = confidence_interval(treatment_conv)

print(f"\\n95% 置信区间:")
print(f"对照组: [{ci_control[0]:.4f}, {ci_control[1]:.4f}]")
print(f"实验组: [{ci_treatment[0]:.4f}, {ci_treatment[1]:.4f}]")
`,
    businessCase: `# 业务案例
测试新按钮颜色，评估对用户转化率的影响
`,
    exercises: [
      "设计A/B测试方案",
      "收集和整理测试数据",
      "进行统计显著性检验",
      "解释测试结果"
    ],
    quizzes: [
      {
        question: "A/B测试中一次应该改变几个变量？",
        options: ["1个", "2-3个", "尽可能多", "随便"],
        answer: 0,
        explanation: "A/B测试应遵循单一变量原则，一次只改变一个因素"
      },
      {
        question: "p值小于0.05通常表示？",
        options: ["实验失败", "差异统计显著", "数据有问题", "需要更多数据"],
        answer: 1,
        explanation: "p值小于0.05通常认为差异具有统计学显著性"
      }
    ]
  },
  {
    id: 10,
    title: "数据报告撰写",
    description: "数据故事化呈现",
    difficulty: "advanced",
    icon: "file-text",
    color: "from-amber-500 to-amber-600",
    prerequisites: ["全部前置课程"],
    learningObjectives: [
      "掌握报告结构",
      "学会数据解读",
      "掌握图表搭配",
      "学会撰写业务建议"
    ],
    theory: `# 数据报告撰写
## 报告结构
- 标题和摘要
- 背景与目标
- 数据说明
- 分析过程
- 结论建议
## 核心要点
- 结论先行
- 图表配合
- 逻辑清晰
- 建议可落地
`,
    code: `# 数据报告撰写实战
# 模拟完整分析流程并生成报告要点

print("=" * 60)
print("           电商销售数据分析报告")
print("=" * 60)

# 1. 摘要 - 结论先行
print("\\n【1. 执行摘要】")
print("  本报告分析了过去3个月的销售数据，主要发现:")
print("  • 总销售额同比增长 23.5%")
print("  • 美妆品类表现最佳，增长 41.2%")
print("  • 建议增加美妆品类库存和营销投入")

# 2. 背景与目标
print("\\n【2. 分析背景与目标】")
print("  • 背景: 2024年Q1销售复盘")
print("  • 目标: 发现增长机会，指导Q2策略")
print("  • 数据时间范围: 2024.01.01 - 2024.03.31")

# 3. 数据概览
print("\\n【3. 数据概览】")
import pandas as pd
import numpy as np

np.random.seed(42)
data = {
    '月份': ['1月', '1月', '1月', '2月', '2月', '2月', '3月', '3月', '3月'],
    '品类': ['服饰', '美妆', '食品', '服饰', '美妆', '食品', '服饰', '美妆', '食品'],
    '销售额': [12000, 8900, 15000, 13500, 11000, 15500, 14200, 12500, 16000],
    '订单量': [120, 95, 180, 135, 115, 185, 142, 130, 190]
}
df = pd.DataFrame(data)

print("  数据预览:")
print(df)

# 4. 关键发现
print("\\n【4. 关键发现】")

# 按品类汇总
category_summary = df.groupby('品类').agg({
    '销售额': 'sum',
    '订单量': 'sum'
})
category_summary['客单价'] = category_summary['销售额'] / category_summary['订单量']
print("\\n  品类销售汇总:")
print(category_summary.round(2))

# 计算增长率
print("\\n  增长分析:")
jan_data = df[df['月份'] == '1月']['销售额'].sum()
mar_data = df[df['月份'] == '3月']['销售额'].sum()
growth = (mar_data - jan_data) / jan_data * 100
print(f"  1月→3月增长率: {growth:.1f}%")

# 5. 结论与建议
print("\\n【5. 结论与建议】")
print("  结论:")
print("  1. 整体销售呈现稳步上升趋势")
print("  2. 美妆品类增长势头最强")
print("  3. 食品品类客单价最高")
print("\\n  建议:")
print("  1. 🎯 重点发展美妆品类，增加SKU")
print("  2. 📦 食品品类可考虑捆绑销售提升订单量")
print("  3. 📊 建立月度数据复盘机制")

print("\\n" + "=" * 60)
print("报告生成时间: 2024-04-01")
print("=" * 60)
`,
    businessCase: `# 业务案例
撰写季度销售分析报告，为管理层决策提供支持
`,
    exercises: [
      "确定报告结构",
      "组织和分析数据",
      "撰写业务洞察",
      "提出可落地建议"
    ],
    quizzes: [
      {
        question: "数据报告中通常把什么放在最前面？",
        options: ["详细数据", "结论摘要", "分析过程", "方法论"],
        answer: 1,
        explanation: "报告应结论先行，让读者快速了解核心发现"
      },
      {
        question: "好的业务建议应该具备什么特点？",
        options: ["尽量笼统", "具体可落地", "越长越好", "充满专业术语"],
        answer: 1,
        explanation: "好的建议应该具体、可落地、有明确的执行方向"
      }
    ]
  }
];
