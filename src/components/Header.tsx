
import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart3 } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-slate-900 to-slate-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-3">
            <BarChart3 className="h-8 w-8 text-sky-400" />
            <span className="text-xl font-bold bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent">
              商务数据分析与应用
            </span>
          </Link>
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-slate-300 hover:text-white transition-colors">
              首页
            </Link>
            <span className="text-slate-500">|</span>
            <span className="text-slate-400 text-sm">10个主题 · 边学边练</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
