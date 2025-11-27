export enum Shift {
  AM = 'AM',
  PM = 'PM',
  NT1 = 'NT1',
  NT2 = 'NT2',
}

export interface Operator {
  id: number;
  name: string;
  shift: Shift;
  satisfaction: number;
  quality: number;
  avatar: string;
  chatsHandled: number;
  neutralRatings: number;
  negativeRatings: number;
}

export type View = 'global' | 'shifts';

export type SortKey = 'combined' | 'satisfaction' | 'quality';
export type SortOrder = 'asc' | 'desc';

export interface SortOption {
  key: SortKey;
  order: SortOrder;
}

export type OperatorFormData = Omit<Operator, 'id'> & { id?: number };
