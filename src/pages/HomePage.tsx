
import React from 'react';
import { BookOpen, Code2, Sparkles } from 'lucide-react';
import TopicCard from '../components/TopicCard';
import { topics } from '../data/topics';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-sky-500/20 px-4 py-2 rounded-full mb-6">
              <Sparkles className="h-4 w-4 text-sky-400" />
              <span className="text-sky-300 text-sm font-medium">互动式学习平台</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              商务数据分析与应用
            </h1>
            <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
              10个核心主题，从Python基础到数据报告撰写，边学边练，快速掌握商务数据分析技能
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <div className="flex items-center space-x-2 text-slate-400">
                <BookOpen className="h-5 w-5" />
                <span>10个主题</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-400">
                <Code2 className="h-5 w-5" />
                <span>可运行代码</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Topics Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-800 mb-4">学习主题</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            从基础到进阶，系统学习商务数据分析的核心技能
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {topics.map((topic) => (
            <TopicCard key={topic.id} topic={topic} />
          ))}
        </div>
      </div>

      {/* Footer CTA */}
      <div className="bg-gradient-to-r from-sky-600 to-blue-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h3 className="text-2xl font-bold mb-4">开始你的数据分析之旅</h3>
          <p className="text-sky-100 mb-6">
            无需配置环境，直接在浏览器中编写和运行代码
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#topics"
              className="inline-flex items-center px-6 py-3 bg-white text-sky-700 font-semibold rounded-lg hover:bg-sky-50 transition-colors"
            >
              选择第一个主题
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
