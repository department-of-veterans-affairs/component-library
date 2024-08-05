#!/bin/sh

# Takes a codeowner team_name and provides the names of members of that team
# Call like this: ./codeowner-scan.sh <team_name>
# e.g. ./codeowner-scan.sh platform_design_system_team

if [ $# -eq 0 ]; then
  echo >&2 "No team name provided, please call as './codeowner-scan.sh <team_name>'"
  exit 1
fi

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
