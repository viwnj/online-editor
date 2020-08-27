import React, { MouseEvent } from 'react';
import { MdFolderOpen, MdFolder, MdChevronRight } from 'react-icons/md';
import { Container, DirectoryHeader, ChildrenContainer } from './styles';

interface Props {
  name: string;
  open?: boolean;
  onClick?: () => void;
}

const Directory: React.FC<Props> = ({ name, open, onClick, children }) => {
  function handleClick(e: MouseEvent) {
    if (onClick) {
      onClick();
    }

    e.stopPropagation();
  }

  return (
    <Container onClick={handleClick} open={open}>
      <DirectoryHeader open={open}>
        <MdChevronRight style={open ? { transform: 'rotate(90deg)' } : {}} />
        {open ? <MdFolderOpen /> : <MdFolder />}
        <p>{name}</p>
      </DirectoryHeader>

      <ChildrenContainer open={open}>{children}</ChildrenContainer>
    </Container>
  );
};

export default Directory;
