import { Button, Input, message, Select } from "antd";
import React, { useState } from "react"
import { Link } from "react-router-dom"
import API from '../apis/project1';
import Star from "../components/star";
const imgUrl = require('../assets/img2.png')


const Page1 = () => {
  const [user_input, setUserInput] = useState({})
  const [others, setOthers] = useState([])
  const [result, setResult] = useState({ rating: 5, comment: '', generated_text: '' })

  const handleAddOption = () => {
    const data = [].concat([], others)
    data.push({})
    setOthers(data)
  }

  const handleUserInput = (field, e) => {
    const tmp = { ...user_input };
    tmp[field] = e.target.value;
    console.log(tmp)
    setUserInput(tmp);
  }

  const handleOthers = (field, index, val) => {
    const tmpData = [...others]
    tmpData[index][field] = val;
    setOthers(tmpData)
  }

  const handleSubmit = async () => {
    // change to API after connect server
    message.open({
      key: "loadig",
      type: 'loading',
      content: 'Loading...',
      duration: 10000
    });
    const info = await API.sendToAlg({ ...user_input })
    console.log('info:', info);
    setResult({ ...info, rating: 5, comment: '' })
    message.destroy();
  }

  const handleRatingComment = (field, value) => {
    const tmp = { ...result }
    tmp[field] = value;
    setResult(tmp);
  }

  const handleSubmitRatingAndComment = async () => {
    let input = Object.keys(user_input).map((key) => {return {key,text:user_input[key]}})

    let req = {
      input: input,
      output: result.generated_text,
      rank: result.rating,
      comment: result.comment
    };

    await API.sendToComBack(req)
    setOthers([])
    setResult({})
    setUserInput({})
  }


  return <div className="page1-body">
    <div className="row py-0 align-center" style={{ display: "flex", alignItems: "center", padding: "10px" }}>
      <div className="col-1" style={{ color: "#000", fontWeight: "bold", borderLeft: "4px solid #000", paddingLeft: "5px" }}>
        AI Model 1
      </div>
      <div className="col-0 px-3" style={{ backgroundColor: "#4444dd", borderRadius: 5, padding: "5px " }}>
        <Link to="/" style={{ color: "#fff" }}>Home</Link>
      </div>
      <div className="col-0" style={{ backgroundColor: "#9999dd", borderRadius: 5, padding: "5px ", marginLeft: 10 }}>
        <Link to="/page1" style={{ color: "#fff" }}>Page1</Link>
      </div>
      
    </div>
    <div style={{ fontWeight: "bold", lineHeight: "40px" }}>
      This model takes a table of personal information and generating a biography that is consistent with the table information.
    </div>


    <div>
      <div style={{ display: "flex", paddingTop: 35, justifyContent: "center" }}>
        <div className="text-center">
          <img src={imgUrl} alt="img" width={300} style={{ borderRadius: 20 }} />
          <div style={{ lineHeight: "30px", fontWeight: "bold" }}>Model 1</div>
        </div>
        <div>

          <table style={{ minWidth: "300px", margin: "auto", marginLeft: 20 }}>
            <thead className="text-center">
              <tr>
                <td colSpan={2} style={{ padding: 10 }} >
                  <div className="row text-nowrap text-center w-p-100" style={{ alignItems: "center" }}>
                    <div className="col-1"></div>
                    <span className="material-symbols-outlined" onClick={handleAddOption}>add_circle </span>
                    <span style={{ marginLeft: 10 }}>
                      Click to Add more Rows
                    </span>
                    <div className="col-1"></div>
                  </div>
                </td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: 5 }}>Name</td>
                <td style={{ padding: 5 }}><Input className="w-p-100" value={user_input.full_name || ''} onChange={(e) => handleUserInput('full_name', e)} /></td>
              </tr>
              <tr>
                <td style={{ padding: 5 }}>Place of birth</td>
                <td style={{ padding: 5 }}><Input className="w-p-100" value={user_input.place_of_birth || ''} onChange={(e) => handleUserInput('place_of_birth', e)} /></td>
              </tr>
              <tr>
                <td style={{ padding: 5 }}>Occupation</td>
                <td style={{ padding: 5 }}><Input className="w-p-100" value={user_input.occupation || ''} onChange={(e) => handleUserInput('occupation', e)} /></td>
              </tr>
              {
                others && others.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        <select className="w-p-100" onChange={(e) => handleOthers('option', index, e.target.value)}>
                          {
                            [
                              { name: 'Hobbies', value: user_input.hobbies || '' },
                              { name: 'Date of birth', value: user_input.dob || '' },
                              { name: 'etc1.', value: 1 },
                              { name: 'etc2.', value: 2 },
                            ].map((obj) => {
                              return (<option key={obj.value} value={obj.value}>{obj.name}</option>)
                            })
                          }
                        </select>
                      </td>
                      <td><Input className="w-p-100" value={item.value || ''} onChange={(e) => handleOthers('value', index, e.target.value)} /></td>
                    </tr>)
                })
              }
            </tbody>
          </table>
          <div className="py-2 text-center">
            <Button onClick={handleSubmit} disabled={
              !user_input.full_name ||
              !user_input.place_of_birth || !user_input.occupation
            }>TRY NOW</Button>
          </div>
        </div>


      </div>
      {
        result && result.generated_text &&
        <div className="rating-comment" style={{ marginTop: "30px" }}>
          <div className="row">
            <div className="col-1" style={{ fontSize: 14, lineHeight: "25px" }}>
              {result.generated_text}
            </div>
            <div className="col-0">
              <Star rating={result.rating || 5} onClick={(val) => handleRatingComment('rating', val)} />
            </div>
          </div>
          <div style={{ marginRight: "10px" }}>
            <textarea placeholder="Your comment" value={result.comment || ''} onChange={(e) => handleRatingComment('comment', e.target.value)}></textarea>
          </div>
          <div className="py-2 text-center">
            <Button type="primary" onClick={handleSubmitRatingAndComment}>Submit Rating and Comment</Button>
          </div>
        </div>
      }
    </div>

  </div >
}
export default Page1
