import React from 'react';
import './NotificationPanel.scss';

/**
 * Pelagos Notification Panel — panels/notifications
 * Props: notifications [{ id, title, message, time, read, variant }], onMarkRead, onClear
 * Design reference: /pages/panel-notifications.html
 */
export const NotificationPanel = ({ notifications = [], onMarkRead, onClear }) => (
  <div className="notif-panel">
    <div className="notif-panel__header">
      <span className="notif-panel__title">Notifications</span>
      {onClear && <button className="notif-panel__clear" onClick={onClear}>Clear all</button>}
    </div>
    <ul className="notif-panel__list">
      {notifications.length === 0
        ? <li className="notif-panel__empty">No notifications</li>
        : notifications.map(n => (
          <li key={n.id} className={['notif-item', n.read ? '' : 'notif-item--unread'].filter(Boolean).join(' ')}
            onClick={() => !n.read && onMarkRead?.(n.id)}>
            {!n.read && <span className="notif-item__dot" aria-label="Unread" />}
            <div className="notif-item__body">
              <p className="notif-item__title">{n.title}</p>
              {n.message && <p className="notif-item__message">{n.message}</p>}
              <p className="notif-item__time">{n.time}</p>
            </div>
          </li>
        ))}
    </ul>
  </div>
);
export default NotificationPanel;
