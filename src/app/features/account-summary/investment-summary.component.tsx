import { Pane, Card, Heading, Text, IconButton, Icon, Tooltip, EyeOpenIcon, Badge } from 'evergreen-ui';
import React from 'react';
import { Link } from 'react-router-dom';
import { accountRoutes } from '../../utils/account.utils';
import { formatCurrency } from '../../utils/currency.utils';
import { formatDateFull } from '../../utils/date.utils';
import { isNullOrUndefined } from '../../utils/object.utils';
import { useInvestmentSummary } from './investment-summary.hook';

export type InvestmentSummaryProps = {
    /**
     * The ID of the account.
     */
    accountId: string;
};

export const InvestmentSummary = ({ accountId }: InvestmentSummaryProps) => {
    const { name, icon, accountType, latestDate, balance, isUpdateNeeded } = useInvestmentSummary(accountId);

    return (
        <Card
            elevation={1}
            minWidth={300}
            maxWidth={300}
            background='tint1'
            marginBottom={20}
            marginRight={20}
            padding={10}
            paddingBottom={5}
        >
            <Pane display='flex' flexDirection='column' height='100%' justifyContent='space-between'>
                <Pane display='flex' alignItems='center' marginBottom='16px'>
                    <Icon icon={icon} marginRight={5} color='default' />
                    <Heading>{name}</Heading>
                </Pane>
                {!isNullOrUndefined(balance) && (
                    <Pane data-testid='account-details'>
                        <Text fontSize='32px' fontWeight='bold' color={balance < 0 ? 'danger' : 'default'}>
                            {formatCurrency(balance)}
                        </Text>
                        <br />
                        <Text>{formatDateFull(latestDate)}</Text>
                    </Pane>
                )}
                {isNullOrUndefined(balance) && (
                    <Pane
                        data-testid='empty-account'
                        paddingX='10px'
                        paddingY='5px'
                        display='flex'
                        justifyContent='center'
                    >
                        <Text color='muted'>
                            Empty! Enter balances{' '}
                            <Text is={Link} to={`${accountRoutes[accountType]}/${accountId}`}>
                                here
                            </Text>
                            .
                        </Text>
                    </Pane>
                )}
                <Pane display='flex' justifyContent='space-between' alignItems='center'>
                    <Pane>{isUpdateNeeded && <Badge color='yellow'>Update needed</Badge>}</Pane>
                    <Pane>
                        <Tooltip content='Open Investment Account'>
                            <IconButton
                                appearance='minimal'
                                icon={EyeOpenIcon}
                                is={Link}
                                to={`/investment/${accountId}`}
                            />
                        </Tooltip>
                    </Pane>
                </Pane>
            </Pane>
        </Card>
    );
};
