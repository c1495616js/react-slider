import React, { useState, useEffect, useCallback } from 'react';

interface Props {
  index: number;
  width: number;
  xPosition: number;
  setWidth: React.Dispatch<React.SetStateAction<number>>;
  handleClickNext: () => void;
  handleClickPrev: () => void;
}

export interface CarouselImg {
  name: string;
  path: string;
}

export function useCarousel(images: CarouselImg[], animated?: boolean): Props {
  const [index, setIndex] = useState(0);
  const [width, setWidth] = useState(0);
  const [xPosition, setXPosition] = useState(0);

  const handleClickPrev = useCallback(() => {
    if (index === 0) {
      const last = images.length - 1;
      setIndex(last);
      setXPosition(-width * last);
    } else {
      setIndex(index - 1);
      setXPosition(xPosition + width);
    }
  }, [xPosition, index, width, images]);

  const handleClickNext = useCallback(() => {
    if (index === images.length - 1) {
      setIndex(0);
      setXPosition(0);
    } else {
      setIndex(index + 1);
      setXPosition(xPosition - width);
    }
  }, [index, width, xPosition, images]);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (animated) {
      const handleAutoplay = setInterval(handleClickNext, 3000);
      return () => clearInterval(handleAutoplay);
    }
  }, [handleClickNext, animated]);

  return {
    index,
    width,
    xPosition,
    setWidth,
    handleClickNext,
    handleClickPrev,
  };
}
