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
    const info = await API.sendToAlg({ ...user_input })
    console.log('info:', info);
    setResult({ ...info, rating: 5, comment: '' })
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
        <Link to="/page1" >Page1</Link>
      </div>
    </div>

    <div className="text-center">
      <img src={imgUrl} alt="img" height={100} />
      <h3>Model 1</h3>
    </div>
    <div className="global-center">
      <div>
        <table style={{ width: '100%', minWidth: "300px" }}>
          <thead className="text-center">
            <tr>
              <td colSpan={2} >
                <div className="row text-nowrap text-center w-p-100">
                  <div className="col-1"></div>
                  <span className="material-symbols-outlined" onClick={handleAddOption}>add_circle </span>
                  <span>
                    Click to Add more Rows
                  </span>
                  <div className="col-1"></div>
                </div>
              </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Name</td>
              <td><input className="w-p-100" value={user_input.full_name || ''} onChange={(e) => handleUserInput('full_name', e)} /></td>
            </tr>
            <tr>
              <td>Place of birth</td>
              <td><input className="w-p-100" value={user_input.place_of_birth || ''} onChange={(e) => handleUserInput('place_of_birth', e)} /></td>
            </tr>
            <tr>
              <td>Occupation</td>
              <td><input className="w-p-100" value={user_input.occupation || ''} onChange={(e) => handleUserInput('occupation', e)} /></td>
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
                            { name: 'etc3.', value: 3 },
                            { name: 'etc4.', value: 4 },
                          ].map((obj) => {
                            return (<option key={obj.value} value={obj.value}>{obj.name}</option>)
                          })
                        }
                      </select>
                    </td>
                    <td><input className="w-p-100" value={item.value || ''} onChange={(e) => handleOthers('value', index, e.target.value)} /></td>
                  </tr>)
              })
            }
          </tbody>
        </table>
        <div className="py-2 text-center">
          <button className="submit" onClick={handleSubmit} disabled={
            !user_input.full_name ||
            !user_input.place_of_birth || !user_input.occupation
          }>TRY NOW</button>
        </div>

        {
          result && result.generated_text &&
          <div className="rating-comment">
            <div className="row">
              <div className="col-1">
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
              <button onClick={handleSubmitRatingAndComment}>Submit Rating and Comment</button>
            </div>
          </div>
        }
      </div>
    </div>

  </div>
}
export default Page1
