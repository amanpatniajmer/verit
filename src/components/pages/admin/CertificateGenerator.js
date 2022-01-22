import React, { useEffect, useState } from 'react'
import template from '../../../img/him1718.jpg'
import Axios from 'axios';

const CertificateGenerator = ({field, data, setModal}) => {

    function submit(allData){
        Axios.post(`${process.env.REACT_APP_SERVER}/api/apply/certificate`, allData, {
            headers:{
              'x-auth-token': localStorage.getItem('token')
            }})
            .then(() =>{
                //showalert("Internal event added.", "success"); 
                //setLoading(false); 
                //history.push('../'); 
                console.log("Success")
            })
            .catch((e) => {
                //showalert((String(e.response) && String(e.response.data)) || "No connection established", "danger"); 
                //setLoading(false); 
                console.log("Failed");
        })
    }
    

    let fields=["Name", "Event", "Position"];
    let modalContent = fields.map((item)=> {
        return <><button style={{marginBottom:"5px", width:"100%"}}>{item}</button><br/></>
    })
    let temp={
        top:"206px",
        left:"161px",
        width:"100px",
        height:"25px",
        fontSize:"18px",
        textAlign:"left"
    };
    const [selectedField, setSelectedField] = useState(fields[0]);
    const [allData, setAllData] = useState({"Name":temp, "Event":{...temp, textAlign:"center"}, "Position":{...temp, textAlign:"right"}});
    const [properties, setProperties] = useState(allData[fields[0]])
    const [text, setText] = useState(fields[0])
    const convertToAbsoluteSize=()=>{
        let maxHeight=window.innerHeight*0.9;
        let maxWidth=window.innerWidth;
        const viewRatio= maxWidth/maxHeight;
        let naturalH=document.getElementById('template').naturalHeight
        let naturalW=document.getElementById('template').naturalWidth
        const imageRatio=naturalW/naturalH;
        console.log(naturalH)
        console.log(naturalW)
        if(viewRatio>imageRatio){
            //implies height is fixed to maximum
            let data={};
            let imageH=maxHeight;
            let imageW=imageRatio*maxHeight;
            console.log('Height', imageH);
            console.log('Width', imageW);
            data['y']=(naturalH/imageH)*(Number(properties.top.replace('px',''))+Number(properties.height.replace('px','')));
            data['fontSize'] = (naturalH/imageH)*properties.fontSize.replace('px','')+'px';
            data['maxWidth'] = (naturalW/imageW)*properties.width.replace('px','');
            data['textAlign'] = properties.textAlign;
            data['name']="AmanJain";
            switch(properties.textAlign){
                case 'left':
                    data['x']=(naturalW/imageW)*properties.left.replace('px','');
                    break;
                case 'center':
                    data['x'] = (naturalW/imageW)*(Number(properties.left.replace('px',''))+Number(properties.width.replace('px',''))/2);
                    break;
                case 'right':
                    data['x'] = (naturalW/imageW)*(Number(properties.left.replace('px',''))+Number(properties.width.replace('px','')));
                    break;
                default:
                    data['x']=0;
            }
            submit(data);
        }
        else{
            //implies width is fixed to maximum
            console.log('Width', maxWidth);
            console.log('Height', maxWidth/imageRatio);
        }
    }
    useEffect(() => {
        
    }, [])

    return (
        <>
        <div className="certificateGenerator">
            <label>Field</label>
            <select value={selectedField} onChange={(e)=>{
                setAllData({...allData, [selectedField] : properties});
                setSelectedField(e.target.value);
                setText(e.target.value);
                setProperties(allData[e.target.value]);
            }}>
                {fields.map((item)=>{
                    return <option value={item} key={item}>{item}</option>
                })}
            </select>
            <br/>
            <div id="fields">
                <div>
                <label>Top</label>
                <input type='number' name="top" min="0" value={properties.top.replace('px','')} onChange={(e)=>setProperties({...properties, top:e.target.value+'px'})}/>
                </div><div>
                <label>Left</label>
                <input type='number' name="left" min="0" value={properties.left.replace('px','')} onChange={(e)=>setProperties({...properties, left:e.target.value+'px'})}/>
                </div><div>
                <label>Width</label>
                <input type='number' name="width" min="0" value={properties.width.replace('px','')} onChange={(e)=>setProperties({...properties, width: e.target.value+'px'})}/>
                </div><div>
                <label>Height</label>
                <input type='number' name="height" min="0" value={properties.height.replace('px','')} onChange={(e)=>setProperties({...properties, height: e.target.value+'px'})}/>
                </div><div>
                <label>Font Size</label>
                <input type='number' name="fontSize" min="0" value={properties.fontSize.replace('px','')} onChange={(e)=>setProperties({...properties, fontSize: e.target.value+'px'})}/>
                </div><div>
                <label>Example Text</label>
                <input type='text' name="text" value={text} onChange={(e)=>setText(e.target.value)}/>
                </div><div>
                <label>Text Align</label>
                <select value={properties.textAlign} onChange={(e)=>setProperties({...properties, textAlign: e.target.value})}>
                    <option value="left">Left</option>
                    <option value="right">Right</option>
                    <option value="center">Center</option>
                </select>
                </div>
                <button onClick={convertToAbsoluteSize}>Save & Email Sample</button>
                <button onClick={()=>setModal({heading:"Fields", content:modalContent})}>Fields</button>
            </div>
        </div>
        <div style={{ width:"100vw", height:"90vh", position:"relative"}}>
            <img id='template' src={template} alt="template" style={{ maxHeight:"100%", maxWidth:"100%", objectFit:"contain"}}/>
            <div id='visualiserBox' style={{ position:'absolute', backgroundColor:"rgba(0,0,0,0.5)", zIndex:"101", ...properties}}>
                {text}
            </div>
        </div>
        </>
    )
}

export default CertificateGenerator
