import { Button } from "@/components/Button";
import { TheHeader } from "@/components/TheHeader";
import supabase from "@/utils/supabase";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
interface Student {
  id: string;
  name: string;
  memo: string;
  is_active: boolean;
  created_at: Date;
}

const StudentsPage = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [searchName, setSearchName] = useState<string>("");
  const fetchStudents = async () => {
    try {
      let query = supabase
        .from("students")
        .select("id, name, memo, is_active, created_at");
      if (searchName) {
        query = query.eq("name", searchName);
      }
      const { data, error } = await query;

      if (error) {
        alert("조회 실패");
        return;
      }
      setStudents(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <>
      <TheHeader
        title="수강생 관리"
        actions={
          <>
            <Button variant="primary" size="md" onClick={() => alert("추가")}>
              등록
            </Button>
          </>
        }
      ></TheHeader>
      <article className="flex flex-col gap-5">
        <div>수강생 목록</div>
        <div className="py-3 px-4 rounded-lg bg-green-950/50">
          <div className="relative max-w-xs">
            <label className="sr-only">Search</label>
            <input
              type="text"
              value={searchName}
              onChange={(e) => {
                setSearchName(e.currentTarget.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  fetchStudents();
                }
              }}
              name="hs-table-search"
              id="hs-table-search"
              className="py-1.5 sm:py-2 px-3 ps-9 block w-full rounded-lg sm:text-sm focus:z-10 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 disabled:opacity-50 disabled:pointer-events-none"
              placeholder="Search for items"
            />
            <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-3">
              <svg
                className="size-4 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </svg>
            </div>
          </div>
        </div>
        <div className="rounded-lg overflow-hidden">
          <div className="overflow-auto">
            <table className="min-w-full divide-y divide-[#ffffff1a]">
              <thead className="bg-green-950/70">
                <tr>
                  <th scope="col" className="py-3 ps-4 w-[10px]">
                    <div className="flex items-center h-5">
                      <input
                        id="hs-table-checkbox-all"
                        type="checkbox"
                        className="border-gray-200 rounded-sm text-red-400 focus:ring-blue-500"
                      />
                      <label className="sr-only">Checkbox</label>
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium uppercase"
                  >
                    이름
                  </th>

                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium  uppercase"
                  >
                    메모
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium w-1/6 uppercase"
                  >
                    등록일
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-medium w-1/10 uppercase"
                  >
                    상태
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#ffffff1a] bg-green-950/50">
                {students.map((student) => (
                  <tr key={student.id}>
                    <td className="py-3 ps-4">
                      <div className="flex items-center h-5">
                        <input
                          id="hs-table-search-checkbox-1"
                          type="checkbox"
                          className="border-gray-200 rounded-sm text-red-400 focus:ring-blue-500"
                        />
                        <label className="sr-only">Checkbox</label>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-start text-sm font-medium ">
                      {student.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-start text-sm ">
                      {student.memo}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-start text-sm ">
                      {dayjs(student.created_at).format(
                        "YYYY년 MM월 DD일 HH:mm:ss"
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                      {student.is_active ? (
                        <button
                          type="button"
                          className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-yellow-400 hover:text-yellow-800 focus:outline-hidden focus:text-yellow-800 disabled:opacity-50 disabled:pointer-events-none"
                        >
                          활성
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-red-400 hover:text-red-800 focus:outline-hidden focus:text-red-800 disabled:opacity-50 disabled:pointer-events-none"
                        >
                          비활성
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </article>
    </>
  );
};

export default StudentsPage;
