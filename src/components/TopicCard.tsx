
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Code, Database, BarChart3, Calculator, Table, Brain, 
  TrendingUp, Users, Activity, FileText 
} from 'lucide-react';
import { Topic } from '../data/topics';

interface TopicCardProps {
  topic: Topic;
}

const iconMap: Record<string, React.ReactNode> = {
  'code': <Code className="h-6 w-6" />,
  'database': <Database className="h-6 w-6" />,
  'bar-chart': <BarChart3 className="h-6 w-6" />,
  'calculator': <Calculator className="h-6 w-6" />,
  'table': <Table className="h-6 w-6" />,
  'brain': <Brain className="h-6 w-6" />,
  'trending-up': <TrendingUp className="h-6 w-6" />,
  'users': <Users className="h-6 w-6" />,
  'activity': <Activity className="h-6 w-6" />,
  'file-text': <FileText className="h-6 w-6" />,
};

const difficultyLabels: Record<string, string> = {
  'beginner': '入门',
  'intermediate': '进阶',
  'advanced': '高级',
};

const difficultyColors: Record<string, string> = {
  'beginner': 'bg-green-100 text-green-800',
  'intermediate': 'bg-yellow-100 text-yellow-800',
  'advanced': 'bg-red-100 text-red-800',
};

const TopicCard: React.FC<TopicCardProps> = ({ topic }) => {
  return (
    <Link to={`/topic/${topic.id}`} className="group">
      <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-100 hover:border-sky-200">
        <div className={`bg-gradient-to-r ${topic.color} p-6 text-white`}>
          <div className="flex items-center justify-between">
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              {iconMap[topic.icon] || <Code className="h-6 w-6" />}
            </div>
            <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
              topic.difficulty === 'beginner' ? 'bg-green-100/20 text-green-100' :
              topic.difficulty === 'intermediate' ? 'bg-yellow-100/20 text-yellow-100' :
              'bg-red-100/20 text-red-100'
            }`}>
              {difficultyLabels[topic.difficulty]}
            </span>
          </div>
        </div>
        <div className="p-6">
          <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-sky-600 transition-colors">
            {topic.title}
          </h3>
          <p className="text-slate-600 text-sm mb-4 line-clamp-2">
            {topic.description}
          </p>
          <div className="flex items-center text-sm text-sky-600 font-medium group-hover:translate-x-1 transition-transform">
            开始学习
            <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default TopicCard;
