import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "../context/NotificationContext.jsx";
import apiClient from "../services/apiClient.js";

export default function NotificationItem({ notification, onClose }) {
  const { dispatch } = useNotifications();
  const queryClient = useQueryClient();

  const markRead = useMutation({
    mutationFn: (id) => apiClient.patch(`/api/notifications/${encodeURIComponent(id)}/read`),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["notifications"] });
      const previous = queryClient.getQueryData(["notifications"]);
      queryClient.setQueryData(["notifications"], (items = []) =>
        items.map((item) => item.id === id ? { ...item, isRead: true } : item)
      );
      dispatch({ type: "MARK_READ", payload: id });
      return { previous };
    },
    onError: async (_error, _id, context) => {
      if (context?.previous !== undefined) {
        queryClient.setQueryData(["notifications"], context.previous);
      }
      try {
        const response = await apiClient.get("/api/notifications");
        queryClient.setQueryData(["notifications"], response.data);
        dispatch({ type: "LOAD_NOTIFICATIONS", payload: response.data });
      } catch (refreshError) {
        console.error("[NotificationItem] refresh after mark-read failure:", refreshError);
      }
    },
    onSuccess: (response) => {
      queryClient.setQueryData(["notifications"], (items = []) =>
        items.map((item) => item.id === notification.id ? { ...item, ...response.data.notification, isRead: true } : item)
      );
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["notifications"] }),
  });

  function handleClick() {
    if (!notification.isRead) markRead.mutate(notification.id);
    onClose?.();
  }

  return (
    <button
      type="button"
      className={`notification-item ${notification.isRead ? "read" : "unread"}`}
      onClick={handleClick}
      aria-label={`${notification.isRead ? "Read" : "Unread"} notification: ${notification.message}`}
      style={{ display: "block", width: "100%", textAlign: "left", border: 0, font: "inherit" }}
    >
      <span>{notification.message}</span>
      {notification.createdAt && (
        <small style={{ display: "block", marginTop: ".35rem", fontSize: ".72rem", color: "#94a3b8" }}>
          {new Date(notification.createdAt).toLocaleString()}
        </small>
      )}
    </button>
  );
}