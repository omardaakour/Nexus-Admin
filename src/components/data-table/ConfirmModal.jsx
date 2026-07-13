import { X } from "lucide-react";

function ConfirmModal({ open, title, message, onConfirm, onCancel, loading }) {
  if (!open) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 99999,
      }}
    >
      <div
        style={{
          background: "white",
          width: "400px",
          padding: "25px",
          borderRadius: "10px",
        }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">{title}</h2>
        </div>

        <p className="text-gray-600 mb-6">{message}</p>

        <div className="flex justify-end gap-3">
          <button onClick={onCancel} className="border rounded px-4 py-2">
            Cancel
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className="bg-red-600 text-white rounded px-4 py-2"
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
