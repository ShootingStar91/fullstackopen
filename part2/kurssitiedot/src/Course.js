
const Course = (props) => {
    console.log(props)
    return (
      <div key={props.course.id}>
        <h1 key={props.course.id}>{props.course.name}</h1>
        {props.course.parts.map((part) => 
  
             <p>{part.name} {part.exercises}</p>
  
        )
        }
        <Total key={props.course.id} parts={props.course.parts}/>
      </div>
    )
  }
  
  
  const Total = (props) => {
    const total = props.parts.reduce((sum, part) => 
      sum + part.exercises
      , 0
    )
    return (
      
      <div>
      <p><b>Total of {total} exercises.</b></p>
      </div>
    )
  }

export default Course