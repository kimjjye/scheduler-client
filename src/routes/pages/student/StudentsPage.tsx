import { TheButton } from "@/components/TheButton";
import TheHeader from "@/components/TheHeader";
import supabase from "@/utils/supabase";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import StudentFormModal from "./StudentFormModal";
import { Plus } from "lucide-react";
import SearchForm from "@/components/SearchForm";
export interface Student {
  id: string;
  name: string;
  memo: string;
  email: string;
  is_active: boolean;
  created_at: Date;
}

const StudentsPage = () => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [students, setStudents] = useState<Student[]>([]);
  const [searchName, setSearchName] = useState<string>("");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const fetchStudents = async () => {
    try {
      let query = supabase
        .from("students")
        .select("id, name, memo, email, is_active, created_at");
      if (searchName) {
        query = query.ilike("name", `%${searchName}%`);
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
            <TheButton
              variant="primary"
              size="md"
              onClick={() => {
                setSelectedStudent(null);
                setModalOpen(true);
              }}
            >
              <Plus className="transition duration-200 transform hover:rotate-90 hover:scale-110" />
              <span>Add</span>
            </TheButton>
          </>
        }
      />
      <article className="flex flex-col gap-5">
        <SearchForm
          searchKeyword={searchName}
          setSearchKeyword={setSearchName}
          onSearch={fetchStudents}
          placeholder="Search students..."
        />
        {/* #TO-DO 그리드 컴포넌트화 */}
        <div className="rounded-lg overflow-hidden bg-gray-500/8">
          <div className="overflow-auto">
            <table className="w-full table-fixed divide-y divide-white/90">
              <thead className="bg-indigo-900/30">
                <tr>
                  <th
                    scope="col"
                    className="p-3 pl-6 text-start text-xs font-semibold w-2/10 uppercase truncate"
                  >
                    Name
                  </th>

                  <th
                    scope="col"
                    className="p-3 text-start text-xs font-semibold w-5/10 uppercase truncate"
                  >
                    comments
                  </th>
                  <th
                    scope="col"
                    className="p-3 text-start text-xs w-2/10 font-semibold uppercase truncate"
                  >
                    created at
                  </th>
                  <th
                    scope="col"
                    className="p-3 pr-6 text-start text-xs font-semibold w-fit uppercase"
                  >
                    status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/50">
                {students.map((student) => (
                  <tr
                    key={student.id}
                    className="cursor-pointer hover:bg-gray-500/8"
                    onClick={() => {
                      setSelectedStudent(student);
                      setModalOpen(true);
                    }}
                  >
                    <td className="p-3 pl-6 text-start text-sm font-medium truncate">
                      {student.name}
                    </td>
                    <td className="p-3 text-start text-sm truncate">
                      {student.memo}
                    </td>
                    <td className="p-3 text-start text-sm truncate">
                      {dayjs(student.created_at).format("YYYY-MM-DD HH:mm:ss")}
                    </td>
                    <td className="p-3 pr-6 text-start text-sm font-medium">
                      {student.is_active ? (
                        <span className="inline-flex items-center gap-2 text-emerald-500">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                          Active
                        </span>
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
        <StudentFormModal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          initialData={selectedStudent}
        />
      </article>
    </>
  );
};

export default StudentsPage;
