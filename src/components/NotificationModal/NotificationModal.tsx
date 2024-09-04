import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { cc } from "@/lib/cc";
import { DEFAULT_MODAL_OPTIONS } from "./utils";

import useIcons from "../../hooks/useIcons";
import styles from "./NotificationModal.module.css";

type NotificationType = "success" | "notification" | "warning" | "alert" | "";

export type NotificationModalOptions = {
  position: "center" | "topLeft" | "topCenter" | "topRight" | "bottomLeft" | "bottomCenter" | "bottomRight";
  blurBg: boolean;
  size: "sm" | "md" | "lg" | "xl";
} & ({ autoDismiss: true; autoDismissTimeout: number } | { autoDismiss: false; autoDismissTimeout?: never });

export type NotificationModalProps = {
  text: string;
  type: NotificationType;
  isOpen: boolean;
  onClose: () => void;
  options?: Partial<NotificationModalOptions>;
};

/**
 * `NotificationModal` is a function component that displays a modal with a notification message.
 *
 * @param text - The message to be displayed in the modal.
 *
 * @param type - The type of the notification. It determines the styling of the modal.
 * It can be one of the following: "success" | "notification" | "warning" | "alert".
 *
 * @param isOpen - A boolean that controls the visibility of the modal. When `isOpen` is `true`,
 * the modal is visible; when `isOpen` is `false`, the modal is hidden.
 *
 * @param onClose - A function that is called when the user attempts to close the modal.
 * This can happen in two ways: when the user clicks the close button, or when the user presses the Escape key.
 *
 * @param options - Optional. An object that allows for further customization of the modal.
 * It controls the modal's position on the screen ("topLeft" | "topCenter" | "topRight" | "bottomLeft" | "bottomCenter" | "bottomRight"), whether the background should be blurred
 * when the modal is open (`blurBg: boolean`), and whether the modal should automatically dismiss itself
 * after a certain period of time (`dismiss: boolean` and `dismissTimeout(ms): number`).
 */
export function NotificationModal({
  text,
  type,
  isOpen,
  onClose,
  options = DEFAULT_MODAL_OPTIONS,
}: NotificationModalProps) {
  const [isClosing, setIsClosing] = useState(false);
  const prevIsOpen = useRef<boolean>();
  const { SuccessIcon, ErrorIcon, WarningIcon, NotificationIcon } = useIcons().status;
  const { CloseIcon } = useIcons().action;

  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }

    document.addEventListener("keydown", handler);

    return () => {
      document.removeEventListener("keydown", handler);
    };
  }, [onClose]);

  useLayoutEffect(() => {
    if (!isOpen && prevIsOpen.current) {
      setIsClosing(true);
    }

    prevIsOpen.current = isOpen;
  }, [isOpen]);

  useEffect(() => {
    if (!options.autoDismiss) return;

    const modalTimeout = setTimeout(() => {
      onClose();
    }, options.autoDismissTimeout);

    return () => clearTimeout(modalTimeout);
  }, [onClose, options.autoDismiss, options.autoDismissTimeout]);

  if (!isOpen && !isClosing) return null;

  return createPortal(
    <>
      {options.blurBg && <div className={cc(styles.overlay, isClosing && styles.closing)} onClick={onClose}></div>}
      <div
        className={cc(styles.modal, isClosing && styles.closing, options.position && styles[options.position])}
        onAnimationEnd={() => setIsClosing(false)}
      >
        <div className={cc(styles.modalBody, styles[type])}>
          <div className="row gap-small">
            {type === "success" && (
              <SuccessIcon className={cc(styles.icon, styles[type], options.size && styles[options.size])} />
            )}
            {type === "warning" && (
              <ErrorIcon className={cc(styles.icon, styles[type], options.size && styles[options.size])} />
            )}
            {type === "notification" && (
              <NotificationIcon className={cc(styles.icon, styles[type], options.size && styles[options.size])} />
            )}
            {type === "alert" && (
              <WarningIcon className={cc(styles.icon, styles[type], options.size && styles[options.size])} />
            )}
            <span className={cc(styles.modalText, options.size && styles[options.size])}>{text}</span>
          </div>
          <button className={styles.closeBtn} onClick={onClose}>
            <CloseIcon className={options.size && styles[options.size]} />
          </button>
        </div>
      </div>
    </>,
    /* Replace this by "modal-container" or any other
       container in index.html to insert the modal in DOM */
      (document.getElementById("notification-target") as HTMLDivElement)  
  );
}
