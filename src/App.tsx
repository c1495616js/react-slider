/* eslint-disable react/prop-types */
import React, { ReactElement } from 'react';

// default arrows
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';

import { CarouselImg, useCarousel } from '@/hooks';
import Carousel from '@/components/base/Carousel/Carousel';

function App(): ReactElement {
  const images: CarouselImg[] = [
    { name: '', path: 'https://source.unsplash.com/random/200×500' },
    {
      name: 'PASSION FLOWER',
      path: 'https://source.unsplash.com/random/200×500/?fruit',
    },
    {
      name: 'GINGER',
      path: 'https://source.unsplash.com/random/200×500/?city',
    },
  ];
  const props = useCarousel(images, false);
  return (
    <div className="h-screen flex items-center justify-center">
      <button
        type="button"
        className="btn btn-ghost w-[44px]"
        onClick={props.handleClickPrev}
      >
        <ChevronLeftIcon />
      </button>
      <Carousel images={images} {...props} />
      <button
        type="button"
        className="btn btn-ghost w-[44px]"
        onClick={props.handleClickNext}
      >
        <ChevronRightIcon />
      </button>
    </div>
  );
}

export default App;
