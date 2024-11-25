import { useCallback } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { VIDEO_NOTE_SELECTOR, VIDEO_NOTE_STATE } from './state';
import { SerializedVideoNote, VideoNote } from './interface';
import { VIDEO_NOTES } from '@/contains/global';

interface UseVideoNoteManager {
  videoNotes: SerializedVideoNote[];
  getVideosNotes: () => void;
  addVideoNote: (videoNote: VideoNote) => void;
  getVideoNotesByVideoId: (videoId: string) => SerializedVideoNote[];
  deleteVideoNoteById: (id: string) => void;
}
export const useVideoNoteManager = (): UseVideoNoteManager => {
  const setVideoNote = useSetRecoilState(VIDEO_NOTE_STATE);
  const { videoNotes } = useRecoilValue(VIDEO_NOTE_SELECTOR);

  const getVideosNotes = useCallback(() => {
    const localVideoNotes = localStorage.getItem(VIDEO_NOTES);
    if (!localVideoNotes) {
      localStorage.setItem(VIDEO_NOTES, JSON.stringify([]));
    }
    const notes: VideoNote[] = localVideoNotes
      ? JSON.parse(localVideoNotes)
      : [];

    if (notes) {
      notes.forEach((note) => {
        setVideoNote((prevState) => {
          prevState.videoNotes.set(note.id, note);
          return { ...prevState };
        });
      });
    }
  }, [setVideoNote]);

  const addVideoNote = useCallback(
    (videoNote: VideoNote) => {
      localStorage.setItem(
        VIDEO_NOTES,
        JSON.stringify([...videoNotes, videoNote]),
      );

      setVideoNote((prevState) => {
        prevState.videoNotes.set(videoNote.id, videoNote);

        return { ...prevState };
      });
    },
    [setVideoNote, videoNotes],
  );

  const deleteVideoNoteById = useCallback(
    (id: string) => {
      setVideoNote((prevState) => {
        prevState.videoNotes.delete(id);

        return { ...prevState };
      });
    },
    [setVideoNote],
  );

  const getVideoNotesByVideoId = useCallback(
    (videoId: string) => {
      return videoNotes.filter((item) => videoId === item.videoId);
    },
    [videoNotes],
  );

  return {
    getVideosNotes,
    addVideoNote,
    videoNotes,
    getVideoNotesByVideoId,
    deleteVideoNoteById,
  };
};
