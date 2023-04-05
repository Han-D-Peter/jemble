import ModalButton from "@/domains/shared/component/ModalButton";
import FriendRequestModal from "../layouts/FriendRequestModal";

interface FriendRequestAccessButtonProps {}

export default function FriendRequestAccessButton({}: FriendRequestAccessButtonProps) {
  return (
    <ModalButton ModalComponent={FriendRequestModal} outline>
      친구 추가
    </ModalButton>
  );
}
