/*
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

.image-carousel__image {
  object-fit: contain;
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  transition: transform 0.5s linear;
}

.image-carousel__image--displaced-left {
  transform: translateX(-100%);
}

.image-carousel__image--displaced-right {
  transform: translateX(100%);
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

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';

import './styles.css';

const root = createRoot(document.getElementById('root')!);
root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);

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

import { useState } from 'react';

function clsx(...classnames: Array<any>) {
  return classnames.filter(Boolean).join(' ');
}

function shouldTransitionToLeftDirection(
  currIndex: number,
  nextIndex: number,
  totalImages: number,
) {
  // Last going to first.
  if (currIndex === totalImages - 1 && nextIndex === 0) {
    return true;
  }

  // First going to last.
  if (currIndex === 0 && nextIndex === totalImages - 1) {
    return false;
  }

  return currIndex < nextIndex;
}

export default function ImageCarousel({
  images,
}: Readonly<{
  images: ReadonlyArray<{ src: string; alt: string }>;
}>) {
  const [currIndex, setCurrIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState<number | null>(
    null,
  );
  const [isTransitioning, setIsTransitioning] =
    useState(false);
  const currImage = images[currIndex];
  const nextImage =
    nextIndex != null ? images[nextIndex] : null;

  function changeImageIndex(index: number) {
    setNextIndex(index);
    // Allow the next image to be rendered to the DOM first
    // so that the next image can be transitioned in.
    requestAnimationFrame(() => {
      setIsTransitioning(true);
    });
  }

  const { exitClassname, enterClassname } =
    nextIndex != null &&
    shouldTransitionToLeftDirection(
      currIndex,
      nextIndex,
      images.length,
    )
      ? {
          exitClassname:
            'image-carousel__image--displaced-left',
          enterClassname:
            'image-carousel__image--displaced-right',
        }
      : {
          exitClassname:
            'image-carousel__image--displaced-right',
          enterClassname:
            'image-carousel__image--displaced-left',
        };

  return (
    <div className="image-carousel">
      <img
        alt={currImage.alt}
        src={currImage.src}
        key={currImage.src}
        className={clsx(
          'image-carousel__image',
          isTransitioning && exitClassname,
        )}
      />
      {nextImage != null && (
        <img
          alt={nextImage.alt}
          src={nextImage.src}
          key={nextImage.src}
          onTransitionEnd={() => {
            setCurrIndex(nextIndex!);
            setNextIndex(null);
            setIsTransitioning(false);
          }}
          className={clsx(
            'image-carousel__image',
            !isTransitioning && enterClassname,
          )}
        />
      )}
      <button
        aria-label="Previous image"
        disabled={isTransitioning}
        className="image-carousel__button image-carousel__button--prev"
        onClick={() => {
          const nextIndex =
            (currIndex - 1 + images.length) % images.length;
          changeImageIndex(nextIndex);
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
              changeImageIndex(index);
            }}
          />
        ))}
      </div>
      <button
        aria-label="Next image"
        className="image-carousel__button image-carousel__button--next"
        disabled={isTransitioning}
        onClick={() => {
          const nextIndex = (currIndex + 1) % images.length;
          changeImageIndex(nextIndex);
        }}>
        &#10095;
      </button>
    </div>
  );
}


*/