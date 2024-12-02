import {
  VideoNoteState,
  VideoNoteSelector,
} from '@/managers/video-note/interface';
import { convertSecondsToHMS } from '@/utils/convert-string-hms';
import { atom, selector } from 'recoil';

export const VIDEO_NOTE_STATE = atom<VideoNoteState>({
  key: 'noteState',
  default: {
    videoNotes: new Map(),
  },
});

export const VIDEO_NOTE_SELECTOR = selector<VideoNoteSelector>({
  key: 'noteSelector',
  get: ({ get }) => {
    const { videoNotes } = get(VIDEO_NOTE_STATE);
    const newNotes = Array.from(videoNotes.values()).map((item) => {
      return { ...item, displayTime: convertSecondsToHMS(item.time) };
    });

    return {
      videoNotes: newNotes,
    };
  },
});
