export class Post {

    constructor(
        public content: string,
        public title: string,
        public subtitle: string,
        public creator?: string,
        public createdBy?: string,
        public createdAt?: string,
        public _id?: string
    ) {

    }

}
