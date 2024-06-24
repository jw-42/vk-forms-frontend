import { RootState } from "@app/store";
import { formQueries } from "@entities/form/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import {
  FormItem,
  FormLayoutGroup,
  Input,
  Textarea,
  Button,
  ButtonGroup,
  Div,
  Alert,
} from "@vkontakte/vkui";
import { useUpdateForm } from "../api/use-update-form";
import { useSelector } from "react-redux";
import { useRef } from "react";

export function UpdateFormLayout() {
  const queryClient = useQueryClient();

  const params = useParams<"id">();
  const router = useRouteNavigator();
  const { accessToken } = useSelector((state: RootState) => state.app);

  const targetTitle = useRef<HTMLInputElement>(null);
  const targetDescription = useRef<HTMLTextAreaElement>(null);

  const { mutateAsync, isPending } = useUpdateForm();

  const { data } = useQuery(
    formQueries.detail({
      form_id: Number(params?.id),
      accessToken,
    })
  );

  const handleSubmit = async () => {
    mutateAsync({
      form_id: Number(params?.id),
      title: `${targetTitle.current?.value}`,
      description: `${targetDescription.current?.value}`,
      accessToken
    })
      .then(() => {
        queryClient.invalidateQueries({ queryKey: formQueries.details() });
        queryClient.invalidateQueries({ queryKey: formQueries.lists() });
        router.hideModal();
      })
      .catch((e) => router.showPopout(
        <Alert
          actions={[
            {
              title: "Ок",
              mode: "cancel"
            }
          ]}
          actionsLayout="horizontal"
          onClose={() => router.hidePopout()}
          header="Произошла ошибка"
          text={e?.response?.data?.error_message}
        />
      ))
  };

  return (
    <FormLayoutGroup mode="vertical">
      <FormItem top="Название">
        <Input
          getRef={targetTitle}
          placeholder="Название анкеты"
          defaultValue={data?.data?.response?.title}
        />
      </FormItem>

      <FormItem top="Описание">
        <Textarea
          rows={4}
          getRef={targetDescription}
          placeholder="Расскажите, зачем нужна эта форма"
          defaultValue={data?.data?.response?.description}
        />
      </FormItem>

      <Div style={{ paddingTop: 8 }}>
        <ButtonGroup stretched>
          <Button stretched size="l" onClick={handleSubmit} disabled={isPending}>
            Редактировать
          </Button>
        </ButtonGroup>
      </Div>
    </FormLayoutGroup>
  );
}
