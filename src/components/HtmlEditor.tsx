'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { sanitizeHtml } from '../utils/sanitize';
import {
  Bold, Italic, Underline, Strikethrough, List, ListOrdered, Quote,
  Code, Link2, Image as ImageIcon, Upload as UploadIcon, Minus, AlignLeft, AlignCenter,
  AlignRight, Eraser, Eye, Code2, Undo2, Redo2, Pilcrow, Heading2, Heading3,
} from 'lucide-react';

interface HtmlEditorProps {
  value: string;
  onChange: (html: string) => void;
  lang?: 'fa' | 'en';
  dir?: 'rtl' | 'ltr';
  placeholder?: string;
  minHeight?: number;
}

interface CmdBtn {
  cmd: string;
  val?: string;
  title: string;
  icon: React.ReactNode;
}

/**
 * Wordpress-style HTML editor.
 * - Visual tab: contentEditable WYSIWYG with a formatting toolbar.
 * - Text tab: raw HTML textarea so users can write tags directly.
 * The two modes stay in sync, and `onChange` always emits the raw HTML string.
 */
export const HtmlEditor: React.FC<HtmlEditorProps> = ({
  value,
  onChange,
  lang = 'fa',
  dir,
  placeholder,
  minHeight = 260,
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const lastValue = useRef<string>(value);
  const [mode, setMode] = useState<'visual' | 'html'>('visual');
  const [active, setActive] = useState<Record<string, boolean>>({});
  const [isUploading, setIsUploading] = useState(false);

  const effectiveDir: 'rtl' | 'ltr' = dir || (lang === 'fa' ? 'rtl' : 'ltr');

  // Push external value changes into the editors. This only runs when the
  // parent supplied a different value than what we last emitted (i.e. an
  // external change like inserting the cover image), so it is safe to always
  // apply it to both editors to keep Visual & HTML modes in sync.
  useEffect(() => {
    if (value !== lastValue.current) {
      const safe = sanitizeHtml(value);
      lastValue.current = safe;
      if (editorRef.current) {
        editorRef.current.innerHTML = safe;
      }
      if (textareaRef.current) {
        textareaRef.current.value = safe;
      }
    }
  }, [value]);

  const sync = useCallback(() => {
    const html = editorRef.current?.innerHTML || '';
    lastValue.current = html;
    onChange(html);
  }, [onChange]);

  const exec = useCallback((cmd: string, val?: string) => {
    const ed = editorRef.current;
    if (!ed) return;
    ed.focus();
    document.execCommand(cmd, false, val || undefined);
    sync();
  }, [sync]);

  const updateActive = useCallback(() => {
    setActive({
      bold: document.queryCommandState('bold'),
      italic: document.queryCommandState('italic'),
      underline: document.queryCommandState('underline'),
      strikeThrough: document.queryCommandState('strikeThrough'),
      insertUnorderedList: document.queryCommandState('insertUnorderedList'),
      insertOrderedList: document.queryCommandState('insertOrderedList'),
      justifyLeft: document.queryCommandState('justifyLeft'),
      justifyCenter: document.queryCommandState('justifyCenter'),
      justifyRight: document.queryCommandState('justifyRight'),
      blockquote: document.queryCommandState('formatBlock'),
    });
  }, []);

  // Refresh active toolbar state while the user moves the caret.
  useEffect(() => {
    document.addEventListener('selectionchange', updateActive);
    return () => document.removeEventListener('selectionchange', updateActive);
  }, [updateActive]);

  const insertLink = () => {
    const url = window.prompt('Link URL', 'https://');
    if (url) exec('createLink', url);
  };

  const insertImage = () => {
    const url = window.prompt('Image URL', 'https://');
    if (url) insertHtml(`<img src="${url}" alt="" />`);
  };

  // Insert raw HTML at the caret in whichever tab is active (visual or html).
  const insertHtml = (rawHtml: string) => {
    if (mode === 'html') {
      const cur = textareaRef.current;
      if (!cur) return;
      const start = cur.selectionStart;
      const end = cur.selectionEnd;
      const next = lastValue.current.slice(0, start) + rawHtml + lastValue.current.slice(end);
      lastValue.current = next;
      onChange(next);
      requestAnimationFrame(() => {
        cur.focus();
        cur.setSelectionRange(start + rawHtml.length, start + rawHtml.length);
      });
    } else if (editorRef.current) {
      editorRef.current.focus();
      document.execCommand('insertHTML', false, rawHtml);
      sync();
    }
  };

  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    // Reset the input so the same file can be re-picked later.
    e.target.value = '';
    setIsUploading(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      const res = await fetch('/api/upload', { method: 'POST', body: fd });
      const data = await res.json();
      if (data.url) {
        insertHtml(`<img src="${data.url}" alt="" />`);
      } else {
        console.error('Upload failed:', data.error);
      }
    } catch (err) {
      console.error('Upload error:', err);
    } finally {
      setIsUploading(false);
    }
  };

  const switchMode = (next: 'visual' | 'html') => {
    if (next === 'visual') {
      // Push raw HTML from state into the contentEditable area (sanitized so
      // any pasted <style>/<script> can't affect the whole page layout).
      const safe = sanitizeHtml(lastValue.current);
      lastValue.current = safe;
      if (editorRef.current) editorRef.current.innerHTML = safe;
    }
    setMode(next);
  };

  // When entering Visual mode, populate the (re-mounted) contentEditable area
  // from the shared lastValue so both tabs always stay in sync.
  useEffect(() => {
    if (mode === 'visual' && editorRef.current) {
      const safe = sanitizeHtml(lastValue.current);
      lastValue.current = safe;
      if (editorRef.current.innerHTML !== safe) {
        editorRef.current.innerHTML = safe;
      }
    }
  }, [mode]);

  const onTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const html = e.target.value;
    lastValue.current = html;
    onChange(html);
  };

  const btnClass = (key: string) =>
    `p-1.5 rounded-md border transition-colors cursor-pointer ${
      active[key]
        ? 'bg-blue-100 text-blue-700 border-blue-300'
        : 'bg-white text-slate-600 border-slate-200 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300'
    }`;

  const toolBtn = (b: CmdBtn) => (
    <button
      key={b.val ? `${b.cmd}:${b.val}` : b.cmd}
      type="button"
      title={b.title}
      aria-label={b.title}
      onMouseDown={(e) => e.preventDefault()}
      onClick={() => exec(b.cmd, b.val)}
      className={btnClass(b.val ? `formatBlock:${b.val}` : b.cmd)}
    >
      {b.icon}
    </button>
  );

  const formatButtons: CmdBtn[] = [
    { cmd: 'bold', title: 'Bold', icon: <Bold className="w-4 h-4" /> },
    { cmd: 'italic', title: 'Italic', icon: <Italic className="w-4 h-4" /> },
    { cmd: 'underline', title: 'Underline', icon: <Underline className="w-4 h-4" /> },
    { cmd: 'strikeThrough', title: 'Strikethrough', icon: <Strikethrough className="w-4 h-4" /> },
  ];

  const blockButtons: CmdBtn[] = [
    { cmd: 'formatBlock', val: 'h2', title: 'Heading 2', icon: <Heading2 className="w-4 h-4" /> },
    { cmd: 'formatBlock', val: 'h3', title: 'Heading 3', icon: <Heading3 className="w-4 h-4" /> },
    { cmd: 'formatBlock', val: 'p', title: 'Paragraph', icon: <Pilcrow className="w-4 h-4" /> },
    { cmd: 'formatBlock', val: 'blockquote', title: 'Blockquote', icon: <Quote className="w-4 h-4" /> },
    { cmd: 'formatBlock', val: 'pre', title: 'Code Block', icon: <Code className="w-4 h-4" /> },
  ];

  const listButtons: CmdBtn[] = [
    { cmd: 'insertUnorderedList', title: 'Bulleted List', icon: <List className="w-4 h-4" /> },
    { cmd: 'insertOrderedList', title: 'Numbered List', icon: <ListOrdered className="w-4 h-4" /> },
  ];

  const alignButtons: CmdBtn[] = [
    { cmd: 'justifyRight', title: 'Align Right', icon: <AlignRight className="w-4 h-4" /> },
    { cmd: 'justifyCenter', title: 'Align Center', icon: <AlignCenter className="w-4 h-4" /> },
    { cmd: 'justifyLeft', title: 'Align Left', icon: <AlignLeft className="w-4 h-4" /> },
  ];

  const divider = (
    <span className="w-px h-5 bg-slate-200 mx-0.5" aria-hidden="true" />
  );

  return (
    <div className="rounded-xl border border-slate-300 overflow-hidden bg-white shadow-sm" dir={effectiveDir}>

      {/* Wordpress-style Visual | HTML Tabs */}
      <div className="flex items-center gap-1 border-b border-slate-200 bg-slate-50">
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => switchMode('visual')}
          className={`px-3 py-1.5 rounded-t-md text-xs font-bold flex items-center gap-1 ${
            mode === 'visual' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Visual</span>
        </button>
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => switchMode('html')}
          className={`px-3 py-1.5 rounded-t-md text-xs font-bold flex items-center gap-1 ${
            mode === 'html' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Code2 className="w-3.5 h-3.5" />
          <span>HTML</span>
        </button>
        <span className="ml-auto text-[10px] text-slate-400 px-2">
          {lang === 'fa' ? 'ویرایشگر HTML' : 'Wordpress-style HTML editor'}
        </span>
      </div>

      {/* Toolbar (Visual mode only) */}
      {mode === 'visual' && (
        <div className="flex flex-wrap items-center gap-0.5 px-2 py-1.5 border-b border-slate-200 bg-slate-50 select-none">
          {formatButtons.map(toolBtn)}
          {divider}
          {blockButtons.map(toolBtn)}
          {divider}
          {listButtons.map(toolBtn)}
          {divider}
          {lang === 'fa' ? alignButtons.map(toolBtn) : ""}
          {lang === 'fa' ?  "" :alignButtons.map(toolBtn).reverse()}
          {divider}

          <button
            type="button"
            title="Insert Link"
            onMouseDown={(e) => e.preventDefault()}
            onClick={insertLink}
            className={btnClass('fake-link')}
          >
            <Link2 className="w-4 h-4" />
          </button>
          <button
            type="button"
            title="Insert Image URL"
            onMouseDown={(e) => e.preventDefault()}
            onClick={insertImage}
            className={btnClass('fake-image')}
          >
            <ImageIcon className="w-4 h-4" />
          </button>
          <button
            type="button"
            title={lang === 'fa' ? 'آپلود تصویر' : 'Upload Image'}
            disabled={isUploading}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => fileInputRef.current?.click()}
            className={`${btnClass('fake-upload')} ${isUploading ? 'opacity-60 cursor-wait' : ''}`}
          >
            <UploadIcon className="w-4 h-4" />
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleUploadImage}
          />
          <button
            type="button"
            title="Horizontal Rule"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => exec('insertHorizontalRule')}
            className={btnClass('hr')}
          >
            <Minus className="w-4 h-4" />
          </button>

          {divider}

          <button
            type="button"
            title="Undo"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => exec('undo')}
            className={btnClass('u')}
          >
            <Undo2 className="w-4 h-4" />
          </button>
          <button
            type="button"
            title="Redo"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => exec('redo')}
            className={btnClass('r')}
          >
            <Redo2 className="w-4 h-4" />
          </button>
          <button
            type="button"
            title="Clear Formatting"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => exec('removeFormat')}
            className={btnClass('clear')}
          >
            <Eraser className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Visual editor */}
      {mode === 'visual' ? (
        <div
          ref={editorRef}
          contentEditable
          suppressContentEditableWarning
          onInput={sync}
          dir="auto"
          data-placeholder={placeholder || ''}
          style={{ minHeight, outline: 'none' }}
          className="article-editor pl-3 pr-6 py-2.5 text-sm text-slate-800 leading-relaxed article-content"
        />
      ) : (
        <textarea
          ref={textareaRef}
          value={lastValue.current}
          onChange={onTextareaChange}
          dir="ltr"
          spellCheck={false}
          placeholder={placeholder || '<!-- paste raw HTML here -->'}
          className="w-full px-3 py-2.5 rounded-b-md border border-slate-200 text-slate-900 text-xs font-mono leading-relaxed focus:outline-none focus:border-blue-600 min-h-[260px] resize-y"
        />
      )}

      {/* HTML tag quick-insert helper */}
      {mode === 'html' && (
        <div className="flex flex-wrap gap-1.5 px-2 py-1.5 bg-slate-50 border-t border-slate-200">
          {['<h2>', '<h3>', '<p>', '<b>', '<i>', '<ul><li>', '<ol><li>', '<blockquote>', '<pre><code>', '<a href="">', '<img src="" alt="">'].map(tag => (
            <button
              key={tag}
              type="button"
              onClick={() => insertHtml(tag)}
              className="px-1.5 py-0.5 rounded-md bg-slate-100 hover:bg-blue-50 text-[10px] text-slate-600 font-mono border border-slate-200"
            >
              {tag}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};