import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { cookieParser } from '../../helpers';
import { getUserByID } from '../../query/query'


export default function Dashboard() {
  const userId = cookieParser('userID', true);
  const { loading, error, data } = useQuery(getUserByID, { variables: { userId: userId } })

  return (
    <div>
      {loading ? <p>loading</p> : error ? <p>{error.message}</p> : (
        <div>
          hi {data.getUser.username}, 
          thank you for joining us on this journey. 
        </div>
      )}
    </div>
  )
}
