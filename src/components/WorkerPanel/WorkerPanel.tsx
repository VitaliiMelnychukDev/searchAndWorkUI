import { Worker } from '../../types/Work';
import {
  BlockButton,
  DescriptionBlock,
  DescriptionText,
  DetailsText,
  IconWrapper,
  PanelContainer,
  PanelDetailItem,
  PanelDetailsContainer
} from '../sharedStyles/panel';
import Typography from '@mui/material/Typography';
import BadgeIcon from '@mui/icons-material/Badge';
import PlaceIcon from '@mui/icons-material/Place';
import MailIcon from '@mui/icons-material/Mail';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import React from 'react';
import { Alert, Button } from '@mui/material';
import { useSuggestWork } from './hooks/useSuggestWork';

type Props = {
  worker: Worker,
  showDescription?: boolean;

  showTimes?: boolean;
  enableSuggestWorkLogic?: boolean;
  workId: number;
}

export const WorkerPanel = ({worker, showTimes = true, showDescription = false, enableSuggestWorkLogic = false, workId}: Props): JSX.Element => {
  const { suggest, suggested, sending, error } = useSuggestWork();
  const suggestWork = (workerId: number): void => {
    suggest(workId, workerId);
  }

  return (
    <PanelContainer>
      <Typography variant="h5">{worker.name}</Typography>
      <PanelDetailsContainer>
        <PanelDetailItem>
          <IconWrapper><BadgeIcon /></IconWrapper>
          <DetailsText>{worker.categoryName}</DetailsText>
        </PanelDetailItem>
        <PanelDetailItem>
          <IconWrapper><PlaceIcon /></IconWrapper>
          <DetailsText>{worker.cityName}</DetailsText>
        </PanelDetailItem>
        {showTimes && (
          <>
            <PanelDetailItem>
              <IconWrapper><AccessTimeIcon /></IconWrapper>
              <DetailsText>{new Date(Number(worker.startTime)).toLocaleString()}</DetailsText>
            </PanelDetailItem>
            <PanelDetailItem>
              <IconWrapper><AccessTimeFilledIcon /></IconWrapper>
              <DetailsText>{new Date(Number(worker.endTime)).toLocaleString()}</DetailsText>
            </PanelDetailItem>
          </>
        )}
        <PanelDetailItem>
          <IconWrapper><MailIcon /></IconWrapper>
          <DetailsText>{worker.email}</DetailsText>
        </PanelDetailItem>
        {worker.phone && <PanelDetailItem>
          <IconWrapper><PhoneAndroidIcon /></IconWrapper>
          <DetailsText>{worker.phone}</DetailsText>
        </PanelDetailItem>}
      </PanelDetailsContainer>
      {showDescription && (
        <DescriptionBlock>
          <Typography variant="h5">Experience</Typography>
          <DescriptionText>{worker.categoryDescription}</DescriptionText>
        </DescriptionBlock>
      )}
      {enableSuggestWorkLogic && (
        <>
          {error && <Alert severity="error">{error}</Alert>}
          {suggested && <Alert severity="success">Suggestion successfully sent!</Alert>}
          {!error && !suggested && (
            <BlockButton>
              <Button onClick={() => suggestWork(worker.id)} disabled={sending} variant="outlined" size="large" type="submit">
                Suggest Work
              </Button>
            </BlockButton>
          )}
        </>
      )}
    </PanelContainer>
  );
}