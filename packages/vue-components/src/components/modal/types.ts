import type { HTMLAttributes } from "vue";

interface ModalOverlayProps {
  blur: number | `${number}px`;
  /**
   * ## Uka, faqat 0 dan 1 gacha bo'lgan raqam kirit!
   *
   * @example ```vue
   * <modal-root overlay="{ opacity: 0.75 }"> <!-- opacity: 75% -->
   * </modal-root>
   * ```
   */
  opacity: number;
  bgColor: `#${string}`;
}

export interface ModalProps extends /* @vue-ignore */ HTMLAttributes {
  overlay?: boolean | ModalOverlayProps | undefined;
}

export interface ModalContext extends Pick<ModalProps, "overlay"> {
  isOpen: boolean;
  setOpen: (value?: boolean) => void;
}
