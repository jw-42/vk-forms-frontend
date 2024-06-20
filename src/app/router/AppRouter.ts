import {
  RoutesConfig,
  createHashRouter,
  createView,
  createPanel,
  createTab,
  createModal,
} from "@vkontakte/vk-mini-apps-router";

export enum VIEW {
  FORMS = "forms",
  ANSWERS = "answers",
}

export enum FORMS_PANEL {
  HOMEPAGE = "homepage",
  BLANK = "blank",
}

export enum FORMS_TABS {
  QUESTIONS = "questions",
  ANSWERS = "answers",
  SETTINGS = "settings",
}

export enum MODALS {
  ANSWER = "answers",
  BUILDER_SHORT = "builder_short",
  BUILDER_OPTIONS = "builder_options",
  EDITOR = "editor",
}

export const AppRoutes = RoutesConfig.create([
  createView(VIEW.FORMS, [
    createPanel(FORMS_PANEL.HOMEPAGE, "/"),
    createPanel(FORMS_PANEL.BLANK, "/view/:id", [
      createTab(FORMS_TABS.QUESTIONS, "/view/:id", [
        createModal(MODALS.EDITOR, "/view/:id/q/:qid", ["id","qid"] as const)
      ], [ "id" ] as const),
      createTab(FORMS_TABS.ANSWERS, "/answers/:id", [
        createModal(MODALS.ANSWER, "/view/:id/a/:aid", ["id","aid"] as const)
      ], ["id"] as const),
      createTab(FORMS_TABS.SETTINGS, "/settings/:id", [], ["id"] as const),
    ], ["id"] as const),
  ]),
]);

export const AppRouter = createHashRouter(AppRoutes.getRoutes());
