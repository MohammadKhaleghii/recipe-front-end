import { Button } from "@/components/common/button";
import PublicLayout from "@/layouts/public-layout";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { ReactElement } from "react";

const NotFound = () => {
  const router = useRouter();
  return (
    <>
      <NextSeo title="Not found - Food Recipe" />
      <section className="bg-white  ">
        <div className="container mx-auto min-h-screen px-6 py-12 lg:flex lg:items-center lg:gap-12">
          <div className="wf-ull lg:w-1/2">
            <p className="text-sm font-medium text-primary ">404 error</p>
            <h1 className="mt-3 text-2xl font-semibold text-gray-800 md:text-3xl ">
              Page not found
            </h1>
            <p className="mt-4 text-gray-500 ">
              Sorry, the page you are looking for doesn't exist.Here are some
              helpful links:
            </p>

            <div className="mt-6 flex items-center gap-x-3">
              <Button
                onClick={() => router.back()}
                className="w-1/2"
                variant="secondary"
              >
                Go Back
              </Button>

              <Button
                onClick={() => router.push("/")}
                variant="primary"
                className="w-1/2"
              >
                Take me home
              </Button>
            </div>
          </div>

          <div className="relative mt-8 w-full lg:mt-0 lg:w-1/2">
            <img
              className=" h-80 w-full rounded-lg object-cover md:h-96 lg:h-[32rem] "
              src="/assets/images/404.avif"
              alt=""
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default NotFound;
NotFound.getLayout = function getLayout(page: ReactElement) {
  return <PublicLayout>{page}</PublicLayout>;
};
