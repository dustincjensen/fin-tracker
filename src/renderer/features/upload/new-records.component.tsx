import * as React from 'react';
import { IAccount } from '../../store/account/account.interface';
import { FilePicker, SelectField, Pane, Button, Heading, Icon, majorScale, FormField } from 'evergreen-ui';

export interface INewRecordsStateProps {
    accounts: IAccount[];
}

export interface INewRecordsDispatchProps {
    uploadAction: (account: IAccount, file: File) => void;
}

interface INewRecordsState {
    selectedFile?: File;
    selectedAccountId?: string;
}

export class NewRecords extends React.Component<INewRecordsStateProps & INewRecordsDispatchProps, INewRecordsState> {
    constructor(props) {
        super(props);
        this.state = {
            selectedAccountId: props.accounts && props.accounts[0] && props.accounts[0].id || '',
            selectedFile: null
        };
    }

    render() {
        const { selectedAccountId } = this.state;

        return (
            <Pane border padding={20} background="tint1" borderRadius={5}>
                <Pane borderBottom display='flex' alignItems='center' marginBottom={20} paddingBottom={10}>
                    <Icon icon="upload" size={25} marginRight={10} color="default" />
                    <Heading size={700}>Upload</Heading>
                </Pane>
                
                <form onSubmit={this.handleSubmit}>
                    <Pane>
                        <FormField label="File" description="Select a file that contains records for new months.">
                            <FilePicker 
                                width={350}
                                name="upload-file-picker"
                                marginBottom={20} 
                                onChange={this.handleFileSelected}/>
                        </FormField>
                        <SelectField 
                            width={350}
                            label="Account"
                            description="The account to upload the new records to."
                            value={selectedAccountId}
                            onChange={this.handleAccountChange}
                        >
                            {this.getAccountOptions()}
                        </SelectField>
                    </Pane>
                    <Pane display='flex' justifyContent="flex-end" borderTop paddingTop={10}>
                        <Button appearance="primary" height={majorScale(5)}>Upload File</Button>
                    </Pane>
                </form>
            </Pane>
        );
    }

    getAccountOptions = () => {
        return this.props.accounts.map(a => {
            return <option key={a.id} value={a.id}>{a.name}</option>;
        });
    };

    handleFileSelected = (files: FileList) => {
        if (files) {
            this.setState({ selectedFile: files[0] });
        }
    };

    handleAccountChange = (evt) => {
        this.setState({ selectedAccountId: evt.target.value });
    };

    handleSubmit = (evt) => {
        evt.preventDefault();
        const { selectedFile, selectedAccountId } = this.state;

        // Don't do anything if the form isn't properly filled out.
        if (selectedFile === null || selectedAccountId === '') {
            return;
        }

        const { accounts } = this.props;
        const selectedAccount = accounts.filter(a => a.id === selectedAccountId)[0];

        this.props.uploadAction(selectedAccount, selectedFile);
        this.setState({ selectedFile: null });
    };
}
