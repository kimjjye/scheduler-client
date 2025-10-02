import { TheButton } from "@/components/TheButton";
import TheHeader from "@/components/TheHeader";
import supabase from "@/utils/supabase";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import CourseFormModal from "./CourseFormModal";
import { Plus } from "lucide-react";
import SearchForm from "@/components/SearchForm";
export interface Course {
  id: string;
  course_name: string;
  level: string;
  is_available: boolean;
  memo: string;
  created_at: Date;
}

const CoursesPage = () => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [courses, setCourses] = useState<Course[]>([]);
  const [searchName, setSearchName] = useState<string>("");
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const fetchCourses = async () => {
    try {
      let query = supabase
        .from("course")
        .select("id, course_name, level, is_available, memo, created_at");
      if (searchName) {
        query = query.ilike("course_name", `%${searchName}%`);
      }
      const { data, error } = await query;

      if (error) {
        alert("조회 실패");
        return;
      }
      setCourses(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <>
      <TheHeader
        title="강의 관리"
        actions={
          <>
            <TheButton
              variant="primary"
              size="md"
              onClick={() => {
                setSelectedCourse(null);
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
          onSearch={fetchCourses}
          placeholder="Search course..."
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
                    course
                  </th>
                  <th
                    scope="col"
                    className="p-3 text-start text-xs font-semibold w-1/10 uppercase truncate"
                  >
                    level
                  </th>
                  <th
                    scope="col"
                    className="p-3 text-start text-xs font-semibold w-4/10 uppercase truncate"
                  >
                    memo
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
                {courses.map((course) => (
                  <tr
                    key={course.id}
                    className="cursor-pointer hover:bg-gray-500/8"
                    onClick={() => {
                      setSelectedCourse(course);
                      setModalOpen(true);
                    }}
                  >
                    <td className="p-3 pl-6 text-start text-sm font-medium truncate">
                      {course.course_name}
                    </td>
                    <td className="p-3 text-start text-sm truncate">
                      {course.level}
                    </td>
                    <td className="p-3 text-start text-sm truncate">
                      {course.memo}
                    </td>
                    <td className="p-3 text-start text-sm truncate">
                      {dayjs(course.created_at).format("YYYY-MM-DD HH:mm:ss")}
                    </td>
                    <td className="p-3 pr-6 text-start text-sm font-medium">
                      {course.is_available ? (
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
        <CourseFormModal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          initialData={selectedCourse}
        />
      </article>
    </>
  );
};

export default CoursesPage;
