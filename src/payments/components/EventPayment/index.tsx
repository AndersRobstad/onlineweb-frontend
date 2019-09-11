import React, { FC, useEffect, useState } from 'react';

import { md } from 'common/components/Markdown';
import { Page, Pane } from 'common/components/Panes';
import Spinner from 'common/components/Spinner';
import HttpError from 'core/components/errors/HttpError';

import { getAttendanceEvent } from 'events/api/events';
import { IPayment } from 'events/models/Event';
import { Payment } from './Payment';

interface IProps {
  eventId: number;
}

const ABOUT_EVENT_PAYMENT = md`
  # Arrangementsbetaling

  Velkommen til en beta-versjon av Onlines nye betalingsside! Dotkom minner om at de nye nettsidene til Online enda er under utvikling, og vi setter pris på all tilbakemelding du kan gi.
`;

export const EventPayment: FC<IProps> = ({ eventId }) => {
  const [attendanceEvent, setAttendanceEvent] = useState();

  const loadAttendanceEvent = async () => {
    const event = await getAttendanceEvent(eventId);
    setAttendanceEvent(event);
  };

  useEffect(() => {
    loadAttendanceEvent();
  }, []);

  if (!attendanceEvent) {
    return <Spinner />;
  }

  // Map both unattending and 404 to a 404 error page.
  if (!attendanceEvent.is_attendee) {
    return <HttpError code={404} />;
  }

  return (
    <Page>
      <Pane>{ABOUT_EVENT_PAYMENT}</Pane>

      {attendanceEvent.payments.map((payment: IPayment) => (
        <Payment eventId={eventId} payment={payment} key={payment.id} />
      ))}
    </Page>
  );
};
