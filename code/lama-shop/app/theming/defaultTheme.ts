import { createTheme, responsiveFontSizes } from "@mui/material";
import type {Theme as MaterialUiTheme} from '@mui/material';

declare module '@emotion/react' {
    export interface Theme extends MaterialUiTheme{}
}

export default responsiveFontSizes(createTheme());