import Checklist from '../components/checklist';
import { useChecklist } from '../util/customHooks';
import TopBar from '../components/topbar';
import { useRouter } from 'next/router'

export default function SlugHome() {
    const router = useRouter()
    const { slug } = router.query
    const [setChecklistId, checklistId, list] = useChecklist(true);

    if(!checklistId && slug){
        setChecklistId(slug);
    }
    if (list != null && list != 'error' && typeof window !== "undefined") {
        let checklistIds = JSON.parse(localStorage.getItem('checklistId'))
        if (!Array.isArray(checklistIds)){
            checklistIds = [];
        }
        if (!checklistIds.includes(slug)){
            checklistIds = checklistIds.concat(slug)
        }
        localStorage.setItem('checklistId', JSON.stringify(checklistIds));
      }

    return (
        <>
            <TopBar />
            <Checklist key={list ? list.id : ""} source={list} setChecklistId={setChecklistId}/>
        </>
    )
}
