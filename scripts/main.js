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
  document.getElementById('addNode').style.display="block";
  document.getElementById('removeNode').style.display="block";
  document.getElementById('printTree').style.display="block";
  document.getElementById('searchNode').style.display="block";
  document.getElementById('terminateProgram').style.display="block";
}

insertButton.onclick=function(){
  var insert=document.getElementById('addNode');
  var userInput=insert.elements[0].value;
  tree.insert(Number(userInput));
  insert.elements[0].value=""; //clear form
}

printButton.onclick=function(){
  var print=document.getElementById('printTree');
  var treeContents; //this is a string, returned by the print function
  if(print.elements[0].checked){
    //inorder button pressed
    tree.changePrint("in");
    //listContents=list.print();
    tree.print();
  }
  else if(print.elements[1].checked){
    //preorder button pressed
    tree.changePrint("pre");
    //listContents=list.print();
    tree.print();
  }
  else if(print.elements[2].checked){
    //postorder button pressed
    tree.changePrint("post");
    //listContents=list.print();
    tree.print();
  }
  else{
    //user did not press either button
    alert("please select a direction");
  }
}
