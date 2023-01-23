import { Link } from "react-router-dom"
import React, { useState } from 'react';
import Star from "../components/star";
import Ajax from '../ajax';

const Page3 = () => {
  const [info, setInfo] = useState({ context: '', question: '' })
  const [result, setResult] = useState({ rating: 5, false_probability: null, true_probability: null, label: null })

  const handleSubmit = async () => {
    const res = await Ajax.post('/page3/factsRules', info);
    setResult({ ...res, rating: 5 });
  }

  const handleSubmitRatingAndComment = async () => {
    const data = { ...result, user_input: { ...info } }
    data.page3_id = data.id;
    delete data.id;
    await Ajax.post('/page3/ratingAndComment', data)
    setInfo({})
    setResult({})
    alert('Submit success!')
  }

  return <div className="page3-body">
    <div className="row py-0 align-center">
      <div className="col-1">
        <h4>
          XXXXXXXXXXXXXXXXXXXXXXXXX
        </h4>
      </div>
      <div className="col-0 px-3">
        <Link to="/">Home</Link>
      </div>
      <div className="col-0">
        <Link to="/page3">Page3</Link>
      </div>
    </div>
    <div>
      xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    </div>
    <div>
      <div>Facts and rules (You can provide your own):</div>
      <textarea rows={6} value={info.context || ''} onChange={(e) => setInfo({ ...info, context: e.target.value })}></textarea>
      <div>Is it true?</div>
      <textarea rows={2} value={info.question || ''} onChange={(e) => setInfo({ ...info, question: e.target.value })}></textarea>
      <div>
        <button disabled={!info.context || !info.question} onClick={handleSubmit}>Submit</button>
      </div>

      {
        result && result.label != null &&
        <div className="result p-2">
          <div className="py-1">
            <div className="mt-10">The probability that the predicted result is True:</div>
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
            <button onClick={handleSubmitRatingAndComment}>Submit Rating and Comment</button>
          </div>

        </div>
      }

    </div>

  </div>
}
export default Page3
