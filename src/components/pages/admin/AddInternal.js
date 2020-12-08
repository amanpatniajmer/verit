import React, {useState} from 'react'

const AddInternal = ({click}) => {
  const [loading, setLoading] = useState(false);
  const add = (e) =>{
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      click(null);
  }, 3000);
  }
    return (
        <div>
          <form className="form-container" onSubmit={(e)=>{add(e)}}>
            <h1 className="text-primary">{" "}
            <span className="text-dark">Add an </span> Internal Event{" "}
            <span className="close" onClick={()=>click(null)}><i className="fa fa-times-circle"/></span></h1>
            <div className="form-group">
              <label>Event name:</label>
              <input
                type="text"
                name="name"
                placeholder="Enter name"
                autoComplete="off"
                required
              />
            </div>
            <div className="form-group">
              <label>Session</label>
              <select required={true}>
                <option>2020-21</option>
                <option>2019-20</option>
                <option>2018-19</option>
              </select>
            </div>
            <div className="form-group">
              <label>Club:</label>
              <select>
                <option></option>
                <option>IMC</option>
                <option>WMC</option>
                <option>FAC</option>
                <option>Masquerades</option>
                <option>DFZ</option>
                <option>Lit</option>
                <option>Quiz</option>
              </select>
            </div>
            <button type="submit" className="btn btn-block btn-success">
              Add{loading && <i className="fa fa-spinner fa-spin"/>}
            </button>
            <input type="reset" value="Cancel" className="btn btn-block btn-danger"  onClick={()=>click(null)}/>
          </form>
        </div>
    )
}

export default AddInternal
