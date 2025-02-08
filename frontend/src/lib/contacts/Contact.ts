export interface Contact {
    uuid: UUID;
    name: string;
    [key : string]: any;
}


type UUID = string & {_uuidIdentifier : undefined}