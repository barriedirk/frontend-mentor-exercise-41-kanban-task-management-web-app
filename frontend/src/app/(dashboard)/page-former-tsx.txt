import Board from "./components/Board";
import BoardHeader from "./components/BoardHeader";
import BoardMenu from "./components/BoardMenu";
import BoardColumns from "./components/BoardColumns";

export default function DashboardRoute() {
  return (
    <Board>
      <BoardHeader />
      <BoardMenu />
      <BoardColumns />
    </Board>
  );
}
