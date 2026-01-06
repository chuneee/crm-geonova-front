export interface NotificationPreferences {
  id: string;
  email_unread_assigned: boolean;
  email_opportunity_changes: boolean;
  email_quotes_approved: boolean;
  email_support_tickets: boolean;
  push_team_messages: boolean;
  push_overdue_tasks: boolean;
  push_scheduled_activities: boolean;
  reminder_meetings_minutes: number;
  reminder_tasks_days: number;
  dnd_enabled: boolean;
  dnd_start_time: string;
  dnd_end_time: string;
}
