import { useCallback, useEffect, useRef } from 'react';

export function CapturePicture() {
  const videoRef = useRef<null | HTMLVideoElement>(null);

  useEffect(() => {
    console.log('ref: ', videoRef.current);
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        // video: { facingMode: { exact: 'environment' } },
        audio: false,
      })
      .then((stream) => {
        if (!videoRef.current) return;
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const onCapture = useCallback(() => {
    if (!videoRef.current) return;
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.drawImage(videoRef.current, 0, 0);
    const dataUrl = canvas.toDataURL('image/jpeg');
    console.log(dataUrl);
  }, []);

  return (
    <div>
      <video ref={videoRef}>Stream not available.</video>
      <button onClick={onCapture}>Take photo</button>
    </div>
  );
}
