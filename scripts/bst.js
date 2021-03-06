//all code by Shawn O'Grady

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
export function BST(){
  var root=bstNode();
  var balancing=false;  //used to prevent unhelpful alerts when balancing tree

  function doInsert(input){
    if(isNaN(input)){
      if(balancing==false){
        alert("only numeric values are allowed in the tree");
      }
    }
    else{
      var newNode=bstNode();
      newNode.setValue(input);
      if(root.value==null){
        //list is empty
        root=newNode;
        return(input+" was added to the tree as the root");
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
            return leftInsert(newNode, search.tmp);
          }
          else{
            return rightInsert(newNode, search.tmp);
          }
        }
      }
    }
  }
  function leftInsert(newNode, parentNode){
    parentNode.setLeftChild(newNode);
    newNode.setParent(parentNode);
    return(newNode.value+" was added to the tree as the left child to "+ parentNode.value);
  }
  function rightInsert(newNode, parentNode){
    parentNode.setRightChild(newNode);
    newNode.setParent(parentNode);
    return(newNode.value+" was added to the tree as the right child to "+ parentNode.value);
  }

  function doSearch(input){
    //since this function is going to be to help insert+remove, it will be easier to make it iterative instead of recursive
    if(isNaN(input)){
      alert("please enter a numeric value");
    }
    else{
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
      else{
        alert("tree is empty, cannot search for a value");
      }
    }

  }

  function doRemove(input){
    /*
    for a removing a node from a BST we must consider all three cases:
      1. The node we are deleting has no child nodes
      2. The node we are deleting has a single child node
      3. The node we are deleting has two child nodes
    */
    if(isNaN(input)){
      alert("please enter a numeric value");
    }
    else{
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
          return (input+ " has been removed from the tree");
        }
        else{
          alert(input+" is not in the tree");
        }

      }
      else{
        alert("tree is empty, cannot remove anything")
      }
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
      treeString="tree contains(in-order):<br>"+treeString+doPrintInorder(root, treeString);
      return treeString;
    }
  }
  function doPrintInorder(node, treeString){
    //this function actually does the inorder printing
    //var inorderString=treeString;
    if(node.leftChild!=null){
      treeString=doPrintInorder(node.leftChild, treeString);
    }
    //alert(node.value);
    treeString=treeString+node.value+"<br>";
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
      treeString="tree contains(pre-order):<br>"+treeString+doPrintPreorder(root, treeString);
      return treeString;
    }
  }
  function doPrintPreorder(node,treeString){
    //this function actually does the preorder printing
    //alert(node.value);
    //treeString=treeString+node.value+"\r";
    treeString=treeString+node.value+"<br>";
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
      treeString="tree contains(post-order):<br>"+treeString+doPrintPostorder(root, treeString);
      return treeString;
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
    treeString=treeString+node.value+"<br>";
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
    else if(direction=="draw"){
      treeAPI.print=drawTree;
    }
    else{
      alert("invalid input");
    }
  }

  function getMaxDepth(){
    if(root.value==null){
      //alert("tree is empty");
    }
    else{
      return doGetMaxDepth(root);
    }
  }
  function doGetMaxDepth(node){
    //this actually finds the maximimum number of edges between the root and any node
    var leftDebth;
    var rightDepth;
    if(node.leftChild!=null){
      leftDebth=doGetMaxDepth(node.leftChild);
    }else{
      leftDebth=0;
    }
    if(node.rightChild!=null){
      rightDepth=doGetMaxDepth(node.rightChild);
    }else{
      rightDepth=0;
    }
    return Number(Math.max(rightDepth+1, leftDebth+1));
  }

  function drawTree(){
    if(root.value==null){
      //alert("tree is empty");
    }else{

      var treeString="";
      //treeString="var canvas = document.getElementById('myCanvas');var ctx = canvas.getContext('2d');ctx.font = '30px Arial';ctx.textAlign='center';"+doDrawTree(root, treeString);
      var treeDepth=doGetMaxDepth(root);
      //treeString=doDrawTree(root, treeString, 500, 50, treeDepth/3);

      if(treeDepth<6){
        treeString=doDrawTree(root, treeString, 500, 50, treeDepth/3, 1);
      }


      else{
        //treeString=doDrawTree(root, treeString, 500, 50, (15)/treeDepth);
        treeString=doDrawTree(root, treeString, 500, 50, (treeDepth+5)/(treeDepth), 1);
      }
      return treeString;

    }
  }
  function doDrawTree(node, treeString, width, height, hScale, vScale){
    //this function populates a string, which will contain the directions to draw the tree
    //a preorder traversal felt like it made sense
    var leftLine="";
    var rightLine="";
    treeString=treeString+"ctx.fillText('"+node.value+" ',"+width+","+height+");";
    if(node.leftChild!=null){
      leftLine="ctx.beginPath();"
      leftLine=leftLine+"ctx.moveTo("+width+","+height+");";
      //leftLine=leftLine+"ctx.lineTo("+(width-(100*hScale))+","+(height+30)+");";
      leftLine=leftLine+"ctx.lineTo("+(width-(140*hScale))+","+((height+50)*vScale)+");";
      leftLine=leftLine+"ctx.stroke();"
      treeString=treeString+leftLine;
      //alert(leftLine);
      treeString=doDrawTree(node.leftChild, treeString,width-(140*hScale), height+50,hScale/2,vScale);
    }
    if(node.rightChild!=null){
      rightLine="ctx.beginPath();"
      rightLine=rightLine+"ctx.moveTo("+width+","+height+");";
      rightLine=rightLine+"ctx.lineTo("+(width+(140*hScale))+","+((height+50)*vScale)+");";
      rightLine=rightLine+"ctx.stroke();"
      treeString=treeString+rightLine;
      treeString=doDrawTree(node.rightChild, treeString, width+(140*hScale), height+50,hScale/2,vScale);
    }

    return treeString;
  }

  function balanceTree(){
    if(root.value==null){
      alert("tree is empty");
    }
    else{
      var treeArray=[];
      treeArray=getTreeArray(root, treeArray);
      var treeSize=treeArray.length;  //number of elements in tree
      if(treeSize>2){
        var iteration=1;
        root=bstNode(); //basically clears the tree
        //doInsert(findMedian(treeArray, treeSize));  //insert median value as root
        balancing=true; //tell tree we are balancing
        doBalanceTree(treeArray, treeSize, iteration);
        balancing=false; //reset to normal behavior
        return "tree was balanced";
      }
      else{
        alert("tree must contain at least 3 values in order to balance");
      }
    }
  }
  function doBalanceTree(treeArray,treeSize, iteration){
    //this function actually balances the tree
    doInsert(findMedianValue(treeArray, treeSize));  //insert median value
    /*
    while(iteration<treeSize){
      iteration=iteration+1;
      doInsert(treeArray[((treeSize-1)/2)-(iteration)]);
      doInsert(treeArray[((treeSize-1)/2)+(iteration)]);
      //var newTreeArray=treeArray.slice(0, ((treeSize-1)/2)-1);
      //doBalanceTree(treeArray, treeSize, iteration);
    }
    */
    if(treeSize>1){
      var leftArray=treeArray.slice(0, findMedianIndex(treeSize));
      var rightArray=treeArray.slice(findMedianIndex(treeSize)+1, treeSize);
      doBalanceTree(leftArray, leftArray.length, iteration+1);
      doBalanceTree(rightArray, rightArray.length, iteration+1);
    }

  }

  function findMedianValue(treeArray, treeSize){
    //finds median value of a given array
    if(((treeSize-1)%2)!=0){
      //even # of elements in tree
      return treeArray[((treeSize-1)/2)+0.5];
    }
    else{
      return treeArray[((treeSize-1)/2)];
    }
  }
  function findMedianIndex(treeSize){
    //just finds the index of the median value for an array
    if(((treeSize-1)%2)!=0){
      //even # of elements in tree
      return ((treeSize-1)/2)+0.5;
    }
    else{
      return ((treeSize-1)/2);
    }
  }
  /*
  function getTreeInfo(){
    //this funtion will return information about the tree needed to balance the tree
    if(root.value==null){
      alert("tree is empty");
    }else{
      var treeArray=getTreeArray(root, treeArray);  //array which holds sorted values of tree
      return treeArray;
    }
  }
  */
  function getTreeArray(node, treeArray){
    //this function pushes value of the tree into an array, using an inorder traversal
    if(node.leftChild!=null){
      treeArray=getTreeArray(node.leftChild, treeArray);
    }
    //alert(node.value);
    treeArray.push(node.value);
    //treeArray[treeArray.length]=node.value;
    if(node.rightChild!=null){
      treeArray=getTreeArray(node.rightChild, treeArray);
    }
    return treeArray;
  }
  var treeAPI={
    insert:doInsert,
    print:printInorder,  //print in order by default
    changePrint:changePrint,
    search:doSearch,
    remove:doRemove,
    getMaxDepth:getMaxDepth,
    balance:balanceTree
  };
  return treeAPI;
}
