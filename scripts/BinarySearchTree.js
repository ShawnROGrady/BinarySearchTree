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
  -search for a value
  -remove a value
  -all from user input
*/

"use strict";

//Node for Binary Search Tree
function bstNode(){
  var value;
  var parent, leftChild, rightChild;
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
      alert(input+" was added to the tree as the root");
    }
    else{
      var tmp=root;
      var parent=root;
      var search=doSearch(input);
      if(search.found==true){
        //value already in tree
        alert(input + " is already in the tree");
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
    alert(newNode.value+" was added to the tree as the left child to "+ parentNode.value);
  }
  function rightInsert(newNode, parentNode){
    parentNode.setRightChild(newNode);
    newNode.setParent(parentNode);
    alert(newNode.value+" was added to the tree as the right child to "+ parentNode.value);
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
          removeNoChild(search.tmp, search.parent);
        }
        else if(search.tmp.leftChild!=null && search.tmp.rightChild==null){
          //Case 2(a): node only has left child node
          removeLeftChild(search.tmp, search.parent);
        }
        else if(search.tmp.leftChild==null && search.tmp.rightChild!=null){
          //Case 2(b): node only has right child node
          removeRightChild(search.tmp, search.parent);
        }
        else{
          //Case 3: parent has two children
          var subTreeMin=findSubTreeMin(search.tmp.rightChild);
          removeTwoChild(search.tmp, subTreeMin.value); //set nodes value to that of its right subtree's minimum
          //delete node w/ right subtree's minimum
          if(subTreeMin.rightChild==null){
            removeNoChild(subTreeMin, subTreeMin.parent);
          }
          else{
            removeRightChild(subTreeMin, subTreeMin.parent);
          }

        }
        alert(input+ " has been removed from the tree");
      }
      else{
        alert(input+" is not in the tree");
      }

    }
    else{
      alert("tree is empty, cannot remove anything")
    }
  }

  function removeNoChild(tmp, parent){
    if(tmp==root){
      //special case of deleting last node from tree
      root=bstNode();
    }
    else{
      if(tmp.value<parent.value){
        //node to delete is left child
        parent.setLeftChild(null);
        tmp.setParent(null);
      }
      else{
        //node to be deleted is right child
        parent.setRightChild(null);
        tmp.setParent(null);
      }
    }
    //console.log(tmp.value+" has been removed from the tree");
  }
  function removeLeftChild(tmp, parent){
    if(tmp.value<parent.value){
      //node to delete is left child
      parent.setLeftChild(tmp.leftChild);
      tmp.setParent(null);
      tmp.leftChild.setParent(parent);
      if(tmp==root){
        //need to readjust if deleting the root
        root=tmp.leftChild;
      }
    }
    else{
      //node to be deleted is right child
      parent.setRightChild(tmp.leftChild);
      tmp.setParent(null);
      tmp.leftChild.setParent(parent);
      if(tmp==root){
        //need to readjust if deleting the root
        root=tmp.rightChild;
      }
    }
    //console.log(tmp.value+" has been removed from the tree");
  }

  function removeRightChild(tmp, parent){
    if(tmp.value<parent.value){
      //node to delete is left child
      parent.setLeftChild(tmp.rightChild);
      tmp.setParent(null);
      tmp.rightChild.setParent(parent);
      if(tmp==root){
        //need to readjust if deleting the root
        root=tmp.leftChild;
      }
    }
    else{
      //node to be deleted is right child
      parent.setRightChild(tmp.rightChild);
      tmp.setParent(null);
      tmp.rightChild.setParent(parent);
      if(tmp==root){
        //need to readjust if deleting the root
        root=tmp.rightChild;
      }
    }
    //console.log(tmp.value+" has been removed from the tree");
  }
  function removeTwoChild(tmp, rightTreeMin){
    var tmpValue=tmp.value;
    tmp.setValue(rightTreeMin);
    //console.log(tmpValue+" has been removed from the tree");
  }
  function findSubTreeMin(node){
    //this function finds the node of minimum value in the subtree starting with the node passed as an argument
    while(node.leftChild!=null){
      node=node.leftChild;
    }
    //alert(node.value);
    return node;
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
      alert("tree is empty")
    }else{
      var treeString="";
      treeString="tree contains(in-order):\r"+treeString+doPrintInorder(root, treeString);
      alert(treeString);
    }
  }
  function doPrintInorder(node, treeString){
    //this function actually does the inorder printing
    //var inorderString=treeString;
    if(node.leftChild!=null){
      treeString=doPrintInorder(node.leftChild, treeString);
    }
    //alert(node.value);
    treeString=treeString+node.value+"\r";
    if(node.rightChild!=null){
      treeString=doPrintInorder(node.rightChild, treeString);
    }
    return treeString;
  }

  function printPreorder(){
    /*
    for preorder printing nodes are visited as:
      i) parent
      ii) left
      iii) right
    */
    if(root.value==null){
      alert("tree is empty");
    }else{
      var treeString="";
      treeString="tree contains(pre-order):\r"+treeString+doPrintPreorder(root, treeString);
      alert(treeString);
    }
  }
  function doPrintPreorder(node,treeString){
    //this function actually does the preorder printing
    //alert(node.value);
    //treeString=treeString+node.value+"\r";
    treeString=treeString+node.value+"\r";
    if(node.leftChild!=null){
      treeString=doPrintPreorder(node.leftChild, treeString);
    }
    if(node.rightChild!=null){
      treeString=doPrintPreorder(node.rightChild, treeString);
    }
    return treeString;
  }

  function printPostorder(){
    /*
    for preorder printing nodes are visited as:
      i) left
      ii) right
      iii) parent
    */
    if(root.value==null){
      alert("tree is empty");
    }else{
      var treeString="";
      treeString="tree contains(post-order):\r"+treeString+doPrintPostorder(root, treeString);
      alert(treeString);
    }
  }
  function doPrintPostorder(node, treeString){
    //this function actually does the postorder printing
    if(node.leftChild!=null){
      treeString=doPrintPostorder(node.leftChild, treeString);
    }
    if(node.rightChild!=null){
      treeString=doPrintPostorder(node.rightChild, treeString);
    }
    treeString=treeString+node.value+"\r";
    return treeString;
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

//main function:
(function main(){
  var tree=BST();
  var choice;
  var userInput
  do{
    choice=prompt("What would you like to do? \r 1. insert a value to the tree \r 2. remove a value from the tree \r 3. print the tree \r 4. search the tree \r 5. terminate program");
    if(choice==1){
      //insert value
      userInput=prompt("enter a value to add to the tree");
      tree.insert(Number(userInput));
    }
    else if(choice==2){
      //remove a value
      userInput=prompt("enter a value to remove from the tree");
      tree.remove(Number(userInput));
    }
    else if(choice==3){
      //print list
      var dir=prompt("how do you wish to print (\"in\", \"pre\" or \"post\")?");
      tree.changePrint(dir);
      tree.print();
    }
    else if(choice==4){
      //search the list
      userInput=prompt("enter a value to search for");
      if(tree.search(Number(userInput)).found){
        //value was in list
        alert(userInput+" is in the tree");
      }else{
        //not in list
        alert(userInput+" is not in the tree");
      }
    }
    else if(choice==5||choice==null){
      //close program
      alert("thank you for using this program");
    }
    else{
      //invalid choice
      alert("please enter a valid choice");

    }
  }while(choice!=5 && choice!=null);

})();
/*
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
//tree.print();   //1 2 3 4 5 6 7

//testing other prints:
tree.changePrint("pre");
//tree.print(); //4 2 1 3 6 5 7
tree.changePrint("post");
//tree.print(); //1 3 2 5 7 6 4

//testing removing nodes w/ no children
tree.remove(8); //8 is not in the tree
tree.remove(1);
tree.remove(7);
//tree.print(); //2 3 4 5 6

//removing nodes w/ one child
tree.remove(2);
tree.remove(6);
tree.print(); //3 4 5
tree.remove(5);
tree.remove(4);
tree.remove(3);
//tree.print(); //tree is empty

//populating new tree:
tree.insert(10);
tree.insert(14);
tree.insert(6);
tree.insert(4);
tree.insert(8);
tree.insert(3);
tree.insert(5);
tree.insert(7);
tree.insert(9);
tree.print(); //3 4 5 6 7 8 9 10 14

//deleting nodes w/ two children
tree.remove(6);
tree.remove(4);
tree.remove(7);
//tree.print(); //3 5 8 9 10 14

//deleting root node:
tree.remove(10);
//tree.print(); //3 5 8 9 14
tree.changePrint("pre");
tree.print(); //14 8 5 3 9
*/
