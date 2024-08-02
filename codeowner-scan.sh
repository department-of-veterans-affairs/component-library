#!/bin/sh

RETJSON=$(gh api \
  -H "Accept: application/vnd.github+json" \
  /orgs/department-of-veterans-affairs/teams/$1/members)

echo $RETJSON | jq '.[].id' | while read -r userid; do
  USERINFO=$(gh api \
    -H "Accept: application/vnd.github+json" \
    /user/$userid)
  USERNAME=$(echo $USERINFO | jq '.name')
  echo $USERNAME
done
