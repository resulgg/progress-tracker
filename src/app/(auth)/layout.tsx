export const metadata = {
  title: "Authentication - Progress Tracker",
  description:
    "Authentication pages for Progress Tracker. Login, register, or reset your password.",
};

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center px-4">
      {children}
    </div>
  );
};

export default AuthLayout;
