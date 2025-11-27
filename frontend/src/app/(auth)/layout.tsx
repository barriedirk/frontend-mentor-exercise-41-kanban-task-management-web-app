import Logo from "@/components/kanban/Logo";
import SwitchTheme from "@/components/kanban/SwitchTheme";

export default function AuthLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <div className="flex flex-row justify-between mb-12 w-[370px]">
        <Logo />
        <SwitchTheme />
      </div>
      {children}
    </div>
  );
}
