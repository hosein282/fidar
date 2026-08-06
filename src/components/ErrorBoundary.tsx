import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallbackTitle?: string;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  declare props: Props;
  declare state: State;
  declare setState: Component<Props, State>['setState'];

  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error caught by ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 sm:p-10 my-8 max-w-4xl mx-auto rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-amber-100 text-amber-700">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="space-y-3 flex-1">
              <h3 className="text-lg font-bold">
                {this.props.fallbackTitle || 'بروز خطا در بارگذاری بخش'}
              </h3>
              <p className="text-xs sm:text-sm text-amber-800 leading-relaxed">
                متأسفانه مشکلی در نمایش این بخش رخ داده است. اطلاعات دریافت شده نیازمند بازبینی هستند.
              </p>
              {this.state.error?.message && (
                <div className="p-3 rounded-lg bg-white/80 border border-amber-200 font-mono text-xs text-amber-900 dir-ltr text-left overflow-x-auto">
                  {this.state.error.message}
                </div>
              )}
              <button
                type="button"
                onClick={() => this.setState({ hasError: false })}
                className="px-4 py-2 rounded-lg bg-amber-800 hover:bg-amber-900 text-white font-bold text-xs flex items-center gap-2 transition cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                <span>تلاش مجدد (Retry)</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}



