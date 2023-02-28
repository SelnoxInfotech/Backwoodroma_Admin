import * as React from "react"

export default function Strain({ Product, SetProduct }) {

    const [Strain, SetStrain] = React.useState({
        N: "",
        i: "",
        s: "",
        c: "",
        h: "",
    })
    React.useEffect(() => {
        SetStrain(Strain => ({ Strain, [Product.strain]: "active" }))
    }, [Product])


    const handleChange = (event) => {
        const value = event.target.value;
        SetProduct({
            ...Product, [event.target.name]: value
        });
        SetStrain(Strain => ({ Strain, [event.target.value]: "active" }))
    };



    return (
      
        <div>
        <label className=' center mt-4 ' style={{marginLeft:"10px"}}>
              Strain
          </label>
  <div className="col-12 d-flex m-4">

      <div className="col-4">
         
          <button name="strain" value={'N'} onClick={handleChange} className={` btton + ${Strain.N}`}> None</button>

      </div>
    
      <div className="col-4">
      <button name="strain" value={'i'} onClick={handleChange} className={`btn btton + ${Strain.i}`} > Indica</button>
      </div>
      <div className="col-4">
      <button name="strain" value={'s'} onClick={handleChange} className={`btn btton + ${Strain.s}`} > Sativa</button>
      </div>

  </div>

 
  <div className='col-12 d-flex m-4  ' >
      <div className='col-4'>
          <button name="strain" value={'c'} onClick={handleChange} className={`btn btton + ${Strain.c}`} > CBD</button>
      </div>
      <div className='col-4'>
          <button name="strain" value={'h'} onClick={handleChange} className={`btn btton + ${Strain.h}`} > Hybrid</button>
      </div>

  </div>
</div>
    )

}