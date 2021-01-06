import Checklist from '../components/checklist';
import { useChecklist } from '../util/customHooks';
import TopBar from '../components/topbar';
export default function Home() {
  const list = useChecklist()
  return (
    <>
      <TopBar/>
      <Checklist source={list}/>
    </>
  )
}
