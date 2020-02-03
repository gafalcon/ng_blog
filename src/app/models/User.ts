import { UserRole } from '../auth/UserRole';

export class User {

    constructor(
        public _id: string,
        public firstName: string,
        public lastName: string,
        public email: string,
        public photoUrl: string,
        public location: string,
        public role: UserRole
    ) {

    }

}
