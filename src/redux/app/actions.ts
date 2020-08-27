import { Dispatch } from 'redux';
import qs from 'qs';
import * as CONSTANTS from './constants';
import api from '../../services/api';
import { File, FileStateObj } from './types';
import Filetree, { FileDTO } from '../../misc/FiletreeClass';
import history from '../../services/history';

interface FilesRequestDTO {
  status: number;
  data: File[];
}

interface FiletreeRequestDTO {
  status: number;
  data: FileDTO[];
}

export const getFiles = () => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch({ type: CONSTANTS.FILES_REQUEST_PENDING });
      const request: FilesRequestDTO = await api.get('/files');
      dispatch({
        type: CONSTANTS.FILES_REQUEST_SUCCESS,
        files: request.data,
      });
    } catch {
      dispatch({
        type: CONSTANTS.FILES_REQUEST_SUCCESS,
      });
    }
  };
};

export const pushTab = (fileId: number) => {
  return { type: CONSTANTS.OPEN_TAB, fileId };
};

export const closeTab = (fileId: number) => {
  return { type: CONSTANTS.CLOSE_TAB, fileId };
};

export const setFile = (fileId: number, fileStateObj: FileStateObj) => {
  return { type: CONSTANTS.SET_FILE, fileStateObj, fileId };
};

export const deleteFile = (fileId: number) => {
  return { type: CONSTANTS.DELETE_FILE, fileId };
};

export const getTree = () => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch({ type: CONSTANTS.FILETREE_REQUEST_PENDING });
      const request: FiletreeRequestDTO = await api.get('/filetree');
      const filetree = new Filetree(request.data);

      dispatch({
        type: CONSTANTS.FILETREE_REQUEST_SUCCESS,
        filetree,
      });

      // Push a tab onto the stack in case user opens the website with a query param
      if (history.location.search) {
        const queryString = qs.parse(history.location.search, {
          ignoreQueryPrefix: true,
        }) as { file: string };
        const file = filetree.findByPath(queryString.file);
        if (file && file.state.extension) {
          const { id } = file.state;
          dispatch(pushTab(id));
        }
      }
    } catch {
      dispatch({
        type: CONSTANTS.FILETREE_REQUEST_FAILED,
      });
    }
  };
};
