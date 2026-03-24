import Board from "./components/Board";
import BoardHeader from "./components/BoardHeader";
import BoardMenu from "./components/BoardMenu";
import BoardColumns from "./components/BoardColumns";
import BoardDataInitializer from "./components/BoardDataInitializer";
import { getBoards } from "@/features/board/services/board.service";
import { mapStrapiToBoards } from "@/features/board/mappers/board.mapper";

export default async function DashboardRoute() {
  const rawBoards = await getBoards();
  const boards = mapStrapiToBoards(rawBoards);

  return (
    <>
      <BoardDataInitializer boards={boards} />

      <Board>
        <BoardHeader />
        <BoardMenu />
        <BoardColumns />
      </Board>
    </>
  );
}
