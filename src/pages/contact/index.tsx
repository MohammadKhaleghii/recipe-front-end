import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { ReactElement } from "react";
import PublicLayout from "@/layouts/public-layout";
import { Button } from "@/components/common/button";
import { Input } from "@/components/common/input";

const Contact = () => {
  const { handleSubmit, resetForm, values, errors, getFieldProps, touched } =
    useFormik({
      initialValues: {
        email: "",
        subject: "",
        message: "",
      },
      validationSchema: Yup.object({
        email: Yup.string()
          .email("your email format is not correct")
          .required("email is required"),
        subject: Yup.string().required("subject is required"),
        message: Yup.string().required("description is required"),
      }),
      onSubmit: (values) => {
        console.log(values);
        toast.success("Done");
        resetForm();
      },
    });

  return (
    <section className="px-2 pb-10">
      <section className="bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-screen-md px-4 py-8 lg:py-16">
          <h2 className="mb-4 text-center text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Contact US
          </h2>
          <p className="mb-8 text-center font-light text-gray-500 sm:text-xl lg:mb-16 dark:text-gray-400">
            If you would like to be in contact with our team or there is a
            problem that you need to discuss with us, please send us a message
            here.{" "}
          </p>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300">
                Email Address
              </label>
              <Input
                variants="primary"
                className="w-full"
                {...getFieldProps("email")}
                type="email"
                id="email"
                placeholder="coffe@gmail.com"
              />
              <div className="pt-2 text-sm text-red-500">
                {touched.email && errors.email}
              </div>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300">
                Subject
              </label>
              <Input
                variants="primary"
                className="w-full"
                {...getFieldProps("subject")}
                type="text"
                id="subject"
              />
              <div className="pt-2 text-sm text-red-500">
                {touched.subject && errors.subject}
              </div>
            </div>

            <div className="sm:col-span-2">
              <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-400">
                Description
              </label>
              <textarea
                className="w-full rounded-lg bg-[#F5F5F5] px-4 py-3 text-[#9E9E9E] outline-none"
                {...getFieldProps("message")}
                id="message"
              ></textarea>
              <div className="pt-2 text-sm text-red-500">
                {touched.message && errors.message}
              </div>
            </div>
            <div className="w-full pb-2">
              <Button
                variant="primary"
                type="submit"
                className="w-full rounded-full border-none px-4 py-2"
              >
                Send
              </Button>
            </div>
          </form>
        </div>
      </section>
    </section>
  );
};

Contact.getLayout = function getLayout(page: ReactElement) {
  return <PublicLayout>{page}</PublicLayout>;
};

export default Contact;
