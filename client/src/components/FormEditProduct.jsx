import React, { useEffect,useState } from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import { getdata,update } from "../functions/product";

const FormEditProduct = () => {

  const params = useParams()
  const [data,setData] = useState({
    name :'',
    detail:'',
    price:''
  })
  const navigate = useNavigate()

  useEffect(()=>{

    loadData(params.id)

  },[])

  const loadData = async(id) => {
    getdata(id)
     .then((res) => {
       setData(res.data)
     })
     .catch((err) => console.log(err));
  }

  const handleChang = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    update(params.id,data)
      .then((res) => {
        // loadData();
        navigate('/')
      })
      .catch((err) => console.error(err));
  };

  
  return (
    <div>
      <h3>FormEditProduct</h3>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          onChange={(e) => handleChang(e)}
          placeholder="name"
          value={data.name}
        />
        <br />

        <input
          type="text"
          name="detail"
          placeholder="detail"
          onChange={(e) => handleChang(e)}
          value={data.detail}
        />
        <br />

        <input
          type="number"
          name="price"
          placeholder="price"
          onChange={(e) => handleChang(e)}
          value={data.price}
        />
        <br />

        <button type="submit">Submit</button>
      </form>


    </div>
  )
}

export default FormEditProduct