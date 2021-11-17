import { IconButton, Menu, MoreIcon, Popover, Position, Table, Tooltip, TrashIcon } from 'evergreen-ui';
import * as React from 'react';
import * as dateUtils from '../../../utils/date.utils';
import { useBalanceByRate } from '../_hooks/use-balance-by-rate.hook';
import { IInvestmentRecordProps } from './investment-record.props.interface';

const InvestmentRecordComponent = ({ record, setRecordToDelete, accountArchived }: IInvestmentRecordProps) => {
  const { convertedBalance, rate } = useBalanceByRate(record.balance, record.date, record.investmentCurrency);

  return (
    <Table.Row isSelectable>
      <Table.TextCell>{dateUtils.formatDateFull(record.date)}</Table.TextCell>
      {record.investmentCurrency !== 'CAD' && (
        <Table.TextCell isNumber textAlign='right'>
          {rate}
        </Table.TextCell>
      )}
      <Table.TextCell isNumber textAlign='right'>
        {record.investmentCurrency !== 'CAD' && `${record.investmentCurrency} `}
        {record.balance?.toFixed(2) || ''}
      </Table.TextCell>
      {record.investmentCurrency !== 'CAD' && (
        <Table.TextCell isNumber textAlign='right'>
          {convertedBalance?.toFixed(2)}
        </Table.TextCell>
      )}
      {!accountArchived && (
        <Table.Cell flex='none' justifyContent='flex-end' width={54}>
          <Popover
            position={Position.BOTTOM_RIGHT}
            content={({ close }) => (
              <Menu>
                <Menu.Group>
                  <Menu.Item
                    icon={TrashIcon}
                    intent='danger'
                    onSelect={() => {
                      setRecordToDelete(record);
                      close();
                    }}
                  >
                    Delete Balance
                  </Menu.Item>
                </Menu.Group>
              </Menu>
            )}
          >
            <Tooltip content='Options'>
              <IconButton icon={MoreIcon} appearance='minimal' />
            </Tooltip>
          </Popover>
        </Table.Cell>
      )}
    </Table.Row>
  );
};

export const InvestmentRecord = React.memo(InvestmentRecordComponent);
