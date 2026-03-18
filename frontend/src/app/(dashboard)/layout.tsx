import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function DashboardLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  // const cookiesGetAll = (await cookies()).getAll(); // @todo, remove
  const isLoggedIn = cookieStore.get("auth_token");

  if (!isLoggedIn) {
    redirect("/signin");
  }

  return <div className="flex justify-center">{children}</div>;
}
