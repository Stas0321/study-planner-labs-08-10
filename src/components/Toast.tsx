import "./Toast.scss";
export function Toast({
  message,
  undo,
}: {
  message: string;
  undo?: () => void;
}) {
  if (!message) return null;
  return (
    <aside className="toast" role="status">
      <span>{message}</span>
      {undo && (
        <>
          <button onClick={undo}>Скасувати</button>
          <div className="toast__progress" />
        </>
      )}
    </aside>
  );
}
