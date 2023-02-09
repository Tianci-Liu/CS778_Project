import { Link } from "react-router-dom"
import React, { useState } from 'react';
import Star from "../components/star";
// remove after connect server
import Ajax from '../ajax';
import API from '../apis/project3'
import { Button, message } from "antd";

const Page3 = () => {
  const [info, setInfo] = useState({ context: '', question: '' })
  const [result, setResult] = useState({ rating: 5, false_probability: null, true_probability: null, label: null })

  const handleSubmit = async () => {
    // change after connect server
    message.open({
      key: "loadig",
      type: 'loading',
      content: 'Loading...',
      duration: 10000
    });
    const res = await API.sendToAlg(info);
    setResult({ ...res, rating: 5 });
    message.destroy();
  }

  const handleSubmitRatingAndComment = async () => {

    const data = {
      input:{
        factsRule: info.context,
        judgeStatement: info.question
      },
      output:{
        trueProbability: result.true_probability,
        falseProbability: result.false_probability,
        label: result.label
      },
      rank: result.rating,
      comment: result.comment
    }
    console.log(data)
    await API.sendToComBack(data)
    setInfo({})
    setResult({})
  }

  return <div className="page3-body">
    <div className="row py-0 align-center" style={{ display: "flex", alignItems: "center", padding: "10px" }}>
      <div className="col-1" style={{ color: "#000", fontWeight: "bold", borderLeft: "4px solid #000", paddingLeft: "5px" }}>
        AI Model 3
      </div>
      <div className="col-0 px-3" style={{ backgroundColor: "#4444dd", borderRadius: 5, padding: "5px " }}>
        <Link to="/" style={{ color: "#fff" }}>Home</Link>
      </div>
      <div className="col-0" style={{ backgroundColor: "#9999dd", borderRadius: 5, padding: "5px ", marginLeft: 10 }}>
        <Link to="/page3" style={{ color: "#fff" }}>Page3</Link>
      </div>
    </div>
    <div style={{ fontWeight: "bold", lineHeight: "40px" }}>
      The model predicts whether a question is correct according to the context and question entered by the user.
    </div>
    
    <div >
      <div style={{ lineHeight: "40px", fontSize: "15px" }}>Facts and rules (You can provide your own):</div>
      <textarea rows={6} value={info.context || ''} onChange={(e) => setInfo({ ...info, context: e.target.value })}></textarea>
      <div>Is it true?</div>
      <textarea rows={2} value={info.question || ''} onChange={(e) => setInfo({ ...info, question: e.target.value })}></textarea>
      <div>
        <Button type="primary" disabled={!info.context || !info.question} onClick={handleSubmit}>Submit</Button>
      </div>

      {
        result && result.label != null &&
        <div className="result p-2" style={{ marginTop: 20, fontSize: 14, lineHeight: "25px" }}>
          <div className="py-1">
            <div className="mt-10" >The probability that the predicted result is True:</div>
            <div>{result.true_probability}</div>
          </div>
          <div className="py-1">
            <div>The probability that the predicted result is False:</div>
            <div>{result.false_probability}</div>
          </div>
          <div className="py-1">
            <div className="mt-10">Predict label: {result.label}</div>
          </div>

          <div>
            <div><Star rating={result.rating || 5} onClick={(rating) => setResult({ ...result, rating })} /></div>
          </div>
          <div style={{ marginRight: '10px' }}>
            <textarea value={result.comment || ''} onChange={(e) => setResult({ ...result, comment: e.target.value })} rows={3} placeholder="Your Comment">

            </textarea>
          </div>
          <div>
            <Button type="primary" onClick={handleSubmitRatingAndComment}>Submit Rating and Comment</Button>
          </div>

        </div>
      }

    </div>

  </div>
}
export default Page3
