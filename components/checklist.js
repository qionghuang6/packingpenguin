import { useState } from 'react'
import { Checkbox, FormControlLabel, Box, Button, TextField, Grid, Typography, Switch } from '@material-ui/core';
import { changeCategoryExistence, generateUniqueId, clearChecklist } from '../util/utilFunctions'
import Category from './category'
import Sharelink from './sharelink'
import { useStickyMongoState } from '../util/customHooks';
import AddIcon from '@material-ui/icons/Add';
import Loading from './loading.js'
import ClearChecklistButton from './clearChecklistButton';

const Checklist = ({ source }) => {
    if (!source) {
        return <Loading />
    }
    if(source === 'error'){
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

    const deleteAllCategories = async () => {
        await clearChecklist(checklistId)
        setCategories([])
    }

    return (
        <Box m={2}>
            <Grid container justify="space-between">
                <Grid item>
                    <TextField
                        title={"ChecklistId: " + checklistId}
                        multiline
                        rowsMax={4}
                        value={checklistName}
                        inputProps={{ maxLength: 36, style: { fontSize: 36, lineHeight: "100%" } }}
                        onChange={e => setServerChecklistName(e.target.value)}
                    />
                </Grid>
                <Grid item>
                    <Grid container>
                        <Grid item>
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
                        <AddIcon />
                        <h3>Add New Category</h3>
                    </Button>
                </Grid>
            </Grid>
            <br />
        </Box>
    )
}
export default Checklist;
