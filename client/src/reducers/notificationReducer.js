export const initialState = { notifications: [], unreadCount: 0 };
export function notificationReducer(state, action) {
  switch (action.type) {
    case "ADD_NOTIFICATION": return state;
    case "MARK_READ": return state;
    case "MARK_ALL_READ": return state;
    case "LOAD_NOTIFICATIONS": return state;
    default: return state;
  }
}