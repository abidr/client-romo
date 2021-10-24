import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import React from 'react';

export default function SortableItem(props) {
  const { id } = props;
  const {
    attributes, listeners, setNodeRef, transform, transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      className="menu-builder"
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <span>::</span>
      <button
        type="button"
      >
        Expand
      </button>
    </div>
  );
}
