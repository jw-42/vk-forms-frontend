import { IconButton, SimpleCell } from "@vkontakte/vkui";
import { Icon24MoreHorizontal } from "@vkontakte/icons";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import { AppRoutes } from "@app/router/AppRouter";
import { Form } from "../model/form";

export function FormItem(props: Form) {

  const router = useRouteNavigator();

  return(
    <SimpleCell
      onClick={() => router.push(
        AppRoutes.forms.blank.questions,
        { "id": props.id }
      )}
      subtitle={props.updated_at}
      after={<IconButton aria-label="more-actions" onClick={(e) => {
        e.stopPropagation();
      }}>
        <Icon24MoreHorizontal/>
      </IconButton>}
    >{props.title}</SimpleCell>
  );
}