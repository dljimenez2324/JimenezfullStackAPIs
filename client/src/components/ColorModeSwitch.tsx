// use switch to toggle light and dark mode

import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { HStack, Text, useColorMode } from "@chakra-ui/react"

const ColorModeSwitch = () => {

    const {toggleColorMode, colorMode} = useColorMode();


  return (
    <>
        <HStack justifyContent={"end"} m={5}>
            {/* NOTICE LIGHT AND DARK MODE TOGGLE AND TURNERY */}
            {/* <Switch isChecked={colorMode === 'dark'} onChange={toggleColorMode}/> */}
            {colorMode === 'dark' ? <Text whiteSpace={"nowrap"}><MoonIcon onClick={toggleColorMode} m={3} />Dark</Text> : <Text whiteSpace={"nowrap"}><SunIcon onClick={toggleColorMode} m={3} />Light</Text> }
        </HStack>
    </>
  )
}

export default ColorModeSwitch