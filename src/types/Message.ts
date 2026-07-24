export interface Message {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'unread' | 'read' | 'replied' | 'archived' | 'spam';
  reply?: string;
  repliedAt?: string;
  ip?: string;
  createdAt: string;
  updatedAt: string;
}
