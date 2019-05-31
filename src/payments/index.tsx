import React, { FC } from 'react';

import { md } from 'common/components/Markdown';
import { Page, Pane } from 'common/components/Panes';

import { Transactions } from './components/Transactions';
import { CreateTransaction } from './components/Transactions/CreateTransaction';
import { Purchases } from './components/Transactions/Purchases';

const ABOUT_TRANSACTIONS = md`
  # Transaksjoner

  Transaksjoner er innskuddene du har gjort til saldo hos Online.
  Dette er pengene du kan bruke i kiosken (Nibble) på Onlinekontoret.
`;

export const Payments: FC = () => {
  return (
    <Page>
      <Pane>{ABOUT_TRANSACTIONS}</Pane>
      <CreateTransaction />
      <Transactions />
      <Purchases />
    </Page>
  );
};
