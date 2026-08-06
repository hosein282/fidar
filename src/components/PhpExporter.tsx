import React, { useState } from 'react';
import { Language, GeneratedPHPFile } from '../types';
import { generatePHPProjectFiles } from '../lib/phpCodeTemplates';
import { Code2, Copy, Check, Download, FileCode, Database, Terminal, ShieldCheck, CheckCircle2, X } from 'lucide-react';

interface PhpExporterProps {
  lang: Language;
  onClose?: () => void;
}

export const PhpExporter: React.FC<PhpExporterProps> = ({ lang, onClose }) => {
  const files: GeneratedPHPFile[] = generatePHPProjectFiles();
  const [selectedFilename, setSelectedFilename] = useState<string>('database.sql');
  const [copied, setCopied] = useState(false);
  const isFa = lang === 'fa';

  const selectedFile = files.find(f => f.filename === selectedFilename) || files[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedFile.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([selectedFile.code], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = selectedFile.filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl text-slate-900">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center">
            <Code2 className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">
              {isFa ? 'استودیو خروجی کدهای آماده PHP و MySQL' : 'Export Deployment-Ready PHP & MySQL Codebase'}
            </h3>
            <p className="text-xs text-slate-500">
              {isFa 
                ? 'کدهای اختصاصی قابل آپلود مستقیم در هاست‌های cPanel / DirectAdmin / Linux'
                : 'Complete PHP 8.x scripts, PDO setup & MySQL database dump script.'}
            </p>
          </div>
        </div>

        {onClose && (
          <button onClick={onClose} className="p-2 rounded-lg bg-slate-100 text-slate-500 hover:text-slate-900">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* File Selector Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        {files.map((file) => (
          <button
            key={file.filename}
            onClick={() => setSelectedFilename(file.filename)}
            className={`px-3.5 py-2 rounded-lg text-xs font-mono font-semibold flex items-center gap-2 transition cursor-pointer ${
              selectedFilename === file.filename
                ? 'bg-blue-900 text-white font-bold shadow-sm'
                : 'bg-slate-100 border border-slate-200 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {file.filename.endsWith('.sql') ? <Database className="w-3.5 h-3.5 text-blue-600" /> : <FileCode className="w-3.5 h-3.5 text-blue-600" />}
            <span>{file.filename}</span>
          </button>
        ))}
      </div>

      {/* Selected File Description */}
      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between flex-wrap gap-4">
        <p className="text-xs sm:text-sm text-slate-600">
          <span className="font-bold text-blue-900">{isFa ? 'توضیحات این فایل:' : 'File Function:'} </span>
          {isFa ? selectedFile.description.fa : selectedFile.description.en}
        </p>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="px-3.5 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-xs text-blue-900 font-bold flex items-center gap-1.5 transition shadow-sm"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-blue-600" /> : <Copy className="w-3.5 h-3.5 text-blue-600" />}
            <span>{copied ? (isFa ? 'کپی شد' : 'Copied') : (isFa ? 'کپی کدها' : 'Copy')}</span>
          </button>

          <button
            onClick={handleDownload}
            className="px-3.5 py-1.5 rounded-lg bg-blue-900 hover:bg-blue-800 text-xs text-white font-bold flex items-center gap-1.5 transition shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{isFa ? 'دانلود این فایل' : 'Download File'}</span>
          </button>
        </div>
      </div>

      {/* Code Editor Box */}
      <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-slate-900">
        <div className="px-4 py-2 bg-slate-800 border-b border-slate-700 flex items-center justify-between text-xs text-slate-300 font-mono">
          <span>{selectedFile.filename}</span>
          <span>{selectedFile.language.toUpperCase()}</span>
        </div>

        <pre className="p-5 font-mono text-xs text-blue-400 leading-relaxed overflow-x-auto max-h-[450px] dir-ltr text-left">
          <code>{selectedFile.code}</code>
        </pre>
      </div>

      {/* Deployment Instructions Step-by-Step */}
      <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 space-y-4">
        <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <Terminal className="w-4 h-4 text-blue-600" />
          <span>{isFa ? 'راهنمای نصب و راه‌اندازی کدهای PHP و MySQL روی هاست شما:' : 'PHP & MySQL Hosting Deployment Instructions:'}</span>
        </h4>

        <ol className="space-y-2 text-xs sm:text-sm text-slate-600 list-decimal list-inside">
          <li>{isFa ? 'وارد پنل phpMyAdmin هاست شوید و دیتابیس جدیدی به نام biesss_db بسازید.' : 'Log in to your host phpMyAdmin and create a database named biesss_db.'}</li>
          <li>{isFa ? 'محتوای فایل database.sql را در تب SQL اجرا (Import) کنید تا جداول و داده‌های دوزبانه ساخته شوند.' : 'Import database.sql script to build tables, indexes, and initial bilingual content.'}</li>
          <li>{isFa ? 'اطلاعات نام کاربری و رمز عبور دیتابیس را در فایل config.php ویرایش نمایید.' : 'Configure DB_USER & DB_PASS credentials inside config.php.'}</li>
          <li>{isFa ? 'تمامی فایل‌ها را در پوشه public_html سرور خود آپلود کنید.' : 'Upload all files directly into public_html directory.'}</li>
        </ol>
      </div>

    </div>
  );
};
