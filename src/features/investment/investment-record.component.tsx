import { IconButton, Menu, MoreIcon, Popover, Position, Table, Tooltip, TrashIcon } from 'evergreen-ui';
import React from 'react';
import { InvestmentRecord as InvestmentRecordType } from '../../models/investment-record.type';
import * as dateUtils from '../../utils/date.utils';
import { useBalanceByRate } from './_hooks/use-balance-by-rate.hook';

type InvestmentRecordProps = {
    /**
     * The investment record.
     */
    record: InvestmentRecordType;

    /**
     * UseState setter for the record to delete.
     */
    setRecordToDelete: React.Dispatch<React.SetStateAction<InvestmentRecordType>>;

    /**
     * True if the account is archived; false otherwise.
     */
    accountArchived: boolean;
};

const InvestmentRecordComponent = ({ record, setRecordToDelete, accountArchived }: InvestmentRecordProps) => {
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
