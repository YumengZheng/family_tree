import React, { useState } from 'react';
import './App.css';

const Node = function(name, photo, id, parentId, path) {
  return {
    children: [],
    name,
    photo,
    id,
    parentId,
    path: {}
  }
}


//I spent about 1.5 hours implementing the first version. It does a tree search very time adding or deleteing a family memeber which cost runtime o(n)

// const App = function() {
//   const [tree, setTree] = useState(
//     new Node('papa smurf', 'https://vignette.wikia.nocookie.net/smurfs/images/b/bd/Papa_Smurf123.png/revision/latest?cb=20130805130238', 0, null)
//   )

//   const _handleAddMemember = e => {
//     const { id } = e.target
//     const newTree = copyTree(tree)
//     const targetNode = findNode(id, newTree);
//     const newMemeber = new Node('Schleich smurf', 'https://www.smurf.com/images/brainy-news.png', `${id}${targetNode.children.length}`, id)
//     targetNode.children.push(newMemeber)
//     setTree(newTree)
//   }

//   const _handleDeleteMemember = e => {
//     const parentId = e.target.getAttribute('parentId')
//     const index = e.target.getAttribute('index')
//     const newTree = copyTree(tree)
//     const targetNode = findNode(parentId, newTree);
//     targetNode.children.splice(index, 1)
//     setTree(newTree)
//   }

//   const copyTree = node => {
//     if (!node) {
//       return
//     } else {
//       const newNode = {}
//       for (let key in node) {
//         if (key === 'children') {
//           let newChildren = [...node.children]
//           for (let i = 0; i < newChildren.length; i++) {
//             newChildren[i] = copyTree(newChildren[i])
//           }
//           node.children = newChildren
//         }
//         newNode[key] = node[key]
//       }
//       return newNode
//     }
//   }

//   const findNode = (id, curNode) => {
//     if (curNode.id.toString() === id) {
//       return curNode
//     } else {
//       const { children } = curNode;
//       let targetNode = null
//       for (let i = 0; i < children.length; i++) {
//         if (findNode(id, children[i])) {
//           targetNode = findNode(id, children[i])
//         }
//       }
//       return targetNode
//     }
//   }

//   const MakeTree = ({ children, name, photo, id, parentId }, index) => {
//     return (
//       <div className="person">
//         <div className="info">
//           <img src={photo} />
//           <p>{name}</p>
//           <button onClick={_handleAddMemember} id={id}>Add</button>
//           {/* <button>Edit</button> */}
//           {index !== 'begin' && <button onClick={_handleDeleteMemember} parentId={parentId} index={index}>delete</button>}
//         </div>
//         {children.length !== 0 &&
//           <div className="row">
//             {children.map((child, index) => MakeTree(child, index))}
//           </div>
//         }
//       </div>
//     )
//   }
//   return (
//     <div className="row">
//       {MakeTree(tree, 'begin')}
//     </div>
//   );
// }

// export default App;


// this is a faster and shorter version which only update the changed node in the tree then forceupdate. 

class App extends React.Component {
  state = {
    tree: new Node('papa smurf', 'https://vignette.wikia.nocookie.net/smurfs/images/b/bd/Papa_Smurf123.png/revision/latest?cb=20130805130238')
  }

  _handleAddMemember = (self) => {
    const newMemeber = new Node('Schleich smurf', 'https://www.smurf.com/images/brainy-news.png')
    const newSelfChildren = [...self.children, newMemeber]
    self.children = newSelfChildren
    this.forceUpdate()
  }

  _handleDeleteMemember = (parent, index) => {
    const newParentChildren = [...parent.children]
    newParentChildren.splice(index, 1)
    parent.children = newParentChildren
    this.forceUpdate()
  }

  MakeTree = (self, index, parent) => {
    const { children, name, photo, id } = self
    return (
      <div className="person">
        <div className="info">
          <img src={photo} />
          <p>{name}</p>
          <button onClick={() => this._handleAddMemember(self)} id={id}>Add</button>
          {/* <button>Edit</button> */}
          {index !== 'begin' && <button onClick={() => this._handleDeleteMemember(parent, index)}>delete</button>}
        </div>
        {children.length !== 0 &&
          <div className="row">
            {children.map((child, index) => this.MakeTree(child, index, self))}
          </div>
        }
      </div>
    )
  }

  render() {
    return (
      <div className="row" >
        {this.MakeTree(this.state.tree, 'begin', null)}
      </div>
    );
  }
}

export default App;