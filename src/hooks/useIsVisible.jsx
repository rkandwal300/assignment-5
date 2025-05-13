import {useState, useEffect} from 'react'
export default function useIsVisible(ref) {
  const [skip, setSkip] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) =>{ 
      if(entry.isIntersecting) setSkip(prev=>prev+10)
      }
    );

    if (ref?.current)   observer.observe(ref.current);
    return () => {
      observer.disconnect();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref?.current]);
  
  return skip;
}