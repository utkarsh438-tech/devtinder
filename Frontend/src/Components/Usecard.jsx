import React from 'react'

const Usecard = ({user = {}}) => {
    const {Firstname , Lastname , photourls , age , gender , bio} = user;
  return (
   <div className="card  bg-gray-950 w-96 shadow-sm">
  <figure>
    <img className="h-96 w-full object-cover"
      src={photourls?.[0] || "https://via.placeholder.com/150"}
      alt="photo" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{Firstname || "Unknown"} {Lastname || "User"}</h2>
    {age && gender && <p>{age +" " +gender}</p>}
    <p>{bio || "No bio available"}</p>
    <div className="card-actions  flex justify-center gap-4">
         <button className="btn btn-secondary">Ignore</button>
      <button className="btn btn-primary">Send Request</button>
    </div>
  </div>
</div>
  )
}

export default Usecard