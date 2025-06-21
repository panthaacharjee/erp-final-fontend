import { ReactElement } from "react";

export interface  TabContent{
    id:string,
    element: string
}
export interface TabItem {
    id:string,
    title:string,
    icon:string,
}


export interface TabState {
  loading: boolean;
  items: TabItem[];
  content: TabContent[]
}