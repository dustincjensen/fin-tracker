import {
    Button,
    Heading,
    majorScale,
    Pane,
    TextInputField,
    FormFieldLabel,
    FormFieldDescription,
    Popover,
    GroupObjectsIcon,
    BanCircleIcon,
    FloppyDiskIcon,
} from 'evergreen-ui';
import React from 'react';
import { CirclePicker } from 'react-color';
import { Category } from '../../models/category.type';
import { newGuid } from '../../utils/guid.utils';

export type ModifyCategoryProps = {
    /**
     * The optional text for the header.
     */
    headerText?: string;

    /**
     * The text for the save button.
     */
    saveButtonText: string;

    /**
     * Action to save a category.
     */
    saveCategory: (category: Category) => void;

    /**
     * The existing category if available.
     */
    category?: Category;

    /**
     * A function when invoked will close the category section.
     */
    close: () => void;
};

export const ModifyCategory = ({ close, saveCategory, saveButtonText, headerText, category }: ModifyCategoryProps) => {
    const [name, setName] = React.useState<string>(category?.name || '');
    const [color, setColor] = React.useState<string>(category?.color || '');

    const handleNameChange = evt => setName(evt.target.value);
    const handleColorChange = color => setColor(color.hex);

    const handleSubmit = evt => {
        evt.preventDefault();

        const updatedCategory: Category = {
            id: category?.id || newGuid(),
            accountTransferId: category?.accountTransferId,
            name,
            color,
        };

        saveCategory(updatedCategory);
        close();
    };

    return (
        <Pane padding={20} background='tint1' border={!category} borderRadius={!category ? 5 : 0}>
            {headerText && (
                <Pane borderBottom display='flex' alignItems='center' marginBottom={20} paddingBottom={10}>
                    <GroupObjectsIcon size={25} marginRight={10} color='default' />
                    <Heading size={700}>{headerText}</Heading>
                </Pane>
            )}

            <form onSubmit={handleSubmit}>
                <Pane>
                    <TextInputField
                        width={350}
                        label='Name'
                        value={name}
                        onChange={handleNameChange}
                        required
                        disabled={!!category?.accountTransferId}
                        //isInvalid={name === ''}
                        //validationMessage='Please enter a category name.'
                    />
                    <Pane marginBottom={majorScale(3)}>
                        <FormFieldLabel>Color *</FormFieldLabel>
                        <FormFieldDescription>
                            Color will be used when displaying the category on transactions and in graphs.
                        </FormFieldDescription>
                        <Popover
                            content={
                                <Pane padding={20}>
                                    <CirclePicker onChange={handleColorChange} />
                                </Pane>
                            }
                        >
                            <Button
                                type='button'
                                width={200}
                                height={majorScale(5)}
                                display='flex'
                                justifyContent='space-between'
                                paddingRight={10}
                                disabled={!!category?.accountTransferId}
                            >
                                {color || 'Select Color...'}
                                <div
                                    style={{
                                        border: '1px solid black',
                                        background: color,
                                        width: '40px',
                                        height: '26px',
                                    }}
                                >
                                    <input
                                        tabIndex={-1}
                                        defaultValue={color}
                                        required
                                        style={{ width: '1px', height: '1px', opacity: 0 }}
                                    />
                                </div>
                            </Button>
                        </Popover>
                    </Pane>
                </Pane>
                <Pane display='flex' justifyContent='flex-end' borderTop paddingTop={10}>
                    <Button
                        type='button'
                        iconBefore={BanCircleIcon}
                        height={majorScale(5)}
                        marginRight={10}
                        onClick={close}
                    >
                        Cancel
                    </Button>
                    {!category?.accountTransferId && (
                        <Button appearance='primary' iconBefore={FloppyDiskIcon} height={majorScale(5)}>
                            {saveButtonText}
                        </Button>
                    )}
                </Pane>
            </form>
        </Pane>
    );
};
