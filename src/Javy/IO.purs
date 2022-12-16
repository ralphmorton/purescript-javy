module Javy.IO (
  readStdin,
  writeStdout
) where

import Prelude

import Effect (Effect)

-- Read all available bytes from stdin as a string
foreign import readStdin :: Effect String

-- Write string to stdout
foreign import writeStdout :: String -> Effect Unit
