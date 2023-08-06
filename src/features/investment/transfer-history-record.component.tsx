import { ManuallyEnteredDataIcon, Pane, Table, Tooltip } from 'evergreen-ui';
import React from 'react';
import { Account } from '../../models/account.type';
import { IRecord } from '../../store/record/record.interface';
import * as dateUtils from '../../utils/date.utils';
import { createStaticWidthCell } from '../../utils/table.utils';

const w100 = createStaticWidthCell(100);
const w200 = createStaticWidthCell(200);

type TransferHistoryRecordProps = {
    /**
     * The record that was transfered to the investment account.
     */
    record: IRecord & {
        /**
         * The name of the account transfered from.
         */
        accountName: string;
    };

    /**
     * The investment account.
     */
    account: Account;
};

const TransferHistoryRecordComponent = ({ record, account }: TransferHistoryRecordProps) => {
    return (
        <Table.Row isSelectable>
            <Table.TextCell {...w200}>{dateUtils.formatDateFull(record.date)}</Table.TextCell>
            <Table.TextCell {...w200}>{record.accountName}</Table.TextCell>
            <Table.TextCell>
                <Pane display='flex' alignItems='center'>
                    {record.isManualEntry && (
                        <Tooltip content='Manually entered'>
                            <ManuallyEnteredDataIcon marginTop={3} marginRight={10} />
                        </Tooltip>
                    )}
                    <Pane>
                        <Pane>{record.description}</Pane>
                        {record?.details && (
                            <Tooltip content={record?.details}>
                                <Pane maxWidth={350} whiteSpace='nowrap' overflow='hidden' textOverflow='ellipsis'>
                                    {record?.details}
                                </Pane>
                            </Tooltip>
                        )}
                    </Pane>
                </Pane>
            </Table.TextCell>
            <Table.TextCell isNumber textAlign='right' {...w100}>
                {record.accountId === account.id ? record.debit?.toFixed(2) || '' : record.credit?.toFixed(2) || ''}
            </Table.TextCell>
            <Table.TextCell isNumber textAlign='right' {...w100}>
                {record.accountId === account.id ? record.credit?.toFixed(2) || '' : record.debit?.toFixed(2) || ''}
            </Table.TextCell>
        </Table.Row>
    );
};

export const TransferHistoryRecord = React.memo(TransferHistoryRecordComponent);
