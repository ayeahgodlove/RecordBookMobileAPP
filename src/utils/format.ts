import moment from "moment";

// interface Date extends Date {
//   firstMinuteOfDay(date: DateConstructor): Date;
//}

function formatNumber(num: number): string {
  return new Intl.NumberFormat("en-GB").format(num);
}

function formatNumberWithSeparators(
  value: number,
  decimalPlaces: number = 0
): string {
  return new Intl.NumberFormat("en-GB", {
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
  }).format(value);
}

/**
 *
 * @param date
 * @returns sets time of date to first minute of the day
 */
function firstMinuteOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);
}

/**
 *
 * @param date
 * @returns sets time of date to the last minute of the day
 */
function lastMinuteOfDay(date: Date): Date {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    23,
    59,
    59
  );
}

function formatDate(date: Date): string {
  return moment(date).format("DD/MM/YYYY");
}

function formatShortDate(date: Date): string {
  return moment(date).format("DD/MM");
}

function formatShortDay(date: Date): string {
  return moment(date).format("DD");
}

function formatShortMonth(date: Date): string {
  return moment(date).format("DD");
}

function formatFullYear(date: Date): string {
  return moment(date).format("YYYY");
}

function formatFullMonth(date: Date): string {
  return moment(date).format("MMMM");
}

function sevenChar(str: string): string {
  switch (str.length) {
    case 1:
      return `000000${str}`;
    case 2:
      return `00000${str}`;
    case 3:
      return `0000${str}`;
    case 4:
      return `000${str}`;
    case 5:
      return `00${str}`;
    case 6:
      return `0${str}`;
    case 7:
      return `${str}`;
    default:
      return str;
  }
}

function sixChar(str: string): string {
  switch (str.length) {
    case 1:
      return `00000${str}`;
    case 2:
      return `0000${str}`;
    case 3:
      return `000${str}`;
    case 4:
      return `00${str}`;
    case 5:
      return `0${str}`;
    case 6:
      return `${str}`;
    default:
      return str;
  }
}

function fiveChar(str: string): string {
  switch (str.length) {
    case 1:
      return `0000${str}`;
    case 2:
      return `000${str}`;
    case 3:
      return `00${str}`;
    case 4:
      return `0${str}`;
    case 5:
      return `${str}`;
    default:
      return str;
  }
}

function fourChar(str: string): string {
  switch (str.length) {
    case 1:
      return `000${str}`;
    case 2:
      return `00${str}`;
    case 3:
      return `0${str}`;
    case 4:
      return `${str}`;
    default:
      return str;
  }
}

function threeChar(str: string): string {
  switch (str.length) {
    case 1:
      return `00${str}`;
    case 2:
      return `0${str}`;
    case 3:
      return `${str}`;
    default:
      return str;
  }
}

function twoChar(str: string): string {
  switch (str.length) {
    case 1:
      return `0${str}`;
    case 2:
      return `${str}`;
    default:
      return str;
  }
}

function toGender(str: string) {
  return str === "01" ? "Male" : "Female";
}

function concatStringsWithCount(arr: string[]) {
  if (arr.length === 0) {
    return "..";
  } else {
    if (arr.length == 1) return arr[0];

    const firstItem = arr[0];
    const remainingItems = arr.slice(1).length;

    const others =
      remainingItems > 1
        ? ` and ${remainingItems} others`
        : ` and ${remainingItems} other`;

    return firstItem + others;
  }
}

function reduceToFirstAndLastSplit(
  items: string[],
  toLowerCase: boolean = false, // Default: false
  useFirstPart: boolean = false, // Default: false (use entire strings)
  includeSecond: boolean = false // Default: false (include second element in the summary)
): string {
  if (items.length === 0) {
    return ""; // Return empty string if the array is empty
  }

  // Determine whether to use the first parts or the entire strings
  let processedItems = useFirstPart
    ? items.map((item) => item.split(" ")[0])
    : items;

  // Convert to lowercase if the flag is true
  if (toLowerCase) {
    processedItems = processedItems.map((item) => item.toLowerCase());
  }

  // Handle different array lengths and formatting options
  if (processedItems.length === 1) {
    return processedItems[0]; // Return single item if array has only one element
  } else if (processedItems.length === 2) {
    return `${processedItems[0]}, ${processedItems[1]}`; // Return first and last for 2 items
  } else {
    // Return based on the includeSecond flag
    if (includeSecond) {
      return `${processedItems[0]}, ${processedItems[1]}, ... ${
        processedItems[processedItems.length - 1]
      }`;
    } else {
      return `${processedItems[0]}, ... ${
        processedItems[processedItems.length - 1]
      }`;
    }
  }
}

export const format = {
  number: (num: number, decimalPlaces: number = 0) =>
    formatNumberWithSeparators(num, decimalPlaces),
  date: (date: Date) => formatDate(date),
  shortDate: (date: Date) => formatShortDate(date),
  shortDay: (date: Date) => formatShortDay(date),
  shortMonth: (date: Date) => formatShortMonth(date),
  fullMonth: (date: Date) => formatFullMonth(date),
  fullYear: (date: Date) => formatFullYear(date),
  sevenChar,
  sixChar,
  fiveChar,
  fourChar,
  threeChar,
  twoChar,
  toGender: (str: string) => toGender(str),
  firstMinuteOfDay: (date: Date) => firstMinuteOfDay(date),
  lastMinuteOfDay: (date: Date) => lastMinuteOfDay(date),
  reduceArray: (
    arr: string[],
    toLowerCase: boolean = false,
    useFirstPart: boolean = false,
    includeSecond: boolean = false
  ) => reduceToFirstAndLastSplit(arr, toLowerCase, useFirstPart, includeSecond),
};
