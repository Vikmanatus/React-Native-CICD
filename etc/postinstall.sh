#!/usr/bin/env bash

user_platform="$(uname)"

if [ $user_platform == "Darwin" ]
then
    echo "You are currently using a MacOs computer"
    npx jetify && cd ios/ && pod install
else
    echo "You are currently using a Windows or Linux computer"
    npx jetify
fi