import { v4 as uuidv4 } from "uuid"

export interface Contact {
    uuid: UUID;
    name: string;
    picture: string;
    relations : UUID[];
    relation? : string;
    employer? : string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key : string]: any;
}

export function createNewContact() : Contact {
    return <Contact>{
        uuid: <UUID>uuidv4(),
        name: "",
        picture: generateDefaultProfilePicture(),
        relations: []
    }
}

function generateDefaultProfilePicture() : string {
    return "https://picsum.photos/512/512"
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