import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

import { CarouselImg } from '@/hooks';

interface CarouselProps {
  images: CarouselImg[];
  setWidth: React.Dispatch<React.SetStateAction<number>>;
  xPosition: number;
}

const Wrapper = styled.div`
  position: relative;
  width: 260px;
  overflow: hidden;
`;

const Slide = styled.div<Pick<CarouselProps, 'xPosition'>>`
  display: flex;
  width: 100%;
  transform: ${(props) => `translateX(${props.xPosition}px)`};
`;

const ForwardRefSlide = React.forwardRef<
  HTMLDivElement,
  Pick<CarouselProps, 'xPosition'> & Omit<JSX.IntrinsicElements['div'], 'ref'>
>(({ ...props }, forwardedRef) => <Slide ref={forwardedRef} {...props} />);

function Carousel({
  images,
  setWidth,
  xPosition,
}: CarouselProps): React.ReactElement {
  const slideRef = useRef<HTMLDivElement>();
  useEffect(() => {
    if (slideRef && slideRef.current) {
      const width = slideRef.current.clientWidth;
      setWidth(width);
    }
  }, [setWidth]);
  return (
    <Wrapper>
      <ForwardRefSlide xPosition={xPosition} ref={slideRef as any}>
        {images.map(({ name, path }) => (
          <div
            key={name}
            className="w-full  shrink-0 flex flex-col justify-center items-center"
          >
            {/* <img
              src={path}
              alt={name}
              className="object-contain w-full  block shrink-0"
            /> */}
            <LazyLoadImage
              alt={name}
              effect="blur"
              src={path}
              className="object-contain w-full block shrink-0"
            />
            <div className="flex justify-center mt-4">
              <p className="font-bold">{name}</p>
            </div>
          </div>
        ))}
      </ForwardRefSlide>
    </Wrapper>
  );
}
export default Carousel;
