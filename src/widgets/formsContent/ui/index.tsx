import { AppRoutes } from "@app/router/AppRouter";
import { useActiveVkuiLocation, useParams, useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import { Group, Tabs, TabsItem, Div } from "@vkontakte/vkui";
import { Questions } from "./questions";
import { Answers } from "./answers";
import { Settings } from "./settings";

export function FormsContent() {

  const params = useParams<"id">();
  const router = useRouteNavigator();
  const { tab: activeTab } = useActiveVkuiLocation();

  return(
    <Group>
      <Div style={{ paddingTop: 0, paddingBottom: 0 }}>
        <Tabs mode="accent">
        <TabsItem
            selected={activeTab === "questions"}
            onClick={() => router.push(AppRoutes.forms.blank.questions, { "id": params?.id })}
          >Вопросы</TabsItem>

          <TabsItem
            selected={activeTab === "answers"}
            onClick={() => router.push(AppRoutes.forms.blank.answers, { "id": params?.id })}
          >Ответы</TabsItem>

          <TabsItem
            selected={activeTab === "settings"}
            onClick={() => router.push(AppRoutes.forms.blank.settings, { "id": params?.id })}
          >Настройки</TabsItem>
        </Tabs>
      </Div>

      {(activeTab === "questions") && (<Questions/>)}
      {(activeTab === "answers") && (<Answers/>)}
      {(activeTab === "settings") && (<Settings/>)}
    </Group>
  );
}