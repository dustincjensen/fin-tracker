import { Pane, Button } from 'evergreen-ui';
import React from 'react';
import { DisplayableCalendarDate } from './displayable-calendar-date.type';

type CalendarDateProps = {
    /**
     * The date to render.
     */
    dateToRender: DisplayableCalendarDate;

    /**
     * True if the date to render is selected.
     */
    isSelected: boolean;

    /**
     * Set the date as the selected date.
     */
    setIsSelected: (date: string) => void;

    /**
     * If provided, renders a style on the calendar date button.
     */
    style?: Record<string, unknown>;

    /**
     * Tells the date picker to close when the calendar date is selected.
     */
    close: () => void;
};

const CalendarDateComponent = ({ dateToRender, isSelected, setIsSelected, style, close }: CalendarDateProps) => (
    <Pane>
        <Button
            appearance={isSelected ? 'primary' : 'minimal'}
            width='100%'
            height='100%'
            minWidth={0}
            padding={0}
            justifyContent='center'
            style={style}
            onClick={() => {
                setIsSelected(dateToRender.iso);
                close();
            }}
        >
            {dateToRender.date}
        </Button>
    </Pane>
);

export const CalendarDate: React.FC<CalendarDateProps> = React.memo(CalendarDateComponent);
