import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { motion } from "framer-motion";
import { Camera, AlertCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function CameraScanner({ onScanSuccess }) {
  const { t } = useTranslation();

  const scannerRef = useRef(null);
  const [cameraError, setCameraError] = useState("");
  const [cameraReady, setCameraReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let started = false;
    let scanned = false;

    const readerId = "qr-reader";
    const reader = document.getElementById(readerId);

    if (!reader) {
      return undefined;
    }

    reader.innerHTML = "";
    setCameraError("");
    setCameraReady(false);

    const html5QrCode = new Html5Qrcode(readerId);

    scannerRef.current = html5QrCode;

    const styleId = "qr-camera-mobile-style";

    // Add camera video styling once.
    let styleElement = document.getElementById(styleId);

    if (!styleElement) {
      styleElement = document.createElement("style");
      styleElement.id = styleId;

      styleElement.textContent = `
        #qr-reader {
          width: 100% !important;
          height: 100% !important;
          position: relative !important;
          overflow: hidden !important;
          background: #000 !important;
        }

        #qr-reader video {
          width: 100% !important;
          height: 100% !important;
          min-width: 100% !important;
          min-height: 100% !important;
          max-width: none !important;
          max-height: none !important;
          object-fit: cover !important;
          display: block !important;
          background: #000 !important;
        }

        #qr-reader__scan_region {
          width: 100% !important;
          height: 100% !important;
          position: relative !important;
          overflow: hidden !important;
        }

        #qr-reader__scan_region video {
          width: 100% !important;
          height: 100% !important;
          object-fit: cover !important;
        }

        #qr-reader__dashboard {
          display: none !important;
        }
      `;

      document.head.appendChild(styleElement);
    }

    const fixVideo = () => {
      const video = reader.querySelector("video");

      if (!video) {
        return;
      }

      video.setAttribute("playsinline", "true");
      video.setAttribute("autoplay", "true");
      video.setAttribute("muted", "true");

      video.muted = true;
      video.autoplay = true;
      video.playsInline = true;

      video.style.width = "100%";
      video.style.height = "100%";
      video.style.minWidth = "100%";
      video.style.minHeight = "100%";
      video.style.objectFit = "cover";
      video.style.display = "block";
      video.style.backgroundColor = "#000";

      const handleVideoReady = () => {
        if (!cancelled) {
          setCameraReady(true);
        }
      };

      video.addEventListener(
        "loadedmetadata",
        handleVideoReady
      );

      video.addEventListener(
        "canplay",
        handleVideoReady
      );

      if (video.readyState >= 2) {
        handleVideoReady();
      }

      return () => {
        video.removeEventListener(
          "loadedmetadata",
          handleVideoReady
        );

        video.removeEventListener(
          "canplay",
          handleVideoReady
        );
      };
    };

    const observer = new MutationObserver(() => {
      fixVideo();
    });

    observer.observe(reader, {
      childList: true,
      subtree: true,
    });

    const stopScanner = async () => {
      try {
        if (started) {
          await html5QrCode.stop();
        }
      } catch (error) {
        console.debug(
          "QR scanner stop:",
          error
        );
      } finally {
        try {
          html5QrCode.clear();
        } catch (error) {
          console.debug(
            "QR scanner clear:",
            error
          );
        }

        if (
          scannerRef.current ===
          html5QrCode
        ) {
          scannerRef.current = null;
        }
      }
    };

    const startCamera = async () => {
      try {
        /*
         * Request the rear camera.
         * This is preferable for mobile QR scanning.
         */
        await html5QrCode.start(
          {
            facingMode: "environment",
          },
          {
            fps: 10,

            qrbox: function (
              viewfinderWidth,
              viewfinderHeight
            ) {
              const minDimension = Math.min(
                viewfinderWidth,
                viewfinderHeight
              );

              const size = Math.floor(
                minDimension * 0.65
              );

              return {
                width: size,
                height: size,
              };
            },

            aspectRatio: 1.333334,

            disableFlip: false,
          },

          async (decodedText) => {
            if (
              cancelled ||
              scanned
            ) {
              return;
            }

            scanned = true;

            await stopScanner();

            if (!cancelled) {
              onScanSuccess(decodedText);
            }
          },

          () => {
            // QR not detected yet.
            // This is normal while scanning.
          }
        );

        started = true;

        // Make sure the video gets the correct styles.
        fixVideo();

        if (!cancelled) {
          setCameraReady(true);
        }

        if (cancelled) {
          await stopScanner();
        }
      } catch (error) {
        console.error(
          "Camera Error:",
          error
        );

        if (!cancelled) {
          setCameraReady(false);

          const message =
            error?.message ||
            String(error);

          if (
            message
              .toLowerCase()
              .includes("permission")
          ) {
            setCameraError(
              "Camera permission was denied. Please allow camera access in Chrome settings."
            );
          } else if (
            message
              .toLowerCase()
              .includes("secure")
          ) {
            setCameraError(
              "Camera requires a secure HTTPS connection."
            );
          } else {
            setCameraError(
              "Unable to open the camera. Please check camera permission and try again."
            );
          }
        }
      }
    };

    startCamera();

    return () => {
      cancelled = true;

      observer.disconnect();

      void stopScanner();
    };
  }, [onScanSuccess]);

  return (
    <div className="mt-6 flex w-full flex-col items-center sm:mt-8">

      {/* Camera Container */}
      <div className="relative w-full max-w-xl overflow-hidden rounded-3xl border border-slate-200 bg-black shadow-xl">

        {/* Actual Camera */}
        <div
          id="qr-reader"
          className="relative h-[55vw] min-h-[300px] max-h-[480px] w-full overflow-hidden bg-black sm:aspect-[4/3] sm:h-auto"
        />

        {/* QR Scanner Overlay */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-52 w-52 -translate-x-1/2 -translate-y-1/2 sm:h-64 sm:w-64">

          {/* Scanning Line */}
          <motion.div
            animate={{
              y: [0, 200, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute left-0 right-0 h-1 rounded-full bg-blue-500 shadow-lg"
          />

          {/* Top Left */}
          <div className="absolute left-0 top-0 h-10 w-10 rounded-tl-lg border-l-4 border-t-4 border-blue-600" />

          {/* Top Right */}
          <div className="absolute right-0 top-0 h-10 w-10 rounded-tr-lg border-r-4 border-t-4 border-blue-600" />

          {/* Bottom Left */}
          <div className="absolute bottom-0 left-0 h-10 w-10 rounded-bl-lg border-b-4 border-l-4 border-blue-600" />

          {/* Bottom Right */}
          <div className="absolute bottom-0 right-0 h-10 w-10 rounded-br-lg border-b-4 border-r-4 border-blue-600" />

        </div>
      </div>

      {/* Camera Status */}
      {cameraError ? (
        <div className="mt-5 flex max-w-md items-center gap-2 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-center text-sm text-red-700">
          <AlertCircle
            size={18}
            className="shrink-0"
          />

          <span>
            {cameraError}
          </span>
        </div>
      ) : (
        <div className="mt-5 flex items-center gap-2 rounded-full bg-green-50 px-4 py-2">
          <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-green-600" />

          <Camera
            size={16}
            className="text-green-600"
          />

          <span className="text-sm font-medium text-green-700">
            {cameraReady
              ? t("dashboard.cameraActive")
              : "Starting camera..."}
          </span>
        </div>
      )}

      {/* Instructions */}
      <p className="mt-5 px-3 text-center text-sm font-medium text-slate-700 sm:text-base">
        {t("qr.instruction")}
      </p>

      <p className="mt-2 px-3 text-center text-xs text-slate-500 sm:text-sm">
        {t("qr.hold")}
      </p>

    </div>
  );
}