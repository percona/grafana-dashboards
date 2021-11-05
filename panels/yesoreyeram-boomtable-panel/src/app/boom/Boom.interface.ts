interface IBoomPattern {
  bgColors: string;
  bgColors_overrides: string;
  clickable_cells_link: string;
  col_name: string;
  decimals: Number;
  delimiter: string;
  enable_bgColor: Boolean;
  enable_bgColor_overrides: Boolean;
  enable_clickable_cells: Boolean;
  enable_textColor: Boolean;
  enable_textColor_overrides: Boolean;
  enable_time_based_thresholds: Boolean;
  enable_transform: Boolean;
  enable_transform_overrides: Boolean;
  displayTemplate: string;
  defaultBGColor: string;
  defaultTextColor: string;
  filter: {
    value_above: string;
    value_below: string;
  };
  format: string;
  name: string;
  null_color: string;
  null_value: string;
  null_textcolor: string;
  pattern: string;
  row_name: string;
  textColors: string;
  textColors_overrides: string;
  thresholds: string;
  time_based_thresholds: IBoomTimeBasedThreshold[];
  transform_values: string;
  transform_values_overrides: string;
  tooltipTemplate: string;
  valueName: string;
}
interface IBoomSeries {
  hidden: Boolean;
  col_name: string;
  row_name: string;
  row_name_raw: string;
  display_value: string;
  color_bg: string;
  color_text: string;
  tooltip: string;
  value_formatted: string;
  link: string;
  _tags: any[];
  _metricname: string;
}
interface IBoomTimeBasedThreshold {
  enabledDays: string;
  from: string;
  name: string;
  threshold: string;
  to: string;
}
interface IBoomTableTransformationOptions {
  non_matching_cells_color_bg: string;
  non_matching_cells_color_text: string;
  non_matching_cells_text: string;
}
interface IBoomRenderingOptions {
  default_title_for_rows: String;
  hide_first_column: Boolean;
  hide_headers: Boolean;
  text_alignment_firstcolumn: String;
  text_alignment_values: String;
  first_column_link: String;
}
interface IBoomCellDetails {
  hidden: Boolean;
  col_name: string;
  row_name: string;
  color_bg: string;
  color_text: string;
  display_value: string;
  link: string;
  tooltip: string;
  value: number;
}
interface IBoomTable {
  rows_without_token: string[];
  rows_found: string[];
  cols_found: string[];
  output: IBoomCellDetails[][];
}
interface IBoomHTML {
  body: string;
}
export {
  IBoomTableTransformationOptions,
  IBoomRenderingOptions,
  IBoomPattern,
  IBoomSeries,
  IBoomTimeBasedThreshold,
  IBoomHTML,
  IBoomTable,
  IBoomCellDetails,
};
