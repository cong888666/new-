
import React from 'react';
import { Terminal, AlertCircle, CheckCircle2, Image as ImageIcon } from 'lucide-react';

interface OutputPanelProps {
  output: string;
  error: string | null;
  isLoading: boolean;
  plotImages?: string[];
}

const OutputPanel: React.FC<OutputPanelProps> = ({ output, error, isLoading, plotImages = [] }) => {
  return (
    <div className="rounded-lg overflow-hidden border border-slate-200 shadow-lg bg-white">
      <div className="bg-slate-100 px-4 py-2 border-b border-slate-200 flex items-center space-x-2">
        <Terminal className="h-4 w-4 text-slate-600" />
        <span className="text-sm font-medium text-slate-700">输出结果</span>
      </div>
      <div className="p-4 bg-slate-50 min-h-48 max-h-96 overflow-y-auto">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="flex items-center space-x-3">
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-sky-500 border-t-transparent"></div>
              <span className="text-slate-600">正在执行...</span>
            </div>
          </div>
        ) : error ? (
          <div className="flex items-start space-x-3 text-red-700 bg-red-50 p-4 rounded-lg">
            <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium">执行出错</p>
              <pre className="mt-2 text-sm whitespace-pre-wrap font-mono">{error}</pre>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* 显示图表 */}
            {plotImages.length > 0 && (
              <div>
                <div className="flex items-center space-x-2 text-green-700 mb-3">
                  <ImageIcon className="h-5 w-5" />
                  <span className="font-medium">可视化图表</span>
                </div>
                <div className="space-y-3">
                  {plotImages.map((imgSrc, idx) => (
                    <div key={idx} className="bg-white p-2 rounded border border-slate-200">
                      <img src={imgSrc} alt="Plot" className="w-full rounded" />
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* 显示文本输出 */}
            {output && (
              <div>
                {plotImages.length === 0 && (
                  <div className="flex items-center space-x-2 text-green-700 mb-3">
                    <CheckCircle2 className="h-5 w-5" />
                    <span className="font-medium">执行成功</span>
                  </div>
                )}
                <pre className="text-sm whitespace-pre-wrap font-mono text-slate-800 bg-white p-4 rounded border border-slate-200">
                  {output}
                </pre>
              </div>
            )}

            {/* 如果既没有输出也没有图表 */}
            {!output && plotImages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-slate-400">
                <Terminal className="h-12 w-12 mb-2 opacity-50" />
                <p>点击"运行代码"查看输出</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default OutputPanel;
