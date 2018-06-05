import INewFile from "./new-file/new-file.interface";
import IAccount from "./account/account.interface";

export default interface IStore {
  accounts: { [id: string]: IAccount };
  newFile: INewFile;
}
