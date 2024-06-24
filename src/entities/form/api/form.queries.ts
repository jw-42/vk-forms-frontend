import { queryOptions } from "@tanstack/react-query";
import { apiServices } from "@shared/api/base";

export interface FormsListQuery {
  accessToken: string
}

export interface FormDetailQuery {
  form_id: number,
  accessToken: string
}

export const formQueries = {
  all: () => [ "form" ],

  lists: () => [ ...formQueries.all(), "list" ],
  list: (query: FormsListQuery) =>
    queryOptions({
      queryKey: [...formQueries.lists()],
      queryFn: async () => await apiServices.formsGetAll(query),
    }),

  details: () => [...formQueries.all(), "detail"],
  detail: (query: FormDetailQuery) =>
    queryOptions({
      queryKey: [...formQueries.details(), query.form_id],
      queryFn: async () => await apiServices.formsGetById(query),
      staleTime: Infinity
    })
}