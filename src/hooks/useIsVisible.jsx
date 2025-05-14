import { useState, useEffect, useCallback } from "react";

const useIsVisible = () => {
  const [skip, setSkip] = useState(0);
  const [node, setNode] = useState (null);

  useEffect(() => {
    if (!node) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setSkip((prev) => prev + 10);
      }
    });

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [node]);

  const ref = useCallback((node ) => {
    setNode(node);
  }, []);

  return { ref, skip };
};

export default useIsVisible