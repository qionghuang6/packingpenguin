import { useState } from 'react'
import { FormControlLabel, Box, Button, TextField, Grid, Typography, Switch, useMediaQuery } from '@material-ui/core';
import { changeCategoryExistence, generateUniqueId } from '../util/utilFunctions'
import Category from './category'
import Sharelink from './sharelink'
import { useStickyMongoState } from '../util/customHooks';
import { Add } from '@material-ui/icons';
import Loading from './loading.js'
import ClearChecklistButton from './buttons/clearChecklistButton';
import MoreChecklistsButton from './buttons/moreChecklistsButton';
import ChecklistDropdown from './buttons/checklistDropdown';

const Checklist = ({ source, setChecklistId }) => {
    if (!source) {
        return <Loading />
    }
    if (source === 'error') {
        return <Typography variant="h4">404 Checklist Not Found</Typography>
    }

    const {
        name,
        categories: givenCategories,
        id: checklistId,
        renderPurchased,
    } = source;

    //we use sticky states but update the server anyway for checklist wide changes
    const [checklistName, setChecklistName, setServerChecklistName] = useStickyMongoState([checklistId], "name", name);
    const [renderPurchasedCheck, setRenderPurchased, setServerRenderPurchased] = useStickyMongoState([checklistId], "renderPurchased", renderPurchased);
    const [categories, setCategories] = useState(givenCategories);

    const addCategory = async () => {
        const categoryPath = [checklistId, generateUniqueId()];
        const newItem = await changeCategoryExistence(categoryPath, true);
        setCategories(categories.concat([newItem]))
    }

    const delCategory = async (path) => {
        await changeCategoryExistence(path, false);
        setCategories(categories.filter((element) => element.id != path[1]));
    }

    const bigscreen = useMediaQuery('(min-width:450px)');
    //if big screen, use 36px
    //else use 1.5*(10/12)/checklist.length vw, which is view-width as a %.
    //  10/12 is the amount of screen this textbox has (see Grid item xs value)
    //  1.5 is about how much smaller avg char is than max char, so 2.5 is "let 'wwww' overflow so 'little' isnt miniscule"
    //find min against 36px/450px * 100 to make sure your new vw value is never MORE than 36px
    //find max between length and 32 to make sure its never too small
    const dynamicFontSize = bigscreen ? "36px": Math.min(100*36/450, 2.5*100*(10/12)/Math.max(checklistName.length, 32)) + "vw";
    //console.log(dynamicFontSize)

    return (
        <Box m={2}>
            <Grid container justify="space-between">
                <Grid item xs={12} sm={'auto'}>
                    <Grid container alignItems="center" justify="center">
                        <Grid item xs={2} sm={'auto'}>
                            <MoreChecklistsButton
                                currentChecklistId={checklistId}
                                setChecklistId={setChecklistId}
                            />
                        </Grid>
                        <Grid item xs={10} sm={'auto'}>
                            <TextField
                                multiline
                                fullWidth
                                rowsMax={4}
                                value={checklistName}
                                inputProps={{ maxLength: 36, style: { fontSize: dynamicFontSize, lineHeight: "100%" } }}
                                onChange={e => setServerChecklistName(e.target.value)}
                            />
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item>
                    <Grid container>
                        <Grid item xs={12} sm={'auto'}>
                            <ClearChecklistButton
                                checklistId={checklistId}
                                setCategories={setCategories}
                            />
                        </Grid>
                        <Grid item><Sharelink checklistId={checklistId} /></Grid>
                    </Grid>
                </Grid>
            </Grid>
            <FormControlLabel
                title='e.g. "purchased" and "packed"'
                control={<Switch
                    checked={renderPurchasedCheck}
                    onChange={(e) => setServerRenderPurchased(e.target.checked)} />}
                label='Show second column'
            />
            <Grid container justify="flex-start" spacing={3}>
                {categories.map(c =>
                    <Category key={c.id}
                        path={[checklistId, c.id]}
                        name={c.name}
                        items={c.items}
                        color={c.color}
                        renderPurchased={renderPurchasedCheck}
                        delCategory={delCategory}
                    />)}
                <Grid item xs={12} md={6} lg={4} xl={3}>
                    <Button
                        variant="contained"
                        size="large"
                        fullWidth={true}
                        onClick={addCategory}>
                        <Add />
                        <h3>Add New Category</h3>
                    </Button>
                </Grid>
            </Grid>
            <br />
        </Box>
    )
}
export default Checklist;
