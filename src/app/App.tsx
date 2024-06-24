import { useActiveVkuiLocation, useGetPanelForView, usePopout, useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import { SplitLayout, SplitCol, PanelHeader, View, usePlatform, Panel, Placeholder, PanelSpinner, Group, ModalRoot } from "@vkontakte/vkui";
import { FORMS_PANEL } from "./router/AppRouter";
import bridge, { GetLaunchParamsResponse } from "@vkontakte/vk-bridge";
import { useEffect } from "react";

import { Homepage } from "@pages/homepage";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store";
import { setAccessToken, setInit, setLaunchParams, setSecure } from "./store/configReducer";
import { useCheckVKLaunchParams } from "@shared/hooks/useCheckVKLaunchParams";
import { Form } from "@pages/form";
import { UpdateFormModal } from "@pages/modals";

export function App() {

  const popout = usePopout();
  const router = useRouteNavigator();

  const dispatch = useDispatch();
  const { isInit, isSecure, launchParams } = useSelector((state: RootState) => state.app);

  const platform = usePlatform();
  const isVKCOM = platform === "vkcom";
  
  const { view: activeView, modal: activeModal } = useActiveVkuiLocation();
  const activePanel = useGetPanelForView(activeView);

  // @ts-ignore
  const { data } = useCheckVKLaunchParams(launchParams);

  const modals = (
    <ModalRoot activeModal={activeModal} onClose={() => router.hideModal()}>
      <UpdateFormModal id="updateForm" />
    </ModalRoot>
  );

  useEffect(() => {
    bridge.send("VKWebAppInit")
      .then(() => dispatch(setInit(true)))
      .then(() => {
        bridge.send("VKWebAppGetLaunchParams")
          .then((launchParams: GetLaunchParamsResponse) => {
            dispatch(setLaunchParams(launchParams));
          })
      })
  }, []);

  useEffect(() => {
    if (data?.data?.access_token) {
      dispatch(setAccessToken(data.data.access_token));
      dispatch(setSecure(true));
    }
  }, [ data ]);

  return(
    <SplitLayout
      modal={modals}
      popout={popout}
      header={!isVKCOM && <PanelHeader float style={{ height: 48 }}/>}
      style={{ maxWidth: 630, marginLeft: "auto", marginRight: "auto" }}
    >

      {(isInit && isSecure) ? (
        <SplitCol autoSpaced>
          <View id="forms" activePanel={activePanel || FORMS_PANEL.HOMEPAGE}>
            <Homepage nav={FORMS_PANEL.HOMEPAGE} />
            <Form nav={FORMS_PANEL.BLANK} />
          </View>
        </SplitCol>
      ) : (
        <SplitCol>
          <Panel>
            {(!isVKCOM) && (<PanelHeader/>)}
            <Group style={{ marginTop: "auto", marginBottom: "auto" }}>
              <Placeholder header={"Запуск..."} icon={<PanelSpinner size="large" />}>
                {!isInit ? "Инициализируем приложение" : "Проверяем параметры запуска"}
              </Placeholder>
            </Group>
          </Panel>
        </SplitCol>
      )}

    </SplitLayout>
  );
}