import ResetPasswordForm from "@/features/auth/components/ResetPasswordForm";

const ResetPasswordPage = () => {
  return (
    <div className="w-full bg-transparent border-0">
      <div className="p-4">{<ResetPasswordForm />}</div>
    </div>
  );
};

export default ResetPasswordPage;
