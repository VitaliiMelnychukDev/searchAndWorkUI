import { Work } from '../../types/Work';
import {
  DescriptionBlock,
  DescriptionText,
  DetailsText,
  IconWrapper,
  WorkContainer,
  WorkDetailItem,
  WorkDetailsContainer
} from './styled';
import Typography from '@mui/material/Typography';
import PaymentsIcon from '@mui/icons-material/Payments';
import BadgeIcon from '@mui/icons-material/Badge';
import PlaceIcon from '@mui/icons-material/Place';
import BusinessIcon from '@mui/icons-material/Business';
import MailIcon from '@mui/icons-material/Mail';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import React from 'react';

type Props = {
  work: Work,
  showDescription?: boolean;
}

export const WorkPanel = ({work, showDescription = false}: Props): JSX.Element => {
  return (
    <WorkContainer>
      <Typography variant="h5">{work.title}</Typography>
      <WorkDetailsContainer>
        <WorkDetailItem>
          <IconWrapper><PaymentsIcon /></IconWrapper>
          <DetailsText>{work.payment}</DetailsText>
        </WorkDetailItem>
        <WorkDetailItem>
          <IconWrapper><BadgeIcon /></IconWrapper>
          <DetailsText>{work.category.title}</DetailsText>
        </WorkDetailItem>
        <WorkDetailItem>
          <IconWrapper><PlaceIcon /></IconWrapper>
          <DetailsText>{work.city.title}</DetailsText>
        </WorkDetailItem>
        <WorkDetailItem>
          <IconWrapper><BusinessIcon /></IconWrapper>
          <DetailsText>{work.company.title}</DetailsText>
        </WorkDetailItem>
        <WorkDetailItem>
          <IconWrapper><MailIcon /></IconWrapper>
          <DetailsText>{work.email}</DetailsText>
        </WorkDetailItem>
        {work.phone && <WorkDetailItem>
          <IconWrapper><PhoneAndroidIcon /></IconWrapper>
          <DetailsText>{work.phone}</DetailsText>
        </WorkDetailItem>}
      </WorkDetailsContainer>
      {showDescription && (
        <DescriptionBlock>
          <Typography variant="h5">Work description</Typography>
          <DescriptionText>{work.description}</DescriptionText>
        </DescriptionBlock>
      )}
    </WorkContainer>
  );
}