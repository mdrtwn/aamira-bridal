"use client";

import { Pause, Play, X } from "lucide-react";
import { useRef, useState } from "react";
import styles from "./FloatingVideoPreview.module.css";

const previewVideoSource = "";

export default function FloatingVideoPreview() {
  const [isOpen, setIsOpen] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  if (!isOpen) return null;

  const togglePlayback = async () => {
    const video = videoRef.current;
    if (!video || !previewVideoSource) return;

    if (video.paused) {
      await video.play();
    } else {
      video.pause();
    }
  };

  return (
    <aside className={styles.preview} aria-label="Aamira Basic video preview">
      <video
        ref={videoRef}
        className={styles.video}
        src={previewVideoSource || undefined}
        poster="/image/homepage/gambar6.jpg"
        muted
        loop
        playsInline
        preload="metadata"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      <button
        type="button"
        className={styles.close}
        aria-label="Close video preview"
        onClick={() => setIsOpen(false)}
      >
        <X aria-hidden="true" />
      </button>

      <button
        type="button"
        className={styles.play}
        aria-label={isPlaying ? "Pause preview video" : "Play preview video"}
        onClick={togglePlayback}
      >
        {isPlaying ? <Pause aria-hidden="true" /> : <Play aria-hidden="true" />}
      </button>
    </aside>
  );
}
