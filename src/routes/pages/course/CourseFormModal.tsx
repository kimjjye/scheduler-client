import Modal from "@/components/Modal";
import supabase from "@/utils/supabase";
import { useEffect, useState } from "react";
import { type Course } from "./CoursesPage";

interface CourseFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: Course | null;
}

const CourseFormModal = ({
  isOpen,
  onClose,
  initialData = null,
}: CourseFormModalProps) => {
  const isEditing = Boolean(initialData);
  const title = isEditing ? "Edit Course" : "Add Course";

  const [courseName, setCourseName] = useState<string>("");
  const [level, setLevel] = useState<string>("");
  const [memo, setMemo] = useState<string>("");
  const [isAvailable, setIsAvailable] = useState<boolean>(true);
  const [nameError, setNameError] = useState<string>("");

  useEffect(() => {
    if (!isOpen) return;
    if (initialData) {
      setCourseName(initialData.course_name);
      setLevel(initialData.level);
      setIsAvailable(initialData.is_available);
      setMemo(initialData.memo);
      setNameError("");
    } else {
      setCourseName("");
      setLevel("");
      setIsAvailable(true);
      setMemo("");
      setNameError("");
    }
  }, [initialData, isOpen]);

  const validateForm = (): boolean => {
    if (!courseName.trim()) {
      setNameError("CourseName is required");
      document.getElementById("name")?.focus();
      return false;
    }
    return true;
  };

  const saveCourse = async (): Promise<boolean> => {
    try {
      if (isEditing && initialData?.id) {
        const { error } = await supabase
          .from("course")
          .update({
            course_name: courseName,
            level,
            memo,
            is_available: isAvailable,
          })
          .eq("id", initialData.id)
          .select();
        if (error) {
          console.error("Update error:", error);
          return false;
        }
      } else {
        const { error } = await supabase
          .from("course")
          .insert([
            { course_name: courseName, level, memo, is_available: isAvailable },
          ])
          .select();
        if (error) {
          console.error("Insert error:", error);
          return false;
        }
      }
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    const success = await saveCourse();
    if (success) {
      alert(isEditing ? "업데이트 되었습니당" : "추가되었습니당");
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      actions={[
        {
          label: "Save",
          onClick: handleSubmit,
          variant: "primary",
        },
      ]}
      title={title}
    >
      <form>
        <div className="space-y-12">
          <div className="border-b border-white/10">
            <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="username"
                  className="block text-sm/6 font-medium "
                >
                  Name <span className="text-red-500">*</span>
                </label>
                <div className="mt-2">
                  <div className="flex items-center rounded-md bg-indigo-900/5 pl-3 outline-1 -outline-offset-1 outline-indigo-800/30 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-500">
                    <input
                      id="name"
                      type="text"
                      value={courseName}
                      onChange={(e) => {
                        setCourseName(e.target.value);
                        setNameError("");
                      }}
                      name="name"
                      placeholder="과정명을 입력해주세요"
                      required
                      className="block min-w-0 grow bg-transparent py-1.5 pr-3 pl-1 text-base placeholder:text-gray-500 focus:outline-none sm:text-sm/6"
                    />
                  </div>
                </div>
                {nameError && (
                  <p className="mt-1 text-xs text-red-500">{nameError}</p>
                )}
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="country"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Level
                </label>
                <div className="mt-2 grid grid-cols-1">
                  <select
                    id="level"
                    name="level"
                    autoComplete="level-name"
                    className="col-start-1 row-start-1 w-full bg-indigo-900/5 appearance-none rounded-md py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-indigo-800/30 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                    onChange={(e) => setLevel(e.target.value)}
                    value={level}
                  >
                    <option value="">선택</option>
                    <option>baisic</option>
                    <option>advenced</option>
                  </select>
                  <svg
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    data-slot="icon"
                    aria-hidden="true"
                    className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                  >
                    <path
                      d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z"
                      clip-rule="evenodd"
                      fill-rule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              <div className="col-span-full">
                <label htmlFor="memo" className="block text-sm/6 font-medium ">
                  Memo
                </label>
                <div className="mt-2">
                  <textarea
                    id="memo"
                    name="memo"
                    value={memo}
                    onChange={(e) => {
                      setMemo(e.target.value);
                    }}
                    rows={3}
                    className="block w-full rounded-md bg-indigo-900/5 px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-indigo-800/30 placeholder:text-indigo-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                  ></textarea>
                </div>
              </div>
              <div className="col-span-full">
                <div className="mt-2">
                  <label
                    htmlFor="isAvailable"
                    className="block text-sm/6 font-medium inline-block pl-[0.15rem] hover:cursor-pointer"
                  >
                    available
                  </label>
                  <input
                    className="p-[0.125rem] h-[1.25rem] w-[2.375rem] appearance-none rounded-[0.6375rem] bg-neutral-300 after:absolute after:z-[2] after:h-[1rem] after:w-[1rem] after:rounded-full after:border-none after:bg-neutral-100 transition-color duration-200 after:transition-transform after:duration-200 after:content-[''] checked:bg-indigo-500 checked:after:z-[2]  checked:after:translate-x-[1.125rem] hover:cursor-pointer"
                    type="checkbox"
                    role="switch"
                    id="isAvailable"
                    checked={isAvailable}
                    onChange={() => setIsAvailable((prev) => !prev)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default CourseFormModal;
