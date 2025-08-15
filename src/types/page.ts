export interface UpdatePageRequest {
  title?: string
  content?: string
  color?: string
  mood?: number
  pageNumber: number
}


export interface Page {
  pageId: string;
  userId: string;
  pageTitle: string;
  pageNumber: number;
  content: string;
  mood: number;
  color: string;
}