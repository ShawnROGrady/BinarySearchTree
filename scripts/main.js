/*
  Code by Shawn O'Grady
  This file is responsible for taking the user input
  +The goal is to allow the user to perform all the following through forms on a webpage:
    1. insert a value
    2. remove a value
    3. print the entire tree (inorder, preorder, or postorder)
    4. search the tree for a specific value
    5. close the program
*/
//using strict mode for safety
"use strict";
import {BST} from "./bst.js";

var tree= BST();  //the binary search tree

var lastAction=document.getElementById("lastAction"); //paragraph diplaying last valid operation performed on the tree
//the various buttons:
var startButton=document.getElementById('start');
var insertButton=document.getElementById("insertEnter");
var removeButton=document.getElementById("removeEnter");
var searchButton=document.getElementById("searchEnter");
var printButton=document.getElementById("printEnter");
var terminateButton=document.getElementById("terminateEnter");

startButton.onclick=function(){
  startButton.style.display="none";
  document.querySelector('h2').textContent="Choose from the following:"; //change initial instruction
  document.getElementById("welcome").style.display="none"; //hide program info
  document.querySelector('ol').style.display="none";
  //display all forms:
  document.getElementById('addNode').style.display="block";
  document.getElementById('removeNode').style.display="block";
  document.getElementById('printTree').style.display="block";
  document.getElementById('searchNode').style.display="block";
  document.getElementById('terminateProgram').style.display="block";
  //create last action header+give starting state
  document.querySelector('h3').textContent="Last action:";
  lastAction.textContent="no valid operations have been performed yet";
}

insertButton.onclick=function(){
  var insert=document.getElementById('addNode');
  var userInput=insert.elements[0].value;
  insert.elements[0].value=""; //clear form
  var action=tree.insert(Number(userInput));
  if(action!=null){
    lastAction.textContent=action;  //update last action paragraph
  }
}
removeButton.onclick=function(){
  var remove=document.getElementById('removeNode');
  var userInput=remove.elements[0].value;
  remove.elements[0].value=""; //clear form
  var action=tree.remove(Number(userInput));
  if(action!=null){
    lastAction.textContent=action;  //update last action paragraph
  }
}
searchButton.onclick=function(){
  var search=document.getElementById('searchNode');
  var userInput=search.elements[0].value;
  search.elements[0].value=""; //clear form
  var action=tree.search(Number(userInput));
  if(action!=null){
    //there are things in tree+user entered valid input
    if(tree.search(Number(userInput)).found){
      //value was in list
      lastAction.textContent=(userInput+" is in the tree");
    }else{
      //not in list
      lastAction.textContent=(userInput+" is not in the tree");
    }
  }
}
printButton.onclick=function(){
  var print=document.getElementById('printTree');
  var treeContents; //this is a string, returned by the print function
  if(print.elements[0].checked){
    //inorder button pressed
    tree.changePrint("in");
    treeContents=tree.print();
    if(treeContents!=null){
      lastAction.innerHTML=treeContents;
    }
  }
  else if(print.elements[1].checked){
    //preorder button pressed
    tree.changePrint("pre");
    treeContents=tree.print();
    if(treeContents!=null){
      lastAction.innerHTML=treeContents;
    }
  }
  else if(print.elements[2].checked){
    //postorder button pressed
    tree.changePrint("post");
    treeContents=tree.print();
    if(treeContents!=null){
      lastAction.innerHTML=treeContents;
    }
  }
  else{
    //user did not press either button
    alert("please select a direction");
  }
}
terminateButton.onclick=function(){
  document.querySelector('h2').textContent="Thank you for using this program"; //change from initial instruction
  //hide all forms
  document.getElementById('addNode').style.display="none";
  document.getElementById('removeNode').style.display="none";
  document.getElementById('printTree').style.display="none";
  document.getElementById('searchNode').style.display="none";
  document.getElementById('terminateProgram').style.display="none";
  //hide last action field
  document.querySelector('h3').style.display="none";
  lastAction.style.display="none"
}
