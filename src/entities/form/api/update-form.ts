import { apiServices } from "@shared/api/base";

type updateFormProps = {
  form_id: number;
  title: string;
  description: string;
  accessToken: string;
};

export const updateForm = async (props: updateFormProps) => {
  const response = await apiServices.formsEdit(props);
  return response;
} 