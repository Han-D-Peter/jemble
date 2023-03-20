import Button from "@/domains/shared/component/Button";
import useModal from "@/domains/shared/hooks/useModal";
import FriendRequestModal from "../layouts/FriendRequestModal";

interface FriendRequestAccessButtonProps {}

export default function FriendRequestAccessButton({}: FriendRequestAccessButtonProps) {
  const { open } = useModal();

  const openModal = async () => {
    await open({
      children: <FriendRequestModal />,
    });
  };
  return <Button onClick={openModal}>친구 추가</Button>;
}
