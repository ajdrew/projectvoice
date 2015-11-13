#!/bin/bash
git fetch origin development:developnt
git merge origin/development
sudo node app.js
