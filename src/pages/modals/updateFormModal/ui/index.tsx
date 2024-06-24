import { ModalPage, ModalPageHeader, NavIdProps } from "@vkontakte/vkui";
import { UpdateFormLayout } from "@features/update-form";

export function UpdateFormModal(props: NavIdProps) {
  return(
    <ModalPage {...props}>
      <ModalPageHeader>Редактировать</ModalPageHeader>
      <UpdateFormLayout/>
    </ModalPage>
  );
}