import getExtension from '../helpers/getExtension';

export interface FileDTO {
  id: number;
  name: string;
  isDirectory: boolean;
  children?: Array<FileDTO>;
}

interface NodeState {
  id: number;
  name: string;
  isDirectory: boolean;
  content: string | undefined;
  path: string;
  modified: boolean;
  unsaved: boolean;
  extension?: string;
}

export class FileNode {
  m_Parent: FileNode | null;
  m_Children: FileNode[] | undefined;
  state: NodeState;
  constructor(
    children: FileDTO[] | undefined,
    parent: FileNode | null,
    nodeState: NodeState
  ) {
    this.state = nodeState;
    this.m_Parent = parent;
    this.m_Children = children ? this.addChildren(children) : undefined;
  }

  public addChildren = (children: FileDTO[]): FileNode[] => {
    const nodes = children.map(node => {
      const newNode = new FileNode(node.children, this, {
        id: node.id,
        name: node.name,
        isDirectory: node.isDirectory,
        extension: !node.isDirectory ? getExtension(node.name) : '',
        path: this.state.path + '/' + node.name,
        content: '',
        unsaved: false,
        modified: false,
      });
      return newNode;
    });
    return nodes;
  };

  setContent(content: string) {
    if (this.state.isDirectory)
      throw new Error('Cannot set content for a directory node');
    else this.state.content = content;
  }
}

class Filetree {
  private tree: FileNode[];
  constructor(filetree: FileDTO[] | Filetree) {
    if (filetree instanceof Filetree) {
      this.tree = filetree.tree;
    } else {
      this.tree = filetree.map(
        (rootNode: FileDTO) =>
          new FileNode(rootNode.children, null, {
            id: rootNode.id,
            name: rootNode.name,
            isDirectory: rootNode.isDirectory,
            path: rootNode.name,
            content: rootNode.isDirectory ? undefined : '',
            unsaved: false,
            modified: false,
          })
      );
    }
  }

  public findByPath(filepath: string) {
    let found: FileNode | undefined;
    this.tree.forEach(tree => {
      found = this.findByPathImpl(tree, filepath);
    });
    return found;
  }

  public findById(id: number): FileNode | undefined {
    let found: FileNode | undefined;
    this.tree.forEach(tree => {
      found = this.findByIdImpl(tree, id);
    });
    return found;
  }

  private findByIdImpl(node: FileNode, id: number): FileNode | undefined {
    if (node.state.id === id) {
      return node;
    }

    if (node.m_Children) {
      for (const child of node.m_Children) {
        const n = this.findByIdImpl(child, id);
        if (n) return n;
      }
    }
  }

  private findByPathImpl(node: FileNode, path: string): FileNode | undefined {
    if (node.state.path === path) {
      return node;
    }

    if (node.m_Children) {
      for (const child of node.m_Children) {
        const n = this.findByPathImpl(child, path);
        if (n) return n;
      }
    }
  }

  get list(): FileNode[] {
    return this.tree;
  }
}

export default Filetree;
