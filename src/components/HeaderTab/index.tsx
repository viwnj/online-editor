import React from 'react';
import qs from 'qs';
import { History } from 'history';
import { IconType } from 'react-icons';
import {
  FaJava,
  IoLogoJavascript,
  DiReact,
  BiFileBlank,
} from 'react-icons/all';
import { withRouter, RouteComponentProps } from 'react-router';
import { ThunkDispatch } from 'redux-thunk';
import { closeTab, setFile } from '../../redux/app/actions';
import { FileStateObj } from '../../redux/app/types';
import { connect } from 'react-redux';
import { RootState } from '../../redux/reducers';
import { Container, CloseButton } from './styles';
import Filetree, { FileNode } from '../../misc/FiletreeClass';

interface FIcon {
  [key: string]: IconType;
}
const FileIcon: FIcon = {
  java: FaJava,
  js: IoLogoJavascript,
  jsx: DiReact,
  default: BiFileBlank,
};

interface IProps extends RouteComponentProps {
  history: History<History.UnknownFacade>;
  id: number;
  openFiles: FileNode[];
  filetree: Filetree;
  closeTab: (fileId: number) => void;
  setFile: (fileId: number, fileStateObj: FileStateObj) => void;
}

const HeaderTab: React.FC<IProps> = ({
  history,
  id,
  openFiles,
  filetree,
  closeTab,
  setFile,
}) => {
  const file = filetree.findById(id);

  if (!file) return null;

  const { name, extension, unsaved, path } = file.state;

  const Icon = FileIcon[String(extension)] || FileIcon.default;

  const queryString = qs.parse(history.location.search, {
    ignoreQueryPrefix: true,
  });

  const isActive = queryString.file === path;
  const openTab = (e: React.MouseEvent) => {
    history.replace(`${history.location.pathname}?file=${path}`);
    e.stopPropagation();
  };

  const handleTabClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    closeTab(id);

    // get the last open file after closing a tab
    let lastOpen = openFiles[0];

    // Prevents a bug where closing the first tab doesn't work properly
    // TODO: Find a better way to do this
    if (lastOpen.state.path === path) lastOpen = openFiles[1];

    // Go back to root if there's nothing left on the tab stack
    if (!lastOpen) {
      history.replace('/');
      return;
    }

    // Switch to last opened tab in case we're closing the tab that's currently active
    if (isActive) {
      history.replace(
        `${history.location.pathname}?file=${lastOpen.state.path}`
      );
    }
  };

  const confirmClose = (e: React.MouseEvent) => {
    if (unsaved) {
      const confirmed: boolean = window.confirm(
        "Do you really want to leave? Your changes will be lost if you don't save them."
      );
      if (confirmed) {
        setFile(id, { unsaved: false });
        handleTabClose(e);
      }
    }
  };

  return (
    <Container onClick={openTab} isActive={isActive}>
      <Icon />
      {name}
      <CloseButton
        onClick={unsaved ? confirmClose : handleTabClose}
        unsaved={unsaved}
      />
    </Container>
  );
};

const mapStateToProps = (state: RootState) => ({
  openFiles: state.AppReducer.openTabs,
  filetree: state.AppReducer.filetree,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, any, any>) => ({
  setFile: (fileId: number, fileStateObj: FileStateObj) =>
    dispatch(setFile(fileId, fileStateObj)),
  closeTab: (fileId: number) => dispatch(closeTab(fileId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(HeaderTab));
