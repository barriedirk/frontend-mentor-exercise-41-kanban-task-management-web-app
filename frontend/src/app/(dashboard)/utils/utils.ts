import { TaskModel } from "@/features/board/types/task.types";
import { POSITION_STEP } from "@/lib/constants";

export function fractionalIndexingTask(
  listTask: TaskModel[],
  destinationIndex: number,
): number {
  let newPosition = 0;

  if (listTask.length === 0) {
    newPosition = POSITION_STEP;
  } else if (destinationIndex === 0) {
    const nextPosition = listTask[0].position ?? 0;

    newPosition = nextPosition / 2;
  } else if (destinationIndex >= listTask.length) {
    const lastPosition = listTask[listTask.length - 1].position ?? 0;

    newPosition = lastPosition + POSITION_STEP;
  } else {
    const prevPosition = listTask[destinationIndex - 1].position ?? 0;
    const nextPosition = listTask[destinationIndex].position ?? 0;

    newPosition = Math.round((prevPosition + nextPosition) / 2);

    if (Math.abs(prevPosition - nextPosition) <= 1) {
      // Aquí podrías disparar una re-indexación total de la columna si quieres ser 100% seguro
      console.warn(
        "Colisión de posiciones detectada, se recomienda re-indexar",
      );
    }
  }

  return newPosition;
}
