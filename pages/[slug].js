import Checklist from '../components/checklist';
import { useChecklist } from '../util/customHooks';
import TopBar from '../components/topbar';
import { useRouter } from 'next/router'

export default function SlugHome() {
    const router = useRouter()
    const { slug } = router.query
    console.log(router)
    console.log(slug);
    const list = useChecklist(slug);
    return (
        <>
            <TopBar />
            <Checklist source={list} />
        </>
    )
}
