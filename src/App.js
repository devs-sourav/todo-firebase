import { useEffect, useState } from 'react';
import { getDatabase, ref, set, push, onValue , remove, update } from "firebase/database";


function App() {

  let [text,setText] = useState("")
  let [textArr,setTextArr] = useState([])
  let [edit,setEdit]= useState(false)
  let [idValue,setIdValue]= useState("")
  let [flag,setFlag]= useState(false)

  const db = getDatabase();  
  

  let handleClick =()=>{

    var repl = text.replace(/^\s+|\s+$|\s+(?=\s)/g, "");

    if(repl){
      set(push(ref(db, 'todo/')), {
      task:text
    }).then(()=>{
      console.log("Data Gese")
    })
    setText("")
    setFlag(false)
    }else{
      setFlag(true)
    }

  }


  useEffect(() => {
    const todoref = ref(db, 'todo/');
    
    onValue(todoref, (snapshot) => {
      let arr = []
      snapshot.forEach((item)=>{
        arr.push({...item.val(),id:item.key})
        setTextArr(arr)
      })
    });
  },[])

  let handleDelete = (id)=>{
    remove(ref(db, 'todo/'+id))
  }

  let handleEdit = (task,id)=>{
    setIdValue(id)
    setText(task)
    if(!edit){
      setEdit(true)
    }
  }

  let handleUpdate = ()=>{
    var repl = text.replace(/^\s+|\s+$|\s+(?=\s)/g, "");

    if(repl){
      setEdit(false);
      setText("");
      update(ref(db, 'todo/'+idValue),{
        task:text
      })
      setFlag(false)
    }else{
      setFlag(true)
    }

  }

  return (
  <>
    <input value={text} onChange={(e)=>setText(e.target.value)}/>
    {
      edit ? 
      <>
        <button onClick={handleUpdate}>Update</button>
        <button onClick={()=>{setEdit(false);setText("")}}>Cancel</button>
      </> : <button onClick={handleClick}>Submit</button>
    }
    {
      flag && <h3>Please Enter a valid String</h3>
    }
    

    <ol>
    {
      textArr.map((item,index)=>(
        <li key={index}>{item.task}
          <button onClick={()=>handleDelete(item.id)}>Delete</button>
          <button onClick={()=>handleEdit(item.task,item.id)}>Edit</button>
        </li>
      ))
    }
    </ol>
  </>
  );
}

export default App;
