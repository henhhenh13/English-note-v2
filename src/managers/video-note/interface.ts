export interface VideoNote {
  id: string;
  time: number;
  title: string;
  description: string;
  videoId: string;
}

export interface SerializedVideoNote extends VideoNote {
  displayTime?: string;
}

export type VideoNoteState = {
  videoNotes: Map<string, VideoNote>;
};

export type VideoNoteSelector = {
  videoNotes: SerializedVideoNote[];
};
