import Modal from "@/components/Modal";
import supabase from "@/utils/supabase";
import { useEffect, useState } from "react";
import { type Student } from "./StudentsPage";

interface StudentFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: Student | null;
}

const StudentFormModal = ({
  isOpen,
  onClose,
  initialData = null,
}: StudentFormModalProps) => {
  const isEditing = Boolean(initialData);
  const title = isEditing ? "Edit Student" : "Add Student";

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [memo, setMemo] = useState<string>("");
  const [nameError, setNameError] = useState<string>("");

  useEffect(() => {
    if (!isOpen) return;
    if (initialData) {
      setName(initialData.name);
      setEmail(initialData.email);
      setMemo(initialData.memo);
      setNameError("");
    } else {
      setName("");
      setEmail("");
      setMemo("");
      setNameError("");
    }
  }, [initialData, isOpen]);

  const validateForm = (): boolean => {
    if (!name.trim()) {
      setNameError("Name is required");
      document.getElementById("name")?.focus();
      return false;
    }
    return true;
  };

  const saveStudent = async (): Promise<boolean> => {
    try {
      if (isEditing && initialData?.id) {
        const { error } = await supabase
          .from("students")
          .update({ name, email, memo })
          .eq("id", initialData.id)
          .select();
        if (error) {
          console.error("Update error:", error);
          return false;
        }
      } else {
        const { error } = await supabase
          .from("students")
          .insert([{ name, email, memo }])
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
    const success = await saveStudent();
    if (success) {
      alert(isEditing ? "업데이트 되었습니당" : "추가되었습니당"); //#TO-DO 메시지 노출 방법 고민.. toast..
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
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        setNameError("");
                      }}
                      name="name"
                      placeholder="ji hye, Kim"
                      required
                      className="block min-w-0 grow bg-transparent py-1.5 pr-3 pl-1 text-base placeholder:text-gray-500 focus:outline-none sm:text-sm/6"
                    />
                  </div>
                </div>
                {nameError && (
                  <p className="mt-1 text-xs text-red-500">{nameError}</p>
                )}
              </div>
              <div className="sm:col-span-4">
                <label htmlFor="email" className="block text-sm/6 font-medium ">
                  Email
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    autoComplete="email"
                    className="block w-full rounded-md bg-indigo-900/5 px-3 py-1.5 text-base  outline-1 -outline-offset-1 outline-indigo-800/30 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                  />
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
            </div>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default StudentFormModal;
