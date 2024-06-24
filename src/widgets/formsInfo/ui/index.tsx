import { RootState } from "@app/store";
import { useSelector } from "react-redux";
import { formQueries } from "@entities/form/api/form.queries";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import {
  Group,
  Title,
  Text,
  Spacing,
  Div,
  PanelSpinner,
  Link,
} from "@vkontakte/vkui";
import baseTheme from "@vkontakte/vkui-tokens/themes/vkBase/cssVars/theme";
import { CustomDate } from "@shared/ui/customDate";

export function FormInfo() {
  const router = useRouteNavigator();
  const params = useParams<"id">();
  const { accessToken } = useSelector((state: RootState) => state.app);

  const { data, isLoading, isFetching } = useQuery(
    formQueries.detail({
      form_id: Number(params?.id),
      accessToken,
    })
  );

  const handleUpdate = () => router.showModal("updateForm");

  return (
    <Group>
      {(!isLoading || !isFetching) ? (
        <Div>
          <Title level="3">{data?.data?.response?.title}</Title>

          <Spacing />

          <Text>{data?.data?.response?.description}</Text>

          <Spacing />

          <Text style={{ color: baseTheme.colorTextSecondary.normal.value }}>
            <CustomDate mode="default" date={data?.data?.response?.created_at} /> • {(data?.data?.response?.can_edit) && (<Link onClick={handleUpdate}>Редактировать</Link>)}
          </Text>
        </Div>
      ) : (
        <PanelSpinner/>
      )}
    </Group>
  );
}