import { Group, Header, Placeholder } from "@vkontakte/vkui";
import { FormItem } from "@entities/form";
import { useQuery } from "@tanstack/react-query";
import { formQueries } from "@entities/form/api/form.queries";
import { useSelector } from "react-redux";
import { RootState } from "@app/store";
import { Form } from "@entities/form/model/form";

export function FormsList() {

  const { accessToken } = useSelector((state: RootState) => state.app);

  const { data } = useQuery(formQueries.list({accessToken}));

  return(
    <Group header={<Header>Мои анкеты</Header>}>
      {data?.data?.response?.length ? (
        data?.data?.response.map((item: Form) => <FormItem key={item.id} {...item}/>)
      ) : (
        <Placeholder>
          Пока вы не создали ни одной анкеты.
        </Placeholder>
      )}
    </Group>
  );
}