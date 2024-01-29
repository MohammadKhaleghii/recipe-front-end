import RecipeButton from "@/components/button";
import LoadingSpinner from "@/components/loading-spiner";
import Link from "next/link";
import {useRouter} from "next/router";
import {ReactNode, useEffect, useState} from "react";

const PublicLayout = ({children}: {children: ReactNode}) => {
  const router = useRouter();

  const [routeChangeLoading, setRouteChangeLoading] = useState(false);

  useEffect(() => {
    const handleStart = (url: string) =>
      url !== router.asPath && setRouteChangeLoading(true);
    const handleComplete = (url: string) =>
      url === router.asPath && setRouteChangeLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  });

  const headerNavBarItems = [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Search",
      href: "/search",
    },
    {
      title: "About",
      href: "https://anothermohammad.ir/",
    },
    {
      title: "Contact",
      href: "/contact",
    },
  ];
  const footerCompanyItems = [
    {
      title: "About",
      href: "https://anothermohammad.ir/",
    },
    {
      title: "Contact",
      href: "/contact",
    },
    {
      title: "Brand Center",
      href: "/brand-center",
    },
    {
      title: "Blog",
      href: "/blog",
    },
  ];
  const footerHelpCenter = [
    {
      title: "Discord Server",
      href: "#",
    },
    {
      title: "Twitter",
      href: "#",
    },
    {
      title: "Facebook",
      href: "#",
    },
    {
      title: "Contact Us",
      href: "#",
    },
  ];
  const footerLegal = [
    {
      title: "Privacy Policy",
      href: "#",
    },
    {
      title: "Licensing",
      href: "#",
    },

    {
      title: "Terms & Conditions",
      href: "#",
    },
  ];
  const footerDownload = [
    {
      title: "iOS",
      href: "#",
    },
    {
      title: "Android",
      href: "#",
    },
    {
      title: "Windows",
      href: "#",
    },
    {
      title: "MacOS",
      href: "#",
    },
  ];
  return (
    <>
      {routeChangeLoading && (
        <div className="absolute top-1 bottom-0 z-[100] left-3">
          <LoadingSpinner variant="contained" />
        </div>
      )}
      <header className="bg-white h-20 border-b-slate-300 border-b flex flex-row items-center justify-center sticky top-0 z-50 ">
        <div className="mx-auto w-full max-w-screen-xl px-4  flex flex-row justify-between items-center">
          <Link href={"/"}>
            <img src="/assets/images/logo.png" alt="" />
          </Link>
          <nav className=" justify-center gap-x-10 lg:flex hidden">
            {headerNavBarItems.map((headerItem) => (
              <Link
                key={headerItem.title}
                className="hover:text-primary font-bold transition ease-in-out delay-150 hover:-translate-y-1 "
                href={headerItem.href}
              >
                {headerItem.title}
              </Link>
            ))}
          </nav>
          <div className="">
            <div className="lg:block hidden">
              <RecipeButton
                UIType="primary"
                mainText="download app"
              ></RecipeButton>
            </div>
            <div className="block lg:hidden">
              <i className="fa-solid fa-bars"></i>
            </div>
          </div>
        </div>
      </header>
      <main className="mx-auto"> {children}</main>

      <footer className="bg-white border-t  border-t-slate-300 pb-2">
        <div className="mx-auto w-full max-w-screen-xl">
          <div className="grid grid-cols-2 gap-8 px-4 py-6 lg:py-8 md:grid-cols-4">
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Company
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                {footerCompanyItems.map((item) => (
                  <li key={item.title} className="mb-4">
                    <Link href={item.href} className=" hover:underline">
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Help center
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                {footerHelpCenter.map((item) => (
                  <li key={item.title} className="mb-4">
                    <Link href={item.href} className=" hover:underline">
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Legal
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                {footerLegal.map((item) => (
                  <li key={item.title} className="mb-4">
                    <Link href={item.href} className=" hover:underline">
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Download
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                {footerDownload.map((item) => (
                  <li key={item.title} className="mb-4">
                    <Link href={item.href} className=" hover:underline">
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="px-4 py-6 bg-gray-100 dark:bg-gray-700 text-white rounded-lg text-center">
            © 2023 FoodRecipe. All Rights Reserved.
          </div>
        </div>
      </footer>
    </>
  );
};

export default PublicLayout;
