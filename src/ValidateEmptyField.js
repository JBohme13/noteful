import React from 'react'

export default function ValidationError(props) {
    if (props.message) { 
     return(
       <div className='empty-error'>{props.message}</div>
     );
   } else {
   return <> </>
   }
}