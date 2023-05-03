import { useState } from 'react';
import searchAndWorkClient from '../../../clients/searchAndWork';
import { WorkStatus } from '../../../types/AccountWork';
import { ApiUrlHelper } from '../../../helpers/ApiUrlHelper';

export type AllowedStatuses = WorkStatus.Rejected | WorkStatus.Approved;

type UseSetWorkStatusProps = {
  changing: boolean;
  error: string;
  statusChanged?: AllowedStatuses;
  changeStatus: (workId: number, status: AllowedStatuses) => Promise<void>;
}
export const useSetWorkStatus = (): UseSetWorkStatusProps => {
  const [changing, setChanging] = useState(false);
  const [error, setError] = useState('');
  const [statusChanged, setStatusChanged] = useState<AllowedStatuses>();
  const changeStatus = async (workId: number, status: AllowedStatuses): Promise<void> => {
    setChanging(true);
    setError('');
    setStatusChanged(status);
    try {
      const apiUrl = status === WorkStatus.Approved ? ApiUrlHelper.getApproveWorkUrl(workId) : ApiUrlHelper.getRejectWorkUrl(workId);
      await searchAndWorkClient.patch(apiUrl);
      setChanging(false);
      setStatusChanged(status);
    } catch (e: any) {
      setChanging(false);
      setError(e.message)
    }
  }
  return {
    changing,
    error,
    statusChanged,
    changeStatus
  }
}