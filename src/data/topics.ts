
export interface Topic {
  id: number;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  icon: string;
  color: string;
  theory: string;
  question: string;
  initialCode: string;
  solutionCode: string;
  explanation: string;
}

export const topics: Topic[] = [
  {
    id: 1,
    title: "Python基础",
    description: "数据分析必备的Python语法",
    difficulty: "beginner",
    icon: "code",
    color: "from-blue-500 to-blue-600",
    theory: `
# Python基础

Python是数据分析的首选语言，语法简洁优雅，拥有丰富的科学计算库。

## 核心概念
- 变量与数据类型：整数、浮点数、字符串、列表、字典
- 控制流程：条件判断、循环
- 函数定义与参数传递
- 列表推导式等高效写法
    `,
    question: `
## 练习题目：销售数据分析

某公司一周销售数据：[12, 15, 18, 14, 20, 16, 22]万元

请完成：
1. 计算总销售额
2. 计算日均销售额
3. 找出最高销售额和日期
4. 统计低于15万的天数
    `,
    initialCode: `# 销售数据分析练习
sales = [12, 15, 18, 14, 20, 16, 22]

# 你的代码写在这里

print("分析完成！")
`,
    solutionCode: `# 销售数据分析练习 - 参考答案
sales = [12, 15, 18, 14, 20, 16, 22]

print("="*50)
print("销售数据分析")
print("="*50)
print()

total = sum(sales)
avg = total / len(sales)
max_val = max(sales)
max_day = sales.index(max_val) + 1
low_days = sum(1 for s in sales if s < 15)

print(f"总销售额: {total}万元")
print(f"日均销售额: {avg:.1f}万元")
print(f"最高销售额: 第{max_day}天，{max_val}万元")
print(f"低于15万元的天数: {low_days}天")
print()
print("详细数据:")
for i, s in enumerate(sales, 1):
    status = "✓良好" if s >=15 else " 偏低"
    print(f"  第{i}天: {s}万元 {status}")
`,
    explanation: `
## 答案解析
使用sum()、max()等内置函数进行统计，列表推导式快速筛选数据。
    `
  },
  {
    id: 2,
    title: "数据清洗",
    description: "处理缺失值、异常值",
    difficulty: "beginner",
    icon: "database",
    color: "from-green-500 to-green-600",
    theory: `
# 数据清洗

数据清洗是数据分析的第一步，直接影响结果质量。

## 常见问题
- 缺失值：删除或填充（均值/中位数等）
- 异常值：IQR方法、Z-score方法检测
- 重复值：识别并删除
- 数据类型问题：转换格式
    `,
    question: `
## 练习题目：订单数据清洗

订单数据（含问题）：
- 订单1001: 5999元
- 订单1002: 3299元
- 订单1003: 199元
- 订单1004: 5999元（重复）
- 订单1005: 缺失
- 订单1006: 8999元
- 订单1007: 99999元（异常）
- 订单1008: 7299元

请清洗数据并计算有效订单统计。
    `,
    initialCode: `# 订单数据清洗练习
data = [5999, 3299, 199, 5999, None, 8999, 99999, 7299]

# 你的代码写在这里

print("清洗完成！")
`,
    solutionCode: `# 订单数据清洗练习 - 参考答案
data = [5999, 3299, 199, 5999, None, 8999, 99999, 7299]

print("="*60)
print("订单数据清洗")
print("="*60)
print()

# 1. 去重
unique_data = []
seen = set()
for val in data:
    if val not in seen:
        seen.add(val)
        unique_data.append(val)
print(f"去重后: {unique_data}")
print()

# 2. 填充缺失值
valid = [v for v in unique_data if v is not None]
mean_val = sum(valid) / len(valid)
filled_data = [mean_val if v is None else v for v in unique_data]
print(f"填充后: {[round(v) for v in filled_data]}")
print()

# 3. 处理异常值(IQR)
sorted_data = sorted(filled_data)
n = len(sorted_data)
q1 = sorted_data[n//4]
q3 = sorted_data[3*n//4]
iqr = q3 - q1
lower = q1 - 1.5*iqr
upper = q3 + 1.5*iqr
clean_data = [v for v in filled_data if lower <= v <= upper]

print(f"IQR范围: [{lower:.0f}, {upper:.0f}]")
print(f"清洗后: {[round(v) for v in clean_data]}")
print()

# 4. 最终统计
print("最终统计:")
print(f"  有效订单: {len(clean_data)}")
print(f"  总金额: {sum(clean_data):.0f}元")
print(f"  平均: {sum(clean_data)/len(clean_data):.0f}元")
`,
    explanation: `
## 答案解析
使用集合去重、均值填充缺失值、IQR方法检测异常值，是数据清洗的标准流程。
    `
  },
  {
    id: 3,
    title: "数据可视化",
    description: "使用Matplotlib/Seaborn绘图",
    difficulty: "intermediate",
    icon: "bar-chart",
    color: "from-purple-500 to-purple-600",
    theory: `
# 数据可视化

一图胜千言，让数据直观呈现。

## 常用图表
- 折线图：趋势变化
- 柱状图：分类对比
- 散点图：相关关系
- 箱线图：分布与异常
    `,
    question: `
## 练习题目：季度销售分析

季度销售数据（万元）：
- Q1: 电子50，服装30，食品20
- Q2: 电子55，服装32，食品22
- Q3: 电子58，服装35，食品25
- Q4: 电子65，服装38，食品28

请分析销售趋势和占比。
    `,
    initialCode: `# 季度销售分析练习
quarters = ["Q1", "Q2", "Q3", "Q4"]
electronics = [50, 55, 58, 65]
clothing = [30, 32, 35, 38]
food = [20, 22, 25, 28]

# 你的代码写在这里

print("分析完成！")
`,
    solutionCode: `# 季度销售分析练习 - 参考答案
quarters = ["Q1", "Q2", "Q3", "Q4"]
electronics = [50, 55, 58, 65]
clothing = [30, 32, 35, 38]
food = [20, 22, 25, 28]

print("="*60)
print("季度销售分析")
print("="*60)
print()

# 趋势分析
print("销售趋势:")
print("-"*60)
for q, e, c, f in zip(quarters, electronics, clothing, food):
    total = e + c + f
    print(f"{q}: 电子{e}万, 服装{c}万, 食品{f}万, 合计{total}万")
print()

# 增长率
print("环比增长率:")
for i in range(1, 4):
    e_growth = (electronics[i] - electronics[i-1])/electronics[i-1]*100
    c_growth = (clothing[i] - clothing[i-1])/clothing[i-1]*100
    f_growth = (food[i] - food[i-1])/food[i-1]*100
    print(f"{quarters[i-1]}→{quarters[i]}: 电子{e_growth:+.1f}%, 服装{c_growth:+.1f}%, 食品{f_growth:+.1f}%")
print()

# 年度占比
total_e = sum(electronics)
total_c = sum(clothing)
total_f = sum(food)
total_all = total_e + total_c + total_f

print("年度销售占比:")
print(f"  电子产品: {total_e}万 ({total_e/total_all*100:.1f}%)")
print(f"  服装: {total_c}万 ({total_c/total_all*100:.1f}%)")
print(f"  食品: {total_f}万 ({total_f/total_all*100:.1f}%)")
print()
print("📊 结论: 电子产品占比最高，全线持续增长，Q4表现最佳！")
`,
    explanation: `
## 答案解析
按季度展示数据、计算环比增长率、分析年度占比，是销售数据分析的常用方法。
    `
  },
  {
    id: 4,
    title: "统计分析",
    description: "描述性统计、假设检验",
    difficulty: "intermediate",
    icon: "calculator",
    color: "from-orange-500 to-orange-600",
    theory: `
# 统计分析

用数据说话，统计是基础。

## 描述性统计
- 集中趋势：均值、中位数、众数
- 离散程度：方差、标准差、四分位数
- 相关性：Pearson相关系数

## 推断统计
- 假设检验：t检验、卡方检验
- 显著性判断：p值
    `,
    question: `
## 练习题目：学生成绩分析

两次考试成绩：
- 考试1: 78,85,92,67,88,95,72,81,89,76,83,90,79,86,94
- 考试2: 82,88,90,72,92,96,78,85,91,79,86,93,83,89,95

请分析成绩变化和相关性。
    `,
    initialCode: `# 学生成绩分析练习
import statistics

exam1 = [78,85,92,67,88,95,72,81,89,76,83,90,90,94]
exam2 = [82,88,90,72,92,96,78,85,91,79,86,93,89,95]

# 你的代码写在这里

print("分析完成！")
`,
    solutionCode: `# 学生成绩分析练习 - 参考答案
import statistics
import math

exam1 = [78,85,92,67,88,90,90,94]  # 简化数据
exam2 = [82,88,90,72,92,96,78,85,91,79,86,90,90,95]

print("="*60)
print("学生成绩统计分析")
print("="*60)
print()

# 描述性统计
def describe(data, name):
    print(f"{name}:")
    print(f"  平均分: {statistics.mean(data):.1f}")
    print(f"  中位数: {statistics.median(data):.1f}")
    print(f"  标准差: {statistics.stdev(data):.2f}")
    print()

describe(exam1, "考试1")
describe(exam2, "考试2")

# 成绩变化
mean1 = statistics.mean(exam1)
mean2 = statistics.mean(exam2)
print(f"平均分变化: {mean1:.1f} → {mean2:.1f}")
improvements = [e2-e1 for e1,e2 in zip(exam1, exam2)]
print(f"平均提升: {statistics.mean(improvements):.1f}分")
print()

# 相关性分析
mean_x, mean_y = statistics.mean(exam1), statistics.mean(exam2)
num = sum((x-mean_x)*(y-mean_y) for x,y in zip(exam1, exam2))
den_x = math.sqrt(sum((x-mean_x)**2 for x in exam1))
den_y = math.sqrt(sum((y-mean_y)**2 for y in exam2))
corr = num / (den_x * den_y)
print(f"相关系数: {corr:.3f}")
print("  强正相关：第一次考得好，第二次也往往好！")
`,
    explanation: `
## 答案解析
使用统计库计算描述性指标，手动实现相关系数，理解数据关系。
    `
  },
  {
    id: 5,
    title: "Excel数据分析",
    description: "使用pandas处理表格数据",
    difficulty: "intermediate",
    icon: "table",
    color: "from-teal-500 to-teal-600",
    theory: `
# Excel数据分析

用Python也能做Excel的事，而且更自动化。

## 核心操作
- 数据读取：CSV、Excel文件
- 数据筛选：按条件过滤
- 数据聚合：分组统计（类似透视表）
- 数据合并：多个表连接
    `,
    question: `
## 练习题目：订单多维度分析

订单数据（产品类别、地区、金额）：
- 手机,北京,6000
- T恤,上海,495
- 零食,广州,880
- 平板,深圳,2500
- 外套,北京,897
- 巧克力,上海,472
- 耳机,广州,796
- 裤子,深圳,318

请按产品类别和地区分析。
    `,
    initialCode: `# 订单多维度分析练习
orders = [
    ("手机", "北京", 6000),
    ("T恤", "上海", 495),
    ("零食", "广州", 880),
    ("平板", "深圳", 2500),
    ("外套", "北京", 897),
    ("巧克力", "上海", 472),
    ("耳机", "广州", 796),
    ("裤子", "深圳", 318)
]

# 你的代码写在这里

print("分析完成！")
`,
    solutionCode: `# 订单多维度分析练习 - 参考答案
from collections import defaultdict

orders = [
    ("手机", "北京", 6000),
    ("T恤", "上海", 495),
    ("零食", "广州", 880),
    ("平板", "深圳", 2500),
    ("外套", "北京", 897),
    ("巧克力", "上海", 472),
    ("耳机", "广州", 796),
    ("裤子", "深圳", 318)
]

print("="*60)
print("销售订单多维度分析")
print("="*60)
print()

# 按产品类别
print("按产品类别汇总:")
print("-"*40)
category_stats = defaultdict(lambda: {"count":0, "amount":0})
for product, region, amount in orders:
    category = "电子产品" if product in ["手机","平板","耳机"] else "食品" if product in ["零食","巧克力"] else "服装"
    category_stats[category]["count"] +=1
    category_stats[category]["amount"] += amount

for category, stats in sorted(category_stats.items(), key=lambda x:x[1]["amount"], reverse=True):
    print(f"{category:10}: {stats['count']:2d}单, {stats['amount']:5d}元")
print()

# 按地区
print("按地区汇总:")
print("-"*40)
region_stats = defaultdict(lambda: {"count":0, "amount":0})
for product, region, amount in orders:
    region_stats[region]["count"] +=1
    region_stats[region]["amount"] += amount

for region, stats in sorted(region_stats.items(), key=lambda x:x[1]["amount"], reverse=True):
    print(f"{region:8}: {stats['count']:2d}单, {stats['amount']:5d}元")
print()

# 总体统计
total_amount = sum(a for _,_,a in orders)
print(f"总计: {len(orders)}单, {total_amount}元")
`,
    explanation: `
## 答案解析
使用defaultdict进行分组统计，类似Excel的透视表功能，从多个维度分析数据。
    `
  },
  {
    id: 6,
    title: "机器学习入门",
    description: "回归与分类算法",
    difficulty: "advanced",
    icon: "brain",
    color: "from-pink-500 to-pink-600",
    theory: `
# 机器学习入门

让机器从数据中学习规律。

## 监督学习
- 回归：预测连续值（如房价、销售额）
- 分类：预测类别（如是否流失、是否垃圾邮件）

## 线性回归
模型：y = w*x + b
- w：权重，x每增加1，y平均变化w
- b：截距，x为0时的值
    `,
    question: `
## 练习题目：广告与销售预测

广告投入与销售数据：
广告: 5,6,7,8,9,10,11,12,13,14（万元）
销售:30,35,40,45,50,55,60,65,70,75（万元）

请建立线性回归模型并预测广告20万时的销售。
    `,
    initialCode: `# 线性回归练习
advertising = [5,6,7,8,9,10,11,12,13,14]
sales = [30,35,40,45,50,55,60,65,70,75]

# 你的代码写在这里

print("分析完成！")
`,
    solutionCode: `# 线性回归练习 - 参考答案
advertising = [5,6,7,8,9,10,11,12,13,14]
sales = [30,35,40,45,50,55,60,65,70,75]

print("="*60)
print("线性回归：广告投入与销售预测")
print("="*60)
print()

n = len(advertising)
mean_x = sum(advertising)/n
mean_y = sum(sales)/n

# 计算w和b
numerator = sum((x-mean_x)*(y-mean_y) for x,y in zip(advertising, sales))
denominator = sum((x-mean_x)**2 for x in advertising)
w = numerator / denominator
b = mean_y - w * mean_x

print(f"回归方程: y = {w:.0f}x + {b:.0f}")
print(f"解释: 广告每增加1万元，销售增加{w:.0f}万元")
print()

# 模型评估
predictions = [w*x+b for x in advertising]
mae = sum(abs(y-y_pred) for y,y_pred in zip(sales, predictions))/n
print(f"平均绝对误差: {mae:.2f}万元")
print()

# 预测
new_ad = 20
predicted_sales = w * new_ad + b
print(f"广告投入{new_ad}万元时，预测销售额: {predicted_sales:.0f}万元")
print()
print("📊 结论: 完美线性关系！模型非常准确！")
`,
    explanation: `
## 答案解析
最小二乘法求解线性回归参数w和b，MAE评估模型，然后用于预测。
    `
  },
  {
    id: 7,
    title: "时间序列分析",
    description: "预测未来趋势",
    difficulty: "advanced",
    icon: "trending-up",
    color: "from-indigo-500 to-indigo-600",
    theory: `
# 时间序列分析

从历史数据中预测未来。

## 时间序列成分
- 趋势：长期上升/下降
- 季节：周期性波动
- 随机：不可预测的噪声

## 预测方法
- 移动平均：简单、加权
- 指数平滑：近期权重更高
- ARIMA：经典统计方法
    `,
    question: `
## 练习题目：月度销量预测

12个月销量：120,135,142,158,165,180,175,190,205,210,225,240

请用移动平均预测第13个月。
    `,
    initialCode: `# 时间序列预测练习
sales = [120,135,142,158,165,180,175,190,205,210,225,240]

# 你的代码写在这里

print("预测完成！")
`,
    solutionCode: `# 时间序列预测练习 - 参考答案
sales = [120,135,142,158,165,180,175,190,205,210,225,240]
months = ["M1","M2","M3","M4","M5","M6","M7","M8","M9","M10","M11","M12"]

print("="*60)
print("月度销量分析与预测")
print("="*60)
print()

# 显示历史数据
print("历史销量:")
for m, s in zip(months, sales):
    print(f"  {m}: {s}")
print()

# 简单移动平均(3个月)
window_size = 3
sma_predictions = []
for i in range(window_size, len(sales)):
    sma = sum(sales[i-window_size:i])/window_size
    sma_predictions.append(sma)

# 加权移动平均(权重0.5,0.3,0.2)
weights = [0.5, 0.3, 0.2]
wma_predictions = []
for i in range(window_size, len(sales)):
    window = sales[i-window_size:i]
    wma = sum(w*x for w,x in zip(weights, window))
    wma_predictions.append(wma)

# 预测下月
next_sma = sum(sales[-window_size:])/window_size
next_wma = sum(w*x for w,x in zip(weights, sales[-window_size:]))

print(f"未来1个月预测:")
print(f"  简单移动平均: {next_sma:.0f}")
print(f"  加权移动平均: {next_wma:.0f}")
print()

# 趋势分析
first_half_avg = sum(sales[:6])/6
second_half_avg = sum(sales[6:])/6
growth = (second_half_avg - first_half_avg)/first_half_avg*100

print("趋势分析:")
print(f"  上半年平均: {first_half_avg:.0f}")
print(f"  下半年平均: {second_half_avg:.0f}")
print(f"  增长率: {growth:.1f}%")
print()
print("📊 结论: 销量稳步增长，趋势向好！")
`,
    explanation: `
## 答案解析
简单移动平均和加权移动平均是时间序列预测的基础方法，后者更重视近期数据。
    `
  },
  {
    id: 8,
    title: "客户分群",
    description: "K-means聚类分析",
    difficulty: "advanced",
    icon: "users",
    color: "from-cyan-500 to-cyan-600",
    theory: `
# 客户分群

将客户分组，精准营销。

## 聚类概念
- 无监督学习：没有标签，自动发现相似性
- 相似性：距离度量（欧氏距离等）

## K-means算法
1. 随机选K个中心点
2. 分配点到最近中心
3. 更新中心为簇均值
4. 重复直到收敛

## RFM模型
- Recency: 最近一次购买
- Frequency: 购买频率
- Monetary: 消费金额
    `,
    question: `
## 练习题目：客户RFM分群

客户数据(R,F,M):
A(2,15,5000), B(5,12,4500), C(1,20,8000), D(10,5,1500),
E(30,2,500), F(20,3,800), G(7,8,2500), H(15,6,1800),
I(1,25,10000), J(25,1,200), K(5,10,3500), L(8,7,2200),
M(3,18,6500), N(60,1,100), O(4,14,4800), P(12,4,1200)

请用K-means将客户分为3群。
    `,
    initialCode: `# K-means客户分群练习
import math
import random

customers = [
    (2,15,5000), (5,12,4500), (1,20,8000), (10,5,1500),
    (30,2,500), (20,3,800), (7,8,2500), (15,6,1800),
    (1,25,10000), (25,1,200), (5,10,3500), (8,7,2200),
    (3,18,6500), (60,1,100), (4,14,4800), (12,4,1200)
]

# 你的代码写在这里

print("分群完成！")
`,
    solutionCode: `# K-means客户分群练习 - 参考答案
import math
import random

customers = [
    (2,15,5000), (5,12,4500), (1,20,8000), (10,5,1500),
    (30,2,500), (20,3,800), (7,8,2500), (15,6,1800),
    (1,25,10000), (25,1,200), (5,10,3500), (8,7,2200),
    (3,18,6500), (60,1,100), (4,14,4800), (12,4,1200)
]

print("="*60)
print("K-means客户分群")
print("="*60)
print()

# 标准化数据
def normalize(data):
    transposed = list(zip(*data))
    normalized = []
    for col in transposed:
        min_val, max_val = min(col), max(col)
        normalized_col = [(x-min_val)/(max_val-min_val) if max_val>min_val else 0.5 for x in col]
        normalized.append(normalized_col)
    return list(zip(*normalized))

normalized = normalize(customers)

# K-means实现 (K=3)
K = 3
centroids = random.sample(normalized, K)

for iter in range(10):
    # 分配簇
    clusters = [[] for _ in range(K)]
    for point in normalized:
        dists = [math.sqrt(sum((p-c)**2 for p,c in zip(point, cent))) for cent in centroids]
        cluster_idx = dists.index(min(dists))
        clusters[cluster_idx].append(point)
    
    # 更新中心
    new_centroids = []
    for cluster in clusters:
        if cluster:
            new_centroid = tuple(sum(p[i] for p in cluster)/len(cluster) for i in range(3))
            new_centroids.append(new_centroid)
        else:
            new_centroids.append(centroids[clusters.index(cluster)])
    
    if new_centroids == centroids:
        break
    centroids = new_centroids

print(f"迭代{iter+1}次后收敛")
print()
print("客户分群结果:")
print("-"*60)

# 反标准化并标注
transposed_orig = list(zip(*customers))
mins = [min(col) for col in transposed_orig]
maxs = [max(col) for col in transposed_orig]

for i, cluster in enumerate(clusters):
    print(f"\\n群集{i+1} (包含{len(cluster)}位客户):")
    if cluster:
        center_orig = tuple(
            centroids[i][j]*(maxs[j]-mins[j])+mins[j] for j in range(3)
        )
        r, f, m = center_orig
        print(f"  中心: R={r:.0f}天, F={f:.0f}次, M={m:.0f}元")
        
        if m > 4000:
            print("  💎 高价值客户 - 重点维护！")
        elif m > 1500:
            print("  📈 中等价值 - 潜力挖掘！")
        else:
            print("  📊 低活跃 - 唤回策略！")
`,
    explanation: `
## 答案解析
数据标准化后用K-means聚类，将客户分为高价值、中等、低活跃三群，便于精准营销。
    `
  },
  {
    id: 9,
    title: "A/B测试",
    description: "产品效果评估",
    difficulty: "advanced",
    icon: "activity",
    color: "from-red-500 to-red-600",
    theory: `
# A/B测试

科学评估产品改动效果。

## 实验设计
- 对照A组：原版
- 实验B组：新版
- 随机分配，保证可比

## 统计检验
- 原假设H0：A与B无差异
- p值<0.05：拒绝H0，有显著差异
- Z检验：比例类指标
    `,
    question: `
## 练习题目：页面改版效果评估

A/B测试数据：
- A组：1000访客，100转化
- B组：1000访客，130转化

请用Z检验判断差异是否显著。
    `,
    initialCode: `# A/B测试分析练习
import math

visitors_a = 1000
conversions_a = 100
visitors_b = 1000
conversions_b = 130

# 你的代码写在这里

print("分析完成！")
`,
    solutionCode: `# A/B测试分析练习 - 参考答案
import math

visitors_a = 1000
conversions_a = 100
visitors_b = 1000
conversions_b = 130

print("="*60)
print("A/B测试：页面改版效果评估")
print("="*60)
print()

# 基础统计
rate_a = conversions_a / visitors_a
rate_b = conversions_b / visitors_b
diff_abs = rate_b - rate_a
diff_rel = (rate_b - rate_a)/rate_a*100

print("基本数据:")
print(f"  A组: {conversions_a}/{visitors_a} ({rate_a:.1%})")
print(f"  B组: {conversions_b}/{visitors_b} ({rate_b:.1%})")
print(f"  绝对提升: {diff_abs:.1%}")
print(f"  相对提升: {diff_rel:.1f}%")
print()

# Z检验
p_pool = (conversions_a + conversions_b)/(visitors_a + visitors_b)
se_pool = math.sqrt(p_pool*(1-p_pool)*(1/visitors_a + 1/visitors_b))
z_score = (rate_b - rate_a)/se_pool

# p值（双尾）
if z_score > 0:
    p_value = 2*(1-(0.5*(1+math.erf(z_score/math.sqrt(2)))))
else:
    p_value = 2*(0.5*(1+math.erf(z_score/math.sqrt(2))))

print("统计检验:")
print(f"  Z统计量: {z_score:.3f}")
print(f"  p值: {p_value:.4f}")
print()

# 结论
alpha = 0.05
print("结论:")
if p_value < alpha:
    print(f"  ✓ 统计显著！(p={p_value:.4f}<0.05)")
    if rate_b > rate_a:
        print("  ✓ B组表现更好！建议采用新版本！")
    else:
        print("  ✗ A组更好，保持原版本")
else:
    print(f"  ✗ 不显著(p={p_value:.4f}>=0.05)，增加样本再试")
`,
    explanation: `
## 答案解析
计算转化率、合并比例、标准误、Z统计量和p值，判断是否有统计显著的改善。
    `
  },
  {
    id: 10,
    title: "数据报告撰写",
    description: "数据故事化呈现",
    difficulty: "advanced",
    icon: "file-text",
    color: "from-amber-500 to-amber-600",
    theory: `
# 数据报告撰写

让数据讲故事，驱动决策。

## 报告结构
1. 执行摘要：核心发现、建议（一页纸）
2. 背景：分析目的、数据来源
3. 发现：数据+洞察
4. 建议：可行动、优先级

## 呈现原则
- 简洁：避免装饰，突出重点
- 直观：图表优于表格
- 结论先行：先讲结论，再给论据
    `,
    question: `
## 练习题目：年度业务分析报告

季度业务数据：
- Q1: 收入50万，用户10000，满意度4.2
- Q2: 收入55万，用户11500，满意度4.3
- Q3: 收入52万，用户11000，满意度4.1
- Q4: 收入62万，用户13000，满意度4.4

请撰写一份完整的分析报告。
    `,
    initialCode: `# 年度业务分析报告练习
data = {
    "Q1": {"revenue":50, "users":10000, "satisfaction":4.2},
    "Q2": {"revenue":55, "users":11500, "satisfaction":4.3},
    "Q3": {"revenue":52, "users":11000, "satisfaction":4.1},
    "Q4": {"revenue":62, "users":13000, "satisfaction":4.4}
}

# 你的代码写在这里

print("报告完成！")
`,
    solutionCode: `# 年度业务分析报告练习 - 参考答案
data = {
    "Q1": {"revenue":50, "users":10000, "satisfaction":4.2},
    "Q2": {"revenue":55, "users":11500, "satisfaction":4.3},
    "Q3": {"revenue":52, "users":11000, "satisfaction":4.1},
    "Q4": {"revenue":62, "users":13000, "satisfaction":4.4}
}

print("="*70)
print(" "*20 + "2024年度业务分析报告")
print("="*70)
print()

# 执行摘要
print("【执行摘要】")
print("-"*70)
print("核心发现:")
total_rev = sum(d["revenue"] for d in data.values())
print(f"  • 年度总收入{total_rev}万，Q4表现最佳达62万")
print(f"  • 用户从10000增长到13000，持续上升")
print(f"  • 满意度稳步提升，年末达4.4分")
print()
print("关键建议:")
print("  1. 复盘Q4成功经验，复制到明年")
print("  2. 建立用户反馈快速响应机制")
print("  3. 推出老用户召回活动，巩固增长")
print()

# 业务回顾
print("【业务回顾】")
print("-"*70)
print(f"{'季度':6} {'收入(万)':10} {'用户':10} {'满意度':10}")
print("-"*70)
for q, d in data.items():
    print(f"{q:6} {d['revenue']:<10.0f} {d['users']:<10} {d['satisfaction']:<10.1f}")
print()

# 关键洞察
print("【关键洞察】")
print("-"*70)
print("收入分析:")
q4_growth = (data["Q4"]["revenue"]-data["Q3"]["revenue"])/data["Q3"]["revenue"]*100
print(f"  年度总收入{total_rev}万，Q4环比增长{q4_growth:.1f}%")
print()

print("用户分析:")
user_growth = (data["Q4"]["users"]-data["Q1"]["users"])
print(f"  用户从{data['Q1']['users']}增长到{data['Q4']['users']}，增加{user_growth}人")
print()

print("满意度分析:")
avg_sat = sum(d["satisfaction"] for d in data.values())/4
sat_trend = "上升" if data["Q4"]["satisfaction"]>data["Q1"]["satisfaction"] else "下降"
print(f"  平均满意度{avg_sat:.1f}分，趋势{sat_trend}")
print()

# 行动计划
print("【行动计划】")
print("-"*70)
print("优先级 | 行动事项          | 负责团队 | 时间节点")
print("--------|--------------------|----------|----------")
print("高优先级 | 复盘Q4成功经验     | 营销团队 | 1月中旬")
print("高优先级 | 老用户召回活动     | 用户运营 | 1月底")
print("中优先级 | 优化反馈流程       | 产品团队 | 2月中旬")
print("中优先级 | 制定Q1增长目标     | 管理层   | 1月初")
print()
print("="*70)
print("📊 报告说明: 数据驱动决策，持续优化！")
print("="*70)
`,
    explanation: `
## 答案解析
一份好的分析报告，结构清晰、结论先行、洞察深入、建议可行，让数据真正驱动业务。
    `
  }
]
