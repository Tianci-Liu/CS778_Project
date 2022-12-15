import React from 'react';

const Star = (props) => {
  const { onClick } = props
  const maxStar = [1, 2, 3, 4, 5];
  const [val, setVal] = React.useState(5)
  const handleSelect = (value) => {
    setVal(value)
    onClick && onClick(value)
  }
  React.useEffect(() => {
    if (props.rating !== val) {
      setVal(props.rating)
    }
  }, [props.rating])

  return <div className="row">
    {
      maxStar.map((item) => {
        return <div key={item} className="col-0 px-1">
          <span className={`start start-${item <= val ? '' : 'un'}select material-symbols-outlined`} onClick={() => handleSelect(item)}>star</span>
        </div>
      })
    }
  </div>
}

export default Star
