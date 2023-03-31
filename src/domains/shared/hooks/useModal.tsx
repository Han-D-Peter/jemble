import { useOverlay } from "@toss/use-overlay";
import { ComponentProps, MouseEvent, TouchEvent, useRef } from "react";
import SuspensableBox from "@/domains/shared/component/layout/SuspensableBox";
import DefaultModal from "../component/layout/DefaultModal";
import { useOnClickOutside } from "./useOnClickOutside";

export default function useModal() {
  const overlay = useOverlay();
  const ref = useRef<HTMLDivElement>(null);

  useOnClickOutside(ref, () => {
    overlay.close();
  });

  const openModal = (props: ComponentProps<typeof SuspensableBox>) =>
    new Promise<boolean>((resolve) => {
      overlay.open(({ isOpen, close }) => {
        return (
          <>
            {isOpen ? (
              <DefaultModal
                onClick={(e: MouseEvent) => {
                  e.target === ref.current ? close() : null;
                  resolve(false);
                }}
              >
                <SuspensableBox ref={ref} {...props} />
              </DefaultModal>
            ) : null}
          </>
        );
      });
    });
  return { open: openModal, close: overlay.close };
}
