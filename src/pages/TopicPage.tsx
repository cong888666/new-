
import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Play, RotateCcw, ArrowLeft, ChevronLeft, ChevronRight, BookOpen, Lightbulb } from 'lucide-react';
import { topics, Topic } from '../data/topics';
import CodeEditor from '../components/CodeEditor';
import OutputPanel from '../components/OutputPanel';

declare global {
  interface Window {
    loadPyodide: any;
  }
}

const TopicPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [topic, setTopic] = useState<Topic | null>(null);
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [pyodide, setPyodide] = useState<any>(null);
  const [isPyodideLoading, setIsPyodideLoading] = useState(true);
  const [showSolution, setShowSolution] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  // Load topic data
  useEffect(() => {
    const topicId = parseInt(id || '0');
    const foundTopic = topics.find(t => t.id === topicId);
    if (foundTopic) {
      setTopic(foundTopic);
      setCode(foundTopic.initialCode);
      setOutput('');
      setError(null);
      setShowSolution(false);
      setShowExplanation(false);
    }
  }, [id]);

  // Load Pyodide
  useEffect(() => {
    const loadPyodide = async () => {
      try {
        if (!window.loadPyodide) {
          const script = document.createElement('script');
          script.src = 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js';
          script.async = true;
          script.onload = async () => {
            const pyodideInstance = await window.loadPyodide({
              indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/'
            });
            setPyodide(pyodideInstance);
            setIsPyodideLoading(false);
          };
          document.body.appendChild(script);
        } else {
          const pyodideInstance = await window.loadPyodide({
            indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/'
          });
          setPyodide(pyodideInstance);
          setIsPyodideLoading(false);
        }
      } catch (err) {
        console.error('Failed to load Pyodide:', err);
        setIsPyodideLoading(false);
      }
    };

    loadPyodide();
  }, []);

  const runCode = useCallback(async () => {
    if (!pyodide) {
      setError('Python 环境正在加载中，请稍候...');
      return;
    }

    setIsLoading(true);
    setError(null);
    setOutput('');

    try {
      // Redirect stdout
      let outputBuffer = '';
      pyodide.runPython(`
        import sys
        from io import StringIO
        sys.stdout = StringIO()
      `);

      // Run the code
      await pyodide.runPythonAsync(code);

      // Get the output
      const result = pyodide.runPython('sys.stdout.getvalue()');
      outputBuffer = result;

      if (outputBuffer) {
        setOutput(outputBuffer);
      } else {
        setOutput('代码执行成功，但没有输出');
      }
    } catch (err: any) {
      setError(err.message || '执行出错');
    } finally {
      setIsLoading(false);
    }
  }, [pyodide, code]);

  const resetCode = () => {
    if (topic) {
      setCode(topic.initialCode);
      setOutput('');
      setError(null);
    }
  };

  const showAnswer = () => {
    if (topic) {
      setCode(topic.solutionCode);
      setShowSolution(true);
      setShowExplanation(true);
    }
  };

  const navigateTopic = (direction: number) => {
    if (!topic) return;
    const currentIndex = topics.findIndex(t => t.id === topic.id);
    const newIndex = currentIndex + direction;
    if (newIndex >= 0 && newIndex < topics.length) {
      navigate(`/topic/${topics[newIndex].id}`);
    }
  };

  if (!topic) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-600 mb-4">主题未找到</p>
          <Link to="/" className="text-sky-600 hover:text-sky-700 font-medium">
            返回首页
          </Link>
        </div>
      </div>
    );
  }

  const currentIndex = topics.findIndex(t => t.id === topic.id);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navigation Bar */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <Link
              to="/"
              className="flex items-center space-x-2 text-slate-600 hover:text-slate-800 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm font-medium">返回首页</span>
            </Link>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigateTopic(-1)}
                disabled={currentIndex === 0}
                className={`p-2 rounded-lg transition-colors ${
                  currentIndex === 0
                    ? 'text-slate-300 cursor-not-allowed'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <span className="text-sm text-slate-600">
                {topic.id} / {topics.length}
              </span>
              <button
                onClick={() => navigateTopic(1)}
                disabled={currentIndex === topics.length - 1}
                className={`p-2 rounded-lg transition-colors ${
                  currentIndex === topics.length - 1
                    ? 'text-slate-300 cursor-not-allowed'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Topic Header */}
      <div className={`bg-gradient-to-r ${topic.color} text-white`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
              <BookOpen className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold mb-2">{topic.title}</h1>
              <p className="text-white/90">{topic.description}</p>
              <div className="mt-2">
                <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                  topic.difficulty === 'beginner' ? 'bg-green-100/20 text-green-100' :
                  topic.difficulty === 'intermediate' ? 'bg-yellow-100/20 text-yellow-100' :
                  'bg-red-100/20 text-red-100'
                }`}>
                  {topic.difficulty === 'beginner' ? '入门' : 
                   topic.difficulty === 'intermediate' ? '进阶' : '高级'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Theory & Question */}
          <div className="lg:col-span-1 space-y-6">
            {/* Theory Section */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
                <h2 className="text-lg font-semibold text-slate-800 flex items-center">
                  <BookOpen className="h-5 w-5 mr-2 text-sky-600" />
                  理论讲解
                </h2>
              </div>
              <div className="p-6">
                <div className="prose prose-slate max-w-none">
                  {topic.theory.split('\\n').map((line, index) => {
                    if (line.startsWith('# ')) {
                      return (
                        <h1 key={index} className="text-2xl font-bold text-slate-800 mb-4 mt-0">
                          {line.replace('# ', '')}
                        </h1>
                      );
                    } else if (line.startsWith('## ')) {
                      return (
                        <h2 key={index} className="text-xl font-semibold text-slate-700 mt-6 mb-3">
                          {line.replace('## ', '')}
                        </h2>
                      );
                    } else if (line.trim().startsWith('- ')) {
                      return (
                        <li key={index} className="text-slate-600 mb-1 ml-4">
                          {line.replace('- ', '')}
                        </li>
                      );
                    } else if (line.trim()) {
                      return (
                        <p key={index} className="text-slate-600 mb-3 leading-relaxed">
                          {line}
                        </p>
                      );
                    }
                    return null;
                  })}
                </div>
              </div>
            </div>

            {/* Question Section */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-200 bg-amber-50">
                <h2 className="text-lg font-semibold text-slate-800 flex items-center">
                  <Lightbulb className="h-5 w-5 mr-2 text-amber-600" />
                  练习题目
                </h2>
              </div>
              <div className="p-6">
                <div className="prose prose-slate max-w-none">
                  {topic.question.split('\\n').map((line, index) => {
                    if (line.startsWith('# ')) {
                      return (
                        <h1 key={index} className="text-2xl font-bold text-slate-800 mb-4 mt-0">
                          {line.replace('# ', '')}
                        </h1>
                      );
                    } else if (line.startsWith('## ')) {
                      return (
                        <h2 key={index} className="text-xl font-semibold text-slate-700 mt-6 mb-3">
                          {line.replace('## ', '')}
                        </h2>
                      );
                    } else if (line.trim().startsWith('- ')) {
                      return (
                        <li key={index} className="text-slate-600 mb-1 ml-4">
                          {line.replace('- ', '')}
                        </li>
                      );
                    } else if (line.trim()) {
                      return (
                        <p key={index} className="text-slate-600 mb-3 leading-relaxed">
                          {line}
                        </p>
                      );
                    }
                    return null;
                  })}
                </div>
              </div>
            </div>

            {/* Explanation Section (shown after user views answer) */}
            {showExplanation && (
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-200 bg-emerald-50">
                  <h2 className="text-lg font-semibold text-slate-800 flex items-center">
                    <Lightbulb className="h-5 w-5 mr-2 text-emerald-600" />
                    答案解析
                  </h2>
                </div>
                <div className="p-6">
                  <div className="prose prose-slate max-w-none">
                    {topic.explanation.split('\\n').map((line, index) => {
                      if (line.startsWith('# ')) {
                        return (
                          <h1 key={index} className="text-2xl font-bold text-slate-800 mb-4 mt-0">
                            {line.replace('# ', '')}
                          </h1>
                        );
                      } else if (line.startsWith('## ')) {
                        return (
                          <h2 key={index} className="text-xl font-semibold text-slate-700 mt-6 mb-3">
                            {line.replace('## ', '')}
                          </h2>
                        );
                      } else if (line.trim().startsWith('- ')) {
                        return (
                          <li key={index} className="text-slate-600 mb-1 ml-4">
                            {line.replace('- ', '')}
                          </li>
                        );
                      } else if (line.trim()) {
                        return (
                          <p key={index} className="text-slate-600 mb-3 leading-relaxed">
                            {line}
                          </p>
                        );
                      }
                      return null;
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Code Editor */}
          <div className="lg:col-span-1 space-y-6">
            {/* Code Editor Controls */}
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-lg font-semibold text-slate-800 flex items-center">
                <Play className="h-5 w-5 mr-2 text-slate-600" />
                代码编辑器
              </h2>
              <div className="flex-1"></div>
              <div className="flex items-center gap-3">
                <button
                  onClick={resetCode}
                  className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  <RotateCcw className="h-4 w-4" />
                  <span>重置</span>
                </button>
                <button
                  onClick={showAnswer}
                  className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-amber-600 rounded-lg hover:bg-amber-700 transition-colors shadow-md"
                >
                  <Lightbulb className="h-4 w-4" />
                  <span>查看答案</span>
                </button>
                <button
                  onClick={runCode}
                  disabled={isLoading || isPyodideLoading}
                  className="flex items-center space-x-2 px-6 py-2 text-sm font-medium text-white bg-sky-600 rounded-lg hover:bg-sky-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-md"
                >
                  <Play className="h-4 w-4" />
                  <span>{isPyodideLoading ? '加载中...' : isLoading ? '运行中...' : '运行代码'}</span>
                </button>
              </div>
            </div>

            {/* Code Editor */}
            <CodeEditor code={code} onChange={setCode} />

            {/* Output Panel */}
            <OutputPanel output={output} error={error} isLoading={isLoading} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopicPage;
