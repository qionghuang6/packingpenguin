import { useState } from 'react'
import { FormControlLabel, Box, Button, TextField, Grid, Typography, Switch } from '@material-ui/core';
import { changeCategoryExistence, generateUniqueId } from '../util/utilFunctions'
import Category from './category'
import Sharelink from './sharelink'
import { useStickyMongoState } from '../util/customHooks';
import { Add } from '@material-ui/icons';
import Loading from './loading.js'
import ClearChecklistButton from './buttons/ClearChecklistButton';
import MoreChecklistsButton from './buttons/MoreChecklistsButton';
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

    return (
        <Box m={2}>
            <Grid container justify="space-between">
                <Grid item>
                    <Grid container>
                        <Grid item xs={2} sm={'auto'}>
                            <MoreChecklistsButton
                                currentChecklistId={checklistId}
                                setChecklistId={setChecklistId}
                            />
                        </Grid>
                        <Grid item xs={10} sm={'auto'}>
                            <TextField
                                multiline
                                rowsMax={4}
                                value={checklistName}
                                inputProps={{ maxLength: 36, style: { fontSize: 36, lineHeight: "100%" } }}
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
