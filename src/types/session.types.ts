export interface ISession {
  refresh_token: string;
  expires_at: string;    // ISO дата у форматі рядка
  created_at: string;    // ISO дата у форматі рядка
  ip_address: string | null;
  isCurrent: boolean;
  last_activity: string | null;  // ISO дата або null
  user_agent: string | null;
}
