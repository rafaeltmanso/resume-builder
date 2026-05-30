import { useState, useCallback, useRef } from 'react';

interface SortableListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  onReorder: (fromIndex: number, toIndex: number) => void;
  keyExtractor: (item: T) => string;
}

export default function SortableList<T>({ items, renderItem, onReorder, keyExtractor }: SortableListProps<T>) {
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [overIndex, setOverIndex] = useState<number | null>(null);
  const dragNode = useRef<HTMLElement | null>(null);

  const handleDragStart = useCallback((e: React.DragEvent, index: number) => {
    dragNode.current = e.currentTarget as HTMLElement;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', String(index));
    setDragIndex(index);
    setTimeout(() => {
      if (dragNode.current) {
        dragNode.current.classList.add('opacity-30');
      }
    }, 0);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (dragIndex === null || dragIndex === index) return;
    setOverIndex(index);
  }, [dragIndex]);

  const handleDragLeave = useCallback(() => {
    setOverIndex(null);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (dragIndex !== null && dragIndex !== index) {
      onReorder(dragIndex, index);
    }
    setDragIndex(null);
    setOverIndex(null);
    if (dragNode.current) {
      dragNode.current.classList.remove('opacity-30');
      dragNode.current = null;
    }
  }, [dragIndex, onReorder]);

  const handleDragEnd = useCallback(() => {
    setDragIndex(null);
    setOverIndex(null);
    if (dragNode.current) {
      dragNode.current.classList.remove('opacity-30');
      dragNode.current = null;
    }
  }, []);

  return (
    <div className="space-y-2">
      {items.map((item, index) => {
        const isDragOver = overIndex === index && dragIndex !== index;
        return (
          <div
            key={keyExtractor(item)}
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, index)}
            onDragEnd={handleDragEnd}
            className={`relative transition-all ${isDragOver ? 'scale-[1.02]' : ''}`}
          >
            {isDragOver && (
              <div className="absolute -top-1 left-0 right-0 h-0.5 bg-indigo-500 rounded-full z-10" />
            )}
            <div className="flex items-start gap-2">
              <button
                type="button"
                className="mt-3 p-1 cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors flex-shrink-0"
                title="Drag to reorder"
                aria-label="Drag to reorder"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M7 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM13 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM7 8a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM13 8a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM7 14a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM13 14a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
                </svg>
              </button>
              <div className="flex-1 min-w-0">
                {renderItem(item, index)}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}