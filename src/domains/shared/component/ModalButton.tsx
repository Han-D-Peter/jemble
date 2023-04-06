import Button from "@/domains/shared/component/Button";
import useModal from "@/domains/shared/hooks/useModal";
import { ReactNode } from "react";

type ModalButton = typeof Button.arguments & {
  ModalComponent: ReactNode;
};

export default function ModalButton({
  ModalComponent,
  children,
  ...args
}: ModalButton) {
  const { open } = useModal();

  const openModal = async () => {
    await open({
      children: <ModalComponent />,
    });
  };
  return (
    <Button onClick={openModal} {...args}>
      {children}
    </Button>
  );
}
