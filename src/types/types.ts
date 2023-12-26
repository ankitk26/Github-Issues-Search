export type Issue = {
  url: string;
  repositoryURL: string;
  labelsURL: string;
  commentsURL: string;
  eventsURL: string;
  htmlURL: string;
  id: number;
  nodeID: string;
  number: number;
  title: string;
  user: User;
  labels: Label[];
  state: string;
  locked: boolean;
  assignee: User | null;
  assignees: User[];
  milestone: Milestone | null;
  comments: number;
  createdAt: Date;
  updatedAt: Date;
  closedAt: null;
  authorAssociation: string;
  activeLockReason: null;
  draft?: boolean;
  pullRequest?: PullRequest;
  body: null | string;
  reactions: Reactions;
  timelineURL: string;
  performedViaGithubApp: null;
  stateReason: null;
  score: number;
};

export type User = {
  login: string;
  id: number;
  nodeID: string;
  avatarURL: string;
  gravatarID: string;
  url: string;
  htmlURL: string;
  followersURL: string;
  followingURL: string;
  gistsURL: string;
  starredURL: string;
  subscriptionsURL: string;
  organizationsURL: string;
  reposURL: string;
  eventsURL: string;
  receivedEventsURL: string;
  type: Type;
  siteAdmin: boolean;
};

export type Type = "User";

export type Label = {
  id: number;
  nodeID: string;
  url: string;
  name: string;
  color: string;
  default: boolean;
  description: string;
};

export type Milestone = {
  url: string;
  htmlURL: string;
  labelsURL: string;
  id: number;
  nodeID: string;
  number: number;
  title: string;
  description: string;
  creator: User;
  openIssues: number;
  closedIssues: number;
  state: string;
  createdAt: Date;
  updatedAt: Date;
  dueOn: null;
  closedAt: null;
};

export type PullRequest = {
  url: string;
  htmlURL: string;
  diffURL: string;
  patchURL: string;
  mergedAt: Date | null;
};

export type Reactions = {
  url: string;
  totalCount: number;
  the1: number;
  reactions1: number;
  laugh: number;
  hooray: number;
  confused: number;
  heart: number;
  rocket: number;
  eyes: number;
};
