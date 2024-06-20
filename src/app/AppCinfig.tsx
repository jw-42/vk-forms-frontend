import { AdaptivityProvider, ConfigProvider, AppRoot } from "@vkontakte/vkui";
import { useAppearance, useInsets, useAdaptivity } from "@vkontakte/vk-bridge-react";
import bridge, { parseURLSearchParamsForGetLaunchParams } from "@vkontakte/vk-bridge";
import { transformVKBridgeAdaptivity } from "./transformers/transformVKBridgeAdaptivity.ts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "@vkontakte/vk-mini-apps-router";
import { store } from "./store/index.ts";
import { Provider } from "react-redux";
import '@vkontakte/vkui/dist/vkui.css';
import { AppRouter } from "./router/AppRouter.ts";
import { App } from "./App.tsx";

export function AppConfig() {

  const appearance = useAppearance() || undefined;
  const insets = useInsets() || undefined;
  const { vk_platform } = parseURLSearchParamsForGetLaunchParams(
    window.location.search
  );
  const adaptivityProps = transformVKBridgeAdaptivity(useAdaptivity());

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        staleTime: 15 * 60 * 1000,
        retry: true,
      },
    },
  });

  return(
    <ConfigProvider
      isWebView={bridge.isWebView()}
      appearance={appearance ?? undefined}
      platform={vk_platform === 'desktop_web' ? 'vkcom' : undefined}
      hasCustomPanelHeaderAfter={true}
    >
      <AdaptivityProvider {...adaptivityProps}>
        <AppRoot mode="full" safeAreaInsets={insets}>
          <RouterProvider router={AppRouter}>
            <Provider store={store}>
              <QueryClientProvider client={queryClient}>
                <App/>
              </QueryClientProvider>
            </Provider>
          </RouterProvider>
        </AppRoot>
      </AdaptivityProvider>
    </ConfigProvider>
  );

}