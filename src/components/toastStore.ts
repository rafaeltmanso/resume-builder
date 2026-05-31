export type ToastType = 'success' | 'error' | 'info';

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

let _toasts: Toast[] = [];
const _subscribers = new Set<(toasts: Toast[]) => void>();

function _notify() {
  _subscribers.forEach((fn) => fn([..._toasts]));
}

function _add(message: string, type: ToastType = 'info') {
  const id = crypto.randomUUID();
  _toasts = [..._toasts, { id, message, type }];
  _notify();
  setTimeout(() => _remove(id), 4000);
}

function _remove(id: string) {
  _toasts = _toasts.filter((t) => t.id !== id);
  _notify();
}

export { _remove as removeToast };

export const toast = {
  success: (msg: string) => _add(msg, 'success'),
  error: (msg: string) => _add(msg, 'error'),
  info: (msg: string) => _add(msg, 'info'),
};

export function subscribeToasts(fn: (toasts: Toast[]) => void): () => void {
  _subscribers.add(fn);
  return () => { _subscribers.delete(fn); };
}
