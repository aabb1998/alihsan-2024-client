import React from 'react'

const CommonAuthentication = ({children}) => {
  return (
    <div>
      {children}
    </div>
  )
}

export default React.memo(CommonAuthentication)
