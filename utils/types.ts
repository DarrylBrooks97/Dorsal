import { Session } from 'next-auth';

export interface SessionData extends Session {
	userInfo: {
		id: string;
	};
}
