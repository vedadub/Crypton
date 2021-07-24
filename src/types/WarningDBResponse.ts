export interface WarningDBResponse {
    guildId:string;
    userId:string;
    warnings:[Warn];
}
export type Warn = {
id:string,
moderatorId:string,
timestamp:number,
reason:string,
}