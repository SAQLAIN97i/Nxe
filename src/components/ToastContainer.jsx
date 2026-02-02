import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

export default function ToastContainer({ toasts, removeToast }) {
  if (toasts.length === 0) return null;

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle size={20} className="text-accent-cyan" />;
      case 'error':
        return <AlertCircle size={20} className="text-red-400" />;
      case 'info':
        return <Info size={20} className="text-accent-blue" />;
      default:
        return <CheckCircle size={20} className="text-accent-cyan" />;
    }
  };

  const getBorderColor = (type) => {
    switch (type) {
      case 'success':
        return 'border-l-accent-cyan';
      case 'error':
        return 'border-l-red-400';
      case 'info':
        return 'border-l-accent-blue';
      default:
        return 'border-l-accent-cyan';
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[10000] flex flex-col gap-3">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`flex items-center gap-3 px-5 py-4 glass-strong rounded-xl border-l-4 ${getBorderColor(toast.type)} shadow-glass animate-slide-up`}
        >
          {getIcon(toast.type)}
          <p className="text-sm text-white font-medium">{toast.message}</p>
          <button
            onClick={() => removeToast(toast.id)}
            className="ml-2 p-1 hover:bg-white/10 rounded transition-colors"
          >
            <X size={16} className="text-text-muted" />
          </button>
        </div>
      ))}
    </div>
  );
}
