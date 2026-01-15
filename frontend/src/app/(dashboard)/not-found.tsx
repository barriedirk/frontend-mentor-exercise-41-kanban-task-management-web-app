import { notFound } from "next/navigation";

const getBoard = async (id: string) => {
  return Promise.reject();
};

export default async function BoardPage({
  params,
}: {
  params: { id: string };
}) {
  const board = await getBoard(params.id);

  if (!board) {
    notFound(); // 👈 shows 404 page
  }

  return <div>board Not Found</div>;
}
