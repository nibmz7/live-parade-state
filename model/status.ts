export const STATUSES = [
  { name: 'NOT SET', fullName: 'NOT SET', category: 0 },
  { name: 'PRESENT', fullName: 'PRESENT', category: 1 },
  { name: 'RSO', fullName: 'RSO', category: 2 },
  { name: 'RSI', fullName: 'RSI', category: 2 },
  { name: 'MC', fullName: 'MC', category: 3 },
  { name: 'MA', fullName: 'MA', category: 3 },
  { name: 'OIL', fullName: 'OFF IN LIEU', category: 4 },
  { name: 'AL', fullName: 'ANNUAL LEAVE', category: 4 },
  { name: 'UL', fullName: 'URGENT LEAVE', category: 4 },
  { name: 'OL', fullName: 'OVERSEAS LEAVE', category: 4 },
  { name: 'CL', fullName: 'COMPASSIONATE LEAVE', category: 4 },
  { name: 'PL', fullName: 'PATERNITY LEAVE', category: 4 },
  { name: 'PCL', fullName: 'PARENT CARE LEAVE', category: 4 },
  { name: 'CCL', fullName: 'CHILD CARE LEAVE', category: 4 },
  { name: 'AO', fullName: 'ATTACHED OUT', category: 5 },
  { name: 'OA', fullName: 'OVERSEAS ATTACHMENT', category: 5 },
  { name: 'OOC', fullName: 'OUT OF CAMP', category: 6 },
  { name: 'OTHERS', fullName: 'OTHERS', category: 6 }
];

export const STATUS_CATEGORY = [
  'NOT SET',
  'PRESENT',
  'RSO/RSI',
  'MC/MA',
  'OIL/LEAVE',
  'AO/OA',
  'OOC/OTHERS'
];

export interface StatusProperties {
  code: number;
  remarks: string;
  updatedby: string;
  date: Date;
  expired?: boolean;
}

export class Status {
  readonly code: number;
  readonly remarks: string;
  readonly updatedby: string;
  readonly date: Date;
  readonly expired: boolean;

  constructor(status: StatusProperties) {
    this.code = status.code;
    this.remarks = status.remarks;
    this.updatedby = status.updatedby;
    this.date = status.date;
    this.expired =
      status.expired === undefined
        ? !Status.isSameDay(status.date)
        : status.expired;
  }

  static isPresent = (code: number) => code === 1;

  static isSameDay(statusDate: Date) {
    const date = new Date();
    const dayDifference = statusDate.getDate() - date.getDate();
    const isSameDayBeforeSix =
      dayDifference === 0 && statusDate.getHours() < 18 && date.getHours() < 18;
    const isSameDayAfterSix =
      dayDifference === 0 && statusDate.getHours() > 18 && date.getHours() > 18;
    const isPrevDayAfterSix =
      dayDifference === -1 &&
      statusDate.getHours() > 18 &&
      date.getHours() < 18;
    return (
      date.getFullYear() === statusDate.getFullYear() &&
      date.getMonth() === statusDate.getMonth() &&
      (isSameDayBeforeSix || isSameDayAfterSix || isPrevDayAfterSix)
    );
  }
}

export default Status;
