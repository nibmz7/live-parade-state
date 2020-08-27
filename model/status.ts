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
  { name: 'OTHERS', fullName: 'OTHERS', category: 6 },
];

export const STATUS_CATEGORY = [
  'NOT SET',
  'PRESENT',
  'RSO/RSI',
  'MC/MA',
  'OIL/LEAVE',
  'AO/OA',
  'OOC/OTHERS',
];

export interface StatusProperties {
  code: number;
  remarks: string;
  updatedby: string;
  timestamp: Date;
}

export class Status {
  readonly status: StatusProperties;

  constructor(status: StatusProperties) {
    this.status = status;
  }
}

export default Status;