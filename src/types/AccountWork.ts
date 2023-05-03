import { Account } from './User';
import { Work } from './Work';

export enum WorkInitiator {
  Worker = 'Worker',
  Employer = 'Employer',
}

export enum WorkStatus {
  Proposed = 'Proposed',
  Rejected = 'Rejected',
  Approved = 'Approved',
  Performed = 'Performed',
  Cancelled = 'Cancelled',
}

export type AccountWork = {
  accountId: number;
  workId: number;
  payment: number;
  initiator: WorkInitiator;
  status: WorkStatus;
  account: Account;
  work: Work;
}