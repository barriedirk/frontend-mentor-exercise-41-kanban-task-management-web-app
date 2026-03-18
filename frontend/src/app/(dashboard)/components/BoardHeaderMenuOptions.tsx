import { logoutAction } from "@/features/auth/actions/logout";
import { toast } from "sonner";

interface Props {
  onEdit: () => void;
  onDelete: () => void;
  onClose: () => void;
}

export function BoardHeaderMenuOptions({ onEdit, onDelete, onClose }: Props) {
  return (
    <div className="fixed inset-0 z-40 bg-black/50" onClick={onClose}>
      <div
        className="absolute right-4 top-18 bg-white rounded-md shadow-lg py-2"
        onClick={(e) => e.stopPropagation()}
      >
        <ul
          className="min-w-40 py-2 p-3 flex flex-col gap-2 text-dark-grey"
          role="menu"
        >
          <li>
            <button className="text-preset-3" onClick={onEdit}>
              Edit board
            </button>
          </li>
          <li>
            <button className="text-preset-3" onClick={onDelete}>
              Delete board
            </button>
          </li>
          <li>
            <hr className="text-main-purple my-3 h-0.5" />
          </li>
          <li>
            <button
              className="text-preset-3 text-red hover:font-bold"
              onClick={async () => {
                toast.loading("Closing session...");
                await logoutAction();
              }}
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
