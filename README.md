# BinarySearchTree
Implementation a binary search tree in JavaScript

I am just starting to learn JavaScript and figured a good way to familarize myself with the new language was to make something similar to what I have made in the past with C++ (language I have the most experience with)

A binary search tree is actually pretty similar to a sorted linked list in many ways but has many more cases to consider, especially when removing a node. Although I have seen it done the other way, I am writing my removal algorithm such that if the node to be deleted has two child nodes, the node to be deleted is replaced by the minimimum of its right subtree.

For the sake of simplicity, I am only considering the case where all values in the tree are **numbers**.

My end goal is to implement a binary search tree that takes user input to perform the following seven functions:
  1. insert a value to the tree
  2. remove a value from the tree
  3. print the entire tree (inorder, preorder, or postorder)
  4. draw the tree on a webpage
  5. balance the tree
  6. search the tree for a specified value
  7. close the program

This program is intended for personal education, and I plan on updating it as I learn more concepts in JavaScript


Along with this README file, this repository contains:
  1. an html file to run JavaScript files and provide forms to take user input
  2. a folder named scripts which contains the following JavaScript files:
    * bst.js which contains the implementation of the sorted doubly linked list data structure
    * main.js which handles all user input
    * BinarySearchTree.js which is not actually used, but can be easily copy/pasted to the console for testing
 
This program is intended for personal education, and I plan on updating it as I learn more 

I have been testing this program in **Google Chrome(Version 63.0.3239.84)** using a local testing server. Local server was set up using Python's SimpleHTTPServer module. This program makes use of module features added in ES6, so it may not run in older browsers.
