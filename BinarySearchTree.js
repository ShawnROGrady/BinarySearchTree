//Code By Shawn O'Grady

/*
+In trying to learn JS I am trying to implement some common data structures

+This is my attempt at a binary search tree
+Values in the tree will be of number type
  -just so sorting makes sense
+No duplicate values allowed for now

+When removing a node with two children, the node will be replaced with the minimum value of its right subtree

+End goal is to have user enter prompts (in main function) in order to perform the following functions:
  1. insert a value to the tree
  2. remove a value from the tree
  3. print the entire tree (inorder, preorder, or postorder)
  4. search the tree for a specified value
  5. close the program

+I currently believe I can:
  -insert values
  -print the tree inorder, preorder and postorder
*/

"use strict";

//Node for Binary Search Tree
function bstNode(){
  var value;
  var parent, leftChild, rightChild;  //probably don't need to have parent
  var duplicate;  //not used for now

  function doSetLeftChild(newNode){
    this.leftChild=newNode;
  }
  function doSetRightChild(newNode){
    this.rightChild=newNode;
  }
  function doSetParent(newNode){
    this.parent=newNode;
  }
  function doSetValue(input){
    this.value=input;
  }
  var NodeAPI={
    setRightChild:doSetRightChild,
    setLeftChild:doSetLeftChild,
    setParent:doSetParent,
    setValue:doSetValue
  };

  return NodeAPI;

}

//Binary search Tree
function BST(){
  var root=bstNode();

  function doInsert(input){
    var newNode=bstNode();
    newNode.setValue(input);
    if(root.value==null){
      //list is empty
      root=newNode;
      console.log(input+" was added to the tree as the root");
    }
    else{
      var tmp=root;
      var parent=root;
      var search=doSearch(input);
      if(search.found==true){
        //value already in tree
        console.log(input + " is already in the tree");
      }
      else{
        if(input<search.tmp.value){
          leftInsert(newNode, search.tmp);
        }
        else{
          rightInsert(newNode, search.tmp);
        }
      }
    }
  }
  function leftInsert(newNode, parentNode){
    parentNode.setLeftChild(newNode);
    newNode.setParent(parentNode);
    console.log(newNode.value+" was added to the tree as the left child to "+ parentNode.value);
  }
  function rightInsert(newNode, parentNode){
    parentNode.setRightChild(newNode);
    newNode.setParent(parentNode);
    console.log(newNode.value+" was added to the tree as the right child to "+ parentNode.value);
  }

  function doSearch(input){
    //since this function is going to be to help insert+remove, it will be easier to make it iterative instead of recursive
    var found=false;
    var tmp=root;
    var parent=tmp;
    if(root.value!=null){
      while(true){
        if(input<tmp.value){
          if(tmp.leftChild!=null){
            parent=tmp;
            tmp=tmp.leftChild;
          }
          else{
            break;
          }
        }
        else if(input>tmp.value){
          if(tmp.rightChild!=null){
            parent=tmp;
            tmp=tmp.rightChild;
          }
          else{
            //tmp has the value we searched for
            break;
          }
        }
        else{
          //found it
          found=true;
          break;
        }
      }
      //now, tmp is either the node holding the value we searched for, or is the node that would be that value's parent
      var searchInfo={
        found:found,
        tmp:tmp,
        parent:parent
      };
      return searchInfo;
    }
  }

  function doRemove(input){
    /*
    for a removing a node from a BST we must consider all three cases:
      1. The node we are deleting has no child nodes
      2. The node we are deleting has a single child node
      3. The node we are deleting has two child nodes
    */
    if(root.value!=null){
      //there are things in the tree
      var search=doSearch(input)
      if(search.found==true){
        //value is in the tree
        if(search.tmp.leftChild==null && search.tmp.rightChild==null){
          //Case 1: node has no child nodes
          if(search.tmp==root){
            //special case of deleting last node from tree
            root=bstNode();
          }
          else{
            if(search.tmp.value<search.parent.value){
              //node to delete is left child
              search.parent.setLeftChild(null);
              search.tmp.setParent(null);
            }
            else{
              //node to be deleted is right child
              search.parent.setRightChild(null);
              search.tmp.setParent(null);
            }
          }
        }
      }
      else{
        console.log(input+" is not in the tree");
      }

    }
    else{
      console.log("tree is empty, cannot remove anything")
    }
  }

  function printInorder(){
    /*
    for printing inorder nodes are visited as:
      i) left
      ii) parent
      iii) right
    This is also the sorted order
    */
    if(root.value==null){
      console.log("tree is empty")
    }else{
      doPrintInorder(root);
    }
  }
  function doPrintInorder(node){
    //this function actually does the inorder printing
    if(node.leftChild!=null){
      doPrintInorder(node.leftChild);
    }
    console.log(node.value);
    if(node.rightChild!=null){
      doPrintInorder(node.rightChild);
    }
  }

  function printPreorder(){
    /*
    for preorder printing nodes are visited as:
      i) parent
      ii) left
      iii) right
    */
    if(root.value==null){
      console.log("tree is empty");
    }else{
      doPrintPreorder(root);
    }
  }
  function doPrintPreorder(node){
    //this function actually does the preorder printing
    console.log(node.value);
    if(node.leftChild!=null){
      doPrintPreorder(node.leftChild);
    }
    if(node.rightChild!=null){
      doPrintPreorder(node.rightChild);
    }
  }

  function printPostorder(){
    /*
    for preorder printing nodes are visited as:
      i) left
      ii) right
      iii) parent
    */
    if(root.value==null){
      console.log("tree is empty");
    }else{
      doPrintPostorder(root);
    }
  }
  function doPrintPostorder(node){
    //this function actually does the postorder printing
    if(node.leftChild!=null){
      doPrintPostorder(node.leftChild);
    }
    if(node.rightChild!=null){
      doPrintPostorder(node.rightChild);
    }
    console.log(node.value);
  }

  function changePrint(direction){
    if(direction=="in"||direction=="In"){
      treeAPI.print=printInorder;
    }
    else if(direction=="pre"||direction=="Pre"){
      treeAPI.print=printPreorder;
    }
    else if(direction=="post"||direction=="Post"){
      treeAPI.print=printPostorder;
    }
    else{
      alert("invalid input");
    }
  }
  var treeAPI={
    insert:doInsert,
    print:printInorder,  //print in order by default
    changePrint:changePrint,
    search:doSearch,
    remove:doRemove
  };
  return treeAPI;
}

//testing basic functionality
var tree=BST();
tree.print();   //"tree is empty"
tree.insert(4); //new root
tree.insert(2); //leftchild to root
tree.insert(6); //rightChild to root

//ading more nodes:
tree.insert(1);
tree.insert(3);
tree.insert(5);
tree.insert(7);
tree.insert(4); //4 is already in the tree
tree.insert(2); //2 is already in the tree
tree.insert(6); //6 is already in the tree
tree.print();   //1 2 3 4 5 6 7
/*
//testing other prints:
tree.changePrint("pre");
//tree.print(); //4 2 1 3 6 5 7
tree.changePrint("post");
//tree.print(); //1 3 2 5 7 6 4
*/
//testing removing nodes w/ no children
tree.remove(8); //8 is not in the tree
tree.remove(1);
tree.remove(7);
tree.print(); //2 3 4 5 6
