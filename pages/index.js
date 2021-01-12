import { useState } from 'react';
import Checklist from '../components/checklist';
import { useChecklist } from '../util/customHooks';
import TopBar from '../components/topbar';

export default function Home() {
  const [checklistId, setChecklistId] = useState(null);

  if (typeof window !== "undefined" && !checklistId) {
    if(localStorage.getItem('checklistId') == null){
      localStorage.setItem('checklistId', generateListId())
    }
    setChecklistId(localStorage.getItem('checklistId'))
  }

  const list = useChecklist(checklistId);
  return (
    <>
      <TopBar/>
      <Checklist source={list}/>
    </>
  )
}
