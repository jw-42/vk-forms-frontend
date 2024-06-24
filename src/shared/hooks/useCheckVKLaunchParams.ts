import { useQuery } from "@tanstack/react-query";
import { apiServices } from "../api/base";
import { GetLaunchParamsResponse } from "@vkontakte/vk-bridge";

export const useCheckVKLaunchParams = (params: GetLaunchParamsResponse) => {
  return useQuery({
    queryKey: [ "auth" ],
    queryFn: async () => await apiServices.checkVKLaunchParams(params),
    staleTime: 60 * 1000,
    retry: true
  });
}