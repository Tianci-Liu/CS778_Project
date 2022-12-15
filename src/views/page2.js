import { Link } from "react-router-dom"

const Page2 = () => {
  return <div>
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
        <Link to="/page2" >Page2</Link>
      </div>
    </div>
    
  </div>
}
export default Page2