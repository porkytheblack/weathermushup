import {extendTheme} from "@chakra-ui/react"
import {createBreakpoints} from "@chakra-ui/theme-tools"

const breakpoints = createBreakpoints({
    base: "0px",
    xs: "360px",
    sm: "479px",
    md: "768px",
    lg: "991px",
    xl: "1024",
    xxl: "1280",
})

export const theme = extendTheme({
    initialColorMode: "light",
    useSystemColorMode: false,
    breakpoints
})