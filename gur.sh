#!/bin/bash
git fetch origin
git merge origin/master
sudo forever restart app.js
