import { UploadLayout, IUploadLayoutStateProps } from "./upload.layout";
import { connect } from "react-redux";
import { IStore } from "../../store/store.interface";

function mapStateToProps(store: IStore): IUploadLayoutStateProps {
    return {
        hasPendingRecords: store.pendingRecords.accountId != undefined
    };
}

export const UploadContainer = connect(mapStateToProps)(UploadLayout);