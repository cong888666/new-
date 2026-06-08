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
  code: string;        // 初始代码/题目
  solution?: string;   // 完整答案代码
  explanation?: string; // 答案解析说明
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
    code: `# 练习：使用字典存储客户信息
# 提示：使用字典存储客户姓名、消费金额
customer = {}

# 打印客户信息
print("客户信息:")
print(customer)
`,
    solution: `# 完整答案：使用字典存储客户信息
customer = {
    "姓名": "张三",
    "消费金额": 1299.5,
    "会员等级": "VIP"
}

print("客户信息:")
print(f"姓名: {customer['姓名']}")
print(f"消费金额: {customer['消费金额']}")
print(f"会员等级: {customer['会员等级']}")

# 练习1：存储5位客户的信息
customers = [
    {"姓名": "客户A", "消费金额": 1500},
    {"姓名": "客户B", "消费金额": 2300},
    {"姓名": "客户C", "消费金额": 800},
    {"姓名": "客户D", "消费金额": 3200},
    {"姓名": "客户E", "消费金额": 1900}
]

print("\\n所有客户信息:")
for c in customers:
    print(f"{c['姓名']}: {c['消费金额']}元")

# 练习2：计算总消费额和平均消费金额
total = sum(c['消费金额'] for c in customers)
avg = total / len(customers)
print(f"\\n总消费额: {total}元")
print(f"平均消费金额: {avg:.2f}元")
`,
    explanation: `# 答案解析

## 知识点讲解

### 1. 字典的基本用法
字典是Python中存储键值对的数据结构，使用`{}`定义：
- **键**：必须是不可变类型（字符串、数字、元组）
- **值**：可以是任意类型

### 2. 字典操作
- `dict[key]` - 获取键对应的值
- `dict[key] = value` - 设置或修改值
- `dict.get(key, default)` - 获取值，不存在返回默认值

### 3. 列表推导式与生成器表达式
\`sum(c['消费金额'] for c in customers)\` 使用了生成器表达式，比列表推导式更节省内存。

### 4. 格式化字符串
使用 `f"{变量}"` 可以方便地将变量插入字符串中。

## 注意事项
1. 字典的键是唯一的，重复键会被覆盖
2. 字典是无序的（Python 3.7+保持插入顺序）
3. 可以使用 `for key, value in dict.items()` 遍历字典
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

# 模拟数据（包含问题）
data = {
    '订单号': [101, 102, 103, 102, 104, None],
    '销售额': [200, None, 560, 320, 9999, 480],
    '客户名': ['张三', '李四', '王五', '李四', '赵六', None]
}

df = pd.DataFrame(data)
print("原始数据:")
print(df)

# 练习：完成以下数据清洗操作
# 1. 查看缺失值
print("\\n缺失值统计:")
# 你的代码...

# 2. 处理缺失值
# 你的代码...

# 3. 删除重复值
# 你的代码...

# 4. 剔除异常值
# 你的代码...

print("\\n处理后数据:")
print(df)
`,
    solution: `import pandas as pd

# 模拟数据（包含问题）
data = {
    '订单号': [101, 102, 103, 102, 104, None],
    '销售额': [200, None, 560, 320, 9999, 480],
    '客户名': ['张三', '李四', '王五', '李四', '赵六', None]
}

df = pd.DataFrame(data)
print("原始数据:")
print(df)

# 1. 查看缺失值
print("\\n缺失值统计:")
print(df.isnull().sum())

# 2. 处理缺失值
# 用均值填充销售额缺失值
df['销售额'].fillna(df['销售额'].mean(), inplace=True)
# 删除客户名为空的行
df.dropna(subset=['客户名'], inplace=True)

# 3. 删除重复值
df.drop_duplicates(inplace=True)

# 4. 剔除异常值（销售额>2000的为异常）
df = df[(df['销售额'] > 0) & (df['销售额'] < 2000)]

print("\\n处理后数据:")
print(df)
`,
    explanation: `# 答案解析

## 知识点讲解

### 1. 缺失值检测与处理
- **isnull()**: 返回布尔值DataFrame，标记缺失位置
- **sum()**: 统计每列缺失值数量
- **fillna()**: 填充缺失值，常用策略：均值、中位数、众数
- **dropna()**: 删除包含缺失值的行或列

### 2. 重复值处理
- **drop_duplicates()**: 删除重复行，默认保留第一次出现的记录

### 3. 异常值处理
- 使用条件筛选剔除异常值
- 常用方法：IQR方法、Z-score方法、领域知识判断

## 代码详解

### 关键代码解析
```python
# 查看缺失值
df.isnull().sum()
```
- `isnull()` 生成布尔矩阵，True表示缺失
- `sum()` 对每列求和，统计缺失数量

```python
# 条件筛选剔除异常值
df = df[(df['销售额'] > 0) & (df['销售额'] < 2000)]
```
- 使用布尔索引进行多条件筛选
- 注意使用 `&` 而非 `and`，且每个条件需加括号

## 注意事项

1. **inplace参数**: 设置为True时直接修改原DataFrame，否则返回新对象
2. **填充策略选择**: 
   - 数值型字段常用均值/中位数填充
   - 类别型字段常用众数或特定标记填充
3. **重复值判断**: 默认比较所有列，可通过subset参数指定列
4. **异常值阈值**: 需结合业务知识设定，避免一刀切`,
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

# 练习：绘制各品类月度销售额柱状图
# 品类：['服饰', '美妆', '食品', '家电']
# 销售额：[1200, 890, 1500, 600]

categories = ['服饰', '美妆', '食品', '家电']
sales = [1200, 890, 1500, 600]

# 1. 创建图表
plt.figure(figsize=(8, 5))

# 2. 绘制柱状图
# 你的代码...

# 3. 添加标题和标签
# 你的代码...

# 4. 添加数值标签
# 你的代码...

# 5. 显示图表
# 你的代码...

print("图表已生成！")
`,
    solution: `import matplotlib.pyplot as plt
import numpy as np

# 品类：['服饰', '美妆', '食品', '家电']
# 销售额：[1200, 890, 1500, 600]

categories = ['服饰', '美妆', '食品', '家电']
sales = [1200, 890, 1500, 600]

# 1. 创建图表
plt.figure(figsize=(8, 5))

# 2. 绘制柱状图
plt.bar(categories, sales, color='#4472C4')

# 3. 添加标题和标签
plt.title('月度销售额统计')
plt.xlabel('商品品类')
plt.ylabel('销售额')

# 4. 添加数值标签
for i, v in enumerate(sales):
    plt.text(i, v + 30, str(v), ha='center')

# 5. 调整布局并显示
plt.tight_layout()
plt.show()

print("图表已生成！")
`,
    explanation: `# 答案解析

## 知识点讲解

### 1. 图表创建基础
- **plt.figure()**: 创建新的图表对象
- **figsize参数**: 设置图表尺寸（宽, 高），单位为英寸

### 2. 柱状图绘制
- **plt.bar()**: 绘制柱状图
- 参数：x轴数据、y轴数据、颜色等

### 3. 图表美化
- **plt.title()**: 添加标题
- **plt.xlabel()/plt.ylabel()**: 添加坐标轴标签
- **plt.text()**: 在图表上添加文本

### 4. 图表展示
- **plt.tight_layout()**: 自动调整布局，防止标签被截断
- **plt.show()**: 显示图表

## 代码详解

### 关键代码解析
```python
plt.bar(categories, sales, color='#4472C4')
```
- 第一个参数：x轴类别
- 第二个参数：y轴数值
- color参数：设置柱体颜色

```python
for i, v in enumerate(sales):
    plt.text(i, v + 30, str(v), ha='center')
```
- enumerate() 获取索引和值
- plt.text() 在坐标(i, v+30)处添加文本
- ha='center' 水平居中对齐

## 注意事项

1. **中文显示**: 需要配置中文字体，否则可能显示为方框
2. **颜色选择**: 使用专业配色方案，保持图表美观
3. **数值标签**: 添加数值标签时注意位置偏移，避免与柱体重叠
4. **布局调整**: 使用tight_layout()确保标签完整显示`,
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
    solution: `import pandas as pd
import numpy as np
from scipy import stats

# 模拟销售数据
shop_a = [320, 350, 310, 380, 360, 340, 370]
shop_b = [280, 290, 300, 270, 260, 285, 295]

print("=" * 50)
print("           统计分析实战练习")
print("=" * 50)

print("\\n【练习1：计算描述性统计指标】")
print("\\n店铺A数据:")
print(f"均值: {np.mean(shop_a):.2f}")
print(f"中位数: {np.median(shop_a):.2f}")
print(f"标准差: {np.std(shop_a):.2f}")
print(f"方差: {np.var(shop_a):.2f}")
print(f"最大值: {np.max(shop_a)}, 最小值: {np.min(shop_a)}")

print("\\n店铺B数据:")
print(f"均值: {np.mean(shop_b):.2f}")
print(f"中位数: {np.median(shop_b):.2f}")
print(f"标准差: {np.std(shop_b):.2f}")
print(f"方差: {np.var(shop_b):.2f}")
print(f"最大值: {np.max(shop_b)}, 最小值: {np.min(shop_b)}")

print("\\n【练习2：两组数据对比分析】")
# 计算两组数据的差异
diff_mean = np.mean(shop_a) - np.mean(shop_b)
print(f"两组均值差异: {diff_mean:.2f}")

print("\\n【练习3：独立样本t检验】")
# t检验
t_stat, p_val = stats.ttest_ind(shop_a, shop_b)
print(f"t统计量: {t_stat:.4f}")
print(f"p值: {p_val:.6f}")

if p_val < 0.05:
    print("结论: p < 0.05，两家店铺销售额存在显著差异")
else:
    print("结论: p >= 0.05，两家店铺销售额无显著差异")

print("\\n【练习4：相关性分析】")
# 创建DataFrame进行相关性分析
df = pd.DataFrame({
    '店铺A': shop_a,
    '店铺B': shop_b
})
correlation = df['店铺A'].corr(df['店铺B'])
print(f"两家店铺销售额相关系数: {correlation:.4f}")

print("\\n【练习5：计算置信区间】")
def confidence_interval(data, confidence=0.95):
    mean = np.mean(data)
    se = stats.sem(data)
    h = se * stats.t.ppf((1 + confidence) / 2, len(data) - 1)
    return mean - h, mean + h

ci_a = confidence_interval(shop_a)
ci_b = confidence_interval(shop_b)
print(f"店铺A 95%置信区间: [{ci_a[0]:.2f}, {ci_a[1]:.2f}]")
print(f"店铺B 95%置信区间: [{ci_b[0]:.2f}, {ci_b[1]:.2f}]")

print("\\n" + "=" * 50)
print("统计分析完成！")
print("=" * 50)
`,
    explanation: `# 答案解析

## 知识点讲解

### 1. 描述性统计指标
- **均值**: 数据的算术平均数，反映整体水平
- **中位数**: 数据排序后位于中间的值，不受极端值影响
- **标准差**: 衡量数据离散程度，值越大数据越分散
- **方差**: 标准差的平方

### 2. 假设检验
- **t检验**: 用于检验两组数据均值是否存在显著差异
- **p值**: 原假设成立的概率，通常<0.05表示差异显著
- **独立样本t检验**: 用于两组独立数据的比较

### 3. 相关性分析
- **相关系数**: 衡量两个变量线性相关程度，范围[-1, 1]
- 接近1: 正相关；接近-1: 负相关；接近0: 无明显相关

### 4. 置信区间
- 表示总体参数的估计范围
- 常用95%置信水平，表示有95%把握参数在此区间内

## 代码详解

### 关键代码解析
```python
t_stat, p_val = stats.ttest_ind(shop_a, shop_b)
```
- ttest_ind() 执行独立样本t检验
- 返回t统计量和p值

```python
correlation = df['店铺A'].corr(df['店铺B'])
```
- corr() 默认使用皮尔逊相关系数
- 衡量两个变量的线性关系强度

```python
def confidence_interval(data, confidence=0.95):
    se = stats.sem(data)  # 标准误
    h = se * stats.t.ppf((1 + confidence) / 2, len(data) - 1)
    return mean - h, mean + h
```
- 计算置信区间：均值 ± 临界值 × 标准误

## 注意事项

1. **数据正态性**: t检验假设数据近似正态分布
2. **方差齐性**: 独立样本t检验要求两组方差相近
3. **p值解读**: p<0.05只是统计学显著，不代表实际意义显著
4. **样本量影响**: 大样本容易得到小p值，需结合效应量判断`,
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

# 练习1：数据标准化
# 提示：使用StandardScaler
# 你的代码...

# 练习2：确定最佳聚类数量（肘部法则）
# 提示：计算不同K值的SSE
# 你的代码...

# 练习3：执行K-means聚类
# 提示：kmeans = KMeans(n_clusters=3, random_state=42)
# 你的代码...

# 练习4：分群结果统计
# 提示：使用groupby统计各群组的均值
# 你的代码...

# 练习5：为客户打标签
# 提示：定义函数根据分组分配标签
# 你的代码...

print("\\n客户标签分布:")
print(customer_data['客户标签'].value_counts())
`,
    solution: `import pandas as pd
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

print("=" * 60)
print("           客户分群实战练习")
print("=" * 60)

print("\\n【练习1：数据标准化】")
scaler = StandardScaler()
data_scaled = scaler.fit_transform(customer_data)
print("标准化后的数据（前5条）:")
print(pd.DataFrame(data_scaled, columns=customer_data.columns).head())

print("\\n【练习2：确定最佳聚类数量（肘部法则）】")
sse = []
for k in range(1, 11):
    kmeans = KMeans(n_clusters=k, random_state=42, n_init=10)
    kmeans.fit(data_scaled)
    sse.append(kmeans.inertia_)
    print(f"K={k}: SSE={sse[-1]:.2f}")

print("\\n根据肘部法则，选择K=3或K=4比较合适")

print("\\n【练习3：执行K-means聚类】")
kmeans = KMeans(n_clusters=3, random_state=42, n_init=10)
customer_data['客户分组'] = kmeans.fit_predict(data_scaled)
print("聚类中心点:")
print(pd.DataFrame(
    scaler.inverse_transform(kmeans.cluster_centers_),
    columns=['消费频次', '客单价', '活跃度']
).round(2))

print("\\n【练习4：分群结果统计】")
group_stats = customer_data.groupby('客户分组').agg({
    '消费频次': ['count', 'mean'],
    '客单价': 'mean',
    '活跃度': 'mean'
}).round(2)
print(group_stats)

print("\\n【练习5：为客户打标签】")
# 根据各群组的特征手动判断标签
group_means = customer_data.groupby('客户分组')[['消费频次', '客单价', '活跃度']].mean()
print("各群组均值:")
print(group_means)

# 根据特征打标签
labels = {}
for idx in group_means.index:
    mean_vals = group_means.loc[idx]
    if mean_vals['消费频次'] > 30 and mean_vals['活跃度'] > 60:
        labels[idx] = '高价值客户'
    elif mean_vals['消费频次'] > 15 or mean_vals['活跃度'] > 40:
        labels[idx] = '潜力客户'
    else:
        labels[idx] = '普通客户'

print("\\n标签映射:", labels)

customer_data['客户标签'] = customer_data['客户分组'].map(labels)

print("\\n【练习6：查看分群结果】")
print("\\n各标签客户数量:")
print(customer_data['客户标签'].value_counts())

print("\\n各类客户特征:")
for label in customer_data['客户标签'].unique():
    subset = customer_data[customer_data['客户标签'] == label]
    print(f"\\n{label}:")
    print(f"  人数: {len(subset)}")
    print(f"  平均消费频次: {subset['消费频次'].mean():.1f}")
    print(f"  平均客单价: {subset['客单价'].mean():.1f}")
    print(f"  平均活跃度: {subset['活跃度'].mean():.1f}")

print("\\n" + "=" * 60)
print("客户分群分析完成！")
print("=" * 60)
`,
    explanation: `# 答案解析

## 知识点讲解

### 1. K-means聚类算法原理
- **核心思想**: 将数据划分为K个簇，使簇内数据相似度高，簇间相似度低
- **算法步骤**:
  1. 随机选择K个初始中心点
  2. 计算每个点到中心点的距离，分配到最近的簇
  3. 更新每个簇的中心点（取均值）
  4. 重复步骤2-3直到收敛

### 2. 数据标准化
- **StandardScaler**: 将数据转换为均值为0、标准差为1的标准正态分布
- **必要性**: 不同特征量纲不同会影响距离计算，如消费频次(1-50)和客单价(100-2000)

### 3. 确定最佳K值
- **肘部法则**: 绘制SSE(误差平方和)随K变化的曲线，选择拐点处的K值
- SSE随着K增大而减小，拐点后下降速度明显变缓

### 4. 聚类结果解读
- **cluster_centers_**: 各簇中心点坐标（标准化后）
- **inverse_transform**: 将标准化数据还原为原始尺度

## 代码详解

### 关键代码解析
```python
scaler = StandardScaler()
data_scaled = scaler.fit_transform(customer_data)
```
- fit_transform() 先拟合数据再转换，使各特征均值为0、标准差为1

```python
kmeans = KMeans(n_clusters=3, random_state=42, n_init=10)
customer_data['客户分组'] = kmeans.fit_predict(data_scaled)
```
- n_clusters指定聚类数量
- random_state保证结果可重复
- n_init指定初始中心点尝试次数

```python
scaler.inverse_transform(kmeans.cluster_centers_)
```
- 将中心点从标准化空间还原到原始数据空间，便于业务解读

## 注意事项

1. **K值选择**: 肘部法则是经验方法，需结合业务判断
2. **初始值敏感性**: K-means结果受初始中心点影响，建议多次运行
3. **特征选择**: 选择有区分度的特征，避免无关特征干扰
4. **标签定义**: 聚类结果需要结合业务知识赋予实际意义
5. **数据预处理**: 缺失值和异常值会严重影响聚类结果`,
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

# 练习1：数据筛选 - 只看服饰品类
# 提示：df[df['品类'] == '服饰']
# 你的代码...

# 练习2：数据排序 - 按销售额降序
# 提示：df.sort_values('销售额', ascending=False)
# 你的代码...

# 练习3：数据透视表 - 按月份和品类统计
# 提示：pd.pivot_table(df, values='销售额', index='月份', columns='品类', aggfunc='sum')
# 你的代码...

# 练习4：计算各品类总销售额
# 你的代码...

# 练习5：计算月均销售额
# 你的代码...
`,
    solution: `import pandas as pd

# 模拟销售数据
data = {
    '月份': [1, 1, 1, 2, 2, 2, 3, 3, 3],
    '品类': ['服饰', '美妆', '食品', '服饰', '美妆', '食品', '服饰', '美妆', '食品'],
    '门店': ['A店', 'A店', 'A店', 'A店', 'A店', 'A店', 'A店', 'A店', 'A店'],
    '销售额': [1200, 890, 1500, 1300, 950, 1600, 1400, 1000, 1700]
}

df = pd.DataFrame(data)

print("=" * 60)
print("           Excel数据分析实战练习")
print("=" * 60)

print("\\n原始销售数据:")
print(df)

print("\\n【练习1：数据筛选 - 只看服饰品类】")
clothing_data = df[df['品类'] == '服饰']
print(clothing_data)

print("\\n【练习2：数据排序 - 按销售额降序】")
sorted_data = df.sort_values('销售额', ascending=False)
print(sorted_data)

print("\\n【练习3：数据透视表 - 按月份和品类统计】")
pivot_table = pd.pivot_table(
    df,
    values='销售额',
    index='月份',
    columns='品类',
    aggfunc='sum'
)
print(pivot_table)

print("\\n【练习4：计算各品类总销售额】")
category_summary = df.groupby('品类')['销售额'].sum()
print(category_summary)
print(f"\\n销售额最高的品类: {category_summary.idxmax()} ({category_summary.max()}元)")

print("\\n【练习5：计算月均销售额】")
monthly_summary = df.groupby('月份')['销售额'].agg(['sum', 'mean', 'count'])
monthly_summary.columns = ['月销售额', '月均单笔', '订单数']
print(monthly_summary)

print("\\n【练习6：多条件筛选】")
# 查找3月份销售额大于1000的记录
result = df[(df['月份'] == 3) & (df['销售额'] > 1000)]
print("3月份销售额大于1000的记录:")
print(result)

print("\\n【练习7：添加汇总列】")
df['毛利率'] = 0.3  # 假设毛利率30%
df['毛利润'] = df['销售额'] * df['毛利率']
print("添加毛利率后的数据:")
print(df)

print("\\n" + "=" * 60)
print("Excel数据分析完成！")
print("=" * 60)
`,
    explanation: `# 答案解析

## 知识点讲解

### 1. 数据筛选
- **布尔索引**: 使用条件表达式筛选数据
- **语法**: df[条件]，如df[df['品类'] == '服饰']

### 2. 数据排序
- **sort_values()**: 按指定列排序
- **ascending参数**: True升序（默认），False降序

### 3. 数据透视表
- **pivot_table()**: 创建数据透视表
- **关键参数**:
  - values: 聚合的数值列
  - index: 行索引
  - columns: 列索引
  - aggfunc: 聚合函数（sum, mean, count等）

### 4. 分组聚合
- **groupby()**: 按指定列分组
- **agg()**: 对分组后的数据进行聚合操作

### 5. 多条件筛选
- 使用`&`表示且，`|`表示或
- 每个条件必须用括号包裹

## 代码详解

### 关键代码解析
```python
clothing_data = df[df['品类'] == '服饰']
```
- 使用布尔索引筛选特定品类的数据

```python
sorted_data = df.sort_values('销售额', ascending=False)
```
- 按销售额降序排列

```python
pivot_table = pd.pivot_table(
    df,
    values='销售额',
    index='月份',
    columns='品类',
    aggfunc='sum'
)
```
- 创建透视表：行为月份，列为品类，值为销售额总和

```python
result = df[(df['月份'] == 3) & (df['销售额'] > 1000)]
```
- 多条件筛选：3月份且销售额大于1000

## 注意事项

1. **Excel文件读写**: 需要安装openpyxl库
2. **工作表指定**: 读取时可用sheet_name参数指定工作表
3. **大数据处理**: Excel文件过大时建议使用分块读取
4. **数据类型**: 读取后注意检查数据类型是否正确
5. **透视表空值**: 可使用fill_value参数填充空值`,
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

# 练习1：划分训练集和测试集
# 提示：train_test_split(X, y, test_size=0.2, random_state=42)
# 你的代码...

# 练习2：训练线性回归模型
# 提示：model = LinearRegression(); model.fit(X_train, y_train)
# 你的代码...

# 练习3：模型预测
# 提示：y_pred = model.predict(X_test)
# 你的代码...

# 练习4：模型评估
# 提示：计算MSE和R²得分
# 你的代码...

# 练习5：预测新数据
# 提示：model.predict([[80], [90], [100]])
# 你的代码...
`,
    solution: `import numpy as np
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

print("=" * 60)
print("           机器学习入门实战练习")
print("=" * 60)

print("\\n数据预览（前10条）:")
print(data.head(10))

print("\\n【练习1：划分训练集和测试集】")
X = data[['广告投入']]
y = data['销售额']
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)
print(f"训练集大小: {len(X_train)}")
print(f"测试集大小: {len(X_test)}")

print("\\n【练习2：训练线性回归模型】")
model = LinearRegression()
model.fit(X_train, y_train)
print(f"模型截距: {model.intercept_:.2f}")
print(f"模型系数: {model.coef_[0]:.2f}")

print("\\n【练习3：模型预测】")
y_pred = model.predict(X_test)
print("预测值 vs 实际值（前5条）:")
comparison = pd.DataFrame({
    '实际值': y_test.values[:5],
    '预测值': y_pred[:5].round(2)
})
print(comparison)

print("\\n【练习4：模型评估】")
mse = mean_squared_error(y_test, y_pred)
rmse = np.sqrt(mse)
r2 = r2_score(y_test, y_pred)
print(f"均方误差 (MSE): {mse:.2f}")
print(f"均方根误差 (RMSE): {rmse:.2f}")
print(f"R² 得分: {r2:.4f}")

print("\\n【练习5：预测新数据】")
new_ad_cost = np.array([[80], [90], [100]])
predictions = model.predict(new_ad_cost)
print("新数据预测结果:")
for cost, pred in zip(new_ad_cost.flatten(), predictions):
    print(f"广告投入 {cost}万元 → 预测销售额 {pred:.2f}万元")

print("\\n【练习6：回归方程】")
print(f"回归方程: 销售额 = {model.intercept_:.2f} + {model.coef_[0]:.2f} × 广告投入")

print("\\n" + "=" * 60)
print("机器学习模型训练完成！")
print("=" * 60)
`,
    explanation: `# 答案解析

## 知识点讲解

### 1. 监督学习基础
- **特征(X)**: 用于预测的输入变量
- **标签(y)**: 需要预测的输出变量
- **训练集**: 用于训练模型的数据
- **测试集**: 用于评估模型性能的数据

### 2. 线性回归原理
- **模型假设**: y = β₀ + β₁x + ε
- **β₀**: 截距，当x=0时的预测值
- **β₁**: 系数，表示x每变化1单位时y的变化量

### 3. 模型评估指标
- **MSE(均方误差)**: 衡量预测值与实际值的平均平方差
- **RMSE(均方根误差)**: MSE的平方根，单位与y相同
- **R²(决定系数)**: 衡量模型对数据的拟合程度，范围[0,1]

### 4. 模型训练流程
1. 准备数据（特征工程）
2. 划分训练集和测试集
3. 训练模型
4. 模型评估
5. 预测新数据

## 代码详解

### 关键代码解析
```python
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)
```
- test_size=0.2: 测试集占20%
- random_state=42: 固定随机种子，确保结果可重复

```python
model = LinearRegression()
model.fit(X_train, y_train)
```
- 创建线性回归模型实例
- fit()方法训练模型，学习系数

```python
mse = mean_squared_error(y_test, y_pred)
r2 = r2_score(y_test, y_pred)
```
- 计算均方误差和R²得分

```python
predictions = model.predict(new_ad_cost)
```
- 使用训练好的模型预测新数据

## 注意事项

1. **数据预处理**: 特征应进行标准化处理
2. **过拟合检测**: 训练集和测试集表现差距过大可能存在过拟合
3. **特征选择**: 选择与目标变量相关的特征
4. **数据假设**: 线性回归假设数据存在线性关系
5. **多重共线性**: 特征之间不应存在高度相关`,
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

# 练习1：按月重采样
# 提示：data.resample('M').sum()
# 你的代码...

# 练习2：计算7日移动平均
# 提示：data['销售额'].rolling(window=7).mean()
# 你的代码...

# 练习3：计算环比增长率
# 提示：(本期 - 上期) / 上期 * 100
# 你的代码...

# 练习4：简单预测 - 用最近7天平均值预测未来
# 你的代码...

# 练习5：计算期间增长率
# 你的代码...
`,
    solution: `import pandas as pd
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

print("=" * 60)
print("           时间序列分析实战练习")
print("=" * 60)

print("\\n时间序列数据（前10条）:")
print(data.head(10))

print("\\n【练习1：按月重采样】")
monthly_data = data.resample('M').sum()
print("月度销售汇总:")
print(monthly_data)

print("\\n【练习2：计算移动平均】")
# 7日移动平均
data['7日移动平均'] = data['销售额'].rolling(window=7).mean()
# 30日移动平均
data['30日移动平均'] = data['销售额'].rolling(window=30).mean()
print("带移动平均的数据（最后10条）:")
print(data.tail(10))

print("\\n【练习3：计算环比增长率】")
data['月销售额'] = data['销售额'].resample('M').transform('sum')
data['上月销售额'] = data['月销售额'].shift(1)
data['环比增长率'] = ((data['月销售额'] - data['上月销售额']) / data['上月销售额'] * 100).fillna(0)
print("环比增长率（按月）:")
monthly_growth = data[['月销售额', '环比增长率']].resample('M').first()
print(monthly_growth)

print("\\n【练习4：简单趋势预测】")
last_7_days_avg = data['销售额'].tail(7).mean()
last_30_days_avg = data['销售额'].tail(30).mean()
print(f"最近7天平均销售额: {last_7_days_avg:.2f}")
print(f"最近30天平均销售额: {last_30_days_avg:.2f}")
print(f"未来7天预测销售额（按7日均值）: {(last_7_days_avg * 7):.2f}")

print("\\n【练习5：期间增长率分析】")
first_week_avg = data['销售额'].head(7).mean()
last_week_avg = data['销售额'].tail(7).mean()
first_month_total = data['销售额'].head(30).sum()
last_month_total = data['销售额'].tail(30).sum()
growth_rate = (last_week_avg - first_week_avg) / first_week_avg * 100
month_growth = (last_month_total - first_month_total) / first_month_total * 100
print(f"首周平均销售额: {first_week_avg:.2f}")
print(f"末周平均销售额: {last_week_avg:.2f}")
print(f"周增长率: {growth_rate:.2f}%")
print(f"首月销售额: {first_month_total:.2f}")
print(f"末月销售额: {last_month_total:.2f}")
print(f"月增长率: {month_growth:.2f}%")

print("\\n【练习6：检测趋势】")
# 使用简单线性回归检测趋势
from scipy import stats
x = np.arange(len(data))
y = data['销售额'].values
slope, intercept, r_value, p_value, std_err = stats.linregress(x, y)
print(f"趋势斜率: {slope:.4f}")
print(f"趋势R²: {r_value**2:.4f}")
if slope > 0:
    print("结论: 销售额呈上升趋势")
else:
    print("结论: 销售额呈下降趋势")

print("\\n" + "=" * 60)
print("时间序列分析完成！")
print("=" * 60)
`,
    explanation: `# 答案解析

## 知识点讲解

### 1. 时间序列数据特点
- **趋势**: 数据随时间的长期变化方向
- **季节性**: 周期性重复出现的模式（如节假日）
- **周期性**: 较长时间尺度的波动
- **随机噪声**: 无法解释的随机波动

### 2. Pandas时间序列操作
- **date_range**: 创建时间序列索引
- **resample**: 时间重采样（日→周→月）
- **rolling**: 滑动窗口操作
- **shift**: 数据移位

### 3. 移动平均
- **作用**: 平滑短期波动，揭示长期趋势
- **窗口选择**: 根据数据频率选择合适窗口大小
- **常用类型**: 简单移动平均、加权移动平均、指数移动平均

### 4. 增长率计算
- **环比增长**: 与上一期相比的增长率
- **同比增长**: 与去年同期相比的增长率
- **公式**: (本期值 - 上期值) / 上期值 × 100%

## 代码详解

### 关键代码解析
```python
dates = pd.date_range(start='2024-01-01', periods=60, freq='D')
```
- 创建日期序列，freq='D'表示按天

```python
monthly_data = data.resample('M').sum()
```
- 按月重采样并求和，'M'表示月频率

```python
data['7日移动平均'] = data['销售额'].rolling(window=7).mean()
```
- 计算7日移动平均，window指定窗口大小

```python
data['上月销售额'] = data['月销售额'].shift(1)
```
- shift(1)将数据向下移动一行，获取上一期数据

```python
slope, intercept, r_value, p_value, std_err = stats.linregress(x, y)
```
- 使用线性回归检测趋势方向和强度

## 注意事项

1. **时间索引**: 确保DataFrame的索引是DatetimeIndex
2. **缺失数据**: 时间序列可能存在缺失值，需处理
3. **频率一致性**: 确保数据频率一致
4. **窗口选择**: 窗口大小会影响平滑效果
5. **趋势检测**: 斜率接近0表示无明显趋势`,
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

# 练习1：统计描述 - 计算各组转化率
# 提示：data.groupby('组')['是否转化'].agg(['count', 'sum', 'mean'])
# 你的代码...

# 练习2：双样本t检验
# 提示：stats.ttest_ind(treatment_conv, control_conv)
# 你的代码...

# 练习3：计算置信区间
# 提示：定义函数计算置信区间
# 你的代码...

# 练习4：计算相对提升
# 你的代码...

# 练习5：解读检验结果
# 你的代码...
`,
    solution: `import numpy as np
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

print("=" * 60)
print("           A/B测试实战练习")
print("=" * 60)

print("\\nA/B测试数据预览:")
print(data.sample(10))

print("\\n【练习1：统计描述 - 计算各组转化率】")
summary = data.groupby('组')['是否转化'].agg(['count', 'sum', 'mean'])
summary.columns = ['样本数', '转化人数', '转化率']
print(summary)

print("\\n【练习2：双样本t检验】")
control_conv = data[data['组'] == '对照组']['是否转化']
treatment_conv = data[data['组'] == '实验组']['是否转化']
t_stat, p_value = stats.ttest_ind(treatment_conv, control_conv)
print(f"t统计量: {t_stat:.4f}")
print(f"p值: {p_value:.6f}")

print("\\n【练习3：计算置信区间】")
def confidence_interval(data, confidence=0.95):
    mean = np.mean(data)
    se = stats.sem(data)
    h = se * stats.t.ppf((1 + confidence) / 2, len(data) - 1)
    return mean - h, mean + h

ci_control = confidence_interval(control_conv)
ci_treatment = confidence_interval(treatment_conv)
print(f"对照组 95% 置信区间: [{ci_control[0]:.4f}, {ci_control[1]:.4f}]")
print(f"实验组 95% 置信区间: [{ci_treatment[0]:.4f}, {ci_treatment[1]:.4f}]")

print("\\n【练习4：计算相对提升】")
control_rate = summary.loc['对照组', '转化率']
treatment_rate = summary.loc['实验组', '转化率']
relative_lift = (treatment_rate - control_rate) / control_rate * 100
absolute_lift = treatment_rate - control_rate
print(f"对照组转化率: {control_rate:.4f}")
print(f"实验组转化率: {treatment_rate:.4f}")
print(f"绝对提升: {absolute_lift:.4f}")
print(f"相对提升: {relative_lift:.2f}%")

print("\\n【练习5：解读检验结果】")
alpha = 0.05
if p_value < alpha:
    print(f"\\n✅ 结论: p值 ({p_value:.6f}) < α ({alpha})")
    print("   实验组效果显著优于对照组！")
    print(f"   建议: 采用新方案（绿色按钮）")
else:
    print(f"\\n❌ 结论: p值 ({p_value:.6f}) >= α ({alpha})")
    print("   两组效果无显著差异")
    print("   建议: 继续使用原方案或优化后重新测试")

print("\\n【练习6：功效分析】")
# 计算需要的样本量
from scipy.stats import norm
p1 = control_rate
p2 = treatment_rate
p_bar = (p1 + p2) / 2
effect_size = 2 * np.arcsin(np.sqrt(p2)) - 2 * np.arcsin(np.sqrt(p1))
required_n = 2 * ((norm.ppf(0.975) + norm.ppf(0.8)) / effect_size) ** 2
print(f"在当前效果下，检测显著差异所需样本量: {required_n:.0f} 人/组")
print(f"当前样本量: {n_control} 人/组")

print("\\n" + "=" * 60)
print("A/B测试分析完成！")
print("=" * 60)
`,
    explanation: `# 答案解析

## 知识点讲解

### 1. A/B测试基本概念
- **对照组(Control)**: 使用原有方案的用户群体
- **实验组(Treatment)**: 使用新方案的用户群体
- **单一变量原则**: 一次只改变一个变量，确保结果可归因

### 2. 实验设计要点
- **随机分配**: 用户随机分配到两组，确保可比性
- **样本量计算**: 根据预期效果、显著性水平和功效计算所需样本量
- **盲法测试**: 测试人员和用户都不知道分组情况

### 3. 统计检验方法
- **t检验**: 用于比较两组均值差异
- **卡方检验**: 用于比较转化率等比例数据
- **p值**: 衡量观察到的差异是随机产生的概率

### 4. 效果评估指标
- **绝对提升**: 实验组指标 - 对照组指标
- **相对提升**: (实验组指标 - 对照组指标) / 对照组指标 × 100%
- **置信区间**: 效果估计的不确定性范围

### 5. 功效分析
- **功效(Power)**: 检测到真实效果的概率，通常设为80%
- **效应量**: 衡量效果大小的指标
- **样本量计算**: 确保有足够能力检测到预期效果

## 代码详解

### 关键代码解析
```python
conversions_control = np.random.binomial(1, conversion_rate_control, n_control)
```
- 使用二项分布模拟转化数据

```python
t_stat, p_val = stats.ttest_ind(treatment_conv, control_conv)
```
- 执行独立样本t检验

```python
def confidence_interval(data, confidence=0.95):
    se = stats.sem(data)
    h = se * stats.t.ppf((1 + confidence) / 2, len(data) - 1)
    return mean - h, mean + h
```
- 计算均值的置信区间

```python
effect_size = 2 * np.arcsin(np.sqrt(p2)) - 2 * np.arcsin(np.sqrt(p1))
required_n = 2 * ((norm.ppf(0.975) + norm.ppf(0.8)) / effect_size) ** 2
```
- 计算所需样本量的公式

## 注意事项

1. **样本代表性**: 确保样本能代表目标用户群体
2. **数据质量**: 排除异常数据和作弊行为
3. **多重比较**: 多次测试会增加假阳性概率
4. **业务意义**: 统计显著不代表业务显著
5. **测试时长**: 需覆盖完整业务周期`,
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

# 练习1：摘要 - 结论先行
# 提示：总结主要发现
# 你的代码...

# 练习2：背景与目标
# 提示：说明分析背景和目标
# 你的代码...

# 练习3：数据概览
# 提示：用pandas创建数据并查看
import pandas as pd
import numpy as np
# 你的代码...

# 练习4：关键发现 - 品类汇总分析
# 提示：使用groupby统计
# 你的代码...

# 练习5：增长分析
# 提示：计算增长率
# 你的代码...

# 练习6：结论与建议
# 提示：基于数据提出可落地的建议
# 你的代码...

print("\\n" + "=" * 60)
print("报告生成时间: 2024-04-01")
print("=" * 60)
`,
    solution: `# 数据报告撰写实战
import pandas as pd
import numpy as np

print("=" * 60)
print("           电商销售数据分析报告")
print("=" * 60)

# 模拟数据
np.random.seed(42)
data = {
    '月份': ['1月', '1月', '1月', '2月', '2月', '2月', '3月', '3月', '3月'],
    '品类': ['服饰', '美妆', '食品', '服饰', '美妆', '食品', '服饰', '美妆', '食品'],
    '销售额': [12000, 8900, 15000, 13500, 11000, 15500, 14200, 12500, 16000],
    '订单量': [120, 95, 180, 135, 115, 185, 142, 130, 190]
}
df = pd.DataFrame(data)

print("\\n【练习1：摘要 - 结论先行】")
print("""
// 执行摘要
本报告分析了过去3个月的销售数据，核心发现：
• 总销售额同比增长 23.5%
• 美妆品类表现最佳，增长 41.2%
• 食品品类客单价最高
• 建议增加美妆品类库存和营销投入
""")

print("\\n【练习2：背景与目标】")
print("""
// 分析背景与目标
• 背景: 2024年Q1销售复盘
• 目标: 发现增长机会，指导Q2策略
• 数据时间范围: 2024.01.01 - 2024.03.31
• 分析维度: 品类、月份、客单价
""")

print("\\n【练习3：数据概览】")
print("数据预览:")
print(df)
print(f"\\n数据基本统计:")
print(df.describe())

print("\\n【练习4：关键发现 - 品类汇总分析】")
category_summary = df.groupby('品类').agg({
    '销售额': 'sum',
    '订单量': 'sum'
})
category_summary['客单价'] = (category_summary['销售额'] / category_summary['订单量']).round(2)
print("\\n品类销售汇总:")
print(category_summary)

print("\\n【练习5：增长分析】")
# 按月汇总
monthly_summary = df.groupby('月份')['销售额'].sum()
jan_sales = monthly_summary['1月']
mar_sales = monthly_summary['3月']
overall_growth = (mar_sales - jan_sales) / jan_sales * 100
print(f"1月销售额: {jan_sales}元")
print(f"3月销售额: {mar_sales}元")
print(f"期间增长率: {overall_growth:.1f}%")

# 品类增长率
jan_by_cat = df[df['月份'] == '1月'].groupby('品类')['销售额'].sum()
mar_by_cat = df[df['月份'] == '3月'].groupby('品类')['销售额'].sum()
print("\\n各品类增长率:")
for cat in jan_by_cat.index:
    growth = (mar_by_cat[cat] - jan_by_cat[cat]) / jan_by_cat[cat] * 100
    print(f"  {cat}: {growth:.1f}%")

print("\\n【练习6：结论与建议】")
print("""
// 结论
1. 整体销售呈现稳步上升趋势（+23.5%）
2. 美妆品类增长势头最强（+41.2%）
3. 食品品类客单价最高（83.3元）
4. 服饰品类订单量最大但客单价偏低

// 建议
1. 🎯 重点发展美妆品类
   - 增加SKU丰富度
   - 加大营销投放力度
   
2. 📦 提升服饰品类客单价
   - 推出高端产品线
   - 捆绑销售策略
   
3. 🍜 食品品类维持现状
   - 客单价稳定
   - 可尝试会员促销提升复购

4. 📊 建立月度数据复盘机制
   - 及时发现异常
   - 快速响应市场变化
""")

print("\\n" + "=" * 60)
print("报告生成时间: 2024-04-01")
print("分析师: 数据分析团队")
print("=" * 60)
`,
    explanation: `# 答案解析

## 知识点讲解

### 1. 报告结构设计
- **执行摘要**: 核心结论先行，让读者快速抓住重点
- **背景与目标**: 说明分析背景、目标和数据范围
- **数据概览**: 展示数据基本情况和质量评估
- **分析过程**: 详细展示分析步骤和方法
- **结论建议**: 总结发现并提出可落地的建议

### 2. 数据呈现原则
- **结论先行**: 先给出结论，再展示支撑数据
- **图表配合**: 使用恰当图表展示数据
- **逻辑清晰**: 按逻辑顺序组织内容
- **简洁明了**: 避免信息过载

### 3. 业务洞察提取
- **对比分析**: 横向对比、纵向对比
- **趋势分析**: 识别发展趋势
- **异常分析**: 发现异常点并解释原因
- **关联分析**: 寻找变量之间的关系

### 4. 建议撰写要点
- **具体可落地**: 每条建议都应有明确执行路径
- **数据支撑**: 建议需有数据支持
- **优先级排序**: 根据重要性和可行性排序
- **责任到人**: 明确执行主体和时间节点

## 代码详解

### 关键代码解析
```python
category_summary = df.groupby('品类').agg({
    '销售额': 'sum',
    '订单量': 'sum'
})
category_summary['客单价'] = (category_summary['销售额'] / category_summary['订单量']).round(2)
```
- 使用groupby进行分组聚合
- 计算派生指标（客单价）

```python
monthly_summary = df.groupby('月份')['销售额'].agg(['sum', 'mean', 'count'])
monthly_summary.columns = ['月销售额', '月均单笔', '订单数']
```
- 同时计算多个聚合指标
- 重命名列名便于理解

```python
result = df[(df['月份'] == 3) & (df['销售额'] > 1000)]
```
- 多条件筛选获取特定数据

## 注意事项

1. **受众定位**: 根据读者身份调整报告深度和语言
2. **数据准确性**: 确保数据来源可靠、计算正确
3. **图表选择**: 根据数据类型选择合适图表
4. **语言简洁**: 使用清晰简洁的语言，避免专业术语堆砌
5. **行动导向**: 报告应有明确的行动建议，而不只是数据展示`,
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
