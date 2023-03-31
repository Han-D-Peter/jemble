import ModalButton from "@/domains/shared/component/ModalButton";
import DonationModal from "../layouts/DonationModal";

export default function DonateAccessButton() {
  return (
    <ModalButton ModalComponent={DonationModal} outline size="lg">
      기여하기
    </ModalButton>
  );
}
