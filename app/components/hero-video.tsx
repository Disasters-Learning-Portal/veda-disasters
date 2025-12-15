'use client';

import { useEffect, useRef } from 'react';

export default function HeroVideo({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5;
    }
  }, []);

  return (
    <video
      ref={videoRef}
      autoPlay
      loop
      muted
      playsInline
      style={{
        position: 'absolute',
        top: 0,
        left: 500,
        width: '80%',
        height: '100%',
        objectFit: 'cover',
        objectPosition: 'center 20%',
        zIndex: 0,
      }}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
