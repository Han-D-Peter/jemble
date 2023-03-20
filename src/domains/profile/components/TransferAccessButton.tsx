import Button from "@/domains/shared/component/Button";
import useModal from "@/domains/shared/hooks/useModal";
import TransferModal from "../layouts/TransferModal";

export default function TransferAccessButton() {
  const { open } = useModal();

  const openModal = async () => {
    await open({
      children: <TransferModal />,
    });
  };
  return (
    <Button onClick={openModal} size="lg">
      보내기
    </Button>
  );
}
