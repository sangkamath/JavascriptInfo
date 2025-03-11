/*mport { useState } from 'react';

function clsx(...classnames: Array<any>) {
  return classnames.filter(Boolean).join(' ');
}

export default function ImageCarousel({
  images,
}: Readonly<{
  images: ReadonlyArray<{ src: string; alt: string }>;
}>) {
  const [currIndex, setCurrIndex] = useState(0);
  const currImage = images[currIndex];

  return (
    <div className="image-carousel">
      <img
        alt={currImage.alt}
        src={currImage.src}
        key={currImage.src}
        className="image-carousel__image"
      />
      <button
        aria-label="Previous image"
        className="image-carousel__button image-carousel__button--prev"
        onClick={() => {
          const nextIndex =
            (currIndex - 1 + images.length) % images.length;
          setCurrIndex(nextIndex);
        }}>
        &#10094;
      </button>
      <div className="image-carousel__pages">
        {images.map(({ alt, src }, index) => (
          <button
            className={clsx(
              'image-carousel__pages__button',
              index === currIndex &&
                'image-carousel__pages__button--active',
            )}
            aria-label={`Navigate to ${alt}`}
            key={src}
            onClick={() => {
              setCurrIndex(index);
            }}
          />
        ))}
      </div>
      <button
        aria-label="Next image"
        className="image-carousel__button image-carousel__button--next"
        onClick={() => {
          const nextIndex = (currIndex + 1) % images.length;
          setCurrIndex(nextIndex);
        }}>
        &#10095;
      </button>
    </div>
  );
}

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
  justify-content: center;
  align-items: center;

  height: 100vh;
  width: 100vw;
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

*/
