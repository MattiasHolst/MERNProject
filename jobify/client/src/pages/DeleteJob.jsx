import { toast } from "react-toastify";
import customFetch from "../utils/customFetch.js";
import { redirect } from "react-router-dom";

export const action = (queryClient) => async ({ params }) => {
  try {
    const { id } = params;
    await customFetch.delete(`/jobs/${id}`);
    queryClient.invalidateQueries(['jobs']);
    toast.success("Job deleted successfully");
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
  return redirect("../all-jobs");
};

const DeleteJob = () => {
  return <h1>DeleteJob</h1>;
};
export default DeleteJob;
