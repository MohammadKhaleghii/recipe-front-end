import PublicLayout from "@/layouts/public-layout";
import { ReactElement } from "react";

const ServerError = () => {
  return (
    <div className="py-10 text-center text-xl font-bold text-red-500">
      Server Error
    </div>
  );
};

export default ServerError;

ServerError.getLayout = function getLayout(page: ReactElement) {
  return <PublicLayout>{page}</PublicLayout>;
};
