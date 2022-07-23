import { useSelector } from 'react-redux';



function Page403() {

  const { user } = useSelector(state => state.auth);

  return (
    <div>
      <h1>403</h1>
      <h2>You are not authorized to view this page</h2>
      {user ? <h3>Please Login to a different account to view this page</h3> : <h3>Please login to view this page</h3>}
    </div>
  )
}

export default Page403;