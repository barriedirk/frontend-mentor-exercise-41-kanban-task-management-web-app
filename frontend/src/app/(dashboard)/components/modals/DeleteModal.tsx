"use client";

import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";

interface DeleteBoardModalProps {
  open: boolean;
  title: string;
  text: React.ReactNode;
  loading?: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function DeleteModal({
  open,
  title,
  text,
  loading = false,
  onCancel,
  onConfirm,
}: DeleteBoardModalProps) {
  return (
    <Modal
      open={open}
      title={title}
      titleClassName="text-red"
      onClose={onCancel}
    >
      <p className="text-body-l text-medium-grey my-6">{text}</p>

      <div className="flex gap-4">
        <Button
          variant="destructive"
          className="flex-1"
          size="small"
          disabled={loading}
          onClick={onConfirm}
        >
          {loading ? "Deleting..." : "Delete"}
        </Button>

        <Button
          variant="secondary"
          size="small"
          className="flex-1"
          disabled={loading}
          onClick={onCancel}
        >
          Cancel
        </Button>
      </div>
    </Modal>
  );
}
