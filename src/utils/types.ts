export enum AuthContextTypes {
  LOGOUT = 'logout_type',
  LOGIN = 'login_type'
}

export interface AuthContextState {
  isAuth: boolean;
  token: string;
  email: string;
  username: string;
}

export interface AuthContextAction {
  type: AuthContextTypes,
  payload: AuthContextState 
}

export interface LoginDto {
  identifier: string;
  password: string;
}

export interface GetStreamsStatusesDto {
  data: StreamStatus[],
  meta: {
    pagination: {
      page: number;
      pageCount: number;
      pageSize: number;
      total: number;
    }
  } 
}

export interface StreamStatus {
  id: number;
  attributes: StreamAttributes;
}

export interface StreamAttributes {
  probe_id: string,
  account_id: number,
  account_name: string,
  stream_id: number,
  stream_name: string,
  stream_status: string,
  stream_test_spent_time: number,
  createdAt: Date,
  updatedAt: Date,
  publishedAt: Date,
  stream_url: string;
}
