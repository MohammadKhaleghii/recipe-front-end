import { Button } from "@/components/common/button";
import LoadingSpinner from "@/components/common/loading-spiner";
import { MenuContext } from "@/contexts/menu-provider";
import { Global, css } from "@emotion/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode, useContext, useEffect, useState } from "react";

const PublicLayout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const { isMobileMenuOpen, setIsMobileMenuOpen } = useContext(MenuContext);
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

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [router.asPath]);

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
  const updateBodyStyle = () => {
    if (isMobileMenuOpen) {
      return css`
        body {
          overflow: hidden;
        }
      `;
    }
  };
  return (
    <>
      <Global styles={updateBodyStyle()} />
      {routeChangeLoading && (
        <div className="fixed bottom-0 left-3 top-1 z-[100]">
          <LoadingSpinner variant="contained" />
        </div>
      )}
      <header className="sticky top-0 z-50 flex  h-20 flex-row items-center justify-center border-b border-b-slate-300 bg-white ">
        <div className="mx-auto flex w-full max-w-screen-xl  flex-row items-center justify-between px-4">
          <Link href={"/"}>
            <img src="/assets/images/logo.png" alt="" />
          </Link>
          <nav className=" hidden justify-center gap-x-10 lg:flex">
            {headerNavBarItems.map((headerItem) => (
              <Link
                key={headerItem.title}
                className="font-bold transition delay-150 ease-in-out hover:-translate-y-1 hover:text-primary "
                href={headerItem.href}
              >
                {headerItem.title}
              </Link>
            ))}
          </nav>
          <div className="">
            <div className="hidden lg:block">
              <Button variant="primary">download app</Button>
            </div>
            <div
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="block lg:hidden"
            >
              <i
                className={`fa-solid fa-${isMobileMenuOpen ? "close" : "bars"}`}
              ></i>
            </div>
          </div>
        </div>
      </header>

      {isMobileMenuOpen && (
        <ul className="fixed bottom-0 top-20 z-50 flex h-full w-full flex-col gap-y-3 overflow-hidden bg-white pt-3 transition-transform">
          {headerNavBarItems.map((item) => (
            <Link key={item.title} href={item.href}>
              {" "}
              <li className="font-bold">{item.title}</li>
            </Link>
          ))}
          <div className="w-full p-4">
            <Button variant="primary">download app</Button>
          </div>
        </ul>
      )}
      <main className="mx-auto"> {children}</main>
      <footer className="border-t border-t-slate-300  bg-white pb-2">
        <div className="mx-auto w-full max-w-screen-xl">
          <div className="grid grid-cols-2 gap-8 px-4 py-6 md:grid-cols-4 lg:py-8">
            <div>
              <h2 className="mb-6 text-sm font-semibold uppercase text-gray-900 dark:text-white">
                Company
              </h2>
              <ul className="font-medium text-gray-500 dark:text-gray-400">
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
              <h2 className="mb-6 text-sm font-semibold uppercase text-gray-900 dark:text-white">
                Help center
              </h2>
              <ul className="font-medium text-gray-500 dark:text-gray-400">
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
              <h2 className="mb-6 text-sm font-semibold uppercase text-gray-900 dark:text-white">
                Legal
              </h2>
              <ul className="font-medium text-gray-500 dark:text-gray-400">
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
              <h2 className="mb-6 text-sm font-semibold uppercase text-gray-900 dark:text-white">
                Download
              </h2>
              <ul className="font-medium text-gray-500 dark:text-gray-400">
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
          <div className="rounded-lg bg-gray-100 px-4 py-6 text-center text-white dark:bg-gray-700">
            © 2023 FoodRecipe. All Rights Reserved.
          </div>
        </div>
      </footer>
    </>
  );
};

export default PublicLayout;
