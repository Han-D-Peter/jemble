import ModalButton from "@/domains/shared/component/ModalButton";
import TransferModal from "../layouts/TransferModal";

export default function TransferAccessButton() {
  return (
    <ModalButton ModalComponent={TransferModal} outline size="lg">
      보내기
    </ModalButton>
  );
}
