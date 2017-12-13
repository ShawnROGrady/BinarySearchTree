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

startButton.onclick=function(){
  startButton.style.display="none";
  document.querySelector('h2').textContent="Choose from the following:"; //change initial instruction
  document.getElementById("welcome").style.display="none"; //hide program info
  document.querySelector('ol').style.display="none";
  document.getElementById('mainForm').style.visibility='visible';
}
