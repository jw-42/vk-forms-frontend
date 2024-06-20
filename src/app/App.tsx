import { useActiveVkuiLocation, useGetPanelForView, usePopout, useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import { SplitLayout, SplitCol, PanelHeader, View, usePlatform, Panel, Group, Placeholder, PanelSpinner, ModalPage, ModalPageHeader, ModalRoot } from "@vkontakte/vkui";
import { setAccessToken, setInit, setLaunchParams, setSecure } from "./store/configReducer";
import { useCheckVKLaunchParams } from "../shared/hooks/useCheckVKLaunchParams";
import bridge, { GetLaunchParamsResponse } from "@vkontakte/vk-bridge";
import { useDispatch, useSelector } from "react-redux";
import { FORMS_PANEL } from "./router/AppRouter";
import { RootState } from "./store";
import { useEffect } from "react";

import { Homepage } from "../pages/homepage/ui";
import { Blank } from "../pages/blank/ui";
import { ModalEditForm } from "../shared/ui/modals";

export function App() {

  const popout = usePopout();
  const dispatch = useDispatch();
  const { isInit, isSecure, launchParams: lp } = useSelector((state: RootState) => state.app);

  const platform = usePlatform();
  const isVKCOM = platform === "vkcom";

  const router = useRouteNavigator();
  const { view: activeView, modal: activeModal } = useActiveVkuiLocation();
  const activePanel = useGetPanelForView(activeView);

  const { data } = useCheckVKLaunchParams(lp);
  
  const modals = (
    <ModalRoot activeModal={activeModal} onClose={() => router.hideModal()}>
      <ModalEditForm id="editForm" />
    </ModalRoot>
  )

  useEffect(() => {
    if(data?.access_token) {
      dispatch(setAccessToken(data.access_token));
      dispatch(setSecure(true));
    } else {
      dispatch(setSecure(false))
    }
  });

  useEffect(() => {
    bridge.send("VKWebAppInit")
      .then(() => {
        dispatch(setInit(true));
        
        bridge.send("VKWebAppGetLaunchParams")
          .then((data: GetLaunchParamsResponse) => dispatch(setLaunchParams(data)))
      })
      .catch(() => dispatch(setInit(false)))
  }, []);

  return(
    <SplitLayout
      popout={popout}
      modal={modals}
      header={!isVKCOM && <PanelHeader float style={{ height: 48 }}/>}
      style={{ maxWidth: 630, marginLeft: "auto", marginRight: "auto" }}
    >

      {(isInit && isSecure) ? (
        <SplitCol autoSpaced>
          <View id="forms" activePanel={activePanel || FORMS_PANEL.HOMEPAGE}>
            <Homepage nav={FORMS_PANEL.HOMEPAGE} />
            <Blank nav={FORMS_PANEL.BLANK} />
          </View>
        </SplitCol>
      ) : (
        <SplitCol>
          <Panel>
            <Placeholder header={"Запуск..."} icon={<PanelSpinner size="large" />}>
              Это может занять несколько секунд.
            </Placeholder>
          </Panel>
        </SplitCol>
      )}

    </SplitLayout>
  );
}