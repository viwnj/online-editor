import React from 'react';
import { MdArrowUpward } from 'react-icons/md';
import { connect } from 'react-redux';
import { Container, TitleContainer, FilesCollapsible } from './styles';
import File from '../File';
import Directory from '../Directory';
import { RootState } from '../../redux/reducers';
import Filetree, { FileNode } from '../../misc/FiletreeClass';

interface IOpenDirectories {
  [key: string]: boolean | undefined;
}

interface Props {
  filetree: Filetree;
}

const Sidebar: React.FC<Props> = ({ filetree }) => {
  const [openDirectories, setOpenDirectories] = React.useState<
    IOpenDirectories
  >({});
  const [selectedFile, setSelectedFile] = React.useState(0);

  const handleFileClick = (id: number) => {
    setSelectedFile(id);
  };

  const toggleDirectory = (dirName: string) => {
    return () => {
      setOpenDirectories(directories => ({
        ...directories,
        [dirName]: !directories[dirName],
      }));
    };
  };

  const renderSidebarItem = (item: FileNode, index: number) => {
    if (item.state.isDirectory) {
      return (
        <Directory
          name={item.state.name}
          onClick={toggleDirectory(item.state.name)}
          open={openDirectories[item.state.name]}
          key={item.state.name}
        >
          {item.m_Children?.map(renderSidebarItem)}
        </Directory>
      );
    }
    const F = (
      <File
        key={item.state.name}
        selected={selectedFile === item.state.id}
        onClick={handleFileClick}
        {...item.state}
      />
    );

    return F;
  };

  return (
    <Container>
      <FilesCollapsible>
        <TitleContainer>
          <strong>Files</strong>
          <MdArrowUpward />
        </TitleContainer>
        {filetree.list.map(renderSidebarItem)}
      </FilesCollapsible>
    </Container>
  );
};

const mapStateToProps = (state: RootState) => ({
  filetree: state.AppReducer.filetree,
});

export default React.memo(connect(mapStateToProps)(Sidebar));
