import { Box, Button, Divider, Grid, List, ListItem, Paper, Stack, Tab, Tabs, TextField, Typography } from "@mui/material";
import { tab } from "@testing-library/user-event/dist/tab";
import { useState } from "react";
import AssetsEditor from "./AssetsEditor";
import DebtsEditor from "./DebtsEditor";


interface IAssetsAndDebtsEditorProps {
    assets: any[]
    debts: any[]
    setAssets: any
    setDebts: any
    addNetWorthReport: any
}

const AssetsAndDebtsEditor = (props:IAssetsAndDebtsEditorProps) => {

    const [tabIndex, setTabIndex] = useState(0)

    const handleTabChange = (event: React.SyntheticEvent, index: number) => {
        setTabIndex(index)
    }

    return (
        <Stack height="100%">
            <Tabs onChange={handleTabChange} value={tabIndex}>
                <Tab label="Assets"></Tab>
                <Tab label="Debts"></Tab>
            </Tabs>
            <Box height="100%">
                {tabIndex === 0 && (
                    <AssetsEditor assets={props.assets} setAssets={props.setAssets} addNetWorthReport={props.addNetWorthReport} />
                )}
                {tabIndex === 1 && (
                    <DebtsEditor debts={props.debts} setDebts={props.setDebts} addNetWorthReport={props.addNetWorthReport} />
                )}  
            </Box>
        </Stack>
        
    )
}

export default AssetsAndDebtsEditor;