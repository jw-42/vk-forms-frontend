import { Panel, PanelHeader, NavIdProps } from "@vkontakte/vkui";
import { FormsList } from "@widgets/formsList";
import { Templates } from "@widgets/templates";

export function Homepage(props: NavIdProps) {
  return(
    <Panel {...props}>
      <PanelHeader fixed>Анкеты</PanelHeader>
      <Templates/>
      <FormsList/>
    </Panel>
  );
}