import React, { MouseEvent } from 'react';
import { connect } from 'react-redux';
import { IconType } from 'react-icons';
import {
  IoLogoJavascript,
  FaJava,
  DiReact,
  BiFileBlank,
  MdClose,
} from 'react-icons/all';
import { Container, Row, StatusCircle, ActionsContainer } from './styles';
import history from '../../services/history';
import { ThunkDispatch } from 'redux-thunk';
import { pushTab, deleteFile, closeTab } from '../../redux/app/actions';
import api from '../../services/api';
import { toast } from 'react-toastify';

interface Props {
  id: number;
  name: string;
  isDirectory: boolean;
  content: string | undefined;
  path: string;
  modified: boolean;
  unsaved: boolean;
  extension?: string;
  selected: boolean;
  onClick?: (id: number) => void;
  pushTab: (fileId: number) => void;
  deleteFile: (fileId: number) => void;
  closeTab: (fileId: number) => void;
}

interface FIcon {
  [key: string]: IconType;
}

const FileIcon: FIcon = {
  java: FaJava,
  js: IoLogoJavascript,
  jsx: DiReact,
  default: BiFileBlank,
};

const Unsaved = () => {
  return (
    <Row>
      <StatusCircle />
    </Row>
  );
};

const File: React.FC<Props> = ({
  id,
  extension,
  name,
  path,
  unsaved,
  selected,
  onClick,
  pushTab,
  closeTab,
  deleteFile,
}: Props) => {
  const Icon = FileIcon[String(extension)] || FileIcon.default;

  const handleClick = (e: MouseEvent) => {
    history.push(`/editor?file=${path}`);
    pushTab(id);

    if (onClick) onClick(id);
    e.stopPropagation();
  };

  const confirmDelete = async (e: MouseEvent) => {
    e.stopPropagation();
    const result: boolean = window.confirm(
      `Are you sure you want to delete ${name}? The file will be permanently removed`
    );
    if (result) {
      closeTab(id);
      try {
        await api.delete(`/files/${id}`);
        deleteFile(id);
      } catch {
        toast.error(
          'An error ocurred trying to delete the file, please try again later'
        );
      }
    }
  };

  return (
    <Container unsaved={unsaved} selected={selected} onClick={handleClick}>
      <Icon />
      <p>{name}</p>
      {unsaved && <Unsaved />}
      <ActionsContainer>
        <MdClose onClick={confirmDelete} />
      </ActionsContainer>{' '}
    </Container>
  );
};

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
  pushTab: (fileId: number) => dispatch(pushTab(fileId)),
  closeTab: (fileId: number) => dispatch(closeTab(fileId)),
  deleteFile: (fileId: number) => dispatch(deleteFile(fileId)),
});

export default connect(null, mapDispatchToProps)(File);
