import React, { useEffect, useState } from 'react'
import template from '../../../img/him1718.jpg'

const CertificateGenerator = () => {
    const [properties, setProperties] = useState({
        top:"206px",
        left:"161px",
        width:"100px",
        height:"25px",
        fontSize:"18px",
        textAlign:"left"
    })
    const [text, setText] = useState('AJ aj')
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
            let imageH=maxHeight;
            let imageW=imageRatio*maxHeight;
            console.log('Height', imageH);
            console.log('Width', imageW);
            console.log('Top', (naturalH/imageH)*(Number(properties.top.replace('px',''))+Number(properties.height.replace('px',''))));
            console.log('Left', (naturalW/imageW)*properties.left.replace('px',''));
            console.log('Center', (naturalW/imageW)*(Number(properties.left.replace('px',''))+Number(properties.width.replace('px',''))/2));
            console.log('Right', (naturalW/imageW)*(Number(properties.left.replace('px',''))+Number(properties.width.replace('px',''))));
            console.log('Font', (naturalH/imageH)*properties.fontSize.replace('px',''));
            console.log('MaxWidth', (naturalW/imageW)*properties.width.replace('px',''));
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
        <div>
            <label>Top</label>
            <input type='number' name="top" min="0" value={properties.top.replace('px','')} onChange={(e)=>setProperties({...properties, top:e.target.value+'px'})}/>
            <label>Left</label>
            <input type='number' name="left" min="0" value={properties.left.replace('px','')} onChange={(e)=>setProperties({...properties, left:e.target.value+'px'})}/>
            <label>Width</label>
            <input type='number' name="width" min="0" value={properties.width.replace('px','')} onChange={(e)=>setProperties({...properties, width: e.target.value+'px'})}/>
            <label>Height</label>
            <input type='number' name="height" min="0" value={properties.height.replace('px','')} onChange={(e)=>setProperties({...properties, height: e.target.value+'px'})}/>
            <label>Font Size</label>
            <input type='number' name="fontSize" min="0" value={properties.fontSize.replace('px','')} onChange={(e)=>setProperties({...properties, fontSize: e.target.value+'px'})}/>
            <label>Example Text</label>
            <input type='text' name="text" value={text} onChange={(e)=>setText(e.target.value)}/>
            <label>Text Align</label>
            <select value={properties.textAlign} onChange={(e)=>setProperties({...properties, textAlign: e.target.value})}>
                <option value="left">Left</option>
                <option value="right">Right</option>
                <option value="center">Center</option>
            </select>
            <button onClick={convertToAbsoluteSize}>Finalize</button>
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
