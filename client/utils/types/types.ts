//Describing the input structure for each it statement
export type Describe = {
  URL: string;
  description: string;
  writeUp: string;
  itStatements: itObject[];
};

//Describing the input structure for each it statement object
export type itObject = {
  itStatement: string;
  eventArr: EventObj[];
};

//Describing the input type for each event object
export type EventObj = {
  selector: string;
  action: string;
  input?: string;
  URL?: string;
};
