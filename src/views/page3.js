import { Link } from "react-router-dom"
import React, { useState } from 'react';

const Page3 = () => {
  const [info, setInfo] = useState({ field1: '', field2: '' })
  const handleSubmit = () => {
    console.log('info:', info);
    alert('call api')
  }

  return <div className="page3-body">
    <div className="row py-0 align-center">
      <div className="col-1">
        <h4>
          XXXXXXXXXXXXXXXXXXXXXXXXX
        </h4>
      </div>
      <div className="col-0 px-3">
        <Link to="/" >Home</Link>
      </div>
      <div className="col-0">
        <Link to="/page3" >Page3</Link>
      </div>
    </div>
    <div>
      xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    </div>
    <div>
      <div>Facts and rules (You can provide your own):</div>
      <textarea rows={10} value={info.field1 || ''} onChange={(e) => setInfo({ ...info, field1: e.target.value })}></textarea>
      <div>Is it true?</div>
      <textarea rows={3} value={info.field2 || ''} onChange={(e) => setInfo({ ...info, field2: e.target.value })}></textarea>
      <div>
        <button disabled={!info.field1 || !info.field2} onClick={handleSubmit}>Submit</button>
      </div>
    </div>

  </div>
}
export default Page3