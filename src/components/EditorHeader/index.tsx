import React from 'react';
import { connect } from 'react-redux';
import { Container } from './styles';
import HeaderTab from '../HeaderTab';
import { RootState } from '../../redux/reducers';
import { FileNode } from '../../misc/FiletreeClass';
import { withRouter, RouteComponentProps } from 'react-router';

interface IProps extends RouteComponentProps {
  openFiles: FileNode[];
}

const EditorHeader: React.FC<IProps> = ({ openFiles, history }) => {
  React.useEffect(() => {
    console.log({ openFiles });
    if (openFiles.length === 0) {
      history.replace('/');
    }
  }, [history, openFiles]);

  return (
    <Container>
      {openFiles.map((file: FileNode) => (
        <>
          <HeaderTab id={file.state.id} />
        </>
      ))}
    </Container>
  );
};

const mapStateToProps = (state: RootState) => ({
  openFiles: state.AppReducer.openTabs,
});

export default connect(mapStateToProps)(withRouter(EditorHeader));
