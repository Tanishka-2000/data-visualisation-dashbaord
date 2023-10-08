import { useState } from "react";
import { CssBaseline, Stack } from "@mui/material";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { SideBar, Board } from './components'

const dark = createTheme({
  palette: {
    mode: 'dark'
  }
})

const light = createTheme({
  palette: {
    mode: 'light'
  }
})

function App() {
  const [darkMode, setDarkMode] = useState(false)
  const [openSide, setOpenSide] = useState(false)

  return (
    <ThemeProvider theme={darkMode ? dark : light}>
      <CssBaseline />
      <Stack direction='row'>
        <SideBar openSide={openSide} setOpenSide={setOpenSide}/>
        <Board darkMode={darkMode} setDarkMode={setDarkMode} setOpenSide={setOpenSide} />
      </Stack>
    </ThemeProvider>
    )
}

export default App
