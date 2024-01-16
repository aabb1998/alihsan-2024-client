import { api } from "../../../src/utils/api";

export const getProjectsApi = async(filters) => {
  const response = await api.get("project/all-projects", {
    params: filters,
  });
  return response.data.payload;
}
