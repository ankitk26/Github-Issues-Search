export type Issue = {
  url: string;
  repository_url: string;
  id: number;
  number: number;
  title: string;
  user: User;
  labels: Label[];
  state: string;
  assignee: User | null;
  assignees: User[];
  comments: number;
  created_at: string;
  updated_at: string;
  closed_at: Date | null;
};

export type User = {
  login: string;
  id: number;
  avatar_url: string;
  type: string;
};

export type Label = {
  id: number;
  name: string;
  color: string;
};

export type SearchParams = {
  [key: string]: string;
};
