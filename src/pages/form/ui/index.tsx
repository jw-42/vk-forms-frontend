import { Panel, PanelHeader, PanelHeaderBack, NavIdProps } from "@vkontakte/vkui";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import { FormInfo } from "@widgets/formsInfo";
import { AppRoutes } from "@app/router/AppRouter";
import { FormsContent } from "@widgets/formsContent";

export function Form(props: NavIdProps) {

  const router = useRouteNavigator();

  return(
    <Panel {...props}>
      <PanelHeader
        fixed={true}
        before={<PanelHeaderBack onClick={() => router.push(AppRoutes.forms.homepage)} />}
      >Анкета</PanelHeader>

      <FormInfo/>
      <FormsContent/>
    </Panel>
  );
}