import {
    VideoNoteState,
    VideoNoteSelector,
} from '@/managers/video-note/interface';
import convertToHMS from '@/utils/convert-stringt-hms';
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
      return { ...item, displayTime: convertToHMS(item.time) };
    });

    return {
      videoNotes: newNotes,
    };
  },
});
