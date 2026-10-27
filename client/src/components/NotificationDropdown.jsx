import { useNotifications } from "../context/NotificationContext.jsx";
import NotificationItem from "./NotificationItem.jsx";

export default function NotificationDropdown({ onClose }) {
  const { state, dispatch } = useNotifications();
  return (
    <section className="dropdown" role="dialog" aria-label="Notifications">
      <header className="dropdown-header">
        <span>Notifications</span>
        <button type="button" onClick={() => dispatch({ type: "MARK_ALL_READ" })} disabled={state.unreadCount === 0}>
          Mark all as read
        </button>
      </header>
      <div style={{ maxHeight: 360, overflowY: "auto" }}>
        {state.notifications.length === 0 ? (
          <p style={{ padding: "1rem", color: "#64748b", fontSize: ".875rem" }}>You're all caught up.</p>
        ) : state.notifications.map((notification) => (
          <NotificationItem key={notification.id} notification={notification} onClose={onClose} />
        ))}
      </div>
    </section>
  );
}