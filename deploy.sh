#!/usr/bin/env bash

if [ -z "$1" ]; then
	MSG="$RANDOM"
else
	MSG="$1"
fi

echo "Prettier"
npm run prettier &&

echo "Linter"
npm run lint &&

echo "Compiler"
npx tsc &&

echo "Git"
git add -A &&
git commit -m "$MSG" &&
git push -u origin develop

