import { useMutation } from "@tanstack/react-query";
import { formApi } from "@entities/form";

export const useUpdateForm = () =>
  useMutation({
    mutationFn: formApi.updateForm
  })