#!/bin/bash
git fetch origin
git merge origin/master
sudo node app.js
