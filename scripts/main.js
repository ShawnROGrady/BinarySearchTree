/*
  Code by Shawn O'Grady
  This file is responsible for taking the user input
  +The goal is to allow the user to perform all the following through forms on a webpage:
    1. insert a value
    2. remove a value
    3. print the entire tree (inorder, preorder, or postorder)
    4. search the tree for a specific value
    5. balance the tree
    6. close the program
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
var autoButton=document.getElementById('auto');
var hideButton=document.getElementById("hide"); //button to hide tree drawing
var balanceButton=document.getElementById('balanceTree');
//canvas elements:
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var auto;

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
  document.getElementById('balanceTree').style.display="block";
  document.getElementById('terminateProgram').style.display="block";
  //create last action header+give starting state
  document.querySelector('h3').textContent="Last action:";
  lastAction.textContent="no valid operations have been performed yet";
  auto=false; //default
  autoButton.style.display="none";
}
autoButton.onclick=function(){
  //basically same as start button but sets value of auto to true
  startButton.style.display="none";
  document.querySelector('h2').textContent="Choose from the following:"; //change initial instruction
  document.getElementById("welcome").style.display="none"; //hide program info
  document.querySelector('ol').style.display="none";
  //display all forms:
  document.getElementById('addNode').style.display="block";
  document.getElementById('removeNode').style.display="block";
  document.getElementById('printTree').style.display="block";
  document.getElementById('searchNode').style.display="block";
  document.getElementById('balanceTree').style.display="block";
  document.getElementById('terminateProgram').style.display="block";
  //create last action header+give starting state
  document.querySelector('h3').textContent="Last action:";
  lastAction.textContent="no valid operations have been performed yet";
  autoButton.style.display="none";
  auto=true;
  document.getElementById("myCanvas").style.display="block";
  //document.getElementById('printTree').innerHTML="3. Print the tree<br><input type='radio' name='direction' value='in'> Inorder (nodes visited left-parent-right)<br><input type='radio' name='direction' value='pre'> Preorder (nodes visited parent-left-right)<br><input type='radio' name='direction' value='post'> Postorder (nodes visited left-right-parent)<br><input type='radio' id='drawRadio' name='direction' value='draw'> Draw the tree<br>  <input type='button'  id='printEnter' value='print'><br><br>";
}
insertButton.onclick=function(){
  var insert=document.getElementById('addNode');
  var userInput=insert.elements[0].value;
  var userArray=userInput.split(",");
  insert.elements[0].value=""; //clear form
  for(var i=0; i<userArray.length; i++){
    var action=tree.insert(Number(userArray[i]));
  }
  if(action!=null){
    lastAction.textContent=action;  //update last action paragraph
  }
  if(auto){
    autoDraw();
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
  if(auto){
    autoDraw();
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
  else if(print.elements[3].checked){
    //drawing the tree
    document.getElementById("myCanvas").style.display="block";
    if(auto==false){
      document.getElementById("hide").style.display="block";
    }
    tree.changePrint("draw");
    tree.changePrint("draw");
    //alert(tree.getMaxDepth());
    var treeDepth=tree.getMaxDepth();
    ctx.strokeStyle='red';
    ctx.textBaseline="middle";
    if(treeDepth<6){
      ctx.font = "30px Arial";
    }
    else {
      ctx.font = ((500)/(treeDepth*treeDepth))+"px Arial";
      //ctx.scale(0.5,0.5);
    }

    ctx.textAlign='center';
    treeContents=tree.print();
    //alert(treeContents);
    ctx.clearRect(0, 0, 1000, 500); //clear prior canvas drawing
    eval(treeContents);
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
  document.getElementById("hide").style.display="none";
  document.getElementById('balanceTree').style.display="none";
  //hide last action field
  document.querySelector('h3').style.display="none";
  lastAction.style.display="none"
  //hide canvas
  document.getElementById("myCanvas").style.display="none";
}
hideButton.onclick=function(){
  document.getElementById("myCanvas").style.display="none";
  document.getElementById("hide").style.display="none";
}
function autoDraw(){
  //drawing the tree
  var treeContents;
  tree.changePrint("draw");
  //alert(tree.getMaxDepth());
  var treeDepth=tree.getMaxDepth();
  ctx.strokeStyle='red';
  ctx.textBaseline="middle";
  if(treeDepth<6){
    ctx.font = "30px Arial";
  }
  else {
    ctx.font = ((500)/(treeDepth*treeDepth))+"px Arial";
    //ctx.scale(0.5,0.5);
  }

  ctx.textAlign='center';
  treeContents=tree.print();
  //alert(treeContents);
  ctx.clearRect(0, 0, 1000, 500); //clear prior canvas drawing
  eval(treeContents);
}
balanceButton.onclick=function(){
  var action=tree.balance();
  if(action!=null){
    //balance was successful
    lastAction.textContent=action;  //update last action paragraph
  }
  if(auto){
    autoDraw();
  }
}
