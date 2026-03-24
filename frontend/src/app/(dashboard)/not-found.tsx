import { notFound } from "next/navigation";

const getBoard = async (id: string) => {
  return Promise.reject();
};

export default async function BoardPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params; 
  const id = params?.id;

  if (!id) return notFound();

  const board = await getBoard(id);
  
  if (!board) {
    notFound(); // 👈 shows 404 page
  }

  return <div>board Not Found</div>;
}