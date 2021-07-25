/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

/**
 * The value at one end of a range. A range can either include this value, or not.
 */
export interface DatetimeRangeBoundInput {
  value: any;
  inclusive: boolean;
}

/**
 * A range of `Datetime`.
 */
export interface DatetimeRangeInput {
  start?: DatetimeRangeBoundInput | null;
  end?: DatetimeRangeBoundInput | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
