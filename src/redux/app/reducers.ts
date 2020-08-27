import * as CONSTANTS from './constants';
import produce from 'immer';
import { IAction, IState, STATUS } from './types';
import Filetree from '../../misc/FiletreeClass';

const initialState: IState = {
  files: [],
  openTabs: [],
  filetree: new Filetree([]),
  requestStatus: STATUS.Idle,
};

export default function AppReducer(
  state = initialState,
  action: IAction
): IState {
  switch (action.type) {
    case CONSTANTS.FILETREE_REQUEST_SUCCESS:
      return produce(state, (draftState: IState) => {
        draftState.requestStatus = STATUS.Pending;
        if (action.filetree) {
          draftState.filetree = action.filetree;
        }
      });
    case CONSTANTS.FILETREE_REQUEST_FAILED:
      return produce(state, (draftState: IState) => {
        draftState.requestStatus = STATUS.Error;
      });

    case CONSTANTS.OPEN_TAB:
      return produce(state, (draftState: IState) => {
        const { fileId } = action;

        if (fileId) {
          const file = draftState.filetree.findById(fileId);
          if (!file) return;
          const isOpen = draftState.openTabs.find(f => f.state.id === fileId);
          if (isOpen) return;

          draftState.openTabs.unshift(file);
        }
      });

    case CONSTANTS.CLOSE_TAB:
      return produce(state, (draftState: IState) => {
        const { fileId } = action;

        if (fileId) {
          draftState.openTabs = draftState.openTabs.filter(
            f => f.state.id !== fileId
          );
        }
      });
    case CONSTANTS.SET_FILE:
      return produce(state, (draftState: IState) => {
        const { fileId, fileStateObj } = action;
        if (fileId && fileStateObj) {
          const node = draftState.filetree.findById(fileId);
          if (!node) return;
          node.state = { ...node.state, ...fileStateObj };
          draftState.filetree = new Filetree(draftState.filetree);
        }
      });
    case CONSTANTS.DELETE_FILE:
      return produce(state, (draftState: IState) => {
        const { fileId } = action;

        if (fileId) {
          const node = draftState.filetree.findById(fileId);
          if (node?.m_Parent) {
            const parent = node.m_Parent;
            parent.m_Children = parent.m_Children?.filter(
              child => child.state.id !== fileId
            );
            draftState.filetree = new Filetree(draftState.filetree);
          }
        }
      });

    default:
      return state;
  }
}
