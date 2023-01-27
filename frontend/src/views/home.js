import React from 'react';
import { useNavigate } from 'react-router'

const img1 = require('../assets/img1.png')
const img2 = require('../assets/img2.png')
const img3 = require('../assets/img3.png')

const Card = (props) => {
  const { info, img } = props;
  const [isOpen, setIsOpen] = React.useState(false)
  return <div className={`home-boder p-2 ${props.className}`}>
    <div className="p-2">

      <img src={img} width="100%" onClick={props.click} alt={props.title} />
    </div>
    <div className="py-1">
      {props.title}
    </div>
    <div className="row">
      <div className="col-1">More Info</div>
      <div className="col-0 hande" onClick={() => setIsOpen(!isOpen)}>
        {
          !isOpen ?
            <span className="material-symbols-outlined">+ </span>
            :
            <span className="material-symbols-outlined">
              -
            </span>
        }
      </div>
    </div>
    {
      isOpen && <div>
        {info}
      </div>
    }
  </div>
}
const Home = () => {
  const naviagtion = useNavigate();

  const initData = [
    { title: 'Model 1', img: img1, className: 'card card-1', info: 'page1 more info....' },
    { title: 'Model 2', img: img2, className: 'card card-2', info: 'page2 more info....' },
    { title: 'Model 3', img: img3, className: 'card card-3', info: 'page3 more info....' },
  ]
  return <div className="home-body">
    <div className="title text-center">
      <h2>AI Models</h2>
    </div>
    <div className="row row-wrap">
      <div className='col-p-10'></div>
      {
        initData.map((row, index) => {
          return <div className="col-p-25 p-2" key={index}>
            <Card {...row} click={() => {
              switch (index) {
                case 0:
                  naviagtion('/page1')
                  break;
                case 1:
                  naviagtion('/page2')
                  break;
                case 2:
                  naviagtion('/page3')
                  break;
                default:
                  break;
              }

            }} />
          </div>
        })
      }
    </div>
  </div>
}
export default Home