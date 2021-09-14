import {useParams} from "react-router-dom";
import Button from '@material-ui/core/Button';

export const Welcome = ({history,match})=>{
    console.log(history);
    console.log(match);
    let {id} = useParams();
    return (<div><center><h1>Hej {id}</h1>
    <Button variant="contained" onClick={()=>history.push("/")}>Go to front</Button></center></div>)
}