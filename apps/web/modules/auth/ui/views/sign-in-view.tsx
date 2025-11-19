"use client";
import { SignIn } from "@clerk/nextjs";

export const SignInView = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* 💡 THÊM mx-auto để căn giữa div có giới hạn chiều rộng. */}
      <div className="animate-float max-w-md w-full mx-auto">
        <SignIn
          routing="hash"
          appearance={{
            layout: {
              socialButtonsVariant: "blockButton",
            },
            elements: {
              footer: { display: "none" }, // Hide footer
            },
          }}
        />
      </div>

      {/* Tailwind animation (Giữ nguyên) */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};
