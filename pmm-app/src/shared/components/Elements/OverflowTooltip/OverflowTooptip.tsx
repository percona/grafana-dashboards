import React, { useEffect, useRef, useState } from 'react';

export const OverflowTooltip = ({ children, ...props }) => {
  const [title, setTitle] = useState('');
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (ref.current && ref.current.clientWidth < ref.current.scrollWidth) {
      setTitle(children);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref]);

  return (
    <span ref={ref} title={title} {...props}>{children}</span>
  );
};
