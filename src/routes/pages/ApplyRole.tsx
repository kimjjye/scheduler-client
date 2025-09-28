import { TheButton } from "@/components/TheButton";
import TheHeader from "@/components/TheHeader";
import useAuthStore from "@/store/auth";
import supabase from "@/utils/supabase";
import { useState } from "react";

const ApplyRole = () => {
  const user_id = useAuthStore((state) => state.userId);
  const [introduction, setIntroduction] = useState("");

  const applyInstructorRole = async () => {
    const { error } = await supabase
      .from("instructor_request")
      .insert([{ user_id, introduction }]);
    if (error) {
      console.error("Insert error:", error);
      return false;
    }
  };

  return (
    <>
      <TheHeader title="권한 신청"></TheHeader>
      <article>
        <input
          value={introduction}
          onChange={(e) => setIntroduction(e.currentTarget.value)}
        />
        <TheButton
          variant="primary"
          size="md"
          onClick={() => applyInstructorRole()}
        >
          <span>강사 권한 신청하기</span>
        </TheButton>
      </article>
    </>
  );
};

export default ApplyRole;
