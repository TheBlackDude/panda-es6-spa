#!/bin/sh

set -e

show_help() {
  echo """
  Commands
  --------------------------------------------
  start_dev    : start the webpack dev server
  test         : run the tests
  build_dev    : build webpack
  """
}

case "$1" in
  "start_dev" )
   # run the dev server
   yarn start
  ;;
  "test" )
   # run all the tests
   yarn test
  ;;
  "build_dev" )
   # build files
   yarn webpack
  ;;
  * )
   show_help
  ;;
esac
