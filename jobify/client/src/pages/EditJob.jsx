import { FormRow, FormRowSelect, SubmitBtn } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { JOB_STATUS, JOB_TYPE } from "../../../utils/constants";
import { Form, redirect, useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { useQuery } from "@tanstack/react-query";

const jobQuery = (id) => {
  return {
    queryKey: ["job", id],
    queryFn: async () => {
      const { data } = await customFetch.get(`/jobs/${id}`);
      return data;
    },
  };
};

export const action =
  (queryClient) =>
  async ({ request, params }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    const { id } = params;

    try {
      await customFetch.patch(`/jobs/${id}`, data);
      queryClient.invalidateQueries(["jobs"]);
      toast.success("Updated job successfully");
      return redirect("../all-jobs");
    } catch (error) {
      toast.error(error?.response?.data?.message);
      return error;
    }
  };

export const loader =
  (queryClient) =>
  async ({ params }) => {
    try {
      const { id } = params;
      const { data } = await queryClient.ensureQueryData(jobQuery(id));
      return id;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      return redirect("../all-jobs");
    }
  };

const EditJob = () => {
  const id = useLoaderData();
  const {
    data: { job },
  } = useQuery(jobQuery(id));
  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">Edit Job</h4>
        <div className="form-center">
          <FormRow type="text" name="position" defaultValue={job.position} />
          <FormRow type="text" name="company" defaultValue={job.company} />
          <FormRow
            type="text"
            labelText="job location"
            name="jobLocation"
            defaultValue={job.jobLocation}
          />
          <FormRowSelect
            labelText="Job Status"
            name="jobStatus"
            defaultValue={job.jobStatus}
            list={Object.values(JOB_STATUS)}
          />
          <FormRowSelect
            labelText="Job type"
            name="jobType"
            defaultValue={job.jobType}
            list={Object.values(JOB_TYPE)}
          />
          <SubmitBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  );
};
export default EditJob;
