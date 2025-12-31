import { useEffect, useRef } from 'react';

interface DataTableProps {
  headers: string[];
  children: React.ReactNode;
}

export default function DataTable({ headers, children }: DataTableProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let isDown = false;
    let startX: number;
    let scrollLeft: number;

    const mouseDownHandler = (e: MouseEvent) => {
      isDown = true;
      startX = e.pageX - el.offsetLeft;
      scrollLeft = el.scrollLeft;
      el.classList.add('cursor-grabbing');
    };

    const mouseLeaveHandler = () => {
      isDown = false;
      el.classList.remove('cursor-grabbing');
    };

    const mouseUpHandler = () => {
      isDown = false;
      el.classList.remove('cursor-grabbing');
    };

    const mouseMoveHandler = (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - el.offsetLeft;
      const walk = x - startX;
      el.scrollLeft = scrollLeft - walk;
    };

    el.addEventListener('mousedown', mouseDownHandler);
    el.addEventListener('mouseleave', mouseLeaveHandler);
    el.addEventListener('mouseup', mouseUpHandler);
    el.addEventListener('mousemove', mouseMoveHandler);

    return () => {
      el.removeEventListener('mousedown', mouseDownHandler);
      el.removeEventListener('mouseleave', mouseLeaveHandler);
      el.removeEventListener('mouseup', mouseUpHandler);
      el.removeEventListener('mousemove', mouseMoveHandler);
    };
  }, []);

  return (
    <div className="overflow-x-auto cursor-grab rounded-lg border border-gray-200" ref={scrollRef}>
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-200">
          <tr>
            {headers.map((header, index) => (
              <th key={index} className="px-6 py-3 font-medium tracking-wider">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">{children}</tbody>
      </table>
    </div>
  );
}
