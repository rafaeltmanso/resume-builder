import { useState, useCallback, useRef } from 'react';

interface SortableListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  onReorder: (fromIndex: number, toIndex: number) => void;
  keyExtractor: (item: T) => string;
  itemLabel?: string;
}

export default function SortableList<T>({ items, renderItem, onReorder, keyExtractor, itemLabel = 'item' }: SortableListProps<T>) {
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

  const moveItem = useCallback((index: number, direction: 'up' | 'down') => {
    const target = direction === 'up' ? index - 1 : index + 1;
    if (target < 0 || target >= items.length) return;
    onReorder(index, target);
  }, [items.length, onReorder]);

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
            className={`relative transition-all ${isDragOver ? 'scale-[1.01]' : ''}`}
          >
            {isDragOver && (
              <div className="absolute -top-1 left-0 right-0 h-0.5 rounded-full bg-cyan-600 z-10 dark:bg-cyan-400" />
            )}
            <div className="flex items-start gap-1">
              <div className="mt-3 flex shrink-0 flex-col gap-0.5">
                <button
                  type="button"
                  disabled={index === 0}
                  onClick={() => moveItem(index, 'up')}
                  className="rounded p-1 text-stone-400 transition hover:bg-stone-200/70 hover:text-stone-700 disabled:opacity-30 dark:hover:bg-neutral-800 dark:hover:text-stone-200"
                  aria-label={`Move ${itemLabel} ${index + 1} up`}
                  title="Move up"
                >
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                </button>
                <button
                  type="button"
                  disabled={index === items.length - 1}
                  onClick={() => moveItem(index, 'down')}
                  className="rounded p-1 text-stone-400 transition hover:bg-stone-200/70 hover:text-stone-700 disabled:opacity-30 dark:hover:bg-neutral-800 dark:hover:text-stone-200"
                  aria-label={`Move ${itemLabel} ${index + 1} down`}
                  title="Move down"
                >
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
              <span
                className="mt-3 shrink-0 cursor-grab p-1 text-stone-400 transition-colors active:cursor-grabbing hover:text-stone-600 dark:hover:text-stone-300"
                title="Drag to reorder"
                aria-label={`Drag to reorder ${itemLabel} ${index + 1}`}
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path d="M7 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM13 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM7 8a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM13 8a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM7 14a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM13 14a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
                </svg>
              </span>
              <div className="min-w-0 flex-1">
                {renderItem(item, index)}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
