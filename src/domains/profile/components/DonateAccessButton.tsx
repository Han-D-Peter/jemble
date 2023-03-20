import Button from "@/domains/shared/component/Button";
import useModal from "@/domains/shared/hooks/useModal";
import DonationModal from "../layouts/DonationModal";

export default function DonateAccessButton() {
  const { open } = useModal();

  const openModal = async () => {
    await open({
      children: <DonationModal />,
    });
  };
  return (
    <Button outline size="lg" onClick={openModal}>
      기여하기
    </Button>
  );
}
