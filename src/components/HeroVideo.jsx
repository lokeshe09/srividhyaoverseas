import { useEffect, useRef, useState } from 'react';
import { SITE } from '../config/site.js';

// Background video for the home hero.
// - Phones get the lighter 720p file; desktops get WebM (VP9) or 1080p MP4.
// - Skipped for reduced-motion users and data-saver connections (poster image only).
// - Pauses when the hero scrolls out of view or the tab is hidden, to save battery/CPU.
// - If a file is missing it silently falls back to the poster + gradient background.
export default function HeroVideo() {
  const ref = useRef(null);
  const [sources, setSources] = useState(null);
  const [failed, setFailed] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const saveData = navigator.connection?.saveData;
    if (!SITE.heroVideo || reduce || saveData) return;
    const mobile = window.matchMedia('(max-width: 768px)').matches;
    setSources(
      mobile && SITE.heroVideoMobile
        ? [{ src: SITE.heroVideoMobile, type: 'video/mp4' }]
        : [
            SITE.heroVideoWebm && { src: SITE.heroVideoWebm, type: 'video/webm' },
            { src: SITE.heroVideo, type: 'video/mp4' },
          ].filter(Boolean)
    );
  }, []);

  useEffect(() => {
    const video = ref.current;
    if (!video) return undefined;
    const play = () => video.play().catch(() => {});
    const io = new IntersectionObserver(([e]) => (e.isIntersecting && !document.hidden ? play() : video.pause()), {
      threshold: 0.1,
    });
    io.observe(video);
    const onVisibility = () => (document.hidden ? video.pause() : play());
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      io.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [sources]);

  return (
    <div className="hero-media" aria-hidden="true">
      {SITE.heroPoster && <div className="hero-poster" style={{ backgroundImage: `url(${SITE.heroPoster})` }} />}
      {sources && !failed && (
        <video
          ref={ref}
          className={`hero-video${ready ? ' is-ready' : ''}`}
          autoPlay
          muted
          loop
          playsInline
          disablePictureInPicture
          disableRemotePlayback
          preload="auto"
          poster={SITE.heroPoster || undefined}
          onPlaying={() => setReady(true)}
          tabIndex={-1}
        >
          {sources.map((s, i) => (
            <source key={s.src} src={s.src} type={s.type} onError={i === sources.length - 1 ? () => setFailed(true) : undefined} />
          ))}
        </video>
      )}
      <div className="hero-scrim" />
    </div>
  );
}
