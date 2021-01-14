import { useState } from 'react';
import Checklist from '../components/checklist';
import { useChecklist } from '../util/customHooks';
import TopBar from '../components/topbar';
import { generateListId } from '../util/utilFunctions';

export default function Home() {
  const [setChecklistId, checklistId, list] = useChecklist();

  if (typeof window !== "undefined" && !checklistId) {
    const localLists = localStorage.getItem('checklistId')
    if( localLists == null){
      localStorage.setItem('checklistId', JSON.stringify([generateListId()]));

    } else if(!localLists.includes('[')){
      //For compatability with old checklistIds
      localStorage.setItem('checklistId', JSON.stringify([localLists]));
    }
    setChecklistId(JSON.parse(localStorage.getItem('checklistId'))[0])
  }

  return (
    <>
      <TopBar/>
      <Checklist key={JSON.stringify(list)} source={list} setChecklistId={setChecklistId}/>
    </>
  )
}
