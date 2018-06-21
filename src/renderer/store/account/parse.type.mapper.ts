import { ParseType } from "./parse.type";
import { ImportRecordsFunc } from "../records/import-records.type";
import {
  NewScotiabankChequingFileSelected,
  NewScotiabankSavingsFileSelected,
  NewScotiabankVisaFileSelected
} from "../records/records.actions";

/**
 * Defines a type that requires the parseTypeLookup
 * to define 1 key for each value in the ParseType type.
 */
type ParseLookup = { [P in ParseType]: ImportRecordsFunc };

const parseTypeLookup: ParseLookup = {
  ScotiabankChequing: NewScotiabankChequingFileSelected,
  ScotiabankSavings: NewScotiabankSavingsFileSelected,
  ScotiabankVisa: NewScotiabankVisaFileSelected
}

/**
 * Maps a ParseType to an ImportRecordsFunc.
 * @param type the parseType to map to an ImportRecordsFunc.
 */
export function mapParseType(type: ParseType): ImportRecordsFunc {
  return parseTypeLookup[type];
}