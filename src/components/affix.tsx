import ScrollTop from "./scrolltop"
import { Fab } from '@mui/material'
import { KeyboardArrowUp } from "@mui/icons-material"

const Affix = () => {
    return (
        <>
            <ScrollTop >
                <Fab size="small" aria-label="scroll back to top">
                    <KeyboardArrowUp />
                </Fab>
            </ScrollTop>
        </>
    )
}

export default Affix