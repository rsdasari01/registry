export interface Contact {
    uuid: UUID;
    name: string;
    picture: string;
    relation? : string;
    employer? : string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key : string]: any;
}

// export class Contact {
//     uuid : UUID;
//     name : string;

//     constructor(uuid : UUID, name : string) {
//         this.uuid = uuid;
//         this.name = name;
//     }
// }


// const myContact : Contact = {
    
// }

export type UUID = string & {_uuidIdentifier : undefined}