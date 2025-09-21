import { NavLink } from "react-router";

const NotFound = () => {
  return (
    <>
      <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8 dark:bg-green-950">
        <div className="text-center">
          <p className="text-base font-semibold text-green-900 dark:text-green-100">
            404
          </p>
          <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl dark:text-white">
            Page not found
          </h1>
          <p className="mt-6 text-lg font-medium text-pretty text-green-950 sm:text-xl/8 dark:text-green-50">
            페이지를 찾을 수 없습니다 😢
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <NavLink
              to="/"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-green-50 dark:hover:bg-green-100 dark:focus-visible:outline-indigo-500 dark:text-green-950"
            >
              홈으로 돌아가기
            </NavLink>
          </div>
        </div>
      </main>
    </>
  );
};

export default NotFound;
