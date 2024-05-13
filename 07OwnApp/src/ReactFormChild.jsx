import React from 'react'
import { Controller } from 'react-hook-form'

const ReactFormChild = ({name, control, type="text", ...props}) => {

  return (
    <Controller 
    name={name}
    control={control}
    render={({field:{onChange}})=>(
        <div>
            <input onChange={onChange} type={type} placeholder={`enter ${name}`}className='my-3' {...props}/> <br/>
        </div>
    )}
    />
    // <div>
    //   <input type={type} className='my-3' {...props} ref={ref} /> <br/>
    // </div>
  )
};

export default React.forwardRef(ReactFormChild)



 