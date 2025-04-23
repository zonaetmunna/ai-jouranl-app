/**
 * Interface for marking a single date on the calendar
 */
export interface DateMarking {
  selected?: boolean;
  marked?: boolean;
  selectedColor?: string;
  selectedTextColor?: string;
  dotColor?: string;
  activeOpacity?: number;
  disabled?: boolean;
  disableTouchEvent?: boolean;
  dots?: { key?: string; color: string; selectedDotColor?: string }[];
  [key: string]: any;
}

/**
 * Interface for marking multiple dates on the calendar
 */
export interface MarkedDates {
  [date: string]: DateMarking;
}
