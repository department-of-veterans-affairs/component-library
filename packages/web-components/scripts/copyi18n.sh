#!/bin/sh

FROM="../core/src/i18n"

TO="./src"

if [! -d "$TO"]; then
  mkdir -p "$TO"

  cp -a "$FROM" "$TO"
fi