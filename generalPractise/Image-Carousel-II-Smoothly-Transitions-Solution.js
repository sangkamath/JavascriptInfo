/*
One of the easiest way to implement an image carousel is
 rendering all the images in a horizontal fashion within
  a container (the images will overflow horizontally) and 
  changing the horizontal offset.

With this structure, navigating between images can be
 done in two ways: (1) changing the container's scroll position 
 and (2) CSS transforms on the container.

 Downsides of an offset-based approach
The offset-based approach was relatively easy to implement.
 You should also be aware of the downsides of this approach:

Larger DOM footprint: All the images are present in the DOM 
from the get-go. If there are many images, it could result 
in poor performance. This can be mitigated with list 
virtualization and/or lazy loading of images.
Transition distance can be huge: Transitioning from the first 
image to the last image or vice-versa (more generally speaking, 
across multiple images) can be a jarring experience because the
 browser will scroll through all the intermediate images.

 * {
  box-sizing: border-box;
  margin: 0;
}

body {
  font-family: sans-serif;
}

.wrapper {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
}

.image-carousel {
  background-color: #000;
  height: 400px;
  overflow: hidden;
  width: min(600px, 100vw);
  position: relative;
}

.image-carousel__row {
  display: flex;
  position: absolute;
  inset: 0;
}

.image-carousel__row--transitioning {
  transition: transform 0.5s linear;
}

.image-carousel__image {
  object-fit: contain;
  height: 400px;
  width: min(600px, 100vw);
}

.image-carousel__button {
  --size: 40px;
  height: var(--size);
  width: var(--size);

  background-color: #0008;
  border-radius: 100%;
  border: none;
  color: #fff;
  cursor: pointer;

  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}

.image-carousel__button:hover {
  background-color: #000b;
}

.image-carousel__button--prev {
  left: 16px;
}

.image-carousel__button--next {
  right: 16px;
}

.image-carousel__pages {
  background-color: #0008;
  border-radius: 12px;
  display: inline-flex;
  gap: 8px;
  padding: 8px;

  position: absolute;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
}

.image-carousel__pages__button {
  --size: 8px;
  height: var(--size);
  width: var(--size);

  border: none;
  border-radius: 100%;
  background-color: #666;
  cursor: pointer;
  display: inline-block;
  flex-shrink: 0;
  padding: 0;
  transition: background-color 0.3s ease-in-out;
}

.image-carousel__pages__button:hover {
  background-color: #ccc;
}

.image-carousel__pages__button--active {
  background-color: #fff;
}

import ImageCarousel from './ImageCarousel';

const images = [
  {
    src: 'https://picsum.photos/id/600/600/400',
    alt: 'Forest',
  },
  {
    src: 'https://picsum.photos/id/100/600/400',
    alt: 'Beach',
  },
  {
    src: 'https://picsum.photos/id/200/600/400',
    alt: 'Yak',
  },
  {
    src: 'https://picsum.photos/id/300/600/400',
    alt: 'Hay',
  },
  {
    src: 'https://picsum.photos/id/400/600/400',
    alt: 'Plants',
  },
  {
    src: 'https://picsum.photos/id/500/600/400',
    alt: 'Building',
  },
];

export default function App() {
  return (
    <div className="wrapper">
      <ImageCarousel images={images} />
    </div>
  );
}

import { useEffect, useRef, useState } from 'react';

function clsx(...classnames: Array<any>) {
  return classnames.filter(Boolean).join(' ');
}

export default function ImageCarousel({
  images,
}: Readonly<{
  images: ReadonlyArray<{ src: string; alt: string }>;
}>) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [currIndex, setCurrIndex] = useState(0);
  const [imageWidth, setImageWidth] = useState<
    number | null
  >(null);
  const [isTransitioning, setIsTransitioning] =
    useState(false);

  function updateImageWidth() {
    setImageWidth(
      ref.current?.getBoundingClientRect()?.width ?? 0,
    );
  }

  function changeCurrIndex(newIndex: number) {
    const nextIndex =
      (newIndex + images.length) % images.length;
    setIsTransitioning(true);
    setCurrIndex(nextIndex);
  }

  useEffect(() => {
    updateImageWidth();

    window.addEventListener('resize', updateImageWidth);

    return () => {
      window.removeEventListener(
        'resize',
        updateImageWidth,
      );
    };
  }, [updateImageWidth]);

  return (
    <div className="image-carousel" ref={ref}>
      <div
        className={clsx(
          'image-carousel__row',
          // Only add transition class when there is a need to
          // animate the transition, otherwise the translation update
          // is also transitioned when resizing the screen.
          isTransitioning &&
            'image-carousel__row--transitioning',
        )}
        style={{
          transform: imageWidth
            ? `translateX(-${currIndex * imageWidth}px)`
            : undefined,
        }}
        onTransitionEnd={() => {
          setIsTransitioning(false);
        }}>
        {images.map(({ alt, src }) => (
          <img
            alt={alt}
            src={src}
            key={src}
            className={clsx('image-carousel__image')}
          />
        ))}
      </div>
      <button
        aria-label="Previous image"
        disabled={isTransitioning}
        className="image-carousel__button image-carousel__button--prev"
        onClick={() => {
          changeCurrIndex(currIndex - 1);
        }}>
        &#10094;
      </button>
      <div className="image-carousel__pages">
        {images.map(({ alt, src }, index) => (
          <button
            aria-label={`Navigate to ${alt}`}
            className={clsx(
              'image-carousel__pages__button',
              index === currIndex &&
                'image-carousel__pages__button--active',
            )}
            disabled={isTransitioning}
            key={src}
            onClick={() => {
              changeCurrIndex(index);
            }}
          />
        ))}
      </div>
      <button
        aria-label="Next image"
        className="image-carousel__button image-carousel__button--next"
        disabled={isTransitioning}
        onClick={() => {
          changeCurrIndex(currIndex + 1);
        }}>
        &#10095;
      </button>
    </div>
  );
}

*/