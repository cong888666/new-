import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Play, RotateCcw, ArrowLeft, ChevronLeft, ChevronRight, 
  BookOpen, Lightbulb, Target, List, CheckCircle, HelpCircle,
  Menu, X, GraduationCap, FileText, Code
} from 'lucide-react';
import { topics, Topic, Quiz } from '../data/topics';
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
  const [showExplanation, setShowExplanation] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showQuizResult, setShowQuizResult] = useState(false);

  useEffect(() => {
    const topicId = parseInt(id || '0');
    const foundTopic = topics.find(t => t.id === topicId);
    if (foundTopic) {
      setTopic(foundTopic);
      setCode(foundTopic.code);
      setOutput('');
      setError(null);
      setShowExplanation(false);
      setCurrentQuizIndex(0);
      setSelectedAnswer(null);
      setShowQuizResult(false);
    }
  }, [id]);

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
      let outputBuffer = '';
      pyodide.runPython(`
        import sys
        from io import StringIO
        sys.stdout = StringIO()
      `);

      await pyodide.runPythonAsync(code);

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
      setCode(topic.code);
      setOutput('');
      setError(null);
      setShowExplanation(false);
    }
  };

  const showAnswer = () => {
    setShowExplanation(true);
  };

  const navigateTopic = (direction: number) => {
    if (!topic) return;
    const currentIndex = topics.findIndex(t => t.id === topic.id);
    const newIndex = currentIndex + direction;
    if (newIndex >= 0 && newIndex < topics.length) {
      navigate(`/topic/${topics[newIndex].id}`);
    }
  };

  const handleQuizAnswer = (index: number) => {
    if (showQuizResult) return;
    setSelectedAnswer(index);
    setShowQuizResult(true);
  };

  const nextQuiz = () => {
    if (topic && currentQuizIndex < topic.quizzes.length - 1) {
      setCurrentQuizIndex(currentQuizIndex + 1);
      setSelectedAnswer(null);
      setShowQuizResult(false);
    }
  };

  const renderMarkdown = (content: string) => {
    return content.split('\\n').map((line, index) => {
      if (line.startsWith('# ')) {
        return (
          <h1 key={index} className="text-2xl font-bold text-slate-800 mb-4 mt-6 first:mt-0">
            {line.replace('# ', '')}
          </h1>
        );
      } else if (line.startsWith('## ')) {
        return (
          <h2 key={index} className="text-xl font-semibold text-slate-700 mt-6 mb-3">
            {line.replace('## ', '')}
          </h2>
        );
      } else if (line.startsWith('### ')) {
        return (
          <h3 key={index} className="text-lg font-semibold text-slate-700 mt-4 mb-2">
            {line.replace('### ', '')}
          </h3>
        );
      } else if (line.trim().startsWith('- ')) {
        return (
          <li key={index} className="text-slate-600 mb-2 ml-4 list-disc">
            {line.replace('- ', '')}
          </li>
        );
      } else if (line.trim().startsWith('* ')) {
        return (
          <li key={index} className="text-slate-600 mb-2 ml-4 list-disc italic">
            {line.replace('* ', '')}
          </li>
        );
      } else if (line.startsWith('```')) {
        return null;
      } else if (line.trim()) {
        return (
          <p key={index} className="text-slate-600 mb-3 leading-relaxed">
            {line}
          </p>
        );
      }
      return null;
    });
  };

  if (!topic) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
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
      {/* Top Navigation Bar */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowSidebar(!showSidebar)}
                className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 lg:hidden"
              >
                {showSidebar ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
              <Link
                to="/"
                className="flex items-center space-x-2 text-slate-600 hover:text-slate-800 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="text-sm font-medium">返回首页</span>
              </Link>
            </div>

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
              <span className="text-sm text-slate-600 font-medium">
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

      {/* Sidebar Navigation */}
      <div className={`fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-slate-200 transform transition-transform duration-300 lg:translate-x-0 ${
        showSidebar ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto p-4">
          <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
            <List className="h-5 w-5 mr-2" />
            课程目录
          </h3>
          <div className="space-y-2">
            {topics.map((t) => (
              <Link
                key={t.id}
                to={`/topic/${t.id}`}
                onClick={() => setShowSidebar(false)}
                className={`block p-3 rounded-lg transition-colors ${
                  t.id === topic.id
                    ? 'bg-sky-50 border-l-4 border-sky-600'
                    : 'hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    t.difficulty === 'beginner' ? 'bg-green-100 text-green-700' :
                    t.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {t.difficulty === 'beginner' ? '入门' : 
                     t.difficulty === 'intermediate' ? '进阶' : '高级'}
                  </span>
                </div>
                <p className="text-sm font-medium text-slate-700 mt-1">{t.title}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Topic Header */}
      <div className={`bg-gradient-to-r ${topic.color} text-white`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:ml-64">
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
              <BookOpen className="h-8 w-8" />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl font-bold mb-2">{topic.title}</h1>
              <p className="text-white/90 mb-3">{topic.description}</p>
              <div className="flex items-center space-x-2">
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:ml-64">
        <div className="space-y-6">
          {/* Learning Objectives */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 bg-gradient-to-r from-sky-50 to-blue-50">
              <h2 className="text-lg font-semibold text-slate-800 flex items-center">
                <Target className="h-5 w-5 mr-2 text-sky-600" />
                学习目标
              </h2>
            </div>
            <div className="p-6">
              <ul className="space-y-2">
                {topic.learningObjectives.map((objective, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-600">{objective}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Prerequisites */}
          {topic.prerequisites.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-200 bg-gradient-to-r from-amber-50 to-orange-50">
                <h2 className="text-lg font-semibold text-slate-800 flex items-center">
                  <GraduationCap className="h-5 w-5 mr-2 text-amber-600" />
                  前置知识
                </h2>
              </div>
              <div className="p-6">
                <div className="flex flex-wrap gap-2">
                  {topic.prerequisites.map((prereq, index) => (
                    <span key={index} className="px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-sm">
                      {prereq}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Theory Section */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
              <h2 className="text-lg font-semibold text-slate-800 flex items-center">
                <BookOpen className="h-5 w-5 mr-2 text-slate-600" />
                理论知识
              </h2>
            </div>
            <div className="p-6">
              <div className="prose prose-slate max-w-none">
                {renderMarkdown(topic.theory)}
              </div>
            </div>
          </div>

          {/* Code Editor Section */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 bg-gradient-to-r from-indigo-50 to-purple-50">
              <h2 className="text-lg font-semibold text-slate-800 flex items-center">
                <Code className="h-5 w-5 mr-2 text-indigo-600" />
                在线代码编辑器
              </h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex-1"></div>
                <button
                  onClick={resetCode}
                  className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  <RotateCcw className="h-4 w-4" />
                  <span>重置代码</span>
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
                  <span>{isPyodideLoading ? '环境加载中...' : isLoading ? '运行中...' : '运行代码'}</span>
                </button>
              </div>

              <CodeEditor code={code} onChange={setCode} />
              <OutputPanel output={output} error={error} isLoading={isLoading} />
            </div>
          </div>

          {/* Explanation Section */}
          {showExplanation && (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-200 bg-gradient-to-r from-emerald-50 to-green-50">
                <h2 className="text-lg font-semibold text-slate-800 flex items-center">
                  <Lightbulb className="h-5 w-5 mr-2 text-emerald-600" />
                  答案解析
                </h2>
              </div>
              <div className="p-6">
                <div className="prose prose-slate max-w-none">
                  {renderMarkdown(topic.businessCase)}
                </div>
              </div>
            </div>
          )}

          {/* Practice Exercises */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 bg-gradient-to-r from-purple-50 to-pink-50">
              <h2 className="text-lg font-semibold text-slate-800 flex items-center">
                <FileText className="h-5 w-5 mr-2 text-purple-600" />
                课后练习题
              </h2>
            </div>
            <div className="p-6">
              <ul className="space-y-3">
                {topic.exercises.map((exercise, index) => (
                  <li key={index} className="flex items-start space-x-3 p-3 bg-purple-50 rounded-lg">
                    <span className="flex-shrink-0 w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </span>
                    <span className="text-slate-700">{exercise}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Knowledge Quiz */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 bg-gradient-to-r from-rose-50 to-pink-50">
              <h2 className="text-lg font-semibold text-slate-800 flex items-center">
                <HelpCircle className="h-5 w-5 mr-2 text-rose-600" />
                知识点自测题
              </h2>
            </div>
            <div className="p-6">
              {topic.quizzes.length > 0 ? (
                <div className="space-y-4">
                  <div className="text-sm text-slate-500 mb-4">
                    题目 {currentQuizIndex + 1} / {topic.quizzes.length}
                  </div>
                  <div className="p-4 bg-rose-50 rounded-lg">
                    <p className="text-lg font-medium text-slate-800 mb-4">
                      {topic.quizzes[currentQuizIndex].question}
                    </p>
                    <div className="space-y-2">
                      {topic.quizzes[currentQuizIndex].options.map((option, index) => (
                        <button
                          key={index}
                          onClick={() => handleQuizAnswer(index)}
                          disabled={showQuizResult}
                          className={`w-full text-left p-3 rounded-lg border-2 transition-colors ${
                            showQuizResult
                              ? index === topic.quizzes[currentQuizIndex].answer
                                ? 'bg-green-100 border-green-500 text-green-800'
                                : selectedAnswer === index
                                  ? 'bg-red-100 border-red-500 text-red-800'
                                  : 'bg-white border-slate-200 text-slate-600'
                              : 'bg-white border-slate-200 text-slate-700 hover:border-sky-300 hover:bg-sky-50'
                          }`}
                        >
                          <span className="font-medium">{String.fromCharCode(65 + index)}. </span>
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>

                  {showQuizResult && (
                    <div className={`p-4 rounded-lg ${
                      selectedAnswer === topic.quizzes[currentQuizIndex].answer
                        ? 'bg-green-50 border-l-4 border-green-500'
                        : 'bg-red-50 border-l-4 border-red-500'
                    }`}>
                      <div className="flex items-start space-x-2">
                        {selectedAnswer === topic.quizzes[currentQuizIndex].answer ? (
                          <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                        ) : (
                          <X className="h-5 w-5 text-red-600 mt-0.5" />
                        )}
                        <div>
                          <p className={`font-medium ${
                            selectedAnswer === topic.quizzes[currentQuizIndex].answer
                              ? 'text-green-800'
                              : 'text-red-800'
                          }`}>
                            {selectedAnswer === topic.quizzes[currentQuizIndex].answer ? '回答正确！' : '回答错误'}
                          </p>
                          <p className="text-slate-600 mt-2">
                            {topic.quizzes[currentQuizIndex].explanation}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {topic.quizzes.length > 1 && (
                    <div className="flex justify-between items-center">
                      <button
                        onClick={() => {
                          if (currentQuizIndex > 0) {
                            setCurrentQuizIndex(currentQuizIndex - 1);
                            setSelectedAnswer(null);
                            setShowQuizResult(false);
                          }
                        }}
                        disabled={currentQuizIndex === 0}
                        className="px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        上一题
                      </button>
                      {currentQuizIndex < topic.quizzes.length - 1 && (
                        <button
                          onClick={nextQuiz}
                          className="px-4 py-2 text-sm font-medium text-white bg-sky-600 rounded-lg hover:bg-sky-700"
                        >
                          下一题
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-slate-500 text-center py-8">暂无自测题</p>
              )}
            </div>
          </div>

          {/* Bottom Navigation */}
          <div className="flex justify-between items-center bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <button
              onClick={() => navigateTopic(-1)}
              disabled={currentIndex === 0}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-colors ${
                currentIndex === 0
                  ? 'text-slate-300 cursor-not-allowed'
                  : 'text-slate-600 hover:bg-slate-50 border border-slate-300'
              }`}
            >
              <ChevronLeft className="h-5 w-5" />
              <span>上一个主题</span>
            </button>
            <button
              onClick={() => navigateTopic(1)}
              disabled={currentIndex === topics.length - 1}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-colors ${
                currentIndex === topics.length - 1
                  ? 'text-slate-300 cursor-not-allowed'
                  : 'text-white bg-sky-600 hover:bg-sky-700 shadow-md'
              }`}
            >
              <span>下一个主题</span>
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Overlay */}
      {showSidebar && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setShowSidebar(false)}
        />
      )}
    </div>
  );
};

export default TopicPage;
