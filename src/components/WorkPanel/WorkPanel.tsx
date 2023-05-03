import { Work } from '../../types/Work';
import {
  BlockButton,
  BlocksIndent,
  DescriptionBlock,
  DescriptionText,
  DetailsText,
  IconWrapper,
  PanelContainer,
  PanelDetailItem,
  PanelDetailsContainer
} from '../sharedStyles/panel';
import Typography from '@mui/material/Typography';
import PaymentsIcon from '@mui/icons-material/Payments';
import BadgeIcon from '@mui/icons-material/Badge';
import PlaceIcon from '@mui/icons-material/Place';
import BusinessIcon from '@mui/icons-material/Business';
import MailIcon from '@mui/icons-material/Mail';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import React from 'react';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import { Alert, Button } from '@mui/material';
import { useSetWorkStatus } from './hooks/useSetWorkStatus';
import { WorkStatus } from '../../types/AccountWork';

type Props = {
  work: Work,
  showDescription?: boolean;
  enableSetWorkStatusLogic?: boolean;
}

export const WorkPanel = ({work, showDescription = false, enableSetWorkStatusLogic = false}: Props): JSX.Element => {
  const { changing, error, statusChanged, changeStatus } = useSetWorkStatus();

  const approveWork = () => {
    changeStatus(work.id, WorkStatus.Approved);
  }

  const rejectWork = () => {
    changeStatus(work.id, WorkStatus.Rejected);
  }

  return (
    <PanelContainer>
      <Typography variant="h5">{work.title}</Typography>
      <PanelDetailsContainer>
        <PanelDetailItem>
          <IconWrapper><PaymentsIcon /></IconWrapper>
          <DetailsText>{work.payment}</DetailsText>
        </PanelDetailItem>
        <PanelDetailItem>
          <IconWrapper><BadgeIcon /></IconWrapper>
          <DetailsText>{work.category.title}</DetailsText>
        </PanelDetailItem>
        <PanelDetailItem>
          <IconWrapper><PlaceIcon /></IconWrapper>
          <DetailsText>{work.city.title}</DetailsText>
        </PanelDetailItem>
        <PanelDetailItem>
          <IconWrapper><BusinessIcon /></IconWrapper>
          <DetailsText>{work.countWorkers}</DetailsText>
        </PanelDetailItem>
        <>
        <PanelDetailItem>
          <IconWrapper><AccessTimeIcon /></IconWrapper>
          <DetailsText>{new Date(Number(work.startTime)).toLocaleString()}</DetailsText>
        </PanelDetailItem>
        <PanelDetailItem>
          <IconWrapper><AccessTimeFilledIcon /></IconWrapper>
          <DetailsText>{new Date(Number(work.endTime)).toLocaleString()}</DetailsText>
        </PanelDetailItem>
        </>
        <PanelDetailItem>
          <IconWrapper><MailIcon /></IconWrapper>
          <DetailsText>{work.email}</DetailsText>
        </PanelDetailItem>
        {work.phone && <PanelDetailItem>
          <IconWrapper><PhoneAndroidIcon /></IconWrapper>
          <DetailsText>{work.phone}</DetailsText>
        </PanelDetailItem>}
      </PanelDetailsContainer>
      {showDescription && (
        <DescriptionBlock>
          <Typography variant="h5">Work description</Typography>
          <DescriptionText>{work.description}</DescriptionText>
        </DescriptionBlock>
      )}
      {enableSetWorkStatusLogic && (
        <>
          {error && <Alert severity="error">{error}</Alert>}
          {statusChanged && (
            <Alert severity="success">
              Work successfully {statusChanged === WorkStatus.Rejected ? 'rejected' : 'approved'}
            </Alert>)}
          {!error && !changing && !statusChanged && (
            <BlockButton>
              <Button onClick={() => approveWork()} disabled={changing} variant="outlined" size="large" type="submit">
                Approve Work
              </Button>
              <BlocksIndent />
              <Button onClick={() => rejectWork()} disabled={changing} variant="outlined" size="large" type="submit">
                Reject Work
              </Button>
            </BlockButton>
          )}
        </>
      )}
    </PanelContainer>
  );
}