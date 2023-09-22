import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { SnackbarProvider } from "notistack";
import { WagmiConfig } from "wagmi";
import "../utils/i18n";
import { RecoilRoot } from "recoil";
import AppMain from "./AppMain";
import { wagmiConfig } from "../constant/wagmiState";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#8061FF",
    },
  },
});

function App() {
  return (
    <RecoilRoot>
      <SnackbarProvider
        autoHideDuration={5000}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <WagmiConfig config={wagmiConfig}>
            <AppMain />
          </WagmiConfig>
        </ThemeProvider>
      </SnackbarProvider>
    </RecoilRoot>
  );
}

export default App;
