import ForgotPasswordForm from "@/features/auth/components/ForgotPasswordForm";

const SigninPage = () => {
  return (
    <div className="w-full bg-transparent border-0">
      <div className="p-4">{<ForgotPasswordForm />}</div>
    </div>
  );
};

export default SigninPage;
