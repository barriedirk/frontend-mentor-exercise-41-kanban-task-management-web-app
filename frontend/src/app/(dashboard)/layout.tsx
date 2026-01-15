import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function DashboardLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  const isLoggedIn = (await cookies()).get("token");
  const cookiesGetAll = (await cookies()).getAll();

  console.log("cookiesGetAll", cookiesGetAll);

  // if (!isLoggedIn) {
  //   redirect("/signin");
  // }

  return <div>{children}</div>;
}
